import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar } from "@/lib/page-data"

const COUNCIL_MEMBERS = [
    { name: 'Antonio Núñez', title: 'Senior Partner, Parangon Partners. Co-autor "El líder ante la innovación"', image: 'https://opinno.com/wp-content/uploads/2023/09/Antonio_Nunez.jpg' },
    { name: 'Balvinder Powar', title: 'Board Member, BOOSTER Space Industries. Co-fundador, Unfold Work', image: 'https://opinno.com/wp-content/uploads/2023/09/Balvinder_Powar.jpg' },
    { name: 'Antonio González Barros', title: 'Presidente, Grupo Intercom', image: 'https://opinno.com/wp-content/uploads/2023/09/Antonio.png' },
    { name: 'Clotilde Tesón Ruiz', title: 'Europe and Asia HR & Culture Director, DRAXTON. Executive Coach Certified by ICF', image: 'https://opinno.com/wp-content/uploads/2023/09/Clotilde_Teson_Ruiz.jpg' },
    { name: 'Elisabetta Galli', title: 'Global HR Leader – International HRBP, L&D CoE', image: 'https://opinno.com/wp-content/uploads/2023/09/Elisabetta.png' },
    { name: 'Fabián Orue', title: 'Business Leadership & Team Facilitation', image: 'https://opinno.com/wp-content/uploads/2023/09/Fabian.png' },
    { name: 'Guayente Sanmartín', title: 'WW VP & General Manager, HP 3D MultiJet Solutions Business', image: 'https://opinno.com/wp-content/uploads/2023/09/Guayente.png' },
    { name: 'Ignacio Villoch', title: 'Founder, KIMWAZA 2020. Mentor, IKIGAI', image: 'https://opinno.com/wp-content/uploads/2023/09/Nacho_Villoch.png' },
    { name: 'Viviana Konstantynowsky', title: 'CEO, Kamaljit Europa. Managing Partner, Opinno Argentina', image: 'https://opinno.com/wp-content/uploads/2023/09/Viviana_Konstantynowksky.jpg' },
]

export default function CouncilPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Nosotros' : lang === 'it' ? 'Chi siamo' : 'About'}
            title={lang === 'es' ? 'Consejo de Expertos Superiores' : lang === 'it' ? 'Consiglio degli Esperti Senior' : 'Senior Expert Council'}
            sidebar={getSidebar("about", lang)}
        >
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {lang === 'es' ? 'Altos ejecutivos, científicos y emprendedores de prestigio de todo el mundo actúan como Junta Asesora "Plug and Play" en nuestros proyectos.' : lang === 'it' ? 'Dirigenti senior, scienziati e affermati imprenditori da tutto il mondo agiscono come comitato consultivo "Plug and Play" per i nostri progetti.' : 'Senior executives, scientists and established entrepreneurs from all over the world act as a "Plug and Play" Advisory Board in our projects.'}
                </p>
            </div>

            <div className="mb-10">
                <p className="text-base text-opinno-gray font-body leading-relaxed mb-6">
                    {lang === 'es' ? 'Nuestro Consejo está compuesto por líderes mundiales en innovación, tecnología, emprendedurismo y políticas públicas. Proveen de asesoramiento estratégico a nuestros clientes y nos ayudan a permanecer en la vanguardia de la innovación.' : lang === 'it' ? 'Il nostro Consiglio di Esperti Senior è composto da leader di fama mondiale in innovazione, tecnologia, imprenditorialità e politiche pubbliche. Forniscono guida strategica ai nostri clienti e ci aiutano a restare in prima linea nell\'innovazione.' : 'Our Senior Expert Council is composed of world-renowned leaders in innovation, technology, entrepreneurship, and public policy. They provide strategic guidance to our clients and help us stay at the forefront of innovation.'}
                </p>
            </div>

            {/* Council members grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {COUNCIL_MEMBERS.map(member => (
                    <div key={member.name}>
                        <div className="relative w-full aspect-[3/4] rounded-tr-[40px] rounded-bl-[40px] overflow-hidden mb-4 bg-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={member.image}
                                alt={member.name}
                                className="object-cover w-full h-full"
                                loading="lazy"
                            />

                        </div>
                        <h3 className="text-base font-bold font-display mb-1">{member.name}</h3>
                        <p className="text-sm text-opinno-gray font-body">{member.title}</p>
                    </div>
                ))}
            </div>
        </InteriorPageLayout>
    )
}
