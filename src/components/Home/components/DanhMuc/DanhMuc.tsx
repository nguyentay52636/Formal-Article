"use client"

import { useEffect, useMemo, useState } from "react"
import ListCard from "./components/ListCard"
import SearchBar from "./components/SearchBar"
import TableDanhMuc, { CategoryItem } from "./components/TableDanhMuc"
import AddCategoryDialog from "./components/Dialog/AddCategoryDialog"
import EditCategoryDialog from "./components/Dialog/EditCategoryDialog"
import DeleteCategoryDialog from "./components/Dialog/DeleteCategoryDialog"
import { PaginationProvider } from "@/context/PaginationProvider"
import PaginationCategory from "./components/PaginationCategory"
import { getAllTags } from "@/apis/tagApi"
import { toast } from "react-hot-toast"



export default function DanhMuc() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
    const [categories, setCategories] = useState<CategoryItem[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            try {
                const tags = await getAllTags()
                const mapped: CategoryItem[] = tags.map((tag) => ({
                    id: tag.id ?? 0,
                    ten: tag.name,
                    duongDan: tag.slug,
                    danhMucCha: null,
                    moTa: tag.type || "",
                    thuTu: tag.id ?? 0,
                    kichHoat: true,
                    soBaiViet: tag.templateCount ?? 0,
                }))
                setCategories(mapped)
            } catch (error) {
                console.error("Failed to load categories", error)
                toast.error("Không tải được danh mục CV")
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    const handleEdit = (category: CategoryItem) => {
        setSelectedCategory(category)
        setIsEditDialogOpen(true)
    }

    const handleDelete = (category: CategoryItem) => {
        setSelectedCategory(category)
        setIsDeleteDialogOpen(true)
    }

    const filteredCategories = useMemo(() => {
        return categories.filter((category) => {
            const keyword = searchQuery.toLowerCase()
            const matchesSearch =
                category.ten.toLowerCase().includes(keyword) ||
                category.duongDan.toLowerCase().includes(keyword) ||
                (category.danhMucCha && category.danhMucCha.toLowerCase().includes(keyword))
            return matchesSearch
        })
    }, [categories, searchQuery])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Quản lý danh mục</h1>
                    <p className="text-muted-foreground">Quản lý cấu trúc danh mục bài viết</p>
                </div>
                <AddCategoryDialog />
            </div>

            <ListCard />

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <TableDanhMuc
                categories={filteredCategories}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading}
            />
            <PaginationProvider total={filteredCategories.length}>
                <PaginationCategory categories={filteredCategories} />
            </PaginationProvider>

            <EditCategoryDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                category={selectedCategory}
            />

            <DeleteCategoryDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                category={selectedCategory}
            />
        </div>
    )
}
