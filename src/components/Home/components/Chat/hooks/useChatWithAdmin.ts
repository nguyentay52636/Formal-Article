import { useState, useCallback, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { IMessage, IRoom } from '@/apis/types';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/Slice/authSlice';
import { selectChat } from '@/redux/Slice/chatSlice';
import toast from "react-hot-toast"
import { browseRoomChat, createRoomAPI, deleteRoomChat, getRoomChatPending, getRoomById } from '@/apis/roomApi';
import { getHistoryChat, sendMessage } from '@/apis/messageApi';

export const useChatWithAdmin = () => {
    const { user } = useSelector(selectAuth);
    const { connect, subscribe, isConnected } = useSocket();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [roomInfo, setRoomInfo] = useState<IRoom | null>(null);
    const [loading, setLoading] = useState(false);
    const [pendingRooms, setPendingRooms] = useState<IRoom[]>([]);
    const [isSending, setIsSending] = useState(false);

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
            const subscription = subscribe(`/topic/room/${roomId}`, async (updatedRoom: IRoom) => {
                console.log("Room update received (socket):", updatedRoom);

                try {
                    const freshRoomData = await getRoomById(roomId);

                    console.log("Fresh room data fetched:", freshRoomData);
                    setRoomInfo(freshRoomData);

                    if (freshRoomData.status === 'active') {
                        toast.success("Admin đã vào phòng chat!");
                    }
                } catch (error) {
                    console.error("Error fetching fresh room data:", error);
                    // Fallback to socket data if fetch fails
                    setRoomInfo(updatedRoom);
                }
            });

            return () => {
                if (subscription) subscription.unsubscribe();
            };
        }
    }, [roomId, isConnected, subscribe]);

    // Polling fallback for room status
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isWaitingForAdmin && roomId) {
            console.log("Starting poll for room status:", roomId);
            intervalId = setInterval(async () => {
                try {
                    const freshRoomData = await getRoomById(roomId);
                    // console.log("Poll result:", freshRoomData);

                    if (freshRoomData.status === 'active' || freshRoomData.adminId) {
                        console.log("Room active detected via poll:", freshRoomData);
                        setRoomInfo(freshRoomData);
                        toast.success("Admin đã vào phòng chat!");
                    }
                } catch (error) {
                    console.error("Polling error:", error);
                }
            }, 3000); // Poll every 3 seconds
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isWaitingForAdmin, roomId]);
    // Load chat history
    useEffect(() => {
        const fetchHistory = async () => {
            if (roomId) {
                try {
                    // setLoading(true); // Optional: show loading state for messages
                    const history = await getHistoryChat(roomId);
                    if (history && Array.isArray(history)) {
                        setMessages(history);
                    }
                } catch (error) {
                    console.error("Failed to load chat history:", error);
                    toast.error("Không thể tải lịch sử chat");
                } finally {
                    // setLoading(false);
                }
            }
        };

        fetchHistory();
    }, [roomId]);

    // Subscribe to new messages realtime
    useEffect(() => {
        if (roomId && isConnected) {
            console.log("Subscribing to messages:", roomId);
            // Backend broadcasts to /topic/chat/{roomId}
            const subscription = subscribe(`/topic/chat/${roomId}`, (newMessage: IMessage) => {
                console.log("New message received (socket):", newMessage);

                setMessages((prevMessages) => {
                    // 1. Check if exact ID exists (deduplication)
                    const exists = prevMessages.some(msg => msg.id === newMessage.id);
                    if (exists) {
                        return prevMessages;
                    }

                    // 2. If from me, check if we have a pending temp message to replace
                    if (newMessage.senderId === userId) {
                        const tempMsgIndex = prevMessages.findIndex(m =>
                            typeof m.id === 'string' &&
                            m.id.startsWith('temp-') &&
                            m.content === newMessage.content
                        );

                        if (tempMsgIndex !== -1) {
                            // Replace temp message with real one
                            const newMsgs = [...prevMessages];
                            newMsgs[tempMsgIndex] = newMessage;
                            return newMsgs;
                        }
                    }

                    // 3. Otherwise add new
                    return [...prevMessages, newMessage];
                });

                // Hiển thị notification nếu tin nhắn không phải từ user hiện tại
                if (newMessage.senderId !== userId) {
                    toast.success(`Tin nhắn mới từ ${newMessage.senderType === 'admin' ? 'Admin' : 'User'}`);
                }
            });

            return () => {
                if (subscription) subscription.unsubscribe();
            };
        }
    }, [roomId, isConnected, subscribe, userId]);

    // Gửi tin nhắn realtime
    const handleSentMessage = useCallback(async (content: string) => {
        if (!content.trim() || !roomId || !userId || isSending) {
            return;
        }

        try {
            setIsSending(true);

            // Tạo tin nhắn tạm thời để hiển thị ngay lập tức
            const tempMessage: IMessage = {
                id: `temp-${Date.now()}`,
                roomId: roomId,
                senderId: userId,
                content: content.trim(),
                senderType: isAdmin ? "admin" : "user",
                type: "text",
                fileUrl: "",
                fileSize: 0,
                fileMime: "",
                replyToId: "",
                status: "sent",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            // Thêm tin nhắn tạm vào UI ngay lập tức
            setMessages((prev) => [...prev, tempMessage]);

            // Gửi tin nhắn đến server
            const response = await sendMessage(roomId, userId, {
                content: content.trim(),
                type: "text",
            });

            console.log("Message sent successfully:", response);

            // Cập nhật tin nhắn tạm với tin nhắn thực từ server
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === tempMessage.id ? { ...msg, ...response } : msg
                )
            );

        } catch (error: any) {
            console.error("Error sending message:", error);
            toast.error("Không thể gửi tin nhắn: " + error.message);

            // Xóa tin nhắn tạm nếu gửi thất bại
            setMessages((prev) =>
                prev.filter((msg) => msg.id !== `temp-${Date.now()}`)
            );
        } finally {
            setIsSending(false);
        }
    }, [roomId, userId, isAdmin, isSending]);

    return {
        handleSentMessage,
        messages,
        setMessages,
        roomId,
        roomInfo,
        loading,
        isSending,
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
