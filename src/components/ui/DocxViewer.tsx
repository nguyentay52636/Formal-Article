"use client";

import React from "react";

type DocxViewerProps = {
  /** Public path, e.g. "/docs/sample.docx" (file placed under public/docs) */
  src: string;
  /** Optional className for container */
  className?: string;
  /** Optional placeholder while loading */
  loadingText?: string;
  /** Optional error text */
  errorText?: string;
};

export function DocxViewer({ src, className, loadingText = "Đang tải...", errorText = "Không thể hiển thị tài liệu" }: DocxViewerProps) {
  const [html, setHtml] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError("");
      try {
        const url = new URL("/api/docx", window.location.origin);
        url.searchParams.set("path", src);
        const res = await fetch(url.toString());
        if (!res.ok) {
          const msg = (await res.json().catch(() => ({})))?.error || "Request failed";
          throw new Error(msg);
        }
        const data = await res.json();
        if (!cancelled) setHtml(data?.html || "");
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (loading) return <div className={className}>{loadingText}</div>;
  if (error) return <div className={className}>{errorText}: {error}</div>;

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default DocxViewer;


