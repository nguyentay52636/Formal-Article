"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CommentItem, statusColors, statusLabels } from "../../data"

interface ViewCommentDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    comment: CommentItem | null
}

export default function ViewCommentDialog({ open, onOpenChange, comment }: ViewCommentDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Chi tiết bình luận</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>{comment?.nguoiDung.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">{comment?.nguoiDung}</div>
                            <div className="text-sm text-muted-foreground">{comment?.email}</div>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Bài viết</div>
                        <div className="font-medium">{comment?.baiViet}</div>
                    </div>

                    <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Nội dung bình luận</div>
                        <div className="rounded-lg bg-muted p-4">{comment?.noiDung}</div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Trạng thái</div>
                            <Badge className={statusColors[comment?.trangThai as keyof typeof statusColors]}>
                                {statusLabels[comment?.trangThai as keyof typeof statusLabels]}
                            </Badge>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-muted-foreground">Ngày tạo</div>
                            <div className="text-sm">{comment?.ngayTao}</div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Đóng
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
