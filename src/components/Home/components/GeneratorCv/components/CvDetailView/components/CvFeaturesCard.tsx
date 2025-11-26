"use client"

import { type ReactNode } from "react"

import { Check } from "lucide-react"

import { Card } from "@/components/ui/card"

interface CvFeaturesCardProps {
    description: string
    language: string
    usage: string
    design: string
    features: string[]
}

export function CvFeaturesCard({ description, language, usage, design, features }: CvFeaturesCardProps) {
    return (
        <Card className="p-6 space-y-4 border-2">
            <h3 className="font-bold text-lg mb-4">Tính năng nổi bật</h3>
            <div className="space-y-3">
                <FeatureItem>{description}</FeatureItem>
                <FeatureItem>
                    <span className="font-semibold">Ngôn ngữ:</span> {language}
                </FeatureItem>
                <FeatureItem>
                    <span className="font-semibold">Đối tượng:</span> {usage}
                </FeatureItem>
                <FeatureItem>
                    <span className="font-semibold">Phong cách:</span> {design}
                </FeatureItem>
                {features.map((feature, index) => (
                    <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
            </div>
        </Card>
    )
}

interface FeatureItemProps {
    children: ReactNode
}

function FeatureItem({ children }: FeatureItemProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="p-1 bg-primary/10 rounded shrink-0">
                <Check className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm leading-relaxed">{children}</p>
        </div>
    )
}

