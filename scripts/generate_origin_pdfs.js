const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function createTier1PDF() {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Page 1: Header & Dream Phase
  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page1.getSize();

  // Dark obsidian header bar
  page1.drawRectangle({
    x: 0,
    y: height - 105,
    width: width,
    height: 105,
    color: rgb(0.04, 0.04, 0.04),
  });

  page1.drawText('ORIGIN', {
    x: 40,
    y: height - 42,
    size: 24,
    font: fontBold,
    color: rgb(0.38, 0.65, 0.98), // #60a5fa
  });

  page1.drawText('POWERED BY THE BECOMING INSTITUTE  |  MINDVEST GLOBAL RESOURCES', {
    x: 40,
    y: height - 60,
    size: 8,
    font: fontBold,
    color: rgb(0.96, 0.62, 0.04), // amber
  });

  page1.drawText('21-DAY LIFE DESIGN SYSTEM  |  TIER 01 FREE STARTER SAMPLE', {
    x: 40,
    y: height - 76,
    size: 8.5,
    font: fontBold,
    color: rgb(0.6, 0.6, 0.6),
  });

  page1.drawText('7-DAY MICRO-SPRINT STARTER GUIDE', {
    x: 40,
    y: height - 92,
    size: 10.5,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  // Philosophy Box
  page1.drawRectangle({
    x: 40,
    y: height - 165,
    width: width - 80,
    height: 48,
    color: rgb(0.96, 0.97, 0.99),
    borderColor: rgb(0.8, 0.85, 0.95),
    borderWidth: 1,
  });

  page1.drawText('CORE PHILOSOPHY: "Dream -> Education -> Purpose"', {
    x: 55,
    y: height - 138,
    size: 9.5,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  page1.drawText('We start with your dreams before educating you. Powered by The Becoming Institute.', {
    x: 55,
    y: height - 153,
    size: 8.5,
    font: fontOblique,
    color: rgb(0.3, 0.3, 0.3),
  });

  // Section 1: Dream Mapping (Days 1-2)
  page1.drawText('PHASE 01: DREAM MAPPING (DAYS 1 - 2)', {
    x: 40,
    y: height - 198,
    size: 11.5,
    font: fontBold,
    color: rgb(0.1, 0.3, 0.7),
  });

  page1.drawText('1.1 Primary 7-Day Dream Target:', {
    x: 40,
    y: height - 220,
    size: 9.5,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  page1.drawText('What single major outcome will make this week a breakthrough?', {
    x: 40,
    y: height - 234,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4),
  });

  // Fillable Box
  page1.drawRectangle({
    x: 40,
    y: height - 318,
    width: width - 80,
    height: 72,
    borderColor: rgb(0.7, 0.7, 0.7),
    borderWidth: 1,
  });

  page1.drawText('1.2 Why Does This Dream Matter To You Right Now?:', {
    x: 40,
    y: height - 342,
    size: 9.5,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  page1.drawRectangle({
    x: 40,
    y: height - 435,
    width: width - 80,
    height: 78,
    borderColor: rgb(0.7, 0.7, 0.7),
    borderWidth: 1,
  });

  // Section 2: Education Sprint (Days 3-4)
  page1.drawText('PHASE 02: TARGETED SKILL SPRINT (DAYS 3 - 4)', {
    x: 40,
    y: height - 468,
    size: 11.5,
    font: fontBold,
    color: rgb(0.1, 0.3, 0.7),
  });

  page1.drawText('2.1 Key Skill Required To Reach Your Dream Target:', {
    x: 40,
    y: height - 490,
    size: 9.5,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  page1.drawRectangle({
    x: 40,
    y: height - 560,
    width: width - 80,
    height: 58,
    borderColor: rgb(0.7, 0.7, 0.7),
    borderWidth: 1,
  });

  page1.drawText('2.2 Daily 30-Minute Study Slot Commitment:', {
    x: 40,
    y: height - 584,
    size: 9.5,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  page1.drawRectangle({
    x: 40,
    y: height - 642,
    width: width - 80,
    height: 48,
    borderColor: rgb(0.7, 0.7, 0.7),
    borderWidth: 1,
  });

  // Section 3: Purpose Execution (Days 5-7)
  page1.drawText('PHASE 03: PURPOSE & DAILY NON-NEGOTIABLE EXECUTION (DAYS 5 - 7)', {
    x: 40,
    y: height - 676,
    size: 10.5,
    font: fontBold,
    color: rgb(0.1, 0.3, 0.7),
  });

  const days = ['Day 5 Priority:', 'Day 6 Priority:', 'Day 7 Priority:'];
  let yPos = height - 700;
  days.forEach((dayLabel) => {
    page1.drawText(dayLabel, { x: 40, y: yPos, size: 8.5, font: fontBold, color: rgb(0.2, 0.2, 0.2) });
    page1.drawRectangle({
      x: 130,
      y: yPos - 8,
      width: width - 170,
      height: 20,
      borderColor: rgb(0.7, 0.7, 0.7),
      borderWidth: 1,
    });
    yPos -= 28;
  });

  // Footer Attribution
  page1.drawText('(c) Origin 21-Day Life Design System | Powered by The Becoming Institute (Mindvest Global Resources)', {
    x: 40,
    y: 25,
    size: 8,
    font: fontBold,
    color: rgb(0.4, 0.4, 0.4),
  });

  return await pdfDoc.save();
}

async function createTier2PDF() {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Page 1: 21-Day Overview & Phase I (Dream Sprint: Days 1-7) & Phase II (Education: Days 8-14)
  const page1 = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page1.getSize();

  // Dark obsidian header
  page1.drawRectangle({
    x: 0,
    y: height - 110,
    width: width,
    height: 110,
    color: rgb(0.04, 0.04, 0.04),
  });

  page1.drawText('ORIGIN', {
    x: 40,
    y: height - 42,
    size: 24,
    font: fontBold,
    color: rgb(0.38, 0.65, 0.98),
  });

  page1.drawText('POWERED BY THE BECOMING INSTITUTE  |  MINDVEST GLOBAL RESOURCES', {
    x: 40,
    y: height - 60,
    size: 8,
    font: fontBold,
    color: rgb(0.96, 0.62, 0.04),
  });

  page1.drawText('21-DAY LIFE DESIGN MASTER KIT  |  TIER 02 DIGITAL PRO', {
    x: 40,
    y: height - 76,
    size: 8.5,
    font: fontBold,
    color: rgb(0.8, 0.8, 0.8),
  });

  page1.drawText('DREAM (DAYS 1-7) -> EDUCATION (DAYS 8-14) -> PURPOSE (DAYS 15-21)', {
    x: 40,
    y: height - 92,
    size: 8.5,
    font: fontBold,
    color: rgb(0.38, 0.65, 0.98),
  });

  // Introduction Callout
  page1.drawRectangle({
    x: 40,
    y: height - 175,
    width: width - 80,
    height: 52,
    color: rgb(0.95, 0.97, 1),
    borderColor: rgb(0.6, 0.75, 0.98),
    borderWidth: 1.5,
  });

  page1.drawText('THE BECOMING INSTITUTE HERITAGE:', {
    x: 55,
    y: height - 142,
    size: 9.5,
    font: fontBold,
    color: rgb(0.05, 0.2, 0.5),
  });

  page1.drawText('Origin is powered by The Becoming Institute under Mindvest Global Resources. 21-day sprints build undeniable habits.', {
    x: 55,
    y: height - 158,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Phase I: Dream Sprint (Days 1-7)
  page1.drawText('PHASE I: DAYS 1 - 7 (DREAM SPRINT & VISION ARCHITECTURE)', {
    x: 40,
    y: height - 205,
    size: 11.5,
    font: fontBold,
    color: rgb(0.1, 0.3, 0.7),
  });

  page1.drawText('1.1 21-Day Master Target Outcome:', {
    x: 40,
    y: height - 228,
    size: 9.5,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  page1.drawRectangle({
    x: 40,
    y: height - 315,
    width: width - 80,
    height: 75,
    borderColor: rgb(0.7, 0.7, 0.7),
    borderWidth: 1,
  });

  // 3-Week Milestones
  page1.drawText('1.2 Weekly Target Breakdown:', {
    x: 40,
    y: height - 340,
    size: 9.5,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  const weeks = [
    { title: 'Week 01 (Days 1-7): Foundation & Dream Mapping', defaultVal: 'Target:' },
    { title: 'Week 02 (Days 8-14): Skill Gap Mastery & Targeted Education', defaultVal: 'Target:' },
    { title: 'Week 03 (Days 15-21): High-Yield Purpose & Non-Negotiable Execution', defaultVal: 'Target:' },
  ];

  let mY = height - 365;
  weeks.forEach((w) => {
    page1.drawText(w.title, { x: 40, y: mY, size: 8.5, font: fontBold, color: rgb(0.2, 0.3, 0.5) });
    page1.drawRectangle({
      x: 40,
      y: mY - 45,
      width: width - 80,
      height: 38,
      borderColor: rgb(0.75, 0.75, 0.75),
      borderWidth: 1,
    });
    mY -= 65;
  });

  // Phase II: Education Sprint (Days 8-14)
  page1.drawText('PHASE II: DAYS 8 - 14 (SKILL GAP MASTERY & EDUCATION ROADMAP)', {
    x: 40,
    y: height - 580,
    size: 11.5,
    font: fontBold,
    color: rgb(0.1, 0.3, 0.7),
  });

  page1.drawText('2.1 What 2 specific skills are required to execute your 21-day sprint target?', {
    x: 40,
    y: height - 603,
    size: 9,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  page1.drawRectangle({
    x: 40,
    y: height - 680,
    width: width - 80,
    height: 65,
    borderColor: rgb(0.7, 0.7, 0.7),
    borderWidth: 1,
  });

  page1.drawText('2.2 Daily 60-Minute Learning Habit Commitment Slot:', {
    x: 40,
    y: height - 705,
    size: 9,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  page1.drawRectangle({
    x: 40,
    y: height - 765,
    width: width - 80,
    height: 50,
    borderColor: rgb(0.7, 0.7, 0.7),
    borderWidth: 1,
  });

  page1.drawText('Page 1 of 2  |  Origin 21-Day System powered by The Becoming Institute', {
    x: 40,
    y: 25,
    size: 8,
    font: fontBold,
    color: rgb(0.4, 0.4, 0.4),
  });

  // Page 2: Phase III & Founder Audio Script
  const page2 = pdfDoc.addPage([595.28, 841.89]);

  // Header Page 2
  page2.drawRectangle({
    x: 0,
    y: height - 70,
    width: width,
    height: 70,
    color: rgb(0.04, 0.04, 0.04),
  });

  page2.drawText('ORIGIN 21-DAY MASTER KIT', {
    x: 40,
    y: height - 35,
    size: 16,
    font: fontBold,
    color: rgb(0.38, 0.65, 0.98),
  });

  page2.drawText('POWERED BY THE BECOMING INSTITUTE  |  MINDVEST GLOBAL RESOURCES', {
    x: 40,
    y: height - 52,
    size: 8,
    font: fontBold,
    color: rgb(0.96, 0.62, 0.04),
  });

  // Phase III: Days 15-21
  page2.drawText('PHASE III: DAYS 15 - 21 (HIGH-YIELD PURPOSE EXECUTION)', {
    x: 40,
    y: height - 100,
    size: 11.5,
    font: fontBold,
    color: rgb(0.1, 0.3, 0.7),
  });

  page2.drawText('3.1 Daily Non-Negotiable Priority Matrix (Days 15 - 21):', {
    x: 40,
    y: height - 120,
    size: 9.5,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  let pY = height - 145;
  for (let i = 15; i <= 21; i++) {
    page2.drawText(`Day ${i} Priority Focus:`, { x: 40, y: pY, size: 8, font: fontBold, color: rgb(0.3, 0.3, 0.3) });
    page2.drawRectangle({
      x: 140,
      y: pY - 6,
      width: width - 180,
      height: 18,
      borderColor: rgb(0.75, 0.75, 0.75),
      borderWidth: 1,
    });
    pY -= 24;
  }

  // Founder Audio Script Section
  page2.drawText('FOUNDER AUDIO GUIDE 21-DAY SPRINT TRANSCRIPT', {
    x: 40,
    y: height - 325,
    size: 11,
    font: fontBold,
    color: rgb(0.1, 0.3, 0.7),
  });

  page2.drawRectangle({
    x: 40,
    y: height - 520,
    width: width - 80,
    height: 180,
    color: rgb(0.97, 0.98, 1),
    borderColor: rgb(0.7, 0.8, 0.95),
    borderWidth: 1,
  });

  page2.drawText('[0:00 - 0:45] Why 21-Day Sprints Win:', {
    x: 55,
    y: height - 350,
    size: 9,
    font: fontBold,
    color: rgb(0.1, 0.2, 0.4),
  });
  page2.drawText('"Welcome to Origin. Long timeline goals create complacency. A 21-day sprint creates rapid neural feedback,', {
    x: 55,
    y: height - 365,
    size: 8.5,
    font: fontOblique,
    color: rgb(0.25, 0.25, 0.25),
  });
  page2.drawText('anchors atomic daily habits, and forces intense focus and immediate execution."', {
    x: 55,
    y: height - 378,
    size: 8.5,
    font: fontOblique,
    color: rgb(0.25, 0.25, 0.25),
  });

  page2.drawText('[0:45 - 1:30] Phase I & II - Dream (Days 1-7) & Targeted Skill Mastery (Days 8-14):', {
    x: 55,
    y: height - 405,
    size: 9,
    font: fontBold,
    color: rgb(0.1, 0.2, 0.4),
  });
  page2.drawText('"In Week 1, map your dream targets. In Week 2, education becomes laser-focused on acquiring the exact', {
    x: 55,
    y: height - 420,
    size: 8.5,
    font: fontOblique,
    color: rgb(0.25, 0.25, 0.25),
  });
  page2.drawText('2 core capabilities required to execute your sprint."', {
    x: 55,
    y: height - 433,
    size: 8.5,
    font: fontOblique,
    color: rgb(0.25, 0.25, 0.25),
  });

  page2.drawText('[1:30 - 2:30] Phase III - Purpose Execution (Days 15-21) & Sprint Review:', {
    x: 55,
    y: height - 460,
    size: 9,
    font: fontBold,
    color: rgb(0.1, 0.2, 0.4),
  });
  page2.drawText('"Days 15 to 21 are pure purpose and execution. You complete the sprint, measure your outcome, and reset', {
    x: 55,
    y: height - 475,
    size: 8.5,
    font: fontOblique,
    color: rgb(0.25, 0.25, 0.25),
  });
  page2.drawText('for the next cycle with undeniable momentum. High focus. Zero burnout."', {
    x: 55,
    y: height - 488,
    size: 8.5,
    font: fontOblique,
    color: rgb(0.25, 0.25, 0.25),
  });

  // Graduation Scorecard
  page2.drawText('DAY 21 RETROSPECTIVE & SPRINT GRADUATION SCORECARD', {
    x: 40,
    y: height - 545,
    size: 11,
    font: fontBold,
    color: rgb(0.1, 0.3, 0.7),
  });

  page2.drawRectangle({
    x: 40,
    y: height - 765,
    width: width - 80,
    height: 205,
    borderColor: rgb(0.7, 0.7, 0.7),
    borderWidth: 1,
  });

  page2.drawText('What was your #1 breakthrough win in this 21-day cycle?:', { x: 55, y: height - 570, size: 8.5, font: fontBold, color: rgb(0.3, 0.3, 0.3) });
  page2.drawText('What course / skill unlocked the most value?:', { x: 55, y: height - 635, size: 8.5, font: fontBold, color: rgb(0.3, 0.3, 0.3) });
  page2.drawText('Your Next 21-Day Sprint Vision Target:', { x: 55, y: height - 700, size: 8.5, font: fontBold, color: rgb(0.3, 0.3, 0.3) });

  page2.drawText('Page 2 of 2  |  Origin 21-Day System powered by The Becoming Institute', {
    x: 40,
    y: 25,
    size: 8,
    font: fontBold,
    color: rgb(0.4, 0.4, 0.4),
  });

  return await pdfDoc.save();
}

async function createTier3PDF() {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  // Dark amber header
  page.drawRectangle({
    x: 0,
    y: height - 110,
    width: width,
    height: 110,
    color: rgb(0.08, 0.06, 0.02),
  });

  page.drawText('ORIGIN', {
    x: 40,
    y: height - 42,
    size: 24,
    font: fontBold,
    color: rgb(0.96, 0.62, 0.04), // amber
  });

  page.drawText('POWERED BY THE BECOMING INSTITUTE  |  MINDVEST GLOBAL RESOURCES', {
    x: 40,
    y: height - 60,
    size: 8,
    font: fontBold,
    color: rgb(0.96, 0.62, 0.04),
  });

  page.drawText('21-DAY HARDCOVER JOURNAL EDITION  |  TIER 03 COMPANION GUIDE', {
    x: 40,
    y: height - 76,
    size: 8.5,
    font: fontBold,
    color: rgb(0.9, 0.8, 0.6),
  });

  page.drawText('PHYSICAL EDITION DELIVERY VOUCHER & DIGITAL TWIN ACCESS', {
    x: 40,
    y: height - 92,
    size: 8.5,
    font: fontBold,
    color: rgb(0.96, 0.62, 0.04),
  });

  page.drawRectangle({
    x: 40,
    y: height - 210,
    width: width - 80,
    height: 85,
    color: rgb(0.98, 0.97, 0.94),
    borderColor: rgb(0.96, 0.62, 0.04),
    borderWidth: 1.5,
  });

  page.drawText('WELCOME TO THE PHYSICAL HARDCOVER EDITION', {
    x: 55,
    y: height - 145,
    size: 10.5,
    font: fontBold,
    color: rgb(0.4, 0.25, 0.05),
  });

  page.drawText('Thank you for choosing the Origin 21-Day Debossed Linen Hardcover Journal.', {
    x: 55,
    y: height - 165,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('Your physical journal is being prepared for dispatch (3-5 business days across Nigeria).', {
    x: 55,
    y: height - 180,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('HOW TO USE YOUR DIGITAL TWIN TODAY:', {
    x: 40,
    y: height - 235,
    size: 10.5,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  const steps = [
    '1. Open your included 21-Day Digital Master Kit on your iPad/tablet or print pages.',
    '2. Listen to the Founder Audio Sprint Guide (2:30 mins) to align your mindset.',
    '3. Begin Days 1-7 Dream Mapping immediately while your tactile journal arrives.',
    '4. When your physical journal arrives, continue handwriting with deep cognitive retention.'
  ];

  let sY = height - 258;
  steps.forEach((step) => {
    page.drawText(step, { x: 40, y: sY, size: 8.5, font: fontRegular, color: rgb(0.3, 0.3, 0.3) });
    sY -= 20;
  });

  page.drawRectangle({
    x: 40,
    y: height - 440,
    width: width - 80,
    height: 75,
    color: rgb(0.96, 0.97, 0.99),
    borderColor: rgb(0.8, 0.85, 0.95),
    borderWidth: 1,
  });

  page.drawText('EXCLUSIVE DIGITAL INCLUSION:', {
    x: 55,
    y: height - 375,
    size: 9.5,
    font: fontBold,
    color: rgb(0.1, 0.2, 0.4),
  });

  page.drawText('As a Tier 03 owner, you also have full access to the 21-Day Digital Master Kit (PDF)', {
    x: 55,
    y: height - 392,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText('and the Founder Audio Guide sprint. Use the Digital Twin on your tablet/iPad', {
    x: 55,
    y: height - 406,
    size: 8,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3),
  });
  page.drawText('while your hardcover journal arrives!', {
    x: 55,
    y: height - 420,
    size: 8,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText('Page 1 of 1  |  Origin powered by The Becoming Institute (Mindvest Global Resources)', {
    x: 40,
    y: 25,
    size: 8,
    font: fontBold,
    color: rgb(0.4, 0.4, 0.4),
  });

  return await pdfDoc.save();
}

async function generateAllPDFs() {
  const docDir = path.join(__dirname, '..', 'public', 'documents');
  if (!fs.existsSync(docDir)) {
    fs.mkdirSync(docDir, { recursive: true });
  }

  const pdf1 = await createTier1PDF();
  fs.writeFileSync(path.join(docDir, 'origin_7day_sprint_starter.pdf'), pdf1);
  console.log('Updated origin_7day_sprint_starter.pdf');

  const pdf2 = await createTier2PDF();
  fs.writeFileSync(path.join(docDir, 'origin_21day_digital_master_kit.pdf'), pdf2);
  fs.writeFileSync(path.join(docDir, 'origin_90day_digital_master_kit.pdf'), pdf2); // backward compat
  console.log('Updated origin_21day_digital_master_kit.pdf and alias origin_90day_digital_master_kit.pdf');

  const pdf3 = await createTier3PDF();
  fs.writeFileSync(path.join(docDir, 'origin_21day_hardcover_companion.pdf'), pdf3);
  fs.writeFileSync(path.join(docDir, 'origin_90day_hardcover_companion.pdf'), pdf3); // backward compat
  console.log('Updated origin_21day_hardcover_companion.pdf and alias origin_90day_hardcover_companion.pdf');
}

generateAllPDFs().catch(console.error);
