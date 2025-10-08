"use client"

import React from "react"
import { useState, useEffect } from "react"
import { SiderAdmin } from "@/components/Admin/components/SiderBar/SiderAdmin"
import { cn } from "@/lib/utils"

export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("admin-sidebar-collapsed")
        if (saved !== null) {
            setIsCollapsed(saved === "true")
        }

        const handleToggle = (event: CustomEvent<{ collapsed: boolean }>) => {
            setIsCollapsed(event.detail.collapsed)
        }

        window.addEventListener("sidebar-toggle", handleToggle as EventListener)

        return () => {
            window.removeEventListener("sidebar-toggle", handleToggle as EventListener)
        }
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <SiderAdmin />
            {/* <AdminHeader /> */}
            <main className={cn("mt-16 p-6 transition-all duration-300 ease-in-out", isCollapsed ? "ml-20" : "ml-64")}>
                {children}
            </main>
        </div>
    )
}
