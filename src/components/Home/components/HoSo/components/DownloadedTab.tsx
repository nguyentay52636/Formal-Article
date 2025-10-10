"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye, File, FileImage, FileType } from "lucide-react"
import Link from "next/link"
import { DownloadedDocItem } from "../types"

interface DownloadedTabProps {
    downloadedDocs: DownloadedDocItem[]
}

const getFileIcon = (format: string) => {
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(format.toLowerCase())) {
        return <FileImage className="h-5 w-5 text-blue-500" />
    }
    if (["pdf"].includes(format.toLowerCase())) {
        return <FileType className="h-5 w-5 text-red-500" />
    }
    return <File className="h-5 w-5 text-gray-500" />
}

const getFormatBadgeColor = (format: string) => {
    const lower = format.toLowerCase()
    if (["docx", "doc"].includes(lower)) return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    if (["pdf"].includes(lower)) return "bg-red-500/10 text-red-500 border-red-500/20"
    if (["jpg", "jpeg", "png", "gif"].includes(lower)) return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    return "bg-gray-500/10 text-gray-500 border-gray-500/20"
}

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

export function DownloadedTab({ downloadedDocs }: DownloadedTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tài liệu đã tải về</CardTitle>
                <CardDescription>Danh sách các tài liệu bạn đã tải xuống</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {downloadedDocs.map((doc) => (
                        <div
                            key={doc.id}
                            className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                        >
                            <div className="mt-1">{getFileIcon(doc.dinh_dang)}</div>
                            <div className="flex-1 space-y-2">
                                <div className="space-y-1">
                                    <Link
                                        href={`/mau-don/${doc.duong_dan}`}
                                        className="font-semibold hover:text-primary transition-colors block"
                                    >
                                        {doc.tieu_de}
                                    </Link>
                                    <div className="text-sm text-muted-foreground">{doc.ten_tap_tin}</div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                                    <div className="flex items-center gap-1">
                                        <Download className="h-3 w-3" />
                                        Tải ngày {new Date(doc.ngay_tai).toLocaleDateString("vi-VN")}
                                    </div>
                                    <Badge variant="outline" className={getFormatBadgeColor(doc.dinh_dang)}>
                                        {doc.dinh_dang.toUpperCase()}
                                    </Badge>
                                    <span>{formatFileSize(doc.kich_thuoc)}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/mau-don/${doc.duong_dan}`}>
                                        <Eye className="h-4 w-4 mr-1" />
                                        Xem
                                    </Link>
                                </Button>
                                <Button variant="default" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Tải lại
                                </Button>
                            </div>
                        </div>
                    ))}

                    {downloadedDocs.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <Download className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Bạn chưa tải tài liệu nào</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default DownloadedTab


