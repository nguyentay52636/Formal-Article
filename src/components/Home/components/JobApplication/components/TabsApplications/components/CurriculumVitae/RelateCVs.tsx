"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useTemplate } from "@/hooks/useTemplate"
import { Eye, Download, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface RelatedCVsProps {
    currentCvId: string
}

export function RelateCVs({ currentCvId }: RelatedCVsProps) {
    const { templateCTV } = useTemplate()

    // Filter out the current CV and ensure we have valid data
    const filtered = templateCTV.filter((t) => t.id !== Number(currentCvId))

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
                                        src={cv.previewUrl || "/placeholder.svg"}
                                        alt={cv.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start gap-2 p-3">
                                <h3 className="font-semibold text-xs line-clamp-2 leading-tight uppercase">{cv.name}</h3>
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
