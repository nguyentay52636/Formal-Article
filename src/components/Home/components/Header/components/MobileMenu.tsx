import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { navItems } from "./router"

interface MobileMenuProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    user: {
        ten: string
        email: string
        avatar: string
        vaiTro: string
    } | null
}

export default function MobileMenu({ isOpen, setIsOpen, user }: MobileMenuProps) {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white text-black hover:bg-gray-100"
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-[40%] sm:w-[150px] px-6 py-6 overflow-y-auto"
            >
                <nav className="flex flex-col gap-6 mt-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* SEARCH */}
                    <div className="pt-4 border-t">
                        <Input
                            type="search"
                            placeholder="Tìm kiếm..."
                            className="w-full h-11 rounded-xl text-base"
                        />
                    </div>

                    {/* LOGIN / REGISTER */}
                    {!user && (
                        <div className="pt-4 border-t flex flex-col gap-3">
                            <Button
                                className="h-11 text-base rounded-xl"
                                asChild
                                onClick={() => setIsOpen(false)}
                            >
                                <Link href="/dang-nhap">Đăng nhập</Link>
                            </Button>

                            <Button
                                variant="outline"
                                className="h-11 text-base rounded-xl"
                                asChild
                                onClick={() => setIsOpen(false)}
                            >
                                <Link href="/dang-ky">Đăng ký</Link>
                            </Button>
                        </div>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
