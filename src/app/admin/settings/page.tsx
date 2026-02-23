'use client'

import { useState } from 'react'

export default function GlobalSettingsPage() {
    const [saved, setSaved] = useState(false)

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    return (
        <div className="flex flex-col gap-8 max-w-2xl">
            <header>
                <h1 className="text-3xl font-display font-bold text-opinno-primary tracking-tight">Global Settings</h1>
                <p className="text-gray-500 mt-2">Configure site-wide settings for the Opinno CMS.</p>
            </header>

            <form onSubmit={handleSave} className="flex flex-col gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-5">
                    <h2 className="text-base font-bold font-display text-opinno-primary border-b border-gray-100 pb-3">Site Identity</h2>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Site Name</label>
                        <input
                            type="text"
                            defaultValue="Opinno"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Site Tagline</label>
                        <input
                            type="text"
                            defaultValue="We Deliver Impact Through Innovation"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Default Language</label>
                        <select
                            defaultValue="en"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                        >
                            <option value="en">English (en)</option>
                            <option value="es">Spanish (es)</option>
                            <option value="it">Italian (it)</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-5">
                    <h2 className="text-base font-bold font-display text-opinno-primary border-b border-gray-100 pb-3">Contact & Social</h2>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Email</label>
                        <input
                            type="email"
                            defaultValue="info@opinno.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn URL</label>
                        <input
                            type="url"
                            defaultValue="https://www.linkedin.com/company/opinno"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Twitter / X URL</label>
                        <input
                            type="url"
                            defaultValue="https://twitter.com/opinno"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Instagram URL</label>
                        <input
                            type="url"
                            defaultValue="https://www.instagram.com/opinno"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opinno-accent focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-opinno-accent text-white rounded-lg font-medium hover:bg-opinno-accent-hover transition-colors shadow-sm"
                    >
                        Save Settings
                    </button>
                    {saved && (
                        <span className="text-sm text-green-600 font-medium animate-fade-in">
                            ✓ Settings saved
                        </span>
                    )}
                </div>
            </form>
        </div>
    )
}
