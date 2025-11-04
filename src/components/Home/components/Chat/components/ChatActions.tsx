"use client"

import { useState } from "react"
import { Headphones, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import CallOptions from "./CallOptions"

interface ChatActionsProps {
    onContactAdmin: () => void
    onVoiceCall: () => void
    onVideoCall: () => void
}

export default function ChatActions({ onContactAdmin, onVoiceCall, onVideoCall }: ChatActionsProps) {
    const [showCallOptions, setShowCallOptions] = useState(false)

    return (
        <div className="px-4 py-2 border-t border-border flex-shrink-0 bg-muted/30">
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onContactAdmin}
                    className="flex-1 text-xs bg-transparent cursor-pointer"
                >
                    <Headphones className="h-3 w-3 mr-2 text-white cursor-pointer" />
                    Chat Admin
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCallOptions(!showCallOptions)}
                    className="flex-1 text-xs bg-transparent cursor-pointer"
                >
                    <Phone className="h-3 w-3 mr-2 text-white cursor-pointer" />
                    Gọi điện
                </Button>
            </div>
            <CallOptions
                isOpen={showCallOptions}
                onVoiceCall={() => {
                    onVoiceCall()
                    setShowCallOptions(false)
                }}
                onVideoCall={() => {
                    onVideoCall()
                    setShowCallOptions(false)
                }}
            />
        </div>
    )
}

