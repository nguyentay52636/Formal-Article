"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { loginThunk, selectAuth, clearError } from "@/redux/Slice/authSlice"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

// Define login form schema
const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email là bắt buộc")
        .email("Email không hợp lệ"),
    password: z
        .string()
        .min(4, "Mật khẩu phải có ít nhất 6 ký tự")
        .max(100, "Mật khẩu quá dài"),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const useLogin = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { isLoading, error, isAuthenticated } = useAppSelector(selectAuth)

    // Initialize form with React Hook Form
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // Handle form submission
    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await dispatch(loginThunk(data)).unwrap()
            if (result) {
                toast.success("Đăng nhập thành công! 🎉", {
                    duration: 2000,
                    position: "top-center",
                })
                // Wait a bit for the toast to show before redirecting
                setTimeout(() => {
                    router.push("/")
                }, 500)
            }
        } catch (error) {
            // Error is handled by Redux state
            toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!")
            console.error("Login failed:", error)
        }
    }

    // Clear error when user starts typing
    useEffect(() => {
        const subscription = form.watch(() => {
            if (error) {
                dispatch(clearError())
            }
        })
        return () => subscription.unsubscribe()
    }, [error, form, dispatch])

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/")
        }
    }, [isAuthenticated, router])

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        isLoading,
        error,
    }
}
