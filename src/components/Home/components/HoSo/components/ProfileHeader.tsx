"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Mail, Settings, Shield } from "lucide-react"
import Link from "next/link"
import { StatsSummary, UserProfile } from "../types"

interface ProfileHeaderProps {
    user: UserProfile
    stats: StatsSummary
}

const getRoleBadgeColor = (role: string) => {
    switch (role) {
        case "quan_tri":
            return "bg-red-500/10 text-red-500 border-red-500/20"
        case "bien_tap":
            return "bg-blue-500/10 text-blue-500 border-blue-500/20"
        case "tac_gia":
            return "bg-purple-500/10 text-purple-500 border-purple-500/20"
        default:
            return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
}

const getRoleLabel = (role: string) => {
    switch (role) {
        case "quan_tri":
            return "Quản trị viên"
        case "bien_tap":
            return "Biên tập viên"
        case "tac_gia":
            return "Tác giả"
        case "doc_gia":
            return "Độc giả"
        default:
            return role
    }
}

export function ProfileHeader({ user, stats }: ProfileHeaderProps) {
    return (
        <Card className="border-2">
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.ten} />
                        <AvatarFallback className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-purple-600 text-white">
                            {user.ten.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl md:text-3xl font-bold">{user.ten}</h1>
                                <Badge className={getRoleBadgeColor(user.vai_tro)} variant="outline">
                                    <Shield className="h-3 w-3 mr-1" />
                                    {getRoleLabel(user.vai_tro)}
                                </Badge>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {user.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Tham gia từ tháng 1, 2024
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                            <div className="space-y-1">
                                <div className="text-2xl font-bold text-primary">{stats.articles}</div>
                                <div className="text-xs text-muted-foreground">Bài viết</div>
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

                    <div className="flex gap-2 w-full md:w-auto">
                        <Button asChild className="flex-1 md:flex-none">
                            <Link href="/tai-khoan">
                                <Settings className="h-4 w-4 mr-2" />
                                Cài đặt
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileHeader


