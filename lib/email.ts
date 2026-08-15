import { Resend } from 'resend';

// Dynamic Resend client getter
export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY || '';
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export const resend = getResendClient();

// Default sender address
const getFromEmail = () => process.env.NEXT_PUBLIC_FROM_EMAIL || process.env.FROM_EMAIL || 'Origin <support@mindvestglobalresources.com.ng>';

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
}

/**
 * Core utility to send an email via Resend with automatic fallback
 */
export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const client = getResendClient();
  if (!client) {
    console.warn('[Email Service] Resend client not initialized. Make sure RESEND_API_KEY is configured.');
    return { success: false, error: 'Email service unconfigured' };
  }

  const primaryFrom = getFromEmail();

  try {
    const data = await client.emails.send({
      from: primaryFrom,
      to,
      subject,
      html,
    });

    if (data.error) {
      console.warn(`[Email Service] Primary send failed with from "${primaryFrom}":`, data.error.message);
      
      // If error was domain verification, attempt fallback to onboarding@resend.dev
      if (primaryFrom !== 'Origin <onboarding@resend.dev>') {
        console.log('[Email Service] Attempting fallback to onboarding@resend.dev...');
        const fallbackData = await client.emails.send({
          from: 'Origin <onboarding@resend.dev>',
          to,
          subject,
          html,
        });

        if (!fallbackData.error) {
          console.log('[Email Service] Fallback email sent successfully. ID:', fallbackData.data?.id);
          return { success: true, id: fallbackData.data?.id };
        }
      }

      return { success: false, error: data.error.message };
    }

    console.log(`[Email Service] Email sent successfully to ${to}. ID:`, data.data?.id);
    return { success: true, id: data.data?.id };
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
  const currencySymbol = currency === 'NGN' ? '₦' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  
  const itemsHtml = items
    .map(
      (item) => `
      <div style="display: table; width: 100%; margin-bottom: 12px; font-size: 14px; font-family: sans-serif;">
        <div style="display: table-cell; text-align: left; color: #e4e4e7;">${item.title}</div>
        <div style="display: table-cell; text-align: right; color: #ffffff; font-weight: 600;">${currencySymbol}${item.price.toFixed(2)}</div>
      </div>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Origin Receipt</title>
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
            <h1 style="${EMAIL_STYLES.title}">Thank you for your purchase!</h1>
            <p style="${EMAIL_STYLES.paragraph}">Hi ${buyerName},</p>
            <p style="${EMAIL_STYLES.paragraph}">
              Your payment has been successfully processed. You now have immediate lifetime access to your learning materials.
            </p>

            <div style="${EMAIL_STYLES.card}">
              <h3 style="${EMAIL_STYLES.cardTitle}">Order Details</h3>
              <div style="border-bottom: 1px solid #1f1f23; padding-bottom: 10px; margin-bottom: 15px;">
                <p style="font-size: 12px; color: #a1a1aa; margin: 0 0 5px 0;">Transaction ID: <span style="color: #ffffff; font-family: monospace;">${transactionId}</span></p>
                <p style="font-size: 12px; color: #a1a1aa; margin: 0;">Date: <span style="color: #ffffff;">${new Date().toLocaleDateString()}</span></p>
              </div>
              
              ${itemsHtml}
              
              <hr style="${EMAIL_STYLES.divider}">
              
              <div style="display: table; width: 100%; font-size: 16px; font-weight: bold; margin-top: 15px;">
                <div style="display: table-cell; text-align: left; color: #ffffff;">Total Paid</div>
                <div style="display: table-cell; text-align: right; color: #3b82f6;">${currencySymbol}${total.toFixed(2)}</div>
              </div>
            </div>

            <div style="${EMAIL_STYLES.buttonContainer}">
              <a href="${SITE_URL}/purchases" style="${EMAIL_STYLES.button}">Access Your Content</a>
            </div>

            <p style="${EMAIL_STYLES.paragraph}">
              If you bought a digital resource (like a planner or journal PDF), you can also download it directly from your purchases dashboard.
            </p>
          </div>
          <div style="${EMAIL_STYLES.footer}">
            <p style="${EMAIL_STYLES.footerText}">
              If you have any questions or need support, reply to this email or visit our Help Center.
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
