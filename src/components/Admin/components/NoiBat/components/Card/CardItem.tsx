import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, GripVertical, Settings } from "lucide-react"
import { Block, PositionLabels } from "../../types"

interface CardItemProps {
    block: Block
    positionLabels: PositionLabels
    onEdit: (block: Block) => void
    onDelete: (block: Block) => void
    onManageArticles: (block: Block) => void
}

export default function CardItem({ block, positionLabels, onEdit, onDelete, onManageArticles }: CardItemProps) {
    return (
        <Card key={block.id}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                        <div>
                            <CardTitle className="text-lg">{block.tieuDe}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                {positionLabels[block.viTri]} • {block.soBaiViet} bài viết
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={block.kichHoat ? "default" : "secondary"}>
                            {block.kichHoat ? "Kích hoạt" : "Tắt"}
                        </Badge>
                        <Button variant="ghost" size="icon" onClick={() => onManageArticles(block)}>
                            <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onEdit(block)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDelete(block)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}
