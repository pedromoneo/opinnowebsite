'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, query, limit, getDocs, DocumentData, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function AdminPages() {
    const [pages, setPages] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState(true)
    const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; pageId: string | null; pageTitle: string }>({
        isOpen: false, pageId: null, pageTitle: ''
    })
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
        show: false, message: '', type: 'success'
    })

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, message, type })
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000)
    }

    const handleStatusChange = async (pageId: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, 'pages', pageId), { status: newStatus })
            setPages(pages.map(p => p.id === pageId ? { ...p, status: newStatus } : p))
            showToast(`Status updated to ${newStatus}`)
        } catch (err: any) {
            showToast(`Error: ${err.message}`, 'error')
        }
    }

    const executeDeletePage = async () => {
        const pageId = confirmModal.pageId
        if (!pageId) return
        try {
            await deleteDoc(doc(db, 'pages', pageId))
            setPages(pages.filter(p => p.id !== pageId))
            showToast('Page deleted successfully')
        } catch (err: any) {
            showToast(`Error: ${err.message}`, 'error')
        } finally {
            setConfirmModal({ isOpen: false, pageId: null, pageTitle: '' })
        }
    }

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const q = query(collection(db, 'pages'), limit(100))
                const snapshot = await getDocs(q)
                const fetchedPages: any[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
                const toMs = (v: any): number => {
                    if (!v) return 0;
                    if (typeof v?.toMillis === 'function') return v.toMillis();
                    if (typeof v?.toDate === 'function') return v.toDate().getTime();
                    if (v?.seconds) return v.seconds * 1000;
                    const d = new Date(v).getTime();
                    return isNaN(d) ? 0 : d;
                };
                fetchedPages.sort((a, b) => toMs(b.publishedAt) - toMs(a.publishedAt))
                setPages(fetchedPages)
            } catch (err) {
                console.error("Error fetching pages:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchPages()
    }, [])

    const fmtDate = (v: any) => {
        if (!v) return '-'
        const d = typeof v?.toDate === 'function' ? v.toDate() : v?.seconds ? new Date(v.seconds * 1000) : new Date(v)
        return d instanceof Date && !isNaN(d.getTime()) ? d.toLocaleDateString() : '-'
    }

    return (
        <div className="flex flex-col gap-4 sm:gap-6">
            {/* Toast */}
            {toast.show && (
                <div className={`fixed top-4 right-4 max-w-xs w-full z-50 p-3 rounded-lg shadow-lg border text-sm font-medium ${
                    toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
                } transition-all duration-300 ease-in-out flex items-start gap-2`}>
                    <div className="flex-1">{toast.message}</div>
                    <button onClick={() => setToast(prev => ({ ...prev, show: false }))} className="text-gray-400 hover:text-gray-600 text-lg leading-none">&times;</button>
                </div>
            )}

            {/* Delete modal */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Page</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            Are you sure you want to delete &ldquo;{confirmModal.pageTitle}&rdquo;? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setConfirmModal({ isOpen: false, pageId: null, pageTitle: '' })}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                                Cancel
                            </button>
                            <button onClick={executeDeletePage}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm">
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <header className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-opinno-primary tracking-tight">Pages</h1>
                    <p className="text-gray-500 mt-1 text-sm hidden sm:block">Manage static pages across the site.</p>
                </div>
                <Link href="/admin/pages/new" className="px-4 py-2 bg-opinno-accent text-white rounded-lg font-medium hover:bg-opinno-accent-hover transition-colors shadow-sm flex items-center gap-2 text-sm flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m-7-7h14" /></svg>
                    <span className="hidden sm:inline">Create Page</span>
                </Link>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-3 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                    <input type="text" placeholder="Search pages..."
                        className="flex-1 rounded-lg border-gray-300 focus:border-opinno-accent focus:ring-opinno-accent text-sm py-1.5" />
                    <select className="rounded-lg border-gray-300 focus:border-opinno-accent focus:ring-opinno-accent text-sm py-1.5">
                        <option>All Languages</option>
                        <option value="en">EN</option>
                        <option value="es">ES</option>
                        <option value="it">IT</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Lang</th>
                                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                                <th className="px-3 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-500">Loading pages...</td></tr>
                            ) : pages.length === 0 ? (
                                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-500">No pages found.</td></tr>
                            ) : pages.map((page) => (
                                <tr key={page.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 py-3 max-w-[300px]">
                                        <div className="font-medium text-gray-900 truncate">{page.title}</div>
                                        <div className="text-xs text-gray-400 truncate">/{page.lang}/{page.slug}</div>
                                    </td>
                                    <td className="px-3 py-3 whitespace-nowrap hidden md:table-cell">
                                        <span className="px-1.5 py-0.5 text-xs font-semibold rounded bg-gray-100 text-gray-700 uppercase">{page.lang || 'en'}</span>
                                    </td>
                                    <td className="px-3 py-3 whitespace-nowrap">
                                        <select
                                            value={page.status || 'published'}
                                            onChange={(e) => handleStatusChange(page.id, e.target.value)}
                                            className={`text-xs border rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-opinno-accent cursor-pointer ${
                                                page.status === 'draft' ? 'border-amber-300 text-amber-700' : 'border-green-300 text-green-700'
                                            }`}
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </td>
                                    <td className="px-3 py-3 whitespace-nowrap text-gray-500 text-xs hidden sm:table-cell">
                                        {fmtDate(page.publishedAt)}
                                    </td>
                                    <td className="px-3 py-3 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {/* View */}
                                            <a href={`https://opinnowebsite.web.app/${page.lang || 'en'}/${page.slug}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                title="View on site">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                            </a>
                                            {/* Edit */}
                                            <Link href={`/admin/pages/${page.id}`}
                                                className="p-1.5 rounded-md text-gray-400 hover:text-opinno-accent hover:bg-opinno-accent/5 transition-colors"
                                                title="Edit page">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            </Link>
                                            {/* Delete */}
                                            <button
                                                onClick={() => setConfirmModal({ isOpen: true, pageId: page.id, pageTitle: page.title })}
                                                className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                title="Delete page">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
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
