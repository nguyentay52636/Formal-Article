"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
interface ActionUsedTemplateProps {
  id: number
}
export default function ActionUsedTemplate({ id }: ActionUsedTemplateProps) {
  return (
    <>
      <Button
        size="lg"
        className="w-full text-white bg-[#ed145b]! hover:bg-[#ed145b]/90! text-white font-bold text-lg h-14 shadow-lg hover:shadow-xl transition-all"
        asChild
      >
        <Link href={`/chinh-sua-don/${id}`}>DÙNG NGAY MẪU CV NÀY</Link>
      </Button>
    </>
  )
}
