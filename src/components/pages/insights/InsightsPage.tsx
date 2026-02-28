import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"
import { queryCollection } from '@/lib/firestore-server'
import Link from 'next/link'
import PaginatedGrid from '@/components/PaginatedGrid'

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

function InsightCard({ item, lang }: { item: any; lang: string }) {
    return (
        <Link
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
                    {item.cmsCategory === 'voices' ? 'Voices'
                        : item.cmsCategory === 'publications' ? 'Publications'
                        : 'Insights'}
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
    )
}

export default async function InsightsPage({ lang, category = 'all' }: InsightsPageProps) {
    let insights: any[] = []

    try {
        let allDocs: any[] = []

        if (category === 'all') {
            // Insights section: only insights-category posts (NOT stories)
            const [insightsNew, insightsLegacy] = await Promise.all([
                queryCollection('content', [
                    { field: 'category', op: '==', value: 'insights' },
                    { field: 'lang', op: '==', value: lang },
                ]),
                queryCollection('content', [
                    { field: 'category', op: '==', value: 'insight' },
                    { field: 'lang', op: '==', value: lang },
                ]),
            ])
            allDocs = [...insightsNew, ...insightsLegacy]
        } else {
            const [catNew, catLegacy] = await Promise.all([
                queryCollection('content', [
                    { field: 'category', op: '==', value: 'insights' },
                    { field: 'subCategory', op: '==', value: category },
                    { field: 'lang', op: '==', value: lang },
                ]),
                queryCollection('content', [
                    { field: 'category', op: '==', value: 'insight' },
                    { field: 'subCategory', op: '==', value: category },
                    { field: 'lang', op: '==', value: lang },
                ]),
            ])
            allDocs = [...catNew, ...catLegacy]
        }

        insights = allDocs
            .filter((p: any) => p.title && p.status !== 'draft')
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
            case 'insights': return 'Insights'
            case 'voices': return 'Voices'
            case 'publications': return 'Publications'
            case 'conferences': return 'Conferences'
            default: return 'All'
        }
    }

    const cards = insights.map((item: any) => (
        <InsightCard key={item.id} item={item} lang={lang} />
    ))

    return (
        <InteriorPageLayout
            breadcrumb="Insights"
            title={getCategoryTitle()}
            sidebar={getSidebar("insights", lang)}
        >
            {insights.length > 0 ? (
                <PaginatedGrid items={cards} totalCount={insights.length} columns={3} label="articles" />
            ) : (
                <div className="text-center py-16 text-opinno-gray font-body">
                    <p className="text-lg mb-2">No insights found in this category.</p>
                    <p className="text-sm">Check back later for new content.</p>
                </div>
            )}
        </InteriorPageLayout>
    )
}
