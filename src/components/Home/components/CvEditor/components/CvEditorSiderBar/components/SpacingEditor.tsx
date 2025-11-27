"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Space } from "lucide-react"
import type { SpacingSettings } from "../../../types/editor-settings"

interface SpacingEditorProps {
    spacing: SpacingSettings
    onSpacingChange: (spacing: SpacingSettings) => void
}

export function SpacingEditor({ spacing, onSpacingChange }: SpacingEditorProps) {
    const updateSpacing = (key: keyof SpacingSettings, value: number) => {
        onSpacingChange({ ...spacing, [key]: value })
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Space className="w-5 h-5 text-white" />
                <Label className="text-white font-semibold">Khoảng cách</Label>
                <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full">PRO</span>
            </div>
            <div className="space-y-5">
                {/* Line Height */}
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-300">Chiều cao dòng</span>
                        <span className="text-sm text-gray-400">{spacing.lineHeight.toFixed(1)}</span>
                    </div>
                    <Slider
                        value={[spacing.lineHeight]}
                        onValueChange={(v) => updateSpacing('lineHeight', v[0])}
                        min={1.2}
                        max={2.0}
                        step={0.1}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Chặt</span>
                        <span>Thoáng</span>
                    </div>
                </div>

                {/* Section Spacing */}
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-300">Khoảng cách mục</span>
                        <span className="text-sm text-gray-400">{spacing.sectionSpacing}px</span>
                    </div>
                    <Slider
                        value={[spacing.sectionSpacing]}
                        onValueChange={(v) => updateSpacing('sectionSpacing', v[0])}
                        min={8}
                        max={40}
                        step={4}
                        className="w-full"
                    />
                </div>

                {/* Horizontal Padding */}
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-300">Lề ngang</span>
                        <span className="text-sm text-gray-400">{spacing.paddingHorizontal}px</span>
                    </div>
                    <Slider
                        value={[spacing.paddingHorizontal]}
                        onValueChange={(v) => updateSpacing('paddingHorizontal', v[0])}
                        min={16}
                        max={64}
                        step={8}
                        className="w-full"
                    />
                </div>

                {/* Vertical Padding */}
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-300">Lề dọc</span>
                        <span className="text-sm text-gray-400">{spacing.paddingVertical}px</span>
                    </div>
                    <Slider
                        value={[spacing.paddingVertical]}
                        onValueChange={(v) => updateSpacing('paddingVertical', v[0])}
                        min={16}
                        max={64}
                        step={8}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    )
}

