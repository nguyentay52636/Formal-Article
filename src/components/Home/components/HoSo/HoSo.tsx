"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Heart, Bookmark, MessageSquare, Download } from "lucide-react"
import Link from "next/link"
import ProfileHeader from "./components/ProfileHeader"
import ArticlesTab from "./components/ArticlesTab"
import SavedTab from "./components/SavedTab"
import DownloadedTab from "./components/DownloadedTab"
import CommentsTab from "./components/CommentsTab"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/Slice/authSlice"

export default function HoSo() {
    // const { user, isLoading: authLoading } = useAuth()
    const { isAuthenticated, user } = useSelector(selectAuth)
    const router = useRouter()

    // Mock data - replace with actual API calls
    const [stats, setStats] = useState({
        articles: 12,
        savedDocs: 8,
        comments: 24,
        reactions: 45,
    })


    const [savedDocs, setSavedDocs] = useState([
        {
            id: 1,
            tieu_de: "Đơn xin nghỉ phép",
            duong_dan: "don-xin-nghi-phep",
            ngay_luu: "2024-01-20",
        },
        {
            id: 2,
            tieu_de: "Đơn xin chuyển công tác",
            duong_dan: "don-xin-chuyen-cong-tac",
            ngay_luu: "2024-01-18",
        },
    ])

    const [downloadedDocs, setDownloadedDocs] = useState([
        {
            id: 1,
            tieu_de: "Đơn xin việc vị trí Marketing Manager",
            duong_dan: "don-xin-viec-marketing-manager",
            ngay_tai: "2024-01-22",
            loai: "tai_lieu",
            dinh_dang: "docx",
            kich_thuoc: 245000, // bytes
            ten_tap_tin: "don-xin-viec-marketing.docx",
        },
        {
            id: 2,
            tieu_de: "Mẫu CV xin việc chuyên nghiệp",
            duong_dan: "mau-cv-xin-viec-chuyen-nghiep",
            ngay_tai: "2024-01-20",
            loai: "tai_lieu",
            dinh_dang: "pdf",
            kich_thuoc: 512000,
            ten_tap_tin: "mau-cv-chuyen-nghiep.pdf",
        },
        {
            id: 3,
            tieu_de: "Đơn xin nghỉ phép",
            duong_dan: "don-xin-nghi-phep",
            ngay_tai: "2024-01-18",
            loai: "tai_lieu",
            dinh_dang: "docx",
            kich_thuoc: 189000,
            ten_tap_tin: "don-xin-nghi-phep.docx",
        },
    ])

    const [recentComments, setRecentComments] = useState([
        {
            id: 1,
            noi_dung: "Mẫu đơn rất hữu ích, cảm ơn tác giả!",
            bai_viet: "Đơn xin việc vị trí IT",
            ngay_tao: "2024-01-22",
        },
        {
            id: 2,
            noi_dung: "Có thể cung cấp thêm ví dụ được không?",
            bai_viet: "Mẫu CV chuyên nghiệp",
            ngay_tao: "2024-01-21",
        },
    ])



    if (!user) return null

    return (
        <div className="min-h-screen flex flex-col bg-background">

            <main className="flex-1 py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Profile Header */}
                        <ProfileHeader user={user} stats={stats} />

                        {/* Tabs Content */}
                        <Tabs defaultValue="articles" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto lg:inline-grid">
                                <TabsTrigger value="articles" className="gap-2">
                                    <Heart className="h-4 w-4" />
                                    Yêu thích
                                </TabsTrigger>
                                <TabsTrigger value="saved" className="gap-2">
                                    <Bookmark className="h-4 w-4" />
                                    Đã lưu
                                </TabsTrigger>
                                <TabsTrigger value="downloaded" className="gap-2">
                                    <Download className="h-4 w-4" />
                                    Đã tải
                                </TabsTrigger>
                                <TabsTrigger value="comments" className="gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Bình luận
                                </TabsTrigger>
                            </TabsList>

                            {/* Favorites Tab */}
                            <TabsContent value="articles" className="space-y-4">
                                <ArticlesTab />
                            </TabsContent>

                            {/* Saved Documents Tab */}
                            <TabsContent value="saved" className="space-y-4">
                                <SavedTab savedDocs={savedDocs} />
                            </TabsContent>

                            {/* Downloaded Documents Tab */}
                            <TabsContent value="downloaded" className="space-y-4">
                                <DownloadedTab downloadedDocs={downloadedDocs} />
                            </TabsContent>

                            {/* Comments Tab */}
                            <TabsContent value="comments" className="space-y-4">
                                <CommentsTab recentComments={recentComments} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>

        </div>
    )
}
