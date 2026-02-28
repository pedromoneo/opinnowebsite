import { ReactNode } from 'react'

export const metadata = {
    title: 'Opinno CMS | Admin Dashboard',
    description: 'Manage Opinno website content.',
}

import { AuthWrapper } from './AuthWrapper'
import { AdminShell } from './AdminShell'

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <AuthWrapper>
            <AdminShell>
                {children}
            </AdminShell>
        </AuthWrapper>
    )
}
