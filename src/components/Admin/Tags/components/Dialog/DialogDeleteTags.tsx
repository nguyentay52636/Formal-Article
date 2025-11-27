import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import React, { useState } from 'react'
import { Tag } from '../../types'
import { deleteTag } from '@/apis/tagApi'
import { toast } from 'react-hot-toast'

interface DialogDeleteTagsProps {
  isOpen: boolean
  onClose: () => void
  selectedTag: Tag | null
  onSuccess?: () => void
}

export default function DialogDeleteTags({ isOpen, onClose, selectedTag, onSuccess }: DialogDeleteTagsProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!selectedTag?.id) return
    setLoading(true)
    try {
      const success = await deleteTag(selectedTag.id)
      if (success) {
        toast.success(`Đã xóa thẻ "${selectedTag.name}"`)
        onSuccess?.()
        onClose()
      } else {
        toast.error("Không thể xóa thẻ")
      }
    } catch (error: any) {
      const message = error?.response?.data ?? "Không thể xóa thẻ"
      toast.error(typeof message === "string" ? message : "Không thể xóa thẻ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa thẻ</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Bạn có chắc chắn muốn xóa thẻ "{selectedTag?.name}"? Thẻ sẽ bị gỡ khỏi tất cả template đang sử dụng.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={loading}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={(event) => {
              event.preventDefault()
              handleDelete()
            }}
            disabled={loading}
          >
            {loading ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
