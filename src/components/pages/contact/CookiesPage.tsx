import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function CookiesPage({ lang }: { lang: string }) {
    const breadcrumb = lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Contact'
    const title = lang === 'es' ? 'Política de Cookies' : lang === 'it' ? 'Politica sui Cookie' : 'Cookies Policy'

    return (
        <InteriorPageLayout
            breadcrumb={breadcrumb}
            title={title}
            sidebar={getSidebar("contact", lang)}
        >
            <div className="prose prose-sm max-w-none text-opinno-gray font-body leading-relaxed">

                {/* What are cookies */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4">
                    {lang === 'es' ? '¿Qué son las cookies?' : lang === 'it' ? 'Cosa sono i cookie?' : 'What Are Cookies'}
                </h2>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Como es práctica habitual en casi todos los sitios web profesionales, este sitio utiliza cookies, que son pequeños archivos que se descargan en su ordenador, para mejorar su experiencia. Esta página describe la información que recogen, cómo la usamos y por qué a veces necesitamos almacenar estas cookies. También explicaremos cómo puede evitar que estas cookies se almacenen, aunque esto puede reducir o "romper" ciertos elementos de la funcionalidad del sitio.'
                        : lang === 'it'
                            ? 'Come è pratica comune in quasi tutti i siti web professionali, questo sito utilizza i cookie, piccoli file che vengono scaricati sul computer, per migliorare la vostra esperienza. Questa pagina descrive le informazioni che raccolgono, come le utilizziamo e perché a volte abbiamo bisogno di memorizzare questi cookie. Spiegheremo anche come potete impedire la memorizzazione di questi cookie, anche se ciò può ridurre o "interrompere" alcuni elementi della funzionalità del sito.'
                            : 'As is common practice with almost all professional websites, this site uses cookies, which are small files that are downloaded to your computer, to improve your experience. This page describes what information they collect, how we use it and why we sometimes need to store these cookies. We will also explain how you can prevent these cookies from being stored, although this may reduce or "break" certain elements of the site\'s functionality.'}
                </p>

                {/* How we use cookies */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? 'Cómo usamos las cookies' : lang === 'it' ? 'Come utilizziamo i cookie' : 'How We Use Cookies'}
                </h2>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Utilizamos cookies por una serie de razones que se detallan a continuación. Desafortunadamente, en la mayoría de los casos no existen opciones estándar para desactivar las cookies sin deshabilitar completamente la funcionalidad y las características que añaden a este sitio. Se recomienda dejar todas las cookies activadas si no está seguro de si las necesita o no, en caso de que se utilicen para proporcionar un servicio que usted usa.'
                        : lang === 'it'
                            ? 'Utilizziamo i cookie per una serie di motivi dettagliati di seguito. Purtroppo, nella maggior parte dei casi non esistono opzioni standard per disabilitare i cookie senza disabilitare completamente le funzionalità e le caratteristiche che aggiungono a questo sito. Si consiglia di lasciare attivi tutti i cookie se non si è sicuri di averne bisogno o meno, nel caso in cui vengano utilizzati per fornire un servizio che si utilizza.'
                            : 'We use cookies for a number of reasons detailed below. Unfortunately, in most cases there are no standard options to disable cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave all cookies enabled if you are not sure whether you need them or not, in case they are used to provide a service you use.'}
                </p>

                {/* Disabling cookies */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? 'Desactivación de cookies' : lang === 'it' ? 'Disattivazione dei cookie' : 'Disabling Cookies'}
                </h2>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Puede evitar la instalación de cookies ajustando la configuración de su navegador (consulte la ayuda de su navegador para saber cómo hacerlo). Tenga en cuenta que la desactivación de cookies afectará a la funcionalidad de este y muchos otros sitios web que visite. La desactivación de cookies generalmente implica también la desactivación de ciertas funciones y características de este sitio. Por lo tanto, se recomienda que no desactive las cookies.'
                        : lang === 'it'
                            ? 'Potete impedire l\'installazione dei cookie regolando le impostazioni del vostro browser (consultate la guida del browser per sapere come fare). Tenete presente che la disattivazione dei cookie influirà sulla funzionalità di questo e di molti altri siti web che visitate. La disattivazione dei cookie comporta generalmente anche la disattivazione di alcune funzionalità e caratteristiche di questo sito. Pertanto, si consiglia di non disattivare i cookie.'
                            : 'You can prevent the installation of cookies by adjusting your browser settings (see your browser help to learn how to do this). Please note that disabling cookies will affect the functionality of this and many other websites you visit. Disabling cookies usually also involves disabling certain features and functionality of this site. Therefore, it is recommended that you do not disable cookies.'}
                </p>

                {/* Cookies we set */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? 'Las cookies que establecemos' : lang === 'it' ? 'I cookie che impostiamo' : 'The Cookies We Set'}
                </h2>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3">
                    {lang === 'es' ? 'Cookies de sesión' : lang === 'it' ? 'Cookie di sessione' : 'Session Cookies'}
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Las cookies de sesión permiten conocer la experiencia de navegación y expiran cuando el usuario cierra el navegador. No se almacenan datos personales.'
                        : lang === 'it'
                            ? 'I cookie di sessione consentono di conoscere l\'esperienza di navigazione e scadono quando l\'utente chiude il browser. Non vengono memorizzati dati personali.'
                            : 'Session cookies allow us to understand the browsing experience and expire when the user closes the browser. No personal data is stored.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-6">
                    {lang === 'es' ? 'Cookies de registro' : lang === 'it' ? 'Cookie di registrazione' : 'Registration Cookies'}
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Las cookies de registro se generan una vez que el usuario se ha registrado o ha abierto su sesión, y se utilizan para identificarle con los servicios con los siguientes objetivos:'
                        : lang === 'it'
                            ? 'I cookie di registrazione vengono generati una volta che l\'utente si è registrato o ha effettuato l\'accesso, e vengono utilizzati per identificarlo con i servizi con i seguenti obiettivi:'
                            : 'Registration cookies are generated once the user has registered or logged in, and are used to identify them with the services with the following objectives:'}
                </p>
                <ul className="list-disc ml-6 space-y-2 mb-6">
                    <li>{lang === 'es' ? 'Mantener al usuario identificado' : lang === 'it' ? 'Mantenere l\'utente identificato' : 'Keep the user identified'}</li>
                    <li>{lang === 'es' ? 'Comprobar si el usuario está autorizado para acceder a ciertos servicios' : lang === 'it' ? 'Verificare se l\'utente è autorizzato ad accedere a determinati servizi' : 'Check if the user is authorized to access certain services'}</li>
                </ul>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-6">
                    {lang === 'es' ? 'Cookies de preferencias' : lang === 'it' ? 'Cookie di preferenze' : 'Preference Cookies'}
                </h3>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Para proporcionarle una gran experiencia en este sitio, ofrecemos la funcionalidad de establecer sus preferencias para el funcionamiento de este sitio cuando lo utiliza. Para recordar sus preferencias necesitamos establecer cookies de modo que esta información pueda ser llamada cada vez que interactúe con una página que sea afectada por sus preferencias.'
                        : lang === 'it'
                            ? 'Per offrirvi una grande esperienza su questo sito, forniamo la funzionalità di impostare le vostre preferenze per il funzionamento di questo sito quando lo utilizzate. Per ricordare le vostre preferenze abbiamo bisogno di impostare dei cookie in modo che queste informazioni possano essere richiamate ogni volta che interagite con una pagina influenzata dalle vostre preferenze.'
                            : 'In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site operates when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page that is affected by your preferences.'}
                </p>

                {/* Third party cookies */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? 'Cookies de terceros' : lang === 'it' ? 'Cookie di terze parti' : 'Third Party Cookies'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'En algunos casos especiales también utilizamos cookies proporcionadas por terceros de confianza. La siguiente sección detalla qué cookies de terceros puede encontrar a través de este sitio.'
                        : lang === 'it'
                            ? 'In alcuni casi speciali utilizziamo anche cookie forniti da terze parti fidate. La sezione seguente descrive in dettaglio quali cookie di terze parti potete trovare attraverso questo sito.'
                            : 'In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you may encounter through this site.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-6">
                    Google Analytics
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Este sitio utiliza Google Analytics, una de las soluciones analíticas más extendidas y fiables de la web, para ayudarnos a entender cómo utiliza el sitio y cómo podemos mejorar su experiencia. Estas cookies pueden rastrear cosas como el tiempo que pasa en el sitio y las páginas que visita para que podamos seguir produciendo contenido atractivo.'
                        : lang === 'it'
                            ? 'Questo sito utilizza Google Analytics, una delle soluzioni analitiche più diffuse e affidabili del web, per aiutarci a capire come utilizzate il sito e come possiamo migliorare la vostra esperienza. Questi cookie possono tracciare cose come il tempo trascorso sul sito e le pagine visitate in modo che possiamo continuare a produrre contenuti attraenti.'
                            : 'This site uses Google Analytics, which is one of the most widespread and trusted analytics solutions on the web, to help us understand how you use the site and ways we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Para más información sobre las cookies de Google Analytics, consulte la página oficial de Google Analytics.'
                        : lang === 'it'
                            ? 'Per ulteriori informazioni sui cookie di Google Analytics, consultare la pagina ufficiale di Google Analytics.'
                            : 'For more information on Google Analytics cookies, see the official Google Analytics page.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-6">
                    Google Maps
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Este sitio web utiliza Google Maps para ver ubicaciones geográficas (nuestras oficinas). Su uso implica la remisión de cookies gestionadas íntegramente por Google.'
                        : lang === 'it'
                            ? 'Questo sito web utilizza Google Maps per visualizzare le posizioni geografiche (i nostri uffici). Il suo utilizzo comporta l\'invio di cookie gestiti interamente da Google.'
                            : 'This website uses Google Maps to view geographic locations (our offices). Its use involves the transmission of cookies managed entirely by Google.'}
                </p>

                {/* How to disable cookies */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? 'Cómo desactivar las cookies' : lang === 'it' ? 'Come disattivare i cookie' : 'How to Disable Cookies'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Normalmente es posible dejar de aceptar las cookies del navegador, o dejar de aceptar las cookies de un servicio en particular. Todos los navegadores modernos permiten cambiar la configuración de cookies. Estas configuraciones se encuentran normalmente en el menú "Opciones" o "Preferencias" de su navegador.'
                        : lang === 'it'
                            ? 'Normalmente è possibile smettere di accettare i cookie del browser o smettere di accettare i cookie di un particolare servizio. Tutti i browser moderni consentono di modificare le impostazioni dei cookie. Queste impostazioni si trovano solitamente nel menu "Opzioni" o "Preferenze" del browser.'
                            : 'Normally it is possible to stop accepting browser cookies, or to stop accepting cookies from a specific service. All modern browsers allow you to change the cookie settings. These settings are usually found in the "Options" or "Preferences" menu of your browser.'}
                </p>
                <ul className="list-disc ml-6 space-y-2 mb-6">
                    <li><strong>Internet Explorer:</strong> {lang === 'es' ? 'Herramientas → Opciones de Internet → Privacidad → Configuración' : lang === 'it' ? 'Strumenti → Opzioni Internet → Privacy → Impostazioni' : 'Tools → Internet Options → Privacy → Settings'}</li>
                    <li><strong>Firefox:</strong> {lang === 'es' ? 'Herramientas → Opciones → Privacidad → Historial → Configuración personalizada' : lang === 'it' ? 'Strumenti → Opzioni → Privacy → Cronologia → Impostazioni personalizzate' : 'Tools → Options → Privacy → History → Custom settings'}</li>
                    <li><strong>Chrome:</strong> {lang === 'es' ? 'Configuración → Mostrar opciones avanzadas → Privacidad → Configuración de contenido' : lang === 'it' ? 'Impostazioni → Mostra impostazioni avanzate → Privacy → Impostazioni contenuti' : 'Settings → Show advanced options → Privacy → Content settings'}</li>
                    <li><strong>Safari:</strong> {lang === 'es' ? 'Preferencias → Seguridad' : lang === 'it' ? 'Preferenze → Sicurezza' : 'Preferences → Security'}</li>
                </ul>
            </div>
        </InteriorPageLayout>
    )
}
