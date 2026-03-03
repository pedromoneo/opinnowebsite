'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false, loading: () => <p>Loading editor...</p> })

const VALID_CATEGORIES = ['insights', 'voices', 'publications', 'impact stories', 'news', 'press releases'] as const;
type CMSCategory = typeof VALID_CATEGORIES[number];

type PostData = {
    id?: string;
    title: string;
    subtitle?: string;
    excerpt: string;
    content: string; // html content
    cmsCategory: CMSCategory | '';
    slug: string;
    lang: string;
    publishedAt: string;
    wpTags: string[];
    thumbnailUrl?: string;
    headerUrl?: string;
    publicationUrl?: string;
}

export default function PostEditor({ initialData, isNew = false }: { initialData?: PostData, isNew?: boolean }) {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [generatingTags, setGeneratingTags] = useState(false)
    const [generatingImages, setGeneratingImages] = useState<{ thumbnailUrl: boolean; headerUrl: boolean }>({ thumbnailUrl: false, headerUrl: false })
    const [showHtml, setShowHtml] = useState(false)

    // Map legacy 'article' cmsCategory to 'insights'
    const rawCategory = initialData?.cmsCategory?.toLowerCase() || ''
    const mappedCategory = (rawCategory === 'article' ? 'insights' : rawCategory) as CMSCategory

    const [formData, setFormData] = useState<PostData>({
        id: initialData?.id || '',
        title: initialData?.title || '',
        subtitle: initialData?.subtitle || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        cmsCategory: VALID_CATEGORIES.includes(mappedCategory) ? mappedCategory : '',
        slug: initialData?.slug || '',
        lang: initialData?.lang || 'en',
        publishedAt: (initialData?.publishedAt || '').split('T')[0] || new Date().toISOString().split('T')[0],
        wpTags: initialData?.wpTags || [],
        thumbnailUrl: initialData?.thumbnailUrl || '',
        headerUrl: initialData?.headerUrl || '',
        publicationUrl: initialData?.publicationUrl || ''
    })

    const handleSave = async (e: FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            // Document ID structure: `${lang}-${slug}`
            const docId = initialData?.id || `${formData.lang}-${formData.slug}`
            const docRef = doc(db, 'content', docId)

            // Derive category, subCategory, and slugPath from cmsCategory
            const isStory = formData.cmsCategory === 'news' || formData.cmsCategory === 'impact stories' || formData.cmsCategory === 'press releases'
            const finalCategory = isStory ? 'story' : 'insights'
            const finalSubCategory = formData.cmsCategory === 'news' ? 'news'
                : formData.cmsCategory === 'impact stories' ? 'impact'
                : formData.cmsCategory === 'press releases' ? 'press-releases'
                : formData.cmsCategory === 'voices' ? 'voices'
                : formData.cmsCategory === 'publications' ? 'publications'
                : 'insights'
            const finalSlugPath = isStory ? `story/${formData.slug}` : `insights/${formData.slug}`

            const nowISO = new Date().toISOString()

            // Convert date-only string (from date input) to full ISO timestamp
            const publishedAtISO = formData.publishedAt
                ? (formData.publishedAt.includes('T') ? formData.publishedAt : `${formData.publishedAt}T00:00:00.000Z`)
                : nowISO

            const dataToSave = {
                ...formData,
                cmsCategory: formData.cmsCategory,
                category: finalCategory,
                subCategory: finalSubCategory,
                slugPath: finalSlugPath,
                publishedAt: publishedAtISO,
                updatedAt: nowISO,
                // Set createdAt only when creating a new post (never overwrite on edit)
                ...(isNew ? { createdAt: nowISO } : {}),
            }

            await setDoc(docRef, dataToSave, { merge: true })
            alert('Post saved successfully!')
            router.push('/admin/posts')
        } catch (err: any) {
            alert(`Error saving post: ${err.message}`)
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
        if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return;

        setSaving(true)
        try {
            const docId = initialData?.id || `${formData.lang}-${formData.slug}`
            await deleteDoc(doc(db, 'content', docId))
            alert('Post deleted successfully.')
            router.push('/admin/posts')
        } catch (e: any) {
            alert(`Error deleting post: ${e.message}`)
            setSaving(false)
        }
    }

    const [uploadingPublication, setUploadingPublication] = useState(false)

    const handlePublicationUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploadingPublication(true)
        try {
            const fileRef = ref(storage, `publications/${Date.now()}_${file.name}`)
            const uploadTask = await uploadBytesResumable(fileRef, file)
            const downloadUrl = await getDownloadURL(uploadTask.ref)
            setFormData(prev => ({ ...prev, publicationUrl: downloadUrl }))
        } catch (err: any) {
            alert(`Error uploading publication: ${err.message}`)
        } finally {
            setUploadingPublication(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'thumbnailUrl' | 'headerUrl') => {
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

    const generateImage = async (field: 'thumbnailUrl' | 'headerUrl') => {
        if (!formData.title) {
            alert('Please add a title first to generate an image.')
            return
        }

        setGeneratingImages(prev => ({ ...prev, [field]: true }))
        try {
            const res = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    excerpt: formData.excerpt,
                    type: (formData.cmsCategory === 'impact stories' || formData.cmsCategory === 'news') ? 'story' : 'post'
                })
            })

            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.error || 'Failed to generate image.')
            }

            const data = await res.json()
            const imageUrl = data[field]
            if (imageUrl) {
                setFormData(prev => ({ ...prev, [field]: imageUrl }))
            }
        } catch (err: any) {
            alert(`Error generating image: ${err.message}`)
        } finally {
            setGeneratingImages(prev => ({ ...prev, [field]: false }))
        }
    }

    return (
        <form onSubmit={handleSave} className="flex flex-col gap-8 max-w-4xl">
            <header className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-3xl font-display font-bold text-opinno-primary tracking-tight">
                        {isNew ? 'Create New Post' : 'Edit Post'}
                    </h1>
                </div>
                <div className="flex gap-4">
                    {!isNew && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
                        >
                            Delete Post
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => router.push('/admin/posts')}
                        className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2.5 bg-opinno-accent text-white rounded-lg hover:bg-opinno-accent-hover transition-colors font-medium shadow-sm disabled:opacity-50 flex flex-center gap-2"
                    >
                        {saving ? 'Saving...' : 'Save Post'}
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
                        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                            {[
                                { label: 'Thumbnail', field: 'thumbnailUrl' as const },
                                { label: 'Header Picture', field: 'headerUrl' as const }
                            ].map(img => (
                                <div key={img.field} className="flex flex-col gap-2">
                                    <label className="block text-sm font-semibold text-gray-700">{img.label}</label>
                                    {formData[img.field] ? (
                                        <>
                                            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200">
                                                <img src={formData[img.field]} alt="" className="object-cover w-full h-full" />
                                                <button type="button" onClick={() => setFormData(prev => ({ ...prev, [img.field]: '' }))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow">×</button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => generateImage(img.field)}
                                                disabled={generatingImages[img.field]}
                                                className="text-xs bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1.5 rounded-lg border border-purple-200 font-medium transition-colors disabled:opacity-50 flex items-center gap-1 w-full justify-center"
                                            >
                                                {generatingImages[img.field] ? '✨ Generating…' : '✨ Regenerate with AI'}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <span className="text-xs text-gray-500 text-center px-2">Upload {img.label}</span>
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, img.field)} />
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => generateImage(img.field)}
                                                disabled={generatingImages[img.field]}
                                                className="text-xs bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1.5 rounded-lg border border-purple-200 font-medium transition-colors disabled:opacity-50 flex items-center gap-1 w-full justify-center"
                                            >
                                                {generatingImages[img.field] ? '✨ Generating…' : '✨ Generate with AI'}
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Publication File Upload (only for publications category) */}
                        {formData.cmsCategory === 'publications' && (
                            <div className="pt-4 border-t border-gray-100">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Publication File (PDF)</label>
                                <p className="text-xs text-gray-500 mb-3">Upload the report/publication file that clients can download.</p>
                                {formData.publicationUrl ? (
                                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-sm text-green-700 font-medium flex-1 truncate">File uploaded</span>
                                        <a href={formData.publicationUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline">Preview</a>
                                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, publicationUrl: '' }))} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
                                    </div>
                                ) : (
                                    <label className={`flex flex-col items-center justify-center w-full py-8 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer ${uploadingPublication ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                        </svg>
                                        <span className="text-sm text-gray-500">{uploadingPublication ? 'Uploading...' : 'Click to upload PDF, DOC, or DOCX'}</span>
                                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handlePublicationUpload} disabled={uploadingPublication} />
                                    </label>
                                )}
                            </div>
                        )}
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
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                            <select
                                required
                                value={formData.cmsCategory}
                                onChange={e => setFormData({ ...formData, cmsCategory: e.target.value as CMSCategory })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none transition-colors"
                            >
                                <option value="" disabled>Select a category...</option>
                                {VALID_CATEGORIES.map(cat => (
                                    <option key={cat} value={cat} className="capitalize">{cat}</option>
                                ))}
                            </select>
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
