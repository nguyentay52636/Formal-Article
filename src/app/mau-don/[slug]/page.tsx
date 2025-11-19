import React from "react"
import { DocxPreview } from "@/components/DocxPreview"
import { templates } from "@/mock/data"
import { mockDocxHtmlBySlug } from "@/mock/docx-html"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function MauDonDetailPage({ params }: PageProps) {
  const { slug } = await params
  const meta = templates.find((t: any) => t.slug === slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {meta?.title || "Xem mẫu đơn"}
        </h1>
        {meta?.category ? (
          <p className="text-sm text-muted-foreground mt-1">{meta.category}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          <div className="rounded-md border bg-background p-4">
            <DocxPreview
              docxPath={`/docs/mau-don/${slug}.docx`}
              className="h-[70vh] w-full bg-muted"
              skeletonClassName="h-[70vh] w-full animate-pulse bg-muted"
              fallbackHtml={mockDocxHtmlBySlug[slug]}
              fitToContainer={true}
            />
          </div>
        </div>
        <aside className="space-y-4">
          <a
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-primary-foreground text-sm font-medium shadow hover:opacity-90"
            href={`/docs/mau-don/${slug}.docx`}
            download
          >
            Tải về .docx
          </a>
        </aside>
      </div>
    </div>
  )
}


