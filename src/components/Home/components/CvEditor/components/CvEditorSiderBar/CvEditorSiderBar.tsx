"use client"

import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Palette, Type, Layout, TextCursor, ChevronDown, ChevronUp, Image } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import type {
    LayoutType,
    Section,
    ColorSettings,
    SpacingSettings,
    IconStyle
} from "../../types/editor-settings"
import {
    LayoutSwitcher,
    SectionReorder,
    AdvancedColors,
    SpacingEditor,
    IconStyleSwitcher,
    ImageCropper
} from "./components"

interface CVEditorSidebarProps {
    // Basic settings
    selectedColor: string
    selectedFont: string
    onColorChange: (color: string) => void
    onFontChange: (font: string) => void
    fontSize: number
    onFontSizeChange: (size: number) => void
    template: string
    onTemplateChange: (template: string) => void
    // Pro settings
    layout?: LayoutType
    onLayoutChange?: (layout: LayoutType) => void
    sections?: Section[]
    onSectionsChange?: (sections: Section[]) => void
    colors?: ColorSettings
    onColorsChange?: (colors: ColorSettings) => void
    spacing?: SpacingSettings
    onSpacingChange?: (spacing: SpacingSettings) => void
    iconStyle?: IconStyle
    onIconStyleChange?: (style: IconStyle) => void
    // Image
    onImageCropped?: (image: string) => void
}

const colors = [
    { name: "Xanh dương", value: "#0066CC" },
    { name: "Đỏ", value: "#E91E63" },
    { name: "Xanh lá", value: "#4CAF50" },
    { name: "Cam", value: "#FF9800" },
    { name: "Tím", value: "#9C27B0" },
    { name: "Xanh ngọc", value: "#00BCD4" },
    { name: "Xanh navy", value: "#1A237E" },
    { name: "Đỏ đậm", value: "#C62828" },
    { name: "Xanh lá đậm", value: "#2E7D32" },
    { name: "Nâu", value: "#6D4C41" },
    { name: "Xám", value: "#546E7A" },
    { name: "Hồng", value: "#D81B60" },
]

const fonts = [
    { name: "Roboto", value: "Roboto" },
    { name: "Open Sans", value: "Open Sans" },
    { name: "Montserrat", value: "Montserrat" },
    { name: "Lato", value: "Lato" },
    { name: "Poppins", value: "Poppins" },
    { name: "Inter", value: "Inter" },
]



export function CVEditorSidebar({
    selectedColor,
    selectedFont,
    onColorChange,
    onFontChange,
    fontSize,
    onFontSizeChange,
    template,
    onTemplateChange,
    // Pro features
    layout,
    onLayoutChange,
    sections,
    onSectionsChange,
    colors: advancedColors,
    onColorsChange,
    spacing,
    onSpacingChange,
    iconStyle,
    onIconStyleChange,
    onImageCropped,
}: CVEditorSidebarProps) {
    const [showProFeatures, setShowProFeatures] = useState(true)
    const [cropperOpen, setCropperOpen] = useState(false)
    const [imageToCrop, setImageToCrop] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageToCrop(reader.result as string)
                setCropperOpen(true)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleCropComplete = (croppedImage: string) => {
        onImageCropped?.(croppedImage)
        setImageToCrop("")
    }

    return (
        <aside className="w-80 bg-[#252525] border-r border-gray-700 overflow-y-auto">
            <div className="p-6 space-y-6">

                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Palette className="w-5 h-5 text-white" />
                        <Label className="text-white font-semibold">Màu chủ đạo</Label>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {colors.map((color) => (
                            <button
                                key={color.value}
                                onClick={() => onColorChange(color.value)}
                                className={`aspect-square rounded-lg border-2 transition-all ${selectedColor === color.value
                                    ? "border-white scale-110 ring-2 ring-white/50"
                                    : "border-transparent hover:border-gray-500"
                                    }`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>

                {/* Font Selector */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Type className="w-5 h-5 text-white" />
                        <Label className="text-white font-semibold">Font chữ</Label>
                    </div>
                    <div className="space-y-2">
                        {fonts.map((font) => (
                            <button
                                key={font.value}
                                onClick={() => onFontChange(font.value)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${selectedFont === font.value
                                    ? "bg-[#0066CC] text-white"
                                    : "bg-[#1E1E1E] text-gray-300 hover:bg-[#2C2C2C]"
                                    }`}
                                style={{ fontFamily: font.value }}
                            >
                                {font.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Font Size */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <TextCursor className="w-5 h-5 text-white" />
                        <Label className="text-white font-semibold">Cỡ chữ: {fontSize}px</Label>
                    </div>
                    <Slider
                        value={[fontSize]}
                        onValueChange={(value) => onFontSizeChange(value[0])}
                        min={10}
                        max={20}
                        step={1}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>Nhỏ (10px)</span>
                        <span>Vừa (14px)</span>
                        <span>Lớn (20px)</span>
                    </div>
                </div>

                {/* Image Upload with Crop */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Image className="w-5 h-5 text-white" />
                        <Label className="text-white font-semibold">Ảnh đại diện</Label>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                    />
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="w-full bg-[#1E1E1E] border-gray-600 text-gray-300 hover:bg-[#2C2C2C]"
                    >
                        📷 Tải ảnh & Chỉnh sửa
                    </Button>
                </div>

                {/* PRO Features Section */}
                <div className="border-t border-gray-700 pt-4">
                    <button
                        onClick={() => setShowProFeatures(!showProFeatures)}
                        className="w-full flex items-center justify-between text-white font-semibold mb-4"
                    >
                        <span className="flex items-center gap-2">
                            ⚡ Tính năng PRO
                            <span className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-0.5 rounded-full">NEW</span>
                        </span>
                        {showProFeatures ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    {showProFeatures && (
                        <div className="space-y-6">
                            {/* Layout Switcher */}
                            {layout && onLayoutChange && (
                                <LayoutSwitcher layout={layout} onLayoutChange={onLayoutChange} />
                            )}

                            {/* Section Reorder */}
                            {sections && onSectionsChange && (
                                <SectionReorder sections={sections} onSectionsChange={onSectionsChange} />
                            )}

                            {/* Advanced Colors */}
                            {advancedColors && onColorsChange && (
                                <AdvancedColors colors={advancedColors} onColorsChange={onColorsChange} />
                            )}

                            {/* Spacing Editor */}
                            {spacing && onSpacingChange && (
                                <SpacingEditor spacing={spacing} onSpacingChange={onSpacingChange} />
                            )}

                            {/* Icon Style */}
                            {iconStyle && onIconStyleChange && (
                                <IconStyleSwitcher iconStyle={iconStyle} onIconStyleChange={onIconStyleChange} />
                            )}
                        </div>
                    )}
                </div>

                {/* Tips */}
                <div className="pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400 mb-2">Mẹo hữu ích:</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                        <li>• Sử dụng Ctrl+Z để hoàn tác</li>
                        <li>• Sử dụng Ctrl+Y để làm lại</li>
                        <li>• Kéo thả các mục để sắp xếp</li>
                        <li>• Hover vào mục để xóa</li>
                    </ul>
                </div>
            </div>

            {/* Image Cropper Dialog */}
            {imageToCrop && (
                <ImageCropper
                    open={cropperOpen}
                    onOpenChange={setCropperOpen}
                    imageSrc={imageToCrop}
                    onCropComplete={handleCropComplete}
                />
            )}
        </aside>
    )
}
