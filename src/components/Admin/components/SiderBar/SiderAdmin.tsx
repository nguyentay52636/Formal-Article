"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    ChevronLeft,
    ChevronRight,
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
        // Dispatch custom event for layout to listen
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
                <div className="flex h-16 items-center justify-between border-b border-border px-4">
                    <Link href="/quantri" className={cn("flex items-center gap-3 transition-all", isCollapsed && "gap-0")}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground shadow-lg">
                            <LayoutDashboard className="h-5 w-5" />
                        </div>
                        {!isCollapsed && (
                            <span className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                Quản Trị
                            </span>
                        )}
                    </Link>
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
                                        ? "bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-md"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
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

                <div className="absolute bottom-4 left-0 right-0 px-3">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size={isCollapsed ? "icon" : "default"}
                                onClick={toggleCollapsed}
                                className={cn("w-full transition-all duration-200 hover:bg-accent", isCollapsed && "h-10 w-10 mx-auto")}
                            >
                                {isCollapsed ? (
                                    <ChevronRight className="h-5 w-5" />
                                ) : (
                                    <>
                                        <ChevronLeft className="h-5 w-5 mr-2" />
                                        <span>Thu gọn</span>
                                    </>
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">{isCollapsed ? "Mở rộng" : "Thu gọn"}</TooltipContent>
                    </Tooltip>
                </div>
            </aside>
        </TooltipProvider>
    )
}
