"use client"

import { Card, CardContent } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Eye, Download, MoreVertical, Pencil, Trash2, Copy } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ITemplate } from "@/apis/templateApi"
import ActionTemplate from "./ActionTemplate"

interface TemplateCardProps {
    template: ITemplate
    onDelete: (id: number) => void
    onUpdate: (template: ITemplate) => void
}

export function TemplateCard({ template, onDelete, onUpdate }: TemplateCardProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!template.id) return

        if (confirm(`Bạn có chắc chắn muốn xóa "${template.name}"?`)) {
            setIsDeleting(true)
            onDelete(template.id)
        }
    }

    const handleDuplicate = () => {
        if (!template.id) return
    }

    return (
        <Card className={cn("group cursor-pointer overflow-hidden transition-all hover:shadow-lg", isDeleting && "opacity-50")}>
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                    src={template.previewUrl || `/placeholder.svg?height=400&width=300&query=CV template ${template.name}`}
                    alt={template.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {template.tag && (
                    <div className="absolute left-3 top-3">
                        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                            {template.tag.name}
                        </Badge>
                    </div>
                )}
                {/* handlle acc tion */}
                <ActionTemplate onEdit={() => onUpdate(template)} onDelete={handleDelete} />
            </div>

            <CardContent className="p-4">
                <div className="mb-3">
                    <h3 className="mb-2 font-semibold text-foreground line-clamp-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{template.summary}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        <span>{template.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Download className="h-4 w-4" />
                        <span>{template.downloads.toLocaleString()}</span>
                    </div>
                </div>

                <div className="mt-3 border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground">
                        Cập nhật: {new Date(template.updatedAt).toLocaleDateString("vi-VN")}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
