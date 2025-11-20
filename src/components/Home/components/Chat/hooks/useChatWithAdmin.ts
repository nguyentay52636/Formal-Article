import { useState, useEffect, useCallback } from 'react';
import { IMessage } from '@/apis/types';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/Slice/authSlice';
import { messageApi } from '@/apis/messageApi';
import { useSocket } from '@/hooks/useSocket';

export const useChatWithAdmin = () => {
    const { user } = useSelector(selectAuth);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [roomId, setRoomId] = useState<string | null>(null);
    const userId = user?.id;
    const adminId = 1;

    const { connect: connectSocket, disconnect: disconnectSocket, subscribe, send, isConnected } = useSocket();

    const loadHistory = useCallback(async (rId: string) => {
        try {
            const data = await messageApi.getRoomMessages(rId);
            setMessages(data);
        } catch (error) {
            console.error('Error loading history:', error);
        }
    }, []);

    const connect = useCallback(async () => {
        if (!userId) return;

        try {
            const room = await messageApi.createRoom(userId, adminId);
            const currentRoomId = room.id;
            setRoomId(currentRoomId);

            await loadHistory(currentRoomId);


            connectSocket();

        } catch (error) {
            console.error('Error initializing chat:', error);
        }
    }, [userId, adminId, loadHistory, connectSocket]);

    useEffect(() => {
        if (isConnected && roomId) {
            console.log('Subscribing to room:', roomId);

            subscribe('/topic/chat/' + roomId, (msg: any) => {
                setMessages((prev) => [...prev, msg]);
            });

            subscribe('/topic/chat/' + roomId + '/update', () => {
                loadHistory(roomId);
            });

            subscribe('/topic/chat/' + roomId + '/delete', () => {
                loadHistory(roomId);
            });
        }
    }, [isConnected, roomId, subscribe, loadHistory]);

    const sendMessage = useCallback((content: string) => {
        if (roomId && content.trim() && isConnected) {
            const chatMessage = {
                senderId: userId,
                content: content,
                type: 'text'
            };
            send("/app/chat/" + roomId + "/sendMessage", chatMessage);
        } else {
            console.warn('Cannot send message: Not connected or missing room ID');
        }
    }, [roomId, userId, isConnected, send]);

    const contactAdmin = useCallback(() => {
        if (roomId && isConnected) {
            const chatMessage = {
                senderId: userId,
                content: "Yêu cầu hỗ trợ từ admin",
                type: 'text'
            };
            send("/app/chat/" + roomId + "/sendMessage", chatMessage);
        }
    }, [roomId, userId, isConnected, send]);

    const voiceCall = useCallback(() => {
        // Placeholder for voice call logic
        console.log("Voice call requested");
        // You might emit a specific event or message type here
    }, []);

    const videoCall = useCallback(() => {
        // Placeholder for video call logic
        console.log("Video call requested");
    }, []);

    const disconnect = useCallback(() => {
        disconnectSocket();
        setRoomId(null);
    }, [disconnectSocket]);

    return {
        messages,
        sendMessage,
        connect,
        disconnect,
        isConnected,
        contactAdmin,
        voiceCall,
        videoCall
    };
};
