/**
 * Content Migration Script - Phase 2
 * ===================================
 * 
 * Phase 1 already deleted static page duplicates, paginated listings, and test data.
 * 
 * Phase 2 now migrates the remaining scraped content:
 * - Cleans "Skip to content..." navigation junk
 * - Categorizes posts (story, insight, challenge, event, job, course)
 * - Uses hyphen-separated doc IDs (story--slug) since Firestore doc IDs can't contain /
 * - Sets slugPath to match opinno.com URL structure (story/slug)
 * 
 * Usage: npx tsx scripts/migrate-content-phase2.ts [--dry-run]
 */

import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc
} from 'firebase/firestore';

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

function detectCategory(slugPath: string): {
    category: string;
    cleanSlug: string;
} {
    if (slugPath.startsWith('story-')) return { category: 'story', cleanSlug: slugPath.replace(/^story-/, '') };
    if (slugPath.startsWith('insight-')) return { category: 'insight', cleanSlug: slugPath.replace(/^insight-/, '') };
    if (slugPath.startsWith('challenges-')) return { category: 'challenge', cleanSlug: slugPath.replace(/^challenges-/, '') };
    if (slugPath.startsWith('events-')) return { category: 'event', cleanSlug: slugPath.replace(/^events-/, '') };
    if (slugPath.startsWith('job-')) return { category: 'job', cleanSlug: slugPath.replace(/^job-/, '') };
    if (slugPath.startsWith('course-')) return { category: 'course', cleanSlug: slugPath.replace(/^course-/, '') };
    return { category: 'page', cleanSlug: slugPath };
}

function cleanContent(text: string): string {
    if (!text) return text;
    let cleaned = text;

    cleaned = cleaned.replace(/^Skip to content\s*/i, '');
    cleaned = cleaned.replace(/\s*Scroll to Top\s*$/i, '');

    // Remove nav breadcrumbs: "About Impact Overview Model Council..."
    cleaned = cleaned.replace(
        /^(?:About|Community|Insights|Impact Stories|News)\s+(?:Impact|Overview|Model|Council|Leadership|Careers|Challenges|Events|Work|Courses|Stories)\s+(?:Overview\s+Model\s+Council\s+Impact\s+Leadership\s+Careers\s*)+/gi,
        ''
    );

    // Remove section headers: "Community Challenges " or "Impact Stories "
    cleaned = cleaned.replace(/^(?:Community\s+)?(?:Challenges|Events|Work|Courses)\s+/i, '');
    cleaned = cleaned.replace(/^(?:Impact Stories|Insights)\s+/i, '');

    // Remove trailing contact CTA
    cleaned = cleaned.replace(
        /\s*We would love to know about you and help you innovate!\s*Leave us your contact information and we will contact you as soon as possible:?\s*$/i,
        ''
    );

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
    if (!excerpt && content.length > 0) excerpt = content.substring(0, maxLength);
    return excerpt.trim() + (content.length > excerpt.length ? '...' : '');
}

async function migrateContent(dryRun = false) {
    console.log(`\n🚀 Phase 2 migration${dryRun ? ' (DRY RUN)' : ''}...\n`);

    const snapshot = await getDocs(collection(db, 'content'));
    console.log(`📦 Found ${snapshot.size} remaining documents\n`);

    const toMigrate: { oldId: string; newDocId: string; urlPath: string; data: Record<string, unknown>; category: string }[] = [];

    for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const docId = docSnap.id;
        const slugPath = data.slugPath || docId;

        const { category, cleanSlug } = detectCategory(slugPath);
        const cleanedContent = cleanContent(data.content || '');
        const cleanedExcerpt = generateExcerpt(cleanedContent);

        // URL path for the website (uses / for URL segments)
        let urlPath: string;
        // Doc ID for Firestore (uses -- instead of / since Firestore can't have / in doc IDs)
        let newDocId: string;

        if (category !== 'page') {
            urlPath = `${category}/${cleanSlug}`;
            newDocId = `${category}--${cleanSlug}`;
        } else {
            urlPath = cleanSlug;
            newDocId = cleanSlug;
        }

        toMigrate.push({
            oldId: docId,
            newDocId,
            urlPath,
            category,
            data: {
                title: data.title,
                content: cleanedContent,
                excerpt: cleanedExcerpt,
                slugPath: urlPath,
                category,
                type: data.type || 'post',
                lang: data.lang || 'en',
                publishedAt: data.publishedAt || new Date().toISOString(),
                featuredImage: data.featuredImage || '',
                originalSlug: slugPath,
                migratedAt: new Date().toISOString(),
            },
        });
    }

    // Print plan
    console.log('─'.repeat(70));
    console.log('📋 MIGRATION PLAN:');
    console.log('─'.repeat(70));

    const categoryCounts: Record<string, number> = {};
    for (const m of toMigrate) {
        categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
        const changed = m.oldId !== m.newDocId ? ' ⚡ NEW ID' : '';
        console.log(`  [${m.category.padEnd(9)}] ${m.oldId}`);
        if (changed) {
            console.log(`             → DocID: ${m.newDocId}`);
        }
        console.log(`             → URL:   /en/${m.urlPath}`);
    }

    console.log('\n📊 Categories:', JSON.stringify(categoryCounts));
    console.log(`   Total: ${toMigrate.length} documents\n`);

    if (dryRun) {
        console.log('⚠️  DRY RUN — No changes made.');
        process.exit(0);
    }

    console.log('🔥 Applying changes...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const m of toMigrate) {
        try {
            // Create new document
            const newDocRef = doc(db, 'content', m.newDocId);
            await setDoc(newDocRef, m.data);

            // Delete old doc if ID changed
            if (m.oldId !== m.newDocId) {
                const oldDocRef = doc(db, 'content', m.oldId);
                await deleteDoc(oldDocRef);
            }

            successCount++;
            console.log(`  ✅ ${m.oldId} → ${m.newDocId}`);
        } catch (error) {
            errorCount++;
            console.error(`  ❌ ${m.oldId}: ${error}`);
        }
    }

    console.log(`\n✨ Done! ${successCount} migrated, ${errorCount} errors.`);
}

const isDryRun = process.argv.includes('--dry-run');
migrateContent(isDryRun).then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });
