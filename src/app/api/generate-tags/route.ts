import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
    try {
        const { content, title } = await req.json();

        if (!content) {
            return NextResponse.json({ error: "No content provided." }, { status: 400 });
        }

        // Initialize Gemini. It will pick up process.env.GEMINI_API_KEY automatically
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const modelInfo = { model: 'gemini-2.5-flash' };

        // We ask Gemini to generate 5 precise, short tags based on the content.
        const prompt = `
            Analyze the following article for a consulting firm named Opinno. 
            Title: ${title || 'No Title'}
            Content: ${content.substring(0, 8000)} // truncate to avoid massive payload
            
            Based on the content above, generate exactly 5 precise, relevant taxonomy tags consisting of 1-3 words each. 
            Provide the result as a comma-separated list of strings. DO NOT output any extra text, markdown, or explanations.
            Example format: artificial intelligence, corporate innovation, startup, venture building, strategy
        `;

        const response = await ai.models.generateContent({
            model: modelInfo.model,
            contents: prompt,
        });

        const textOutput = response.text || '';

        // Clean up and format the response to an array of strings
        const tags = textOutput
            .split(',')
            .map((tag: string) => tag.trim().toLowerCase())
            .filter((tag: string) => tag.length > 0);

        return NextResponse.json({ tags });

    } catch (error: any) {
        console.error("AI Tag Generation Error:", error);
        return NextResponse.json(
            { error: "Error generating tags.", details: error.message },
            { status: 500 }
        );
    }
}
