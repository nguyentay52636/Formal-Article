"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface BackButtonProps {
    href?: string
    label?: string
}

export function BackButton({ href = "/", label = "Trang chủ" }: BackButtonProps) {
    return (
        <Link href={href}>
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                <ChevronLeft className="w-4 h-4 mr-1" />
                {label}
            </Button>
        </Link>
    )
}
