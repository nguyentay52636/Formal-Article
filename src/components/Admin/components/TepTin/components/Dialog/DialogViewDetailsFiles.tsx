import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import React from 'react'
import { fileTypeLabels } from '../../TepTin'
import { formatFileSize } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { DialogFooter } from '@/components/ui/dialog'
interface DialogViewDetailsFilesProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedFile: any | null
    setIsViewDialogOpen: (open: boolean) => void
}
export default function DialogViewDetailsFiles({ open, setIsViewDialogOpen, onOpenChange, selectedFile }: DialogViewDetailsFilesProps) {
    return (
        <>
            <Dialog open={open} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Chi tiết tệp tin</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-muted-foreground">Tên tệp</Label>
                                <p className="font-medium">{selectedFile?.tenTapTin}</p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Loại</Label>
                                <p className="font-medium">{fileTypeLabels[selectedFile?.loai as keyof typeof fileTypeLabels]}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-muted-foreground">Định dạng</Label>
                                <p className="font-medium uppercase">{selectedFile?.dinhDang}</p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Kích thước</Label>
                                <p className="font-medium">{selectedFile && formatFileSize(selectedFile.kichThuoc)}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-muted-foreground">Người tải lên</Label>
                                <p className="font-medium">{selectedFile?.nguoiTai}</p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">Ngày tạo</Label>
                                <p className="font-medium">{selectedFile?.ngayTao}</p>
                            </div>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">Đường dẫn lưu trữ</Label>
                            <p className="font-mono text-sm">/uploads/2025/01/{selectedFile?.tenTapTin}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">Lượt tải xuống</Label>
                            <p className="font-medium">{selectedFile?.luotTai.toLocaleString()}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                            Đóng
                        </Button>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Tải xuống
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
