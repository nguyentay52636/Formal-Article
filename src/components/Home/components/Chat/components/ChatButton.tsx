"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"

interface ChatButtonProps {
    isOpen: boolean
    unreadCount: number
    position: { x: number; y: number }
    isDragging: boolean
    onMouseDown: (e: React.MouseEvent) => void
}

export default function ChatButton({
    isOpen,
    unreadCount,
    position,
    isDragging,
    onMouseDown
}: ChatButtonProps) {
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
                >
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

