import axios from "axios";

const baseApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
});

baseApi.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Xử lý lỗi trả về
baseApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");

            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default baseApi;