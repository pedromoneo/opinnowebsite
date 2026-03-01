import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from '@/lib/page-data'
import Link from 'next/link'

export default function TransformationPage({ lang }: { lang: string }) {
    const t = {
        es: {
            breadcrumb: 'Servicios',
            title: 'H2 — Transformación',
            heroTitle: 'Transforma lo que debe cambiar ahora.',
            heroDesc: 'H2 se trata de ayudar a las organizaciones a adaptarse al futuro cercano a través de cambios que mejoran la resiliencia, la relevancia y el rendimiento.',
            heroP2: 'Opinno trabaja con los clientes para transformar la cultura, las formas de trabajo y la experiencia del cliente para que la organización pueda responder más rápido a las condiciones cambiantes.',
            overviewTitle: 'La transformación no es un concepto. Es una realidad operativa.',
            overviewP1: 'Muchas organizaciones entienden que el cambio es necesario, pero luchan por pasar de la ambición a la ejecución. Los esfuerzos se fragmentan, el impulso se desvanece y la transformación permanece superficial.',
            overviewP2: 'Nuestra oferta de Transformación se centra en los cambios que hacen que una organización sea más adaptable en la práctica: cómo trabajan las personas, cómo colaboran los equipos, cómo se toman las decisiones y cómo los clientes experimentan la empresa.',
            s1Title: '2.1 Transformación cultural',
            s1Tagline: 'Cambia comportamientos, no solo mensajes.',
            s1Desc: 'La cultura cambia cuando el liderazgo, los incentivos, los comportamientos y la experiencia diaria comienzan a moverse en la misma dirección.',
            s1Extra: 'Ayudamos a las organizaciones a evolucionar las bases culturales necesarias para la innovación, la agilidad, la colaboración y una ejecución más sólida.',
            s2Title: '2.2 Experiencia del empleado',
            s2Tagline: 'Haz el cambio real para las personas dentro del negocio.',
            s2Desc: 'La transformación solo se vuelve sostenible cuando los empleados la experimentan de formas tangibles.',
            s2Extra: 'Ayudamos a los clientes a rediseñar aspectos de la experiencia del empleado para que la organización sea más atractiva, más alineada y mejor equipada para sostener el cambio.',
            s3Title: '2.3 Nuevas formas de trabajar',
            s3Tagline: 'Construye modelos operativos preparados para la velocidad.',
            s3Desc: 'Las estructuras tradicionales a menudo ralentizan a las organizaciones. Ayudamos a los clientes a introducir nuevas formas de trabajo que mejoran la capacidad de respuesta, la colaboración interfuncional, la experimentación y la entrega.',
            s3Extra: 'Esto puede incluir rediseño de equipos, nuevos modelos de gobernanza, ritmos de decisión actualizados y prácticas operativas más adaptativas.',
            s4Title: '2.4 Experiencia del cliente',
            s4Tagline: 'Compite a través de la calidad de la experiencia.',
            s4Desc: 'Los clientes te comparan no solo con tus competidores directos, sino con las mejores experiencias que tienen en cualquier lugar.',
            s4Extra: 'Ayudamos a las organizaciones a rediseñar los recorridos del cliente, identificar necesidades no satisfechas, eliminar fricciones y crear experiencias más simples, más relevantes y más diferenciadas.',
            closingTitle: 'Transformación con impacto visible en el negocio.',
            closingDesc: 'Nuestro trabajo H2 es práctico por diseño. Nos centramos en cambios que mejoran cómo funciona la organización y cómo se experimenta, creando impulso en lugar de fatiga de cambio.',
            ctaTitle: '¿Listo para convertir la estrategia en cambio real?',
            ctaButton: 'Habla con nosotros',
        },
        it: {
            breadcrumb: 'Servizi',
            title: 'H2 — Trasformazione',
            heroTitle: 'Trasforma ciò che deve cambiare ora.',
            heroDesc: 'H2 riguarda l\'aiutare le organizzazioni ad adattarsi al futuro prossimo attraverso cambiamenti che migliorano resilienza, rilevanza e performance.',
            heroP2: 'Opinno lavora con i clienti per trasformare cultura, modi di lavorare ed esperienza del cliente affinché l\'organizzazione possa rispondere più rapidamente alle condizioni in cambiamento.',
            overviewTitle: 'La trasformazione non è un concetto. È una realtà operativa.',
            overviewP1: 'Molte organizzazioni capiscono che il cambiamento è necessario, ma faticano a passare dall\'ambizione all\'esecuzione. Gli sforzi si frammentano, lo slancio svanisce e la trasformazione rimane superficiale.',
            overviewP2: 'La nostra offerta di Trasformazione si concentra sui cambiamenti che rendono un\'organizzazione più adattiva nella pratica: come lavorano le persone, come collaborano i team, come vengono prese le decisioni e come i clienti vivono l\'azienda.',
            s1Title: '2.1 Trasformazione culturale',
            s1Tagline: 'Cambia i comportamenti, non solo i messaggi.',
            s1Desc: 'La cultura cambia quando leadership, incentivi, comportamenti ed esperienza quotidiana iniziano a muoversi nella stessa direzione.',
            s1Extra: 'Aiutiamo le organizzazioni a evolvere le fondamenta culturali necessarie per innovazione, agilità, collaborazione ed esecuzione più forte.',
            s2Title: '2.2 Esperienza dei dipendenti',
            s2Tagline: 'Rendi il cambiamento reale per le persone dentro l\'azienda.',
            s2Desc: 'La trasformazione diventa sostenibile solo quando i dipendenti la vivono in modi tangibili.',
            s2Extra: 'Aiutiamo i clienti a riprogettare aspetti dell\'esperienza dei dipendenti affinché l\'organizzazione diventi più coinvolgente, più allineata e meglio equipaggiata per sostenere il cambiamento.',
            s3Title: '2.3 Nuovi modi di lavorare',
            s3Tagline: 'Costruisci modelli operativi adatti alla velocità.',
            s3Desc: 'Le strutture tradizionali spesso rallentano le organizzazioni. Aiutiamo i clienti a introdurre nuovi modi di lavorare che migliorano reattività, collaborazione interfunzionale, sperimentazione e delivery.',
            s3Extra: 'Questo può includere ridisegno dei team, nuovi modelli di governance, ritmi decisionali aggiornati e pratiche operative più adattive.',
            s4Title: '2.4 Esperienza del cliente',
            s4Tagline: 'Competi attraverso la qualità dell\'esperienza.',
            s4Desc: 'I clienti ti confrontano non solo con i tuoi concorrenti diretti, ma con le migliori esperienze che hanno ovunque.',
            s4Extra: 'Aiutiamo le organizzazioni a riprogettare i percorsi del cliente, identificare bisogni insoddisfatti, rimuovere frizioni e creare esperienze più semplici, più rilevanti e più differenziate.',
            closingTitle: 'Trasformazione con impatto visibile sul business.',
            closingDesc: 'Il nostro lavoro H2 è pratico per design. Ci concentriamo su cambiamenti che migliorano come funziona l\'organizzazione e come viene vissuta, creando slancio invece di fatica del cambiamento.',
            ctaTitle: 'Pronto a trasformare la strategia in cambiamento reale?',
            ctaButton: 'Parlaci',
        },
        en: {
            breadcrumb: 'Expertise',
            title: 'H2 — Transformation',
            heroTitle: 'Transform what must change now.',
            heroDesc: 'H2 is about helping organizations adapt to the near future through changes that improve resilience, relevance, and performance.',
            heroP2: 'Opinno works with clients to transform culture, ways of working, and customer experience so the organization can respond faster to changing conditions.',
            overviewTitle: 'Transformation is not a concept. It is an operating reality.',
            overviewP1: 'Many organizations understand that change is necessary, but struggle to move from ambition to execution. Efforts become fragmented, momentum fades, and transformation remains superficial.',
            overviewP2: 'Our Transformation offering focuses on the changes that make an organization more adaptive in practice: how people work, how teams collaborate, how decisions are made, and how customers experience the company.',
            s1Title: '2.1 Cultural transformation',
            s1Tagline: 'Shift behavior, not just messaging.',
            s1Desc: 'Culture changes when leadership, incentives, behaviors, and daily experience start to move in the same direction.',
            s1Extra: 'We help organizations evolve the cultural foundations required for innovation, agility, collaboration, and stronger execution.',
            s2Title: '2.2 Employee experience',
            s2Tagline: 'Make change real for the people inside the business.',
            s2Desc: 'Transformation only becomes sustainable when employees experience it in tangible ways.',
            s2Extra: 'We help clients redesign aspects of the employee experience so the organization becomes more engaging, more aligned, and better equipped to sustain change.',
            s3Title: '2.3 New ways of working',
            s3Tagline: 'Build operating models fit for speed.',
            s3Desc: 'Traditional structures often slow organizations down. We help clients introduce new ways of working that improve responsiveness, cross-functional collaboration, experimentation, and delivery.',
            s3Extra: 'This can include team redesign, new governance models, updated decision rhythms, and more adaptive operating practices.',
            s4Title: '2.4 Customer experience',
            s4Tagline: 'Compete through the quality of the experience.',
            s4Desc: 'Customers compare you not only with your direct competitors, but with the best experiences they have anywhere.',
            s4Extra: 'We help organizations redesign customer journeys, identify unmet needs, remove friction, and create experiences that are simpler, more relevant, and more differentiated.',
            closingTitle: 'Transformation with visible business impact.',
            closingDesc: 'Our H2 work is practical by design. We focus on changes that improve how the organization functions and how it is experienced, creating momentum instead of change fatigue.',
            ctaTitle: 'Ready to turn strategy into real change?',
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
                <img src="/assets/expertise/h2-transformation.svg" alt="H2 Transformation" className="w-full rounded-xl border border-opinno-border" />
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
