"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"
import type React from "react"

type AISectionProps = {
    aiPrompt: string
    isProcessingAI: boolean
    onPromptChange: (value: string) => void
    onGenerateByPrompt: () => void
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AISection({ aiPrompt, isProcessingAI, onPromptChange, onGenerateByPrompt, onFileChange }: AISectionProps) {
    return (
        <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                        <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Tạo bài viết với AI</h3>
                        <p className="text-sm text-muted-foreground mb-4">Nhập gợi ý hoặc tải file để AI hỗ trợ.</p>
                        <div className="flex flex-col gap-3 mb-4">
                            <Input
                                placeholder="Ví dụ: Viết đơn xin nghỉ phép 3 ngày vì lý do gia đình, giọng điệu lịch sự, có đủ phần kính gửi, lý do, thời gian, cam kết bàn giao công việc và chữ ký."
                                value={aiPrompt}
                                onChange={(e) => onPromptChange(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <Button onClick={onGenerateByPrompt} disabled={isProcessingAI} className="gap-2">
                                    {isProcessingAI ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                                    Gợi ý với AI
                                </Button>
                                <span className="text-sm text-muted-foreground self-center">hoặc</span>
                            </div>
                        </div>
                        <label>
                            <Button disabled={isProcessingAI} className="gap-2" asChild>
                                <span>
                                    {isProcessingAI ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-4 w-4" />
                                            Tải file lên và xử lý với AI
                                        </>
                                    )}
                                </span>
                            </Button>
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={onFileChange}
                                disabled={isProcessingAI}
                            />
                        </label>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


