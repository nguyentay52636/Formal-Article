import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tag } from '../../types'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateTag } from '@/apis/tagApi'
import { toast } from 'react-hot-toast'

const TAG_TYPES = ["job_field", "position", "design"] as const

const formSchema = z.object({
    name: z.string().min(1, "Tên thẻ là bắt buộc"),
    slug: z.string().min(1, "Slug không được để trống"),
    type: z.enum(TAG_TYPES, {
        required_error: "Vui lòng chọn loại thẻ",
    }),
})

type FormValues = z.infer<typeof formSchema>

interface DialogEditTagsProps {
    isOpen: boolean
    onClose: () => void
    selectedTag: Tag | null
    onSuccess?: () => void
}

export default function DialogEditTags({ isOpen, onClose, selectedTag, onSuccess }: DialogEditTagsProps) {
    const [submitting, setSubmitting] = useState(false)
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            type: TAG_TYPES[0],
        },
    })

    useEffect(() => {
        if (selectedTag && isOpen) {
            reset({
                name: selectedTag.name ?? "",
                slug: selectedTag.slug ?? "",
                type: (selectedTag.type as typeof TAG_TYPES[number]) || TAG_TYPES[0],
            })
        }
    }, [selectedTag, isOpen, reset])

    const onSubmit = async (values: FormValues) => {
        if (!selectedTag?.id) return
        setSubmitting(true)
        try {
            const result = await updateTag(selectedTag.id, {
                name: values.name.trim(),
                slug: values.slug.trim(),
                type: values.type,
            })
            if (result) {
                toast.success("Cập nhật thẻ thành công")
                onSuccess?.()
                onClose()
            } else {
                toast.error("Cập nhật thẻ thất bại")
            }
        } catch (error: any) {
            const message = error?.response?.data ?? "Không thể cập nhật thẻ"
            toast.error(typeof message === "string" ? message : "Không thể cập nhật thẻ")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) {
                onClose()
            }
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa thẻ</DialogTitle>
                    <DialogDescription>Cập nhật thông tin thẻ để phân loại template chính xác.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-ten">Tên thẻ *</Label>
                        <Input
                            id="edit-ten"
                            {...register("name")}
                            autoComplete="off"
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-duongDan">Đường dẫn (Slug) *</Label>
                        <Input
                            id="edit-duongDan"
                            {...register("slug")}
                            autoComplete="off"
                            className={errors.slug ? "border-red-500" : ""}
                        />
                        {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Loại thẻ *</Label>
                        <Controller
                            control={control}
                            name="type"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Chọn loại thẻ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="job_field">Ngành nghề</SelectItem>
                                        <SelectItem value="position">Vị trí</SelectItem>
                                        <SelectItem value="design">Thiết kế</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={submitting || !selectedTag}>
                            {submitting ? "Đang lưu..." : "Cập nhật"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
