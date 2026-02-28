'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
    User,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    isSignInWithEmailLink,
    signInWithEmailLink
} from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

interface ClientData {
    email: string
    name: string
    photoURL: string
    createdAt: string
    lastLoginAt: string
}

interface ClientAuthContextType {
    clientUser: User | null
    clientData: ClientData | null
    loading: boolean
    error: string | null
    loginWithGoogle: () => Promise<void>
    loginWithMagicLink: (email: string) => Promise<void>
    completeMagicLinkLogin: (url: string) => Promise<void>
    logout: () => Promise<void>
    clearError: () => void
}

const ClientAuthContext = createContext<ClientAuthContextType>({} as ClientAuthContextType)

export function ClientAuthProvider({ children }: { children: ReactNode }) {
    const [clientUser, setClientUser] = useState<User | null>(null)
    const [clientData, setClientData] = useState<ClientData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Auto-complete magic link sign-in if URL contains the link
    useEffect(() => {
        if (typeof window === 'undefined') return
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('clientEmailForSignIn')
            if (!email) {
                email = window.prompt('Please provide your email for confirmation')
            }
            if (email) {
                signInWithEmailLink(auth, email, window.location.href)
                    .then(() => {
                        window.localStorage.removeItem('clientEmailForSignIn')
                        window.history.replaceState({}, '', window.location.pathname)
                    })
                    .catch((err) => {
                        console.error('Error completing magic link sign-in:', err)
                        setError('Failed to complete sign-in. The link may have expired.')
                    })
            }
        }
    }, [])

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setClientUser(user)
            setError(null)

            if (user && user.email) {
                const emailId = user.email.toLowerCase()
                try {
                    const clientRef = doc(db, 'clients', emailId)
                    const clientSnap = await getDoc(clientRef)

                    if (clientSnap.exists()) {
                        // Existing client — update last login
                        const data = clientSnap.data() as ClientData
                        await setDoc(clientRef, { lastLoginAt: new Date().toISOString() }, { merge: true })
                        setClientData({ ...data, lastLoginAt: new Date().toISOString() })
                    } else {
                        // New client — create profile
                        const newClient: ClientData = {
                            email: emailId,
                            name: user.displayName || '',
                            photoURL: user.photoURL || '',
                            createdAt: new Date().toISOString(),
                            lastLoginAt: new Date().toISOString(),
                        }
                        await setDoc(clientRef, newClient)
                        setClientData(newClient)
                    }
                } catch (e) {
                    console.error('Error managing client profile:', e)
                }
            } else {
                setClientData(null)
            }
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const loginWithGoogle = async () => {
        setError(null)
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
        } catch (err: any) {
            if (err.code !== 'auth/popup-closed-by-user') {
                setError(err.message || 'Failed to sign in with Google.')
            }
        }
    }

    const loginWithMagicLink = async (email: string) => {
        setError(null)
        const safeEmail = email.toLowerCase().trim()

        try {
            const res = await fetch('/api/client-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: safeEmail }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to send login link.')
            }

            window.localStorage.setItem('clientEmailForSignIn', safeEmail)
        } catch (err: any) {
            setError(err.message || 'Failed to send login link.')
            throw err
        }
    }

    const completeMagicLinkLogin = async (url: string) => {
        if (isSignInWithEmailLink(auth, url)) {
            let email = window.localStorage.getItem('clientEmailForSignIn')
            if (!email) {
                email = window.prompt('Please provide your email for confirmation')
            }
            if (email) {
                await signInWithEmailLink(auth, email, url)
                window.localStorage.removeItem('clientEmailForSignIn')
            }
        }
    }

    const logout = async () => {
        await signOut(auth)
        setClientData(null)
    }

    const clearError = () => setError(null)

    return (
        <ClientAuthContext.Provider value={{
            clientUser,
            clientData,
            loading,
            error,
            loginWithGoogle,
            loginWithMagicLink,
            completeMagicLinkLogin,
            logout,
            clearError,
        }}>
            {children}
        </ClientAuthContext.Provider>
    )
}

export const useClientAuth = () => useContext(ClientAuthContext)
