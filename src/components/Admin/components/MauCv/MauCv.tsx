"use client"

import { useState } from "react"

import { ManagerListTemplate } from "./components/Temp/ManagerListTemplate"
import AddTemplateDialog from "./components/Dialog/AddTemplateDialog"
import EditTemplateDialog from "./components/Dialog/EditTemplateDialog"
import SearchBar from "./components/SearchBar"
import { ITemplate } from "@/apis/templateApi"

import { useTemplate } from "@/hooks/useTemplate"

export default function MauCv() {
    const { updateTemplate } = useTemplate()
    const [searchQuery, setSearchQuery] = useState("")
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<ITemplate | null>(null)

    const handleEdit = (template: ITemplate) => {
        setSelectedTemplate(template)
        setIsEditOpen(true)
    }

    const handleSave = async (template: ITemplate) => {
        if (!template.id) return
        await updateTemplate(template.id, template)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between my-4">
                <div>
                    <h1 className="text-4xl font-bold">Quản lý mẫu CV</h1>
                    <p className="text-muted-foreground">Quản lý tất cả mẫu CV trong hệ thống</p>
                </div>
                <AddTemplateDialog />
            </div>

            <div className="flex items-center gap-4">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <ManagerListTemplate onEdit={handleEdit} />

            <EditTemplateDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                template={selectedTemplate}
                onSave={handleSave}
            />
        </div>
    )
}
