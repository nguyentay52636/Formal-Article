"use client"

import { Label } from "@/components/ui/label"
import { Palette } from "lucide-react"
import type { ColorSettings } from "../../../types/editor-settings"

interface AdvancedColorsProps {
    colors: ColorSettings
    onColorsChange: (colors: ColorSettings) => void
}

const colorFields: { key: keyof ColorSettings; label: string }[] = [
    { key: 'primary', label: 'Màu chủ đạo' },
    { key: 'text', label: 'Màu chữ' },
    { key: 'background', label: 'Màu nền' },
    { key: 'heading', label: 'Màu tiêu đề' },
    { key: 'border', label: 'Màu viền' },
]

const presetColors = [
    '#0066CC', '#E91E63', '#4CAF50', '#FF9800', '#9C27B0', '#00BCD4',
    '#1A237E', '#C62828', '#2E7D32', '#6D4C41', '#546E7A', '#D81B60',
    '#333333', '#666666', '#999999', '#FFFFFF', '#F5F5F5', '#E5E7EB',
]

export function AdvancedColors({ colors, onColorsChange }: AdvancedColorsProps) {
    const updateColor = (key: keyof ColorSettings, value: string) => {
        onColorsChange({ ...colors, [key]: value })
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-white" />
                <Label className="text-white font-semibold">Màu sắc nâng cao</Label>
                <span className="text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-0.5 rounded-full">PRO</span>
            </div>
            <div className="space-y-4">
                {colorFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">{field.label}</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={colors[field.key]}
                                    onChange={(e) => updateColor(field.key, e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer border-2 border-gray-600"
                                />
                                <input
                                    type="text"
                                    value={colors[field.key]}
                                    onChange={(e) => updateColor(field.key, e.target.value)}
                                    className="w-20 px-2 py-1 text-xs bg-[#1E1E1E] border border-gray-600 rounded text-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick presets */}
            <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-xs text-gray-400 mb-2 block">Màu nhanh:</span>
                <div className="grid grid-cols-6 gap-2">
                    {presetColors.map((color) => (
                        <button
                            key={color}
                            onClick={() => updateColor('primary', color)}
                            className="w-6 h-6 rounded border border-gray-600 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            title={color}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

