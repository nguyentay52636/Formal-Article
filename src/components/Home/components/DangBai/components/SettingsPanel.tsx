"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { FileText } from "lucide-react"

type SettingsPanelProps = {
    trangThai: string
    ngayXuatBan: string
    onTrangThaiChange: (value: string) => void
    onNgayXuatBanChange: (value: string) => void
}

export function SettingsPanel({ trangThai, ngayXuatBan, onTrangThaiChange, onNgayXuatBanChange }: SettingsPanelProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cài đặt xuất bản</CardTitle>
                <CardDescription>Quản lý trạng thái và thời gian xuất bản bài viết</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="trangThai" className="text-base">
                        Trạng thái
                    </Label>
                    <Select value={trangThai} onValueChange={onTrangThaiChange}>
                        <SelectTrigger className="h-11">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="nhap">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    Nháp - Chưa công khai
                                </div>
                            </SelectItem>
                            <SelectItem value="xuat_ban">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    Xuất bản - Công khai ngay
                                </div>
                            </SelectItem>
                            <SelectItem value="luu_tru">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                                    Lưu trữ - Ẩn khỏi danh sách
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="ngayXuatBan" className="text-base">
                        Ngày xuất bản
                    </Label>
                    <Input
                        id="ngayXuatBan"
                        type="datetime-local"
                        value={ngayXuatBan}
                        onChange={(e) => onNgayXuatBanChange(e.target.value)}
                        className="h-11"
                    />
                    <p className="text-xs text-muted-foreground">
                        Để trống để xuất bản ngay lập tức, hoặc chọn thời gian để lên lịch xuất bản
                    </p>
                </div>

                <Separator />

                <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                        <strong>Lưu ý:</strong> Bài viết của bạn sẽ được kiểm duyệt trước khi xuất bản công khai. Thời gian kiểm duyệt thường từ 1-2 ngày làm việc.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
}


