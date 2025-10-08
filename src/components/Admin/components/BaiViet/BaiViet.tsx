"use client"

import { useState } from "react"

import TablePost, { Article } from "./components/TablePost"
import AddPostNew from "./components/Dialog/AddPostNew"
import SearchBar from "./components/SearchBar"
import EditPostDialog from "./components/Dialog/EditPostDialog"
import DeletePostDialog from "./components/Dialog/DeletePostDialog"
import { PaginationProvider } from "@/context/PaginationProvider"
import PaginatedArticles from "./components/PaginatedArticles"

const articles: Article[] = [
    {
        id: 1,
        tieuDe: "Mẫu đơn xin việc ngành IT",
        danhMuc: "Đơn xin việc",
        tacGia: "Nguyễn Văn A",
        trangThai: "xuat_ban",
        luotXem: 1234,
        ngayXuatBan: "2025-01-15",
    },
    {
        id: 2,
        tieuDe: "Đơn xin nghỉ phép có lý do",
        danhMuc: "Đơn xin nghỉ",
        tacGia: "Trần Thị B",
        trangThai: "xuat_ban",
        luotXem: 856,
        ngayXuatBan: "2025-01-14",
    },
    {
        id: 3,
        tieuDe: "Mẫu đơn xin thực tập",
        danhMuc: "Đơn xin việc",
        tacGia: "Lê Văn C",
        trangThai: "nhap",
        luotXem: 0,
        ngayXuatBan: null,
    },
]

const statusColors = {
    xuat_ban: "bg-accent text-accent-foreground",
    nhap: "bg-secondary text-secondary-foreground",
    luu_tru: "bg-muted text-muted-foreground",
}

const statusLabels = {
    xuat_ban: "Xuất bản",
    nhap: "Nháp",
    luu_tru: "Lưu trữ",
}

export default function BaiViet() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState<any>(null)

    const handleEdit = (article: any) => {
        setSelectedArticle(article)
        setIsEditDialogOpen(true)
    }

    const handleDelete = (article: any) => {
        setSelectedArticle(article)
        setIsDeleteDialogOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Quản lý bài viết</h1>
                    <p className="text-muted-foreground">Quản lý tất cả bài viết trong hệ thống</p>
                </div>
                <AddPostNew />
            </div>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <PaginationProvider total={articles.length} initialPageSize={5}>
                <PaginatedArticles articles={articles} onEdit={handleEdit} onDelete={handleDelete} />
            </PaginationProvider>

            <EditPostDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} article={selectedArticle} />

            <DeletePostDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} article={selectedArticle} />
        </div>
    )
}
