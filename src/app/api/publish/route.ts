import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
        },
    });
}

export async function POST(req: Request) {
    try {
        // API Key Validation
        const apiKey = req.headers.get('x-api-key');
        const validApiKey = process.env.CMS_API_KEY;

        if (!validApiKey) {
            console.error('CMS_API_KEY not configured on server.');
            return NextResponse.json({ error: 'CMS_API_KEY not configured on server.' }, { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
        }

        if (apiKey !== validApiKey) {
            return NextResponse.json({ error: 'Unauthorized.' }, { status: 401, headers: { 'Access-Control-Allow-Origin': '*' } });
        }

        const body = await req.json();
        const { type, data } = body;

        if (!data) {
            return NextResponse.json({ error: 'Missing data in request body.' }, { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } });
        }

        // In this project, all content goes into the 'content' collection
        const collectionName = 'content';

        // Use provided ID or generate one from lang and slug to match the dynamic route lookup
        // Lookup format in [...slug]/page.tsx is: `${lang}-${actualSlug}`
        let docId = data.id || null;
        if (!docId && data.lang && data.slug) {
            const actualSlug = data.slug.split('/').pop();
            docId = `${data.lang}-${actualSlug}`;
        }

        const db = getAdminDb();
        const docRef = docId
            ? db.collection(collectionName).doc(docId)
            : db.collection(collectionName).doc();

        const timestamp = FieldValue.serverTimestamp();

        // Prepare document data
        const docData = {
            ...data,
            createdAt: data.createdAt || timestamp,
            updatedAt: timestamp,
            status: data.status || 'draft',
            // Default type to provided type or data.type or 'post'
            type: type || data.type || 'post',
        };

        // If publishedAt is not provided, use timestamp
        if (!docData.publishedAt) {
            docData.publishedAt = timestamp;
        }

        await docRef.set(docData, { merge: true });

        console.log(`Content published successfully: ${docRef.id} in collection ${collectionName}`);

        return NextResponse.json({
            success: true,
            id: docRef.id,
            message: `Content published successfully to ${collectionName}`,
            path: docRef.path
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
            }
        });

    } catch (error: any) {
        console.error('Publish API Error:', error);
        return NextResponse.json(
            { error: 'Error publishing content.', details: error.message },
            { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
        );
    }
}
