'use client'

import { useState } from 'react'
import { useClientAuth } from '@/lib/client-auth-context'

interface DownloadReportButtonProps {
    postId: string
    postTitle: string
    lang: string
}

export default function DownloadReportButton({ postId, postTitle, lang }: DownloadReportButtonProps) {
    const { clientUser, clientData, loginWithGoogle, loginWithMagicLink, clearError, error } = useClientAuth()
    const [showLogin, setShowLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [linkSent, setLinkSent] = useState(false)
    const [sending, setSending] = useState(false)
    const [sendingReport, setSendingReport] = useState(false)
    const [reportSent, setReportSent] = useState(false)

    const t = {
        en: {
            download: 'Download the report',
            loginFirst: 'Sign in to download',
            googleBtn: 'Continue with Google',
            or: 'or',
            emailPlaceholder: 'your@email.com',
            sendLink: 'Send magic link',
            sending: 'Sending...',
            linkSentTitle: 'Check your email',
            linkSentDesc: 'We sent a sign-in link to',
            sendingReport: 'Sending report to your email...',
            reportSent: 'Report sent! Check your inbox.',
            reportError: 'Failed to send report. Please try again.',
        },
        es: {
            download: 'Descargar el informe',
            loginFirst: 'Inicia sesión para descargar',
            googleBtn: 'Continuar con Google',
            or: 'o',
            emailPlaceholder: 'tu@email.com',
            sendLink: 'Enviar enlace',
            sending: 'Enviando...',
            linkSentTitle: 'Revisa tu correo',
            linkSentDesc: 'Enviamos un enlace a',
            sendingReport: 'Enviando informe a tu correo...',
            reportSent: 'Informe enviado. Revisa tu bandeja.',
            reportError: 'Error al enviar. Inténtalo de nuevo.',
        },
        it: {
            download: 'Scarica il report',
            loginFirst: 'Accedi per scaricare',
            googleBtn: 'Continua con Google',
            or: 'o',
            emailPlaceholder: 'tua@email.com',
            sendLink: 'Invia link',
            sending: 'Invio...',
            linkSentTitle: 'Controlla la email',
            linkSentDesc: 'Abbiamo inviato un link a',
            sendingReport: 'Invio del report alla tua email...',
            reportSent: 'Report inviato! Controlla la posta.',
            reportError: 'Invio fallito. Riprova.',
        },
    }

    const text = t[lang as keyof typeof t] || t.en

    const handleSendReport = async () => {
        if (!clientUser?.email) return
        setSendingReport(true)
        try {
            const res = await fetch('/api/send-publication', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: clientUser.email, postId }),
            })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to send')
            }
            setReportSent(true)
        } catch (err) {
            console.error('Error sending report:', err)
            alert(text.reportError)
        } finally {
            setSendingReport(false)
        }
    }

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim()) return
        setSending(true)
        try {
            await loginWithMagicLink(email)
            setLinkSent(true)
        } catch {
            // error handled in context
        } finally {
            setSending(false)
        }
    }

    // Report already sent
    if (reportSent) {
        return (
            <div className="mt-10 p-6 bg-green-50 border border-green-200 rounded-xl text-center">
                <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-700 font-semibold">{text.reportSent}</p>
            </div>
        )
    }

    // Logged in — show download button
    if (clientUser) {
        return (
            <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <button
                    onClick={handleSendReport}
                    disabled={sendingReport}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-opinno-accent text-white font-bold rounded-lg hover:bg-opinno-accent-hover transition-colors disabled:opacity-50"
                >
                    {sendingReport ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {text.sendingReport}
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {text.download}
                        </>
                    )}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                    {lang === 'es' ? `Se enviará a ${clientUser.email}` : lang === 'it' ? `Verrà inviato a ${clientUser.email}` : `Will be sent to ${clientUser.email}`}
                </p>
            </div>
        )
    }

    // Not logged in — show login inline or button to expand
    if (!showLogin) {
        return (
            <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <button
                    onClick={() => setShowLogin(true)}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-opinno-accent text-white font-bold rounded-lg hover:bg-opinno-accent-hover transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {text.download}
                </button>
            </div>
        )
    }

    // Magic link sent
    if (linkSent) {
        return (
            <div className="mt-10 p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <h3 className="font-bold text-opinno-primary mb-1">{text.linkSentTitle}</h3>
                <p className="text-sm text-opinno-gray">{text.linkSentDesc} <strong>{email}</strong></p>
            </div>
        )
    }

    // Inline login form
    return (
        <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
            <h3 className="font-bold text-opinno-primary mb-1 text-center">{text.loginFirst}</h3>
            <p className="text-sm text-opinno-gray mb-4 text-center">
                {lang === 'es' ? 'Regístrate gratis para recibir el informe por correo.' : lang === 'it' ? 'Registrati gratis per ricevere il report via email.' : 'Sign up for free to receive the report by email.'}
            </p>

            {error && (
                <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm text-center">
                    {error}
                </div>
            )}

            <button
                onClick={async () => {
                    await loginWithGoogle()
                    // After Google login, auto-send the report
                    // The component will re-render as logged in
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border-2 border-gray-200 rounded-lg hover:bg-white transition-colors font-medium text-opinno-primary text-sm mb-3"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                {text.googleBtn}
            </button>

            <div className="flex items-center gap-3 my-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-opinno-gray">{text.or}</span>
                <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleMagicLink} className="flex gap-2">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={text.emailPlaceholder}
                    className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-opinno-accent transition-colors"
                />
                <button
                    type="submit"
                    disabled={sending}
                    className="px-4 py-2.5 bg-opinno-accent text-white font-bold rounded-lg hover:bg-opinno-accent-hover transition-colors disabled:opacity-50 text-sm whitespace-nowrap"
                >
                    {sending ? text.sending : text.sendLink}
                </button>
            </form>
        </div>
    )
}
