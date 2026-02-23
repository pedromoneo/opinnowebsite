import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function PrivacyPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Contact'}
            title={lang === 'es' ? 'Política de Privacidad' : lang === 'it' ? 'Informativa sulla privacy' : 'Privacy Policy'}
            sidebar={getSidebar("contact", lang)}
        >
            <div className="prose prose-sm max-w-none text-opinno-gray font-body leading-relaxed">
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4">
                    {lang === 'es' ? 'Política de Privacidad' : lang === 'it' ? 'Informativa sulla privacy' : 'Privacy Policy'}
                </h2>
                <p className="mb-4">
                    {lang === 'es' ? 'Opinno se compromete a proteger tu privacidad y tus datos personales de acuerdo con la normativa de protección de datos aplicable, incluido el Reglamento General de Protección de Datos (RGPD).' : lang === 'it' ? 'Opinno si impegna a proteggere la tua privacy e i tuoi dati personali in conformità con le normative applicabili sulla protezione dei dati, incluso il Regolamento Generale sulla Protezione dei Dati (GDPR).' : 'Opinno is committed to protecting your privacy and personal data in accordance with applicable data protection regulations, including the General Data Protection Regulation (GDPR).'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Responsable del tratamiento' : lang === 'it' ? 'Titolare del trattamento dei dati' : 'Data Controller'}
                </h3>
                <p className="mb-4">
                    {lang === 'es' ? 'Opinno S.L. es el responsable del tratamiento de sus datos personales.' : lang === 'it' ? 'Opinno S.L. è il titolare del trattamento responsabile del trattamento dei tuoi dati personali.' : 'Opinno S.L. is the data controller responsible for processing your personal data.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Datos que recopilamos' : lang === 'it' ? 'Dati che raccogliamo' : 'Data We Collect'}
                </h3>
                <ul className="list-disc ml-6 space-y-2 mb-6">
                    <li><strong>{lang === 'es' ? 'Información de contacto:' : lang === 'it' ? 'Informazioni di contatto:' : 'Contact information:'}</strong> {lang === 'es' ? 'Nombre, dirección de correo electrónico, número de teléfono, nombre de la empresa.' : lang === 'it' ? 'Nome, indirizzo email, numero di telefono, nome dell\'azienda.' : 'Name, email address, phone number, company name.'}</li>
                    <li><strong>{lang === 'es' ? 'Datos de uso:' : lang === 'it' ? 'Dati di utilizzo:' : 'Usage data:'}</strong> {lang === 'es' ? 'Información sobre cómo usas nuestro sitio web y servicios.' : lang === 'it' ? 'Informazioni su come utilizzi il nostro sito web e i nostri servizi.' : 'Information about how you use our website and services.'}</li>
                    <li><strong>{lang === 'es' ? 'Datos técnicos:' : lang === 'it' ? 'Dati tecnici:' : 'Technical data:'}</strong> {lang === 'es' ? 'Dirección IP, tipo de navegador, información del dispositivo.' : lang === 'it' ? 'Indirizzo IP, tipo di browser, informazioni sul dispositivo.' : 'IP address, browser type, device information.'}</li>
                </ul>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Cómo usamos tus datos' : lang === 'it' ? 'Come utilizziamo i tuoi dati' : 'How We Use Your Data'}
                </h3>
                <p className="mb-4">
                    {lang === 'es' ? 'Usamos tus datos para proporcionar nuestros servicios, comunicarnos contigo y mejorar nuestras ofertas. No vendemos tus datos personales a terceros.' : lang === 'it' ? 'Utilizziamo i tuoi dati per fornire i nostri servizi, comunicare con te e migliorare le nostre offerte. Non vendiamo i tuoi dati personali a terzi.' : 'We use your data to provide our services, communicate with you, and improve our offerings. We do not sell your personal data to third parties.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Tus derechos' : lang === 'it' ? 'I tuoi diritti' : 'Your Rights'}
                </h3>
                <p className="mb-4">
                    {lang === 'es' ? 'Según el RGPD, tienes derecho a acceder, rectificar, borrar, restringir el procesamiento y transferir tus datos personales. También tienes derecho a oponerte al procesamiento y a retirar el consentimiento en cualquier momento.' : lang === 'it' ? 'Ai sensi del GDPR, hai il diritto di accedere, rettificare, cancellare, limitare il trattamento e richiedere la portabilità dei tuoi dati personali. Hai anche il diritto di opporti al trattamento e di ritirare il consenso in qualsiasi momento.' : 'Under the GDPR, you have the right to access, rectify, erase, restrict processing, and port your personal data. You also have the right to object to processing and to withdraw consent at any time.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Contact'}
                </h3>
                <p className="mb-4">
                    {lang === 'es' ? 'Para cualquier pregunta relacionada con esta política de privacidad, contáctanos en ' : lang === 'it' ? 'Per qualsiasi domanda riguardante questa informativa sulla privacy, contattaci all\'indirizzo ' : 'For any questions regarding this privacy policy, please contact us at '}<a href="mailto:privacy@opinno.com" className="text-opinno-accent hover:underline">privacy@opinno.com</a>.
                </p>

                <p className="mt-8 text-xs text-gray-400">
                    {lang === 'es' ? 'Última actualización: Enero 2024' : lang === 'it' ? 'Ultimo aggiornamento: Gennaio 2024' : 'Last updated: January 2024'}
                </p>
            </div>
        </InteriorPageLayout>
    )
}
