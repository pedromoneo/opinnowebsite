'use client'

import { useState, FormEvent } from 'react'

const TRANSLATIONS = {
    en: { name: 'Name *', email: 'Email *', country: 'Country', company: 'Company', message: 'How can we help you? *', privacy: "I have read and accept Opinno's ", privacyLink: 'Privacy Policy', submit: 'SUBMIT', sending: 'SENDING...', success: 'Message sent!', successSub: "We'll get back to you soon.", again: 'Send another message', error: 'Something went wrong. Please try again.', privacyRequired: 'Please accept the privacy policy.' },
    es: { name: 'Nombre *', email: 'Correo electrónico *', country: 'País', company: 'Empresa', message: '¿Cómo podemos ayudarte? *', privacy: 'He leído y acepto la ', privacyLink: 'Política de Privacidad', submit: 'ENVIAR', sending: 'ENVIANDO...', success: '¡Mensaje enviado!', successSub: 'Te responderemos pronto.', again: 'Enviar otro mensaje', error: 'Algo salió mal. Inténtalo de nuevo.', privacyRequired: 'Por favor, acepta la política de privacidad.' },
    it: { name: 'Nome *', email: 'Email *', country: 'Paese', company: 'Azienda', message: 'Come possiamo aiutarti? *', privacy: 'Ho letto e accetto la ', privacyLink: 'Informativa sulla privacy', submit: 'INVIA', sending: 'INVIO...', success: 'Messaggio inviato!', successSub: 'Ti risponderemo al più presto.', again: 'Invia un altro messaggio', error: 'Qualcosa è andato storto. Riprova.', privacyRequired: "Accetta l'informativa sulla privacy." },
} as Record<string, Record<string, string>>

export default function ContactForm({ lang }: { lang: string }) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en
    const [sending, setSending] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [privacyError, setPrivacyError] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const privacy = (form.elements.namedItem('accept-privacy') as HTMLInputElement).checked
        if (!privacy) {
            setPrivacyError(true)
            return
        }
        setPrivacyError(false)
        setSending(true)
        setStatus('idle')

        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            country: (form.elements.namedItem('country') as HTMLSelectElement).value,
            company: (form.elements.namedItem('company') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!res.ok) throw new Error('Failed to send')
            setStatus('success')
            form.reset()
        } catch {
            setStatus('error')
        } finally {
            setSending(false)
        }
    }

    if (status === 'success') {
        return (
            <div className="py-8 text-center max-w-xl">
                <div className="w-16 h-16 bg-opinno-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-opinno-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">{t.success}</h3>
                <p className="text-opinno-gray text-sm font-body">{t.successSub}</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-opinno-accent text-sm font-medium hover:underline">
                    {t.again}
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <input name="name" type="text" required placeholder={t.name} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
            <input name="email" type="email" required placeholder={t.email} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
            <select name="country" className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body text-opinno-gray focus:outline-none focus:border-opinno-accent bg-white">
                <option value="">{t.country}</option>
                <option>United States</option>
                <option>Spain</option>
                <option>Italy</option>
                <option>Mexico</option>
                <option>Colombia</option>
                <option>Ecuador</option>
                <option>Peru</option>
                <option>Argentina</option>
                <option>Portugal</option>
                <option>Saudi Arabia</option>
                <option>United Arab Emirates</option>
                <option>Other</option>
            </select>
            <input name="company" type="text" placeholder={t.company} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent" />
            <textarea name="message" required placeholder={t.message} rows={5} className="w-full px-4 py-3 border border-opinno-border rounded-lg text-sm font-body focus:outline-none focus:border-opinno-accent resize-none" />
            <div className="flex items-start gap-2">
                <input type="checkbox" name="accept-privacy" id="accept-privacy" className="mt-1 accent-opinno-accent" onChange={() => setPrivacyError(false)} />
                <label htmlFor="accept-privacy" className="text-sm text-opinno-gray font-body">
                    {t.privacy}<a href={`/${lang}/privacy`} className="text-opinno-accent hover:underline">{t.privacyLink}</a>.
                </label>
            </div>
            {privacyError && <p className="text-red-600 text-sm font-body">{t.privacyRequired}</p>}
            {status === 'error' && <p className="text-red-600 text-sm font-body">{t.error}</p>}
            <button type="submit" disabled={sending} className="btn-primary disabled:opacity-50" style={{ padding: '0.75rem 2rem', fontSize: '0.875rem' }}>
                {sending ? t.sending : t.submit}
            </button>
        </form>
    )
}
