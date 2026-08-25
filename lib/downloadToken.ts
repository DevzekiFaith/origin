import crypto from 'crypto';

const SECRET = process.env.DOWNLOAD_TOKEN_SECRET || process.env.FLUTTERWAVE_SECRET_KEY || 'origin-secure-planner-download-salt-2026';

export interface DownloadTokenPayload {
  tier: string;
  txId?: string | number;
  txRef?: string;
  email: string;
  exp: number; // timestamp in ms
}

/**
 * Generate a cryptographically signed download token for paid materials.
 * Defaults to 48 hours validity.
 */
export function generateDownloadToken(
  payload: Omit<DownloadTokenPayload, 'exp'> & { expiresInHours?: number }
): string {
  const expiresInHours = payload.expiresInHours || 48;
  const exp = Date.now() + expiresInHours * 60 * 60 * 1000;

  const data: DownloadTokenPayload = {
    tier: payload.tier,
    txId: payload.txId,
    txRef: payload.txRef,
    email: payload.email,
    exp,
  };

  const jsonStr = JSON.stringify(data);
  const base64Data = Buffer.from(jsonStr).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(base64Data)
    .digest('base64url');

  return `${base64Data}.${signature}`;
}

/**
 * Verify a cryptographically signed download token.
 * Returns decoded payload if valid and unexpired, or null otherwise.
 */
export function verifyDownloadToken(token: string): DownloadTokenPayload | null {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return null;
  }

  const [base64Data, providedSignature] = token.split('.');
  if (!base64Data || !providedSignature) {
    return null;
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', SECRET)
      .update(base64Data)
      .digest('base64url');

    // Constant-time comparison to prevent timing attacks
    const providedBuf = Buffer.from(providedSignature);
    const expectedBuf = Buffer.from(expectedSignature);

    if (providedBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(providedBuf, expectedBuf)) {
      return null;
    }

    const jsonStr = Buffer.from(base64Data, 'base64url').toString('utf8');
    const payload: DownloadTokenPayload = JSON.parse(jsonStr);

    if (!payload.exp || Date.now() > payload.exp) {
      // Expired token
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}
