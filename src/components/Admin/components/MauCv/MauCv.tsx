"use client"

import { useEffect, useState } from "react"

import { ManagerListTemplate } from "./components/Temp/ManagerListTemplate"
import AddTemplateDialog from "./components/Dialog/AddTemplateDialog"
import EditTemplateDialog from "./components/Dialog/EditTemplateDialog"
import SearchBar from "./components/SearchBar"
import { ITemplate } from "@/apis/templateApi"

import { useTemplate } from "@/hooks/useTemplate"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ITag } from "@/apis/types"
import { getAllTags } from "@/apis/tagApi"

export default function MauCv() {
    const { updateTemplate } = useTemplate()
    const [searchQuery, setSearchQuery] = useState("")
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<ITemplate | null>(null)
    const [tags, setTags] = useState<ITag[]>([])
    const [selectedTag, setSelectedTag] = useState<string>("all")

    useEffect(() => {
        const fetchTags = async () => {
            const data = await getAllTags()
            if (Array.isArray(data)) {
                setTags(data)
            }
        }
        fetchTags()
    }, [])

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

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                <div className="w-full lg:w-64">
                    <Select value={selectedTag} onValueChange={setSelectedTag}>
                        <SelectTrigger>
                            <SelectValue placeholder="Lọc theo tag" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả tag</SelectItem>
                            {tags.map((tag) => (
                                <SelectItem key={tag.id} value={tag.id?.toString() ?? ""}>
                                    {tag.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <ManagerListTemplate
                onEdit={handleEdit}
                searchQuery={searchQuery}
                tagId={selectedTag === "all" ? "all" : Number(selectedTag)}
            />

            <EditTemplateDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                template={selectedTemplate}
                onSave={handleSave}
            />
        </div>
    )
}
