"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Download, Heart, Clock, FolderOpen } from "lucide-react"

const quickStats = [
    { label: "Lượt tải xuống", value: "12.4K", icon: Download, color: "text-chart-1" },
    { label: "Phản ứng", value: "8.9K", icon: Heart, color: "text-chart-2" },
    { label: "Chờ duyệt", value: "23", icon: Clock, color: "text-chart-3" },
    { label: "Danh mục", value: "45", icon: FolderOpen, color: "text-chart-5" },
]

export default function QuickStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((stat) => {
                const Icon = stat.icon
                return (
                    <Card key={stat.label}>
                        <CardContent className="flex items-center justify-between p-4">
                            <div>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                            <Icon className={`h-8 w-8 ${stat.color}`} />
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
