import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, FolderTree, Users, MessageSquare } from "lucide-react"

export interface Activity {
    id: number
    nguoiDung: string
    email: string
    hanhDong: string
    doiTuong: string
    chiTiet: string
    thoiGian: string
}

const actionColors = {
    tao_bai_viet: "bg-accent text-accent-foreground",
    sua_bai_viet: "bg-secondary text-secondary-foreground",
    xoa_bai_viet: "bg-destructive text-destructive-foreground",
    tao_danh_muc: "bg-accent text-accent-foreground",
    sua_danh_muc: "bg-secondary text-secondary-foreground",
    xoa_danh_muc: "bg-destructive text-destructive-foreground",
    tao_nguoi_dung: "bg-accent text-accent-foreground",
    sua_nguoi_dung: "bg-secondary text-secondary-foreground",
    xoa_nguoi_dung: "bg-destructive text-destructive-foreground",
    xoa_binh_luan: "bg-destructive text-destructive-foreground",
}

const actionIcons = {
    tao_bai_viet: FileText,
    sua_bai_viet: FileText,
    xoa_bai_viet: FileText,
    tao_danh_muc: FolderTree,
    sua_danh_muc: FolderTree,
    xoa_danh_muc: FolderTree,
    tao_nguoi_dung: Users,
    sua_nguoi_dung: Users,
    xoa_nguoi_dung: Users,
    xoa_binh_luan: MessageSquare,
}

interface ActivityRowProps {
    activity: Activity
}

export default function ActivityRow({ activity }: ActivityRowProps) {
    const Icon = actionIcons[activity.hanhDong as keyof typeof actionIcons]

    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{activity.nguoiDung.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{activity.nguoiDung}</div>
                        <div className="text-xs text-muted-foreground">{activity.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <Badge className={actionColors[activity.hanhDong as keyof typeof actionColors]}>
                    <Icon className="mr-1 h-3 w-3" />
                    {activity.hanhDong.replace(/_/g, " ")}
                </Badge>
            </td>
            <td className="font-medium">{activity.doiTuong}</td>
            <td className="text-muted-foreground">{activity.chiTiet}</td>
            <td className="text-sm">{activity.thoiGian}</td>
        </tr>
    )
}
