"use client"

import { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star, Plus, Trash2 } from "lucide-react"
import { CompactSectionWrapper } from "./SectionWrapper"
import type { SectionProps } from "./types"
import { getIconStrokeWidth } from "./types"

type SkillsSectionProps = Pick<SectionProps, 'cvData' | 'setCVData' | 'selectedColor' | 'fontSize' | 't' | 'iconStyle'>

export function SkillsSection({ cvData, setCVData, selectedColor, fontSize, t, iconStyle }: SkillsSectionProps) {
    const strokeWidth = getIconStrokeWidth(iconStyle)
    
    const addSkill = useCallback(() => {
        setCVData({
            ...cvData,
            skills: [...cvData.skills, { id: Date.now().toString(), skill: "" }],
        })
    }, [cvData, setCVData])

    const updateSkill = useCallback((id: string, value: string) => {
        setCVData({
            ...cvData,
            skills: cvData.skills.map((item) => (item.id === id ? { ...item, skill: value } : item)),
        })
    }, [cvData, setCVData])

    const removeSkill = useCallback((id: string) => {
        setCVData({ ...cvData, skills: cvData.skills.filter((item) => item.id !== id) })
    }, [cvData, setCVData])

    return (
        <CompactSectionWrapper
            title={t.skills}
            icon={<Star className="w-5 h-5" strokeWidth={strokeWidth} />}
            color={selectedColor}
            onAdd={addSkill}
            iconStyle={iconStyle}
        >
            <div className="space-y-2">
                {cvData.skills.map((skill) => (
                    <div key={skill.id} className="flex gap-2 group">
                        <Input 
                            value={skill.skill} 
                            onChange={(e) => updateSkill(skill.id, e.target.value)} 
                            placeholder={t.placeholders.addSkill} 
                            style={{ fontSize: `${fontSize}px` }} 
                        />
                        <Button 
                            onClick={() => removeSkill(skill.id)} 
                            variant="ghost" 
                            size="sm" 
                            className="h-9 w-9 p-0 shrink-0 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white"
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                ))}
                {cvData.skills.length === 0 && (
                    <Button onClick={addSkill} variant="outline" size="sm" className="w-full bg-transparent" style={{ fontSize: `${fontSize}px` }}>
                        <Plus className="w-4 h-4 mr-1" strokeWidth={strokeWidth} />
                        {t.placeholders.addSkill}
                    </Button>
                )}
            </div>
        </CompactSectionWrapper>
    )
}
