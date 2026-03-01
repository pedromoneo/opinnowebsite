import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from '@/lib/page-data'
import Link from 'next/link'

export default function InnovationPage({ lang }: { lang: string }) {
    const t = {
        es: {
            breadcrumb: 'Servicios',
            title: 'H3 — Innovación',
            heroTitle: 'Crea las innovaciones que darán forma a tu futuro.',
            heroDesc: 'H3 se trata de construir más allá del negocio actual: nuevos productos, nuevos servicios y nuevos negocios que generen crecimiento futuro.',
            heroP2: 'Aquí es donde Opinno aporta sus capacidades de innovación más distintivas.',
            overviewTitle: 'La relevancia a largo plazo debe ser diseñada.',
            overviewP1: 'Las organizaciones que solo se centran en el rendimiento actual eventualmente pierden terreno estratégico. El crecimiento sostenible requiere la capacidad de identificar nuevas fuentes de valor, explorar nuevas oportunidades y construir más allá del núcleo.',
            overviewP2: 'Nuestra oferta de Innovación ayuda a los clientes a hacer exactamente eso, combinando creatividad con disciplina para que el trabajo orientado al futuro resulte en oportunidades concretas.',
            s1Title: '3.1 Diseño de servicios y productos',
            s1Tagline: 'Diseña lo que la gente valorará.',
            s1Desc: 'Ayudamos a los clientes a identificar necesidades no satisfechas y traducirlas en nuevos productos, servicios y propuestas de valor.',
            s1Extra: 'Nuestro enfoque combina conocimiento, comprensión del usuario, experimentación y lógica de negocio para que la innovación no sea abstracta, sino comercialmente significativa.',
            s2Title: '3.2 Construcción de ventures corporativas',
            s2Tagline: 'Construye nuevos motores de crecimiento desde dentro.',
            s2Desc: 'Cuando el negocio principal no es suficiente para generar crecimiento futuro, las organizaciones necesitan nuevas apuestas.',
            s2Extra: 'Ayudamos a los clientes a identificar oportunidades, dar forma a conceptos, validar la demanda y diseñar nuevos negocios que aprovechen los activos, capacidades y ventajas estratégicas de la organización matriz.',
            closingTitle: 'Innovación con disciplina de negocio.',
            closingDesc: 'Nuestro trabajo H3 es para organizaciones que quieren más que mejoras incrementales. Es para aquellas que están listas para crear la próxima ola de crecimiento con mayor ambición y mayor rigor.',
            ctaTitle: '¿Buscas construir lo que viene después?',
            ctaButton: 'Habla con nosotros',
        },
        it: {
            breadcrumb: 'Servizi',
            title: 'H3 — Innovazione',
            heroTitle: 'Crea le innovazioni che plasmeranno il tuo futuro.',
            heroDesc: 'H3 riguarda il costruire oltre il business attuale: nuovi prodotti, nuovi servizi e nuove venture che creano crescita futura.',
            heroP2: 'È qui che Opinno porta le sue capacità di innovazione più distintive.',
            overviewTitle: 'La rilevanza a lungo termine deve essere progettata.',
            overviewP1: 'Le organizzazioni che si concentrano solo sulle performance attuali alla fine perdono terreno strategico. La crescita sostenibile richiede la capacità di identificare nuove fonti di valore, esplorare nuove opportunità e costruire oltre il core.',
            overviewP2: 'La nostra offerta di Innovazione aiuta i clienti a fare esattamente questo, combinando creatività con disciplina affinché il lavoro orientato al futuro risulti in opportunità concrete.',
            s1Title: '3.1 Design di servizi e prodotti',
            s1Tagline: 'Progetta ciò che le persone apprezzeranno.',
            s1Desc: 'Aiutiamo i clienti a identificare bisogni insoddisfatti e tradurli in nuovi prodotti, servizi e proposte di valore.',
            s1Extra: 'Il nostro approccio combina conoscenza, comprensione dell\'utente, sperimentazione e logica di business affinché l\'innovazione non sia astratta, ma commercialmente significativa.',
            s2Title: '3.2 Corporate venture building',
            s2Tagline: 'Costruisci nuovi motori di crescita dall\'interno.',
            s2Desc: 'Quando il business core non è sufficiente per garantire la crescita futura, le organizzazioni hanno bisogno di nuove scommesse.',
            s2Extra: 'Aiutiamo i clienti a identificare opportunità, dare forma a concetti, validare la domanda e progettare nuove venture che sfruttino gli asset, le capacità e i vantaggi strategici dell\'organizzazione madre.',
            closingTitle: 'Innovazione con disciplina di business.',
            closingDesc: 'Il nostro lavoro H3 è per organizzazioni che vogliono più di miglioramenti incrementali. È per quelle pronte a creare la prossima ondata di crescita con maggiore ambizione e maggiore rigore.',
            ctaTitle: 'Vuoi costruire ciò che verrà dopo?',
            ctaButton: 'Parlaci',
        },
        en: {
            breadcrumb: 'Expertise',
            title: 'H3 — Innovation',
            heroTitle: 'Create the innovations that will shape your future.',
            heroDesc: 'H3 is about building beyond the present business: new products, new services, and new ventures that create future growth.',
            heroP2: 'This is where Opinno brings its most distinctive innovation capabilities to bear.',
            overviewTitle: 'Long-term relevance has to be designed.',
            overviewP1: 'Organizations that focus only on current performance eventually lose strategic ground. Sustainable growth requires the ability to identify new sources of value, explore new opportunities, and build beyond the core.',
            overviewP2: 'Our Innovation offering helps clients do exactly that, combining creativity with discipline so future-oriented work results in concrete opportunities.',
            s1Title: '3.1 Service and product design',
            s1Tagline: 'Design what people will value.',
            s1Desc: 'We help clients identify unmet needs and translate them into new products, services, and value propositions.',
            s1Extra: 'Our approach combines insight, user understanding, experimentation, and business logic so innovation is not abstract, but commercially meaningful.',
            s2Title: '3.2 Corporate venture building',
            s2Tagline: 'Build new growth engines from within.',
            s2Desc: 'When the core business is not enough to deliver future growth, organizations need new bets.',
            s2Extra: 'We help clients identify opportunities, shape concepts, validate demand, and design new ventures that leverage the assets, capabilities, and strategic advantages of the parent organization.',
            closingTitle: 'Innovation with business discipline.',
            closingDesc: 'Our H3 work is for organizations that want more than incremental improvement. It is for those ready to create the next wave of growth with greater ambition and greater rigor.',
            ctaTitle: 'Looking to build what comes next?',
            ctaButton: 'Talk to us',
        }
    }
    const c = lang === 'es' ? t.es : lang === 'it' ? t.it : t.en

    const services = [
        { title: c.s1Title, tagline: c.s1Tagline, desc: c.s1Desc, extra: c.s1Extra },
        { title: c.s2Title, tagline: c.s2Tagline, desc: c.s2Desc, extra: c.s2Extra },
    ]

    return (
        <InteriorPageLayout
            breadcrumb={c.breadcrumb}
            title={c.title}
            sidebar={getSidebar("expertise", lang)}
        >
            {/* Hero image */}
            <div className="mb-10">
                <img src="/assets/expertise/h3-innovation.svg" alt="H3 Innovation" className="w-full rounded-xl border border-opinno-border" />
            </div>

            {/* Hero */}
            <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight text-opinno-primary mb-6">{c.heroTitle}</h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">{c.heroDesc}</p>
                <p className="text-lg font-medium text-opinno-primary font-display">{c.heroP2}</p>
            </div>

            {/* Overview */}
            <div className="mb-16">
                <h2 className="text-xl md:text-2xl font-bold font-display text-opinno-primary mb-6">{c.overviewTitle}</h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">{c.overviewP1}</p>
                <p className="text-base text-opinno-gray font-body leading-relaxed">{c.overviewP2}</p>
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
