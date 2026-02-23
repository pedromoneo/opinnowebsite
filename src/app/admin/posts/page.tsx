'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, query, orderBy, limit, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function AdminPosts() {
    const [posts, setPosts] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch latest 100 posts for the dashboard simply
                const q = query(collection(db, 'content'), limit(100))
                // Note: If you want to order by date, you need an index for publishedAt DESC
                const snapshot = await getDocs(q)
                const fetchedPosts: any[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                // Sort client-side for now to avoid instantly requiring a composite index
                fetchedPosts.sort((a, b) => {
                    if (!a.publishedAt) return 1;
                    if (!b.publishedAt) return -1;
                    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                })
                setPosts(fetchedPosts)
            } catch (err) {
                console.error("Error fetching posts:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-opinno-primary tracking-tight">Posts</h1>
                    <p className="text-gray-500 mt-1">Manage all blog posts, articles, and insights.</p>
                </div>
                <Link href="/admin/posts/new" className="px-5 py-2.5 bg-opinno-accent text-white rounded-lg font-medium hover:bg-opinno-accent-hover transition-colors shadow-sm flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m-7-7h14" /></svg>
                    Create Post
                </Link>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="flex-1 rounded-lg border-gray-300 focus:border-opinno-accent focus:ring-opinno-accent sm:text-sm"
                    />
                    <select className="rounded-lg border-gray-300 focus:border-opinno-accent focus:ring-opinno-accent sm:text-sm">
                        <option>All Languages</option>
                        <option value="en">English (en)</option>
                        <option value="es">Spanish (es)</option>
                        <option value="it">Italian (it)</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        Loading posts...
                                    </td>
                                </tr>
                            ) : posts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No posts found.
                                    </td>
                                </tr>
                            ) : posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900 max-w-md truncate">{post.title}</div>
                                        <div className="text-xs text-gray-500 truncate">/{post.lang}/{post.slug}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 uppercase">
                                            {post.lang || 'en'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600 capitalize">
                                            {post.cmsCategory || post.subCategory || post.category || 'none'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/posts/${post.id}`} className="text-opinno-accent hover:text-opinno-accent-hover mr-4">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
