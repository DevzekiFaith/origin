const { rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');

const W = {
  black:    rgb(0.04, 0.04, 0.05),
  charcoal: rgb(0.11, 0.12, 0.13),
  dark:     rgb(0.17, 0.18, 0.20),
  mid:      rgb(0.40, 0.42, 0.45),
  rule:     rgb(0.76, 0.77, 0.78),
  offWhite: rgb(0.96, 0.96, 0.97),
  white:    rgb(1, 1, 1),
  brown:    rgb(0.51, 0.38, 0.31),
  beige:    rgb(0.88, 0.85, 0.81),
};

async function embedFonts(doc) {
  return {
    R:  await doc.embedFont(StandardFonts.Helvetica),
    B:  await doc.embedFont(StandardFonts.HelveticaBold),
    It: await doc.embedFont(StandardFonts.HelveticaOblique),
    S:  await doc.embedFont(StandardFonts.TimesRoman),
    SB: await doc.embedFont(StandardFonts.TimesRomanBold),
    SI: await doc.embedFont(StandardFonts.TimesRomanItalic),
  };
}

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

function wrapTextLines(text, font, size, maxW) {
  const sanitized = cleanText(text);
  const paras = sanitized.split('\n');
  const lines = [];
  
  for (const para of paras) {
    if (!para.trim()) { lines.push({ text: '', isBreak: true }); continue; }
    let line = '';
    for (const word of para.split(' ')) {
      const test = line + word + ' ';
      if (font.widthOfTextAtSize(test, size) > maxW && line) {
        lines.push({ text: line.trimEnd() });
        line = word + ' ';
      } else { line = test; }
    }
    if (line.trim()) lines.push({ text: line.trimEnd() });
  }
  return lines;
}

function drawColumnText(page, text, font, size, color, startX, startY, colW, lh, maxLines) {
  const lines = wrapTextLines(text, font, size, colW);
  let y = startY;
  let linesDrawn = 0;
  let remainingText = [];
  let isOverflow = false;

  for (let i = 0; i < lines.length; i++) {
    if (linesDrawn >= maxLines) {
      isOverflow = true;
      remainingText = lines.slice(i);
      break;
    }
    const l = lines[i];
    if (l.isBreak) {
      y -= lh * 0.5;
    } else {
      page.drawText(l.text, { x: startX, y, size, font, color });
      y -= lh;
      linesDrawn++;
    }
  }

  // Reconstruct remaining text
  let remStr = remainingText.map(l => l.isBreak ? '\n' : l.text).join(' ').replace(/ \n /g, '\n\n');
  return { y, remainingText: remStr, isOverflow };
}

function center(page, text, font, size, color, y, pageW) {
  const sanitized = cleanText(text);
  const w = font.widthOfTextAtSize(sanitized, size);
  page.drawText(sanitized, { x: (pageW - w) / 2, y, size, font, color });
}

async function cover(page, { title, subtitle, author, fonts, coverImage, doc }) {
  const { width: PW, height: PH } = page.getSize();
  const { R, B, S, SB } = fonts;

  page.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: rgb(0.92, 0.92, 0.92) });

  // Arch
  page.drawEllipse({
    x: 0, y: PH / 2 + 50,
    xScale: 200, yScale: 300,
    color: W.brown,
  });
  page.drawRectangle({
    x: 0, y: 0, width: 200, height: PH / 2 + 50,
    color: W.brown,
  });

  // Beige rectangle
  page.drawRectangle({
    x: 100, y: 0, width: PW - 100, height: 180,
    color: W.beige,
  });

  if (coverImage && doc) {
    try {
      const imgBytes = fs.readFileSync(coverImage);
      let embedded;
      try { embedded = await doc.embedJpg(imgBytes); }
      catch { embedded = await doc.embedPng(imgBytes); }
      
      const imgDims = embedded.scaleToFit(250, 400);
      page.drawImage(embedded, {
        x: 40,
        y: 100,
        width: imgDims.width,
        height: imgDims.height,
      });
    } catch (e) {
      console.log('Cover image error:', e.message);
    }
  }

  let ty = PH - 250;
  if (subtitle) {
    const subLines = wrapTextLines(subtitle, S, 16, 200);
    let sy = PH - 150;
    for (const l of subLines) {
      if (!l.isBreak) {
        page.drawText(l.text, { x: 230, y: sy, size: 16, font: S, color: W.charcoal });
        sy -= 22;
      }
    }
  }

  page.drawText(cleanText(title.toUpperCase()), { x: 180, y: ty, size: 68, font: S, color: W.charcoal });
  page.drawText('BY ' + cleanText(author.toUpperCase()), { x: 230, y: 80, size: 12, font: B, color: W.charcoal });
}

function copyrightPage(page, { title, author, dedication, fonts }) {
  const { width: PW, height: PH } = page.getSize();
  const { R, B, SI } = fonts;
  page.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: W.white });

  let y = PH - 95;
  page.drawText(cleanText('© 2026 ' + author), { x: 60, y, size: 11, font: B, color: W.dark }); y -= 18;
  page.drawText(cleanText(title), { x: 60, y, size: 10, font: SI, color: W.mid }); y -= 15;
  page.drawText('All rights reserved.', { x: 60, y, size: 8.5, font: R, color: W.rule }); y -= 48;

  page.drawRectangle({ x: 60, y, width: PW - 120, height: 1, color: W.rule }); y -= 38;
  page.drawText('DEDICATION', { x: 60, y, size: 13, font: B, color: W.brown }); y -= 28;
  
  drawColumnText(page, dedication, SI, 11, W.dark, 60, y, PW - 120, 18, 50);
}

function tocPage(page, { chapters, fonts }) {
  const { width: PW, height: PH } = page.getSize();
  const { R, B, S } = fonts;
  page.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: W.white });

  page.drawText('TABLE OF', { x: 60, y: PH - 80, size: 14, font: R, color: W.brown });
  page.drawText('CONTENTS', { x: 60, y: PH - 120, size: 36, font: S, color: W.charcoal });
  page.drawRectangle({ x: 60, y: PH - 140, width: PW - 120, height: 1, color: W.rule });

  let y = PH - 180;
  for (const c of chapters) {
    page.drawText(cleanText(c.num), { x: 60, y, size: 10, font: B, color: W.brown });
    page.drawText(cleanText(c.title), { x: 120, y, size: 12, font: S, color: W.charcoal });
    page.drawText(String(c.pg), { x: PW - 80, y, size: 11, font: B, color: W.charcoal });
    y -= 32;
    if (y < 80) break;
  }
}

async function standardPage(page, { title, subtitle, body, imagePath, doc, fonts, isStory }) {
  const { width: PW, height: PH } = page.getSize();
  const { R, B, S, SI } = fonts;
  page.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: W.white });

  let y = PH - 60;
  
  // Header
  page.drawRectangle({ x: 60, y, width: 60, height: 1, color: W.rule });
  page.drawText(cleanText(title), { x: 130, y: y - 4, size: 12, font: SI, color: W.charcoal });
  page.drawRectangle({ x: 140 + SI.widthOfTextAtSize(cleanText(title), 12), y, width: PW - 200 - SI.widthOfTextAtSize(cleanText(title), 12), height: 1, color: W.rule });
  y -= 30;

  if (subtitle) {
    center(page, cleanText(subtitle.toUpperCase()), R, 14, W.charcoal, y, PW);
    y -= 40;
  }

  let textY = y;
  let leftColX = 60;
  let rightColX = PW / 2 + 20;
  let colW = (PW / 2) - 80;

  if (imagePath && doc) {
    try {
      const imgBytes = fs.readFileSync(imagePath);
      let embedded;
      try { embedded = await doc.embedJpg(imgBytes); }
      catch { embedded = await doc.embedPng(imgBytes); }
      
      const imgDims = embedded.scaleToFit(PW / 2 - 40, PH / 2 - 40);
      
      page.drawImage(embedded, {
        x: PW / 2 + 20,
        y: y - imgDims.height,
        width: imgDims.width,
        height: imgDims.height,
      });

      const { remainingText, isOverflow } = drawColumnText(page, body, R, 10.5, W.dark, leftColX, textY, colW, 16, Math.floor(imgDims.height / 16));
      
      textY = y - imgDims.height - 30;
      
      if (isOverflow && remainingText) {
        const { remainingText: nextRem, isOverflow: nextOver } = drawColumnText(page, remainingText, R, 10.5, W.dark, leftColX, textY, colW, 16, 20);
        if (nextOver && nextRem) {
          drawColumnText(page, nextRem, R, 10.5, W.dark, rightColX, textY, colW, 16, 20);
        }
      }

      if (isStory) {
         page.drawText('SUCCESSFUL', { x: PW / 2 + 20, y: textY - 20, size: 24, font: R, color: W.charcoal });
         page.drawText('Story', { x: PW / 2 + 20, y: textY - 50, size: 36, font: SI, color: W.charcoal });
         page.drawRectangle({ x: PW / 2 + 100, y: textY - 40, width: 100, height: 1, color: W.charcoal });
      }

      return;
    } catch (e) {
      console.log('Image error:', e.message);
    }
  }

  // 2-column text layout
  const { remainingText, isOverflow } = drawColumnText(page, body, R, 10.5, W.dark, leftColX, textY, colW, 16, 35);
  if (isOverflow && remainingText) {
    drawColumnText(page, remainingText, R, 10.5, W.dark, rightColX, textY, colW, 16, 35);
  }
}

function decoratePage(page, pageNum, fonts) {
  const { width: PW, height: PH } = page.getSize();
  const { R } = fonts;
  page.drawText(String(pageNum), { x: PW / 2 - 5, y: 30, size: 10, font: R, color: W.charcoal });
}

module.exports = {
  W, embedFonts, cleanText, 
  cover, copyrightPage, tocPage, standardPage, decoratePage,
};
