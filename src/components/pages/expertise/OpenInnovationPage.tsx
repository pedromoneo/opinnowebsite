import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

export default function OpenInnovationPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Servicios' : lang === 'it' ? 'Servizi' : 'Expertise'}
            title="Open Innovation"
            sidebar={getSidebar("expertise", lang)}
        >
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {lang === 'es' ? 'Conectando organizaciones con el ecosistema de innovación global.' : lang === 'it' ? 'Connettiamo le organizzazioni con l\'ecosistema di innovazione globale.' : 'Connecting organizations with the global innovation ecosystem.'}
                </p>
            </div>

            <div className="mb-10">
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-6">
                    {lang === 'es' ? 'Entender el mercado es el punto de partida de la innovación. Nuestra práctica de Innovación Abierta proporciona inteligencia de mercado, ayuda a la creación de ecosistemas de innovación y conecta a los clientes con el mundo de las startups y la tecnología.' : lang === 'it' ? 'Comprendere il mercato è il punto di partenza dell\'innovazione. La nostra pratica di Open Innovation fornisce intelligence di mercato ai clienti, aiuta a creare ecosistemi di innovazione e li connette con il mondo delle startup.' : 'Understanding the market is the starting point for innovation. Our Open Innovation practice provides clients with market intelligence, helps create innovation ecosystems, and connects them with the startup world.'}
                </p>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold font-display mb-4">
                    {lang === 'es' ? 'Lo que ofrecemos' : lang === 'it' ? 'Cosa offriamo' : 'What we offer'}
                </h2>
                <div className="space-y-4">
                    {[
                        { title: 'Startup Scouting', desc: lang === 'es' ? 'Identificamos y evaluamos startups que pueden ayudar a resolver tus retos de innovación, utilizando nuestra red global.' : lang === 'it' ? 'Identifichiamo e valutiamo le startup in grado di risolvere le tue sfide di innovazione, sfruttando la nostra rete globale.' : 'We identify and evaluate startups that can help solve your innovation challenges, using our global network and AI-powered tools.' },
                        { title: 'Innovation Challenges', desc: lang === 'es' ? 'Diseñamos y gestionamos retos de innovación abierta que captan soluciones de emprendedores e innovadores de todo el mundo.' : lang === 'it' ? 'Progettiamo e gestiamo sfide di open innovation che ricercano soluzioni presso imprenditori, ricercatori e innovatori.' : 'We design and manage open innovation challenges that crowdsource solutions from entrepreneurs, researchers, and innovators worldwide.' },
                        { title: 'Market Intelligence', desc: lang === 'es' ? 'Apoyamos la estrategia de la organización proporcionando información e investigaciones sobre las principales innovaciones de mercado y actores influyentes.' : lang === 'it' ? 'Forniamo insight su tendenze di mercato, tecnologie e scenari competitivi per definire la tua strategia di innovazione.' : 'We provide actionable insights on market trends, technologies, and competitive landscapes to inform your innovation strategy.' },
                        { title: 'Ecosystem Development', desc: lang === 'es' ? 'Diseñamos y desarrollamos el lanzamiento de programas corporativos de innovación, incubación o aceleración de startups.' : lang === 'it' ? 'Aiutiamo a costruire e a gestire ecosistemi di innovazione, inclusi acceleratori, incubatori e programmi di corporate venture.' : 'We help build and manage innovation ecosystems, including accelerators, incubators, and corporate venture programs.' },
                    ].map(item => (
                        <div key={item.title} className="p-5 bg-white rounded-xl border border-opinno-border">
                            <h3 className="text-base font-bold font-display mb-2">{item.title}</h3>
                            <p className="text-sm text-opinno-gray font-body leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </InteriorPageLayout>
    )
}
