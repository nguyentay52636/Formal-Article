"use client"

import React from "react"

interface DocxPreviewProps {
    docxPath: string
    className?: string
    skeletonClassName?: string
    fallbackHtml?: string
    fitToContainer?: boolean
}

export function DocxPreview({ docxPath, className, skeletonClassName, fallbackHtml, fitToContainer = true }: DocxPreviewProps) {
    const [html, setHtml] = React.useState<string>("")
    const [error, setError] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(true)
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const pageRef = React.useRef<HTMLDivElement | null>(null)
    const [scale, setScale] = React.useState<number>(1)

    React.useEffect(() => {
        let isMounted = true
        async function load() {
            try {
                setLoading(true)
                setError("")
                const params = new URLSearchParams({ path: docxPath })
                const res = await fetch(`/api/docx?${params.toString()}`)
                if (!res.ok) {
                    // Try fallback on 404 or general failure
                    if (fallbackHtml && isMounted) {
                        setHtml(fallbackHtml)
                        return
                    }
                    const data = await res.json().catch(() => ({}))
                    throw new Error(data?.error || "Failed to load document")
                }
                const data = (await res.json()) as { html: string }
                if (isMounted) setHtml(data.html || fallbackHtml || "")
            } catch (e: any) {
                if (fallbackHtml && isMounted) {
                    setHtml(fallbackHtml)
                    setError("")
                } else if (isMounted) {
                    setError(e?.message || "Error")
                }
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        load()
        return () => {
            isMounted = false
        }
    }, [docxPath])

    React.useEffect(() => {
        if (!fitToContainer) return
        const container = containerRef.current
        const page = pageRef.current
        if (!container || !page) return

        const compute = () => {
            const cw = container.clientWidth
            const ch = container.clientHeight
            const pw = page.scrollWidth
            const ph = page.scrollHeight
            if (pw === 0 || ph === 0) return
            const s = Math.min(cw / pw, ch / ph)
            setScale(Number.isFinite(s) && s > 0 ? s : 1)
        }

        const ro = new ResizeObserver(() => compute())
        ro.observe(container)
        compute()
        return () => ro.disconnect()
    }, [html, fitToContainer])

    if (loading) {
        return <div className={skeletonClassName || className} />
    }

    if (error) {
        return (
            <div className={className}>
                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div ref={containerRef} className={className + (fitToContainer ? " flex items-start justify-center overflow-hidden" : "")}>
            <div
                ref={pageRef}
                className="docx-a4-page bg-white text-foreground shadow-sm border rounded-sm origin-top-left"
                style={{
                    width: 794, // ~A4 width at 96 DPI
                    minHeight: 1123, // ~A4 height at 96 DPI
                    transform: fitToContainer ? `scale(${scale})` : undefined,
                }}
            >
                <div className="prose max-w-none px-8 py-10" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    )
}


