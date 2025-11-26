"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface CvPreviewCardProps {
    title: string
    previewImage: string
    html?: string
    css?: string
}

export function CvPreviewCard({ title, previewImage, html, css }: CvPreviewCardProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Check if HTML contains Handlebars placeholders (template variables)
    const hasPlaceholders = html && (
        html.includes('{{') ||
        html.includes('}}')
    )

    // Check if we have HTML/CSS to render (and it's not a template with placeholders)
    const hasHtmlContent = html && html.trim().length > 0 && !hasPlaceholders

    console.log('CvPreviewCard render:', {
        hasHtmlContent,
        hasPlaceholders,
        htmlLength: html?.length,
        cssLength: css?.length,
        htmlPreview: html?.substring(0, 100)
    })

    return (
        <>
            <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-8 lg:p-12 border-2">
                <div className=" bg-white shadow-2xl rounded-sm overflow-hidden">
                    {hasHtmlContent && mounted ? (
                        <>
                            {/* Inject CSS */}
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                    .cv-preview-wrapper {
                                        min-height: 1100px;
                                        background: #ffffff;
                                        width: 100%;
                                        overflow: hidden;
                                    }
                                    
                                    /* Custom CV styles */
                                    ${css || ''}
                                `
                            }} />

                            {/* Render HTML content */}
                            <div
                                className="cv-preview-wrapper"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
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

