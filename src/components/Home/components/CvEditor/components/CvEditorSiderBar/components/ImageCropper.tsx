"use client"

import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Camera, ZoomIn, RotateCw, Sun, Contrast } from "lucide-react"

interface ImageCropperProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    imageSrc: string
    onCropComplete: (croppedImage: string) => void
}

interface CroppedAreaPixels {
    x: number
    y: number
    width: number
    height: number
}

export function ImageCropper({ open, onOpenChange, imageSrc, onCropComplete }: ImageCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [brightness, setBrightness] = useState(100)
    const [contrast, setContrast] = useState(100)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null)
    const [cropShape, setCropShape] = useState<'round' | 'rect'>('round')

    const onCropCompleteCallback = useCallback((_: any, croppedAreaPixels: CroppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener("load", () => resolve(image))
            image.addEventListener("error", (error) => reject(error))
            image.setAttribute("crossOrigin", "anonymous")
            image.src = url
        })

    const getCroppedImg = async (): Promise<string> => {
        if (!croppedAreaPixels) return imageSrc

        const image = await createImage(imageSrc)
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) return imageSrc

        canvas.width = croppedAreaPixels.width
        canvas.height = croppedAreaPixels.height

        // Apply filters
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`

        // Apply rotation
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.translate(-canvas.width / 2, -canvas.height / 2)

        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        )

        // Apply round mask if needed
        if (cropShape === 'round') {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const centerX = canvas.width / 2
            const centerY = canvas.height / 2
            const radius = Math.min(centerX, centerY)

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
                    if (distance > radius) {
                        const index = (y * canvas.width + x) * 4
                        imageData.data[index + 3] = 0 // Set alpha to 0
                    }
                }
            }
            ctx.putImageData(imageData, 0, 0)
        }

        return canvas.toDataURL("image/png")
    }

    const handleSave = async () => {
        const croppedImage = await getCroppedImg()
        onCropComplete(croppedImage)
        onOpenChange(false)
    }

    const handleReset = () => {
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setRotation(0)
        setBrightness(100)
        setContrast(100)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-[#1E1E1E] border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                        <Camera className="w-5 h-5" />
                        Chỉnh sửa ảnh đại diện
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Cropper */}
                    <div className="relative h-80 bg-black rounded-lg overflow-hidden">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={1}
                            cropShape={cropShape}
                            onCropChange={setCrop}
                            onCropComplete={onCropCompleteCallback}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            style={{
                                containerStyle: {
                                    filter: `brightness(${brightness}%) contrast(${contrast}%)`
                                }
                            }}
                        />
                    </div>

                    {/* Shape selector */}
                    <div className="flex gap-2">
                        <Button
                            variant={cropShape === 'round' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCropShape('round')}
                            className="flex-1"
                        >
                            Tròn
                        </Button>
                        <Button
                            variant={cropShape === 'rect' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCropShape('rect')}
                            className="flex-1"
                        >
                            Vuông
                        </Button>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Zoom */}
                        <div>
                            <Label className="text-gray-300 text-sm flex items-center gap-2 mb-2">
                                <ZoomIn className="w-4 h-4" /> Phóng to: {zoom.toFixed(1)}x
                            </Label>
                            <Slider
                                value={[zoom]}
                                onValueChange={(v) => setZoom(v[0])}
                                min={1}
                                max={3}
                                step={0.1}
                            />
                        </div>

                        {/* Rotation */}
                        <div>
                            <Label className="text-gray-300 text-sm flex items-center gap-2 mb-2">
                                <RotateCw className="w-4 h-4" /> Xoay: {rotation}°
                            </Label>
                            <Slider
                                value={[rotation]}
                                onValueChange={(v) => setRotation(v[0])}
                                min={0}
                                max={360}
                                step={1}
                            />
                        </div>

                        {/* Brightness */}
                        <div>
                            <Label className="text-gray-300 text-sm flex items-center gap-2 mb-2">
                                <Sun className="w-4 h-4" /> Độ sáng: {brightness}%
                            </Label>
                            <Slider
                                value={[brightness]}
                                onValueChange={(v) => setBrightness(v[0])}
                                min={50}
                                max={150}
                                step={5}
                            />
                        </div>

                        {/* Contrast */}
                        <div>
                            <Label className="text-gray-300 text-sm flex items-center gap-2 mb-2">
                                <Contrast className="w-4 h-4" /> Độ tương phản: {contrast}%
                            </Label>
                            <Slider
                                value={[contrast]}
                                onValueChange={(v) => setContrast(v[0])}
                                min={50}
                                max={150}
                                step={5}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={handleReset}>
                        Đặt lại
                    </Button>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSave} className="bg-[#0066CC] hover:bg-[#0055AA]">
                        Lưu ảnh
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

