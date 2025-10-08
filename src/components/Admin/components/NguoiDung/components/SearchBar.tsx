"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, Search, X } from 'lucide-react'

type Props = {
    value: string
    onChange: (value: string) => void
    showFilters: boolean
    onToggleFilters: () => void
    activeFiltersCount: number
    onClearFilters: () => void
}

export default function SearchBar({ value, onChange, showFilters, onToggleFilters, activeFiltersCount, onClearFilters }: Props) {
    return (
        <div className="flex items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Tìm kiếm người dùng..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-10"
                />
            </div>
            <Button
                variant={showFilters ? 'default' : 'outline'}
                onClick={onToggleFilters}
                className="relative"
            >
                <Filter className="mr-2 h-4 w-4" />
                Bộ lọc
                {activeFiltersCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {activeFiltersCount}
                    </Badge>
                )}
            </Button>
            {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Xóa bộ lọc
                </Button>
            )}
        </div>
    )
}
