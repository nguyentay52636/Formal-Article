import { useState, useCallback } from 'react';
import { IMessage, IRoom } from '@/apis/types';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/Slice/authSlice';
import toast from "react-hot-toast"
import { createRoomAPI } from '@/apis/roomApi';

export const useChatWithAdmin = () => {
    const { user } = useSelector(selectAuth);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [roomInfo, setRoomInfo] = useState<IRoom | null>(null);
    const [loading, setLoading] = useState(false);

    const userId = user?.id;
    const adminId = 1; // admin mặc định

    /**
     * CREATE ROOM — chuyển từ JS DOM sang React Hook logic
     */
    const createRoom = useCallback(
        async (initialMessage?: string) => {
            if (!userId) {
                toast.error("Bạn chưa đăng nhập!");
                return;
            }

            try {
                setLoading(true);
                toast.loading("Đang tạo phòng chat...");

                const room = await createRoomAPI({
                    userId: userId,
                    roomType: "user-admin",
                    initialMessage: initialMessage || ""
                });

                setRoomId(room.id);
                setRoomInfo(room);

                toast.success(`Tạo room thành công! ID: ${room.id}`);

                // Nếu pending thì chờ admin duyệt
                if (room.status === "pending") {
                    toast.loading("⏳ Đang chờ admin phê duyệt...");
                }

                // Nếu active thì load lịch sử + cho chat
                if (room.status === "active") {
                    // TODO: loadHistory(room.id)
                    // TODO: enable chat UI
                }

                // TODO: nếu dùng WebSocket thì connect ở đây
                // connectWebSocket(room.id);

            } catch (err: any) {
                console.error(err);
                toast.error("Tạo room thất bại: " + err.message);
            } finally {
                setLoading(false);
            }
        },
        [userId]
    );

    const isWaitingForAdmin = roomInfo?.status === 'pending';

    return {
        messages,
        setMessages,
        roomId,
        roomInfo,
        loading,
        createRoom,
        adminId,
        isWaitingForAdmin,
    };
};
