'use client'

import { useEffect, useState, FormEvent } from 'react'
import { collection, query, orderBy, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/lib/auth-context'

export default function ManageUsers() {
    const { isAdmin } = useAuth()
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [inviting, setInviting] = useState(false)

    // Form states
    const [inviteEmail, setInviteEmail] = useState('')
    const [inviteRole, setInviteRole] = useState('editor')

    const fetchUsers = async () => {
        try {
            const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
            const snapshot = await getDocs(q)
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setUsers(list)
        } catch (err) {
            console.error("Error fetching users:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isAdmin) {
            fetchUsers()
        } else {
            setLoading(false)
        }
    }, [isAdmin])

    const handleInviteUser = async (e: FormEvent) => {
        e.preventDefault()
        if (!inviteEmail) return
        setInviting(true)

        try {
            const safeEmail = inviteEmail.toLowerCase().trim()

            // 1. Create the user DB record directly
            const newUserData = {
                email: safeEmail,
                role: inviteRole,
                status: 'invited',
                createdAt: new Date().toISOString()
            }

            await setDoc(doc(db, 'users', safeEmail), newUserData, { merge: true })

            // 2. Trigger the Resend email API endpoint
            const res = await fetch('/api/invite-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: safeEmail,
                    role: inviteRole,
                    hostUrl: window.location.origin
                })
            })

            if (!res.ok) {
                const { error } = await res.json()
                // Just log it or notify, but user is still in DB
                alert(`Warning: The user was granted access but the invite email failed to send: ${error}`)
            } else {
                alert(`Successfully invited ${safeEmail}`)
            }

            setInviteEmail('')
            setInviteRole('editor')
            fetchUsers()

        } catch (err: any) {
            alert(`Error inviting user: ${err.message}`)
        } finally {
            setInviting(false)
        }
    }

    const updateUserRole = async (emailId: string, newRole: string) => {
        try {
            await setDoc(doc(db, 'users', emailId), { role: newRole }, { merge: true })
            setUsers(users.map(u => u.email === emailId ? { ...u, role: newRole } : u))
        } catch (err: any) {
            alert(`Error updating user: ${err.message}`)
        }
    }

    const deleteUserRecord = async (emailId: string) => {
        if (!confirm("Are you sure you want to remove this user's access completely?")) return
        try {
            await deleteDoc(doc(db, 'users', emailId))
            setUsers(users.filter(u => u.email !== emailId))
        } catch (err: any) {
            alert(`Error deleting user: ${err.message}`)
        }
    }

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
                <svg className="w-16 h-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h1 className="text-2xl font-bold font-display text-gray-900">Access Denied</h1>
                <p className="text-gray-500 mt-2">Only administrators can manage user roles.</p>
                <div className="mt-4 p-4 bg-gray-100 rounded text-sm text-gray-600">
                    <p>Current Email: {useAuth().user?.email || 'N/A'}</p>
                    <p>Current Role: {useAuth().userData?.role || 'N/A'}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 flex-1 w-full mx-auto max-w-5xl">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-opinno-primary tracking-tight">Manage Users</h1>
                    <p className="text-gray-500 mt-1">Invite new members using Resend and manage access levels.</p>
                </div>
            </header>

            {/* Invite Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Invite New User</h2>
                <form onSubmit={handleInviteUser} className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="colleague@opinno.com"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                        />
                    </div>
                    <div className="w-48">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                        <select
                            value={inviteRole}
                            onChange={(e) => setInviteRole(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none bg-white"
                        >
                            <option value="editor">Editor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={inviting || !inviteEmail}
                        className="px-6 py-2 bg-opinno-accent text-white rounded-lg font-medium hover:bg-opinno-accent-hover transition-colors shadow-sm disabled:opacity-50"
                    >
                        {inviting ? 'Sending...' : 'Send Invite'}
                    </button>
                </form>
            </div>

            {/* User List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status & Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invited/Joined</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">Loading users...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No users found.</td>
                                </tr>
                            ) : users.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {u.photoURL ? (
                                                <img src={u.photoURL} alt="" className="h-8 w-8 rounded-full mr-3 object-cover" referrerPolicy="no-referrer" />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-opinno-accent text-white flex items-center justify-center font-bold mr-3">
                                                    {(u.name || u.email || 'U')[0].toUpperCase()}
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{u.name || 'Invited User'}</span>
                                                <span className="text-sm text-gray-500">{u.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${u.status === 'invited' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                {u.status === 'invited' ? 'Pending Acceptance' : 'Active'}
                                            </span>
                                            <select
                                                value={u.role}
                                                onChange={(e) => updateUserRole(u.email, e.target.value)}
                                                disabled={u.email === 'pedro.moneo@gmail.com'}
                                                className="text-sm border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none focus:border-opinno-accent"
                                            >
                                                <option value="editor">Editor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-3">
                                            {u.status === 'invited' && (
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            const res = await fetch('/api/invite-user', {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ email: u.email, role: u.role, hostUrl: window.location.origin })
                                                            })
                                                            if (!res.ok) alert(`Error sending: ${(await res.json()).error}`)
                                                            else alert(`Invite resent to ${u.email}`)
                                                        } catch (e: any) {
                                                            alert(`Error: ${e.message}`)
                                                        }
                                                    }}
                                                    className="text-opinno-accent hover:text-opinno-accent-hover"
                                                >
                                                    Resend Invite
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteUserRecord(u.email)}
                                                className="text-red-600 hover:text-red-900 disabled:opacity-30 disabled:hover:text-red-600"
                                                disabled={u.email === 'pedro.moneo@gmail.com'}
                                            >
                                                Revoke Access
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
