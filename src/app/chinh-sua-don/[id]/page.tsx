"use client"
import { CvEditor } from "@/components/Home/components/CvEditor/CvEditor"


interface CVEditorPageProps {
    params: Promise<{
        id?: string
    }>
}

export default async function page({ params }: CVEditorPageProps) {
    const { id }: { id?: string } = await params

    return (
        <>
            <div className="h-screen">
                <CvEditor cvId={id || ""} />
            </div>
        </>
    )
}
