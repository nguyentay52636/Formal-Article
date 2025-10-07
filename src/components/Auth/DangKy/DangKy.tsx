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

export default function DangKy() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!fullName.trim()) {
            setError("Vui lòng nhập họ và tên")
            return
        }
        if (password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự")
            return
        }
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp")
            return
        }
        if (!agreeTerms) {
            setError("Bạn cần đồng ý với điều khoản sử dụng")
            return
        }

        setIsLoading(true)
        try {
            await new Promise((r) => setTimeout(r, 800))
            router.push("/dang-nhap")
        } catch (e) {
            setError("Đăng ký thất bại, vui lòng thử lại")
        } finally {
            setIsLoading(false)
        }
    }

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
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Thông tin đăng ký</h1>
                        <p className="text-gray-500">Điền thông tin để tạo tài khoản mới</p>
                    </div>

                    {/* Form */}
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Tạo tài khoản</CardTitle>
                            <CardDescription className="text-md">Nhập họ tên, email và mật khẩu để đăng ký</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Full name */}
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-[16px] font-medium">Họ và tên</Label>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="Nguyễn Văn A"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="h-12 text-[16px]"
                                    />
                                </div>

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
                                    {password.length > 0 && password.length < 6 && (
                                        <p className="text-sm text-red-500">Mật khẩu phải có ít nhất 6 ký tự</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-[16px] font-medium">Xác nhận mật khẩu</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="h-12 text-[16px]"
                                    />
                                </div>

                                {/* Terms */}
                                <div className="flex items-start gap-3">
                                    <input
                                        id="agree"
                                        type="checkbox"
                                        className="mt-1 h-4 w-4"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        disabled={isLoading}
                                    />
                                    <Label htmlFor="agree" className="text-[15px] text-gray-700">
                                        Tôi đồng ý với điều khoản sử dụng
                                    </Label>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-[16px] rounded-md bg-primary cursor-pointer hover:bg-primary/90"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Đang đăng ký...
                                        </>
                                    ) : (
                                        "Đăng ký"
                                    )}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <div className="text-[15px] text-center text-gray-500">
                                Đã có tài khoản?{" "}
                                <Link href="/dang-nhap" className="text-primary hover:underline font-medium">
                                    Đăng nhập
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>

                </div>
            </main>
        </div>
    )
}
