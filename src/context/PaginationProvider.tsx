import React, { createContext, useContext, useMemo, useState } from 'react'

type PaginationContextValue = {
    page: number
    pageSize: number
    total: number
    setPage: (page: number) => void
    setPageSize: (size: number) => void
    pageCount: number
}

const PaginationContext = createContext<PaginationContextValue | undefined>(undefined)

type PaginationProviderProps = {
    children: React.ReactNode
    total: number
    initialPage?: number
    initialPageSize?: number
}

export function PaginationProvider({ children, total, initialPage = 1, initialPageSize = 10 }: PaginationProviderProps) {
    const [page, setPage] = useState(initialPage)
    const [pageSize, setPageSize] = useState(initialPageSize)

    const value = useMemo<PaginationContextValue>(() => {
        const pageCount = Math.max(1, Math.ceil(total / pageSize))
        const safePage = Math.min(Math.max(1, page), pageCount)
        if (safePage !== page) {
            // keep page within bounds
            setTimeout(() => setPage(safePage), 0)
        }
        return {
            page: safePage,
            pageSize,
            total,
            setPage,
            setPageSize,
            pageCount,
        }
    }, [page, pageSize, total])

    return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>
}

export function usePagination() {
    const ctx = useContext(PaginationContext)
    if (!ctx) throw new Error('usePagination must be used within a PaginationProvider')
    return ctx
}

export function usePaginateArray<T>(items: T[]) {
    const { page, pageSize } = usePagination()
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return items.slice(start, end)
}
