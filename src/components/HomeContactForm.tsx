'use client'

import { useState, FormEvent } from 'react'

export default function HomeContactForm() {
    const [sending, setSending] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSending(true)
        setStatus('idle')

        const form = e.currentTarget
        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
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

    return (
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            {status === 'success' ? (
                <div className="py-8 text-center">
                    <div className="w-16 h-16 bg-opinno-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-opinno-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Message sent!</h3>
                    <p className="text-opinno-gray text-sm font-body">We&apos;ll get back to you soon.</p>
                    <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="mt-4 text-opinno-accent text-sm font-medium hover:underline"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <input
                            name="name"
                            type="text"
                            placeholder="Name *"
                            required
                            className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent font-body"
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email *"
                            required
                            className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent font-body"
                        />
                    </div>
                    <input
                        name="company"
                        type="text"
                        placeholder="Company"
                        className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent font-body"
                    />
                    <textarea
                        name="message"
                        rows={4}
                        placeholder="Message *"
                        required
                        className="w-full px-4 py-3 border border-opinno-border rounded text-sm focus:outline-none focus:border-opinno-accent resize-none font-body"
                    />
                    {status === 'error' && (
                        <p className="text-red-600 text-sm font-body">Something went wrong. Please try again.</p>
                    )}
                    <button
                        type="submit"
                        disabled={sending}
                        className="btn-primary self-center mt-2 disabled:opacity-50"
                    >
                        {sending ? 'SENDING...' : 'SEND'}
                    </button>
                </form>
            )}
        </div>
    )
}
