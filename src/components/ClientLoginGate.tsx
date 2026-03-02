'use client'

import { useState } from 'react'
import { useClientAuth } from '@/lib/client-auth-context'

export default function ClientLoginGate({ children, lang }: { children: React.ReactNode; lang: string }) {
    const { clientUser, clientData, loading, error, loginWithGoogle, loginWithMagicLink, clearError } = useClientAuth()
    const [email, setEmail] = useState('')
    const [linkSent, setLinkSent] = useState(false)
    const [sending, setSending] = useState(false)

    // Logged in as a client (has a client profile) — show the gated content
    if (!loading && clientUser && clientData) {
        return <>{children}</>
    }

    // Still loading? Show login form anyway (no blank spinner)
    // If auth resolves and user is logged in, it will switch above

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim()) return
        setSending(true)
        try {
            await loginWithMagicLink(email)
            setLinkSent(true)
        } catch {
            // error is set in context
        } finally {
            setSending(false)
        }
    }

    const t = {
        en: {
            title: 'Client Login',
            subtitle: 'Sign in to access exclusive content, publications, and reports.',
            googleBtn: 'Continue with Google',
            or: 'or',
            emailPlaceholder: 'your@email.com',
            sendLink: 'Send magic link',
            sending: 'Sending...',
            linkSentTitle: 'Check your email',
            linkSentDesc: 'We sent a sign-in link to',
            linkSentNote: 'Click the link in the email to sign in. The link expires in 24 hours.',
            tryAgain: 'Try a different email',
        },
        es: {
            title: 'Acceso Clientes',
            subtitle: 'Inicia sesión para acceder a contenido exclusivo, publicaciones e informes.',
            googleBtn: 'Continuar con Google',
            or: 'o',
            emailPlaceholder: 'tu@email.com',
            sendLink: 'Enviar enlace mágico',
            sending: 'Enviando...',
            linkSentTitle: 'Revisa tu correo',
            linkSentDesc: 'Enviamos un enlace de inicio de sesión a',
            linkSentNote: 'Haz clic en el enlace del correo para iniciar sesión. El enlace expira en 24 horas.',
            tryAgain: 'Probar otro correo',
        },
        it: {
            title: 'Accesso Clienti',
            subtitle: 'Accedi per visualizzare contenuti esclusivi, pubblicazioni e report.',
            googleBtn: 'Continua con Google',
            or: 'o',
            emailPlaceholder: 'tua@email.com',
            sendLink: 'Invia link magico',
            sending: 'Invio...',
            linkSentTitle: 'Controlla la tua email',
            linkSentDesc: 'Abbiamo inviato un link di accesso a',
            linkSentNote: 'Clicca il link nell\'email per accedere. Il link scade tra 24 ore.',
            tryAgain: 'Prova un\'altra email',
        },
    }

    const text = t[lang as keyof typeof t] || t.en

    // Magic link sent — show confirmation
    if (linkSent) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold font-display text-opinno-primary mb-2">{text.linkSentTitle}</h2>
                    <p className="text-opinno-gray mb-1">{text.linkSentDesc}</p>
                    <p className="font-semibold text-opinno-primary mb-4">{email}</p>
                    <p className="text-sm text-opinno-gray mb-8">{text.linkSentNote}</p>
                    <button
                        onClick={() => { setLinkSent(false); setEmail(''); clearError() }}
                        className="text-opinno-accent hover:underline text-sm font-medium"
                    >
                        {text.tryAgain}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold font-display text-opinno-primary mb-3">{text.title}</h2>
                    <p className="text-opinno-gray">{text.subtitle}</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {/* Google Sign-In */}
                <button
                    onClick={loginWithGoogle}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-opinno-primary"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {text.googleBtn}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-opinno-gray">{text.or}</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Magic Link */}
                <form onSubmit={handleMagicLink} className="flex flex-col gap-3">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={text.emailPlaceholder}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-opinno-accent transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={sending}
                        className="w-full px-6 py-3 bg-opinno-accent text-white font-bold rounded-lg hover:bg-opinno-accent-hover transition-colors disabled:opacity-50"
                    >
                        {sending ? text.sending : text.sendLink}
                    </button>
                </form>
            </div>
        </div>
    )
}
