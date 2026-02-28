import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar, PARTNER_LOGOS } from '@/lib/page-data'
import Link from 'next/link'

export default function AboutOverviewPage({ lang }: { lang: string }) {
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

            {/* What we do */}
            <div className="mb-12">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Qué hacemos' : lang === 'it' ? 'Cosa facciamo' : 'What we do'}
                </h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-6">
                    {lang === 'es' ? 'Somos el punto de encuentro entre la innovación, la transformación y la tecnología. Nuestro modelo de negocio ayuda a nuestros clientes a monitorizar y a entender el mercado.' : lang === 'it' ? 'Siamo il punto d\'incontro tra innovazione, trasformazione e tecnologia. Il nostro modello di servizio aiuta i nostri clienti a monitorare e comprendere il mercato.' : 'We are the meeting point for innovation, transformation, and technology. Our service model helps our clients to monitor and understand the market.'}
                </p>
                <ul className="space-y-4 ml-4">
                    <li className="text-base text-opinno-gray font-body leading-relaxed">
                        <span className="text-opinno-accent font-semibold">○ {lang === 'es' ? 'Innovación Abierta' : 'Open Innovation'}.</span> {lang === 'es' ? 'Entender el mercado es el punto de partida de la innovación. Nuestro grupo de innovación abierta proporciona al cliente inteligencia de mercado.' : 'Understanding the market is the starting point for innovation. Our open innovation group provides our clients with market intelligence.'}
                    </li>
                    <li className="text-base text-opinno-gray font-body leading-relaxed">
                        <span className="text-opinno-accent font-semibold">○ {lang === 'es' ? 'Transformación' : lang === 'it' ? 'Trasformazione' : 'Transformation'}.</span> {lang === 'es' ? 'Ayudamos a transformar organizaciones construyendo una visión innovadora del futuro y adaptando la cultura a la nueva economía.' : 'We help transform organizations, building an innovative vision of the future, adapting the culture to the new rules.'}
                    </li>
                    <li className="text-base text-opinno-gray font-body leading-relaxed">
                        <span className="text-opinno-accent font-semibold">○ Venture Building.</span> {lang === 'es' ? 'Apoyamos a nuestros clientes diseñando y construyendo nuevos productos, prototipos o incluso nuevos negocios.' : 'We support our clients by designing and building new products, prototypes, or even entire businesses.'}
                    </li>
                    <li className="text-base text-opinno-gray font-body leading-relaxed">
                        <span className="text-opinno-accent font-semibold">○ {lang === 'es' ? 'Soluciones Tecnológicas' : lang === 'it' ? 'Soluzioni Tecnologiche' : 'Technology Solutions'}.</span> {lang === 'es' ? 'Construimos productos digitales y plataformas impulsando la innovación a escala.' : 'We build digital products and platforms that drive innovation at scale.'}
                    </li>
                </ul>
            </div>

            {/* How we do it / Why we do it combined structure localized */}
            <div className="mb-12">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Por qué lo hacemos' : lang === 'it' ? 'Perché lo facciamo' : 'Why we do it'}
                </h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                    {lang === 'es' ? 'Creemos firmemente que la innovación debe tener un impacto positivo en la sociedad y el medio ambiente.' : lang === 'it' ? 'Crediamo che l\'innovazione debba avere un impatto positivo sulla società e sull\'ambiente.' : 'We believe innovation must have a positive impact on society and the environment.'}
                </p>
                <p className="text-base text-opinno-gray font-body leading-relaxed">
                    {lang === 'es' ? 'Como B Corp certificada, cumplimos los mayores estándares y garantizamos la calidad y consistencia global.' : 'As a Certified B Corp, we meet the highest standards of social and environmental performance, accountability, and transparency.'}
                </p>
            </div>

            {/* Partners logos */}
            <div className="mt-16 pt-12 border-t border-opinno-border">
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
