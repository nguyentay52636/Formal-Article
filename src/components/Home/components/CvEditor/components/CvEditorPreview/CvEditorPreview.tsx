"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Calendar,
    Mail,
    Phone,
    MapPin,
    User,
    Briefcase,
    GraduationCap,
    Languages,
    Star,
    Heart,
    UserCheck,
    Plus,
    Trash2,
    Camera,
    Sparkles,
    Loader2,
} from "lucide-react"
import { useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { CVData } from "../../CvEditor"
import { cvTranslations } from "@/lib/cv-translations"
import { ITemplate } from "@/apis/templateApi"

interface CVEditorPreviewProps {
    cvData: CVData
    setCVData: (data: CVData) => void
    selectedColor: string
    selectedFont: string
    fontSize: number
    template: string
    language: "vi" | "en"
    templateData?: ITemplate | null
}

export function CVEditorPreview({
    cvData,
    setCVData,
    selectedColor,
    selectedFont,
    fontSize,
    template,
    language,
    templateData,
}: CVEditorPreviewProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const t = cvTranslations[language]

    const [aiDialogOpen, setAiDialogOpen] = useState(false)
    const [aiSuggestion, setAiSuggestion] = useState("")
    const [aiLoading, setAiLoading] = useState(false)

    const updatePersonalInfo = (field: string, value: string) => {
        setCVData({
            ...cvData,
            personalInfo: {
                ...cvData.personalInfo,
                [field]: value,
            },
        })
    }

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                updatePersonalInfo("photo", reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const addExperience = () => {
        setCVData({
            ...cvData,
            experience: [
                ...cvData.experience,
                {
                    id: Date.now().toString(),
                    period: "",
                    company: "",
                    description: "",
                },
            ],
        })
    }

    const updateExperience = (id: string, field: string, value: string) => {
        setCVData({
            ...cvData,
            experience: cvData.experience.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
        })
    }

    const removeExperience = (id: string) => {
        setCVData({
            ...cvData,
            experience: cvData.experience.filter((item) => item.id !== id),
        })
    }

    const addEducation = () => {
        setCVData({
            ...cvData,
            education: [
                ...cvData.education,
                {
                    id: Date.now().toString(),
                    period: "",
                    school: "",
                    description: "",
                },
            ],
        })
    }

    const updateEducation = (id: string, field: string, value: string) => {
        setCVData({
            ...cvData,
            education: cvData.education.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
        })
    }

    const removeEducation = (id: string) => {
        setCVData({
            ...cvData,
            education: cvData.education.filter((item) => item.id !== id),
        })
    }

    const addLanguage = () => {
        setCVData({
            ...cvData,
            languages: [
                ...cvData.languages,
                {
                    id: Date.now().toString(),
                    language: "",
                },
            ],
        })
    }

    const updateLanguage = (id: string, value: string) => {
        setCVData({
            ...cvData,
            languages: cvData.languages.map((item) => (item.id === id ? { ...item, language: value } : item)),
        })
    }

    const removeLanguage = (id: string) => {
        setCVData({
            ...cvData,
            languages: cvData.languages.filter((item) => item.id !== id),
        })
    }

    const addSkill = () => {
        setCVData({
            ...cvData,
            skills: [
                ...cvData.skills,
                {
                    id: Date.now().toString(),
                    skill: "",
                },
            ],
        })
    }

    const updateSkill = (id: string, value: string) => {
        setCVData({
            ...cvData,
            skills: cvData.skills.map((item) => (item.id === id ? { ...item, skill: value } : item)),
        })
    }

    const removeSkill = (id: string) => {
        setCVData({
            ...cvData,
            skills: cvData.skills.filter((item) => item.id !== id),
        })
    }

    const addInterest = () => {
        setCVData({
            ...cvData,
            interests: [
                ...cvData.interests,
                {
                    id: Date.now().toString(),
                    interest: "",
                },
            ],
        })
    }

    const updateInterest = (id: string, value: string) => {
        setCVData({
            ...cvData,
            interests: cvData.interests.map((item) => (item.id === id ? { ...item, interest: value } : item)),
        })
    }

    const removeInterest = (id: string) => {
        setCVData({
            ...cvData,
            interests: cvData.interests.filter((item) => item.id !== id),
        })
    }

    const addReference = () => {
        setCVData({
            ...cvData,
            references: [
                ...cvData.references,
                {
                    id: Date.now().toString(),
                    name: "",
                    position: "",
                    company: "",
                    contact: "",
                },
            ],
        })
    }

    const updateReference = (id: string, field: string, value: string) => {
        setCVData({
            ...cvData,
            references: cvData.references.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
        })
    }

    const removeReference = (id: string) => {
        setCVData({
            ...cvData,
            references: cvData.references.filter((item) => item.id !== id),
        })
    }

    const getHeaderStyle = () => {
        switch (template) {
            case "classic":
                return { backgroundColor: "#333333", padding: "2rem" }
            case "creative":
                return {
                    background: `linear-gradient(135deg, ${selectedColor} 0%, ${selectedColor}dd 100%)`,
                    padding: "2.5rem",
                }
            case "minimal":
                return { backgroundColor: "#FFFFFF", borderBottom: `4px solid ${selectedColor}`, padding: "2rem" }
            default:
                return { backgroundColor: selectedColor, padding: "2rem" }
        }
    }

    const getTextColor = () => {
        return template === "minimal" ? "#000000" : "#FFFFFF"
    }

        const currentInterestsText = cvData.interests.length
        ? cvData.interests.map((item, idx) => `${idx + 1}. ${item.interest || "..."}`).join("\n")
        : "Chưa có nội dung"

    const aiPresets = [
        `• Tôi là người yêu thích đọc sách, đặc biệt là tiểu thuyết và sách về tâm lý học.
• Tôi thường xuyên tham gia các câu lạc bộ đọc sách để trao đổi kiến thức và mở rộng mối quan hệ.
• Ngoài ra, tôi có niềm đam mê vẽ tranh và thường dành thời gian rảnh để sáng tạo.
• Tôi cũng thích nấu ăn và thử nghiệm các công thức mới, đặc biệt là các món ăn healthy.
• Tôi là một người yêu thích du lịch và khám phá những vùng đất mới, trải nghiệm những nền văn hóa khác nhau.`,
        `• Tôi mê thể thao ngoài trời như chạy bộ và leo núi vì giúp tôi giữ sức khỏe.
• Tôi thích học ngoại ngữ và thường luyện nghe nói tiếng Anh, tiếng Nhật mỗi tuần.
• Tôi hay nấu ăn cuối tuần, thử biến tấu món Việt theo phong cách healthy.
• Tôi thích xem phim tài liệu về lịch sử và khoa học để mở rộng kiến thức.
• Tôi dành thời gian viết blog để chia sẻ trải nghiệm du lịch và ẩm thực.`,
        `• Tôi yêu thiên nhiên, thích trồng cây và chăm sóc vườn nhỏ trên ban công.
• Tôi tham gia hoạt động thiện nguyện, đặc biệt là hỗ trợ trẻ em vùng cao.
• Tôi đam mê công nghệ, thích thử các ứng dụng AI hỗ trợ làm việc hiệu quả hơn.
• Tôi chơi nhạc cụ guitar và thường đàn những bài acoustic thư giãn cuối ngày.
• Tôi thích khám phá cà phê specialty, ghi chú hương vị và chia sẻ với bạn bè.`,
    ]

    const buildAiSuggestion = () => {
        setAiLoading(true)
        const suggestion = aiPresets[Math.floor(Math.random() * aiPresets.length)]
        setTimeout(() => {
            setAiSuggestion(suggestion)
            setAiLoading(false)
        }, 350)
    }

    const applyAiSuggestion = () => {
        if (!aiSuggestion.trim()) {
            setAiDialogOpen(false)
            return
        }

        const normalizedInterests = aiSuggestion
            .split("\n")
            .map((line) => line.replace(/^\\W+\\s*/, "").trim())
            .filter(Boolean)

        if (!normalizedInterests.length) {
            setAiDialogOpen(false)
            return
        }

        setCVData({
            ...cvData,
            interests: normalizedInterests.map((interest, index) => ({
                id: `${Date.now()}-${index}`,
                interest,
            })),
        })
        setAiDialogOpen(false)
    }

    void templateData

    return (
        <Card
            className="bg-white shadow-2xl overflow-hidden mx-auto"
            style={{
                width: "21cm",
                minHeight: "29.7cm",
                fontFamily: selectedFont,
                fontSize: `${fontSize}px`,
            }}
        >
            {/* Header */}
            <div className="p-8 relative" style={getHeaderStyle()}>
                <div className="flex gap-6 items-start">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden relative group cursor-pointer">
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        {cvData.personalInfo.photo ? (
                            <>
                                <img
                                    src={cvData.personalInfo.photo || "/placeholder.svg"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </>
                        ) : (
                            <div
                                className="w-full h-full bg-gray-300 rounded-full flex flex-col items-center justify-center hover:bg-gray-400 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Camera className="w-8 h-8 text-gray-600" />
                                <span className="text-xs text-gray-600 mt-1">{t.placeholders.addPhoto}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-3">
                        <Input
                            value={cvData.personalInfo.fullName}
                            onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                            className="text-3xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0"
                            style={{ color: getTextColor() }}
                            placeholder={t.placeholders.fullName}
                        />

                        <Input
                            value={cvData.personalInfo.position}
                            onChange={(e) => updatePersonalInfo("position", e.target.value)}
                            className="text-lg bg-transparent border-none p-0 h-auto focus-visible:ring-0"
                            style={{ color: getTextColor() }}
                            placeholder={t.placeholders.position}
                        />

                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 shrink-0" style={{ color: getTextColor() }} />
                                <Input
                                    value={cvData.personalInfo.birthDate}
                                    onChange={(e) => updatePersonalInfo("birthDate", e.target.value)}
                                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-sm"
                                    style={{ color: getTextColor() }}
                                    placeholder={t.placeholders.birthDate}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 shrink-0" style={{ color: getTextColor() }} />
                                <Input
                                    value={cvData.personalInfo.gender}
                                    onChange={(e) => updatePersonalInfo("gender", e.target.value)}
                                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-sm"
                                    style={{ color: getTextColor() }}
                                    placeholder={t.placeholders.gender}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 shrink-0" style={{ color: getTextColor() }} />
                                <Input
                                    value={cvData.personalInfo.email}
                                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-sm"
                                    style={{ color: getTextColor() }}
                                    placeholder={t.placeholders.email}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 shrink-0" style={{ color: getTextColor() }} />
                                <Input
                                    value={cvData.personalInfo.phone}
                                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-sm"
                                    style={{ color: getTextColor() }}
                                    placeholder={t.placeholders.phone}
                                />
                            </div>

                            <div className="flex items-center gap-2 col-span-2">
                                <MapPin className="w-4 h-4 shrink-0" style={{ color: getTextColor() }} />
                                <Input
                                    value={cvData.personalInfo.address}
                                    onChange={(e) => updatePersonalInfo("address", e.target.value)}
                                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-sm"
                                    style={{ color: getTextColor() }}
                                    placeholder={t.placeholders.address}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
                {/* Objective */}
                <section className="border-l-4 pl-4" style={{ borderColor: selectedColor }}>
                    <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: selectedColor }}>
                        <Briefcase className="w-5 h-5" />
                        {t.objective}
                    </h2>
                    <Textarea
                        value={cvData.objective}
                        onChange={(e) => setCVData({ ...cvData, objective: e.target.value })}
                        className="min-h-[150px] border-gray-200 leading-relaxed resize-none"
                        style={{ fontSize: `${fontSize}px` }}
                        placeholder={t.placeholders.objectiveText}
                    />
                </section>

                {/* Experience */}
                <section className="border-l-4 pl-4" style={{ borderColor: selectedColor }}>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: selectedColor }}>
                            <Briefcase className="w-5 h-5" />
                            {t.experience}
                        </h2>
                        <Button
                            onClick={addExperience}
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1"
                            style={{ color: selectedColor }}
                        >
                            <Plus className="w-4 h-4" />
                            {t.buttons.add}
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {cvData.experience.map((exp) => (
                            <div key={exp.id} className="space-y-2 relative group">
                                <Button
                                    onClick={() => removeExperience(exp.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="absolute -right-2 -top-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                                <Input
                                    value={exp.period}
                                    onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
                                    className="font-semibold"
                                    style={{ fontSize: `${fontSize}px` }}
                                    placeholder={t.placeholders.period}
                                />
                                <Input
                                    value={exp.company}
                                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                    style={{ fontSize: `${fontSize}px` }}
                                    placeholder={t.placeholders.addExperience}
                                />
                                <Textarea
                                    value={exp.description}
                                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                    className="resize-none"
                                    style={{ fontSize: `${fontSize}px` }}
                                    rows={2}
                                    placeholder={t.placeholders.jobDescription}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="border-l-4 pl-4" style={{ borderColor: selectedColor }}>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: selectedColor }}>
                            <GraduationCap className="w-5 h-5" />
                            {t.education}
                        </h2>
                        <Button
                            onClick={addEducation}
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1"
                            style={{ color: selectedColor }}
                        >
                            <Plus className="w-4 h-4" />
                            {t.buttons.add}
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {cvData.education.map((edu) => (
                            <div key={edu.id} className="space-y-2 relative group">
                                <Button
                                    onClick={() => removeEducation(edu.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="absolute -right-2 -top-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                                <Input
                                    value={edu.period}
                                    onChange={(e) => updateEducation(edu.id, "period", e.target.value)}
                                    className="font-semibold"
                                    style={{ fontSize: `${fontSize}px` }}
                                    placeholder={t.placeholders.period}
                                />
                                <Input
                                    value={edu.school}
                                    onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                                    style={{ fontSize: `${fontSize}px` }}
                                    placeholder={t.placeholders.addEducation}
                                />
                                <Textarea
                                    value={edu.description}
                                    onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                                    className="resize-none"
                                    style={{ fontSize: `${fontSize}px` }}
                                    rows={2}
                                    placeholder={t.placeholders.educationDescription}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Two Column Section */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Languages */}
                    <section className="border-l-4 pl-4" style={{ borderColor: selectedColor }}>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: selectedColor }}>
                                <Languages className="w-5 h-5" />
                                {t.languages}
                            </h2>
                            <Button
                                onClick={addLanguage}
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                style={{ color: selectedColor }}
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {cvData.languages.map((lang) => (
                                <div key={lang.id} className="flex gap-2 group">
                                    <Input
                                        value={lang.language}
                                        onChange={(e) => updateLanguage(lang.id, e.target.value)}
                                        placeholder={t.placeholders.addLanguage}
                                        style={{ fontSize: `${fontSize}px` }}
                                    />
                                    <Button
                                        onClick={() => removeLanguage(lang.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 w-9 p-0 shrink-0 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            ))}
                            {cvData.languages.length === 0 && (
                                <Button
                                    onClick={addLanguage}
                                    variant="outline"
                                    size="sm"
                                    className="w-full bg-transparent"
                                    style={{ fontSize: `${fontSize}px` }}
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    {t.placeholders.addLanguage}
                                </Button>
                            )}
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="border-l-4 pl-4" style={{ borderColor: selectedColor }}>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: selectedColor }}>
                                <Star className="w-5 h-5" />
                                {t.skills}
                            </h2>
                            <Button
                                onClick={addSkill}
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                style={{ color: selectedColor }}
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {cvData.skills.map((skill) => (
                                <div key={skill.id} className="flex gap-2 group">
                                    <Input
                                        value={skill.skill}
                                        onChange={(e) => updateSkill(skill.id, e.target.value)}
                                        placeholder={t.placeholders.addSkill}
                                        style={{ fontSize: `${fontSize}px` }}
                                    />
                                    <Button
                                        onClick={() => removeSkill(skill.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 w-9 p-0 shrink-0 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            ))}
                            {cvData.skills.length === 0 && (
                                <Button
                                    onClick={addSkill}
                                    variant="outline"
                                    size="sm"
                                    className="w-full bg-transparent"
                                    style={{ fontSize: `${fontSize}px` }}
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    {t.placeholders.addSkill}
                                </Button>
                            )}
                        </div>
                    </section>
                </div>

                {/* Two Column Section - Skills & Interests */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Interests */}
                    <section className="border-l-4 pl-4" style={{ borderColor: selectedColor }}>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: selectedColor }}>
                                <Heart className="w-5 h-5" />
                                {t.interests}
                            </h2>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => {
                                        setAiDialogOpen(true)
                                        buildAiSuggestion()
                                    }}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1 border-dashed"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Sá»­ dá»¥ng AI
                                </Button>
                                <Button
                                    onClick={addInterest}
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    style={{ color: selectedColor }}
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {cvData.interests.map((interest) => (
                                <div key={interest.id} className="flex gap-2 group">
                                    <Input
                                        value={interest.interest}
                                        onChange={(e) => updateInterest(interest.id, e.target.value)}
                                        placeholder={t.placeholders.addInterest}
                                        style={{ fontSize: `${fontSize}px` }}
                                    />
                                    <Button
                                        onClick={() => removeInterest(interest.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 w-9 p-0 shrink-0 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            ))}
                            {cvData.interests.length === 0 && (
                                <Button
                                    onClick={addInterest}
                                    variant="outline"
                                    size="sm"
                                    className="w-full bg-transparent"
                                    style={{ fontSize: `${fontSize}px` }}
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    {t.placeholders.addInterest}
                                </Button>
                            )}
                        </div>
                    </section>

                    {/* Empty column for layout balance */}
                    <div></div>
                </div>

                {/* References */}
                <section className="border-l-4 pl-4" style={{ borderColor: selectedColor }}>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: selectedColor }}>
                            <UserCheck className="w-5 h-5" />
                            {t.references}
                        </h2>
                        <Button
                            onClick={addReference}
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1"
                            style={{ color: selectedColor }}
                        >
                            <Plus className="w-4 h-4" />
                            {t.buttons.add}
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {cvData.references.map((ref) => (
                            <div key={ref.id} className="space-y-2 relative group">
                                <Button
                                    onClick={() => removeReference(ref.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="absolute -right-2 -top-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                                <Input
                                    value={ref.name}
                                    onChange={(e) => updateReference(ref.id, "name", e.target.value)}
                                    placeholder={t.placeholders.referenceName}
                                    style={{ fontSize: `${fontSize}px` }}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        value={ref.position}
                                        onChange={(e) => updateReference(ref.id, "position", e.target.value)}
                                        placeholder={t.placeholders.referencePosition}
                                        style={{ fontSize: `${fontSize}px` }}
                                    />
                                    <Input
                                        value={ref.company}
                                        onChange={(e) => updateReference(ref.id, "company", e.target.value)}
                                        placeholder={t.placeholders.referenceCompany}
                                        style={{ fontSize: `${fontSize}px` }}
                                    />
                                </div>
                                <Input
                                    value={ref.contact}
                                    onChange={(e) => updateReference(ref.id, "contact", e.target.value)}
                                    placeholder={t.placeholders.referenceContact}
                                    style={{ fontSize: `${fontSize}px` }}
                                />
                            </div>
                        ))}
                        {cvData.references.length === 0 && (
                            <Button
                                onClick={addReference}
                                variant="outline"
                                size="sm"
                                className="w-full bg-transparent"
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                {t.placeholders.addReference}
                            </Button>
                        )}
                    </div>
                </section>
            </div>
            <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Sử dụng AI để hỗ trợ viết</DialogTitle>
                        <DialogDescription>AI gợi ý nhanh phần Sở thích, kèm tuỳ chọn nghe lại bằng giọng đọc.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                            <p className="font-semibold text-red-700">Nội dung hiện tại:</p>
                            <p className="mt-2 whitespace-pre-wrap text-sm text-red-800">{currentInterestsText}</p>
                        </div>

                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <p className="font-semibold text-emerald-700">Nội dung AI gợi ý:</p>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={buildAiSuggestion} disabled={aiLoading}>
                                        {aiLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
                                        Lấy gợi ý mới
                                    </Button>
                                </div>
                            </div>
                            {aiLoading ? (
                                <div className="flex items-center gap-2 text-sm text-emerald-800 mt-3">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>AI đang chuẩn bị gợi ý...</span>
                                </div>
                            ) : (
                                <Textarea
                                    value={aiSuggestion}
                                    onChange={(e) => setAiSuggestion(e.target.value)}
                                    className="mt-3 min-h-[200px] bg-white"
                                />
                            )}
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setAiDialogOpen(false)}>
                            Bỏ qua
                        </Button>
                        <Button onClick={applyAiSuggestion} disabled={!aiSuggestion.trim()}>
                            Chấp nhận
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}



