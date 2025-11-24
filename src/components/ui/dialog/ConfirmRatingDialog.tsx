import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmRatingDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
}

export default function ConfirmRatingDialog({ open, onOpenChange, onConfirm }: ConfirmRatingDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Bạn có muốn đánh giá không?</DialogTitle>
                    <DialogDescription>
                        Hãy để lại đánh giá để giúp cải thiện chất lượng mẫu CV nhé Wes 😊
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex gap-2 justify-end">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Để sau
                    </Button>

                    <Button
                        onClick={() => {
                            onConfirm()
                            onOpenChange(false)
                        }}
                    >
                        Đánh giá ngay
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
