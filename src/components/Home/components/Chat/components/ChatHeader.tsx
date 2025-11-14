"use client"

import { X, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatHeaderProps {
    onClose: () => void
    onDragStart?: (e: React.MouseEvent) => void
}

// Drag Handle Icon giống favicon Next.js (6 chấm tròn)
const DragHandleIcon = () => (
    <div className="flex flex-col gap-1 pointer-events-none opacity-70 hover:opacity-100 transition-opacity">
        <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
        <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
    </div>
)

export default function ChatHeader({ onClose, onDragStart }: ChatHeaderProps) {
    return (
        <div
            className="bg-primary p-4 flex items-center justify-between flex-shrink-0 cursor-move select-none"
            onMouseDown={onDragStart}
            style={{ userSelect: "none" }}
        >
            <div className="flex items-center gap-3">
                {/* Drag Handle Icon - giống favicon Next.js */}
                <DragHandleIcon />

                <div className="flex items-center gap-3 pointer-events-none">
                    <Avatar className="h-10 w-10 border-2 border-white pointer-events-auto">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-white text-primary">
                            <Bot className="h-5 w-5 text-primary" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-white">Trợ lý ảo</h3>
                        <p className="text-xs text-white">Luôn sẵn sàng hỗ trợ</p>
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

