"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import type { CVData } from "../../CvEditor"
import { cvTranslations } from "@/lib/cv-translations"
import { ITemplate } from "@/apis/templateApi"

import {
    makeEditable,
    CustomTemplatePreview,
    CVHeader,
    ObjectiveSection,
    ExperienceSection,
    EducationSection,
    LanguagesSection,
    SkillsSection,
    InterestsSection,
    ReferencesSection,
} from "./components"

interface CVEditorPreviewProps {
    cvData: CVData
    setCVData: (data: CVData) => void
    selectedColor: string
    selectedFont: string
    fontSize: number
    template: string
    language: "vi" | "en"
    templateData?: ITemplate | null
}

export function CVEditorPreview({
    cvData,
    setCVData,
    selectedColor,
    selectedFont,
    fontSize,
    template,
    language,
    templateData,
}: CVEditorPreviewProps) {
    const [mounted, setMounted] = useState(false)
    const [initialHtml, setInitialHtml] = useState('')

    const t = cvTranslations[language]
    const hasCustomTemplate = !!(templateData?.html?.trim())

    useEffect(() => { setMounted(true) }, [])

    useEffect(() => {
        if (templateData?.html && !initialHtml) {
            setInitialHtml(makeEditable(templateData.html))
        }
    }, [templateData?.html, initialHtml])

    // Shared props for section components
    const sectionProps = useMemo(() => ({
        cvData,
        setCVData,
        selectedColor,
        fontSize,
        t,
    }), [cvData, setCVData, selectedColor, fontSize, t])

    // Render custom template if available
    if (hasCustomTemplate && mounted && initialHtml) {
        return (
            <CustomTemplatePreview
                initialHtml={initialHtml}
                css={templateData?.css}
            />
        )
    }

    // Render default CV form
    return (
        <Card
            className="bg-white shadow-2xl overflow-hidden mx-auto"
            style={{ width: "21cm", minHeight: "29.7cm", fontFamily: selectedFont, fontSize: `${fontSize}px` }}
        >
            {/* Header */}
            <CVHeader
                cvData={cvData}
                setCVData={setCVData}
                selectedColor={selectedColor}
                template={template}
                t={t}
            />

            {/* Content */}
            <div className="p-8 space-y-6">
                <ObjectiveSection {...sectionProps} />
                <ExperienceSection {...sectionProps} />
                <EducationSection {...sectionProps} />

                {/* Two Column Section */}
                <div className="grid grid-cols-2 gap-6">
                    <LanguagesSection {...sectionProps} />
                    <SkillsSection {...sectionProps} />
                </div>

                {/* Interests Section */}
                <div className="grid grid-cols-2 gap-6">
                    <InterestsSection {...sectionProps} />
                    <div></div>
                </div>

                <ReferencesSection {...sectionProps} />
            </div>
        </Card>
    )
}
