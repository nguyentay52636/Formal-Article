import { NextResponse } from "next/server";

async function openrouterApi(req: Request) {
  try {
    const body = await req.json();
    const { prompt, messages: conversationHistory } = body;

    console.log("[OpenRouter API] Received request:", { 
      hasPrompt: !!prompt, 
      promptLength: prompt?.length,
      historyLength: conversationHistory?.length 
    });

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("[OpenRouter API] Missing API key");
      return NextResponse.json(
        { error: "Thiếu OPENROUTER_API_KEY trên server" },
        { status: 500 }
      );
    }

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return NextResponse.json(
        { error: "Prompt không hợp lệ" },
        { status: 400 }
      );
    }

    const safeReferer = (process.env.SITE_URL || "").replace(/[^\x00-\x7F]/g, "");
    const safeTitle = (process.env.SITE_NAME || "CV & Job Application Assistant").replace(
      /[^\x00-\x7F]/g,
      ""
    );

    // Topic scoping: allow only CV/job application/interview related queries
    function isAllowedTopic(text: string): boolean {
      if (!text || typeof text !== "string") return false;
      const lowered = text.toLowerCase();
      const keywords = [
        // Vietnamese
        "cv", "sơ yếu lý lịch", "resume", "hồ sơ xin việc", "đơn xin việc", "cover letter",
        "thư xin việc", "thư ứng tuyển", "viết cv", "mẫu cv", "mẫu đơn xin việc",
        "phỏng vấn", "câu hỏi phỏng vấn", "kinh nghiệm làm việc", "mục tiêu nghề nghiệp",
        "kỹ năng", "kinh nghiệm", "tuyển dụng", "xin việc", "ứng tuyển", "jd", "mô tả công việc",
        // English fallbacks
        "job", "interview", "cv ", "resume", "cover letter", "apply",
      ];
      return keywords.some(k => lowered.includes(k));
    }

    function buildLocalChoicesResponse(message: string) {
      return {
        id: "local",
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: process.env.OPENROUTER_MODEL || "deepseek/deepseek-chat",
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: message },
            finish_reason: "stop",
          },
        ],
      };
    }

    // If prompt and history are not about allowed topics, short-circuit with guidance
    const historyTexts = Array.isArray(conversationHistory)
      ? conversationHistory.map((m: any) => (typeof m?.content === "string" ? m.content : "")).join(" \n ")
      : "";

    const inScope = isAllowedTopic(prompt || "") || isAllowedTopic(historyTexts);
    if (!inScope) {
      const guidance =
        "Mình chỉ hỗ trợ các chủ đề liên quan đến hồ sơ xin việc: CV/Resume, đơn/cover letter, email ứng tuyển, mô tả kinh nghiệm/kỹ năng và chuẩn bị phỏng vấn. Vui lòng đặt câu hỏi liên quan để mình hỗ trợ tốt nhất.";
      return NextResponse.json(buildLocalChoicesResponse(guidance));
    }

    const messages = [
      {
        role: "system",
        content:
          "Bạn là trợ lý tiếng Việt chuyên về hồ sơ xin việc (CV/Resume), đơn/cover letter, email ứng tuyển, mô tả kinh nghiệm/kỹ năng và chuẩn bị phỏng vấn.\n" +
          "- Trả lời NGẮN GỌN, RÕ RÀNG, CHỈ THUẦN VĂN BẢN (plain text), KHÔNG dùng HTML/Markdown.\n" +
          "- Khi cần, hãy hỏi lại để làm rõ thông tin (vị trí, kinh nghiệm, kỹ năng nổi bật).\n" +
          "- Nếu câu hỏi ngoài phạm vi xin việc/CV/phỏng vấn, hãy lịch sự từ chối và mời đặt câu hỏi liên quan.",
      },
    ];

    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      messages.push(...conversationHistory);
    }
    messages.push({
      role: "user",
      content: prompt,
    });

    const defaultModel = "deepseek/deepseek-chat";
    const model = process.env.OPENROUTER_MODEL || defaultModel;

    const requestBody = {
      model: model,
      messages: messages,
      temperature: 0.7,
    };

    console.log("[OpenRouter API] Calling OpenRouter with model:", requestBody.model);
    console.log("[OpenRouter API] Messages count:", messages.length);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": safeReferer || "http://localhost:3000",
        "X-Title": safeTitle || "Sai Gon Culinary Hub",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("[OpenRouter API] Response status:", response.status);

    if (!response.ok) {
      const err = await response.text();
      console.error("[OpenRouter API] Error response:", err);
      
      // Nếu lỗi 404 về data policy, thử model fallback
      if (response.status === 404 && err.includes("data policy")) {
        console.log("[OpenRouter API] Model requires privacy settings, trying fallback model...");
        
        // Thử với model fallback không yêu cầu privacy settings
        const fallbackModels = [
          "meta-llama/llama-3.2-3b-instruct:free",
          "google/gemini-flash-1.5-8b:free",
          "qwen/qwen-2.5-7b-instruct:free"
        ];
        
        for (const fallbackModel of fallbackModels) {
          console.log(`[OpenRouter API] Trying fallback model: ${fallbackModel}`);
          
          const fallbackResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "HTTP-Referer": safeReferer || "http://localhost:3000",
              "X-Title": safeTitle || "Sai Gon Culinary Hub",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: fallbackModel,
              messages: messages,
              temperature: 0.7,
            }),
          });
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            console.log("[OpenRouter API] Fallback model succeeded");
            
            function stripHtml(input: string) {
              if (typeof input !== "string") return input;
              const withoutTags = input.replace(/<[^>]*>/g, " ");
              const replaced = withoutTags
                .replace(/&nbsp;/g, " ")
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&#39;/g, "'")
                .replace(/&quot;/g, '"');
              return replaced.replace(/\s+/g, " ").trim();
            }
            
            if (Array.isArray(fallbackData?.choices) && fallbackData.choices.length > 0) {
              for (const choice of fallbackData.choices) {
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
            
            return NextResponse.json(fallbackData);
          }
        }
        
        return NextResponse.json(
          { 
            error: "Model yêu cầu cấu hình privacy settings. Vui lòng truy cập https://openrouter.ai/settings/privacy để cấu hình, hoặc sử dụng model khác trong biến môi trường OPENROUTER_MODEL" 
          },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: err || "OpenRouter error" },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log("[OpenRouter API] Response received, choices count:", data?.choices?.length);

    if (data.error) {
      console.error("[OpenRouter API] Error in response:", data.error);
      return NextResponse.json(
        { error: data.error.message || "OpenRouter API error" },
        { status: 500 }
      );
    }

    function stripHtml(input: string) {
      if (typeof input !== "string") return input;
      const withoutTags = input.replace(/<[^>]*>/g, " ");
      const replaced = withoutTags
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');
      return replaced.replace(/\s+/g, " ").trim();
    }
    if (Array.isArray(data?.choices) && data.choices.length > 0) {
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

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Lỗi khi gọi OpenRouter API" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  return openrouterApi(req);
}
