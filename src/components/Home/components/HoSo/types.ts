export interface UserProfile {
    id: number
    ten: string
    email: string
    avatar?: string
    vai_tro: "quan_tri" | "bien_tap" | "tac_gia" | "doc_gia" | string
}

export interface StatsSummary {
    articles: number
    savedDocs: number
    comments: number
    reactions: number
}

export interface ArticleItem {
    id: number
    tieu_de: string
    duong_dan: string
    ngay_xuat_ban: string
    luot_xem: number
    luot_tai: number
    trang_thai: "xuat_ban" | "nhap" | string
}

export interface SavedDocItem {
    id: number
    tieu_de: string
    duong_dan: string
    ngay_luu: string
}

export interface DownloadedDocItem {
    id: number
    tieu_de: string
    duong_dan: string
    ngay_tai: string
    loai: string
    dinh_dang: string
    kich_thuoc: number
    ten_tap_tin: string
}

export interface CommentItem {
    id: number
    noi_dung: string
    bai_viet: string
    ngay_tao: string
}


