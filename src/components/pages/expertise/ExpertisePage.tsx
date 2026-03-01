import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar, PARTNER_LOGOS } from '@/lib/page-data'
import Link from 'next/link'

export default function ExpertisePage({ lang }: { lang: string }) {
    const t = {
        es: {
            breadcrumb: 'Servicios',
            title: 'Expertise',
            heroTitle: 'Entiende hoy. Navega mañana. Crea el futuro.',
            heroDesc: 'Opinno ayuda a las organizaciones a mantenerse relevantes en mercados cambiantes trabajando en tres horizontes: H1 Inteligencia, H2 Transformación y H3 Innovación.',
            heroBullets: [
                'H1 te ayuda a entender tu negocio y entorno hoy.',
                'H2 te ayuda a adaptar tu organización al futuro cercano.',
                'H3 te ayuda a crear los productos, servicios y negocios que definirán tu futuro.',
            ],
            heroClosing: 'Así es como conectamos conocimiento, ejecución y crecimiento.',
            introTitle: 'Tres horizontes. Un camino claro del presente al crecimiento futuro.',
            introP1: 'La mayoría de las organizaciones se ven arrastradas en tres direcciones a la vez.',
            introP2: 'Necesitan entender lo que está pasando ahora. Necesitan adaptarse a lo que viene después. Y necesitan crear los negocios, productos y servicios que importarán más adelante.',
            introP3: 'Por eso Opinno trabaja en tres horizontes.',
            introH1: 'Entender hoy significa desarrollar una lectura más aguda del presente: tu mercado, tus competidores, las tecnologías que moldean tu sector, tu posición actual y los ecosistemas que influyen en tu negocio.',
            introH2: 'Navegar mañana significa ayudar a tu organización a adaptarse al futuro cercano a través de la transformación: cultura, formas de trabajo, experiencia de empleado y experiencia de cliente.',
            introH3: 'Crear el futuro significa construir más allá del negocio actual: diseñar nuevos productos y servicios, y crear nuevos negocios que abran caminos futuros de crecimiento.',
            introClosing: 'Juntos, estos tres horizontes dan a las organizaciones una forma más completa de mantenerse relevantes, adaptarse más rápido y crecer con intención.',
            h1Label: 'H1 — Inteligencia',
            h1Tagline: 'Entiende hoy.',
            h1Desc: 'Lee el mercado con mayor claridad, evalúa tu posición, activa los ecosistemas correctos y convierte el conocimiento en planificación estratégica.',
            h1Cta: 'Explorar H1',
            h2Label: 'H2 — Transformación',
            h2Tagline: 'Navega mañana.',
            h2Desc: 'Transforma la cultura, las operaciones y la experiencia para que tu organización pueda adaptarse al futuro cercano con velocidad y confianza.',
            h2Cta: 'Explorar H2',
            h3Label: 'H3 — Innovación',
            h3Tagline: 'Crea el futuro.',
            h3Desc: 'Diseña nuevos productos y servicios, y construye nuevos negocios que generen crecimiento futuro.',
            h3Cta: 'Explorar H3',
            diffTitle: 'Lo que hace diferente a Opinno',
            diffP1: 'Muchas firmas pueden producir informes. Otras pueden ejecutar programas de cambio. Un número menor puede ayudar a lanzar nuevos negocios.',
            diffP2: 'Opinno conecta los tres.',
            diffP3: 'Combinamos inteligencia, transformación e innovación en un modelo integrado, permitiendo a los clientes pasar del entendimiento a la acción y al crecimiento futuro con mucha mayor coherencia.',
            ctaTitle: 'Definamos tu próximo horizonte.',
            ctaButton: 'Habla con nosotros',
            partnersTitle: 'Nuestros Partners',
        },
        it: {
            breadcrumb: 'Servizi',
            title: 'Expertise',
            heroTitle: 'Comprendi oggi. Naviga domani. Crea il futuro.',
            heroDesc: 'Opinno aiuta le organizzazioni a rimanere rilevanti in mercati in evoluzione lavorando su tre orizzonti: H1 Intelligence, H2 Trasformazione e H3 Innovazione.',
            heroBullets: [
                'H1 ti aiuta a comprendere il tuo business e il contesto oggi.',
                'H2 ti aiuta ad adattare la tua organizzazione al futuro prossimo.',
                'H3 ti aiuta a creare i prodotti, servizi e venture che definiranno il tuo futuro.',
            ],
            heroClosing: 'Ecco come colleghiamo conoscenza, esecuzione e crescita.',
            introTitle: 'Tre orizzonti. Un percorso chiaro dal presente alla crescita futura.',
            introP1: 'La maggior parte delle organizzazioni è tirata in tre direzioni contemporaneamente.',
            introP2: 'Hanno bisogno di capire cosa sta succedendo ora. Devono adattarsi a ciò che verrà dopo. E devono creare i business, prodotti e servizi che conteranno in futuro.',
            introP3: 'Per questo Opinno lavora su tre orizzonti.',
            introH1: 'Comprendere oggi significa sviluppare una lettura più precisa del presente: il tuo mercato, i tuoi concorrenti, le tecnologie che plasmano il tuo settore, la tua posizione attuale e gli ecosistemi che influenzano il tuo business.',
            introH2: 'Navigare domani significa aiutare la tua organizzazione ad adattarsi al futuro prossimo attraverso la trasformazione: cultura, modi di lavorare, esperienza dei dipendenti ed esperienza del cliente.',
            introH3: 'Creare il futuro significa costruire oltre il business attuale: progettare nuovi prodotti e servizi, e creare nuove venture che aprano percorsi futuri di crescita.',
            introClosing: 'Insieme, questi tre orizzonti offrono alle organizzazioni un modo più completo per rimanere rilevanti, adattarsi più velocemente e crescere con intenzione.',
            h1Label: 'H1 — Intelligence',
            h1Tagline: 'Comprendi oggi.',
            h1Desc: 'Leggi il mercato con maggiore chiarezza, valuta la tua posizione, attiva gli ecosistemi giusti e trasforma la conoscenza in pianificazione strategica.',
            h1Cta: 'Esplora H1',
            h2Label: 'H2 — Trasformazione',
            h2Tagline: 'Naviga domani.',
            h2Desc: 'Trasforma cultura, operazioni ed esperienza affinché la tua organizzazione possa adattarsi al futuro prossimo con velocità e fiducia.',
            h2Cta: 'Esplora H2',
            h3Label: 'H3 — Innovazione',
            h3Tagline: 'Crea il futuro.',
            h3Desc: 'Progetta nuovi prodotti e servizi, e costruisci nuove venture che generino crescita futura.',
            h3Cta: 'Esplora H3',
            diffTitle: 'Cosa rende Opinno diversa',
            diffP1: 'Molte aziende possono produrre report. Altre possono gestire programmi di cambiamento. Un numero minore può aiutare a lanciare nuove venture.',
            diffP2: 'Opinno collega tutti e tre.',
            diffP3: 'Combiniamo intelligence, trasformazione e innovazione in un modello integrato, permettendo ai clienti di passare dalla comprensione all\'azione alla crescita futura con molta più coerenza.',
            ctaTitle: 'Definiamo il tuo prossimo orizzonte.',
            ctaButton: 'Parlaci',
            partnersTitle: 'I Nostri Partner',
        },
        en: {
            breadcrumb: 'Expertise',
            title: 'Expertise',
            heroTitle: 'Understand today. Navigate tomorrow. Create the future.',
            heroDesc: 'Opinno helps organizations remain relevant in changing markets by working across three horizons: H1 Intelligence, H2 Transformation, and H3 Innovation.',
            heroBullets: [
                'H1 helps you understand your business and environment today.',
                'H2 helps you adapt your organization to the near future.',
                'H3 helps you create the products, services, and ventures that will define your future.',
            ],
            heroClosing: 'This is how we connect insight, execution, and growth.',
            introTitle: 'Three horizons. One clear path from present reality to future growth.',
            introP1: 'Most organizations are pulled in three directions at once.',
            introP2: 'They need to understand what is happening now. They need to adapt to what is coming next. And they need to create the businesses, products, and services that will matter further ahead.',
            introP3: 'That is why Opinno works across three horizons.',
            introH1: 'Understand today means developing a sharper reading of the present: your market, your competitors, the technologies shaping your sector, your current position, and the ecosystems that influence your business.',
            introH2: 'Navigate tomorrow means helping your organization adapt to the near future through transformation: culture, ways of working, employee experience, and customer experience.',
            introH3: 'Create the future means building beyond the present business: designing new products and services, and creating new ventures that open future paths for growth.',
            introClosing: 'Together, these three horizons give organizations a more complete way to stay relevant, adapt faster, and grow with intention.',
            h1Label: 'H1 — Intelligence',
            h1Tagline: 'Understand today.',
            h1Desc: 'Read the market with greater clarity, assess your position, activate the right ecosystems, and turn insight into strategic planning.',
            h1Cta: 'Explore H1',
            h2Label: 'H2 — Transformation',
            h2Tagline: 'Navigate tomorrow.',
            h2Desc: 'Transform culture, operations, and experience so your organization can adapt to the near future with speed and confidence.',
            h2Cta: 'Explore H2',
            h3Label: 'H3 — Innovation',
            h3Tagline: 'Create the future.',
            h3Desc: 'Design new products and services, and build new ventures that create future growth.',
            h3Cta: 'Explore H3',
            diffTitle: 'What makes Opinno different',
            diffP1: 'Many firms can produce reports. Others can run change programs. A smaller number can help launch new ventures.',
            diffP2: 'Opinno connects all three.',
            diffP3: 'We combine intelligence, transformation, and innovation in one integrated model, allowing clients to move from understanding to action to future growth with far greater coherence.',
            ctaTitle: "Let's define your next horizon.",
            ctaButton: 'Talk to us',
            partnersTitle: 'Our Partners',
        }
    }
    const c = lang === 'es' ? t.es : lang === 'it' ? t.it : t.en

    return (
        <InteriorPageLayout
            breadcrumb={c.breadcrumb}
            title={c.title}
            sidebar={getSidebar("expertise", lang)}
        >
            {/* Hero */}
            <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight text-opinno-primary mb-6">{c.heroTitle}</h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-6">{c.heroDesc}</p>
                <ul className="space-y-2 mb-6">
                    {c.heroBullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-opinno-gray font-body leading-relaxed">
                            <span className="text-opinno-accent font-bold mt-0.5">—</span>
                            {bullet}
                        </li>
                    ))}
                </ul>
                <p className="text-base font-medium text-opinno-primary font-body">{c.heroClosing}</p>
            </div>

            {/* Horizons overview image */}
            <div className="mb-16">
                <img src="/assets/expertise/horizons-overview.svg" alt="Three Horizons" className="w-full rounded-xl border border-opinno-border" />
            </div>

            {/* Intro */}
            <div className="mb-16">
                <h2 className="text-xl md:text-2xl font-bold font-display text-opinno-primary mb-6">{c.introTitle}</h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">{c.introP1}</p>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">{c.introP2}</p>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-6">{c.introP3}</p>
                <ul className="space-y-4 mb-6">
                    <li className="pl-4 border-l-4 border-opinno-accent/30">
                        <p className="text-base text-opinno-gray font-body leading-relaxed"><strong className="text-opinno-primary">{c.introH1.split(' means ')[0]}</strong> means {c.introH1.split(' means ')[1]}</p>
                    </li>
                    <li className="pl-4 border-l-4 border-opinno-accent/50">
                        <p className="text-base text-opinno-gray font-body leading-relaxed"><strong className="text-opinno-primary">{c.introH2.split(' means ')[0] || c.introH2.split(' significa ')[0]}</strong> {c.introH2.includes(' means ') ? 'means ' + c.introH2.split(' means ')[1] : c.introH2.includes(' significa ') ? 'significa ' + c.introH2.split(' significa ')[1] : c.introH2}</p>
                    </li>
                    <li className="pl-4 border-l-4 border-opinno-accent">
                        <p className="text-base text-opinno-gray font-body leading-relaxed"><strong className="text-opinno-primary">{c.introH3.split(' means ')[0] || c.introH3.split(' significa ')[0]}</strong> {c.introH3.includes(' means ') ? 'means ' + c.introH3.split(' means ')[1] : c.introH3.includes(' significa ') ? 'significa ' + c.introH3.split(' significa ')[1] : c.introH3}</p>
                    </li>
                </ul>
                <p className="text-base text-opinno-gray font-body leading-relaxed">{c.introClosing}</p>
            </div>

            {/* Horizon cards */}
            <div className="grid grid-cols-1 gap-8 mb-16">
                {[
                    { label: c.h1Label, tagline: c.h1Tagline, desc: c.h1Desc, cta: c.h1Cta, href: `/${lang}/intelligence`, image: '/assets/expertise/h1-intelligence.svg', accent: 'border-l-opinno-primary' },
                    { label: c.h2Label, tagline: c.h2Tagline, desc: c.h2Desc, cta: c.h2Cta, href: `/${lang}/transformation`, image: '/assets/expertise/h2-transformation.svg', accent: 'border-l-opinno-accent' },
                    { label: c.h3Label, tagline: c.h3Tagline, desc: c.h3Desc, cta: c.h3Cta, href: `/${lang}/innovation`, image: '/assets/expertise/h3-innovation.svg', accent: 'border-l-opinno-accent' },
                ].map(h => (
                    <Link key={h.label} href={h.href} className={`block bg-white rounded-xl border border-opinno-border overflow-hidden hover:shadow-lg transition-shadow group`}>
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/5">
                                <img src={h.image} alt={h.label} className="w-full h-48 md:h-full object-cover" />
                            </div>
                            <div className={`flex-1 p-6 md:p-8 border-l-4 ${h.accent}`}>
                                <p className="text-xs font-bold uppercase tracking-widest text-opinno-accent mb-2">{h.label}</p>
                                <h3 className="text-xl font-bold font-display text-opinno-primary mb-3 group-hover:text-opinno-accent transition-colors">{h.tagline}</h3>
                                <p className="text-sm text-opinno-gray font-body leading-relaxed mb-4">{h.desc}</p>
                                <span className="text-sm font-bold text-opinno-accent group-hover:underline">{h.cta} &rarr;</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* What makes Opinno different */}
            <div className="bg-white rounded-xl border border-opinno-border p-8 md:p-10 mb-16">
                <h2 className="text-xl md:text-2xl font-bold font-display text-opinno-primary mb-6">{c.diffTitle}</h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">{c.diffP1}</p>
                <p className="text-lg font-bold text-opinno-primary font-display mb-4">{c.diffP2}</p>
                <p className="text-base text-opinno-gray font-body leading-relaxed">{c.diffP3}</p>
            </div>

            {/* CTA */}
            <div className="text-center py-12 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold font-display text-opinno-primary mb-6">{c.ctaTitle}</h2>
                <Link href={`/${lang}/contact`} className="inline-block px-8 py-3 bg-opinno-accent text-white font-bold tracking-wider uppercase hover:bg-opinno-accent-hover transition-all duration-300 rounded">
                    {c.ctaButton}
                </Link>
            </div>

            {/* Partners */}
            <div className="mt-8 pt-12 border-t border-opinno-border">
                <h3 className="text-sm font-bold text-opinno-gray mb-6 tracking-wide uppercase">{c.partnersTitle}</h3>
                <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-60 grayscale">
                    {PARTNER_LOGOS.map(logo => (
                        <img key={logo.name} src={logo.src} alt={logo.name} className="h-8 md:h-10 object-contain" loading="lazy" />
                    ))}
                </div>
            </div>
        </InteriorPageLayout>
    )
}
