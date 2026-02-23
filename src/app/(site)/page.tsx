import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'

// Services data matching opinno.com
const SERVICES = [
  {
    title: 'Open Innovation',
    description: 'Building new or joining existing ecosystems. Getting value from internal (Intrapreneurship) and external ecosystems (Open Innovation).',
    href: '/open-innovation',
    icon: '🔍',
  },
  {
    title: 'Corporate Transformation',
    description: 'Designing and deploying new ways of working and new processes to build a more agile organization.',
    href: '/corporate-transformation',
    icon: '⚡',
  },
  {
    title: 'Venture Building',
    description: 'Creating a go-to-market strategy and its implementation. From MVP to New Venture.',
    href: '/venture-building',
    icon: '🚀',
  },
  {
    title: 'Technology Solutions',
    description: 'Conceptualization and architectural design, front and back end development, cloud migration, and deployment of teams with a DevOps culture.',
    href: '/technology-solutions',
    icon: '💻',
  },
]

const CENTERS_OF_EXCELLENCE = [
  'Healthcare',
  'Sustainability',
  'Energy & Infrastructures',
  'Public Sector',
  'Retail & Consumer goods',
]

export default async function Home() {
  // Fetch impact stories from Firebase
  let impactStories: any[] = []
  let insights: any[] = []
  let news: any[] = []

  try {
    const contentSnapshot = await getDocs(collection(db, 'content'))
    const allContent = contentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[]

    impactStories = allContent
      .filter(p => p.type === 'case-study' && p.featuredImage && p.featuredImage.startsWith('http'))
      .slice(0, 4)

    insights = allContent
      .filter(p => p.type === 'post' && p.featuredImage && p.featuredImage.startsWith('http'))
      .slice(0, 4)

    news = allContent
      .filter(p => p.type === 'case-study' && p.title && p.title !== 'Stories')
      .slice(0, 4)
  } catch (err) {
    console.error("Failed to fetch content:", err)
  }

  return (
    <div className="flex flex-col w-full">

      {/* ===== HERO SECTION ===== */}
      <section className="section-container pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Side */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] mb-6 tracking-tight">
              WE DELIVER IMPACT<br />THROUGH INNOVATION
            </h1>
            <p className="text-opinno-gray text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-body">
              Opinno is a global innovation consultancy. We transform organizations using methodologies invented by entrepreneurs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/clients" className="btn-primary">
                HIRE US
              </Link>
              <a
                href="https://opinno.jobs.personio.com/?language=en"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                JOIN US
              </a>
            </div>
          </div>

          {/* Video Side */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-[0_2rem_2rem_2rem] overflow-hidden shadow-2xl aspect-video bg-opinno-dark">
              <iframe
                src="https://www.youtube.com/embed/-W5w7jLMat8?rel=0&modestbranding=1"
                title="Delivering Impact Through Innovation"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {/* B Corp Badge */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 lg:-left-12 lg:translate-x-0 lg:bottom-auto lg:top-[60%] w-[130px] h-[160px] bg-opinno-accent rounded-2xl flex flex-col items-center justify-center text-white shadow-xl z-10">
              <span className="text-xs font-medium mb-1">Certified</span>
              <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-1">
                <span className="text-3xl font-bold">B</span>
              </div>
              <span className="text-xs font-medium">Corporation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN SERVICES SECTION ===== */}
      <section className="bg-opinno-light-bg py-20">
        <div className="section-container">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="section-title">MAIN SERVICES</h2>
            <Link
              href="/expertise"
              className="text-opinno-accent font-bold text-sm hover:underline underline-offset-4 tracking-wide"
            >
              View all
            </Link>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map(service => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white p-8 rounded-lg card-hover border border-transparent hover:border-opinno-accent"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-opinno-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-opinno-gray text-sm leading-relaxed font-body">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Centers of Excellence */}
          <div className="mt-12 pt-8 border-t border-opinno-border">
            <h4 className="text-sm font-bold mb-4 text-opinno-gray tracking-wider">Centers of excellence</h4>
            <div className="flex flex-wrap gap-3">
              {CENTERS_OF_EXCELLENCE.map(center => (
                <span
                  key={center}
                  className="px-4 py-2 bg-white border border-opinno-border text-opinno-gray text-sm font-medium rounded hover:border-opinno-accent hover:text-opinno-accent transition-colors cursor-pointer"
                >
                  {center}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPACT STORIES SECTION ===== */}
      <section className="py-20">
        <div className="section-container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="section-title">IMPACT STORIES</h2>
            <Link
              href="/stories?category=impact-stories"
              className="text-opinno-accent font-bold text-sm hover:underline underline-offset-4 tracking-wide"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStories.length === 0 ? (
              <>
                {/* Fallback static stories matching opinno.com */}
                <StoryCard
                  date="May 8, 2024"
                  title="AlUla: the 'jewel that opens up to the world' to become an international benchmark"
                  excerpt="Opinno analyzed trends, crafted strategies, and overcame challenges to transform AlUla into a key tourist destination."
                  image="https://opinno.com/wp-content/uploads/2024/05/image-111-1024x614.png"
                  href="/stories/alula"
                />
                <StoryCard
                  date="January 26, 2024"
                  title="AWS re/Start: the programme of opportunities, skills and new beginnings for the South of Italy"
                  excerpt="On Monday 18 December, Isola hosted the graduation ceremony for 50 girls and boys of re/Start."
                  image="https://opinno.com/wp-content/uploads/2024/01/AWS-header-1024x576.png"
                  href="/stories/aws-restart"
                />
                <StoryCard
                  date="January 22, 2024"
                  title="Transforming the Patient Experience at Hospital Vozandes"
                  excerpt="Hospital Vozandes partnered with Opinno Ecuador to carry out a comprehensive transformation of its Patient Experience Model."
                  image="https://opinno.com/wp-content/uploads/2024/01/Hospital-Vozandes-1024x576.jpg"
                  href="/stories/vozandes"
                />
                <StoryCard
                  date="January 22, 2024"
                  title="Banco Cuscatlán: the road to Open Innovation"
                  excerpt="Promoting digitalization for the growth of Salvadoran SMEs through an Open Innovation program."
                  image="https://opinno.com/wp-content/uploads/2024/01/Banco-Cuscatlan-scaled.jpg"
                  href="/stories/banco-cuscatlan"
                />
              </>
            ) : (
              impactStories.map(story => (
                <StoryCard
                  key={story.id}
                  date={story.publishedAt ? new Date(story.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                  title={story.title}
                  excerpt={story.excerpt?.substring(0, 120) + '...'}
                  image={story.featuredImage}
                  href={`/en/${story.id}`}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK SECTION ===== */}
      <section className="bg-opinno-light-bg py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">HOW WE WORK</h2>
              <p className="text-opinno-gray text-lg leading-relaxed font-body mb-8">
                Open your company up to the digital age. We can connect your business to our network of more than 50,000 innovation, transformation and technology experts, overseen by Opinno-trained and certified project managers.
              </p>
              <Link href="/model" className="btn-primary">
                LEARN MORE
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-10 shadow-lg">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="p-6">
                    <div className="text-4xl font-bold text-opinno-accent mb-2">50K+</div>
                    <div className="text-sm text-opinno-gray font-body">Innovation Experts</div>
                  </div>
                  <div className="p-6">
                    <div className="text-4xl font-bold text-opinno-accent mb-2">11</div>
                    <div className="text-sm text-opinno-gray font-body">Countries</div>
                  </div>
                  <div className="p-6">
                    <div className="text-4xl font-bold text-opinno-accent mb-2">250+</div>
                    <div className="text-sm text-opinno-gray font-body">Consultants</div>
                  </div>
                  <div className="p-6">
                    <div className="text-4xl font-bold text-opinno-accent mb-2">15</div>
                    <div className="text-sm text-opinno-gray font-body">Years of Innovation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INSIGHTS SECTION ===== */}
      <section className="py-20">
        <div className="section-container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="section-title">INSIGHTS</h2>
            <Link
              href="/insights"
              className="text-opinno-accent font-bold text-sm hover:underline underline-offset-4 tracking-wide"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StoryCard
              date="September 18, 2025"
              title="Driving Innovation Through Smart Scouting: Opinno x StartUs Insights"
              excerpt="Driving Innovation Through Smart Scouting: Opinno x StartUs Insights"
              image="https://opinno.com/wp-content/uploads/2025/09/Image-6-1.jpeg"
              href="/insights/smart-scouting"
            />
            <StoryCard
              date="March 14, 2024"
              title="The AI paradox: how fake news can restore trust in the traditional media"
              excerpt="The very crisis of confidence in digital content is fostering a renewed trust in traditional media."
              image="https://opinno.com/wp-content/uploads/2024/03/1710410843388-1024x768.jpeg"
              href="/insights/ai-paradox"
            />
            <StoryCard
              date="February 7, 2024"
              title="Impact Report 2024"
              excerpt="In this report, we present the fruits of the Impact Model we have developed for our clients, for industry and for society."
              image="https://opinno.com/wp-content/uploads/2024/02/impact-report-2024-1024x576.png"
              href="/insights/impact-report-2024"
            />
            <StoryCard
              date="December 22, 2023"
              title={`"We must stop fearing technology and think about how it adds value to citizens"`}
              excerpt="Xerox has undergone a radical transformation in recent years: from being focused on the paper printing business to becoming a software company."
              image="https://opinno.com/wp-content/uploads/2023/12/Xerox-header-1024x768.jpg"
              href="/insights/xerox"
            />
          </div>
        </div>
      </section>

      {/* ===== NEWS SECTION ===== */}
      <section className="bg-opinno-light-bg py-20">
        <div className="section-container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="section-title">NEWS</h2>
            <Link
              href="/stories?category=news"
              className="text-opinno-accent font-bold text-sm hover:underline underline-offset-4 tracking-wide"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StoryCard
              date="December 11, 2023"
              title="Venture Building: how not to die trying"
              excerpt="Why do some companies fail at doing Venture Building and what can we do to avoid the same fate?"
              image="https://opinno.com/wp-content/uploads/2023/12/venture-building-1024x576.jpg"
              href="/stories/venture-building-how-not-to-die"
            />
            <StoryCard
              date="November 22, 2023"
              title="Olá, Portugal!"
              excerpt="Opinno has expanded its international presence by establishing operations in Portugal."
              image="https://opinno.com/wp-content/uploads/2023/11/Portugal-1024x576.jpg"
              href="/stories/ola-portugal"
            />
            <StoryCard
              date="October 31, 2023"
              title="Celebrating 15 years of innovation"
              excerpt="At Opinno we are proudly celebrating our 15th anniversary, marking significant milestones in our international expansion."
              image="https://opinno.com/wp-content/uploads/2023/10/15-years-1024x576.jpg"
              href="/stories/15-years"
            />
            <StoryCard
              date="September 25, 2023"
              title="Opinno Expands Editorial Horizons as Official Editors of MIT Technology Review Italia"
              excerpt="Leading this publication as Editor in Chief is Francesco Pontorno, Growth Director of Opinno Italy."
              image="https://opinno.com/wp-content/uploads/2023/10/MIT-TR-Italia-1024x576.jpg"
              href="/stories/mit-tr-italia"
            />
          </div>
        </div>
      </section>

      {/* ===== JOIN OUR COMMUNITY SECTION ===== */}
      <section className="py-20">
        <div className="section-container text-center">
          <h2 className="section-title mb-4">JOIN OUR COMMUNITY OF INNOVATORS</h2>
          <p className="text-opinno-gray text-lg font-body mb-10 max-w-2xl mx-auto">
            Participate in our community projects, events, competitions and courses.
          </p>
          <Link href="/community" className="btn-primary mb-16">
            LEARN MORE
          </Link>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <CommunityCard icon="💼" number="Jobs" label="We are hiring!" href="/work" />
            <CommunityCard icon="📅" number="169" label="Events" href="/events" />
            <CommunityCard icon="🏆" number="31" label="Challenges" href="/challenges" />
            <CommunityCard icon="📚" number="225" label="Courses" href="/academy" />
          </div>
        </div>
      </section>

      {/* ===== CONTACT / GET IN TOUCH SECTION ===== */}
      <section className="bg-opinno-light-bg py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-title mb-4">Get in touch</h2>
            <p className="text-opinno-gray text-lg font-body mb-10">
              We would love to know about you and help you innovate!
            </p>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Name *"
                    className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent font-body"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent font-body"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent font-body"
                />
                <textarea
                  rows={4}
                  placeholder="Message *"
                  className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent resize-none font-body"
                />
                <button type="submit" className="btn-primary self-center mt-2">
                  SEND
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

// ===== REUSABLE COMPONENTS =====

function StoryCard({ date, title, excerpt, image, href }: {
  date: string
  title: string
  excerpt: string
  image: string
  href: string
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative h-[220px] rounded-lg overflow-hidden mb-4 bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="text-xs text-opinno-gray font-body mb-2">{date}</div>
      <h3 className="text-base font-bold leading-snug mb-2 group-hover:text-opinno-accent transition-colors line-clamp-3">
        {title}
      </h3>
      <p className="text-sm text-opinno-gray font-body leading-relaxed line-clamp-2">
        {excerpt}
      </p>
    </Link>
  )
}

function CommunityCard({ icon, number, label, href }: {
  icon: string
  number: string
  label: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group bg-opinno-light-bg border border-opinno-border rounded-xl p-8 text-center card-hover hover:border-opinno-accent"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-2xl font-bold text-opinno-accent mb-1">{number}</div>
      <div className="text-sm text-opinno-gray font-body">{label}</div>
    </Link>
  )
}
