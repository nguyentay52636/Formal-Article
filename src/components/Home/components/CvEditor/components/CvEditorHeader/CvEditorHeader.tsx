"use client"

import {
    UndoRedoButtons,
    ZoomControls,
    LanguageSwitcher,
    SaveButton,
    ExportMenu,
    BackButton,
} from "./components"

interface CVEditorHeaderProps {
    cvData: any
    onSave: () => void
    onExportPDF: () => void
    onExportWord: () => void
    onExportImage: () => void
    onUndo: () => void
    onRedo: () => void
    canUndo: boolean
    canRedo: boolean
    zoom: number
    onZoomChange: (zoom: number) => void
    language: "vi" | "en" // Add language prop
    onLanguageChange: (lang: "vi" | "en") => void // Add language change handler
}

export function CvEditorHeader({
    cvData,
    onSave,
    onExportPDF,
    onExportWord,
    onExportImage,
    onUndo,
    onRedo,
    canUndo,
    canRedo,
    zoom,
    onZoomChange,
    language,
    onLanguageChange,
}: CVEditorHeaderProps) {
    return (
        <header className="bg-[#1E1E1E] border-b border-gray-700 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <BackButton href="/" label="Trang chủ" />
                <div className="text-white">
                    <h1 className="text-lg font-semibold">Mẫu CV chuyên viên logistics</h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <UndoRedoButtons
                    onUndo={onUndo}
                    onRedo={onRedo}
                    canUndo={canUndo}
                    canRedo={canRedo}
                />

                <ZoomControls zoom={zoom} onZoomChange={onZoomChange} />

                <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />

                <SaveButton onSave={onSave} />

                <ExportMenu
                    cvData={cvData}
                    onExportPDF={onExportPDF}
                    onExportWord={onExportWord}
                    onExportImage={onExportImage}
                />
            </div>
        </header>
    )
}
