import React from 'react'
import StatsCard from '@/components/Admin/components/MauCv/components/Cards/StatsCard'
import { Users, Shield, UserCheck, UserPlus } from 'lucide-react'

export default function ListCard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Tổng người dùng"
        value="248"
        subtitle="+18 người dùng mới"
        icon={<Users className="h-6 w-6" />}
        iconBgColor="bg-gradient-to-br from-cyan-500 to-cyan-600"
        iconColor="text-white"
        subtitleColor="text-emerald-600"
      />
      <StatsCard
        title="Quản trị viên"
        value="5"
        subtitle="2% tổng người dùng"
        icon={<Shield className="h-6 w-6" />}
        iconBgColor="bg-gradient-to-br from-red-500 to-red-600"
        iconColor="text-white"
        subtitleColor="text-red-600"
      />
      <StatsCard
        title="Đang kích hoạt"
        value="235"
        subtitle="94.8% tổng người dùng"
        icon={<UserCheck className="h-6 w-6" />}
        iconBgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
        iconColor="text-white"
        subtitleColor="text-emerald-600"
      />
      <StatsCard
        title="Mới tháng này"
        value="18"
        subtitle="+45% so với tháng trước"
        icon={<UserPlus className="h-6 w-6" />}
        iconBgColor="bg-gradient-to-br from-blue-500 to-blue-600"
        iconColor="text-white"
        subtitleColor="text-blue-600"
      />
    </div>
  )
}
