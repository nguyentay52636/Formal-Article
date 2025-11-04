"use client"

import { motion, AnimatePresence } from "framer-motion"
import ChatHeader from "./ChatHeader"
import ChatMessages from "./ChatMessages"
import ChatActions from "./ChatActions"
import ChatInput from "./ChatInput"
import { Message } from "./types"

interface ChatWindowProps {
    isOpen: boolean
    messages: Message[]
    isTyping: boolean
    inputValue: string
    onClose: () => void
    onInputChange: (value: string) => void
    onSendMessage: () => void
    onContactAdmin: () => void
    onVoiceCall: () => void
    onVideoCall: () => void
    isInputDisabled?: boolean
}

export default function ChatWindow({
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
}: ChatWindowProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[600px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                >
                    <ChatHeader onClose={onClose} />
                    <ChatMessages messages={messages} isTyping={isTyping} />
                    <ChatActions
                        onContactAdmin={onContactAdmin}
                        onVoiceCall={onVoiceCall}
                        onVideoCall={onVideoCall}
                    />
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

