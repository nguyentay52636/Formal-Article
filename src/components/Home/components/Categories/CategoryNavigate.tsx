"use client";

import Link from "next/link";
import {
    Home,
    FileText,
    Users,
    GraduationCap,
    FileCheck,
    AlertTriangle,
    FolderOpen,
    ChevronDown,
} from "lucide-react";

const categories = [

    { icon: Users, label: "Việc Làm - Nhân Sự", href: "/viec-lam-nhan-su" },
    { icon: GraduationCap, label: "Giáo Dục - Đào Tạo", href: "/giao-duc-dao-tao" },
    { icon: FileCheck, label: "Thủ Tục Hành Chính", href: "/thu-tuc-hanh-chinh" },
    { icon: AlertTriangle, label: "Khiếu Nại - Tố Cáo", href: "/khieu-nai-to-cao" },
    { icon: FileText, label: "Mẫu Đơn Khác", href: "#", hasDropdown: true },
];

export function CategoryNavigate() {
    return (
        <nav className="bg-[#0d83c7] text-white shadow-sm">
            <div className="container mx-auto flex items-center justify-start gap-6 overflow-x-auto text-xl px-6 py-7 text-base font-medium">
                <Link href="/" className=" items-center gap-4 hover:opacity-90 transition px-10">
                    <Home className="h-8 w-8" />

                </Link>
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Link
                            key={category.href}
                            href={category.href}
                            className="flex items-center hover:text-gray-300! gap-4 hover:opacity-90 transition"
                        >
                            <Icon className="h-8 w-8" />
                            {category.label && <span>{category.label}</span>}
                            {category.hasDropdown && <ChevronDown className="h-3 w-3" />}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
