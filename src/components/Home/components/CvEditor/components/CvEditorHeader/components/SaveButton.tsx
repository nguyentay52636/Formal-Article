"use client"

import { Button } from "@/components/ui/button"
import { Save, Loader2 } from "lucide-react"

interface SaveButtonProps {
    onSave: () => void
    isLoading?: boolean
}

export function SaveButton({ onSave, isLoading = false }: SaveButtonProps) {
    return (
        <Button
            onClick={onSave}
            disabled={isLoading}
            className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold disabled:opacity-50"
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
                <Save className="w-4 h-4 mr-2" />
            )}
            {isLoading ? "Đang lưu..." : "Lưu hồ sơ"}
        </Button>
    )
}
