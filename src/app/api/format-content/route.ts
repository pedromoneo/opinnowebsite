import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
    try {
        const { content, type } = await req.json();

        if (!content) {
            return NextResponse.json({ error: 'Missing content' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
        }

        const prompt = `
            You are a professional editor for Opinno, a global innovation consultancy.
            Your task is to take the provided text and format it into clean, semantic HTML suitable for a rich text editor (TipTap).
            
            GUIDELINES:
            1. Convert any Markdown-style formatting (bolds, italics, bullets, numbers, headings) into clean HTML tags (<strong>, <em>, <ul>/<li>, <ol>/<li>, <h1>, <h2>).
            2. Improve the structure and readability while maintaining the original meaning.
            3. Use a professional, premium consulting tone consistent with Opinno.
            4. If the input is already HTML, clean it up and ensure professional formatting.
            5. IMPORTANT: Return ONLY the formatted HTML content. Do not include markdown code blocks, preamble, or any other text.
            
            CONTENT TYPE: ${type || 'general article'}
            
            INPUT CONTENT:
            ${content}
        `;

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-2.0-flash as per user instructions (no 1.5) and disruptor implementation
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up any accidental markdown blocks that Gemini might return
        let cleanHtml = text.trim();
        if (cleanHtml.startsWith('```html')) {
            cleanHtml = cleanHtml.replace(/^```html\n?/, '').replace(/\n?```$/, '');
        } else if (cleanHtml.startsWith('```')) {
            cleanHtml = cleanHtml.replace(/^```\n?/, '').replace(/\n?```$/, '');
        }

        console.log("Formatting successful");
        return NextResponse.json({ formattedHtml: cleanHtml });

    } catch (error: any) {
        console.error("Formatting Error:", error);
        return NextResponse.json(
            { error: 'Internal Server Error', message: error.message },
            { status: 500 }
        );
    }
}
