"use client"

import React, { useState } from "react"
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
import { ITemplate } from "@/apis/templateApi"
import { Loader2, Plus } from "lucide-react"
import { useTemplate } from "@/hooks/useTemplate"

export default function AddTemplateDialog() {
    const { createTemplate } = useTemplate()
    const [open, setOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState<Partial<ITemplate>>({
        name: "",
        summary: "",
        previewUrl: "",
        tag: { name: "", slug: "" },
        color: "#3B82F6",
        views: 0,
        downloads: 0,
        slug: "", // Added slug as it's likely required by backend even if not in UI
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        // Auto-generate slug if empty
        const submissionData = {
            ...formData,
            slug: formData.slug || formData.name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || 'template'
        }

        const success = await createTemplate(submissionData as ITemplate)
        setIsSaving(false)

        if (success) {
            setOpen(false)
            setFormData({
                name: "",
                summary: "",
                previewUrl: "",
                tag: { name: "", slug: "" },
                color: "#3B82F6",
                views: 0,
                downloads: 0,
                slug: "",
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm mẫu CV
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Thêm Template Mới</DialogTitle>
                    <DialogDescription>Tạo mẫu CV mới cho hệ thống</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
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
                            <Label htmlFor="summary">Mô tả</Label>
                            <Textarea
                                id="summary"
                                value={formData.summary}
                                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                placeholder="Nhập mô tả ngắn gọn về template..."
                                rows={3}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="previewUrl">URL Hình ảnh</Label>
                            <Input
                                id="previewUrl"
                                value={formData.previewUrl}
                                onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
                                placeholder="https://..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="tagName">Tag</Label>
                                <Input
                                    id="tagName"
                                    value={formData.tag?.name || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            tag: { ...formData.tag!, name: e.target.value },
                                        })
                                    }
                                    placeholder="Chuyên nghiệp, Sáng tạo..."
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="color">Màu sắc</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="color"
                                        type="color"
                                        value={formData.color || "#3B82F6"}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        className="h-10 w-20 cursor-pointer"
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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="views">Lượt xem</Label>
                                <Input
                                    id="views"
                                    type="number"
                                    value={formData.views}
                                    onChange={(e) => setFormData({ ...formData, views: Number.parseInt(e.target.value) || 0 })}
                                    min="0"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="downloads">Lượt tải</Label>
                                <Input
                                    id="downloads"
                                    type="number"
                                    value={formData.downloads}
                                    onChange={(e) => setFormData({ ...formData, downloads: Number.parseInt(e.target.value) || 0 })}
                                    min="0"
                                />
                            </div>
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
