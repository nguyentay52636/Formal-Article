import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Bookmark, Share2 } from "lucide-react"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
export default function SiderDownload() {
  return (
    <>
      <aside className="space-y-6">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Tải xuống mẫu đơn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" size="lg">
              <Download className="mr-2 h-5 w-5" />
              Tải xuống miễn phí
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full bg-transparent">
                <Bookmark className="mr-2 h-4 w-4" />
                Lưu
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Share2 className="mr-2 h-4 w-4" />
                Chia sẻ
              </Button>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Định dạng:</span>
                <span className="font-medium">DOCX, PDF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kích thước:</span>
                <span className="font-medium">45 KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trang:</span>
                <span className="font-medium">1 trang</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground leading-relaxed">
              Mẫu đơn này được thiết kế chuyên nghiệp và hoàn toàn miễn phí. Bạn có thể tải xuống và chỉnh sửa
              theo nhu cầu của mình.
            </p>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-semibold">Phù hợp cho:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Sinh viên mới ra trường</li>
                <li>• Người tìm việc lần đầu</li>
                <li>• Ứng viên không có kinh nghiệm</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </aside>
    </>
  )
}
