import { useState, useEffect, useCallback } from "react"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/Slice/authSlice"
import { getMyGeneratatedByUserId, IGenerator } from "@/apis/generatedApi"

export const useGenetaredCvs = () => {
    const { user } = useSelector(selectAuth)
    const [generatedCvs, setGeneratedCvs] = useState<IGenerator[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchGeneratedCvs = useCallback(async () => {
        if (!user?.id) return

        setIsLoading(true)
        setError(null)
        try {
            const data = await getMyGeneratatedByUserId(user.id)
            setGeneratedCvs(Array.isArray(data) ? data : [])
        } catch (err: any) {
            setError(err.message || "Không thể tải danh sách CV đã tạo")
            console.error("Error fetching generated CVs:", err)
        } finally {
            setIsLoading(false)
        }
    }, [user?.id])

    useEffect(() => {
        fetchGeneratedCvs()
    }, [fetchGeneratedCvs])

    return {
        generatedCvs,
        isLoading,
        error,
        refetch: fetchGeneratedCvs
    }
}
