"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, FileText, Eye, EyeOff, Mail, CheckCircle2, Sparkles, Inbox } from "lucide-react"
import { registerAPI } from "@/apis/authApi"
import toast from "react-hot-toast"

export default function DangKy() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [registeredEmail, setRegisteredEmail] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccessMessage("")

        if (!fullName.trim()) {
            setError("Vui lòng nhập họ và tên")
            return
        }
        if (!phone.trim()) {
            setError("Vui lòng nhập số điện thoại")
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
            const response = await registerAPI({ email, fullName, password, phone })
            
            if (response) {
                setSuccessMessage(
                    response.message || 
                    "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
                )
                setRegisteredEmail(response.email || email)
                
                // Reset form
                setFullName("")
                setEmail("")
                setPhone("")
                setPassword("")
                setConfirmPassword("")
                setAgreeTerms(false)
                
                toast.success("Đăng ký thành công! Vui lòng kiểm tra email.")
            }
        } catch (e: any) {
            const errorMessage = e?.message || "Đăng ký thất bại, vui lòng thử lại"
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

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
                        <h1 className="text-4xl font-bold tracking-tight dark:text-white!">Thông tin đăng ký</h1>
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

                                {successMessage && (
                                    <div className="relative overflow-hidden rounded-lg border-2 border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 shadow-lg">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-200/20 rounded-full -ml-12 -mb-12 blur-xl"></div>
                                        
                                        <div className="relative p-6 space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                                                        <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                                            <CheckCircle2 className="h-6 w-6 text-white" strokeWidth={2.5} />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex-1 space-y-3">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-green-900 flex items-center gap-2">
                                                            <Sparkles className="h-5 w-5 text-green-600" />
                                                            Đăng ký thành công!
                                                        </h3>
                                                        <p className="text-sm text-green-800 mt-1 leading-relaxed">
                                                            Vui lòng kiểm tra email để xác thực tài khoản.
                                                        </p>
                                                    </div>
                                                    
                                                    {registeredEmail && (
                                                        <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-green-200/50">
                                                            <Mail className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs text-green-700 font-medium mb-0.5">Email đã đăng ký:</p>
                                                                <p className="text-sm font-semibold text-green-900 truncate">{registeredEmail}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    <div className="flex items-start gap-2 p-3 bg-amber-50/80 backdrop-blur-sm rounded-lg border border-amber-200/50">
                                                        <Inbox className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                                        <p className="text-xs text-amber-800 leading-relaxed">
                                                            <span className="font-medium">Lưu ý:</span> Vui lòng kiểm tra hộp thư đến và thư mục <span className="font-semibold">Spam</span> để tìm email xác thực.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                        disabled={isLoading || !!successMessage}
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
                                        disabled={isLoading || !!successMessage}
                                        className="h-12 text-[16px]"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-[16px] font-medium">Số điện thoại</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="0123456789"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        disabled={isLoading || !!successMessage}
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
                                            disabled={isLoading || !!successMessage}
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
                                        disabled={isLoading || !!successMessage}
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
                                        disabled={isLoading || !!successMessage}
                                    />
                                    <Label htmlFor="agree" className="text-[15px] text-gray-700">
                                        Tôi đồng ý với điều khoản sử dụng
                                    </Label>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-[16px] rounded-md bg-primary cursor-pointer hover:bg-primary/90"
                                    disabled={isLoading || !!successMessage}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Đang đăng ký...
                                        </>
                                    ) : successMessage ? (
                                        <>
                                            <CheckCircle2 className="mr-2 h-5 w-5" />
                                            Đã đăng ký thành công
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
