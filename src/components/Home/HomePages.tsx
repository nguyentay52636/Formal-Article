import React from 'react'
import CategoryNavigate from './components/Categories/CategoryNavigate'
import Logo from './components/Categories/Logo'
import HeroSection from './components/SectionHero'
import MainContent from './components/MainContent/MainContent'
import BackToTop from '@/components/ui/BackToTop'

export default function HomePages() {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Logo />
                <CategoryNavigate />
                <main className="flex-1">
                    <HeroSection />
                    <MainContent />
                </main>
            </div>
            <BackToTop />
        </>
    )
}
