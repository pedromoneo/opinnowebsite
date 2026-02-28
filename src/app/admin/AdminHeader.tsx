'use client'

import { useAuth } from '@/lib/auth-context'
import { useSidebar } from './AdminShell'

export function AdminHeader({ sidebarContent = false, collapsed = false }: { sidebarContent?: boolean; collapsed?: boolean }) {
    const { logout, userData } = useAuth()
    const { setMobileOpen, isDesktop, sidebarWidth } = useSidebar()

    if (sidebarContent) {
        return (
            <div className="p-3 border-t border-gray-700/50 flex-shrink-0">
                <button
                    onClick={logout}
                    className={`w-full flex items-center gap-3 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors font-medium
                        ${collapsed ? 'px-0 py-2 justify-center' : 'px-4 py-2'}
                    `}
                    title={collapsed ? 'Sign out' : undefined}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    {!collapsed && <span>Sign out</span>}
                </button>
            </div>
        )
    }

    return (
        <header
            className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 fixed top-0 transition-all duration-200 ease-in-out"
            style={{
                left: isDesktop ? sidebarWidth : 0,
                width: isDesktop ? `calc(100% - ${sidebarWidth}px)` : '100%',
            }}
        >
            {/* Mobile hamburger */}
            <button
                onClick={() => setMobileOpen(true)}
                className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>

            <div className="lg:hidden font-bold font-display text-lg text-opinno-primary">Opinno CMS</div>

            {/* Spacer on desktop */}
            <div className="hidden lg:block" />

            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900">{userData?.name || userData?.email?.split('@')[0] || 'Admin User'}</span>
                    <span className="text-xs text-gray-500 capitalize">{userData?.role || 'admin'}</span>
                </div>
                {userData?.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={userData.photoURL}
                        alt="Profile"
                        className="w-9 h-9 rounded-full ring-2 ring-opinno-accent/20 object-cover"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-opinno-accent text-white flex items-center justify-center font-bold shadow-sm text-sm">
                        {(userData?.name || userData?.email || 'A')[0].toUpperCase()}
                    </div>
                )}
            </div>
        </header>
    )
}
