"use client"

import { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Languages, Plus, Trash2 } from "lucide-react"
import { CompactSectionWrapper } from "./SectionWrapper"
import type { SectionProps } from "./types"

type LanguagesSectionProps = Pick<SectionProps, 'cvData' | 'setCVData' | 'selectedColor' | 'fontSize' | 't'>

export function LanguagesSection({ cvData, setCVData, selectedColor, fontSize, t }: LanguagesSectionProps) {
    const addLanguage = useCallback(() => {
        setCVData({
            ...cvData,
            languages: [...cvData.languages, { id: Date.now().toString(), language: "" }],
        })
    }, [cvData, setCVData])

    const updateLanguage = useCallback((id: string, value: string) => {
        setCVData({
            ...cvData,
            languages: cvData.languages.map((item) => (item.id === id ? { ...item, language: value } : item)),
        })
    }, [cvData, setCVData])

    const removeLanguage = useCallback((id: string) => {
        setCVData({ ...cvData, languages: cvData.languages.filter((item) => item.id !== id) })
    }, [cvData, setCVData])

    return (
        <CompactSectionWrapper
            title={t.languages}
            icon={<Languages className="w-5 h-5" />}
            color={selectedColor}
            onAdd={addLanguage}
        >
            <div className="space-y-2">
                {cvData.languages.map((lang) => (
                    <div key={lang.id} className="flex gap-2 group">
                        <Input 
                            value={lang.language} 
                            onChange={(e) => updateLanguage(lang.id, e.target.value)} 
                            placeholder={t.placeholders.addLanguage} 
                            style={{ fontSize: `${fontSize}px` }} 
                        />
                        <Button 
                            onClick={() => removeLanguage(lang.id)} 
                            variant="ghost" 
                            size="sm" 
                            className="h-9 w-9 p-0 shrink-0 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white"
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                ))}
                {cvData.languages.length === 0 && (
                    <Button onClick={addLanguage} variant="outline" size="sm" className="w-full bg-transparent" style={{ fontSize: `${fontSize}px` }}>
                        <Plus className="w-4 h-4 mr-1" />
                        {t.placeholders.addLanguage}
                    </Button>
                )}
            </div>
        </CompactSectionWrapper>
    )
}

