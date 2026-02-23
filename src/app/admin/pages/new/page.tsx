'use client'

import dynamic from 'next/dynamic'

const PageEditor = dynamic(() => import('@/components/cms/PageEditor'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-opinno-accent"></div>
        </div>
    )
})

export default function NewPage() {
    return <PageEditor isNew={true} />
}
