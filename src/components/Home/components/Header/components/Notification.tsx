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
import { useSocket } from "@/hooks/useSocket";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/Slice/authSlice";
import { useEffect, useState } from "react";
import { INotification } from "@/apis/types";
import { getAllNotification } from "@/apis/notificationApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { openChat, setActiveRoomId } from "@/redux/Slice/chatSlice";

export default function Notification() {
    const dispatch = useDispatch();
    const { user } = useSelector(selectAuth);
    const { connect, subscribe, isConnected } = useSocket();
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (user?.id) {
            getAllNotification(user.id)
                .then((data) => {
                    setNotifications(data);
                    // Count unread if needed, or just use length for now
                    setUnreadCount(data.length);
                })
                .catch((err) => console.error("Failed to fetch notifications:", err));
        }
    }, [user?.id]);

    // Connect to socket if admin
    useEffect(() => {
        if (user?.role?.id === 1 && !isConnected) {
            connect();
        }
    }, [user?.role?.id, isConnected, connect]);

    // Subscribe to notifications
    useEffect(() => {
        if (!isConnected || user?.role?.id !== 1) return;

        // console.log("🔔 Subscribing to admin notifications...");

        const subscription = subscribe("/topic/admin/notifications", (message: any) => {
            // console.log("📩 New notification received:", message);

            const newNotification: INotification = {
                id: message.id || Date.now(),
                title: message.title || "Thông báo mới",
                message: message.message || "",
                type: message.type || "info",
                roomId: message.roomId || "",
                isRead: "false",
                metadata: "",
                createdAt: new Date().toISOString()
            };

            let shouldAdd = true;

            setNotifications((prev) => {
                // Kiểm tra duplicate chặt chẽ hơn
                const isDuplicate = prev.some(n => {
                    // Check by exact ID
                    if (message.id && n.id === message.id) return true;

                    // Check by roomId + type + timestamp (trong vòng 2 giây)
                    if (message.roomId && n.roomId === message.roomId && n.type === message.type) {
                        const timeDiff = Math.abs(new Date(n.createdAt || 0).getTime() - Date.now());
                        if (timeDiff < 2000) return true; // Nếu tạo trong vòng 2s thì coi là duplicate
                    }

                    return false;
                });

                if (isDuplicate) {
                    // console.log("⚠️ Duplicate notification detected, skipping...");
                    shouldAdd = false;
                    return prev;
                }

                console.log("✅ Adding new notification");
                return [newNotification, ...prev];
            });

            // Chỉ tăng unread count và toast nếu không phải duplicate
            if (shouldAdd) {
                setUnreadCount((prev) => prev + 1);
                toast(newNotification.message, {
                    icon: '🔔',
                });
            }
        });

        return () => {
            console.log("🔕 Unsubscribing from admin notifications");
            if (subscription) subscription.unsubscribe();
        };
    }, [isConnected, subscribe, user?.role?.id]);

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
                    notifications.map((item, index) => (
                        <DropdownMenuItem
                            key={item.id || index}
                            className="cursor-pointer text-sm hover:bg-accent flex flex-col items-start py-2"
                            onClick={() => {
                                if (item.roomId && user?.role?.id === 1) {
                                    dispatch(setActiveRoomId(item.roomId));
                                    dispatch(openChat('admin'));
                                }
                            }}
                        >
                            <span className="font-semibold">{item.title}</span>
                            <span className="text-xs text-muted-foreground">{item.message}</span>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
