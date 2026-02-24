'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function VerifyOTP() {
    const { completeOTPLogin, user } = useAuth()
    const router = useRouter()
    const [status, setStatus] = useState('Verifying OTP link...')

    useEffect(() => {
        if (user) {
            router.push('/admin')
            return
        }

        const handleVerify = async () => {
            try {
                if (window.location.href.includes('apiKey=')) {
                    await completeOTPLogin(window.location.href)
                    setStatus('Successfully verified! Redirecting...')
                    router.push('/admin')
                } else {
                    setStatus('Invalid link or already verified.')
                }
            } catch (err: any) {
                setStatus(`Error: ${err.message}`)
            }
        }

        handleVerify()
    }, [completeOTPLogin, user, router])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-opinno-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-opinno-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2 font-display">Authentication</h1>
                <p className="text-gray-600 mb-6">{status}</p>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-opinno-accent mx-auto"></div>
            </div>
        </div>
    )
}
