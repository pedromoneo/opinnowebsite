/**
 * Auto-generate post images using Google's Imagen API via @google/genai SDK.
 * Generates a single 16:9 image and uploads it to Firebase Storage.
 */
import { GoogleGenAI } from '@google/genai';

// Configurable via env — tries models in order of preference
const IMAGE_MODELS = (process.env.IMAGE_MODEL || 'imagen-3.0-generate-001,imagen-3.0-generate-002,imagen-4.0-fast-generate-001').split(',');

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
        const ai = new GoogleGenAI({ apiKey });

        // Try each model until one succeeds
        let imageBytes: string | undefined;
        for (const model of IMAGE_MODELS) {
            try {
                console.log(`Generating image for: "${title}" using model ${model}`);
                const response = await ai.models.generateImages({
                    model: model.trim(),
                    prompt,
                    config: {
                        numberOfImages: 1,
                        aspectRatio: '16:9',
                    },
                });
                imageBytes = response?.generatedImages?.[0]?.image?.imageBytes;
                if (imageBytes) break;
            } catch (modelErr) {
                console.warn(`Model ${model} failed, trying next:`, modelErr instanceof Error ? modelErr.message : modelErr);
            }
        }

        if (!imageBytes) {
            console.warn('Image generation returned no image data from any model');
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
    const context = excerpt ? ` The article is about: ${excerpt.slice(0, 200)}` : '';
    const style = type === 'story'
        ? 'warm documentary photography, authentic human moments, rich natural tones, candid'
        : 'vibrant editorial photography, dynamic composition, warm earthy tones, rich textures';

    return `A striking editorial photograph for an innovation consultancy article titled "${title}".${context} Visual style: ${style}. The image should feel energetic, human, and forward-looking. Use warm, rich colour palettes — terracotta, amber, sage green, ochre, warm white — avoid cold blues, grey tech backgrounds, and generic corporate stock aesthetics. Focus on people collaborating, natural textures, architectural details, or abstract patterns that evoke creativity and transformation. CRITICAL RULE: The image must contain absolutely zero text, letters, numbers, words, captions, titles, labels, watermarks, logos, signage, or written characters of any kind. Pure visual imagery only, no typography anywhere in the frame. Photorealistic, cinematic lighting, 16:9 composition.`;
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
