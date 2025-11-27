"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, Trash2 } from "lucide-react"
import Link from "next/link"
import { SavedDocItem } from "../types"
import { Skeleton } from "@/components/ui/skeleton"

interface SavedTabProps {
    savedDocs: SavedDocItem[]
    isLoading?: boolean
    onRemove?: (templateId: number) => void | Promise<void>
}

export function SavedTab({ savedDocs, isLoading, onRemove }: SavedTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tài liệu đã lưu</CardTitle>
                <CardDescription>Các tài liệu bạn đã đánh dấu để đọc sau</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((item) => (
                            <Skeleton key={item} className="h-16 w-full rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {savedDocs.map((doc) => {
                            const docHref = doc.duong_dan?.startsWith("/")
                                ? doc.duong_dan
                                : `/mau-don/${doc.duong_dan}`
                            return (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                                >
                                    <div className="space-y-1">
                                        <Link
                                            href={docHref}
                                            className="font-semibold hover:text-primary transition-colors"
                                        >
                                            {doc.tieu_de}
                                        </Link>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Bookmark className="h-3 w-3" />
                                            Đã lưu ngày {new Date(doc.ngay_luu).toLocaleDateString("vi-VN")}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={docHref}>Xem</Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => onRemove?.(doc.id)}
                                            aria-label="Bỏ lưu tài liệu"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}

                        {savedDocs.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Bạn chưa lưu tài liệu nào</p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default SavedTab


