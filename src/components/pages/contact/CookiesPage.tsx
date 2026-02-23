import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function CookiesPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Contact'}
            title={lang === 'es' ? 'Política de Cookies' : lang === 'it' ? 'Politica sui cookie' : 'Cookies Policy'}
            sidebar={getSidebar("contact", lang)}
        >
            <div className="prose prose-sm max-w-none text-opinno-gray font-body leading-relaxed">
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4">
                    {lang === 'es' ? 'Política de Cookies' : lang === 'it' ? 'Politica sui cookie' : 'Cookie Policy'}
                </h2>
                <p className="mb-4">
                    {lang === 'es' ? 'Este sitio web utiliza cookies para mejorar tu experiencia mientras navegas. Al continuar navegando, aceptas nuestro uso de cookies.' : lang === 'it' ? 'Questo sito web utilizza i cookie per migliorare la tua esperienza durante la navigazione nel sito. Proseguendo la navigazione acconsenti al nostro utilizzo dei cookie.' : 'This website uses cookies to improve your experience while navigating through the website. By continuing to browse, you agree to our use of cookies.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? '¿Qué son las cookies?' : lang === 'it' ? 'Cosa sono i cookie?' : 'What are cookies?'}
                </h3>
                <p className="mb-4">
                    {lang === 'es' ? 'Las cookies son pequeños archivos de texto que se almacenan en tu navegador o dispositivo por sitios web, aplicaciones, medios en línea y anuncios. Se usan ampliamente para que los sitios funcionen o lo hagan de manera más eficiente, así como para proporcionar información de informes.' : lang === 'it' ? 'I cookie sono piccoli file di testo che vengono memorizzati sul tuo browser o dispositivo da siti web, app, media online e pubblicità. Sono ampiamente utilizzati per far funzionare i siti o per farli funzionare in modo più efficiente, nonché per fornire informazioni di reportistica.' : 'Cookies are small text files that are stored on your browser or device by websites, apps, online media, and advertisements. They are widely used to make websites work or work more efficiently, as well as to provide reporting information.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Tipos de cookies que utilizamos' : lang === 'it' ? 'Tipi di cookie che utilizziamo' : 'Types of cookies we use'}
                </h3>
                <ul className="list-disc ml-6 space-y-2 mb-6">
                    <li><strong>{lang === 'es' ? 'Cookies esenciales:' : lang === 'it' ? 'Cookie essenziali:' : 'Essential cookies:'}</strong> {lang === 'es' ? 'Estas cookies son necesarias para que el sitio web funcione correctamente.' : lang === 'it' ? 'Questi cookie sono necessari per il corretto funzionamento del sito web.' : 'These cookies are necessary for the website to function properly.'}</li>
                    <li><strong>{lang === 'es' ? 'Cookies analíticas:' : lang === 'it' ? 'Cookie analitici:' : 'Analytics cookies:'}</strong> {lang === 'es' ? 'Estas cookies nos ayudan a entender cómo interactúan los visitantes con el sitio web.' : lang === 'it' ? 'Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito web.' : 'These cookies help us understand how visitors interact with the website.'}</li>
                    <li><strong>{lang === 'es' ? 'Cookies de marketing:' : lang === 'it' ? 'Cookie di marketing:' : 'Marketing cookies:'}</strong> {lang === 'es' ? 'Estas cookies se utilizan para rastrear a los visitantes en los sitios web con el fin de mostrar anuncios relevantes.' : lang === 'it' ? 'Questi cookie vengono utilizzati per tracciare i visitatori attraverso i siti web per mostrare annunci pubblicitari pertinenti.' : 'These cookies are used to track visitors across websites to display relevant advertisements.'}</li>
                </ul>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Gestión de cookies' : lang === 'it' ? 'Gestione dei cookie' : 'Managing cookies'}
                </h3>
                <p className="mb-4">
                    {lang === 'es' ? 'Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador. Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad de este sitio web.' : lang === 'it' ? 'Puoi gestire le tue preferenze sui cookie tramite le impostazioni del tuo browser. Tieni presente che la disabilitazione di determinati cookie potrebbe influire sulla funzionalità di questo sito web.' : 'You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of this website.'}
                </p>

                <p className="mt-8 text-xs text-gray-400">
                    {lang === 'es' ? 'Última actualización: Enero 2024' : lang === 'it' ? 'Ultimo aggiornamento: Gennaio 2024' : 'Last updated: January 2024'}
                </p>
            </div>
        </InteriorPageLayout>
    )
}
