"use client"

import { Label } from "@/components/ui/label"
import { Sparkles, Mail, Phone, MapPin, Calendar } from "lucide-react"
import type { IconStyle } from "../../../types/editor-settings"

interface IconStyleSwitcherProps {
    iconStyle: IconStyle
    onIconStyleChange: (style: IconStyle) => void
}

const iconStyles: { id: IconStyle; name: string; description: string }[] = [
    { id: 'minimal', name: 'Minimal', description: 'Đường nét mảnh' },
    { id: 'bold', name: 'Bold', description: 'Đường nét dày' },
    { id: 'filled', name: 'Filled', description: 'Icon đặc' },
    { id: 'rounded', name: 'Rounded', description: 'Bo tròn' },
]

// Preview icons for each style
const IconPreview = ({ style }: { style: IconStyle }) => {
    const getStrokeWidth = () => {
        switch (style) {
            case 'minimal': return 1
            case 'bold': return 2.5
            case 'filled': return 2
            case 'rounded': return 1.5
            default: return 1.5
        }
    }

    const strokeWidth = getStrokeWidth()

    return (
        <div className="flex gap-1.5">
            <Mail className="w-4 h-4" strokeWidth={strokeWidth} />
            <Phone className="w-4 h-4" strokeWidth={strokeWidth} />
            <MapPin className="w-4 h-4" strokeWidth={strokeWidth} />
            <Calendar className="w-4 h-4" strokeWidth={strokeWidth} />
        </div>
    )
}

export function IconStyleSwitcher({ iconStyle, onIconStyleChange }: IconStyleSwitcherProps) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-white" />
                <Label className="text-white font-semibold">Kiểu icon</Label>
                <span className="text-xs bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2 py-0.5 rounded-full">PRO</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {iconStyles.map((style) => (
                    <button
                        key={style.id}
                        onClick={() => onIconStyleChange(style.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${iconStyle === style.id
                                ? "border-[#0066CC] bg-[#0066CC]/20"
                                : "border-gray-600 bg-[#1E1E1E] hover:border-gray-400"
                            }`}
                    >
                        <div className={`mb-2 ${iconStyle === style.id ? "text-[#0066CC]" : "text-gray-400"}`}>
                            <IconPreview style={style.id} />
                        </div>
                        <div className={`text-xs font-medium ${iconStyle === style.id ? "text-white" : "text-gray-300"}`}>
                            {style.name}
                        </div>
                        <div className="text-[10px] text-gray-500">{style.description}</div>
                    </button>
                ))}
            </div>
        </div>
    )
}

