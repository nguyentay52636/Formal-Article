import React from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical, Eye, Edit, Trash2 } from 'lucide-react'

export type Article = {
    id: number
    tieuDe: string
    danhMuc: string
    tacGia: string
    trangThai: 'xuat_ban' | 'nhap' | 'luu_tru'
    luotXem: number
    ngayXuatBan: string | null
}

interface TablePostProps {
    articles: Article[]
    onEdit: (article: Article) => void
    onDelete: (article: Article) => void
}

const statusColors: Record<Article['trangThai'], string> = {
    xuat_ban: 'bg-accent text-accent-foreground',
    nhap: 'bg-secondary text-secondary-foreground',
    luu_tru: 'bg-muted text-muted-foreground',
}

const statusLabels: Record<Article['trangThai'], string> = {
    xuat_ban: 'Xuất bản',
    nhap: 'Nháp',
    luu_tru: 'Lưu trữ',
}

export default function TablePost({ articles, onEdit, onDelete }: TablePostProps) {
    return (
        <>
            <div className="rounded-lg border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tiêu đề</TableHead>
                            <TableHead>Danh mục</TableHead>
                            <TableHead>Tác giả</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Lượt xem</TableHead>
                            <TableHead>Ngày xuất bản</TableHead>
                            <TableHead className="w-[70px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articles.map((article) => (
                            <TableRow key={article.id}>
                                <TableCell className="font-medium">{article.tieuDe}</TableCell>
                                <TableCell>{article.danhMuc}</TableCell>
                                <TableCell>{article.tacGia}</TableCell>
                                <TableCell>
                                    <Badge className={statusColors[article.trangThai]}>
                                        {statusLabels[article.trangThai]}
                                    </Badge>
                                </TableCell>
                                <TableCell>{article.luotXem.toLocaleString()}</TableCell>
                                <TableCell>{article.ngayXuatBan || "-"}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Eye className="mr-2 h-4 w-4" />
                                                Xem
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEdit(article)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Sửa
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={() => onDelete(article)}>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Xóa
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
