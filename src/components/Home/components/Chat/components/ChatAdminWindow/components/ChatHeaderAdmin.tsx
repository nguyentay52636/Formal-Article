"use client"

import { X, Headset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatHeaderProps {
    onClose: () => void
    onDragStart?: (e: React.MouseEvent) => void
}

const DragHandleIcon = () => (
    <div className="flex flex-col gap-1 pointer-events-none opacity-70 hover:opacity-100 transition-opacity">
        {[0, 1].map((row) => (
            <div key={row} className="flex gap-1">
                {[0, 1, 2].map((col) => (
                    <div key={`${row}-${col}`} className="w-1.5 h-1.5 rounded-full bg-white" />
                ))}
            </div>
        ))}
    </div>
)

export default function ChatHeaderAdmin({ onClose, onDragStart }: ChatHeaderProps) {
    return (
        <div
            className="bg-primary p-4 flex items-center justify-between flex-shrink-0 cursor-move select-none"
            onMouseDown={onDragStart}
            style={{ userSelect: "none" }}
        >
            <div className="flex items-center gap-3">
                <DragHandleIcon />
                <div className="flex items-center gap-3 pointer-events-none">
                    <Avatar className="h-10 w-10 border-2 border-white pointer-events-auto">
                        <AvatarImage src="/admin-avatar.png" />
                        <AvatarFallback className="bg-white text-secondary">
                            <Headset className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-white">Admin hỗ trợ</h3>
                        <p className="text-xs text-white/80">Đang trực tuyến</p>
                    </div>
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20 pointer-events-auto"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <X className="h-5 w-5" />
            </Button>
        </div>
    )
}
