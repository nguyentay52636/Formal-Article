"use client"

import React from "react"
import { useState, useEffect, Suspense } from "react"
import { SiderAdmin } from "@/components/Admin/components/SiderBar/SiderAdmin"
import { ThemeProvider } from "@/components/ThemeProvider"
import { cn } from "@/lib/utils"
import "../globals.css"

export default function AdminLayout({
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
        <html lang="en">
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                >
                    <Suspense fallback={null}>
                        <div className="min-h-screen bg-background">
                            <SiderAdmin />
                            <main className={cn("mt-16 p-6 transition-all duration-300 ease-in-out", isCollapsed ? "ml-20" : "ml-64")}>
                                {children}
                            </main>
                        </div>
                    </Suspense>
                </ThemeProvider>
            </body>
        </html>
    )
}
