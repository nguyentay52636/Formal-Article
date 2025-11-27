"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Download, FileText, FileType, ImageIcon, Printer } from "lucide-react"

interface ExportMenuProps {
    cvData: any
    onExportPDF: () => void
    onExportWord: () => void
    onExportImage: () => void
}

export function ExportMenu({ cvData, onExportPDF, onExportWord, onExportImage }: ExportMenuProps) {
    const handleExportJSON = () => {
        const dataStr = JSON.stringify(cvData, null, 2)
        const dataBlob = new Blob([dataStr], { type: "application/json" })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = "cv-data.json"
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
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
                <DropdownMenuItem onClick={handleExportJSON}>
                    <Download className="w-4 h-4 mr-2" />
                    Tải dữ liệu JSON
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
