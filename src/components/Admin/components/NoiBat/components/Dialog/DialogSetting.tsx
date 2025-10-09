import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { GripVertical } from "lucide-react"
import { Block } from "../../types"

interface DialogSettingProps {
  isManageArticlesDialogOpen: boolean
  setIsManageArticlesDialogOpen: (open: boolean) => void
  selectedBlock: Block | null
}

export default function DialogSetting({ isManageArticlesDialogOpen, setIsManageArticlesDialogOpen, selectedBlock }: DialogSettingProps) {
  return (
    <Dialog open={isManageArticlesDialogOpen} onOpenChange={setIsManageArticlesDialogOpen}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Quản lý bài viết nổi bật - {selectedBlock?.tieuDe}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Chọn bài viết</Label>
            <Input placeholder="Tìm kiếm bài viết..." />
          </div>

          <div className="space-y-2 border rounded-lg p-4 max-h-[400px] overflow-y-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                  <Checkbox id={`article-${i}`} defaultChecked={i <= 3} />
                  <div>
                    <p className="font-medium">Mẫu đơn xin việc ngành IT {i}</p>
                    <p className="text-sm text-muted-foreground">Đơn xin việc • 1,234 lượt xem</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="Thứ tự" className="w-20" defaultValue={i} />
                  <Input placeholder="Ghi chú" className="w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsManageArticlesDialogOpen(false)}>
            Hủy
          </Button>
          <Button onClick={() => setIsManageArticlesDialogOpen(false)}>Lưu thay đổi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
