"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface BreadcrumbsProps {
    name: string
}

export function Breadcrumbs({ name }: BreadcrumbsProps) {
    return (
        <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
                <li>
                    <Link href="/" className="text-primary hover:underline font-medium transition-colors">
                        Trang chủ
                    </Link>
                </li>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <li>
                    <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                        Mẫu CV
                    </Link>
                </li>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <li className="text-muted-foreground line-clamp-1">{name}</li>
            </ol>
        </nav>
    )
}

