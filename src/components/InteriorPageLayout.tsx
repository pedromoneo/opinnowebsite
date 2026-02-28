'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarLink {
    label: string
    href: string
    children?: { label: string; href: string }[]
}

interface InteriorPageLayoutProps {
    breadcrumb: string
    title: string
    sidebar: SidebarLink[]
    children: React.ReactNode
}

export default function InteriorPageLayout({ breadcrumb, title, sidebar, children }: InteriorPageLayoutProps) {
    const pathname = usePathname()
    const activeLangPrefix = pathname.match(/^\/(es|it)/)?.[0] || ''

    // Remove locale prefix for comparison
    const cleanPath = pathname.replace(/^\/(en|es|it)/, '') || '/'

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="bg-opinno-light-bg py-12 md:py-16 border-b border-opinno-border">
                <div className="section-container">
                    <p className="text-sm text-opinno-gray font-body mb-2">{breadcrumb}</p>
                    <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight">{title}</h1>
                </div>
            </section>

            {/* Two-column body */}
            <section className="bg-opinno-light-bg min-h-[60vh]">
                <div className="section-container py-12 md:py-16">
                    <div className="flex flex-col md:flex-row gap-12 md:gap-16">
                        {/* Sidebar — horizontal scrolling tabs on mobile, vertical on desktop */}
                        <nav className="w-full md:w-[220px] flex-shrink-0">
                            {/* Mobile: horizontal scrolling tabs */}
                            <div className="md:hidden overflow-x-auto -mx-6 px-6 scrollbar-hide">
                                <div className="flex gap-2 pb-3 min-w-max">
                                    {sidebar.map(item => {
                                        const localizedHref = item.href.startsWith('http') ? item.href : `${activeLangPrefix}${item.href}`
                                        const isActive = cleanPath === item.href || cleanPath === item.href + '/'
                                        const hasActiveChild = item.children?.some(child =>
                                            cleanPath === child.href || cleanPath === child.href + '/'
                                        )
                                        return (
                                            <Link
                                                key={item.href}
                                                href={localizedHref}
                                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${isActive || hasActiveChild
                                                    ? 'bg-opinno-primary text-white border-opinno-primary'
                                                    : 'text-opinno-gray border-gray-200 hover:border-opinno-primary hover:text-opinno-primary'
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                            {/* Desktop: vertical sidebar */}
                            <ul className="hidden md:block space-y-1">
                                {sidebar.map(item => {
                                    const localizedHref = item.href.startsWith('http') ? item.href : `${activeLangPrefix}${item.href}`
                                    const isActive = cleanPath === item.href || cleanPath === item.href + '/'
                                    const hasActiveChild = item.children?.some(child =>
                                        cleanPath === child.href || cleanPath === child.href + '/'
                                    )
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={localizedHref}
                                                className={`block py-2 text-sm transition-colors ${isActive || hasActiveChild
                                                    ? 'font-bold text-opinno-primary'
                                                    : 'text-opinno-gray hover:text-opinno-primary'
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                            {item.children && (
                                                <ul className="ml-6 space-y-1">
                                                    {item.children.map(child => {
                                                        const localizedChildHref = child.href.startsWith('http') ? child.href : `${activeLangPrefix}${child.href}`
                                                        const childActive = cleanPath === child.href || cleanPath === child.href + '/'
                                                        return (
                                                            <li key={child.href}>
                                                                <Link
                                                                    href={localizedChildHref}
                                                                    className={`block py-1.5 text-sm transition-colors ${childActive
                                                                        ? 'font-bold text-opinno-accent'
                                                                        : 'text-opinno-gray hover:text-opinno-accent'
                                                                        }`}
                                                                >
                                                                    {child.label}
                                                                </Link>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
