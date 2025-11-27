import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createTag } from '@/apis/tagApi'
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

interface DialogAddTagsProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

const slugify = (value: string) =>
    value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")

export default function DialogAddTags({ isOpen, onClose, onSuccess }: DialogAddTagsProps) {
    const [submitting, setSubmitting] = useState(false)
    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            type: TAG_TYPES[0],
        },
    })

    const nameValue = watch("name")
    const slugValue = watch("slug")

    useEffect(() => {
        if (!isOpen) {
            reset({
                name: "",
                slug: "",
                type: TAG_TYPES[0],
            })
        }
    }, [isOpen, reset])

    useEffect(() => {
        if (!slugValue && nameValue) {
            setValue("slug", slugify(nameValue), { shouldValidate: true })
        }
    }, [nameValue, slugValue, setValue])

    const onSubmit = async (values: FormValues) => {
        setSubmitting(true)
        try {
            const payload = { name: values.name.trim(), slug: values.slug.trim(), type: values.type }
            const result = await createTag(payload)
            if (result) {
                toast.success("Đã tạo thẻ mới thành công")
                onSuccess?.()
                onClose()
            } else {
                toast.error("Tạo thẻ thất bại")
            }
        } catch (error: any) {
            const message = error?.response?.data ?? "Không thể tạo thẻ"
            toast.error(typeof message === "string" ? message : "Không thể tạo thẻ")
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
                    <DialogTitle>Thêm thẻ mới</DialogTitle>
                    <DialogDescription>Phân loại template bằng cách gắn thẻ phù hợp.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="ten">Tên thẻ *</Label>
                        <Input
                            id="ten"
                            placeholder="Nhập tên thẻ"
                            {...register("name")}
                            autoComplete="off"
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="duongDan">Đường dẫn (Slug) *</Label>
                        <Input
                            id="duongDan"
                            placeholder="don-xin-viec"
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
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={submitting}>
                            {submitting ? "Đang lưu..." : "Lưu thẻ"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
