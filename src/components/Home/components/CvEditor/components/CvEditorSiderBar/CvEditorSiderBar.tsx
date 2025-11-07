"use client"
import { Label } from "@/components/ui/label"
import { Palette, Type, Layout, TextCursor } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface CVEditorSidebarProps {
    selectedColor: string
    selectedFont: string
    onColorChange: (color: string) => void
    onFontChange: (font: string) => void
    fontSize: number
    onFontSizeChange: (size: number) => void
    template: string
    onTemplateChange: (template: string) => void
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

const templates = [
    { id: "modern", name: "Hiện đại", preview: "/list-item/modern-professional-cv.jpg" },
    { id: "classic", name: "Cổ điển", preview: "/list-item/classic-professional-cv.jpg" },
    { id: "creative", name: "Sáng tạo", preview: "/list-item/creative-colorful-cv.jpg" },
    { id: "minimal", name: "Tối giản", preview: "/list-item/minimal-clean-cv.jpg" },
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
}: CVEditorSidebarProps) {
    return (
        <aside className="w-80 bg-[#252525] border-r border-gray-700 overflow-y-auto">
            <div className="p-6 space-y-6">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Layout className="w-5 h-5 text-white" />
                        <Label className="text-white font-semibold">Kiểu thiết kế</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {templates.map((temp) => (
                            <button
                                key={temp.id}
                                onClick={() => onTemplateChange(temp.id)}
                                className={`aspect-[3/4] rounded-lg border-2 overflow-hidden transition-all ${template === temp.id ? "border-[#0066CC] scale-105" : "border-gray-600 hover:border-gray-400"
                                    }`}
                            >
                                <img src={temp.preview || "/placeholder.svg"} alt={temp.name} className="w-full h-full object-cover" />
                                <div
                                    className={`text-xs py-1 text-center ${template === temp.id ? "bg-[#0066CC] text-white" : "bg-gray-700 text-gray-300"}`}
                                >
                                    {temp.name}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Selector */}
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

                {/* Additional Tips */}
                <div className="pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400 mb-2">Mẹo hữu ích:</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                        <li>• Sử dụng Ctrl+Z để hoàn tác</li>
                        <li>• Sử dụng Ctrl+Y để làm lại</li>
                        <li>• Nhấn vào ảnh đại diện để thay đổi</li>
                        <li>• Hover vào mục để xóa</li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}
