import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '../../../../lib/supabaseServer';
import { sendWelcomeEmail } from '../../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Verify user exists in profiles or auth
    const supabaseServer = getSupabaseServer();
    const { data: profile } = await supabaseServer
      .from('profiles')
      .select('name')
      .eq('email', email)
      .maybeSingle();

    const recipientName = name || profile?.name || '';

    // Trigger the welcome email via Resend
    const result = await sendWelcomeEmail(email, recipientName);

    if (!result.success) {
      console.error('[Welcome API] Error sending welcome email:', result.error);
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('[Welcome API] Handler exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
