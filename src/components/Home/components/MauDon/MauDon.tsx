
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Eye, Calendar, User } from "lucide-react"
import { TemplateItem } from "@/components/Home/components/MainContent/TemplateItem"
import SiderDownload from "./components/SiderDownload"
import { relatedTemplates, template } from "./data"


export default function MauDon() {
    return (
        <div className="min-h-screen flex flex-col text-[14px]!  ">

            <main className="flex-1 py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <Badge variant="secondary">{template.category}</Badge>
                                <h1 className="text-3xl md:text-4xl font-bold text-balance">{template.title}</h1>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        <span>{template.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(template.publishedDate).toLocaleDateString("vi-VN")}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        <span>{template.views.toLocaleString()} lượt xem</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Download className="h-4 w-4" />
                                        <span>{template.downloads.toLocaleString()} lượt tải</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <Card>
                                <CardContent className="p-6">
                                    <div className="aspect-[3/4] max-w-2xl mx-auto bg-muted rounded-lg overflow-hidden">
                                        <img
                                            src={template.thumbnail || "/placeholder.svg"}
                                            alt={template.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Mô tả</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">{template.description}</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Hướng dẫn sử dụng</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div
                                        className="prose prose-sm max-w-none dark:prose-invert"
                                        dangerouslySetInnerHTML={{ __html: template.content }}
                                    />
                                </CardContent>
                            </Card>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">Mẫu đơn liên quan</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {relatedTemplates.map((template: any) => (
                                        <TemplateItem key={template.id} {...template} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <SiderDownload />
                    </div>
                </div>
            </main>

        </div>
    )
}
