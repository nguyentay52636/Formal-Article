export interface Comment {
    id: number
    bai_viet_id: number
    nguoi_dung_id?: number
    ten_khach?: string
    email_khach?: string
    noi_dung: string
    trang_thai: "cho_duyet" | "da_duyet" | "spam" | "xoa"
    ngay_tao: string
    nguoi_dung?: {
        id: number
        ten: string
        email: string
        avatar?: string
    }
}

export interface ArticleCommentsProps {
    articleId: number
    articleSlug: string
}

export interface CommentFormData {
    noi_dung: string
    ten_khach: string
    email_khach: string
}

export interface User {
    id: number
    ten: string
    email: string
    avatar?: string
}