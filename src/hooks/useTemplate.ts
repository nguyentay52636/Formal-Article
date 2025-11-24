import { getAllTemplates, createTemplate as apiCreateTemplate, updateTemplate as apiUpdateTemplate, deleteTemplate as apiDeleteTemplate, ITemplate, getTemplateById } from "@/apis/templateApi"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"

export const useTemplate = () => {
    const [templateCTV, setTemplateCTV] = useState<ITemplate[]>([])
    const [templateDetails, setTemplateDetails] = useState<ITemplate | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getTemplateCTV = async () => {
        setLoading(true)
        try {
            const response = await getAllTemplates();
            setTemplateCTV(response)
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const createTemplate = async (template: ITemplate) => {
        setLoading(true)
        try {
            const response = await apiCreateTemplate(template)
            if (response) {
                toast.success("Tạo mẫu CV thành công")
                getTemplateCTV()
                return true
            }
            return false
        } catch (error: any) {
            toast.error("Tạo mẫu CV thất bại")
            setError(error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const updateTemplate = async (id: number, template: ITemplate) => {
        setLoading(true)
        try {
            const response = await apiUpdateTemplate(id, template)
            if (response) {
                toast.success("Cập nhật mẫu CV thành công")
                getTemplateCTV()
                return true
            }
            return false
        } catch (error: any) {
            toast.error("Cập nhật mẫu CV thất bại")
            setError(error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const deleteTemplate = async (id: number) => {
        setLoading(true)
        try {
            const response = await apiDeleteTemplate(id)
            if (response) {
                toast.success("Xóa mẫu CV thành công")
                getTemplateCTV()
                return true
            }
            return false
        } catch (error: any) {
            toast.error("Xóa mẫu CV thất bại")
            setError(error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const getTemplateDetails = async (id: number) => {
        setLoading(true)
        try {
            const response = await getTemplateById(id);
            if (response) {
                setTemplateDetails(response)
                return response
            }
            return null
        } catch (error: any) {
            toast.error("Lấy mẫu CV thất bại")
            setError(error)
            return null
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTemplateCTV()
    }, [])

    return {
        getTemplateDetails,
        templateCTV,
        templateDetails,
        loading,
        error,
        getTemplateCTV,
        createTemplate,
        updateTemplate,
        deleteTemplate
    }
}