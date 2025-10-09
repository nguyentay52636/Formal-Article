"use client"

import { StatsCards, QuickStats, ChartsSection, SidebarSection } from "./components"

export default function DashBoard() {
    return (
        <div className="space-y-6 bg-white!">
            <div>
                <h1 className="text-3xl font-bold">Tổng quan</h1>
                <p className="text-muted-foreground">Chào mừng trở lại! Đây là tổng quan hệ thống của bạn.</p>
            </div>

            <StatsCards />
            <QuickStats />

            <div className="grid gap-6 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <ChartsSection />
                </div>
                <div className="lg:col-span-3">
                    <SidebarSection />
                </div>
            </div>
        </div>
    )
}
