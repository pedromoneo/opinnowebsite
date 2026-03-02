# Implementation Plan: Client Login, Publications, Mobile Tabs

## Overview
5 feature areas, roughly ordered by dependency:

---

## Phase 1: Mobile Horizontal Scrolling Tabs (standalone, no dependencies)

**Problem:** InteriorPageLayout.tsx uses a vertical sidebar on mobile that takes too much space.

**Solution:** On mobile (`md` breakpoint and below), render the sidebar as horizontal scrolling tabs. Desktop stays unchanged.

**File: `src/components/InteriorPageLayout.tsx`**
- Keep the existing vertical `<nav>` for `md:` and above (`hidden md:block`)
- Add a new horizontal scrolling tab bar for mobile only (`md:hidden`)
- Render as a `<div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">` with pill-shaped links
- For nested children (e.g., Expertise → Services → Open Innovation): flatten them into the tab bar with slightly indented or smaller text, or show only top-level items as tabs and ignore nesting on mobile (cleaner)
- Active tab gets accent styling, auto-scroll into view
- Add `scrollbar-hide` utility to Tailwind config if not present (or use `[&::-webkit-scrollbar]:hidden` inline)

**Affected pages:** About, Insights, Expertise, Stories, Contact — all use InteriorPageLayout automatically.

---

## Phase 2: Fix Publication Content ("nnnnn" characters)

**Problem:** Publications have stray "n" characters at end of content.

**Two-part fix:**

### A. Improve content cleaning regex
**File: `src/app/(site)/[lang]/[...slug]/page.tsx`**
- The existing regex handles some `n` patterns between tags, but not trailing `n`s in text nodes
- Add: `.replace(/n{2,}/g, '')` — remove runs of 2+ literal 'n' characters (these are artifact \n escape sequences that got partially cleaned)
- Add: `.replace(/\bn+$/g, '')` — remove trailing n's at end of content

### B. One-time Firestore cleanup script
**File: `scripts/fix-publications.ts`** (new, run once)
- Query all docs where `cmsCategory == 'publications'`
- For each, clean `content` and `htmlContent` fields with the same regex
- Update the document in Firestore
- Run via: `npx tsx scripts/fix-publications.ts`

---

## Phase 3: CMS Publication Upload

**Problem:** When creating a post with category "publications", editors need to upload a PDF.

**File: `src/components/cms/PostEditor.tsx`**
- Add `publicationUrl` to the `PostData` type
- When `formData.cmsCategory === 'publications'`, show a new upload section:
  - Label: "Publication File (PDF)"
  - File input accepting `.pdf`
  - Upload to Firebase Storage path: `publications/{timestamp}_{filename}`
  - Show the filename + a remove button when uploaded
  - Store URL in `formData.publicationUrl`
- Include `publicationUrl` in `dataToSave`

---

## Phase 4: Client Authentication System

**Problem:** Need a client login system separate from admin CMS auth.

### Architecture Decision
- **Extend the existing AuthProvider** rather than creating a separate one
- Add a new role: `'client'` alongside `'admin'` and `'editor'`
- Use a **separate Firestore collection `clients`** for client profiles (keeps admin users separate)
- Clients can self-register (unlike admin users who must be invited)
- Auth methods: Google OAuth + Firebase Email Link (magic link) — both already configured

### New Files

#### `src/lib/client-auth-context.tsx` (new)
- Separate context for client-side auth
- `ClientAuthProvider` wrapping the client-facing pages
- Methods: `loginWithGoogle()`, `sendMagicLink(email)`, `logout()`
- On auth state change: check `clients` collection in Firestore
- If user doesn't exist in `clients`, auto-create their profile (self-registration)
- State: `clientUser`, `clientProfile`, `loading`, `isAuthenticated`

#### `src/components/pages/expertise/ClientLoginPage.tsx` (new)
- Replace the current ClientsPage content
- Clean login UI with two options:
  1. "Continue with Google" button (Google OAuth popup)
  2. "Sign in with email" — email input → sends magic link → shows "check your email" message
- After login, redirect to `/clients/portal` or back to the page they came from (e.g., a publication download)

#### `src/app/(site)/[lang]/clients/portal/page.tsx` (new, or use static router)
- Simple client dashboard showing:
  - Welcome message with user name/email
  - List of available publications for download
  - Logout button

#### `src/app/api/client-magic-link/route.ts` (new)
- Similar to existing `/api/login-link/route.ts` but WITHOUT the invitation check
- Accepts any email, generates Firebase sign-in link
- Sends via Resend with Opinno branding
- From: `Opinno <noreply@010bits.com>`

#### `src/app/api/send-publication/route.ts` (new)
- Accepts: `{ email, publicationId }`
- Fetches publication data from Firestore
- Fetches PDF from Firebase Storage URL
- Sends email via Resend with the PDF as attachment (or download link)
- Returns success/error

### Modified Files

#### `src/lib/static-page-router.tsx`
- Update `clients` case to render `ClientLoginPage` instead of `ClientsPage`
- Add new routes: `clients/portal`

#### `src/components/Navbar.tsx`
- "Clients" link stays as `/clients` — no change needed (the page itself changes)

#### Layout wrapper for client pages
- Wrap client-accessible pages with `ClientAuthProvider`
- Could be done in the `[lang]/layout.tsx` or in individual pages

---

## Phase 5: Publication Download → Login → Email Flow

**Problem:** "Download the report" links on publications should require client login, then email the PDF.

### Flow
1. User reads a publication post → sees "Download the report" button
2. Click → if not logged in, redirect to `/clients?redirect=/insights/publications&pub={docId}`
3. After login, redirect back → API call to `/api/send-publication` with user email + publication ID
4. Show success message: "We've sent the report to your email!"

### File Changes

#### `src/app/(site)/[lang]/[...slug]/page.tsx`
- For posts where `cmsCategory === 'publications'` and `publicationUrl` exists:
  - Replace/enhance the "Download the report" link with a client-side component
  - New component: `PublicationDownloadButton` (client component)
  - Checks if client is authenticated
  - If yes: calls `/api/send-publication` and shows confirmation
  - If no: redirects to `/clients` login with return URL

#### `src/components/PublicationDownloadButton.tsx` (new)
- Client component using `useClientAuth()`
- Props: `publicationId`, `publicationTitle`
- Renders a styled "Download the report" button
- On click: checks auth → login redirect or send-publication API call
- Shows loading/success/error states

---

## Implementation Order

1. **Phase 1** — Mobile horizontal tabs (isolated, quick win)
2. **Phase 2** — Fix publication content (isolated, quick fix)
3. **Phase 3** — CMS publication upload (needed before Phase 5)
4. **Phase 4** — Client auth system (core infrastructure)
5. **Phase 5** — Publication download flow (depends on 3 + 4)

Each phase will be committed and deployed independently.

---

## Technical Notes

- **Resend** is already configured with API key in `.env` and used in `/api/login-link/route.ts`
- **Firebase Storage** is already configured and used for image uploads in PostEditor
- **Google OAuth** is already configured in Firebase Auth (used by admin login)
- **Email Link Auth** is already configured (used by admin magic link login)
- No new Firebase services needed — just new Firestore collections and Storage paths
- No new npm packages needed (Resend, Firebase Auth, Firebase Storage all already installed)
