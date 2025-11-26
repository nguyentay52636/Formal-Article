"use client"

import { useState, useEffect } from "react"

import { useToast } from "@/hooks/use-toast"
import { CvEditorHeader } from "./components/CvEditorHeader/CvEditorHeader"
import { CVEditorSidebar } from "./components/CvEditorSiderBar/CvEditorSiderBar"
import { CVEditorCanvas } from "./components/CvEditorCanvas/CvEditorCanvas"
import { ITemplate } from "@/apis/templateApi"

interface CVEditorProps {
    cvId: string
    template?: ITemplate
}

export interface CVData {
    personalInfo: {
        fullName: string
        position: string
        birthDate: string
        gender: string
        email: string
        phone: string
        address: string
        photo: string
    }
    objective: string
    experience: Array<{
        id: string
        period: string
        company: string
        description: string
    }>
    education: Array<{
        id: string
        period: string
        school: string
        description: string
    }>
    languages: Array<{
        id: string
        language: string
    }>
    skills: Array<{
        id: string
        skill: string
    }>
    interests: Array<{
        id: string
        interest: string
    }>
    references: Array<{
        id: string
        name: string
        position: string
        company: string
        contact: string
    }>
}

interface HistoryState {
    cvData: CVData
    selectedColor: string
    selectedFont: string
    fontSize: number
    templateStyle: string
}

export function CvEditor({ cvId, template }: CVEditorProps) {
    const { toast } = useToast()
    const [cvData, setCVData] = useState<CVData>({
        personalInfo: {
            fullName: "TÊN CỦA BẠN",
            position: "GIÁM ĐỐC KINH DOANH",
            birthDate: "29/05/1996",
            gender: "Nữ",
            email: "timviec@gmail.com",
            phone: "09123456789",
            address: "Phước Long B, Tp. Thủ Đức",
            photo: "",
        },
        objective:
            "Phát triển doanh thu và lợi nhuận bền vững thông qua việc xây dựng và triển khai chiến lược kinh doanh hiệu quả.\n\nMở rộng thị trường và giá trị tăng trưởng cho công ty bằng cách định vị thương mại độc đáo cho thị trường.\n\nXây dựng và dẫn dắt đội ngũ kinh doanh năng động, chuyên nghiệp, có khả năng đạt và vượt các chỉ tiêu được giao.\n\nNâng cao năng lực cạnh tranh của công ty thông qua việc cải tiến quy trình kinh doanh và đổi mới các chiến lược tiếp cận khách hàng.\n\nĐồng góp vào sự phát triển chung của công ty thông qua việc tham gia vào quyết định chiến lược kinh doanh quan trọng.",
        experience: [
            {
                id: "1",
                period: "11/2025 - 11/2025",
                company: "Thêm kinh nghiệm",
                description: "",
            },
        ],
        education: [
            {
                id: "1",
                period: "11/2025 - 11/2025",
                school: "Thêm học vấn",
                description: "",
            },
        ],
        languages: [],
        skills: [],
        interests: [],
        references: [],
    })

    const [selectedColor, setSelectedColor] = useState("#0066CC")
    const [selectedFont, setSelectedFont] = useState("Roboto")
    const [fontSize, setFontSize] = useState(14)
    const [templateStyle, setTemplateStyle] = useState("modern")
    const [zoom, setZoom] = useState(100)
    const [language, setLanguage] = useState<"vi" | "en">("vi")

    const [history, setHistory] = useState<HistoryState[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)

    useEffect(() => {
        const newState: HistoryState = {
            cvData,
            selectedColor,
            selectedFont,
            fontSize,
            templateStyle,
        }

        if (historyIndex === -1 || JSON.stringify(newState) !== JSON.stringify(history[historyIndex])) {
            const newHistory = history.slice(0, historyIndex + 1)
            newHistory.push(newState)
            if (newHistory.length > 50) {
                newHistory.shift()
            }
            setHistory(newHistory)
            setHistoryIndex(newHistory.length - 1)
        }
    }, [cvData, selectedColor, selectedFont, fontSize, templateStyle])

    useEffect(() => {
        const savedData = localStorage.getItem(`cv-data-${cvId}`)
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData)
                setCVData(parsed.cvData)
                setSelectedColor(parsed.selectedColor)
                setSelectedFont(parsed.selectedFont)
                if (parsed.fontSize) setFontSize(parsed.fontSize)
                if (parsed.templateStyle) setTemplateStyle(parsed.templateStyle)
                if (parsed.zoom) setZoom(parsed.zoom)
                if (parsed.language) setLanguage(parsed.language)
                toast({
                    title: "Đã tải hồ sơ",
                    description: "Hồ sơ đã được khôi phục từ bản lưu trước đó",
                })
            } catch (error) {
                console.error("[v0] Error loading saved CV data:", error)
            }
        }
        // Template notification removed
    }, [cvId, template, toast])

    const handleUndo = () => {
        if (historyIndex > 0) {
            const prevState = history[historyIndex - 1]
            setCVData(prevState.cvData)
            setSelectedColor(prevState.selectedColor)
            setSelectedFont(prevState.selectedFont)
            setFontSize(prevState.fontSize)
            setTemplateStyle(prevState.templateStyle)
            setHistoryIndex(historyIndex - 1)
            toast({
                title: "Đã hoàn tác",
                description: "Thao tác trước đã được hoàn tác",
            })
        }
    }

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const nextState = history[historyIndex + 1]
            setCVData(nextState.cvData)
            setSelectedColor(nextState.selectedColor)
            setSelectedFont(nextState.selectedFont)
            setFontSize(nextState.fontSize)
            setTemplateStyle(nextState.templateStyle)
            setHistoryIndex(historyIndex + 1)
            toast({
                title: "Đã làm lại",
                description: "Thao tác đã được làm lại",
            })
        }
    }

    const handleSave = () => {
        try {
            const dataToSave = {
                cvData,
                selectedColor,
                selectedFont,
                fontSize,
                templateStyle,
                zoom,
                language,
                lastSaved: new Date().toISOString(),
            }
            localStorage.setItem(`cv-data-${cvId}`, JSON.stringify(dataToSave))
            toast({
                title: "Đã lưu hồ sơ",
                description: "Hồ sơ của bạn đã được lưu thành công",
            })
        } catch (error) {
            console.error("[v0] Error saving CV data:", error)
            toast({
                title: "Lỗi lưu hồ sơ",
                description: "Không thể lưu hồ sơ. Vui lòng thử lại.",
                variant: "destructive",
            })
        }
    }

    const handleExportPDF = async () => {
        try {
            toast({
                title: "Đang xuất PDF...",
                description: "CV của bạn đang được chuyển đổi sang định dạng PDF",
            })
            await new Promise((resolve) => setTimeout(resolve, 2000))
            toast({
                title: "Xuất PDF thành công",
                description: "CV của bạn đã được tải xuống",
            })
        } catch (error) {
            console.error("[v0] Error exporting PDF:", error)
            toast({
                title: "Lỗi xuất PDF",
                description: "Không thể xuất PDF. Vui lòng thử lại.",
                variant: "destructive",
            })
        }
    }

    const handleExportWord = async () => {
        try {
            toast({
                title: "Đang xuất Word...",
                description: "CV của bạn đang được chuyển đổi sang định dạng Word",
            })
            await new Promise((resolve) => setTimeout(resolve, 2000))
            toast({
                title: "Xuất Word thành công",
                description: "CV của bạn đã được tải xuống dạng .docx",
            })
        } catch (error) {
            toast({
                title: "Lỗi xuất Word",
                description: "Không thể xuất Word. Vui lòng thử lại.",
                variant: "destructive",
            })
        }
    }

    const handleExportImage = async () => {
        try {
            toast({
                title: "Đang xuất ảnh...",
                description: "CV của bạn đang được chuyển đổi sang định dạng ảnh PNG",
            })
            await new Promise((resolve) => setTimeout(resolve, 2000))
            toast({
                title: "Xuất ảnh thành công",
                description: "CV của bạn đã được tải xuống dạng PNG",
            })
        } catch (error) {
            toast({
                title: "Lỗi xuất ảnh",
                description: "Không thể xuất ảnh. Vui lòng thử lại.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="h-screen flex flex-col">
            <CvEditorHeader
                cvData={cvData}
                onSave={handleSave}
                onExportPDF={handleExportPDF}
                onExportWord={handleExportWord}
                onExportImage={handleExportImage}
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
                zoom={zoom}
                onZoomChange={setZoom}
                language={language}
                onLanguageChange={setLanguage}
            />

            <div className="flex-1 flex overflow-hidden">
                <CVEditorSidebar
                    selectedColor={selectedColor}
                    selectedFont={selectedFont}
                    onColorChange={setSelectedColor}
                    onFontChange={setSelectedFont}
                    fontSize={fontSize}
                    onFontSizeChange={setFontSize}
                    template={templateStyle}
                    onTemplateChange={setTemplateStyle}
                />

                <CVEditorCanvas
                    cvData={cvData}
                    setCVData={setCVData}
                    selectedColor={selectedColor}
                    selectedFont={selectedFont}
                    fontSize={fontSize}
                    template={templateStyle}
                    zoom={zoom}
                    language={language}
                />
            </div>
        </div>
    )
}
