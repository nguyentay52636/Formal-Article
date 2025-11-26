"use client"

import type React from "react"
import { useRef, useCallback, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { EDITABLE_STYLES } from "./constants"

interface CustomTemplatePreviewProps {
    initialHtml: string
    css?: string
}

export function CustomTemplatePreview({ initialHtml, css }: CustomTemplatePreviewProps) {
    const cvWrapperRef = useRef<HTMLDivElement>(null)
    const templateFileInputRef = useRef<HTMLInputElement>(null)

    const templateCss = useMemo(() => EDITABLE_STYLES + (css || ''), [css])

    const handleTemplateImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && cvWrapperRef.current) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const avatarImg = cvWrapperRef.current?.querySelector('.avatar-box img') as HTMLImageElement
                if (avatarImg) avatarImg.src = reader.result as string
            }
            reader.readAsDataURL(file)
        }
    }, [])

    const handleAvatarClick = useCallback((e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.avatar-box')) {
            e.preventDefault()
            e.stopPropagation()
            templateFileInputRef.current?.click()
        }
    }, [])

    // Function to get edited HTML content
    const getEditedHtml = useCallback(() => {
        return cvWrapperRef.current?.innerHTML || ''
    }, [])

    return (
        <Card className="bg-white shadow-2xl overflow-hidden mx-auto" style={{ width: "21cm", minHeight: "29.7cm" }}>
            <input 
                ref={templateFileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={handleTemplateImageUpload} 
                className="hidden" 
            />
            <style dangerouslySetInnerHTML={{ __html: templateCss }} />
            <div
                ref={cvWrapperRef}
                className="cv-template-wrapper"
                dangerouslySetInnerHTML={{ __html: initialHtml }}
                suppressContentEditableWarning
                onClick={handleAvatarClick}
            />
        </Card>
    )
}

