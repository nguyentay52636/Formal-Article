import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { Download, Eye, FileText, File, ImageIcon, Trash2 } from 'lucide-react'
import { formatFileSize } from '@/lib/utils'
import { fileTypeIcons } from '../TepTin'
import { fileTypeLabels } from '../TepTin'


const fileTypeColors = {
    anh: "bg-secondary text-secondary-foreground",
    tai_lieu: "bg-primary text-primary-foreground",
    khac: "bg-muted text-muted-foreground",
}


interface TableFilesProps {
    files: any[]
    handleView: (file: any) => void
    handleDelete: (file: any) => void
}
export default function TableFiles({ files, handleView, handleDelete }: TableFilesProps) {
    return (
        <>
            <div className="rounded-lg border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên tệp</TableHead>
                            <TableHead>Loại</TableHead>
                            <TableHead>Định dạng</TableHead>
                            <TableHead>Kích thước</TableHead>
                            <TableHead>Người tải</TableHead>
                            <TableHead>Lượt tải</TableHead>
                            <TableHead>Ngày tạo</TableHead>
                            <TableHead className="w-[120px]">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {files.map((file) => {
                            const Icon = fileTypeIcons[file.loai as keyof typeof fileTypeIcons]
                            return (
                                <TableRow key={file.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Icon className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{file.tenTapTin}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={fileTypeColors[file.loai as keyof typeof fileTypeColors]}>
                                            {fileTypeLabels[file.loai as keyof typeof fileTypeLabels]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-mono text-sm uppercase">{file.dinhDang}</span>
                                    </TableCell>
                                    <TableCell>{formatFileSize(file.kichThuoc)}</TableCell>
                                    <TableCell>{file.nguoiTai}</TableCell>
                                    <TableCell>{file.luotTai.toLocaleString()}</TableCell>
                                    <TableCell>{file.ngayTao}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" onClick={() => handleView(file)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(file)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>

        </>
    )
}
