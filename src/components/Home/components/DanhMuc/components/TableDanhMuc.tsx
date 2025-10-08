import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, FolderTree, Trash2 } from 'lucide-react'
export type CategoryItem = {
    id: number
    ten: string
    duongDan: string
    danhMucCha: string | null
    moTa: string
    thuTu: number
    kichHoat: boolean
    soBaiViet: number
}

type Props = {
    categories: CategoryItem[]
    onEdit: (category: CategoryItem) => void
    onDelete: (category: CategoryItem) => void
}

export default function TableDanhMuc({ categories, onEdit, onDelete }: Props) {
    return (
        <>
            <div className="rounded-lg border border-border bg-card">

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên danh mục</TableHead>
                            <TableHead>Đường dẫn</TableHead>
                            <TableHead>Danh mục cha</TableHead>
                            <TableHead>Số bài viết</TableHead>
                            <TableHead>Thứ tự</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="w-[100px]">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        {category.danhMucCha && <FolderTree className="h-4 w-4 text-muted-foreground" />}
                                        {category.ten}
                                    </div>
                                </TableCell>
                                <TableCell className="font-mono text-sm">{category.duongDan}</TableCell>
                                <TableCell>{category.danhMucCha || "-"}</TableCell>
                                <TableCell>{category.soBaiViet}</TableCell>
                                <TableCell>{category.thuTu}</TableCell>
                                <TableCell>
                                    <Badge variant={category.kichHoat ? "default" : "secondary"}>
                                        {category.kichHoat ? "Kích hoạt" : "Tắt"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => onEdit(category)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => onDelete(category)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <PaginationProvider total={categories.length} initialPageSize={5}>
                    <PaginationCategory categories={categories} onEdit={onEdit} onDelete={onDelete} />
                </PaginationProvider> */}
            </div>
        </>
    )
}
