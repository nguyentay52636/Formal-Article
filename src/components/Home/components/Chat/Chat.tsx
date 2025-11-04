"use client"

import { useState, useEffect, useRef } from "react"
import { ChatButton, ChatWindow, type Message } from "./components"

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Xin chào! Tôi là trợ lý ảo của Sài Gòn Culinary Hub. Tôi có thể giúp gì cho bạn? 🍜",
            sender: "bot",
            timestamp: new Date(),
        },
    ])
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
            text: "Đã chuyển bạn đến bộ phận hỗ trợ. Admin sẽ phản hồi trong vòng 24 giờ. Email: support@saigonculinary.com 📧",
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

    return (
        <>
            <ChatButton isOpen={isOpen} unreadCount={unreadCount} onOpen={() => setIsOpen(true)} />

            <ChatWindow
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
            />
        </>
    )
}
