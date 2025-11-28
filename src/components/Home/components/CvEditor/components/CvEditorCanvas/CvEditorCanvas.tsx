"use client"

import { CVData } from "../../CvEditor"
import { CVEditorPreview } from "../CvEditorPreview/CvEditorPreview"
import { ITemplate } from "@/apis/templateApi"
import type {
    LayoutType,
    Section,
    ColorSettings,
    SpacingSettings,
    IconStyle
} from "../../types/editor-settings"

interface CVEditorCanvasProps {
    cvData: CVData
    setCVData: (data: CVData) => void
    selectedColor: string
    selectedFont: string
    fontSize: number
    template: string
    zoom: number
    language: "vi" | "en"
    templateData?: ITemplate | null
    // PRO settings
    layout?: LayoutType
    sections?: Section[]
    colors?: ColorSettings
    spacing?: SpacingSettings
    iconStyle?: IconStyle
    // Callback to get HTML
    onGetHtml?: (getHtml: () => string) => void
}

export function CVEditorCanvas({
    cvData,
    setCVData,
    selectedColor,
    selectedFont,
    fontSize,
    template,
    zoom,
    language,
    templateData,
    // PRO settings
    layout,
    sections,
    colors,
    spacing,
    iconStyle,
    onGetHtml,
}: CVEditorCanvasProps) {
    return (
        <main className="flex-1 overflow-auto bg-[#2C2C2C] p-8">
            <div
                className="max-w-4xl mx-auto"
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center", transition: "transform 0.2s ease" }}
            >
                <CVEditorPreview
                    cvData={cvData}
                    setCVData={setCVData}
                    selectedColor={selectedColor}
                    selectedFont={selectedFont}
                    fontSize={fontSize}
                    template={template}
                    language={language}
                    templateData={templateData}
                    // PRO settings
                    layout={layout}
                    sections={sections}
                    colors={colors}
                    spacing={spacing}
                    iconStyle={iconStyle}
                    onGetHtml={onGetHtml}
                />
            </div>
        </main>
    )
}
