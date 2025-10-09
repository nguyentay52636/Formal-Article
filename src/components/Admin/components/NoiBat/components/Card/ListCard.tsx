import React from 'react'
import CardItem from './CardItem'
import { Block, PositionLabels } from "../../types"

interface ListCardProps {
    featuredBlocks: Block[]
    positionLabels: PositionLabels
    onEdit: (block: Block) => void
    onDelete: (block: Block) => void
    onManageArticles: (block: Block) => void
}

export default function ListCard({ featuredBlocks, positionLabels, onEdit, onDelete, onManageArticles }: ListCardProps) {
    return (
        <div className="grid gap-4">
            {featuredBlocks.map((block) => (
                <CardItem
                    key={block.id}
                    block={block}
                    positionLabels={positionLabels}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onManageArticles={onManageArticles}
                />
            ))}
        </div>
    )
}
