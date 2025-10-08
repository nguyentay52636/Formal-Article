import { FileText, Eye } from 'lucide-react'
import React from 'react'
import StatsCard from './StatsCard'
import { Edit } from 'lucide-react'

export default function ListCard() {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 container mx-auto cursor-pointer">
                <StatsCard
                    title="Tổng bài viết"
                    value="156"
                    subtitle="+12% so với tháng trước"
                    icon={<FileText className="h-6 w-6" />}
                    iconBgColor="bg-gradient-to-br cursor-pointer from-blue-500 to-blue-600"
                    iconColor="text-white"
                    subtitleColor="text-emerald-600"
                />
                <StatsCard
                    title="Đã xuất bản"
                    value="98"
                    subtitle="62.8% tổng số bài viết"
                    icon={<Eye className="h-6 w-6" />}
                    iconBgColor="bg-gradient-to-br cursor-pointer from-emerald-500 to-emerald-600"
                    iconColor="text-white"
                    subtitleColor="text-emerald-600"
                />
                <StatsCard
                    title="Bản nháp"
                    value="45"
                    subtitle="28.8% tổng số bài viết"
                    icon={<Edit className="h-6 w-6" />}
                    iconBgColor="bg-gradient-to-br cursor-pointer from-amber-500 to-amber-600"
                    iconColor="text-white"
                    subtitleColor="text-amber-600"
                />
                <StatsCard
                    title="Tổng lượt xem"
                    value="45.2K"
                    subtitle="+18% so với tuần trước"
                    icon={<Eye className="h-6 w-6" />}
                    iconBgColor="bg-gradient-to-br cursor-pointer from-purple-500 to-purple-600"
                    iconColor="text-white"
                    subtitleColor="text-purple-600"
                />
            </div>
        </>
    )
}
