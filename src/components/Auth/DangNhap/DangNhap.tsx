"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, FileText, Eye, EyeOff, AlertTriangle } from "lucide-react"
import { useLogin } from "./hooks/useLogin"

export default function DangNhap() {
    const [showPassword, setShowPassword] = useState(false)
    const { form, onSubmit, isLoading, error, emailNotVerified } = useLogin()

    const {
        register,
        formState: { errors },
    } = form

    return (
        <div className=" flex flex-col text-[16px] my-10">
            <main className="flex-1 flex items-center justify-center py-8! px-6">
                <div className="w-full max-w-3xl h-full space-y-10">
                    <div className="text-center space-y-3">
                        <div className="flex justify-center">
                            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                                <FileText className="h-7 w-7 text-primary" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight dark:white!">Đăng nhập</h1>
                        <p className="dark:text-white!">Đăng nhập để truy cập tài khoản của bạn</p>
                    </div>

                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Thông tin đăng nhập</CardTitle>
                            <CardDescription className="text-md">Nhập email và mật khẩu để đăng nhập</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onSubmit} className="space-y-6">
                                {emailNotVerified && (
                                    <Alert className="bg-yellow-50 border-yellow-200">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                            <div className="flex-1">
                                                <AlertDescription className="text-yellow-800 font-medium">
                                                    Email chưa được xác thực
                                                </AlertDescription>
                                                <div className="mt-2 text-sm text-yellow-700">
                                                    <p>{error}</p>
                                                    <p className="mt-2">
                                                        Nếu không thấy email, vui lòng kiểm tra thư mục <strong>Spam</strong> hoặc <strong>Thư rác</strong>.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Alert>
                                )}

                                {error && !emailNotVerified && (
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
                                        {...register("email")}
                                        disabled={isLoading}
                                        className="h-12 text-[16px]"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="space-y-2 relative">
                                    <Label htmlFor="password" className="text-[16px] font-medium">Mật khẩu</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            {...register("password")}
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
                                    {errors.password && (
                                        <p className="text-sm text-red-500">{errors.password.message}</p>
                                    )}
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
