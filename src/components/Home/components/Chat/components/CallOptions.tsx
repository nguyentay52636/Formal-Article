"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Phone, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CallOptionsProps {
    isOpen: boolean
    onVoiceCall: () => void
    onVideoCall: () => void
}

export default function CallOptions({ isOpen, onVoiceCall, onVideoCall }: CallOptionsProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-2 overflow-hidden"
                >
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onVoiceCall}
                        className="w-full text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 hover:from-green-600 hover:to-emerald-600"
                    >
                        <Phone className="h-3 w-3 mr-2" />
                        Gọi thoại
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onVideoCall}
                        className="w-full text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600"
                    >
                        <Video className="h-3 w-3 mr-2" />
                        Gọi video
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

