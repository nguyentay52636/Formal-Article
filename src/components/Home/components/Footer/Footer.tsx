import Link from "next/link";
import { FileText, Search } from "lucide-react";

export function Footer() {
    const footerLinks = {
        "Về chúng tôi": [
            { label: "Giới thiệu", href: "/gioi-thieu" },
            { label: "Liên hệ", href: "/lien-he" },
            { label: "Điều khoản", href: "/dieu-khoan" },
        ],
        "Danh mục": [
            { label: "Đơn xin việc", href: "/danh-muc/don-xin-viec" },
            { label: "Đơn xin nghỉ", href: "/danh-muc/don-xin-nghi" },
            { label: "Đơn khác", href: "/danh-muc/don-khac" },
        ],
        "Hỗ trợ": [
            { label: "Hướng dẫn", href: "/huong-dan" },
            { label: "Câu hỏi thường gặp", href: "/faq" },
            { label: "Báo lỗi", href: "/bao-loi" },
        ],
    };

    return (
        <footer className="border-t border-border bg-gray-100 text-base">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo & mô tả */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center p-4 bg-[#107bbd]! rounded-full">
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

                    {/* Cột liên kết */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="space-y-4">
                            <h3 className="font-semibold text-foreground text-lg">{title}</h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-base text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bản quyền */}
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-center text-base text-muted-foreground">
                        © {new Date().getFullYear()} <span className="font-semibold text-primary">MauDon.edu.vn</span>.
                        Tất cả quyền được bảo lưu.
                    </p>
                </div>
            </div>
        </footer>
    );
}
