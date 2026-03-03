/**
 * Auto-generate post images using Google's Imagen API via @google/genai SDK.
 * Two-step pipeline:
 *   1. Gemini converts the article title/excerpt into a purely visual scene description
 *      (raw title text NEVER reaches Imagen — prevents text rendering in images)
 *   2. Imagen generates the image from the visual description
 * Uploads result to Firebase Storage.
 */
import { GoogleGenAI } from '@google/genai';

// Configurable via env — tries models in order of preference
const IMAGE_MODELS = (process.env.IMAGE_MODEL || 'imagen-3.0-generate-001,imagen-3.0-generate-002,imagen-4.0-fast-generate-001').split(',');

interface GeneratedImages {
    featuredImage: string;
    thumbnailUrl: string;
    bannerUrl: string;
    headerUrl: string;
}

/**
 * Step 1: Use Gemini to translate the article title/excerpt into a purely visual
 * scene description. This means Imagen never receives the raw title string,
 * preventing it from rendering words as graphic elements in the image.
 */
async function getVisualSceneDescription(
    ai: GoogleGenAI,
    title: string,
    excerpt: string | undefined,
    type: string | undefined,
    palette: string,
): Promise<string> {
    const excerptHint = excerpt ? `\nArticle summary: ${excerpt.slice(0, 300)}` : '';
    const styleHint = type === 'story'
        ? 'warm documentary photography, authentic human moments, candid natural light'
        : 'vibrant editorial photography, dynamic composition, bold and modern';

    const geminiPrompt = `You are a creative director describing a photograph for a magazine.

Convert the following article topic into a purely visual scene description for a stock photo.
CRITICAL RULES:
- Describe ONLY what is physically visible in the scene (objects, people, environment, light, colours)
- Do NOT mention any text, words, letters, signs, screens with text, or written language
- Do NOT use the article title or any words from it literally — translate the concept into visuals
- Do NOT include screen content, books with visible text, whiteboards with text, or any readable characters
- Keep the description to 2-3 sentences maximum

Article topic: ${title}${excerptHint}
Visual style: ${styleHint}
Colour palette to use: ${palette}

Respond with ONLY the visual scene description. No preamble, no labels, no quotes.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: geminiPrompt,
        });
        const description = response.text?.trim();
        if (description && description.length > 20) {
            console.log(`Visual scene description: "${description}"`);
            return description;
        }
    } catch (err) {
        console.warn('Gemini scene description failed, using fallback:', err instanceof Error ? err.message : err);
    }

    // Fallback: generic visual description if Gemini fails
    const styleWord = type === 'story' ? 'candid documentary' : 'editorial';
    return `A ${styleWord} photograph of diverse professionals collaborating in a modern open workspace, ${palette}, cinematic natural lighting.`;
}

/**
 * Step 2: Build the Imagen prompt from the visual scene description.
 * The raw article title is NEVER included here.
 */
function buildImagenPrompt(visualDescription: string, style: string, palette: string): string {
    return [
        'ABSOLUTE RULE: ZERO TEXT. NO WORDS. NO LETTERS. NO NUMBERS. NO SIGNS. NO LABELS. NO LOGOS. NO WATERMARKS. NO CAPTIONS. NO TYPOGRAPHY OF ANY KIND ANYWHERE IN THE IMAGE.',
        'This image must contain purely photographic visual content — no written characters whatsoever.',
        `${visualDescription}`,
        `Visual style: ${style}.`,
        `Colour palette: ${palette}.`,
        'The scene should feel energetic, human, and forward-looking.',
        'Strictly avoid: cold corporate blues, flat greys, glowing circuit boards, data visualisations, sterile offices, clichéd tech aesthetics.',
        'Focus on: people in authentic interaction, rich natural textures, interesting architecture, or abstract patterns evoking creativity.',
        'Photorealistic, cinematic lighting, 16:9 wide composition.',
        'FINAL CHECK: The image must be 100% free of any text, letters, numbers, words, captions, titles, labels, watermarks, logos, signage, or written characters of any kind.',
    ].join(' ');
}

// Varied colour palettes — deliberately excludes ochre, amber, rust, burnt orange,
// saffron, mustard, caramel, burnt sienna, and terracotta (which tend to dominate)
const COLOR_PALETTES = [
    'deep emerald green, sage, soft cream, muted rose, silver',
    'rich burgundy, dusty mauve, warm ivory, antique gold, stone grey',
    'deep sapphire blue, warm white, dove grey, soft coral, pearl',
    'forest green, deep violet, cool white, slate, pale lilac',
    'deep plum, blush pink, champagne, soft lavender, warm grey',
    'cobalt blue, warm sand, terracotta-free beige, deep navy, off-white',
    'charcoal, raspberry red, cool grey, pale pink, crisp white',
    'deep teal, sea green, warm linen, soft mint, natural white',
    'merlot, dusty rose, warm stone, powder blue, cream',
    'dark indigo, electric violet, cool cream, soft periwinkle, light grey',
    'hunter green, pale gold, deep brown, warm white, moss',
    'dark chocolate brown, warm peach, cream, dusty green, natural linen',
];

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
        const ai = new GoogleGenAI({ apiKey });

        // Pick a random palette each call for variety
        const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
        const style = type === 'story'
            ? 'warm documentary photography, authentic human moments, rich natural tones, candid'
            : 'vibrant editorial photography, dynamic composition, rich textures, bold composition';

        // Step 1: Convert title → pure visual scene description (Gemini)
        const visualDescription = await getVisualSceneDescription(ai, title, excerpt, type, palette);

        // Step 2: Build the Imagen prompt from the visual description (no raw title)
        const imagenPrompt = buildImagenPrompt(visualDescription, style, palette);

        // Step 3: Generate image with Imagen
        let imageBytes: string | undefined;
        for (const model of IMAGE_MODELS) {
            try {
                console.log(`Generating image for: "${title}" using model ${model}`);
                const response = await ai.models.generateImages({
                    model: model.trim(),
                    prompt: imagenPrompt,
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
            headerUrl: downloadUrl,
        };
    } catch (error) {
        console.error('Image generation failed:', error instanceof Error ? error.message : error);
        return null;
    }
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
