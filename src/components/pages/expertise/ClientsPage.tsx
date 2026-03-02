'use client'

import InteriorPageLayout from '@/components/InteriorPageLayout'
import ClientLoginGate from '@/components/ClientLoginGate'
import { getSidebar } from "@/lib/page-data"

export default function ClientsPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Expertise'}
            title={lang === 'es' ? 'Acceso Clientes' : lang === 'it' ? 'Accesso Clienti' : 'Client Login'}
            sidebar={getSidebar("expertise", lang)}
        >
            <ClientLoginGate lang={lang}>
            {/* Inquiry form */}
            <div className="mt-12 pt-8 border-t border-opinno-border">
                <h2 className="text-2xl font-bold font-display mb-6">
                    {lang === 'es' ? 'Cuéntanos sobre tu proyecto' : lang === 'it' ? 'Parlaci del tuo progetto' : 'Tell us about your project'}
                </h2>
                <form className="space-y-4 max-w-lg">
                    <input type="text" placeholder={lang === 'es' ? 'Nombre *' : lang === 'it' ? 'Nome *' : 'Name *'} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
                    <input type="email" placeholder={lang === 'es' ? 'Correo electrónico *' : lang === 'it' ? 'Email *' : 'Email *'} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
                    <select className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body text-opinno-gray focus:outline-none focus:border-opinno-accent bg-white">
                        <option value="">{lang === 'es' ? 'Industria' : lang === 'it' ? 'Industria' : 'Industry'}</option>
                        <option>{lang === 'es' ? 'Tecnología' : lang === 'it' ? 'Tecnologia' : 'Technology'}</option>
                        <option>{lang === 'es' ? 'Salud' : lang === 'it' ? 'Assistenza sanitaria' : 'Healthcare'}</option>
                        <option>{lang === 'es' ? 'Servicios financieros' : lang === 'it' ? 'Servizi finanziari' : 'Financial Services'}</option>
                        <option>{lang === 'es' ? 'Energía' : lang === 'it' ? 'Energia' : 'Energy'}</option>
                        <option>{lang === 'es' ? 'Construcción e Infraestructura' : lang === 'it' ? 'Costruzione e Infrastrutture' : 'Construction and Infrastructure'}</option>
                        <option>{lang === 'es' ? 'Sector público' : lang === 'it' ? 'Settore pubblico' : 'Public Sector'}</option>
                        <option>{lang === 'es' ? 'Retail' : lang === 'it' ? 'Retail' : 'Retail'}</option>
                        <option>{lang === 'es' ? 'Otro' : lang === 'it' ? 'Altro' : 'Other'}</option>
                    </select>
                    <input type="text" placeholder={lang === 'es' ? 'Empresa *' : lang === 'it' ? 'Azienda *' : 'Company *'} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
                    <select className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body text-opinno-gray focus:outline-none focus:border-opinno-accent bg-white">
                        <option value="">{lang === 'es' ? 'Título / Rol' : lang === 'it' ? 'Titolo / Ruolo' : 'Title / Role'}</option>
                        <option>Executive</option>
                        <option>Director</option>
                        <option>Manager</option>
                        <option>Analyst</option>
                        <option>Other</option>
                    </select>
                    <textarea placeholder={lang === 'es' ? '¿Cómo podemos ayudarte? *' : lang === 'it' ? 'Come possiamo aiutarti? *' : 'How can we help you? *'} rows={4} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent resize-none" />
                    <div className="flex items-start gap-2">
                        <input type="checkbox" id="privacy-accept" className="mt-1 accent-opinno-accent" />
                        <label htmlFor="privacy-accept" className="text-sm text-opinno-gray font-body">
                            {lang === 'es' ? 'He leído y acepto la ' : lang === 'it' ? 'Ho letto e accetto la ' : 'I have read and accept Opinno\'s '}<a href="/privacy" className="text-opinno-accent hover:underline">{lang === 'es' ? 'Política de Privacidad' : lang === 'it' ? 'Informativa sulla privacy' : 'Privacy Policy'}</a>.
                        </label>
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.875rem' }}>{lang === 'es' ? 'ENVIAR' : lang === 'it' ? 'INVIA' : 'SUBMIT'}</button>
                </form>
            </div>
            </ClientLoginGate>
        </InteriorPageLayout>
    )
}
