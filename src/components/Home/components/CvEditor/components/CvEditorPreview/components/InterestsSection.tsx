"use client"

import { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Heart, Plus, Trash2 } from "lucide-react"
import { CompactSectionWrapper } from "./SectionWrapper"
import type { SectionProps } from "./types"
import { getIconStrokeWidth } from "./types"

type InterestsSectionProps = Pick<SectionProps, 'cvData' | 'setCVData' | 'selectedColor' | 'fontSize' | 't' | 'iconStyle'>

export function InterestsSection({ cvData, setCVData, selectedColor, fontSize, t, iconStyle }: InterestsSectionProps) {
    const strokeWidth = getIconStrokeWidth(iconStyle)
    
    const addInterest = useCallback(() => {
        setCVData({
            ...cvData,
            interests: [...cvData.interests, { id: Date.now().toString(), interest: "" }],
        })
    }, [cvData, setCVData])

    const updateInterest = useCallback((id: string, value: string) => {
        setCVData({
            ...cvData,
            interests: cvData.interests.map((item) => (item.id === id ? { ...item, interest: value } : item)),
        })
    }, [cvData, setCVData])

    const removeInterest = useCallback((id: string) => {
        setCVData({ ...cvData, interests: cvData.interests.filter((item) => item.id !== id) })
    }, [cvData, setCVData])

    return (
        <CompactSectionWrapper
            title={t.interests}
            icon={<Heart className="w-5 h-5" strokeWidth={strokeWidth} />}
            color={selectedColor}
            onAdd={addInterest}
            iconStyle={iconStyle}
        >
            <div className="space-y-2">
                {cvData.interests.map((interest) => (
                    <div key={interest.id} className="flex gap-2 group">
                        <Input 
                            value={interest.interest} 
                            onChange={(e) => updateInterest(interest.id, e.target.value)} 
                            placeholder={t.placeholders.addInterest} 
                            style={{ fontSize: `${fontSize}px` }} 
                        />
                        <Button 
                            onClick={() => removeInterest(interest.id)} 
                            variant="ghost" 
                            size="sm" 
                            className="h-9 w-9 p-0 shrink-0 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white"
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                ))}
                {cvData.interests.length === 0 && (
                    <Button onClick={addInterest} variant="outline" size="sm" className="w-full bg-transparent" style={{ fontSize: `${fontSize}px` }}>
                        <Plus className="w-4 h-4 mr-1" strokeWidth={strokeWidth} />
                        {t.placeholders.addInterest}
                    </Button>
                )}
            </div>
        </CompactSectionWrapper>
    )
}
