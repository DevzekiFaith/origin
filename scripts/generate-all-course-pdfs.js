const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// ─── Shared Palette ──────────────────────────────────────────────────────────
const C = {
  deepBlue:    rgb(0.05, 0.18, 0.48),
  skyBlue:     rgb(0.25, 0.55, 0.95),
  gold:        rgb(0.85, 0.65, 0.12),
  charcoal:    rgb(0.10, 0.12, 0.14),
  textDark:    rgb(0.14, 0.16, 0.20),
  muted:       rgb(0.42, 0.47, 0.54),
  lightBg:     rgb(0.97, 0.97, 0.98),
  border:      rgb(0.86, 0.87, 0.90),
  white:       rgb(1, 1, 1),
  green:       rgb(0.08, 0.48, 0.22),
  purple:      rgb(0.35, 0.10, 0.62),
  rose:        rgb(0.72, 0.08, 0.18),
  teal:        rgb(0.04, 0.48, 0.52),
};

async function base() {
  const doc = await PDFDocument.create();
  const R = await doc.embedFont(StandardFonts.Helvetica);
  const B = await doc.embedFont(StandardFonts.HelveticaBold);
  const I = await doc.embedFont(StandardFonts.HelveticaOblique);
  return { doc, R, B, I };
}

function wrap(page, text, font, size, color, x, y, maxW, lh) {
  for (const para of text.split('\n')) {
    if (!para.trim()) { y -= lh * 0.6; continue; }
    let line = '';
    for (const word of para.split(' ')) {
      const test = line + word + ' ';
      if (font.widthOfTextAtSize(test, size) > maxW && line) {
        page.drawText(line.trim(), { x, y, size, font, color });
        line = word + ' '; y -= lh;
      } else line = test;
    }
    if (line.trim()) { page.drawText(line.trim(), { x, y, size, font, color }); y -= lh; }
  }
  return y;
}

function header(page, fonts, sectionTitle, pg, total) {
  const { width, height } = page.getSize();
  page.drawLine({ start:{x:40,y:height-44}, end:{x:width-40,y:height-44}, thickness:0.6, color:C.border });
  page.drawText(`ORIGIN — THE BECOMING INSTITUTE   |   ${sectionTitle.toUpperCase()}`, { x:40, y:height-35, size:7.5, font:fonts.B, color:C.muted });
  page.drawLine({ start:{x:40,y:44}, end:{x:width-40,y:44}, thickness:0.6, color:C.border });
  page.drawText('www.origin.com.ng  |  The Becoming Institute  |  (c) 2025 Zeki Ubor', { x:40, y:28, size:7.5, font:fonts.R, color:C.muted });
  page.drawText(`${pg} / ${total}`, { x:width-60, y:28, size:7.5, font:fonts.R, color:C.muted });
}

function sectionBar(page, fonts, title, y, accent) {
  page.drawRectangle({ x:50, y:y-30, width:512, height:36, color:accent });
  page.drawText(title, { x:65, y:y-18, size:11.5, font:fonts.B, color:C.white });
  return y - 54;
}

function bullet(page, fonts, items, y, x=70, accent=C.deepBlue) {
  for (const item of items) {
    page.drawCircle({ x:x-10, y:y+3.5, size:3, color:accent });
    y = wrap(page, item, fonts.R, 9.5, C.textDark, x, y, 490, 14);
    y -= 3;
  }
  return y;
}

function worksheetBox(page, fonts, label, y, lines=4) {
  const lineH = 18;
  const boxH = lineH * lines + 20;
  page.drawRectangle({ x:50, y:y-boxH, width:512, height:boxH, borderColor:C.border, borderWidth:1, color:C.lightBg });
  page.drawText(label, { x:58, y:y-14, size:8.5, font:fonts.B, color:C.muted });
  for (let i=1; i<lines; i++) {
    page.drawLine({ start:{x:60,y:y-14-lineH*i}, end:{x:555,y:y-14-lineH*i}, thickness:0.4, color:C.border });
  }
  return y - boxH - 12;
}

function cover(doc, fonts, { title, subtitle, tagline, accent, category }) {
  const p = doc.addPage([612, 792]);
  const { width, height } = p.getSize();
  p.drawRectangle({ x:0, y:0, width, height, color:C.lightBg });
  p.drawRectangle({ x:0, y:0, width:width*0.44, height, color:accent });
  p.drawRectangle({ x:0, y:height-8, width, height:8, color:C.gold });
  p.drawText('THE BECOMING INSTITUTE', { x:28, y:height-140, size:9, font:fonts.B, color:C.white });
  p.drawText('OFFICIAL COURSE WORKBOOK', { x:28, y:height-158, size:7.5, font:fonts.R, color:rgb(0.75,0.87,1) });
  p.drawRectangle({ x:28, y:178, width:215, height:52, color:C.gold });
  p.drawText(category.toUpperCase(), { x:40, y:212, size:11, font:fonts.B, color:C.charcoal });
  p.drawText('COURSE WORKBOOK', { x:40, y:194, size:8, font:fonts.B, color:C.charcoal });
  const titleLines = title.split('\n');
  let ty = height - 175;
  for (const tl of titleLines) {
    p.drawText(tl.toUpperCase(), { x:286, y:ty, size:38, font:fonts.B, color:accent });
    ty -= 48;
  }
  p.drawText(subtitle, { x:286, y:ty-5, size:13, font:fonts.B, color:C.charcoal }); ty -= 26;
  p.drawText(tagline, { x:286, y:ty, size:9.5, font:fonts.I, color:C.skyBlue }); ty -= 16;
  p.drawLine({ start:{x:286,y:ty}, end:{x:565,y:ty}, thickness:2, color:accent });
  p.drawText('ZEKI UBOR', { x:286, y:118, size:20, font:fonts.B, color:C.charcoal });
  p.drawText('Founder, The Becoming Institute', { x:286, y:100, size:9, font:fonts.R, color:C.muted });
  p.drawText('www.origin.com.ng', { x:286, y:83, size:9, font:fonts.R, color:C.skyBlue });
  return p;
}

function closingPage(doc, fonts, accent, courseTitle) {
  const p = doc.addPage([612, 792]);
  const { width, height } = p.getSize();
  let y = height - 70;
  p.drawRectangle({ x:50, y:y-115, width:512, height:115, color:accent });
  p.drawText('THE BECOMING INSTITUTE', { x:70, y:y-40, size:16, font:fonts.B, color:C.gold });
  p.drawText('Transforming Individuals. Building Leaders. Shaping Generations.', { x:70, y:y-62, size:10, font:fonts.I, color:C.white });
  p.drawText('Founder: Zeki Ubor  |  www.origin.com.ng', { x:70, y:y-83, size:9, font:fonts.R, color:rgb(0.8,0.9,1) });
  p.drawText(`This workbook accompanies the "${courseTitle}" course on the Origin platform.`, { x:70, y:y-105, size:8.5, font:fonts.R, color:rgb(0.75,0.85,1) });
  y -= 140;
  y = wrap(p, 'This workbook is your practical companion for transformational learning. Every framework, worksheet, and reflection exercise has been designed to move you from insight to action — from knowing to becoming.\n\nThe Becoming Institute believes that education is not a destination — it is a daily practice. Carry this workbook with you. Return to it. Complete the exercises. Discuss them with your accountability partner. Teach them to someone else.\n\nThis is not just a guide. This is your blueprint.\n\nContinue your journey at www.origin.com.ng', p.fonts ? p.fonts.R : fonts.R, 10, C.textDark, 50, y, 512, 16);
  y -= 30;
  p.drawRectangle({ x:50, y:y-58, width:512, height:58, color:C.lightBg });
  p.drawText(`Official Origin Course Workbook  |  ${courseTitle}`, { x:70, y:y-24, size:10, font:fonts.B, color:C.charcoal });
  p.drawText('Downloaded from the Origin Learning Platform  |  www.origin.com.ng', { x:70, y:y-44, size:9, font:fonts.R, color:C.muted });
  return p;
}

function rgb(r, g, b) { return { type: 'RGB', red:r, green:g, blue:b }; }

// ════════════════════════════════════════════════════════════════════════
// 1. PROBLEM SOLVING — "8 Ways to Develop Solution Mindset"
// ════════════════════════════════════════════════════════════════════════
async function genProblemSolving() {
  const { doc, R, B, I } = await base();
  const f = { R, B, I };
  const T = 12; const ac = C.deepBlue;
  const courseTitle = '8 Ways to Develop Solution Mindset';
  cover(doc, f, { title:'Solution\nMindset', subtitle:'8 Ways to Develop a Problem-Solving Mind', tagline:'Every problem is an invitation to become more capable.', accent:ac, category:'Problem Solving' });

  // Page 2 — Introduction
  const p2 = doc.addPage([612,792]); let y=792-70;
  y = sectionBar(p2, f, 'INTRODUCTION | The Problem Solver\'s Advantage', y, ac);
  y = wrap(p2, 'In a world that changes faster than ever before, one skill separates those who thrive from those who survive: the ability to solve problems. Not just simple problems — complex, ambiguous, multi-layered problems that have no obvious answer.\n\nThe Becoming Institute defines a Solution Mindset as the trained habit of approaching every challenge with systematic curiosity, creative analysis, and decisive action. It is not a personality trait. It is a skill set — and this course teaches it.\n\nThis workbook is your active companion. Work through each section, complete the exercises, and apply the frameworks to real challenges in your life. The goal is not to read — it is to transform.', R, 9.8, C.textDark, 50, y, 512, 15);
  y -= 18;
  p2.drawRectangle({ x:50, y:y-42, width:512, height:42, color:C.lightBg });
  p2.drawText('"The measure of intelligence is the ability to change." — Albert Einstein', { x:65, y:y-18, size:10, font:I, color:ac });
  p2.drawText('"Every problem is a gift — without problems, we would not grow." — Tony Robbins', { x:65, y:y-34, size:10, font:I, color:ac });
  header(p2, f, 'Introduction', 2, T);

  // Page 3 — 8 Ways Framework
  const p3 = doc.addPage([612,792]); y=792-70;
  y = sectionBar(p3, f, 'THE 8 WAYS FRAMEWORK — OVERVIEW', y, C.charcoal);
  const ways = [
    ['1. Define the Problem Precisely', 'Most people solve the wrong problem. Define it with surgical clarity before touching solutions.'],
    ['2. Apply Root Cause Analysis', 'Use the 5-Whys method to dig beneath symptoms to the actual source of any problem.'],
    ['3. Reframe the Problem', 'Shift your angle. "Why is this failing?" becomes "What would need to be true for this to succeed?"'],
    ['4. Generate Multiple Solutions', 'Force yourself to produce at least 10 options before evaluating any. Quantity first, quality second.'],
    ['5. Use Analytical Frameworks', 'SWOT, Decision Matrix, Fishbone, Force Field — match the right tool to the problem type.'],
    ['6. Apply Creative Thinking', 'Use SCAMPER, analogy thinking, and lateral thinking to break beyond conventional solutions.'],
    ['7. Test and Iterate', 'Small, fast experiments beat grand plans. Prototype, learn, refine.'],
    ['8. Learn From Every Outcome', 'Document every problem solved. Build your personal library of solutions.'],
  ];
  for (const [title, desc] of ways) {
    p3.drawText(title, { x:65, y, size:10, font:B, color:ac }); y -= 14;
    y = wrap(p3, desc, R, 9.5, C.textDark, 75, y, 490, 13); y -= 6;
  }
  header(p3, f, 'The 8 Ways Framework', 3, T);

  // Page 4 — SWOT + Decision Matrix worksheets
  const p4 = doc.addPage([612,792]); y=792-70;
  y = sectionBar(p4, f, 'WORKSHEET 1 | SWOT Analysis for Your Current Challenge', y, ac);
  p4.drawText('Write your current challenge or goal: _______________________________________________', { x:50, y, size:9.5, font:R, color:C.textDark }); y -= 25;
  const quads = [['STRENGTHS (What advantages do you have?)', 50, y-12], ['WEAKNESSES (What is holding you back?)', 287, y-12], ['OPPORTUNITIES (What could you leverage?)', 50, y-112], ['THREATS (What risks exist?)', 287, y-112]];
  for (const [label, qx, qy] of quads) {
    p4.drawRectangle({ x:qx, y:qy-80, width:228, height:80, borderColor:C.border, borderWidth:1, color:C.lightBg });
    p4.drawText(label, { x:qx+6, y:qy-14, size:7.5, font:B, color:C.muted });
  }
  y -= 210;
  y = sectionBar(p4, f, 'WORKSHEET 2 | The 5-Whys Root Cause Finder', y, C.charcoal);
  p4.drawText('Problem Statement: _________________________________________________________________', { x:50, y, size:9.5, font:R, color:C.textDark }); y -= 22;
  for (let i=1; i<=5; i++) {
    p4.drawText(`Why ${i}:`, { x:50, y, size:9.5, font:B, color:ac }); y -= 14;
    p4.drawLine({ start:{x:90,y}, end:{x:562,y}, thickness:0.5, color:C.border }); y -= 20;
  }
  y -= 10;
  p4.drawText('ROOT CAUSE: ______________________________________________________________________', { x:50, y, size:9.5, font:B, color:C.rose }); y -= 10;
  header(p4, f, 'Worksheets 1 & 2', 4, T);

  // Pages 5-10 — Modules deep dive (condensed)
  const modules = [
    { title:'Critical Thinking & Cognitive Bias Audit', key:'critical-thinking', items:['Confirmation bias: Only seeing what confirms existing beliefs', 'Anchoring: Over-relying on the first piece of information', 'Availability heuristic: Overweighting recent or memorable events', 'Dunning-Kruger: Overestimating your competence in unfamiliar areas', 'Sunk cost fallacy: Continuing because of past investment, not future value'] },
    { title:'Creative Problem Solving — SCAMPER Method', key:'scamper', items:['S — Substitute: What can be replaced?', 'C — Combine: What can be merged or joined?', 'A — Adapt: What can be modified to fit another context?', 'M — Modify/Magnify: What can be amplified or reduced?', 'P — Put to other uses: How else could this be used?', 'E — Eliminate: What can be removed entirely?', 'R — Reverse/Rearrange: What if the order or direction was flipped?'] },
    { title:'Decision Making Under Pressure', key:'decision', items:['The Pre-mortem: Imagine it has failed. Why? Work backwards to prevent it.', 'Satisficing: Sometimes "good enough" is the optimal choice given constraints.', 'Decision journal: Document the reasoning behind each major decision.', 'The 10/10/10 Rule: How will you feel about this in 10 min, 10 months, 10 years?', 'Reversibility test: Is this a one-way or two-way door? Two-way doors need less analysis.'] },
    { title:'Collaborative Problem Solving', key:'collaboration', items:['Establish psychological safety: People only share ideas where it is safe to be wrong.', 'Diverge before converging: Generate all ideas before evaluating any of them.', 'Assign a devil\'s advocate: Deliberately challenge the group consensus.', 'Document reasoning, not just conclusions: Track why decisions were made.', 'Celebrate problem-finding as much as problem-solving.'] },
  ];

  let pg = 5;
  for (const mod of modules) {
    const p = doc.addPage([612,792]); y=792-70;
    y = sectionBar(p, f, `MODULE | ${mod.title.toUpperCase()}`, y, pg%2===0?ac:C.charcoal);
    y = bullet(p, f, mod.items, y, 70, ac);
    y -= 20;
    y = sectionBar(p, f, 'REFLECTION EXERCISE', y, C.teal);
    y = worksheetBox(p, f, 'Apply this module to a real current challenge. What did you discover?', y, 5);
    y = worksheetBox(p, f, 'What is one thing you will do differently based on this module?', y, 3);
    header(p, f, mod.title, pg, T); pg++;
  }

  // Page 9 — 30-Day Practice Plan
  const p9 = doc.addPage([612,792]); y=792-70;
  y = sectionBar(p9, f, '30-DAY SOLUTION MINDSET PRACTICE PLAN', y, ac);
  const weeks = [
    ['Week 1 — Awareness', ['Day 1-3: Document every problem you encounter. Define each one precisely.', 'Day 4-5: Apply 5-Whys to your biggest current challenge.', 'Day 6-7: Complete the SWOT worksheet for a goal you are pursuing.']],
    ['Week 2 — Frameworks', ['Day 8-10: Use the Decision Matrix for one pending decision.', 'Day 11-12: Apply SCAMPER to one thing in your life you want to improve.', 'Day 13-14: Reframe 3 problems using alternative perspectives.']],
    ['Week 3 — Creative Expansion', ['Day 15-17: Brainstorm 10+ solutions before choosing any.', 'Day 18-19: Practice lateral thinking with a daily creativity prompt.', 'Day 20-21: Teach the 5-Whys to someone in your household or team.']],
    ['Week 4 — Integration', ['Day 22-25: Apply the complete framework to a major life challenge.', 'Day 26-28: Review decisions made this month. What would you do differently?', 'Day 29-30: Write your Problem-Solving Manifesto — your personal approach.']],
  ];
  for (const [wk, days] of weeks) {
    p9.drawText(wk, { x:50, y, size:10.5, font:B, color:ac }); y -= 16;
    y = bullet(p9, f, days, y, 70, C.charcoal); y -= 8;
  }
  header(p9, f, '30-Day Practice Plan', 9, T);

  // Page 10 — Action commitment + closing
  const p10 = doc.addPage([612,792]); y=792-70;
  y = sectionBar(p10, f, 'MY SOLUTION MINDSET COMMITMENT', y, ac);
  p10.drawText('Complete this section. Sign it. Return to it weekly.', { x:50, y, size:9.5, font:I, color:C.muted }); y -= 22;
  y = worksheetBox(p10, f, 'The biggest problem I commit to solving in the next 30 days:', y, 3);
  y = worksheetBox(p10, f, 'The framework I will use and why:', y, 3);
  y = worksheetBox(p10, f, 'My accountability partner (name) and check-in date:', y, 2);
  y -= 10;
  p10.drawText('Signature: ________________________________   Date: ________________', { x:50, y, size:10, font:R, color:C.muted });
  header(p10, f, 'My Commitment', 10, T);

  closingPage(doc, f, ac, courseTitle);

  const bytes = await doc.save();
  fs.writeFileSync(path.join(__dirname,'..','public','documents','course-problem-solving-workbook.pdf'), bytes);
  console.log('✅ course-problem-solving-workbook.pdf — ' + (bytes.length/1024).toFixed(1) + ' KB');
}

// ════════════════════════════════════════════════════════════════════════
// 2. DECISION MAKING — "9 Ways to Master Decision-Making"
// ════════════════════════════════════════════════════════════════════════
async function genDecisionMaking() {
  const { doc, R, B, I } = await base();
  const f = { R, B, I };
  const T = 11; const ac = C.teal;
  const courseTitle = '9 Ways to Master Decision-Making';
  cover(doc, f, { title:'Decision\nMastery', subtitle:'9 Ways to Make Better Decisions Under Pressure', tagline:'You are the sum of the decisions you have made and not made.', accent:ac, category:'Decision Making' });

  const p2 = doc.addPage([612,792]); let y=792-70;
  y = sectionBar(p2, f, 'INTRODUCTION | Every Decision Shapes Your Destiny', y, ac);
  y = wrap(p2, 'Research by Cornell University found that the average adult makes approximately 35,000 decisions per day. Most are unconscious. But the conscious ones — the ones you deliberate over — are the ones that define your trajectory.\n\nThis course and workbook teach you nine proven strategies for making better decisions — faster, clearer, and with greater confidence. By the end, you will have a personal decision-making system that reduces cognitive load, improves outcome quality, and builds decisiveness as a character trait.\n\nCopy of the Ruth Chang TED Talk (featured in this course) explores how hard choices are not burdens — they are opportunities to define who you are. This workbook helps you build that philosophy into daily practice.', R, 9.8, C.textDark, 50, y, 512, 15); y -= 20;
  p2.drawRectangle({ x:50, y:y-42, width:512, height:42, color:C.lightBg });
  p2.drawText('"It is not the strongest who survive, nor the most intelligent, but the most', { x:65, y:y-16, size:9.5, font:I, color:ac });
  p2.drawText('responsive to change." — Charles Darwin (applied to decisions)', { x:65, y:y-30, size:9.5, font:I, color:ac });
  header(p2, f, 'Introduction', 2, T);

  const p3 = doc.addPage([612,792]); y=792-70;
  y = sectionBar(p3, f, 'THE 9 WAYS — DECISION MASTERY FRAMEWORK', y, C.charcoal);
  const ways = [
    ['1. Define What You Are Actually Deciding', 'Unclear decisions produce unclear outcomes. Name the exact choice with precision.'],
    ['2. Clarify Your Criteria Before Evaluating Options', 'Decide what success looks like before you see the options. Prevents post-hoc rationalisation.'],
    ['3. Gather Information Without Drowning In It', 'Set a research deadline. More information after a threshold rarely improves decisions.'],
    ['4. Use the Pre-mortem', 'Imagine it is 6 months later and the decision failed catastrophically. What happened? Fix it now.'],
    ['5. Apply the 10/10/10 Rule', 'How will you feel about this choice in 10 minutes, 10 months, and 10 years?'],
    ['6. Distinguish Reversible from Irreversible Decisions', 'Two-way doors deserve speed. One-way doors deserve depth. Most decisions are two-way.'],
    ['7. Remove Emotion From High-Stakes Decisions', 'Sleep on it. Write it out. Use structured frameworks before major choices.'],
    ['8. Decide at the Right Energy Level', 'Decision fatigue is real. Make high-stakes decisions in the morning. Preserve cognitive energy.'],
    ['9. Build a Decision Journal', 'Record reasoning, expected outcome, and actual outcome. Review quarterly. Improve over time.'],
  ];
  for (const [title, desc] of ways) {
    p3.drawText(title, { x:65, y, size:10, font:B, color:ac }); y -= 14;
    y = wrap(p3, desc, R, 9.5, C.textDark, 75, y, 488, 13); y -= 6;
  }
  header(p3, f, '9 Ways Framework', 3, T);

  // Worksheet pages
  const p4 = doc.addPage([612,792]); y=792-70;
  y = sectionBar(p4, f, 'DECISION MATRIX WORKSHEET', y, ac);
  p4.drawText('Decision: _______________________________________________________________________', { x:50, y, size:9.5, font:R, color:C.textDark }); y -= 24;
  const headers = ['CRITERIA', 'WEIGHT (1-5)', 'OPTION A', 'OPTION B', 'OPTION C'];
  const cols = [50, 190, 290, 370, 450];
  headers.forEach((h, i) => p4.drawText(h, { x:cols[i], y, size:8.5, font:B, color:ac })); y -= 6;
  p4.drawLine({ start:{x:50,y}, end:{x:562,y}, thickness:1, color:C.border }); y -= 4;
  for (let row=0; row<6; row++) {
    y -= 20;
    p4.drawLine({ start:{x:50,y}, end:{x:562,y}, thickness:0.4, color:C.border });
  }
  y -= 22;
  p4.drawText('TOTAL SCORE:', { x:50, y, size:9.5, font:B, color:C.textDark });
  p4.drawText('___', { x:290, y, size:9.5, font:B, color:ac });
  p4.drawText('___', { x:370, y, size:9.5, font:B, color:ac });
  p4.drawText('___', { x:450, y, size:9.5, font:B, color:ac }); y -= 24;
  y = sectionBar(p4, f, 'PRE-MORTEM WORKSHEET', y, C.charcoal);
  p4.drawText('Decision being made: ____________________________________________________________', { x:50, y, size:9.5, font:R, color:C.textDark }); y -= 22;
  y = worksheetBox(p4, f, 'Imagine it is 6 months later and this decision has failed. What went wrong?', y, 4);
  y = worksheetBox(p4, f, 'What safeguards will you put in place NOW to prevent those failures?', y, 3);
  header(p4, f, 'Decision Matrix & Pre-mortem', 4, T);

  const p5 = doc.addPage([612,792]); y=792-70;
  y = sectionBar(p5, f, 'DECISION JOURNAL — TEMPLATE', y, ac);
  y = wrap(p5, 'Use this template for every major decision. Review your journal quarterly to identify patterns in your decision-making quality.', R, 9.5, C.textDark, 50, y, 512, 14); y -= 18;
  const fields = [
    ['Date:', 1], ['Decision being made:', 2], ['Options I considered:', 3], ['Criteria I used to decide:', 3], ['The decision I made and why:', 3], ['Expected outcome in 6 months:', 2], ['What could go wrong (pre-mortem):', 2], ['Actual outcome (review in 6 months):', 3], ['What I learned from this decision:', 2],
  ];
  for (const [label, lines] of fields) {
    p5.drawText(label, { x:50, y, size:9, font:B, color:C.muted }); y -= 14;
    for (let i=0; i<lines; i++) { p5.drawLine({ start:{x:50,y}, end:{x:562,y}, thickness:0.5, color:C.border }); y -= 18; }
    y -= 5;
  }
  header(p5, f, 'Decision Journal Template', 5, T);

  const p6 = doc.addPage([612,792]); y=792-70;
  y = sectionBar(p6, f, 'COGNITIVE BIASES EVERY DECISION-MAKER MUST KNOW', y, C.charcoal);
  const biases = [
    ['Anchoring Bias', 'You rely too heavily on the first information you receive. Counter: Seek multiple independent data sources before anchoring.'],
    ['Confirmation Bias', 'You favour information that confirms existing beliefs. Counter: Actively seek disconfirming evidence.'],
    ['Sunk Cost Fallacy', 'You continue a bad path because of past investment. Counter: Ask "If I had not invested anything, would I start this now?"'],
    ['Availability Heuristic', 'Recent or vivid events feel more likely. Counter: Use base rates and statistics, not emotional memory.'],
    ['Overconfidence Bias', 'You overestimate your ability to predict outcomes. Counter: Calibrate confidence with historical accuracy data.'],
    ['Status Quo Bias', 'You prefer the current state even when change is better. Counter: Ask "What is the cost of NOT changing?"'],
    ['Planning Fallacy', 'You underestimate how long things take. Counter: Double your initial time estimates as a rule.'],
  ];
  for (const [name, desc] of biases) {
    p6.drawText(name + ':', { x:50, y, size:10, font:B, color:ac }); y -= 14;
    y = wrap(p6, desc, R, 9.5, C.textDark, 65, y, 495, 13); y -= 8;
  }
  header(p6, f, 'Cognitive Biases Reference', 6, T);

  for (let pg=7; pg<=10; pg++) {
    const p = doc.addPage([612,792]); y=792-70;
    const titles = ['DECISION ENERGY MANAGEMENT', 'THE RUTH CHANG PRINCIPLE — HARD CHOICES AS IDENTITY', 'MY 9-DECISION PRINCIPLES', 'MY DECISION MASTERY COMMITMENT'];
    const accents = [ac, C.charcoal, ac, C.charcoal];
    y = sectionBar(p, f, titles[pg-7], y, accents[pg-7]);
    if (pg===7) {
      y = wrap(p, 'Decision fatigue (Baumeister, 1998) is real. Every decision you make depletes the same cognitive resource. This is why judges give harsher sentences before lunch, and why tired leaders make poor choices.\n\nThe Energy Management Protocol for Decision Makers:\n1. High-stakes decisions: Morning only. Never after 3 PM.\n2. Low-stakes decisions: Systemize them (same breakfast, same route, standardised choices).\n3. Build decision-free periods: Block time where no decisions are required.\n4. Restore cognitive resources: 20-minute walk, meditation, or nap restores decision quality.\n5. Delegate low-impact decisions: Reserve yourself for what only you can decide.', R, 9.5, C.textDark, 50, y, 512, 15);
      y -= 18; y = worksheetBox(p, f, 'What time of day do you make your most important decisions currently?', y, 2);
      y = worksheetBox(p, f, 'Which 3 decisions will you systemize to preserve cognitive energy?', y, 3);
    } else if (pg===8) {
      y = wrap(p, 'Ruth Chang\'s TED Talk (featured in this course) presents a powerful idea: when a choice is genuinely hard — when neither option is clearly better — it is not because we lack information. It is because both options are equal in different dimensions.\n\nIn hard choices, Chang argues, we create our own reasons by choosing who we are. The choice reveals and shapes your character.\n\nThis means hard choices are not problems to be solved — they are invitations to define yourself.\n\nThe Becoming Institute Application:\nWhen you face a genuinely hard choice, stop trying to find the "right" answer and start asking: "Who do I want to be as a result of this choice?" Then decide from that identity.', R, 9.5, C.textDark, 50, y, 512, 15);
      y -= 18; y = worksheetBox(p, f, 'What hard choice are you currently facing? Who would you become by choosing each path?', y, 5);
    } else if (pg===9) {
      y = wrap(p, 'Write your personal 9 decision-making principles below. These become your internal operating system for decisions.', R, 9.5, C.textDark, 50, y, 512, 14); y -= 16;
      for (let i=1; i<=9; i++) {
        p.drawText(`${i}.`, { x:50, y, size:10, font:B, color:ac }); y -= 14;
        p.drawLine({ start:{x:68,y}, end:{x:562,y}, thickness:0.5, color:C.border }); y -= 22;
      }
    } else {
      y = worksheetBox(p, f, 'The 3 decisions I have been avoiding that I commit to making this month:', y, 4);
      y = worksheetBox(p, f, 'My system for making daily low-stakes decisions automatically:', y, 3);
      y = worksheetBox(p, f, 'My accountability partner and the date I will share my decision journal with them:', y, 2);
      y -= 15;
      p.drawText('Signature: ________________________________   Date: ________________', { x:50, y, size:10, font:R, color:C.muted });
    }
    header(p, f, titles[pg-7], pg, T);
  }
  closingPage(doc, f, ac, courseTitle);

  const bytes = await doc.save();
  fs.writeFileSync(path.join(__dirname,'..','public','documents','course-decision-making-workbook.pdf'), bytes);
  console.log('✅ course-decision-making-workbook.pdf — ' + (bytes.length/1024).toFixed(1) + ' KB');
}

// ════════════════════════════════════════════════════════════════════════
// Helper: generate a streamlined workbook for remaining 4 courses
// ════════════════════════════════════════════════════════════════════════
async function genWorkbook({ filename, coverOpts, courseTitle, intro, ways, modules, practiceWeeks, accent, total=11 }) {
  const { doc, R, B, I } = await base();
  const f = { R, B, I }; const ac = accent; const T = total;
  cover(doc, f, coverOpts);

  // Intro page
  const pi = doc.addPage([612,792]); let y=792-70;
  y = sectionBar(pi, f, 'INTRODUCTION', y, ac);
  y = wrap(pi, intro, R, 9.8, C.textDark, 50, y, 512, 15);
  header(pi, f, 'Introduction', 2, T);

  // Ways framework
  const pw = doc.addPage([612,792]); y=792-70;
  y = sectionBar(pw, f, `THE ${ways.length} WAYS — FRAMEWORK OVERVIEW`, y, C.charcoal);
  for (const [title, desc] of ways) {
    pw.drawText(title, { x:65, y, size:10, font:B, color:ac }); y -= 14;
    y = wrap(pw, desc, R, 9.5, C.textDark, 75, y, 488, 13); y -= 6;
    if (y < 80) break;
  }
  header(pw, f, 'Framework Overview', 3, T);

  // Module pages
  let pg = 4;
  for (const mod of modules) {
    const p = doc.addPage([612,792]); y=792-70;
    y = sectionBar(p, f, mod.title.toUpperCase(), y, pg%2===0?ac:C.charcoal);
    if (mod.content) y = wrap(p, mod.content, R, 9.5, C.textDark, 50, y, 512, 14);
    if (mod.bullets) { y -= 8; y = bullet(p, f, mod.bullets, y, 70, ac); }
    y -= 18;
    y = sectionBar(p, f, 'REFLECTION & APPLICATION', y, C.teal);
    if (mod.q1) y = worksheetBox(p, f, mod.q1, y, 4);
    if (mod.q2) y = worksheetBox(p, f, mod.q2, y, 3);
    header(p, f, mod.title, pg, T); pg++;
  }

  // 30-day plan
  const pp = doc.addPage([612,792]); y=792-70;
  y = sectionBar(pp, f, '30-DAY TRANSFORMATION PRACTICE PLAN', y, ac);
  for (const [wk, days] of practiceWeeks) {
    pp.drawText(wk, { x:50, y, size:10.5, font:B, color:ac }); y -= 16;
    y = bullet(pp, f, days, y, 70, C.charcoal); y -= 10;
  }
  header(pp, f, '30-Day Practice Plan', pg, T); pg++;

  // Commitment page
  const pc = doc.addPage([612,792]); y=792-70;
  y = sectionBar(pc, f, 'MY TRANSFORMATION COMMITMENT', y, ac);
  y = worksheetBox(pc, f, 'My single most important goal from this course:', y, 3);
  y = worksheetBox(pc, f, 'Three specific actions I will take in the next 7 days:', y, 4);
  y = worksheetBox(pc, f, 'How I will measure my progress:', y, 3);
  y -= 10;
  pc.drawText('Signature: ________________________________   Date: ________________', { x:50, y, size:10, font:R, color:C.muted });
  header(pc, f, 'My Commitment', pg, T);

  closingPage(doc, f, ac, courseTitle);

  const bytes = await doc.save();
  fs.writeFileSync(path.join(__dirname,'..','public','documents',filename), bytes);
  console.log(`✅ ${filename} — ${(bytes.length/1024).toFixed(1)} KB`);
}

// ════════════════════════════════════════════════════════════════════════
// 3. TEAM PERSON — "8 Ways to Excel as a Team Person"
// ════════════════════════════════════════════════════════════════════════
async function genTeamPerson() {
  await genWorkbook({
    filename: 'course-team-person-workbook.pdf',
    courseTitle: '8 Ways to Excel as a Team Person',
    accent: C.green,
    coverOpts: { title:'Team\nExcellence', subtitle:'8 Ways to Excel as a Team Person', tagline:'Alone you go fast. Together you go far and arrive transformed.', accent:C.green, category:'Teamwork & Collaboration' },
    intro: 'Amy Edmondson of Harvard Business School, featured in this course, demonstrated that teams with psychological safety — where members feel safe to take risks, speak up, and be vulnerable — consistently outperform teams that lack it, even when the latter has more talented individuals.\n\nTeam excellence is not about being likeable. It is about being trustworthy, dependable, and intentionally collaborative. This workbook gives you the 8 frameworks, reflection tools, and practice exercises to become the team person every organisation wants and every team needs.',
    ways: [
      ['1. Know Your Role and Own It Completely', 'Exceptional team members do not need to be told twice. They claim their role with total responsibility.'],
      ['2. Build Trust Before You Need It', 'Trust is a resource. Invest in it during calm seasons so it is available during turbulent ones.'],
      ['3. Communicate Proactively', 'Never let a team member be surprised by your progress, problems, or decisions. Share before asked.'],
      ['4. Master Constructive Conflict', 'Healthy teams argue about ideas. Unhealthy teams avoid all conflict. Learn the difference.'],
      ['5. Give and Receive Feedback Generously', 'Feedback is the breakfast of champions. Create a culture where improvement is celebrated.'],
      ['6. Amplify Others\' Strengths', 'The best team members make others look brilliant. Ego costs the team; amplification wins.'],
      ['7. Lead from Any Position', 'Leadership is not a title. It is the act of taking responsibility for outcomes beyond your role.'],
      ['8. Build Team Culture Intentionally', 'Culture is not what you post on the wall. It is what you tolerate and what you celebrate.'],
    ],
    modules: [
      { title:'Psychological Safety — The Foundation of Team Excellence', content:'Amy Edmondson\'s research identified psychological safety as the single strongest predictor of team performance. Google\'s Project Aristotle (2016) confirmed it: the best predictor of team success was not who was on the team, but whether members felt safe.\n\nPsychological safety means: members believe they will not be punished for speaking up, admitting mistakes, asking questions, or proposing ideas. It is NOT comfort or conflict avoidance — it is productive vulnerability.', bullets:['Ask your team: "What is one thing I do that makes it harder for you to speak up?"', 'When someone raises a concern, respond with curiosity, not defensiveness.', 'Model vulnerability first: admit a mistake, share an uncertainty, ask for help.'], q1:'On a scale of 1-10, how psychologically safe does your current team feel? What would move it up by 2 points?', q2:'What is one thing you can do this week to increase psychological safety for your team?' },
      { title:'The Trust Equation in Teams', content:'Charles Green\'s Trust Equation: Trust = (Credibility + Reliability + Intimacy) ÷ Self-Orientation. The most dangerous element is self-orientation — when team members perceive that you are primarily serving your own interests, trust collapses rapidly regardless of your competence.', bullets:['Credibility: Do your words match your knowledge and experience?', 'Reliability: Do you consistently do what you commit to?', 'Intimacy: Do teammates feel safe sharing real challenges with you?', 'Self-Orientation: Are you seen as serving the team or yourself first?'], q1:'Which element of the trust equation is your current weakness? What will you do about it?', q2:'Name one teammate whose trust you need to rebuild. What is your first step?' },
      { title:'Constructive Conflict and Lencioni\'s Five Dysfunctions', content:'Patrick Lencioni\'s research identifies 5 dysfunctions that cripple teams — each one building on the last:\n1. Absence of Trust (fear of vulnerability)\n2. Fear of Conflict (artificial harmony)\n3. Lack of Commitment (ambiguity and fence-sitting)\n4. Avoidance of Accountability (low standards)\n5. Inattention to Results (status and ego over outcomes)\n\nThe antidote starts at the base: build trust, and productive conflict becomes safe. Safe conflict leads to real commitment. Real commitment enables accountability. Accountability produces results.', q1:'Which of Lencioni\'s 5 dysfunctions is most present in a team you belong to? What is one step toward its antidote?', q2:'Describe a time when avoiding conflict cost your team more than the conflict itself would have.' },
      { title:'Giving Feedback That Actually Changes Behaviour', content:'The SBI Feedback Model (Situation, Behaviour, Impact) is the gold standard for constructive feedback:\nS — Situation: Describe the specific context objectively.\nB — Behaviour: Describe what you observed (not interpreted).\nI — Impact: Describe the actual effect on the team, project, or relationship.\n\nExample: "In yesterday\'s client presentation (S), when you interrupted the client three times (B), it created an impression of impatience and reduced their confidence in us (I)."\n\nThis model removes judgment, increases specificity, and makes feedback actionable.', bullets:['Give feedback within 24 hours of the event. Delayed feedback loses impact.', 'Ask permission: "Would it be helpful if I shared an observation?"', 'Separate the person from the behaviour: "That approach" not "You always..."', 'Close with a question: "What do you think? Does this land for you?"'], q1:'Write an SBI feedback message you need to deliver to someone this week:', q2:'What feedback do you need to ASK for from your team or leader? How will you ask?' },
    ],
    practiceWeeks: [
      ['Week 1 — Foundation (Trust & Safety)', ['Day 1-3: Identify your trust score on the Trust Equation. Work on your lowest dimension.', 'Day 4-5: Have one "safety check" conversation with a teammate.', 'Day 6-7: List 3 commitments you will keep this week without being reminded.']],
      ['Week 2 — Communication & Conflict', ['Day 8-10: Practice proactive updates — communicate progress before being asked.', 'Day 11-12: In one meeting, raise a concern you would normally suppress.', 'Day 13-14: Deliver one piece of SBI feedback to a teammate.']],
      ['Week 3 — Amplification & Leadership', ['Day 15-17: Deliberately amplify a teammate\'s contribution in a public setting.', 'Day 18-19: Take ownership of one outcome beyond your official role.', 'Day 20-21: Map the strengths of every person on your team.']],
      ['Week 4 — Culture Building', ['Day 22-25: Identify one cultural habit your team has that is costing performance. Name it.', 'Day 26-28: Propose one cultural improvement. Take responsibility for implementing it.', 'Day 29-30: Write your Team Excellence Declaration — your personal commitment.']],
    ],
  });
}

// ════════════════════════════════════════════════════════════════════════
// 4. PERSONAL ADAPTABILITY — "8 Ways to Build Personal Adaptability"
// ════════════════════════════════════════════════════════════════════════
async function genAdaptability() {
  await genWorkbook({
    filename: 'course-personal-adaptability-workbook.pdf',
    courseTitle: '8 Ways to Build Personal Adaptability',
    accent: C.purple,
    coverOpts: { title:'Personal\nAdaptability', subtitle:'8 Ways to Thrive in a World of Constant Change', tagline:'Those who cannot change their minds cannot change anything.', accent:C.purple, category:'Personal Development' },
    intro: 'Carol Dweck\'s landmark research, featured in this course, established the concept of the Growth Mindset — the belief that abilities, intelligence, and character can be developed through dedication and hard work. This single belief is the foundation of personal adaptability.\n\nThe world is changing at exponential speed. Job roles are disappearing and being created within single decades. The skill of adapting — learning to learn, recovering from disruption, and evolving under pressure — is no longer optional. It is the meta-skill. This workbook trains it.',
    ways: [
      ['1. Embrace the Growth Mindset', 'Replace "I can\'t do this" with "I can\'t do this YET." The word yet changes everything.'],
      ['2. Develop Cognitive Flexibility', 'Train your brain to hold multiple perspectives simultaneously and switch between frameworks quickly.'],
      ['3. Build Emotional Resilience', 'Resilience is not the absence of pain. It is the ability to absorb, recover, and grow from setbacks.'],
      ['4. Master Stress as a Resource', 'Kelly McGonigal\'s research shows that viewing stress as energising rather than harmful changes its biological effect.'],
      ['5. Accelerate Your Learning Speed', 'The Feynman Technique, spaced repetition, and deliberate practice are the tools of fast learners.'],
      ['6. Build Bounce-Back Capacity', 'Every failure is data. Build the habit of post-mortems, not regret.'],
      ['7. Develop Habit Architecture', 'Sustainable adaptability is built on consistent daily habits — not episodic motivation.'],
      ['8. Think in Scenarios', 'Model multiple possible futures. Prepare for them. Stay flexible in execution.'],
    ],
    modules: [
      { title:'Growth Mindset — The Root of All Adaptability', content:'Carol Dweck identified two fundamental orientations toward challenge:\n\nFixed Mindset: Intelligence and ability are fixed traits. Effort is pointless if you lack natural talent. Challenges are threats to your identity. Failure means you are not enough.\n\nGrowth Mindset: Intelligence and ability are developable. Effort is the path to mastery. Challenges are where growth happens. Failure is information, not identity.\n\nThe implications are staggering. Students with a growth mindset consistently outperform those with fixed mindsets over time — even when starting from lower ability levels. This is because they keep trying, keep improving, and keep learning from failure.', bullets:['Praise effort and strategy, not talent: "You worked so hard on that" not "You\'re so smart."', 'When you hit a wall, ask: "What strategy haven\'t I tried yet?"', 'Audit your fixed beliefs: "I\'m not good with numbers" — says who? Based on what evidence?'], q1:'Identify one area where you have a Fixed Mindset. What would change if you shifted to Growth?', q2:'Name one skill you believe you cannot develop. What would you need to try for 30 days to test that belief?' },
      { title:'Resilience Architecture — Bouncing Forward, Not Just Back', content:'Angela Duckworth\'s research on Grit — featured in this course section — demonstrates that the most successful people are not those who never fail. They are those who persist through failure longer than everyone else.\n\nThe Becoming Institute defines resilience not as "bouncing back" but as "bouncing forward" — using adversity as upgrade material.\n\nThe 4 Components of Resilience:\n1. Connection: Strong relationships are the single greatest predictor of recovery from adversity.\n2. Wellness: Sleep, movement, and nutrition are not lifestyle choices — they are performance infrastructure.\n3. Healthy Thinking: Challenge catastrophising. "This is unbearable" vs "This is difficult and I can handle difficult."\n4. Meaning: People who believe their suffering has purpose recover faster and more completely.', q1:'Describe a past setback that made you stronger. What specifically did you gain from it?', q2:'What is one challenge you are currently facing that you can reframe as growth material?' },
      { title:'The Feynman Technique — Accelerated Learning for Rapid Adaptation', content:'Richard Feynman, Nobel Prize-winning physicist, developed a learning method that produces understanding 4-6x faster than traditional study:\n\nStep 1: Choose a concept and write it at the top of a blank page.\nStep 2: Explain it as if you are teaching it to a 12-year-old. Use simple language only.\nStep 3: Identify the gaps. Where did you get stuck or vague?\nStep 4: Return to source material for those gaps only.\nStep 5: Simplify and use analogies until you can explain it fluently.\n\nWhy it works: The act of explaining forces you to truly understand — not just recognise. Most people confuse familiarity with knowledge.', q1:'Apply the Feynman Technique to one concept from this course. Write your simplified explanation here:', q2:'What learning habit will you build this month using this technique?' },
      { title:'Scenario Thinking — Preparing for Multiple Futures', content:'Royal Dutch Shell pioneered scenario planning in the 1970s. By preparing for multiple possible futures rather than predicting a single outcome, they navigated the 1973 oil crisis far better than competitors who had bet on one trajectory.\n\nPersonal Scenario Planning:\n1. Identify a major uncertainty in your professional or personal life.\n2. Identify the 2 most critical drivers of that uncertainty.\n3. Build 4 scenarios (2x2 matrix) based on those drivers.\n4. Prepare a response strategy for each scenario.\n5. Identify signals that indicate which scenario is unfolding.\n6. Act flexibly based on incoming signals — not on a single fixed prediction.', q1:'What is the biggest uncertainty you face in the next 12 months? Map 3 possible scenarios:', q2:'What skill would make you resilient across ALL 3 of those scenarios? Start building it now.' },
    ],
    practiceWeeks: [
      ['Week 1 — Mindset Reset', ['Day 1-3: Track your fixed mindset moments. Write "YET" next to every limitation.', 'Day 4-5: Use the Feynman Technique on one new concept daily.', 'Day 6-7: Recall 3 past "failures" that were actually growth experiences.']],
      ['Week 2 — Resilience Building', ['Day 8-10: Establish one daily resilience ritual (sleep, movement, reflection).', 'Day 11-12: Practice reframing one challenging situation per day.', 'Day 13-14: Identify and contact one key relationship in your support network.']],
      ['Week 3 — Learning Acceleration', ['Day 15-17: Apply the Feynman Technique to one skill you want to develop.', 'Day 18-19: Use spaced repetition to review material from earlier in this course.', 'Day 20-21: Teach one concept from this course to someone else.']],
      ['Week 4 — Strategic Flexibility', ['Day 22-25: Map 3 possible scenarios for one major life uncertainty.', 'Day 26-28: Identify and begin building the skill that protects you across all scenarios.', 'Day 29-30: Write your Adaptability Declaration — who you are committed to becoming.']],
    ],
  });
}

// ════════════════════════════════════════════════════════════════════════
// 5. SELF-IMAGE — "8 Ways to Strengthen Self-Image"
// ════════════════════════════════════════════════════════════════════════
async function genSelfImage() {
  await genWorkbook({
    filename: 'course-self-image-workbook.pdf',
    courseTitle: '8 Ways to Strengthen Self-Image',
    accent: C.rose,
    coverOpts: { title:'Self-Image\nMastery', subtitle:'8 Ways to Strengthen Your Identity & Confidence', tagline:'You cannot outperform your self-image. Build it deliberately.', accent:C.rose, category:'Self-Image & Identity' },
    intro: 'Dr. Maxwell Maltz, plastic surgeon and author of Psycho-Cybernetics, made a startling discovery: after performing surgeries that objectively improved appearance, many patients still felt ugly. Their external reality had changed — but their internal self-image had not.\n\nHis conclusion transformed psychology: you live and act consistently with your self-image. You cannot consistently outperform it. The solution is not to change your behaviour — it is to change your self-image, and behaviour will follow.\n\nAmy Cuddy\'s research (featured in this course) demonstrates that self-image is not only psychological — it is physiological. Your body posture changes your hormone levels, which changes your confidence, which changes your performance.',
    ways: [
      ['1. Audit Your Internal Narrative', 'The voice in your head is not truth — it is a story. Learn to evaluate it, not automatically believe it.'],
      ['2. Build the Competence-Confidence Loop', 'Real confidence comes from demonstrated competence. Start small. Win consistently. Confidence follows.'],
      ['3. Master Positive Self-Talk Architecture', 'Replace criticism with coaching. Speak to yourself the way you would speak to someone you deeply believe in.'],
      ['4. Clarify and Anchor Your Values Identity', '"I am the kind of person who..." is the most powerful sentence in identity formation.'],
      ['5. Set and Hold Healthy Boundaries', 'Boundaries are not walls — they are expressions of self-respect. They teach others how to treat you.'],
      ['6. Build Self-Discipline as Identity', 'Discipline is not punishment. It is the highest form of self-love — doing for yourself what serves your future self.'],
      ['7. Develop Self-Compassion', 'Kristin Neff\'s research shows self-compassion — not self-criticism — produces higher achievement and resilience.'],
      ['8. Design a Personal Development Trajectory', 'You are not a finished product. You are a work in progress with a deliberate architect: yourself.'],
    ],
    modules: [
      { title:'Amy Cuddy\'s Body-Mind Connection — Presence Before Performance', content:'Amy Cuddy\'s viral TED Talk (68M+ views, featured in this course) revealed that body language changes not only how others see us — it changes how we see ourselves.\n\nTwo minutes of "power posing" (expansive, open posture) before a high-stakes situation:\n- Increases testosterone (confidence) by 20%\n- Decreases cortisol (stress) by 25%\n- Results in measurably more confident interview performance\n\nThe Becoming Institute Application: Your self-image is stored in your body as much as your mind. Change your physiology and you change your psychology.', bullets:['Before any high-stakes moment, take 2 minutes in a private space to power pose.', 'Stand tall in all contexts — your brain reads your posture as a confidence signal.', 'Smile deliberately. The facial feedback hypothesis shows it changes internal emotional state.'], q1:'In what situations do you most collapse your posture or shrink your presence? What will you change?', q2:'Practise a 2-minute power pose before your next high-stakes conversation. What did you notice?' },
      { title:'Brené Brown\'s Research — Vulnerability and True Self-Image', content:'Brené Brown (University of Houston) spent 13 years studying vulnerability, shame, and belonging. Her finding: people with a strong, healthy self-image are not those who have eliminated vulnerability — they are those who have made peace with it.\n\nShe calls them "Wholehearted" people. They share 10 practices:\n1. Authenticity over impression management\n2. Self-compassion over self-criticism\n3. Gratitude and joy as practices, not feelings\n4. Intuition and faith over certainty\n5. Creativity and play as essential\n6. Rest and stillness as productive\n7. Meaningful work — feeling seen and valued\n8. Laughter, song, and dance (not taking yourself too seriously)\n9. Calm and stillness — not anxiety management\n10. Meaningful work that involves contribution', q1:'Which of the 10 Wholehearted practices is most absent in your life right now?', q2:'What one practice will you begin this week and how?' },
      { title:'Cognitive Restructuring — Rewiring the Self-Critical Narrative', content:'Cognitive Behavioural Therapy (CBT) established that distorted thinking patterns create distorted self-image. The most common distortions:\n\n1. All-or-Nothing Thinking: "I made one mistake — I am a failure."\n2. Overgeneralisation: "This always happens to me."\n3. Mental Filter: Filtering out positives and dwelling exclusively on negatives.\n4. Disqualifying the Positive: "That compliment doesn\'t count."\n5. Mind Reading: "They think I\'m incompetent" (without evidence).\n6. Catastrophising: "This will ruin everything."\n7. Should Statements: "I should be further along by now."\n8. Labelling: "I am lazy" vs "I didn\'t complete that task today."\n\nThe Restructuring Method: Observe the thought. Challenge it with evidence. Replace with a balanced, accurate alternative.', q1:'Write one recurring self-critical thought. Challenge it with evidence. Write the accurate alternative:', q2:'What label have you given yourself that is limiting your self-image? What is the truth?' },
      { title:'Identity-Based Confidence — Becoming Who You Decide to Be', content:'The most durable form of self-image is built on identity declarations — deliberate choices about who you are.\n\nThe Becoming Institute Identity Architecture:\nStep 1: Define who you are committed to becoming (not who you currently are).\nStep 2: Write 5-7 "I am..." statements that reflect that identity.\nStep 3: Make daily decisions that give evidence to those statements.\nStep 4: When you fail to live up to the identity, do not spiral — simply recommit.\nStep 5: Review and update your identity declarations annually.\n\nExample Identity Declarations:\n- "I am someone who keeps commitments to myself."\n- "I am someone who invests in my growth daily."\n- "I am someone who treats challenges as opportunities."\n- "I am someone who is becoming a world-class communicator."', q1:'Write your 5-7 Identity Declarations below:', q2:'Which declaration will be hardest to live up to? What will you do to begin embodying it this week?' },
    ],
    practiceWeeks: [
      ['Week 1 — Awareness & Audit', ['Day 1-3: Track every self-critical thought. Do not judge them — just record them.', 'Day 4-5: Challenge each recorded thought using the CBT restructuring method.', 'Day 6-7: Write your initial 5-7 Identity Declarations.']],
      ['Week 2 — Body & Presence', ['Day 8-10: Practise 2-minute power poses before every high-stakes moment.', 'Day 11-12: Audit your posture in 5 contexts. Consciously expand.', 'Day 13-14: Practice one Wholehearted habit from Brené Brown\'s list.']],
      ['Week 3 — Character Building', ['Day 15-17: Set one clear boundary and honour it without apology.', 'Day 18-19: Build one daily self-discipline habit that serves your future self.', 'Day 20-21: Write a letter from your future (5-year) self to your present self.']],
      ['Week 4 — Integration & Solidification', ['Day 22-25: Live fully from your Identity Declarations. Note evidence daily.', 'Day 26-28: Share your Identity Declarations with your accountability partner.', 'Day 29-30: Write your Self-Image Manifesto — the permanent record of who you are becoming.']],
    ],
  });
}

// ════════════════════════════════════════════════════════════════════════
// 6. COMMUNICATION — "8 Ways to Improve Communication"
// ════════════════════════════════════════════════════════════════════════
async function genCommunication() {
  await genWorkbook({
    filename: 'course-communication-workbook.pdf',
    courseTitle: '8 Ways to Improve Communication',
    accent: C.deepBlue,
    coverOpts: { title:'Communication\nMastery', subtitle:'8 Ways to Speak, Listen & Influence With Excellence', tagline:'The quality of your communication determines the quality of your life.', accent:C.deepBlue, category:'Communication Skills' },
    intro: 'Julian Treasure, the featured expert in this course, identifies 4 bad communication habits (gossip, judgment, negativity, and complaining) and 4 powerful foundations of effective speaking through his HAIL framework: Honesty, Authenticity, Integrity, and Love.\n\nCommunication is not just what you say. It is how you make people feel. It is the confidence you project, the clarity of your thinking, the depth of your listening, and the integrity of your follow-through. This workbook trains all four dimensions.',
    ways: [
      ['1. Speak With Clarity and Structure', 'Use the PREP framework: Point, Reason, Evidence, Point. Structure your thoughts before speaking.'],
      ['2. Listen at Level 5 — Empathic Listening', 'Most people listen to reply. Listen to understand — including what is not being said.'],
      ['3. Command Non-Verbal Presence', '93% of communication impact is non-verbal. Your posture, eye contact, and tone speak before your words.'],
      ['4. Speak Confidently in Public', 'Public speaking is a learnable skill. The secret is preparation, audience-focus, and consistent practice.'],
      ['5. Write With Impact and Precision', 'Every email and message is a demonstration of your thinking. Apply the POWER writing method.'],
      ['6. Navigate Difficult Conversations', 'The Crucial Conversations framework teaches you to speak honestly without triggering defensiveness.'],
      ['7. Use Questions Strategically', 'The right question opens doors that statements slam shut. Master open, probing, and hypothetical questions.'],
      ['8. Build Your Communication Habits Daily', 'Communication mastery is not an event. It is a daily practice with a 30-day feedback loop.'],
    ],
    modules: [
      { title:'Julian Treasure\'s HAIL Framework — The Foundation of Trust in Communication', content:'Julian Treasure (45M+ views TED Talk, featured in this course) identifies the foundation of powerful, trusted communication through HAIL:\n\nH — Honesty: Speak the truth, even when it is uncomfortable. Dishonesty — even small — destroys credibility irreparably.\nA — Authenticity: Be yourself. People can sense performance and inauthenticity within seconds.\nI — Integrity: Do what you say you will do. Your commitments are your communication\'s highest test.\nL — Love: Not sentimentality — but genuinely wishing good for the person you are communicating with. It changes your tone, your choice of words, and your listening quality.\n\nHe also identifies the 7 Deadly Sins of Speaking: gossip, judging, negativity, complaining, excuses, exaggeration, and dogmatism. Eliminating these is the fastest route to communication credibility.', q1:'Which of the 7 Deadly Sins is your most common communication habit? What will you replace it with?', q2:'Rate yourself on HAIL (1-10 each). Which dimension will you strengthen first, and how?' },
      { title:'The 5 Levels of Listening — Empathic Mastery', content:'Stephen Covey identified 5 levels of listening:\n\nLevel 1 — Ignoring: Not listening at all.\nLevel 2 — Pretending: Appearing to listen without absorbing.\nLevel 3 — Selective: Hearing only what confirms your existing view.\nLevel 4 — Attentive: Actively processing the words being spoken.\nLevel 5 — Empathic: Understanding the emotion and meaning beneath the words.\n\nMost professional relationships operate at Level 3-4. Relationships built at Level 5 become the foundation of influence, trust, and deep collaboration.\n\nThe Listen-Mirror-Ask Method:\n1. Listen fully without interrupting.\n2. Mirror: "What I\'m hearing you say is..."\n3. Ask: "What does that mean for you?"', bullets:['In your next 5 conversations, commit to listening at Level 5.', 'Remove all devices before an important conversation.', 'After someone finishes speaking, pause for 3 seconds before responding.'], q1:'Who in your life most deserves Level 5 listening from you? What is stopping you?', q2:'What happens in conversations when someone truly listens to you at Level 5? How can you give that more?' },
      { title:'Non-Verbal Communication — The Language Before Language', content:'Albert Mehrabian\'s classic research demonstrated that in emotional communication:\n- 7% of impact comes from words\n- 38% comes from tone of voice\n- 55% comes from body language\n\nThis means your body has already communicated your confidence, openness, and credibility before you say a single word.\n\nThe 5 Non-Verbal Signals That Build Authority:\n1. Posture: Upright, open, grounded. Signals security.\n2. Eye contact: Sustained (2-4 seconds), warm. Signals presence.\n3. Gestures: Open palms, controlled movements. Signals honesty.\n4. Vocal variety: Pace, pitch, pause. Monotone kills engagement.\n5. Proximity: Appropriate physical presence. Signals confidence and connection.', q1:'Observe yourself in a mirror or recording. What does your non-verbal communication currently signal?', q2:'Which of the 5 non-verbal signals will you deliberately improve? What is your first practice step?' },
      { title:'Crucial Conversations — Speaking Truth Without Triggering Defensiveness', content:'Patterson, Grenny, McMillan & Switzler (Crucial Conversations) identify that when stakes are high and emotions run strong, most people choose between silence (withholding truth) or violence (attacking).\n\nThe master communicator builds a third path: speaking candidly while maintaining psychological safety.\n\nThe STATE Method for Crucial Conversations:\nS — Share your facts (not interpretations)\nT — Tell your story (the meaning you made of the facts)\nA — Ask for the other\'s path (their perspective)\nT — Talk tentatively ("It seems to me..." "I may be wrong...")\nE — Encourage testing ("What do you see differently?")\n\nThe most powerful phrase in difficult conversations: "Help me understand your perspective."', q1:'Write a crucial conversation you have been avoiding. Apply the STATE method — what would you say?', q2:'What is your current default pattern under communication pressure — silence or violence? What is your new response?' },
    ],
    practiceWeeks: [
      ['Week 1 — Foundation (HAIL & Listening)', ['Day 1-3: Eliminate one of the 7 Deadly Sins from your daily communication.', 'Day 4-5: Practise Level 5 listening in every significant conversation.', 'Day 6-7: Record yourself speaking for 2 minutes. Review for clarity and tone.']],
      ['Week 2 — Body Language & Vocal Power', ['Day 8-10: Practise open posture and direct eye contact in all conversations.', 'Day 11-12: Vary your vocal pace and pitch deliberately in one meeting or call.', 'Day 13-14: Apply the Listen-Mirror-Ask method in 3 conversations.']],
      ['Week 3 — Public Speaking & Written Communication', ['Day 15-17: Prepare and deliver a 3-minute talk to a trusted person using PREP.', 'Day 18-19: Apply the POWER writing method to your top 5 emails this week.', 'Day 20-21: Study Julian Treasure\'s TED Talk again. Identify 3 techniques you missed.']],
      ['Week 4 — Difficult Conversations & Mastery', ['Day 22-25: Have one crucial conversation you have been avoiding, using the STATE method.', 'Day 26-28: Write your Personal Communication Manifesto — your communication values.', 'Day 29-30: Teach someone else the HAIL framework. Teaching is the deepest learning.']],
    ],
  });
}

// ─── Run All ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('\nGenerating 6 World-Class Origin Course Workbooks...\n');
  await genProblemSolving();
  await genDecisionMaking();
  await genTeamPerson();
  await genAdaptability();
  await genSelfImage();
  await genCommunication();
  console.log('\nAll 6 course workbooks generated successfully.\n');
}

main().catch(err => { console.error('Error:', err); process.exit(1); });
