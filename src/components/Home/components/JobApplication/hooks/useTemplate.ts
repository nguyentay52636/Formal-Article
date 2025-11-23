import { getAllTemplates } from "@/apis/templateApi"
import { useState, useEffect } from "react"

export const useTemplate = () => {
    const [templateCTV, setTemplateCTV] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getTemplateCTV = async () => {
        setLoading(true)
        try {
            const response = await getAllTemplates();
            console.log(response)
            setTemplateCTV(response)
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTemplateCTV()
    }, [])

    return {
        templateCTV,
        loading,
        error,
        getTemplateCTV
    }
} 