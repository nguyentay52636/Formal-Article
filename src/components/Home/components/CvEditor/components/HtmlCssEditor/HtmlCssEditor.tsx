"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Code2, Eye, Save } from "lucide-react"
import { ITemplate } from "@/apis/templateApi"
import { useToast } from "@/hooks/use-toast"

interface HtmlCssEditorProps {
    template: ITemplate
    onSave?: (html: string, css: string) => void
}

export function HtmlCssEditor({ template, onSave }: HtmlCssEditorProps) {
    const [html, setHtml] = useState(template.html || "")
    const [css, setCss] = useState(template.css || "")
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("preview")
    const { toast } = useToast()

    const handleSave = () => {
        if (onSave) {
            onSave(html, css)
        }
        toast({
            title: "Đã lưu thay đổi",
            description: "HTML và CSS đã được cập nhật",
        })
    }

    return (
        <div className="h-full flex flex-col">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "edit" | "preview")} className="flex-1 flex flex-col">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                    <TabsList className="bg-gray-700">
                        <TabsTrigger value="preview" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Xem trước
                        </TabsTrigger>
                        <TabsTrigger value="edit" className="gap-2">
                            <Code2 className="w-4 h-4" />
                            Chỉnh sửa Code
                        </TabsTrigger>
                    </TabsList>

                    {activeTab === "edit" && (
                        <Button
                            onClick={handleSave}
                            size="sm"
                            className="gap-2 bg-green-600 hover:bg-green-700"
                        >
                            <Save className="w-4 h-4" />
                            Lưu thay đổi
                        </Button>
                    )}
                </div>

                <TabsContent value="preview" className="flex-1 m-0 p-0">
                    <div className="h-full overflow-auto bg-[#2C2C2C] p-8">
                        <Card className="bg-white shadow-2xl overflow-hidden mx-auto" style={{ maxWidth: '210mm', minHeight: '297mm' }}>
                            <style>{css}</style>
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="edit" className="flex-1 m-0 p-0 overflow-hidden">
                    <div className="grid grid-cols-2 gap-4 h-full p-4 bg-gray-900 overflow-hidden">
                        <div className="flex flex-col h-full">
                            <div className="bg-gray-800 px-3 py-2 text-white text-sm font-semibold border-b border-gray-700 rounded-t">
                                HTML
                            </div>
                            <Textarea
                                value={html}
                                onChange={(e) => setHtml(e.target.value)}
                                className="flex-1 font-mono text-sm bg-gray-800 text-white border-gray-700 rounded-t-none resize-none"
                                placeholder="Nhập HTML..."
                                style={{ fontFamily: 'monospace' }}
                            />
                        </div>

                        <div className="flex flex-col h-full">
                            <div className="bg-gray-800 px-3 py-2 text-white text-sm font-semibold border-b border-gray-700 rounded-t">
                                CSS
                            </div>
                            <Textarea
                                value={css}
                                onChange={(e) => setCss(e.target.value)}
                                className="flex-1 font-mono text-sm bg-gray-800 text-white border-gray-700 rounded-t-none resize-none"
                                placeholder="Nhập CSS..."
                                style={{ fontFamily: 'monospace' }}
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
