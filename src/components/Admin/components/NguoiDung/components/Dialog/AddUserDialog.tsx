"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"

export default function AddUserDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm người dùng
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Thêm người dùng mới</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="hoTen">Họ và tên *</Label>
                            <Input id="hoTen" placeholder="Nguyễn Văn A" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input id="email" type="email" placeholder="nguyenvana@example.com" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="matKhau">Mật khẩu *</Label>
                            <Input id="matKhau" type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="xacNhanMatKhau">Xác nhận mật khẩu *</Label>
                            <Input id="xacNhanMatKhau" type="password" placeholder="••••••••" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="vaiTro">Vai trò *</Label>
                        <Select defaultValue="doc_gia">
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

                    <div className="flex items-center justify-between">
                        <Label htmlFor="kichHoat">Kích hoạt tài khoản</Label>
                        <Switch id="kichHoat" defaultChecked />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={() => setOpen(false)}>Tạo tài khoản</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


