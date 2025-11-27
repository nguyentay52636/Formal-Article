import type { CVData } from "../../../CvEditor"
import type { IconStyle } from "../../../types/editor-settings"

export interface SectionProps {
    cvData: CVData
    setCVData: (data: CVData) => void
    selectedColor: string
    fontSize: number
    t: {
        objective: string
        experience: string
        education: string
        languages: string
        skills: string
        interests: string
        references: string
        placeholders: Record<string, string>
        buttons: Record<string, string>
    }
    // PRO settings
    iconStyle?: IconStyle
    lineHeight?: number
    sectionSpacing?: number
}

export interface Experience {
    id: string
    period: string
    company: string
    description: string
}

export interface Education {
    id: string
    period: string
    school: string
    description: string
}

export interface Language {
    id: string
    language: string
}

export interface Skill {
    id: string
    skill: string
}

export interface Interest {
    id: string
    interest: string
}

export interface Reference {
    id: string
    name: string
    position: string
    company: string
    contact: string
}

// Helper to get icon stroke width based on style
export const getIconStrokeWidth = (iconStyle: IconStyle = 'minimal'): number => {
    switch (iconStyle) {
        case 'minimal': return 1
        case 'bold': return 2.5
        case 'filled': return 2
        case 'rounded': return 1.5
        default: return 1.5
    }
}
