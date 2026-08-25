import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, getSiteUrl } from '../../../../lib/email';
import { generateDownloadToken } from '../../../../lib/downloadToken';
import { getSupabaseServer } from '../../../../lib/supabaseServer';

const TIER_CONFIG = {
  free: {
    name: 'Free 7-Day Sprint Sample',
    price: 'Free',
    expectedAmountNGN: 0,
    color: '#1C3B34',
    accentColor: '#8A948B',
    badge: 'Tier 01 • Free Starter',
    includes: [
      '7-Day Micro-Sprint Printable PDF',
      'Dream Mapping Quickstart Guide',
      'Instant digital access',
    ],
    downloadFile: 'origin_7day_sprint_starter.pdf',
    fileName: 'Origin_7Day_Sprint_Starter.pdf',
    cta: 'Download Your Free 7-Day Sprint',
    welcomeMessage: 'Your free 7-Day Sprint Sample is ready to download. Begin your 7-day clarity sprint today.',
  },
  digital_pro: {
    name: '21-Day Digital Master Kit',
    price: '$6.99 / ₦10,000',
    expectedAmountNGN: 10000,
    color: '#1C3B34',
    accentColor: '#F59E0B',
    badge: 'Tier 02 • 21-Day Digital',
    includes: [
      'Full 21-Day Fillable Digital PDF (Days 1–7 Dream, Days 8–14 Education, Days 15–21 Purpose)',
      'iPad, Tablet & GoodNotes Format',
      'Dark & Light Aesthetic Themes',
      'Founder 21-Day Audio Sprint Guide',
    ],
    downloadFile: 'origin_21day_digital_master_kit.pdf',
    fileName: 'Origin_21Day_Digital_Master_Kit.pdf',
    cta: 'Access Your 21-Day Digital Kit',
    welcomeMessage: 'Your 21-Day Digital Master Kit is unlocked and verified. Begin your 21-day sprint today.',
  },
  hardcover: {
    name: '21-Day Hardcover Journal',
    price: '$24.99 / ₦35,000',
    expectedAmountNGN: 35000,
    color: '#1C3B34',
    accentColor: '#F59E0B',
    badge: 'Tier 03 • Physical Edition',
    includes: [
      '21-Day Debossed Linen Hardcover Journal',
      '120gsm Archival Bleed-Proof Paper',
      'Bonus: 21-Day Digital Master Kit included',
      'Founder Audio Sprint Guide',
      'Free Shipping in Nigeria',
    ],
    downloadFile: 'origin_21day_digital_master_kit.pdf',
    fileName: 'Origin_21Day_Digital_Master_Kit.pdf',
    cta: 'Access Your Included Digital Kit',
    welcomeMessage: 'Your 21-Day Hardcover Journal order is confirmed and being prepared for dispatch! Your included Digital Master Kit is ready to download now.',
  },
};

function buildPlannerAccessEmail(
  name: string,
  tier: keyof typeof TIER_CONFIG,
  txRef: string,
  downloadUrl: string,
): string {
  const config = TIER_CONFIG[tier];
  const siteUrl = getSiteUrl();
  const isPaid = tier !== 'free';

  const includesHtml = config.includes
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #E2E8DE;">
          <span style="display:inline-flex;align-items:center;gap:8px;font-size:13px;color:#1C3B34;">
            <span style="color:#1C3B34;font-weight:700;">✓</span> ${item}
          </span>
        </td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Origin — Your 21-Day Sprint Kit Is Ready</title>
</head>
<body style="margin:0;padding:0;background-color:#F0F4EE;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0F4EE;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(28,59,52,0.12);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1C3B34 0%,#2D5446 100%);padding:40px 40px 32px;text-align:center;">
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.6);">POWERED BY THE BECOMING INSTITUTE</p>
              <h1 style="margin:0;font-size:32px;font-weight:900;letter-spacing:0.15em;color:#FFFFFF;text-transform:uppercase;">ORIGIN</h1>
              <p style="margin:8px 0 0;font-size:12px;font-weight:500;color:rgba(255,255,255,0.75);letter-spacing:0.1em;">21-Day Life Planner System</p>
              
              <div style="margin:24px auto 0;display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:6px 18px;">
                <span style="font-size:11px;font-weight:700;color:#F59E0B;text-transform:uppercase;letter-spacing:0.15em;">${config.badge}</span>
              </div>
            </td>
          </tr>

          <!-- Welcome Banner -->
          <tr>
            <td style="background-color:#E2E8DE;padding:24px 40px;border-bottom:1px solid #CDD5C7;text-align:center;">
              <p style="margin:0;font-size:13px;font-weight:700;color:#1C3B34;text-transform:uppercase;letter-spacing:0.15em;">
                ${isPaid ? '✓ PAYMENT CONFIRMED & VERIFIED — ACCESS GRANTED' : '✓ FREE STARTER ACCESS GRANTED'}
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#172217;line-height:1.3;">
                Welcome to the journey,${name ? ` <span style="color:#1C3B34;">${name}</span>` : ''}.
              </h2>
              <p style="margin:0 0 24px;font-size:15px;color:#4E5B4B;line-height:1.7;font-weight:400;">
                ${config.welcomeMessage}
              </p>

              <!-- Product Card -->
              <div style="background:#F7FAF6;border:1.5px solid #D5DDCF;border-radius:16px;padding:28px;margin-bottom:28px;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#8A948B;text-transform:uppercase;letter-spacing:0.2em;">${config.badge}</p>
                <h3 style="margin:0 0 4px;font-size:18px;font-weight:800;color:#172217;">${config.name}</h3>
                <p style="margin:0 0 20px;font-size:13px;font-weight:700;color:#1C3B34;">${config.price}</p>

                <table width="100%" cellpadding="0" cellspacing="0">
                  ${includesHtml}
                </table>
              </div>

              <!-- Primary Download / Access CTA -->
              <div style="text-align:center;margin-bottom:28px;">
                <a href="${downloadUrl}" style="display:inline-block;background-color:#1C3B34;color:#FFFFFF;font-weight:700;font-size:14px;padding:16px 36px;text-decoration:none;border-radius:12px;letter-spacing:0.05em;box-shadow:0 4px 16px rgba(28,59,52,0.3);">
                  ${config.cta}
                </a>
                <p style="margin:12px 0 0;font-size:11px;color:#8A948B;font-family:monospace;">
                  ${tier === 'hardcover' ? 'Your physical journal ships within 3–5 business days in Nigeria. Digital access is instant.' : 'Your digital files are verified and available for instant download.'}
                </p>
              </div>

              ${isPaid ? `
              <!-- Transaction Reference -->
              <div style="background:#F0F4EE;border:1px solid #D5DDCF;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
                <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#8A948B;text-transform:uppercase;letter-spacing:0.2em;">Transaction Reference</p>
                <p style="margin:0;font-size:12px;font-family:monospace;color:#172217;word-break:break-all;">${txRef}</p>
              </div>` : ''}

              <!-- What Happens Next -->
              <div style="border-top:1px solid #E2E8DE;padding-top:24px;margin-top:8px;">
                <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#172217;text-transform:uppercase;letter-spacing:0.1em;">What Happens Next</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #F0F4EE;font-size:13px;color:#4E5B4B;">
                      <span style="font-weight:700;color:#1C3B34;margin-right:8px;">01</span>
                      Click the button above to download your 21-Day Life Planner material.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #F0F4EE;font-size:13px;color:#4E5B4B;">
                      <span style="font-weight:700;color:#1C3B34;margin-right:8px;">02</span>
                      Begin with Phase I: Days 1–7 Dream Mapping to establish your core target.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;font-size:13px;color:#4E5B4B;">
                      <span style="font-weight:700;color:#1C3B34;margin-right:8px;">03</span>
                      ${tier === 'free' ? 'Ready for the full system? Upgrade to the 21-Day Digital Master Kit.' : 'Execute Phase II (Days 8–14 Education) and Phase III (Days 15–21 Purpose).'}
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          ${tier === 'free' ? `
          <!-- Upsell Banner -->
          <tr>
            <td style="background:#1C3B34;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#F59E0B;text-transform:uppercase;letter-spacing:0.2em;">Upgrade When You're Ready</p>
              <p style="margin:0 0 16px;font-size:14px;color:rgba(255,255,255,0.85);line-height:1.6;">Unlock the full 21-Day Digital Master Kit for just <strong style="color:#FFFFFF;">$6.99 / ₦10,000</strong></p>
              <a href="${siteUrl}/planner#pricing-section" style="display:inline-block;background:#F59E0B;color:#172217;font-weight:700;font-size:12px;padding:12px 28px;text-decoration:none;border-radius:8px;letter-spacing:0.05em;">
                Get Full 21-Day Kit →
              </a>
            </td>
          </tr>` : ''}

          <!-- Footer -->
          <tr>
            <td style="background:#F0F4EE;padding:28px 40px;border-top:1px solid #D5DDCF;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#8A948B;line-height:1.6;">
                You received this email because you accessed the Origin 21-Day Life Planner System.
              </p>
              <p style="margin:0;font-size:12px;color:#8A948B;">
                <a href="${siteUrl}" style="color:#1C3B34;text-decoration:none;font-weight:600;">origin.com.ng</a>
                &nbsp;·&nbsp;
                <a href="${siteUrl}/planner" style="color:#1C3B34;text-decoration:none;">21-Day Life Planner</a>
                &nbsp;·&nbsp;
                <a href="${siteUrl}/community" style="color:#1C3B34;text-decoration:none;">Community</a>
              </p>
              <p style="margin:12px 0 0;font-size:10px;color:#AAB4A8;font-family:monospace;">
                © ${new Date().getFullYear()} Origin · Powered by The Becoming Institute · Mindvest Global Resources
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, tier, txRef, transactionId } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const validTiers = ['free', 'digital_pro', 'hardcover'] as const;
    if (!validTiers.includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier selection' }, { status: 400 });
    }

    const typedTier = tier as keyof typeof TIER_CONFIG;
    const config = TIER_CONFIG[typedTier];
    const siteUrl = getSiteUrl();

    let relativeDownloadUrl = `/api/download?type=planner&tier=free`;
    let verified = false;

    // ── 1. VERIFY PAID TIERS STRICTLY ──
    if (typedTier !== 'free') {
      if (!transactionId || String(transactionId).startsWith('free-')) {
        return NextResponse.json(
          { error: 'Payment transaction ID is required for paid tier access.' },
          { status: 400 }
        );
      }

      const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
      if (secretKey) {
        try {
          const isNumericId = /^\d+$/.test(String(transactionId));
          const verifyUrl = isNumericId
            ? `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`
            : `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${encodeURIComponent(String(transactionId))}`;

          const verifyRes = await fetch(verifyUrl, {
            headers: {
              Authorization: `Bearer ${secretKey}`,
              'Content-Type': 'application/json',
            },
          });

          if (verifyRes.ok) {
            const verifyData = await verifyRes.json();
            if (verifyData.status === 'success' && verifyData.data?.status === 'successful') {
              // Confirm amount if available
              if (verifyData.data.amount && verifyData.data.amount < config.expectedAmountNGN) {
                console.error('[Planner Access] Payment amount mismatch:', verifyData.data.amount, 'expected:', config.expectedAmountNGN);
                return NextResponse.json(
                  { error: 'Payment amount does not match the required tier amount.' },
                  { status: 402 }
                );
              }
              verified = true;
            } else {
              console.error('[Planner Access] Flutterwave verification returned unconfirmed status:', verifyData);
              return NextResponse.json(
                { error: 'Payment confirmation failed with Flutterwave. Access denied.' },
                { status: 402 }
              );
            }
          } else {
            console.error('[Planner Access] Flutterwave API HTTP error:', verifyRes.status);
            return NextResponse.json(
              { error: 'Unable to verify payment with Flutterwave gateway at this moment.' },
              { status: 502 }
            );
          }
        } catch (verifyErr) {
          console.error('[Planner Access] Flutterwave verify error:', verifyErr);
          return NextResponse.json(
            { error: 'Payment verification exception occurred.' },
            { status: 500 }
          );
        }
      } else {
        // Fallback for local development if FLUTTERWAVE_SECRET_KEY is not configured
        console.warn('[Planner Access] FLUTTERWAVE_SECRET_KEY missing in environment. Granting local dev verification.');
        verified = true;
      }

      if (!verified) {
        return NextResponse.json(
          { error: 'Payment verification was not successful. Download not permitted.' },
          { status: 403 }
        );
      }

      // Generate secure signed HMAC token for the download route
      const downloadToken = generateDownloadToken({
        tier: typedTier,
        txId: transactionId,
        txRef: txRef || `flw-${transactionId}`,
        email,
        expiresInHours: 48,
      });

      relativeDownloadUrl = `/api/download?type=planner&tier=${typedTier}&token=${downloadToken}&txId=${transactionId}`;

      // Record purchase in Supabase course_purchases if configured
      try {
        const supabaseServer = getSupabaseServer();
        await supabaseServer.from('course_purchases').insert({
          course_id: `planner-${typedTier}`,
          course_title: config.name,
          amount: config.expectedAmountNGN,
          currency: 'NGN',
          payment_method: 'flutterwave',
          transaction_id: String(transactionId),
          status: 'completed',
          purchased_at: new Date().toISOString(),
        });
      } catch (dbErr) {
        console.warn('[Planner Access] Failed to insert purchase in database (non-blocking):', dbErr);
      }
    } else {
      // Free tier
      verified = true;
      relativeDownloadUrl = `/api/download?type=planner&tier=free`;
    }

    const emailDownloadUrl = `${siteUrl}${relativeDownloadUrl}`;

    // ── 2. DISPATCH ACCESS EMAIL ──
    const subject =
      typedTier === 'free'
        ? `Your Free 7-Day Sprint Sample is ready — Origin`
        : `You're in! Your ${config.name} is unlocked — Origin`;

    const html = buildPlannerAccessEmail(
      name || '',
      typedTier,
      txRef || `free-${Date.now()}`,
      emailDownloadUrl
    );

    let emailSent = false;
    try {
      const result = await sendEmail({ to: email, subject, html });
      emailSent = result.success;
    } catch (emailErr) {
      console.error('[Planner Access] Email sending exception:', emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        verified,
        isPaid: typedTier !== 'free',
        downloadUrl: relativeDownloadUrl,
        fileName: config.fileName,
        emailSent,
        txRef,
        transactionId,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('[Planner Access API] Exception:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
