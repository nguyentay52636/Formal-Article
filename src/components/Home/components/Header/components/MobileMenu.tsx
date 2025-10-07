import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Link } from "lucide-react"
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
    }
}
export default function MobileMenu({ isOpen, setIsOpen, user }: MobileMenuProps) {
    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <nav className="flex flex-col gap-4 mt-8">
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
                        <div className="mt-4 pt-4 border-t">
                            <Input type="search" placeholder="Tìm kiếm..." className="w-full" />
                        </div>
                        {!user && (
                            <div className="mt-4 pt-4 border-t flex flex-col gap-2">
                                <Button asChild onClick={() => setIsOpen(false)}>
                                    <Link href="/dang-nhap">Đăng nhập</Link>
                                </Button>
                                <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                                    <Link href="/dang-ky">Đăng ký</Link>
                                </Button>
                            </div>
                        )}
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )
}
