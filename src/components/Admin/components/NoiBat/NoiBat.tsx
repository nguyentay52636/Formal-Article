"use client"

import { useState } from "react"
import SearchActions from "./components/SearchActions"
import ListCard from "./components/Card/ListCard"
import DialogAddBlock from "./components/Dialog/DialogAddBlock"
import DialogEditBlock from "./components/Dialog/DialogEditBlock"
import DialogConfirmDelete from "./components/Dialog/DialogConfirmDelete"
import DialogSetting from "./components/Dialog/DialogSetting"
import { Block, PositionLabels } from "./types"

const featuredBlocks: Block[] = [
    {
        id: 1,
        tieuDe: "Mẫu đơn phổ biến",
        viTri: "trang_chu_sidebar",
        thuTu: 1,
        kichHoat: true,
        soBaiViet: 5,
    },
    {
        id: 2,
        tieuDe: "Mẫu đơn mới nhất",
        viTri: "trang_chu_hero",
        thuTu: 1,
        kichHoat: true,
        soBaiViet: 8,
    },
    {
        id: 3,
        tieuDe: "Được xem nhiều nhất",
        viTri: "trang_chu_footer",
        thuTu: 2,
        kichHoat: false,
        soBaiViet: 6,
    },
]

const positionLabels: PositionLabels = {
    trang_chu_hero: "Trang chủ - Hero",
    trang_chu_sidebar: "Trang chủ - Sidebar",
    trang_chu_footer: "Trang chủ - Footer",
    danh_muc: "Trang danh mục",
}

export default function NoiBat() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isManageArticlesDialogOpen, setIsManageArticlesDialogOpen] = useState(false)
    const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)

    const handleEdit = (block: Block) => {
        setSelectedBlock(block)
        setIsEditDialogOpen(true)
    }

    const handleDelete = (block: Block) => {
        setSelectedBlock(block)
        setIsDeleteDialogOpen(true)
    }

    const handleManageArticles = (block: Block) => {
        setSelectedBlock(block)
        setIsManageArticlesDialogOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Nội dung nổi bật</h1>
                    <p className="text-muted-foreground">Quản lý các khối nội dung nổi bật trên website</p>
                </div>
                <DialogAddBlock
                    isAddDialogOpen={isAddDialogOpen}
                    setIsAddDialogOpen={setIsAddDialogOpen}
                />
            </div>

            <SearchActions
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <ListCard
                featuredBlocks={featuredBlocks}
                positionLabels={positionLabels}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onManageArticles={handleManageArticles}
            />

            <DialogEditBlock
                isEditDialogOpen={isEditDialogOpen}
                setIsEditDialogOpen={setIsEditDialogOpen}
                selectedBlock={selectedBlock}
            />

            <DialogConfirmDelete
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                selectedBlock={selectedBlock}
            />

            <DialogSetting
                isManageArticlesDialogOpen={isManageArticlesDialogOpen}
                setIsManageArticlesDialogOpen={setIsManageArticlesDialogOpen}
                selectedBlock={selectedBlock}
            />
        </div>
    )
}
