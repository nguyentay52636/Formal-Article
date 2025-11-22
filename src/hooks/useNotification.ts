import { useState, useEffect } from "react";
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

    // Load notifications
    useEffect(() => {
        if (!user?.id) return;

        (async () => {
            try {
                const data = await getAllNotification(user.id);
                setNotifications(data);
                setUnreadCount(data.length);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        })();
    }, [user?.id]);

    // Socket connect (admin only)
    useEffect(() => {
        if (user?.role?.id === 1 && !isConnected) {
            connect();
        }
    }, [user?.role?.id, isConnected, connect]);

    // Socket listen
    useEffect(() => {
        if (!isConnected || user?.role?.id !== 1) return;

        const subscription = subscribe("/topic/admin/notifications", (msg: any) => {
            const newNoti: INotification = {
                id: msg.id || Date.now(),
                title: msg.title || "Thông báo mới",
                message: msg.message || "",
                type: msg.type || "info",
                roomId: msg.roomId || "",
                isRead: false,
                createdAt: new Date().toISOString()
            };

            setNotifications((prev) => [newNoti, ...prev]);
            setUnreadCount((prev) => prev + 1);

            toast(newNoti.message, { icon: "🔔" });
        });

        return () => subscription?.unsubscribe();
    }, [isConnected, subscribe, user?.role?.id]);

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
