import { ReactNode } from 'react'

export const metadata = {
    title: 'Opinno CMS | Admin Dashboard',
    description: 'Manage Opinno website content.',
}

import { AuthWrapper } from './AuthWrapper'
import { AdminHeader } from './AdminHeader'
import { AdminNav } from './AdminNav'

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <AuthWrapper>
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-opinno-primary text-white flex flex-col fixed h-full z-20">
                    <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
                        <span className="font-bold font-display text-xl tracking-wide">Opinno CMS</span>
                    </div>

                    <AdminNav />

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
