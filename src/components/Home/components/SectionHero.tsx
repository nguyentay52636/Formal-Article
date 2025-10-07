import React from 'react'

export default function SectionHero() {
    return (
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
                        Thư viện mẫu đơn xin việc miễn phí
                    </h1>
                    <p className="text-lg text-muted-foreground text-pretty">
                        Tìm kiếm và tải xuống các mẫu đơn xin việc, đơn xin nghỉ, đơn xin chuyển công tác và nhiều loại đơn khác
                        hoàn toàn miễn phí
                    </p>
                </div>
            </div>
        </section>
    )
}
