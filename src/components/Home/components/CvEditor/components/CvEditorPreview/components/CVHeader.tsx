"use client"

import type React from "react"
import { useRef, useCallback, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Calendar, Mail, Phone, MapPin, User, Camera } from "lucide-react"
import type { CVData } from "../../../CvEditor"
import type { IconStyle } from "../../../types/editor-settings"
import { ImageCropper } from "../../CvEditorSiderBar/components/ImageCropper"

interface CVHeaderProps {
    cvData: CVData
    setCVData: (data: CVData) => void
    selectedColor: string
    template: string
    t: { placeholders: Record<string, string> }
    iconStyle?: IconStyle
}

export function CVHeader({ cvData, setCVData, selectedColor, template, t, iconStyle = 'minimal' }: CVHeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [cropperOpen, setCropperOpen] = useState(false)
    const [imageToCrop, setImageToCrop] = useState<string>("")

    const headerStyle = useMemo(() => {
        switch (template) {
            case "classic": return { backgroundColor: "#333333", padding: "2rem" }
            case "creative": return { background: `linear-gradient(135deg, ${selectedColor} 0%, ${selectedColor}dd 100%)`, padding: "2.5rem" }
            case "minimal": return { backgroundColor: "#FFFFFF", borderBottom: `4px solid ${selectedColor}`, padding: "2rem" }
            default: return { backgroundColor: selectedColor, padding: "2rem" }
        }
    }, [template, selectedColor])

    const textColor = useMemo(() => template === "minimal" ? "#000000" : "#FFFFFF", [template])

    // Icon stroke width based on style
    const iconStrokeWidth = useMemo(() => {
        switch (iconStyle) {
            case 'minimal': return 1
            case 'bold': return 2.5
            case 'filled': return 2
            case 'rounded': return 1.5
            default: return 1.5
        }
    }, [iconStyle])

    const updatePersonalInfo = useCallback((field: string, value: string) => {
        setCVData({ ...cvData, personalInfo: { ...cvData.personalInfo, [field]: value } })
    }, [cvData, setCVData])

    // Handle file selection - open cropper instead of direct upload
    const handlePhotoSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [])

    // Handle cropped image from ImageCropper
    const handleCropComplete = useCallback((croppedImage: string) => {
        setCVData({ ...cvData, personalInfo: { ...cvData.personalInfo, photo: croppedImage } })
        setImageToCrop("")
    }, [cvData, setCVData])

    const iconClass = "w-4 h-4 shrink-0"

    return (
        <>
            <div className="p-8 relative" style={headerStyle}>
                <div className="flex gap-6 items-start">
                    {/* Avatar with Image Cropper */}
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden relative group cursor-pointer">
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
                        {cvData.personalInfo.photo ? (
                            <>
                                <img src={cvData.personalInfo.photo || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                                <div
                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Camera className="w-8 h-8 text-white" strokeWidth={iconStrokeWidth} />
                                    <span className="text-xs text-white">Đổi ảnh</span>
                                </div>
                            </>
                        ) : (
                            <div
                                className="w-full h-full bg-gray-300 rounded-full flex flex-col items-center justify-center hover:bg-gray-400 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Camera className="w-8 h-8 text-gray-600" strokeWidth={iconStrokeWidth} />
                                <span className="text-xs text-gray-600 mt-1">{t.placeholders.addPhoto}</span>
                            </div>
                        )}
                    </div>

                    {/* Personal Info */}
                    <div className="flex-1 space-y-3">
                        <Input
                            value={cvData.personalInfo.fullName}
                            onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                            className="text-3xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0"
                            style={{ color: textColor }}
                            placeholder={t.placeholders.fullName}
                        />
                        <Input
                            value={cvData.personalInfo.position}
                            onChange={(e) => updatePersonalInfo("position", e.target.value)}
                            className="text-lg bg-transparent border-none p-0 h-auto focus-visible:ring-0"
                            style={{ color: textColor }}
                            placeholder={t.placeholders.position}
                        />
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className={iconClass} style={{ color: textColor }} strokeWidth={iconStrokeWidth} />
                                <Input
                                    value={cvData.personalInfo.birthDate}
                                    onChange={(e) => updatePersonalInfo("birthDate", e.target.value)}
                                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-sm"
                                    style={{ color: textColor }}
                                    placeholder={t.placeholders.birthDate}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <User className={iconClass} style={{ color: textColor }} strokeWidth={iconStrokeWidth} />
                                <Input
                                    value={cvData.personalInfo.gender}
                                    onChange={(e) => updatePersonalInfo("gender", e.target.value)}
                                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-sm"
                                    style={{ color: textColor }}
                                    placeholder={t.placeholders.gender}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className={iconClass} style={{ color: textColor }} strokeWidth={iconStrokeWidth} />
                                <Input
                                    value={cvData.personalInfo.email}
                                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-sm"
                                    style={{ color: textColor }}
                                    placeholder={t.placeholders.email}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className={iconClass} style={{ color: textColor }} strokeWidth={iconStrokeWidth} />
                                <Input
                                    value={cvData.personalInfo.phone}
                                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-sm"
                                    style={{ color: textColor }}
                                    placeholder={t.placeholders.phone}
                                />
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                                <MapPin className={iconClass} style={{ color: textColor }} strokeWidth={iconStrokeWidth} />
                                <Input
                                    value={cvData.personalInfo.address}
                                    onChange={(e) => updatePersonalInfo("address", e.target.value)}
                                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-sm"
                                    style={{ color: textColor }}
                                    placeholder={t.placeholders.address}
                                />
                            </div>
                        </div>
                    </div>
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
        </>
    )
}
