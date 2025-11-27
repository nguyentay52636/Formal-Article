"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react"
import { verifyEmailAPI } from "@/apis/authApi"
import Link from "next/link"

export default function XacThucEmail() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const token = searchParams.get('token')

        if (!token) {
            setError("Token xác thực không hợp lệ")
            setLoading(false)
            return
        }

        // Gọi API verify email
        const verifyEmail = async () => {
            try {
                const response = await verifyEmailAPI(token)

                if (response?.verified === "true" || response?.verified === true) {
                    setSuccess(true)
                    setMessage(response?.message || "Xác thực email thành công!")

                    // Redirect đến trang đăng nhập sau 2 giây
                    setTimeout(() => {
                        router.push("/dang-nhap")
                    }, 2000)
                } else {
                    setError(response?.message || "Xác thực email thất bại")
                }
            } catch (err: any) {
                const errorMessage = err?.message || "Không thể xác thực email. Vui lòng thử lại."
                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        verifyEmail()
    }, [searchParams, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md">
                    <Card className="shadow-md">
                        <CardContent className="pt-6">
                            <div className="text-center space-y-4">
                                <div className="flex justify-center">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">Đang xác thực email...</h2>
                                    <p className="text-muted-foreground mt-2">Vui lòng đợi trong giây lát</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen py-8 px-6">
            <div className="w-full max-w-md">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            {success ? "Xác thực thành công!" : "Xác thực thất bại"}
                        </CardTitle>
                        <CardDescription className="text-center">
                            {success ? "Email của bạn đã được xác thực" : "Không thể xác thực email"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {success ? (
                            <div className="text-center space-y-4">
                                <div className="flex justify-center">
                                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{message}</p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Đang chuyển đến trang đăng nhập...
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <Button
                                        onClick={() => router.push("/dang-nhap")}
                                        className="w-full"
                                    >
                                        Đi đến đăng nhập
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="flex justify-center">
                                    <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                                        <XCircle className="h-8 w-8 text-red-600" />
                                    </div>
                                </div>
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        Có thể token đã hết hạn hoặc không hợp lệ. Vui lòng thử lại.
                                    </p>
                                    <div className="flex flex-col gap-2 pt-4">
                                        <Button
                                            onClick={() => router.push("/dang-ky")}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Đăng ký lại
                                        </Button>
                                        <Button
                                            onClick={() => router.push("/dang-nhap")}
                                            className="w-full"
                                        >
                                            Đi đến đăng nhập
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

