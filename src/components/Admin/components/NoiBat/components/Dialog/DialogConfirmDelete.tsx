import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Block } from "../../types"

interface DialogConfirmDeleteProps {
  isDeleteDialogOpen: boolean
  setIsDeleteDialogOpen: (open: boolean) => void
  selectedBlock: Block | null
}

export default function DialogConfirmDelete({ isDeleteDialogOpen, setIsDeleteDialogOpen, selectedBlock }: DialogConfirmDeleteProps) {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa khối nổi bật</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa khối "{selectedBlock?.tieuDe}"? Tất cả bài viết trong khối này sẽ bị gỡ bỏ.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
