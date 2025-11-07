"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Eye, Download, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface RelatedCVsProps {
    currentCvId: string
}

const relatedTemplates = [
    {
        id: "2",
        title: "MẪU CV NHÂN VIÊN TƯ VẤN",
        views: 7704,
        downloads: 3210,
        image: "/list-item/elegant-cv-template-with-professional-photo.jpg",
    },
    {
        id: "3",
        title: "MẪU CV GIÁM ĐỐC QUẢN HỆ KHÁCH HÀNG DOANH NGHIỆP",
        views: 2771,
        downloads: 1523,
        image: "/list-item/modern-cv-template-with-orange-and-dark-sections.jpg",
    },
    {
        id: "4",
        title: "MẪU CV CHUYÊN VIÊN ĐÀO TẠO NỘI BỘ",
        views: 3879,
        downloads: 1876,
        image: "/list-item/clean-cv-template-with-simple-layout.jpg",
    },
    {
        id: "5",
        title: "MẪU CV THU NGÂN",
        views: 5410,
        downloads: 2634,
        image: "/list-item/colorful-cv-template-with-teal-and-orange.jpg",
    },
    {
        id: "6",
        title: "MẪU CV HÀNH CHÍNH VĂN PHÒNG",
        views: 4794,
        downloads: 2109,
        image: "/list-item/elegant-cv-template-with-purple-accent.jpg",
    },
    {
        id: "7",
        title: "MẪU CV XIN VIỆC PHỤC VỤ",
        views: 2224,
        downloads: 1234,
        image: "/list-item/simple-green-cv-template.jpg",
    },
    {
        id: "8",
        title: "MẪU CV QUẢN TRỊ KINH DOANH",
        views: 2443,
        downloads: 1543,
        image: "/list-item/professional-cv-with-green-sidebar.jpg",
    },
    {
        id: "9",
        title: "MẪU CV XIN VIỆC NGÀNH MÁY",
        views: 2139,
        downloads: 987,
        image: "/list-item/technical-cv-template-with-red-accents.jpg",
    },
    {
        id: "10",
        title: "MẪU CV XIN VIỆC ĐIỀU DƯỠNG",
        views: 1614,
        downloads: 923,
        image: "/list-item/healthcare-cv-with-professional-layout.jpg",
    },
]

export function RelateCVs({ currentCvId }: RelatedCVsProps) {
    const filtered = relatedTemplates.filter((t) => t.id !== currentCvId)

    return (
        <section className="container mx-auto px-4 pb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Các mẫu CV tiếng Việt khác</h2>
                <Link href="/" className="text-[#0066CC] hover:underline flex items-center gap-1 text-sm font-semibold">
                    XEM TẤT CẢ
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.slice(0, 10).map((cv) => (
                    <Link key={cv.id} href={`/don-xin-viec/${cv.id}`}>
                        <Card className="group hover:shadow-lg transition-all overflow-hidden h-full">
                            <CardContent className="p-0">
                                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                                    <Image
                                        src={cv.image || "/placeholder.svg"}
                                        alt={cv.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start gap-2 p-3">
                                <h3 className="font-semibold text-xs line-clamp-2 leading-tight uppercase">{cv.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground w-full">
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        <span>{cv.views.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Download className="w-3 h-3" />
                                        <span>{cv.downloads.toLocaleString()}</span>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}
