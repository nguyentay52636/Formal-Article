import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, User, Mail, CheckCircle2 } from "lucide-react"
import { CommentFormData, User as UserType } from "../types"

interface CommentFormProps {
    newComment: CommentFormData
    setNewComment: (comment: CommentFormData) => void
    onSubmit: (e: React.FormEvent) => void
    isSubmitting: boolean
    showSuccess: boolean
    user?: UserType
}

export const CommentForm = ({
    newComment,
    setNewComment,
    onSubmit,
    isSubmitting,
    showSuccess,
    user
}: CommentFormProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Để lại bình luận của bạn</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Guest fields (only show if not logged in) */}
                    {!user && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="ten_khach">
                                    Họ tên <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="ten_khach"
                                        placeholder="Nhập họ tên của bạn"
                                        value={newComment.ten_khach}
                                        onChange={(e) => setNewComment({ ...newComment, ten_khach: e.target.value })}
                                        required={!user}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email_khach">
                                    Email <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email_khach"
                                        type="email"
                                        placeholder="email@example.com"
                                        value={newComment.email_khach}
                                        onChange={(e) => setNewComment({ ...newComment, email_khach: e.target.value })}
                                        required={!user}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Comment content */}
                    <div className="space-y-2">
                        <Label htmlFor="noi_dung">
                            Nội dung <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="noi_dung"
                            placeholder="Viết bình luận của bạn..."
                            value={newComment.noi_dung}
                            onChange={(e) => setNewComment({ ...newComment, noi_dung: e.target.value })}
                            required
                            rows={4}
                            className="resize-none"
                        />
                    </div>

                    {/* Success message */}
                    {showSuccess && (
                        <Alert className="bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            <AlertDescription className="text-emerald-800 dark:text-emerald-200">
                                {user
                                    ? "Bình luận của bạn đã được đăng thành công!"
                                    : "Bình luận của bạn đã được gửi và đang chờ phê duyệt."}
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Submit button */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            {!user && "Bình luận của bạn sẽ được hiển thị sau khi được phê duyệt."}
                        </p>
                        <Button type="submit" disabled={isSubmitting}>
                            <Send className="mr-2 h-4 w-4" />
                            {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}