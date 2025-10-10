"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CommentItem } from "../types"

interface CommentsTabProps {
    recentComments: CommentItem[]
}

export function CommentsTab({ recentComments }: CommentsTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bình luận gần đây</CardTitle>
                <CardDescription>Các bình luận bạn đã đăng</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentComments.map((comment) => (
                        <div key={comment.id} className="space-y-2 p-4 rounded-lg border">
                            <p className="text-sm">{comment.noi_dung}</p>
                            <Separator />
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Trên bài viết: {comment.bai_viet}</span>
                                <span>{new Date(comment.ngay_tao).toLocaleDateString("vi-VN")}</span>
                            </div>
                        </div>
                    ))}

                    {recentComments.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Bạn chưa có bình luận nào</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default CommentsTab


