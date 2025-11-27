"use client"

import { Label } from "@/components/ui/label"
import { LayoutGrid } from "lucide-react"
import type { LayoutType } from "../../../types/editor-settings"

interface LayoutSwitcherProps {
    layout: LayoutType
    onLayoutChange: (layout: LayoutType) => void
}

const layouts: { id: LayoutType; name: string; icon: React.ReactNode }[] = [
    {
        id: 'single-column',
        name: '1 cột',
        icon: (
            <div className="w-full h-full flex flex-col gap-1 p-1">
                <div className="flex-1 bg-current rounded-sm opacity-60" />
                <div className="flex-1 bg-current rounded-sm opacity-40" />
                <div className="flex-1 bg-current rounded-sm opacity-20" />
            </div>
        ),
    },
    {
        id: 'two-column-left-wide',
        name: 'Trái rộng',
        icon: (
            <div className="w-full h-full flex gap-1 p-1">
                <div className="flex-[2] bg-current rounded-sm opacity-60" />
                <div className="flex-1 bg-current rounded-sm opacity-30" />
            </div>
        ),
    },
    {
        id: 'two-column-right-wide',
        name: 'Phải rộng',
        icon: (
            <div className="w-full h-full flex gap-1 p-1">
                <div className="flex-1 bg-current rounded-sm opacity-30" />
                <div className="flex-[2] bg-current rounded-sm opacity-60" />
            </div>
        ),
    },
    {
        id: 'full-width',
        name: 'Full width',
        icon: (
            <div className="w-full h-full flex flex-col gap-1 p-1">
                <div className="h-4 bg-current rounded-sm opacity-60" />
                <div className="flex-1 flex gap-1">
                    <div className="flex-1 bg-current rounded-sm opacity-40" />
                    <div className="flex-1 bg-current rounded-sm opacity-40" />
                </div>
            </div>
        ),
    },
]

export function LayoutSwitcher({ layout, onLayoutChange }: LayoutSwitcherProps) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <LayoutGrid className="w-5 h-5 text-white" />
                <Label className="text-white font-semibold">Bố cục CV</Label>
                <span className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-0.5 rounded-full">PRO</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {layouts.map((l) => (
                    <button
                        key={l.id}
                        onClick={() => onLayoutChange(l.id)}
                        className={`aspect-[4/3] rounded-lg border-2 overflow-hidden transition-all flex flex-col ${layout === l.id
                                ? "border-[#0066CC] bg-[#0066CC]/20 text-[#0066CC]"
                                : "border-gray-600 bg-[#1E1E1E] text-gray-400 hover:border-gray-400"
                            }`}
                    >
                        <div className="flex-1 p-2">
                            {l.icon}
                        </div>
                        <div className={`text-xs py-1 text-center ${layout === l.id ? "bg-[#0066CC] text-white" : "bg-gray-700 text-gray-300"
                            }`}>
                            {l.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

