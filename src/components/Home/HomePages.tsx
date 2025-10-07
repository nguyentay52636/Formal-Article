import React from 'react'
import { Header } from './components/Header/Header'
import { CategoryNavigate } from './components/Categories/CategoryNavigate'
import Logo from './components/Categories/Logo'
import HeroSection from './components/SectionHero'
import MainContent from './components/MainContent/MainContent'

export default function HomePages() {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Header />
                <Logo />
                <CategoryNavigate />
                <main className="flex-1">
                    <HeroSection />
                    <MainContent />
                </main>


            </div>
        </>
    )
}
