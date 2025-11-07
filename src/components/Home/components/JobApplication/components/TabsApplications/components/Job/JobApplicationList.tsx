"use client"
import React from 'react'
import JobApplicationItem from './JobApplicationItem'
import { Button } from '@/components/ui/button'
import { cvTemplates } from '../../../../data'
import { CVTemplate } from '../../../../data'

export default function JobApplicationList() {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {cvTemplates.map((cv: CVTemplate) => (
                    <JobApplicationItem key={cv.id} jobApplication={cv as CVTemplate} />
                ))}
            </div>

            <div className="flex justify-center">
                <Button size="lg" className="bg-[#0066CC] hover:bg-[#0052A3] text-white">
                    Xem thêm
                </Button>
            </div>
        </>
    )
}
