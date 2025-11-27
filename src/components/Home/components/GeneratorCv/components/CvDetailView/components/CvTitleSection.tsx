"use client"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ActionUsedTemplate from "../../ActionUsedTemplate"
interface CvTitleSectionProps {
    id: number
    title: string
    tag: string | undefined
    industry: string
}

export function CvTitleSection({ id, title, tag, industry }: CvTitleSectionProps) {
    return (
        <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-balance leading-tight">{title}</h1>
            <div className="flex items-center gap-2 mb-6">
                <Badge variant="secondary" className="font-medium">
                    {tag}
                </Badge>
                <Badge variant="outline" className="font-medium">
                    {industry}
                </Badge>
            </div>
            <ActionUsedTemplate id={id} />
            <p className="text-xs text-center text-muted-foreground mt-3">Miễn phí • Không cần đăng ký • Chỉnh sửa trực tuyến</p>
        </div>
    )
}

