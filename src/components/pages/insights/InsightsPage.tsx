import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'

interface InsightsPageProps {
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

export default async function InsightsPage({ lang, category = 'all' }: InsightsPageProps) {
    let insights: any[] = []

    try {
        const contentRef = collection(db, 'content')
        let allDocs: any[] = []

        if (category === 'all') {
            // Query for insights AND stories
            const qInsight = query(contentRef,
                where('category', '==', 'insight'),
                where('lang', '==', lang)
            )
            const qStory = query(contentRef,
                where('category', '==', 'story'),
                where('lang', '==', lang)
            )

            const [insightSnap, storySnap] = await Promise.all([
                getDocs(qInsight),
                getDocs(qStory),
            ])

            allDocs = [
                ...insightSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
                ...storySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            ]
        } else {
            // Filter by specific subCategory (voices, articles, etc.)
            const q = query(contentRef,
                where('category', '==', 'insight'),
                where('subCategory', '==', category),
                where('lang', '==', lang)
            )
            const snap = await getDocs(q)
            allDocs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        }

        insights = allDocs
            .filter((p: any) => p.title)
            .sort((a: any, b: any) => {
                const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
                const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
                return dateB - dateA
            })
    } catch (err) {
        console.error('Failed to fetch insights:', err)
    }

    const getCategoryTitle = () => {
        switch (category) {
            case 'articles': return 'Articles'
            case 'voices': return 'Voices'
            case 'publications': return 'Publications'
            case 'conferences': return 'Conferences'
            default: return 'Insights & Stories'
        }
    }

    return (
        <InteriorPageLayout
            breadcrumb="Insights"
            title={getCategoryTitle()}
            sidebar={getSidebar("insights", lang)}
        >
            <div className="mb-4 text-sm text-opinno-gray font-body">
                Showing {insights.length} articles
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {insights.map((item: any) => (
                    <Link
                        key={item.id}
                        href={`/${lang}/${item.slugPath}`}
                        className="group block"
                    >
                        <div className="relative h-[200px] rounded-lg overflow-hidden mb-4 bg-gray-100">
                            {item.featuredImage && item.featuredImage.startsWith('http') ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={item.featuredImage}
                                    alt={item.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            ) : (
                                <PlaceholderImage title={item.title} />
                            )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] uppercase tracking-wider text-white bg-opinno-accent/80 px-2 py-0.5 rounded-full font-body">
                                {item.category === 'insight' ? 'Insight' : 'Story'}
                            </span>
                            <span className="text-xs text-opinno-gray font-body">
                                {item.publishedAt
                                    ? new Date(item.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                    : ''}
                            </span>
                        </div>
                        <h3 className="text-base font-bold leading-snug mb-2 group-hover:text-opinno-accent transition-colors line-clamp-3">
                            {item.title}
                        </h3>
                        <p className="text-sm text-opinno-gray font-body leading-relaxed line-clamp-2">
                            {item.excerpt?.substring(0, 150)}...
                        </p>
                    </Link>
                ))}
            </div>

            {insights.length === 0 && (
                <div className="text-center py-16 text-opinno-gray font-body">
                    <p className="text-lg mb-2">No insights found in this category.</p>
                    <p className="text-sm">Check back later for new content.</p>
                </div>
            )}
        </InteriorPageLayout>
    )
}
