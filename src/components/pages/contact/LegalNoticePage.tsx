import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function LegalNoticePage({ lang }: { lang: string }) {
    const breadcrumb = lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Contact'
    const title = lang === 'es' ? 'Aviso Legal' : lang === 'it' ? 'Note Legali' : 'Legal Notice'

    return (
        <InteriorPageLayout
            breadcrumb={breadcrumb}
            title={title}
            sidebar={getSidebar("contact", lang)}
        >
            <div className="prose prose-sm max-w-none text-opinno-gray font-body leading-relaxed">

                {/* 1. Identification */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4">
                    {lang === 'es' ? '1. Identificación del titular del sitio web' : lang === 'it' ? '1. Identificazione del titolare del sito web' : '1. Identification of the Website Owner'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'El presente Aviso Legal regula el uso del sitio web www.opinno.com, que Opinno® pone a disposición de los usuarios de Internet.'
                        : lang === 'it'
                            ? 'Il presente Avviso Legale regola l\'utilizzo del sito web www.opinno.com, che Opinno® mette a disposizione degli utenti di Internet.'
                            : 'This Legal Notice regulates the use of the website www.opinno.com, which Opinno® makes available to Internet users.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Opinno® es la marca propiedad de Entrepreneur Capital, S.L. Inscrita en el Registro Mercantil de Madrid, en el Tomo 24.103, Folio 44, Sección 8ª, Hoja número M-433093, Inscripción 1ª.'
                        : lang === 'it'
                            ? 'Opinno® è il marchio di proprietà di Entrepreneur Capital, S.L. Iscritta nel Registro Mercantile di Madrid, Tomo 24.103, Foglio 44, Sezione 8ª, Foglio numero M-433093, Iscrizione 1ª.'
                            : 'Opinno® is the brand owned by Entrepreneur Capital, S.L. Registered in the Mercantile Registry of Madrid, Volume 24.103, Folio 44, Section 8, Sheet number M-433093, Registration 1st.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Con domicilio social en la Travesía de Navaluenga 38, Majadahonda – Madrid.'
                        : lang === 'it'
                            ? 'Con sede legale in Travesía de Navaluenga 38, Majadahonda – Madrid.'
                            : 'With registered office at Travesía de Navaluenga 38, Majadahonda – Madrid.'}
                </p>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Para comunicación directa y efectiva con Opinno, la dirección de email es info@opinno.com.'
                        : lang === 'it'
                            ? 'Per comunicazione diretta ed efficace con Opinno, l\'indirizzo email è info@opinno.com.'
                            : 'For direct and effective communication with Opinno, the email address is info@opinno.com.'}
                </p>

                {/* 2. Access and General Conditions */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? '2. Acceso y condiciones generales de uso' : lang === 'it' ? '2. Accesso e condizioni generali d\'uso' : '2. Access and General Conditions of Use'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'El simple acceso, navegación y uso del sitio web de Opinno atribuye la condición de usuario del mismo e implica el conocimiento y la plena aceptación de cada una de las disposiciones incluidas en este Aviso Legal, publicadas en cualquier momento en el sitio web de Opinno. El usuario debe leer atentamente este Aviso Legal en cada una de las ocasiones en que se proponga utilizar el sitio web, ya que este y sus condiciones de uso pueden sufrir modificaciones durante su vigencia.'
                        : lang === 'it'
                            ? 'Il semplice accesso, navigazione e utilizzo del sito web di Opinno attribuisce la condizione di utente dello stesso e implica la conoscenza e la piena accettazione di ciascuna delle disposizioni incluse nel presente Avviso Legale, pubblicate in qualsiasi momento sul sito web di Opinno. L\'utente deve leggere attentamente il presente Avviso Legale ogni volta che intende utilizzare il sito web, poiché questo e le sue condizioni d\'uso possono subire modifiche durante la loro vigenza.'
                            : 'The simple access, navigation and use of the Opinno website attributes the user status and implies the knowledge and full acceptance of each and every one of the provisions included in this Legal Notice, published at any time on the Opinno website. The user should carefully read this Legal Notice on each occasion they intend to use the website, since these conditions may be modified during their validity.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Algunos servicios del sitio web de Opinno accesibles a usuarios de Internet o usuarios exclusivos pueden estar sujetos a condiciones particulares, regulaciones e instrucciones que, en su caso, sustituyen, complementan y/o modifican este Aviso Legal y que deben ser aceptadas por el usuario de forma activa e inequívoca.'
                        : lang === 'it'
                            ? 'Alcuni servizi del sito web di Opinno accessibili agli utenti di Internet o agli utenti esclusivi possono essere soggetti a condizioni particolari, regolamenti e istruzioni che, ove applicabile, sostituiscono, completano e/o modificano il presente Avviso Legale e che devono essere accettati dall\'utente in modo attivo e inequivocabile.'
                            : 'Some Opinno website services accessible to Internet users or exclusive users may be subject to particular conditions, regulations and instructions that, where appropriate, replace, complement and/or modify this Legal Notice and must be accepted by the user actively and unequivocally.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'El usuario se compromete a hacer un uso adecuado del sitio web de conformidad con las leyes y regulaciones vigentes, la buena fe, el orden público, los usos del tráfico y de acuerdo con el contenido de este Aviso Legal. El usuario responderá frente a Opinno o frente a terceros, de los daños que pudieran causarse como consecuencia del incumplimiento de esta obligación.'
                        : lang === 'it'
                            ? 'L\'utente si impegna a fare un uso adeguato del sito web in conformità con le leggi e i regolamenti vigenti, la buona fede, l\'ordine pubblico, gli usi del traffico e in accordo con il contenuto del presente Avviso Legale. L\'utente risponderà nei confronti di Opinno o di terzi dei danni che potrebbero essere causati a seguito dell\'inadempimento di tale obbligo.'
                            : 'The user undertakes to make adequate use of the website in accordance with current laws and regulations, good faith, public order, traffic uses and in accordance with the content of this Legal Notice. The user will be liable to Opinno or to third parties for any damages that may be caused as a result of non-compliance with this obligation.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'El acceso y uso del sitio web www.opinno.com y todos los subdominios y directorios incluidos en él están sujetos a los términos establecidos en este Aviso Legal. El acceso a este sitio web es gratuito, excepto en las áreas de acceso restringido, y su visualización y uso no requiere suscripción, registro o contratación previa.'
                        : lang === 'it'
                            ? 'L\'accesso e l\'utilizzo del sito web www.opinno.com e di tutti i sottodomini e le directory inclusi in esso sono soggetti ai termini stabiliti nel presente Avviso Legale. L\'accesso a questo sito web è gratuito, ad eccezione delle aree ad accesso limitato, e la sua visualizzazione e utilizzo non richiedono abbonamento, registrazione o contrattazione previa.'
                            : 'Access and use of the website www.opinno.com and all subdomains and directories included in it are subject to the terms established in this Legal Notice. Access to this website is free, except in restricted access areas, and its viewing and use does not require a subscription, registration or prior contracting.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Opinno se reserva el derecho de modificar, suspender, cancelar o restringir el contenido del portal, los enlaces o la información obtenida a través del mismo, sin previo aviso. Opinno puede modificar este sitio web y su contenido en cualquier momento sin previo aviso y los actualizará periódicamente.'
                        : lang === 'it'
                            ? 'Opinno si riserva il diritto di modificare, sospendere, annullare o limitare il contenuto del portale, i link o le informazioni ottenute attraverso di esso, senza preavviso. Opinno può modificare questo sito web e il suo contenuto in qualsiasi momento senza preavviso e li aggiornerà periodicamente.'
                            : 'Opinno reserves the right to modify, suspend, cancel or restrict the content of the portal, the links or the information obtained through it, without prior notice. Opinno may modify this website and its contents at any time without prior notice and will update them periodically.'}
                </p>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'El usuario se compromete a no utilizar el sitio web: (i) para llevar a cabo actividades contrarias a la ley, la moral, las buenas costumbres aceptadas o el orden público establecido y (ii) con fines ilícitos, prohibidos o lesivos de los derechos e intereses de terceros.'
                        : lang === 'it'
                            ? 'L\'utente si impegna a non utilizzare il sito web: (i) per svolgere attività contrarie alla legge, alla morale, ai buoni costumi accettati o all\'ordine pubblico stabilito e (ii) per scopi illeciti, vietati o lesivi dei diritti e degli interessi di terzi.'
                            : 'The user undertakes not to use the website: (i) to carry out activities contrary to law, morality, accepted good customs or established public order and (ii) for illicit, prohibited or harmful purposes regarding the rights and interests of third parties.'}
                </p>

                {/* 3. Links */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? '3. Enlaces' : lang === 'it' ? '3. Link' : '3. Links'}
                </h2>
                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3">
                    {lang === 'es' ? '3.1. Enlaces a contenido de terceros' : lang === 'it' ? '3.1. Link a contenuti di terze parti' : '3.1. Links to Third Party Content'}
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Este sitio web puede contener enlaces a otros portales o sitios web no gestionados por Opinno. Opinno declara que no ejerce ningún control sobre estos portales o sitios web, ni es responsable del contenido de los mismos. Los enlaces que este sitio web pudiera contener se ofrecerán únicamente como referencias informativas, cuyo propósito es facilitar el acceso a otros contenidos que se consideren de interés.'
                        : lang === 'it'
                            ? 'Questo sito web può contenere link ad altri portali o siti web non gestiti da Opinno. Opinno dichiara di non esercitare alcun controllo su tali portali o siti web, né è responsabile dei loro contenuti. I link che questo sito web potrebbe contenere saranno offerti esclusivamente come riferimenti informativi, il cui scopo è facilitare l\'accesso ad altri contenuti considerati di interesse.'
                            : 'This website may contain links to other portals or websites not managed by Opinno. Opinno states that it does not exercise any control over these portals or websites, nor is it responsible for their content. The links that this website may contain are offered solely as informational references, whose purpose is to facilitate access to other content considered of interest.'}
                </p>
                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-6">
                    {lang === 'es' ? '3.2. Enlaces desde sitios web de terceros' : lang === 'it' ? '3.2. Link da siti web di terze parti' : '3.2. Links from Third Party Websites'}
                </h3>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Está estrictamente prohibido establecer enlaces al portal desde páginas web que contengan materiales, información o contenido ilegal, degradante, obsceno y, en general, que contravengan la moral, el orden público o las normas sociales aceptadas. La reproducción en páginas de terceros del contenido del portal, su inclusión como parte de su sitio web o la creación de un navegador requerirá la autorización previa y expresa de Opinno.'
                        : lang === 'it'
                            ? 'È severamente vietato stabilire link al portale da pagine web che contengano materiali, informazioni o contenuti illegali, degradanti, osceni e, in generale, che contravvengano alla morale, all\'ordine pubblico o alle norme sociali accettate. La riproduzione su pagine di terzi del contenuto del portale, la sua inclusione come parte del proprio sito web o la creazione di un browser richiederà l\'autorizzazione preventiva ed espressa di Opinno.'
                            : 'It is strictly forbidden to establish links to the portal from web pages containing illegal, degrading, obscene materials, information or content and, in general, content that contravenes morality, public order or accepted social norms. Reproduction on third-party pages of the portal content, its inclusion as part of a website or the creation of a browser will require prior and express authorization from Opinno.'}
                </p>

                {/* 4. Intellectual and Industrial Property */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? '4. Propiedad intelectual e industrial' : lang === 'it' ? '4. Proprietà intellettuale e industriale' : '4. Intellectual and Industrial Property'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Opinno se reserva los derechos de propiedad intelectual de la web sobre los elementos que conforman la apariencia visual, imagen gráfica y otros estímulos sensoriales de las páginas web que la componen; la arquitectura de navegación; los códigos fuente; las fotografías, grabaciones, software, bases de datos, tecnología, know-how, marcas, signos distintivos y logotipos.'
                        : lang === 'it'
                            ? 'Opinno si riserva i diritti di proprietà intellettuale del sito web sugli elementi che compongono l\'aspetto visivo, l\'immagine grafica e altri stimoli sensoriali delle pagine web che lo compongono; l\'architettura di navigazione; i codici sorgente; le fotografie, registrazioni, software, database, tecnologia, know-how, marchi, segni distintivi e loghi.'
                            : 'Opinno reserves the intellectual property rights of the website on the elements that make up the visual appearance, graphic image and other sensory stimuli of the web pages; the navigation architecture; the source codes; photographs, recordings, software, databases, technology, know-how, trademarks, distinctive signs and logos.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Los contenidos propios y las obras reproducidas en este sitio web propiedad de Opinno están protegidos por la regulación de propiedad intelectual. Se prohíbe su reproducción total o parcial salvo en los casos y con los límites que expresamente se autoricen.'
                        : lang === 'it'
                            ? 'I contenuti propri e le opere riprodotte su questo sito web di proprietà di Opinno sono protetti dalla normativa sulla proprietà intellettuale. È vietata la loro riproduzione totale o parziale salvo nei casi e con i limiti espressamente autorizzati.'
                            : 'Content and works reproduced on this website owned by Opinno are protected by intellectual property regulations. Total or partial reproduction is prohibited except in the cases and within the limits expressly authorized.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Solo se autoriza el uso personal y no comercial del contenido con fines informativos. Los usuarios deben citar en todos los casos al autor y la fuente de los materiales utilizados, con mención expresa a la URL de este sitio web.'
                        : lang === 'it'
                            ? 'È autorizzato solo l\'uso personale e non commerciale del contenuto a fini informativi. Gli utenti devono citare in tutti i casi l\'autore e la fonte dei materiali utilizzati, con menzione espressa dell\'URL di questo sito web.'
                            : 'Only personal and non-commercial use of the content for informational purposes is authorized. Users must in all cases cite the author and the source of the materials used, with express mention of the URL of this website.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Opinno y el logotipo de Opinno son marcas de Entrepreneur Capital S.L., así como signos, signos distintivos o logotipos. El uso de estas marcas requiere la autorización expresa de Opinno. El uso no autorizado de estas marcas podría ser objeto de reclamación judicial o extrajudicial.'
                        : lang === 'it'
                            ? 'Opinno e il logo di Opinno sono marchi di Entrepreneur Capital S.L., così come segni, segni distintivi o loghi. L\'uso di questi marchi richiede l\'autorizzazione espressa di Opinno. L\'uso non autorizzato di questi marchi potrebbe essere oggetto di reclamo giudiziario o stragiudiziario.'
                            : 'Opinno and the Opinno logo are trademarks of Entrepreneur Capital S.L., as well as signs, distinctive signs or logos. The use of these trademarks requires express authorization from Opinno. Unauthorized use of these trademarks could be subject to judicial or extrajudicial claim.'}
                </p>

                {/* 5. Limitation of Liability */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? '5. Limitación de responsabilidad' : lang === 'it' ? '5. Limitazione di responsabilità' : '5. Limitation of Liability'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Opinno no asume ninguna responsabilidad derivada de la conexión o contenidos de los enlaces de terceros referidos en la Web. Tanto el acceso a este sitio web como el uso que pueda hacerse de la información contenida en el mismo es responsabilidad exclusiva de quien lo realiza.'
                        : lang === 'it'
                            ? 'Opinno non assume alcuna responsabilità derivante dalla connessione o dai contenuti dei link di terze parti presenti sul Web. Sia l\'accesso a questo sito web che l\'uso che può essere fatto delle informazioni ivi contenute è di esclusiva responsabilità di chi lo effettua.'
                            : 'Opinno does not assume any responsibility derived from the connection or contents of third-party links referred to on the Web. Both access to this website and the use that can be made of the information contained in it is the exclusive responsibility of the one who does it.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Opinno ha adoptado políticas razonables en relación con la seguridad del sitio web, aunque no asume ninguna responsabilidad por los posibles errores de seguridad que pudieran producirse, por los posibles daños que pudieran causarse al sistema informático del usuario (hardware y software), a los ficheros o documentos almacenados en el mismo, como consecuencia de la presencia de virus, un mal funcionamiento del navegador o el uso de versiones no actualizadas del mismo.'
                        : lang === 'it'
                            ? 'Opinno ha adottato politiche ragionevoli in materia di sicurezza del sito web, sebbene non assuma alcuna responsabilità per eventuali errori di sicurezza che possano verificarsi, per eventuali danni che possano essere causati al sistema informatico dell\'utente (hardware e software), ai file o ai documenti in esso memorizzati, a causa della presenza di virus, di un malfunzionamento del browser o dell\'uso di versioni non aggiornate dello stesso.'
                            : 'Opinno has adopted reasonable policies regarding website security, although it does not assume any responsibility for possible security errors that may occur, for possible damage that may be caused to the user\'s computer system (hardware and software), files or documents stored therein, as a result of the presence of viruses, a malfunction of the browser or the use of non-updated versions thereof.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Opinno no es responsable de los daños y/o pérdidas de cualquier naturaleza que el usuario o un tercero pudiera sufrir derivados de: (i) la falta de disponibilidad, mantenimiento o funcionamiento efectivo de la Web; (ii) la falta de utilidad, veracidad, adecuación o validez del sitio web para satisfacer las necesidades o expectativas del usuario; (iii) que un tercero, incumpliendo las medidas de seguridad establecidas, utilice la web para la remisión de virus o realice un tratamiento no autorizado de los datos almacenados.'
                        : lang === 'it'
                            ? 'Opinno non è responsabile per danni e/o perdite di qualsiasi natura che l\'utente o un terzo possano subire derivanti da: (i) la mancanza di disponibilità, manutenzione o funzionamento effettivo del Web; (ii) la mancanza di utilità, veridicità, adeguatezza o validità del sito web per soddisfare le esigenze o le aspettative dell\'utente; (iii) che un terzo, violando le misure di sicurezza stabilite, utilizzi il web per l\'invio di virus o effettui un trattamento non autorizzato dei dati memorizzati.'
                            : 'Opinno is not responsible for damages and/or losses of any nature that the user or a third party may suffer derived from: (i) the lack of availability, maintenance or effective operation of the Web; (ii) the lack of usefulness, veracity, adequacy or validity of the website to meet the needs or expectations of the user; (iii) a third party, breaking established security measures, using the web for virus transmission or performing unauthorized treatment of stored data.'}
                </p>

                {/* 6. Cookies Policy */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? '6. Política de cookies' : lang === 'it' ? '6. Politica sui cookie' : '6. Cookies Policy'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Las cookies, dependiendo de quién las sirva, pueden dividirse entre cookies propias, servidas por esta página, y cookies de terceros, servidas por otros sitios web o servicios.'
                        : lang === 'it'
                            ? 'I cookie, a seconda di chi li serve, possono essere suddivisi tra cookie propri, serviti da questa pagina, e cookie di terze parti, serviti da altri siti web o servizi.'
                            : 'Cookies, depending on who serves them, can be divided between own cookies, served by this page, and third-party cookies, served by other websites or services.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Para más información sobre nuestra política de cookies, consulte nuestra página dedicada a Cookies.'
                        : lang === 'it'
                            ? 'Per ulteriori informazioni sulla nostra politica sui cookie, consultare la nostra pagina dedicata ai Cookie.'
                            : 'For more information about our cookies policy, please refer to our dedicated Cookies page.'}
                </p>

                {/* 7. Anti-Spam Policy */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? '7. Política antispam' : lang === 'it' ? '7. Politica anti-spam' : '7. Anti-Spam Policy'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Las personas que reciban cualquiera de las comunicaciones electrónicas, información, boletines o publicidad de Opinno las reciben por las siguientes razones: por registro desde esta página, a través de registro online desde las páginas de los colaboradores, por solicitud de información sobre nuestros productos y servicios, por haber proporcionado su información a cualquiera de nuestros empleados o colaboradores, o por registro offline al rellenar formularios.'
                        : lang === 'it'
                            ? 'Le persone che ricevono qualsiasi comunicazione elettronica, informazione, bollettino o pubblicità da Opinno li ricevono per le seguenti ragioni: per registrazione da questa pagina, tramite registrazione online dalle pagine dei collaboratori, per richiesta di informazioni sui nostri prodotti e servizi, per aver fornito le proprie informazioni a uno dei nostri dipendenti o collaboratori, o per registrazione offline compilando moduli.'
                            : 'People who receive any electronic communications, information, bulletins or advertising from Opinno receive them for the following reasons: by registration from this page, through online registration from collaborators\' pages, by request for information about our products and services, by having provided their information to any of our employees or collaborators, or by offline registration filling out forms.'}
                </p>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Si no desea recibir nuestras comunicaciones y evitar que alguien le registre contra su voluntad, envíenos un email a lopd@opinno.com indicando en el asunto: "Baja lista" y le incluiremos en la "Lista de no contacto".'
                        : lang === 'it'
                            ? 'Se non desidera ricevere le nostre comunicazioni e impedire che qualcuno la registri contro la sua volontà, ci invii un\'email a lopd@opinno.com indicando nell\'oggetto: "Cancellazione lista" e la includeremo nella "Lista di non contatto".'
                            : 'If you do not wish to receive our communications and prevent someone from registering you against your will, send us an email at lopd@opinno.com indicating in the subject: "Unsubscribe" and we will include you in the "No contact list".'}
                </p>

                {/* 8. Irregularity Report */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? '8. Reporte de irregularidades' : lang === 'it' ? '8. Segnalazione di irregolarità' : '8. Irregularity Report'}
                </h2>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Para reportar irregularidades en el cumplimiento de este aviso legal o cualquier otra regulación aplicable, se dispone de la siguiente dirección de correo electrónico: info@opinno.com.'
                        : lang === 'it'
                            ? 'Per segnalare irregolarità nel rispetto del presente avviso legale o di qualsiasi altra normativa applicabile, è disponibile il seguente indirizzo email: info@opinno.com.'
                            : 'To report irregularities in compliance with this legal notice or any other applicable regulations, the following email address is available: info@opinno.com.'}
                </p>

                {/* 9. Applicable Law and Jurisdiction */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? '9. Regulación y resolución de conflictos' : lang === 'it' ? '9. Regolamento e risoluzione delle controversie' : '9. Regulation and Conflict Resolution'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Estas condiciones de uso del sitio web se rigen en todos y cada uno de sus extremos por la legislación española. El idioma de redacción e interpretación de este aviso legal es el español.'
                        : lang === 'it'
                            ? 'Le presenti condizioni d\'uso del sito web sono disciplinate in ogni loro aspetto dalla legislazione spagnola. La lingua di redazione e interpretazione del presente avviso legale è lo spagnolo.'
                            : 'These conditions of use of the website are governed in each and every one of their terms by Spanish law. The drafting language and interpretation of this legal notice is Spanish.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Siempre que el usuario no sea un consumidor o usuario, y no exista necesidad en contrario, las partes acuerdan someterse a los juzgados y tribunales de Madrid, por ser este el lugar de celebración del contrato, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.'
                        : lang === 'it'
                            ? 'A condizione che l\'utente non sia un consumatore o utente, e non vi sia necessità contraria, le parti convengono di sottoporsi ai tribunali di Madrid, essendo questo il luogo di celebrazione del contratto, con rinuncia espressa a qualsiasi altro foro che possa loro competere.'
                            : 'Whenever the user is not a consumer, and there is no need to the contrary, the parties agree to submit to the courts of Madrid, as this is the place of celebration of the contract, with express waiver of any other jurisdiction that may correspond.'}
                </p>
            </div>
        </InteriorPageLayout>
    )
}
