import { createFavorite, deleteFavorite, getFavoritesByUserId, IFavorite } from "@/apis/FavoriteApi"
import { selectAuth } from "@/redux/Slice/authSlice"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useFavorite = () => {
    const { user } = useSelector(selectAuth)
    const [favorites, setFavorites] = useState<IFavorite[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // const fetchFavorites = useCallback(async () => {
    //     if (!user?.id) return
        
    //     setIsLoading(true)
    //     setError(null)
    //     try {
    //         const data = await getFavoritesByUserId(user.id)
    //         setFavorites(data)
    //     } catch (err) {
    //         setError("Không thể tải danh sách yêu thích")
    //         console.error("Error fetching favorites:", err)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }, [user?.id])

    // useEffect(() => {
    //     fetchFavorites()
    // }, [fetchFavorites])

    const addFavorite = async (templateId: number) => {
        if (!user?.id) return null
        
        try {
            const newFavorite = await createFavorite(user.id, templateId)
            if (newFavorite) {
                setFavorites(prev => [...prev, newFavorite])
            }
            return newFavorite
        } catch (err) {
            setError("Không thể thêm vào yêu thích")
            throw err
        }
    }

    const removeFavorite = async (favoriteId: number) => {
        try {
            await deleteFavorite(favoriteId)
            setFavorites(prev => prev.filter(f => f.id !== favoriteId))
        } catch (err) {
            setError("Không thể xóa khỏi yêu thích")
            throw err
        }
    }

    const isFavorite = (templateId: number) => {
        return favorites.some(f => f.templateId === templateId)
    }

    const getFavoriteByTemplateId = (templateId: number) => {
        return favorites.find(f => f.templateId === templateId)
    }

    return {
        favorites,
        isLoading,
        error,
        addFavorite,
        removeFavorite,
        isFavorite,
        getFavoriteByTemplateId,
       
    }
}

export default useFavorite