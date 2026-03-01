import { STATIC_PAGE_SLUGS } from '@/lib/static-pages'

// About pages
import AboutOverviewPage from '@/components/pages/about/OverviewPage'
import ModelPage from '@/components/pages/about/ModelPage'
import CouncilPage from '@/components/pages/about/CouncilPage'
import ImpactPage from '@/components/pages/about/ImpactPage'
import LeadershipPage from '@/components/pages/about/LeadershipPage'

// Expertise pages
import ExpertisePage from '@/components/pages/expertise/ExpertisePage'
import IntelligencePage from '@/components/pages/expertise/IntelligencePage'
import TransformationPage from '@/components/pages/expertise/TransformationPage'
import InnovationPage from '@/components/pages/expertise/InnovationPage'
import ClientsPage from '@/components/pages/expertise/ClientsPage'

// Stories pages
import StoriesPage from '@/components/pages/stories/StoriesPage'
import PressPage from '@/components/pages/stories/PressPage'

// Insights pages
import InsightsPage from '@/components/pages/insights/InsightsPage'

// Contact pages
import ContactPage from '@/components/pages/contact/ContactPage'
import CookiesPage from '@/components/pages/contact/CookiesPage'
import PrivacyPage from '@/components/pages/contact/PrivacyPage'
import LegalNoticePage from '@/components/pages/contact/LegalNoticePage'
import CompliancePage from '@/components/pages/contact/CompliancePage'

// Community pages
import CommunityPage from '@/components/pages/community/CommunityPage'

export function isStaticPage(slugPath: string): boolean {
    return STATIC_PAGE_SLUGS.has(slugPath)
}

export function getStaticPageComponent(slugPath: string, lang: string): React.ReactNode | null {
    const props = { lang }

    switch (slugPath) {
        // About section
        case 'about': return <AboutOverviewPage {...props} />
        case 'model': return <ModelPage {...props} />
        case 'senior-expert-council': return <CouncilPage {...props} />
        case 'about/impact': return <ImpactPage {...props} />
        case 'leadership': return <LeadershipPage {...props} />

        // Expertise section
        case 'expertise': return <ExpertisePage {...props} />
        case 'intelligence': return <IntelligencePage {...props} />
        case 'transformation': return <TransformationPage {...props} />
        case 'innovation': return <InnovationPage {...props} />
        case 'clients': return <ClientsPage {...props} />

        // Stories section
        case 'stories':
        case 'stories/impact':
        case 'stories/news':
        case 'stories/press-releases':
            return <StoriesPage {...props} category={slugPath === 'stories' ? 'all' : slugPath.split('/')[1]} />
        case 'stories/press':
            return <PressPage {...props} />

        // Insights section
        case 'insights':
        case 'insights/insights':
        case 'insights/voices':
        case 'insights/publications':
        case 'insights/conferences':
            return <InsightsPage {...props} category={slugPath === 'insights' ? 'all' : slugPath.split('/')[1]} />

        // Contact/Legal section
        case 'contact': return <ContactPage {...props} />
        case 'cookies': return <CookiesPage {...props} />
        case 'privacy': return <PrivacyPage {...props} />
        case 'legal-notice': return <LegalNoticePage {...props} />
        case 'compliance': return <CompliancePage {...props} />
        case 'quality-environment': return <CompliancePage {...props} />
        case 'equality-plan': return <CompliancePage {...props} />

        // Community section
        case 'work':
        case 'events':
        case 'challenges':
        case 'academy':
            return <CommunityPage {...props} section={slugPath} />

        default: return null
    }
}
