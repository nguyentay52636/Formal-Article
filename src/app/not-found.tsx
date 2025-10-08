"use client"
import { useEffect } from "react"
import Link from "next/link"
import { TriangleAlert } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/quantri")
        }, 3000) // sau 3 giây chuyển hướng
        return () => clearTimeout(timer)
    }, [router])

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
            <div className="flex flex-col items-center">
                <div className="bg-[#107bbd1a] text-[#107bbd] p-4 rounded-full mb-6 shadow-sm">
                    <TriangleAlert className="w-10 h-10" />
                </div>

                <h1 className="text-5xl font-extrabold text-gray-800 mb-3">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Trang không tồn tại 😢
                </h2>

                <p className="text-gray-500 mb-8 max-w-md">
                    Bạn sẽ được chuyển hướng về trang quản trị sau ít giây...
                </p>

                <Link
                    href="/quantri"
                    className="inline-block bg-[#107bbd] text-white px-6 py-3 rounded-2xl font-medium shadow-md hover:bg-[#0f6ea9] transition duration-200"
                >
                    Quay về trang quản trị ngay
                </Link>
            </div>

            <div className="mt-12 text-sm text-gray-400">
                © {new Date().getFullYear()} Maudon.edu.vn – Mẫu đơn trực tuyến
            </div>
        </section>
    )
}
