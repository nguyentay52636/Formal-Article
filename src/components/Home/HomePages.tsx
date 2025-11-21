"use client"
import React from 'react'
import Logo from './components/Categories/Logo'
import HeroSection from './components/SectionHero'
import MainContent from './components/MainContent/MainContent'
import BackToTop from '@/components/ui/BackToTop'
import DonXinViec from './components/JobApplication/JobApplication'

export default function
    HomePages() {
    return (
        <>
            <div className="min-h-screen flex flex-col">

                <main className="flex-1">
                    {/* <HeroSection /> */}
                    <DonXinViec
                    />
                </main>
            </div>
            <BackToTop />

        </>
    )
}
