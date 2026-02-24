'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
    User,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink
} from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// Define our specific admin emails
const ADMIN_EMAILS = ['pedro.moneo@gmail.com']

interface AuthContextType {
    user: User | null
    userData: any | null
    loading: boolean
    authError: string | null
    isAdmin: boolean
    isEditor: boolean
    loginWithGoogle: () => Promise<void>
    loginWithOTP: (email: string) => Promise<void>
    completeOTPLogin: (url: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    const [authError, setAuthError] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user)
            setAuthError(null)

            if (user && user.email) {
                const userEmailId = user.email.toLowerCase()
                try {
                    const userRef = doc(db, 'users', userEmailId)
                    const userSnap = await getDoc(userRef)

                    const isSuperAdmin = ADMIN_EMAILS.includes(userEmailId)

                    if (userSnap.exists()) {
                        // User exists in our system (either active or invited)
                        const data = userSnap.data()

                        // Update the record if logging in for the first time or if info changed
                        const updateData: any = {}
                        if (data.status === 'invited' || !data.uid) {
                            updateData.uid = user.uid
                            updateData.status = 'active'
                        }
                        if (isSuperAdmin && data.role !== 'admin') {
                            updateData.role = 'admin'
                        }
                        // Optionally update name/photo if missing
                        if (!data.name && user.displayName) updateData.name = user.displayName
                        if (!data.photoURL && user.photoURL) updateData.photoURL = user.photoURL

                        if (Object.keys(updateData).length > 0) {
                            await setDoc(userRef, updateData, { merge: true })
                            setUserData({ ...data, ...updateData })
                        } else {
                            setUserData(data)
                        }
                    } else if (isSuperAdmin) {
                        // Create super admin profile if it doesnt exist
                        const newUserData = {
                            email: userEmailId,
                            uid: user.uid,
                            name: user.displayName || '',
                            photoURL: user.photoURL || '',
                            role: 'admin',
                            status: 'active',
                            createdAt: new Date().toISOString()
                        }
                        await setDoc(userRef, newUserData)
                        setUserData(newUserData)
                    } else {
                        // Uninvited user -> immediate rejection
                        setAuthError('You have not been invited to access this system. Please contact your administrator.')
                        await signOut(auth)
                        setUser(null)
                        setUserData(null)
                    }
                } catch (e) {
                    console.error("Error fetching user data", e)
                }
            } else {
                setUserData(null)
            }
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
    }

    const loginWithOTP = async (email: string) => {
        const res = await fetch('/api/login-link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                hostUrl: window.location.origin
            })
        })

        if (!res.ok) {
            const err = await res.json()
            throw new Error(err.details || err.error || 'Failed to send login link')
        }

        window.localStorage.setItem('emailForSignIn', email)
    }

    const completeOTPLogin = async (url: string) => {
        if (isSignInWithEmailLink(auth, url)) {
            let email = window.localStorage.getItem('emailForSignIn')
            if (!email) {
                email = window.prompt('Please provide your email for confirmation')
            }
            if (email) {
                await signInWithEmailLink(auth, email, url)
                window.localStorage.removeItem('emailForSignIn')
            }
        }
    }

    const logout = async () => {
        await signOut(auth)
    }

    const isAdmin = userData?.role === 'admin'
    const isEditor = userData?.role === 'admin' || userData?.role === 'editor'

    return (
        <AuthContext.Provider value={{
            user,
            userData,
            loading,
            authError,
            isAdmin,
            isEditor,
            loginWithGoogle,
            loginWithOTP,
            completeOTPLogin,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
