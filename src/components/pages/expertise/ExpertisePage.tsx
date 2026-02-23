import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar, PARTNER_LOGOS } from '@/lib/page-data'
import Link from 'next/link'

export default function ExpertisePage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Servicios' : lang === 'it' ? 'Servizi' : 'Expertise'}
            title={lang === 'es' ? 'Servicios' : lang === 'it' ? 'Servizi' : 'Services'}
            sidebar={getSidebar("expertise", lang)}
        >
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {lang === 'es' ? 'Ayudamos a las organizaciones a innovar, transformarse y construir el futuro.' : lang === 'it' ? 'Aiutiamo le organizzazioni a innovare, trasformarsi e costruire il futuro.' : 'We help organizations innovate, transform, and build the future.'}
                </p>
            </div>

            <div className="mb-10">
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-6">
                    {lang === 'es' ? 'Nuestros servicios están diseñados para ayudar a las organizaciones a navegar por la complejidad e impulsar un cambio significativo. Ya sea que necesites entender mercados emergentes, transformar tu cultura o crear nuevas empresas desde cero, nuestro equipo global aporta la experiencia, las redes y las herramientas para lograr resultados reales.' : lang === 'it' ? 'I nostri servizi sono progettati per aiutare le organizzazioni ad affrontare la complessità e a promuovere un cambiamento significativo. Sia che tu abbia bisogno di comprendere i mercati emergenti, trasformare la tua cultura o creare aziende completamente nuove, il nostro team globale porta con sé l\'esperienza, le reti e gli strumenti per fornire risultati.' : 'Our services are designed to help organizations navigate complexity and drive meaningful change. Whether you need to understand emerging markets, transform your culture, or build entirely new ventures, our global team brings the expertise, networks, and tools to deliver results.'}
                </p>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                    {
                        title: 'Open Innovation',
                        description: lang === 'es' ? 'Ayudamos a los clientes a aprovechar fuentes de innovación externas, desde startups hasta universidades, para acelerar el crecimiento y la competitividad.' : lang === 'it' ? 'Aiutiamo i clienti a sfruttare fonti di innovazione esterne, dalle startup alle università, per accelerare la crescita e la competitività.' : 'We help clients leverage external innovation sources — from startups to universities — to accelerate growth and competitiveness.',
                        href: `/${lang}/open-innovation`,
                    },
                    {
                        title: 'Corporate Transformation',
                        description: lang === 'es' ? 'Guiamos a las organizaciones a través de transformaciones culturales, digitales y estratégicas para prosperar en la economía de la innovación.' : lang === 'it' ? 'Guidiamo le organizzazioni attraverso trasformazioni culturali, digitali e strategiche per prosperare nell\'economia dell\'innovazione.' : 'We guide organizations through cultural, digital, and strategic transformations to thrive in the innovation economy.',
                        href: `/${lang}/corporate-transformation`,
                    },
                    {
                        title: 'Venture Building',
                        description: lang === 'es' ? 'Diseñamos, construimos y lanzamos nuevos productos, servicios y negocios que crean valor e impulsan el crecimiento.' : lang === 'it' ? 'Progettiamo, costruiamo e lanciamo nuovi prodotti, servizi e attività che creano valore e stimolano la crescita.' : 'We design, build, and launch new products, services, and businesses that create value and drive growth.',
                        href: `/${lang}/venture-building`,
                    },
                    {
                        title: 'Technology Solutions',
                        description: lang === 'es' ? 'Construimos plataformas digitales a medida y aprovechamos tecnología de vanguardia para escalar la innovación.' : lang === 'it' ? 'Costruiamo piattaforme digitali personalizzate e sfruttiamo tecnologie all\'avanguardia per consentire l\'innovazione su larga scala.' : 'We build custom digital platforms and leverage cutting-edge technology to enable innovation at scale.',
                        href: `/${lang}/technology-solutions`,
                    },
                ].map(service => (
                    <Link key={service.title} href={service.href} className="block p-6 bg-white rounded-xl border border-opinno-border hover:border-opinno-accent transition-colors group">
                        <h3 className="text-lg font-bold font-display mb-2 group-hover:text-opinno-accent transition-colors">{service.title}</h3>
                        <p className="text-sm text-opinno-gray font-body leading-relaxed">{service.description}</p>
                    </Link>
                ))}
            </div>

            {/* Partners */}
            <div className="mt-16 pt-12 border-t border-opinno-border">
                <h3 className="text-sm font-bold text-opinno-gray mb-6 tracking-wide uppercase">
                    {lang === 'es' ? 'Nuestros Partners' : lang === 'it' ? 'I Nostri Partner' : 'Our Partners'}
                </h3>
                <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-60 grayscale">
                    {PARTNER_LOGOS.map(logo => (
                        <img
                            key={logo.name}
                            src={logo.src}
                            alt={logo.name}
                            className="h-8 md:h-10 object-contain"
                            loading="lazy"
                        />
                    ))}
                </div>
            </div>
        </InteriorPageLayout>
    )
}
