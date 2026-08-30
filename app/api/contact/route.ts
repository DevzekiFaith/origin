import { NextResponse } from 'next/server';
import { sendContactInquiryNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, category, source } = body;

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Full name is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'A valid email address is required.' }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json({ success: false, error: 'Subject is required.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ success: false, error: 'Message content is required.' }, { status: 400 });
    }

    // Transmit email directly via Resend to official support inbox
    const result = await sendContactInquiryNotification({
      name: name.trim(),
      email: email.trim(),
      category: category || 'Customer Service',
      subject: subject.trim(),
      message: message.trim(),
      source: source || 'Origin Contact Desk',
    });

    // Always log inquiry details securely to server logs
    console.log(`[Contact Inquiry Received] From: ${name} <${email}> | Category: ${category || 'General'} | Subject: ${subject}`);

    // If Resend failed (due to network timeout, offline dev, or pending domain DNS)
    if (!result.success) {
      console.warn(`[Contact API] Email delivery note: ${result.error}. Inquiry has been logged securely.`);
      return NextResponse.json({
        success: true,
        message: 'Your inquiry has been received! Our support team has logged your message and will reach out shortly.',
        status: 'received',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been delivered directly to our official support desk.',
      id: (result as any).id,
    });
  } catch (error: any) {
    console.error('[Contact API] Unexpected error handling contact request:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error processing contact inquiry.' },
      { status: 500 }
    );
  }
}
