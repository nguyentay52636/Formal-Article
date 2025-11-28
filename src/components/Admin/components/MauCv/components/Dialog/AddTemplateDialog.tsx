"use client"

import React, { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ITemplate } from "@/apis/templateApi"
import { ITag } from "@/apis/types"
import { uploadToLocalStorage } from "@/apis/uploadApi"
import { Loader2, Plus, Upload, X } from "lucide-react"
import { useTemplate } from "@/hooks/useTemplate"
import { useTags } from "@/hooks/useTags"

export default function AddTemplateDialog() {
    const { createTemplate } = useTemplate()
    const { tags, getTags } = useTags()
    const [open, setOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)


    // Form state matching the API requirement
    const [formData, setFormData] = useState<Partial<ITemplate> & { featuresInput: string, tagId: number }>({
        name: "",
        slug: "",
        summary: "",
        html: "",
        css: "",
        previewUrl: "",
        color: "#3B82F6",
        description: "",
        language: "vi",
        usage: "",
        design: "",
        features: [],
        featuresInput: "",
        tagId: 0,
        views: 0,
        downloads: 0,
    })

    useEffect(() => {
        if (open) {
            getTags()
        }
    }, [open])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const response = await uploadToLocalStorage(file)
            if (response && response.url) {
                setFormData(prev => ({ ...prev, previewUrl: response.url }))
            }
        } catch (error) {
            console.error("Upload failed:", error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        // Process features from string input (split by newlines)
        const featuresList = formData.featuresInput
            ? formData.featuresInput.split('\n').filter(line => line.trim() !== '')
            : []

        // Auto-generate slug if empty
        const slug = formData.slug || formData.name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || 'template'

        const submissionData = {
            ...formData,
            slug,
            features: featuresList,
            // Remove helper field before submitting
            featuresInput: undefined
        }


        const success = await createTemplate(submissionData as any)
        setIsSaving(false)

        if (success) {
            setOpen(false)
            resetForm()
        }
    }

    const resetForm = () => {
        setFormData({
            name: "",
            slug: "",
            summary: "",
            html: "",
            css: "",
            previewUrl: "",
            color: "#3B82F6",
            description: "",
            language: "vi",
            usage: "",
            design: "",
            features: [],
            featuresInput: "",
            tagId: 0,
            views: 0,
            downloads: 0,
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm mẫu CV
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl! max-h-[120vh]! overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Thêm Template Mới</DialogTitle>
                    <DialogDescription>Tạo mẫu CV mới cho hệ thống</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Tên Template</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Nhập tên template..."
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="slug">Slug (URL)</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="ten-template-slug"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="tagId">Danh mục (Tag)</Label>
                                <Select
                                    value={formData.tagId.toString()}
                                    onValueChange={(value) => setFormData({ ...formData, tagId: parseInt(value) })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn danh mục" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tags.map((tag) => (
                                            <SelectItem key={tag.id} value={tag.id?.toString() || "0"}>
                                                {tag.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="language">Ngôn ngữ</Label>
                                <Select
                                    value={formData.language}
                                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn ngôn ngữ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                                        <SelectItem value="en">Tiếng Anh</SelectItem>
                                        <SelectItem value="jp">Tiếng Nhật</SelectItem>
                                        <SelectItem value="kr">Tiếng Hàn</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="usage">Mục đích sử dụng</Label>
                                <Input
                                    id="usage"
                                    value={formData.usage}
                                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                                    placeholder="VD: Sinh viên mới ra trường, Chuyên gia..."
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="design">Phong cách thiết kế</Label>
                                <Input
                                    id="design"
                                    value={formData.design}
                                    onChange={(e) => setFormData({ ...formData, design: e.target.value })}
                                    placeholder="VD: Hiện đại, Tối giản..."
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="color">Màu chủ đạo</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="color"
                                        type="color"
                                        value={formData.color || "#3B82F6"}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        className="h-10 w-20 cursor-pointer p-1"
                                    />
                                    <Input
                                        value={formData.color || "#3B82F6"}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        placeholder="#3B82F6"
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Ảnh xem trước</Label>
                                <div className="flex flex-col gap-3">
                                    {formData.previewUrl && (
                                        <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                                            <img
                                                src={formData.previewUrl}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute right-2 top-2 h-6 w-6"
                                                onClick={() => setFormData({ ...formData, previewUrl: "" })}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id="preview-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                            disabled={isUploading}
                                        />
                                        <Label
                                            htmlFor="preview-upload"
                                            className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                                        >
                                            {isUploading ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <Upload className="mr-2 h-4 w-4" />
                                            )}
                                            {isUploading ? "Đang tải lên..." : "Tải ảnh lên"}
                                        </Label>
                                        <Input
                                            value={formData.previewUrl}
                                            onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
                                            placeholder="Hoặc nhập URL..."
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="summary">Tóm tắt</Label>
                                <Textarea
                                    id="summary"
                                    value={formData.summary}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                    placeholder="Mô tả ngắn gọn..."
                                    rows={2}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Mô tả chi tiết</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Mô tả đầy đủ về template..."
                                    rows={3}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="features">Tính năng nổi bật</Label>
                                <Textarea
                                    id="features"
                                    value={formData.featuresInput}
                                    onChange={(e) => setFormData({ ...formData, featuresInput: e.target.value })}
                                    placeholder="Nhập mỗi tính năng trên một dòng..."
                                    rows={4}
                                />
                                <p className="text-xs text-muted-foreground">Mỗi dòng sẽ là một tính năng.</p>
                            </div>
                        </div>
                    </div>

                    {/* Full Width Fields */}
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="html">HTML Structure</Label>
                            <Textarea
                                id="html"
                                value={formData.html}
                                onChange={(e) => setFormData({ ...formData, html: e.target.value })}
                                placeholder="<div>...</div>"
                                className="font-mono text-xs"
                                rows={4}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="css">CSS Styles</Label>
                            <Textarea
                                id="css"
                                value={formData.css}
                                onChange={(e) => setFormData({ ...formData, css: e.target.value })}
                                placeholder=".class { ... }"
                                className="font-mono text-xs"
                                rows={4}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Tạo mới
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
