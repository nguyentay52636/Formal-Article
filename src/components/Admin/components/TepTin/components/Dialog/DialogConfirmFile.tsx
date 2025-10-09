import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import React from 'react'
interface DialogConfirmFileProps {
    open: boolean
    isDeleteDialogOpen: boolean
    setIsDeleteDialogOpen: (open: boolean) => void
    selectedFile: any | null
    onOpenChange: (open: boolean) => void
}
export default function DialogConfirmFile({ isDeleteDialogOpen, open, setIsDeleteDialogOpen, selectedFile }: DialogConfirmFileProps) {
    return (
        <>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xóa tệp tin</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa tệp "{selectedFile?.tenTapTin}"? Tệp tin sẽ bị xóa vĩnh viễn và không thể khôi
                            phục.
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
        </>
    )
}
