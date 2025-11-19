"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"
import { SwitchMode } from "@/components/SwitchMode"


export function AuthActions() {
    return (
        <div className="hidden md:flex items-center gap-4 mx-8">
            <SwitchMode />
            <Button variant="outline" size="lg" asChild>
                <Link href="/dang-nhap" className="text-md! font-bold">Đăng nhập</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
                <Link href="/dang-ky" className="text-md! font-bold">Đăng ký</Link>
            </Button>

        </div>
    )
}

