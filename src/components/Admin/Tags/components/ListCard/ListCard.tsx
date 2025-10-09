import StatsCard from '@/components/Admin/components/BaiViet/components/Cards/StatsCard'
import { TrendingUp, BarChart } from 'lucide-react'
import { Hash, Tag } from 'lucide-react'
import React from 'react'
export default function ListCard() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tổng thẻ"
          value="68"
          subtitle="+8 thẻ mới"
          icon={<Hash className="h-6 w-6" />}
          iconBgColor="bg-gradient-to-br from-pink-500 to-pink-600"
          iconColor="text-white"
          subtitleColor="text-emerald-600"
        />
        <StatsCard
          title="Thẻ phổ biến nhất"
          value="Đơn xin việc"
          subtitle="45 bài viết"
          icon={<TrendingUp className="h-6 w-6" />}
          iconBgColor="bg-gradient-to-br from-orange-500 to-orange-600"
          iconColor="text-white"
          subtitleColor="text-orange-600"
        />
        <StatsCard
          title="TB bài viết/thẻ"
          value="2.3"
          subtitle="Phân bố tốt"
          icon={<BarChart className="h-6 w-6" />}
          iconBgColor="bg-gradient-to-br from-teal-500 to-teal-600"
          iconColor="text-white"
          subtitleColor="text-teal-600"
        />
        <StatsCard
          title="Tổng lượt sử dụng"
          value="156"
          subtitle="Trên tất cả bài viết"
          icon={<Tag className="h-6 w-6" />}
          iconBgColor="bg-gradient-to-br from-violet-500 to-violet-600"
          iconColor="text-white"
          subtitleColor="text-violet-600"
        />
      </div>
    </>
  )
}
