"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    ChevronLeft,
    ChevronRight,
    Icon,
    Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { menuItems } from "./router"



export function SiderAdmin() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("admin-sidebar-collapsed")
        if (saved !== null) {
            setIsCollapsed(saved === "true")
        }
    }, [])

    const toggleCollapsed = () => {
        const newState = !isCollapsed
        setIsCollapsed(newState)
        localStorage.setItem("admin-sidebar-collapsed", String(newState))
        window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: { collapsed: newState } }))
    }

    return (
        <TooltipProvider delayDuration={0}>
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300 ease-in-out",
                    isCollapsed ? "w-20" : "w-64",
                )}
            >
                <div className="flex h-16 relative items-center justify-between border-b border-border px-4">
                    <Link href="/quantri" className={cn("flex items-center gap-3 transition-all", isCollapsed && "gap-0")}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#107bbd] text-white ">
                            <LayoutDashboard className="h-5 w-5" />
                        </div>
                        {!isCollapsed && (
                            <span className="text-lg font-bold text-[#107bbd]">
                                Quản Trị
                            </span>
                        )}
                    </Link>
                    <div className="absolute  right-0 px-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleCollapsed}
                                    className={cn(
                                        "group relative h-10 w-10 pr-2! rounded-full bg-[#107bbd] shadow-lg transition-all duration-300 hover:bg-[#107bbd]/80 cursor-pointer",
                                        isCollapsed ? "mx-auto" : "ml-auto"
                                    )}
                                >
                                    <div className=" inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    {isCollapsed ? (
                                        <ChevronRight className="h-7! w-7! text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                                    ) : (
                                        <ChevronLeft className="h-7! w-7!  text-white transition-transform duration-300 group-hover:-translate-x-0.5" />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="font-medium">
                                {isCollapsed ? "Mở rộng" : "Thu gọn"}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                <nav className="space-y-1 p-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")

                        const linkContent = (
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-[#107bbd] text-white shadow-md"
                                        : "text-muted-foreground hover:bg-[#107bbd]/10 hover:text-[#107bbd] hover:shadow-sm",
                                    isCollapsed && "justify-center px-0",
                                )}
                            >
                                <Icon className={cn("h-5 w-5 shrink-0", isActive && "drop-shadow-sm")} />
                                {!isCollapsed && <span className="truncate">{item.title}</span>}
                            </Link>
                        )

                        if (isCollapsed) {
                            return (
                                <Tooltip key={item.href}>
                                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                                    <TooltipContent side="right" className="font-medium">
                                        {item.title}
                                    </TooltipContent>
                                </Tooltip>
                            )
                        }

                        return <div key={item.href}>{linkContent}</div>
                    })}
                </nav>
                <div className="absolute bottom-0 w-full p-3 border-t border-border">
                    <Link
                        href={"/quantri/cai-dat"}
                        className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                            pathname === "/quantri/cai-dat" || pathname?.startsWith("/quantri/cai-dat/")
                                ? "bg-[#107bbd] text-white shadow-md"
                                : "text-muted-foreground hover:bg-[#107bbd]/10 hover:text-[#107bbd] hover:shadow-sm",
                            isCollapsed && "justify-center px-0",
                        )}
                    >
                        <Settings className={cn("h-5 w-5 shrink-0", (pathname === "/quantri/cai-dat" || pathname?.startsWith("/quantri/cai-dat/")) && "drop-shadow-sm")} />
                        {!isCollapsed && <span className="truncate">Cài đặt</span>}
                    </Link>
                </div>
            </aside>
        </TooltipProvider>
    )
}
