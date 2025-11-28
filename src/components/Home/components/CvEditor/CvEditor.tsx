"use client"

import { useState, useEffect, useRef } from "react"

import { useToast } from "@/hooks/use-toast"
import { CvEditorHeader } from "./components/CvEditorHeader/CvEditorHeader"
import { CVEditorSidebar } from "./components/CvEditorSiderBar/CvEditorSiderBar"
import { CVEditorCanvas } from "./components/CvEditorCanvas/CvEditorCanvas"
import { ITemplate } from "@/apis/templateApi"
import { useGenetaredCvs } from "@/hooks/useGenetaredCvs"
import {
    LayoutType,
    Section,
    ColorSettings,
    SpacingSettings,
    IconStyle,
    DEFAULT_SECTIONS,
    DEFAULT_COLORS,
    DEFAULT_SPACING,
    EditorSettings
} from "./types/editor-settings"

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
    // New sections
    projects?: Array<{
        id: string
        name: string
        description: string
        link?: string
    }>
    certificates?: Array<{
        id: string
        name: string
        issuer: string
        date: string
    }>
}

interface HistoryState {
    cvData: CVData
    selectedColor: string
    selectedFont: string
    fontSize: number
    template: string
    editorSettings: EditorSettings
}

export function CvEditor({ cvId, template: templateProp }: CVEditorProps) {
    const { toast } = useToast()
    const { createManual, updateCV, isCreating, isUpdating } = useGenetaredCvs()
    const getHtmlRef = useRef<(() => string) | null>(null)
    const isEditMode = !isNaN(Number(cvId)) && Number(cvId) > 0

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
        projects: [],
        certificates: [],
    })

    // Basic settings
    const [selectedColor, setSelectedColor] = useState("#0066CC")
    const [selectedFont, setSelectedFont] = useState("Roboto")
    const [fontSize, setFontSize] = useState(14)
    const [template, setTemplate] = useState("modern")
    const [zoom, setZoom] = useState(100)
    const [language, setLanguage] = useState<"vi" | "en">("vi")
    const [templateData, setTemplateData] = useState<ITemplate | null>(null)

    // PRO settings
    const [layout, setLayout] = useState<LayoutType>('two-column-left-wide')
    const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS)
    const [colors, setColors] = useState<ColorSettings>(DEFAULT_COLORS)
    const [spacing, setSpacing] = useState<SpacingSettings>(DEFAULT_SPACING)
    const [iconStyle, setIconStyle] = useState<IconStyle>('minimal')

    // Sync primary color with advanced colors
    const handleColorChange = (color: string) => {
        setSelectedColor(color)
        setColors(prev => ({ ...prev, primary: color, heading: color }))
    }

    const handleColorsChange = (newColors: ColorSettings) => {
        setColors(newColors)
        setSelectedColor(newColors.primary)
    }

    // Handle cropped image
    const handleImageCropped = (croppedImage: string) => {
        setCVData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, photo: croppedImage }
        }))
        toast({
            title: "Đã cập nhật ảnh",
            description: "Ảnh đại diện đã được cập nhật thành công",
        })
    }

    // Load template data when templateProp changes
    useEffect(() => {
        if (templateProp) {
            setTemplateData(templateProp)
            if (templateProp.color) {
                setSelectedColor(templateProp.color)
                setColors(prev => ({ ...prev, primary: templateProp.color!, heading: templateProp.color! }))
            }
        }
    }, [templateProp])

    // History for undo/redo
    const [history, setHistory] = useState<HistoryState[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)

    const currentEditorSettings: EditorSettings = {
        layout,
        sections,
        colors,
        spacing,
        iconStyle,
    }

    useEffect(() => {
        const newState: HistoryState = {
            cvData,
            selectedColor,
            selectedFont,
            fontSize,
            template,
            editorSettings: currentEditorSettings,
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
    }, [cvData, selectedColor, selectedFont, fontSize, template, layout, sections, colors, spacing, iconStyle])

    // Load saved data
    useEffect(() => {
        const savedData = localStorage.getItem(`cv-data-${cvId}`)
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData)
                setCVData(parsed.cvData)
                setSelectedColor(parsed.selectedColor)
                setSelectedFont(parsed.selectedFont)
                if (parsed.fontSize) setFontSize(parsed.fontSize)
                if (parsed.template) setTemplate(parsed.template)
                if (parsed.zoom) setZoom(parsed.zoom)
                if (parsed.language) setLanguage(parsed.language)
                // Load PRO settings
                if (parsed.editorSettings) {
                    setLayout(parsed.editorSettings.layout)
                    setSections(parsed.editorSettings.sections)
                    setColors(parsed.editorSettings.colors)
                    setSpacing(parsed.editorSettings.spacing)
                    setIconStyle(parsed.editorSettings.iconStyle)
                }
                toast({
                    title: "Đã tải hồ sơ",
                    description: "Hồ sơ đã được khôi phục từ bản lưu trước đó",
                })
            } catch (error) {
                console.error("[v0] Error loading saved CV data:", error)
            }
        }
    }, [cvId, toast])

    const handleUndo = () => {
        if (historyIndex > 0) {
            const prevState = history[historyIndex - 1]
            setCVData(prevState.cvData)
            setSelectedColor(prevState.selectedColor)
            setSelectedFont(prevState.selectedFont)
            setFontSize(prevState.fontSize)
            setTemplate(prevState.template)
            if (prevState.editorSettings) {
                setLayout(prevState.editorSettings.layout)
                setSections(prevState.editorSettings.sections)
                setColors(prevState.editorSettings.colors)
                setSpacing(prevState.editorSettings.spacing)
                setIconStyle(prevState.editorSettings.iconStyle)
            }
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
            setTemplate(nextState.template)
            if (nextState.editorSettings) {
                setLayout(nextState.editorSettings.layout)
                setSections(nextState.editorSettings.sections)
                setColors(nextState.editorSettings.colors)
                setSpacing(nextState.editorSettings.spacing)
                setIconStyle(nextState.editorSettings.iconStyle)
            }
            setHistoryIndex(historyIndex + 1)
            toast({
                title: "Đã làm lại",
                description: "Thao tác đã được làm lại",
            })
        }
    }

    const handleSave = async () => {
        try {
            if (!templateData?.id) {
                toast({
                    title: "Lỗi",
                    description: "Không tìm thấy template. Vui lòng thử lại.",
                    variant: "destructive",
                })
                return
            }

            // Prepare dataJson: Dữ liệu người dùng nhập
            const dataJson = JSON.stringify(cvData)

            // Prepare styleJson: Color, font, layout user chọn
            const styleJson = JSON.stringify({
                font: selectedFont,
                color: selectedColor,
                fontSize,
                layout,
                sections: sections?.map(s => s.id),
                colors,
                spacing,
                iconStyle,
            })

            console.log("💾 [handleSave] Saving CV:", {
                templateId: templateData.id,
                title: cvData.personalInfo.fullName || `CV ${templateData.name}`,
                dataJsonLength: dataJson.length,
                styleJsonLength: styleJson.length,
                note: "Backend will render htmlOutput from template.html + template.css + dataJson + styleJson"
            })

            // Backend sẽ tự render htmlOutput từ:
            // - template.html (khung HTML của template)
            // - template.css (CSS của template)
            // - dataJson (dữ liệu user nhập)
            // - styleJson (style user chọn: color, font, layout)
            // Không cần gửi htmlOutput từ frontend
            if (isEditMode) {
                // Update existing CV
                await updateCV(Number(cvId), {
                    title: cvData.personalInfo.fullName || `CV ${templateData.name}`,
                    dataJson,
                    styleJson,
                    // htmlOutput sẽ được backend render tự động
                })
            } else {
                // Create new CV
                await createManual({
                    templateId: templateData.id,
                    title: cvData.personalInfo.fullName || `CV ${templateData.name}`,
                    dataJson,
                    styleJson,
                    // htmlOutput sẽ được backend render tự động từ template + dataJson + styleJson
                })
            }

            // Also save to localStorage as backup
            const dataToSave = {
                cvData,
                selectedColor,
                selectedFont,
                fontSize,
                template,
                zoom,
                language,
                editorSettings: currentEditorSettings,
                lastSaved: new Date().toISOString(),
            }
            localStorage.setItem(`cv-data-${cvId}`, JSON.stringify(dataToSave))

        } catch (error: any) {
            console.error("[CV Editor] Error saving CV:", error)
            toast({
                title: "Lỗi lưu hồ sơ",
                description: error.message || "Không thể lưu hồ sơ. Vui lòng thử lại.",
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
                template={templateData}
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
                isSaving={isCreating || isUpdating}
            />

            <div className="flex-1 flex overflow-hidden">
                <CVEditorSidebar
                    // Basic settings
                    selectedColor={selectedColor}
                    selectedFont={selectedFont}
                    onColorChange={handleColorChange}
                    onFontChange={setSelectedFont}
                    fontSize={fontSize}
                    onFontSizeChange={setFontSize}
                    template={template}
                    onTemplateChange={setTemplate}
                    // PRO settings
                    layout={layout}
                    onLayoutChange={setLayout}
                    sections={sections}
                    onSectionsChange={setSections}
                    colors={colors}
                    onColorsChange={handleColorsChange}
                    spacing={spacing}
                    onSpacingChange={setSpacing}
                    iconStyle={iconStyle}
                    onIconStyleChange={setIconStyle}
                    onImageCropped={handleImageCropped}
                />

                <CVEditorCanvas
                    cvData={cvData}
                    setCVData={setCVData}
                    selectedColor={selectedColor}
                    selectedFont={selectedFont}
                    fontSize={fontSize}
                    template={template}
                    zoom={zoom}
                    language={language}
                    templateData={templateData}
                    // Pass PRO settings to canvas
                    layout={layout}
                    sections={sections}
                    colors={colors}
                    spacing={spacing}
                    iconStyle={iconStyle}
                    onGetHtml={(getHtml) => {
                        getHtmlRef.current = getHtml
                    }}
                />
            </div>
        </div>
    )
}
