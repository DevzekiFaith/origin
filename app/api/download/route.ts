import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyDownloadToken } from '../../../lib/downloadToken';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tier = searchParams.get('tier');
    const token = searchParams.get('token');
    const requestedFile = searchParams.get('file');

    const documentsDir = path.join(process.cwd(), 'public', 'documents');

    // 1. FREE DOWNLOAD PATH:
    // If the request is for the Free 7-Day Sprint Starter, permit immediate download without payment token.
    if (tier === 'free' || requestedFile === 'origin_7day_sprint_starter.pdf') {
      const freeFilePath = path.join(documentsDir, 'origin_7day_sprint_starter.pdf');
      if (!fs.existsSync(freeFilePath)) {
        return NextResponse.json({ error: 'File not found on server' }, { status: 404 });
      }

      const fileBuffer = fs.readFileSync(freeFilePath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="Origin_7Day_Sprint_Starter.pdf"',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // 2. PAID DOWNLOAD PATH:
    // Any paid tier (digital_pro, hardcover) MUST have a cryptographically verified download token
    // issued exclusively after confirmed Flutterwave server-to-server transaction verification.
    if (!token) {
      return NextResponse.json(
        {
          error: 'Access Denied: Payment confirmation is required before downloading this paid material.',
          resolution: 'Please complete your checkout at /planner to receive verified access.',
        },
        { status: 403 }
      );
    }

    const payload = verifyDownloadToken(token);
    if (!payload) {
      return NextResponse.json(
        {
          error: 'Access Denied: Download link is invalid, unverified, or expired.',
          resolution: 'Please check your confirmation email or contact support with your transaction reference.',
        },
        { status: 403 }
      );
    }

    // Resolve file based on verified tier or payload
    let targetFileName = 'origin_21day_digital_master_kit.pdf';
    let downloadDownloadName = 'Origin_21Day_Digital_Master_Kit.pdf';

    if (payload.tier === 'hardcover' && requestedFile?.includes('companion')) {
      targetFileName = 'origin_21day_hardcover_companion.pdf';
      downloadDownloadName = 'Origin_21Day_Hardcover_Companion.pdf';
    }

    let filePath = path.join(documentsDir, targetFileName);

    // Fallback to backward-compatible filename if 21-day alias is used
    if (!fs.existsSync(filePath)) {
      const altFile = targetFileName.replace('21day', '90day');
      filePath = path.join(documentsDir, altFile);
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Requested digital asset not found on server' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${downloadDownloadName}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (err: any) {
    console.error('[Download API] Handler error:', err);
    return NextResponse.json({ error: 'Internal server error while processing download' }, { status: 500 });
  }
}
