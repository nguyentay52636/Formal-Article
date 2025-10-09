import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus, Upload } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DialogFooter } from '@/components/ui/dialog'
interface DialogAddFilesProps {

  isUploadDialogOpen: boolean
  setIsUploadDialogOpen: (open: boolean) => void
  onOpenChange: (open: boolean) => void
}
export default function DialogAddFiles({ isUploadDialogOpen, setIsUploadDialogOpen }: DialogAddFilesProps) {
  return (
    <>
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tải lên tệp
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tải lên tệp tin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Chọn tệp tin *</Label>
              <div className="flex items-center gap-2">
                <Input id="file" type="file" />
              </div>
              <p className="text-xs text-muted-foreground">Hỗ trợ: PDF, DOC, DOCX, JPG, PNG, GIF (Tối đa 10MB)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loai">Loại tệp *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại tệp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anh">Ảnh</SelectItem>
                    <SelectItem value="tai_lieu">Tài liệu</SelectItem>
                    <SelectItem value="khac">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dinhDang">Định dạng *</Label>
                <Input id="dinhDang" placeholder="jpg, pdf, docx..." disabled />
                <p className="text-xs text-muted-foreground">Tự động phát hiện</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenTapTin">Tên tệp tin *</Label>
              <Input id="tenTapTin" placeholder="Tên hiển thị của tệp" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kichThuoc">Kích thước</Label>
                <Input id="kichThuoc" disabled placeholder="Tự động" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chieuRong">Chiều rộng (px)</Label>
                <Input id="chieuRong" type="number" placeholder="Chỉ với ảnh" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chieuCao">Chiều cao (px)</Label>
                <Input id="chieuCao" type="number" placeholder="Chỉ với ảnh" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duongDanLuu">Đường dẫn lưu trữ</Label>
              <Input id="duongDanLuu" placeholder="/uploads/2025/01/..." disabled />
              <p className="text-xs text-muted-foreground">Tự động tạo khi tải lên</p>
            </div>

            <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Kéo và thả tệp tin vào đây hoặc nhấp để chọn</p>
              <Button variant="outline" size="sm">
                Chọn tệp
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsUploadDialogOpen(false)}>Tải lên</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
