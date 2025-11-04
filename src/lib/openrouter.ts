import { NextResponse } from "next/server";

async function openrouterApi(req: Request) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Thiếu OPENROUTER_API_KEY trên server" }, { status: 500 });
    }

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return NextResponse.json({ error: "Prompt không hợp lệ" }, { status: 400 });
    }

    const safeReferer = (process.env.SITE_URL || "").replace(/[^\x00-\x7F]/g, "");
    const safeTitle = (process.env.SITE_NAME || "Formal Frontend").replace(/[^\x00-\x7F]/g, "");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": safeReferer,
        "X-Title": safeTitle,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "deepseek/deepseek-chat-v3.1:free",
        messages: [
          {
            role: "system",
            content:
              "Bạn là trợ lý viết đơn mẫu tiếng Việt. Trả về NỘI DUNG THUẦN VĂN BẢN (plain text), KHÔNG dùng HTML hoặc Markdown.",
          },
          {
            role: "user",
            content: prompt || "Viết một đơn xin nghỉ phép lịch sự, đầy đủ các phần cần thiết.",
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err || "OpenRouter error" }, { status: response.status });
    }

    const data = await response.json();

    // Đảm bảo trả về nội dung dạng text (loại bỏ mọi thẻ HTML nếu có)
    function stripHtml(input: string) {
      // Loại bỏ thẻ
      const withoutTags = input.replace(/<[^>]*>/g, " ")
      // Decode các entity phổ biến đơn giản
      const replaced = withoutTags
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
      // Thu gọn khoảng trắng
      return replaced.replace(/\s+/g, " ").trim()
    }

    if (Array.isArray(data?.choices)) {
      for (const choice of data.choices) {
        const original = choice?.message?.content
        if (typeof original === "string") {
          choice.message.content = stripHtml(original)
        }
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: "Lỗi khi gọi OpenRouter API" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  return openrouterApi(req);
}