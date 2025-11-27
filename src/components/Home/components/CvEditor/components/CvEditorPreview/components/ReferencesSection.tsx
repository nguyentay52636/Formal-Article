"use client"

import { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserCheck, Plus, Trash2 } from "lucide-react"
import { SectionWrapper } from "./SectionWrapper"
import type { SectionProps } from "./types"
import { getIconStrokeWidth } from "./types"

type ReferencesSectionProps = Pick<SectionProps, 'cvData' | 'setCVData' | 'selectedColor' | 'fontSize' | 't' | 'iconStyle'>

export function ReferencesSection({ cvData, setCVData, selectedColor, fontSize, t, iconStyle }: ReferencesSectionProps) {
    const strokeWidth = getIconStrokeWidth(iconStyle)
    
    const addReference = useCallback(() => {
        setCVData({
            ...cvData,
            references: [...cvData.references, { id: Date.now().toString(), name: "", position: "", company: "", contact: "" }],
        })
    }, [cvData, setCVData])

    const updateReference = useCallback((id: string, field: string, value: string) => {
        setCVData({
            ...cvData,
            references: cvData.references.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
        })
    }, [cvData, setCVData])

    const removeReference = useCallback((id: string) => {
        setCVData({ ...cvData, references: cvData.references.filter((item) => item.id !== id) })
    }, [cvData, setCVData])

    return (
        <SectionWrapper
            title={t.references}
            icon={<UserCheck className="w-5 h-5" strokeWidth={strokeWidth} />}
            color={selectedColor}
            onAdd={addReference}
            addLabel={t.buttons.add}
            iconStyle={iconStyle}
        >
            <div className="space-y-4">
                {cvData.references.map((ref) => (
                    <div key={ref.id} className="space-y-2 relative group">
                        <Button
                            onClick={() => removeReference(ref.id)}
                            variant="ghost"
                            size="sm"
                            className="absolute -right-2 -top-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white"
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                        <Input 
                            value={ref.name} 
                            onChange={(e) => updateReference(ref.id, "name", e.target.value)} 
                            placeholder={t.placeholders.referenceName} 
                            style={{ fontSize: `${fontSize}px` }} 
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <Input 
                                value={ref.position} 
                                onChange={(e) => updateReference(ref.id, "position", e.target.value)} 
                                placeholder={t.placeholders.referencePosition} 
                                style={{ fontSize: `${fontSize}px` }} 
                            />
                            <Input 
                                value={ref.company} 
                                onChange={(e) => updateReference(ref.id, "company", e.target.value)} 
                                placeholder={t.placeholders.referenceCompany} 
                                style={{ fontSize: `${fontSize}px` }} 
                            />
                        </div>
                        <Input 
                            value={ref.contact} 
                            onChange={(e) => updateReference(ref.id, "contact", e.target.value)} 
                            placeholder={t.placeholders.referenceContact} 
                            style={{ fontSize: `${fontSize}px` }} 
                        />
                    </div>
                ))}
                {cvData.references.length === 0 && (
                    <Button onClick={addReference} variant="outline" size="sm" className="w-full bg-transparent" style={{ fontSize: `${fontSize}px` }}>
                        <Plus className="w-4 h-4 mr-2" strokeWidth={strokeWidth} />
                        {t.placeholders.addReference}
                    </Button>
                )}
            </div>
        </SectionWrapper>
    )
}
