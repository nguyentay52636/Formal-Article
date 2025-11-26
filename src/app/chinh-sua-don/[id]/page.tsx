import { getTemplateById } from "@/apis/templateApi"
import { CvEditorWrapper } from "@/components/Home/components/CvEditor/CvEditorWrapper"
import { notFound } from "next/navigation"

interface CVEditorPageProps {
    params: Promise<{
        id?: string
    }>
}

export default async function page({ params }: CVEditorPageProps) {
    const { id }: { id?: string } = await params

    if (!id) {
        notFound()
    }

    // Fetch template details from API
    const template = await getTemplateById(Number(id))

    if (!template) {
        notFound()
    }

    return (
        <div className="h-screen">
            <CvEditorWrapper cvId={id} template={template} />
        </div>
    )
}
