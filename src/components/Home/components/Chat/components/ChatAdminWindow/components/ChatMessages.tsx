"use client"

import { useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IMessage } from "@/apis/types"
import MessageBubble from "../../MessageBubble"
import TypingIndicator from "./TypingIndicator"
import type { Message } from "../../types"

interface ChatMessagesProps {
    messages: IMessage[]
    isTyping: boolean
    currentUserId?: number
}

export default function ChatMessages({ messages, isTyping, currentUserId }: ChatMessagesProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!scrollAreaRef.current) return
        const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight
        }
    }, [messages, isTyping])

    const normalizedMessages: Message[] = messages.map((message) => ({
        id: message.id,
        text: message.content,
        sender: message.senderId === currentUserId ? "user" : "bot",
        timestamp: new Date(message.createdAt ?? Date.now()),
    }))

    return (
        <div className="flex-1 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="h-full">
                <div className="p-4 space-y-4">
                    {normalizedMessages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}
                    {isTyping && <TypingIndicator />}
                </div>
            </ScrollArea>
        </div>
    )
}
