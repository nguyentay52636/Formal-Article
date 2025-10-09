import React from 'react'

interface TagsHeaderProps {
    title?: string
    description?: string
}

export default function TagsHeader({
    title = "Quản lý thẻ",
    description = "Quản lý các thẻ tag cho bài viết"
}: TagsHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}
