"use client"

import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"

interface ZoomControlsProps {
    zoom: number
    onZoomChange: (zoom: number) => void
}

export function ZoomControls({ zoom, onZoomChange }: ZoomControlsProps) {
    return (
        <div className="flex items-center gap-2 bg-gray-700 rounded px-3 py-1.5 border-r border-gray-600 mr-3">
            <Button
                onClick={() => onZoomChange(Math.max(50, zoom - 10))}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white hover:bg-gray-600"
                disabled={zoom <= 50}
            >
                <ZoomOut className="w-3 h-3" />
            </Button>
            <span className="text-white text-sm font-medium min-w-[3rem] text-center">{zoom}%</span>
            <Button
                onClick={() => onZoomChange(Math.min(200, zoom + 10))}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white hover:bg-gray-600"
                disabled={zoom >= 200}
            >
                <ZoomIn className="w-3 h-3" />
            </Button>
        </div>
    )
}
