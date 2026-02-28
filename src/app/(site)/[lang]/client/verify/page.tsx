'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function ClientVerifyPage({ params }: { params: Promise<{ lang: string }> }) {
    const router = useRouter()
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
    const [errorMessage, setErrorMessage] = useState('')
    const [lang, setLang] = useState('en')

    useEffect(() => {
        params.then(p => setLang(p.lang || 'en'))
    }, [params])

    useEffect(() => {
        const completeSignIn = async () => {
            const url = window.location.href

            if (!isSignInWithEmailLink(auth, url)) {
                setStatus('error')
                setErrorMessage('Invalid sign-in link.')
                return
            }

            let email = window.localStorage.getItem('clientEmailForSignIn')
            if (!email) {
                email = window.prompt('Please provide your email for confirmation')
            }

            if (!email) {
                setStatus('error')
                setErrorMessage('Email is required to complete sign-in.')
                return
            }

            try {
                await signInWithEmailLink(auth, email, url)
                window.localStorage.removeItem('clientEmailForSignIn')
                setStatus('success')

                // Redirect to clients page after brief delay
                setTimeout(() => {
                    router.push(`/${lang}/clients`)
                }, 1500)
            } catch (err: any) {
                console.error('Verification error:', err)
                setStatus('error')
                setErrorMessage(err.message || 'Failed to verify. The link may have expired.')
            }
        }

        completeSignIn()
    }, [lang, router])

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                {status === 'verifying' && (
                    <>
                        <div className="w-12 h-12 mx-auto mb-6 border-2 border-opinno-accent border-t-transparent rounded-full animate-spin" />
                        <h1 className="text-2xl font-bold font-display text-opinno-primary mb-2">
                            Verifying your sign-in...
                        </h1>
                        <p className="text-opinno-gray">Please wait a moment.</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold font-display text-opinno-primary mb-2">
                            You're signed in!
                        </h1>
                        <p className="text-opinno-gray">Redirecting you now...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold font-display text-opinno-primary mb-2">
                            Sign-in failed
                        </h1>
                        <p className="text-opinno-gray mb-6">{errorMessage}</p>
                        <a
                            href={`/${lang}/clients`}
                            className="inline-block px-6 py-3 bg-opinno-accent text-white font-bold rounded-lg hover:bg-opinno-accent-hover transition-colors"
                        >
                            Try again
                        </a>
                    </>
                )}
            </div>
        </div>
    )
}
