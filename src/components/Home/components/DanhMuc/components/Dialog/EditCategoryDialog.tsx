"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import type { CategoryItem } from "../TableDanhMuc"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    category: CategoryItem | null
}

export default function EditCategoryDialog({ open, onOpenChange, category }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-ten">Tên danh mục *</Label>
                            <Input id="edit-ten" defaultValue={category?.ten} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-duongDan">Đường dẫn (Slug) *</Label>
                            <Input id="edit-duongDan" defaultValue={category?.duongDan} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-danhMucCha">Danh mục cha</Label>
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
                        <Label htmlFor="edit-moTa">Mô tả</Label>
                        <Textarea id="edit-moTa" defaultValue={category?.moTa} rows={3} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-thuTu">Thứ tự</Label>
                            <Input id="edit-thuTu" type="number" defaultValue={category?.thuTu} />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="edit-kichHoat">Kích hoạt</Label>
                            <Switch id="edit-kichHoat" defaultChecked={category?.kichHoat} />
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
