"use client"

import Image from "next/image"

import { Card } from "@/components/ui/card"

export function CompanyLogosCard() {
    return (
        <Card className="p-6 bg-secondary/50">
            <p className="font-semibold mb-4 text-center">Phù hợp ứng tuyển vào 1000+ công ty</p>
            <div className="grid grid-cols-2 gap-4">
                <LogoItem src="/fpt-logo.jpg" alt="FPT" />
                <LogoItem src="/samsung-logo.png" alt="Samsung" />
                <LogoItem src="/vietgroup-logo.jpg" alt="Vietgroup" />
                <LogoItem src="/vnp-logo.jpg" alt="VNP" />
            </div>
        </Card>
    )
}

interface LogoItemProps {
    src: string
    alt: string
}

function LogoItem({ src, alt }: LogoItemProps) {
    return (
        <div className="flex items-center justify-center p-3 bg-background rounded-lg border">
            <Image src={src} alt={alt} width={80} height={40} className="h-10 w-auto object-contain" />
        </div>
    )
}

