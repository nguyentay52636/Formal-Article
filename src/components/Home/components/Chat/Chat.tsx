"use client"

import { useState, useEffect, useRef } from "react"
import { ChatButton } from "./components"
import ChatBotWindown from "./components/ChatBotWindown/ChatBotWindown"
import ChatAdminWindow from "./components/ChatAdminWindow/ChatAdminWindow"
import { IMessage } from "@/apis/types"
import { useChatWithAdmin } from "./hooks/useChatWithAdmin"
import { useStyle } from "./hooks/useStyle"
import { useChatBot } from "./hooks/useChatBot"
import { useDispatch, useSelector } from "react-redux"
import { closeChat, openChat, selectChat, setChatType, toggleChat } from "@/redux/Slice/chatSlice"
import { selectAuth } from "@/redux/Slice/authSlice"
import toast from "react-hot-toast"

type ChatType = 'ai' | 'admin'

export default function Chat() {
    const dispatch = useDispatch();
    const { isOpen, chatType, activeRoomId } = useSelector(selectChat);
    const { user } = useSelector(selectAuth);
    // const [isOpen, setIsOpen] = useState(false)
    // const [chatType, setChatType] = useState<ChatType>('ai')



    // Sử dụng hook useChatWithAdmin
    const {
        messages: adminMessages,
        setMessages: setAdminMessages,
        createRoom,
        cancelRoom,
        isWaitingForAdmin,
        loading: adminLoading,
        handleSentMessage,
        isSending,
        roomId: adminRoomId
    } = useChatWithAdmin();

    const {
        position,
        buttonPosition,
        dragging,
        buttonDragging,
        handleMouseDown,
        handleButtonMouseDown
    } = useStyle();

    const {
        messages,
        inputValue,
        setInputValue,
        isTyping,
        unreadCount,
        handleSendMessage,
        handleContactAdmin,
        handleVoiceCall,
        handleVideoCall,
        isProcessing
    } = useChatBot();



    const handleOptionSelect = (option: 'ai' | 'admin') => {
        dispatch(setChatType(option));
        dispatch(openChat(option));

        if (option === 'admin') {
            // Khởi tạo message chào mừng cho admin chat
            const welcomeMessage: IMessage = {
                id: Date.now().toString(),
                roomId: '',
                senderId: 0,
                content: "Xin chào! Bạn đã kết nối với bộ phận hỗ trợ. Chuyên viên của chúng tôi sẽ phản hồi bạn sớm nhất có thể. 👨‍💼",
                senderType: "admin",
                type: "text",
                fileUrl: "",
                fileSize: 0,
                fileMime: "",
                replyToId: "",
                status: "sent",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            setAdminMessages([welcomeMessage])
        }
    }

    const handleAdminSendMessage = async () => {
        if (!inputValue.trim() || isSending) {
            return
        }

        const userInput = inputValue.trim()
        setInputValue("")

        if (!adminRoomId) {
            // Optimistically add message
            const tempMessage: IMessage = {
                id: Date.now().toString(),
                roomId: '',
                senderId: user?.id || 0,
                content: userInput,
                senderType: "user",
                type: "text",
                fileUrl: "",
                fileSize: 0,
                fileMime: "",
                replyToId: "",
                status: "sent",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            setAdminMessages(prev => [...prev, tempMessage]);

            // Nếu chưa có phòng, tạo phòng mới với tin nhắn đầu tiên
            // Việc này sẽ đồng thời gửi thông báo và tạo tin nhắn
            createRoom(userInput);
            return;
        }

        try {
            await handleSentMessage(userInput);
        } catch (error) {
            console.error("Error sending admin message:", error);
        }
    }

    const handleAdminContactAdmin = () => {
        createRoom("Tôi muốn gặp admin hỗ trợ");
    }

    const handleAdminVoiceCall = () => {
        const callMessage: IMessage = {
            id: Date.now().toString(),
            roomId: '',
            senderId: 0,
            content: "Đang kết nối cuộc gọi thoại với admin... ☎️ Hotline: +84 123 456 789",
            senderType: "admin",
            type: "text",
            fileUrl: "",
            fileSize: 0,
            fileMime: "",
            replyToId: "",
            status: "sent",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        setAdminMessages((prev) => [...prev, callMessage])
    }

    const handleAdminVideoCall = () => {
        const callMessage: IMessage = {
            id: Date.now().toString(),
            roomId: '',
            senderId: 0,
            content: "Đang kết nối cuộc gọi video với admin... 📹 Vui lòng chờ trong giây lát...",
            senderType: "admin",
            type: "text",
            fileUrl: "",
            fileSize: 0,
            fileMime: "",
            replyToId: "",
            status: "sent",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        setAdminMessages((prev) => [...prev, callMessage])
    }

    return (
        <>
            <ChatButton
                isOpen={isOpen}
                unreadCount={unreadCount}
                position={buttonPosition}
                isDragging={buttonDragging}
                onMouseDown={handleButtonMouseDown}
                onOptionSelect={handleOptionSelect}
            />

            {isOpen && (
                <div
                    style={{

                        left: position.x,
                        top: position.y,
                        zIndex: 9999,
                        cursor: dragging ? "grabbing" : "grab",
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {chatType === 'ai' ? (
                        <ChatBotWindown
                            isOpen={isOpen}
                            messages={messages}
                            isTyping={isTyping}
                            inputValue={inputValue}
                            onClose={() => dispatch(closeChat())}
                            onInputChange={setInputValue}
                            onSendMessage={handleSendMessage}
                            onContactAdmin={handleContactAdmin}
                            onVoiceCall={handleVoiceCall}
                            onVideoCall={handleVideoCall}
                            isInputDisabled={isTyping || isProcessing}
                            onDragStart={handleMouseDown}
                            isDragging={dragging}
                        />
                    ) : (
                        <ChatAdminWindow
                            isOpen={isOpen}
                            messages={adminMessages}
                            isTyping={isSending}
                            inputValue={inputValue}
                            onClose={() => dispatch(closeChat())}
                            onInputChange={setInputValue}
                            onSendMessage={handleAdminSendMessage}
                            onContactAdmin={handleAdminContactAdmin}
                            onVoiceCall={handleAdminVoiceCall}
                            onVideoCall={handleAdminVideoCall}
                            isInputDisabled={isSending || isProcessing || isWaitingForAdmin}
                            onDragStart={handleMouseDown}
                            isDragging={dragging}
                            isWaitingForAdmin={isWaitingForAdmin}
                            onCancelWait={cancelRoom}
                            currentUserId={user?.id}
                        />
                    )}
                </div>
            )}
        </>
    )
}
