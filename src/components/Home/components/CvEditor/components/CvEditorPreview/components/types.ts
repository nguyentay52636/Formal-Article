import type { CVData } from "../../../CvEditor"

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

