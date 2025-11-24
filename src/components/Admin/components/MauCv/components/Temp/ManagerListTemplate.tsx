"use client"
import { Loader2 } from "lucide-react"
import { useTemplate } from "@/hooks/useTemplate"
import { TemplateCard } from "./ItemCardTemplate"
import { ITemplate } from "@/apis/templateApi"

interface ManagerListTemplateProps {
    onEdit: (template: ITemplate) => void
}

export function ManagerListTemplate({ onEdit }: ManagerListTemplateProps) {
    const { templateCTV, loading, getTemplateCTV, deleteTemplate } = useTemplate()

    const handleDelete = async (id: number) => {
        await deleteTemplate(id)
        getTemplateCTV()
    }

    const handleUpdate = (template: ITemplate) => {
        onEdit(template)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (!templateCTV || templateCTV.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-20 text-center">
                <p className="text-lg font-medium text-foreground">Không tìm thấy template</p>
                <p className="mt-1 text-sm text-muted-foreground">Bắt đầu bằng cách tạo mẫu CV đầu tiên của bạn</p>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Hiển thị <span className="font-medium text-foreground">{templateCTV.length}</span> templates
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {templateCTV.map((template: ITemplate) => (
                    <TemplateCard key={template.id} template={template} onDelete={handleDelete} onUpdate={handleUpdate} />
                ))}
            </div>
        </div>
    )
}
