"use client"

import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Message } from "./types"

interface MessageBubbleProps {
    message: Message
}

// Format text with line breaks and basic styling
function formatMessageText(text: string) {
    // Split by newlines and map to elements
    const lines = text.split('\n')
    
    return lines.map((line, index) => {
        // Check if line is a bullet point
        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-')
        
        if (line.trim() === '') {
            return <br key={index} />
        }
        
        return (
            <span key={index} className={isBullet ? "block pl-2" : "block"}>
                {line}
            </span>
        )
    })
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.sender === "user"

    // Format timestamp
    const formatTime = (date: Date) => {
        try {
            return date.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            })
        } catch {
            return ""
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
        >
            <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback
                    className={
                        isUser
                            ? "bg-primary text-white"
                            : "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                    }
                >
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </AvatarFallback>
            </Avatar>
            <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 break-words shadow-sm ${
                    isUser
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                }`}
            >
                <div className="text-sm leading-relaxed">
                    {formatMessageText(message.text)}
                </div>
                <p
                    className={`text-xs mt-2 opacity-70 ${
                        isUser ? "text-right" : "text-left"
                    }`}
                >
                    {formatTime(message.timestamp)}
                </p>
            </div>
        </motion.div>
    )
}
