import { NextResponse } from "next/server";

export async function GET() {
    try {
        const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

        // DEBUG LOGGING: Check if keys exist (do not log values)
        console.log("DEBUG: API Key Check", {
            hasOpenAI: !!process.env.OPENAI_API_KEY,
            hasNextPublic: !!process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            envKeys: Object.keys(process.env).filter(key => key.includes('OPENAI') || key.includes('GPT'))
        });

        if (!apiKey) {
            console.error("DEBUG: API Key is MISSING");
            throw new Error("OPENAI_API_KEY is not defined");
        }

        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey.trim()}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-realtime-preview-2024-12-17",
                voice: "echo",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`OpenAI API Error: ${response.status} ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        // Return the client_secret which is the ephemeral token
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Session creation failed:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
