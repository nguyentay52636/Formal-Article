import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { usePaginateArray, usePagination } from '@/context/PaginationProvider'
import { UserItem } from './TableNguoiDung'

interface PaginationNguoiDungProps {
    users: UserItem[]
}

export default function PaginationNguoiDung({ users }: PaginationNguoiDungProps) {
    const { page, setPage, pageCount } = usePagination()
    const pageItems = usePaginateArray(users)

    return (
        <div className="space-y-4">

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(Math.max(1, page - 1)) }} />
                    </PaginationItem>
                    {Array.from({ length: pageCount }).map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink href="#" isActive={page === i + 1} onClick={(e) => { e.preventDefault(); setPage(i + 1) }}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(Math.min(pageCount, page + 1)) }} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}


