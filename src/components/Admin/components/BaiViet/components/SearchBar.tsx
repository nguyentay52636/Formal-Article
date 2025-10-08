"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchBarAdvancedProps {
    value: string
    onChange: (value: string) => void
    onFilterChange?: (filters: Record<string, string>) => void
}

export default function SearchBarAdvanced({
    value,
    onChange,
    onFilterChange,
}: SearchBarAdvancedProps) {
    const [filters, setFilters] = useState({
        category: "",
        status: "",
        sort: "",
    })

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)
        onFilterChange?.(newFilters)
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full ">
            {/* Ô tìm kiếm */}
            <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                    placeholder="Tìm kiếm bài viết..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="
            pl-12 pr-4 py-2 
            text-[15px]
            rounded-2xl 
            border border-gray-300
            focus-visible:ring-2 focus-visible:ring-[#107bbd] 
            focus-visible:ring-offset-0
            shadow-sm
            transition-all duration-200
            hover:border-[#107bbd]
            placeholder:text-gray-400
          "
                />
            </div>

            {/* Nút lọc nâng cao */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="rounded-2xl border-gray-300 hover:border-[#107bbd] flex items-center gap-2"
                    >
                        <SlidersHorizontal className="h-4 w-4 text-[#107bbd]" />
                        Bộ lọc
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-4 space-y-4">
                    <div className="space-y-2">
                        <Label>Danh mục</Label>
                        <Select
                            onValueChange={(value) => handleFilterChange("category", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="congnghe">Công nghệ</SelectItem>
                                <SelectItem value="giaoduc">Giáo dục</SelectItem>
                                <SelectItem value="kinhte">Kinh tế</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Trạng thái</Label>
                        <Select
                            onValueChange={(value) => handleFilterChange("status", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="published">Đã đăng</SelectItem>
                                <SelectItem value="draft">Nháp</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Sắp xếp theo</Label>
                        <Select onValueChange={(value) => handleFilterChange("sort", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn kiểu sắp xếp" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Mới nhất</SelectItem>
                                <SelectItem value="oldest">Cũ nhất</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
