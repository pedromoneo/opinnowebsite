import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local
const envPath = resolve(__dirname, '..', '.env.local');
try {
    const envContent = readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
        const trimmed = line.trim();
        if (trimmed.length === 0 || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (process.env[key] === undefined) process.env[key] = val;
    }
} catch { /* ignore */ }

async function main() {
    const { getAdminDb } = await import('../src/lib/firebase-admin');
    const { FieldValue } = await import('firebase-admin/firestore');
    const db = getAdminDb();
    const docRef = db.collection('content').doc('en-adaptive-strategy-replacing-five-year-plan');
    await docRef.update({ body: FieldValue.delete() });
    console.log('Deleted stale body field');
}
main().catch(console.error);
