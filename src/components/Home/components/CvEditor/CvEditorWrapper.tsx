"use client"

import { useEffect } from "react"
import { CvEditor } from "./CvEditor"
import { ITemplate } from "@/apis/templateApi"

interface CvEditorWrapperProps {
    cvId: string
    template: ITemplate
}

export function CvEditorWrapper({ cvId, template }: CvEditorWrapperProps) {
    useEffect(() => {
        // Store template info in localStorage for reference
        try {
            localStorage.setItem(`cv-template-${cvId}`, JSON.stringify({
                templateId: template.id,
                templateName: template.name,
                templateSlug: template.slug,
                loadedAt: new Date().toISOString()
            }))
        } catch (error) {
            console.error("Error storing template info:", error)
        }
    }, [cvId, template])

    return <CvEditor cvId={cvId} template={template} />
}
