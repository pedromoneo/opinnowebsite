import InteriorPageLayout from '@/components/InteriorPageLayout'
import { getSidebar, LEADERSHIP_TEAM } from '@/lib/page-data'

export default function LeadershipPage({ lang }: { lang: string }) {
    return (
        <InteriorPageLayout
            breadcrumb={lang === 'es' ? 'Nosotros' : lang === 'it' ? 'Chi siamo' : 'About'}
            title={lang === 'es' ? 'Liderazgo' : lang === 'it' ? 'Leadership' : 'Leadership'}
            sidebar={getSidebar("about", lang)}
        >
            <div className="mb-12">
                <p className="text-xl md:text-2xl leading-relaxed text-opinno-primary mb-8">
                    {lang === 'es' ? 'Conoce al equipo que lidera la misión de innovación global de Opinno.' : lang === 'it' ? 'Incontra il team che guida la missione globale di innovazione di Opinno.' : 'Meet the team leading Opinno\'s global innovation mission.'}
                </p>
            </div>

            {/* Leadership grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {LEADERSHIP_TEAM.map(member => (
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
                        <p className="text-sm text-opinno-gray font-body">{member.role}</p>
                    </div>
                ))}
            </div>
        </InteriorPageLayout>
    )
}
