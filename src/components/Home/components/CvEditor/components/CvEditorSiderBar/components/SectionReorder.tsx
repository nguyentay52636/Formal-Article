"use client"

import { Label } from "@/components/ui/label"
import { Layers, GripVertical, Eye, EyeOff } from "lucide-react"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Section } from "../../../types/editor-settings"

interface SectionReorderProps {
    sections: Section[]
    onSectionsChange: (sections: Section[]) => void
}

interface SortableItemProps {
    section: Section
    onToggleVisibility: (id: string) => void
}

function SortableItem({ section, onToggleVisibility }: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${section.visible ? "bg-[#2C2C2C]" : "bg-[#1E1E1E] opacity-60"
                }`}
        >
            <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300">
                <GripVertical className="w-4 h-4" />
            </button>
            <span className={`flex-1 text-sm ${section.visible ? "text-gray-200" : "text-gray-500"}`}>
                {section.label}
            </span>
            <button
                onClick={() => onToggleVisibility(section.id)}
                className={`p-1 rounded transition-colors ${section.visible ? "text-green-400 hover:text-green-300" : "text-gray-500 hover:text-gray-400"
                    }`}
            >
                {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
        </div>
    )
}

export function SectionReorder({ sections, onSectionsChange }: SectionReorderProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            const oldIndex = sections.findIndex((s) => s.id === active.id)
            const newIndex = sections.findIndex((s) => s.id === over.id)
            onSectionsChange(arrayMove(sections, oldIndex, newIndex))
        }
    }

    const toggleVisibility = (id: string) => {
        onSectionsChange(
            sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
        )
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-white" />
                <Label className="text-white font-semibold">Sắp xếp mục</Label>
                <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full">PRO</span>
            </div>
            <div className="space-y-2">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                        {sections.map((section) => (
                            <SortableItem key={section.id} section={section} onToggleVisibility={toggleVisibility} />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
            <p className="text-xs text-gray-500 mt-3">Kéo thả để sắp xếp • Click 👁 để ẩn/hiện</p>
        </div>
    )
}

