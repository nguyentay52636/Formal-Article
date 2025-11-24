import { createRating as createRatingAPI, deleteRatingAPI, getAllRatingByTemplateIdAPI, IRating, IRatingCreate, updateRatingAPI } from "@/apis/ratingApi"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const useRating = () => {
    const [loading, setLoading] = useState(false)
    const getAllRatingByTemplateId = async (templateId: number) => {
        try {
            const response = await getAllRatingByTemplateIdAPI(templateId)
            return response
        } catch (error: any) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    const createRating = async (rating: IRatingCreate) => {
        try {
            const response = await createRatingAPI(rating)
            if (response) {
                toast.success("Đánh giá thành công")
                return response
            }
        } catch (error: any) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    const updateRating = async (id: number, rating: IRating) => {
        try {
            const response = await updateRatingAPI(rating)
            if (response) {
                toast.success("Cập nhật mẫu CV thành công")
                return true
            }
        } catch (error: any) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    const deleteRating = async (id: number) => {
        try {
            const response = await deleteRatingAPI(id)
            if (response) {
                toast.success("Xóa mẫu CV thành công")
                return true
            }
        } catch (error: any) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
    }, [])

    return {
        getAllRatingByTemplateId,
        updateRating,
        deleteRating,
        createRating
    }

}
