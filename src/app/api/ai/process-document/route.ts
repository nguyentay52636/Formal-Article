import { NextResponse } from "next/server";

type ProcessDocRequest = {
  content?: string;
  fileName?: string;
};

function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function POST(req: Request) {
  try {
    const { content = "", fileName = "" } = (await req.json()) as ProcessDocRequest;

    if (!content || typeof content !== "string" || content.trim().length < 10) {
      return NextResponse.json(
        { error: "Nội dung tài liệu không hợp lệ" },
        { status: 400 }
      );
    }

    // Heuristics to extract a reasonable title and summary
    const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const firstLine = lines[0] || "Bài viết mới";
    const title = firstLine.length > 8 ? firstLine : (lines[1] || "Bài viết mới");

    // Join paragraphs for summary
    const plain = lines.join(" ");
    const summary = plain.slice(0, 280);

    // Simple rules to guess category and tags
    let categoryId = "";
    const lower = plain.toLowerCase();
    if (/(xin nghỉ|nghỉ phép|leave)/.test(lower)) categoryId = "2";
    else if (/(xin việc|ứng tuyển|cv|resume)/.test(lower)) categoryId = "1";
    else if (/(chuyển công tác|điều chuyển)/.test(lower)) categoryId = "3";
    else if (/(thực tập|internship)/.test(lower)) categoryId = "4";
    else if (/(học bổng|scholarship)/.test(lower)) categoryId = "5";
    else if (/(khiếu nại|complaint)/.test(lower)) categoryId = "6";

    const tags = Array.from(
      new Set(
        [
          /(kính gửi)/i.test(plain) ? "kinh-gui" : null,
          /(cam kết)/i.test(plain) ? "cam-ket" : null,
          /(bàn giao)/i.test(plain) ? "ban-giao" : null,
          fileName ? generateSlug(fileName.replace(/\.[^.]+$/, "")) : null,
        ].filter(Boolean) as string[]
      )
    ).slice(0, 6);

    // Return structured result matching UI expectations
    return NextResponse.json({
      title: title.trim(),
      slug: generateSlug(title),
      summary,
      content: content,
      categoryId,
      tags,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Lỗi khi xử lý tài liệu" },
      { status: 500 }
    );
  }
}


