"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts"
import Link from "next/link"

const categoryData = [
    { name: "Đơn xin việc", value: 450, color: "hsl(var(--chart-1))" },
    { name: "Đơn xin nghỉ", value: 280, color: "hsl(var(--chart-2))" },
    { name: "Đơn thực tập", value: 180, color: "hsl(var(--chart-3))" },
    { name: "Khác", value: 124, color: "hsl(var(--chart-4))" },
]

const recentActivities = [
    {
        user: "Nguyễn Văn A",
        action: "đã xuất bản bài viết",
        target: "Mẫu đơn xin việc ngành IT 2025",
        time: "5 phút trước",
        type: "publish",
    },
    {
        user: "Trần Thị B",
        action: "đã bình luận",
        target: "Đơn xin nghỉ phép có lý do",
        time: "15 phút trước",
        type: "comment",
    },
    {
        user: "Lê Văn C",
        action: "đã tải lên tệp",
        target: "mau-don-xin-viec.docx",
        time: "1 giờ trước",
        type: "upload",
    },
    {
        user: "Phạm Thị D",
        action: "đã đăng ký tài khoản",
        target: "",
        time: "2 giờ trước",
        type: "register",
    },
]

export default function SidebarSection() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Phân bố danh mục</CardTitle>
                    <CardDescription>Số lượng bài viết theo danh mục</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                        {categoryData.map((cat) => (
                            <div key={cat.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                                    <span>{cat.name}</span>
                                </div>
                                <span className="font-medium">{cat.value}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Hoạt động gần đây</CardTitle>
                    <CardDescription>Các hoạt động mới nhất trong hệ thống</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm">
                                        <span className="font-medium">{activity.user}</span>{" "}
                                        <span className="text-muted-foreground">{activity.action}</span>
                                        {activity.target && (
                                            <>
                                                {" "}
                                                <span className="font-medium">"{activity.target}"</span>
                                            </>
                                        )}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                        <Link href="/quantri/lich-su">Xem tất cả hoạt động</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
