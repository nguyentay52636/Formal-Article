import React from 'react'
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Tag } from "lucide-react"

interface Tag {
    id: number
    ten: string
    duongDan: string
    soBaiViet: number
}

interface TagsListProps {
    tags: Tag[]
    onEdit: (tag: Tag) => void
    onDelete: (tag: Tag) => void
}

export default function TagsList({ tags, onEdit, onDelete }: TagsListProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tags.map((tag) => (
                <div key={tag.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Tag className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <div className="font-medium">{tag.ten}</div>
                            <div className="text-sm text-muted-foreground">{tag.soBaiViet} bài viết</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => onEdit(tag)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDelete(tag)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
