import { useState } from 'react'

interface Tag {
  id: number
  ten: string
  duongDan: string
  soBaiViet: number
}

export function useTagsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (tag: Tag) => {
    setSelectedTag(tag)
    setIsDeleteDialogOpen(true)
  }

  const handleAddNew = () => {
    setIsDialogOpen(true)
  }

  const closeDialogs = () => {
    setIsDialogOpen(false)
    setIsEditDialogOpen(false)
    setIsDeleteDialogOpen(false)
    setSelectedTag(null)
  }

  return {
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
  }
}
