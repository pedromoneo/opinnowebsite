import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata = {
    title: 'Opinno CMS | Admin Dashboard',
    description: 'Manage Opinno website content.',
}

import { AuthWrapper } from './AuthWrapper'
import { AdminHeader } from './AdminHeader'

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <AuthWrapper>
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-opinno-primary text-white flex flex-col fixed h-full z-20">
                    <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
                        <span className="font-bold font-display text-xl tracking-wide">Opinno CMS</span>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Dashboard</Link>
                        <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Content</div>
                        <Link href="/admin/posts" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Posts</Link>
                        <Link href="/admin/pages" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Pages</Link>
                        <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Settings</div>
                        <Link href="/admin/users" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Manage Users</Link>
                        <Link href="/admin/settings" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Global Settings</Link>
                    </nav>

                    <AdminHeader sidebarContent={true} />
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 flex flex-col min-h-screen bg-gray-50 text-opinno-primary">
                    <AdminHeader />

                    <div className="flex-1 p-8 mt-16 max-w-[1400px] w-full mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </AuthWrapper>
    )
}
