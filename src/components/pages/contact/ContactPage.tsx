import InteriorPageLayout from '@/components/InteriorPageLayout'
import ContactForm from '@/components/ContactForm'
import { getSidebar, OFFICE_LOCATIONS } from '@/lib/page-data'

export default function ContactPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Contact'}
            title={lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Contact'}
            sidebar={getSidebar("contact", lang)}
        >
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {lang === 'es' ? '¡Nos encantaría conocerte y ayudarte a innovar!' : lang === 'it' ? 'Ci piacerebbe conoscerti e aiutarti a innovare!' : 'We would love to know about you and help you innovate!'}
                </p>
            </div>

            {/* Contact form */}
            <div className="mb-16">
                <ContactForm lang={lang} />
            </div>

            {/* Opinno Global / World Map */}
            <div className="mt-12 pt-12 border-t border-opinno-border">
                <h2 className="text-xl font-bold font-display mb-8">OPINNO GLOBAL</h2>

                {/* Map visualization using a styled div with office markers */}
                <div className="relative bg-gray-50 rounded-2xl p-8 mb-8 overflow-hidden" style={{ minHeight: '400px' }}>
                    {/* World map background */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://opinno.com/wp-content/uploads/2023/06/opinno-map.png"
                        alt="Opinno Global Offices"
                        className="w-full h-auto"
                        loading="lazy"
                    />
                </div>

                {/* Office list as fallback/complement */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {OFFICE_LOCATIONS.map(city => (
                        <div key={city} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-opinno-accent flex-shrink-0"></span>
                            <span className="text-sm text-opinno-gray font-body">{city}</span>
                        </div>
                    ))}
                </div>
            </div>
        </InteriorPageLayout>
    )
}
