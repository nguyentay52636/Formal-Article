"use client"

import type React from "react"
import { useRef, useCallback, useMemo, useState, forwardRef, useImperativeHandle } from "react"
import { Card } from "@/components/ui/card"
import { EDITABLE_STYLES } from "./constants"
import { ImageCropper } from "../../CvEditorSiderBar/components/ImageCropper"

interface CustomTemplatePreviewProps {
    initialHtml: string
    css?: string
    // Sidebar settings
    selectedColor?: string
    selectedFont?: string
    fontSize?: number
}

export interface CustomTemplatePreviewRef {
    getEditedHtml: () => string
}

export const CustomTemplatePreview = forwardRef<CustomTemplatePreviewRef, CustomTemplatePreviewProps>(({
    initialHtml,
    css,
    selectedColor,
    selectedFont,
    fontSize,
}, ref) => {
    const cvWrapperRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const templateFileInputRef = useRef<HTMLInputElement>(null)
    const [cropperOpen, setCropperOpen] = useState(false)
    const [imageToCrop, setImageToCrop] = useState<string>("")

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

    // Handle file selection - open cropper instead of direct upload
    const handleTemplateImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageToCrop(reader.result as string)
                setCropperOpen(true)
            }
            reader.readAsDataURL(file)
        }
        // Reset input to allow selecting the same file again
        if (templateFileInputRef.current) {
            templateFileInputRef.current.value = ""
        }
    }, [])

    // Handle cropped image from ImageCropper
    const handleCropComplete = useCallback((croppedImage: string) => {
        if (cvWrapperRef.current) {
            const avatarImg = cvWrapperRef.current?.querySelector('.avatar-box img') as HTMLImageElement
            if (avatarImg) {
                avatarImg.src = croppedImage
            }
        }
        setImageToCrop("")
    }, [])

    const handleAvatarClick = useCallback((e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.avatar-box')) {
            e.preventDefault()
            e.stopPropagation()
            templateFileInputRef.current?.click()
        }
    }, [])

    // Function to get edited HTML content (full Card with wrapper)
    const getEditedHtml = useCallback(() => {
        if (cardRef.current) {
            // Return full Card element HTML
            return cardRef.current.outerHTML
        }
        // Fallback to wrapper content
        return cvWrapperRef.current?.innerHTML || ''
    }, [])

    // Expose getEditedHtml via ref
    useImperativeHandle(ref, () => ({
        getEditedHtml
    }), [getEditedHtml])

    return (
        <>
            <Card
                ref={cardRef}
                className="bg-white shadow-2xl overflow-hidden mx-auto"
                style={{ width: "21cm", minHeight: "29.7cm" }}
            >
                <input
                    ref={templateFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleTemplateImageSelect}
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

            {/* Image Cropper Dialog */}
            {imageToCrop && (
                <ImageCropper
                    open={cropperOpen}
                    onOpenChange={setCropperOpen}
                    imageSrc={imageToCrop}
                    onCropComplete={handleCropComplete}
                />
            )}
        </>
    )
})

CustomTemplatePreview.displayName = "CustomTemplatePreview"
