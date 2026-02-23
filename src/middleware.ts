import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Core languages stored directly in Firestore for SEO
export const defaultLocale = 'en'
export const coreLocales = ['en', 'es', 'it']

// Non-core languages will trigger dynamic AI translation
export const supportedDynamicLocales = ['de', 'fr', 'pt', 'ja', 'zh']
export const allLocales = [...coreLocales, ...supportedDynamicLocales]

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip Next.js internal paths and public files
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('.') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin')
    ) {
        return NextResponse.next()
    }

    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = allLocales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return NextResponse.next()

    // Here, we would check user's Accept-Language header to determine preferred language.
    // We'll default to the defaultLocale ('en') if not found or not supported.
    const acceptLanguage = request.headers.get('accept-language') || ''
    let bestMatch = defaultLocale

    for (const lang of allLocales) {
        if (acceptLanguage.includes(lang)) {
            bestMatch = lang
            break
        }
    }

    // e.g. incoming request is /about
    // The new URL is now /en/about
    request.nextUrl.pathname = `/${bestMatch}${pathname}`

    // We use "rewrite" if we want to hide the language in the URL, 
    // or "redirect" to enforce the language prefix for SEO.
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
