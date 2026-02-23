'use client'

import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'

type RecentItem = {
    id: string
    title: string
    type: 'post' | 'page'
    updatedAt?: string
    publishedAt?: string
    lang?: string
    slug?: string
}

function timeAgo(dateStr?: string): string {
    if (!dateStr) return 'Unknown date'
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
    const days = Math.floor(hours / 24)
    if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`
    return new Date(dateStr).toLocaleDateString()
}

export default function AdminDashboard() {
    const [recentItems, setRecentItems] = useState<RecentItem[]>([])
    const [totalPosts, setTotalPosts] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch recent posts
                const postsSnap = await getDocs(query(collection(db, 'content'), limit(100)))
                const posts: RecentItem[] = postsSnap.docs.map(doc => ({
                    id: doc.id,
                    type: 'post',
                    title: doc.data().title || '(Untitled)',
                    updatedAt: doc.data().updatedAt,
                    publishedAt: doc.data().publishedAt,
                    lang: doc.data().lang,
                    slug: doc.data().slug,
                }))
                setTotalPosts(posts.length)

                // Fetch recent pages
                const pagesSnap = await getDocs(query(collection(db, 'pages'), limit(50)))
                const pages: RecentItem[] = pagesSnap.docs.map(doc => ({
                    id: doc.id,
                    type: 'page',
                    title: doc.data().title || '(Untitled)',
                    updatedAt: doc.data().updatedAt,
                    publishedAt: doc.data().publishedAt,
                    lang: doc.data().lang,
                    slug: doc.data().slug,
                }))

                // Merge and sort by most recently updated/published
                const allItems = [...posts, ...pages].sort((a, b) => {
                    const aDate = a.updatedAt || a.publishedAt || ''
                    const bDate = b.updatedAt || b.publishedAt || ''
                    return new Date(bDate).getTime() - new Date(aDate).getTime()
                }).slice(0, 8)

                setRecentItems(allItems)
            } catch (err) {
                console.error('Error fetching dashboard data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="flex flex-col gap-8 text-opinno-primary">
            <header>
                <h1 className="text-3xl font-display font-bold text-opinno-primary tracking-tight">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Manage content across main, english, spanish and italian regional sites.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[160px]">
                    <span className="text-4xl font-bold font-display text-opinno-accent mb-2">
                        {loading ? '…' : (totalPosts ?? 0).toLocaleString()}
                    </span>
                    <span className="text-gray-500 font-medium uppercase tracking-widest text-sm">Published Posts</span>
                </div>

                <Link
                    href="/admin/posts/new"
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[160px] cursor-pointer hover:bg-opinno-primary hover:text-white transition-colors group"
                >
                    <div className="w-12 h-12 rounded-full bg-opinno-accent group-hover:bg-white flex items-center justify-center mb-4 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-opinno-accent transition-colors" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m-7-7h14" /></svg>
                    </div>
                    <span className="font-bold tracking-wide">Create Post</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-lg font-bold font-display m-0">Recent Activity</h2>
                    <Link href="/admin/posts" className="text-sm text-opinno-accent font-medium hover:underline">View All Posts</Link>
                </div>
                <div className="p-0">
                    {loading ? (
                        <div className="p-8 text-center text-gray-400 text-sm">Loading recent activity...</div>
                    ) : recentItems.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-sm">No content yet. Create your first post!</div>
                    ) : recentItems.map((item) => (
                        <Link
                            key={item.id}
                            href={`/admin/${item.type === 'post' ? 'posts' : 'pages'}/${item.id}`}
                            className="flex items-center justify-between p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                <span className={`mt-0.5 flex-shrink-0 w-2 h-2 rounded-full ${item.type === 'post' ? 'bg-opinno-accent' : 'bg-purple-400'}`} />
                                <div className="flex flex-col">
                                    <span className="font-medium text-[#1F2A38] text-sm leading-tight">{item.title}</span>
                                    <span className="text-xs text-gray-400 mt-1">
                                        {item.type === 'post' ? 'Post' : 'Page'} · {item.lang?.toUpperCase() || 'EN'} · {timeAgo(item.updatedAt || item.publishedAt)}
                                    </span>
                                </div>
                            </div>
                            <span className={`flex-shrink-0 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${item.type === 'post'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'bg-purple-50 text-purple-600'
                                }`}>
                                {item.type}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
