import { Resend } from 'resend';
import https from 'https';
import dns from 'dns';

// Dynamic Resend client getter
export function getResendClient() {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export const resend = getResendClient();

// Default sender address (strips any wrapping quotes)
const getFromEmail = () => {
  const raw = process.env.NEXT_PUBLIC_FROM_EMAIL || process.env.FROM_EMAIL || 'Origin <support@mindvestglobalresources.com.ng>';
  return raw.replace(/^["']|["']$/g, '').trim();
};

// Base public URL of the website for email links and logos (never outputs localhost)
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.SITE_URL || '';
  if (!envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1')) {
    return 'https://origin.com.ng';
  }
  return envUrl.replace(/\/$/, '');
}

// Common HTML styles to match Origin's high-aesthetic dark/premium branding
const EMAIL_STYLES = {
  body: 'margin: 0; padding: 0; width: 100%; background-color: #030303; font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #e4e4e7;',
  wrapper: 'width: 100%; table-layout: fixed; background-color: #030303; padding: 40px 0;',
  container: 'max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid #1f1f23; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);',
  header: 'padding: 40px 30px; text-align: center; border-bottom: 1px solid #1f1f23; background: linear-gradient(180deg, #0f172a 0%, #0a0a0a 100%);',
  logo: 'font-size: 24px; font-weight: 800; letter-spacing: 0.2em; color: #ffffff; text-decoration: none; text-transform: uppercase;',
  content: 'padding: 40px 30px;',
  title: 'font-size: 24px; font-weight: 700; color: #ffffff; margin-top: 0; margin-bottom: 20px; line-height: 1.3;',
  paragraph: 'font-size: 16px; line-height: 1.6; color: #a1a1aa; margin-top: 0; margin-bottom: 24px;',
  buttonContainer: 'text-align: center; margin: 35px 0;',
  button: 'display: inline-block; background-color: #2563eb; color: #ffffff; font-weight: 600; font-size: 15px; padding: 14px 30px; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); transition: background-color 0.2s;',
  footer: 'padding: 30px; border-top: 1px solid #1f1f23; background-color: #050505; text-align: center;',
  footerText: 'font-size: 12px; color: #52525b; line-height: 1.5; margin: 0 0 10px 0;',
  footerLink: 'color: #3b82f6; text-decoration: none;',
  divider: 'border: 0; border-top: 1px solid #1f1f23; margin: 30px 0;',
  card: 'background-color: #121214; border: 1px solid #1f1f23; border-radius: 12px; padding: 20px; margin: 20px 0;',
  cardTitle: 'font-size: 18px; font-weight: 600; color: #ffffff; margin-top: 0; margin-bottom: 15px;',
  itemRow: 'display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;',
  itemName: 'color: #e4e4e7;',
  itemPrice: 'color: #ffffff; font-weight: 600;',
};

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  replyTo?: string | string[];
}

/**
 * Direct HTTPS dispatch with DNS fallback for maximum reliability across all environments
 */
async function dispatchResendViaHttps(payload: any, apiKey: string): Promise<{ success: boolean; id?: string; error?: string }> {
  return new Promise((resolve) => {
    try {
      const body = JSON.stringify(payload);
      const customLookup = (hostname: string, options: any, callback: any) => {
        if (typeof options === 'function') {
          callback = options;
          options = {};
        }
        dns.resolve4(hostname, (err, addresses) => {
          if (err || !addresses || addresses.length === 0) {
            return dns.lookup(hostname, options, callback);
          }
          if (options && options.all) {
            callback(null, addresses.map((a) => ({ address: a, family: 4 })));
          } else {
            callback(null, addresses[0], 4);
          }
        });
      };

      const req = https.request(
        {
          hostname: 'api.resend.com',
          port: 443,
          path: '/emails',
          method: 'POST',
          lookup: customLookup,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body),
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              const parsed = JSON.parse(data);
              if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                resolve({ success: true, id: parsed.id });
              } else {
                resolve({ success: false, error: parsed.message || `HTTP ${res.statusCode}` });
              }
            } catch (e: any) {
              resolve({ success: false, error: e.message || data });
            }
          });
        }
      );

      req.on('error', (err) => {
        resolve({ success: false, error: err.message });
      });

      req.write(body);
      req.end();
    } catch (err: any) {
      resolve({ success: false, error: err.message });
    }
  });
}

/**
 * Core utility to send an email via Resend
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) {
    console.warn('[Email Service] RESEND_API_KEY is not configured.');
    return { success: false, error: 'Email service unconfigured' };
  }

  const fromAddress = getFromEmail();

  try {
    const payload: any = {
      from: fromAddress,
      to,
      subject,
      html,
    };
    if (replyTo) {
      payload.replyTo = replyTo;
    }

    // Attempt direct robust HTTPS dispatch
    const directResult = await dispatchResendViaHttps(payload, apiKey);
    if (directResult.success) {
      console.log(`[Email Service] Email sent successfully to ${to}. ID:`, directResult.id);
      return directResult;
    }

    // If direct returned an error, attempt SDK fallback
    const client = getResendClient();
    if (client) {
      const sdkResult = await client.emails.send(payload);
      if (sdkResult.data?.id) {
        console.log(`[Email Service] Email sent via SDK to ${to}. ID:`, sdkResult.data.id);
        return { success: true, id: sdkResult.data.id };
      }
    }

    console.error(`[Email Service] Failed to send email to ${to}:`, directResult.error);
    return directResult;
  } catch (error: any) {
    console.error('[Email Service] Exception sending email:', error);
    return { success: false, error: error.message || 'Unknown email sending error' };
  }
}

/**
 * Sends a welcome email to a new subscriber or registered user.
 */
export async function sendWelcomeEmail(to: string, name?: string) {
  const SITE_URL = getSiteUrl();
  const greeting = name ? `Hi ${name},` : 'Hello,';
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Origin</title>
      <style>
        @media only screen and (max-width: 600px) {
          .container { border-radius: 0 !important; border: none !important; }
        }
      </style>
    </head>
    <body style="${EMAIL_STYLES.body}">
      <div style="${EMAIL_STYLES.wrapper}">
        <div class="container" style="${EMAIL_STYLES.container}">
          <div style="${EMAIL_STYLES.header}">
            <a href="${SITE_URL}" style="text-decoration: none; display: inline-block; vertical-align: middle;">
              <img src="${SITE_URL}/origin.png" alt="Origin Logo" width="32" height="32" style="display: inline-block; vertical-align: middle; border: 0; outline: none;" />
              <span style="font-size: 20px; font-weight: 800; letter-spacing: 0.15em; color: #ffffff; text-transform: uppercase; text-decoration: none; vertical-align: middle; margin-left: 10px; font-family: 'Inter', sans-serif;">ORIGIN</span>
            </a>
          </div>
          <div style="${EMAIL_STYLES.content}">
            <h1 style="${EMAIL_STYLES.title}">Welcome to the Journey</h1>
            <p style="${EMAIL_STYLES.paragraph}">${greeting}</p>
            <p style="${EMAIL_STYLES.paragraph}">
              Thank you for joining Origin. We are dedicated to providing high-quality formation, tools, and learning paths designed to help you build focus, unlock new skills, and construct a life of purpose.
            </p>
            <p style="${EMAIL_STYLES.paragraph}">
              By subscribing, you'll receive our weekly learning digests, exclusive early-access tools, and structured guides directly in your inbox.
            </p>
            <div style="${EMAIL_STYLES.buttonContainer}">
              <a href="${SITE_URL}/learn" style="${EMAIL_STYLES.button}">Explore Learning Tracks</a>
            </div>
            <p style="${EMAIL_STYLES.paragraph}">
              If you have any questions or feedback along the way, simply reply to this email. We're here to help you execute your goals.
            </p>
            <p style="${EMAIL_STYLES.paragraph}">
              To your growth,<br>
              <strong>The Origin Team</strong>
            </p>
          </div>
          <div style="${EMAIL_STYLES.footer}">
            <p style="${EMAIL_STYLES.footerText}">
              You received this email because you subscribed to Origin updates.
            </p>
            <p style="${EMAIL_STYLES.footerText}">
              <a href="${SITE_URL}/unsubscribe?email=${encodeURIComponent(to)}" style="${EMAIL_STYLES.footerLink}">Unsubscribe</a> • 
              <a href="${SITE_URL}/privacy" style="${EMAIL_STYLES.footerLink}">Privacy Policy</a>
            </p>
            <p style="${EMAIL_STYLES.footerText}">
              &copy; ${new Date().getFullYear()} Origin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: 'Welcome to Origin — Formation for Life',
    html,
  });
}

interface PurchaseItem {
  id: string;
  title: string;
  price: number;
  description?: string;
  paymentPlan?: 'full' | 'deposit';
  depositPaidNGN?: number;
  balanceDueNGN?: number;
}

/**
 * Sends a purchase receipt to the buyer.
 */
export async function sendReceiptEmail(
  to: string,
  buyerName: string,
  items: PurchaseItem[],
  total: number,
  currency: string,
  transactionId: string
) {
  const SITE_URL = getSiteUrl();
  const formatMoney = (val: number, cur: string) => {
    if (cur === 'NGN') {
      return `₦${Math.round(val).toLocaleString()}`;
    }
    const sym = cur === 'EUR' ? '€' : cur === 'GBP' ? '£' : '$';
    return `${sym}${val.toFixed(2)}`;
  };
  
  const itemsHtml = items
    .map(
      (item) => `
      <div style="display: table; width: 100%; margin-bottom: 14px; font-size: 14px; font-family: sans-serif; border-bottom: 1px dashed #27272a; padding-bottom: 10px;">
        <div style="display: table-cell; text-align: left; color: #e4e4e7; vertical-align: top;">
          <div style="font-weight: 700; color: #ffffff;">${item.title}</div>
          ${item.description ? `<div style="font-size: 12px; color: #a1a1aa; margin-top: 4px; line-height: 1.4;">${item.description}</div>` : ''}
        </div>
        <div style="display: table-cell; text-align: right; color: #ffffff; font-weight: 700; white-space: nowrap; vertical-align: top; padding-left: 12px; font-family: monospace;">
          ${formatMoney(item.price, currency)}
        </div>
      </div>
    `
    )
    .join('');

  const depositItem = items.find(
    (i) => i.paymentPlan === 'deposit' || i.title.toLowerCase().includes('deposit') || (i.description && i.description.toLowerCase().includes('deposit'))
  );

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Origin Order Receipt & Admission Confirmation</title>
    </head>
    <body style="${EMAIL_STYLES.body}">
      <div style="${EMAIL_STYLES.wrapper}">
        <div class="container" style="${EMAIL_STYLES.container}">
          <div style="${EMAIL_STYLES.header}">
            <a href="${SITE_URL}" style="text-decoration: none; display: inline-block; vertical-align: middle;">
              <img src="${SITE_URL}/origin.png" alt="Origin Logo" width="32" height="32" style="display: inline-block; vertical-align: middle; border: 0; outline: none;" />
              <span style="font-size: 20px; font-weight: 800; letter-spacing: 0.15em; color: #ffffff; text-transform: uppercase; text-decoration: none; vertical-align: middle; margin-left: 10px; font-family: 'Inter', sans-serif;">ORIGIN</span>
            </a>
          </div>
          <div style="${EMAIL_STYLES.content}">
            <div style="display: inline-block; background-color: #10b981; color: #040907; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px;">
              ✓ OFFICIAL PAYMENT CONFIRMATION
            </div>
            <h1 style="${EMAIL_STYLES.title}">Payment Received — Welcome to Origin!</h1>
            <p style="${EMAIL_STYLES.paragraph}">Hi ${buyerName},</p>
            <p style="${EMAIL_STYLES.paragraph}">
              Your payment has been successfully processed and verified. Your admission and materials are secured in our real-time system.
            </p>

            ${depositItem ? `
              <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.3) 100%); border: 1px solid rgba(16, 185, 129, 0.45); border-radius: 14px; padding: 22px; margin: 25px 0; text-align: left;">
                <div style="display: inline-block; background-color: #fde68a; color: #78350f; font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 10px;">
                  ★ STAGE 1 SEAT LOCK ACTIVE
                </div>
                <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin: 0 0 10px 0;">Your Seat Is 100% Reserved &amp; Locked</h3>
                <p style="font-size: 13px; line-height: 1.6; color: #d1fae5; margin: 0 0 14px 0;">
                  Thank you for locking your admission with the <strong>Stage 1 Commitment Deposit</strong>. Your designated place is recorded in our live intake engine.
                </p>
                <div style="background-color: rgba(0, 0, 0, 0.35); border-radius: 10px; padding: 14px; font-size: 12px; color: #ffffff; margin-bottom: 14px; line-height: 1.6;">
                  <div>• <strong>Stage 1 Deposit Paid:</strong> <span style="color: #6ee7b7; font-family: monospace;">${formatMoney(total, currency)}</span></div>
                  <div>• <strong>Remaining Balance:</strong> <span style="color: #fde68a; font-family: monospace;">${depositItem.balanceDueNGN ? `₦${depositItem.balanceDueNGN.toLocaleString()} NGN` : 'As agreed prior to cohort'}</span></div>
                  <div>• <strong>Balance Dispatch:</strong> Your private 1-click balance completion link and push reminder will be sent to this email <strong>3 days before the cohort begins</strong>.</div>
                </div>
                <div style="font-size: 11px; color: #a7f3d0; line-height: 1.5; border-top: 1px solid rgba(16, 185, 129, 0.25); pt: 10px; padding-top: 10px;">
                  🛡️ <strong>100% Executive Flexibility Guarantee:</strong> If unforeseen scheduling arises, your seat rolls over independently to subsequent monthly cohorts, or you can transfer your seat to any colleague/partner for free anytime.
                </div>
              </div>
            ` : ''}

            <div style="${EMAIL_STYLES.card}">
              <h3 style="${EMAIL_STYLES.cardTitle}">Order Details</h3>
              <div style="border-bottom: 1px solid #1f1f23; padding-bottom: 10px; margin-bottom: 15px;">
                <p style="font-size: 12px; color: #a1a1aa; margin: 0 0 5px 0;">Transaction Reference: <span style="color: #ffffff; font-family: monospace;">${transactionId}</span></p>
                <p style="font-size: 12px; color: #a1a1aa; margin: 0;">Date: <span style="color: #ffffff;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
              </div>
              
              ${itemsHtml}
              
              <div style="display: table; width: 100%; font-size: 16px; font-weight: bold; margin-top: 15px; border-top: 1px solid #27272a; padding-top: 12px;">
                <div style="display: table-cell; text-align: left; color: #ffffff;">Total Amount Paid</div>
                <div style="display: table-cell; text-align: right; color: #3b82f6; font-family: monospace;">${formatMoney(total, currency)}</div>
              </div>
            </div>

            ${(() => {
              const hasJumpstart = items.some((i) => i.title.toLowerCase().includes('jumpstart') || String(i.id) === '17' || String(i.id) === '7' || i.id.includes('store-js'));
              const hasPoiMasterclass = items.some((i) => i.title.toLowerCase().includes('person of interest') || i.title.toLowerCase().includes('poi') || String(i.id) === '12' || i.id.includes('store-poi'));
              const hasSuccessMultiplier = items.some((i) => i.title.toLowerCase().includes('success multiplier') || i.title.toLowerCase().includes('teamwork') || String(i.id) === '22' || i.id.includes('store-team'));
              const hasFitForProfit = items.some((i) => i.title.toLowerCase().includes('fit') || i.title.toLowerCase().includes('profit') || String(i.id) === '16' || i.id.includes('store-ffp'));

              if (hasJumpstart) {
                return `
                  <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.25) 100%); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 12px; padding: 24px; margin: 25px 0; text-align: left;">
                    <div style="display: inline-block; background-color: #10b981; color: #040907; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px;">
                      ✦ JUMPSTART 21-DAY COHORT ONBOARDING (HYBRID: VIRTUAL &amp; ONSITE)
                    </div>
                    <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin: 0 0 10px 0;">Welcome to The 21-Day Jumpstart Accelerator!</h3>
                    <p style="font-size: 14px; line-height: 1.6; color: #d1fae5; margin: 0 0 18px 0;">
                      You are officially confirmed for the 2-Day Live Intensive &amp; 21-Day Daily Spectrum Assignments. Your pass gives you full access to attend <strong>virtually from anywhere worldwide via GoogleMeet</strong> or join our <strong>live onsite partner hubs (Abuja &amp; Lagos)</strong>. Join your private cohort WhatsApp group immediately to receive daily audio drops, accountability prompts, and live links:
                    </p>
                    <div style="text-align: center; margin: 15px 0;">
                      <a href="https://chat.whatsapp.com/JUMPSTART-COHORT" style="display: inline-block; background-color: #25D366; color: #040907; font-weight: 800; font-size: 14px; padding: 14px 28px; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);">
                        👉 Join Private WhatsApp Cohort Group
                      </a>
                    </div>
                    <p style="font-size: 12px; color: #a7f3d0; text-align: center; margin: 10px 0 0 0;">
                      (Click the button above from your phone or desktop to enter the cohort group)
                    </p>
                  </div>
                `;
              }

              if (hasPoiMasterclass) {
                return `
                  <div style="background: linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(30, 58, 138, 0.25) 100%); border: 1px solid rgba(37, 99, 235, 0.4); border-radius: 12px; padding: 24px; margin: 25px 0; text-align: left;">
                    <div style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px;">
                      ✦ POI MASTERCLASS ONBOARDING (VIRTUAL &amp; STUDIO PASS)
                    </div>
                    <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin: 0 0 10px 0;">Seat Confirmed: Person of Interest Masterclass</h3>
                    <p style="font-size: 14px; line-height: 1.6; color: #dbeafe; margin: 0 0 18px 0;">
                      Your seat is secured for the upcoming live masterclass (occurring on the last Saturday of every month). You may join the <strong>Global HD Live Stream virtually from any location</strong> or use your <strong>Studio Pass for onsite attendance in Abuja/Lagos</strong>.
                    </p>
                    <div style="text-align: center; margin: 15px 0;">
                      <a href="https://chat.whatsapp.com/POI-MASTERCLASS" style="display: inline-block; background-color: #25D366; color: #040907; font-weight: 800; font-size: 14px; padding: 14px 28px; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);">
                        👉 Join Masterclass Attendee Group
                      </a>
                    </div>
                  </div>
                `;
              }

              if (hasSuccessMultiplier) {
                return `
                  <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(180, 83, 9, 0.25) 100%); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 12px; padding: 24px; margin: 25px 0; text-align: left;">
                    <div style="display: inline-block; background-color: #f59e0b; color: #111827; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px;">
                      ✦ THE SUCCESS MULTIPLIER (HYBRID TEAMWORK ACCELERATOR)
                    </div>
                    <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin: 0 0 10px 0;">Seat Confirmed: High-Performance Teamwork</h3>
                    <p style="font-size: 14px; line-height: 1.6; color: #fef3c7; margin: 0 0 18px 0;">
                      Your seat is locked for <strong>The Success Multiplier: The Power of Working with Others</strong>. Access live virtual sessions worldwide or join fellow executives at our Lagos &amp; Abuja studio partner hubs. Join the private cohort group below:
                    </p>
                    <div style="text-align: center; margin: 15px 0;">
                      <a href="https://chat.whatsapp.com/SUCCESS-MULTIPLIER-COHORT" style="display: inline-block; background-color: #25D366; color: #040907; font-weight: 800; font-size: 14px; padding: 14px 28px; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);">
                        👉 Join Teamwork Cohort Group
                      </a>
                    </div>
                  </div>
                `;
              }

              if (hasFitForProfit) {
                return `
                  <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.25) 100%); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 12px; padding: 24px; margin: 25px 0; text-align: left;">
                    <div style="display: inline-block; background-color: #10b981; color: #040907; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px;">
                      ✦ FIT-FOR-PROFIT WORKSHOP PASS (VIRTUAL &amp; REGIONAL ONSITE)
                    </div>
                    <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin: 0 0 10px 0;">Seat Confirmed for Fit-For-Profit!</h3>
                    <p style="font-size: 14px; line-height: 1.6; color: #d1fae5; margin: 0 0 18px 0;">
                      Your registration is confirmed. Attend <strong>virtually via global livestream from anywhere</strong> or join <strong>onsite at our multi-state regional physical centers (Lagos, Abuja, Uyo, Port Harcourt)</strong>.
                    </p>
                    <div style="text-align: center; margin: 15px 0;">
                      <a href="https://chat.whatsapp.com/FIT-FOR-PROFIT-COHORT" style="display: inline-block; background-color: #25D366; color: #040907; font-weight: 800; font-size: 14px; padding: 14px 28px; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);">
                        👉 Join Fit-For-Profit Attendee Group
                      </a>
                    </div>
                  </div>
                `;
              }

              return '';
            })()}

            <div style="${EMAIL_STYLES.buttonContainer}">
              <a href="${SITE_URL}/purchases" style="${EMAIL_STYLES.button}">Access Your Executive Pass &amp; Dashboard →</a>
            </div>

            <p style="${EMAIL_STYLES.paragraph}">
              Your dashboard at <strong>${SITE_URL}/purchases</strong> houses your active enrollment passes, sprint materials, companion PDF frameworks, and balance completion tools.
            </p>
          </div>
          <div style="${EMAIL_STYLES.footer}">
            <p style="${EMAIL_STYLES.footerText}">
              If you have any questions or need concierge support, reply directly to this email or reach us at <a href="mailto:support@mindvestglobalresources.com.ng" style="${EMAIL_STYLES.footerLink}">support@mindvestglobalresources.com.ng</a>.
            </p>
            <p style="${EMAIL_STYLES.footerText}">
              &copy; ${new Date().getFullYear()} Origin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: 'Your Origin Order Receipt',
    html,
  });
}

/**
 * Sends a notification email to a gift recipient.
 */
export async function sendGiftEmail(
  to: string,
  recipientName: string,
  purchaserName: string,
  giftMessage: string,
  courseTitle: string
) {
  const SITE_URL = getSiteUrl();
  const formattedMessage = giftMessage 
    ? `<div style="font-style: italic; background-color: #121214; border-left: 3px solid #2563eb; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; color: #e4e4e7;">
         "${giftMessage}"
       </div>`
    : '';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>You've Received a Gift!</title>
    </head>
    <body style="${EMAIL_STYLES.body}">
      <div style="${EMAIL_STYLES.wrapper}">
        <div class="container" style="${EMAIL_STYLES.container}">
          <div style="${EMAIL_STYLES.header}">
            <a href="${SITE_URL}" style="text-decoration: none; display: inline-block; vertical-align: middle;">
              <img src="${SITE_URL}/origin.png" alt="Origin Logo" width="32" height="32" style="display: inline-block; vertical-align: middle; border: 0; outline: none;" />
              <span style="font-size: 20px; font-weight: 800; letter-spacing: 0.15em; color: #ffffff; text-transform: uppercase; text-decoration: none; vertical-align: middle; margin-left: 10px; font-family: 'Inter', sans-serif;">ORIGIN</span>
            </a>
          </div>
          <div style="${EMAIL_STYLES.content}">
            <h1 style="${EMAIL_STYLES.title}">A learning gift for you!</h1>
            <p style="${EMAIL_STYLES.paragraph}">Hi ${recipientName},</p>
            <p style="${EMAIL_STYLES.paragraph}">
              We are excited to let you know that <strong>${purchaserName}</strong> has gifted you a learning track on Origin:
            </p>
            
            <div style="background-color: #121214; border: 1px solid #1f1f23; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
              <h2 style="font-size: 20px; font-weight: 700; color: #ffffff; margin: 0 0 10px 0;">${courseTitle}</h2>
              <p style="font-size: 14px; color: #a1a1aa; margin: 0;">Full lifetime access, study guides, and interactive exercises.</p>
            </div>

            ${formattedMessage}

            <p style="${EMAIL_STYLES.paragraph}">
              To claim your gift and start learning, click the button below to create your account or log in. The course will automatically be added to your profile library.
            </p>

            <div style="${EMAIL_STYLES.buttonContainer}">
              <a href="${SITE_URL}/auth?redeemGift=true&email=${encodeURIComponent(to)}" style="${EMAIL_STYLES.button}">Claim Your Gift Now</a>
            </div>

            <p style="${EMAIL_STYLES.paragraph}">
              We hope this resource helps you on your path to building new competencies and focus.
            </p>
          </div>
          <div style="${EMAIL_STYLES.footer}">
            <p style="${EMAIL_STYLES.footerText}">
              If you did not expect this email, you can securely ignore it.
            </p>
            <p style="${EMAIL_STYLES.footerText}">
              &copy; ${new Date().getFullYear()} Origin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: `${purchaserName} sent you a learning gift on Origin!`,
    html,
  });
}

export interface ContactNotificationParams {
  name: string;
  email: string;
  category?: string;
  subject: string;
  message: string;
  source?: string;
}

/**
 * Sends incoming contact inquiry directly to the official support inbox via Resend.
 */
export async function sendContactInquiryNotification({
  name,
  email,
  category = "General Inquiry",
  subject,
  message,
  source = "Origin Support Desk"
}: ContactNotificationParams) {
  const SITE_URL = getSiteUrl();
  const supportInbox = process.env.SUPPORT_INBOX_EMAIL || 'support@mindvestglobalresources.com.ng';
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }) + ' (WAT)';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Inquiry: ${subject}</title>
    </head>
    <body style="${EMAIL_STYLES.body}">
      <div style="${EMAIL_STYLES.wrapper}">
        <div class="container" style="${EMAIL_STYLES.container}">
          <div style="${EMAIL_STYLES.header}">
            <a href="${SITE_URL}" style="text-decoration: none; display: inline-block; vertical-align: middle;">
              <img src="${SITE_URL}/origin.png" alt="Origin Logo" width="32" height="32" style="display: inline-block; vertical-align: middle; border: 0; outline: none;" />
              <span style="font-size: 20px; font-weight: 800; letter-spacing: 0.15em; color: #ffffff; text-transform: uppercase; text-decoration: none; vertical-align: middle; margin-left: 10px; font-family: 'Inter', sans-serif;">ORIGIN CONCIERGE</span>
            </a>
          </div>
          <div style="${EMAIL_STYLES.content}">
            <div style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 15px;">
              ✦ INCOMING SUPPORT TICKET
            </div>
            
            <h1 style="${EMAIL_STYLES.title}">${subject}</h1>
            
            <div style="${EMAIL_STYLES.card}">
              <div style="border-bottom: 1px solid #1f1f23; padding-bottom: 12px; margin-bottom: 15px;">
                <p style="font-size: 13px; color: #a1a1aa; margin: 0 0 6px 0;">
                  <strong style="color: #ffffff;">From:</strong> ${name} &lt;<a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a>&gt;
                </p>
                <p style="font-size: 13px; color: #a1a1aa; margin: 0 0 6px 0;">
                  <strong style="color: #ffffff;">Category:</strong> <span style="color: #34d399; font-weight: 700; text-transform: uppercase;">${category}</span>
                </p>
                <p style="font-size: 13px; color: #a1a1aa; margin: 0 0 6px 0;">
                  <strong style="color: #ffffff;">Origin Source:</strong> ${source}
                </p>
                <p style="font-size: 13px; color: #a1a1aa; margin: 0;">
                  <strong style="color: #ffffff;">Timestamp:</strong> ${timestamp}
                </p>
              </div>

              <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #a1a1aa; margin: 0 0 10px 0;">Message Content:</h3>
              <div style="background-color: #050505; border: 1px solid #27272a; border-radius: 8px; padding: 18px; color: #f4f4f5; font-size: 15px; line-height: 1.6; white-space: pre-wrap; font-family: 'Inter', sans-serif;">${message}</div>
            </div>

            <div style="${EMAIL_STYLES.buttonContainer}">
              <a href="mailto:${email}?subject=${encodeURIComponent('Re: ' + subject)}" style="${EMAIL_STYLES.button}">Reply Directly to ${name}</a>
            </div>

            <p style="font-size: 12px; color: #71717a; text-align: center; margin-top: 20px;">
              You can also reply directly to this email from your email client (Reply-To has been set to ${email}).
            </p>
          </div>
          <div style="${EMAIL_STYLES.footer}">
            <p style="${EMAIL_STYLES.footerText}">
              Mindvest Global Resources Ltd. • Origin Support System
            </p>
            <p style="${EMAIL_STYLES.footerText}">
              &copy; ${new Date().getFullYear()} Origin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: supportInbox,
    replyTo: email,
    subject: `[Origin Support: ${category}] ${subject} (from ${name})`,
    html,
  });
}

export interface EventReminderParams {
  to: string;
  buyerName: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  mode?: string;
  paymentPlan?: 'full' | 'deposit';
  balanceDueNGN?: number;
  hasPaidBalance?: boolean;
}

/**
 * Sends a 3-Day Event Reminder & Balance Notification to registered attendees.
 * Reminds them of the live cohort in 3 days, details session logistics,
 * provides balance completion link if on 2-Stage Plan, and confirms they should ignore payment if already cleared.
 */
export async function sendEventReminderEmail({
  to,
  buyerName,
  eventTitle,
  eventDate,
  eventTime,
  mode = 'Virtual HD Stream (GoogleMeet) & Onsite Hubs',
  paymentPlan = 'full',
  balanceDueNGN = 0,
  hasPaidBalance = false,
}: EventReminderParams) {
  const SITE_URL = getSiteUrl();
  const isDepositPending = paymentPlan === 'deposit' && !hasPaidBalance && balanceDueNGN > 0;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>3 Days to ${eventTitle} — Your Cohort Schedule & Details</title>
    </head>
    <body style="${EMAIL_STYLES.body}">
      <div style="${EMAIL_STYLES.wrapper}">
        <div class="container" style="${EMAIL_STYLES.container}">
          <div style="${EMAIL_STYLES.header}">
            <a href="${SITE_URL}" style="text-decoration: none; display: inline-block; vertical-align: middle;">
              <img src="${SITE_URL}/origin.png" alt="Origin Logo" width="32" height="32" style="display: inline-block; vertical-align: middle; border: 0; outline: none;" />
              <span style="font-size: 20px; font-weight: 800; letter-spacing: 0.15em; color: #ffffff; text-transform: uppercase; text-decoration: none; vertical-align: middle; margin-left: 10px; font-family: 'Inter', sans-serif;">ORIGIN COHORT</span>
            </a>
          </div>
          <div style="${EMAIL_STYLES.content}">
            <div style="display: inline-block; background-color: #f59e0b; color: #111827; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 15px;">
              ✦ 3 DAYS TO YOUR LIVE COHORT
            </div>
            
            <h1 style="${EMAIL_STYLES.title}">Get Ready: ${eventTitle} Begins in 3 Days!</h1>
            <p style="${EMAIL_STYLES.paragraph}">Hi ${buyerName},</p>
            <p style="${EMAIL_STYLES.paragraph}">
              This is your official 3-day reminder for the upcoming <strong>${eventTitle}</strong>. Our faculty, regional studio hosts, and executive moderators are preparing to welcome you.
            </p>

            {/* Session Schedule Card */}
            <div style="${EMAIL_STYLES.card}">
              <h3 style="${EMAIL_STYLES.cardTitle}">Event Details &amp; Logistics</h3>
              <div style="font-size: 13px; line-height: 1.8; color: #e4e4e7;">
                <div>📅 <strong>Date:</strong> <span style="color: #fde68a;">${eventDate}</span></div>
                <div>⏰ <strong>Time:</strong> <span style="color: #ffffff;">${eventTime}</span></div>
                <div>🌐 <strong>Attendance Mode:</strong> <span style="color: #6ee7b7;">${mode}</span></div>
                <div>📍 <strong>Onsite Hubs:</strong> Victoria Island (Lagos) &amp; Maitama Suite (Abuja)</div>
              </div>
            </div>

            {/* Conditional Payment Block */}
            ${isDepositPending ? `
              <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(180, 83, 9, 0.3) 100%); border: 1px solid rgba(245, 158, 11, 0.5); border-radius: 14px; padding: 22px; margin: 25px 0; text-align: left;">
                <div style="display: inline-block; background-color: #fde68a; color: #78350f; font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 10px;">
                  ★ ACTION REQUIRED: FINAL BALANCE DUE 3 DAYS PRIOR
                </div>
                <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin: 0 0 10px 0;">Settle Remaining Balance to Clear Pass</h3>
                <p style="font-size: 13px; line-height: 1.6; color: #fef3c7; margin: 0 0 14px 0;">
                  Your designated seat is held with your Stage 1 Commitment Deposit. Per policy, the remaining balance of <strong>₦${balanceDueNGN.toLocaleString()} NGN</strong> is due today (3 days prior to the event) to clear your live broadcast credentials and reception entry pass.
                </p>
                <div style="text-align: center; margin: 18px 0 12px 0;">
                  <a href="${SITE_URL}/purchases" style="display: inline-block; background-color: #f59e0b; color: #111827; font-weight: 800; font-size: 14px; padding: 14px 28px; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 16px rgba(245, 158, 11, 0.35);">
                    👉 Complete Balance of ₦${balanceDueNGN.toLocaleString()} Now →
                  </a>
                </div>
                <div style="font-size: 12px; color: #fde68a; line-height: 1.5; margin-top: 14px; border-top: 1px solid rgba(245, 158, 11, 0.3); padding-top: 10px;">
                  <strong>Important Notice:</strong> If you have already paid this balance or settled in full with our admissions desk, <em>please ignore this payment reminder</em>. Your pass is 100% active!
                </div>
              </div>
            ` : `
              <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 12px; padding: 18px; margin: 25px 0;">
                <div style="color: #6ee7b7; font-weight: 700; font-size: 14px;">✓ TUITION 100% CLEARED &amp; CONFIRMED</div>
                <p style="color: #d1fae5; font-size: 13px; margin: 6px 0 0 0; line-height: 1.5;">
                  Your VIP cohort pass is completely paid and confirmed. You do not owe any remaining balance. <strong>Please disregard any balance notice and see you at the event!</strong>
                </p>
              </div>
            `}

            <div style="${EMAIL_STYLES.buttonContainer}">
              <a href="${SITE_URL}/purchases" style="${EMAIL_STYLES.button}">View Your Registration &amp; Frameworks →</a>
            </div>

            <p style="${EMAIL_STYLES.paragraph}">
              Need to substitute a colleague or partner? Under our <strong>Executive Partner Flexibility Policy</strong>, you can swap seats with any colleague or team member for free anytime up to 2 hours prior to start.
            </p>
          </div>
          <div style="${EMAIL_STYLES.footer}">
            <p style="${EMAIL_STYLES.footerText}">
              If you have any questions or need concierge support, reply to this email or contact <a href="mailto:support@mindvestglobalresources.com.ng" style="${EMAIL_STYLES.footerLink}">support@mindvestglobalresources.com.ng</a>.
            </p>
            <p style="${EMAIL_STYLES.footerText}">
              &copy; ${new Date().getFullYear()} Origin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: `Reminder: ${eventTitle} is in 3 Days! Your Cohort Schedule & Access`,
    html,
  });
}


