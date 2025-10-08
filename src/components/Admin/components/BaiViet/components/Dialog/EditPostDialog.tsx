import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type Article = {
    id: number
    tieuDe: string
    danhMuc: string
    tacGia: string
    trangThai: 'xuat_ban' | 'nhap' | 'luu_tru'
    luotXem: number
    ngayXuatBan: string | null
}

interface EditPostDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    article: Article | null
}

export default function EditPostDialog({ open, onOpenChange, article }: EditPostDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-tieuDe">Tiêu đề *</Label>
                            <Input id="edit-tieuDe" defaultValue={article?.tieuDe} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-duongDan">Đường dẫn (Slug) *</Label>
                            <Input id="edit-duongDan" placeholder="mau-don-xin-viec-it" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-danhMuc">Danh mục *</Label>
                            <Select defaultValue="1">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Đơn xin việc</SelectItem>
                                    <SelectItem value="2">Đơn xin nghỉ</SelectItem>
                                    <SelectItem value="3">Đơn xin thực tập</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-trangThai">Trạng thái *</Label>
                            <Select defaultValue={article?.trangThai}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nhap">Nháp</SelectItem>
                                    <SelectItem value="xuat_ban">Xuất bản</SelectItem>
                                    <SelectItem value="luu_tru">Lưu trữ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-tomTat">Tóm tắt</Label>
                        <Textarea id="edit-tomTat" rows={2} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-noiDung">Nội dung *</Label>
                        <Textarea id="edit-noiDung" rows={8} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-anhDaiDien">URL ảnh đại diện</Label>
                            <Input id="edit-anhDaiDien" placeholder="https://example.com/image.jpg" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-ngayXuatBan">Ngày xuất bản</Label>
                            <Input id="edit-ngayXuatBan" type="datetime-local" defaultValue={article?.ngayXuatBan || undefined} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Hủy
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>Cập nhật</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


