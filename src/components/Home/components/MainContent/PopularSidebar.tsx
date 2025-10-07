"use client";

import Link from "next/link";
import { Eye, MessageCircle, Clock } from "lucide-react";
import Image from "next/image";

interface PopularItem {
    id: number;
    title: string;
    slug: string;
    views: number;
    comments: number;
    time: number;
}

const popularItems: PopularItem[] = [
    { id: 1, title: "Mẫu đơn xin việc viết tay đơn giản", slug: "don-xin-viec-viet-tay-don-gian", views: 62950, comments: 2, time: 1 },
    { id: 2, title: "Mẫu đơn xin việc ngành y tế", slug: "don-xin-viec-nganh-y-te", views: 33950, comments: 0, time: 2 },
    { id: 3, title: "Mẫu đơn xin việc viết tay chuẩn nhất hiện nay", slug: "don-xin-viec-chuan-nhat", views: 26400, comments: 1, time: 1 },
    { id: 4, title: "Mẫu đơn xin nghỉ phép tại Trung tâm Giáo dục quốc phòng an ninh Vinh", slug: "don-xin-nghi-phep-trung-tam", views: 26378, comments: 6, time: 2 },
    { id: 5, title: "Mẫu đơn xin việc viết tay dành cho sinh viên mới ra trường", slug: "don-xin-viec-sinh-vien", views: 25420, comments: 0, time: 1 },
    { id: 6, title: "Đơn trình bày nguyện vọng", slug: "don-trinh-bay-nguyen-vong", views: 23724, comments: 0, time: 2 },
    { id: 7, title: "Đơn xin ra khỏi Đảng của đảng viên", slug: "don-xin-ra-khoi-dang", views: 23473, comments: 0, time: 2 },
    { id: 8, title: "Đơn xin chuyển công tác trung tâm y tế huyện Phú Bình", slug: "don-xin-chuyen-cong-tac", views: 22599, comments: 0, time: 2 },
    { id: 9, title: "Mẫu đơn xin việc chung", slug: "don-xin-viec-chung", views: 21520, comments: 0, time: 1 },
];

export function PopularSidebar() {
    return (
        <div className="bg-white border rounded-sm overflow-hidden">
            {/* Tiêu đề */}
            <div className="bg-[#0d83c7] text-white text-sm font-semibold px-3 py-2">
                TÀI LIỆU HAY
            </div>

            {/* Danh sách */}
            <div className="divide-y">
                {popularItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`/mau-don/${item.slug}`}
                        className="flex items-start gap-3 p-3 hover:bg-gray-50 transition"
                    >
                        {/* Icon DOC */}
                        <div className="flex-shrink-0">
                            <div className="bg-[#1e90ff] text-white text-[10px] font-bold w-8 h-10 flex items-center justify-center rounded-sm">
                                DOC
                            </div>
                        </div>

                        {/* Nội dung */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium leading-snug line-clamp-2 hover:text-[#0d83c7] transition-colors">
                                {item.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {item.time}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {item.views.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageCircle className="w-3 h-3" />
                                    {item.comments}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
