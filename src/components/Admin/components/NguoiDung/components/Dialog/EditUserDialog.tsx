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
import { IUser, IRole } from "@/apis/types"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { uploadToLocalStorage } from "@/apis/uploadApi"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import { getAllRoles } from "@/apis/roleApi"

const formSchema = z.object({
    hoTen: z.string().min(1, "Họ tên là bắt buộc"),
    email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
    vaiTro: z.string(),
    kichHoat: z.boolean(),
    phone: z.string().optional(),
    avatar: z.string().optional(),
    matKhau: z.string().optional().refine(val => !val || val.length >= 6, {
        message: "Mật khẩu mới phải có ít nhất 6 ký tự"
    })
});

type FormData = z.infer<typeof formSchema>;

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    user: IUser | null
    onSuccess?: () => void
}

export default function EditUserDialog({ open, onOpenChange, user, onSuccess }: Props) {
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [roles, setRoles] = useState<IRole[]>([])

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            hoTen: "",
            email: "",
            vaiTro: "",
            kichHoat: true,
            matKhau: "",
            phone: "",
            avatar: ""
        }
    })

    const avatarUrl = watch("avatar");

    // Fetch roles
    useEffect(() => {
        if (open) {
            const fetchRoles = async () => {
                const data = await getAllRoles();
                if (data && data.length > 0) {
                    setRoles(data);
                }
            };
            fetchRoles();
        }
    }, [open]);

    // Populate form with user data
    useEffect(() => {
        if (user && open) {
            reset({
                hoTen: user.fullName,
                email: user.email,
                vaiTro: user.role?.id?.toString() || user.roleId?.toString() || "",
                kichHoat: user.active,
                matKhau: "",
                phone: user.phone || "",
                avatar: user.avatar || ""
            })
        }
    }, [user, open, reset])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const res = await uploadToLocalStorage(file);
            if (res) {
                const url = typeof res === 'string' ? res : res.url || res.path;
                setValue("avatar", url);
                toast.success("Upload ảnh thành công");
            } else {
                toast.error("Upload ảnh thất bại");
            }
        } catch (error) {
            toast.error("Lỗi khi upload ảnh");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data: FormData) => {
        if (!user) return;

        const updatedUser: any = {
            fullName: data.hoTen,
            email: data.email,
            active: data.kichHoat,
            roleId: Number(data.vaiTro),
            phone: data.phone || "",
            avatar: data.avatar || "",
            // Only send password if it's not empty
            ...(data.matKhau ? { password: data.matKhau } : {})
        }

        setLoading(true);
        try {
            const res = await updateUserApi(user.id, updatedUser);
            if (res) {
                toast.success("Cập nhật người dùng thành công");
                onOpenChange(false);
                onSuccess?.();
            } else {
                toast.error("Cập nhật người dùng thất bại");
            }
        } catch (error: any) {
            console.error("Update user error:", error);
            console.log("❌ Server Error Data:", error.response?.data);

            if (error.response && error.response.data) {
                const errorData = error.response.data;

                // Case 1: Error is a string
                if (typeof errorData === 'string') {
                    if (errorData.toLowerCase().includes("email")) {
                        setError("email", { type: "manual", message: errorData });
                    } else if (errorData.toLowerCase().includes("phone")) {
                        setError("phone", { type: "manual", message: errorData });
                    } else {
                        toast.error("Lỗi: " + errorData);
                    }
                }
                // Case 2: Error is an object with 'message' property
                else if (errorData.message) {
                    if (typeof errorData.message === 'string') {
                        if (errorData.message.toLowerCase().includes("email")) {
                            setError("email", { type: "manual", message: errorData.message });
                        } else if (errorData.message.toLowerCase().includes("phone")) {
                            setError("phone", { type: "manual", message: errorData.message });
                        } else {
                            toast.error("Lỗi: " + errorData.message);
                        }
                    } else {
                        toast.error("Cập nhật thất bại");
                    }
                }
                // Case 3: Error is an object with field keys
                else {
                    let handled = false;
                    if (errorData.email) {
                        setError("email", { type: "manual", message: errorData.email });
                        handled = true;
                    }
                    if (errorData.phone) {
                        setError("phone", { type: "manual", message: errorData.phone });
                        handled = true;
                    }
                    if (!handled) {
                        toast.error("Cập nhật thất bại: " + JSON.stringify(errorData));
                    }
                }
            } else {
                toast.error("Cập nhật người dùng thất bại");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
                    <DialogDescription>
                        Cập nhật thông tin tài khoản người dùng
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src={avatarUrl} />
                                <AvatarFallback>{watch("hoTen")?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
                            </Avatar>
                            <Label
                                htmlFor="edit-avatar-upload"
                                className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer hover:bg-primary/90"
                            >
                                <Upload className="h-4 w-4" />
                                <Input
                                    id="edit-avatar-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                />
                            </Label>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-hoTen">Họ và tên *</Label>
                            <Input
                                id="edit-hoTen"
                                {...register("hoTen")}
                                autoComplete="off"
                                className={errors.hoTen ? "border-red-500" : ""}
                            />
                            {errors.hoTen && <span className="text-red-500 text-sm">{errors.hoTen.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-email">Email *</Label>
                            <Input
                                id="edit-email"
                                type="email"
                                {...register("email")}
                                autoComplete="off"
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-phone">Số điện thoại</Label>
                            <Input
                                id="edit-phone"
                                placeholder="0912345678"
                                {...register("phone")}
                                autoComplete="off"
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-vaiTro">Vai trò *</Label>
                            <Controller
                                name="vaiTro"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn vai trò" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role.id} value={role.id?.toString() || ""}>
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Đổi mật khẩu (để trống nếu không muốn thay đổi)</Label>
                        <Input
                            id="edit-matKhau"
                            type="password"
                            placeholder="Mật khẩu mới"
                            {...register("matKhau")}
                            autoComplete="new-password"
                            className={errors.matKhau ? "border-red-500" : ""}
                        />
                        {errors.matKhau && <span className="text-red-500 text-sm">{errors.matKhau.message}</span>}
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="edit-kichHoat">Kích hoạt tài khoản</Label>
                        <Controller
                            name="kichHoat"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    id="edit-kichHoat"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
                        <Button type="submit" disabled={loading || uploading}>
                            {loading ? "Đang cập nhật..." : "Cập nhật"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
