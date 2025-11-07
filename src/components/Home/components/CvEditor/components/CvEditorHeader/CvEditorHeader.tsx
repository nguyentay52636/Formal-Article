"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
    ChevronLeft,
    Save,
    Download,
    FileText,
    Undo2,
    Redo2,
    ZoomIn,
    ZoomOut,
    Printer,
    ImageIcon,
    FileType,
} from "lucide-react"
import Link from "next/link"

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
                <Link href="/">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Trang 2
                    </Button>
                </Link>
                <div className="text-white">
                    <h1 className="text-lg font-semibold">Mẫu CV chuyên viên logistics</h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 border-r border-gray-600 pr-3">
                    <Button
                        onClick={onUndo}
                        disabled={!canUndo}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-gray-700 disabled:opacity-40"
                        title="Hoàn tác (Ctrl+Z)"
                    >
                        <Undo2 className="w-4 h-4" />
                    </Button>
                    <Button
                        onClick={onRedo}
                        disabled={!canRedo}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-gray-700 disabled:opacity-40"
                        title="Làm lại (Ctrl+Y)"
                    >
                        <Redo2 className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2 bg-gray-700 rounded px-3 py-1.5 border-r border-gray-600 mr-3">
                    <Button
                        onClick={() => onZoomChange(Math.max(50, zoom - 10))}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-white hover:bg-gray-600"
                        disabled={zoom <= 50}
                    >
                        <ZoomOut className="w-3 h-3" />
                    </Button>
                    <span className="text-white text-sm font-medium min-w-[3rem] text-center">{zoom}%</span>
                    <Button
                        onClick={() => onZoomChange(Math.min(200, zoom + 10))}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-white hover:bg-gray-600"
                        disabled={zoom >= 200}
                    >
                        <ZoomIn className="w-3 h-3" />
                    </Button>
                </div>

                <div className="flex items-center gap-2 bg-gray-700 rounded px-3 py-1.5">
                    <span className="text-white text-sm">Ngôn ngữ CV:</span>
                    <div className="flex gap-1">
                        <button
                            onClick={() => onLanguageChange("vi")}
                            className={`w-6 h-4 rounded flex items-center justify-center text-[10px] font-bold transition-all ${language === "vi" ? "bg-red-500 text-white scale-110" : "bg-gray-500 text-gray-300 hover:bg-gray-400"
                                }`}
                            title="Tiếng Việt"
                        >
                            VN
                        </button>
                        <button
                            onClick={() => onLanguageChange("en")}
                            className={`w-6 h-4 rounded flex items-center justify-center text-[10px] font-bold transition-all ${language === "en" ? "bg-blue-500 text-white scale-110" : "bg-gray-500 text-gray-300 hover:bg-gray-400"
                                }`}
                            title="English"
                        >
                            EN
                        </button>
                    </div>
                </div>

                <Button onClick={onSave} className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold">
                    <Save className="w-4 h-4 mr-2" />
                    Lưu hồ sơ
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-[#00B4D8] hover:bg-[#0096B8] text-white font-semibold">
                            <Download className="w-4 h-4 mr-2" />
                            Tải xuống
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={onExportPDF}>
                            <FileText className="w-4 h-4 mr-2" />
                            Xuất file PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onExportWord}>
                            <FileType className="w-4 h-4 mr-2" />
                            Xuất file Word (.docx)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onExportImage}>
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Xuất ảnh PNG
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => window.print()}>
                            <Printer className="w-4 h-4 mr-2" />
                            In CV
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                const dataStr = JSON.stringify(cvData, null, 2)
                                const dataBlob = new Blob([dataStr], { type: "application/json" })
                                const url = URL.createObjectURL(dataBlob)
                                const link = document.createElement("a")
                                link.href = url
                                link.download = "cv-data.json"
                                link.click()
                                URL.revokeObjectURL(url)
                            }}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Tải dữ liệu JSON
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
