/**
 * Server-side Firestore query helper.
 * Uses firebase-admin when credentials are available (production),
 * falls back to firebase/firestore/lite (REST-based, no browser APIs)
 * for local development without admin credentials.
 */

import type { WhereFilterOp } from 'firebase-admin/firestore'

type DocResult = { id: string; [key: string]: any }
type Filter = { field: string; op: WhereFilterOp; value: any }

let adminAvailable: boolean | null = null

async function queryViaAdmin(
    collectionPath: string,
    filters: Filter[]
): Promise<DocResult[]> {
    const { getAdminDb } = await import('./firebase-admin')
    const db = getAdminDb()

    let ref: FirebaseFirestore.Query = db.collection(collectionPath)
    for (const f of filters) {
        ref = ref.where(f.field, f.op, f.value)
    }

    const snap = await ref.get()
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

async function queryViaLite(
    collectionPath: string,
    filters: Filter[]
): Promise<DocResult[]> {
    const { collection, query, where, getDocs } = await import('firebase/firestore/lite')
    const db = await getLiteDb()
    const constraints = filters.map(f => where(f.field, f.op as any, f.value))
    const q = query(collection(db, collectionPath), ...constraints)
    const snap = await getDocs(q)
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

/** Helper: initialize lite SDK app once */
async function getLiteDb() {
    const { initializeApp, getApp } = await import('firebase/app')
    const { getFirestore } = await import('firebase/firestore/lite')

    const appName = '__server_lite__'
    let app
    try {
        app = getApp(appName)
    } catch {
        app = initializeApp({
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        }, appName)
    }
    return getFirestore(app)
}

/**
 * Query a Firestore collection with filters. Works in both production
 * (firebase-admin) and local dev (firebase/firestore/lite).
 */
export async function queryCollection(
    collectionPath: string,
    filters: Filter[]
): Promise<DocResult[]> {
    // Try admin SDK first (cached check)
    if (adminAvailable !== false) {
        try {
            const result = await queryViaAdmin(collectionPath, filters)
            adminAvailable = true
            return result
        } catch {
            adminAvailable = false
        }
    }

    // Fallback to lite SDK
    try {
        return await queryViaLite(collectionPath, filters)
    } catch (err) {
        console.error('Firestore query failed:', err)
        return []
    }
}

/**
 * Get a single Firestore document by ID. Works in both production
 * (firebase-admin) and local dev (firebase/firestore/lite).
 */
export async function getDocument(
    collectionPath: string,
    docId: string
): Promise<DocResult | null> {
    // Try admin SDK first
    if (adminAvailable !== false) {
        try {
            const { getAdminDb } = await import('./firebase-admin')
            const snap = await getAdminDb().collection(collectionPath).doc(docId).get()
            adminAvailable = true
            return snap.exists ? { id: snap.id, ...snap.data() } : null
        } catch {
            adminAvailable = false
        }
    }

    // Fallback to lite SDK
    try {
        const { doc, getDoc } = await import('firebase/firestore/lite')
        const db = await getLiteDb()
        const snap = await getDoc(doc(db, collectionPath, docId))
        return snap.exists() ? { id: snap.id, ...snap.data() } : null
    } catch (err) {
        console.error('Firestore getDocument failed:', err)
        return null
    }
}
