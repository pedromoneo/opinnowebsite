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

// Rotate through varied colour palettes so images don't all look the same
const COLOR_PALETTES = [
    'deep forest greens, moss, jade, warm cream, burnt sienna accents',
    'rich burgundy, dusty rose, warm taupe, gold, ivory',
    'saffron yellow, paprika red, sand, warm brown, off-white',
    'deep teal, coral, warm sand, terracotta, soft peach',
    'indigo, lavender, warm stone, copper accents, cream',
    'olive green, mustard, rust, warm grey, linen white',
    'deep plum, blush pink, warm tan, bronze, champagne',
    'forest green, burnt orange, ochre, dark wood, cream',
    'charcoal, warm amber, caramel, ivory, soft gold',
    'peacock blue, saffron, rich brown, warm white, coral accents',
];

function buildPrompt(title: string, excerpt?: string, type?: string): string {
    const context = excerpt ? ` Thematic context: ${excerpt.slice(0, 200)}.` : '';
    const style = type === 'story'
        ? 'warm documentary photography, authentic human moments, rich natural tones, candid'
        : 'vibrant editorial photography, dynamic composition, rich textures, bold composition';

    // Pick a random palette each time so images vary
    const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];

    return `NO TEXT. NO WORDS. NO LETTERS. NO NUMBERS. NO SIGNS. NO LABELS. NO LOGOS. ZERO TYPOGRAPHY OF ANY KIND ANYWHERE IN THE IMAGE. Pure photographic imagery only. A striking editorial photograph inspired by the theme: ${title}.${context} Visual style: ${style}. Colour palette: ${palette}. The image should feel energetic, human, and forward-looking. Avoid cold blues, flat greys, generic tech backdrops, and clichéd corporate or AI aesthetics (no glowing circuit boards, no data visualisations, no sterile offices). Focus on people collaborating, natural textures, architectural details, or abstract patterns that evoke creativity and transformation. Photorealistic, cinematic lighting, 16:9 composition. REMINDER: The final image must be 100% free of any text, letters, numbers, words, captions, titles, labels, watermarks, logos, signage, or written characters of any kind.`;
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
