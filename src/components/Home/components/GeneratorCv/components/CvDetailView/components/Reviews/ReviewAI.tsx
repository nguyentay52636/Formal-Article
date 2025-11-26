"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, RefreshCw } from "lucide-react"
import { useState } from "react"

interface AIReviewProps {
    cvId: string
    cvTitle: string
    cvCategory: string
}

export function ReviewAI({ cvId, cvTitle, cvCategory }: AIReviewProps) {
    const [review, setReview] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    const generateReview = () => {
        setIsGenerating(true)

        // Simulate AI generation
        setTimeout(() => {
            const reviews = {
                strengths: [
                    "Thiết kế chuyên nghiệp và bắt mắt, tạo ấn tượng tốt ngay từ cái nhìn đầu tiên",
                    "Bố cục rõ ràng, dễ đọc, giúp nhà tuyển dụng nhanh chóng nắm bắt thông tin quan trọng",
                    "Màu sắc hài hòa, phù hợp với ngành nghề và phong cách làm việc chuyên nghiệp",
                    "Sử dụng không gian hợp lý, không quá dày đặc cũng không quá thưa thớt",
                ],
                suggestions: [
                    "Nên thêm phần mục tiêu nghề nghiệp rõ ràng để thể hiện định hướng của bạn",
                    "Có thể tùy chỉnh màu sắc để phù hợp hơn với văn hóa công ty bạn ứng tuyển",
                    "Đề xuất thêm các con số cụ thể trong phần thành tích để tăng độ thuyết phục",
                ],
                overall:
                    "Đây là một mẫu CV xuất sắc với thiết kế chuyên nghiệp và bố cục hợp lý. Mẫu CV này rất phù hợp cho vị trí " +
                    cvCategory.toLowerCase() +
                    " và có khả năng thu hút sự chú ý của nhà tuyển dụng. Tỷ lệ thành công khi sử dụng mẫu CV này là 85%.",
            }

            const reviewText = `
**Điểm mạnh:**
${reviews.strengths.map((s, i) => `${i + 1}. ${s}`).join("\n")}

**Đề xuất cải thiện:**
${reviews.suggestions.map((s, i) => `${i + 1}. ${s}`).join("\n")}

**Tổng quan:**
${reviews.overall}
      `.trim()

            setReview(reviewText)
            setIsGenerating(false)
        }, 2000)
    }

    return (
        <Card className="p-6 lg:p-8 space-y-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Nhận xét tự động của AI</h3>
                </div>
                {review && (
                    <Button variant="ghost" size="sm" onClick={generateReview} disabled={isGenerating}>
                        <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                    </Button>
                )}
            </div>

            {!review ? (
                <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                        Nhận phân tích chi tiết về mẫu CV này từ AI, bao gồm điểm mạnh và đề xuất cải thiện
                    </p>
                    <Button onClick={generateReview} disabled={isGenerating} className="gap-2">
                        <Sparkles className="w-4 h-4" />
                        {isGenerating ? "Đang phân tích..." : "Nhận nhận xét từ AI"}
                    </Button>
                </div>
            ) : (
                <div className="prose prose-sm max-w-none">
                    {review.split("\n").map((line, index) => {
                        if (line.startsWith("**")) {
                            return (
                                <h4 key={index} className="font-bold text-lg mt-4 mb-2">
                                    {line.replace(/\*\*/g, "")}
                                </h4>
                            )
                        }
                        if (line.trim()) {
                            return (
                                <p key={index} className="text-sm leading-relaxed mb-2">
                                    {line}
                                </p>
                            )
                        }
                        return null
                    })}
                </div>
            )}
        </Card>
    )
}
