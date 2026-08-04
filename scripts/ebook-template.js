/**
 * ebook-template.js — Origin Modern Ebook Template
 * Style: Black Editorial (from template image)
 *   - Full-bleed black cover, large bold title, author strip at bottom
 *   - Clean "Contents" TOC with dot leaders
 *   - Large chapter number opener (01, 02…) on black half-page
 *   - Dark pull-quote pages with oversized " mark
 *   - Clean body pages: thin header line, book title left, page num right
 *   - About the Author — black band header, bio below
 */
const { rgb, StandardFonts } = require('pdf-lib');

// ── Palette ─────────────────────────────────────────────────────────────────
const T = {
  black:    rgb(0.04, 0.04, 0.05),
  charcoal: rgb(0.11, 0.12, 0.13),
  dark:     rgb(0.17, 0.18, 0.20),
  mid:      rgb(0.40, 0.42, 0.45),
  rule:     rgb(0.76, 0.77, 0.78),
  offWhite: rgb(0.96, 0.96, 0.97),
  white:    rgb(1, 1, 1),
};

// Embed all fonts into a doc
async function embedFonts(doc) {
  return {
    R:  await doc.embedFont(StandardFonts.Helvetica),
    B:  await doc.embedFont(StandardFonts.HelveticaBold),
    It: await doc.embedFont(StandardFonts.HelveticaOblique),
  };
}

// Sanitize text for WinAnsi encoding standard font limitation
function cleanText(str) {
  if (!str) return '';
  return String(str)
    .replace(/₦/g, 'NGN ')
    .replace(/→/g, '->')
    .replace(/•/g, '-')
    .replace(/·/g, '-')
    .replace(/—/g, '--')
    .replace(/–/g, '-')
    .replace(/“/g, '"')
    .replace(/”/g, '"')
    .replace(/‘/g, "'")
    .replace(/’/g, "'");
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function wrap(page, text, font, size, color, x, y, maxW, lh) {
  const sanitized = cleanText(text);
  for (const para of sanitized.split('\n')) {
    if (!para.trim()) { y -= lh * 0.5; continue; }
    let line = '';
    for (const word of para.split(' ')) {
      const test = line + word + ' ';
      if (font.widthOfTextAtSize(test, size) > maxW && line) {
        page.drawText(line.trimEnd(), { x, y, size, font, color });
        line = word + ' '; y -= lh;
      } else { line = test; }
    }
    if (line.trim()) { page.drawText(line.trimEnd(), { x, y, size, font, color }); y -= lh; }
  }
  return y;
}

function center(page, text, font, size, color, y, pageW) {
  const sanitized = cleanText(text);
  const w = font.widthOfTextAtSize(sanitized, size);
  page.drawText(sanitized, { x: (pageW - w) / 2, y, size, font, color });
}

// ── Template Pages ───────────────────────────────────────────────────────────

/**
 * COVER — full-bleed black, large title top-left, accent stripe, author strip bottom
 */
async function cover(page, { title, subtitle, author, accent, fonts, coverImage, doc }) {
  const { width: W, height: H } = page.getSize();
  const { R, B, It } = fonts;

  if (coverImage && doc) {
    // Full-page image cover (for Money Farming)
    try {
      const imgBytes = require('fs').readFileSync(coverImage);
      let embedded;
      try { embedded = await doc.embedJpg(imgBytes); }
      catch { embedded = await doc.embedPng(imgBytes); }
      page.drawImage(embedded, { x: 0, y: 0, width: W, height: H });
      // Bottom author strip
      page.drawRectangle({ x: 0, y: 0, width: W, height: 80, color: rgb(0.03, 0.03, 0.04) });
      page.drawRectangle({ x: 0, y: 78, width: W, height: 3, color: accent });
      page.drawText(cleanText(author.toUpperCase()), { x: 52, y: 50, size: 13, font: B, color: T.white });
      page.drawText('THE BECOMING INSTITUTE  -  www.origin.com.ng', { x: 52, y: 28, size: 8.5, font: R, color: T.rule });
      page.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: accent });
      return;
    } catch (e) { /* fall through to text cover */ }
  }

  // Default: Black editorial cover
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: T.black });
  page.drawRectangle({ x: 0, y: H - 5, width: W, height: 5, color: accent });
  page.drawRectangle({ x: 44, y: 90, width: 3, height: H - 180, color: accent });

  const titleLines = cleanText(title).split('\n');
  let ty = H - 105;
  for (const line of titleLines) {
    page.drawText(line, { x: 60, y: ty, size: 52, font: B, color: T.white });
    ty -= 62;
  }

  page.drawRectangle({ x: 60, y: ty + 28, width: 260, height: 2, color: accent });

  if (subtitle) {
    ty -= 12;
    ty = wrap(page, subtitle, It, 13, T.rule, 60, ty, W - 120, 19);
  }

  page.drawRectangle({ x: 0, y: 0, width: W, height: 80, color: T.charcoal });
  page.drawRectangle({ x: 0, y: 78, width: W, height: 2, color: accent });
  page.drawText(cleanText(author.toUpperCase()), { x: 60, y: 50, size: 13, font: B, color: T.white });
  page.drawText('THE BECOMING INSTITUTE  -  www.origin.com.ng', { x: 60, y: 28, size: 8.5, font: R, color: T.rule });
}

/**
 * COPYRIGHT PAGE — minimal, left-aligned
 */
function copyrightPage(page, { title, author, dedication, accent, fonts }) {
  const { width: W, height: H } = page.getSize();
  const { R, B, It } = fonts;
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: T.offWhite });

  let y = H - 95;
  page.drawText(cleanText('© 2025 ' + author), { x: 60, y, size: 11, font: B, color: T.dark }); y -= 18;
  page.drawText(cleanText(title), { x: 60, y, size: 10, font: It, color: T.mid }); y -= 15;
  page.drawText('Publisher: The Becoming Institute', { x: 60, y, size: 9.5, font: R, color: T.mid }); y -= 13;
  page.drawText('Website: www.origin.com.ng', { x: 60, y, size: 9.5, font: R, color: T.mid }); y -= 13;
  page.drawText('All rights reserved. No reproduction without permission.', { x: 60, y, size: 8.5, font: R, color: T.rule }); y -= 48;

  page.drawRectangle({ x: 60, y, width: W - 120, height: 1, color: T.rule }); y -= 38;
  page.drawText('DEDICATION', { x: 60, y, size: 13, font: B, color: accent }); y -= 28;
  wrap(page, dedication, It, 11, T.dark, 60, y, W - 120, 18);

  page.drawText('An Official Origin Publication', { x: 60, y: 48, size: 9, font: R, color: T.rule });
}

/**
 * TABLE OF CONTENTS
 */
function tocPage(page, { chapters, accent, fonts }) {
  const { width: W, height: H } = page.getSize();
  const { R, B } = fonts;
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: T.white });

  page.drawRectangle({ x: 0, y: H - 88, width: W, height: 88, color: T.black });
  page.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: accent });
  page.drawText('TABLE OF', { x: 60, y: H - 44, size: 10, font: B, color: accent });
  page.drawText('CONTENTS', { x: 60, y: H - 70, size: 26, font: B, color: T.white });

  page.drawRectangle({ x: 60, y: H - 106, width: W - 120, height: 1.5, color: accent });

  let y = H - 140;
  for (const c of chapters) {
    const cNum = cleanText(c.num);
    const cTitle = cleanText(c.title);
    page.drawText(cNum, { x: 60, y, size: 8.5, font: B, color: accent });
    const numW = B.widthOfTextAtSize(cNum, 8.5) + 16;
    const maxTitle = Math.min(cTitle.length, 52);
    page.drawText(cTitle, { x: 60 + numW, y, size: 10.5, font: R, color: T.dark });
    const titleW = R.widthOfTextAtSize(cTitle.substring(0, maxTitle), 10.5);
    const pgStr = String(c.pg);
    const pgW = B.widthOfTextAtSize(pgStr, 9.5);
    let dx = 60 + numW + titleW + 6;
    const dEnd = W - 60 - pgW - 8;
    while (dx < dEnd) { page.drawText('.', { x: dx, y, size: 8, font: R, color: T.rule }); dx += 5.5; }
    page.drawText(pgStr, { x: W - 60 - pgW, y, size: 9.5, font: B, color: T.dark });
    y -= 27;
    if (y < 80) break;
  }

  page.drawRectangle({ x: 60, y: 58, width: W - 120, height: 1, color: T.rule });
  page.drawText('Origin by The Becoming Institute  -  www.origin.com.ng', { x: 60, y: 40, size: 8, font: R, color: T.rule });
}

/**
 * CHAPTER OPENER
 */
function chapterOpener(page, { num, title, subtitle, accent, fonts }) {
  const { width: W, height: H } = page.getSize();
  const { R, B, It } = fonts;
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: T.white });

  const bandH = Math.round(H * 0.40);
  page.drawRectangle({ x: 0, y: H - bandH, width: W, height: bandH, color: T.black });
  page.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: accent });

  const numStr = String(num).padStart(2, '0');
  page.drawText(numStr, { x: W - 190, y: H - bandH + 10, size: 140, font: B, color: T.charcoal });

  page.drawText('CHAPTER', { x: 60, y: H - 52, size: 9.5, font: B, color: accent });

  let ty = H - 85;
  ty = wrap(page, title, B, 28, T.white, 60, ty, W - 180, 36);

  page.drawRectangle({ x: 60, y: H - bandH + 20, width: 200, height: 2.5, color: accent });

  if (subtitle) {
    let sy = H - bandH - 38;
    sy = wrap(page, subtitle, It, 12.5, T.mid, 60, sy, W - 120, 19);
    return H - bandH - 90;
  }
  return H - bandH - 55;
}

/**
 * PULL QUOTE PAGE
 */
function quotePage(page, { quote, attribution, accent, fonts }) {
  const { width: W, height: H } = page.getSize();
  const { R, B, It } = fonts;
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: T.charcoal });
  page.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: accent });
  page.drawRectangle({ x: 0, y: 0, width: W, height: 4, color: accent });

  page.drawText('"', { x: 44, y: H - 100, size: 110, font: B, color: accent });

  const sanitized = cleanText(quote);
  const lines = [];
  let line = '';
  for (const w of sanitized.split(' ')) {
    const test = line + w + ' ';
    if (It.widthOfTextAtSize(test, 20) > W - 160 && line) {
      lines.push(line.trimEnd()); line = w + ' ';
    } else { line = test; }
  }
  if (line.trim()) lines.push(line.trimEnd());

  let qy = H - 210;
  for (const l of lines) { center(page, l, It, 20, T.white, qy, W); qy -= 30; }

  if (attribution) {
    qy -= 22;
    center(page, '-- ' + attribution, R, 12, T.rule, qy, W);
  }
}

/**
 * ABOUT THE AUTHOR
 */
function aboutPage(page, { accent, fonts }) {
  const { width: W, height: H } = page.getSize();
  const { R, B, It } = fonts;
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: T.white });

  page.drawRectangle({ x: 0, y: H - 100, width: W, height: 100, color: T.black });
  page.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: accent });
  page.drawText('ABOUT THE AUTHOR', { x: 60, y: H - 50, size: 20, font: B, color: T.white });
  page.drawText('ZEKI UBOR', { x: 60, y: H - 74, size: 12, font: B, color: accent });
  page.drawText('Transformational Trainer  -  Author  -  Architect', { x: 60, y: H - 92, size: 9, font: R, color: T.rule });

  let y = H - 140;
  const bio = `Zeki Ubor is a transformational trainer, author, entrepreneur, and architect dedicated to helping individuals discover their value, maximize their potential, and create lasting impact.

As the founder of Lifebuild Innovators, Unova Consulting, Unova Designs, and Yonan Technologies, he seamlessly blends creativity, strategy, and innovation to drive meaningful change across industries.

He is the facilitator of the "3 Steps Transformational Journey Blueprint" — a structured pathway to unlocking human potential — and the creator of "Becoming a Person of Interest," a program designed to empower individuals to establish influence, relevance, and impact in their fields.`;

  y = wrap(page, bio, R, 10.5, T.dark, 60, y, W - 120, 17);

  y -= 32;
  page.drawRectangle({ x: 60, y: y - 60, width: W - 120, height: 60, color: T.black });
  page.drawRectangle({ x: 60, y: y, width: W - 120, height: 3, color: accent });
  page.drawText('An Official Origin Publication', { x: 78, y: y - 24, size: 12, font: B, color: T.white });
  page.drawText('Downloaded via Origin Store  -  www.origin.com.ng', { x: 78, y: y - 44, size: 9.5, font: R, color: T.rule });
}

/**
 * RUNNING HEADER + FOOTER
 */
function decoratePage(page, bookTitle, pageNum, fonts) {
  const { width: W, height: H } = page.getSize();
  const { R, B } = fonts;
  page.drawRectangle({ x: 52, y: H - 36, width: W - 104, height: 0.7, color: T.rule });
  page.drawText(cleanText(bookTitle.toUpperCase()), { x: 52, y: H - 27, size: 7.5, font: B, color: T.rule });
  page.drawText('THE BECOMING INSTITUTE', {
    x: W - 52 - B.widthOfTextAtSize('THE BECOMING INSTITUTE', 7.5),
    y: H - 27, size: 7.5, font: B, color: T.rule,
  });
  page.drawRectangle({ x: 52, y: 40, width: W - 104, height: 0.7, color: T.rule });
  page.drawText('www.origin.com.ng', { x: 52, y: 26, size: 7.5, font: R, color: T.rule });
  const pgStr = String(pageNum);
  page.drawText(pgStr, {
    x: W - 52 - R.widthOfTextAtSize(pgStr, 9),
    y: 26, size: 9, font: B, color: T.dark,
  });
}

function actionBox(page, text, accent, fonts, y) {
  const { width: W } = page.getSize();
  const { R, B } = fonts;
  page.drawRectangle({ x: 52, y: y - 5, width: W - 104, height: 3.5, color: accent });
  page.drawText('ACTION STEP', { x: 52, y: y + 5, size: 8, font: B, color: accent });
  y -= 12;
  return wrap(page, text, R, 9.5, T.dark, 64, y, W - 128, 15);
}

function principleBox(page, text, accent, fonts, y) {
  const { width: W } = page.getSize();
  const { It } = fonts;
  page.drawRectangle({ x: 52, y: y - 28, width: 3.5, height: 36, color: accent });
  return wrap(page, text, It, 10.5, T.dark, 64, y, W - 116, 17);
}

module.exports = {
  T, embedFonts, cleanText, wrap, center,
  cover, copyrightPage, tocPage,
  chapterOpener, quotePage, aboutPage,
  decoratePage, actionBox, principleBox,
};
