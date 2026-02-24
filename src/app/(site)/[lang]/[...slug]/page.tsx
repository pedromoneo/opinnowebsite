import { notFound } from 'next/navigation'
import { queryCollection, getDocument } from '@/lib/firestore-server'
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

    let postData;
    const docResult = await getDocument('content', docId)
    if (docResult) {
        postData = docResult
    } else {
        // Fallback: try querying by slugPath AND lang
        const results1 = await queryCollection('content', [
            { field: 'slugPath', op: '==', value: slugPath },
            { field: 'lang', op: '==', value: lang },
        ])
        if (results1.length > 0) {
            postData = results1[0]
        } else {
            // Absolute fallback: try getting ANY language version if they specifically hard-linked to it
            const results2 = await queryCollection('content', [
                { field: 'slugPath', op: '==', value: slugPath },
            ])
            if (results2.length > 0) {
                postData = results2[0]
            }
        }
    }

    if (!postData) {
        return notFound()
    }

    // Strip WordPress block comments, literal \n escape sequences and markdown escapes
    const rawContent = postData.htmlContent || postData.content || ''
    let finalContent = rawContent
        .replace(/<!--[\s\S]*?-->/g, '')          // strip ALL HTML comments (wp block markers etc.)
        .replace(/\\\\n/g, '')                     // strip literal backslash-n sequences
        .replace(/\\\\_/g, '')                     // strip markdown escape: \_
        .replace(/\\\\\\\\/g, '')                  // strip double backslashes
        .replace(/>\s*n+\s*</g, '><')              // remove stray 'n's between HTML tags
        .replace(/^\s*n+\s*(?=<)/g, '')            // remove stray 'n's at the start before an HTML tag
        .replace(/(?<=>)\s*n+\s*$/g, '')           // remove stray 'n's at the end after an HTML tag
        .trim()

    // Remove leading <img> from content if we already show the featured image
    if (postData.featuredImage) {
        finalContent = finalContent.replace(/^\s*<img[^>]*\/?>\s*/i, '')
    }
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
            <div className="container mx-auto px-6 max-w-4xl pt-10 pb-12">
                {/* Featured image (contained, rounded) */}
                {postData.featuredImage && (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={postData.featuredImage}
                            alt={finalTitle}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}

                {/* Breadcrumb */}
                {breadcrumb && (
                    <Link
                        href={breadcrumb.href}
                        className="text-[#76A662] hover:text-[#5c8a4e] text-sm font-semibold uppercase tracking-wider mb-3 inline-block transition-colors"
                    >
                        ← {breadcrumb.label}
                    </Link>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-display font-extrabold text-[#0b2341] leading-tight mb-4 tracking-tight">
                    {finalTitle}
                </h1>

                {/* Date + category badge */}
                <div className="flex items-center gap-3 mb-2">
                    {postData.publishedAt && (
                        <span className="text-gray-400 text-sm">
                            {new Date(postData.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </span>
                    )}
                    {category !== 'page' && (
                        <>
                            {postData.publishedAt && (
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                            )}
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                                {category}
                            </span>
                        </>
                    )}
                </div>

                {/* Accent bar */}
                <div className="w-12 h-[3px] bg-[#76A662] rounded mt-6 mb-8" />

                {/* Article content */}
                {finalContent ? (
                    <div
                        className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed
                            prose-headings:font-display prose-headings:text-gray-900
                            prose-a:text-[#76A662] prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-gray-900
                            prose-img:rounded-xl prose-img:shadow-md"
                        dangerouslySetInnerHTML={{ __html: finalContent }}
                    />
                ) : null}

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
