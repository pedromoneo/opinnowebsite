import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {
        const { email, role, hostUrl } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            return NextResponse.json({ error: 'Missing email provider configuration.' }, { status: 500 });
        }

        const userRole = (role || 'editor').toUpperCase();

        // The client already creates the user record in Firestore.
        // This route just sends the invitation email via Resend.
        const loginUrl = `${hostUrl}/admin`;
        const resend = new Resend(resendApiKey);

        const { data, error } = await resend.emails.send({
            from: 'Opinno CMS <noreply@010bits.com>',
            to: email,
            subject: 'You have been invited to the Opinno CMS',
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1F2A38;">
                    <div style="margin-bottom: 32px;">
                        <span style="font-size: 22px; font-weight: 800; color: #0b2341; letter-spacing: -0.5px;">Opinno CMS</span>
                    </div>
                    <h1 style="font-size: 24px; font-weight: 700; color: #0b2341; margin: 0 0 12px;">You've been invited</h1>
                    <p style="font-size: 16px; color: #4B5563; line-height: 1.6; margin: 0 0 24px;">
                        You have been granted access to the Opinno Content Management System as an <strong>${userRole}</strong>.
                        Click the button below to sign in — no password needed.
                    </p>
                    <div style="margin: 32px 0;">
                        <a href="${loginUrl}" style="display: inline-block; background-color: #fca311; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px;">
                            Sign in to Opinno CMS →
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #6B7280; line-height: 1.5; margin: 0 0 20px;">
                        On the login page, enter your email address and click <strong>"Sign in with OTP"</strong> to receive a secure login link.
                    </p>
                    <p style="font-size: 13px; color: #9CA3AF; line-height: 1.5; margin: 0;">
                        If you did not expect this invitation, you can safely ignore this email.
                    </p>
                    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;" />
                    <p style="font-size: 12px; color: #D1D5DB; margin: 0;">Opinno · opinno.com</p>
                </div>
            `,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });

    } catch (error: any) {
        console.error('Invite Error:', error);
        return NextResponse.json(
            { error: 'Error sending invitation email.', details: error.message },
            { status: 500 }
        );
    }
}
