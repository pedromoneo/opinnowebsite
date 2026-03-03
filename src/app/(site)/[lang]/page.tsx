import { queryCollection } from '@/lib/firestore-server'
import Link from 'next/link'
import HomeContactForm from '@/components/HomeContactForm'

export const dynamic = 'force-dynamic';

// Three Horizons expertise model
const HORIZONS: Record<string, { tag: string; title: string; description: string; href: string; image: string }[]> = {
    en: [
        {
            tag: 'H1',
            title: 'Intelligence',
            description: 'Research, analysis and strategic intelligence to understand today\'s landscape and make data-driven decisions.',
            href: '/intelligence',
            image: '/assets/expertise/h1-intelligence.svg',
        },
        {
            tag: 'H2',
            title: 'Transformation',
            description: 'Organizational design, digital transformation and change management to navigate the journey toward tomorrow.',
            href: '/transformation',
            image: '/assets/expertise/h2-transformation.svg',
        },
        {
            tag: 'H3',
            title: 'Innovation',
            description: 'Open innovation ecosystems and venture building to create the future and drive breakthrough growth.',
            href: '/innovation',
            image: '/assets/expertise/h3-innovation.svg',
        },
    ],
    es: [
        {
            tag: 'H1',
            title: 'Inteligencia',
            description: 'Investigación, análisis e inteligencia estratégica para entender el panorama actual y tomar decisiones basadas en datos.',
            href: '/intelligence',
            image: '/assets/expertise/h1-intelligence.svg',
        },
        {
            tag: 'H2',
            title: 'Transformación',
            description: 'Diseño organizacional, transformación digital y gestión del cambio para navegar el camino hacia el mañana.',
            href: '/transformation',
            image: '/assets/expertise/h2-transformation.svg',
        },
        {
            tag: 'H3',
            title: 'Innovación',
            description: 'Ecosistemas de innovación abierta y creación de nuevos negocios para crear el futuro e impulsar el crecimiento.',
            href: '/innovation',
            image: '/assets/expertise/h3-innovation.svg',
        },
    ],
    it: [
        {
            tag: 'H1',
            title: 'Intelligence',
            description: 'Ricerca, analisi e intelligence strategica per comprendere il panorama attuale e prendere decisioni basate sui dati.',
            href: '/intelligence',
            image: '/assets/expertise/h1-intelligence.svg',
        },
        {
            tag: 'H2',
            title: 'Trasformazione',
            description: 'Design organizzativo, trasformazione digitale e gestione del cambiamento per navigare il percorso verso il domani.',
            href: '/transformation',
            image: '/assets/expertise/h2-transformation.svg',
        },
        {
            tag: 'H3',
            title: 'Innovazione',
            description: 'Ecosistemi di innovazione aperta e venture building per creare il futuro e guidare la crescita.',
            href: '/innovation',
            image: '/assets/expertise/h3-innovation.svg',
        },
    ],
}

const TRANSLATIONS: Record<string, any> = {
    en: {
        heroTitle: <>WE DELIVER IMPACT<br />THROUGH INNOVATION</>,
        heroSubtitle: 'Opinno is a global innovation consultancy. We transform organizations using methodologies invented by entrepreneurs.',
        hireUs: 'HIRE US',
        joinUs: 'JOIN US',
        ourExpertise: 'OUR EXPERTISE',
        viewAll: 'View all',
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
        ourExpertise: 'NUESTRA EXPERIENCIA',
        viewAll: 'Ver todos',
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
        ourExpertise: 'LA NOSTRA COMPETENZA',
        viewAll: 'Vedi tutti',
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
        const allStories = (await queryCollection('content', [
            { field: 'category', op: '==', value: 'story' },
            { field: 'lang', op: '==', value: lang },
        ]))
            .filter(p => p.title && p.status !== 'draft')
            .sort((a, b) => {
                const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
                const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
                return dateB - dateA
            })

        impactStories = allStories.filter(p => p.subCategory === 'impact' || p.subCategory === 'none').slice(0, 4)
        latestNews = allStories.filter(p => p.subCategory === 'news' || p.subCategory === 'press-releases').slice(0, 4)

        if (latestNews.length === 0) latestNews = allStories.slice(4, 8) // fallback if none tagged

        // Query both 'insights' (new) and 'insight' (legacy) for backward compatibility
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
        latestInsights = [...insightsNew, ...insightsLegacy]
            .filter(p => p.title && p.status !== 'draft')
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
                        <p className="text-opinno-gray text-lg md:text-xl leading-relaxed mb-4 max-w-lg font-body">
                            {t.heroSubtitle}
                        </p>
                        <div className="mb-10 flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://www.marques-de-france.fr/wp-content/uploads/2023/11/b-corp-logo.jpg"
                                alt="B Corp Certified"
                                className="h-[3.5em] w-auto grayscale"
                                style={{ height: '3.5em', fontSize: 'inherit' }}
                            />
                            <span className="text-opinno-gray text-sm font-body">Opinno is a certified B Corporation</span>
                        </div>
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
                    </div>
                </div>
            </section>

            {/* ===== OUR EXPERTISE — THREE HORIZONS ===== */}
            <section className="bg-opinno-light-bg py-20">
                <div className="section-container">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="section-title">{t.ourExpertise}</h2>
                        <Link
                            href={`/${lang}/expertise`}
                            className="text-opinno-accent font-bold text-sm hover:underline underline-offset-4 tracking-wide"
                        >
                            {t.viewAll}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(HORIZONS[lang] || HORIZONS.en).map(horizon => (
                            <Link
                                key={horizon.tag}
                                href={horizon.href}
                                className="group bg-white rounded-xl overflow-hidden card-hover border border-transparent hover:border-opinno-accent"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={horizon.image}
                                    alt={`${horizon.tag} — ${horizon.title}`}
                                    className="w-full h-48 object-cover bg-opinno-light-bg"
                                    loading="lazy"
                                />
                                <div className="p-8">
                                    <span className="inline-block text-xs font-bold tracking-widest text-opinno-accent mb-2">
                                        {horizon.tag}
                                    </span>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-opinno-accent transition-colors">
                                        {horizon.title}
                                    </h3>
                                    <p className="text-opinno-gray text-sm leading-relaxed font-body">
                                        {horizon.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
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
                                    date={formatDate(story.publishedAt, lang)}
                                    title={story.title}
                                    excerpt={story.excerpt || ''}
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
                                date={formatDate(insight.publishedAt, lang)}
                                title={insight.title}
                                excerpt={insight.excerpt || ''}
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
                                date={formatDate(news.publishedAt, lang)}
                                title={news.title}
                                excerpt={news.excerpt || ''}
                                image={news.featuredImage}
                                href={`/${lang}/${news.slugPath}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PARTNERS SECTION ===== */}
            <section className="py-16 border-t border-opinno-border">
                <div className="section-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/partners.png" alt="Opinno Partners" className="w-full h-auto opacity-60 grayscale" loading="lazy" />
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
                        <HomeContactForm />
                    </div>
                </div>
            </section>

        </div>
    )
}

// ===== HELPERS =====

const DATE_LOCALES: Record<string, string> = { en: 'en-US', es: 'es-ES', it: 'it-IT' }

function formatDate(dateStr: string | undefined, lang: string): string {
    if (!dateStr) return ''
    try {
        return new Date(dateStr).toLocaleDateString(DATE_LOCALES[lang] || 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
    } catch {
        return ''
    }
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
