"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"
import { useUser } from "../../hooks/useUser"
import { toast } from "react-hot-toast"

type Props = {
    onSuccess?: () => void
}

export default function AddUserDialog({ onSuccess }: Props) {
    const [open, setOpen] = useState(false)
    const { addUser } = useUser({ fetchOnMount: false })
    const [formData, setFormData] = useState({
        hoTen: "",
        email: "",
        matKhau: "",
        xacNhanMatKhau: "",
        vaiTro: "doc_gia",
        kichHoat: true
    })

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        if (!formData.hoTen || !formData.email || !formData.matKhau) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }
        if (formData.matKhau !== formData.xacNhanMatKhau) {
            toast.error("Mật khẩu xác nhận không khớp");
            return;
        }

        // Map role string to roleId if needed, or send as is if API supports it.
        // API expects IUser which has roleId.
        // I'll assume roleId mapping:
        const roleMap: Record<string, number> = {
            quan_tri: 1, // Example IDs
            bien_tap: 2,
            tac_gia: 3,
            doc_gia: 4
        }

        const newUser: any = {
            fullName: formData.hoTen,
            email: formData.email,
            password: formData.matKhau,
            active: formData.kichHoat,
            roleId: roleMap[formData.vaiTro] || 4,
            phone: "", // Default or add field
            avatar: "" // Default
        }

        const success = await addUser(newUser);
        if (success) {
            setOpen(false);
            setFormData({
                hoTen: "",
                email: "",
                matKhau: "",
                xacNhanMatKhau: "",
                vaiTro: "doc_gia",
                kichHoat: true
            });
            onSuccess?.();
        }
    }

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
                            <Input
                                id="hoTen"
                                placeholder="Nguyễn Văn A"
                                value={formData.hoTen}
                                onChange={(e) => handleChange("hoTen", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nguyenvana@example.com"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="matKhau">Mật khẩu *</Label>
                            <Input
                                id="matKhau"
                                type="password"
                                placeholder="••••••••"
                                value={formData.matKhau}
                                onChange={(e) => handleChange("matKhau", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="xacNhanMatKhau">Xác nhận mật khẩu *</Label>
                            <Input
                                id="xacNhanMatKhau"
                                type="password"
                                placeholder="••••••••"
                                value={formData.xacNhanMatKhau}
                                onChange={(e) => handleChange("xacNhanMatKhau", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="vaiTro">Vai trò *</Label>
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

                    <div className="flex items-center justify-between">
                        <Label htmlFor="kichHoat">Kích hoạt tài khoản</Label>
                        <Switch
                            id="kichHoat"
                            checked={formData.kichHoat}
                            onCheckedChange={(checked) => handleChange("kichHoat", checked)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit}>Tạo tài khoản</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


