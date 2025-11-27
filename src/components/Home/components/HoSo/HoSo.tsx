"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Bookmark, MessageSquare, Download } from "lucide-react"
import ProfileHeader from "./components/ProfileHeader"
import ArticlesTab from "./components/ArticlesTab"
import SavedTab from "./components/SavedTab"
import DownloadedTab from "./components/DownloadedTab"
import CommentsTab from "./components/CommentsTab"
import { useFavorite } from "@/hooks/useFavorite"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectAuth, setCredentials } from "@/redux/Slice/authSlice"
import { getUserById } from "@/apis/userApi"
import { IUser } from "@/apis/types"
import { SavedDocItem, UserProfile } from "./types"
import ProfileInfoCard from "./components/ProfileInfoCard"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-hot-toast"

const mapRoleToProfileKey = (roleName?: string): UserProfile["vai_tro"] => {
    switch ((roleName || "").toLowerCase()) {
        case "admin":
        case "quan_tri":
            return "quan_tri"
        case "editor":
        case "bien_tap":
            return "bien_tap"
        case "author":
        case "tac_gia":
            return "tac_gia"
        default:
            return "doc_gia"
    }
}

export default function HoSo() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { user: authUser, token, isAuthenticated } = useAppSelector(selectAuth)
    const { favorites, loading: favoritesLoading, removeFavorite } = useFavorite()
    const [profile, setProfile] = useState<IUser | null>(authUser)
    const [profileLoading, setProfileLoading] = useState(false)
    const [profileError, setProfileError] = useState<string | null>(null)

    useEffect(() => {
        if (!authUser && !isAuthenticated) {
            router.push("/dang-nhap")
        }
    }, [authUser, isAuthenticated, router])

    useEffect(() => {
        if (!authUser?.id) return
        let isMounted = true

        const fetchProfile = async () => {
            setProfileLoading(true)
            setProfileError(null)
            try {
                const latest = await getUserById(authUser.id)
                if (latest && isMounted) {
                    setProfile(latest)
                }
            } catch (error) {
                console.error("Failed to load profile", error)
                if (isMounted) {
                    setProfileError("Không thể tải thông tin hồ sơ. Vui lòng thử lại.")
                }
            } finally {
                if (isMounted) {
                    setProfileLoading(false)
                }
            }
        }

        fetchProfile()

        return () => {
            isMounted = false
        }
    }, [authUser?.id])

    // Mock data - replace with actual API calls
    const favoriteDocs = useMemo<SavedDocItem[]>(() => {
        return favorites
            .map((item) => ({
                id: item.id,
                tieu_de: item.name,
                duong_dan: item.path,
                ngay_luu: item.savedAt,
            }))
            .sort(
                (a, b) =>
                    new Date(b.ngay_luu).getTime() - new Date(a.ngay_luu).getTime()
            )
    }, [favorites])
    const handleRemoveFavoriteDoc = useCallback(
        async (templateId: number) => {
            try {
                await removeFavorite(templateId)
                toast.success("Đã xóa khỏi mục Đã lưu")
            } catch (error) {
                console.error("Failed to remove favorite template", error)
                toast.error("Không thể xóa mục Đã lưu. Vui lòng thử lại.")
            }
        },
        [removeFavorite]
    )


    const profileStats = useMemo(
        () => ({
            articles: 0,
            savedDocs: favoriteDocs.length,
            comments: 0,
            reactions: 0,
        }),
        [favoriteDocs.length]
    )

    const profileForHeader = useMemo<UserProfile | null>(() => {
        if (!profile) return null
        return {
            id: profile.id,
            ten: profile.fullName || profile.email,
            email: profile.email,
            avatar: profile.avatar,
            vai_tro: mapRoleToProfileKey(profile.role?.name),
        }
    }, [profile])

    const handleProfileUpdated = (updated: IUser) => {
        setProfile(updated)
        if (token) {
            dispatch(setCredentials({ user: updated, token }))
        } else if (typeof window !== "undefined") {
            localStorage.setItem("currentUser", JSON.stringify(updated))
        }
    }

    const [userArticles, setUserArticles] = useState([
        {
            id: 1,
            tieu_de: "Đơn xin việc vị trí Marketing Manager",
            duong_dan: "don-xin-viec-marketing-manager",
            ngay_xuat_ban: "2024-01-15",
            luot_xem: 1234,
            luot_tai: 456,
            trang_thai: "xuat_ban",
        },
        {
            id: 2,
            tieu_de: "Mẫu CV xin việc chuyên nghiệp",
            duong_dan: "mau-cv-xin-viec-chuyen-nghiep",
            ngay_xuat_ban: "2024-01-10",
            luot_xem: 2345,
            luot_tai: 789,
            trang_thai: "xuat_ban",
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
    if (!authUser && profileLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Skeleton className="h-32 w-32 rounded-full" />
            </div>
        )
    }

    if (!authUser && !profileLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4 text-center text-muted-foreground">
                Bạn cần đăng nhập để xem trang hồ sơ.
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">

            <main className="flex-1 py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Profile Header */}
                        {profileLoading ? (
                            <Skeleton className="h-48 w-full rounded-2xl" />
                        ) : profileForHeader ? (
                            <ProfileHeader user={profileForHeader} stats={profileStats} />
                        ) : (
                            <div className="rounded-2xl border border-dashed p-6 text-center text-muted-foreground">
                                Không tìm thấy thông tin hồ sơ người dùng.
                            </div>
                        )}

                        {profileError && (
                            <p className="text-sm text-destructive">{profileError}</p>
                        )}

                        {profile && (
                            <ProfileInfoCard
                                user={profile}
                                onUpdated={handleProfileUpdated}
                                isLoading={profileLoading}
                            />
                        )}

                        {/* Tabs Content */}
                        <Tabs defaultValue="articles" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto lg:inline-grid">
                                <TabsTrigger value="articles" className="gap-2">
                                    <FileText className="h-4 w-4" />
                                    Bài viết
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

                            {/* Articles Tab */}
                            <TabsContent value="articles" className="space-y-4">
                                <ArticlesTab userArticles={userArticles} />
                            </TabsContent>

                            {/* Saved Documents Tab */}
                            <TabsContent value="saved" className="space-y-4">
                                <SavedTab
                                    savedDocs={favoriteDocs}
                                    isLoading={favoritesLoading}
                                    onRemove={handleRemoveFavoriteDoc}
                                />
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
