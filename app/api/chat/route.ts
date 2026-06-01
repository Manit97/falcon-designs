import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_KEY) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 });
  }

  try {
    const body = await req.json() as {
      messages: { role: "user" | "assistant"; content: string }[];
      systemPrompt?: string;
    };

    const { messages, systemPrompt } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Hard cap — keep demos snappy and cheap
    const lastMessages = messages.slice(-10);

    const stream = await anthropic.messages.stream({
      model: "claude-haiku-4-5",
      max_tokens: 350,
      system: systemPrompt ?? "You are a helpful assistant.",
      messages: lastMessages,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
