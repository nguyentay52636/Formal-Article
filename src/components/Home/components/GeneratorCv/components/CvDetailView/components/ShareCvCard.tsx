"use client"

import { Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function ShareCvCard() {
    return (
        <Card className="p-6">
            <p className="text-sm font-semibold mb-3">Chia sẻ mẫu CV với bạn bè</p>
            <Button variant="default" className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Chia sẻ trên Facebook
            </Button>
        </Card>
    )
}

