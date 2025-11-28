"use client"
import { getAllTags } from "@/apis/tagApi"
import { ITag } from "@/apis/types"
import { useState } from "react"

export const useTags = () => {
    const [tags, setTags] = useState<ITag[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getTags = async () => {
        try {
            const data = await getAllTags()
            setTags(data)
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    return {
        tags,
        loading,
        error,
        getTags
    }
} 