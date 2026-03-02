import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from '@/lib/page-data'
import Link from 'next/link'

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

export default function AboutOverviewPage({ lang }: { lang: string }) {
    const horizons = HORIZONS[lang] || HORIZONS['en']

    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Nosotros' : lang === 'it' ? 'Chi siamo' : 'About'}
            title={lang === 'es' ? 'Visión General' : lang === 'it' ? 'Panoramica' : 'Overview'}
            sidebar={getSidebar("about", lang)}
        >
            {/* Mission Statement */}
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {lang === 'es' ? (
                        <>Opinno es una consultora de innovación <strong>global</strong> fundada en Silicon Valley en 2008. Nuestra misión es generar <strong>impacto</strong> a través de la <strong>innovación</strong>.</>
                    ) : lang === 'it' ? (
                        <>Opinno è una società di consulenza globale dell'innovazione fondata nella Silicon Valley nel 2008. La nostra missione è fornire <strong>impatto</strong> attraverso <strong>l'innovazione</strong>.</>
                    ) : (
                        <>Opinno is a <strong>global</strong> innovation consultancy firm founded in Silicon Valley in 2008. Our mission is to deliver <strong>impact</strong> through <strong>innovation</strong>.</>
                    )}
                </p>
            </div>

            {/* What we do — Three Horizons */}
            <div className="mb-12">
                <h2 className="text-xl font-bold font-display mb-2">
                    {lang === 'es' ? 'Qué hacemos' : lang === 'it' ? 'Cosa facciamo' : 'What we do'}
                </h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-8">
                    {lang === 'es'
                        ? 'Estructuramos nuestra experiencia en torno a un modelo de tres horizontes que abarca desde la inteligencia estratégica hasta la innovación disruptiva.'
                        : lang === 'it'
                        ? 'Strutturiamo la nostra competenza attorno a un modello a tre orizzonti che va dall\'intelligence strategica all\'innovazione dirompente.'
                        : 'We structure our expertise around a three-horizons model spanning from strategic intelligence to disruptive innovation.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {horizons.map(horizon => (
                        <Link
                            key={horizon.tag}
                            href={horizon.href}
                            className="group bg-opinno-light-bg rounded-xl overflow-hidden border border-opinno-border hover:border-opinno-accent transition-colors"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={horizon.image}
                                alt={`${horizon.tag} — ${horizon.title}`}
                                className="w-full h-36 object-cover"
                                loading="lazy"
                            />
                            <div className="p-5">
                                <span className="inline-block text-xs font-bold tracking-widest text-opinno-accent mb-1">
                                    {horizon.tag}
                                </span>
                                <h3 className="text-base font-bold font-display mb-2 group-hover:text-opinno-accent transition-colors">
                                    {horizon.title}
                                </h3>
                                <p className="text-sm text-opinno-gray font-body leading-relaxed">
                                    {horizon.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Why we do it */}
            <div className="mb-12">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Por qué lo hacemos' : lang === 'it' ? 'Perché lo facciamo' : 'Why we do it'}
                </h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                    {lang === 'es'
                        ? 'Creemos firmemente que la innovación debe tener un impacto positivo en la sociedad y el medio ambiente.'
                        : lang === 'it'
                        ? "Crediamo che l'innovazione debba avere un impatto positivo sulla società e sull'ambiente."
                        : 'We believe innovation must have a positive impact on society and the environment.'}
                </p>
                <p className="text-base text-opinno-gray font-body leading-relaxed">
                    {lang === 'es'
                        ? 'Como B Corp certificada, cumplimos los mayores estándares y garantizamos la calidad y consistencia global.'
                        : lang === 'it'
                        ? "Come B Corp certificata, rispettiamo i più alti standard di performance sociale e ambientale, responsabilità e trasparenza."
                        : 'As a Certified B Corp, we meet the highest standards of social and environmental performance, accountability, and transparency.'}
                </p>
            </div>

            {/* Partners logos */}
            <div className="mt-16 pt-12 border-t border-opinno-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/partners.png" alt="Opinno Partners" className="w-full h-auto opacity-60 grayscale" loading="lazy" />
            </div>
        </InteriorPageLayout>
    )
}
