import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata = {
    title: 'Opinno CMS | Admin Dashboard',
    description: 'Manage Opinno website content.',
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-opinno-primary text-white flex flex-col fixed h-full z-20">
                <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
                    <span className="font-bold font-display text-xl tracking-wide">Opinno CMS</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Dashboard</Link>
                    <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Content Content</div>
                    <Link href="/admin/posts" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Posts</Link>
                    <Link href="/admin/pages" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Pages</Link>
                    <Link href="/admin/cases" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Success Cases</Link>
                    <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Settings</div>
                    <Link href="/admin/settings" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Global Settings</Link>
                </nav>

                <div className="p-4 border-t border-gray-700/50">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors font-medium">
                        Sign out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 flex flex-col min-h-screen bg-gray-50 text-opinno-primary">
                <header className="bg-white shadow-sm h-16 flex items-center justify-end px-8 z-10 w-full fixed top-0 left-64" style={{ width: 'calc(100% - 16rem)' }}>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-600">Admin User</span>
                        <div className="w-8 h-8 rounded-full bg-opinno-accent text-white flex items-center justify-center font-bold">A</div>
                    </div>
                </header>

                <div className="flex-1 p-8 mt-16 max-w-[1400px] w-full mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
