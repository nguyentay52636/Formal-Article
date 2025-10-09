import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogDescription, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import React from 'react'
import { Tag } from '../../types'

interface DialogDeleteTagsProps {
  isOpen: boolean
  onClose: () => void
  selectedTag: Tag | null
}

export default function DialogDeleteTags({ isOpen, onClose, selectedTag }: DialogDeleteTagsProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa thẻ</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Bạn có chắc chắn muốn xóa thẻ "{selectedTag?.ten}"? Thẻ sẽ bị gỡ khỏi tất cả bài viết đang sử dụng.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onClose}
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
