import StatsCard from '@/components/Admin/components/MauCv/components/Cards/StatsCard'
import { TrendingUp, BarChart, Hash, Tag } from 'lucide-react'
import React from 'react'
import { TagsStats } from '../../types'
import { Skeleton } from '@/components/ui/skeleton'

type ListCardProps = {
  stats: TagsStats
  loading?: boolean
}

export default function ListCard({ stats, loading }: ListCardProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
    )
  }

  const formattedAverage = stats.averageTemplatesPerTag
    ? stats.averageTemplatesPerTag.toFixed(1)
    : "0"

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Tổng thẻ"
        value={stats.totalTags}
        subtitle="Số thẻ đang hoạt động"
        icon={<Hash className="h-6 w-6" />}
        iconBgColor="bg-gradient-to-br from-pink-500 to-pink-600"
        iconColor="text-white"
        subtitleColor="text-emerald-600"
      />
      <StatsCard
        title="Thẻ phổ biến nhất"
        value={stats.mostPopularTag?.name || "Chưa có dữ liệu"}
        subtitle={`${stats.mostPopularTag?.templateCount ?? 0} template`}
        icon={<TrendingUp className="h-6 w-6" />}
        iconBgColor="bg-gradient-to-br from-orange-500 to-orange-600"
        iconColor="text-white"
        subtitleColor="text-orange-600"
      />
      <StatsCard
        title="TB template / thẻ"
        value={formattedAverage}
        subtitle="Phân bố trung bình"
        icon={<BarChart className="h-6 w-6" />}
        iconBgColor="bg-gradient-to-br from-teal-500 to-teal-600"
        iconColor="text-white"
        subtitleColor="text-teal-600"
      />
      <StatsCard
        title="Tổng số template"
        value={stats.totalTemplates}
        subtitle="Gắn với toàn bộ thẻ"
        icon={<Tag className="h-6 w-6" />}
        iconBgColor="bg-gradient-to-br from-violet-500 to-violet-600"
        iconColor="text-white"
        subtitleColor="text-violet-600"
      />
    </div>
  )
}
