import { NextResponse } from 'next/server';
import { getAdminApp } from '@/lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

export async function POST() {
    try {
        const adminApp = getAdminApp();
        const db = getFirestore(adminApp);

        // Query all content docs
        const snapshot = await db.collection('content').get();

        let fixed = 0;
        const batch = db.batch();

        for (const doc of snapshot.docs) {
            const data = doc.data();
            let changed = false;
            const updates: Record<string, string> = {};

            // Clean content field
            for (const field of ['content', 'htmlContent', 'title', 'excerpt'] as const) {
                const raw = data[field];
                if (typeof raw !== 'string') continue;

                const cleaned = raw
                    .replace(/<!--[\s\S]*?-->/g, '')
                    .replace(/\\\\n/g, '')
                    .replace(/\\n/g, '')
                    .replace(/\\\\_/g, '')
                    .replace(/\\\\\\\\/g, '')
                    .replace(/>\s*n+\s*</g, '><')
                    .replace(/^\s*n+\s*(?=<)/g, '')
                    .replace(/(?<=>)\s*n+\s*$/g, '')
                    .replace(/\bn{3,}\b/g, '')       // remove standalone nnn+ sequences
                    .replace(/\s+n\s+n\s+/g, ' ')    // remove scattered single n's
                    .trim();

                if (cleaned !== raw) {
                    updates[field] = cleaned;
                    changed = true;
                }
            }

            if (changed) {
                batch.update(doc.ref, updates);
                fixed++;
            }
        }

        if (fixed > 0) {
            await batch.commit();
        }

        return NextResponse.json({ success: true, fixed, total: snapshot.size });
    } catch (error: any) {
        console.error('Fix publications error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
