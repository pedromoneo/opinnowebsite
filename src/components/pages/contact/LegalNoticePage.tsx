import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function LegalNoticePage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Contact'}
            title={lang === 'es' ? 'Aviso Legal' : lang === 'it' ? 'Avviso Legale' : 'Legal Notice'}
            sidebar={getSidebar("contact", lang)}
        >
            <div className="prose prose-sm max-w-none text-opinno-gray font-body leading-relaxed">
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4">
                    {lang === 'es' ? 'Aviso Legal' : lang === 'it' ? 'Avviso Legale' : 'Legal Notice'}
                </h2>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Información de la empresa' : lang === 'it' ? 'Informazioni sull\'azienda' : 'Company Information'}
                </h3>
                <p className="mb-4">
                    <strong>{lang === 'es' ? 'Nombre de la empresa:' : lang === 'it' ? 'Nome dell\'azienda:' : 'Company Name:'}</strong> Opinno S.L.<br />
                    <strong>{lang === 'es' ? 'Domicilio social:' : lang === 'it' ? 'Sede Legale:' : 'Registered Office:'}</strong> Madrid, Spain<br />
                    <strong>{lang === 'es' ? 'NIF/CIF:' : lang === 'it' ? 'P. IVA:' : 'Tax ID:'}</strong> B-85923741<br />
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Propiedad Intelectual' : lang === 'it' ? 'Proprietà Intellettuale' : 'Intellectual Property'}
                </h3>
                <p className="mb-4">
                    {lang === 'es' ? 'Todo el contenido de este sitio web, incluidos, entre otros, textos, gráficos, logotipos, imágenes, clips de audio, descargas digitales y software, es propiedad de Opinno S.L. o de sus proveedores de contenido y está protegido por las leyes internacionales de derechos de autor.' : lang === 'it' ? 'Tutto il contenuto di questo sito web, inclusi a titolo esemplificativo ma non esaustivo testi, grafica, loghi, immagini, clip audio, download digitali e software, è di proprietà di Opinno S.L. o dei suoi fornitori di contenuti ed è protetto dalle leggi internazionali sul copyright.' : 'All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Opinno S.L. or its content suppliers and is protected by international copyright laws.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Limitación de responsabilidad' : lang === 'it' ? 'Limitazione di responsabilità' : 'Limitation of Liability'}
                </h3>
                <p className="mb-4">
                    {lang === 'es' ? 'Opinno S.L. no será responsable de ningún daño que surja del uso o la incapacidad de usar la información o los materiales en este sitio web.' : lang === 'it' ? 'Opinno S.L. non sarà responsabile per eventuali danni derivanti dall\'uso o dall\'impossibilità di utilizzare le informazioni o i materiali su questo sito web.' : 'Opinno S.L. shall not be liable for any damages arising from the use or inability to use the information or materials on this website.'}
                </p>

                <p className="mt-8 text-xs text-gray-400">
                    {lang === 'es' ? 'Última actualización: Enero 2024' : lang === 'it' ? 'Ultimo aggiornamento: Gennaio 2024' : 'Last updated: January 2024'}
                </p>
            </div>
        </InteriorPageLayout>
    )
}
