import { useCallback, useEffect, useMemo, useState } from 'react'
import { getAllTags } from '@/apis/tagApi'
import { Tag, TagsStats } from '../types'
import { toast } from 'react-hot-toast'

export function useTagsManagement() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false)
  const [viewTag, setViewTag] = useState<Tag | null>(null)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)

  const fetchTags = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllTags()
      setTags(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching tags:", error)
      toast.error("Không thể tải danh sách thẻ")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return tags
    return tags.filter((tag) => {
      const term = searchQuery.toLowerCase()
      return (
        tag.name?.toLowerCase().includes(term) ||
        tag.slug?.toLowerCase().includes(term)
      )
    })
  }, [tags, searchQuery])

  const stats = useMemo<TagsStats>(() => {
    if (!tags.length) {
      return {
        totalTags: 0,
        totalTemplates: 0,
        averageTemplatesPerTag: 0,
        mostPopularTag: null,
      }
    }
    const totalTemplates = tags.reduce(
      (sum, tag) => sum + (tag.templateCount ?? 0),
      0
    )
    const mostPopular = tags.reduce<Tag | null>((prev, current) => {
      if (!prev) return current
      return (current.templateCount ?? 0) > (prev.templateCount ?? 0)
        ? current
        : prev
    }, null)

    return {
      totalTags: tags.length,
      totalTemplates,
      averageTemplatesPerTag: tags.length
        ? totalTemplates / tags.length
        : 0,
      mostPopularTag: mostPopular
        ? { name: mostPopular.name, templateCount: mostPopular.templateCount ?? 0 }
        : null,
    }
  }, [tags])

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (tag: Tag) => {
    setSelectedTag(tag)
    setIsDeleteDialogOpen(true)
  }

  const handleAddNew = () => {
    setSelectedTag(null)
    setIsDialogOpen(true)
  }

  const handleViewTemplates = (tag: Tag) => {
    setViewTag(tag)
    setTemplatesDialogOpen(true)
  }

  const closeDialogs = () => {
    setIsDialogOpen(false)
    setIsEditDialogOpen(false)
    setIsDeleteDialogOpen(false)
    setSelectedTag(null)
  }

  const closeTemplatesDialog = () => {
    setTemplatesDialogOpen(false)
    setViewTag(null)
  }

  return {
    tags,
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
    refresh: fetchTags,
  }
}
