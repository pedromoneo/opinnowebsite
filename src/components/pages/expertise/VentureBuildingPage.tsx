import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function VentureBuildingPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Servicios' : lang === 'it' ? 'Servizi' : 'Expertise'}
            title="Venture Building"
            sidebar={getSidebar("expertise", lang)}
        >
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {lang === 'es' ? 'Desde la idea al mercado — construimos nuevos negocios desde cero.' : lang === 'it' ? 'Dall\'idea al mercato: costruiamo da zero nuovi business.' : 'From idea to market — we build new ventures from scratch.'}
                </p>
            </div>

            <div className="mb-10">
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-6">
                    {lang === 'es' ? 'Apostamos firmemente en que el mayor reto para las áreas corporativas de innovación es aterrizar y tangibilizar su actividad. Apoyamos estos departamentos diseñando y construyendo nuevos productos, prototipos o el concepto completo de un nuevo negocio.' : lang === 'it' ? 'La sfida più grande per le organizzazioni è adattare la propria proposta di valore a un mondo in evoluzione. Supportiamo i nostri clienti progettando e costruendo nuovi prodotti, prototipi o interi business.' : 'The biggest challenge for organizations is to adapt their value proposition to a changing world. We support our clients by designing and building new products, prototypes, or even entire businesses.'}
                </p>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Cómo lo construimos' : lang === 'it' ? 'Come lo costruiamo' : 'How we build'}
                </h2>
                <div className="space-y-4">
                    {[
                        { title: 'Ideation & Validation', desc: lang === 'es' ? 'Utilizamos design thinking y metodologías lean startup para identificar y validar oportunidades para nuevas empresas.' : lang === 'it' ? 'Utilizziamo il design thinking e metodologie lean per identificare e convalidare le opportunità per nuove imprese.' : 'We use design thinking and lean startup methodologies to identify and validate opportunities for new ventures.' },
                        { title: 'Product Design & Development', desc: lang === 'es' ? 'Diseñamos y desarrollamos MVPs y prototipos que prueban las suposiciones del mercado y demuestran valor.' : lang === 'it' ? 'Progettiamo e sviluppiamo MVP e prototipi per testare le tendenze del mercato e dimostrarne il valore.' : 'We design and develop MVPs and prototypes that test market assumptions and demonstrate value.' },
                        { title: 'Launch & Scale', desc: lang === 'es' ? 'Ayudamos a lanzar nuevos negocios y a escalarlos a través de estrategias go-to-market, growth hacking y excelencia operativa.' : lang === 'it' ? 'Aiutiamo al lancio e alla scalabilità di nuovi business, attraverso strategie di go-to-market o growth hacking.' : 'We help launch new ventures and scale them through go-to-market strategies, growth hacking, and operational excellence.' },
                        { title: 'Corporate Venture Programs', desc: lang === 'es' ? 'Diseñamos y gestionamos programas de empredurismo corporativo que crean sistemáticamente nuevos negocios desde dentro.' : lang === 'it' ? 'Progettiamo e gestiamo programmi di venture aziendale in grado di creare sistematicamente nuove attività dall\'interno.' : 'We design and manage corporate venture programs that systematically create new businesses from within.' },
                    ].map(item => (
                        <div key={item.title} className="p-5 bg-white rounded-xl border border-opinno-border">
                            <h3 className="text-base font-bold font-display mb-2">{item.title}</h3>
                            <p className="text-sm text-opinno-gray font-body leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </InteriorPageLayout>
    )
}
