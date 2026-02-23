import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function FrameworkPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Servicios' : lang === 'it' ? 'Servizi' : 'Expertise'}
            title="Framework"
            sidebar={getSidebar("expertise", lang)}
        >
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {lang === 'es' ? 'Nuestro marco de innovación impulsa el impacto en cada proyecto.' : lang === 'it' ? 'Il nostro quadro di innovazione guida l\'impatto in ogni progetto.' : 'Our innovation framework drives impact across every engagement.'}
                </p>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold font-display mb-4">Innovation as a Service</h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                    {lang === 'es' ? 'El marco de Opinno se basa en el principio de que la innovación debe ser sistemática, medible y escalable. Hemos desarrollado una metodología que permite a las organizaciones aprovechar la innovación como una capacidad estructurada.' : lang === 'it' ? 'Il framework di Opinno si basa sul principio che l\'innovazione debba essere sistematica, misurabile e scalabile. Abbiamo sviluppato una metodologia che consente alle organizzazioni di sfruttare l\'innovazione come una capacità strutturata.' : 'Opinno\'s framework is built on the principle that innovation should be systematic, measurable, and scalable. We have developed a methodology that allows organizations to harness innovation as a structured capability.'}
                </p>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Nuestro Enfoque' : lang === 'it' ? 'Il Nostro Approccio' : 'Our Approach'}
                </h2>
                <div className="space-y-6">
                    {[
                        { step: '01', title: lang === 'es' ? 'Descubrir' : lang === 'it' ? 'Scoprire' : 'Discover', desc: lang === 'es' ? 'Entender el panorama del mercado, identificar tendencias y mapear el ecosistema de innovación a través de la investigación y la inteligencia.' : lang === 'it' ? 'Comprendere il panorama del mercato, identificare le tendenze e mappare l\'ecosistema dell\'innovazione attraverso la ricerca e l\'intelligence.' : 'Understand the market landscape, identify trends, and map the innovation ecosystem through research and intelligence.' },
                        { step: '02', title: lang === 'es' ? 'Diseñar' : lang === 'it' ? 'Progettare' : 'Design', desc: lang === 'es' ? 'Co-crear soluciones con los stakeholders, aprovechando el design thinking y nuestra comunidad global de expertos.' : lang === 'it' ? 'Co-creare soluzioni con gli stakeholder, sfruttando il design thinking e la nostra comunità globale di esperti.' : 'Co-create solutions with stakeholders, leveraging design thinking and our global expert community.' },
                        { step: '03', title: lang === 'es' ? 'Construir' : lang === 'it' ? 'Costruire' : 'Build', desc: lang === 'es' ? 'Desarrollar prototipos, MVPs y soluciones escalables utilizando metodologías ágiles y tecnología de vanguardia.' : lang === 'it' ? 'Sviluppare prototipi, MVP e soluzioni scalabili utilizzando metodologie agili e tecnologie all\'avanguardia.' : 'Develop prototypes, MVPs, and scalable solutions using agile methodologies and cutting-edge technology.' },
                        { step: '04', title: lang === 'es' ? 'Escalar' : lang === 'it' ? 'Scalare' : 'Scale', desc: lang === 'es' ? 'Desplegar, medir y optimizar soluciones para maximizar el impacto y asegurar el crecimiento sostenible.' : lang === 'it' ? 'Implementare, misurare e ottimizzare le soluzioni per massimizzare l\'impatto e garantire una crescita sostenibile.' : 'Deploy, measure, and optimize solutions to maximize impact and ensure sustainable growth.' },
                    ].map(item => (
                        <div key={item.step} className="flex gap-6 items-start p-6 bg-white rounded-xl border border-opinno-border">
                            <div className="text-3xl font-bold text-opinno-accent/30 font-display">{item.step}</div>
                            <div>
                                <h3 className="text-lg font-bold font-display mb-1">{item.title}</h3>
                                <p className="text-sm text-opinno-gray font-body leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </InteriorPageLayout>
    )
}
