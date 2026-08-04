const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const T = require('./ebook-template');

const PW = 612, PH = 792;
const OUT = path.join(__dirname, '..', 'public', 'documents');

// 1. origin_90day_digital_master_kit.pdf
async function generateDigitalMasterKit() {
  const doc = await PDFDocument.create();
  const fonts = await T.embedFonts(doc);
  const accent = rgb(0.12, 0.12, 0.14);

  const p1 = doc.addPage([PW, PH]);
  await T.cover(p1, {
    title: 'ORIGIN\n90-DAY\nMASTER KIT',
    subtitle: 'Dream -> Education -> Purpose\nYour quarterly blueprint for personal architecture.',
    author: 'Zeki Ubor', accent, fonts,
  });

  const p2 = doc.addPage([PW, PH]);
  T.copyrightPage(p2, {
    title: 'Origin 90-Day Digital Master Kit',
    author: 'Zeki Ubor',
    dedication: 'To everyone committed to turning abstract potential into concrete daily progress.',
    accent, fonts,
  });

  const p3 = doc.addPage([PW, PH]);
  T.tocPage(p3, {
    accent, fonts,
    chapters: [
      { num: 'INTRO',   title: 'Framework & How to Use This Kit',  pg: 4 },
      { num: 'PHASE 1', title: 'Phase 1: Dream (Days 1–30)',       pg: 5 },
      { num: 'PHASE 2', title: 'Phase 2: Education (Days 31–60)',  pg: 6 },
      { num: 'PHASE 3', title: 'Phase 3: Purpose (Days 61–90)',    pg: 7 },
      { num: 'REVIEW',  title: 'Quarterly Review & Next Cycle',     pg: 8 },
      { num: 'AUTHOR',  title: 'About the Author',                 pg: 9 },
    ],
  });

  const p4 = doc.addPage([PW, PH]);
  T.quotePage(p4, {
    quote: 'Small daily habits, anchored in clear vision, compound into extraordinary transformation.',
    attribution: 'Zeki Ubor — Origin 90-Day Master Kit',
    accent, fonts,
  });

  const phases = [
    {
      num: 1, title: 'Phase 1: Dream\n(Days 1-30)', sub: 'Auditing Vision & Clarifying Identity',
      body: `The Dream phase is the foundation of personal architecture. Without a clear, compelling vision, action is merely motion.\n\nWeek 1 — Vision Audit:\n• What do I want my life to look like in 3 years? Write in present tense as if already true.\n• What would I pursue if I knew failure was impossible?\n• What legacy do I want to leave behind?\n\nWeek 2 — Values Clarification:\n• List your top 10 values, then narrow to your top 3.\n• Are your current daily choices aligned with these values? Identify gaps.\n\nWeek 3 — Vision Design:\n• Write your 90-day vision across Career, Health, Relationships, and Purpose.\n• Make each statement specific, measurable, and emotionally compelling.\n\nWeek 4 — Dream Solidification:\n• Read your vision aloud every morning.\n• Share it with one trusted person for accountability.\n• Refine until it inspires and challenges you.`,
      action: 'Complete the Vision Audit on Day 1. Schedule 30 minutes in your calendar for each weekly exercise.',
    },
    {
      num: 2, title: 'Phase 2: Education\n(Days 31-60)', sub: 'Acquiring Knowledge & Skill Mastery',
      body: `The Education phase gives your vision substance. What you don't know is limiting you more than you realize.\n\nWeek 5 — Knowledge Gap Analysis:\n• List 5 skills or knowledge areas required for your 90-day vision.\n• Rate your current proficiency in each (1–10).\n• Prioritize the top 2 to develop during this sprint.\n\nWeek 6 — Learning Architecture:\n• Identify primary learning resources (books, courses, mentors, practice).\n• Block 45 minutes daily for intentional learning — non-negotiable.\n\nWeek 7 — Application Sprint:\n• For every concept learned, write one way to apply it immediately.\n• Teach one insight per week to someone else to accelerate retention.\n\nWeek 8 — Mindset Integration:\n• Identify limiting beliefs that surfaced during learning.\n• Challenge and replace each limiting belief with an empowering alternative.`,
      action: 'Complete your Knowledge Gap Analysis on Day 31. Block 45 minutes for daily learning in your calendar.',
    },
    {
      num: 3, title: 'Phase 3: Purpose\n(Days 61-90)', sub: 'High-Impact Action & Deployment',
      body: `The Purpose phase converges vision and learning into intentional, high-leverage action.\n\nWeek 9 — Action Architecture:\n• Identify the 3 most important actions that move you closest to your vision.\n• Schedule them as first priorities in your week.\n\nWeek 10 — Momentum Building:\n• Review progress against your Week 1 vision. What has improved?\n• Celebrate every win — momentum is built on acknowledged progress.\n\nWeek 11 — Relationship Investment:\n• Identify 3 key relationships and intentionally invest in them.\n• Reach out to a mentor or peer for a mid-sprint check-in.\n\nWeek 12 — Legacy & Continuation:\n• Write your 90-day review: What did you build? What did you learn?\n• Design your next 90-day cycle using insights from this one.`,
      action: 'Complete your 90-Day Review on Day 90. Immediately outline your next 90-day cycle.',
    },
  ];

  let pgNum = 5;
  for (const ph of phases) {
    const pg = doc.addPage([PW, PH]);
    let y = T.chapterOpener(pg, { num: ph.num, title: ph.title, subtitle: ph.sub, accent, fonts });
    y -= 8;
    y = T.wrap(pg, ph.body, fonts.R, 9.8, T.T.dark, 60, y, PW - 120, 15.5);
    if (y > 115) { y -= 10; T.actionBox(pg, ph.action, accent, fonts, y); }
    T.decoratePage(pg, '90-DAY DIGITAL MASTER KIT', pgNum++, fonts);
  }

  const pA = doc.addPage([PW, PH]);
  T.aboutPage(pA, { accent, fonts });
  T.decoratePage(pA, '90-DAY DIGITAL MASTER KIT', pgNum, fonts);

  const bytes = await doc.save();
  fs.writeFileSync(path.join(OUT, 'origin_90day_digital_master_kit.pdf'), bytes);
  console.log(`✅ origin_90day_digital_master_kit.pdf — ${(bytes.length / 1024).toFixed(1)} KB`);
}

// 2. origin_7day_sprint_starter.pdf
async function generate7DaySprint() {
  const doc = await PDFDocument.create();
  const fonts = await T.embedFonts(doc);
  const accent = rgb(0.12, 0.12, 0.14);

  const p1 = doc.addPage([PW, PH]);
  await T.cover(p1, {
    title: 'ORIGIN\n7-DAY\nMICRO-SPRINT',
    subtitle: 'Your quickstart focus guide to immediate clarity and momentum.',
    author: 'Zeki Ubor', accent, fonts,
  });

  const p2 = doc.addPage([PW, PH]);
  T.copyrightPage(p2, {
    title: 'Origin 7-Day Micro-Sprint',
    author: 'Zeki Ubor',
    dedication: 'To those ready to break inertia and build immediate momentum in 7 days.',
    accent, fonts,
  });

  const p3 = doc.addPage([PW, PH]);
  p3.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: T.T.white });
  p3.drawRectangle({ x: 0, y: PH - 88, width: PW, height: 88, color: T.T.black });
  p3.drawRectangle({ x: 0, y: PH - 4, width: PW, height: 4, color: accent });
  p3.drawText('THE 7-DAY SPRINT', { x: 60, y: PH - 50, size: 22, font: fonts.B, color: T.T.white });

  let y = PH - 120;
  const days = [
    ['DAY 1', 'Clarity Audit', 'Write down your current reality without filters. What is working? What is not? What do you want in 90 days?'],
    ['DAY 2', 'Vision Statement', 'Write your 30-day vision across Career, Health, Relationships, and Purpose in present tense.'],
    ['DAY 3', 'Values Identification', 'List your top 10 values. Circle your top 3. Are your daily choices aligned with these?'],
    ['DAY 4', 'Skill & Gap Analysis', 'What knowledge or skill gap is most limiting progress right now? Identify one resource to close it.'],
    ['DAY 5', 'Habit Architecture', 'Implement 3 daily habits: physical, mental, relational. Stack them to existing routines.'],
    ['DAY 6', 'Relationship Audit', 'Audit your top 5 daily contacts. Do they elevate or drain you? Invest in one key relationship.'],
    ['DAY 7', 'Launch Plan', 'Consolidate sprint insights. Set your single most important focus for the next 30 days.'],
  ];
  for (const [day, title, text] of days) {
    p3.drawText(day, { x: 60, y, size: 9, font: fonts.B, color: accent });
    p3.drawText('- ' + title, { x: 105, y, size: 10.5, font: fonts.B, color: T.T.dark });
    y -= 16;
    y = T.wrap(p3, text, fonts.R, 9.5, T.T.mid, 60, y, PW - 120, 14.5);
    y -= 8;
  }
  T.decoratePage(p3, '7-DAY MICRO-SPRINT', 3, fonts);

  const pA = doc.addPage([PW, PH]);
  T.aboutPage(pA, { accent, fonts });
  T.decoratePage(pA, '7-DAY MICRO-SPRINT', 4, fonts);

  const bytes = await doc.save();
  fs.writeFileSync(path.join(OUT, 'origin_7day_sprint_starter.pdf'), bytes);
  console.log(`✅ origin_7day_sprint_starter.pdf — ${(bytes.length / 1024).toFixed(1)} KB`);
}

// 3. origin_90day_hardcover_companion.pdf
async function generateHardcoverCompanion() {
  const doc = await PDFDocument.create();
  const fonts = await T.embedFonts(doc);
  const accent = rgb(0.12, 0.12, 0.14);

  const p1 = doc.addPage([PW, PH]);
  await T.cover(p1, {
    title: 'ORIGIN\nHARDCOVER\nCOMPANION',
    subtitle: 'Digital twin guide for Origin Journal hardcover owners.\nExtend every page with deeper reflection and practice.',
    author: 'Zeki Ubor', accent, fonts,
  });

  const p2 = doc.addPage([PW, PH]);
  T.copyrightPage(p2, {
    title: 'Origin Journal Hardcover Companion Guide',
    author: 'Zeki Ubor',
    dedication: 'To owners of the Origin Hardcover Journal seeking maximum depth and transformation.',
    accent, fonts,
  });

  const p3 = doc.addPage([PW, PH]);
  p3.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: T.T.offWhite });
  p3.drawRectangle({ x: 0, y: PH - 88, width: PW, height: 88, color: T.T.black });
  p3.drawText('HARDCOVER COMPANION', { x: 60, y: PH - 50, size: 20, font: fonts.B, color: T.T.white });

  let y = PH - 125;
  const companion = `Welcome to the Origin Journal Hardcover Edition Companion Guide.\n\nThis digital companion extends every section of your physical Origin Journal with deeper context, expanded exercises, and additional reflection prompts.\n\nHow to Use This Companion:\n• Open this PDF alongside your physical journal.\n• Use the expanded prompts when you want to go deeper on any day or week.\n• Each section corresponds to the same section in your hardcover journal.\n\nCompanion Sections:\n1. Extended Dream Exercises (Days 1–30)\n   — Morning visualization scripts\n   — Vision board prompt questions\n   — Limiting belief identification matrix\n\n2. Extended Education Resources (Days 31–60)\n   — Recommended reading list per domain\n   — Learning reflection templates\n   — Skill application journal format\n\n3. Extended Purpose Deployment (Days 61–90)\n   — Weekly accountability questions\n   — Impact measurement framework\n   — Legacy design exercise\n\n4. The 90-Day Review Template\n   — End-of-cycle reflection\n   — Progress quantification guide`;
  y = T.wrap(p3, companion, fonts.R, 10.5, T.T.dark, 60, y, PW - 120, 17);
  T.decoratePage(p3, 'HARDCOVER COMPANION', 3, fonts);

  const pA = doc.addPage([PW, PH]);
  T.aboutPage(pA, { accent, fonts });
  T.decoratePage(pA, 'HARDCOVER COMPANION', 4, fonts);

  const bytes = await doc.save();
  fs.writeFileSync(path.join(OUT, 'origin_90day_hardcover_companion.pdf'), bytes);
  console.log(`✅ origin_90day_hardcover_companion.pdf — ${(bytes.length / 1024).toFixed(1)} KB`);
}

async function main() {
  await generateDigitalMasterKit();
  await generate7DaySprint();
  await generateHardcoverCompanion();
}

main().catch(console.error);
