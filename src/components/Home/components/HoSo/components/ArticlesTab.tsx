"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Eye, FileText } from "lucide-react"
import Link from "next/link"
import { ArticleItem } from "../types"

interface ArticlesTabProps {
    userArticles: ArticleItem[]
}

export function ArticlesTab({ userArticles }: ArticlesTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bài viết của tôi</CardTitle>
                <CardDescription>Danh sách các bài viết bạn đã đăng</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {userArticles.map((article) => (
                        <div
                            key={article.id}
                            className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex-1 space-y-2">
                                <Link
                                    href={`/mau-don/${article.duong_dan}`}
                                    className="font-semibold hover:text-primary transition-colors"
                                >
                                    {article.tieu_de}
                                </Link>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(article.ngay_xuat_ban).toLocaleDateString("vi-VN")}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        {article.luot_xem.toLocaleString()} lượt xem
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Download className="h-3 w-3" />
                                        {article.luot_tai.toLocaleString()} lượt tải
                                    </div>
                                </div>
                            </div>
                            <Badge variant={article.trang_thai === "xuat_ban" ? "default" : "secondary"}>
                                {article.trang_thai === "xuat_ban" ? "Đã xuất bản" : "Nháp"}
                            </Badge>
                        </div>
                    ))}

                    {userArticles.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Bạn chưa có bài viết nào</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default ArticlesTab


