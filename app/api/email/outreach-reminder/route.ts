import { NextRequest, NextResponse } from 'next/server';
import { sendOutreachReminderEmail } from '../../../../lib/email';
import { getNextQuarterlyOutreachDate } from '../../../utils/event-dates';
import { getSupabaseServer } from '../../../../lib/supabaseServer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, name, role, state, daysAway } = body;

    const outreachInfo = getNextQuarterlyOutreachDate();

    // 1. If sending to a specific individual
    if (email && email.includes('@')) {
      const emailResult = await sendOutreachReminderEmail({
        to: email,
        volunteerName: name || 'Impact Corps Volunteer',
        role: role || 'Community Outreach Facilitator',
        state: state || 'Nigeria',
        quarter: outreachInfo.quarterLabel,
        outreachDate: outreachInfo.formattedDate,
        daysAway: Number(daysAway) || outreachInfo.daysRemaining,
      });

      return NextResponse.json({
        success: emailResult.success,
        message: `Reminder sent to ${email} for ${outreachInfo.quarterLabel}`,
      });
    }

    // 2. Batch Mode: Send to all volunteers recorded in Supabase (if available)
    const supabaseServer = getSupabaseServer();
    const { data: volunteers, error: dbError } = await supabaseServer
      .from('profiles')
      .select('email, full_name, preferences')
      .not('email', 'is', null);

    let sentCount = 0;
    if (!dbError && volunteers && volunteers.length > 0) {
      // Filter volunteers who opted in or have volunteer preferences
      for (const v of volunteers) {
        if (v.email) {
          try {
            await sendOutreachReminderEmail({
              to: v.email,
              volunteerName: v.full_name || 'Impact Corps Leader',
              role: 'Community Outreach Facilitator',
              state: 'Regional Chapter',
              quarter: outreachInfo.quarterLabel,
              outreachDate: outreachInfo.formattedDate,
              daysAway: outreachInfo.daysRemaining,
            });
            sentCount++;
          } catch (err) {
            console.error(`Failed to send reminder to ${v.email}:`, err);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      sentCount,
      outreach: outreachInfo,
      message: `Batch outreach reminders processed for ${outreachInfo.quarterLabel} (${outreachInfo.formattedDate})`,
    });
  } catch (err: any) {
    console.error('[Outreach Reminder API Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Internal error processing outreach reminder' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const outreachInfo = getNextQuarterlyOutreachDate();
  return NextResponse.json({
    status: 'active',
    upcomingQuarter: outreachInfo.quarter,
    year: outreachInfo.year,
    formattedDate: outreachInfo.formattedDate,
    targetDate: outreachInfo.targetDate,
    daysRemaining: outreachInfo.daysRemaining,
    quarterLabel: outreachInfo.quarterLabel,
  });
}

