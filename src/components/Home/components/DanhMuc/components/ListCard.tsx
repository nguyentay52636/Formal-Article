import React from 'react'
import StatsCard from '@/components/Admin/components/MauCv/components/Cards/StatsCard'
import { Folder, CheckCircle, BarChart3, FolderTree } from 'lucide-react'

export default function ListCard() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Tổng danh mục"
                value="24"
                subtitle="+3 danh mục mới"
                icon={<Folder className="h-6 w-6" />}
                iconBgColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
                iconColor="text-white"
                subtitleColor="text-emerald-600"
            />
            <StatsCard
                title="Đang kích hoạt"
                value="21"
                subtitle="87.5% tổng danh mục"
                icon={<CheckCircle className="h-6 w-6" />}
                iconBgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
                iconColor="text-white"
                subtitleColor="text-emerald-600"
            />
            <StatsCard
                title="Tổng bài viết"
                value="156"
                subtitle="Trong tất cả danh mục"
                icon={<BarChart3 className="h-6 w-6" />}
                iconBgColor="bg-gradient-to-br from-blue-500 to-blue-600"
                iconColor="text-white"
                subtitleColor="text-blue-600"
            />
            <StatsCard
                title="TB bài viết/danh mục"
                value="6.5"
                subtitle="Phân bố đều"
                icon={<FolderTree className="h-6 w-6" />}
                iconBgColor="bg-gradient-to-br from-purple-500 to-purple-600"
                iconColor="text-white"
                subtitleColor="text-purple-600"
            />
        </div>
    )
}
