import { LayoutDashboard, FileText, FolderTree, Users, MessageSquare, FileUp, Tags, Star, BarChart3, History } from "lucide-react"
export const menuItems = [
    {
        title: "Tổng quan",
        href: "/quantri",
        icon: LayoutDashboard,
    },
    {
        title: "Mẫu CV",
        href: "/quantri/mau-cv",
        icon: FileText,
    },
    {
        title: "Danh mục CV",
        href: "/quantri/danh-muc",
        icon: FolderTree,
    },
    {
        title: "Người dùng",
        href: "/quantri/nguoi-dung",
        icon: Users,
    },
    // {
    //     title: "Bình luận",
    //     href: "/quantri/binh-luan",
    //     icon: MessageSquare,
    // },
    // {
    //     title: "Tệp tin",
    //     href: "/quantri/tep-tin",
    //     icon: FileUp,
    // },
    {
        title: "Thẻ",
        href: "/quantri/the",
        icon: Tags,
    },
    // {
    //     title: "Nội dung nổi bật",
    //     href: "/quantri/noi-bat",
    //     icon: Star,
    // },
    {
        title: "Thống kê",
        href: "/quantri/thong-ke",
        icon: BarChart3,
    },
    {
        title: "Lịch sử hoạt động",
        href: "/quantri/lich-su",
        icon: History,
    },
]