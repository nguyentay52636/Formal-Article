"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mic, MicOff, Send } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface Comment {
    id: string
    author: string
    avatar: string
    content: string
    timestamp: string
}

interface CVCommentsProps {
    cvId: string
}

export function CvComment({ cvId }: CVCommentsProps) {
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const recognitionRef = useRef<any>(null)

    useEffect(() => {
        const saved = localStorage.getItem(`cv_comments_${cvId}`)
        if (saved) {
            setComments(JSON.parse(saved))
        } else {
            setComments([
                {
                    id: "1",
                    author: "Nguyễn Văn A",
                    avatar: "NA",
                    content:
                        "Mẫu CV rất đẹp và chuyên nghiệp, tôi đã sử dụng và nhận được nhiều phản hồi tích cực từ nhà tuyển dụng!",
                    timestamp: "2 giờ trước",
                },
                {
                    id: "2",
                    author: "Trần Thị B",
                    avatar: "TB",
                    content: "Giao diện dễ sử dụng, tùy chỉnh linh hoạt. Rất hài lòng với mẫu CV này.",
                    timestamp: "1 ngày trước",
                },
            ])
        }

        // Initialize Speech Recognition
        if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = true
            recognitionRef.current.interimResults = true
            recognitionRef.current.lang = "vi-VN"

            recognitionRef.current.onresult = (event: any) => {
                const transcript = Array.from(event.results)
                    .map((result: any) => result[0])
                    .map((result) => result.transcript)
                    .join("")
                setNewComment(transcript)
            }

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error)
                setIsRecording(false)
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [cvId])

    const toggleRecording = () => {
        if (!recognitionRef.current) {
            alert("Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói")
            return
        }

        if (isRecording) {
            recognitionRef.current.stop()
            setIsRecording(false)
        } else {
            recognitionRef.current.start()
            setIsRecording(true)
        }
    }

    const handleSubmit = () => {
        if (!newComment.trim()) return

        const comment: Comment = {
            id: Date.now().toString(),
            author: "Bạn",
            avatar: "B",
            content: newComment,
            timestamp: "Vừa xong",
        }

        const updatedComments = [comment, ...comments]
        setComments(updatedComments)
        localStorage.setItem(`cv_comments_${cvId}`, JSON.stringify(updatedComments))
        setNewComment("")

        if (isRecording) {
            recognitionRef.current.stop()
            setIsRecording(false)
        }
    }

    return (
        <Card className="p-6 lg:p-8 space-y-6">
            <h3 className="text-2xl font-bold">Bình luận ({comments.length})</h3>

            <div className="space-y-4">
                <div className="space-y-3">
                    <Textarea
                        placeholder="Chia sẻ ý kiến của bạn về mẫu CV này..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[100px] resize-none"
                    />
                    <div className="flex items-center justify-between">
                        <Button
                            variant={isRecording ? "destructive" : "outline"}
                            size="sm"
                            onClick={toggleRecording}
                            className="gap-2"
                        >
                            {isRecording ? (
                                <>
                                    <MicOff className="w-4 h-4" />
                                    Dừng ghi âm
                                </>
                            ) : (
                                <>
                                    <Mic className="w-4 h-4" />
                                    Nhập bằng giọng nói
                                </>
                            )}
                        </Button>
                        <Button onClick={handleSubmit} disabled={!newComment.trim()} className="gap-2">
                            <Send className="w-4 h-4" />
                            Gửi bình luận
                        </Button>
                    </div>
                    {isRecording && (
                        <p className="text-sm text-primary flex items-center gap-2 animate-pulse">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            Đang ghi âm... Hãy nói vào micro
                        </p>
                    )}
                </div>

                <div className="border-t pt-6 space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <Avatar className="w-10 h-10 shrink-0">
                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">{comment.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold">{comment.author}</p>
                                    <span className="text-sm text-muted-foreground">•</span>
                                    <p className="text-sm text-muted-foreground">{comment.timestamp}</p>
                                </div>
                                <p className="text-sm leading-relaxed">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
