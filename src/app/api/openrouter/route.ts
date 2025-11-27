import { NextResponse } from "next/server";

// Free models that work without data policy configuration
const FREE_MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "qwen/qwen-2.5-7b-instruct:free",
  "google/gemini-flash-1.5-8b:free",
];

// System prompt for CV/Job application assistant
const SYSTEM_PROMPT = `Bạn là trợ lý AI tiếng Việt chuyên về hồ sơ xin việc và tuyển dụng.

**Phạm vi hỗ trợ:**
- Viết và chỉnh sửa CV/Resume
- Viết thư xin việc (Cover Letter)
- Chuẩn bị phỏng vấn
- Tư vấn kỹ năng và kinh nghiệm
- Mô tả công việc và yêu cầu tuyển dụng

**Quy tắc trả lời:**
- Trả lời NGẮN GỌN, RÕ RÀNG bằng tiếng Việt
- Sử dụng định dạng văn bản thuần túy (plain text)
- Khi cần, hỏi lại để làm rõ thông tin
- Nếu câu hỏi ngoài phạm vi, lịch sự từ chối và mời đặt câu hỏi liên quan`;

// Keywords for topic validation
const ALLOWED_KEYWORDS = [
  "cv", "sơ yếu lý lịch", "resume", "hồ sơ xin việc", "đơn xin việc",
  "cover letter", "thư xin việc", "thư ứng tuyển", "viết cv", "mẫu cv",
  "phỏng vấn", "câu hỏi phỏng vấn", "kinh nghiệm làm việc", "mục tiêu nghề nghiệp",
  "kỹ năng", "tuyển dụng", "xin việc", "ứng tuyển", "jd", "mô tả công việc",
  "job", "interview", "apply", "career", "nghề nghiệp", "việc làm",
  "lương", "salary", "chức vụ", "position", "công ty", "company",
  "xin chào", "hello", "hi", "chào", "giúp", "help", "hỗ trợ"
];

function isAllowedTopic(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  const lowered = text.toLowerCase();
  return ALLOWED_KEYWORDS.some(k => lowered.includes(k));
}

function stripHtml(input: string): string {
  if (typeof input !== "string") return input;
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function buildLocalResponse(message: string) {
  return {
    id: "local-" + Date.now(),
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: "local",
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: message },
        finish_reason: "stop",
      },
    ],
  };
}

async function callOpenRouter(
  apiKey: string,
  model: string,
  messages: any[],
  safeReferer: string,
  safeTitle: string
) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": safeReferer || "http://localhost:3000",
      "X-Title": safeTitle || "CV Assistant",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  return response;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, messages: conversationHistory } = body;

    console.log("[OpenRouter] Request received:", {
      promptLength: prompt?.length,
      historyLength: conversationHistory?.length,
    });

    // Validate API key
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("[OpenRouter] Missing API key");
      // Return helpful message when API key is missing
      return NextResponse.json(
        buildLocalResponse(
          "Xin chào! Tôi là trợ lý CV. Hiện tại hệ thống đang bảo trì.\n\n" +
          "Trong lúc chờ đợi, bạn có thể:\n" +
          "• Tham khảo các mẫu CV có sẵn\n" +
          "• Liên hệ admin để được hỗ trợ trực tiếp\n\n" +
          "Xin lỗi vì sự bất tiện này! 🙏"
        )
      );
    }

    // Validate prompt
    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 2) {
      return NextResponse.json(
        { error: "Vui lòng nhập nội dung tin nhắn" },
        { status: 400 }
      );
    }

    // Check if topic is allowed
    const historyText = Array.isArray(conversationHistory)
      ? conversationHistory.map((m: any) => m?.content || "").join(" ")
      : "";

    const isFirstMessage = !conversationHistory || conversationHistory.length === 0;
    const inScope = isFirstMessage || isAllowedTopic(prompt) || isAllowedTopic(historyText);

    if (!inScope) {
      return NextResponse.json(
        buildLocalResponse(
          "Mình chuyên hỗ trợ về CV, hồ sơ xin việc và phỏng vấn.\n\n" +
          "Bạn có thể hỏi mình về:\n" +
          "• Cách viết CV chuyên nghiệp\n" +
          "• Mẫu thư xin việc\n" +
          "• Chuẩn bị phỏng vấn\n" +
          "• Kỹ năng và kinh nghiệm\n\n" +
          "Hãy đặt câu hỏi liên quan để mình hỗ trợ bạn nhé! 😊"
        )
      );
    }

    // Build messages array
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      // Only keep last 8 messages for context
      const recentHistory = conversationHistory.slice(-8);
      messages.push(...recentHistory);
    }

    messages.push({ role: "user", content: prompt });

    const safeReferer = (process.env.SITE_URL || "http://localhost:3000").replace(/[^\x00-\x7F]/g, "");
    const safeTitle = (process.env.SITE_NAME || "CV Assistant").replace(/[^\x00-\x7F]/g, "");

    // Try each model until one works
    const modelsToTry = [
      process.env.OPENROUTER_MODEL,
      ...FREE_MODELS,
    ].filter(Boolean);

    let lastError: string | null = null;

    for (const model of modelsToTry) {
      try {
        console.log(`[OpenRouter] Trying model: ${model}`);

        const response = await callOpenRouter(apiKey, model!, messages, safeReferer, safeTitle);

        if (response.ok) {
          const data = await response.json();

          if (data.error) {
            console.error(`[OpenRouter] Model ${model} returned error:`, data.error);
            lastError = data.error.message || "API error";
            continue;
          }

          // Clean response content
          if (Array.isArray(data?.choices)) {
            for (const choice of data.choices) {
              const content = choice?.message?.content || choice?.content;
              if (typeof content === "string") {
                if (choice.message) {
                  choice.message.content = stripHtml(content);
                } else {
                  choice.content = stripHtml(content);
                }
              }
            }
          }

          console.log(`[OpenRouter] Success with model: ${model}`);
          return NextResponse.json(data);
        }

        const errorText = await response.text();
        console.error(`[OpenRouter] Model ${model} failed:`, response.status, errorText);
        lastError = errorText;

      } catch (modelError: any) {
        console.error(`[OpenRouter] Model ${model} exception:`, modelError.message);
        lastError = modelError.message;
      }
    }

    // All models failed
    console.error("[OpenRouter] All models failed. Last error:", lastError);
    return NextResponse.json(
      buildLocalResponse(
        "Xin lỗi, mình đang gặp sự cố kỹ thuật.\n\n" +
        "Vui lòng thử lại sau hoặc liên hệ admin để được hỗ trợ trực tiếp. 🙏"
      )
    );

  } catch (error: any) {
    console.error("[OpenRouter] Unexpected error:", error);
    return NextResponse.json(
      buildLocalResponse(
        "Đã có lỗi xảy ra. Vui lòng thử lại sau."
      )
    );
  }
}
