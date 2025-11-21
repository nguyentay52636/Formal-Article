"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Headphones } from "lucide-react"
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
    isWaitingForAdmin?: boolean
    onCancelWait?: () => void
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
    isWaitingForAdmin = false,
    onCancelWait,
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

                    {isWaitingForAdmin && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                            <div className="bg-card p-6 rounded-xl shadow-lg border border-border max-w-[80%] text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                                    <Headphones className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Đang chờ Admin</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Vui lòng đợi trong giây lát, admin sẽ tham gia cuộc trò chuyện ngay.
                                </p>
                                <div className="flex gap-1 justify-center mb-4">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                                </div>
                                {onCancelWait && (
                                    <button
                                        onClick={onCancelWait}
                                        className="text-xs text-red-500 hover:text-red-600 hover:underline font-medium"
                                    >
                                        Hủy yêu cầu
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    <ChatActions
                        onContactAdmin={onContactAdmin}
                        onVoiceCall={onVoiceCall}
                        onVideoCall={onVideoCall}
                        isDisabled={isWaitingForAdmin}
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
