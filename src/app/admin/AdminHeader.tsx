'use client'

import { useAuth } from '@/lib/auth-context'

export function AdminHeader({ sidebarContent = false }: { sidebarContent?: boolean }) {
    const { logout, userData } = useAuth()

    if (sidebarContent) {
        return (
            <div className="p-4 border-t border-gray-700/50">
                <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors font-medium"
                >
                    Sign out
                </button>
            </div>
        )
    }

    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-end px-8 z-10 w-full fixed top-0 left-64" style={{ width: 'calc(100% - 16rem)' }}>
            <div className="flex items-center gap-4">
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
                    <div className="w-9 h-9 rounded-full bg-opinno-accent text-white flex items-center justify-center font-bold shadow-sm">
                        {(userData?.name || userData?.email || 'A')[0].toUpperCase()}
                    </div>
                )}
            </div>
        </header>
    )
}
