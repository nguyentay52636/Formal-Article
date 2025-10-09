import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { usePaginateArray, usePagination } from '@/context/PaginationProvider'

interface TagItem {
    id: number
    tenTapTin: string
    loai: string
    dinhDang: string
    kichThuoc: number
    nguoiTai: string
    luotTai: number
    ngayTao: string
}
interface PaginationFilesProps {
    tags: TagItem[]
}

export default function PaginationFiles({ tags }: PaginationFilesProps) {
    const { page, setPage, pageCount } = usePagination()
    const pageItems = usePaginateArray(tags)

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


