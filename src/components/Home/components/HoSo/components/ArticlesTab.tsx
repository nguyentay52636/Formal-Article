"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Eye, Heart, Loader2, Trash2 } from "lucide-react"
import Link from "next/link"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/Slice/authSlice"
import { useCallback, useEffect, useState } from "react"
import { getFavoritesByUserId, deleteFavorite, IFavorite } from "@/apis/FavoriteApi"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

export function ArticlesTab() {
    const { user } = useSelector(selectAuth)
    const [favorites, setFavorites] = useState<IFavorite[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [deletingId, setDeletingId] = useState<number | null>(null)

    const fetchFavorites = useCallback(async () => {
        if (!user?.id) return

        setIsLoading(true)
        try {
            const data = await getFavoritesByUserId(user.id)
            setFavorites(data)
        } catch (error) {
            console.error("Error fetching favorites:", error)
        } finally {
            setIsLoading(false)
        }
    }, [user?.id])

    useEffect(() => {
        fetchFavorites()
    }, [fetchFavorites])

    const handleRemoveFavorite = async (e: React.MouseEvent, favoriteId: number) => {
        e.preventDefault()
        e.stopPropagation()

        setDeletingId(favoriteId)
        try {
            await deleteFavorite(favoriteId)
            setFavorites(prev => prev.filter(f => f.id !== favoriteId))
            toast.success("Đã xóa khỏi danh sách yêu thích")
        } catch (error) {
            toast.error("Xóa khỏi yêu thích thất bại")
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Danh sách yêu thích
                </CardTitle>
                <CardDescription>Các mẫu đơn bạn đã lưu vào yêu thích</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favorites.map((favorite) => (
                            <Link
                                key={favorite.id}
                                href={`/don-xin-viec/${favorite.template?.id}`}
                                className="group"
                            >
                                <div className="relative rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                                    {favorite.template?.previewUrl && (
                                        <div className="relative aspect-[3/4] bg-gray-100">
                                            <Image
                                                src={favorite.template.previewUrl}
                                                alt={favorite.template.name || "Template"}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="p-3 space-y-2">
                                        <h3 className="font-semibold text-sm line-clamp-2">
                                            {favorite.template?.name || "Mẫu đơn"}
                                        </h3>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {favorite.template?.views?.toLocaleString() || 0}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Download className="h-3 w-3" />
                                                    {favorite.template?.downloads?.toLocaleString() || 0}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {favorite.createdAt && new Date(favorite.createdAt).toLocaleDateString("vi-VN")}
                                            </div>
                                        </div>
                                        {favorite.template?.tag && (
                                            <Badge variant="secondary" className="text-xs">
                                                {favorite.template.tag.name}
                                            </Badge>
                                        )}
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow-sm"
                                        onClick={(e) => handleRemoveFavorite(e, favorite.id)}
                                        disabled={deletingId === favorite.id}
                                    >
                                        {deletingId === favorite.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        )}
                                    </Button>
                                </div>
                            </Link>
                        ))}

                        {favorites.length === 0 && (
                            <div className="col-span-full text-center py-12 text-muted-foreground">
                                <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Bạn chưa có mẫu đơn yêu thích nào</p>
                                <p className="text-sm mt-2">Hãy khám phá và thêm vào yêu thích!</p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ArticlesTab


