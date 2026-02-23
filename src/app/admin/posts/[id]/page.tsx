'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc, DocumentData } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import PostEditor from '@/components/cms/PostEditor'

export default function EditPostPage() {
    const params = useParams()
    const id = params.id as string
    const [postData, setPostData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const docRef = doc(db, 'content', id)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setPostData({ id: docSnap.id, ...docSnap.data() })
                } else {
                    alert('Post not found!')
                }
            } catch (err) {
                console.error("Error fetching post data:", err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchPost()
        }
    }, [id])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-opinno-accent"></div>
            </div>
        )
    }

    if (!postData) {
        return <div className="p-8 text-center text-gray-500">Document not found.</div>
    }

    return <PostEditor initialData={postData} isNew={false} />
}
