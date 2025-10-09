import { MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Comment } from "../types"
import { CommentItem } from "./CommentItem"

interface CommentListProps {
    comments: Comment[]
}

export const CommentList = ({ comments }: CommentListProps) => {
    if (comments.length === 0) {
        return (
            <Card>
                <CardContent className="py-12 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {comments.map((comment, index) => (
                <Card key={comment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                        <CommentItem
                            comment={comment}
                            isLast={index === comments.length - 1}
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}