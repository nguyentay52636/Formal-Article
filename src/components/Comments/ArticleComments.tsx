"use client"

import React from "react"
import { ArticleCommentsProps } from "./types"
import { useComments } from "./hooks/useComments"
import { CommentsHeader } from "./components/CommentsHeader"
import { CommentForm } from "./components/CommentForm"
import { CommentList } from "./components/CommentList"

export function ArticleComments({ articleId }: ArticleCommentsProps) {
    // Mock user data - in production, this would come from auth context
    const user = {
        id: 1,
        ten: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        avatar: "/diverse-user-avatars.png",
    }

    const {
        approvedComments,
        newComment,
        setNewComment,
        isSubmitting,
        showSuccess,
        addComment,
    } = useComments(articleId)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await addComment(newComment, user)
    }

    return (
        <div className="space-y-6">
            <CommentsHeader commentCount={approvedComments.length} />

            <CommentForm
                newComment={newComment}
                setNewComment={setNewComment}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                showSuccess={showSuccess}
                user={user}
            />

            <CommentList comments={approvedComments} />
        </div>
    )
}
