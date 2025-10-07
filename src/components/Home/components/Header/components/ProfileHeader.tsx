import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from 'lucide-react'
import { Shield, BookMarked, Settings, LogOut } from 'lucide-react'
interface ProfileHeaderProps {
    user: {
        ten: string
        email: string
        avatar: string
        vaiTro: string
    }
}
export default function ProfileHeader({ user }: ProfileHeaderProps) {


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.ten} />
                            <AvatarFallback>{user.ten.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.ten}</p>
                            <p className="text-xs leading-none text-dark">{user.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user.vaiTro === "quan_tri" && (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href="/quantri" className="cursor-pointer">
                                    <Shield className="mr-2 h-4 w-4" />
                                    <span>Quản trị</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </>
                    )}
                    <DropdownMenuItem asChild>
                        <Link href="/tai-lieu-cua-toi" className="cursor-pointer">
                            <BookMarked className="mr-2 h-4 w-4" />
                            <span>Tài liệu của tôi</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/tai-khoan" className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Cài đặt tài khoản</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Đăng xuất</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
