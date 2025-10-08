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

interface RejectCommentDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onReject: () => void
}

export default function RejectCommentDialog({ open, onOpenChange, onReject }: RejectCommentDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Từ chối bình luận</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn có chắc chắn muốn từ chối bình luận này? Bình luận sẽ được đánh dấu là spam và không hiển thị.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={onReject}
                    >
                        Từ chối
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
