"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, MessageSquare, Eye, TrendingUp } from "lucide-react"

const stats = [
    {
        title: "Tổng bài viết",
        value: "1,234",
        change: "+12.5%",
        changeValue: "+45",
        icon: FileText,
        color: "text-primary",
        bgGradient: "from-primary/20 to-primary/5",
        description: "bài viết mới tháng này",
    },
    {
        title: "Người dùng",
        value: "856",
        change: "+8.2%",
        changeValue: "+28",
        icon: Users,
        color: "text-secondary",
        bgGradient: "from-secondary/20 to-secondary/5",
        description: "người dùng mới",
    },
    {
        title: "Bình luận",
        value: "3,421",
        change: "+23.1%",
        changeValue: "+156",
        icon: MessageSquare,
        color: "text-accent",
        bgGradient: "from-accent/20 to-accent/5",
        description: "bình luận mới",
    },
    {
        title: "Lượt xem",
        value: "45.2K",
        change: "+15.3%",
        changeValue: "+5.8K",
        icon: Eye,
        color: "text-chart-4",
        bgGradient: "from-chart-4/20 to-chart-4/5",
        description: "lượt xem tháng này",
    },
]

export default function StatsCards() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon
                return (
                    <Card key={stat.title} className="overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-5`} />
                        <CardHeader className="relative flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            <div className={`p-2 rounded-lg bg-white! backdrop-blur-sm`}>
                                <Icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-accent flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    {stat.change}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {stat.changeValue} {stat.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
