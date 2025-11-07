"use client"

import { Card } from "@/components/ui/card"

export function CvUsageGuideCard() {
    return (
        <Card className="p-6 lg:p-8 space-y-4 bg-secondary/30">
            <h3 className="text-xl font-bold">Hướng dẫn sử dụng mẫu CV</h3>
            <ol className="space-y-3">
                <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                        1
                    </span>
                    <p className="text-sm leading-relaxed text-white">
                        Nhấn nút <strong className="text-white">"DÙNG NGAY MẪU CV NÀY"</strong> để truy cập vào trình soạn thảo CV
                    </p>
                </li>
                <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                        2
                    </span>
                    <p className="text-sm leading-relaxed">
                        Điền thông tin cá nhân, kinh nghiệm làm việc, học vấn và các kỹ năng của bạn
                    </p>
                </li>
                <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                        3
                    </span>
                    <p className="text-sm leading-relaxed">
                        Tùy chỉnh màu sắc, font chữ và bố cục cho phù hợp với phong cách của bạn
                    </p>
                </li>
                <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                        4
                    </span>
                    <p className="text-sm leading-relaxed">Tải xuống CV dưới dạng PDF hoặc lưu lại để chỉnh sửa sau</p>
                </li>
            </ol>
        </Card>
    )
}

