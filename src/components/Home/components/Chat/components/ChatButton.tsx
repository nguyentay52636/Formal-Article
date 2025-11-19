"use client"

import { motion } from "framer-motion"
import { MessageCircle, Bot, Headset } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

interface ChatButtonProps {
    isOpen: boolean
    unreadCount: number
    position: { x: number; y: number }
    isDragging: boolean
    onMouseDown: (e: React.MouseEvent) => void
    onOptionSelect?: (option: 'ai' | 'admin') => void
}

export default function ChatButton({
    isOpen,
    unreadCount,
    position,
    isDragging,
    onMouseDown,
    onOptionSelect
}: ChatButtonProps) {
    const [isHovered, setIsHovered] = useState(false)

    const handleOptionClick = (e: React.MouseEvent, option: 'ai' | 'admin') => {
        e.stopPropagation()
        onOptionSelect?.(option)
    }

    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        x: position.x,
                        y: position.y,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                        position: "fixed",
                        left: 0,
                        top: 0,
                        zIndex: 9999,
                        cursor: isDragging ? "grabbing" : "grab",
                    }}
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        y: { type: "spring", stiffness: 300, damping: 30 },
                    }}
                    onMouseEnter={() => !isDragging && setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {isHovered && !isDragging && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-20 left-1/2 -translate-x-1/2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100"
                                style={{ pointerEvents: 'auto' }}
                            >
                                {/* Chat AI Option */}
                                <motion.button
                                    whileHover={{ backgroundColor: "rgba(249, 115, 22, 0.05)" }}
                                    onClick={(e) => handleOptionClick(e, 'ai')}
                                    className="w-full px-4 py-3 flex items-center gap-3 text-left transition-colors border-b border-gray-100"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                        <Bot className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-900 text-sm">Chat AI</div>
                                        <div className="text-xs text-gray-500">Trợ lý ảo thông minh</div>
                                    </div>
                                </motion.button>

                                {/* Online Consultation Option */}
                                <motion.button
                                    whileHover={{ backgroundColor: "rgba(249, 115, 22, 0.05)" }}
                                    onClick={(e) => handleOptionClick(e, 'admin')}
                                    className="w-full px-4 py-3 flex items-center gap-3 text-left transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                        <Headset className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-900 text-sm">Tư vấn trực tuyến</div>
                                        <div className="text-xs text-gray-500">Hỗ trợ từ chuyên viên</div>
                                    </div>
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        animate={{
                            boxShadow: isDragging
                                ? "0 10px 25px rgba(0, 0, 0, 0.3)"
                                : [
                                    "0 0 0 0 rgba(249, 115, 22, 0.4)",
                                    "0 0 0 20px rgba(249, 115, 22, 0)",
                                    "0 0 0 0 rgba(249, 115, 22, 0)",
                                ],
                        }}
                        transition={{
                            duration: isDragging ? 0 : 2,
                            repeat: isDragging ? 0 : Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                        }}
                        className="rounded-full"
                    >
                        <Button
                            onMouseDown={onMouseDown}
                            size="lg"
                            className={`h-16 w-16 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all duration-300 relative ${isDragging ? "scale-110" : "hover:scale-110"
                                }`}
                            style={{ userSelect: "none" }}
                        >
                            <motion.div
                                animate={{
                                    rotate: isDragging ? 0 : [0, 10, -10, 0]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: isDragging ? 0 : Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                }}
                            >
                                <MessageCircle className="h-7 w-7 text-white" />
                            </motion.div>
                            {unreadCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center"
                                >
                                    {unreadCount}
                                </motion.span>
                            )}
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

