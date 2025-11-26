"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ITemplate } from "@/apis/templateApi"
import { CvDetailView } from "@/components/Home/components/JobApplication/components/TabsApplications/components/CurriculumVitae/CvDetailView/CvDetailView"
import { RelateCVs } from "@/components/Home/components/JobApplication/components/TabsApplications/components/CurriculumVitae/RelateCVs"
import { useTemplate } from "@/hooks/useTemplate"
import { Loader2 } from "lucide-react"

export default function Page() {
    const params = useParams()
    const id = params?.id as string
    const { getTemplateDetails, loading } = useTemplate()
    const [cv, setCv] = useState<ITemplate | null>(null)

    useEffect(() => {
        const fetchTemplate = async () => {
            if (id) {
                const templateData = await getTemplateDetails(Number(id))
                if (templateData) {
                    setCv(templateData)
                }
            }
        }
        fetchTemplate()
    }, [id])

    if (loading || !cv) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <CvDetailView cv={cv} />
            <RelateCVs currentCvId={cv.id.toString()} />
        </div>
    )
}
