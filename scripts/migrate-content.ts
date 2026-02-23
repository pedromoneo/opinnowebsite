/**
 * Content Migration Script
 * ========================
 * 
 * Reads all content from the Firestore `content` collection using the MCP tools,
 * then writes migration commands.
 * 
 * Since we don't have service account credentials available locally, 
 * this script uses the Firebase Web SDK (already configured with API key).
 * 
 * 1. Categorizes posts into proper types: story, insight, challenge, event, job
 * 2. Cleans "Skip to content..." scraped navigation from content and excerpts
 * 3. Maps slugs to match the original opinno.com URL structure
 * 4. Removes duplicate/page-listing entries (numeric slugs)
 * 5. Removes static page duplicates already handled by static components
 * 
 * Usage: npx tsx scripts/migrate-content.ts [--dry-run]
 */

import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    writeBatch
} from 'firebase/firestore';

// Firebase config (same as the app)
const firebaseConfig = {
    projectId: "opinnowebsite",
    appId: "1:571973007321:web:849308facc4e9ce67f8bc8",
    storageBucket: "opinnowebsite.firebasestorage.app",
    apiKey: "AIzaSyDN9iuyp9g9R-_qCwZFpf_HMCATPyAxzNA",
    authDomain: "opinnowebsite.firebaseapp.com",
    messagingSenderId: "571973007321",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------- Configuration ----------

// Static pages handled by React components — these should be deleted
const STATIC_PAGE_SLUGS = new Set([
    'about', 'about-impact', 'model', 'senior-expert-council', 'impact',
    'leadership', 'careers', 'expertise', 'framework', 'open-innovation',
    'corporate-transformation', 'venture-building', 'clients',
    'stories', 'insights', 'contact', 'cookies', 'privacy',
    'legal-notice', 'compliance', 'work', 'events', 'challenges', 'academy',
    'quality-and-environment', 'equality-plan',
]);

// Manually created test docs — should be deleted
const TEST_SLUGS = new Set([
    'santander-framework',
    'digital-transformation-guide',
]);

const isNumericSlug = (slug: string) => /^\d+$/.test(slug);

function detectCategory(slugPath: string, content: string): {
    category: 'story' | 'insight' | 'challenge' | 'event' | 'job' | 'course' | 'page';
    cleanSlug: string;
} {
    if (slugPath.startsWith('story-')) {
        return { category: 'story', cleanSlug: slugPath.replace(/^story-/, '') };
    }
    if (slugPath.startsWith('insight-')) {
        return { category: 'insight', cleanSlug: slugPath.replace(/^insight-/, '') };
    }
    if (slugPath.startsWith('challenges-')) {
        return { category: 'challenge', cleanSlug: slugPath.replace(/^challenges-/, '') };
    }
    if (slugPath.startsWith('events-')) {
        return { category: 'event', cleanSlug: slugPath.replace(/^events-/, '') };
    }
    if (slugPath.startsWith('job-')) {
        return { category: 'job', cleanSlug: slugPath.replace(/^job-/, '') };
    }
    if (slugPath.startsWith('course-')) {
        return { category: 'course', cleanSlug: slugPath.replace(/^course-/, '') };
    }

    // Content-based detection for posts without prefix
    const lowerContent = (content || '').toLowerCase().substring(0, 200);
    if (lowerContent.includes('impact stories') || lowerContent.includes('impact story')) {
        return { category: 'story', cleanSlug: slugPath };
    }
    if (lowerContent.includes('insights')) {
        return { category: 'insight', cleanSlug: slugPath };
    }

    return { category: 'page', cleanSlug: slugPath };
}

function cleanContent(text: string): string {
    if (!text) return text;

    let cleaned = text;

    // Remove "Skip to content" prefix
    cleaned = cleaned.replace(/^Skip to content\s*/i, '');

    // Remove "Scroll to Top" suffix
    cleaned = cleaned.replace(/\s*Scroll to Top\s*$/i, '');

    // Remove sidebar nav that got scraped - pattern: "About Impact Overview Model Council..."
    cleaned = cleaned.replace(
        /^(?:About|Community|Insights|Impact Stories|News)\s+(?:Impact|Overview|Model|Council|Leadership|Careers|Challenges|Events|Work|Courses|Stories)\s+(?:Overview\s+Model\s+Council\s+Impact\s+Leadership\s+Careers\s*)+/gi,
        ''
    );

    // Remove section headers that lead content (e.g., "Community Challenges " prefix)
    cleaned = cleaned.replace(/^(?:Community\s+)?(?:Challenges|Events|Work|Courses)\s+/i, '');
    cleaned = cleaned.replace(/^(?:Impact Stories|Insights)\s+/i, '');

    // Remove trailing contact CTA
    cleaned = cleaned.replace(
        /\s*We would love to know about you and help you innovate!\s*Leave us your contact information and we will contact you as soon as possible:?\s*$/i,
        ''
    );

    // Clean up excessive whitespace
    cleaned = cleaned.replace(/\s{3,}/g, ' ').trim();

    return cleaned;
}

function generateExcerpt(content: string, maxLength = 200): string {
    if (!content) return '';

    const sentences = content.split(/(?<=[.!?])\s+/);
    let excerpt = '';

    for (const sentence of sentences) {
        if ((excerpt + ' ' + sentence).length > maxLength) break;
        excerpt = excerpt ? excerpt + ' ' + sentence : sentence;
    }

    if (!excerpt && content.length > 0) {
        excerpt = content.substring(0, maxLength);
    }

    return excerpt.trim() + (content.length > excerpt.length ? '...' : '');
}

async function migrateContent(dryRun = false) {
    console.log(`\n🚀 Starting content migration${dryRun ? ' (DRY RUN)' : ''}...\n`);

    // Fetch all documents
    const contentRef = collection(db, 'content');
    const snapshot = await getDocs(contentRef);
    console.log(`📦 Found ${snapshot.size} documents in 'content' collection\n`);

    const toDelete: { id: string; reason: string; title: string }[] = [];
    const toMigrate: {
        oldId: string;
        newId: string;
        data: Record<string, unknown>;
        category: string
    }[] = [];

    // Phase 1: Analyze all documents
    for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const docId = docSnap.id;
        const slugPath = data.slugPath || docId;

        // 1. Delete numeric paginated listing entries
        if (isNumericSlug(slugPath) || isNumericSlug(docId)) {
            toDelete.push({ id: docId, reason: 'paginated listing', title: data.title || '(no title)' });
            continue;
        }

        // 2. Delete test/manual documents
        if (TEST_SLUGS.has(slugPath) || TEST_SLUGS.has(docId)) {
            toDelete.push({ id: docId, reason: 'test document', title: data.title || '(no title)' });
            continue;
        }

        // 3. Delete entries for static pages handled by React components
        if (STATIC_PAGE_SLUGS.has(slugPath) || STATIC_PAGE_SLUGS.has(docId)) {
            toDelete.push({ id: docId, reason: 'static page', title: data.title || '(no title)' });
            continue;
        }

        // 4. Detect category and compute clean slug
        const { category, cleanSlug } = detectCategory(slugPath, data.content || '');

        // 5. Clean content text
        const cleanedContent = cleanContent(data.content || '');
        const cleanedExcerpt = generateExcerpt(cleanedContent);

        // 6. Build the new URL path matching opinno.com structure
        let urlPath: string;
        switch (category) {
            case 'story': urlPath = `story/${cleanSlug}`; break;
            case 'insight': urlPath = `insight/${cleanSlug}`; break;
            case 'challenge': urlPath = `challenge/${cleanSlug}`; break;
            case 'event': urlPath = `event/${cleanSlug}`; break;
            case 'job': urlPath = `job/${cleanSlug}`; break;
            case 'course': urlPath = `course/${cleanSlug}`; break;
            default: urlPath = cleanSlug;
        }

        toMigrate.push({
            oldId: docId,
            newId: urlPath,
            category,
            data: {
                title: data.title,
                content: cleanedContent,
                excerpt: cleanedExcerpt,
                slugPath: urlPath,
                category: category,
                type: data.type || 'post',
                lang: data.lang || 'en',
                publishedAt: data.publishedAt || new Date().toISOString(),
                featuredImage: data.featuredImage || '',
                originalSlug: slugPath,
                migratedAt: new Date().toISOString(),
            },
        });
    }

    // Phase 2: Print analysis
    console.log('─'.repeat(60));
    console.log('🗑️  DOCUMENTS TO DELETE:');
    console.log('─'.repeat(60));
    for (const d of toDelete) {
        console.log(`  ${d.id} — "${d.title}" (${d.reason})`);
    }

    console.log('\n' + '─'.repeat(60));
    console.log('✏️  DOCUMENTS TO MIGRATE:');
    console.log('─'.repeat(60));

    const categoryCounts: Record<string, number> = {};
    for (const m of toMigrate) {
        categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
        const changed = m.oldId !== m.newId ? ' ⚡' : '';
        console.log(`  [${m.category.padEnd(9)}] ${m.oldId} → ${m.newId}${changed}`);
    }

    console.log('\n' + '─'.repeat(60));
    console.log('📊 SUMMARY');
    console.log('─'.repeat(60));
    console.log(`  Delete:  ${toDelete.length} documents`);
    console.log(`  Migrate: ${toMigrate.length} documents`);
    console.log(`  Categories: ${JSON.stringify(categoryCounts)}`);

    // Phase 3: Execute
    if (dryRun) {
        console.log('\n⚠️  DRY RUN — No changes made to Firestore.');
        console.log('   Run without --dry-run to apply changes.\n');
        process.exit(0);
        return;
    }

    console.log('\n🔥 Applying changes...\n');

    // Delete documents (in batches of 400)
    let deleteCount = 0;
    for (const d of toDelete) {
        try {
            const docRef = doc(db, 'content', d.id);
            await deleteDoc(docRef);
            deleteCount++;
            console.log(`  🗑️  Deleted: ${d.id}`);
        } catch (error) {
            console.error(`  ❌ Failed to delete ${d.id}: ${error}`);
        }
    }

    // Migrate documents (create new → delete old if ID changed)
    let migrateCount = 0;
    for (const m of toMigrate) {
        try {
            if (m.oldId !== m.newId) {
                // Create with new ID
                const newDocRef = doc(db, 'content', m.newId);
                await setDoc(newDocRef, m.data);

                // Delete old
                const oldDocRef = doc(db, 'content', m.oldId);
                await deleteDoc(oldDocRef);

                console.log(`  ✅ Migrated: ${m.oldId} → ${m.newId}`);
            } else {
                // Update in place
                const docRef = doc(db, 'content', m.oldId);
                await setDoc(docRef, m.data, { merge: true });
                console.log(`  ✅ Updated: ${m.oldId}`);
            }
            migrateCount++;
        } catch (error) {
            console.error(`  ❌ Failed to migrate ${m.oldId}: ${error}`);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`✨ Done! Deleted ${deleteCount}, Migrated ${migrateCount}`);
    console.log('='.repeat(60));
}

// Main
const isDryRun = process.argv.includes('--dry-run');
migrateContent(isDryRun)
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error('\n💥 Migration failed:', err);
        process.exit(1);
    });
