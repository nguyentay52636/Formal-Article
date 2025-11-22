const useNotification = () => {
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
        handleDelete,
        handleClearAll
    }
}  