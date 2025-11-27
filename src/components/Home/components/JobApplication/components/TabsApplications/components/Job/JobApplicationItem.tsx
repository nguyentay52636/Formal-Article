"use client"
import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Eye, Download, Heart } from 'lucide-react'
import { ITemplate } from '@/apis/templateApi'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useFavorite } from '@/hooks/useFavorite'
import { toast } from 'react-hot-toast'
interface JobApplicationItemProps {
    jobApplication: ITemplate
}
export default function JobApplicationItem({ jobApplication }: JobApplicationItemProps) {
    const { id, name, slug, summary, previewUrl, views, downloads, tag, color } = jobApplication;
    const { toggleFavorite, isFavorite } = useFavorite()
    const liked = isFavorite(id)

    const handleToggleFavorite = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        try {
            const nowFavorite = await toggleFavorite(jobApplication, { path: `/don-xin-viec/${id}` })
            toast.success(nowFavorite ? "Đã lưu vào mục Đã lưu" : "Đã xóa khỏi mục Đã lưu")
        } catch (error) {
            console.error("Không thể cập nhật mục đã lưu", error)
            toast.error("Không thể cập nhật mục Đã lưu. Vui lòng thử lại.")
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
                                type="button"
                                onClick={handleToggleFavorite}
                                className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm shadow hover:bg-white transition"
                                aria-pressed={liked}
                                aria-label={liked ? "Bỏ lưu mẫu CV" : "Lưu mẫu CV"}
                            >
                                <Heart
                                    fill={liked ? "currentColor" : "none"}
                                    className={cn(
                                        "h-6 w-6 transition",
                                        liked ? "fill-red-500 text-red-500" : "text-gray-600"
                                    )}
                                />
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
