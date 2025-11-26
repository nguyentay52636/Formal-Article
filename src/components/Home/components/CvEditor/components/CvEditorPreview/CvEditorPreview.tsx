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
} from "lucide-react"
import { useRef, useState, useEffect } from "react"
import type { CVData } from "../../CvEditor"
import { cvTranslations } from "@/lib/cv-translations" // Import translations
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
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const t = cvTranslations[language]
    const cvWrapperRef = useRef<HTMLDivElement>(null)
    const [initialHtml, setInitialHtml] = useState<string>('')

    // Check if we should render custom HTML template
    const hasCustomTemplate = templateData?.html && templateData.html.trim().length > 0

    // Function to add contenteditable to editable elements
    const makeEditable = (html: string): string => {
        return html
            // Name and title
            .replace(/<h1 class='name'>/g, "<h1 class='name' contenteditable='true'>")
            .replace(/<h1 class="name">/g, "<h1 class=\"name\" contenteditable=\"true\">")
            .replace(/<p class='title'>/g, "<p class='title' contenteditable='true'>")
            .replace(/<p class="title">/g, "<p class=\"title\" contenteditable=\"true\">")
            .replace(/<p class='intro'>/g, "<p class='intro' contenteditable='true'>")
            .replace(/<p class="intro">/g, "<p class=\"intro\" contenteditable=\"true\">")
            // Job info
            .replace(/<p class='job-company'>/g, "<p class='job-company' contenteditable='true'>")
            .replace(/<p class="job-company">/g, "<p class=\"job-company\" contenteditable=\"true\">")
            .replace(/<p class='job-time'>/g, "<p class='job-time' contenteditable='true'>")
            .replace(/<p class="job-time">/g, "<p class=\"job-time\" contenteditable=\"true\">")
            // Education
            .replace(/<p class='edu-title'>/g, "<p class='edu-title' contenteditable='true'>")
            .replace(/<p class="edu-title">/g, "<p class=\"edu-title\" contenteditable=\"true\">")
            // All list items
            .replace(/<li>/g, "<li contenteditable='true'>")
            // All paragraphs in sections (make them editable)
            .replace(/<p>📧/g, "<p contenteditable='true'>📧")
            .replace(/<p>📞/g, "<p contenteditable='true'>📞")
            .replace(/<p>📍/g, "<p contenteditable='true'>📍")
            .replace(/<p>🎂/g, "<p contenteditable='true'>🎂")
            .replace(/<p>•/g, "<p contenteditable='true'>•")
            // Generic content paragraphs
            .replace(/<p><b>/g, "<p contenteditable='true'><b>")
            .replace(/<p>Thời gian/g, "<p contenteditable='true'>Thời gian")
    }

    // Initialize HTML only once when template changes
    useEffect(() => {
        if (templateData?.html && !initialHtml) {
            setInitialHtml(makeEditable(templateData.html))
        }
    }, [templateData?.html, initialHtml])

    // Function to get current edited HTML (call this when saving/exporting)
    const getEditedHtml = (): string => {
        if (cvWrapperRef.current) {
            return cvWrapperRef.current.innerHTML
        }
        return initialHtml
    }

    // If template has custom HTML/CSS, render it with editable content
    if (hasCustomTemplate && mounted && initialHtml) {
        return (
            <Card
                className="bg-white shadow-2xl overflow-hidden mx-auto"
                style={{
                    width: "21cm",
                    minHeight: "29.7cm",
                }}
            >
                {/* Inject CSS with editable styles */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .cv-template-wrapper {
                            background: #ffffff;
                            width: 100%;
                            min-height: 29.7cm;
                        }
                        
                        /* Editable element styles */
                        [contenteditable="true"] {
                            outline: none;
                            transition: background-color 0.15s ease;
                            border-radius: 3px;
                            min-height: 1em;
                        }
                        [contenteditable="true"]:hover {
                            background-color: rgba(18, 58, 99, 0.06);
                            cursor: text;
                        }
                        [contenteditable="true"]:focus {
                            background-color: rgba(18, 58, 99, 0.1);
                            box-shadow: inset 0 0 0 1px rgba(18, 58, 99, 0.2);
                        }
                        
                        /* Placeholder for empty editable elements */
                        [contenteditable="true"]:empty::before {
                            content: "Nhấp để nhập...";
                            color: #aaa;
                            font-style: italic;
                            pointer-events: none;
                        }
                        
                        /* Custom CV styles from template */
                        ${templateData.css || ''}
                    `
                }} />

                {/* Render editable HTML content - no re-render on input */}
                <div
                    ref={cvWrapperRef}
                    className="cv-template-wrapper"
                    dangerouslySetInnerHTML={{ __html: initialHtml }}
                    suppressContentEditableWarning={true}
                />
            </Card>
        )
    }

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

                    {/* Skills (Tin học) */}
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
        </Card>
    )
}
