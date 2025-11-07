import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import mammoth from "mammoth";

function isSafeRelativePath(p: string) {
  if (!p || typeof p !== "string") return false;
  if (p.includes("..")) return false; // prevent traversal
  if (!p.toLowerCase().endsWith(".docx")) return false;
  return p.startsWith("/"); // expect paths like /docs/file.docx (under public)
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rel = searchParams.get("path") || "";

    if (!isSafeRelativePath(rel)) {
      return NextResponse.json({ error: "Invalid path. Use /docs/<file>.docx" }, { status: 400 });
    }

    const projectRoot = process.cwd();
    const filePath = path.join(projectRoot, "public", rel);

    const fileBuffer = await fs.readFile(filePath);

    const { value: html } = await mammoth.convertToHtml({ buffer: fileBuffer }, {
      styleMap: [
        // keep output simple and readable
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
      ],
      includeDefaultStyleMap: true,
    });

    // Minimal sanitize: strip script tags
    const safeHtml = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

    return NextResponse.json({ html: safeHtml });
  } catch (err: any) {
    if (err?.code === "ENOENT") {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to convert document" }, { status: 500 });
  }
}


