"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface SectionWrapperProps {
    title: string
    icon: ReactNode
    color: string
    onAdd?: () => void
    addLabel?: string
    children: ReactNode
}

export function SectionWrapper({ title, icon, color, onAdd, addLabel, children }: SectionWrapperProps) {
    return (
        <section className="border-l-4 pl-4" style={{ borderColor: color }}>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color }}>
                    {icon}
                    {title}
                </h2>
                {onAdd && (
                    <Button onClick={onAdd} variant="ghost" size="sm" className="h-8 gap-1" style={{ color }}>
                        <Plus className="w-4 h-4" />
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
}

export function CompactSectionWrapper({ title, icon, color, onAdd, children }: CompactSectionWrapperProps) {
    return (
        <section className="border-l-4 pl-4" style={{ borderColor: color }}>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold flex items-center gap-2" style={{ color }}>
                    {icon}
                    {title}
                </h2>
                {onAdd && (
                    <Button onClick={onAdd} variant="ghost" size="sm" className="h-6 w-6 p-0" style={{ color }}>
                        <Plus className="w-4 h-4" />
                    </Button>
                )}
            </div>
            {children}
        </section>
    )
}

