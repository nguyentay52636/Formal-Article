import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Block } from "../../types"

interface DialogEditBlockProps {
  isEditDialogOpen: boolean
  setIsEditDialogOpen: (open: boolean) => void
  selectedBlock: Block | null
}

export default function DialogEditBlock({ isEditDialogOpen, setIsEditDialogOpen, selectedBlock }: DialogEditBlockProps) {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa khối nổi bật</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-ma">Mã khối *</Label>
              <Input id="edit-ma" defaultValue={selectedBlock?.id.toString()} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-ten">Tên khối *</Label>
              <Input id="edit-ten" defaultValue={selectedBlock?.tieuDe} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-cauHinh">Cấu hình (JSON)</Label>
            <Textarea
              id="edit-cauHinh"
              rows={4}
              className="font-mono text-sm"
              defaultValue='{"layout": "grid", "columns": 3}'
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="edit-kichHoat" defaultChecked={selectedBlock?.kichHoat} />
            <Label htmlFor="edit-kichHoat">Kích hoạt khối này</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Hủy
          </Button>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cập nhật</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
