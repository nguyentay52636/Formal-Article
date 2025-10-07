"use client"

import Link from "next/link"
import { Search, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ProfileHeader from "./components/ProfileHeader"
import { navItems } from "./components/router"
import MobileMenu from "./components/MobileMenu"

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const user = {
        ten: "John Doe",
        email: "john.doe@example.com",
        avatar: "/placeholder.svg",
        vaiTro: "quan_tri",
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-[#107bbd]! border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-">
                <div className="flex h-20 items-center justify-between ">
                    <Link href="/" className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-white" />
                        <span className="text-xl font-bold text-white">Mẫu Đơn</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 hover:text-gray-300! ">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-xl font-bold text-white!  transition-colors hover:text-gray-300! "
                            >
                                <span className=" font-bold text-white! hover:text-foreground transition-colors">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <div className="hidden lg:flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute text-white!  font-bold left-3 top-1/2 h-8 w- -translate-y-1/2 " />
                                <Input type="search" placeholder="Tìm kiếm mẫu đơn..." className="w-64 pl-9 text-white! font-sm" />
                            </div>
                        </div>

                        <Button variant="outline" size="icon" className="lg:hidden text-white!">
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* {user ? (
                            <ProfileHeader user={user} />
                        ) : (
                            <div className="hidden md:flex items-center gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/dang-nhap">Đăng nhập</Link>
                                </Button>
                                <Button size="sm" asChild>
                                    <Link href="/dang-ky">Đăng ký</Link>
                                </Button>
                            </div>
                        )} */}
                        <div className="hidden md:flex items-center gap-4 mx-4">
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/dang-nhap" className="text-md! font-bold">Đăng nhập</Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/dang-ky" className="text-md! font-bold">Đăng ký</Link>
                            </Button>
                        </div>

                        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
                    </div>
                </div>
            </div>
        </header>
    )
}
