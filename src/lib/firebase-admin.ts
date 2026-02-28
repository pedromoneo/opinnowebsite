import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export function getAdminApp() {
    if (getApps().length > 0) return getApps()[0];

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

    // 1. Try individual env variables first (production)
    let privateKey = (process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\n/g, '\n');
    let clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;

    // Fallback to service account JSON string if provided
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

    // Only attempt cert() if the key looks like a real PEM private key
    if (privateKey && clientEmail && projectId && privateKey.includes('-----BEGIN')) {
        try {
            return initializeApp({
                credential: cert({ projectId, clientEmail, privateKey }),
                storageBucket,
            });
        } catch (certErr) {
            console.warn('Firebase cert() failed, falling back to ADC:',
                certErr instanceof Error ? certErr.message : certErr);
        }
    }

    // 2. Fall back to Application Default Credentials (Firebase CLI login)
    // If GOOGLE_APPLICATION_CREDENTIALS points to a non-existent file (e.g. local path
    // deployed to Cloud Run), clear it so applicationDefault() uses the metadata server
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS && !existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
        delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
    }
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        const adcPath = join(homedir(), '.config', 'firebase', `${(process.env.FIREBASE_AUTH_EMAIL || 'pedro_moneo_gmail.com').replace(/[@.]/g, '_')}_application_default_credentials.json`);
        if (existsSync(adcPath)) {
            process.env.GOOGLE_APPLICATION_CREDENTIALS = adcPath;
        }
    }

    try {
        return initializeApp({
            credential: applicationDefault(),
            projectId,
            storageBucket,
        });
    } catch (e) {
        throw new Error(
            'Missing Firebase Admin configuration. Either:\n' +
            '1. Run "firebase login" to authenticate the CLI, or\n' +
            '2. Add FIREBASE_ADMIN_PRIVATE_KEY and FIREBASE_ADMIN_CLIENT_EMAIL to .env.local'
        );
    }
}

// Export lazy-loaded getters to avoid top-level crashes if env vars are missing
export const getAdminAuth = () => getAuth(getAdminApp());
export const getAdminDb = () => getFirestore(getAdminApp());
