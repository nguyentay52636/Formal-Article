"use client"

import { Button } from "@/components/ui/button"
import { Undo2, Redo2 } from "lucide-react"

interface UndoRedoButtonsProps {
    onUndo: () => void
    onRedo: () => void
    canUndo: boolean
    canRedo: boolean
}

export function UndoRedoButtons({ onUndo, onRedo, canUndo, canRedo }: UndoRedoButtonsProps) {
    return (
        <div className="flex items-center gap-1 border-r border-gray-600 pr-3">
            <Button
                onClick={onUndo}
                disabled={!canUndo}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-700 disabled:opacity-40"
                title="Hoàn tác (Ctrl+Z)"
            >
                <Undo2 className="w-4 h-4" />
            </Button>
            <Button
                onClick={onRedo}
                disabled={!canRedo}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-700 disabled:opacity-40"
                title="Làm lại (Ctrl+Y)"
            >
                <Redo2 className="w-4 h-4" />
            </Button>
        </div>
    )
}
