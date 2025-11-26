"use client"

import Image from "next/image"

import { Card } from "@/components/ui/card"

interface CvPreviewCardProps {
    title: string
    previewImage: string
    html?: string
    css?: string
}

export function CvPreviewCard({ title, previewImage, html, css }: CvPreviewCardProps) {
    return (
        <>
            <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-8 lg:p-12 border-2">
                <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden">
                    {html ? (
                        <>
                            {css && <style>{css}</style>}
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </>
                    ) : (
                        <Image
                            src={previewImage || "/placeholder.svg"}
                            alt={title}
                            width={800}
                            height={1100}
                            className="w-full h-auto"
                            priority
                        />
                    )}
                </div>
            </Card>
            <div className="text-center">
                <p className="text-sm text-muted-foreground font-medium">{title}</p>
            </div>
        </>
    )
}

