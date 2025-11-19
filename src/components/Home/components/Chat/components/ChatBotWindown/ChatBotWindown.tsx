"use client"

import { motion, AnimatePresence } from "framer-motion"
import ChatHeader from "./ChatHeader"
import ChatMessages from "./ChatMessages"
import ChatActions from "./ChatActions"
import ChatInput from "./ChatInput"
export type Sender = "user" | "bot"

export interface Message {
    id: string
    text: string
    sender: Sender
    timestamp: Date
}




interface ChatWindowProps {
    isOpen: boolean
    messages: Message[]
    isTyping: boolean
    inputValue: string
    onClose: () => void
    onInputChange: (value: string) => void
    onSendMessage: () => void
    onContactAdmin?: () => void
    onVoiceCall?: () => void
    onVideoCall?: () => void
    isInputDisabled?: boolean
    onDragStart?: (e: React.MouseEvent) => void
    isDragging?: boolean
}

export default function ChatBotWindown({
    isOpen,
    messages,
    isTyping,
    inputValue,
    onClose,
    onInputChange,
    onSendMessage,
    onContactAdmin,
    onVoiceCall,
    onVideoCall,
    isInputDisabled = false,
    onDragStart,
    isDragging = false,
}: ChatWindowProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="w-[380px] h-[600px] max-h-[600px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    style={{
                        cursor: isDragging ? "grabbing" : "default",
                    }}
                >
                    <ChatHeader onClose={onClose} onDragStart={onDragStart} />
                    <ChatMessages messages={messages} isTyping={isTyping} />
                    {onContactAdmin && onVoiceCall && onVideoCall && (
                        <ChatActions
                            onContactAdmin={onContactAdmin}
                            onVoiceCall={onVoiceCall}
                            onVideoCall={onVideoCall}
                        />
                    )}
                    <ChatInput
                        value={inputValue}
                        onChange={onInputChange}
                        onSend={onSendMessage}
                        isOpen={isOpen}
                        isDisabled={isInputDisabled}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

