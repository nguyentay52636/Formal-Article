import { getTemplateById } from "@/apis/templateApi"
import GeneratorCv from "@/components/Home/components/GeneratorCv/GeneratorCv"
import { RelateCVs } from "@/components/Home/components/JobApplication/components/TabsApplications/components/CurriculumVitae/RelateCVs"
import { notFound } from "next/navigation"

interface CVDetailPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function page({ params }: CVDetailPageProps) {
    const { id } = await params

    // Fetch template details from API
    const cv = await getTemplateById(Number(id))

    if (!cv) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <GeneratorCv cv={cv} />
            <RelateCVs currentCvId={cv.id} />
        </div>
    )
}
