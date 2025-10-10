"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Save, Send } from "lucide-react"

type FooterActionsProps = {
    onSaveDraft: () => void
    onPublish: () => void
}

export function FooterActions({ onSaveDraft, onPublish }: FooterActionsProps) {
    return (
        <Card className="mt-6">
            <CardContent className="flex items-center justify-between p-6">
                <p className="text-sm text-muted-foreground">Bài viết chưa lưu. Nhớ lưu nháp hoặc xuất bản để không mất dữ liệu.</p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={onSaveDraft}>
                        <Save className="mr-2 h-4 w-4" />
                        Lưu nháp
                    </Button>
                    <Button onClick={onPublish} className="bg-gradient-to-r from-primary to-primary/80">
                        <Send className="mr-2 h-4 w-4" />
                        Xuất bản ngay
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


