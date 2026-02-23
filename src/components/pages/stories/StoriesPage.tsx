import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'

interface StoriesPageProps {
    lang: string
    category?: string
}

// Placeholder gradient for posts without images
function PlaceholderImage({ title }: { title: string }) {
    return (
        <div className="w-full h-full bg-gradient-to-br from-opinno-accent/20 via-opinno-accent/10 to-gray-100 flex items-center justify-center p-4">
            <span className="text-opinno-accent/40 text-3xl font-heading font-bold text-center leading-tight line-clamp-2">
                {title?.charAt(0)?.toUpperCase() || 'O'}
            </span>
        </div>
    )
}

export default async function StoriesPage({ lang, category = 'all' }: StoriesPageProps) {
    let stories: any[] = []

    try {
        const contentRef = collection(db, 'content')
        let q;

        if (category === 'all') {
            q = query(contentRef,
                where('category', '==', 'story'),
                where('lang', '==', lang)
            )
        } else {
            // Handle sub-categories (impact, news, press)
            q = query(contentRef,
                where('category', '==', 'story'),
                where('subCategory', '==', category),
                where('lang', '==', lang)
            )
        }

        const contentSnapshot = await getDocs(q)

        stories = contentSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter((p: any) => p.title)
            .sort((a: any, b: any) => {
                const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
                const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
                return dateB - dateA
            })
    } catch (err) {
        console.error('Failed to fetch stories:', err)
    }

    const getCategoryTitle = () => {
        switch (category) {
            case 'impact': return 'Impact Stories'
            case 'news': return 'News'
            case 'press-releases': return 'Press Releases'
            case 'press': return 'Press'
            default: return 'Stories'
        }
    }

    return (
        <InteriorPageLayout
            breadcrumb="News"
            title={getCategoryTitle()}
            sidebar={getSidebar("stories", lang)}
        >
            <div className="mb-4 text-sm text-opinno-gray font-body">
                Showing {stories.length} stories
            </div>

            {/* Grid of story cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story: any) => (
                    <Link
                        key={story.id}
                        href={`/${lang}/${story.slugPath}`}
                        className="group block"
                    >
                        <div className="relative h-[200px] rounded-lg overflow-hidden mb-4 bg-gray-100">
                            {story.featuredImage && story.featuredImage.startsWith('http') ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={story.featuredImage}
                                    alt={story.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            ) : (
                                <PlaceholderImage title={story.title} />
                            )}
                        </div>
                        <div className="text-xs text-opinno-gray font-body mb-2">
                            {story.publishedAt
                                ? new Date(story.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                : ''}
                        </div>
                        <h3 className="text-base font-bold leading-snug mb-2 group-hover:text-opinno-accent transition-colors line-clamp-3">
                            {story.title}
                        </h3>
                        <p className="text-sm text-opinno-gray font-body leading-relaxed line-clamp-2">
                            {story.excerpt?.substring(0, 150)}...
                        </p>
                    </Link>
                ))}
            </div>

            {stories.length === 0 && (
                <div className="text-center py-16 text-opinno-gray font-body">
                    <p className="text-lg mb-2">No stories found in this category.</p>
                    <p className="text-sm">Check back later for new content.</p>
                </div>
            )}
        </InteriorPageLayout>
    )
}
