import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function CorporateTransformationPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Servicios' : lang === 'it' ? 'Servizi' : 'Expertise'}
            title="Corporate Transformation"
            sidebar={getSidebar("expertise", lang)}
        >
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {lang === 'es' ? 'Transformando organizaciones para la economía de la innovación.' : lang === 'it' ? 'Trasformare le organizzazioni per l\'economia dell\'innovazione.' : 'Transforming organizations for the innovation economy.'}
                </p>
            </div>

            <div className="mb-10">
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-6">
                    {lang === 'es' ? 'Ayudamos a las organizaciones a construir una visión innovadora del futuro, adaptando la cultura a las nuevas reglas de la economía digital y reinventando procesos y formas de trabajar para ayudar a nuestros clientes a ser ágiles, más cercanos a sus clientes y a la vanguardia como emprendedores corporativos.' : lang === 'it' ? 'Aiutiamo le organizzazioni costruendo una visione innovativa del futuro, adattando la cultura alle nuove regole dell\'economia digitale e reinventando processi e modi di lavorare per aiutare i clienti a diventare agili e vicini ai loro clienti.' : 'We help transform organizations by building an innovative vision of the future, adapting the culture to the new rules of the digital economy, and reinventing processes and ways of working to help our clients become agile, more entrepreneurial, and closer to their customers.'}
                </p>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Nuestras capacidades' : lang === 'it' ? 'Le nostre capacità' : 'Our capabilities'}
                </h2>
                <div className="space-y-4">
                    {[
                        { title: 'Cultural Transformation', desc: lang === 'es' ? 'Ayudamos a las organizaciones a desarrollar una cultura de innovación, implementando programas de intraemprendimiento o programas de cambio.' : lang === 'it' ? 'Aiutiamo le organizzazioni a sviluppare una cultura dell\'innovazione, dai cambiamenti di mentalità a nuovi modi di lavorare.' : 'We help organizations develop an innovation culture — from mindset shifts to new ways of working.' },
                        { title: 'Digital Transformation', desc: lang === 'es' ? 'Guiamos los viajes de transformación digital, desde la estrategia hasta la ejecución, asegurando que la tecnología sirva a los objetivos.' : lang === 'it' ? 'Guidiamo percorsi di trasformazione digitale, dalla strategia all\'esecuzione, garantendo che la tecnologia sia conforme agli obiettivi.' : 'We guide digital transformation journeys, from strategy to execution, ensuring technology serves business goals.' },
                        { title: 'Strategic Innovation', desc: lang === 'es' ? 'Ayudamos a definir estrategias de innovación alineadas con los objetivos de negocio y las oportunidades del mercado.' : lang === 'it' ? 'Aiutiamo a definire strategie di innovazione in linea con gli obiettivi aziendali e le opportunità di mercato.' : 'We help define innovation strategies aligned with business objectives and market opportunities.' },
                        { title: 'Organizational Design', desc: lang === 'es' ? 'Rediseñamos estructuras y procesos organizacionales para habilitar la innovación y la agilidad.' : lang === 'it' ? 'Riprogettiamo la struttura e i processi organizzativi per favorire l\'innovazione e l\'agilità.' : 'We redesign organizational structures and processes to enable innovation and agility.' },
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
