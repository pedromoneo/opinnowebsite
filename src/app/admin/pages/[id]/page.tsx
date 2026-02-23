'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import dynamic from 'next/dynamic'

const PageEditor = dynamic(() => import('@/components/cms/PageEditor'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-opinno-accent"></div>
        </div>
    )
})

export default function EditPage() {
    const params = useParams()
    const id = params.id as string
    const [pageData, setPageData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const docRef = doc(db, 'pages', id)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setPageData({ id: docSnap.id, ...docSnap.data() })
                } else {
                    alert('Page not found!')
                }
            } catch (err) {
                console.error("Error fetching page data:", err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchPage()
        }
    }, [id])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-opinno-accent"></div>
            </div>
        )
    }

    if (!pageData) {
        return <div className="p-8 text-center text-gray-500">Document not found.</div>
    }

    return <PageEditor initialData={pageData} isNew={false} />
}
