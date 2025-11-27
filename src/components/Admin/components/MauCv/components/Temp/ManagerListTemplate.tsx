"use client"
import { useMemo } from "react"
import { Loader2 } from "lucide-react"
import { useTemplate } from "@/hooks/useTemplate"
import { TemplateCard } from "./ItemCardTemplate"
import { ITemplate } from "@/apis/templateApi"

interface ManagerListTemplateProps {
    onEdit: (template: ITemplate) => void
    searchQuery?: string
    tagId?: number | "all"
}

export function ManagerListTemplate({ onEdit, searchQuery, tagId }: ManagerListTemplateProps) {
    const { templateCTV, loading, getTemplateCTV, deleteTemplate } = useTemplate()

    const handleDelete = async (id: number) => {
        await deleteTemplate(id)
        getTemplateCTV()
    }

    const handleUpdate = (template: ITemplate) => {
        onEdit(template)
    }

    const filteredTemplates = useMemo(() => {
        if (!templateCTV) return []
        return templateCTV.filter((template: ITemplate) => {
            const matchesSearch = searchQuery
                ? template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  template.slug.toLowerCase().includes(searchQuery.toLowerCase())
                : true
            const matchesTag =
                tagId === "all" || tagId === undefined
                    ? true
                    : template.tag?.id === tagId
            return matchesSearch && matchesTag
        })
    }, [searchQuery, tagId, templateCTV])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (!filteredTemplates || filteredTemplates.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-20 text-center">
                <p className="text-lg font-medium text-foreground">Không tìm thấy template</p>
                <p className="mt-1 text-sm text-muted-foreground">Hãy điều chỉnh bộ lọc hoặc tạo mẫu CV mới</p>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Hiển thị <span className="font-medium text-foreground">{filteredTemplates.length}</span> templates
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template: ITemplate) => (
                    <TemplateCard key={template.id} template={template} onDelete={handleDelete} onUpdate={handleUpdate} />
                ))}
            </div>
        </div>
    )
}
