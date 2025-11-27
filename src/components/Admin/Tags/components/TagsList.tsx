import React from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Trash2, Tag } from "lucide-react"
import { usePaginateArray } from '@/context/PaginationProvider'
import { Skeleton } from '@/components/ui/skeleton'
import { Tag as TagType } from '../types'

interface TagsListProps {
    tags: TagType[]
    loading?: boolean
    onEdit: (tag: TagType) => void
    onDelete: (tag: TagType) => void
    onViewTemplates: (tag: TagType) => void
}

const TYPE_LABELS: Record<string, string> = {
    job_field: "Ngành nghề",
    position: "Vị trí",
    design: "Thiết kế",
}

export default function TagsList({ tags, loading, onEdit, onDelete, onViewTemplates }: TagsListProps) {
    const paginatedTags = usePaginateArray(tags)

    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                    <Skeleton key={item} className="h-32 w-full rounded-xl" />
                ))}
            </div>
        )
    }

    if (!paginatedTags.length) {
        return (
            <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                Chưa có thẻ nào phù hợp với bộ lọc hiện tại.
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginatedTags.map((tag) => (
                <div key={tag.id} className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Tag className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <div className="font-semibold">{tag.name}</div>
                            <div className="text-sm text-muted-foreground">/{tag.slug}</div>
                            {tag.type && (
                                <Badge variant="secondary" className="w-fit">
                                    {TYPE_LABELS[tag.type] || tag.type}
                                </Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{tag.templateCount ?? 0} template</span>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={() => onViewTemplates(tag)} aria-label="Xem template">
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => onEdit(tag)} aria-label="Chỉnh sửa thẻ">
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(tag)}
                                className="text-destructive hover:text-destructive"
                                aria-label="Xóa thẻ"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
