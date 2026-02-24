/**
 * Auto-generate post images using Google's Imagen API via @google/genai SDK.
 * Generates a single 16:9 image and uploads it to Firebase Storage.
 */
import { GoogleGenAI } from '@google/genai';

// Configurable via env — default to Imagen 3, can switch to newer models
const IMAGE_MODEL = process.env.IMAGE_MODEL || 'imagen-3.0-generate-002';

interface GeneratedImages {
    featuredImage: string;
    thumbnailUrl: string;
    bannerUrl: string;
}

/**
 * Generate post images from the title/excerpt and upload to Firebase Storage.
 * Returns null on any failure (non-blocking — post still publishes without images).
 */
export async function generatePostImages(
    title: string,
    excerpt?: string,
    type?: string
): Promise<GeneratedImages | null> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn('GEMINI_API_KEY not configured, skipping image generation');
        return null;
    }

    try {
        const prompt = buildPrompt(title, excerpt, type);
        console.log(`Generating image for: "${title}" using model ${IMAGE_MODEL}`);

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateImages({
            model: IMAGE_MODEL,
            prompt,
            config: {
                numberOfImages: 1,
                aspectRatio: '16:9',
            },
        });

        const imageBytes = response?.generatedImages?.[0]?.image?.imageBytes;
        if (!imageBytes) {
            console.warn('Image generation returned no image data');
            return null;
        }

        const imageBuffer = Buffer.from(imageBytes, 'base64');

        // Upload to Firebase Storage
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
        const timestamp = Date.now();
        const filePath = `images/generated/${timestamp}_${slug}.png`;
        const downloadUrl = await uploadToStorage(imageBuffer, filePath);

        console.log(`Image generated and uploaded: ${filePath}`);

        // Use same image for all fields (CSS handles sizing)
        return {
            featuredImage: downloadUrl,
            thumbnailUrl: downloadUrl,
            bannerUrl: downloadUrl,
        };
    } catch (error) {
        console.error('Image generation failed:', error instanceof Error ? error.message : error);
        return null;
    }
}

function buildPrompt(title: string, excerpt?: string, type?: string): string {
    const context = excerpt ? ` The article discusses: ${excerpt.slice(0, 200)}` : '';
    const style = type === 'story'
        ? 'documentary photography style, authentic, human-centric'
        : 'modern corporate editorial style, clean, professional';

    return `Professional high-quality editorial photograph for a corporate innovation blog post titled "${title}".${context} Style: ${style}. The image should be visually compelling with subtle technology and innovation themes. No text overlay, no watermarks, no logos. Photorealistic, well-lit, balanced composition.`;
}

async function uploadToStorage(imageBuffer: Buffer, path: string): Promise<string> {
    const { getAdminApp } = await import('./firebase-admin');
    const { getStorage } = await import('firebase-admin/storage');

    const app = getAdminApp();
    const bucket = getStorage(app).bucket();
    const file = bucket.file(path);
    const token = crypto.randomUUID();

    await file.save(imageBuffer, {
        metadata: {
            contentType: 'image/png',
            metadata: {
                firebaseStorageDownloadTokens: token,
            },
        },
    });

    // Construct Firebase Storage download URL
    const bucketName = bucket.name;
    const encodedPath = encodeURIComponent(path);
    return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedPath}?alt=media&token=${token}`;
}
