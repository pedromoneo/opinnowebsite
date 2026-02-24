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
            Your task is to generate a compelling, professional, and concise excerpt (2-3 sentences max) for an article based on the provided content.
            
            GUIDELINES:
            1. Keep it brief and impactful (max 250 characters).
            2. Match the Opinno voice: Premium, expert, innovation-focused, and outcome-oriented.
            3. Summarize the main value proposition or insight.
            4. If it's a Case Study, highlight the result.
            5. Return ONLY the plain text of the excerpt. No quotes, no markdown, no other text.
            
            CONTENT TYPE: ${type || 'general article'}
            
            INPUT CONTENT:
            ${content.replace(/<[^>]*>?/gm, ' ')} 
        `;

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-2.0-flash as per user instructions (no 1.5) and disruptor implementation
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        console.log("Excerpt generation successful");
        return NextResponse.json({ excerpt: text });

    } catch (error: any) {
        console.error("Excerpt Generation Error:", error);
        return NextResponse.json(
            { error: 'Internal Server Error', message: error.message },
            { status: 500 }
        );
    }
}
