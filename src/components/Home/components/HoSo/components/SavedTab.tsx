"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Loader2, ExternalLink, Edit } from "lucide-react"
import Link from "next/link"
import { useGenetaredCvs } from "@/hooks/useGenetaredCvs"
import Image from "next/image"

export function SavedTab() {
    const { generatedCvs, isLoading, error } = useGenetaredCvs()

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>CV đã tạo</CardTitle>
                    <CardDescription>Danh sách các CV bạn đã tạo</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>CV đã tạo</CardTitle>
                    <CardDescription>Danh sách các CV bạn đã tạo</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-destructive">
                        <p>{error}</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    CV đã tạo
                </CardTitle>
                <CardDescription>Danh sách các CV bạn đã tạo và chỉnh sửa</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {generatedCvs.map((cv) => (
                        <div
                            key={cv.id}
                            className="group relative rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Preview Image */}
                            {cv.template?.previewUrl && (
                                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                                    <Image
                                        src={cv.template.previewUrl}
                                        alt={cv.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-4 space-y-3">
                                <div>
                                    <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                                        {cv.title}
                                    </h3>
                                    {cv.template && (
                                        <Badge variant="secondary" className="text-xs">
                                            {cv.template.name}
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(cv.createdAt).toLocaleDateString("vi-VN", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        asChild
                                    >
                                        <Link href={`/chinh-sua-don/${cv.id}`}>
                                            <Edit className="h-3 w-3 mr-1" />
                                            Chỉnh sửa
                                        </Link>
                                    </Button>
                                    {cv.htmlOutput && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                const newWindow = window.open()
                                                if (newWindow) {
                                                    newWindow.document.write(cv.htmlOutput)
                                                    newWindow.document.close()
                                                }
                                            }}
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {generatedCvs.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Bạn chưa tạo CV nào</p>
                            <p className="text-sm mt-2">Hãy tạo CV mới để bắt đầu!</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default SavedTab


