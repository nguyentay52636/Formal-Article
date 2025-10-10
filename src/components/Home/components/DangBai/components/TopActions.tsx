"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye, Save, Send } from "lucide-react"

type TopActionsProps = {
    onPreview: () => void
    onSaveDraft: () => void
    onPublish: () => void
}

export function TopActions({ onPreview, onSaveDraft, onPublish }: TopActionsProps) {
    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <Link href="/ho-so">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Tạo bài viết mới
                    </h1>
                    <p className="text-muted-foreground mt-1">Chia sẻ kiến thức và tài liệu của bạn</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onPreview}>
                    <Eye className="mr-2 h-4 w-4" />
                    Xem trước
                </Button>
                <Button variant="outline" onClick={onSaveDraft}>
                    <Save className="mr-2 h-4 w-4" />
                    Lưu nháp
                </Button>
                <Button onClick={onPublish} className="bg-gradient-to-r from-primary to-primary/80">
                    <Send className="mr-2 h-4 w-4" />
                    Xuất bản
                </Button>
            </div>
        </div>
    )
}


