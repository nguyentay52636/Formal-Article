"use client"

import React from "react"

import TagsHeader from "./components/TagsHeader"
import ListCard from "./components/ListCard/ListCard"
import SearchAction from "./components/SearchAction"
import TagsList from "./components/TagsList"
import TagsActions from "./components/TagsActions"
import DialogAddTags from "./components/Dialog/DialogAddTags"
import DialogEditTags from "./components/Dialog/DialogEditTags"
import DialogDeleteTags from "./components/Dialog/DialogDeleteTags"
import PaginationTags from "./components/PaginationTags"
import TagTemplatesDialog from "./components/TagTemplatesDialog"
import { PaginationProvider } from "@/context/PaginationProvider"
import { useTagsManagement } from "./hooks/useTagsManagement"

export default function Tags() {
    const {
        filteredTags,
        stats,
        loading,
        searchQuery,
        setSearchQuery,
        isDialogOpen,
        isEditDialogOpen,
        isDeleteDialogOpen,
        templatesDialogOpen,
        viewTag,
        selectedTag,
        handleEdit,
        handleDelete,
        handleAddNew,
        handleViewTemplates,
        closeDialogs,
        closeTemplatesDialog,
        refresh,
    } = useTagsManagement()

    return (
        <div className="space-y-6">
            <TagsHeader />

            <ListCard stats={stats} loading={loading} />

            <div className="flex items-center justify-between gap-4">
                <SearchAction
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <TagsActions onAddNew={handleAddNew} />
            </div>

            <PaginationProvider total={filteredTags.length}>
                <TagsList
                    tags={filteredTags}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onViewTemplates={handleViewTemplates}
                />
                <PaginationTags />
            </PaginationProvider>

            {/* Dialogs */}
            <DialogAddTags
                isOpen={isDialogOpen}
                onClose={closeDialogs}
                onSuccess={refresh}
            />
            <DialogEditTags
                isOpen={isEditDialogOpen}
                onClose={closeDialogs}
                selectedTag={selectedTag}
                onSuccess={refresh}
            />
            <DialogDeleteTags
                isOpen={isDeleteDialogOpen}
                onClose={closeDialogs}
                selectedTag={selectedTag}
                onSuccess={refresh}
            />

            <TagTemplatesDialog
                tag={viewTag}
                open={templatesDialogOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        closeTemplatesDialog()
                    }
                }}
            />
        </div>
    )
}
