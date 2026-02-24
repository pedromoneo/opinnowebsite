'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function VerifyOTP() {
    const { completeOTPLogin, user } = useAuth()
    const router = useRouter()
    const [status, setStatus] = useState('Verifying OTP link...')
    const [isError, setIsError] = useState(false)
    const verifyAttempted = useRef(false)

    const handleVerify = useCallback(async () => {
        // Guard against double execution (React Strict Mode, dependency changes)
        if (verifyAttempted.current) return
        verifyAttempted.current = true

        try {
            const url = window.location.href
            // Let Firebase determine if this is a valid sign-in link
            // instead of fragile apiKey= check
            if (url.includes('oobCode=') || url.includes('apiKey=')) {
                await completeOTPLogin(url)
                setStatus('Successfully verified! Redirecting...')
                router.push('/admin')
            } else {
                setIsError(true)
                setStatus('Invalid or expired link. Please request a new one.')
            }
        } catch (err: any) {
            setIsError(true)
            const message = err?.code === 'auth/invalid-action-code'
                ? 'This link has expired or already been used. Please request a new one.'
                : err?.code === 'auth/invalid-email'
                ? 'Email mismatch. Please use the same browser where you requested the link.'
                : err?.message || 'Verification failed. Please try again.'
            setStatus(message)
        }
    }, [completeOTPLogin, router])

    useEffect(() => {
        if (user) {
            router.push('/admin')
            return
        }

        handleVerify()
    }, [user, router, handleVerify])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-opinno-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-opinno-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2 font-display">Authentication</h1>
                <p className={`mb-6 ${isError ? 'text-red-600' : 'text-gray-600'}`}>{status}</p>
                {isError ? (
                    <a
                        href="/admin"
                        className="inline-block px-6 py-2 bg-opinno-accent text-white rounded-lg font-medium text-sm hover:bg-opinno-accent-hover transition-colors"
                    >
                        Back to Login
                    </a>
                ) : (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-opinno-accent mx-auto"></div>
                )}
            </div>
        </div>
    )
}
