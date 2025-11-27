"use client"

import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

interface SaveButtonProps {
    onSave: () => void
}

export function SaveButton({ onSave }: SaveButtonProps) {
    return (
        <Button 
            onClick={onSave} 
            className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold"
        >
            <Save className="w-4 h-4 mr-2" />
            Lưu hồ sơ
        </Button>
    )
}
