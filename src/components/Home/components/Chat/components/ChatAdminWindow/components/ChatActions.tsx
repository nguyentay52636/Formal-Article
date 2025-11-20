"use client"

import { useState } from "react"
import { Headphones, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import CallOptions from "./CallOptions"

interface ChatActionsProps {
    onContactAdmin: () => void
    onVoiceCall: () => void
    onVideoCall: () => void
    isDisabled?: boolean
}

export default function ChatActions({ onContactAdmin, onVoiceCall, onVideoCall, isDisabled }: ChatActionsProps) {
    const [showCallOptions, setShowCallOptions] = useState(false)

    return (
        <div className="px-4 py-2 border-t border-border flex-shrink-0 bg-muted/30">
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onContactAdmin}
                    className="flex-1 text-xs"
                    disabled={isDisabled}
                >
                    <Headphones className="h-3 w-3 mr-2" />
                    Liên hệ admin
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCallOptions((prev) => !prev)}
                    className="flex-1 text-xs"
                >
                    <Phone className="h-3 w-3 mr-2" />
                    Gọi admin
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

