"use client"

import { X, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatHeaderProps {
    onClose: () => void
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
    return (
        <div className="dark:bg-primary bg-primary p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white">
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
            <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
            >
                <X className="h-5 w-5" />
            </Button>
        </div>
    )
}

