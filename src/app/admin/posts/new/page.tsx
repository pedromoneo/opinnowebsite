"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function NewPost() {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [language, setLanguage] = useState('en')
    const [isPublishing, setIsPublishing] = useState(false)

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value
        setTitle(newTitle)
        // Auto-generate slug
        setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsPublishing(true)

        // Simulate Firebase delay
        setTimeout(() => {
            alert('Post Simulated as Saved to Firebase Firestore!')
            setIsPublishing(false)
            // Normally we would redirect here
        }, 1500)
    }

    return (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-20">
            <header className="flex items-center justify-between">
                <div>
                    <Link href="/admin/posts" className="text-gray-500 hover:text-opinno-accent text-sm font-medium mb-2 inline-block">
                        &larr; Back to Posts
                    </Link>
                    <h1 className="text-3xl font-display font-bold text-opinno-primary tracking-tight">Create New Post</h1>
                </div>
                <div className="flex gap-4">
                    <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm">
                        Save Draft
                    </button>
                    <button
                        disabled={isPublishing}
                        onClick={handlePublish}
                        className="px-5 py-2.5 bg-opinno-accent text-white rounded-lg font-medium hover:bg-opinno-accent-hover transition-colors shadow-sm disabled:opacity-50"
                    >
                        {isPublishing ? 'Publishing...' : 'Publish Post'}
                    </button>
                </div>
            </header>

            <form className="grid grid-cols-1 lg:grid-cols-3 gap-8" onSubmit={handlePublish}>
                {/* Main Content Area */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
                        <h2 className="text-xl font-display font-bold text-opinno-primary">Basic Information</h2>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-sm font-medium text-gray-700">Post Title</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="e.g. The Future of AI in Enterprise"
                                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-opinno-accent focus:ring-opinno-accent p-3 border"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="slug" className="text-sm font-medium text-gray-700">URL Slug</label>
                            <div className="flex items-center">
                                <span className="text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-xl px-4 py-3 text-sm">
                                    opinno.com/{language}/
                                </span>
                                <input
                                    id="slug"
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="w-full flex-1 rounded-r-xl border-gray-300 shadow-sm focus:border-opinno-accent focus:ring-opinno-accent p-3 border"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="content" className="text-sm font-medium text-gray-700">Post Content (Markdown or HTML)</label>
                            <textarea
                                id="content"
                                rows={15}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your article content here..."
                                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-opinno-accent focus:ring-opinno-accent p-3 border font-mono text-sm"
                                required
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Sidebar Area */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
                        <h2 className="text-xl font-display font-bold text-opinno-primary">Details & SEO</h2>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="language" className="text-sm font-medium text-gray-700">Base Language</label>
                            <select
                                id="language"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-opinno-accent focus:ring-opinno-accent p-3 border"
                            >
                                <option value="en">English (Pre-rendered)</option>
                                <option value="es">Spanish (Pre-rendered)</option>
                                <option value="it">Italian (Pre-rendered)</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                                Other languages will be AI-translated dynamically based on this original language.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="summary" className="text-sm font-medium text-gray-700">SEO Excerpt / Summary</label>
                            <textarea
                                id="summary"
                                rows={4}
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                placeholder="Brief summary for search engines and social media..."
                                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-opinno-accent focus:ring-opinno-accent p-3 border"
                            ></textarea>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Cover Image</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-2 text-gray-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                <span className="text-sm text-opinno-accent font-medium mt-2 inline-block">Click to upload</span>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 5MB</p>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}
