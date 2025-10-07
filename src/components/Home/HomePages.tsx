import React from 'react'
import { Header } from './components/Header/Header'
import { CategoryNavigate } from './components/Categories/CategoryNavigate'
import Logo from './components/Categories/Logo'

export default function HomePages() {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Header />
                <Logo />
                <CategoryNavigate />
            </div>
        </>
    )
}
