"use client"

import { motion } from "framer-motion"

export default function TypingIndicator() {
    return (
        <div className="flex items-center gap-2 text-muted-foreground">
            <motion.span
                className="h-2 w-2 rounded-full bg-current"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            />
            <motion.span
                className="h-2 w-2 rounded-full bg-current"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.2 }}
            />
            <motion.span
                className="h-2 w-2 rounded-full bg-current"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.4 }}
            />
        </div>
    )
}


