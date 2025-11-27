"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updateUser } from "@/apis/userApi"
import { IUser } from "@/apis/types"
import { toast } from "react-hot-toast"

interface ProfileInfoCardProps {
    user: IUser
    onUpdated?: (user: IUser) => void
    isLoading?: boolean
}

const ProfileInfoCard = ({ user, onUpdated, isLoading }: ProfileInfoCardProps) => {
    const [formData, setFormData] = useState({
        fullName: user.fullName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        avatar: user.avatar ?? "",
    })
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        setFormData({
            fullName: user.fullName ?? "",
            email: user.email ?? "",
            phone: user.phone ?? "",
            avatar: user.avatar ?? "",
        })
    }, [user])

    const handleChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!user.id) return

        setSubmitting(true)
        try {
            const payload = {
                fullName: formData.fullName.trim(),
                email: formData.email.trim(),
                phone: formData.phone?.trim() || "",
                avatar: formData.avatar?.trim() || "",
                active: user.active,
                roleId: user.role?.id ?? user.roleId,
            }
            const updated = await updateUser(user.id, payload)
            if (updated) {
                toast.success("Cập nhật hồ sơ thành công")
                onUpdated?.(updated)
            } else {
                toast.error("Không thể cập nhật hồ sơ")
            }
        } catch (error) {
            console.error("Failed to update profile", error)
            toast.error("Không thể cập nhật hồ sơ. Vui lòng thử lại.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>Cập nhật thông tin hồ sơ để quản trị tài khoản tốt hơn</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Họ và tên</Label>
                            <Input
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleChange("fullName")}
                                disabled={isLoading || submitting}
                                placeholder="Nhập họ và tên"
                                autoComplete="off"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange("email")}
                                disabled={isLoading || submitting}
                                placeholder="you@example.com"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange("phone")}
                                disabled={isLoading || submitting}
                                placeholder="0912345678"
                                autoComplete="off"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="avatar">Ảnh đại diện (URL)</Label>
                            <Input
                                id="avatar"
                                value={formData.avatar}
                                onChange={handleChange("avatar")}
                                disabled={isLoading || submitting}
                                placeholder="https://..."
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button type="submit" disabled={isLoading || submitting}>
                            {submitting ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default ProfileInfoCard

