import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function ImpactPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Nosotros' : lang === 'it' ? 'Chi siamo' : 'About'}
            title={lang === 'es' ? 'Impacto' : lang === 'it' ? 'Impatto' : 'Impact'}
            sidebar={getSidebar("about", lang)}
        >
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {lang === 'es' ? 'Nuestro compromiso con la sostenibilidad y el impacto social.' : lang === 'it' ? 'Il nostro impegno per la sostenibilità e l\'impatto sociale.' : 'Our commitment to sustainability and social impact.'}
                </p>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Certificación B Corp' : lang === 'it' ? 'Certificazione B Corp' : 'Certified B Corp'}
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1">
                        <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                            {lang === 'es' ? <>Opinno es una <strong>Empresa B Corp Certificada</strong>, cumpliendo con los más altos estándares de desempeño social y ambiental verificado, transparencia pública y responsabilidad legal.</> : lang === 'it' ? <>Opinno è una <strong>B Corporation Certificata</strong>, soddisfacendo i più alti standard di performance sociale e ambientale verificata, trasparenza pubblica e responsabilità legale.</> : <>Opinno is a <strong>Certified B Corporation</strong>, meeting the highest standards of verified social and environmental performance, public transparency, and legal accountability.</>}
                        </p>
                        <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                            {lang === 'es' ? 'Formamos parte de una comunidad global de empresas que equilibran el propósito y el beneficio, utilizando los negocios como una fuerza para el bien.' : lang === 'it' ? 'Facciamo parte di una comunità globale di aziende che bilanciano scopo e profitto, usando il business come forza per il bene.' : 'We are part of a global community of businesses that balance purpose and profit, using business as a force for good.'}
                        </p>
                    </div>
                    <div className="w-[120px] flex-shrink-0">
                        <img
                            src="https://opinno.com/wp-content/uploads/2023/06/B-corp-Logo-1.png"
                            alt="B Corp Certification"
                            className="w-full"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Modelo de Estimación de Impacto' : lang === 'it' ? 'Modello di Stima dell\'Impatto' : 'Impact Estimation Model'}
                </h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                    {lang === 'es' ? <>Hemos desarrollado un <strong>Modelo de Estimación de Impacto</strong> propio que nos permite rastrear y medir el impacto social, económico y ambiental de cada proyecto que entregamos.</> : lang === 'it' ? <>Abbiamo sviluppato un <strong>Modello di Stima dell'Impatto</strong> proprietario che ci consente di tracciare e misurare l'impatto sociale, economico e ambientale di ogni progetto che realizziamo.</> : <>We have developed a proprietary <strong>Impact Estimation Model</strong> that allows us to track and measure the social, economic, and environmental impact of every project we deliver.</>}
                </p>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                    {lang === 'es' ? <>Este modelo está alineado con los <strong>Objetivos de Desarrollo Sostenible (ODS) de las Naciones Unidas</strong> y ayuda a nuestros clientes a comprender el impacto más amplio de sus iniciativas de innovación.</> : lang === 'it' ? <>Questo modello è in linea con gli <strong>Obiettivi di Sviluppo Sostenibile (SDG) delle Nazioni Unite</strong> e aiuta i nostri clienti a comprendere il più ampio impatto delle loro iniziative di innovazione.</> : <>This model is aligned with the <strong>United Nations Sustainable Development Goals (SDGs)</strong> and helps our clients understand the broader impact of their innovation initiatives.</>}
                </p>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Memoria de Impacto' : lang === 'it' ? 'Report di Impatto' : 'Impact Report'}
                </h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                    {lang === 'es' ? 'Cada año, publicamos nuestro Informe de Impacto, presentando los frutos de nuestro Modelo de Impacto y demostrando nuestro compromiso de hacer una diferencia positiva en el mundo.' : lang === 'it' ? 'Ogni anno pubblichiamo il nostro Report sull\'Impatto, presentando i frutti del nostro Modello di Impatto e dimostrando il nostro impegno nel fare una differenza positiva nel mondo.' : 'Every year, we publish our Impact Report, presenting the fruits of our Impact Model and demonstrating our commitment to making a positive difference in the world.'}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    {[
                        { number: '15+', label: lang === 'es' ? 'Años de Impacto' : lang === 'it' ? 'Anni di Impatto' : 'Years of Impact' },
                        { number: '250+', label: lang === 'es' ? 'Proyectos alineados ODS' : lang === 'it' ? 'Progetti allineati SDG' : 'SDG-aligned Projects' },
                        { number: '11', label: lang === 'es' ? 'Países' : lang === 'it' ? 'Paesi' : 'Countries' },
                        { number: '50K+', label: lang === 'es' ? 'Miembros en la comunidad' : lang === 'it' ? 'Membri della comunità' : 'Community Members' },
                    ].map(stat => (
                        <div key={stat.label} className="text-center p-4 bg-white rounded-xl border border-opinno-border">
                            <div className="text-2xl font-bold text-opinno-accent mb-1">{stat.number}</div>
                            <div className="text-xs text-opinno-gray font-body">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </InteriorPageLayout>
    )
}
