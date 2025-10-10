"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Paperclip, Upload, X, FileText } from "lucide-react"

type MediaUploaderProps = {
    featuredImage: string | null
    attachments: Array<{ name: string; size: string }>
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRemoveImage: () => void
    onAttachmentsChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRemoveAttachmentAt: (index: number) => void
}

export function MediaUploader({ featuredImage, attachments, onImageChange, onRemoveImage, onAttachmentsChange, onRemoveAttachmentAt }: MediaUploaderProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Ảnh đại diện</CardTitle>
                    <CardDescription>Tải lên ảnh đại diện cho bài viết của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                    {featuredImage ? (
                        <div className="relative">
                            <img src={featuredImage || "/placeholder.svg"} alt="Featured" className="w-full h-64 object-cover rounded-lg" />
                            <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={onRemoveImage}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">Nhấp để tải lên</span> hoặc kéo thả
                                </p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (MAX. 2MB)</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={onImageChange} />
                        </label>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tệp đính kèm</CardTitle>
                    <CardDescription>Tải lên các tệp tài liệu liên quan (DOC, PDF, v.v.)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-2">
                            <Paperclip className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium">Chọn tệp để tải lên</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">DOC, DOCX, PDF (MAX. 5MB)</p>
                        <input type="file" className="hidden" accept=".doc,.docx,.pdf" multiple onChange={onAttachmentsChange} />
                    </label>

                    {attachments.length > 0 && (
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Tệp đã tải lên:</Label>
                            {attachments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="text-sm font-medium">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">{file.size}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => onRemoveAttachmentAt(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}


