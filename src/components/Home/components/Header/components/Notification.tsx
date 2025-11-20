"use client";

import { Bell } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Notification() {

    const notifications = [
        { id: 1, text: "Bạn có đơn hàng mới" },
        { id: 2, text: "Khách vừa nhắn tin hỗ trợ" },
        { id: 3, text: "Server backup lúc 02:00 AM" },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative outline-none">
                <Bell className="w-10 h-10 text-white cursor-pointer" />

                <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-120 mt-2">
                <DropdownMenuLabel className="text-sm font-medium">
                    Thông báo
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {notifications.length === 0 ? (
                    <DropdownMenuItem className="text-gray-500 text-sm">
                        Không có thông báo
                    </DropdownMenuItem>
                ) : (
                    notifications.map((item) => (
                        <DropdownMenuItem
                            key={item.id}
                            className="cursor-pointer text-sm hover:bg-accent"
                        >
                            {item.text}
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
