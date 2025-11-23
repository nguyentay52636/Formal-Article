import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { usePaginateArray, usePagination } from '@/context/PaginationProvider'
import TablePost, { Article } from './Temp/TablePost'

interface PaginatedArticlesProps {
    articles: Article[]
    onEdit: (a: Article) => void
    onDelete: (a: Article) => void
}

export default function PaginatedArticles({ articles, onEdit, onDelete }: PaginatedArticlesProps) {
    const { page, setPage, pageCount } = usePagination()
    const pageItems = usePaginateArray(articles)

    return (
        <div className="space-y-4">
            <TablePost articles={pageItems} onEdit={onEdit} onDelete={onDelete} />

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


