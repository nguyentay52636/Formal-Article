"use client"

import { motion, AnimatePresence } from "framer-motion"
import ChatHeaderAdmin from "./components/ChatHeaderAdmin"
import ChatMessages from "./components/ChatMessages"
import ChatActions from "./components/ChatActions"
import ChatInput from "../ChatBotWindown/ChatInput"
import { IMessage } from "@/apis/types"

interface ChatWindowProps {
    isOpen: boolean
    messages: IMessage[]
    isTyping: boolean
    inputValue: string
    onClose: () => void
    onInputChange: (value: string) => void
    onSendMessage: () => void
    onContactAdmin: () => void
    onVoiceCall: () => void
    onVideoCall: () => void
    isInputDisabled?: boolean
    onDragStart?: (e: React.MouseEvent) => void
    isDragging?: boolean
}

export default function ChatAdminWindow({
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
                    <ChatHeaderAdmin onClose={onClose} onDragStart={onDragStart} />
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
