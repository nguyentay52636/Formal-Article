"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { IUser } from "@/apis/types"
import { deleteUser as deleteUserApi } from "@/apis/userApi"
import { toast } from "react-hot-toast"
import { useState } from "react"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: IUser | null
    onSuccess?: () => void
}

export default function DeleteUserDialog({ open, onOpenChange, user, onSuccess }: Props) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (!user) return

        setLoading(true)
        try {
<<<<<<< HEAD
            const success = await deleteUserApi(user.id)
            if (success) {
=======
            const res = await deleteUserApi(user.id)
            if (res) {
>>>>>>> 28409b7 (feat: Sửa lại load user, khi thêm user thì vẫn trả đủ danh sách user)
                toast.success("Xóa người dùng thành công")
                onOpenChange(false)
                onSuccess?.() // Trigger parent refresh
            } else {
                toast.error("Xóa người dùng thất bại")
            }
<<<<<<< HEAD
        } catch (error: any) {
            console.error("Error deleting user:", error)
            const errorMessage = error.response?.data?.message || error.message || "Xóa người dùng thất bại"
            toast.error(errorMessage)
=======
        } catch (error) {
            toast.error("Xóa người dùng thất bại")
>>>>>>> 28409b7 (feat: Sửa lại load user, khi thêm user thì vẫn trả đủ danh sách user)
        } finally {
            setLoading(false)
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
                    <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault(); // Prevent auto close
                            handleDelete();
                        }}
                    >
                        {loading ? "Đang xóa..." : "Xóa"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
