'use client'

import { ReactNode, useState } from 'react'
import { AuthProvider, useAuth } from '@/lib/auth-context'

function AuthCheck({ children }: { children: ReactNode }) {
    const { user, userData, loading, authError, loginWithGoogle } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-opinno-accent"></div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold font-display text-opinno-primary">Opinno CMS</h2>
                        <p className="text-gray-500 mt-2">Sign in to manage content</p>

                        {authError ? (
                            <p className="text-sm text-red-600 mt-4 font-medium bg-red-50 border border-red-200 p-3 rounded-lg shadow-sm">
                                {authError}
                            </p>
                        ) : (
                            <p className="text-xs text-opinno-primary mt-4 font-medium bg-gray-100 p-2 rounded">
                                Only authorized users will be able to log in. Contact your administrator for an invite.
                            </p>
                        )}
                    </div>

                    <button
                        onClick={loginWithGoogle}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign in with Google
                    </button>

                    <div className="relative mt-8 mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with Email Link (OTP)</span>
                        </div>
                    </div>

                    <AuthOTPForm />
                </div>
            </div>
        )
    }

    if (userData?.role === 'pending_editor') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                    <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="text-2xl font-bold font-display text-gray-900 mb-2">Account Pending Review</h2>
                    <p className="text-gray-600">Your account needs to be approved by an administrator before you can access the CMS.</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}

function AuthOTPForm() {
    const { loginWithOTP } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [sent, setSent] = useState(false)

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                setError(null)
                setLoading(true)
                const data = new FormData(e.currentTarget)
                const email = data.get('email') as string
                try {
                    await loginWithOTP(email)
                    setSent(true)
                } catch (err: any) {
                    setError(err.message)
                } finally {
                    setLoading(false)
                }
            }}
            className="flex flex-col gap-3"
        >
            {sent ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-2">
                    Check your email! We've sent a secure OTP link to your inbox.
                </div>
            ) : (
                <>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs font-medium">
                            {error}
                        </div>
                    )}
                    <input
                        name="email"
                        type="email"
                        placeholder="pedro@opinno.com"
                        required
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none transition-all disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-opinno-accent hover:bg-opinno-accent-hover text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Sending...
                            </>
                        ) : 'Sign in with OTP'}
                    </button>
                </>
            )}
        </form>
    )
}

export function AuthWrapper({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <AuthCheck>
                {children}
            </AuthCheck>
        </AuthProvider>
    )
}
