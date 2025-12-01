"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"

export default function AddCategoryDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm danh mục
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl!">
                <DialogHeader>
                    <DialogTitle>Thêm danh mục mới</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ten">Tên danh mục *</Label>
                            <Input id="ten" placeholder="Nhập tên danh mục" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duongDan">Đường dẫn (Slug) *</Label>
                            <Input id="duongDan" placeholder="don-xin-viec" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="danhMucCha">Danh mục cha</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn danh mục cha (nếu có)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Không có</SelectItem>
                                <SelectItem value="1">Đơn xin việc</SelectItem>
                                <SelectItem value="3">Đơn xin nghỉ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="moTa">Mô tả</Label>
                        <Textarea id="moTa" placeholder="Nhập mô tả cho danh mục" rows={3} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="thuTu">Thứ tự</Label>
                            <Input id="thuTu" type="number" defaultValue="0" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="kichHoat">Kích hoạt</Label>
                            <Switch id="kichHoat" defaultChecked />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Hủy
                        </Button>
                        <Button onClick={() => setOpen(false)}>Lưu danh mục</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
