import { Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Comment } from "../types"

interface CommentItemProps {
    comment: Comment
    isLast: boolean
}

export const CommentItem = ({ comment, isLast }: CommentItemProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <>
            <div className="pt-6">
                <div className="flex gap-4">
                    {/* Avatar */}
                    <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={comment.nguoi_dung?.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {comment.nguoi_dung
                                ? getInitials(comment.nguoi_dung.ten)
                                : comment.ten_khach
                                    ? getInitials(comment.ten_khach)
                                    : "?"}
                        </AvatarFallback>
                    </Avatar>

                    {/* Comment content */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="font-semibold">
                                    {comment.nguoi_dung ? comment.nguoi_dung.ten : comment.ten_khach}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{formatDate(comment.ngay_tao)}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed">{comment.noi_dung}</p>
                    </div>
                </div>
            </div>
            {!isLast && <Separator />}
        </>
    )
}