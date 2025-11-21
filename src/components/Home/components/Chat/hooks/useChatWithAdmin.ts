import { useState, useCallback, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { IMessage, IRoom } from '@/apis/types';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/Slice/authSlice';
import { selectChat } from '@/redux/Slice/chatSlice';
import toast from "react-hot-toast"
import { browseRoomChat, createRoomAPI, deleteRoomChat, getRoomChatPending } from '@/apis/roomApi';

export const useChatWithAdmin = () => {
    const { user } = useSelector(selectAuth);
    const { connect, subscribe, isConnected } = useSocket();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [roomInfo, setRoomInfo] = useState<IRoom | null>(null);
    const [loading, setLoading] = useState(false);
    const [pendingRooms, setPendingRooms] = useState<IRoom[]>([]);

    const userId = user?.id;

    const isAdmin = user?.role?.id === 1;
    const adminId = isAdmin ? user?.id : undefined;


    const createRoom = useCallback(
        async (initialMessage?: string) => {
            if (!userId) {
                toast.error("Bạn chưa đăng nhập!");
                return;
            }

            try {
                setLoading(true);
                // toast.loading("Đang tạo phòng chat...");

                const room = await createRoomAPI({
                    userId: userId,
                    roomType: "user-admin",
                    initialMessage: initialMessage || ""
                });

                setRoomId(room.id);
                setRoomInfo(room);

                toast.success(`Tạo room thành công! ID: ${room.id}`);

                // if (room.status === "pending") {
                //     toast.loading("⏳ Đang chờ admin phê duyệt...");
                // }

                // if (room.status === "active") {

                // }



            } catch (err: any) {
                console.error(err);
                toast.error("Tạo room thất bại: " + err.message);
            } finally {
                setLoading(false);
            }
        },
        [userId]
    );

    const cancelRoom = useCallback(async () => {
        if (!roomId) return;
        try {
            setLoading(true);
            await deleteRoomChat(roomId);
            setRoomId(null);
            setRoomInfo(null);
            toast.success("Đã hủy yêu cầu chat");
        } catch (error) {
            console.error(error);
            toast.error("Hủy yêu cầu thất bại");
        } finally {
            setLoading(false);
        }
    }, [roomId]);
    // danh sách yêu cầu room chờ phê duyệt
    const loadPendingRooms = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getRoomChatPending();

            if (!response) {
                throw new Error("HTTP " + response);
            }

            const data: IRoom[] = response;
            setPendingRooms(data);

            if (data.length === 0) {
                toast("Không có phòng chờ phê duyệt");
            } else {
                toast.success(`Có ${data.length} phòng đang chờ`);
            }
        } catch (error: any) {
            console.error(error);
            toast.error("Lỗi tải pending rooms: " + error.message);
        } finally {
            setLoading(false);
        }
    }, []);
    // chap nhap admin vào room
    const approveRoom = useCallback(async (roomId: string) => {

        try {
            toast.loading("Đang phê duyệt phòng...");
            if (!adminId) {
                toast.error("Không tìm thấy ID admin");
                return;
            }
            const response = await browseRoomChat(roomId, adminId);

            const approvedRoom: IRoom = response;

            setRoomId(roomId);
            setRoomInfo(approvedRoom);

            toast.success("Phê duyệt thành công!");

            setPendingRooms(prev => prev.filter(r => r.id !== roomId));

            setTimeout(() => {
                if (typeof loadPendingRooms === "function") loadPendingRooms();
            }, 800);

        } catch (error: any) {
            toast.error("Lỗi approve: " + error.message);
        }
    }, [isAdmin, adminId]);



    const isWaitingForAdmin = roomInfo?.status === 'pending';

    const { activeRoomId } = useSelector(selectChat);

    useEffect(() => {
        if (activeRoomId && user?.role?.id === 1) {
            approveRoom(activeRoomId);
        }
    }, [activeRoomId, user?.role?.id, approveRoom]);

    // Subscribe to room updates
    useEffect(() => {
        if (roomId && !isConnected) {
            connect();
        }
    }, [roomId, isConnected, connect]);

    useEffect(() => {
        if (roomId && isConnected) {
            console.log("Subscribing to room updates:", roomId);
            const subscription = subscribe(`/topic/room/${roomId}`, (updatedRoom: IRoom) => {
                console.log("Room update received:", updatedRoom);
                setRoomInfo(updatedRoom);
                if (updatedRoom.status === 'active') {
                    toast.success("Admin đã vào phòng chat!");
                }
            });

            return () => {
                if (subscription) subscription.unsubscribe();
            };
        }
    }, [roomId, isConnected, subscribe]);

    return {
        messages,
        setMessages,
        roomId,
        roomInfo,
        loading,
        createRoom,
        cancelRoom,
        isAdmin,
        isWaitingForAdmin,
        loadPendingRooms,
        approveRoom,
        pendingRooms,
        activeRoomId,
    };
};
