"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Trash2, Eye } from "lucide-react"
import { CommentItem, statusColors, statusLabels } from "../data"

interface TableBinhLuanProps {
    comments: CommentItem[]
    onView: (comment: CommentItem) => void
    onApprove: (comment: CommentItem) => void
    onReject: (comment: CommentItem) => void
    onDelete: (comment: CommentItem) => void
}

export default function TableBinhLuan({
    comments,
    onView,
    onApprove,
    onReject,
    onDelete
}: TableBinhLuanProps) {
    return (
        <div className="rounded-lg border border-border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Người dùng</TableHead>
                        <TableHead>Bài viết</TableHead>
                        <TableHead>Nội dung</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                        <TableHead className="w-[150px]">Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {comments.map((comment) => (
                        <TableRow key={comment.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>{comment.nguoiDung.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{comment.nguoiDung}</div>
                                        <div className="text-xs text-muted-foreground">{comment.email}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">{comment.baiViet}</TableCell>
                            <TableCell className="max-w-[300px] truncate">{comment.noiDung}</TableCell>
                            <TableCell>
                                <Badge className={statusColors[comment.trangThai]}>
                                    {statusLabels[comment.trangThai]}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-sm">{comment.ngayTao}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" title="Xem" onClick={() => onView(comment)}>
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Duyệt" onClick={() => onApprove(comment)}>
                                        <Check className="h-4 w-4 text-accent" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Từ chối" onClick={() => onReject(comment)}>
                                        <X className="h-4 w-4 text-destructive" />
                                    </Button>
                                    <Button variant="ghost" size="icon" title="Xóa" onClick={() => onDelete(comment)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
