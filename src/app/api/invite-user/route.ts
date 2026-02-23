import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {
        const { email, role, hostUrl } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required." }, { status: 400 });
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            console.error("Missing RESEND_API_KEY environment variable.");
            return NextResponse.json(
                { error: "Internal server error: missing email provider configuration." },
                { status: 500 }
            );
        }

        const resend = new Resend(resendApiKey);
        const loginUrl = `${hostUrl}/admin`;

        const data = await resend.emails.send({
            from: 'Opinno CMS <onboarding@resend.dev>', // Use resend test domain until you verify opinno.com
            to: email,
            subject: 'You have been invited to the Opinno CMS',
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #0b2341;">Welcome to Opinno</h2>
                    <p>You have been invited to access the Opinno Content Management System as an <b>${role.toUpperCase()}</b>.</p>
                    <p>You can now log in securely using your email address, or via Google Sign-In if you use Google Workspace.</p>
                    <div style="margin: 30px 0;">
                        <a href="${loginUrl}" style="background-color: #fca311; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                            Log in to Opinno CMS
                        </a>
                    </div>
                    <p style="font-size: 12px; color: #888;">If you believe you received this email by mistake, please ignore it.</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error("Invite Error:", error);
        return NextResponse.json(
            { error: "Error sending invitation email.", details: error.message },
            { status: 500 }
        );
    }
}
