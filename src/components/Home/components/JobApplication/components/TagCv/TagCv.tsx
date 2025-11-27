"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllTags } from "@/apis/tagApi"
import { ITag } from "@/apis/types"
import { ITemplate, getTemplateByTagId } from "@/apis/templateApi"
import { Eye, Download, FolderTree } from "lucide-react"
import { toast } from "react-hot-toast"

const TYPE_LABELS: Record<string, string> = {
    job_field: "Ngành nghề",
    position: "Vị trí",
    design: "Thiết kế",
}

export default function TagCv() {
    const [open, setOpen] = useState(false)
    const [tags, setTags] = useState<ITag[]>([])
    const [selectedTag, setSelectedTag] = useState<ITag | null>(null)
    const [templates, setTemplates] = useState<ITemplate[]>([])
    const [loadingTags, setLoadingTags] = useState(false)
    const [loadingTemplates, setLoadingTemplates] = useState(false)

    useEffect(() => {
        const fetchTags = async () => {
            setLoadingTags(true)
            try {
                const data = await getAllTags()
                setTags(data)
                if (data.length) {
                    setSelectedTag(data[0])
                }
            } catch (error) {
                console.error("Failed to load tags", error)
                toast.error("Không tải được danh mục CV")
            } finally {
                setLoadingTags(false)
            }
        }

        fetchTags()
    }, [])

    useEffect(() => {
        if (!selectedTag?.id) {
            setTemplates([])
            return
        }

        const fetchTemplates = async () => {
            setLoadingTemplates(true)
            try {
                const data = await getTemplateByTagId(selectedTag.id)
                setTemplates(data)
            } catch (error) {
                console.error("Failed to load templates by tag", error)
                toast.error("Không thể tải template cho danh mục này")
            } finally {
                setLoadingTemplates(false)
            }
        }

        fetchTemplates()
    }, [selectedTag?.id])

    const groupedTags = useMemo(() => {
        return tags.reduce<Record<string, ITag[]>>((acc, tag) => {
            const key = tag.type || "other"
            acc[key] = acc[key] || []
            acc[key].push(tag)
            return acc
        }, {})
    }, [tags])

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">Danh mục CV</p>
                    <h2 className="text-2xl font-bold">Xem nhanh template theo danh mục</h2>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Open</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl">
                        <DialogHeader>
                            <DialogTitle>Danh mục CV</DialogTitle>
                            <DialogDescription>
                                Chọn tag ở phía trái để xem danh sách template tương ứng đang quản trị.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 md:grid-cols-[260px,1fr]">
                            <div className="space-y-3">
                                <div className="text-sm font-medium text-muted-foreground">Nhóm tag</div>
                                <ScrollArea className="h-[420px] rounded-lg border">
                                    <div className="p-3 space-y-4">
                                        {loadingTags ? (
                                            <div className="space-y-2">
                                                {[1, 2, 3].map((item) => (
                                                    <Skeleton key={item} className="h-12 w-full" />
                                                ))}
                                            </div>
                                        ) : (
                                            Object.entries(groupedTags).map(([type, items]) => (
                                                <div key={type} className="space-y-2">
                                                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                                        {TYPE_LABELS[type] || type}
                                                    </div>
                                                    <div className="space-y-2">
                                                        {items.map((tag) => {
                                                            const isActive = selectedTag?.id === tag.id
                                                            return (
                                                                <button
                                                                    key={tag.id}
                                                                    onClick={() => setSelectedTag(tag)}
                                                                    className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                                                                        isActive
                                                                            ? "border-primary bg-primary/5 text-primary"
                                                                            : "hover:border-primary/50"
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center justify-between gap-2">
                                                                        <span className="font-medium">{tag.name}</span>
                                                                        <Badge variant={isActive ? "default" : "secondary"}>
                                                                            {tag.templateCount ?? 0}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">/{tag.slug}</div>
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                    <Separator />
                                                </div>
                                            ))
                                        )}
                                        {!loadingTags && !tags.length && (
                                            <div className="text-sm text-muted-foreground">
                                                Chưa có danh mục nào.
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Template</p>
                                        <h3 className="text-lg font-semibold">
                                            {selectedTag?.name || "Chưa chọn danh mục"}
                                        </h3>
                                    </div>
                                    {selectedTag && (
                                        <Badge variant="outline">
                                            <FolderTree className="mr-1 h-4 w-4" />
                                            {TYPE_LABELS[selectedTag.type || ""] || "Danh mục"}
                                        </Badge>
                                    )}
                                </div>

                                <div className="rounded-lg border p-3">
                                    {loadingTemplates ? (
                                        <div className="space-y-3">
                                            {[1, 2, 3].map((item) => (
                                                <Skeleton key={item} className="h-24 w-full" />
                                            ))}
                                        </div>
                                    ) : !templates.length ? (
                                        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                                            Chưa có template nào cho danh mục này.
                                        </div>
                                    ) : (
                                        <ScrollArea className="max-h-[420px] pr-3">
                                            <div className="space-y-3">
                                                {templates.map((template) => {
                                                    const templateHref = template.slug
                                                        ? `/mau-don/${template.slug}`
                                                        : `/mau-don/${template.id}`
                                                    return (
                                                        <div
                                                            key={template.id}
                                                            className="rounded-lg border p-3 bg-card"
                                                        >
                                                            <div className="flex flex-col gap-2">
                                                                <div className="flex items-center justify-between gap-3">
                                                                    <div>
                                                                        <div className="font-semibold">{template.name}</div>
                                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                                            {template.summary}
                                                                        </p>
                                                                    </div>
                                                                    <Button asChild variant="outline" size="sm">
                                                                        <Link href={templateHref}>Xem</Link>
                                                                    </Button>
                                                                </div>
                                                                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                                                    <span className="flex items-center gap-1">
                                                                        <Eye className="h-4 w-4" />
                                                                        {template.views?.toLocaleString("vi-VN") ?? 0} lượt xem
                                                                    </span>
                                                                    <span className="flex items-center gap-1">
                                                                        <Download className="h-4 w-4" />
                                                                        {template.downloads?.toLocaleString("vi-VN") ?? 0} lượt tải
                                                                    </span>
                                                                    {template.language && <Badge variant="outline">{template.language}</Badge>}
                                                                    {template.usage && <Badge variant="secondary">{template.usage}</Badge>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </ScrollArea>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
