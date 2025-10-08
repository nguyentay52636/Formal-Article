
import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
export default function AddPostNew() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    return (
        <>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm bài viết
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Thêm bài viết mới</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="tieuDe">Tiêu đề *</Label>
                                <Input id="tieuDe" placeholder="Nhập tiêu đề bài viết" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duongDan">Đường dẫn (Slug) *</Label>
                                <Input id="duongDan" placeholder="mau-don-xin-viec-it" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="danhMuc">Danh mục *</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn danh mục" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Đơn xin việc</SelectItem>
                                        <SelectItem value="2">Đơn xin nghỉ</SelectItem>
                                        <SelectItem value="3">Đơn xin thực tập</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="trangThai">Trạng thái *</Label>
                                <Select defaultValue="nhap">
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
                            <Label htmlFor="tomTat">Tóm tắt</Label>
                            <Textarea id="tomTat" placeholder="Nhập tóm tắt ngắn gọn" rows={2} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="noiDung">Nội dung *</Label>
                            <Textarea id="noiDung" placeholder="Nhập nội dung bài viết" rows={8} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="anhDaiDien">URL ảnh đại diện</Label>
                                <Input id="anhDaiDien" placeholder="https://example.com/image.jpg" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ngayXuatBan">Ngày xuất bản</Label>
                                <Input id="ngayXuatBan" type="datetime-local" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="the">Thẻ tag</Label>
                            <Input id="the" placeholder="IT, Đơn xin việc, Công nghệ" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Hủy
                        </Button>
                        <Button onClick={() => setIsAddDialogOpen(false)}>Lưu bài viết</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
