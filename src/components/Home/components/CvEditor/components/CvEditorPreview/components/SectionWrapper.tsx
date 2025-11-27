"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { IconStyle } from "../../../types/editor-settings"
import { getIconStrokeWidth } from "./types"

interface SectionWrapperProps {
    title: string
    icon: ReactNode
    color: string
    onAdd?: () => void
    addLabel?: string
    children: ReactNode
    iconStyle?: IconStyle
}

export function SectionWrapper({ title, icon, color, onAdd, addLabel, children, iconStyle }: SectionWrapperProps) {
    const strokeWidth = getIconStrokeWidth(iconStyle)
    
    return (
        <section className="border-l-4 pl-4" style={{ borderColor: color }}>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color }}>
                    {icon}
                    {title}
                </h2>
                {onAdd && (
                    <Button onClick={onAdd} variant="ghost" size="sm" className="h-8 gap-1" style={{ color }}>
                        <Plus className="w-4 h-4" strokeWidth={strokeWidth} />
                        {addLabel}
                    </Button>
                )}
            </div>
            {children}
        </section>
    )
}

interface CompactSectionWrapperProps {
    title: string
    icon: ReactNode
    color: string
    onAdd?: () => void
    children: ReactNode
    iconStyle?: IconStyle
}

export function CompactSectionWrapper({ title, icon, color, onAdd, children, iconStyle }: CompactSectionWrapperProps) {
    const strokeWidth = getIconStrokeWidth(iconStyle)
    
    return (
        <section className="border-l-4 pl-4" style={{ borderColor: color }}>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold flex items-center gap-2" style={{ color }}>
                    {icon}
                    {title}
                </h2>
                {onAdd && (
                    <Button onClick={onAdd} variant="ghost" size="sm" className="h-6 w-6 p-0" style={{ color }}>
                        <Plus className="w-4 h-4" strokeWidth={strokeWidth} />
                    </Button>
                )}
            </div>
            {children}
        </section>
    )
}
