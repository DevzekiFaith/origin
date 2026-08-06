const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// ─── Shared Palette ───────────────────────────────────────────────────────────
const primaryDeep  = rgb(0.06, 0.22, 0.52);   // Origin Deep Blue
const accentBlue   = rgb(0.37, 0.64, 0.98);
const goldAccent   = rgb(0.85, 0.65, 0.15);
const darkCharcoal = rgb(0.10, 0.12, 0.14);
const textDark     = rgb(0.14, 0.16, 0.18);
const mutedText    = rgb(0.42, 0.47, 0.52);
const lightBg      = rgb(0.97, 0.97, 0.98);
const borderLine   = rgb(0.86, 0.87, 0.90);
const white        = rgb(1, 1, 1);
// Self-image brand colour — warm violet
const siPrimary    = rgb(0.38, 0.18, 0.62);   // Deep violet
const siAccent     = rgb(0.72, 0.45, 0.98);   // Light violet
const siGold       = rgb(0.92, 0.72, 0.22);

async function buildDoc() {
  const pdfDoc = await PDFDocument.create();
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const italic  = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  return { pdfDoc, regular, bold, italic };
}

function wrap(page, text, font, size, color, x, y, maxW, lh) {
  const paras = text.split('\n');
  for (const para of paras) {
    if (para.trim() === '') { y -= lh * 0.6; continue; }
    const words = para.split(' ');
    let line = '';
    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + ' ';
      if (font.widthOfTextAtSize(test, size) > maxW && i > 0) {
        page.drawText(line.trim(), { x, y, size, font, color });
        line = words[i] + ' ';
        y -= lh;
      } else { line = test; }
    }
    if (line.trim()) { page.drawText(line.trim(), { x, y, size, font, color }); y -= lh; }
  }
  return y;
}

function decor(page, fonts, title, pageNum, total) {
  const { width, height } = page.getSize();
  page.drawLine({ start: { x: 40, y: height - 44 }, end: { x: width - 40, y: height - 44 }, thickness: 0.6, color: borderLine });
  page.drawText(`ORIGIN — THE BECOMING INSTITUTE   |   ${title.toUpperCase()}`, { x: 40, y: height - 35, size: 7.5, font: fonts.bold, color: mutedText });
  page.drawLine({ start: { x: 40, y: 44 }, end: { x: width - 40, y: 44 }, thickness: 0.6, color: borderLine });
  page.drawText('www.origin.com.ng  |  The Becoming Institute  |  (c) 2025 Zeki Ubor', { x: 40, y: 28, size: 7.5, font: fonts.regular, color: mutedText });
  page.drawText(`Page ${pageNum} of ${total}`, { x: width - 80, y: 28, size: 7.5, font: fonts.regular, color: mutedText });
}

function section(page, fonts, title, y, accent) {
  const col = accent || siPrimary;
  page.drawRectangle({ x: 50, y: y - 28, width: 512, height: 36, color: col });
  page.drawText(title, { x: 65, y: y - 18, size: 11, font: fonts.bold, color: white });
  return y - 52;
}

function fieldLine(page, fonts, label, y, x = 65, w = 480) {
  page.drawText(label, { x, y, size: 9.5, font: fonts.bold, color: textDark });
  y -= 14;
  page.drawLine({ start: { x, y }, end: { x: x + w, y }, thickness: 0.5, color: borderLine });
  return y - 14;
}

function fieldBox(page, fonts, label, y, height = 36, x = 65, w = 480) {
  page.drawText(label, { x, y, size: 9.5, font: fonts.bold, color: textDark });
  y -= 12;
  page.drawRectangle({ x, y: y - height, width: w, height, borderColor: borderLine, borderWidth: 0.6, color: lightBg });
  return y - height - 10;
}

function coverPage(pdfDoc, fonts, { title, subtitle, tagline, category }) {
  const cover = pdfDoc.addPage([612, 792]);
  const { width, height } = cover.getSize();

  cover.drawRectangle({ x: 0, y: 0, width, height, color: lightBg });
  cover.drawRectangle({ x: 0, y: 0, width: width * 0.42, height, color: siPrimary });
  cover.drawRectangle({ x: 0, y: height - 8, width, height: 8, color: siGold });
  cover.drawRectangle({ x: 0, y: 0, width, height: 6, color: siAccent });

  // Left spine
  cover.drawText('THE BECOMING INSTITUTE', { x: 26, y: height - 140, size: 9, font: fonts.bold, color: white });
  cover.drawText('ORIGIN LEARNING PLATFORM', { x: 26, y: height - 158, size: 8, font: fonts.regular, color: rgb(0.75, 0.60, 0.98) });

  // Category badge
  cover.drawRectangle({ x: 28, y: 175, width: 210, height: 56, color: siGold });
  cover.drawText(category.toUpperCase(), { x: 42, y: 215, size: 12, font: fonts.bold, color: darkCharcoal });
  cover.drawText('RESOURCE WORKSHEET', { x: 42, y: 196, size: 9, font: fonts.bold, color: darkCharcoal });

  // Right: title block
  const titleLines = title.split('\n');
  let ty = height - 175;
  for (const tl of titleLines) {
    cover.drawText(tl.toUpperCase(), { x: 278, y: ty, size: 30, font: fonts.bold, color: siPrimary });
    ty -= 36;
  }
  cover.drawText(subtitle, { x: 278, y: ty - 8, size: 13, font: fonts.bold, color: darkCharcoal });
  cover.drawText(tagline, { x: 278, y: ty - 28, size: 9.5, font: fonts.italic, color: siAccent });
  cover.drawLine({ start: { x: 278, y: ty - 44 }, end: { x: 565, y: ty - 44 }, thickness: 2, color: siPrimary });

  // Author
  cover.drawText('ZEKI UBOR', { x: 278, y: 128, size: 20, font: fonts.bold, color: darkCharcoal });
  cover.drawText('Founder, The Becoming Institute', { x: 278, y: 108, size: 9, font: fonts.regular, color: mutedText });
  cover.drawText('www.origin.com.ng', { x: 278, y: 90, size: 9, font: fonts.regular, color: accentBlue });

  return cover;
}

function closingPage(pdfDoc, fonts, pageNum, total) {
  const p = pdfDoc.addPage([612, 792]);
  const { height } = p.getSize();
  let y = height - 70;
  p.drawRectangle({ x: 50, y: y - 110, width: 512, height: 110, color: siPrimary });
  p.drawText('THE BECOMING INSTITUTE', { x: 70, y: y - 38, size: 16, font: fonts.bold, color: siGold });
  p.drawText('Transforming Individuals. Building Leaders. Shaping Generations.', { x: 70, y: y - 60, size: 10, font: fonts.italic, color: white });
  p.drawText('Founder: Zeki Ubor  |  Platform: www.origin.com.ng', { x: 70, y: y - 82, size: 9, font: fonts.regular, color: rgb(0.80, 0.65, 1.0) });
  y -= 135;
  const bio = `This worksheet is part of the 8 Ways to Strengthen Your Self-Image course on the Origin Learning Platform — a structured learning ecosystem designed to help individuals aged 10-45 develop capital, communication, leadership, and life mastery skills.\n\nThe Becoming Institute believes your self-image is the foundation of everything: your decisions, your relationships, your results. Every tool in this workbook is designed to be completed, not just read.\n\nContinue your transformation at www.origin.com.ng for live coaching, assignments, and community accountability.`;
  y = wrap(p, bio, fonts.regular, 9.5, textDark, 50, y, 512, 14.5);
  y -= 28;
  p.drawRectangle({ x: 50, y: y - 52, width: 512, height: 52, color: lightBg });
  p.drawText('An Official Origin Course Resource  |  Self-Image Track', { x: 70, y: y - 22, size: 10, font: fonts.bold, color: darkCharcoal });
  p.drawText('Downloaded from the Origin Learning Platform  |  www.origin.com.ng', { x: 70, y: y - 40, size: 9, font: fonts.regular, color: mutedText });
  decor(p, fonts, 'The Becoming Institute', pageNum, total);
  return p;
}

// ═══════════════════════════════════════════════════════════════════
// PDF 1: SELF-IMAGE MASTERY — Complete Course Workbook (12 pages)
// ═══════════════════════════════════════════════════════════════════
async function generateSelfImageMastery() {
  const { pdfDoc, regular, bold, italic } = await buildDoc();
  const fonts = { regular, bold, italic };
  const TOTAL = 12;
  const H = 792;

  coverPage(pdfDoc, fonts, {
    title: 'Self-Image\nMastery',
    subtitle: '8 Ways to Strengthen Your Self-Image',
    tagline: 'How you see yourself determines everything you become.',
    category: 'Self-Development',
  });

  // P2 — Introduction
  const p2 = pdfDoc.addPage([612, H]);
  let y = H - 70;
  y = section(p2, fonts, 'INTRODUCTION | Why Self-Image Is the Root of Everything', y);
  const intro = `Your self-image is not vanity. It is the operating system of your life. Every decision you make, every relationship you build, every opportunity you pursue or avoid — all of it is filtered through the lens of how you see yourself.\n\nDr. Maxwell Maltz, a plastic surgeon turned psychologist, made a revolutionary discovery: he could change a patient's face, but if their self-image didn't change, their life didn't change. His book Psycho-Cybernetics established that the self-image is the most powerful determinant of human behaviour.\n\nThe Becoming Institute teaches a foundational truth: You cannot consistently out-perform your self-image. You cannot sustain success beyond the level at which you see yourself. You cannot build relationships richer than the value you believe you bring.\n\nBut here is the extraordinary news: your self-image is not fixed. It is a story you have been telling yourself — and you can change the story.\n\nThis workbook walks you through 8 modules that address every dimension of self-image:\n1. What Self-Image Is\n2. Confidence & Competence\n3. Self-Talk Fundamentals\n4. Identity & Values\n5. Boundaries & Respect\n6. Discipline & Consistency\n7. Resilience & Recovery\n8. Your Self-Image Plan\n\nComplete every exercise. Be honest. The quality of your answers determines the quality of your transformation.`;
  y = wrap(p2, intro, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p2, fonts, 'Introduction', 2, TOTAL);

  // P3 — Module 1: What Self-Image Is
  const p3 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p3, fonts, 'MODULE 1 | What Self-Image Is', y);
  y = wrap(p3, `Self-image is the internal picture you hold of yourself — a composite of beliefs, memories, and perceptions formed over time. It operates like a thermostat: when you rise above it, you unconsciously self-sabotage back down; when you fall below it, you self-correct upward.\n\nThe three dimensions of self-image:\n- Self-Ideal: Who you believe you should be (your values and standards)\n- Self-Image: Who you believe you are right now (your current perception)\n- Self-Esteem: How you feel about the gap between ideal and image`, regular, 9.5, textDark, 50, y, 512, 14);
  y -= 16;
  y = section(p3, fonts, 'EXERCISE | My Self-Image Snapshot', y, siAccent);
  y = fieldLine(p3, fonts, 'I am the kind of person who:', y);
  y = fieldLine(p3, fonts, 'I am NOT the kind of person who:', y);
  y = fieldLine(p3, fonts, 'People who know me well would describe me as:', y);
  y = fieldLine(p3, fonts, 'I believe I am capable of:', y);
  y = fieldLine(p3, fonts, 'I believe I am NOT capable of:', y);
  y -= 10;
  p3.drawText('WHERE THESE BELIEFS CAME FROM:', { x: 65, y, size: 9, font: bold, color: siPrimary }); y -= 18;
  y = fieldLine(p3, fonts, 'One belief from childhood:', y);
  y = fieldLine(p3, fonts, 'One belief from a failure or criticism:', y);
  y = fieldLine(p3, fonts, 'One belief from a success:', y);
  y -= 10;
  p3.drawText('MY IDEAL SELF-IMAGE:', { x: 65, y, size: 9, font: bold, color: siPrimary }); y -= 18;
  y = fieldLine(p3, fonts, 'In 2 years, I want to see myself as:', y);
  y = fieldLine(p3, fonts, 'The biggest gap between who I am now and who I want to be:', y);
  y -= 10;
  p3.drawText('ONE SHIFT TO MAKE THIS WEEK:', { x: 65, y, size: 9, font: bold, color: siPrimary }); y -= 18;
  y = fieldLine(p3, fonts, 'Belief to replace:', y);
  y = fieldLine(p3, fonts, 'New belief to practice:', y);
  y = fieldLine(p3, fonts, 'Action that proves the new belief:', y);
  decor(p3, fonts, 'Module 1 — What Self-Image Is', 3, TOTAL);

  // P4 — Module 2: Confidence & Competence
  const p4 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p4, fonts, 'MODULE 2 | Confidence & Competence', y);
  y = wrap(p4, `The Confidence-Competence Loop: Real confidence does not come from positive thinking — it comes from doing. Every time you develop a skill and perform it successfully, your brain updates its self-model upward. Confidence is not the starting point; it is the reward for taking action.\n\nThe trap: waiting to "feel confident" before acting. The truth: act first, feel confident second. Confidence follows competence, not the reverse.\n\nDr. Albert Bandura's concept of "self-efficacy" — your belief in your ability to perform a specific task — is built through four sources: mastery experiences (doing it), vicarious learning (watching others), social persuasion (being told you can), and physiological states (how your body feels).`, regular, 9.5, textDark, 50, y, 512, 14);
  y -= 16;
  y = section(p4, fonts, 'TRACKER | Confidence-Competence Action Log', y, siAccent);
  p4.drawText('Skill I am building:', { x: 65, y, size: 9.5, font: bold, color: textDark }); y -= 14;
  p4.drawLine({ start: { x: 65, y }, end: { x: 545, y }, thickness: 0.5, color: borderLine }); y -= 18;
  p4.drawText('Starting point — Competence: ___/10  |  Confidence: ___/10', { x: 65, y, size: 9.5, font: bold, color: textDark }); y -= 22;
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  for (const wk of weeks) {
    p4.drawRectangle({ x: 50, y: y - 62, width: 512, height: 16, color: rgb(0.95, 0.93, 1.0) });
    p4.drawText(wk.toUpperCase(), { x: 65, y: y - 50, size: 9, font: bold, color: siPrimary }); y -= 16;
    y = fieldLine(p4, fonts, 'Action I took:', y);
    y = fieldLine(p4, fonts, 'What I did well:', y);
    p4.drawText('Competence: ___/10  |  Confidence: ___/10', { x: 65, y, size: 9, font: regular, color: textDark }); y -= 22;
  }
  p4.drawText('END OF MONTH — Competence gained: ___/10  |  Confidence gained: ___/10', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  y = fieldLine(p4, fonts, 'Biggest insight:', y);
  decor(p4, fonts, 'Module 2 — Confidence & Competence', 4, TOTAL);

  // P5 — Module 3: Self-Talk Fundamentals
  const p5 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p5, fonts, 'MODULE 3 | Self-Talk Fundamentals', y);
  y = wrap(p5, `Your inner voice speaks approximately 60,000 words per day. Research by the National Science Foundation suggests that up to 80% of those thoughts lean negative. This inner monologue is not background noise — it is the instruction set your nervous system executes.\n\nThe Becoming Institute's 3-Step Self-Talk Transformation:\n1. CATCH IT: Become aware of the thought the moment it arises. Name it.\n2. CHECK IT: Question the thought. Is it 100% true? What is the evidence for and against?\n3. CHANGE IT: Replace it with a balanced, accurate, empowering alternative. Not toxic positivity — honest reappraisal.`, regular, 9.5, textDark, 50, y, 512, 14);
  y -= 16;
  y = section(p5, fonts, 'WORKSHEET | Self-Talk Transformation', y, siAccent);
  const thoughts = ['Thought 1', 'Thought 2', 'Thought 3'];
  for (const t of thoughts) {
    p5.drawRectangle({ x: 50, y: y - 18, width: 512, height: 14, color: rgb(0.95, 0.93, 1.0) });
    p5.drawText(t.toUpperCase(), { x: 65, y: y - 8, size: 9, font: bold, color: siPrimary }); y -= 22;
    y = fieldLine(p5, fonts, 'Negative self-talk I noticed:', y);
    p5.drawText('Is it 100% true?  Y / N  |  Evidence for: ___________  |  Evidence against: ___________', { x: 65, y, size: 8.5, font: regular, color: textDark }); y -= 20;
    y = fieldLine(p5, fonts, 'Balanced replacement:', y);
  }
  y -= 10;
  p5.drawText('MY 3 ANCHOR AFFIRMATIONS (first person, present tense, evidence-based):', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 18;
  y = fieldLine(p5, fonts, '1.', y);
  y = fieldLine(p5, fonts, '2.', y);
  y = fieldLine(p5, fonts, '3.', y);
  y -= 8;
  p5.drawText('21-Day Reading Tracker: [ ] Day 1-7  [ ] Day 8-14  [ ] Day 15-21', { x: 65, y, size: 9.5, font: bold, color: siPrimary });
  decor(p5, fonts, 'Module 3 — Self-Talk Fundamentals', 5, TOTAL);

  // P6 — Module 4: Identity & Values
  const p6 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p6, fonts, 'MODULE 4 | Identity & Values', y);
  y = wrap(p6, `Viktor Frankl wrote from inside a Nazi concentration camp: "Everything can be taken from a man but one thing: the last of the human freedoms — to choose one's attitude in any given set of circumstances." His identity — as a psychiatrist, as a father, as a meaning-seeker — survived conditions that broke most people around him.\n\nYour identity is your anchor. When circumstances shift, your identity determines whether you adapt or collapse. And your values are the criteria by which you make every decision, consciously or otherwise. Living in alignment with your values is the definition of integrity — and integrity is the cornerstone of self-image.`, regular, 9.5, textDark, 50, y, 512, 14);
  y -= 16;
  y = section(p6, fonts, 'BLUEPRINT | My Identity & Values', y, siAccent);
  p6.drawText('STEP 1 — Circle your top 10 values, then star your top 5:', { x: 65, y, size: 9.5, font: bold, color: textDark }); y -= 16;
  const valuesText = 'Honesty  |  Courage  |  Loyalty  |  Growth  |  Family  |  Freedom  |  Creativity  |  Service  |  Excellence  |  Integrity  |  Adventure  |  Kindness  |  Justice  |  Resilience  |  Faith  |  Discipline  |  Compassion  |  Ambition  |  Peace  |  Wisdom';
  y = wrap(p6, valuesText, regular, 9, textDark, 65, y, 480, 13); y -= 10;
  p6.drawText('MY TOP 5 VALUES:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  for (let i = 1; i <= 5; i++) {
    p6.drawText(`${i}.`, { x: 65, y, size: 9.5, font: regular, color: textDark });
    p6.drawLine({ start: { x: 82, y: y - 2 }, end: { x: 290, y: y - 2 }, thickness: 0.5, color: borderLine });
    p6.drawText('Why it matters:', { x: 295, y, size: 9.5, font: regular, color: textDark });
    p6.drawLine({ start: { x: 370, y: y - 2 }, end: { x: 545, y: y - 2 }, thickness: 0.5, color: borderLine });
    y -= 18;
  }
  y -= 4;
  p6.drawText('MY IDENTITY STATEMENT:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  y = fieldLine(p6, fonts, 'I am someone who:', y);
  y = fieldLine(p6, fonts, 'I stand for:', y);
  y = fieldLine(p6, fonts, 'I will not compromise on:', y);
  y = fieldLine(p6, fonts, 'I am becoming:', y);
  y -= 6;
  p6.drawText('VALUES IN ACTION (are my daily actions aligned?):', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  for (let i = 1; i <= 3; i++) {
    p6.drawText(`Value ${i}:`, { x: 65, y, size: 9.5, font: regular, color: textDark });
    p6.drawLine({ start: { x: 105, y: y - 2 }, end: { x: 380, y: y - 2 }, thickness: 0.5, color: borderLine });
    p6.drawText('Yes / Partially / No', { x: 390, y, size: 9, font: italic, color: mutedText });
    y -= 18;
  }
  y = fieldLine(p6, fonts, 'One thing to change this week to live my values more fully:', y);
  decor(p6, fonts, 'Module 4 — Identity & Values', 6, TOTAL);

  // P7 — Module 5: Boundaries & Respect
  const p7 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p7, fonts, 'MODULE 5 | Boundaries & Respect', y);
  y = wrap(p7, `A boundary is not a wall — it is a statement of self-respect. When you allow others to treat you in ways that violate your values, you are not being kind; you are eroding your own self-image, one compromise at a time.\n\nBrene Brown writes: "Daring to set boundaries is about having the courage to love ourselves, even when we risk disappointing others."\n\nThe Becoming Institute Boundary Formula:\nA boundary exists wherever you say: "This is what I will do. This is what I will not do. And when someone crosses this line, I will respond in this way."\n\nBoundaries are not selfish. They are the architecture of your self-respect.`, regular, 9.5, textDark, 50, y, 512, 14);
  y -= 16;
  y = section(p7, fonts, 'FRAMEWORK | My Boundary Map', y, siAccent);
  p7.drawText('BOUNDARY AUDIT (rate how much each area needs work — 1 = fine, 5 = urgent):', { x: 65, y, size: 9, font: bold, color: textDark }); y -= 16;
  const areas = ['Time', 'Energy', 'Money', 'Privacy', 'Relationships', 'Digital/Phone'];
  for (const a of areas) {
    p7.drawText(`${a}: ___/5`, { x: 65 + (areas.indexOf(a) % 3) * 160, y: y + (areas.indexOf(a) >= 3 ? 0 : 0), size: 9, font: regular, color: textDark });
    if (areas.indexOf(a) === 2) y -= 16;
  }
  y -= 26;
  y = fieldLine(p7, fonts, 'My biggest boundary challenge right now:', y);
  y -= 6;
  p7.drawText('BOUNDARY SCRIPTS:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  y = wrap(p7, 'For saying no: "I appreciate you thinking of me, but I\'m not able to ___________ right now."', regular, 9, textDark, 65, y, 480, 13);
  p7.drawText('My version:', { x: 65, y, size: 9, font: bold, color: textDark }); p7.drawLine({ start: { x: 120, y: y - 2 }, end: { x: 545, y: y - 2 }, thickness: 0.5, color: borderLine }); y -= 18;
  y = wrap(p7, 'For communicating a limit: "I\'m happy to ___________, but I can\'t ___________."', regular, 9, textDark, 65, y, 480, 13);
  p7.drawText('My version:', { x: 65, y, size: 9, font: bold, color: textDark }); p7.drawLine({ start: { x: 120, y: y - 2 }, end: { x: 545, y: y - 2 }, thickness: 0.5, color: borderLine }); y -= 18;
  y = wrap(p7, 'For enforcing a boundary: "I said I wasn\'t comfortable with ___. I need that to stop."', regular, 9, textDark, 65, y, 480, 13);
  p7.drawText('My version:', { x: 65, y, size: 9, font: bold, color: textDark }); p7.drawLine({ start: { x: 120, y: y - 2 }, end: { x: 545, y: y - 2 }, thickness: 0.5, color: borderLine }); y -= 22;
  p7.drawText('PRACTICE LOG:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  y = fieldLine(p7, fonts, 'Boundary I set this week:', y);
  y = fieldLine(p7, fonts, 'How I felt setting it:', y);
  y = fieldLine(p7, fonts, 'Result:', y);
  decor(p7, fonts, 'Module 5 — Boundaries & Respect', 7, TOTAL);

  // P8 — Module 6: Discipline & Consistency
  const p8 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p8, fonts, 'MODULE 6 | Discipline & Consistency', y);
  y = wrap(p8, `Discipline is not punishment. It is the highest expression of self-love — choosing your future self over your present comfort. The Becoming Institute defines self-discipline as: "The ability to do what your highest self has decided, regardless of how your present-moment self feels."\n\nJim Rohn said: "Discipline is the bridge between goals and accomplishment." Every commitment you make and keep is a vote for the person you are becoming. Every commitment you break is a vote for the person you are staying.`, regular, 9.5, textDark, 50, y, 512, 14);
  y -= 16;
  y = section(p8, fonts, 'TRACKER | My Discipline & Consistency Log', y, siAccent);
  p8.drawText('MY DAILY NON-NEGOTIABLES (3 things I commit to every day, no matter what):', { x: 65, y, size: 9.5, font: bold, color: textDark }); y -= 16;
  y = fieldLine(p8, fonts, '1.', y);
  y = fieldLine(p8, fonts, '2.', y);
  y = fieldLine(p8, fonts, '3.', y);
  y -= 10;
  p8.drawText('30-DAY TRACKER  (mark: Done = D  |  Missed = X  |  Partial = P)', { x: 65, y, size: 9, font: bold, color: siPrimary }); y -= 14;
  // Draw 30-day grid
  const cols = ['Day', 'NN1', 'NN2', 'NN3'];
  const colX = [65, 165, 265, 365];
  const rowH = 13;
  // Header row
  p8.drawRectangle({ x: 50, y: y - rowH, width: 460, height: rowH + 2, color: siPrimary });
  cols.forEach((c, i) => p8.drawText(c, { x: colX[i] + 2, y: y - rowH + 3, size: 8, font: bold, color: white }));
  y -= rowH + 2;
  for (let d = 1; d <= 30; d++) {
    const bg = d % 2 === 0 ? lightBg : white;
    p8.drawRectangle({ x: 50, y: y - rowH, width: 460, height: rowH, color: bg });
    p8.drawText(`Day ${d}`, { x: colX[0] + 2, y: y - rowH + 3, size: 7.5, font: regular, color: textDark });
    [1, 2, 3].forEach((_, i) => {
      p8.drawRectangle({ x: colX[i + 1] - 2, y: y - rowH + 1, width: 70, height: rowH - 2, borderColor: borderLine, borderWidth: 0.3, color: white });
    });
    y -= rowH;
  }
  y -= 8;
  p8.drawText('MONTH REVIEW:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 14;
  p8.drawText('Days completed all 3: ___ / 30', { x: 65, y, size: 9, font: regular, color: textDark }); y -= 14;
  y = fieldLine(p8, fonts, 'Biggest obstacle:', y);
  y = fieldLine(p8, fonts, 'Adjustment for next month:', y);
  decor(p8, fonts, 'Module 6 — Discipline & Consistency', 8, TOTAL);

  // P9 — Module 7: Resilience & Recovery
  const p9 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p9, fonts, 'MODULE 7 | Resilience & Recovery', y);
  y = wrap(p9, `Dr. Lucy Hone — a resilience researcher who lost her own daughter in a car accident — identified three things that resilient people do differently:\n\n1. They accept that suffering is part of life. They do not ask "Why me?" — they ask "What now?"\n2. They ask: "Is what I'm doing helping or harming me?" They fiercely protect their mental energy.\n3. They notice the good still present, even in the worst moments.\n\nThe Becoming Institute adds a fourth practice: Self-compassion. You cannot rebuild a damaged self-image with self-criticism. Kristin Neff's research shows that self-compassion — treating yourself as you would a struggling friend — is more effective than self-esteem at promoting resilience.`, regular, 9.5, textDark, 50, y, 512, 14);
  y -= 16;
  y = section(p9, fonts, 'TOOLKIT | Resilience & Recovery', y, siAccent);
  p9.drawText('PART 1 — SELF-COMPASSION CHECK-IN:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  y = fieldLine(p9, fonts, 'If my best friend went through this, what would I say to them?', y);
  y = fieldLine(p9, fonts, 'Now say that to yourself:', y);
  y -= 6;
  p9.drawText('PART 2 — REALITY CHECK:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  p9.drawText('Is this setback permanent? (Usually no) ___  |  Is it about my whole identity? (Usually no) ___', { x: 65, y, size: 9, font: regular, color: textDark }); y -= 16;
  y = fieldLine(p9, fonts, 'Most realistic interpretation of what happened:', y);
  y -= 6;
  p9.drawText('PART 3 — RECOVERY ROUTINE:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  y = fieldLine(p9, fonts, 'Today I will:', y);
  y = fieldLine(p9, fonts, 'This week I will:', y);
  y = fieldLine(p9, fonts, 'I will NOT beat myself up about:', y);
  y -= 6;
  p9.drawText('PART 4 — REBUILD:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  y = fieldLine(p9, fonts, 'A strength this setback did NOT take away:', y);
  y = fieldLine(p9, fonts, 'Proof that I am resilient (past setback I recovered from):', y);
  y -= 6;
  p9.drawText('BOUNCE-BACK PLAN:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  const days = ['Day 1:', 'Day 3:', 'Day 7:', 'Day 14:'];
  for (const d of days) {
    p9.drawText(d, { x: 65, y, size: 9, font: bold, color: textDark });
    p9.drawLine({ start: { x: 105, y: y - 2 }, end: { x: 545, y: y - 2 }, thickness: 0.5, color: borderLine });
    y -= 18;
  }
  decor(p9, fonts, 'Module 7 — Resilience & Recovery', 9, TOTAL);

  // P10 — Module 8: Your Self-Image Plan
  const p10 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p10, fonts, 'MODULE 8 | Your Self-Image Development Plan', y);
  y = wrap(p10, `The self-image is not built in a single breakthrough moment. It is constructed, brick by brick, through the daily practice of alignment: thinking like the person you want to become, speaking like them, acting like them, and treating yourself with the respect you want to command from the world.\n\nThis plan is your commitment to that process. Complete it honestly. Return to it every 30 days. Let it evolve as you do.`, regular, 9.5, textDark, 50, y, 512, 14);
  y -= 12;
  y = section(p10, fonts, 'MY 90-DAY SELF-IMAGE PLAN', y, siAccent);
  p10.drawText('WHERE I AM TODAY:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  p10.drawText('Self-image score today: ___/10', { x: 65, y, size: 9.5, font: regular, color: textDark }); y -= 14;
  y = fieldLine(p10, fonts, 'My biggest self-image strength:', y);
  y = fieldLine(p10, fonts, 'My biggest self-image challenge:', y);
  y -= 6;
  p10.drawText('WHERE I WANT TO BE IN 90 DAYS:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  p10.drawText('Target score: ___/10', { x: 65, y, size: 9.5, font: regular, color: textDark }); y -= 14;
  y = fieldLine(p10, fonts, 'The person I am becoming:', y);
  y = fieldLine(p10, fonts, 'How I will know I have arrived:', y);
  y -= 6;
  p10.drawText('THE 7 PILLARS — Rate and set one action for each:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  const pillars = [
    '1. Self-Image Understanding',
    '2. Confidence & Competence',
    '3. Self-Talk',
    '4. Identity & Values',
    '5. Boundaries & Respect',
    '6. Discipline & Consistency',
    '7. Resilience & Recovery',
  ];
  for (const pillar of pillars) {
    p10.drawText(pillar + ':', { x: 65, y, size: 9, font: regular, color: textDark });
    p10.drawText('___/10 | Action:', { x: 240, y, size: 9, font: regular, color: textDark });
    p10.drawLine({ start: { x: 305, y: y - 2 }, end: { x: 545, y: y - 2 }, thickness: 0.5, color: borderLine });
    y -= 16;
  }
  y -= 6;
  p10.drawText('MY 90-DAY FOCUS:', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  y = fieldLine(p10, fonts, 'Daily habit that supports my self-image:', y);
  y = fieldLine(p10, fonts, 'One thing I am eliminating that damages my self-image:', y);
  p10.drawText('Monthly review date: ___________  |  Accountability partner: ___________', { x: 65, y, size: 9.5, font: regular, color: textDark });
  decor(p10, fonts, 'Module 8 — Your Self-Image Plan', 10, TOTAL);

  // P11 — Commitment Card
  const p11 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p11, fonts, 'COURSE COMPLETION | Commitment Card', y);
  y -= 10;
  p11.drawRectangle({ x: 50, y: 100, width: 512, height: y - 100, borderColor: siPrimary, borderWidth: 1.5, color: white });
  y -= 20;
  p11.drawText('I,', { x: 80, y, size: 11, font: regular, color: textDark });
  p11.drawLine({ start: { x: 98, y: y - 2 }, end: { x: 450, y: y - 2 }, thickness: 0.8, color: siPrimary });
  p11.drawText(', commit to the following:', { x: 455, y, size: 11, font: regular, color: textDark }); y -= 28;
  p11.drawText('I understand that my self-image shapes my decisions, actions, and outcomes.', { x: 80, y, size: 10, font: italic, color: siPrimary }); y -= 28;
  p11.drawText('I commit to:', { x: 80, y, size: 11, font: bold, color: textDark }); y -= 20;
  const commitments = [
    'Practising positive, accurate self-talk every morning',
    'Acting in alignment with my core values daily',
    'Setting and maintaining healthy boundaries',
    'Building skills that grow my real confidence through action',
    'Showing myself compassion when I fall short',
    'Reviewing my self-image plan every 30 days',
  ];
  for (const c of commitments) {
    p11.drawText('[ ]', { x: 80, y, size: 11, font: bold, color: siPrimary });
    p11.drawText(c, { x: 100, y, size: 10, font: regular, color: textDark });
    y -= 20;
  }
  y -= 14;
  p11.drawText('My Self-Image Mantra:', { x: 80, y, size: 11, font: bold, color: siPrimary }); y -= 16;
  p11.drawLine({ start: { x: 80, y }, end: { x: 530, y }, thickness: 0.8, color: siPrimary }); y -= 28;
  p11.drawText('Signed:', { x: 80, y, size: 10, font: bold, color: textDark });
  p11.drawLine({ start: { x: 120, y: y - 2 }, end: { x: 320, y: y - 2 }, thickness: 0.5, color: borderLine });
  p11.drawText('Date:', { x: 340, y, size: 10, font: bold, color: textDark });
  p11.drawLine({ start: { x: 368, y: y - 2 }, end: { x: 530, y: y - 2 }, thickness: 0.5, color: borderLine }); y -= 24;
  p11.drawText('Review dates:', { x: 80, y, size: 9.5, font: bold, color: textDark }); y -= 16;
  ['30 days:', '60 days:', '90 days:'].forEach((d) => {
    p11.drawText(d, { x: 80, y, size: 9.5, font: regular, color: textDark });
    p11.drawLine({ start: { x: 130, y: y - 2 }, end: { x: 300, y: y - 2 }, thickness: 0.5, color: borderLine });
    p11.drawText('Status:', { x: 315, y, size: 9.5, font: regular, color: textDark });
    p11.drawLine({ start: { x: 350, y: y - 2 }, end: { x: 530, y: y - 2 }, thickness: 0.5, color: borderLine });
    y -= 18;
  });
  decor(p11, fonts, 'Commitment Card', 11, TOTAL);

  closingPage(pdfDoc, fonts, 12, TOTAL);

  const bytes = await pdfDoc.save();
  const dest = path.join(__dirname, '..', 'public', 'documents', 'self-image-mastery-workbook.pdf');
  fs.writeFileSync(dest, bytes);
  console.log('✅ self-image-mastery-workbook.pdf — ' + (bytes.length / 1024).toFixed(1) + ' KB');
}

// ═══════════════════════════════════════════════════════════════════
// PDF 2: SELF-IMAGE SNAPSHOT (Module 1 standalone — 4 pages)
// ═══════════════════════════════════════════════════════════════════
async function generateSelfImageSnapshot() {
  const { pdfDoc, regular, bold, italic } = await buildDoc();
  const fonts = { regular, bold, italic };
  const TOTAL = 4; const H = 792;
  coverPage(pdfDoc, fonts, {
    title: 'Self-Image\nSnapshot',
    subtitle: 'Who Do You See When You Look in the Mirror?',
    tagline: 'Awareness is the first step. Honesty is the practice.',
    category: 'Module 1 Worksheet',
  });
  const p2 = pdfDoc.addPage([612, H]);
  let y = H - 70;
  y = section(p2, fonts, 'UNDERSTANDING YOUR SELF-IMAGE | Module 1 Exercise', y);
  y = wrap(p2, `Self-image is not about arrogance or insecurity — it is about accuracy. The goal of this exercise is to get an honest, clear picture of how you currently see yourself, where that picture came from, and the one shift you will make this week to begin reshaping it.\n\nTake your time. Be honest. No one else reads this.`, regular, 9.5, textDark, 50, y, 512, 14);
  y -= 16;
  y = section(p2, fonts, 'PART 1 | How I See Myself Now', y, siAccent);
  ['I am the kind of person who:', 'I am NOT the kind of person who:', 'People who know me well would describe me as:', 'I believe I am capable of:', 'I believe I am NOT capable of:', 'My greatest strength is:', 'My biggest limiting belief about myself is:'].forEach(q => { y = fieldLine(p2, fonts, q, y); });
  decor(p2, fonts, 'My Self-Image Snapshot', 2, TOTAL);
  const p3 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p3, fonts, 'PART 2 | Where These Beliefs Came From', y);
  y = wrap(p3, `Our self-image is formed by repeated experiences, especially from authority figures in our early years. Understanding the source of a belief is the first step to evaluating whether it is still serving us.`, regular, 9.5, textDark, 50, y, 512, 14); y -= 10;
  ['A belief about myself I formed in childhood:', 'A belief that came from a failure or harsh criticism:', 'A belief that came from a significant success:', 'A belief someone important told me about myself (positive):', 'A belief someone important told me about myself (negative):', 'One belief I hold about myself that may not be objectively true:', 'Evidence that contradicts my most limiting belief:'].forEach(q => { y = fieldLine(p3, fonts, q, y); });
  y -= 10;
  y = section(p3, fonts, 'PART 3 | My Ideal Self-Image', y, siAccent);
  ['In 2 years, I want to see myself as:', 'The biggest gap between who I am now and who I want to be:', 'One person whose self-image I admire — and why:'].forEach(q => { y = fieldLine(p3, fonts, q, y); });
  decor(p3, fonts, 'My Self-Image Snapshot', 3, TOTAL);
  closingPage(pdfDoc, fonts, 4, TOTAL);
  const bytes = await pdfDoc.save();
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'documents', 'self-image-snapshot.pdf'), bytes);
  console.log('✅ self-image-snapshot.pdf — ' + (bytes.length / 1024).toFixed(1) + ' KB');
}

// ═══════════════════════════════════════════════════════════════════
// PDF 3: SELF-TALK TRANSFORMATION (Module 3 standalone — 4 pages)
// ═══════════════════════════════════════════════════════════════════
async function generateSelfTalkTransformation() {
  const { pdfDoc, regular, bold, italic } = await buildDoc();
  const fonts = { regular, bold, italic };
  const TOTAL = 4; const H = 792;
  coverPage(pdfDoc, fonts, {
    title: 'Self-Talk\nTransformation',
    subtitle: 'Catch It. Check It. Change It.',
    tagline: '60,000 thoughts per day — make them work for you.',
    category: 'Module 3 Worksheet',
  });
  const p2 = pdfDoc.addPage([612, H]);
  let y = H - 70;
  y = section(p2, fonts, 'SELF-TALK LOG | Track Your Inner Voice for One Day', y);
  y = wrap(p2, `Awareness precedes change. For one full day, write down every negative or unhelpful thought you notice. Do not judge yourself for having these thoughts — simply record them. This is not about feeling bad. It is about seeing clearly.`, regular, 9.5, textDark, 50, y, 512, 14);
  y -= 12;
  for (let i = 1; i <= 6; i++) {
    p2.drawRectangle({ x: 50, y: y - 14, width: 512, height: 14, color: i % 2 === 0 ? lightBg : white });
    p2.drawText(`Thought ${i}:`, { x: 65, y: y - 4, size: 9, font: bold, color: siPrimary });
    p2.drawLine({ start: { x: 120, y: y - 6 }, end: { x: 545, y: y - 6 }, thickness: 0.5, color: borderLine }); y -= 14;
    p2.drawText('When:', { x: 65, y: y - 4, size: 9, font: regular, color: mutedText });
    p2.drawLine({ start: { x: 95, y: y - 6 }, end: { x: 280, y: y - 6 }, thickness: 0.4, color: borderLine });
    p2.drawText('Situation:', { x: 295, y: y - 4, size: 9, font: regular, color: mutedText });
    p2.drawLine({ start: { x: 340, y: y - 6 }, end: { x: 545, y: y - 6 }, thickness: 0.4, color: borderLine }); y -= 18;
  }
  y -= 10;
  y = section(p2, fonts, 'CATCH-CHECK-CHANGE | Reframe Your Top 3 Thoughts', y, siAccent);
  for (let i = 1; i <= 3; i++) {
    p2.drawRectangle({ x: 50, y: y - 16, width: 512, height: 16, color: rgb(0.95, 0.92, 1.0) });
    p2.drawText(`THOUGHT ${i}`, { x: 65, y: y - 6, size: 9, font: bold, color: siPrimary }); y -= 20;
    p2.drawText('CATCH:', { x: 65, y, size: 9, font: bold, color: textDark });
    p2.drawLine({ start: { x: 105, y: y - 2 }, end: { x: 545, y: y - 2 }, thickness: 0.5, color: borderLine }); y -= 16;
    p2.drawText('CHECK — Is it 100% true?  Y / N  |  Evidence for:', { x: 65, y, size: 8.5, font: regular, color: textDark });
    p2.drawLine({ start: { x: 295, y: y - 2 }, end: { x: 545, y: y - 2 }, thickness: 0.4, color: borderLine }); y -= 14;
    p2.drawText('Evidence against:', { x: 65, y, size: 8.5, font: regular, color: textDark });
    p2.drawLine({ start: { x: 150, y: y - 2 }, end: { x: 545, y: y - 2 }, thickness: 0.4, color: borderLine }); y -= 16;
    p2.drawText('CHANGE — Balanced replacement:', { x: 65, y, size: 9, font: bold, color: siAccent });
    p2.drawLine({ start: { x: 235, y: y - 2 }, end: { x: 545, y: y - 2 }, thickness: 0.5, color: borderLine }); y -= 22;
  }
  decor(p2, fonts, 'Self-Talk Transformation', 2, TOTAL);
  const p3 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p3, fonts, 'MY 3 ANCHOR AFFIRMATIONS | Built on Evidence', y);
  y = wrap(p3, `Affirmations only work when they are honest. A vague positive statement like "I am amazing" bounces off your nervous system if you do not believe it. Evidence-based affirmations are statements you can prove with past experience. They build a bridge between where you are and where you are going.\n\nFormat: "I am [identity] because I have [evidence]."`, regular, 9.5, textDark, 50, y, 512, 14); y -= 16;
  for (let i = 1; i <= 3; i++) {
    p3.drawRectangle({ x: 50, y: y - 60, width: 512, height: 62, borderColor: siPrimary, borderWidth: 1, color: white });
    p3.drawText(`AFFIRMATION ${i}`, { x: 65, y: y - 16, size: 9.5, font: bold, color: siPrimary });
    p3.drawText('Statement:', { x: 65, y: y - 30, size: 9, font: regular, color: textDark });
    p3.drawLine({ start: { x: 115, y: y - 32 }, end: { x: 545, y: y - 32 }, thickness: 0.5, color: borderLine });
    p3.drawText('Evidence it is true:', { x: 65, y: y - 46, size: 9, font: regular, color: textDark });
    p3.drawLine({ start: { x: 165, y: y - 48 }, end: { x: 545, y: y - 48 }, thickness: 0.5, color: borderLine });
    y -= 78;
  }
  y -= 16;
  y = section(p3, fonts, '21-DAY PRACTICE TRACKER', y, siAccent);
  p3.drawText('Read your 3 affirmations every morning. Mark each day you complete it.', { x: 65, y, size: 9.5, font: italic, color: mutedText }); y -= 20;
  for (let row = 0; row < 3; row++) {
    const weekLabel = `Week ${row + 1}`;
    p3.drawText(weekLabel + ':', { x: 65, y, size: 9.5, font: bold, color: textDark }); 
    for (let d = 1; d <= 7; d++) {
      const dx = 115 + (d - 1) * 58;
      p3.drawRectangle({ x: dx, y: y - 16, width: 50, height: 18, borderColor: siAccent, borderWidth: 0.6, color: white });
      p3.drawText(`Day ${row * 7 + d}`, { x: dx + 4, y: y - 8, size: 7.5, font: regular, color: mutedText });
    }
    y -= 30;
  }
  y -= 10;
  p3.drawText('Reflection: After 21 days, how has your inner voice changed?', { x: 65, y, size: 9.5, font: bold, color: siPrimary }); y -= 16;
  y = fieldLine(p3, fonts, ' ', y); y = fieldLine(p3, fonts, ' ', y);
  decor(p3, fonts, 'Self-Talk Transformation', 3, TOTAL);
  closingPage(pdfDoc, fonts, 4, TOTAL);
  const bytes = await pdfDoc.save();
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'documents', 'self-talk-transformation.pdf'), bytes);
  console.log('✅ self-talk-transformation.pdf — ' + (bytes.length / 1024).toFixed(1) + ' KB');
}

// ═══════════════════════════════════════════════════════════════════
// PDF 4: IDENTITY & VALUES BLUEPRINT (Module 4 standalone — 4 pages)
// ═══════════════════════════════════════════════════════════════════
async function generateIdentityValuesBlueprint() {
  const { pdfDoc, regular, bold, italic } = await buildDoc();
  const fonts = { regular, bold, italic };
  const TOTAL = 4; const H = 792;
  coverPage(pdfDoc, fonts, {
    title: 'Identity &\nValues Blueprint',
    subtitle: 'Clarify Who You Are and What You Stand For',
    tagline: 'Integrity is alignment: your actions matching your values.',
    category: 'Module 4 Worksheet',
  });
  const p2 = pdfDoc.addPage([612, H]);
  let y = H - 70;
  y = section(p2, fonts, 'PART 1 | Core Values Discovery', y);
  y = wrap(p2, `Values are not aspirations — they are the operating principles you are already living by. The question is whether you are living by the right ones intentionally, or by default. This exercise makes the invisible visible.`, regular, 9.5, textDark, 50, y, 512, 14); y -= 10;
  p2.drawText('STEP 1 — From the list below, circle every value that resonates with you (no limit):', { x: 65, y, size: 9.5, font: bold, color: textDark }); y -= 16;
  const valuesList = [
    ['Honesty', 'Integrity', 'Courage', 'Loyalty', 'Authenticity'],
    ['Growth', 'Excellence', 'Discipline', 'Mastery', 'Wisdom'],
    ['Family', 'Service', 'Compassion', 'Kindness', 'Community'],
    ['Freedom', 'Adventure', 'Creativity', 'Innovation', 'Expression'],
    ['Faith', 'Purpose', 'Peace', 'Gratitude', 'Resilience'],
    ['Ambition', 'Impact', 'Justice', 'Leadership', 'Legacy'],
  ];
  for (const row of valuesList) {
    for (let i = 0; i < row.length; i++) {
      const bx = 65 + i * 98;
      p2.drawRectangle({ x: bx, y: y - 16, width: 90, height: 18, borderColor: siAccent, borderWidth: 0.7, color: white });
      p2.drawText(row[i], { x: bx + 6, y: y - 8, size: 8.5, font: regular, color: textDark });
    }
    y -= 24;
  }
  y -= 6;
  p2.drawText('STEP 2 — From those you circled, narrow to your TOP 5 and rank them:', { x: 65, y, size: 9.5, font: bold, color: textDark }); y -= 16;
  for (let i = 1; i <= 5; i++) {
    p2.drawText(`${i}.`, { x: 65, y, size: 10, font: bold, color: siPrimary });
    p2.drawLine({ start: { x: 80, y: y - 2 }, end: { x: 290, y: y - 2 }, thickness: 0.5, color: borderLine });
    p2.drawText('Why it matters to me:', { x: 295, y, size: 9, font: regular, color: textDark });
    p2.drawLine({ start: { x: 400, y: y - 2 }, end: { x: 545, y: y - 2 }, thickness: 0.5, color: borderLine });
    y -= 20;
  }
  decor(p2, fonts, 'Identity & Values Blueprint', 2, TOTAL);
  const p3 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p3, fonts, 'PART 2 | My Identity Statement', y);
  y = wrap(p3, `Your identity statement is a declaration of who you are — not who you hope to be someday, but who you are choosing to be now. It is written in the present tense, grounded in your values, and it becomes the lens through which you make decisions.`, regular, 9.5, textDark, 50, y, 512, 14); y -= 14;
  const idStatements = ['I am someone who:', 'I stand for:', 'I will not compromise on:', 'I am becoming:', 'My decisions reflect:'];
  for (const s of idStatements) { y = fieldLine(p3, fonts, s, y); }
  y -= 10;
  y = section(p3, fonts, 'PART 3 | Values-in-Action Audit', y, siAccent);
  y = wrap(p3, `Living your values is not automatic — it requires intentional review. For each of your top 5 values, assess whether your daily actions align.`, regular, 9.5, textDark, 50, y, 512, 14); y -= 10;
  p3.drawRectangle({ x: 50, y: y - 14, width: 512, height: 16, color: siPrimary });
  p3.drawText('Value', { x: 65, y: y - 4, size: 9, font: bold, color: white });
  p3.drawText('Daily actions that honour it', { x: 200, y: y - 4, size: 9, font: bold, color: white });
  p3.drawText('Aligned?', { x: 450, y: y - 4, size: 9, font: bold, color: white }); y -= 20;
  for (let i = 1; i <= 5; i++) {
    p3.drawText(`Value ${i}:`, { x: 65, y, size: 9, font: regular, color: textDark });
    p3.drawLine({ start: { x: 110, y: y - 2 }, end: { x: 195, y: y - 2 }, thickness: 0.4, color: borderLine });
    p3.drawLine({ start: { x: 200, y: y - 2 }, end: { x: 445, y: y - 2 }, thickness: 0.4, color: borderLine });
    p3.drawText('Y / P / N', { x: 450, y, size: 9, font: italic, color: mutedText }); y -= 18;
  }
  y -= 10;
  y = fieldLine(p3, fonts, 'Biggest gap between my values and my behaviour this week:', y);
  y = fieldLine(p3, fonts, 'One thing I will change this week to live my values more fully:', y);
  y -= 10;
  y = section(p3, fonts, 'PART 4 | Values Decision Filter', y, darkCharcoal);
  y = wrap(p3, 'Before any major decision, ask: Does this align with my top 3 values?\nValue 1: Y/N  |  Value 2: Y/N  |  Value 3: Y/N\nIf NO to any: what adjustment makes it align?', regular, 9.5, textDark, 65, y, 480, 14);
  y = fieldLine(p3, fonts, 'Adjustment:', y);
  decor(p3, fonts, 'Identity & Values Blueprint', 3, TOTAL);
  closingPage(pdfDoc, fonts, 4, TOTAL);
  const bytes = await pdfDoc.save();
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'documents', 'identity-values-blueprint.pdf'), bytes);
  console.log('✅ identity-values-blueprint.pdf — ' + (bytes.length / 1024).toFixed(1) + ' KB');
}

// ═══════════════════════════════════════════════════════════════════
// PDF 5: CONFIDENCE-COMPETENCE ACTION TRACKER (Module 2 — 4 pages)
// ═══════════════════════════════════════════════════════════════════
async function generateConfidenceTracker() {
  const { pdfDoc, regular, bold, italic } = await buildDoc();
  const fonts = { regular, bold, italic };
  const TOTAL = 4; const H = 792;
  coverPage(pdfDoc, fonts, {
    title: 'Confidence-\nCompetence Tracker',
    subtitle: 'Build Real Confidence Through Deliberate Action',
    tagline: 'You cannot think your way to confidence. You must act your way there.',
    category: 'Module 2 Worksheet',
  });
  const p2 = pdfDoc.addPage([612, H]);
  let y = H - 70;
  y = section(p2, fonts, 'THE RULE | How Real Confidence Is Built', y);
  y = wrap(p2, `Most people wait to feel confident before they act. High performers act first, and let confidence follow the action. This is not recklessness — it is the scientifically accurate sequence.\n\nAlbert Bandura's research on self-efficacy (1977) showed that the single most powerful source of confidence is mastery experience: doing the thing, however imperfectly, and surviving it. Every attempt adds a data point that says: "I can do this."\n\nThe Becoming Institute Rule: Choose one skill. Take one action per week. Review and improve. Track for 4 weeks. At the end of the month, look back at where you started. The gap between your Week 1 and Week 4 is your evidence. That evidence becomes your confidence.`, regular, 9.5, textDark, 50, y, 512, 14);
  y -= 16;
  y = section(p2, fonts, 'MY SKILL & STARTING POINT', y, siAccent);
  y = fieldLine(p2, fonts, 'Skill I am committed to building this month:', y);
  p2.drawText('Why this skill matters to my self-image:', { x: 65, y, size: 9.5, font: bold, color: textDark }); y -= 14;
  p2.drawLine({ start: { x: 65, y }, end: { x: 545, y }, thickness: 0.5, color: borderLine }); y -= 18;
  p2.drawText('Competence level today (1 = zero, 10 = expert): ___/10', { x: 65, y, size: 9.5, font: bold, color: textDark }); y -= 14;
  p2.drawText('Confidence level today (1 = terrified, 10 = totally confident): ___/10', { x: 65, y, size: 9.5, font: bold, color: textDark }); y -= 14;
  y = fieldLine(p2, fonts, 'Specific action I will take this week (concrete, measurable):', y);
  decor(p2, fonts, 'Confidence-Competence Tracker', 2, TOTAL);
  const p3 = pdfDoc.addPage([612, H]);
  y = H - 70;
  y = section(p3, fonts, '4-WEEK ACTION LOG', y);
  for (let wk = 1; wk <= 4; wk++) {
    p3.drawRectangle({ x: 50, y: y - 16, width: 512, height: 18, color: siPrimary });
    p3.drawText(`WEEK ${wk}`, { x: 65, y: y - 6, size: 10, font: bold, color: white }); y -= 24;
    const fields = ['Specific action I took:', 'What I did well:', 'What I will improve:', 'Unexpected challenge:', 'How I handled it:'];
    for (const f of fields) { y = fieldLine(p3, fonts, f, y); }
    p3.drawText(`Competence: ___/10  |  Confidence: ___/10`, { x: 65, y, size: 9.5, font: bold, color: siAccent }); y -= 28;
  }
  decor(p3, fonts, 'Confidence-Competence Tracker', 3, TOTAL);
  closingPage(pdfDoc, fonts, 4, TOTAL);
  const bytes = await pdfDoc.save();
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'documents', 'confidence-competence-tracker.pdf'), bytes);
  console.log('✅ confidence-competence-tracker.pdf — ' + (bytes.length / 1024).toFixed(1) + ' KB');
}

// ═══════════════════════════════════════════════════════════════════
// MAIN RUNNER
// ═══════════════════════════════════════════════════════════════════
async function main() {
  console.log('\n🎨 Generating Self-Image Course PDFs...\n');
  try {
    await generateSelfImageMastery();
    await generateSelfImageSnapshot();
    await generateSelfTalkTransformation();
    await generateIdentityValuesBlueprint();
    await generateConfidenceTracker();
    console.log('\n✅ All Self-Image PDFs generated successfully!\n');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
