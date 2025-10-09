"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"
import SearchBar from "./components/SearchBar"
import FilterPanel from "./components/FilterPanel"
import TableBinhLuan from "./components/TableBinhLuan"
import ViewCommentDialog from "./components/Dialog/ViewCommentDialog"
import ApproveCommentDialog from "./components/Dialog/ApproveCommentDialog"
import RejectCommentDialog from "./components/Dialog/RejectCommentDialog"
import DeleteCommentDialog from "./components/Dialog/DeleteCommentDialog"
import { comments, CommentItem } from "./data"
import { PaginationProvider } from "@/context/PaginationProvider"
import PaginationBinhLuan from "./components/PaginationBinhLuan"

export default function BinhLuan() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [filterArticle, setFilterArticle] = useState<string>("all")
    const [showFilters, setShowFilters] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedComment, setSelectedComment] = useState<CommentItem | null>(null)

    const clearFilters = () => {
        setFilterStatus("all")
        setFilterArticle("all")
        setSearchQuery("")
    }

    const activeFiltersCount = [filterStatus !== "all", filterArticle !== "all"].filter(Boolean).length

    const handleView = (comment: CommentItem) => {
        setSelectedComment(comment)
        setIsViewDialogOpen(true)
    }

    const handleApprove = (comment: CommentItem) => {
        setSelectedComment(comment)
        setIsApproveDialogOpen(true)
    }

    const handleReject = (comment: CommentItem) => {
        setSelectedComment(comment)
        setIsRejectDialogOpen(true)
    }

    const handleDelete = (comment: CommentItem) => {
        setSelectedComment(comment)
        setIsDeleteDialogOpen(true)
    }

    const filteredComments = useMemo(() => {
        return comments.filter((comment) => {
            if (filterStatus !== "all" && comment.trangThai !== filterStatus) return false
            if (filterArticle !== "all" && comment.id.toString() !== filterArticle) return false
            if (searchQuery && !comment.noiDung.toLowerCase().includes(searchQuery.toLowerCase())) return false
            return true
        })
    }, [filterStatus, filterArticle, searchQuery])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Quản lý bình luận</h1>
                    <p className="text-muted-foreground">Kiểm duyệt và quản lý bình luận từ người dùng</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                <Button
                    variant={showFilters ? "default" : "outline"}
                    onClick={() => setShowFilters(!showFilters)}
                    className="relative"
                >
                    <Filter className="mr-2 h-4 w-4" />
                    Bộ lọc
                    {activeFiltersCount > 0 && (
                        <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            {activeFiltersCount}
                        </Badge>
                    )}
                </Button>
            </div>

            {showFilters && (
                <FilterPanel
                    filterStatus={filterStatus}
                    filterArticle={filterArticle}
                    onStatusChange={setFilterStatus}
                    onArticleChange={setFilterArticle}
                    onClearFilters={clearFilters}
                />
            )}

            <TableBinhLuan
                comments={filteredComments}
                onView={handleView}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
            />
            <PaginationProvider total={filteredComments.length} initialPageSize={5}>
                <PaginationBinhLuan comments={filteredComments} />
            </PaginationProvider>

            <ViewCommentDialog
                open={isViewDialogOpen}
                onOpenChange={setIsViewDialogOpen}
                comment={selectedComment}
            />

            <ApproveCommentDialog
                open={isApproveDialogOpen}
                onOpenChange={setIsApproveDialogOpen}
                onApprove={() => {
                    setIsApproveDialogOpen(false)
                }}
            />

            <RejectCommentDialog
                open={isRejectDialogOpen}
                onOpenChange={setIsRejectDialogOpen}
                onReject={() => {
                    setIsRejectDialogOpen(false)
                }}
            />

            <DeleteCommentDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onDelete={() => {
                    setIsDeleteDialogOpen(false)
                }}
            />
        </div>
    )
}
