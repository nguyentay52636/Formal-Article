"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import type { CVData } from "../../CvEditor"
import { cvTranslations } from "@/lib/cv-translations"
import { ITemplate } from "@/apis/templateApi"
import type {
    LayoutType,
    Section,
    ColorSettings,
    SpacingSettings,
    IconStyle,
    SectionType
} from "../../types/editor-settings"

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
    // PRO settings
    layout?: LayoutType
    sections?: Section[]
    colors?: ColorSettings
    spacing?: SpacingSettings
    iconStyle?: IconStyle
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
    // PRO settings
    layout = 'two-column-left-wide',
    sections,
    colors,
    spacing,
    iconStyle = 'minimal',
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

    // Use colors from PRO settings or fallback to selectedColor
    const effectiveColor = colors?.primary || selectedColor
    const textColor = colors?.text || '#333333'
    const bgColor = colors?.background || '#FFFFFF'
    const headingColor = colors?.heading || effectiveColor
    const borderColor = colors?.border || '#E5E7EB'

    // Spacing values
    const lineHeight = spacing?.lineHeight || 1.5
    const sectionSpacing = spacing?.sectionSpacing || 24
    const paddingH = spacing?.paddingHorizontal || 32
    const paddingV = spacing?.paddingVertical || 32

    // Shared props for section components
    const sectionProps = useMemo(() => ({
        cvData,
        setCVData,
        selectedColor: headingColor,
        fontSize,
        t,
        iconStyle,
    }), [cvData, setCVData, headingColor, fontSize, t, iconStyle])

    // Layout styles based on layout type
    const layoutStyles = useMemo(() => {
        switch (layout) {
            case 'single-column':
                return { display: 'block' }
            case 'two-column-left-wide':
                return { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: `${sectionSpacing}px` }
            case 'two-column-right-wide':
                return { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: `${sectionSpacing}px` }
            case 'full-width':
                return { display: 'block' }
            default:
                return { display: 'block' }
        }
    }, [layout, sectionSpacing])

    // Render section by type
    const renderSection = (sectionId: SectionType) => {
        switch (sectionId) {
            case 'objective':
                return <ObjectiveSection key={sectionId} {...sectionProps} />
            case 'experience':
                return <ExperienceSection key={sectionId} {...sectionProps} />
            case 'education':
                return <EducationSection key={sectionId} {...sectionProps} />
            case 'skills':
                return <SkillsSection key={sectionId} {...sectionProps} />
            case 'languages':
                return <LanguagesSection key={sectionId} {...sectionProps} />
            case 'interests':
                return <InterestsSection key={sectionId} {...sectionProps} />
            case 'references':
                return <ReferencesSection key={sectionId} {...sectionProps} />
            default:
                return null
        }
    }

    // Get visible sections in order
    const visibleSections = useMemo(() => {
        if (!sections) return ['objective', 'experience', 'education', 'skills', 'languages', 'interests', 'references'] as SectionType[]
        return sections.filter(s => s.visible).map(s => s.id)
    }, [sections])

    // Render custom template if available
    if (hasCustomTemplate && mounted && initialHtml) {
        return (
            <CustomTemplatePreview
                initialHtml={initialHtml}
                css={templateData?.css}
                selectedColor={effectiveColor}
                selectedFont={selectedFont}
                fontSize={fontSize}
            />
        )
    }

    // Render based on layout
    const renderContent = () => {
        if (layout === 'single-column') {
            return (
                <div className="space-y-6" style={{ gap: `${sectionSpacing}px` }}>
                    {visibleSections.map(renderSection)}
                </div>
            )
        }

        if (layout === 'full-width') {
            // Header full width, then 2 columns below
            const mainSections = ['objective', 'experience', 'education'] as SectionType[]
            const sideSections = ['skills', 'languages', 'interests', 'references'] as SectionType[]

            return (
                <div className="space-y-6">
                    {/* Main sections */}
                    {visibleSections.filter(s => mainSections.includes(s)).map(renderSection)}

                    {/* Two column for remaining */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-6">
                            {visibleSections.filter(s => s === 'skills' || s === 'interests').map(renderSection)}
                        </div>
                        <div className="space-y-6">
                            {visibleSections.filter(s => s === 'languages' || s === 'references').map(renderSection)}
                        </div>
                    </div>
                </div>
            )
        }

        // Two column layouts
        const leftSections = layout === 'two-column-left-wide'
            ? ['objective', 'experience', 'education', 'references']
            : ['skills', 'languages', 'interests']
        const rightSections = layout === 'two-column-left-wide'
            ? ['skills', 'languages', 'interests']
            : ['objective', 'experience', 'education', 'references']

        return (
            <div style={layoutStyles}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${sectionSpacing}px` }}>
                    {visibleSections.filter(s => leftSections.includes(s)).map(renderSection)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${sectionSpacing}px` }}>
                    {visibleSections.filter(s => rightSections.includes(s)).map(renderSection)}
                </div>
            </div>
        )
    }

    // Render default CV form
    return (
        <Card
            className="bg-white shadow-2xl overflow-hidden mx-auto"
            style={{
                width: "21cm",
                minHeight: "29.7cm",
                fontFamily: selectedFont,
                fontSize: `${fontSize}px`,
                backgroundColor: bgColor,
                color: textColor,
                lineHeight: lineHeight,
            }}
        >
            {/* Header */}
            <CVHeader
                cvData={cvData}
                setCVData={setCVData}
                selectedColor={headingColor}
                template={template}
                t={t}
                iconStyle={iconStyle}
            />

            {/* Content */}
            <div
                style={{
                    padding: `${paddingV}px ${paddingH}px`,
                    borderColor: borderColor,
                }}
            >
                {renderContent()}
            </div>
        </Card>
    )
}
