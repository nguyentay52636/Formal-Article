import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { openChat, selectChat } from "@/redux/Slice/chatSlice"

export const useStyle = () => {
    const dispatch = useDispatch()
    const { isOpen, chatType } = useSelector(selectChat)

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
            dispatch(openChat(chatType));
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

    return {
        position,
        buttonPosition,
        dragging,
        buttonDragging,
        handleMouseDown,
        handleButtonMouseDown
    }
}
