import { notFound } from 'next/navigation'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { isStaticPage, getStaticPageComponent } from '@/lib/static-page-router'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

export default async function DynamicLocalizedPage({ params }: { params: Promise<{ lang: string, slug: string[] }> }) {
    const resolvedParams = await params
    const { lang } = resolvedParams
    const slugPath = resolvedParams.slug.join('/')

    // 1. Check if this is a static page first
    if (isStaticPage(slugPath)) {
        const component = getStaticPageComponent(slugPath, lang)
        if (component) return component
    }

    // 2. Fall back to Firestore content lookup
    // The import script saves docs with IDs like: 'en-the-actual-slug'
    const actualSlug = resolvedParams.slug[resolvedParams.slug.length - 1]
    const docId = `${lang}-${actualSlug}`
    const docRef = doc(db, 'content', docId)
    const docSnap = await getDoc(docRef);

    let postData;
    if (docSnap.exists()) {
        postData = docSnap.data()
    } else {
        // Fallback: try querying by slugPath AND lang
        const q1 = query(collection(db, 'content'), where('slugPath', '==', slugPath), where('lang', '==', lang))
        const snap1 = await getDocs(q1)
        if (!snap1.empty) {
            postData = snap1.docs[0].data()
        } else {
            // Absolute fallback: try getting ANY language version if they specifically hard-linked to it
            const q2 = query(collection(db, 'content'), where('slugPath', '==', slugPath))
            const snap2 = await getDocs(q2)
            if (!snap2.empty) {
                postData = snap2.docs[0].data()
            }
        }
    }

    if (!postData) {
        return notFound()
    }

    let finalContent = postData.content
    let finalTitle = postData.title

    // Determine the breadcrumb based on category
    const category = postData.category || 'page'
    const categoryLabels: Record<string, { label: string; href: string }> = {
        story: { label: 'Stories', href: `/${lang}/stories` },
        insight: { label: 'Insights', href: `/${lang}/insights` },
        challenge: { label: 'Challenges', href: `/${lang}/challenges` },
        event: { label: 'Events', href: `/${lang}/events` },
        job: { label: 'Work', href: `/${lang}/work` },
        course: { label: 'Academy', href: `/${lang}/academy` },
    }
    const breadcrumb = categoryLabels[category]

    return (
        <div className="min-h-[70vh] bg-white">
            {/* Hero section */}
            {postData.featuredImage && (
                <div className="w-full h-[400px] relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={postData.featuredImage}
                        alt={finalTitle}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <div className="container mx-auto max-w-4xl">
                            {breadcrumb && (
                                <Link
                                    href={breadcrumb.href}
                                    className="text-white/80 hover:text-white text-sm font-medium uppercase tracking-wider mb-3 inline-block transition-colors"
                                >
                                    ← {breadcrumb.label}
                                </Link>
                            )}
                            <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                                {finalTitle}
                            </h1>
                            {postData.publishedAt && (
                                <div className="text-white/70 mt-4 text-sm">
                                    {new Date(postData.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-6 max-w-4xl py-12">
                {!postData.featuredImage && (
                    <>
                        {breadcrumb && (
                            <Link
                                href={breadcrumb.href}
                                className="text-[#76A662] hover:text-[#5c8a4e] text-sm font-medium uppercase tracking-wider mb-4 inline-block transition-colors"
                            >
                                ← {breadcrumb.label}
                            </Link>
                        )}
                        <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 text-gray-900">
                            {finalTitle}
                        </h1>
                        {postData.publishedAt && (
                            <div className="text-gray-400 mb-8 text-sm">
                                {new Date(postData.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </div>
                        )}
                        <div className="w-16 h-1 bg-[#76A662] rounded mb-8" />
                    </>
                )}

                {/* Category badge */}
                {category !== 'page' && (
                    <div className="mb-8">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                            {category}
                        </span>
                    </div>
                )}

                {postData.htmlContent ? (
                    <div
                        className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed
                            prose-headings:font-display prose-headings:text-gray-900
                            prose-a:text-[#76A662] prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-gray-900
                            prose-img:rounded-xl prose-img:shadow-md"
                        dangerouslySetInnerHTML={{ __html: postData.htmlContent }}
                    />
                ) : (
                    <div className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-wrap
                        prose-headings:font-display prose-headings:text-gray-900
                        prose-a:text-[#76A662] prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-gray-900">
                        {finalContent}
                    </div>
                )}

                {/* Bottom navigation */}
                {breadcrumb && (
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <Link
                            href={breadcrumb.href}
                            className="inline-flex items-center gap-2 text-[#76A662] hover:text-[#5c8a4e] font-medium transition-colors"
                        >
                            ← Back to {breadcrumb.label}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
