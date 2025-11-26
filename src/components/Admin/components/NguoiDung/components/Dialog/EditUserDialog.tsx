"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { updateUser as updateUserApi } from "@/apis/userApi"
import { toast } from "react-hot-toast"
import { IUser } from "@/apis/types"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: IUser | null
    onSuccess?: () => void
}

export default function EditUserDialog({ open, onOpenChange, user, onSuccess }: Props) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        hoTen: "",
        email: "",
        vaiTro: "doc_gia",
        kichHoat: true,
        matKhau: ""
    })

    const getRoleKey = (user: IUser): string => {
        if (user.role?.name === 'admin') return 'quan_tri';
        if (user.role?.name === 'editor') return 'bien_tap';
        if (user.role?.name === 'author') return 'tac_gia';
        return 'doc_gia';
    }

    useEffect(() => {
        if (user) {
            setFormData({
                hoTen: user.fullName,
                email: user.email,
                vaiTro: getRoleKey(user),
                kichHoat: user.active,
                matKhau: "" // Don't populate password
            })
        }
    }, [user])

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        if (!user) return;

        // Map role string to roleId
        const roleMap: Record<string, number> = {
            quan_tri: 1,
            bien_tap: 2,
            tac_gia: 3,
            doc_gia: 4
        }

        const updatedUser: any = {
            fullName: formData.hoTen,
            email: formData.email,
            active: formData.kichHoat,
            roleId: roleMap[formData.vaiTro] || 4,
            // Only send password if it's not empty
            ...(formData.matKhau ? { password: formData.matKhau } : {})
        }

        setLoading(true);
        try {
            const res = await updateUserApi(user.id, updatedUser);
            if (res) {
                toast.success("Cập nhật người dùng thành công");
                onOpenChange(false);
                onSuccess?.(); // Trigger parent refresh
            } else {
                toast.error("Cập nhật người dùng thất bại");
            }
        } catch (error) {
            toast.error("Cập nhật người dùng thất bại");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
                    <DialogDescription>
                        Cập nhật thông tin tài khoản người dùng
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-hoTen">Họ và tên *</Label>
                            <Input
                                id="edit-hoTen"
                                value={formData.hoTen}
                                onChange={(e) => handleChange("hoTen", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-email">Email *</Label>
                            <Input
                                id="edit-email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-vaiTro">Vai trò *</Label>
                        <Select
                            value={formData.vaiTro}
                            onValueChange={(value) => handleChange("vaiTro", value)}
                        >
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
                        <Input
                            id="edit-matKhau"
                            type="password"
                            placeholder="Mật khẩu mới"
                            value={formData.matKhau}
                            onChange={(e) => handleChange("matKhau", e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="edit-kichHoat">Kích hoạt tài khoản</Label>
                        <Switch
                            id="edit-kichHoat"
                            checked={formData.kichHoat}
                            onCheckedChange={(checked) => handleChange("kichHoat", checked)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button onClick={handleSubmit}>Cập nhật</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
