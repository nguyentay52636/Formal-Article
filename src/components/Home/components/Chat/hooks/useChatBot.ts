import { useState, useRef, useEffect, useCallback } from "react"
import { Message } from "../components/ChatBotWindown/ChatBotWindown"
import { useSelector } from "react-redux"
import { selectChat } from "@/redux/Slice/chatSlice"

const WELCOME_MESSAGE: Message = {
    id: "welcome",
    text: "Xin chào! 👋 Tôi là trợ lý AI chuyên về CV và xin việc.\n\nTôi có thể giúp bạn:\n• Viết và chỉnh sửa CV\n• Soạn thư xin việc\n• Chuẩn bị phỏng vấn\n• Tư vấn kỹ năng nghề nghiệp\n\nHãy đặt câu hỏi để bắt đầu! 🚀",
    sender: "bot",
    timestamp: new Date(),
}

export const useChatBot = () => {
    const { isOpen } = useSelector(selectChat)

    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0)
    const isProcessingRef = useRef(false)

    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0)
        }
    }, [isOpen])

    const handleSendMessage = useCallback(async () => {
        const trimmedInput = inputValue.trim()
        
        if (!trimmedInput || isProcessingRef.current || isTyping) {
            return
        }

        isProcessingRef.current = true
        setIsTyping(true)

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text: trimmedInput,
            sender: "user",
            timestamp: new Date(),
        }

        // Clear input immediately
        setInputValue("")

        // Add user message to state
        setMessages((prev) => [...prev, userMessage])

        // Build conversation history for API
        const currentMessages = [...messages, userMessage]
        const recentHistory = currentMessages
            .filter(msg => msg.id !== "welcome") // Exclude welcome message
            .slice(-10)
            .map((msg) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text,
            }))

        try {
            console.log("[ChatBot] Sending message:", {
                prompt: trimmedInput,
                historyCount: recentHistory.length - 1, // Exclude current message
            })

            const response = await fetch("/api/openrouter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: trimmedInput,
                    messages: recentHistory.slice(0, -1), // Don't include current message twice
                }),
            })

            console.log("[ChatBot] Response status:", response.status)

            const data = await response.json()

            // Handle error response
            if (data.error) {
                console.error("[ChatBot] API returned error:", data.error)
                throw new Error(data.error)
            }

            // Extract bot response
            const botText =
                data?.choices?.[0]?.message?.content ||
                data?.choices?.[0]?.content ||
                "Xin lỗi, tôi không thể xử lý yêu cầu này. Vui lòng thử lại."

            const botMessage: Message = {
                id: `bot-${Date.now()}`,
                text: botText,
                sender: "bot",
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, botMessage])

            if (!isOpen) {
                setUnreadCount((prev) => prev + 1)
            }

        } catch (error: any) {
            console.error("[ChatBot] Error:", error?.message || error)

            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                text: "Xin lỗi, đã có lỗi xảy ra. 😅\n\nBạn có thể:\n• Thử gửi lại tin nhắn\n• Liên hệ admin để được hỗ trợ trực tiếp",
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
    }, [inputValue, messages, isOpen, isTyping])

    const handleContactAdmin = useCallback(() => {
        const adminMessage: Message = {
            id: `admin-${Date.now()}`,
            text: "📧 Liên hệ Admin\n\nBạn có thể liên hệ bộ phận hỗ trợ qua:\n• Email: support@example.com\n• Hotline: +84 123 456 789\n\nAdmin sẽ phản hồi trong vòng 24 giờ làm việc.",
            sender: "bot",
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, adminMessage])
    }, [])

    const handleVoiceCall = useCallback(() => {
        const callMessage: Message = {
            id: `voice-${Date.now()}`,
            text: "☎️ Cuộc gọi thoại\n\nHotline hỗ trợ: +84 123 456 789\n\nThời gian làm việc:\n• Thứ 2 - Thứ 6: 8:00 - 17:30\n• Thứ 7: 8:00 - 12:00",
            sender: "bot",
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, callMessage])
    }, [])

    const handleVideoCall = useCallback(() => {
        const callMessage: Message = {
            id: `video-${Date.now()}`,
            text: "📹 Cuộc gọi Video\n\nTính năng gọi video đang được phát triển.\n\nVui lòng liên hệ qua hotline hoặc email để được hỗ trợ trực tiếp.",
            sender: "bot",
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, callMessage])
    }, [])

    const clearMessages = useCallback(() => {
        setMessages([WELCOME_MESSAGE])
    }, [])

    return {
        messages,
        inputValue,
        setInputValue,
        isTyping,
        unreadCount,
        handleSendMessage,
        handleContactAdmin,
        handleVoiceCall,
        handleVideoCall,
        clearMessages,
        isProcessing: isProcessingRef.current,
    }
}
