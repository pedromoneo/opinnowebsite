import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from '@/lib/page-data'

function t(lang: string, en: string, es: string, it: string) {
    return lang === 'es' ? es : lang === 'it' ? it : en
}

export default function PressPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={t(lang, 'Stories', 'Historias', 'Storie')}
            title={t(lang, 'Press', 'Prensa', 'Stampa')}
            sidebar={getSidebar('stories', lang)}
        >
            {/* Intro */}
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-4">
                    {t(lang,
                        'Opinno is committed to open communication with the media. Here you will find resources, contact information, and materials for journalists and media professionals.',
                        'Opinno está comprometido con la comunicación abierta con los medios. Aquí encontrarás recursos, información de contacto y materiales para periodistas y profesionales de los medios.',
                        'Opinno è impegnata nella comunicazione aperta con i media. Qui troverai risorse, informazioni di contatto e materiali per giornalisti e professionisti dei media.'
                    )}
                </p>
            </div>

            {/* Media Contact */}
            <div className="mb-12">
                <h2 className="text-xl font-bold font-display mb-4">
                    {t(lang, 'Media Inquiries', 'Consultas de Medios', 'Richieste Media')}
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                    <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                        {t(lang,
                            'For press inquiries, interview requests, and media information, please contact our Communications Department. Media enquiries are only handled via email.',
                            'Para consultas de prensa, solicitudes de entrevistas e información para medios, contacta con nuestro Departamento de Comunicación. Las consultas de medios solo se gestionan por correo electrónico.',
                            'Per richieste stampa, interviste e informazioni per i media, contatta il nostro Dipartimento Comunicazione. Le richieste media vengono gestite esclusivamente via email.'
                        )}
                    </p>
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-opinno-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <a
                            href="mailto:press@opinno.com"
                            className="text-lg font-semibold text-opinno-accent hover:underline"
                        >
                            press@opinno.com
                        </a>
                    </div>
                    <p className="text-sm text-opinno-gray/70 font-body mt-3">
                        {t(lang,
                            'We endeavour to respond as quickly as possible.',
                            'Nos esforzamos por responder lo antes posible.',
                            'Ci impegniamo a rispondere il più rapidamente possibile.'
                        )}
                    </p>
                </div>
            </div>

            {/* Press Resources */}
            <div className="mb-12">
                <h2 className="text-xl font-bold font-display mb-6">
                    {t(lang, 'Press Resources', 'Recursos de Prensa', 'Risorse Stampa')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Fact Sheet */}
                    <a
                        href="https://opinno.com/wp-content/uploads/2023/06/Opinno-Fact-Sheet.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-white border border-opinno-border rounded-2xl p-6 hover:border-opinno-accent hover:shadow-md transition-all"
                    >
                        <div className="w-12 h-12 rounded-xl bg-opinno-accent/10 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-opinno-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold mb-2 group-hover:text-opinno-accent transition-colors">
                            {t(lang, 'Fact Sheet', 'Ficha Informativa', 'Scheda Informativa')}
                        </h3>
                        <p className="text-sm text-opinno-gray font-body leading-relaxed">
                            {t(lang,
                                'A brief overview of Opinno\'s history, mission, and current practice.',
                                'Un breve resumen de la historia, misión y práctica actual de Opinno.',
                                'Una breve panoramica della storia, missione e pratica attuale di Opinno.'
                            )}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm text-opinno-accent font-semibold mt-3">
                            PDF
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </span>
                    </a>

                    {/* Logotypes */}
                    <a
                        href="https://opinno.com/wp-content/uploads/2023/06/Opinno-Logotypes.zip"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-white border border-opinno-border rounded-2xl p-6 hover:border-opinno-accent hover:shadow-md transition-all"
                    >
                        <div className="w-12 h-12 rounded-xl bg-opinno-accent/10 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-opinno-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold mb-2 group-hover:text-opinno-accent transition-colors">
                            {t(lang, 'Opinno Logotypes', 'Logotipos de Opinno', 'Loghi Opinno')}
                        </h3>
                        <p className="text-sm text-opinno-gray font-body leading-relaxed">
                            {t(lang,
                                'Official logos in various formats. Please do not use without prior permission.',
                                'Logos oficiales en varios formatos. Por favor, no los uses sin permiso previo.',
                                'Loghi ufficiali in vari formati. Si prega di non utilizzarli senza previa autorizzazione.'
                            )}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm text-opinno-accent font-semibold mt-3">
                            ZIP
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </span>
                    </a>

                    {/* Press Kit */}
                    <a
                        href="https://opinno.com/wp-content/uploads/2023/06/Opinno-Press-Kit.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-white border border-opinno-border rounded-2xl p-6 hover:border-opinno-accent hover:shadow-md transition-all"
                    >
                        <div className="w-12 h-12 rounded-xl bg-opinno-accent/10 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-opinno-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold mb-2 group-hover:text-opinno-accent transition-colors">
                            {t(lang, 'Press Kit', 'Kit de Prensa', 'Cartella Stampa')}
                        </h3>
                        <p className="text-sm text-opinno-gray font-body leading-relaxed">
                            {t(lang,
                                'Complete press toolkit with company information, key facts, and media assets.',
                                'Kit de prensa completo con información de la empresa, datos clave y recursos para medios.',
                                'Kit stampa completo con informazioni aziendali, dati chiave e risorse per i media.'
                            )}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm text-opinno-accent font-semibold mt-3">
                            PDF
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>

            {/* Conference & Speaking Requests */}
            <div className="mb-12 pt-12 border-t border-opinno-border">
                <h2 className="text-xl font-bold font-display mb-4">
                    {t(lang, 'Conference & Speaking Requests', 'Solicitudes de Conferencias y Ponencias', 'Richieste per Conferenze e Interventi')}
                </h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-6">
                    {t(lang,
                        'Interested in having Opinno participate in your conference, panel, or event? Our team of experts covers topics including open innovation, corporate transformation, venture building, and emerging technologies.',
                        '¿Te interesa que Opinno participe en tu conferencia, panel o evento? Nuestro equipo de expertos cubre temas como innovación abierta, transformación corporativa, venture building y tecnologías emergentes.',
                        'Sei interessato a far partecipare Opinno alla tua conferenza, panel o evento? Il nostro team di esperti copre argomenti come open innovation, trasformazione aziendale, venture building e tecnologie emergenti.'
                    )}
                </p>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-6">
                    {t(lang,
                        'Please include the event name, date, location, topic, and expected audience in your request.',
                        'Por favor, incluye el nombre del evento, fecha, ubicación, tema y audiencia esperada en tu solicitud.',
                        'Si prega di includere il nome dell\'evento, la data, il luogo, l\'argomento e il pubblico previsto nella richiesta.'
                    )}
                </p>
                <a
                    href="mailto:press@opinno.com?subject=Conference%20%26%20Speaking%20Request"
                    className="inline-flex items-center gap-2 bg-opinno-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-opinno-accent/90 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    {t(lang, 'Submit a Request', 'Enviar una Solicitud', 'Invia una Richiesta')}
                </a>
            </div>
        </InteriorPageLayout>
    )
}
