"use client"

import React from "react"

// Components
import TagsHeader from "./components/TagsHeader"
import ListCard from "./components/ListCard/ListCard"
import SearchAction from "./components/SearchAction"
import TagsList from "./components/TagsList"
import TagsActions from "./components/TagsActions"
import DialogAddTags from "./components/Dialog/DialogAddTags"
import DialogEditTags from "./components/Dialog/DialogEditTags"
import DialogDeleteTags from "./components/Dialog/DialogDeleteTags"

// Hooks
import { useTagsManagement } from "./hooks/useTagsManagement"

// Data
import { mockTags } from "./data/mockData"

export default function Tags() {
    const {
        searchQuery,
        setSearchQuery,
        isDialogOpen,
        isEditDialogOpen,
        isDeleteDialogOpen,
        selectedTag,
        handleEdit,
        handleDelete,
        handleAddNew,
        closeDialogs
    } = useTagsManagement()

    // Filter tags based on search query
    const filteredTags = mockTags.filter(tag =>
        tag.ten.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <TagsHeader />

            <ListCard />

            <div className="flex items-center justify-between gap-4">
                <SearchAction
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <TagsActions onAddNew={handleAddNew} />
            </div>

            <TagsList
                tags={filteredTags}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Dialogs */}
            <DialogAddTags
                isOpen={isDialogOpen}
                onClose={closeDialogs}
            />
            <DialogEditTags
                isOpen={isEditDialogOpen}
                onClose={closeDialogs}
                selectedTag={selectedTag}
            />
            <DialogDeleteTags
                isOpen={isDeleteDialogOpen}
                onClose={closeDialogs}
                selectedTag={selectedTag}
            />
        </div>
    )
}
