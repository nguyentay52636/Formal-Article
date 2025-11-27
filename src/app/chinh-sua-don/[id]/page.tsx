"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { CvEditor } from "@/components/Home/components/CvEditor/CvEditor"
import { useTemplate } from "@/hooks/useTemplate"
import { ITemplate } from "@/apis/templateApi"
import { Loader2 } from "lucide-react"

export default function Page() {
    const params = useParams()
    const id = params?.id as string
    const { getTemplateDetails, loading } = useTemplate()
    const [template, setTemplate] = useState<ITemplate | null>(null)

    useEffect(() => {
        const fetchTemplate = async () => {
            if (id) {
                const templateData = await getTemplateDetails(Number(id))
                if (templateData) {
                    setTemplate(templateData)
                }
            }
        }
        fetchTemplate()
    }, [id])

    if (loading || !template) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-[#1E1E1E] z-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-[#0066CC]" />
                    <p className="text-white text-sm">Đang tải CV Editor...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-50 bg-[#1E1E1E]">
            <CvEditor cvId={id || ""} template={template} />
        </div>
    )
}
