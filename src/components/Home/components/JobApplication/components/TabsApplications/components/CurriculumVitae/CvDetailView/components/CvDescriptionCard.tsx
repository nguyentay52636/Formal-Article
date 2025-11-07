"use client"

import { FileText, Globe, Palette } from "lucide-react"

import { Card } from "@/components/ui/card"

interface CvDescriptionCardProps {
    description: string
    language: string
    category: string
    industry: string
}

export function CvDescriptionCard({ description, language, category, industry }: CvDescriptionCardProps) {
    return (
        <Card className="p-6 lg:p-8 space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-balance">Giới thiệu về mẫu CV này</h2>
                <p className="text-muted-foreground leading-relaxed">
                    {description} Mẫu CV này được thiết kế chuyên nghiệp, giúp bạn thể hiện được năng lực và kinh nghiệm của mình một cách ấn tượng nhất với nhà tuyển dụng.
                </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Ngôn ngữ</p>
                        <p className="text-sm text-muted-foreground">{language}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <Palette className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Phong cách</p>
                        <p className="text-sm text-muted-foreground">{category}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Ngành nghề</p>
                        <p className="text-sm text-muted-foreground">{industry}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

