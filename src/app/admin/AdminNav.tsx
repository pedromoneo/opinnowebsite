'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

export function AdminNav() {
    const { isAdmin } = useAuth()

    return (
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Dashboard</Link>
            <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Content</div>
            <Link href="/admin/posts" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Posts</Link>
            <Link href="/admin/pages" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Pages</Link>
            {isAdmin && (
                <>
                    <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Settings</div>
                    <Link href="/admin/users" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Manage Users</Link>
                    <Link href="/admin/settings" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">Global Settings</Link>
                </>
            )}
        </nav>
    )
}
