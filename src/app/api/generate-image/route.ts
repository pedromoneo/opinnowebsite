import { NextResponse } from 'next/server';
import { generatePostImages } from '@/lib/generate-images';

export async function POST(req: Request) {
    try {
        const { title, excerpt, type } = await req.json();

        if (!title) {
            return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
        }

        const images = await generatePostImages(title, excerpt, type);

        if (!images) {
            return NextResponse.json({ error: 'Image generation failed. Check GEMINI_API_KEY and model availability.' }, { status: 500 });
        }

        return NextResponse.json({
            thumbnailUrl: images.thumbnailUrl,
            headerUrl: images.thumbnailUrl,   // same image used for both
            featuredImage: images.featuredImage,
        });

    } catch (error: any) {
        console.error('Image generation API error:', error);
        return NextResponse.json(
            { error: 'Error generating image.', details: error.message },
            { status: 500 }
        );
    }
}
