import { MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CommentsHeaderProps {
    commentCount: number
}

export const CommentsHeader = ({ commentCount }: CommentsHeaderProps) => {
    return (
        <div className="flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Bình luận</h2>
            <Badge variant="secondary" className="ml-auto">
                {commentCount} bình luận
            </Badge>
        </div>
    )
}