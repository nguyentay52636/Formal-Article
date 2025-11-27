"use client"

import { useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase } from "lucide-react"
import type { SectionProps } from "./types"
import { getIconStrokeWidth } from "./types"

type ObjectiveSectionProps = Pick<SectionProps, 'cvData' | 'setCVData' | 'selectedColor' | 'fontSize' | 't' | 'iconStyle'>

export function ObjectiveSection({ cvData, setCVData, selectedColor, fontSize, t, iconStyle }: ObjectiveSectionProps) {
    const strokeWidth = getIconStrokeWidth(iconStyle)
    
    const updateObjective = useCallback((value: string) => {
        setCVData({ ...cvData, objective: value })
    }, [cvData, setCVData])

    return (
        <section className="border-l-4 pl-4" style={{ borderColor: selectedColor }}>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: selectedColor }}>
                <Briefcase className="w-5 h-5" strokeWidth={strokeWidth} />
                {t.objective}
            </h2>
            <Textarea
                value={cvData.objective}
                onChange={(e) => updateObjective(e.target.value)}
                className="min-h-[150px] border-gray-200 leading-relaxed resize-none"
                style={{ fontSize: `${fontSize}px` }}
                placeholder={t.placeholders.objectiveText}
            />
        </section>
    )
}
