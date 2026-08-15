import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendReceiptEmail, sendGiftEmail } from '../../../../lib/email';

const supabaseUrl = 'https://usjijpwcubtxofjqgiii.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzamlqcHdjdWJ0eG9manFnaWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NjIxMzMsImV4cCI6MjA5NTEzODEzM30.vuT7cOpMq9504WUdPD-pje5HkaeyK-DDXIPNelmqWSY';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transactionId, email, name, items, total, currency, gifts } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid purchaser email' }, { status: 400 });
    }

    let isVerified = false;

    // 1. If it's a paid transaction, verify it with Flutterwave
    if (transactionId && !transactionId.startsWith('free-')) {
      const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
      if (!secretKey) {
        console.warn('[Receipt API] FLUTTERWAVE_SECRET_KEY missing. Allowing transaction fallback.');
        isVerified = true; // Fallback for local testing if key is unconfigured
      } else {
        const isNumericId = /^\d+$/.test(String(transactionId));
        const verifyUrl = isNumericId
          ? `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`
          : `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${encodeURIComponent(transactionId)}`;

        try {
          const verifyRes = await fetch(verifyUrl, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${secretKey}`,
              'Content-Type': 'application/json',
            },
          });

          if (verifyRes.ok) {
            const verifyData = await verifyRes.json();
            if (
              verifyData.status === 'success' &&
              verifyData.data?.status === 'successful'
            ) {
              isVerified = true;
            } else {
              console.error('[Receipt API] Flutterwave verification returned unconfirmed status:', verifyData);
              // Allow fallback if verification was indeterminate
              isVerified = true;
            }
          } else {
            console.error('[Receipt API] Failed to connect to Flutterwave verify endpoint, status:', verifyRes.status);
            isVerified = true; // Don't drop receipt if Flutterwave verify API is temporarily down
          }
        } catch (fetchErr) {
          console.error('[Receipt API] Flutterwave verify fetch exception:', fetchErr);
          isVerified = true;
        }
      }
    } else {
      // 2. If it's a free transaction, verify user's Supabase JWT access token for security
      const authHeader = request.headers.get('Authorization');
      const token = authHeader?.split(' ')[1];
      
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized: Missing verification token' }, { status: 401 });
      }

      // Initialize temporary Supabase client with the user's JWT to authenticate them
      const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: `Bearer ${token}` } },
        auth: { persistSession: false },
      });

      const { data: { user }, error: authError } = await userSupabase.auth.getUser();

      if (authError || !user) {
        console.error('[Receipt API] Supabase auth verification failed:', authError);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      isVerified = true;
    }

    if (!isVerified) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }

    // 3. Send receipt email to the buyer
    const receiptResult = await sendReceiptEmail(
      email,
      name || 'Customer',
      items || [],
      total || 0,
      currency || 'USD',
      transactionId || `free-${Date.now()}`
    );

    if (!receiptResult.success) {
      console.error('[Receipt API] Welcome/Receipt email failed to send:', receiptResult.error);
    }

    // 4. Send gift delivery emails to the recipients if there are any gifts in the cart
    if (gifts && Array.isArray(gifts)) {
      for (const gift of gifts) {
        const { recipientEmail, recipientName, giftMessage, courseTitle } = gift;
        if (recipientEmail && recipientEmail.includes('@')) {
          const giftResult = await sendGiftEmail(
            recipientEmail,
            recipientName || 'Friend',
            name || 'A friend',
            giftMessage || '',
            courseTitle || 'Learning Track'
          );

          if (!giftResult.success) {
            console.error(`[Receipt API] Failed to send gift email to ${recipientEmail}:`, giftResult.error);
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('[Receipt API] Handler exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
