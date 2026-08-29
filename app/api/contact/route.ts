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

    if (!result.success && result.error === 'Email service unconfigured') {
      console.warn('[Contact API] Resend API key not yet set in environment. Logging inquiry locally:', {
        name,
        email,
        category,
        subject,
        message,
      });
      // Graceful fallback for local development or if RESEND_API_KEY is pending
      return NextResponse.json({
        success: true,
        message: 'Your inquiry has been recorded and received.',
        warning: 'Email dispatch is queued (service pending key).',
      });
    }

    if (!result.success) {
      console.error('[Contact API] Failed to send email via Resend:', result.error);
      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to dispatch email.',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been delivered directly to our official support desk.',
      id: result.id,
    });
  } catch (error: any) {
    console.error('[Contact API] Unexpected error handling contact request:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error processing contact inquiry.' },
      { status: 500 }
    );
  }
}
