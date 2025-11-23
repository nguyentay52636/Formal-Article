"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { IUser } from "@/apis/types"
import { useUser } from "../../hooks/useUser"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: IUser | null
    onSuccess?: () => void
}

export default function DeleteUserDialog({ open, onOpenChange, user, onSuccess }: Props) {
    const { deleteUser } = useUser({ fetchOnMount: false })

    const handleDelete = async () => {
        if (!user) return;
        const success = await deleteUser(user.id);
        if (success) {
            onOpenChange(false);
            onSuccess?.();
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xóa người dùng</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa tài khoản "{user?.fullName}"? Tất cả bài viết của người dùng này sẽ được
                        giữ lại nhưng sẽ không có tác giả.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent auto close
                            handleDelete();
                        }}
                    >
                        Xóa
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


