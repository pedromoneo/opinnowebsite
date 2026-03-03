import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function CompliancePage({ lang }: { lang: string }) {
    const breadcrumb = lang === 'es' ? 'Contacto' : lang === 'it' ? 'Contatto' : 'Contact'
    const title = lang === 'es' ? 'Canal de Cumplimiento' : lang === 'it' ? 'Canale di Conformità' : 'Compliance Channel'

    return (
        <InteriorPageLayout
            breadcrumb={breadcrumb}
            title={title}
            sidebar={getSidebar("contact", lang)}
        >
            <div className="prose prose-sm max-w-none text-opinno-gray font-body leading-relaxed">

                {/* Internal Ethics Channel */}
                <h2 className="text-xl font-bold font-display text-opinno-primary mb-4">
                    {lang === 'es' ? 'Canal Interno de Ética' : lang === 'it' ? 'Canale Etico Interno' : 'Internal Ethics Channel'}
                </h2>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Las denuncias presentadas a través del Canal Interno de Ética se tramitarán de conformidad con los principios de confidencialidad, diligencia, independencia, objetividad y respeto a los derechos de todas las personas implicadas, en cumplimiento de la Ley 2/2023, de 20 de febrero, reguladora de la protección de las personas que informen sobre infracciones normativas y de lucha contra la corrupción.'
                        : lang === 'it'
                            ? 'Le segnalazioni presentate attraverso il Canale Etico Interno saranno trattate in conformità con i principi di riservatezza, diligenza, indipendenza, obiettività e rispetto dei diritti di tutte le persone coinvolte, nel rispetto della Legge spagnola 2/2023 del 20 febbraio, che regola la protezione delle persone che segnalano violazioni normative e la lotta alla corruzione.'
                            : 'Reports submitted through the Internal Ethics Channel shall be processed in accordance with the principles of confidentiality, diligence, independence, objectivity, and respect for the rights of all persons involved, in compliance with Spanish Law 2/2023 of 20 February, regulating the protection of persons who report regulatory infringements and combating corruption.'}
                </p>

                {/* Link to form */}
                <div className="mb-8 p-6 bg-opinno-light-bg rounded-xl border border-opinno-border">
                    <p className="font-semibold text-opinno-primary mb-3">
                        {lang === 'es' ? 'Enlace al formulario' : lang === 'it' ? 'Link al modulo' : 'Link to form'}
                    </p>
                    <a
                        href="https://opinno.personiowhistleblowing.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-opinno-accent text-white font-bold rounded-lg hover:bg-opinno-accent-hover transition-colors text-sm"
                    >
                        {lang === 'es' ? 'Acceder al Canal de Denuncias' : lang === 'it' ? 'Accedi al Canale di Segnalazione' : 'Access the Reporting Channel'}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </a>
                </div>

                {/* Submission and Content */}
                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3">
                    {lang === 'es' ? 'Presentación y contenido de las denuncias' : lang === 'it' ? 'Presentazione e contenuto delle segnalazioni' : 'Submission and Content of Reports'}
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Cualquier persona con conocimiento o indicios razonables de conducta indebida podrá presentar una denuncia a través del Canal Interno de Ética. Las denuncias deben incluir una declaración clara y detallada de los hechos, incluyendo según proceda:'
                        : lang === 'it'
                            ? 'Qualsiasi persona a conoscenza o con ragionevoli indizi di comportamento scorretto può presentare una segnalazione attraverso il Canale Etico Interno. Le segnalazioni dovrebbero includere una dichiarazione chiara e dettagliata dei fatti, comprendendo, ove applicabile:'
                            : 'Any person with knowledge or reasonable indication of misconduct may submit a report through the Internal Ethics Channel. Reports should include a clear and detailed statement of the facts, including as applicable:'}
                </p>
                <ul className="list-disc ml-6 space-y-2 mb-6">
                    <li>{lang === 'es' ? 'El lugar, departamento o unidad de negocio donde ocurrieron los hechos' : lang === 'it' ? 'Il luogo, dipartimento o unità aziendale in cui si sono verificati i fatti' : 'The place, department, or business unit where the events occurred'}</li>
                    <li>{lang === 'es' ? 'La fecha y periodo de los hechos' : lang === 'it' ? 'La data e il periodo dei fatti' : 'The date and timeframe of the events'}</li>
                    <li>{lang === 'es' ? 'Personas involucradas o potencialmente involucradas' : lang === 'it' ? 'Persone coinvolte o potenzialmente coinvolte' : 'Persons involved or potentially involved'}</li>
                    <li>{lang === 'es' ? 'Documentos o pruebas relevantes relacionados con la denuncia' : lang === 'it' ? 'Documenti o prove rilevanti relativi alla segnalazione' : 'Relevant documents or evidence related to the report'}</li>
                    <li>{lang === 'es' ? 'Acciones tomadas en relación con los asuntos denunciados' : lang === 'it' ? 'Azioni intraprese in relazione ai fatti segnalati' : 'Actions taken in connection with the reported matters'}</li>
                </ul>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'La persona denunciante puede optar por permanecer en el anonimato. El sistema permitirá la denuncia anónima y mantendrá el anonimato a menos que la persona denunciante proporcione voluntariamente información de contacto. Todas las denuncias, ya sean anónimas o identificadas, serán tratadas con las mismas garantías de confidencialidad y procedimiento.'
                        : lang === 'it'
                            ? 'La persona segnalante può scegliere di rimanere anonima. Il sistema consentirà la segnalazione anonima e manterrà l\'anonimato a meno che la persona segnalante non fornisca volontariamente informazioni di contatto. Tutte le segnalazioni, sia anonime che identificate, saranno trattate con le stesse garanzie di riservatezza e procedurali.'
                            : 'The reporting person may choose to remain anonymous. The system shall allow anonymous reporting and shall maintain anonymity unless the reporting person voluntarily provides contact information. All reports, whether anonymous or identified, shall be treated with the same confidentiality and procedural guarantees.'}
                </p>

                {/* Acknowledgment */}
                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3">
                    {lang === 'es' ? 'Acuse de recibo y evaluación preliminar' : lang === 'it' ? 'Conferma di ricevimento e valutazione preliminare' : 'Acknowledgment and Preliminary Assessment'}
                </h3>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'Tras la recepción de una denuncia, el Responsable del Canal designado acusará recibo al denunciante en un plazo de siete (7) días naturales, siempre que se disponga de datos de contacto y a menos que hacerlo comprometa el anonimato o la confidencialidad. Tras el acuse de recibo, se realizará una evaluación inicial para determinar si la denuncia es adecuada para su tramitación a través del Canal y si se justifica una investigación adicional.'
                        : lang === 'it'
                            ? 'Al ricevimento di una segnalazione, il Responsabile del Canale designato confermerà la ricezione al segnalante entro sette (7) giorni di calendario, a condizione che siano disponibili i dati di contatto e a meno che ciò non comprometta l\'anonimato o la riservatezza. Dopo la conferma di ricevimento, verrà effettuata una valutazione iniziale per determinare se la segnalazione è idonea alla gestione tramite il Canale e se è giustificata un\'ulteriore indagine.'
                            : 'Upon receipt of a report, the designated Channel Manager shall acknowledge receipt to the reporting person within seven (7) calendar days, provided contact details are available and unless doing so would compromise anonymity or confidentiality. Following acknowledgment, an initial assessment will be conducted to determine whether the report is suitable for handling through the Channel and whether further investigation is warranted.'}
                </p>

                {/* Investigation */}
                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3">
                    {lang === 'es' ? 'Plazos de investigación y resolución' : lang === 'it' ? 'Tempi di indagine e risoluzione' : 'Investigation and Resolution Timeframes'}
                </h3>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'La gestión interna e investigación de la denuncia se concluirá en un plazo máximo de tres (3) meses desde la fecha del acuse de recibo o, si no se envió acuse de recibo, desde la expiración del plazo de siete días. Este plazo podrá ampliarse hasta un total de seis (6) meses en casos de complejidad, siempre que la ampliación esté debidamente justificada y documentada. Una vez concluida, se informará al denunciante del resultado de la investigación y de las medidas adoptadas o previstas.'
                        : lang === 'it'
                            ? 'La gestione interna e l\'indagine della segnalazione si concluderà entro un periodo massimo di tre (3) mesi dalla data della conferma di ricevimento o, se non è stata inviata alcuna conferma, dalla scadenza del periodo di sette giorni. Questo periodo può essere prorogato fino a un totale di sei (6) mesi in casi di complessità, a condizione che la proroga sia debitamente giustificata e documentata. Al termine, il segnalante sarà informato dell\'esito dell\'indagine e delle misure adottate o previste.'
                            : 'The internal handling and investigation of the report shall be concluded within a maximum period of three (3) months from the date of the acknowledgment of receipt or, if no acknowledgment was sent, from the expiration of the seven-day period following receipt. This period may be extended up to a total of six (6) months in cases of complexity, provided that the extension is duly justified and documented. Upon conclusion, the reporting person shall be informed of the outcome of the investigation and any measures adopted or planned.'}
                </p>

                {/* Confidentiality */}
                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3">
                    {lang === 'es' ? 'Confidencialidad y anonimato' : lang === 'it' ? 'Riservatezza e anonimato' : 'Confidentiality and Anonymity'}
                </h3>
                <p className="mb-6">
                    {lang === 'es'
                        ? 'El sistema garantizará la confidencialidad de la identidad del denunciante y se establecerán salvaguardias para prevenir represalias. El anonimato se preservará a menos que el denunciante revele voluntariamente su identidad o su divulgación sea legalmente requerida en el contexto de procedimientos judiciales o administrativos. Todos los datos recogidos se tratarán de conformidad con la legislación aplicable en materia de protección de datos.'
                        : lang === 'it'
                            ? 'Il sistema garantirà la riservatezza dell\'identità del segnalante e saranno previste garanzie per prevenire ritorsioni. L\'anonimato sarà preservato a meno che il segnalante non riveli volontariamente la propria identità o la sua divulgazione sia legalmente richiesta nel contesto di procedimenti giudiziari o amministrativi. Tutti i dati raccolti saranno trattati in conformità con la legislazione applicabile in materia di protezione dei dati.'
                            : 'The system will ensure the confidentiality of the reporting person\'s identity and safeguards shall be in place to prevent retaliation. Anonymity shall be preserved unless the reporter voluntarily reveals their identity or its disclosure is legally required in the context of judicial or administrative proceedings. All data collected shall be handled in accordance with applicable data protection laws.'}
                </p>

                {/* Outcomes */}
                <h3 className="text-lg font-bold font-display text-opinno-primary mb-3">
                    {lang === 'es' ? 'Resultados y seguimiento' : lang === 'it' ? 'Risultati e follow-up' : 'Outcomes and Follow-Up'}
                </h3>
                <p className="mb-4">
                    {lang === 'es'
                        ? 'Tras la finalización del proceso interno, una denuncia puede resultar en:'
                        : lang === 'it'
                            ? 'Al termine del processo interno, una segnalazione può risultare in:'
                            : 'Upon completion of the internal process, a report may result in:'}
                </p>
                <ul className="list-disc ml-6 space-y-2 mb-8">
                    <li>{lang === 'es' ? 'Archivo y cierre sin acciones adicionales' : lang === 'it' ? 'Archiviazione e chiusura senza ulteriori azioni' : 'Filing and closure without further action'}</li>
                    <li>{lang === 'es' ? 'Inicio de medidas correctivas o disciplinarias internas' : lang === 'it' ? 'Avvio di misure correttive o disciplinari interne' : 'Initiation of internal corrective or disciplinary measures'}</li>
                    <li>{lang === 'es' ? 'Remisión a las autoridades competentes cuando la conducta denunciada pueda constituir una infracción administrativa grave o un delito penal' : lang === 'it' ? 'Trasmissione alle autorità competenti quando la condotta segnalata possa costituire una violazione amministrativa grave o un reato penale' : 'Referral to the competent authorities where the reported conduct may constitute a serious administrative infringement or a criminal offense'}</li>
                </ul>

                {/* Privacy Policy Section */}
                <div className="mt-12 pt-8 border-t border-opinno-border">
                    <h2 className="text-xl font-bold font-display text-opinno-primary mb-4">
                        {lang === 'es' ? 'Política de Privacidad del Canal de Cumplimiento' : lang === 'it' ? 'Informativa sulla Privacy del Canale di Conformità' : 'Compliance Channel Privacy Policy'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <p className="font-bold text-opinno-primary mb-1">{lang === 'es' ? 'RESPONSABLE DEL TRATAMIENTO' : lang === 'it' ? 'TITOLARE DEL TRATTAMENTO' : 'DATA CONTROLLER'}</p>
                            <p>ENTREPRENEUR CAPITAL, S.L. — C.I.F. B-85053353 — {lang === 'es' ? 'Dirección' : lang === 'it' ? 'Indirizzo' : 'Address'}: Travesía de Navaluenga, 38, Majadahonda – Madrid (Spain) — Email: <a href="mailto:lopd@opinno.com" className="text-opinno-accent hover:underline">lopd@opinno.com</a></p>
                        </div>

                        <div>
                            <p className="font-bold text-opinno-primary mb-1">{lang === 'es' ? 'FINALIDADES DEL TRATAMIENTO' : lang === 'it' ? 'FINALITÀ DEL TRATTAMENTO' : 'PURPOSES OF DATA PROCESSING'}</p>
                            <p>{lang === 'es'
                                ? 'Las finalidades del tratamiento son la tramitación de su solicitud y, en caso de que se dé seguimiento a la denuncia, la investigación de los hechos denunciados y la adopción de las medidas oportunas.'
                                : lang === 'it'
                                    ? 'Le finalità del trattamento sono l\'elaborazione della richiesta e, nel caso in cui la segnalazione venga seguita, l\'indagine dei fatti segnalati e l\'adozione delle misure appropriate.'
                                    : 'The purposes of the processing are the handling of your request and, if the complaint is followed up, the investigation of the reported facts and the adoption of the appropriate measures.'}</p>
                        </div>

                        <div>
                            <p className="font-bold text-opinno-primary mb-1">{lang === 'es' ? 'LEGITIMACIÓN DEL TRATAMIENTO' : lang === 'it' ? 'LEGITTIMITÀ DEL TRATTAMENTO' : 'LEGITIMACY OF DATA PROCESSING'}</p>
                            <p>{lang === 'es'
                                ? 'La base jurídica para el tratamiento es la existencia de una obligación legal, en los términos establecidos en el artículo 6.1 c) del Reglamento General de Protección de Datos.'
                                : lang === 'it'
                                    ? 'La base giuridica per il trattamento è l\'esistenza di un obbligo legale, nei termini stabiliti dall\'articolo 6.1 c) del Regolamento Generale sulla Protezione dei Dati.'
                                    : 'The legal basis for the processing is the existence of a legal obligation, in the terms set forth in Article 6.1 c) of the General Data Protection Regulation.'}</p>
                        </div>

                        <div>
                            <p className="font-bold text-opinno-primary mb-1">{lang === 'es' ? 'DESTINATARIOS' : lang === 'it' ? 'DESTINATARI' : 'RECIPIENTS'}</p>
                            <p>{lang === 'es'
                                ? 'Los datos se comunicarán a proveedores de la empresa, como encargados de tratamiento, en el marco de la correspondiente prestación de servicios (por ejemplo, asistencia jurídica), y a las autoridades y organismos competentes en cumplimiento de obligaciones legales o para la formulación, ejercicio o defensa de reclamaciones.'
                                : lang === 'it'
                                    ? 'I dati saranno comunicati ai fornitori dell\'azienda, in qualità di responsabili del trattamento, nell\'ambito della corrispondente prestazione di servizi (ad esempio, assistenza legale), e alle autorità e organismi competenti in adempimento di obblighi legali o per la formulazione, esercizio o difesa di reclami.'
                                    : 'The data will be communicated to suppliers of the company, as processors, within the framework of the corresponding provision of services (e.g. legal assistance), and to the competent authorities and bodies in compliance with legal obligations or for the formulation, exercise or defense of claims.'}</p>
                        </div>

                        <div>
                            <p className="font-bold text-opinno-primary mb-1">{lang === 'es' ? 'TRANSFERENCIAS INTERNACIONALES' : lang === 'it' ? 'TRASFERIMENTI TRANSFRONTALIERI' : 'CROSS-BORDER PROCESSING'}</p>
                            <p>{lang === 'es'
                                ? 'La empresa ha contratado proveedores de servicios informáticos que actúan como encargados del tratamiento. Las transferencias a terceros países asociadas a estos servicios se realizarán sobre la base de una decisión de adecuación de la Comisión Europea (artículo 45 del RGPD) o sobre la base de garantías adecuadas como las cláusulas tipo de protección de datos adoptadas por la Comisión (artículo 46 del RGPD).'
                                : lang === 'it'
                                    ? 'L\'azienda ha contrattato fornitori di servizi IT che agiscono come responsabili del trattamento. I trasferimenti verso paesi terzi associati a questi servizi saranno effettuati sulla base di una decisione di adeguatezza della Commissione Europea (articolo 45 del GDPR) o sulla base di garanzie adeguate come le clausole contrattuali tipo di protezione dei dati adottate dalla Commissione (articolo 46 del GDPR).'
                                    : 'The company has contracted IT service providers who act as processors. Transfers to third countries associated with these services will be made either on the basis of an adequacy decision of the European Commission (Article 45 GDPR) or on the basis of appropriate safeguards such as standard data protection clauses adopted by the Commission (Article 46 GDPR).'}</p>
                        </div>

                        <div>
                            <p className="font-bold text-opinno-primary mb-1">{lang === 'es' ? 'PERIODOS DE CONSERVACIÓN' : lang === 'it' ? 'PERIODI DI CONSERVAZIONE' : 'CONSERVATION PERIODS'}</p>
                            <p>{lang === 'es'
                                ? 'Los datos se conservarán durante el tiempo necesario para decidir si procede iniciar una investigación sobre los hechos denunciados. Si se comprueba que la información proporcionada o parte de ella no es veraz, se eliminará inmediatamente una vez conocida esta circunstancia, salvo que la falta de veracidad pueda constituir un delito, en cuyo caso la información se conservará durante el tiempo necesario durante los procedimientos judiciales.'
                                : lang === 'it'
                                    ? 'I dati saranno conservati per il tempo necessario a decidere se avviare un\'indagine sui fatti segnalati. Se viene accertato che le informazioni fornite o parte di esse non sono veritiere, saranno immediatamente eliminate non appena nota questa circostanza, a meno che la mancanza di veridicità possa costituire un reato, nel qual caso le informazioni saranno conservate per il tempo necessario durante i procedimenti giudiziari.'
                                    : 'The data will be kept for the time necessary to decide whether to initiate an investigation into the facts reported. If it is proven that the information provided or part of it is not truthful, it will be immediately deleted as soon as this circumstance is known, unless the lack of truthfulness may constitute a criminal offense, in which case the information will be kept for the time necessary during judicial proceedings.'}</p>
                        </div>

                        <div>
                            <p className="font-bold text-opinno-primary mb-1">{lang === 'es' ? 'DERECHOS' : lang === 'it' ? 'DIRITTI' : 'RIGHTS'}</p>
                            <p className="mb-2">{lang === 'es'
                                ? 'Puede ejercer sus derechos enviando una comunicación y prueba de su identidad a: lopd@opinno.com'
                                : lang === 'it'
                                    ? 'Può esercitare i suoi diritti inviando una comunicazione e prova della sua identità a: lopd@opinno.com'
                                    : 'You may exercise your rights by sending a communication and proof of your identity to: lopd@opinno.com'}</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li><strong>{lang === 'es' ? 'Acceso' : lang === 'it' ? 'Accesso' : 'Access'}:</strong> {lang === 'es' ? 'Los interesados tienen derecho a obtener confirmación de si se están tratando o no datos personales que les conciernen.' : lang === 'it' ? 'Gli interessati hanno il diritto di ottenere conferma dell\'esistenza o meno di dati personali che li riguardano.' : 'Data subjects have the right to obtain confirmation as to whether or not personal data concerning them is being processed.'}</li>
                                <li><strong>{lang === 'es' ? 'Rectificación' : lang === 'it' ? 'Rettifica' : 'Rectification'}:</strong> {lang === 'es' ? 'Los interesados tienen derecho a solicitar la rectificación de datos inexactos que les conciernan.' : lang === 'it' ? 'Gli interessati hanno il diritto di richiedere la rettifica dei dati inesatti che li riguardano.' : 'Data subjects have the right to request the rectification of inaccurate data concerning them.'}</li>
                                <li><strong>{lang === 'es' ? 'Supresión' : lang === 'it' ? 'Cancellazione' : 'Deletion'}:</strong> {lang === 'es' ? 'Los interesados tienen derecho a solicitar la supresión de sus datos cuando, entre otras razones, los datos ya no sean necesarios para los fines para los que fueron recogidos.' : lang === 'it' ? 'Gli interessati hanno il diritto di richiedere la cancellazione dei propri dati quando, tra le altre ragioni, i dati non sono più necessari per le finalità per cui sono stati raccolti.' : 'Data subjects have the right to request deletion of their data when, among other reasons, the data is no longer necessary for the purposes for which it was collected.'}</li>
                                <li><strong>{lang === 'es' ? 'Limitación' : lang === 'it' ? 'Limitazione' : 'Limitation'}:</strong> {lang === 'es' ? 'En determinadas circunstancias, los interesados podrán solicitar la limitación del tratamiento de sus datos.' : lang === 'it' ? 'In determinate circostanze, gli interessati possono richiedere la limitazione del trattamento dei propri dati.' : 'In certain circumstances, data subjects may request the limitation of the processing of their data.'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </InteriorPageLayout>
    )
}
