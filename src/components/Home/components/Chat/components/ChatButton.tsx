"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"

interface ChatButtonProps {
    isOpen: boolean
    unreadCount: number
    onOpen: () => void
}

export default function ChatButton({ isOpen, unreadCount, onOpen }: ChatButtonProps) {
    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="fixed bottom-6 right-6 z-50 "
                >
                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 0 0 0 rgba(249, 115, 22, 0.4)",
                                "0 0 0 20px rgba(249, 115, 22, 0)",
                                "0 0 0 0 rgba(249, 115, 22, 0)",

                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                        }}
                        className="rounded-full"
                    >
                        <Button
                            onClick={onOpen}
                            size="lg"
                            className="h-16 w-16 rounded-full bg-primary cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
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

