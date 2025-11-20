"use client"

import { useState, useEffect, useRef } from "react"
import { ChatButton } from "./components"
import ChatBotWindown from "./components/ChatBotWindown/ChatBotWindown"
import ChatAdminWindow from "./components/ChatAdminWindow/ChatAdminWindow"
import { Message } from "./components/ChatBotWindown/ChatBotWindown"
import { IMessage } from "@/apis/types"
import { useChatWithAdmin } from "./hooks/useChatWithAdmin"

type ChatType = 'ai' | 'admin'

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false)
    const [chatType, setChatType] = useState<ChatType>('ai')
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
    const getSafeWindowPosition = () => {
        if (typeof window !== "undefined") {
            return {
                x: clamp(window.innerWidth - 400, 20, Math.max(window.innerWidth - 400, 20)),
                y: 20,
            }
        }
        return { x: 20, y: 20 }
    }
    const getSafeButtonPosition = () => {
        if (typeof window === "undefined") {
            return { x: 20, y: 20 }
        }

        const defaultPos = {
            x: clamp(window.innerWidth - 88, 20, Math.max(window.innerWidth - 88, 20)),
            y: clamp(window.innerHeight - 88, 20, Math.max(window.innerHeight - 88, 20)),
        }

        const saved = localStorage.getItem("chatButtonPosition")
        if (!saved) return defaultPos

        try {
            const parsed = JSON.parse(saved)
            return {
                x: clamp(parsed.x ?? defaultPos.x, 20, defaultPos.x),
                y: clamp(parsed.y ?? defaultPos.y, 20, defaultPos.y),
            }
        } catch {
            return defaultPos
        }
    }

    const [position, setPosition] = useState(getSafeWindowPosition)
    const [buttonPosition, setButtonPosition] = useState(getSafeButtonPosition)
    const [dragging, setDragging] = useState(false)
    const [buttonDragging, setButtonDragging] = useState(false)
    const dragRef = useRef<{ offsetX: number; offsetY: number } | null>(null)
    const buttonDragRef = useRef<{ offsetX: number; offsetY: number; startX: number; startY: number } | null>(null)

    useEffect(() => {
        if (isOpen) setUnreadCount(0)
    }, [isOpen])

    // Lưu vị trí button vào localStorage
    useEffect(() => {
        if (typeof window !== "undefined" && buttonPosition) {
            localStorage.setItem("chatButtonPosition", JSON.stringify(buttonPosition))
        }
    }, [buttonPosition])

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true)
        dragRef.current = {
            offsetX: e.clientX - position.x,
            offsetY: e.clientY - position.y,
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!dragging || !dragRef.current) return
        setPosition({
            x: e.clientX - dragRef.current.offsetX,
            y: e.clientY - dragRef.current.offsetY,
        })
    }

    const handleMouseUp = () => setDragging(false)

    // Button drag handlers
    const handleButtonMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        setButtonDragging(true)
        buttonDragRef.current = {
            offsetX: e.clientX - buttonPosition.x,
            offsetY: e.clientY - buttonPosition.y,
            startX: e.clientX,
            startY: e.clientY,
        }
    }

    const handleButtonMouseMove = (e: MouseEvent) => {
        if (!buttonDragging || !buttonDragRef.current) return

        const maxX = Math.max(window.innerWidth - 88, 20)
        const maxY = Math.max(window.innerHeight - 88, 20)
        const newX = clamp(e.clientX - buttonDragRef.current.offsetX, 20, maxX)
        const newY = clamp(e.clientY - buttonDragRef.current.offsetY, 20, maxY)

        setButtonPosition({
            x: newX,
            y: newY,
        })
    }

    const handleButtonMouseUp = (e: MouseEvent) => {
        if (!buttonDragRef.current) return

        // Kiểm tra xem có phải là drag hay click
        const deltaX = Math.abs(e.clientX - buttonDragRef.current.startX)
        const deltaY = Math.abs(e.clientY - buttonDragRef.current.startY)
        const isDrag = deltaX > 5 || deltaY > 5

        setButtonDragging(false)
        buttonDragRef.current = null

        // Nếu không phải drag (chỉ click), mở chat
        if (!isDrag) {
            setIsOpen(true)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (typeof window === "undefined") return
            setButtonPosition((prev) => {
                const maxX = Math.max(window.innerWidth - 88, 20)
                const maxY = Math.max(window.innerHeight - 88, 20)
                return {
                    x: clamp(prev.x, 20, maxX),
                    y: clamp(prev.y, 20, maxY),
                }
            })
            setPosition((prev) => {
                const maxX = Math.max(window.innerWidth - 400, 20)
                const maxY = Math.max(window.innerHeight - 600, 20)
                return {
                    x: clamp(prev.x, 20, maxX),
                    y: clamp(prev.y, 20, maxY),
                }
            })
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("mouseup", handleMouseUp)
        } else {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [dragging])

    useEffect(() => {
        if (buttonDragging) {
            window.addEventListener("mousemove", handleButtonMouseMove)
            window.addEventListener("mouseup", handleButtonMouseUp)
        } else {
            window.removeEventListener("mousemove", handleButtonMouseMove)
            window.removeEventListener("mouseup", handleButtonMouseUp)
        }
        return () => {
            window.removeEventListener("mousemove", handleButtonMouseMove)
            window.removeEventListener("mouseup", handleButtonMouseUp)
        }
    }, [buttonDragging])
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Xin chào! Tôi là trợ lý ảo của Inclusive Learn. Tôi có thể giúp gì cho bạn? 🍜",
            sender: "bot",
            timestamp: new Date(),
        },
    ])

    // Sử dụng hook useChatWithAdmin
    const {
        messages: adminMessages,
        setMessages: setAdminMessages,
        createRoom,
        isWaitingForAdmin,
        loading: adminLoading
    } = useChatWithAdmin();

    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0)
    const isProcessingRef = useRef(false)

    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0)
        }
    }, [isOpen])

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isProcessingRef.current || isTyping) {
            return
        }

        isProcessingRef.current = true
        setIsTyping(true)

        const userInput = inputValue.trim()
        const userMessage: Message = {
            id: Date.now().toString(),
            text: userInput,
            sender: "user",
            timestamp: new Date(),
        }

        setInputValue("")

        // Thêm user message vào state trước
        setMessages((prev) => [...prev, userMessage])

        // Lấy conversation history từ state hiện tại + userMessage mới
        const updatedMessages = [...messages, userMessage]
        const recentMessages = updatedMessages.slice(-10).map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
        }))

        try {
            console.log("[Chat] Sending request to /api/openrouter:", {
                prompt: userInput,
                messagesCount: recentMessages.length
            })

            const response = await fetch("/api/openrouter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: userInput,
                    messages: recentMessages,
                }),
            })

            console.log("[Chat] Response status:", response.status)

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
                console.error("[Chat] API Error:", errorData)
                throw new Error(errorData.error || "Lỗi khi gọi API")
            }

            const data = await response.json()

            console.log("[Chat] Response data:", {
                hasChoices: !!data?.choices,
                choicesLength: data?.choices?.length,
                hasContent: !!data?.choices?.[0]?.message?.content
            })

            const botText =
                data?.choices?.[0]?.message?.content ||
                data?.choices?.[0]?.content ||
                "Xin lỗi, tôi không thể trả lời câu hỏi này lúc này. Vui lòng thử lại sau."

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: "bot",
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, botMessage])

            if (!isOpen) {
                setUnreadCount((prev) => prev + 1)
            }
        } catch (error: any) {
            console.error("[Chat] Error calling OpenRouter API:", error)
            console.error("[Chat] Error details:", {
                message: error?.message,
                stack: error?.stack
            })

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Xin lỗi, đã có lỗi xảy ra khi xử lý câu hỏi của bạn. Vui lòng thử lại sau hoặc liên hệ admin để được hỗ trợ. 😊",
                sender: "bot",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorMessage])

            if (!isOpen) {
                setUnreadCount((prev) => prev + 1)
            }
        } finally {
            setIsTyping(false)
            isProcessingRef.current = false
        }
    }

    const handleContactAdmin = () => {
        const adminMessage: Message = {
            id: Date.now().toString(),
            text: "Đã chuyển bạn đến bộ phận hỗ trợ. Admin sẽ phản hồi trong vòng 24 giờ. Email: support@inclusivelearn.com 📧",
            sender: "bot",
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, adminMessage])
    }

    const handleVoiceCall = () => {
        const callMessage: Message = {
            id: Date.now().toString(),
            text: "Đang kết nối cuộc gọi thoại với admin... ☎️ Hotline: +84 123 456 789",
            sender: "bot",
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, callMessage])
    }

    const handleVideoCall = () => {
        const callMessage: Message = {
            id: Date.now().toString(),
            text: "Đang kết nối cuộc gọi video với admin... 📹 Vui lòng chờ trong giây lát...",
            sender: "bot",
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, callMessage])
    }

    const handleOptionSelect = (option: 'ai' | 'admin') => {
        setChatType(option)
        setIsOpen(true)

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
        if (!inputValue.trim() || isProcessingRef.current || isTyping) {
            return
        }

        isProcessingRef.current = true
        setIsTyping(true)

        const userInput = inputValue.trim()
        const userMessage: IMessage = {
            id: Date.now().toString(),
            roomId: '',
            senderId: 0, // TODO: Lấy từ user context
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

        setInputValue("")
        setAdminMessages((prev) => [...prev, userMessage])

        // TODO: Gửi message đến API admin chat
        // Simulate response
        setTimeout(() => {
            const adminResponse: IMessage = {
                id: (Date.now() + 1).toString(),
                roomId: '',
                senderId: 0,
                content: "Cảm ơn bạn đã liên hệ. Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất. 📧",
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
            setAdminMessages((prev) => [...prev, adminResponse])
            setIsTyping(false)
            isProcessingRef.current = false
        }, 1000)
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
                        position: "fixed",
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
                            onClose={() => setIsOpen(false)}
                            onInputChange={setInputValue}
                            onSendMessage={handleSendMessage}
                            onContactAdmin={handleContactAdmin}
                            onVoiceCall={handleVoiceCall}
                            onVideoCall={handleVideoCall}
                            isInputDisabled={isTyping || isProcessingRef.current}
                            onDragStart={handleMouseDown}
                            isDragging={dragging}
                        />
                    ) : (
                        <ChatAdminWindow
                            isOpen={isOpen}
                            messages={adminMessages}
                            isTyping={isTyping}
                            inputValue={inputValue}
                            onClose={() => setIsOpen(false)}
                            onInputChange={setInputValue}
                            onSendMessage={handleAdminSendMessage}
                            onContactAdmin={handleAdminContactAdmin}
                            onVoiceCall={handleAdminVoiceCall}
                            onVideoCall={handleAdminVideoCall}
                            isInputDisabled={isTyping || isProcessingRef.current || isWaitingForAdmin}
                            onDragStart={handleMouseDown}
                            isDragging={dragging}
                            isWaitingForAdmin={isWaitingForAdmin}
                        />
                    )}
                </div>
            )}
        </>
    )
}
