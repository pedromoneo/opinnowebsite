/**
 * One-time script to fix the existing "Designing for Uncertainty" document.
 * - Rename `body` → `content`
 * - Convert Firestore Timestamps to ISO strings
 * - Add missing `cmsCategory`
 *
 * Run: npx tsx scripts/fix-existing-doc.ts
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local manually (no dotenv dependency)
const envPath = resolve(__dirname, '..', '.env.local');
try {
    const envContent = readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
    }
} catch { /* .env.local may not exist */ }

async function main() {
    const { getAdminDb } = await import('../src/lib/firebase-admin');
    const db = getAdminDb();

    const docId = 'en-adaptive-strategy-replacing-five-year-plan';
    const docRef = db.collection('content').doc(docId);
    const doc = await docRef.get();

    if (!doc.exists) {
        console.log('Document not found:', docId);
        return;
    }

    const data = doc.data()!;
    const updates: Record<string, any> = {};

    // Rename body → content
    if (data.body && !data.content) {
        updates.content = data.body;
        console.log('Will rename body → content');
    }

    // Convert Firestore Timestamps to ISO strings
    for (const field of ['createdAt', 'publishedAt', 'updatedAt']) {
        const val = data[field];
        if (val && typeof val.toDate === 'function') {
            updates[field] = val.toDate().toISOString();
            console.log(`Will convert ${field} Timestamp → ISO string`);
        }
    }

    // Add missing category
    if (!data.cmsCategory) {
        updates.cmsCategory = 'article';
        console.log('Will add cmsCategory: article');
    }

    if (Object.keys(updates).length === 0) {
        console.log('No updates needed');
        return;
    }

    console.log(`\nApplying ${Object.keys(updates).length} updates to ${docId}...`);
    await docRef.update(updates);
    console.log('Done! Updated fields:', Object.keys(updates).join(', '));
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
