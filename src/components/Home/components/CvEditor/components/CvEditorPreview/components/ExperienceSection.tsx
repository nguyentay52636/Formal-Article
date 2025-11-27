"use client"

import { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Briefcase, Trash2 } from "lucide-react"
import { SectionWrapper } from "./SectionWrapper"
import type { SectionProps } from "./types"
import { getIconStrokeWidth } from "./types"

type ExperienceSectionProps = Pick<SectionProps, 'cvData' | 'setCVData' | 'selectedColor' | 'fontSize' | 't' | 'iconStyle'>

export function ExperienceSection({ cvData, setCVData, selectedColor, fontSize, t, iconStyle }: ExperienceSectionProps) {
    const strokeWidth = getIconStrokeWidth(iconStyle)
    
    const addExperience = useCallback(() => {
        setCVData({
            ...cvData,
            experience: [...cvData.experience, { id: Date.now().toString(), period: "", company: "", description: "" }],
        })
    }, [cvData, setCVData])

    const updateExperience = useCallback((id: string, field: string, value: string) => {
        setCVData({
            ...cvData,
            experience: cvData.experience.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
        })
    }, [cvData, setCVData])

    const removeExperience = useCallback((id: string) => {
        setCVData({ ...cvData, experience: cvData.experience.filter((item) => item.id !== id) })
    }, [cvData, setCVData])

    return (
        <SectionWrapper
            title={t.experience}
            icon={<Briefcase className="w-5 h-5" strokeWidth={strokeWidth} />}
            color={selectedColor}
            onAdd={addExperience}
            addLabel={t.buttons.add}
            iconStyle={iconStyle}
        >
            <div className="space-y-4">
                {cvData.experience.map((exp) => (
                    <div key={exp.id} className="space-y-2 relative group">
                        <Button
                            onClick={() => removeExperience(exp.id)}
                            variant="ghost"
                            size="sm"
                            className="absolute -right-2 -top-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white"
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                        <Input 
                            value={exp.period} 
                            onChange={(e) => updateExperience(exp.id, "period", e.target.value)} 
                            className="font-semibold" 
                            style={{ fontSize: `${fontSize}px` }} 
                            placeholder={t.placeholders.period} 
                        />
                        <Input 
                            value={exp.company} 
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)} 
                            style={{ fontSize: `${fontSize}px` }} 
                            placeholder={t.placeholders.addExperience} 
                        />
                        <Textarea 
                            value={exp.description} 
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)} 
                            className="resize-none" 
                            style={{ fontSize: `${fontSize}px` }} 
                            rows={2} 
                            placeholder={t.placeholders.jobDescription} 
                        />
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}
