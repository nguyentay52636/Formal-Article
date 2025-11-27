"use client"

import type React from "react"
import { useRef, useCallback, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { EDITABLE_STYLES } from "./constants"

interface CustomTemplatePreviewProps {
    initialHtml: string
    css?: string
    // Sidebar settings
    selectedColor?: string
    selectedFont?: string
    fontSize?: number
}

export function CustomTemplatePreview({ 
    initialHtml, 
    css,
    selectedColor,
    selectedFont,
    fontSize,
}: CustomTemplatePreviewProps) {
    const cvWrapperRef = useRef<HTMLDivElement>(null)
    const templateFileInputRef = useRef<HTMLInputElement>(null)

    // Dynamic CSS overrides based on sidebar settings
    const dynamicStyles = useMemo(() => {
        let styles = ''
        
        if (selectedColor) {
            styles += `
                .cv-template-wrapper .name,
                .cv-template-wrapper h1,
                .cv-template-wrapper .section h2 {
                    color: ${selectedColor} !important;
                }
                .cv-template-wrapper .section h2 {
                    border-bottom-color: ${selectedColor} !important;
                }
                .cv-template-wrapper .left-panel {
                    border-right-color: ${selectedColor}22 !important;
                }
            `
        }
        
        if (selectedFont) {
            styles += `
                .cv-template-wrapper,
                .cv-template-wrapper * {
                    font-family: '${selectedFont}', sans-serif !important;
                }
            `
        }
        
        if (fontSize) {
            styles += `
                .cv-template-wrapper {
                    font-size: ${fontSize}px !important;
                }
                .cv-template-wrapper p,
                .cv-template-wrapper li {
                    font-size: ${fontSize}px !important;
                }
                .cv-template-wrapper .name {
                    font-size: ${Math.round(fontSize * 1.8)}px !important;
                }
                .cv-template-wrapper .title {
                    font-size: ${Math.round(fontSize * 1.1)}px !important;
                }
                .cv-template-wrapper .section h2 {
                    font-size: ${Math.round(fontSize * 1.2)}px !important;
                }
            `
        }
        
        return styles
    }, [selectedColor, selectedFont, fontSize])

    const templateCss = useMemo(() => 
        EDITABLE_STYLES + (css || '') + dynamicStyles, 
        [css, dynamicStyles]
    )

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
