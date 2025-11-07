import { CvEditor } from "@/components/Home/components/CvEditor/CvEditor"


interface CVEditorPageProps {
    params: {
        id: string
    }
}

export default async function page({ params }: CVEditorPageProps) {
    const { id } = await params

    return (
        <>
            <div className="h-screen">
                <CvEditor cvId={id} />
            </div>
        </>
    )
}
