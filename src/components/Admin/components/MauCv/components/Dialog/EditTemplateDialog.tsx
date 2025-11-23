"use client"

import React, { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ITemplate } from "@/apis/templateApi"
import { Loader2 } from "lucide-react"

interface EditTemplateDialogProps {
    template: ITemplate | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (template: ITemplate) => Promise<void>
}

export default function EditTemplateDialog({ template, open, onOpenChange, onSave }: EditTemplateDialogProps) {
    const [formData, setFormData] = useState<ITemplate | null>(template)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        setFormData(template)
    }, [template])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData) return

        setIsSaving(true)
        await onSave(formData)
        setIsSaving(false)
        onOpenChange(false)
    }

    if (!formData) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa Template</DialogTitle>
                    <DialogDescription>Cập nhật thông tin mẫu CV của bạn</DialogDescription>
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
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Lưu thay đổi
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
