"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts"

const articleData = [
    { month: "T1", count: 65 },
    { month: "T2", count: 78 },
    { month: "T3", count: 90 },
    { month: "T4", count: 81 },
    { month: "T5", count: 95 },
    { month: "T6", count: 112 },
]

const viewData = [
    { day: "T2", views: 4200 },
    { day: "T3", views: 3800 },
    { day: "T4", views: 5100 },
    { day: "T5", views: 4600 },
    { day: "T6", views: 5800 },
    { day: "T7", views: 6200 },
    { day: "CN", views: 5400 },
]

export default function ChartsSection() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Bài viết theo tháng</CardTitle>
                    <CardDescription>Số lượng bài viết được xuất bản mỗi tháng</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={articleData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="month" className="text-xs" />
                            <YAxis className="text-xs" />
                            <Tooltip />
                            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Lượt xem theo ngày</CardTitle>
                    <CardDescription>Lượt xem trong 7 ngày qua</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={viewData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="day" className="text-xs" />
                            <YAxis className="text-xs" />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="views"
                                stroke="hsl(var(--accent))"
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--accent))", r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
