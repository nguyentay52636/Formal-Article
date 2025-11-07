"use client"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CvTitleSectionProps {
    id: string
    title: string
    category: string
    industry: string
}

export function CvTitleSection({ id, title, category, industry }: CvTitleSectionProps) {
    return (
        <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-balance leading-tight">{title}</h1>
            <div className="flex items-center gap-2 mb-6">
                <Badge variant="secondary" className="font-medium">
                    {category}
                </Badge>
                <Badge variant="outline" className="font-medium">
                    {industry}
                </Badge>
            </div>
            <Button
                size="lg"
                className="w-full text-white bg-[#ed145b]! hover:bg-[#ed145b]/90! text-white font-bold text-lg h-14 shadow-lg hover:shadow-xl transition-all"
                asChild
            >
                <Link href={`/cv-editor/${id}`}>DÙNG NGAY MẪU CV NÀY</Link>
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-3">Miễn phí • Không cần đăng ký • Chỉnh sửa trực tuyến</p>
        </div>
    )
}

