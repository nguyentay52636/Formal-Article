import baseApi from "@/apis/baseApi"
import { IUser, RegisterDTO } from "./types";


export const LoginAPI = async (userData: { email?: string, password: string }) => {
    try {
        const { data } = await baseApi.post("/auth/login", userData)
        console.log("🔍 LoginAPI Response:", data)
        console.log("🔍 Response structure:", {
            hasUser: !!data?.user,
            hasToken: !!data?.token,
            hasAccessToken: !!data?.accessToken,
            fullData: data
        })
        return data
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Đăng nhập thất bại");
    }
}

export const registerAPI = async ({ email, fullName, password, phone }: RegisterDTO) => {
    try {
        const newUser = { email, fullName, phone, password }
        const { data } = await baseApi.post('/auth/register', newUser)
        return data
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            const responseError = error as { response?: { data?: { message?: string } } };
            throw new Error(responseError.response?.data?.message || "Đăng ký thất bại");
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Đăng ký thất bại");
    }
}

export const verifyOTPAPI = async ({ email, otp }: { email: string, otp: string }) => {
    try {
        const { data } = await baseApi.post('/auth/verify-otp', { email, otp })
        return data
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            const responseError = error as { response?: { data?: { message?: string } } };
            throw new Error(responseError.response?.data?.message || "Xác thực OTP thất bại");
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Xác thực OTP thất bại");
    }
}

export const resendOTPAPI = async ({ email }: { email: string }) => {
    try {
        const { data } = await baseApi.post('/auth/resend-otp', { email })
        return data
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error) {
            const responseError = error as { response?: { data?: { message?: string } } };
            throw new Error(responseError.response?.data?.message || "Gửi lại OTP thất bại");
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Gửi lại OTP thất bại");
    }
}

