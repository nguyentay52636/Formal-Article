import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string | number
    subtitle: string
    icon: React.ReactNode
    iconBgColor: string
    iconColor: string
    subtitleColor: string
}

export default function StatsCard({
    title,
    value,
    subtitle,
    icon,
    iconBgColor,
    iconColor,
    subtitleColor,
}: StatsCardProps) {
    return (
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
                        <p className={`text-sm ${subtitleColor} flex items-center`}>
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {subtitle}
                        </p>
                    </div>
                    <div className={`p-4 rounded-2xl ${iconBgColor} group-hover:scale-110 transition-transform duration-300`}>
                        <div className={iconColor}>{icon}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
