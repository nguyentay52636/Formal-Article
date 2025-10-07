import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { TemplateItem } from './TemplateItem'
import { templates } from '@/mock/data'
import { PopularSidebar } from './PopularSidebar'
import { Pagination } from '@/components/ui/pagination'

export default function MainContent() {
    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Mẫu đơn mới nhất</h2>
                            <Button variant="ghost" className="gap-1">
                                Xem tất cả
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {templates.map((template: any) => (
                                <   TemplateItem key={template.id} {...template} />
                            ))}
                        </div>
                        <Pagination />
                    </div>
                    <aside className="hidden lg:block">
                        <PopularSidebar />
                    </aside>
                </div>
            </div>
        </section>
    )
}
