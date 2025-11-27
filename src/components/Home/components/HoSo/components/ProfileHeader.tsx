"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Camera, Loader2, Mail, Shield } from "lucide-react"
import { StatsSummary } from "../types"
import { IUser } from "@/apis/types"
import { useRef, useState } from "react"
import { useUpload } from "@/hooks/useUpload"
import { updateUser } from "@/apis/userApi"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/redux/Slice/authSlice"
import toast from "react-hot-toast"

interface ProfileHeaderProps {
    user: IUser
    stats: StatsSummary
}

const getRoleBadgeColor = (roleName: string) => {
    switch (roleName.toLowerCase()) {
        case "admin":
        case "quan_tri":
            return "bg-red-500/10 text-red-500 border-red-500/20"
        case "editor":
        case "bien_tap":
            return "bg-blue-500/10 text-blue-500 border-blue-500/20"
        case "author":
        case "tac_gia":
            return "bg-purple-500/10 text-purple-500 border-purple-500/20"
        default:
            return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
}

const getRoleLabel = (roleName: string) => {
    switch (roleName.toLowerCase()) {
        case "admin":
        case "quan_tri":
            return "Quản trị viên"
        case "editor":
        case "bien_tap":
            return "Biên tập viên"
        case "ADMIN":
        case "ADMIN":
            return "Quản trị viên"
        case "USER":
        case "USER":
            return "Người dùng"
        default:
            return roleName
    }
}

const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `Tham gia từ tháng ${month}, ${year}`
}

export function ProfileHeader({ user, stats }: ProfileHeaderProps) {
    const roleName = user.role?.name || "user"
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { uploadLocal, loading: uploading } = useUpload()
    const dispatch = useDispatch()
    const [avatarUrl, setAvatarUrl] = useState(user.avatar)

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error("Vui lòng chọn file hình ảnh")
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Kích thước ảnh tối đa là 5MB")
            return
        }

        try {
            // Upload image
            const uploadResult = await uploadLocal(file)
            if (!uploadResult) {
                toast.error("Upload ảnh thất bại")
                return
            }

            const newAvatarUrl = uploadResult.url || uploadResult

            // Update user with new avatar
            const updatedUser = await updateUser(user.id, {
                ...user,
                avatar: newAvatarUrl
            })

            if (updatedUser) {
                setAvatarUrl(newAvatarUrl)
                // Update Redux state
                const token = localStorage.getItem("token") || ""
                dispatch(setCredentials({ user: { ...user, avatar: newAvatarUrl }, token }))
                // Update localStorage
                localStorage.setItem("currentUser", JSON.stringify({ ...user, avatar: newAvatarUrl }))
                toast.success("Cập nhật ảnh đại diện thành công")
            } else {
                toast.error("Cập nhật ảnh đại diện thất bại")
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi cập nhật ảnh đại diện")
            console.error("Error updating avatar:", error)
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <Card className="border-2">
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    {/* Avatar with upload */}
                    <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/10">
                            <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={user.fullName} />
                            <AvatarFallback className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-purple-600 text-white">
                                {user.fullName?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        {/* Overlay */}
                        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            {uploading ? (
                                <Loader2 className="h-8 w-8 text-white animate-spin" />
                            ) : (
                                <Camera className="h-8 w-8 text-white" />
                            )}
                        </div>
                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                    </div>

                    <div className="flex-1 space-y-3">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl md:text-3xl font-bold">{user.fullName}</h1>
                                <Badge className={getRoleBadgeColor(roleName)} variant="outline">
                                    <Shield className="h-3 w-3 mr-1" />
                                    {getRoleLabel(roleName)}
                                </Badge>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {user.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {formatJoinDate(user.createdAt)}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                            <div className="space-y-1">
                                <div className="text-2xl font-bold text-primary">{stats.articles}</div>
                                <div className="text-xs text-muted-foreground">Danh sách CV yêu thích</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-bold text-purple-600">{stats.savedDocs}</div>
                                <div className="text-xs text-muted-foreground">Đã lưu</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-bold text-blue-600">{stats.comments}</div>
                                <div className="text-xs text-muted-foreground">Bình luận</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-bold text-pink-600">{stats.reactions}</div>
                                <div className="text-xs text-muted-foreground">Phản ứng</div>
                            </div>
                        </div>
                    </div>


                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileHeader


