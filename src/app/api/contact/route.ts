import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {
        const { name, email, company, country, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            return NextResponse.json(
                { error: 'Email service is not configured.' },
                { status: 500 }
            );
        }

        const resend = new Resend(resendApiKey);

        const { error } = await resend.emails.send({
            from: 'Opinno Website <noreply@010bits.com>',
            to: 'pedro.moneo@opinno.com',
            replyTo: email,
            subject: `New contact from ${name}${company ? ` (${company})` : ''}`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1F2A38;">
                    <div style="margin-bottom: 32px;">
                        <span style="font-size: 22px; font-weight: 800; color: #0b2341; letter-spacing: -0.5px;">Opinno Website</span>
                    </div>
                    <h1 style="font-size: 20px; font-weight: 700; color: #0b2341; margin: 0 0 24px;">New Contact Form Submission</h1>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 100px;">Name</td>
                            <td style="padding: 8px 0; color: #4B5563;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email</td>
                            <td style="padding: 8px 0; color: #4B5563;"><a href="mailto:${email}" style="color: #76A662;">${email}</a></td>
                        </tr>
                        ${country ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Country</td><td style="padding: 8px 0; color: #4B5563;">${country}</td></tr>` : ''}
                        ${company ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #374151;">Company</td><td style="padding: 8px 0; color: #4B5563;">${company}</td></tr>` : ''}
                    </table>
                    <div style="background: #F7F9FA; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                        <p style="font-weight: 600; color: #374151; margin: 0 0 8px;">Message</p>
                        <p style="color: #4B5563; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;" />
                    <p style="font-size: 12px; color: #D1D5DB; margin: 0;">Sent from opinno.com contact form</p>
                </div>
            `,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message.' },
            { status: 500 }
        );
    }
}
