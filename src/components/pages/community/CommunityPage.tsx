import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"
import { queryCollection } from '@/lib/firestore-server'
import Link from 'next/link'
import PaginatedGrid from '@/components/PaginatedGrid'

interface CommunityPageProps {
    lang: string
    section: string
}

const COMMUNITY_CONTENT: Record<string, { title: string; description: string; items: { title: string; desc: string }[] }> = {
    work: {
        title: 'Work',
        description: 'Join Opinno\'s global community of innovators and contribute to projects that make a real impact.',
        items: [
            { title: 'Freelance Projects', desc: 'Join our network of innovation experts and work on exciting projects with leading organizations worldwide.' },
            { title: 'Full-time Positions', desc: 'Explore career opportunities at Opinno offices around the world.' },
            { title: 'Expert Community', desc: 'Become part of our 50K+ expert community and contribute your knowledge to innovation challenges.' },
        ],
    },
    events: {
        title: 'Events',
        description: 'Attend our innovation events, conferences, and meetups around the world.',
        items: [
            { title: 'Innovation Summits', desc: 'Large-scale conferences bringing together industry leaders, entrepreneurs, and innovators.' },
            { title: 'Workshops & Masterclasses', desc: 'Hands-on learning experiences led by Opinno consultants and industry experts.' },
            { title: 'Meetups', desc: 'Informal networking events for our innovation community across our global offices.' },
        ],
    },
    challenges: {
        title: 'Challenges',
        description: 'Participate in innovation challenges and help solve real-world problems.',
        items: [
            { title: 'Open Innovation Challenges', desc: 'Submit your solutions to innovation challenges posted by leading organizations.' },
            { title: 'Hackathons', desc: 'Intensive, time-boxed events where teams develop innovative solutions to specific problems.' },
            { title: 'Idea Competitions', desc: 'Share your ideas and compete for prizes, mentorship, and implementation support.' },
        ],
    },
    academy: {
        title: 'Academy',
        description: 'Learn from the best through our training programs and courses on innovation and technology.',
        items: [
            { title: 'Online Courses', desc: 'Self-paced courses on innovation management, design thinking, and emerging technologies.' },
            { title: 'Certification Programs', desc: 'Professional certifications in open innovation, venture building, and digital transformation.' },
            { title: 'Executive Education', desc: 'Customized training programs for corporate teams and executives.' },
        ],
    },
}

// Category mapping for Firestore
const CATEGORY_MAP: Record<string, string> = {
    work: 'job',
    events: 'event',
    challenges: 'challenge',
    academy: 'course'
}

function PlaceholderImage({ title }: { title: string }) {
    return (
        <div className="w-full h-full bg-gradient-to-br from-opinno-accent/20 via-opinno-accent/10 to-gray-100 flex items-center justify-center p-4">
            <span className="text-opinno-accent/40 text-3xl font-heading font-bold text-center leading-tight line-clamp-2">
                {title?.charAt(0)?.toUpperCase() || 'O'}
            </span>
        </div>
    )
}

function CommunityCard({ item, lang }: { item: any; lang: string }) {
    return (
        <Link
            href={`/${lang}/${item.slugPath}`}
            className="group flex flex-col bg-white rounded-xl border border-opinno-border overflow-hidden card-hover"
        >
            <div className="relative h-[180px] bg-gray-100">
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
            <div className="p-6">
                <div className="text-xs text-opinno-gray font-body mb-2 uppercase tracking-wider">
                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ''}
                </div>
                <h3 className="text-lg font-bold font-display mb-3 group-hover:text-opinno-accent transition-colors line-clamp-2">
                    {item.title}
                </h3>
                <p className="text-sm text-opinno-gray font-body leading-relaxed line-clamp-3">
                    {item.excerpt}
                </p>
            </div>
        </Link>
    )
}

export default async function CommunityPage({ lang, section }: CommunityPageProps) {
    const content = COMMUNITY_CONTENT[section] || COMMUNITY_CONTENT.work
    const firestoreCategory = CATEGORY_MAP[section]

    let posts: any[] = []

    if (firestoreCategory) {
        try {
            posts = (await queryCollection('content', [
                { field: 'category', op: '==', value: firestoreCategory },
            ]))
                .filter((p: any) => p.title)
                .sort((a: any, b: any) => {
                    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
                    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
                    return dateB - dateA
                })
        } catch (err) {
            console.error(`Failed to fetch ${section}:`, err)
        }
    }

    const cards = posts.map((item: any) => (
        <CommunityCard key={item.id} item={item} lang={lang} />
    ))

    return (
        <InteriorPageLayout
            breadcrumb="Community"
            title={content.title}
            sidebar={getSidebar("community", lang)}
        >
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {content.description}
                </p>
            </div>

            {posts.length > 0 ? (
                <PaginatedGrid items={cards} totalCount={posts.length} columns={2} label={section} />
            ) : (
                <div className="space-y-6">
                    {content.items.map(item => (
                        <div key={item.title} className="p-6 bg-white rounded-xl border border-opinno-border hover:border-opinno-accent transition-colors">
                            <h3 className="text-lg font-bold font-display mb-2">{item.title}</h3>
                            <p className="text-sm text-opinno-gray font-body leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-12 pt-8 border-t border-opinno-border">
                <p className="text-base text-opinno-gray font-body mb-4">
                    Want to learn more about our {section}?
                </p>
                <Link href={`/${lang}/contact`} className="btn-primary inline-block">
                    GET IN TOUCH
                </Link>
            </div>
        </InteriorPageLayout>
    )
}
