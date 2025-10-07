"use client";

import { FileText, Link, PencilIcon } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center gap-2  px-10 py-10 border-b">
            <div className="px-4 border-r border-gray-200 flex items-center bg-blue-500 justify-center p-4 rounded-full  ">

                <FileText className="h-8 w-8 text-white" />

            </div>
            <h1 className="text-5xl font-bold">
                <span className="text-[#ff5a3c]">MẫuĐơn</span>
                <span className="text-[#4ba3ff]">.edu.vn</span>
            </h1>
        </div>
    );
}
