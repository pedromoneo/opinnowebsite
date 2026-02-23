import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function ModelPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Nosotros' : lang === 'it' ? 'Chi siamo' : 'About'}
            title={lang === 'es' ? 'Nuestro Modelo' : lang === 'it' ? 'Il nostro modello' : 'Our Model'}
            sidebar={getSidebar("about", lang)}
        >
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {lang === 'es' ? 'Reinventando la consultoría en la era digital.' : lang === 'it' ? 'Reinventare la consulenza nell\'era digitale.' : 'Reinventing consulting in the digital era.'}
                </p>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Una nueva forma de consultoría' : lang === 'it' ? 'Un nuovo modo di fare consulenza' : 'A new way of consulting'}
                </h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                    {lang === 'es' ? 'Los modelos tradicionales de consultoría pueden ser rígidos y herméticos. En una era definida por el cambio rápido, las organizaciones necesitan socios que puedan moverse a la velocidad de la innovación.' : lang === 'it' ? 'I modelli di consulenza tradizionali possono essere rigidi ed ermetici. In un\'era definita dal rapido cambiamento, le organizzazioni hanno bisogno di partner in grado di muoversi alla velocità dell\'innovazione.' : 'Traditional consulting models can be rigid and hermetic. In an era defined by rapid change, organizations need partners who can move at the speed of innovation.'}
                </p>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                    {lang === 'es' ? 'En Opinno, hemos construido un enfoque "gig-economy" para la consultoría, incorporando a los líderes y expertos globales para proyectos específicos. Nuestro modelo combina:' : lang === 'it' ? 'In Opinno, abbiamo costruito un approccio di "gig-economy" alla consulenza, coinvolgendo i migliori esperti a livello globale per progetti specifici. Il nostro modello combina:' : 'At Opinno, we have built a "gig-economy" approach to consulting, where we pull in the best experts globally for specific projects. Our model combines:'}
                </p>
                <ul className="space-y-3 ml-6 mb-6">
                    <li className="text-base text-opinno-gray font-body leading-relaxed flex items-start gap-2">
                        <span className="text-opinno-accent mt-1">●</span>
                        <span>{lang === 'es' ? <><strong>Un equipo central</strong> de más de 250 consultores en 14 oficinas alrededor del mundo</> : lang === 'it' ? <><strong>Un team centrale</strong> di oltre 250 consulenti in 14 uffici in tutto il mondo</> : <><strong>A core team</strong> of 250+ consultants across 14 offices worldwide</>}</span>
                    </li>
                    <li className="text-base text-opinno-gray font-body leading-relaxed flex items-start gap-2">
                        <span className="text-opinno-accent mt-1">●</span>
                        <span>{lang === 'es' ? <><strong>Una comunidad</strong> de más de 50.000 expertos, emprendedores e innovadores</> : lang === 'it' ? <><strong>Una community</strong> di oltre 50.000 esperti, imprenditori e innovatori</> : <><strong>A community</strong> of 50,000+ experts, entrepreneurs, and innovators</>}</span>
                    </li>
                    <li className="text-base text-opinno-gray font-body leading-relaxed flex items-start gap-2">
                        <span className="text-opinno-accent mt-1">●</span>
                        <span>{lang === 'es' ? <><strong>Una plataforma tecnológica propia</strong> para gestionar y orquestar la innovación a escala</> : lang === 'it' ? <><strong>Una piattaforma tecnologica proprietaria</strong> per gestire e orchestrare l'innovazione su larga scala</> : <><strong>A proprietary technology platform</strong> to manage and orchestrate innovation at scale</>}</span>
                    </li>
                </ul>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold font-display mb-4">The Opinno Way</h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                    {lang === 'es' ? 'Cada proyecto sigue The Opinno Way — nuestra metodología propia y marco metodológico de calidad. Los project managers están certificados a través de nuestro programa interno para garantizar resultados impecables y globales.' : lang === 'it' ? 'Ogni progetto segue l\'Opinno Way: la nostra metodologia proprietaria e il nostro quadro di garanzia della qualità. I project manager sono certificati attraverso il nostro programma interno per garantire una consegna costante e di prim\'ordine.' : 'Every project follows the Opinno Way — our proprietary methodology and quality assurance framework. Project managers are certified through our internal program to ensure consistent, world-class delivery.'}
                </p>
                <p className="text-base text-opinno-gray font-body leading-relaxed">
                    {lang === 'es' ? 'Este enfoque garantiza que, independientemente de si un cliente trabaja con nuestro equipo en San Francisco, Madrid, Milán o Dubái, recibirá el mismo nivel de calidad, innovación e impacto.' : lang === 'it' ? 'Questo approccio garantisce che, indipendentemente dal fatto che un cliente lavori con il nostro team a San Francisco, Madrid, Milano o Dubai, riceva lo stesso livello di qualità, innovazione e impatto.' : 'This approach guarantees that whether a client works with our team in San Francisco, Madrid, Milan, or Dubai, they receive the same level of quality, innovation, and impact.'}
                </p>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Innovación basada en retos' : lang === 'it' ? 'Innovazione basata sulle sfide' : 'Challenge-based innovation'}
                </h2>
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-4">
                    {lang === 'es' ? 'Utilizamos enfoques basados en retos para obtener ideas y soluciones de nuestra comunidad global. Esto nos permite aprovechar un vasto número de talento, creatividad y conocimiento sobre innovación a los que las consultoras clásicas tradicionalmente no han podido acceder.' : lang === 'it' ? 'Ci avvaliamo di approcci basati su sfide per cercare idee e soluzioni dalla nostra comunità globale. Questo ci consente di attingere a un vasto bacino di conoscenze e creatività a cui le tradizionali società di consulenza non possono accedere.' : 'We use challenge-based approaches to source ideas and solutions from our global community. This allows us to tap into a vast pool of knowledge and creativity that traditional consulting firms simply cannot access.'}
                </p>
                <p className="text-base text-opinno-gray font-body leading-relaxed">
                    {lang === 'es' ? 'El resultado nos conduce más rápidamente a más innovación, y con la mejor relación entre soluciones y costes para nuestros clientes.' : lang === 'it' ? 'Il risultato sono soluzioni più veloci, più innovative e più convenienti per i nostri clienti.' : 'The result is faster, more innovative, and more cost-effective solutions for our clients.'}
                </p>
            </div>

            {/* Contact form */}
            <div className="mt-16 pt-12 border-t border-opinno-border">
                <h2 className="text-2xl font-bold font-display mb-6">
                    {lang === 'es' ? 'Hablemos' : lang === 'it' ? 'Parliamone' : 'Let\'s talk'}
                </h2>
                <form className="space-y-4 max-w-lg">
                    <input type="text" placeholder={lang === 'es' ? 'Nombre *' : lang === 'it' ? 'Nome *' : 'Name *'} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
                    <input type="email" placeholder={lang === 'es' ? 'Correo electrónico *' : lang === 'it' ? 'Email *' : 'Email *'} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
                    <input type="text" placeholder={lang === 'es' ? 'Empresa' : lang === 'it' ? 'Azienda' : 'Company'} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
                    <textarea placeholder={lang === 'es' ? '¿Cómo podemos ayudarte? *' : lang === 'it' ? 'Come possiamo aiutarti? *' : 'How can we help you? *'} rows={4} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent resize-none" />
                    <button type="submit" className="btn-primary">
                        {lang === 'es' ? 'ENVIAR' : lang === 'it' ? 'INVIA' : 'SUBMIT'}
                    </button>
                </form>
            </div>
        </InteriorPageLayout>
    )
}
