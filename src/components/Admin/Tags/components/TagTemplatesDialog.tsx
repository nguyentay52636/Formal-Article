"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tag } from "../types"
import { ITemplate, getTemplateByTagId } from "@/apis/templateApi"
import { toast } from "react-hot-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Eye, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type TagTemplatesDialogProps = {
    tag: Tag | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function TagTemplatesDialog({ tag, open, onOpenChange }: TagTemplatesDialogProps) {
    const [templates, setTemplates] = useState<ITemplate[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!open || !tag?.id) {
            setTemplates([])
            return
        }

        const fetchTemplates = async () => {
            setLoading(true)
            try {
                const data = await getTemplateByTagId(tag.id)
                setTemplates(data)
            } catch (error) {
                console.error("Failed to load templates by tag", error)
                toast.error("Không thể tải danh sách template cho thẻ này")
            } finally {
                setLoading(false)
            }
        }

        fetchTemplates()
    }, [open, tag?.id])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Template thuộc thẻ "{tag?.name}"</DialogTitle>
                    <DialogDescription>
                        Danh sách template được gắn với thẻ này giúp bạn kiểm soát và cập nhật dễ dàng hơn.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((item) => (
                                <Skeleton key={item} className="h-24 w-full rounded-xl" />
                            ))}
                        </div>
                    ) : templates.length === 0 ? (
                        <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                            Chưa có template nào thuộc thẻ này.
                        </div>
                    ) : (
                        <ScrollArea className="max-h-[60vh] pr-4">
                            <div className="space-y-4">
                                {templates.map((template) => {
                                    const templateHref = template.slug ? `/mau-don/${template.slug}` : `/mau-don/${template.id}`
                                    return (
                                        <div
                                            key={template.id}
                                            className="rounded-xl border p-4 flex flex-col gap-3 bg-card"
                                        >
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between gap-2">
                                                    <div>
                                                        <div className="font-semibold">{template.name}</div>
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {template.summary}
                                                        </p>
                                                    </div>
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link href={templateHref}>Xem chi tiết</Link>
                                                    </Button>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="h-4 w-4" />
                                                        {template.views?.toLocaleString("vi-VN") ?? 0} lượt xem
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Download className="h-4 w-4" />
                                                        {template.downloads?.toLocaleString("vi-VN") ?? 0} lượt tải
                                                    </span>
                                                    {template.language && (
                                                        <Badge variant="outline">{template.language}</Badge>
                                                    )}
                                                    {template.usage && (
                                                        <Badge variant="secondary">{template.usage}</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

