"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Eye, Download, Heart, Loader2 } from 'lucide-react'
import { ITemplate } from '@/apis/templateApi'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSelector } from 'react-redux'
import { selectAuth } from '@/redux/Slice/authSlice'
import toast from 'react-hot-toast'
import useFavorite from './hooks/useFavorite'

interface JobApplicationItemProps {
    jobApplication: ITemplate
}
export default function JobApplicationItem({ jobApplication }: JobApplicationItemProps) {
    const { user } = useSelector(selectAuth)
    const { addFavorite, removeFavorite, isFavorite, getFavoriteByTemplateId } = useFavorite()
    const [isLoading, setIsLoading] = useState(false)

    const { id, name, slug, summary, previewUrl, views, downloads, tag, color } = jobApplication;
    const isLiked = isFavorite(id)

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user?.id) {
            toast.error("Vui lòng đăng nhập để thêm vào yêu thích")
            return
        }

        setIsLoading(true)
        try {
            if (isLiked) {
                const favorite = getFavoriteByTemplateId(id)
                if (favorite) {
                    await removeFavorite(favorite.id)
                    toast.success("Đã xóa khỏi danh sách yêu thích")
                }
            } else {
                await addFavorite(id)
                toast.success("Đã thêm vào danh sách yêu thích thành công")
            }
        } catch (error) {
            toast.error(isLiked ? "Xóa khỏi yêu thích thất bại" : "Thêm vào yêu thích thất bại")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Link key={jobApplication.id} href={`/don-xin-viec/${jobApplication.id}`}>
                <Card className="group hover:shadow-lg transition-shadow overflow-hidden h-full">
                    <CardContent className="p-0">
                        <div className={`relative aspect-[3/4] ${color} overflow-hidden`}>
                            <Badge className="absolute top-3 left-3 z-10 bg-[#00B4D8] hover:bg-[#0096B8] text-white">
                                MẪU PHỔ BIẾN
                            </Badge>
                            <Image
                                src={previewUrl}
                                alt={previewUrl}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <Button
                                onClick={handleToggleFavorite}
                                disabled={isLoading}
                                className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm shadow hover:bg-white transition"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
                                ) : (
                                    <Heart
                                        className={cn(
                                            "h-6 w-6 transition",
                                            isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                                        )}
                                    />
                                )}
                            </Button>
                        </div>

                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-3 p-4">
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary" className="text-xs">
                                {tag?.name}
                            </Badge>
                        </div>
                        <h3 className="font-semibold text-sm line-clamp-2 text-balance">{name}</h3>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground w-full">
                            <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                <span>{downloads.toLocaleString()}</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </>
    )
}
