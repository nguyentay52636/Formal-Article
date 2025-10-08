"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

type Props = {
    filterRole: string
    filterStatus: string
    onRoleChange: (value: string) => void
    onStatusChange: (value: string) => void
    onClearFilters: () => void
}

export default function FilterPanel({
    filterRole,
    filterStatus,
    onRoleChange,
    onStatusChange,
    onClearFilters
}: Props) {
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
                    <Label>Vai trò</Label>
                    <Select value={filterRole} onValueChange={onRoleChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tất cả vai trò" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả vai trò</SelectItem>
                            <SelectItem value="quan_tri">Quản trị viên</SelectItem>
                            <SelectItem value="bien_tap">Biên tập viên</SelectItem>
                            <SelectItem value="tac_gia">Tác giả</SelectItem>
                            <SelectItem value="doc_gia">Độc giả</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Trạng thái</Label>
                    <Select value={filterStatus} onValueChange={onStatusChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tất cả trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả trạng thái</SelectItem>
                            <SelectItem value="active">Kích hoạt</SelectItem>
                            <SelectItem value="inactive">Tắt</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Card>
    )
}
