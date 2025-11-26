"use client"

import { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { GraduationCap, Trash2 } from "lucide-react"
import { SectionWrapper } from "./SectionWrapper"
import type { SectionProps } from "./types"

type EducationSectionProps = Pick<SectionProps, 'cvData' | 'setCVData' | 'selectedColor' | 'fontSize' | 't'>

export function EducationSection({ cvData, setCVData, selectedColor, fontSize, t }: EducationSectionProps) {
    const addEducation = useCallback(() => {
        setCVData({
            ...cvData,
            education: [...cvData.education, { id: Date.now().toString(), period: "", school: "", description: "" }],
        })
    }, [cvData, setCVData])

    const updateEducation = useCallback((id: string, field: string, value: string) => {
        setCVData({
            ...cvData,
            education: cvData.education.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
        })
    }, [cvData, setCVData])

    const removeEducation = useCallback((id: string) => {
        setCVData({ ...cvData, education: cvData.education.filter((item) => item.id !== id) })
    }, [cvData, setCVData])

    return (
        <SectionWrapper
            title={t.education}
            icon={<GraduationCap className="w-5 h-5" />}
            color={selectedColor}
            onAdd={addEducation}
            addLabel={t.buttons.add}
        >
            <div className="space-y-4">
                {cvData.education.map((edu) => (
                    <div key={edu.id} className="space-y-2 relative group">
                        <Button
                            onClick={() => removeEducation(edu.id)}
                            variant="ghost"
                            size="sm"
                            className="absolute -right-2 -top-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white"
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                        <Input 
                            value={edu.period} 
                            onChange={(e) => updateEducation(edu.id, "period", e.target.value)} 
                            className="font-semibold" 
                            style={{ fontSize: `${fontSize}px` }} 
                            placeholder={t.placeholders.period} 
                        />
                        <Input 
                            value={edu.school} 
                            onChange={(e) => updateEducation(edu.id, "school", e.target.value)} 
                            style={{ fontSize: `${fontSize}px` }} 
                            placeholder={t.placeholders.addEducation} 
                        />
                        <Textarea 
                            value={edu.description} 
                            onChange={(e) => updateEducation(edu.id, "description", e.target.value)} 
                            className="resize-none" 
                            style={{ fontSize: `${fontSize}px` }} 
                            rows={2} 
                            placeholder={t.placeholders.educationDescription} 
                        />
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}

