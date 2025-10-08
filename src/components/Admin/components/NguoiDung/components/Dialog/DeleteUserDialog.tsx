"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import type { UserItem } from "../TableNguoiDung"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: UserItem | null
}

export default function DeleteUserDialog({ open, onOpenChange, user }: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xóa người dùng</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa tài khoản "{user?.hoTen}"? Tất cả bài viết của người dùng này sẽ được
                        giữ lại nhưng sẽ không có tác giả.
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


