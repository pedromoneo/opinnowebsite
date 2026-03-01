// Shared sidebar configurations for interior pages

export function getSidebar(type: string, lang: string) {
    const t = {
        en: {
            about: [
                { label: 'Overview', href: '/about' },
                { label: 'Model', href: '/model' },
                { label: 'Council', href: '/senior-expert-council' },
                { label: 'Impact', href: '/about/impact' },
                { label: 'Leadership', href: '/leadership' },
                { label: 'Careers', href: 'https://opinno.jobs.personio.com/?language=en' },
            ],
            expertise: [
                { label: 'Overview', href: '/expertise' },
                { label: 'H1 — Intelligence', href: '/intelligence' },
                { label: 'H2 — Transformation', href: '/transformation' },
                { label: 'H3 — Innovation', href: '/innovation' },
                { label: 'Client Login', href: '/clients' },
            ],
            stories: [
                { label: 'All', href: '/stories' },
                { label: 'Impact Stories', href: '/stories/impact' },
                { label: 'News', href: '/stories/news' },
                { label: 'Press releases', href: '/stories/press-releases' },
                { label: 'Press', href: '/stories/press' },
            ],
            insights: [
                { label: 'All', href: '/insights' },
                { label: 'Insights', href: '/insights/insights' },
                { label: 'Voices', href: '/insights/voices' },
                { label: 'Publications', href: '/insights/publications' },
                { label: 'Conferences', href: '/insights/conferences' },
            ],
            contact: [
                { label: 'Contact', href: '/contact' },
                { label: 'Cookies', href: '/cookies' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Quality and Environment', href: '/quality-environment' },
                { label: 'Equality plan', href: '/equality-plan' },
                { label: 'Legal Notice', href: '/legal-notice' },
                { label: 'Compliance', href: '/compliance' },
            ],
            community: [
                { label: 'Work', href: '/work' },
                { label: 'Events', href: '/events' },
            ]
        },
        es: {
            about: [
                { label: 'Nosotros', href: '/about' },
                { label: 'Modelo', href: '/model' },
                { label: 'Consejo', href: '/senior-expert-council' },
                { label: 'Impacto', href: '/about/impact' },
                { label: 'Liderazgo', href: '/leadership' },
                { label: 'Carreras', href: 'https://opinno.jobs.personio.com/?language=es' },
            ],
            expertise: [
                { label: 'Servicios', href: '/expertise' },
                { label: 'H1 — Inteligencia', href: '/intelligence' },
                { label: 'H2 — Transformación', href: '/transformation' },
                { label: 'H3 — Innovación', href: '/innovation' },
                { label: 'Acceso Clientes', href: '/clients' },
            ],
            stories: [
                { label: 'Todos', href: '/stories' },
                { label: 'Historias de Impacto', href: '/stories/impact' },
                { label: 'Noticias', href: '/stories/news' },
                { label: 'Notas de prensa', href: '/stories/press-releases' },
                { label: 'Prensa', href: '/stories/press' },
            ],
            insights: [
                { label: 'Todos', href: '/insights' },
                { label: 'Insights', href: '/insights/insights' },
                { label: 'Voces', href: '/insights/voices' },
                { label: 'Publicaciones', href: '/insights/publications' },
                { label: 'Conferencias', href: '/insights/conferences' },
            ],
            contact: [
                { label: 'Contacto', href: '/contact' },
                { label: 'Cookies', href: '/cookies' },
                { label: 'Privacidad', href: '/privacy' },
                { label: 'Calidad y Medio Ambiente', href: '/quality-environment' },
                { label: 'Plan de Igualdad', href: '/equality-plan' },
                { label: 'Aviso Legal', href: '/legal-notice' },
                { label: 'Compliance', href: '/compliance' },
            ],
            community: [
                { label: 'Trabajo', href: '/work' },
                { label: 'Eventos', href: '/events' },
            ]
        },
        it: {
            about: [
                { label: 'Chi siamo', href: '/about' },
                { label: 'Modello', href: '/model' },
                { label: 'Consiglio', href: '/senior-expert-council' },
                { label: 'Impatto', href: '/about/impact' },
                { label: 'Leadership', href: '/leadership' },
                { label: 'Lavora con noi', href: 'https://opinno.jobs.personio.com/?language=en' },
            ],
            expertise: [
                { label: 'Servizi', href: '/expertise' },
                { label: 'H1 — Intelligence', href: '/intelligence' },
                { label: 'H2 — Trasformazione', href: '/transformation' },
                { label: 'H3 — Innovazione', href: '/innovation' },
                { label: 'Accesso Clienti', href: '/clients' },
            ],
            stories: [
                { label: 'Tutti', href: '/stories' },
                { label: 'Storie di Impatto', href: '/stories/impact' },
                { label: 'Notizie', href: '/stories/news' },
                { label: 'Comunicati stampa', href: '/stories/press-releases' },
                { label: 'Stampa', href: '/stories/press' },
            ],
            insights: [
                { label: 'Tutti', href: '/insights' },
                { label: 'Insights', href: '/insights/insights' },
                { label: 'Voci', href: '/insights/voices' },
                { label: 'Pubblicazioni', href: '/insights/publications' },
                { label: 'Conferenze', href: '/insights/conferences' },
            ],
            contact: [
                { label: 'Contatti', href: '/contact' },
                { label: 'Cookie', href: '/cookies' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Qualità e Ambiente', href: '/quality-environment' },
                { label: 'Piano di Uguaglianza', href: '/equality-plan' },
                { label: 'Note legali', href: '/legal-notice' },
                { label: 'Conformità', href: '/compliance' },
            ],
            community: [
                { label: 'Lavoro', href: '/work' },
                { label: 'Eventi', href: '/events' },
            ]
        }
    };
    const content = t[lang as keyof typeof t] || t.en;
    return content[type as keyof typeof content] || content.about;
}

// Partner logos data
export const PARTNER_LOGOS = [
    { name: 'MIT Technology Review', src: '/assets/logos/mit-technology-review.svg' },
    { name: 'B Corp', src: '/assets/logos/b-corp.svg' },
    { name: 'Salesforce', src: '/assets/logos/salesforce.svg' },
    { name: 'AWS', src: '/assets/logos/aws.svg' },
    { name: 'Microsoft', src: '/assets/logos/microsoft.svg' },
    { name: 'Workday', src: '/assets/logos/workday.svg' },
    { name: 'Stripe', src: '/assets/logos/stripe.svg' },
]

// Office locations for world map section
export const OFFICE_LOCATIONS = [
    'San Francisco', 'Mexico City', 'Bogota', 'Quito', 'Lima',
    'Buenos Aires', 'Madrid', 'Barcelona', 'Lisbon', 'Milan',
    'Rome', 'Catania', 'Riyadh', 'Dubai',
]

// Leadership team data
export const LEADERSHIP_TEAM = [
    { name: 'Pedro Moneo', role: 'CEO & Founder', image: 'https://opinno.com/wp-content/uploads/2023/11/PMO-936x1024.png' },
    { name: 'Tommaso Canonici', role: 'Founding Partner & Managing Director', image: 'https://opinno.com/wp-content/uploads/2023/11/TCA-936x1024.png' },
    { name: 'Tomás Baylac', role: 'Founding Partner & Chief Financial Officer', image: 'https://opinno.com/wp-content/uploads/2023/11/TBA-936x1024.png' },
    { name: 'Elena Ruiz', role: 'Legal Director', image: 'https://opinno.com/wp-content/uploads/2024/07/Elena-1-899x1024.jpg' },
    { name: 'Javier Iglesias', role: 'Managing Director Opinno Madrid', image: 'https://opinno.com/wp-content/uploads/2023/11/JIG-936x1024.png' },
    { name: 'Beatriz Ferreira', role: 'Managing Director Opinno Portugal & Brazil', image: 'https://opinno.com/wp-content/uploads/2023/11/Bea_ferreira-936x1024.png' },
    { name: 'Alejandro Formanchuk', role: 'Managing Director Opinno Argentina', image: 'https://opinno.com/wp-content/uploads/2023/11/AFO-936x1024.png' },
    { name: 'Rebeca Bárcena', role: 'Director of Strategy & Operations', image: 'https://opinno.com/wp-content/uploads/2023/11/RBA-936x1024.png' },
    { name: 'Manuel Camporro', role: 'Director of Technology & Digital Transformation', image: 'https://opinno.com/wp-content/uploads/2023/11/Manuel_Camporro-936x1024.png' },
    { name: 'Irene Martín', role: 'Director of Marketing & Communications', image: 'https://opinno.com/wp-content/uploads/2023/11/Irene_Martin-scaled-1-878x1024.png' },
    { name: 'Carlos Corominas', role: 'Opinno Research Institute Director', image: 'https://opinno.com/wp-content/uploads/2023/11/Carlos-936x1024.jpg' },
    { name: 'Jorge Nava', role: 'Director of Transformation & Innovation Consulting', image: 'https://opinno.com/wp-content/uploads/2023/11/Jorge_Nava-936x1024.jpg' },
    { name: 'Carolina de Pedro', role: 'People Director', image: 'https://opinno.com/wp-content/uploads/2024/07/carolina-3-919x1024.jpg' },
]
