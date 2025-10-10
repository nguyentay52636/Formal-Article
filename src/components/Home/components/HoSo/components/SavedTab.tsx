"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import Link from "next/link"
import { SavedDocItem } from "../types"

interface SavedTabProps {
    savedDocs: SavedDocItem[]
}

export function SavedTab({ savedDocs }: SavedTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tài liệu đã lưu</CardTitle>
                <CardDescription>Các tài liệu bạn đã đánh dấu để đọc sau</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {savedDocs.map((doc) => (
                        <div
                            key={doc.id}
                            className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                        >
                            <div className="space-y-1">
                                <Link
                                    href={`/mau-don/${doc.duong_dan}`}
                                    className="font-semibold hover:text-primary transition-colors"
                                >
                                    {doc.tieu_de}
                                </Link>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Bookmark className="h-3 w-3" />
                                    Đã lưu ngày {new Date(doc.ngay_luu).toLocaleDateString("vi-VN")}
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={`/mau-don/${doc.duong_dan}`}>Xem</Link>
                            </Button>
                        </div>
                    ))}

                    {savedDocs.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Bạn chưa lưu tài liệu nào</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default SavedTab


