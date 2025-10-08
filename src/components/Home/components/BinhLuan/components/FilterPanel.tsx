"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { X } from "lucide-react"

interface FilterPanelProps {
    filterStatus: string
    filterArticle: string
    onStatusChange: (value: string) => void
    onArticleChange: (value: string) => void
    onClearFilters: () => void
}

export default function FilterPanel({
    filterStatus,
    filterArticle,
    onStatusChange,
    onArticleChange,
    onClearFilters
}: FilterPanelProps) {
    return (
        <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Bộ lọc nâng cao</h3>
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Xóa bộ lọc
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Trạng thái</Label>
                    <Select value={filterStatus} onValueChange={onStatusChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tất cả trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả trạng thái</SelectItem>
                            <SelectItem value="da_duyet">Đã duyệt</SelectItem>
                            <SelectItem value="cho_duyet">Chờ duyệt</SelectItem>
                            <SelectItem value="spam">Spam</SelectItem>
                            <SelectItem value="xoa">Đã xóa</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Bài viết</Label>
                    <Select value={filterArticle} onValueChange={onArticleChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tất cả bài viết" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả bài viết</SelectItem>
                            <SelectItem value="1">Mẫu đơn xin việc ngành IT</SelectItem>
                            <SelectItem value="2">Đơn xin nghỉ phép có lý do</SelectItem>
                            <SelectItem value="3">Mẫu đơn xin thực tập</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Card>
    )
}
