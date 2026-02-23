import InteriorPageLayout from '@/components/InteriorPageLayout'
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
                <form className="space-y-4 max-w-xl">
                    <input type="text" placeholder={lang === 'es' ? 'Nombre *' : lang === 'it' ? 'Nome *' : 'Name *'} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
                    <input type="email" placeholder={lang === 'es' ? 'Correo electrónico *' : lang === 'it' ? 'Email *' : 'Email *'} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
                    <select className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body text-opinno-gray focus:outline-none focus:border-opinno-accent bg-white">
                        <option value="">{lang === 'es' ? 'País' : lang === 'it' ? 'Paese' : 'Country'}</option>
                        <option>United States</option>
                        <option>Spain</option>
                        <option>Italy</option>
                        <option>Mexico</option>
                        <option>Colombia</option>
                        <option>Ecuador</option>
                        <option>Peru</option>
                        <option>Argentina</option>
                        <option>Portugal</option>
                        <option>Saudi Arabia</option>
                        <option>United Arab Emirates</option>
                        <option>Other</option>
                    </select>
                    <input type="text" placeholder={lang === 'es' ? 'Empresa' : lang === 'it' ? 'Azienda' : 'Company'} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
                    <textarea placeholder={lang === 'es' ? '¿Cómo podemos ayudarte? *' : lang === 'it' ? 'Come possiamo aiutarti? *' : 'How can we help you? *'} rows={5} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent resize-none" />
                    <div className="flex items-start gap-2">
                        <input type="checkbox" id="accept-privacy" className="mt-1 accent-opinno-accent" />
                        <label htmlFor="accept-privacy" className="text-sm text-opinno-gray font-body">
                            {lang === 'es' ? 'He leído y acepto la ' : lang === 'it' ? 'Ho letto e accetto la ' : 'I have read and accept Opinno\'s '}<a href={`/${lang}/privacy`} className="text-opinno-accent hover:underline">{lang === 'es' ? 'Política de Privacidad' : lang === 'it' ? 'Informativa sulla privacy' : 'Privacy Policy'}</a>.
                        </label>
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.875rem' }}>{lang === 'es' ? 'ENVIAR' : lang === 'it' ? 'INVIA' : 'SUBMIT'}</button>
                </form>
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
