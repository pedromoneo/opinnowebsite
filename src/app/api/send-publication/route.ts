import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAdminApp } from '@/lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

export async function POST(req: Request) {
    try {
        const { email, postId } = await req.json();

        if (!email || !postId) {
            return NextResponse.json({ error: 'Email and postId are required.' }, { status: 400 });
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
        }

        const adminApp = getAdminApp();
        const db = getFirestore(adminApp);

        // Fetch the post to get the publication URL
        const postDoc = await db.collection('content').doc(postId).get();
        if (!postDoc.exists) {
            return NextResponse.json({ error: 'Publication not found.' }, { status: 404 });
        }

        const postData = postDoc.data()!;
        const publicationUrl = postData.publicationUrl;

        if (!publicationUrl) {
            return NextResponse.json({ error: 'No downloadable file attached to this publication.' }, { status: 404 });
        }

        const postTitle = postData.title || 'Opinno Publication';

        // Send email with the publication download link
        const resend = new Resend(resendApiKey);

        const { error } = await resend.emails.send({
            from: 'Opinno <noreply@010bits.com>',
            to: email.toLowerCase().trim(),
            subject: `Your report: ${postTitle}`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1F2A38;">
                    <div style="margin-bottom: 32px;">
                        <span style="font-size: 22px; font-weight: 800; color: #0b2341; letter-spacing: -0.5px;">Opinno</span>
                    </div>
                    <h1 style="font-size: 24px; font-weight: 700; color: #0b2341; margin: 0 0 12px;">Your report is ready</h1>
                    <p style="font-size: 16px; color: #4B5563; line-height: 1.6; margin: 0 0 8px;">
                        Thank you for your interest in our publication:
                    </p>
                    <p style="font-size: 18px; font-weight: 600; color: #0b2341; margin: 0 0 24px;">
                        ${postTitle}
                    </p>
                    <div style="margin: 32px 0;">
                        <a href="${publicationUrl}" style="display: inline-block; background-color: #fca311; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px;">
                            Download Report &darr;
                        </a>
                    </div>
                    <p style="font-size: 13px; color: #9CA3AF; line-height: 1.5; margin: 0;">
                        If the button doesn't work, copy and paste this link into your browser:<br/>
                        <a href="${publicationUrl}" style="color: #6B7280; word-break: break-all;">${publicationUrl}</a>
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
        console.error('Send publication error:', error);
        return NextResponse.json(
            { error: 'Failed to send publication.', details: error.message },
            { status: 500 }
        );
    }
}
