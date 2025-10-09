import React from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface TagsActionsProps {
    onAddNew?: () => void
    showAddButton?: boolean
}

export default function TagsActions({
    onAddNew,
    showAddButton = true
}: TagsActionsProps) {
    return (
        <div className="flex items-center justify-end gap-4">
            {showAddButton && (
                <Button onClick={onAddNew} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Thêm thẻ mới
                </Button>
            )}
        </div>
    )
}
