"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const NAV_LINKS_LANG = {
    en: [
        { label: 'About', href: '/about' },
        { label: 'Insights', href: '/insights' },
        { label: 'Expertise', href: '/expertise' },
        { label: 'Stories', href: '/stories' },
        { label: 'Contact', href: '/contact' },
    ],
    es: [
        { label: 'Nosotros', href: '/about' },
        { label: 'Insights', href: '/insights' },
        { label: 'Servicios', href: '/expertise' },
        { label: 'Stories', href: '/stories' },
        { label: 'Contacto', href: '/contact' },
    ],
    it: [
        { label: 'Chi siamo', href: '/about' },
        { label: 'Insights', href: '/insights' },
        { label: 'Servizi', href: '/expertise' },
        { label: 'Storie', href: '/stories' },
        { label: 'Contatti', href: '/contact' },
    ]
}

export default function Navbar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Helper to get path without language prefix
    const getPathWithoutLang = () => {
        const parts = pathname.split('/').filter(Boolean)
        if (['en', 'es', 'it'].includes(parts[0])) {
            return '/' + parts.slice(1).join('/')
        }
        return pathname === '' ? '/' : pathname
    }

    const currentPath = getPathWithoutLang()
    const activeLang = pathname.startsWith('/es') ? 'ES' : pathname.startsWith('/it') ? 'IT' : 'EN'

    const languages = [
        { code: 'EN', path: '/en' + (currentPath === '/' ? '' : currentPath) },
        { code: 'ES', path: '/es' + (currentPath === '/' ? '' : currentPath) },
        { code: 'IT', path: '/it' + (currentPath === '/' ? '' : currentPath) },
    ]

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-white'}`}>
            <div className="section-container flex items-center justify-between h-[72px]">

                {/* Logo */}
                <Link href={`/${activeLang.toLowerCase()}`} className="flex items-center gap-2 shrink-0">
                    <img src="/assets/opinno-logo.svg" alt="Opinno" className="h-[45px] w-auto" />
                </Link>

                {/* Desktop Nav - Center */}
                <nav className="hidden lg:flex items-center gap-8">
                    {NAV_LINKS_LANG[activeLang.toLowerCase() as keyof typeof NAV_LINKS_LANG].map(link => {
                        const href = `/${activeLang.toLowerCase()}${link.href}`
                        return (
                            <Link
                                key={link.href}
                                href={href}
                                className="text-[15px] font-medium text-opinno-primary hover:text-opinno-accent transition-colors tracking-wide"
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Right Side - Language + CTAs */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="flex items-center gap-1 text-sm text-opinno-primary uppercase">
                        {languages.map((lang, i) => (
                            <span key={lang.code} className="flex items-center">
                                <Link
                                    href={lang.path}
                                    className={`hover:text-opinno-accent transition-colors tracking-tight ${lang.code === activeLang ? 'font-bold' : 'font-normal text-opinno-gray'}`}
                                >
                                    {lang.code}
                                </Link>
                                {i < languages.length - 1 && <span className="mx-1 text-opinno-gray">/</span>}
                            </span>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/${activeLang.toLowerCase()}/clients`}
                            className="px-6 py-2 border-2 border-opinno-accent text-opinno-accent text-sm font-bold tracking-wider uppercase hover:bg-opinno-accent hover:text-white transition-all duration-300"
                        >
                            {activeLang === 'ES' ? 'CLIENTES' : activeLang === 'IT' ? 'CLIENTI' : 'CLIENTS'}
                        </Link>
                        <a
                            href={`https://opinno.jobs.personio.com/?language=${activeLang.toLowerCase()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-opinno-accent text-white text-sm font-bold tracking-wider uppercase hover:bg-opinno-accent-hover transition-all duration-300"
                        >
                            {activeLang === 'ES' ? 'TALENTO' : activeLang === 'IT' ? 'TALENTI' : 'TALENT'}
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-opinno-primary p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {
                mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-opinno-border lg:hidden z-40">
                        <div className="section-container py-6 flex flex-col gap-1">
                            {NAV_LINKS_LANG[activeLang.toLowerCase() as keyof typeof NAV_LINKS_LANG].map(link => {
                                const href = `/${activeLang.toLowerCase()}${link.href}`
                                return (
                                    <Link
                                        key={link.href}
                                        href={href}
                                        className="text-lg py-3 border-b border-opinno-border text-opinno-primary font-medium hover:text-opinno-accent transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            })}

                            {/* Language Switcher Mobile */}
                            <div className="flex items-center gap-3 py-4 text-sm uppercase">
                                {languages.map(lang => (
                                    <Link
                                        key={lang.code}
                                        href={lang.path}
                                        className={`hover:text-opinno-accent transition-colors ${lang.code === activeLang ? 'font-bold text-opinno-accent' : 'font-medium text-opinno-gray'}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {lang.code}
                                    </Link>
                                ))}
                            </div>

                            {/* CTA Buttons Mobile */}
                            <div className="flex flex-col gap-3 mt-2">
                                <Link
                                    href={`/${activeLang.toLowerCase()}/clients`}
                                    className="px-6 py-3 border-2 border-opinno-accent text-opinno-accent text-center font-bold tracking-wider uppercase"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {activeLang === 'ES' ? 'CLIENTES' : activeLang === 'IT' ? 'CLIENTI' : 'CLIENTS'}
                                </Link>
                                <a
                                    href={`https://opinno.jobs.personio.com/?language=${activeLang.toLowerCase()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-opinno-accent text-white text-center font-bold tracking-wider uppercase"
                                >
                                    {activeLang === 'ES' ? 'TALENTO' : activeLang === 'IT' ? 'TALENTI' : 'TALENT'}
                                </a>
                            </div>
                        </div>
                    </div>
                )
            }
        </header >
    )
}
