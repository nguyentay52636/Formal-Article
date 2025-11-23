"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Shield, LogOut } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { selectAuth, logout } from "@/redux/Slice/authSlice"
import { AppDispatch } from "@/redux/store"
import { SwitchMode } from "@/components/SwitchMode"
import BubbleChat from "../../Chat/components/BubbleChat/BubbleChat"

export function UserMenu() {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector(selectAuth)

    const handleLogout = () => {
        dispatch(logout())
        router.push("/")
    }

    // Get user initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <>
            <div className="flex items-center mx-4">
                <div className="mr-4 flex gap-4">
                    <SwitchMode />
                    <BubbleChat />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full hover:ring-2 hover:ring-primary/30 transition-all duration-300 hover:scale-105"
                        >
                            <Avatar className="h-10 w-10 sm:h-11 sm:w-11 ring-2 ring-border/50 hover:ring-primary/50 transition-all duration-300">
                                <AvatarImage src={user?.avatar || "/diverse-user-avatars.png"} alt={user?.fullName || "User"} />
                                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-bold text-base sm:text-lg">
                                    {user?.fullName ? getInitials(user.fullName) : "U"}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 shadow-xl border-border/50" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-2 p-2">
                                <p className="text-base font-semibold leading-none">{user?.fullName}</p>
                                <p className="text-sm leading-none text-muted-foreground">
                                    {user?.email}
                                </p>
                                <Badge variant="secondary" className="w-fit">
                                    {user?.roleId}
                                </Badge>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/ho-so" className="cursor-pointer py-3">
                                <User className="mr-3 h-5 w-5" />
                                <span className="text-base">Hồ sơ</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/quantri" className="cursor-pointer py-3">
                                <Shield className="mr-3 h-5 w-5" />
                                <span className="text-base">Quản trị</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="cursor-pointer text-destructive py-3"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            <span className="text-base">Đăng xuất</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}

