"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import type { UserItem } from "../TableNguoiDung"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: UserItem | null
}

export default function EditUserDialog({ open, onOpenChange, user }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-hoTen">Họ và tên *</Label>
                            <Input id="edit-hoTen" defaultValue={user?.hoTen} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-email">Email *</Label>
                            <Input id="edit-email" type="email" defaultValue={user?.email} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-vaiTro">Vai trò *</Label>
                        <Select defaultValue={user?.vaiTro || "doc_gia"}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="quan_tri">Quản trị viên</SelectItem>
                                <SelectItem value="bien_tap">Biên tập viên</SelectItem>
                                <SelectItem value="tac_gia">Tác giả</SelectItem>
                                <SelectItem value="doc_gia">Độc giả</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Đổi mật khẩu (để trống nếu không muốn thay đổi)</Label>
                        <Input id="edit-matKhau" type="password" placeholder="Mật khẩu mới" />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="edit-kichHoat">Kích hoạt tài khoản</Label>
                        <Switch id="edit-kichHoat" defaultChecked={user?.kichHoat} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button onClick={() => onOpenChange(false)}>Cập nhật</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


