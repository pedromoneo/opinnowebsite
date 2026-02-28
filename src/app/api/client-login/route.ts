import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAdminApp } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
        }

        const safeEmail = email.toLowerCase().trim();
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
            return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
        }

        let adminApp;
        try {
            adminApp = getAdminApp();
        } catch (configError: any) {
            console.error('Firebase Admin Configuration Error:', configError.message);
            return NextResponse.json({
                error: 'Login service is temporarily unavailable.',
            }, { status: 500 });
        }

        const adminAuth = getAuth(adminApp);

        // Determine the host URL from the request
        const origin = req.headers.get('origin') || req.headers.get('referer')?.replace(/\/[^/]*$/, '') || 'https://opinno.com';

        // Generate Firebase magic sign-in link — no whitelist, open to anyone
        const actionCodeSettings = {
            url: `${origin}/en/client/verify`,
            handleCodeInApp: true,
        };

        const loginUrl = await adminAuth.generateSignInWithEmailLink(safeEmail, actionCodeSettings);

        // Send via Resend
        const resend = new Resend(resendApiKey);

        const { error } = await resend.emails.send({
            from: 'Opinno <noreply@010bits.com>',
            to: safeEmail,
            subject: 'Sign in to Opinno',
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1F2A38;">
                    <div style="margin-bottom: 32px;">
                        <span style="font-size: 22px; font-weight: 800; color: #0b2341; letter-spacing: -0.5px;">Opinno</span>
                    </div>
                    <h1 style="font-size: 24px; font-weight: 700; color: #0b2341; margin: 0 0 12px;">Sign in to your account</h1>
                    <p style="font-size: 16px; color: #4B5563; line-height: 1.6; margin: 0 0 24px;">
                        Click the button below to sign in to Opinno. This secure link is only valid for your account (${safeEmail}).
                    </p>
                    <div style="margin: 32px 0;">
                        <a href="${loginUrl}" style="display: inline-block; background-color: #fca311; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px;">
                            Sign in to Opinno &rarr;
                        </a>
                    </div>
                    <p style="font-size: 13px; color: #9CA3AF; line-height: 1.5; margin: 0;">
                        This link will expire in 24 hours. If you didn't request this, you can safely ignore this email.
                    </p>
                    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;" />
                    <p style="font-size: 12px; color: #D1D5DB; margin: 0;">Opinno &middot; opinno.com</p>
                </div>
            `,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Client Login Error:', error);
        return NextResponse.json(
            { error: 'Error sending login link.', details: error.message },
            { status: 500 }
        );
    }
}
