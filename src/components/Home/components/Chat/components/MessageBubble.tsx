"use client"

import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Message } from "./types"

interface MessageBubbleProps {
    message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.sender === "user"

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
        >
            <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback
                    className={
                        isUser
                            ? "bg-primary text-white"
                            : "bg-primary text-white"
                    }
                >
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </AvatarFallback>
            </Avatar>
            <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 break-words ${isUser
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground"
                    }`}
            >
                <p className="text-sm">{message.text}</p>
                <p
                    className={`text-xs mt-1 ${isUser ? "text-white" : "text-black"
                        }`}
                >
                    {message.timestamp.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
        </motion.div>
    )
}

