import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from '@/lib/page-data'
import Link from 'next/link'

export default function IntelligencePage({ lang }: { lang: string }) {
    const t = {
        es: {
            breadcrumb: 'Servicios',
            title: 'H1 — Inteligencia',
            heroTitle: 'Inteligencia más aguda para mejores decisiones estratégicas.',
            heroDesc: 'H1 se trata de entender el presente con suficiente claridad para tomar mejores decisiones sobre el futuro.',
            heroP2: 'Opinno ayuda a las organizaciones a leer su mercado, identificar los cambios que importan, evaluar su posición relativa, involucrar los ecosistemas correctos y convertir la inteligencia en dirección estratégica.',
            overviewTitle: 'En mercados complejos, la información abunda. La claridad escasea.',
            overviewP1: 'La mayoría de las organizaciones ya tienen acceso a datos, informes y titulares. Lo que les falta es una visión clara de lo que importa, lo que está cambiando y lo que esos cambios significan para su negocio.',
            overviewP2: 'Nuestra oferta de Inteligencia está diseñada para crear esa claridad. Combinamos investigación, diagnóstico estratégico, perspectiva de ecosistema y síntesis para ayudar a los equipos directivos a tomar decisiones mejor informadas.',
            overviewP3: 'Una fuente clave de fortaleza en este trabajo es nuestra estrecha conexión con MIT y MIT Technology Review, que nos da acceso privilegiado al pensamiento de clase mundial sobre tecnología, innovación y las fuerzas que reconfiguran las industrias. Traducimos esas señales en conocimiento relevante para nuestros clientes.',
            s1Title: '1.1 Inteligencia de mercado, tendencias y competencia',
            s1Tagline: 'Ve el paisaje externo con mayor precisión.',
            s1Desc: 'Ayudamos a los clientes a entender los mercados en los que operan analizando la dinámica de la industria, los movimientos competitivos, las tecnologías emergentes, los cambios en los clientes y las señales externas relevantes.',
            s1Extra: 'El objetivo no es producir más información. Es identificar los desarrollos que realmente importan y hacerlos estratégicamente útiles.',
            s2Title: '1.2 Diagnóstico estratégico',
            s2Tagline: 'Sabe dónde estás antes de decidir a dónde ir.',
            s2Desc: 'Antes de dar forma al futuro, los equipos directivos necesitan un diagnóstico claro del presente.',
            s2Extra: 'Evaluamos tu posición actual en relación con los competidores, las expectativas del mercado y las oportunidades futuras. Esto revela fortalezas, debilidades, puntos ciegos y áreas donde el cambio o la inversión tendrán el mayor valor estratégico.',
            s3Title: '1.3 Activación de ecosistemas',
            s3Tagline: 'Ninguna empresa evoluciona sola.',
            s3Desc: 'La ventaja competitiva está cada vez más determinada por los ecosistemas: empleados, clientes, proveedores, startups, universidades, socios y otros actores externos.',
            s3Extra: 'Ayudamos a las organizaciones a participar más efectivamente en las redes que dan forma a su futuro, ya sea activando comunidades internas, involucrando a partes interesadas externas o fortaleciendo su ecosistema de innovación.',
            s4Title: '1.4 Planificación estratégica',
            s4Tagline: 'Convierte la inteligencia en dirección.',
            s4Desc: 'La investigación solo importa cuando mejora las decisiones.',
            s4Extra: 'Utilizamos la inteligencia creada a través del análisis de mercado, el diagnóstico y el compromiso con el ecosistema para ayudar a los equipos directivos a definir prioridades, tomar decisiones estratégicas y alinearse en torno a un camino más claro.',
            closingTitle: 'Inteligencia con consecuencia estratégica.',
            closingDesc: 'Nuestro trabajo en H1 está diseñado para líderes que necesitan más que información. Necesitan perspectiva, juicio y una base más sólida para la acción.',
            ctaTitle: '¿Necesitas una visión más clara de tu mercado y posición estratégica?',
            ctaButton: 'Habla con nosotros',
        },
        it: {
            breadcrumb: 'Servizi',
            title: 'H1 — Intelligence',
            heroTitle: 'Intelligence più acuta per decisioni strategiche migliori.',
            heroDesc: 'H1 riguarda la comprensione del presente con sufficiente chiarezza per fare scelte migliori sul futuro.',
            heroP2: 'Opinno aiuta le organizzazioni a leggere il mercato, identificare i cambiamenti che contano, valutare la propria posizione relativa, coinvolgere gli ecosistemi giusti e convertire l\'intelligence in direzione strategica.',
            overviewTitle: 'In mercati complessi, le informazioni abbondano. La chiarezza scarseggia.',
            overviewP1: 'La maggior parte delle organizzazioni ha già accesso a dati, report e titoli. Ciò che manca è una visione chiara di ciò che conta, ciò che sta cambiando e cosa significano quei cambiamenti per il loro business.',
            overviewP2: 'La nostra offerta di Intelligence è progettata per creare quella chiarezza. Combiniamo ricerca, diagnosi strategica, prospettiva ecosistemica e sintesi per aiutare i team dirigenziali a prendere decisioni più informate.',
            overviewP3: 'Una fonte chiave di forza in questo lavoro è la nostra stretta connessione con MIT e MIT Technology Review, che ci dà accesso privilegiato al pensiero di classe mondiale su tecnologia, innovazione e le forze che stanno rimodellando le industrie.',
            s1Title: '1.1 Intelligence di mercato, trend e concorrenza',
            s1Tagline: 'Guarda il panorama esterno con maggiore precisione.',
            s1Desc: 'Aiutiamo i clienti a comprendere i mercati in cui operano analizzando le dinamiche del settore, i movimenti competitivi, le tecnologie emergenti, i cambiamenti nei clienti e i segnali esterni rilevanti.',
            s1Extra: 'L\'obiettivo non è produrre più informazioni. È identificare gli sviluppi che contano davvero e renderli strategicamente utili.',
            s2Title: '1.2 Diagnosi strategica',
            s2Tagline: 'Sappi dove ti trovi prima di decidere dove andare.',
            s2Desc: 'Prima di plasmare il futuro, i team dirigenziali hanno bisogno di una diagnosi chiara del presente.',
            s2Extra: 'Valutiamo la tua posizione attuale rispetto ai concorrenti, alle aspettative del mercato e alle opportunità future. Questo rivela punti di forza, debolezze, punti ciechi e aree dove il cambiamento o l\'investimento avranno il maggior valore strategico.',
            s3Title: '1.3 Attivazione degli ecosistemi',
            s3Tagline: 'Nessuna azienda evolve da sola.',
            s3Desc: 'Il vantaggio competitivo è sempre più determinato dagli ecosistemi: dipendenti, clienti, fornitori, startup, università, partner e altri attori esterni.',
            s3Extra: 'Aiutiamo le organizzazioni a partecipare più efficacemente nelle reti che plasmano il loro futuro.',
            s4Title: '1.4 Pianificazione strategica',
            s4Tagline: 'Trasforma l\'intelligence in direzione.',
            s4Desc: 'La ricerca conta solo quando migliora le decisioni.',
            s4Extra: 'Utilizziamo l\'intelligence creata attraverso l\'analisi di mercato, la diagnosi e il coinvolgimento dell\'ecosistema per aiutare i team dirigenziali a definire priorità, fare scelte strategiche e allinearsi attorno a un percorso più chiaro.',
            closingTitle: 'Intelligence con conseguenza strategica.',
            closingDesc: 'Il nostro lavoro H1 è progettato per leader che hanno bisogno di più che informazioni. Hanno bisogno di prospettiva, giudizio e una base più solida per l\'azione.',
            ctaTitle: 'Hai bisogno di una visione più chiara del tuo mercato e della tua posizione strategica?',
            ctaButton: 'Parlaci',
        },
        en: {
            breadcrumb: 'Expertise',
            title: 'H1 — Intelligence',
            heroTitle: 'Sharper intelligence for better strategic decisions.',
            heroDesc: 'H1 is about understanding the present with enough clarity to make better choices about the future.',
            heroP2: 'Opinno helps organizations read their market, identify the shifts that matter, assess their relative position, engage the right ecosystems, and convert intelligence into strategic direction.',
            overviewTitle: 'In complex markets, information is abundant. Clarity is scarce.',
            overviewP1: 'Most organizations already have access to data, reports, and headlines. What they lack is a clear view of what matters, what is changing, and what those changes mean for their business.',
            overviewP2: 'Our Intelligence offering is designed to create that clarity. We combine research, strategic diagnosis, ecosystem perspective, and synthesis to help leadership teams make better-informed decisions.',
            overviewP3: 'A key source of strength in this work is our close connection to MIT and MIT Technology Review, which gives us privileged access to world-class thinking on technology, innovation, and the forces reshaping industries. We translate those signals into relevant insight for our clients.',
            s1Title: '1.1 Market, trend, and competitor intelligence',
            s1Tagline: 'See the external landscape with greater precision.',
            s1Desc: 'We help clients understand the markets they operate in by analyzing industry dynamics, competitive movements, emerging technologies, customer shifts, and relevant external signals.',
            s1Extra: 'The objective is not to produce more information. It is to identify the developments that truly matter and make them strategically useful.',
            s2Title: '1.2 Strategic diagnosis',
            s2Tagline: 'Know where you stand before deciding where to go.',
            s2Desc: 'Before shaping the future, leadership teams need a clear diagnosis of the present.',
            s2Extra: 'We assess your current position relative to competitors, market expectations, and future opportunities. This reveals strengths, weaknesses, blind spots, and areas where change or investment will have the greatest strategic value.',
            s3Title: '1.3 Ecosystem activation',
            s3Tagline: 'No company evolves alone.',
            s3Desc: 'Competitive advantage is increasingly shaped by ecosystems: employees, customers, suppliers, startups, universities, partners, and other external actors.',
            s3Extra: 'We help organizations participate more effectively in the networks that shape their future, whether by activating internal communities, engaging external stakeholders, or strengthening their innovation ecosystem.',
            s4Title: '1.4 Strategic planning',
            s4Tagline: 'Turn intelligence into direction.',
            s4Desc: 'Research only matters when it improves decisions.',
            s4Extra: 'We use the intelligence created through market analysis, diagnosis, and ecosystem engagement to help leadership teams define priorities, make strategic choices, and align around a clearer path forward.',
            closingTitle: 'Intelligence with strategic consequence.',
            closingDesc: 'Our H1 work is designed for leaders who need more than information. They need perspective, judgment, and a stronger basis for action.',
            ctaTitle: 'Need a clearer view of your market and strategic position?',
            ctaButton: 'Talk to us',
        }
    }
    const c = lang === 'es' ? t.es : lang === 'it' ? t.it : t.en

    const services = [
        { title: c.s1Title, tagline: c.s1Tagline, desc: c.s1Desc, extra: c.s1Extra },
        { title: c.s2Title, tagline: c.s2Tagline, desc: c.s2Desc, extra: c.s2Extra },
        { title: c.s3Title, tagline: c.s3Tagline, desc: c.s3Desc, extra: c.s3Extra },
        { title: c.s4Title, tagline: c.s4Tagline, desc: c.s4Desc, extra: c.s4Extra },
    ]

    return (
        <InteriorPageLayout
            breadcrumb={c.breadcrumb}
            title={c.title}
            sidebar={getSidebar("expertise", lang)}
        >
            {/* Hero image */}
            <div className="mb-10">
                <img src="/assets/expertise/h1-intelligence.svg" alt="H1 Intelligence" className="w-full rounded-xl border border-opinno-border" />
            </div>

            {/* Hero */}
            <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight text-opinno-primary mb-6">{c.heroTitle}</h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">{c.heroDesc}</p>
                <p className="text-base text-opinno-gray font-body leading-relaxed">{c.heroP2}</p>
            </div>

            {/* Overview */}
            <div className="mb-16">
                <h2 className="text-xl md:text-2xl font-bold font-display text-opinno-primary mb-6">{c.overviewTitle}</h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">{c.overviewP1}</p>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">{c.overviewP2}</p>
                <p className="text-base text-opinno-gray font-body leading-relaxed">{c.overviewP3}</p>
            </div>

            {/* Service areas */}
            <div className="space-y-10 mb-16">
                {services.map((s, i) => (
                    <div key={i} className="bg-white rounded-xl border border-opinno-border p-6 md:p-8">
                        <h3 className="text-lg font-bold font-display text-opinno-primary mb-2">{s.title}</h3>
                        <p className="text-sm font-bold text-opinno-accent mb-4 italic">{s.tagline}</p>
                        <p className="text-base text-opinno-gray font-body leading-relaxed mb-3">{s.desc}</p>
                        <p className="text-base text-opinno-gray font-body leading-relaxed">{s.extra}</p>
                    </div>
                ))}
            </div>

            {/* Closing */}
            <div className="border-l-4 border-opinno-accent pl-6 mb-16">
                <h3 className="text-xl font-bold font-display text-opinno-primary mb-3">{c.closingTitle}</h3>
                <p className="text-base text-opinno-gray font-body leading-relaxed">{c.closingDesc}</p>
            </div>

            {/* CTA */}
            <div className="text-center py-12">
                <h2 className="text-xl md:text-2xl font-bold font-display text-opinno-primary mb-6">{c.ctaTitle}</h2>
                <Link href={`/${lang}/contact`} className="inline-block px-8 py-3 bg-opinno-accent text-white font-bold tracking-wider uppercase hover:bg-opinno-accent-hover transition-all duration-300 rounded">
                    {c.ctaButton}
                </Link>
            </div>
        </InteriorPageLayout>
    )
}
