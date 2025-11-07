"use client"

import { Download, Eye, Star } from "lucide-react"

interface StatsBarProps {
    views: number
    downloads: number
    ratingScore?: number
    ratingCount?: number
}

export function StatsBar({ views, downloads, ratingScore = 4.8, ratingCount = 124 }: StatsBarProps) {
    return (
        <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{views.toLocaleString()}</span>
                <span className="text-muted-foreground">lượt xem</span>
            </div>
            <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{downloads.toLocaleString()}</span>
                <span className="text-muted-foreground">lượt tải</span>
            </div>
            <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{ratingScore.toFixed(1)}</span>
                <span className="text-muted-foreground">({ratingCount} đánh giá)</span>
            </div>
        </div>
    )
}

