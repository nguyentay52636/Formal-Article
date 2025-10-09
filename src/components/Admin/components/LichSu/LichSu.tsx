"use client"

import { useState } from "react"
import HeaderSection from "./components/HeaderSection"
import SearchBar from "./components/SearchBar"
import ActivityTable from "./components/ActivityTable"
import { activities } from "./data"

export default function LichSu() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="space-y-6">
            <HeaderSection
                title="Lịch sử hoạt động"
                description="Theo dõi tất cả hoạt động trong hệ thống"
            />

            <div className="flex items-center gap-4">
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
            </div>

            <ActivityTable activities={activities} />
        </div>
    )
}
