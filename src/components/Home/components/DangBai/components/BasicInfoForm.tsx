"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Tag, X } from "lucide-react"
import type React from "react"

type BasicInfoFormProps = {
    formData: {
        tieuDe: string
        duongDan: string
        danhMucId: string
        tomTat: string
    }
    selectedTags: string[]
    newTag: string
    onTitleChange: (value: string) => void
    onFormDataChange: (key: keyof BasicInfoFormProps["formData"], value: string) => void
    onNewTagChange: (value: string) => void
    onAddTag: () => void
    onRemoveTag: (tag: string) => void
}

export function BasicInfoForm({ formData, selectedTags, newTag, onTitleChange, onFormDataChange, onNewTagChange, onAddTag, onRemoveTag }: BasicInfoFormProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription>Nhập tiêu đề, danh mục và tóm tắt cho bài viết của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="tieuDe" className="text-base">
                        Tiêu đề bài viết <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="tieuDe"
                        placeholder="Nhập tiêu đề hấp dẫn cho bài viết của bạn..."
                        value={formData.tieuDe}
                        onChange={(e) => onTitleChange(e.target.value)}
                        className="text-lg h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="duongDan" className="text-base">
                        Đường dẫn (URL Slug)
                    </Label>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">maudon.edu.vn/</span>
                        <Input
                            id="duongDan"
                            placeholder="duong-dan-bai-viet"
                            value={formData.duongDan}
                            onChange={(e) => onFormDataChange("duongDan", e.target.value)}
                            className="flex-1"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">Đường dẫn được tạo tự động từ tiêu đề, bạn có thể chỉnh sửa nếu cần</p>
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="danhMucId" className="text-base">
                            Danh mục <span className="text-destructive">*</span>
                        </Label>
                        <Select value={formData.danhMucId} onValueChange={(value) => onFormDataChange("danhMucId", value)}>
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Chọn danh mục phù hợp" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Đơn xin việc</SelectItem>
                                <SelectItem value="2">Đơn xin nghỉ phép</SelectItem>
                                <SelectItem value="3">Đơn xin chuyển công tác</SelectItem>
                                <SelectItem value="4">Đơn xin thực tập</SelectItem>
                                <SelectItem value="5">Đơn xin học bổng</SelectItem>
                                <SelectItem value="6">Đơn khiếu nại</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-base">Thẻ (Tags)</Label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Thêm thẻ..."
                                value={newTag}
                                onChange={(e) => onNewTagChange(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), onAddTag())}
                            />
                            <Button type="button" onClick={onAddTag} size="icon" variant="outline">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        {selectedTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {selectedTags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                                        <Tag className="h-3 w-3" />
                                        {tag}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 p-0 hover:bg-transparent"
                                            onClick={() => onRemoveTag(tag)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tomTat" className="text-base">
                        Tóm tắt
                    </Label>
                    <Textarea
                        id="tomTat"
                        placeholder="Viết tóm tắt ngắn gọn về nội dung bài viết (150-300 ký tự)..."
                        rows={4}
                        value={formData.tomTat}
                        onChange={(e) => onFormDataChange("tomTat", e.target.value)}
                        className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">{formData.tomTat.length}/300 ký tự</p>
                </div>
            </CardContent>
        </Card>
    )
}


