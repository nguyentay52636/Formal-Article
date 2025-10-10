"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ImageIcon, Settings as SettingsIcon } from "lucide-react"
import { useToast } from "../../../../hooks/use-toast"
import { AISection } from "./components/AISection"
import { TopActions } from "./components/TopActions"
import { BasicInfoForm } from "./components/BasicInfoForm"
import { ContentEditor } from "./components/ContentEditor"
import { MediaUploader } from "./components/MediaUploader"
import { SettingsPanel } from "./components/SettingsPanel"
import { FooterActions } from "./components/FooterActions"

export default function CreateArticlePage() {
    const router = useRouter()
    const { toast } = useToast()
    const [activeTab, setActiveTab] = useState("basic")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [newTag, setNewTag] = useState("")
    const [featuredImage, setFeaturedImage] = useState<string | null>(null)
    const [attachments, setAttachments] = useState<Array<{ name: string; size: string }>>([])
    const [isProcessingAI, setIsProcessingAI] = useState(false)
    const [aiPrompt, setAiPrompt] = useState("")

    const [formData, setFormData] = useState({
        tieuDe: "",
        duongDan: "",
        danhMucId: "",
        tomTat: "",
        noiDungHtml: "",
        trangThai: "nhap",
        ngayXuatBan: "",
    })

    // If you have auth, redirect unauthenticated users here

    const handleTitleChange = (value: string) => {
        setFormData({
            ...formData,
            tieuDe: value,
            duongDan: value
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, ""),
        })
    }

    const handleAddTag = () => {
        if (newTag && !selectedTags.includes(newTag)) {
            setSelectedTags([...selectedTags, newTag])
            setNewTag("")
        }
    }

    const handleRemoveTag = (tag: string) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFeaturedImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const newAttachments = Array.from(files).map((file) => ({
                name: file.name,
                size: (file.size / 1024).toFixed(2) + " KB",
            }))
            setAttachments([...attachments, ...newAttachments])
        }
    }

    const handleRemoveFeatured = () => setFeaturedImage(null)
    const handleRemoveAttachmentAt = (index: number) => setAttachments(attachments.filter((_, i) => i !== index))

    const handleFormDataChange = (key: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleAIFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const validTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
        ]
        if (!validTypes.includes(file.type)) {
            toast({
                title: "Định dạng không hỗ trợ",
                description: "Vui lòng tải lên file PDF, DOC, DOCX hoặc TXT",
                variant: "destructive",
            })
            return
        }

        setIsProcessingAI(true)
        toast({
            title: "Đang xử lý với AI...",
            description: "Vui lòng đợi trong giây lát",
        })

        try {
            const fileContent = await file.text()

            const response = await fetch("/api/ai/process-document", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: fileContent,
                    fileName: file.name,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to process document")
            }

            const result = await response.json()

            setFormData({
                ...formData,
                tieuDe: result.title || formData.tieuDe,
                duongDan: result.slug || formData.duongDan,
                tomTat: result.summary || formData.tomTat,
                noiDungHtml: result.content || formData.noiDungHtml,
                danhMucId: result.categoryId || formData.danhMucId,
            })

            if (result.tags && result.tags.length > 0) {
                setSelectedTags(result.tags)
            }

            toast({
                title: "Xử lý thành công!",
                description: "Nội dung đã được trích xuất và điền tự động vào form",
            })

            setActiveTab("content")
        } catch (error) {
            console.error("[v0] AI processing error:", error)
            toast({
                title: "Lỗi xử lý",
                description: "Không thể xử lý file. Vui lòng thử lại hoặc nhập thủ công.",
                variant: "destructive",
            })
        } finally {
            setIsProcessingAI(false)
        }
    }

    const handleSaveDraft = () => {
        toast({
            title: "Đã lưu nháp",
            description: "Bài viết của bạn đã được lưu dưới dạng nháp.",
        })
    }

    const handlePublish = () => {
        if (!formData.tieuDe || !formData.danhMucId || !formData.noiDungHtml) {
            toast({
                title: "Thiếu thông tin",
                description: "Vui lòng điền đầy đủ tiêu đề, danh mục và nội dung.",
                variant: "destructive",
            })
            return
        }

        toast({
            title: "Đã xuất bản",
            description: "Bài viết của bạn đã được xuất bản thành công!",
        })

        setTimeout(() => {
            router.push("/ho-so")
        }, 1500)
    }

    const handlePreview = () => {
        toast({
            title: "Xem trước",
            description: "Chức năng xem trước đang được phát triển.",
        })
    }

    const handleGenerateByPrompt = async () => {
        if (!aiPrompt.trim()) {
            toast({ title: "Thiếu gợi ý", description: "Nhập gợi ý để AI viết nội dung.", variant: "destructive" })
            return
        }
        try {
            setIsProcessingAI(true)
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: aiPrompt.trim() }),
            })
            if (!res.ok) throw new Error("AI request failed")
            const data = await res.json()

            // OpenRouter format: choices[0].message.content
            const content = data?.choices?.[0]?.message?.content || ""
            if (!content) {
                toast({ title: "Không có nội dung", description: "AI không trả về nội dung.", variant: "destructive" })
                return
            }

            setFormData({ ...formData, noiDungHtml: content })
            setActiveTab("content")
            toast({ title: "Đã tạo nội dung", description: "AI đã tạo nội dung từ gợi ý của bạn." })
        } catch (e) {
            toast({ title: "Lỗi AI", description: "Không thể tạo nội dung. Thử lại sau.", variant: "destructive" })
        } finally {
            setIsProcessingAI(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <TopActions onPreview={handlePreview} onSaveDraft={handleSaveDraft} onPublish={handlePublish} />

                <AISection
                    aiPrompt={aiPrompt}
                    isProcessingAI={isProcessingAI}
                    onPromptChange={(v) => setAiPrompt(v)}
                    onGenerateByPrompt={handleGenerateByPrompt}
                    onFileChange={handleAIFileUpload}
                />

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                        <TabsTrigger value="basic" className="gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Thông tin cơ bản</span>
                            <span className="sm:hidden">Cơ bản</span>
                        </TabsTrigger>
                        <TabsTrigger value="content" className="gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Nội dung</span>
                            <span className="sm:hidden">Nội dung</span>
                        </TabsTrigger>
                        <TabsTrigger value="media" className="gap-2">
                            <ImageIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">Hình ảnh & Tệp</span>
                            <span className="sm:hidden">Media</span>
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="gap-2">
                            <SettingsIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">Cài đặt</span>
                            <span className="sm:hidden">Cài đặt</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-6">
                        <BasicInfoForm
                            formData={{ tieuDe: formData.tieuDe, duongDan: formData.duongDan, danhMucId: formData.danhMucId, tomTat: formData.tomTat }}
                            selectedTags={selectedTags}
                            newTag={newTag}
                            onTitleChange={handleTitleChange}
                            onFormDataChange={(key, value) => handleFormDataChange(key as any, value)}
                            onNewTagChange={(v) => setNewTag(v)}
                            onAddTag={handleAddTag}
                            onRemoveTag={handleRemoveTag}
                        />
                    </TabsContent>

                    <TabsContent value="content" className="space-y-6">
                        <ContentEditor value={formData.noiDungHtml} onChange={(v) => setFormData({ ...formData, noiDungHtml: v })} />
                    </TabsContent>

                    <TabsContent value="media" className="space-y-6">
                        <MediaUploader
                            featuredImage={featuredImage}
                            attachments={attachments}
                            onImageChange={handleImageUpload}
                            onRemoveImage={handleRemoveFeatured}
                            onAttachmentsChange={handleAttachmentUpload}
                            onRemoveAttachmentAt={handleRemoveAttachmentAt}
                        />
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <SettingsPanel
                            trangThai={formData.trangThai}
                            ngayXuatBan={formData.ngayXuatBan}
                            onTrangThaiChange={(v) => setFormData({ ...formData, trangThai: v })}
                            onNgayXuatBanChange={(v) => setFormData({ ...formData, ngayXuatBan: v })}
                        />
                    </TabsContent>
                </Tabs>
                <FooterActions onSaveDraft={handleSaveDraft} onPublish={handlePublish} />
            </div>
        </div>
    )
}
