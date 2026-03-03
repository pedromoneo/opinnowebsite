import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { generatePostImages } from '@/lib/generate-images';
import { GoogleGenAI } from '@google/genai';

/**
 * Generate a LinkedIn-optimized social post using Gemini AI.
 * Returns the post text or null if generation fails (non-blocking).
 */
async function generateSocialPost(
    title: string,
    excerpt: string | undefined,
    content: string | undefined,
    lang: string,
    postUrl: string,
): Promise<string | null> {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.warn('GEMINI_API_KEY not set — skipping social post generation.');
            return null;
        }

        const ai = new GoogleGenAI({ apiKey });

        // Use excerpt or first 2000 chars of content for context
        const contentSnippet = excerpt || (content ? content.replace(/<[^>]*>?/gm, ' ').substring(0, 2000) : '');

        const langInstructions = lang === 'es'
            ? 'Write the post in Spanish.'
            : lang === 'it'
                ? 'Write the post in Italian.'
                : 'Write the post in English.';

        const prompt = `
You are a social media expert for Opinno, a global innovation consultancy.
Generate a LinkedIn post for the following article.

GUIDELINES:
1. Professional, engaging tone that matches LinkedIn best practices.
2. Start with a hook — a provocative question, bold statement, or surprising insight.
3. Keep it concise: 150-250 words max.
4. Use short paragraphs and line breaks for readability.
5. Include 3-5 relevant hashtags at the end (e.g., #Innovation #Technology #Strategy).
6. Do NOT include the article link — it will be added automatically.
7. Do NOT use markdown formatting, emojis in excess, or clickbait language.
8. ${langInstructions}

ARTICLE TITLE: ${title}
ARTICLE SUMMARY: ${contentSnippet}

Return ONLY the social post text. No quotes, no labels, no extra formatting.
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text?.trim();
        if (text && text.length > 20) {
            return text;
        }
        return null;
    } catch (error: any) {
        console.error('Social post generation failed (non-blocking):', error.message);
        return null;
    }
}

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

        const nowISO = new Date().toISOString();

        // Normalize field names: accept "body" or "content" for HTML content
        if (data.body && !data.content) {
            data.content = data.body;
            delete data.body;
        }

        // Auto-generate images if none provided
        const hasImages = data.featuredImage || data.thumbnailUrl || data.bannerUrl;
        let generatedImages: { featuredImage?: string; thumbnailUrl?: string; bannerUrl?: string; headerUrl?: string } = {};
        if (!hasImages && data.title) {
            const contentType = type || data.type || 'post';
            const images = await generatePostImages(data.title, data.excerpt, contentType);
            if (images) {
                generatedImages = images;
            }
        }

        // Generate social post for LinkedIn (non-blocking — won't fail the publish)
        let socialPosts: Record<string, string> = {};
        if (data.socialPosts?.linkedin) {
            // If the caller already provides a social post, use it
            socialPosts = data.socialPosts;
        } else if (data.title) {
            const postLang = data.lang || 'en';
            // Build a preliminary URL for context (exact URL assembled after slugPath derivation)
            const linkedinPost = await generateSocialPost(
                data.title,
                data.excerpt,
                data.content || data.htmlContent,
                postLang,
                '', // URL not needed in prompt — will be added by feed consumer
            );
            if (linkedinPost) {
                socialPosts = { linkedin: linkedinPost };
            }
        }

        // Derive category, subCategory, and slugPath from cmsCategory
        // Always derive internal category from cmsCategory — never trust raw data.category
        // as it may contain CMS display names (e.g. 'article') that don't match internal values
        const cmsCategory = (data.cmsCategory || data.category || 'insights').toLowerCase();

        let derivedCategory: string;
        if (cmsCategory === 'news' || cmsCategory === 'impact stories' || cmsCategory === 'press releases') {
            derivedCategory = 'story';
        } else {
            // 'insights', 'article', 'voices', 'publications' all map to 'insights'
            derivedCategory = 'insights';
        }

        let derivedSubCategory: string;
        if (cmsCategory === 'news') {
            derivedSubCategory = 'news';
        } else if (cmsCategory === 'impact stories') {
            derivedSubCategory = 'impact';
        } else if (cmsCategory === 'press releases') {
            derivedSubCategory = 'press-releases';
        } else if (cmsCategory === 'voices') {
            derivedSubCategory = 'voices';
        } else if (cmsCategory === 'publications') {
            derivedSubCategory = 'publications';
        } else {
            // 'insights', 'article', or any other defaults to 'insights'
            derivedSubCategory = 'insights';
        }

        let derivedSlugPath = data.slugPath;
        if (!derivedSlugPath && data.slug) {
            const slug = data.slug.split('/').pop();
            derivedSlugPath = derivedCategory === 'story' ? `story/${slug}` : `insights/${slug}`;
        }

        // Prepare document data with normalized fields
        const docData = {
            ...data,
            ...generatedImages,
            createdAt: data.createdAt || nowISO,
            updatedAt: nowISO,
            publishedAt: data.publishedAt || nowISO,
            status: data.status || 'published',
            type: type || data.type || 'post',
            cmsCategory: cmsCategory,
            category: derivedCategory,
            subCategory: derivedSubCategory,
            ...(derivedSlugPath ? { slugPath: derivedSlugPath } : {}),
            ...(Object.keys(socialPosts).length > 0 ? { socialPosts } : {}),
        };

        await docRef.set(docData, { merge: true });

        console.log(`Content published successfully: ${docRef.id} in collection ${collectionName}`);

        return NextResponse.json({
            success: true,
            id: docRef.id,
            message: `Content published successfully to ${collectionName}`,
            path: docRef.path,
            imagesGenerated: Object.keys(generatedImages).length > 0,
            socialPostGenerated: Object.keys(socialPosts).length > 0,
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
