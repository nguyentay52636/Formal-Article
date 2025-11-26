"use client"
import React from 'react'
import TieuDeDonXinViec from './components/TitleJobApplication'
import { JobApplicationFilter } from './components/TabsApplications/components/JobApplicationFilter'
import JobApplicationList from './components/TabsApplications/components/Job/JobApplicationList'
import TagCv from './components/TagCv/TagCv'

export default function JobApplication() {
    return (
        <>
            <div className="min-h-screen bg-background">
                <main className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <TieuDeDonXinViec />
                    </div>
                    <TagCv />
                    <JobApplicationFilter />
                    <JobApplicationList />
                </main>
            </div>
        </>
    )
}
