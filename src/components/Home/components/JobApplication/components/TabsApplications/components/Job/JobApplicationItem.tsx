"use client"
import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Eye, Download } from 'lucide-react'
import { CVTemplate } from '../../../../data'
interface JobApplicationItemProps {
    jobApplication: CVTemplate
}
export default function JobApplicationItem({ jobApplication }: JobApplicationItemProps) {
    const { id, title, image, views, downloads, category, color } = jobApplication;
    return (
        <>
            <Link key={jobApplication.id} href={`/cv/${jobApplication.id}`}>
                <Card className="group hover:shadow-lg transition-shadow overflow-hidden h-full">
                    <CardContent className="p-0">
                        <div className={`relative aspect-[3/4] ${color} overflow-hidden`}>
                            <Badge className="absolute top-3 left-3 z-10 bg-[#00B4D8] hover:bg-[#0096B8] text-white">
                                MẪU PHỔ BIẾN
                            </Badge>
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-3 p-4">
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary" className="text-xs">
                                {category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {category}
                            </Badge>
                        </div>
                        <h3 className="font-semibold text-sm line-clamp-2 text-balance">{title}</h3>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground w-full">
                            <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                <span>{downloads.toLocaleString()}</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </>
    )
}
