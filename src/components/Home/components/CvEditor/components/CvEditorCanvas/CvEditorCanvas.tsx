"use client"

import { CVData } from "../../CvEditor"
import { CVEditorPreview } from "../CvEditorPreview/CvEditorPreview"


interface CVEditorCanvasProps {
    cvData: CVData
    setCVData: (data: CVData) => void
    selectedColor: string
    selectedFont: string
    fontSize: number
    template: string
    zoom: number
    language: "vi" | "en" // Add language prop
}

export function CVEditorCanvas({
    cvData,
    setCVData,
    selectedColor,
    selectedFont,
    fontSize,
    template,
    zoom,
    language, // Destructure language prop
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
                />
            </div>
        </main>
    )
}
