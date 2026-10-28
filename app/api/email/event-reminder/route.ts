import { NextRequest, NextResponse } from 'next/server';
import { sendEventReminderEmail } from '../../../../lib/email';
import { getSupabaseServer } from '../../../../lib/supabaseServer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      name,
      eventTitle,
      eventDate,
      eventTime,
      mode,
      paymentPlan,
      balanceDueNGN,
      hasPaidBalance,
    } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid attendee email is required' }, { status: 400 });
    }

    if (!eventTitle) {
      return NextResponse.json({ error: 'Event title is required' }, { status: 400 });
    }

    // 1. Send 3-Day Reminder Email via Resend
    const emailResult = await sendEventReminderEmail({
      to: email,
      buyerName: name || 'Attendee',
      eventTitle,
      eventDate: eventDate || 'Upcoming Weekend Cohort',
      eventTime: eventTime || '5:00 PM WAT',
      mode: mode || 'Virtual HD Stream (GoogleMeet) & Onsite Hubs',
      paymentPlan: paymentPlan || 'full',
      balanceDueNGN: Number(balanceDueNGN) || 0,
      hasPaidBalance: Boolean(hasPaidBalance),
    });

    // 2. Insert into Supabase in-app notifications if user profile exists
    try {
      const supabaseServer = getSupabaseServer();
      const { data: profile } = await supabaseServer
        .from('profiles')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (profile?.id) {
        const isDeposit = paymentPlan === 'deposit' && !hasPaidBalance && balanceDueNGN > 0;
        await supabaseServer.from('notifications').insert({
          user_id: profile.id,
          title: `Cohort in 3 Days: ${eventTitle}`,
          message: isDeposit
            ? `Your cohort begins in 3 days! Please complete your remaining balance of ₦${Number(balanceDueNGN).toLocaleString()} to finalize your access (or ignore if already paid).`
            : `Your cohort begins in 3 days! Your VIP pass is 100% confirmed. See you live!`,
          link: '/purchases',
          read: false,
        });
      }
    } catch (notifErr) {
      console.warn('[Event Reminder] Optional in-app notification insert skipped:', notifErr);
    }

    return NextResponse.json({
      success: emailResult.success,
      emailId: (emailResult as any).id,
      message: '3-Day Event reminder sent successfully',
    });
  } catch (err: any) {
    console.error('[Event Reminder API] Error dispatching reminder:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error dispatching reminder' },
      { status: 500 }
    );
  }
}
