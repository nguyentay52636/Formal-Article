"use client"

import { useEffect, useRef } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText } from "lucide-react"

type ContentEditorProps = {
    value: string
    onChange: (value: string) => void
}

export function ContentEditor({ value, onChange }: ContentEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const resizeToFit = () => {
        const el = textareaRef.current
        if (!el) return
        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
    }

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value)
        resizeToFit()
    }

    useEffect(() => {
        resizeToFit()
    }, [value])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Nội dung bài viết</CardTitle>
                <CardDescription>Viết nội dung chi tiết cho bài viết của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                        Bạn có thể sử dụng HTML để định dạng nội dung. Hỗ trợ các thẻ: &lt;p&gt;, &lt;h1-h6&gt;,
                        &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;a&gt;
                    </AlertDescription>
                </Alert>

                <div className="space-y-2">
                    <Label htmlFor="noiDungHtml" className="text-base">
                        Nội dung <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                        ref={textareaRef}
                        id="noiDungHtml"
                        placeholder="Nhập nội dung bài viết của bạn..."
                        rows={1}
                        value={value}
                        onInput={handleInput}
                        className="font-mono text-sm resize-none"
                    />
                    <p className="text-xs text-muted-foreground">{value.length} ký tự</p>
                </div>
            </CardContent>
        </Card>
    )
}
