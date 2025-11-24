"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useRating } from "@/hooks/useRating"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/Slice/authSlice"
import { IRating } from "@/apis/ratingApi"
import toast from "react-hot-toast"
import ConfirmRatingDialog from "./dialog/ConfirmRatingDialog"

interface CVRatingProps {
    cvId: number
}

interface RatingData {
    average: number
    total: number
    distribution: { [key: number]: number }
    userRating: number | null
}

export function CVRating({ cvId }: CVRatingProps) {
    const [rating, setRating] = useState<RatingData>({
        average: 4.8,
        total: 124,
        distribution: { 5: 89, 4: 28, 3: 5, 2: 1, 1: 1 },
        userRating: null,
    })
    const [hoveredStar, setHoveredStar] = useState<number | null>(null)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [pendingRating, setPendingRating] = useState<number | null>(null)

    const { getAllRatingByTemplateId, createRating } = useRating()
    const { user } = useSelector(selectAuth)

    useEffect(() => {
        const fetchRatings = async () => {
            if (!cvId) return
            try {
                const ratings = await getAllRatingByTemplateId(Number(cvId))
                if (ratings) {
                    const total = ratings.length
                    const sum = ratings.reduce((acc: number, r: IRating) => acc + r.score, 0)
                    const average = total > 0 ? Number((sum / total).toFixed(1)) : 0
                    const distribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
                    ratings.forEach((r: IRating) => {
                        if (r.score >= 1 && r.score <= 5) {
                            distribution[r.score] = (distribution[r.score] || 0) + 1
                        }
                    })

                    let currentUserRating = null
                    if (user) {
                        const myRating = ratings.find((r: IRating) => r.userId === user.id)
                        if (myRating) {
                            currentUserRating = myRating.score
                        }
                    }

                    setRating({
                        average,
                        total,
                        distribution,
                        userRating: currentUserRating
                    })
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchRatings()
    }, [cvId, user])

    const handleRate = (stars: number) => {
        if (!user) {
            toast.error("Vui lòng đăng nhập để đánh giá")
            return
        }
        setPendingRating(stars)
        setShowConfirmDialog(true)
    }

    const confirmRating = async () => {
        if (!pendingRating || !user) return

        try {
            await createRating({
                score: pendingRating,
                userId: user.id,
                templateId: Number(cvId)
            })

            // Optimistic update
            const newTotal = rating.userRating ? rating.total : rating.total + 1
            const oldSum = rating.average * rating.total
            const newSum = rating.userRating ? oldSum - rating.userRating + pendingRating : oldSum + pendingRating
            const newAverage = newSum / newTotal

            const newDistribution = { ...rating.distribution }
            if (rating.userRating) {
                newDistribution[rating.userRating] = Math.max(0, newDistribution[rating.userRating] - 1)
            }
            newDistribution[pendingRating] = (newDistribution[pendingRating] || 0) + 1

            setRating({
                average: Number(newAverage.toFixed(1)),
                total: newTotal,
                distribution: newDistribution,
                userRating: pendingRating,
            })

            // toast.success("Đánh giá thành công") // createRating already shows toast? Let's check hook. Yes it does.

        } catch (error: any) {
            console.error(error)
            if (error.response && error.response.data && error.response.data.message === "User has already rated this template") {
                toast.error("Bạn đã đánh giá mẫu này rồi")
            } else {
                toast.error("Có lỗi xảy ra khi đánh giá")
            }
        }
    }

    return (
        <Card className="p-6 lg:p-8 space-y-6">
            <h3 className="text-2xl font-bold">Đánh giá mẫu CV</h3>

            <div className="flex items-center gap-6">
                <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">{rating.average}</div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-5 h-5 ${star <= Math.round(rating.average) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{rating.total} đánh giá</p>
                </div>

                <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = rating.distribution[star] || 0
                        const percentage = rating.total > 0 ? (count / rating.total) * 100 : 0
                        return (
                            <div key={star} className="flex items-center gap-2">
                                <span className="text-sm w-8">{star} ★</span>
                                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-400 transition-all" style={{ width: `${percentage}%` }} />
                                </div>
                                <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="border-t pt-6">
                <p className="font-semibold mb-3">Đánh giá của bạn</p>
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => handleRate(star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(null)}
                            className="transition-transform hover:scale-110"
                        >
                            <Star
                                className={`w-8 h-8 ${star <= (hoveredStar || rating.userRating || 0)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 hover:text-yellow-400"
                                    }`}
                            />
                        </button>
                    ))}
                    {rating.userRating && (
                        <span className="ml-3 text-sm text-muted-foreground">Bạn đã đánh giá {rating.userRating} sao</span>
                    )}
                </div>
            </div>
            <ConfirmRatingDialog
                open={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
                onConfirm={confirmRating}
            />
        </Card>
    )
}
