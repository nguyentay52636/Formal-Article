import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/Slice/authSlice";
import { useSocket } from "@/hooks/useSocket";
import { INotification } from "@/apis/types";
import { getAllNotification, deleteNotificationById, deleteAllNotification } from "@/apis/notificationApi";
import toast from "react-hot-toast";

export const useNotification = () => {
    const { user } = useSelector(selectAuth);
    const { connect, subscribe, isConnected } = useSocket();

    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    
    // Track shown notification IDs and roomIds to prevent duplicates
    const shownNotificationIds = useRef<Set<number | string>>(new Set());
    const shownRoomIds = useRef<Set<string>>(new Set()); // Track roomId for chat notifications
    const isSubscribed = useRef(false);
    const lastProcessedTime = useRef<number>(0);

    const isAdmin = user?.role?.name === "ADMIN";

    // Load notifications
    useEffect(() => {
        if (!user?.id) return;

        (async () => {
            try {
                const data = await getAllNotification(user.id);
                setNotifications(data);
                setUnreadCount(data.length);
                // Mark existing notifications as shown
                data.forEach((n: INotification) => {
                    if (n.id) shownNotificationIds.current.add(n.id);
                });
            } catch (error) {
                console.error("Failed to fetch notifications:", error)
            }
        })();
    }, [user?.id]);

    // Socket connect (admin only)
    useEffect(() => {
        if (isAdmin && !isConnected) {
            connect();
        }
    }, [isAdmin, isConnected, connect]);

    // Socket listen - only subscribe once
    useEffect(() => {
        if (!isConnected || !isAdmin || isSubscribed.current) return;

        isSubscribed.current = true;

        console.log("🔔 [Notification] Subscribed to /topic/admin/notifications");
        
        const subscription = subscribe("/topic/admin/notifications", (msg: any) => {
            console.log("📩 [Notification] Received raw message:", msg);
            
            const notificationId = msg.id || Date.now();
            const roomId = msg.roomId || "";
            const now = Date.now();
            
            // Debounce: Skip if processed within last 500ms
            if (now - lastProcessedTime.current < 500) {
                console.log("⚠️ [Notification] Debounced, too fast");
                return;
            }
            
            // Skip if notification ID already shown
            if (shownNotificationIds.current.has(notificationId)) {
                console.log("⚠️ [Notification] Skipped duplicate ID:", notificationId);
                return;
            }
            
            // Skip if same roomId already has a notification (for chat notifications)
            if (roomId && shownRoomIds.current.has(roomId)) {
                console.log("⚠️ [Notification] Skipped duplicate roomId:", roomId);
                return;
            }
            
            // Skip empty/system notifications
            if (!msg.message || msg.title === "System") {
                console.log("⚠️ [Notification] Skipped empty/system notification");
                return;
            }
            
            lastProcessedTime.current = now;
            shownNotificationIds.current.add(notificationId);
            if (roomId) {
                shownRoomIds.current.add(roomId);
            }

            const newNoti: INotification = {
                id: notificationId,
                title: msg.title || "Thông báo mới",
                message: msg.message || "",
                type: msg.type || "info",
                roomId: roomId,
                isRead: false,
                createdAt: new Date().toISOString()
            };

            console.log("✅ [Notification] Processing new notification:", newNoti);

            setNotifications((prev) => {
                // Double check to avoid duplicates in state
                if (prev.some(n => n.id === notificationId || (roomId && n.roomId === roomId))) {
                    console.log("⚠️ [Notification] Already in state, skipping");
                    return prev;
                }
                console.log("📝 [Notification] Added to state, total:", prev.length + 1);
                return [newNoti, ...prev];
            });
            setUnreadCount((prev) => prev + 1);

            toast(newNoti.message, { icon: "🔔" });
        });

        return () => {
            subscription?.unsubscribe();
            isSubscribed.current = false;
        };
    }, [isConnected, subscribe, isAdmin]);

    const handleDelete = async (notificationId: number) => {
        if (!user?.id) return;
        try {
            await deleteNotificationById(notificationId, user.id);
            setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
            setUnreadCount((prev) => Math.max(prev - 1, 0));
            toast.success("Đã xoá thông báo");
        } catch (err) {
            toast.error("Không thể xoá thông báo");
        }
    };

    const handleClearAll = async () => {
        if (!user?.id) return;
        try {
            await deleteAllNotification(user.id);
            setNotifications([]);
            setUnreadCount(0);
            toast.success("Đã xoá tất cả thông báo");
        } catch (err) {
            toast.error("Xoá tất cả thất bại");
        }
    };

    return {
        notifications,
        unreadCount,
        handleDelete,
        handleClearAll
    };
};
