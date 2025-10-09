"use client"

import { useState } from "react"
import { Comment, CommentFormData } from "../types"

export const useComments = (articleId: number) => {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            bai_viet_id: articleId,
            nguoi_dung_id: 1,
            noi_dung: "Mẫu đơn rất hữu ích, cảm ơn admin đã chia sẻ!",
            trang_thai: "da_duyet",
            ngay_tao: "2025-01-10T10:30:00",
            nguoi_dung: {
                id: 1,
                ten: "Nguyễn Văn A",
                email: "nguyenvana@example.com",
                avatar: "/diverse-user-avatars.png",
            },
        },
        {
            id: 2,
            bai_viet_id: articleId,
            ten_khach: "Trần Thị B",
            email_khach: "tranthib@example.com",
            noi_dung: "Mình đã tải về và sử dụng, rất chuyên nghiệp. Cảm ơn nhiều!",
            trang_thai: "da_duyet",
            ngay_tao: "2025-01-12T14:20:00",
            nguoi_dung: {
                id: 2,
                ten: "Lê Văn C",
                email: "levanc@example.com",
                avatar: "/diverse-user-avatars.png",
            },
        },
        {
            id: 3,
            bai_viet_id: articleId,
            nguoi_dung_id: 2,
            noi_dung: "Có thể cung cấp thêm mẫu đơn bằng tiếng Anh không ạ?",
            trang_thai: "da_duyet",
            ngay_tao: "2025-01-14T09:15:00",
            nguoi_dung: {
                id: 2,
                ten: "Lê Văn C",
                email: "levanc@example.com",
                avatar: "/diverse-user-avatars.png",
            },
        },
    ])

    const [newComment, setNewComment] = useState<CommentFormData>({
        noi_dung: "",
        ten_khach: "",
        email_khach: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const approvedComments = comments.filter((c) => c.trang_thai === "da_duyet")

    const addComment = async (commentData: CommentFormData, user?: any) => {
        setIsSubmitting(true)
        
        try {
            // Mock comment submission
            const mockComment: Comment = {
                id: Date.now(),
                bai_viet_id: articleId,
                nguoi_dung_id: user?.id,
                ten_khach: user ? undefined : commentData.ten_khach,
                email_khach: user ? undefined : commentData.email_khach,
                noi_dung: commentData.noi_dung,
                trang_thai: user ? "da_duyet" : "cho_duyet",
                ngay_tao: new Date().toISOString(),
                nguoi_dung: user
                    ? {
                        id: user.id,
                        ten: user.ten,
                        email: user.email,
                        avatar: user.avatar,
                    }
                    : undefined,
            }

            if (user) {
                setComments([mockComment, ...comments])
            }

            setNewComment({ noi_dung: "", ten_khach: "", email_khach: "" })
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 5000)
        } catch (error) {
            console.error("Failed to submit comment:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        comments,
        approvedComments,
        newComment,
        setNewComment,
        isSubmitting,
        showSuccess,
        addComment,
    }
}