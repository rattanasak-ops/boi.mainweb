import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { AI_MODELS, DEFAULT_MODEL } from "@/lib/ai/models";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MAX_MESSAGES = 20; // limit conversation history sent to API

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { messages, model: modelId, locale = "th" } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    // Validate model
    const selectedModel =
      AI_MODELS.find((m) => m.id === modelId) || DEFAULT_MODEL;

    // Build system prompt with locale-aware Arai personality
    const systemPrompt = buildSystemPrompt(locale);

    // Trim conversation history to prevent token overflow
    const trimmedMessages = messages.slice(-MAX_MESSAGES);

    const openRouterBody = {
      model: selectedModel.id,
      messages: [
        { role: "system", content: systemPrompt },
        ...trimmedMessages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      stream: true,
      max_tokens: 1024,
      temperature: 0.7,
    };

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://www.boi.go.th",
        "X-Title": "BOI AI Assistant - Arai",
      },
      body: JSON.stringify(openRouterBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Arai API] OpenRouter error:", response.status, errorText);
      return NextResponse.json(
        { error: "AI service temporarily unavailable" },
        { status: 502 }
      );
    }

    // Stream the response back to client
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;

              const data = trimmed.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(
                    new TextEncoder().encode(
                      `data: ${JSON.stringify({ content })}\n\n`
                    )
                  );
                }
              } catch {
                // Skip malformed JSON chunks
              }
            }
          }
        } catch (err) {
          console.error("[Arai API] Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("[Arai API] Request error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
