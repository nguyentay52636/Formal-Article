import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tag } from '../../types'

interface DialogEditTagsProps {
    isOpen: boolean
    onClose: () => void
    selectedTag: Tag | null
}

export default function DialogEditTags({ isOpen, onClose, selectedTag }: DialogEditTagsProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa thẻ</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-ten">Tên thẻ *</Label>
                        <Input id="edit-ten" defaultValue={selectedTag?.ten} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-duongDan">Đường dẫn (Slug) *</Label>
                        <Input id="edit-duongDan" defaultValue={selectedTag?.duongDan} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={onClose}>Cập nhật</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
