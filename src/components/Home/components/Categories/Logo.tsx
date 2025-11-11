"use client";

import { FileText, Search } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center gap-3 px-10 py-6 border-b shadow-sm">
            <div className="flex items-center justify-center p-4 rounded-full">
                <FileText className="h-8 w-8 text-white" />
            </div>

            <div className="flex flex-col">
                <h1 className="text-4xl font-extrabold tracking-tight">
                    <span className="text-[#0077ff]">Mẫu</span>
                    <span className="text-[#ff5a3c]">CV</span>
                    <span className="text-gray-800">.vn</span>
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Search className="w-4 h-4 text-gray-400" />
                    Nền tảng tìm & tạo CV chuyên nghiệp hàng đầu Việt Nam
                </p>
            </div>
        </div>
    );
}
