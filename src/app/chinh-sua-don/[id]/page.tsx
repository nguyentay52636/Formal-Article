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
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="h-screen">
            <CvEditor cvId={id || ""} template={template} />
        </div>
    )
}
