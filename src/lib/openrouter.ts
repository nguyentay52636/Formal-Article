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
    const safeTitle = (process.env.SITE_NAME || "CV & Job Application Assistant").replace(/[^\x00-\x7F]/g, "");

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
              "Bạn là trợ lý tiếng Việt chuyên về hồ sơ xin việc: CV, resume, cover letter, thư xin việc, thư ứng tuyển, email ứng tuyển, mô tả kinh nghiệm/kỹ năng, và chuẩn bị phỏng vấn. Trả lời NGẮN GỌN, RÕ RÀNG, CHỈ THUẦN VĂN BẢN (plain text), KHÔNG dùng HTML/Markdown. Nếu câu hỏi không liên quan tới xin việc/CV/phỏng vấn, hãy lịch sự từ chối và đề nghị người dùng đặt câu hỏi liên quan.",
          },
          {
            role: "user",
            content:
              prompt ||
              "Hãy giúp tôi viết một CV ngắn gọn cho vị trí Nhân viên Kế toán (1 năm kinh nghiệm), tập trung vào kỹ năng và thành tích.",
          },
        ],
        temperature: 0.6,
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