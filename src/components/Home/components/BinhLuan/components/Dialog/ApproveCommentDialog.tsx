"use client"

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

interface ApproveCommentDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onApprove: () => void
}

export default function ApproveCommentDialog({ open, onOpenChange, onApprove }: ApproveCommentDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Duyệt bình luận</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn có chắc chắn muốn duyệt bình luận này? Bình luận sẽ được hiển thị công khai trên website.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={onApprove}>Duyệt</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
