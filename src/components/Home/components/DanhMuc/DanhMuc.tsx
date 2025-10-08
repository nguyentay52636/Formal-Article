"use client"

import { useMemo, useState } from "react"
import ListCard from "./components/ListCard"
import SearchBar from "./components/SearchBar"
import TableDanhMuc, { CategoryItem } from "./components/TableDanhMuc"
import AddCategoryDialog from "./components/Dialog/AddCategoryDialog"
import EditCategoryDialog from "./components/Dialog/EditCategoryDialog"
import DeleteCategoryDialog from "./components/Dialog/DeleteCategoryDialog"
import { categories } from "./data"



export default function DanhMuc() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)

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
            const matchesSearch = category.ten.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.duongDan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (category.danhMucCha && category.danhMucCha.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesSearch
        })
    }, [searchQuery])

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
            />

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
