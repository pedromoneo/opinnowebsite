'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { AdminHeader } from './AdminHeader'
import { AdminNav } from './AdminNav'

type SidebarContextType = {
    collapsed: boolean
    setCollapsed: (v: boolean) => void
    mobileOpen: boolean
    setMobileOpen: (v: boolean) => void
    isDesktop: boolean
    sidebarWidth: number
}

const SidebarContext = createContext<SidebarContextType>({
    collapsed: false, setCollapsed: () => { },
    mobileOpen: false, setMobileOpen: () => { },
    isDesktop: true, sidebarWidth: 256,
})

export const useSidebar = () => useContext(SidebarContext)

export function AdminShell({ children }: { children: ReactNode }) {
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isDesktop, setIsDesktop] = useState(true)

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    // Close mobile sidebar on resize to desktop
    useEffect(() => {
        if (isDesktop) setMobileOpen(false)
    }, [isDesktop])

    const sidebarW = collapsed ? 64 : 256
    const isExpanded = !collapsed || mobileOpen

    return (
        <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen, isDesktop, sidebarWidth: sidebarW }}>
            <div className="min-h-screen bg-gray-50">
                {/* Mobile overlay */}
                {mobileOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`bg-opinno-primary text-white flex flex-col fixed h-full z-40 transition-all duration-200 ease-in-out
                        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
                    style={{ width: mobileOpen ? 256 : sidebarW }}
                >
                    {/* Logo */}
                    <div className="h-16 px-4 border-b border-gray-700/50 flex items-center justify-between flex-shrink-0 gap-2">
                        {isExpanded ? (
                            <span className="font-bold font-display text-lg tracking-wide whitespace-nowrap overflow-hidden">Opinno CMS</span>
                        ) : (
                            <span className="font-bold font-display text-lg tracking-wide mx-auto">O</span>
                        )}
                        {/* Desktop collapse toggle */}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white hidden lg:flex items-center justify-center flex-shrink-0"
                            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {collapsed ? <polyline points="9 18 15 12 9 6" /> : <polyline points="15 18 9 12 15 6" />}
                            </svg>
                        </button>
                        {/* Mobile close */}
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white lg:hidden flex-shrink-0"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    <AdminNav collapsed={collapsed && !mobileOpen} />
                    <AdminHeader sidebarContent={true} collapsed={collapsed && !mobileOpen} />
                </aside>

                {/* Main Content */}
                <main
                    className="flex flex-col min-h-screen bg-gray-50 text-opinno-primary transition-all duration-200 ease-in-out"
                    style={{ marginLeft: isDesktop ? sidebarW : 0 }}
                >
                    <AdminHeader />
                    <div className="flex-1 p-4 sm:p-6 lg:p-8 mt-16 max-w-[1400px] w-full mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarContext.Provider>
    )
}
