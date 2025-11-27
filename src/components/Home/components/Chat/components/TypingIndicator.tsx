"use client"

import { motion } from "framer-motion"
import { Bot } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2"
        >
            <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Bot className="h-4 w-4" />
                </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                    <motion.span
                        className="h-2 w-2 rounded-full bg-gray-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop" }}
                    />
                    <motion.span
                        className="h-2 w-2 rounded-full bg-gray-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop", delay: 0.15 }}
                    />
                    <motion.span
                        className="h-2 w-2 rounded-full bg-gray-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop", delay: 0.3 }}
                    />
                    <span className="ml-2 text-xs text-muted-foreground">Đang trả lời...</span>
                </div>
            </div>
        </motion.div>
    )
}
