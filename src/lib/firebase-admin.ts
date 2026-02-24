import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export function getAdminApp() {
    if (getApps().length > 0) return getApps()[0];

    // Try individual variables first
    let privateKey = (process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\n/g, '\n');
    let clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

    // Fallback to service account JSON string if provided (common in some environments)
    const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.FBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountVar && (!privateKey || !clientEmail)) {
        try {
            const serviceAccount = JSON.parse(serviceAccountVar);
            privateKey = serviceAccount.private_key;
            clientEmail = serviceAccount.client_email;
        } catch (e) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', e);
        }
    }

    if (!privateKey || !clientEmail || !projectId) {
        throw new Error(
            'Missing Firebase Admin configuration. To fix this:\n' +
            '1. Go to Firebase Console > Project Settings > Service Accounts\n' +
            '2. Generate a new private key and download the JSON\n' +
            '3. Add FIREBASE_ADMIN_PRIVATE_KEY and FIREBASE_ADMIN_CLIENT_EMAIL to your .env.local\n' +
            '   or add the whole JSON as FIREBASE_SERVICE_ACCOUNT_KEY.'
        );
    }

    return initializeApp({
        credential: cert({
            projectId,
            clientEmail,
            privateKey,
        }),
    });
}

// Export lazy-loaded getters to avoid top-level crashes if env vars are missing
export const getAdminAuth = () => getAuth(getAdminApp());
export const getAdminDb = () => getFirestore(getAdminApp());
