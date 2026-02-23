import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

// Services data matching opinno.com
const SERVICES = [
    {
        title: 'Open Innovation',
        description: 'Building new or joining existing ecosystems. Getting value from internal (Intrapreneurship) and external ecosystems (Open Innovation).',
        href: '/open-innovation',
        icon: '🔍',
    },
    {
        title: 'Corporate Transformation',
        description: 'Designing and deploying new ways of working and new processes to build a more agile organization.',
        href: '/corporate-transformation',
        icon: '⚡',
    },
    {
        title: 'Venture Building',
        description: 'Creating a go-to-market strategy and its implementation. From MVP to New Venture.',
        href: '/venture-building',
        icon: '🚀',
    },
    {
        title: 'Technology Solutions',
        description: 'Conceptualization and architectural design, front and back end development, cloud migration, and deployment of teams with a DevOps culture.',
        href: '/technology-solutions',
        icon: '💻',
    },
]

const CENTERS_OF_EXCELLENCE = [
    'Healthcare',
    'Sustainability',
    'Energy & Infrastructures',
    'Public Sector',
    'Retail & Consumer goods',
]

const TRANSLATIONS: Record<string, any> = {
    en: {
        heroTitle: <>WE DELIVER IMPACT<br />THROUGH INNOVATION</>,
        heroSubtitle: 'Opinno is a global innovation consultancy. We transform organizations using methodologies invented by entrepreneurs.',
        hireUs: 'HIRE US',
        joinUs: 'JOIN US',
        mainServices: 'MAIN SERVICES',
        viewAll: 'View all',
        centersOfExcellence: 'Centers of excellence',
        impactStories: 'IMPACT STORIES',
        howWeWork: 'HOW WE WORK',
        howWeWorkText: 'Open your company up to the digital age. We can connect your business to our network of more than 50,000 innovation, transformation and technology experts, overseen by Opinno-trained and certified project managers.',
        learnMore: 'LEARN MORE',
        insights: 'INSIGHTS',
        news: 'NEWS'
    },
    es: {
        heroTitle: <>GENERAMOS IMPACTO<br />A TRAVÉS DE LA INNOVACIÓN</>,
        heroSubtitle: 'Opinno es una consultora global de innovación. Transformamos organizaciones utilizando metodologías inventadas por emprendedores.',
        hireUs: 'CONTÁCTANOS',
        joinUs: 'ÚNETE A NOSOTROS',
        mainServices: 'SERVICIOS PRINCIPALES',
        viewAll: 'Ver todos',
        centersOfExcellence: 'Centros de excelencia',
        impactStories: 'HISTORIAS DE IMPACTO',
        howWeWork: 'CÓMO TRABAJAMOS',
        howWeWorkText: 'Abre tu empresa a la era digital. Podemos conectar tu negocio a nuestra red de más de 50.000 expertos en innovación, transformación y tecnología, bajo la supervisión de gestores de proyectos formados y certificados por Opinno.',
        learnMore: 'SABER MÁS',
        insights: 'INSIGHTS',
        news: 'NOTICIAS'
    },
    it: {
        heroTitle: <>GENERIAMO IMPATTO<br />ATTRAVERSO L'INNOVAZIONE</>,
        heroSubtitle: "Opinno è una società di consulenza globale per l'innovazione. Trasformiamo le organizzazioni utilizzando metodologie inventate dagli imprenditori.",
        hireUs: 'CONTATTACI',
        joinUs: 'UNISCITI A NOI',
        mainServices: 'SERVIZI PRINCIPALI',
        viewAll: 'Vedi tutti',
        centersOfExcellence: 'Centri di eccellenza',
        impactStories: 'STORIE DI IMPATTO',
        howWeWork: 'COME LAVORIAMO',
        howWeWorkText: 'Apri la tua azienda all\'era digitale. Possiamo collegare la tua attività alla nostra rete di oltre 50.000 esperti di innovazione, trasformazione e tecnologia, supervisionati da project manager formati e certificati da Opinno.',
        learnMore: 'SCOPRI DI PIÙ',
        insights: 'INSIGHTS',
        news: 'NOTIZIE'
    }
}

export default async function LangHomePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const t = TRANSLATIONS[lang] || TRANSLATIONS['en']

    // Fetch impact stories from Firebase filtered by language
    let impactStories: any[] = []
    let latestInsights: any[] = []
    let latestNews: any[] = []

    try {
        const qStories = query(collection(db, 'content'), where('category', '==', 'story'), where('lang', '==', lang))
        const snapStories = await getDocs(qStories)

        let allStories = snapStories.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[]
        allStories = allStories
            .filter(p => p.title)
            .sort((a, b) => {
                const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
                const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
                return dateB - dateA
            })

        impactStories = allStories.filter(p => p.subCategory === 'impact' || p.subCategory === 'none').slice(0, 4)
        latestNews = allStories.filter(p => p.subCategory === 'news' || p.subCategory === 'press-releases').slice(0, 4)

        if (latestNews.length === 0) latestNews = allStories.slice(4, 8) // fallback if none tagged

        const qInsights = query(collection(db, 'content'), where('category', '==', 'insight'), where('lang', '==', lang))
        const snapInsights = await getDocs(qInsights)

        latestInsights = snapInsights.docs
            .map(doc => ({ id: doc.id, ...doc.data() })) as any[]
        latestInsights = latestInsights
            .filter(p => p.title)
            .sort((a, b) => {
                const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
                const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
                return dateB - dateA
            })
            .slice(0, 4)

    } catch (err) {
        console.error("Failed to fetch content:", err)
    }

    return (
        <div className="flex flex-col w-full">

            {/* ===== HERO SECTION ===== */}
            <section className="section-container pt-8 pb-16 md:pt-16 md:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Side */}
                    <div className="animate-fade-in">
                        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] mb-6 tracking-tight">
                            {t.heroTitle}
                        </h1>
                        <p className="text-opinno-gray text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-body">
                            {t.heroSubtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/clients" className="btn-primary">
                                {t.hireUs}
                            </Link>
                            <a
                                href="https://opinno.jobs.personio.com/?language=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                {t.joinUs}
                            </a>
                        </div>
                    </div>

                    {/* Video Side */}
                    <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="rounded-[0_2rem_2rem_2rem] overflow-hidden shadow-2xl aspect-video bg-opinno-dark">
                            <iframe
                                src="https://www.youtube.com/embed/-W5w7jLMat8?rel=0&modestbranding=1"
                                title="Delivering Impact Through Innovation"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        {/* B Corp Badge */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 lg:-left-12 lg:translate-x-0 lg:bottom-auto lg:top-[60%] w-[130px] h-[160px] bg-opinno-accent rounded-2xl flex flex-col items-center justify-center text-white shadow-xl z-10">
                            <span className="text-xs font-medium mb-1">Certified</span>
                            <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-1">
                                <span className="text-3xl font-bold">B</span>
                            </div>
                            <span className="text-xs font-medium">Corporation</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MAIN SERVICES SECTION ===== */}
            <section className="bg-opinno-light-bg py-20">
                <div className="section-container">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="section-title">{t.mainServices}</h2>
                        <Link
                            href={`/${lang}/expertise`}
                            className="text-opinno-accent font-bold text-sm hover:underline underline-offset-4 tracking-wide"
                        >
                            {t.viewAll}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {SERVICES.map(service => (
                            <Link
                                key={service.title}
                                href={service.href}
                                className="group bg-white p-8 rounded-lg card-hover border border-transparent hover:border-opinno-accent"
                            >
                                <div className="text-3xl mb-4">{service.icon}</div>
                                <h3 className="text-lg font-bold mb-3 group-hover:text-opinno-accent transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-opinno-gray text-sm leading-relaxed font-body">
                                    {service.description}
                                </p>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-opinno-border">
                        <h4 className="text-sm font-bold mb-4 text-opinno-gray tracking-wider">{t.centersOfExcellence}</h4>
                        <div className="flex flex-wrap gap-3">
                            {CENTERS_OF_EXCELLENCE.map(center => (
                                <span
                                    key={center}
                                    className="px-4 py-2 bg-white border border-opinno-border text-opinno-gray text-sm font-medium rounded hover:border-opinno-accent hover:text-opinno-accent transition-colors cursor-pointer"
                                >
                                    {center}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== IMPACT STORIES SECTION ===== */}
            <section className="py-20">
                <div className="section-container">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="section-title">{t.impactStories}</h2>
                        <Link
                            href={`/${lang}/stories`}
                            className="text-opinno-accent font-bold text-sm hover:underline underline-offset-4 tracking-wide"
                        >
                            {t.viewAll}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {impactStories.length > 0 ? (
                            impactStories.map((story: any) => (
                                <StoryCard
                                    key={story.id}
                                    date={story.publishedAt ? new Date(story.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                                    title={story.title}
                                    excerpt={story.excerpt?.substring(0, 120) + '...'}
                                    image={story.featuredImage}
                                    href={`/${lang}/${story.slugPath}`}
                                />
                            ))
                        ) : (
                            <>
                                <StoryCard
                                    date="May 8, 2024"
                                    title="AlUla: the 'jewel that opens up to the world' to become an international benchmark"
                                    excerpt="Opinno analyzed trends, crafted strategies, and overcame challenges to transform AlUla into a key tourist destination."
                                    image="https://opinno.com/wp-content/uploads/2024/05/image-111-1024x614.png"
                                    href="/stories/alula"
                                />
                                <StoryCard
                                    date="January 26, 2024"
                                    title="AWS re/Start: the programme of opportunities, skills and new beginnings for the South of Italy"
                                    excerpt="On Monday 18 December, Isola hosted the graduation ceremony for 50 girls and boys of re/Start."
                                    image="https://opinno.com/wp-content/uploads/2024/01/AWS-header-1024x576.png"
                                    href="/stories/aws-restart"
                                />
                                <StoryCard
                                    date="January 22, 2024"
                                    title="Transforming the Patient Experience at Hospital Vozandes"
                                    excerpt="Hospital Vozandes partnered with Opinno Ecuador to carry out a comprehensive transformation."
                                    image="https://opinno.com/wp-content/uploads/2024/01/Hospital-Vozandes-1024x576.jpg"
                                    href="/stories/vozandes"
                                />
                                <StoryCard
                                    date="January 22, 2024"
                                    title="Banco Cuscatlán: the road to Open Innovation"
                                    excerpt="Promoting digitalization for the growth of Salvadoran SMEs through an Open Innovation program."
                                    image="https://opinno.com/wp-content/uploads/2024/01/Banco-Cuscatlan-scaled.jpg"
                                    href="/stories/banco-cuscatlan"
                                />
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ===== HOW WE WORK SECTION ===== */}
            <section className="bg-opinno-light-bg py-20">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="section-title mb-6">{t.howWeWork}</h2>
                            <p className="text-opinno-gray text-lg leading-relaxed font-body mb-8">
                                {t.howWeWorkText}
                            </p>
                            <Link href="/model" className="btn-primary">
                                {t.learnMore}
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-2xl p-10 shadow-lg">
                                <div className="grid grid-cols-2 gap-6 text-center">
                                    <div className="p-6">
                                        <div className="text-4xl font-bold text-opinno-accent mb-2">50K+</div>
                                        <div className="text-sm text-opinno-gray font-body">Innovation Experts</div>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-4xl font-bold text-opinno-accent mb-2">11</div>
                                        <div className="text-sm text-opinno-gray font-body">Countries</div>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-4xl font-bold text-opinno-accent mb-2">250+</div>
                                        <div className="text-sm text-opinno-gray font-body">Consultants</div>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-4xl font-bold text-opinno-accent mb-2">15</div>
                                        <div className="text-sm text-opinno-gray font-body">Years of Innovation</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== INSIGHTS SECTION ===== */}
            <section className="py-20">
                <div className="section-container">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="section-title">{t.insights}</h2>
                        <Link
                            href={`/${lang}/insights`}
                            className="text-opinno-accent font-bold text-sm hover:underline underline-offset-4 tracking-wide"
                        >
                            {t.viewAll}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {latestInsights.map((insight: any) => (
                            <StoryCard
                                key={insight.id}
                                date={insight.publishedAt ? new Date(insight.publishedAt).toLocaleDateString() : ''}
                                title={insight.title}
                                excerpt={insight.excerpt}
                                image={insight.featuredImage}
                                href={`/${lang}/${insight.slugPath}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== NEWS SECTION ===== */}
            <section className="bg-opinno-light-bg py-20">
                <div className="section-container">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="section-title">{t.news}</h2>
                        <Link
                            href={`/${lang}/stories`}
                            className="text-opinno-accent font-bold text-sm hover:underline underline-offset-4 tracking-wide"
                        >
                            {t.viewAll}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {latestNews.map((news: any) => (
                            <StoryCard
                                key={news.id}
                                date={news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : ''}
                                title={news.title}
                                excerpt={news.excerpt}
                                image={news.featuredImage}
                                href={`/${lang}/${news.slugPath}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== JOIN OUR COMMUNITY SECTION ===== */}
            <section className="py-20">
                <div className="section-container text-center">
                    <h2 className="section-title mb-4">JOIN OUR COMMUNITY OF INNOVATORS</h2>
                    <p className="text-opinno-gray text-lg font-body mb-10 max-w-2xl mx-auto">
                        Participate in our community projects, events, competitions and courses.
                    </p>
                    <Link href="/community" className="btn-primary mb-16">
                        LEARN MORE
                    </Link>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                        <CommunityCard icon="💼" number="Jobs" label="We are hiring!" href="/work" />
                        <CommunityCard icon="📅" number="169" label="Events" href="/events" />
                        <CommunityCard icon="🏆" number="31" label="Challenges" href="/challenges" />
                        <CommunityCard icon="📚" number="225" label="Courses" href="/academy" />
                    </div>
                </div>
            </section>

            {/* ===== CONTACT / GET IN TOUCH SECTION ===== */}
            <section className="bg-opinno-light-bg py-20">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="section-title mb-4">Get in touch</h2>
                        <p className="text-opinno-gray text-lg font-body mb-10">
                            We would love to know about you and help you innovate!
                        </p>
                        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
                            <form className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        placeholder="Name *"
                                        className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent font-body"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email *"
                                        className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent font-body"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Company"
                                    className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent font-body"
                                />
                                <textarea
                                    rows={4}
                                    placeholder="Message *"
                                    className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent resize-none font-body"
                                />
                                <button type="submit" className="btn-primary self-center mt-2">
                                    SEND
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

// ===== REUSABLE COMPONENTS =====

function StoryCard({ date, title, excerpt, image, href }: {
    date: string
    title: string
    excerpt: string
    image: string
    href: string
}) {
    const hasImage = image && image.startsWith('http')
    return (
        <Link href={href} className="group block">
            <div className="relative h-[220px] rounded-lg overflow-hidden mb-4 bg-gray-100">
                {hasImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={image}
                        alt={title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-opinno-accent/20 via-opinno-accent/10 to-gray-100 flex items-center justify-center">
                        <span className="text-opinno-accent/40 text-4xl font-heading font-bold">
                            {title?.charAt(0)?.toUpperCase() || 'O'}
                        </span>
                    </div>
                )}
            </div>
            <div className="text-xs text-opinno-gray font-body mb-2">{date}</div>
            <h3 className="text-base font-bold leading-snug mb-2 group-hover:text-opinno-accent transition-colors line-clamp-3">
                {title}
            </h3>
            <p className="text-sm text-opinno-gray font-body leading-relaxed line-clamp-2">
                {excerpt}
            </p>
        </Link>
    )
}

function CommunityCard({ icon, number, label, href }: {
    icon: string
    number: string
    label: string
    href: string
}) {
    return (
        <Link
            href={href}
            className="group bg-opinno-light-bg border border-opinno-border rounded-xl p-8 text-center card-hover hover:border-opinno-accent"
        >
            <div className="text-4xl mb-3">{icon}</div>
            <div className="text-2xl font-bold text-opinno-accent mb-1">{number}</div>
            <div className="text-sm text-opinno-gray font-body">{label}</div>
        </Link>
    )
}
