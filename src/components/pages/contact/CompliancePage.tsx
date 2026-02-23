import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function CompliancePage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Contact'}
            title={lang === 'es' ? 'Cumplimiento Normativo' : lang === 'it' ? 'Compliance' : 'Compliance'}
            sidebar={getSidebar("contact", lang)}
        >
            <div className="prose prose-sm max-w-none text-opinno-gray font-body leading-relaxed">
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4">
                    {lang === 'es' ? 'Cumplimiento Normativo' : lang === 'it' ? 'Compliance' : 'Compliance'}
                </h2>
                <p className="mb-4">
                    {lang === 'es' ? 'En Opinno, nos comprometemos a llevar a cabo nuestro negocio con los más altos estándares de ética e integridad. Nuestro programa de cumplimiento garantiza que todos los empleados, socios e interesados cumplan con las leyes, regulaciones y políticas internas aplicables.' : lang === 'it' ? 'In Opinno, ci impegniamo a condurre la nostra attività con i più alti standard di etica e integrità. Il nostro programma di compliance garantisce che tutti i dipendenti, i partner e le parti interessate rispettino le leggi, le normative e le politiche interne applicabili.' : 'At Opinno, we are committed to conducting our business with the highest standards of ethics and integrity. Our compliance program ensures that all employees, partners, and stakeholders adhere to applicable laws, regulations, and internal policies.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Código Ético' : lang === 'it' ? 'Codice Etico' : 'Code of Ethics'}
                </h3>
                <p className="mb-4">
                    {lang === 'es' ? 'Nuestro Código Ético proporciona el marco para la conducta ética y la toma de decisiones en todas nuestras operaciones en todo el mundo.' : lang === 'it' ? 'Il nostro Codice Etico fornisce il quadro per la condotta etica e il processo decisionale in tutte le nostre operazioni nel mondo.' : 'Our Code of Ethics provides the framework for ethical conduct and decision-making across all our operations around the world.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Anticorrupción' : lang === 'it' ? 'Anticorruzione' : 'Anti-corruption'}
                </h3>
                <p className="mb-4">
                    {lang === 'es' ? 'Tenemos tolerancia cero frente a la corrupción en cualquier forma. Nuestras políticas y programas de capacitación anticorrupción garantizan el cumplimiento con las leyes contra el soborno y la corrupción.' : lang === 'it' ? 'Abbiamo tolleranza zero per la corruzione in qualsiasi forma. Le nostre politiche anticorruzione e i programmi di formazione garantiscono la conformità alle leggi anti-corruzione.' : 'We have zero tolerance for corruption in any form. Our anti-corruption policies and training programs ensure compliance with anti-bribery and anti-corruption laws.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Canal de Denuncias' : lang === 'it' ? 'Canale di Segnalazione' : 'Whistleblower Channel'}
                </h3>
                <p className="mb-4">
                    {lang === 'es' ? 'Mantenemos un canal de denuncias confidencial para informar cualquier sospecha de violación de nuestras políticas de cumplimiento. Las denuncias se pueden hacer de forma anónima y se manejan con la máxima confidencialidad.' : lang === 'it' ? 'Manteniamo un canale di segnalazione confidenziale per segnalare eventuali sospette violazioni delle nostre politiche di compliance. Le segnalazioni possono essere fatte in forma anonima e sono gestite con la massima riservatezza.' : 'We maintain a confidential whistleblower channel for reporting any suspected violations of our compliance policies. Reports can be made anonymously and are handled with the utmost confidentiality.'}
                </p>

                <p className="mt-8 text-xs text-gray-400">
                    {lang === 'es' ? 'Última actualización: Enero 2024' : lang === 'it' ? 'Ultimo aggiornamento: Gennaio 2024' : 'Last updated: January 2024'}
                </p>
            </div>
        </InteriorPageLayout>
    )
}
