import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function PrivacyPage({ lang }: { lang: string }) {
    const breadcrumb = lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Contact'
    const title = lang === 'es' ? 'Política de Privacidad' : lang === 'it' ? 'Informativa sulla Privacy' : 'Privacy Policy'

    return (
        <InteriorPageLayout
            breadcrumb={breadcrumb}
            title={title}
            sidebar={getSidebar("contact", lang)}
        >
            <div className="prose prose-sm max-w-none text-opinno-gray font-body leading-relaxed">

                {/* Data Controller */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4">
                    {lang === 'es' ? 'Política de Protección de Datos Personales' : lang === 'it' ? 'Politica di Protezione dei Dati Personali' : 'Personal Data Protection Policy'}
                </h2>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3">
                    {lang === 'es' ? 'Responsable del tratamiento' : lang === 'it' ? 'Titolare del trattamento' : 'Data Controller'}
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Los datos personales vinculados a este sitio web respetan los requisitos de la legislación vigente en materia de protección de datos personales. Por lo tanto, nuestra Política de Privacidad cumple con el Reglamento 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD) y demás normativa aplicable.'
                        : lang === 'it'
                            ? 'I dati personali legati a questo sito web rispettano i requisiti della legislazione vigente in materia di protezione dei dati personali. Pertanto, la nostra Politica sulla Privacy è conforme al Regolamento 2016/679 del Parlamento Europeo e del Consiglio del 27 aprile 2016 (GDPR) e ad altre normative applicabili.'
                            : 'Personal data linked to this website respects the requirements of current legislation on personal data protection. Therefore, our Privacy Policy complies with Regulation 2016/679 of the European Parliament and of the Council of April 27, 2016 (GDPR) and other applicable regulations.'}
                </p>
                <p className="mb-6">
                    <strong>{lang === 'es' ? 'Datos de contacto del responsable:' : lang === 'it' ? 'Dati di contatto del titolare:' : 'Data controller contact details:'}</strong><br />
                    Entrepreneur Capital, S.L. (B85053353)<br />
                    Travesía de Navaluenga 38, Majadahonda – Madrid<br />
                    {lang === 'es' ? 'Teléfono' : lang === 'it' ? 'Telefono' : 'Telephone'}: (+34) 91 1 284 864<br />
                    Email: <a href="mailto:info@opinno.com" className="text-opinno-accent hover:underline">info@opinno.com</a>
                </p>

                {/* Data Protection Rights */}
                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Derechos de protección de datos' : lang === 'it' ? 'Diritti di protezione dei dati' : 'Data Protection Rights'}
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'El usuario tiene derecho a obtener confirmación de si Opinno trata los datos personales que le conciernen, así como acceso a sus datos personales, solicitar la rectificación de los datos inexactos o, en su caso, solicitar su supresión cuando, entre otras razones, los datos ya no sean necesarios para los fines para los que fueron recogidos.'
                        : lang === 'it'
                            ? 'L\'utente ha il diritto di ottenere conferma se Opinno tratta i dati personali che lo riguardano, nonché l\'accesso ai propri dati personali, richiedere la rettifica dei dati inesatti o, se del caso, richiederne la cancellazione quando, tra le altre ragioni, i dati non sono più necessari per le finalità per cui sono stati raccolti.'
                            : 'The user has the right to obtain confirmation of whether Opinno processes personal data concerning them, as well as access to their personal data, request the rectification of inaccurate data or, where appropriate, request their deletion when, among other reasons, the data is no longer necessary for the purposes for which it was collected.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'Cómo ejercer los derechos' : lang === 'it' ? 'Come esercitare i diritti' : 'How to Exercise Rights'}
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'El Usuario podrá plantear las cuestiones que considere oportunas en relación con esta política, así como ejercer sus derechos en los términos legalmente previstos, mediante comunicación por correo electrónico a info@opinno.com, incluyendo en ambos casos fotocopia de su DNI u otro documento de identificación similar.'
                        : lang === 'it'
                            ? 'L\'Utente potrà sollevare le questioni che ritenga opportune in relazione a questa politica, nonché esercitare i propri diritti nei termini legalmente previsti, mediante comunicazione via email a info@opinno.com, includendo in entrambi i casi fotocopia del proprio documento d\'identità o altro documento di identificazione simile.'
                            : 'The User may raise the questions they deem appropriate in relation to this policy, as well as exercise their rights in the legally foreseen terms, by sending a communication by email to info@opinno.com, including in both cases a photocopy of their ID or other similar identification document.'}
                </p>
                <ul className="list-disc ml-6 space-y-2 mb-6">
                    <li><strong>{lang === 'es' ? 'Derecho de acceso' : lang === 'it' ? 'Diritto di accesso' : 'Right of access'}:</strong> {lang === 'es' ? 'a los datos personales' : lang === 'it' ? 'ai dati personali' : 'to personal data'}</li>
                    <li><strong>{lang === 'es' ? 'Derecho de rectificación' : lang === 'it' ? 'Diritto di rettifica' : 'Right of rectification'}:</strong> {lang === 'es' ? 'si son incorrectos, o supresión' : lang === 'it' ? 'se non corretti, o cancellazione' : 'if they are incorrect, or deletion'}</li>
                    <li><strong>{lang === 'es' ? 'Derecho de oposición' : lang === 'it' ? 'Diritto di opposizione' : 'Right to object'}:</strong> {lang === 'es' ? 'Opinno dejará de tratar los datos salvo por razones legítimas o en los casos previstos por la ley' : lang === 'it' ? 'Opinno cesserà di trattare i dati salvo per motivi legittimi o nei casi previsti dalla legge' : 'Opinno will stop processing the data except for legitimate reasons or in the cases provided by law'}</li>
                    <li><strong>{lang === 'es' ? 'Derecho a la portabilidad' : lang === 'it' ? 'Diritto alla portabilità' : 'Right to data portability'}:</strong> {lang === 'es' ? 'si desea que sus datos sean tratados por terceros, Opinno facilitará la portabilidad' : lang === 'it' ? 'se desidera che i propri dati vengano trattati da terzi, Opinno faciliterà la portabilità' : 'if you want your data to be processed by third parties, Opinno will facilitate portability'}</li>
                    <li><strong>{lang === 'es' ? 'Derecho a la limitación' : lang === 'it' ? 'Diritto alla limitazione' : 'Right to limitation'}:</strong> {lang === 'es' ? 'solo se conservarán para el ejercicio o defensa de reclamaciones' : lang === 'it' ? 'saranno conservati solo per l\'esercizio o la difesa di reclami' : 'they will only be preserved for the exercise or defense of claims'}</li>
                    <li><strong>{lang === 'es' ? 'Retirada del consentimiento' : lang === 'it' ? 'Revoca del consenso' : 'Withdrawal of consent'}:</strong> {lang === 'es' ? 'en cualquier momento, sin afectar a la legalidad del tratamiento previo' : lang === 'it' ? 'in qualsiasi momento, senza pregiudicare la legalità del trattamento precedente' : 'at any time, without affecting the legality of prior processing'}</li>
                </ul>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Si considera que existe un problema con el tratamiento de los datos, puede dirigir sus reclamaciones al DPD de Opinno o a la Agencia Española de Protección de Datos (https://www.aepd.es).'
                        : lang === 'it'
                            ? 'Se ritiene che ci sia un problema con il trattamento dei dati, può indirizzare i propri reclami al DPO di Opinno o all\'Autorità spagnola per la protezione dei dati (https://www.aepd.es).'
                            : 'If you consider that there may be an issue with data processing, you can direct your claims to the Opinno DPO or the Spanish Data Protection Agency (https://www.aepd.es).'}
                </p>

                {/* Data Conservation */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? 'Conservación de datos' : lang === 'it' ? 'Conservazione dei dati' : 'Data Conservation'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'En general, los datos personales proporcionados se conservarán durante el tiempo necesario para atender la solicitud del usuario o mientras éste no solicite su supresión.'
                        : lang === 'it'
                            ? 'In generale, i dati personali forniti saranno conservati per il tempo necessario ad evadere la richiesta dell\'utente o finché questi non ne richieda la cancellazione.'
                            : 'In general, personal data provided will be retained for the time necessary to attend to the user\'s request or while they do not request their deletion.'}
                </p>
                <ul className="list-disc ml-6 space-y-2 mb-6">
                    <li><strong>{lang === 'es' ? '4 años' : lang === 'it' ? '4 anni' : '4 years'}:</strong> {lang === 'es' ? 'Ley sobre infracciones y sanciones en el orden social' : lang === 'it' ? 'Legge sulle infrazioni e sanzioni nell\'ordine sociale' : 'Law on infractions and sanctions in the social order (affiliation, registrations, salary payments)'}</li>
                    <li><strong>{lang === 'es' ? '5 años' : lang === 'it' ? '5 anni' : '5 years'}:</strong> {lang === 'es' ? 'Art. Código Civil de 1964 (acciones personales sin plazo especial)' : lang === 'it' ? 'Art. Codice Civile del 1964 (azioni personali senza termine speciale)' : 'Art. Civil Code of 1964 (personal actions without special term)'}</li>
                    <li><strong>{lang === 'es' ? '6 años' : lang === 'it' ? '6 anni' : '6 years'}:</strong> {lang === 'es' ? 'Art. 30 del Código de Comercio (libros contables, facturas)' : lang === 'it' ? 'Art. 30 del Codice di Commercio (libri contabili, fatture)' : 'Art. 30 of the Commercial Code (accounting books, invoices)'}</li>
                    <li><strong>{lang === 'es' ? '10 años' : lang === 'it' ? '10 anni' : '10 years'}:</strong> {lang === 'es' ? 'Art. 25 Ley de prevención del blanqueo de capitales y financiación del terrorismo' : lang === 'it' ? 'Art. 25 Legge sulla prevenzione del riciclaggio di denaro e del finanziamento del terrorismo' : 'Art. 25 Law on the prevention of money laundering and the financing of terrorism'}</li>
                </ul>

                {/* Origin, Purpose and Legitimacy */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? 'Origen, finalidad y legitimación' : lang === 'it' ? 'Origine, finalità e legittimazione' : 'Origin, Purpose and Legitimacy'}
                </h2>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3">
                    {lang === 'es' ? 'A. Web, email y medios tradicionales' : lang === 'it' ? 'A. Web, email e media tradizionali' : 'A. Web, Email and Traditional Media'}
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'El sitio web de Opinno tiene un cifrado SSL TLSv1/TLSv1.1/TLSv1.2 que permite a los usuarios enviar de forma segura sus datos personales a través de formularios de contacto estándar. Los datos personales recogidos a través de la Web estarán sujetos a tratamiento automatizado e incorporados a los ficheros correspondientes de Opinno.'
                        : lang === 'it'
                            ? 'Il sito web di Opinno dispone di una crittografia SSL TLSv1/TLSv1.1/TLSv1.2 che consente agli utenti di inviare in modo sicuro i propri dati personali attraverso moduli di contatto standard. I dati personali raccolti tramite il Web saranno soggetti a trattamento automatizzato e incorporati nei corrispondenti archivi di Opinno.'
                            : 'The Opinno website has SSL TLSv1/TLSv1.1/TLSv1.2 encryption that allows users to securely send their personal data through standard contact forms. Personal data collected through the Web will be subject to automated processing and incorporated into the corresponding Opinno files.'}
                </p>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'La finalidad del tratamiento de estos datos será exclusivamente la de los fines indicados de forma clara y transparente en cada momento. Si no desea seguir recibiendo correos electrónicos, puede desactivar esta función contactando con:'
                        : lang === 'it'
                            ? 'La finalità del trattamento di tali dati sarà esclusivamente quella degli scopi indicati in modo chiaro e trasparente in ogni momento. Se non desidera più ricevere email, può disattivare questa funzione contattando:'
                            : 'The purpose of processing these data will be exclusively that of the purposes indicated clearly and transparently at all times. If you do not wish to continue receiving emails, you can deactivate this feature by contacting:'}
                </p>
                <p className="mb-6">
                    Email: <a href="mailto:lopd@opinno.com" className="text-opinno-accent hover:underline">lopd@opinno.com</a><br />
                    {lang === 'es' ? 'Por correo postal' : lang === 'it' ? 'Per posta' : 'By post'}: Travesía de Navaluenga 38, Majadahonda – Madrid (Spain)
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'B. Redes sociales' : lang === 'it' ? 'B. Social media' : 'B. Social Media'}
                </h3>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Opinno tiene perfil en algunas de las redes sociales de Internet (Facebook, Twitter, LinkedIn), siendo responsable del tratamiento en relación con los datos publicados por Opinno. En ningún caso Opinno extraerá datos de las redes sociales, salvo que se obtenga el consentimiento expreso y explícito del usuario para ello.'
                        : lang === 'it'
                            ? 'Opinno ha un profilo su alcuni social network di Internet (Facebook, Twitter, LinkedIn), essendo responsabile del trattamento in relazione ai dati pubblicati da Opinno. In nessun caso Opinno estrarrà dati dai social network, a meno che non si ottenga il consenso espresso ed esplicito dell\'utente a tal fine.'
                            : 'Opinno has a profile on some Internet social networks (Facebook, Twitter, LinkedIn), being responsible for the processing of data published by Opinno. In no case will Opinno extract data from social networks, unless the express and explicit consent of the user is obtained.'}
                </p>

                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3 mt-8">
                    {lang === 'es' ? 'C. Empleo, becas o prácticas' : lang === 'it' ? 'C. Lavoro, borse di studio o tirocini' : 'C. Employment, Scholarships or Internships'}
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'El usuario puede acceder a las ofertas de empleo de Opinno a través del portal. Solo se evaluarán las solicitudes de empleo o prácticas que el candidato presente a través de los medios indicados en la página o en las páginas web de empleo donde Opinno haya publicado una oferta concreta.'
                        : lang === 'it'
                            ? 'L\'utente può accedere alle offerte di lavoro di Opinno attraverso il portale. Saranno valutate solo le candidature o le richieste di tirocinio presentate dal candidato attraverso i mezzi indicati sulla pagina o sulle pagine web di lavoro dove Opinno ha pubblicato un\'offerta specifica.'
                            : 'The user can access Opinno job offers through the portal. Only employment or internship applications submitted through the means indicated on the page or job websites where Opinno has published a specific offer will be evaluated.'}
                </p>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'En caso de no ser seleccionado, Opinno podrá conservar el currículum vitae del candidato durante un máximo de dos años para incluirlo en futuras convocatorias, salvo que el candidato indique lo contrario.'
                        : lang === 'it'
                            ? 'In caso di mancata selezione, Opinno potrà conservare il curriculum vitae del candidato per un massimo di due anni per includerlo in future selezioni, salvo diversa indicazione del candidato.'
                            : 'If the candidate is not selected, Opinno may retain their curriculum vitae for a maximum of two years to include it in future calls, unless the candidate indicates otherwise.'}
                </p>

                {/* Sharing */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? '¿Comparte Opinno sus datos personales?' : lang === 'it' ? 'Opinno condivide i vostri dati personali?' : 'Does Opinno Share Your Personal Information?'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'La información sobre nuestros clientes es una parte fundamental de nuestro negocio y no nos dedicamos a la venta de información personal de nuestros clientes a terceros. Opinno solo comparte la información personal de sus clientes de la manera que se describe a continuación:'
                        : lang === 'it'
                            ? 'Le informazioni sui nostri clienti sono una parte fondamentale della nostra attività e non vendiamo le informazioni personali dei nostri clienti a terzi. Opinno condivide le informazioni personali dei propri clienti solo nel modo descritto di seguito:'
                            : 'Information about our customers is a fundamental part of our business and we do not engage in the sale of our customers\' personal information to third parties. Opinno only shares its customers\' personal information in the manner described below:'}
                </p>
                <ul className="list-disc ml-6 space-y-3 mb-6">
                    <li><strong>{lang === 'es' ? 'Proveedores de servicios terceros' : lang === 'it' ? 'Fornitori di servizi terzi' : 'Third Party Service Providers'}:</strong> {lang === 'es' ? 'Contratamos con otras empresas e individuos para realizar determinadas funciones en nuestro nombre. Estos proveedores de servicios tendrán acceso a la información personal necesaria para realizar sus funciones, pero no podrán utilizarla para otros fines.' : lang === 'it' ? 'Contraiamo con altre aziende e individui per svolgere determinate funzioni per nostro conto. Questi fornitori di servizi avranno accesso alle informazioni personali necessarie per svolgere le loro funzioni, ma non potranno utilizzarle per altri scopi.' : 'We contract with other companies and individuals to perform certain functions on our behalf. These third party service providers will have access to personal information needed to perform their functions, but may not use it for other purposes.'}</li>
                    <li><strong>{lang === 'es' ? 'Transferencias de negocio' : lang === 'it' ? 'Trasferimenti aziendali' : 'Business Transfers'}:</strong> {lang === 'es' ? 'En tales transacciones, la información personal de los clientes suele ser uno de los activos transferidos, y dicha información estará en todo caso sujeta a los compromisos asumidos en las Políticas de Privacidad preexistentes.' : lang === 'it' ? 'In tali transazioni, le informazioni personali dei clienti sono spesso uno degli asset trasferiti, e tali informazioni saranno in ogni caso soggette agli impegni assunti nelle Politiche sulla Privacy preesistenti.' : 'In such transactions, one of the assets of the transferred companies is often the personal information of customers; such information will in all cases be subject to the commitments made in pre-existing Privacy Notices.'}</li>
                    <li><strong>{lang === 'es' ? 'Protección de Opinno y terceros' : lang === 'it' ? 'Protezione di Opinno e terzi' : 'Protection of Opinno and Others'}:</strong> {lang === 'es' ? 'Divulgamos información personal cuando creemos que la divulgación es necesaria para cumplir con la ley, proteger los derechos, la propiedad o la seguridad de Opinno, sus usuarios o terceros.' : lang === 'it' ? 'Divulghiamo informazioni personali quando riteniamo che la divulgazione sia necessaria per conformarsi alla legge, proteggere i diritti, la proprietà o la sicurezza di Opinno, dei suoi utenti o di terzi.' : 'We disclose personal information when we believe disclosure is necessary to comply with the law, to protect the rights, property, or safety of Opinno, its users, or third parties.'}</li>
                </ul>

                {/* Confidentiality */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? 'Confidencialidad y destrucción de documentos' : lang === 'it' ? 'Riservatezza e distruzione dei documenti' : 'Confidentiality and Document Destruction'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'El equipo de Opinno que tiene algún tipo de intervención en los servicios prestados al cliente se compromete a no revelar ni hacer uso de la información a la que ha accedido por su cargo o puesto. La información proporcionada por el cliente tendrá, en todo caso, consideración de confidencial.'
                        : lang === 'it'
                            ? 'Il team di Opinno che ha qualsiasi tipo di intervento nei servizi forniti al cliente si impegna a non rivelare né utilizzare le informazioni a cui ha avuto accesso per la propria posizione o incarico. Le informazioni fornite dal cliente avranno, in ogni caso, natura confidenziale.'
                            : 'The Opinno team that has any type of intervention in the services provided to the client is committed to not revealing or making use of the information to which they have had access through their position. The information provided by the client will, in any case, be considered confidential.'}
                </p>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Opinno se compromete a destruir toda la información confidencial una vez transcurridos 90 días desde la finalización del servicio al cliente, salvo que exista una obligación legal de conservación.'
                        : lang === 'it'
                            ? 'Opinno si impegna a distruggere tutte le informazioni confidenziali una volta trascorsi 90 giorni dalla conclusione del servizio al cliente, a meno che non sussista un obbligo legale di conservazione.'
                            : 'Opinno is committed to destroying all confidential information once 90 days have elapsed after the completion of customer service, unless there is a legal obligation for its conservation.'}
                </p>

                {/* Third Party Processors */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4 mt-10">
                    {lang === 'es' ? 'Encargados de tratamiento terceros' : lang === 'it' ? 'Responsabili del trattamento terzi' : 'Third Party Processors'}
                </h2>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Nuestros socios y proveedores de servicios cuidadosamente seleccionados pueden procesar información personal sobre usted en nuestro nombre. Nuestros encargados de tratamiento designados incluyen:'
                        : lang === 'it'
                            ? 'I nostri partner e fornitori di servizi accuratamente selezionati possono elaborare informazioni personali su di voi per nostro conto. I nostri responsabili del trattamento designati includono:'
                            : 'Our carefully selected partners and service providers may process personal information about you on our behalf. Our appointed data processors include:'}
                </p>
                <p className="mb-4">
                    <strong>Prospect Global Ltd (Sopro)</strong> — Reg. UK Co. 09648733<br />
                    {lang === 'es' ? 'Política de privacidad' : lang === 'it' ? 'Informativa sulla privacy' : 'Privacy policy'}: <a href="http://sopro.io" className="text-opinno-accent hover:underline" target="_blank" rel="noopener noreferrer">sopro.io</a><br />
                    ICO Reg: ZA346877<br />
                    DPO: <a href="mailto:dpo@sopro.io" className="text-opinno-accent hover:underline">dpo@sopro.io</a>
                </p>
            </div>
        </InteriorPageLayout>
    )
}
