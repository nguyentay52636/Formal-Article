import React from 'react'
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchActionsProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export default function SearchActions({ searchQuery, setSearchQuery }: SearchActionsProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Tìm kiếm khối nổi bật..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>
        </div>
    )
}
