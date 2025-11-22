"use client";

import { Bell, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "@/redux/Slice/authSlice";
import { openChat, setActiveRoomId } from "@/redux/Slice/chatSlice";
import { useNotification } from "@/hooks/useNotification";
import { Button } from "@/components/ui/button";

export default function Notification() {
    const dispatch = useDispatch();
    const { user } = useSelector(selectAuth);
    const { notifications, unreadCount, handleDelete, handleClearAll } = useNotification();



    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative outline-none">
                <Bell className="w-10 h-10 text-white cursor-pointer" />

                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-120 mt-2 max-h-150 overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between px-2">
                    <DropdownMenuLabel className="text-sm font-medium">
                        Thông báo
                    </DropdownMenuLabel>

                    {/* Nút xoá tất cả */}
                    {notifications.length > 0 && (
                        <Button
                            onClick={handleClearAll}
                            className="cursor-pointer hover:bg-primary/90"
                        >
                            <Trash2 size={14} /> Xóa tất cả
                        </Button>
                    )}
                </div>

                <DropdownMenuSeparator />

                {/* List */}
                {notifications.length === 0 ? (
                    <DropdownMenuItem className="text-gray-500 text-sm">
                        Không có thông báo
                    </DropdownMenuItem>
                ) : (
                    notifications.map((item) => (
                        <DropdownMenuItem
                            key={item.id}
                            className="text-sm flex flex-col py-2 relative pr-8"
                            onClick={() => {
                                if (item.roomId && user?.role?.id === 1) {
                                    dispatch(setActiveRoomId(item.roomId));
                                    dispatch(openChat("admin"));
                                }
                            }}
                        >
                            <span className="font-semibold">{item.title}</span>
                            <span className="text-xs text-muted-foreground">{item.message}</span>

                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item.id as number);
                                }}
                                className="absolute right-2 top-2 text-red-400 hover:text-red-600 cursor-pointer bg-transparent hover:bg-primary/30"
                            >
                                <Trash2 size={16} className="text-red-600" />
                            </Button>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
