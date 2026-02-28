'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
    )},
]

const contentItems = [
    { href: '/admin/posts', label: 'Posts', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
        </svg>
    )},
    { href: '/admin/pages', label: 'Pages', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16v16H4z" /><path d="M9 4v16" /><path d="M4 9h5" /><path d="M4 14h5" />
        </svg>
    )},
]

const settingsItems = [
    { href: '/admin/users', label: 'Manage Users', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )},
    { href: '/admin/settings', label: 'Global Settings', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    )},
]

function NavLink({ href, label, icon, collapsed }: { href: string; label: string; icon: React.ReactNode; collapsed: boolean }) {
    const pathname = usePathname()
    const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-lg transition-colors font-medium
                ${collapsed ? 'px-0 py-2.5 justify-center' : 'px-4 py-2.5'}
                ${isActive ? 'bg-white/15 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}
            `}
            title={collapsed ? label : undefined}
        >
            <span className="flex-shrink-0">{icon}</span>
            {!collapsed && <span className="truncate text-sm">{label}</span>}
        </Link>
    )
}

export function AdminNav({ collapsed = false }: { collapsed?: boolean }) {
    const { isAdmin } = useAuth()

    return (
        <nav className={`flex-1 py-4 space-y-1 overflow-y-auto ${collapsed ? 'px-2' : 'px-3'}`}>
            {navItems.map(item => (
                <NavLink key={item.href} {...item} collapsed={collapsed} />
            ))}

            {!collapsed && <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Content</div>}
            {collapsed && <div className="pt-3 pb-1 border-t border-gray-700/50 mt-2" />}
            {contentItems.map(item => (
                <NavLink key={item.href} {...item} collapsed={collapsed} />
            ))}

            {isAdmin && (
                <>
                    {!collapsed && <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Settings</div>}
                    {collapsed && <div className="pt-3 pb-1 border-t border-gray-700/50 mt-2" />}
                    {settingsItems.map(item => (
                        <NavLink key={item.href} {...item} collapsed={collapsed} />
                    ))}
                </>
            )}
        </nav>
    )
}
