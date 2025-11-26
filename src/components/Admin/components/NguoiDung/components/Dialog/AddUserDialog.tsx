"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Upload } from "lucide-react"
import { createUser } from "@/apis/userApi"
import { toast } from "react-hot-toast"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { uploadToLocalStorage } from "@/apis/uploadApi"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAllRoles } from "@/apis/roleApi"
import { IRole } from "@/apis/types"

const formSchema = z.object({
    hoTen: z.string().min(1, "Họ tên là bắt buộc"),
    email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
    matKhau: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    xacNhanMatKhau: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
    vaiTro: z.string(),
    kichHoat: z.boolean(),
    phone: z.string().optional(),
    avatar: z.string().optional()
}).refine((data) => data.matKhau === data.xacNhanMatKhau, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["xacNhanMatKhau"],
});

type FormData = z.infer<typeof formSchema>;

type Props = {
    onSuccess?: () => void
}

export default function AddUserDialog({ onSuccess }: Props) {
    const [open, setOpen] = useState(false)
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
            matKhau: "",
            xacNhanMatKhau: "",
            vaiTro: "",
            kichHoat: true,
            phone: "",
            avatar: ""
        }
    })

    const avatarUrl = watch("avatar");

    // Fetch roles when dialog opens
    useEffect(() => {
        if (open) {
            const fetchRoles = async () => {
                const data = await getAllRoles();
                if (data && data.length > 0) {
                    setRoles(data);
                    // Set default role if available, e.g., 'USER' or the first one
                    const defaultRole = data.find((r: IRole) => r.name === 'USER') || data[0];
                    setValue("vaiTro", defaultRole.id?.toString() || "");
                }
            };
            fetchRoles();

            reset({
                hoTen: "",
                email: "",
                matKhau: "",
                xacNhanMatKhau: "",
                vaiTro: "",
                kichHoat: true,
                phone: "",
                avatar: ""
            });
        }
    }, [open, reset, setValue]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const res = await uploadToLocalStorage(file);
            console.log("📸 Upload response:", res);
            if (res) {
                // Assuming res is the URL string or contains url property
                const url = typeof res === 'string' ? res : res.url || res.path;
                setValue("avatar", url);
                toast.success("Upload ảnh thành công");
            } else {
                toast.error("Upload ảnh thất bại");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Lỗi khi upload ảnh");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data: FormData) => {
        const newUser: any = {
            fullName: data.hoTen,
            email: data.email,
            password: data.matKhau,
            active: data.kichHoat,
            roleId: Number(data.vaiTro),
            phone: data.phone || "",
            avatar: data.avatar || ""
        }

        console.log("📝 Form data submitted:", data);
        console.log("📦 Payload to be sent:", newUser);

        setLoading(true);
        try {
            const res = await createUser(newUser);
            if (res) {
                toast.success("Thêm người dùng thành công");
                setOpen(false);
                reset();
                onSuccess?.();
            } else {
                toast.error("Thêm người dùng thất bại");
            }
        } catch (error: any) {
            console.error("Create user error:", error);
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
                        toast.error("Thêm người dùng thất bại");
                    }
                }
                // Case 3: Error is an object with field keys (e.g. { email: "...", phone: "..." })
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
                        toast.error("Thêm người dùng thất bại: " + JSON.stringify(errorData));
                    }
                }
            } else {
                toast.error("Thêm người dùng thất bại");
            }
        } finally {
            setLoading(false);
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
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Thêm người dùng mới</DialogTitle>
                    <DialogDescription>
                        Điền thông tin để tạo tài khoản người dùng mới
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
                                htmlFor="avatar-upload"
                                className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer hover:bg-primary/90"
                            >
                                <Upload className="h-4 w-4" />
                                <Input
                                    id="avatar-upload"
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
                            <Label htmlFor="hoTen">Họ và tên *</Label>
                            <Input
                                id="hoTen"
                                placeholder="Nguyễn Văn A"
                                {...register("hoTen")}
                                autoComplete="off"
                                className={errors.hoTen ? "border-red-500" : ""}
                            />
                            {errors.hoTen && <span className="text-red-500 text-sm">{errors.hoTen.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nguyenvana@example.com"
                                {...register("email")}
                                autoComplete="off"
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input
                                id="phone"
                                placeholder="0912345678"
                                {...register("phone")}
                                autoComplete="off"
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="vaiTro">Vai trò *</Label>
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

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="matKhau">Mật khẩu *</Label>
                            <Input
                                id="matKhau"
                                type="password"
                                placeholder="••••••••"
                                {...register("matKhau")}
                                autoComplete="new-password"
                                className={errors.matKhau ? "border-red-500" : ""}
                            />
                            {errors.matKhau && <span className="text-red-500 text-sm">{errors.matKhau.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="xacNhanMatKhau">Xác nhận mật khẩu *</Label>
                            <Input
                                id="xacNhanMatKhau"
                                type="password"
                                placeholder="••••••••"
                                {...register("xacNhanMatKhau")}
                                autoComplete="new-password"
                                className={errors.xacNhanMatKhau ? "border-red-500" : ""}
                            />
                            {errors.xacNhanMatKhau && <span className="text-red-500 text-sm">{errors.xacNhanMatKhau.message}</span>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="kichHoat">Kích hoạt tài khoản</Label>
                        <Controller
                            name="kichHoat"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    id="kichHoat"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={loading || uploading}>
                            {loading ? "Đang xử lý..." : "Tạo tài khoản"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
