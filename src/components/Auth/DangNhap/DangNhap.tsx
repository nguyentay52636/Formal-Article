"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, FileText, Eye, EyeOff } from "lucide-react"

export default function DangNhap() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    return (
        <div className=" flex flex-col text-[16px] my-10">
            <main className="flex-1 flex items-center justify-center py-8! px-6 bg-gray-50">
                <div className="w-full max-w-3xl h-full space-y-10">
                    <div className="text-center space-y-3">
                        <div className="flex justify-center">
                            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                                <FileText className="h-7 w-7 text-primary" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Đăng nhập</h1>
                        <p className="text-gray-500">Đăng nhập để truy cập tài khoản của bạn</p>
                    </div>

                    {/* Form */}
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Thông tin đăng nhập</CardTitle>
                            <CardDescription className="text-md">Nhập email và mật khẩu để đăng nhập</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[16px] font-medium">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="ten@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="h-12 text-[16px]"
                                    />
                                </div>

                                {/* Password */}
                                <div className="space-y-2 relative">
                                    <Label htmlFor="password" className="text-[16px] font-medium">Mật khẩu</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className="h-12 text-[16px] pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-800 transition-colors"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <Link
                                            href="/quen-mat-khau"
                                            className="text-[15px] text-primary hover:underline"
                                        >
                                            Quên mật khẩu?
                                        </Link>
                                    </div>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-[16px] rounded-md bg-primary hover:bg-primary/90"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Đang đăng nhập...
                                        </>
                                    ) : (
                                        "Đăng nhập"
                                    )}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <div className="text-[15px] text-center text-gray-500">
                                Chưa có tài khoản?{" "}
                                <Link href="/dang-ky" className="text-primary hover:underline font-medium">
                                    Đăng ký ngay
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>

                </div>
            </main>
        </div>
    )
}
