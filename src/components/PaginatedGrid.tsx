'use client'

import { useState } from 'react'

const ITEMS_PER_PAGE = 12

function getPageNumbers(current: number, total: number): (number | '...')[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

    const pages: (number | '...')[] = [1]

    if (current > 3) pages.push('...')

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) pages.push(i)

    if (current < total - 2) pages.push('...')

    pages.push(total)
    return pages
}

interface PaginatedGridProps {
    items: React.ReactNode[]
    totalCount: number
    columns?: 2 | 3
    label?: string
}

export default function PaginatedGrid({ items, totalCount, columns = 3, label = 'articles' }: PaginatedGridProps) {
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
    const start = (page - 1) * ITEMS_PER_PAGE
    const visibleItems = items.slice(start, start + ITEMS_PER_PAGE)

    const gridCols = columns === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

    return (
        <>
            <div className="mb-4 text-sm text-opinno-gray font-body">
                Showing {start + 1}–{Math.min(start + ITEMS_PER_PAGE, totalCount)} of {totalCount} {label}
            </div>

            <div className={`grid ${gridCols} gap-8`}>
                {visibleItems}
            </div>

            {totalPages > 1 && (
                <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-2 text-sm font-medium rounded-lg border border-opinno-border hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Prev
                    </button>

                    {getPageNumbers(page, totalPages).map((n, i) =>
                        n === '...' ? (
                            <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-sm text-opinno-gray">
                                ...
                            </span>
                        ) : (
                            <button
                                key={n}
                                onClick={() => setPage(n as number)}
                                className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                                    n === page
                                        ? 'bg-opinno-accent text-white'
                                        : 'border border-opinno-border hover:bg-gray-50'
                                }`}
                            >
                                {n}
                            </button>
                        )
                    )}

                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-2 text-sm font-medium rounded-lg border border-opinno-border hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Next →
                    </button>
                </nav>
            )}
        </>
    )
}
