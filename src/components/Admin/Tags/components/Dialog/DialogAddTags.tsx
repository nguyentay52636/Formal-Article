import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DialogAddTagsProps {
    isOpen: boolean
    onClose: () => void
}

export default function DialogAddTags({ isOpen, onClose }: DialogAddTagsProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm thẻ mới</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="ten">Tên thẻ *</Label>
                        <Input id="ten" placeholder="Nhập tên thẻ" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="duongDan">Đường dẫn (Slug) *</Label>
                        <Input id="duongDan" placeholder="don-xin-viec" />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Hủy
                        </Button>
                        <Button onClick={onClose}>Lưu thẻ</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
