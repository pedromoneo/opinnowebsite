'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false, loading: () => <p>Loading editor...</p> })

type PageData = {
    id?: string;
    title: string;
    subtitle?: string;
    excerpt: string;
    content: string; // html content
    slug: string;
    lang: string;
    publishedAt: string;
    wpTags: string[];
    thumbnailUrl?: string;
    bannerUrl?: string;
    headerUrl?: string;
}

export default function PageEditor({ initialData, isNew = false }: { initialData?: PageData, isNew?: boolean }) {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [generatingTags, setGeneratingTags] = useState(false)
    const [showHtml, setShowHtml] = useState(false)

    const [formData, setFormData] = useState<PageData>({
        id: initialData?.id || '',
        title: initialData?.title || '',
        subtitle: initialData?.subtitle || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        slug: initialData?.slug || '',
        lang: initialData?.lang || 'en',
        publishedAt: initialData?.publishedAt || new Date().toISOString().split('T')[0],
        wpTags: initialData?.wpTags || [],
        thumbnailUrl: initialData?.thumbnailUrl || '',
        bannerUrl: initialData?.bannerUrl || '',
        headerUrl: initialData?.headerUrl || ''
    })

    const handleSave = async (e: FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            // Document ID structure: `${lang}-${slug}`
            const docId = initialData?.id || `${formData.lang}-${formData.slug}`
            const docRef = doc(db, 'pages', docId)

            const dataToSave = {
                ...formData,
                updatedAt: new Date().toISOString()
            }

            await setDoc(docRef, dataToSave, { merge: true })
            alert('Page saved successfully!')
            router.push('/admin/pages')
        } catch (err: any) {
            alert(`Error saving page: ${err.message}`)
        } finally {
            setSaving(false)
        }
    }

    const autoGenerateTags = async () => {
        if (!formData.content) {
            alert("Please add some content first to generate tags.")
            return
        }

        setGeneratingTags(true)
        try {
            const res = await fetch('/api/generate-tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: formData.content, title: formData.title })
            })

            if (!res.ok) throw new Error("Failed to generate tags.")

            const data = await res.json()
            if (data.tags) {
                setFormData(prev => ({
                    ...prev,
                    wpTags: Array.from(new Set([...prev.wpTags, ...data.tags]))
                }))
            }
        } catch (err: any) {
            alert(`Error generating tags: ${err.message}`)
        } finally {
            setGeneratingTags(false)
        }
    }

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            wpTags: prev.wpTags.filter(t => t !== tagToRemove)
        }))
    }

    const addManualTag = () => {
        const tag = prompt("Enter a new tag")
        if (tag && tag.trim()) {
            setFormData(prev => ({
                ...prev,
                wpTags: [...prev.wpTags, tag.trim()]
            }))
        }
    }

    const handleDelete = async () => {
        if (isNew) return;
        if (!confirm('Are you sure you want to delete this page? This cannot be undone.')) return;

        setSaving(true)
        try {
            const docId = initialData?.id || `${formData.lang}-${formData.slug}`
            await deleteDoc(doc(db, 'pages', docId))
            alert('Page deleted successfully.')
            router.push('/admin/pages')
        } catch (e: any) {
            alert(`Error deleting page: ${e.message}`)
            setSaving(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'thumbnailUrl' | 'bannerUrl' | 'headerUrl') => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            const fileRef = ref(storage, `images/${Date.now()}_${file.name}`)
            const uploadTask = await uploadBytesResumable(fileRef, file)
            const downloadUrl = await getDownloadURL(uploadTask.ref)
            setFormData(prev => ({ ...prev, [fieldName]: downloadUrl }))
        } catch (err: any) {
            alert(`Error uploading image: ${err.message}`)
        }
    }

    return (
        <form onSubmit={handleSave} className="flex flex-col gap-8 max-w-4xl">
            <header className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-3xl font-display font-bold text-opinno-primary tracking-tight">
                        {isNew ? 'Create New Page' : 'Edit Page'}
                    </h1>
                </div>
                <div className="flex gap-4">
                    {!isNew && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
                        >
                            Delete Page
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => router.push('/admin/pages')}
                        className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2.5 bg-opinno-accent text-white rounded-lg hover:bg-opinno-accent-hover transition-colors font-medium shadow-sm disabled:opacity-50 flex flex-center gap-2"
                    >
                        {saving ? 'Saving...' : 'Save Page'}
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Excerpt</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none resize-y"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center justify-between">
                                Content *
                                <button type="button" onClick={() => setShowHtml(!showHtml)} className="text-xs text-opinno-accent hover:underline">
                                    {showHtml ? 'Show WYSIWYG' : 'Show HTML'}
                                </button>
                            </label>
                            {showHtml ? (
                                <textarea
                                    required
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    rows={18}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none font-mono text-sm resize-y"
                                />
                            ) : (
                                <div className="h-[400px] mb-12">
                                    <ReactQuill theme="snow" value={formData.content} onChange={(val) => setFormData({ ...formData, content: val })} className="h-[350px]" />
                                </div>
                            )}
                        </div>

                        {/* Image Uploads */}
                        <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                            {[
                                { label: 'Thumbnail', field: 'thumbnailUrl' as const },
                                { label: 'Banner Picture', field: 'bannerUrl' as const },
                                { label: 'Header Picture', field: 'headerUrl' as const }
                            ].map(img => (
                                <div key={img.field} className="flex flex-col gap-2">
                                    <label className="block text-sm font-semibold text-gray-700">{img.label}</label>
                                    {formData[img.field] ? (
                                        <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200">
                                            <img src={formData[img.field]} alt="" className="object-cover w-full h-full" />
                                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, [img.field]: '' }))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow">×</button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                                            <span className="text-xs text-gray-500 text-center px-2">Upload {img.label}</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, img.field)} />
                                        </label>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Config Area */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Language *</label>
                            <select
                                required
                                value={formData.lang}
                                onChange={e => setFormData({ ...formData, lang: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                                disabled={!isNew}
                            >
                                <option value="en">English (en)</option>
                                <option value="es">Spanish (es)</option>
                                <option value="it">Italian (it)</option>
                            </select>
                            {!isNew && <p className="text-xs text-gray-500 mt-1">Language cannot be changed after creation.</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">URL Slug *</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                                disabled={!isNew}
                            />
                            {!isNew && <p className="text-xs text-gray-500 mt-1">Slug cannot be changed after creation.</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Publish Date *</label>
                            <input
                                type="date"
                                required
                                value={formData.publishedAt}
                                onChange={e => setFormData({ ...formData, publishedAt: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Tags UI */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-semibold text-gray-700">Tags</label>
                            <button
                                type="button"
                                onClick={autoGenerateTags}
                                disabled={generatingTags}
                                className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1.5 rounded-full font-medium transition-colors disabled:opacity-50 flex items-center gap-1"
                            >
                                {generatingTags ? 'Generating...' : '✨ Auto-tag'}
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {formData.wpTags.map(tag => (
                                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="text-gray-500 hover:text-red-500 rounded-full focus:outline-none"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                            <button
                                type="button"
                                onClick={addManualTag}
                                className="inline-flex items-center justify-center w-7 h-7 bg-gray-50 border border-gray-300 border-dashed text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
