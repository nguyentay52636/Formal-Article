import { useState, useEffect, useCallback } from "react"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/Slice/authSlice"
import { 
    getMyGeneratatedByUserId, 
    getGeneratorById,
    createManualCV,
    createAICV,
    updateGenerator,
    deleteGenerator,
    IGenerator 
} from "@/apis/generatedApi"
import toast from "react-hot-toast"

export const useGenetaredCvs = () => {
    const { user } = useSelector(selectAuth)
    const [generatedCvs, setGeneratedCvs] = useState<IGenerator[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

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

    // Tạo CV thủ công (không có prompt)
    const createManual = useCallback(async (params: {
        templateId: number;
        title: string;
        dataJson?: string;
        styleJson: string;
        htmlOutput?: string;
    }) => {
        if (!user?.id) {
            toast.error("Vui lòng đăng nhập")
            return null
        }

        setIsCreating(true)
        try {
            const newCV = await createManualCV({
                userId: user.id,
                ...params
            })
            setGeneratedCvs(prev => [newCV, ...prev])
            toast.success("Tạo CV thành công")
            return newCV
        } catch (err: any) {
            const errorMsg = err.message || "Không thể tạo CV"
            toast.error(errorMsg)
            throw err
        } finally {
            setIsCreating(false)
        }
    }, [user?.id])

    const createAI = useCallback(async (params: {
        templateId: number;
        title: string;
        prompt: string;
        styleJson: string;
        htmlOutput?: string;
    }) => {
        if (!user?.id) {
            toast.error("Vui lòng đăng nhập")
            return null
        }

        setIsCreating(true)
        try {
            const newCV = await createAICV({
                userId: user.id,
                ...params
            })
            setGeneratedCvs(prev => [newCV, ...prev])
            toast.success("Tạo CV bằng AI thành công")
            return newCV
        } catch (err: any) {
            const errorMsg = err.message || "Không thể tạo CV bằng AI"
            toast.error(errorMsg)
            throw err
        } finally {
            setIsCreating(false)
        }
    }, [user?.id])

    // Lấy CV theo ID
    const getCVById = useCallback(async (id: number) => {
        try {
            const cv = await getGeneratorById(id)
            return cv
        } catch (err: any) {
            console.error("Error fetching CV by id:", err)
            toast.error("Không thể tải CV")
            throw err
        }
    }, [])

    // Cập nhật CV
    const updateCV = useCallback(async (id: number, updates: {
        title?: string;
        dataJson?: string;
        styleJson?: string;
        htmlOutput?: string;
    }) => {
        setIsUpdating(true)
        try {
            const updatedCV = await updateGenerator(id, updates)
            setGeneratedCvs(prev => 
                prev.map(cv => cv.id === id ? updatedCV : cv)
            )
            toast.success("Cập nhật CV thành công")
            return updatedCV
        } catch (err: any) {
            const errorMsg = err.message || "Không thể cập nhật CV"
            toast.error(errorMsg)
            throw err
        } finally {
            setIsUpdating(false)
        }
    }, [])

    // Xóa CV
    const removeCV = useCallback(async (id: number) => {
        setIsDeleting(true)
        try {
            await deleteGenerator(id)
            setGeneratedCvs(prev => prev.filter(cv => cv.id !== id))
            toast.success("Xóa CV thành công")
        } catch (err: any) {
            const errorMsg = err.message || "Không thể xóa CV"
            toast.error(errorMsg)
            throw err
        } finally {
            setIsDeleting(false)
        }
    }, [])

    return {
        generatedCvs,
        isLoading,
        error,
        isCreating,
        isUpdating,
        isDeleting,
        refetch: fetchGeneratedCvs,
        createManual,
        createAI,
        getCVById,
        updateCV,
        removeCV
    }
}
