export interface CommentItem {
    id: number
    nguoiDung: string
    email: string
    baiViet: string
    noiDung: string
    trangThai: "da_duyet" | "cho_duyet" | "spam" | "xoa"
    ngayTao: string
}

export const comments: CommentItem[] = [
    {
        id: 1,
        nguoiDung: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        baiViet: "Mẫu đơn xin việc ngành IT",
        noiDung: "Bài viết rất hữu ích, cảm ơn tác giả đã chia sẻ!",
        trangThai: "da_duyet",
        ngayTao: "2025-01-15 10:30",
    },
    {
        id: 2,
        nguoiDung: "Khách",
        email: "guest@example.com",
        baiViet: "Đơn xin nghỉ phép có lý do",
        noiDung: "Mẫu đơn này có thể dùng cho công ty tư nhân không?",
        trangThai: "cho_duyet",
        ngayTao: "2025-01-15 14:20",
    },
    {
        id: 3,
        nguoiDung: "Trần Thị B",
        email: "tranthib@example.com",
        baiViet: "Mẫu đơn xin thực tập",
        noiDung: "Spam content here...",
        trangThai: "spam",
        ngayTao: "2025-01-14 09:15",
    },
]

export const statusColors = {
    da_duyet: "bg-accent text-accent-foreground",
    cho_duyet: "bg-secondary text-secondary-foreground",
    spam: "bg-destructive text-destructive-foreground",
    xoa: "bg-muted text-muted-foreground",
}

export const statusLabels = {
    da_duyet: "Đã duyệt",
    cho_duyet: "Chờ duyệt",
    spam: "Spam",
    xoa: "Đã xóa",
}
