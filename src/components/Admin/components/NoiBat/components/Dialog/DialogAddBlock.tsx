import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface DialogAddBlockProps {
  isAddDialogOpen: boolean
  setIsAddDialogOpen: (open: boolean) => void
}

export default function DialogAddBlock({ isAddDialogOpen, setIsAddDialogOpen }: DialogAddBlockProps) {
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm khối nổi bật
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Thêm khối nổi bật mới</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ma">Mã khối *</Label>
              <Input id="ma" placeholder="pho_bien_nhat" />
              <p className="text-xs text-muted-foreground">Mã định danh duy nhất (slug)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ten">Tên khối *</Label>
              <Input id="ten" placeholder="Mẫu đơn phổ biến nhất" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cauHinh">Cấu hình (JSON)</Label>
            <Textarea
              id="cauHinh"
              placeholder='{"layout": "grid", "columns": 3, "show_image": true}'
              rows={4}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Cấu hình hiển thị dạng JSON: layout, số cột, hiển thị ảnh, v.v.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="kichHoat" defaultChecked />
            <Label htmlFor="kichHoat">Kích hoạt khối này</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            Hủy
          </Button>
          <Button onClick={() => setIsAddDialogOpen(false)}>Tạo khối</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
