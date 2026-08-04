const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// ─── Shared Palette & Helpers ────────────────────────────────────────────────
const primaryBlue   = rgb(0.06, 0.22, 0.52);   // Origin Deep Blue
const accentBlue    = rgb(0.37, 0.64, 0.98);   // Origin Sky Blue
const goldAccent    = rgb(0.85, 0.65, 0.15);
const darkCharcoal  = rgb(0.10, 0.12, 0.14);
const textDark      = rgb(0.16, 0.18, 0.20);
const mutedText     = rgb(0.42, 0.47, 0.52);
const lightBg       = rgb(0.97, 0.97, 0.98);
const borderLine    = rgb(0.86, 0.87, 0.90);
const white         = rgb(1, 1, 1);
const successGreen  = rgb(0.10, 0.55, 0.30);

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
    if (para.trim() === '') { y -= lh * 0.65; continue; }
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

function decor(page, { bold, regular }, title, pageNum, total) {
  const { width, height } = page.getSize();
  page.drawLine({ start: { x: 40, y: height - 44 }, end: { x: width - 40, y: height - 44 }, thickness: 0.6, color: borderLine });
  page.drawText(`ORIGIN — THE BECOMING INSTITUTE   |   ${title.toUpperCase()}`, { x: 40, y: height - 35, size: 7.5, font: bold, color: mutedText });
  page.drawLine({ start: { x: 40, y: 44 }, end: { x: width - 40, y: 44 }, thickness: 0.6, color: borderLine });
  page.drawText('www.origin.com.ng  |  The Becoming Institute  |  (c) 2025 Zeki Ubor', { x: 40, y: 28, size: 7.5, font: regular, color: mutedText });
  page.drawText(`Page ${pageNum} of ${total}`, { x: width - 80, y: 28, size: 7.5, font: regular, color: mutedText });
}

function section(page, fonts, title, y, accent) {
  page.drawRectangle({ x: 50, y: y - 28, width: 512, height: 36, color: accent || primaryBlue });
  page.drawText(title, { x: 65, y: y - 18, size: 11.5, font: fonts.bold, color: white });
  return y - 52;
}

function coverPage(pdfDoc, fonts, { title, subtitle, tagline, category, accent }) {
  const cover = pdfDoc.addPage([612, 792]);
  const { width, height } = cover.getSize();

  cover.drawRectangle({ x: 0, y: 0, width, height, color: lightBg });
  cover.drawRectangle({ x: 0, y: 0, width: width * 0.44, height, color: accent || primaryBlue });
  cover.drawRectangle({ x: 0, y: height - 8, width, height: 8, color: goldAccent });

  // Left spine text
  cover.drawText('THE BECOMING INSTITUTE', { x: 28, y: height - 140, size: 9, font: fonts.bold, color: white });
  cover.drawText('ORIGIN LEARNING PLATFORM', { x: 28, y: height - 158, size: 8, font: fonts.regular, color: rgb(0.75, 0.85, 1) });

  // Badge
  cover.drawRectangle({ x: 30, y: 180, width: 200, height: 50, color: goldAccent });
  cover.drawText(category.toUpperCase(), { x: 42, y: 210, size: 12, font: fonts.bold, color: darkCharcoal });
  cover.drawText('RESOURCE GUIDE', { x: 42, y: 192, size: 8.5, font: fonts.bold, color: darkCharcoal });

  // Right: Title block
  cover.drawText(title.toUpperCase(), { x: 288, y: height - 180, size: 36, font: fonts.bold, color: accent || primaryBlue });
  cover.drawText(subtitle, { x: 288, y: height - 250, size: 14, font: fonts.bold, color: darkCharcoal });
  cover.drawText(tagline, { x: 288, y: height - 278, size: 10, font: fonts.italic, color: accentBlue });

  // Decorative rule
  cover.drawLine({ start: { x: 288, y: height - 295 }, end: { x: 565, y: height - 295 }, thickness: 2, color: accent || primaryBlue });

  // Author
  cover.drawText('ZEKI UBOR', { x: 288, y: 130, size: 20, font: fonts.bold, color: darkCharcoal });
  cover.drawText('Founder, The Becoming Institute', { x: 288, y: 110, size: 9, font: fonts.regular, color: mutedText });
  cover.drawText('www.origin.com.ng', { x: 288, y: 92, size: 9, font: fonts.regular, color: accentBlue });

  return cover;
}

// ═══════════════════════════════════════════════════════════════════
// PDF 1: COMMUNICATION MASTERY
// ═══════════════════════════════════════════════════════════════════
async function generateCommunicationMastery() {
  const { pdfDoc, regular, bold, italic } = await buildDoc();
  const fonts = { regular, bold, italic };
  const TOTAL = 10;
  const height = 792;

  coverPage(pdfDoc, fonts, {
    title: 'Communication\nMastery',
    subtitle: 'The Art of Being Heard, Understood & Influential',
    tagline: 'Speak with clarity. Listen with depth. Lead with words.',
    category: 'Communication Skills',
    accent: primaryBlue,
  });

  // PAGE 2 — Introduction
  const p2 = pdfDoc.addPage([612, 792]);
  let y = height - 70;
  y = section(p2, fonts, 'INTRODUCTION | Why Communication Changes Everything', y);
  const intro = `Communication is not merely talking. It is the architecture of understanding. Every relationship you build, every opportunity you attract, and every level of influence you achieve is determined by one thing: your ability to communicate with precision, depth, and authenticity.

The Becoming Institute defines Communication Mastery as the deliberate development of three core capacities:

1. Verbal Clarity — The ability to express your thoughts in a way others instantly grasp.
2. Empathic Listening — The discipline of hearing what is said and what is not said.
3. Strategic Influence — The skill of moving people toward shared outcomes with integrity.

From the boardroom to the family table, from the stage to the one-on-one conversation — the person who communicates best leads best. This guide is your structured pathway to mastering all three.`;
  y = wrap(p2, intro, regular, 10, textDark, 50, y, 512, 15); y -= 20;
  p2.drawText('"The quality of your communication determines the quality of your life." — Zeki Ubor', { x: 65, y, size: 9.5, font: italic, color: accentBlue });
  decor(p2, fonts, 'Introduction', 2, TOTAL);

  // PAGE 3 — Chapter 1: Verbal Clarity
  const p3 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p3, fonts, 'CHAPTER 1 | Verbal Clarity: The Power of Precise Expression', y);
  const c1 = `Most people speak to express; few speak to connect. Verbal clarity is the difference between talking and communicating. It is about choosing the right word, in the right tone, at the right moment.

The CLEAR Framework for Precise Communication:
C — Concise: Eliminate filler words. Every word must earn its place.
L — Logical: Structure thoughts before speaking. Point, Reason, Example, Point (PREP).
E — Emotive: Language that touches emotion moves people to action.
A — Accurate: Say exactly what you mean. Vague language creates misunderstanding.
R — Relevant: Tailor your message to your specific audience and context.

Case Study — Barack Obama: His speeches were never accidental. Every word was chosen with surgical precision. His "Yes We Can" addressed every citizen's deepest aspiration — clarity of message built a movement.

Action Step: Record a 2-minute voice note explaining your biggest goal. Play it back. Ask: Was that clear? Was that compelling? Rewrite and re-record until the answer is yes to both.`;
  y = wrap(p3, c1, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p3, fonts, 'Chapter 1 — Verbal Clarity', 3, TOTAL);

  // PAGE 4 — Chapter 2: Empathic Listening
  const p4 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p4, fonts, 'CHAPTER 2 | Empathic Listening: The Forgotten Half of Communication', y, darkCharcoal);
  const c2 = `Most people listen to reply. The master communicator listens to understand. Empathic listening is the highest form of respect you can offer another human being — and the most powerful tool for building influence.

The 5 Levels of Listening (from least to most powerful):
Level 1 — Ignoring: Not listening at all.
Level 2 — Pretending: Nodding without absorbing.
Level 3 — Selective: Hearing only what confirms your view.
Level 4 — Attentive: Processing the actual words being said.
Level 5 — Empathic: Understanding the emotion behind the words.

The Becoming Institute Challenge: In your next 5 conversations, listen at Level 5. Before you respond, ask yourself: "What is this person truly communicating beyond their words?"

The Listen-Mirror-Ask Method:
1. Listen fully without interrupting.
2. Mirror back: "What I'm hearing you say is..."
3. Ask a deepening question: "What does that mean for you?"

When people feel genuinely heard, they trust you. When they trust you, they follow you.`;
  y = wrap(p4, c2, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p4, fonts, 'Chapter 2 — Empathic Listening', 4, TOTAL);

  // PAGE 5 — Chapter 3: Non-Verbal Mastery
  const p5 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p5, fonts, 'CHAPTER 3 | Non-Verbal Mastery: The Language Your Body Speaks', y);
  const c3 = `Research by Dr. Albert Mehrabian shows that only 7% of communication impact comes from words. 38% comes from tone of voice. 55% comes from body language. This means that before you speak a single word, your body has already delivered your message.

The 5 Non-Verbal Signals That Build Instant Authority:
1. Posture — Stand tall with shoulders back. Posture signals confidence before you utter a word.
2. Eye Contact — Sustained, warm eye contact signals presence and trustworthiness.
3. Hand Gestures — Open palms signal honesty; controlled gestures amplify key points.
4. Vocal Tone — Vary your pitch and pace. Monotone communicators lose audiences within minutes.
5. Proximity — Appropriate physical presence builds intimacy and rapport.

Case Study — Steve Jobs' Product Launches: Jobs mastered the strategic pause. He would say something significant, then go completely silent — holding the audience in suspense. That silence was deliberate non-verbal communication.

Daily Practice: Stand before a mirror for 5 minutes. Practice making a key statement with three different postures and tones. Notice how the same words carry completely different weight.`;
  y = wrap(p5, c3, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p5, fonts, 'Chapter 3 — Non-Verbal Mastery', 5, TOTAL);

  // PAGE 6 — Chapter 4: Public Communication
  const p6 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p6, fonts, 'CHAPTER 4 | Public Communication: Speaking to Groups With Confidence', y, darkCharcoal);
  const c4 = `Public speaking is consistently ranked as one of humanity's greatest fears. Yet it is also one of the most powerful career accelerators. Every leader, every entrepreneur, every person of influence learns to speak with authority in front of others.

The Origin 3-Stage Public Speaking Framework:
Stage 1 — Prepare: Know your message (not a script, a message). Know your audience. Know your goal.
Stage 2 — Connect: Open with a story, question, or bold statement. Win their attention in the first 30 seconds.
Stage 3 — Deliver: Use pauses strategically. Move with purpose. Close with a clear call to action.

The Fear Dissolve Method:
Fear of public speaking is not fear of speaking — it is fear of judgment. Replace "How am I doing?" with "How can I serve this audience?" This single mindset shift dissolves 80% of public speaking anxiety.

The Toastmasters Principle: Great communicators are made, not born. They practice relentlessly in low-stakes environments before high-stakes moments arrive.

Action Step: Volunteer to speak for 3 minutes at your next meeting, family gathering, or community event. Start small. Build a track record.`;
  y = wrap(p6, c4, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p6, fonts, 'Chapter 4 — Public Communication', 6, TOTAL);

  // PAGE 7 — Chapter 5: Written Communication
  const p7 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p7, fonts, 'CHAPTER 5 | Written Communication: Words That Work While You Sleep', y);
  const c5 = `In the digital age, your written communication is your permanent signature. Every email, every message, every post is a demonstration of your thinking, professionalism, and capacity for influence.

The POWER Writing Method for Professional Communication:
P — Purpose: What do you want the reader to do or feel after reading?
O — Opening: Hook them immediately. The first sentence determines whether they read the rest.
W — Well-structured: Short paragraphs. White space. Bullet points for multiple ideas.
E — Evidence: Back every claim with data, story, or example.
R — Resolution: Close with clarity. What is the next step?

Email Mastery — The 3-Second Rule: Your subject line determines if your email is opened. Your first sentence determines if it is read. Your CTA determines if it is acted upon.

The Becoming Institute Standard: Every written message should pass the SCRAP test — Simple, Clear, Relevant, Actionable, Professional. If it fails any of these, rewrite before sending.

Action Step: Review your last 5 emails or messages. Grade each on the SCRAP test. Identify your weakest area and commit to improving it in your next 10 written communications.`;
  y = wrap(p7, c5, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p7, fonts, 'Chapter 5 — Written Communication', 7, TOTAL);

  // PAGE 8 — Chapter 6: Difficult Conversations
  const p8 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p8, fonts, 'CHAPTER 6 | Difficult Conversations: Communicating Under Pressure', y, darkCharcoal);
  const c6 = `The true test of a communicator is not how they perform when conditions are ideal — it is how they show up when stakes are high, emotions are running, and tension fills the room.

The Becoming Institute Framework for Difficult Conversations:
1. Regulate First — Never begin a high-stakes conversation from an emotionally activated state. Breathe. Center yourself. Enter the conversation with clarity, not reactivity.
2. Separate the Person from the Problem — You are addressing a behavior or situation, not attacking an identity.
3. Use "I" Statements — "I feel overwhelmed when..." versus "You always..." Ownership defuses defensiveness.
4. Seek Understanding Before Agreement — You do not need to agree. You need to understand. "Help me understand your perspective" opens doors that accusations slam shut.
5. Move Toward Resolution — Every difficult conversation should end with a clear next step. What will both parties do differently?

The Crucial Conversations Principle (Patterson et al.): When safety breaks down in a conversation, people either go silent or violent. The master communicator watches for these signals and rebuilds psychological safety before continuing.`;
  y = wrap(p8, c6, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p8, fonts, 'Chapter 6 — Difficult Conversations', 8, TOTAL);

  // PAGE 9 — Daily Practice Plan
  const p9 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p9, fonts, 'YOUR 30-DAY COMMUNICATION MASTERY PLAN', y);
  const plan = `Week 1 — Foundation (Clarity & Listening)
Day 1-3:   Record yourself speaking for 2 minutes daily. Review for clarity.
Day 4-5:   Practice the Listen-Mirror-Ask method in 3 conversations.
Day 6-7:   Write one professional message daily using the POWER method.

Week 2 — Body Language & Vocal Power
Day 8-10:  Practice open posture and eye contact in all conversations.
Day 11-12: Vary your vocal tone in one presentation or meeting.
Day 13-14: Read body language signals in public (coffee shop, transport).

Week 3 — Influence & Public Speaking
Day 15-17: Prepare and deliver a 3-minute talk to a trusted friend.
Day 18-19: Study one TED Talk for structure and delivery technique.
Day 20-21: Volunteer to contribute verbally in one group setting.

Week 4 — Integration & Mastery
Day 22-25: Engage in one difficult conversation using the 5-step framework.
Day 26-28: Write a personal communication manifesto (your communication values).
Day 29-30: Teach someone else one communication principle you have mastered.`;
  y = wrap(p9, plan, bold, 9.5, textDark, 50, y, 512, 14.5);
  decor(p9, fonts, '30-Day Practice Plan', 9, TOTAL);

  // PAGE 10 — About
  const p10 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  p10.drawRectangle({ x: 50, y: y - 110, width: 512, height: 110, color: primaryBlue });
  p10.drawText('THE BECOMING INSTITUTE', { x: 70, y: y - 38, size: 16, font: bold, color: goldAccent });
  p10.drawText('Transforming Individuals. Building Leaders. Shaping Generations.', { x: 70, y: y - 60, size: 10, font: italic, color: white });
  p10.drawText('Founder: Zeki Ubor  |  Platform: www.origin.com.ng', { x: 70, y: y - 80, size: 9, font: regular, color: rgb(0.75, 0.88, 1) });
  y -= 135;
  const bio = `This resource guide is part of the Origin Learning Platform — a structured, stage-based learning ecosystem designed to equip individuals aged 10-45 with capital development, communication, leadership, and life mastery skills.

The Becoming Institute believes that transformation is not an event — it is a process. Every guide, every course, and every framework we create is designed to be practiced, not merely read.

This Communication Mastery guide complements our live Communication Skills courses on the Origin platform. Enroll at www.origin.com.ng for live coaching, assignments, and community accountability.`;
  y = wrap(p10, bio, regular, 10, textDark, 50, y, 512, 16);
  y -= 30;
  p10.drawRectangle({ x: 50, y: y - 55, width: 512, height: 55, color: lightBg });
  p10.drawText('An Official Origin Course Resource  |  Communication Skills Track', { x: 70, y: y - 25, size: 10, font: bold, color: darkCharcoal });
  p10.drawText('Downloaded from the Origin Learning Platform  |  www.origin.com.ng', { x: 70, y: y - 44, size: 9, font: regular, color: mutedText });
  decor(p10, fonts, 'The Becoming Institute', 10, TOTAL);

  const bytes = await pdfDoc.save();
  const dest = path.join(__dirname, '..', 'public', 'documents', 'communication-mastery.pdf');
  fs.writeFileSync(dest, bytes);
  console.log('✅ communication-mastery.pdf — ' + (bytes.length / 1024).toFixed(1) + ' KB');
}

// ═══════════════════════════════════════════════════════════════════
// PDF 2: HABIT BUILDING GUIDE
// ═══════════════════════════════════════════════════════════════════
async function generateHabitBuildingGuide() {
  const { pdfDoc, regular, bold, italic } = await buildDoc();
  const fonts = { regular, bold, italic };
  const TOTAL = 10;
  const height = 792;
  const habitGreen = successGreen;

  coverPage(pdfDoc, fonts, {
    title: 'Habit Building\nGuide',
    subtitle: 'The Architecture of Daily Excellence',
    tagline: 'Your habits are the compound interest of your character.',
    category: 'Personal Development',
    accent: habitGreen,
  });

  // P2 — Introduction
  const p2 = pdfDoc.addPage([612, 792]);
  let y = height - 70;
  y = section(p2, fonts, 'INTRODUCTION | Why Habits Are the Real Currency of Success', y, habitGreen);
  const intro = `Every result you experience in life — your fitness, your finances, your relationships, your career — is the product of your daily habits. Not your occasional grand gestures. Not your yearly resolutions. Your daily, automatic, unconscious behaviors.

James Clear, in Atomic Habits, states: "You do not rise to the level of your goals. You fall to the level of your systems."

The Becoming Institute adds a critical truth: "Your habits are not just routines — they are declarations of who you are becoming."

This guide is not about adding more to your to-do list. It is about engineering your daily environment and identity to make excellent behavior automatic, effortless, and sustainable.

You will learn:
- How habits are formed at the neurological level
- The 4-stage Habit Loop and how to manipulate it in your favor
- The Identity-Based Habit Method (the most powerful approach)
- The 5 Habit Stacking strategies used by world-class performers
- A 90-day personal habit architecture blueprint`;
  y = wrap(p2, intro, regular, 10, textDark, 50, y, 512, 15);
  decor(p2, fonts, 'Introduction', 2, TOTAL);

  // P3 — The Science of Habit Formation
  const p3 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p3, fonts, 'CHAPTER 1 | The Science of Habit Formation', y, darkCharcoal);
  const c1 = `A habit is a behavior that has been repeated so many times it becomes automatic. Neuroscientist Ann Graybiel describes this process as "chunking" — the brain packages a sequence of actions into a single automatic routine, freeing up cognitive space for higher-level thinking.

The 4-Stage Habit Loop (Cue, Craving, Response, Reward):
Cue: The trigger that initiates the behavior. (A notification. A time. A place. A person.)
Craving: The motivational force behind the habit. (What you want to feel or achieve.)
Response: The actual behavior — the habit itself.
Reward: The satisfaction that ends the loop and teaches your brain to repeat it.

To build a new habit: Make the CUE obvious. Make the CRAVING attractive. Make the RESPONSE easy. Make the REWARD satisfying.
To break a bad habit: Make the CUE invisible. Make the CRAVING unattractive. Make the RESPONSE difficult. Make the REWARD unsatisfying.

The 2-Minute Rule: When starting a new habit, reduce it to a 2-minute version. "Read before bed" becomes "Read one page." The goal is to show up and start — momentum does the rest.

The Becoming Institute Insight: You do not need willpower when your environment makes the right choice the obvious choice.`;
  y = wrap(p3, c1, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p3, fonts, 'Chapter 1 — Science of Habits', 3, TOTAL);

  // P4 — Identity-Based Habits
  const p4 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p4, fonts, 'CHAPTER 2 | Identity-Based Habits: Become Before You Do', y, habitGreen);
  const c2 = `Most people set outcome-based goals: "I want to lose 10kg." "I want to earn more money." The Becoming Institute teaches a more powerful approach: identity-based habits.

The 3 Levels of Behavior Change:
Level 3 (Outcomes): What you want. "I want to be fit."
Level 2 (Process): What you do. "I will work out 3 times a week."
Level 1 (Identity): Who you believe you are. "I am someone who moves their body daily."

The identity is everything. Every action you take is a vote for the person you are becoming.

The Origin Identity Declaration Method:
Step 1: Write the statement: "I am the kind of person who..."
Step 2: Choose one habit that gives evidence for that identity.
Step 3: Repeat the behavior until the identity becomes unquestionable.

Case Study — Serena Williams: She did not merely practice tennis. She developed the identity of a champion. Her habits flowed from that identity — not from motivation, but from who she knew herself to be.

Action Step: Write your Identity Declaration for one area of your life this week. "I am the kind of person who ____." Then execute one small action today that gives evidence to that declaration.`;
  y = wrap(p4, c2, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p4, fonts, 'Chapter 2 — Identity-Based Habits', 4, TOTAL);

  // P5 — Habit Stacking
  const p5 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p5, fonts, 'CHAPTER 3 | Habit Stacking: The Architecture of Your Ideal Day', y, darkCharcoal);
  const c3 = `Habit stacking is one of the most practical tools in behavioral science. It works by linking a new habit to an existing one, leveraging the neural pathway already established.

The Formula: "After I [CURRENT HABIT], I will [NEW HABIT]."

Examples of Habit Stacks:
- "After I pour my morning coffee, I will write three things I am grateful for."
- "After I sit down at my desk, I will review my top 3 priorities for the day."
- "After I brush my teeth at night, I will read for 10 minutes."
- "After I arrive home from work, I will spend 5 minutes in silent reflection."

The Master Habit Stack for Origin Students:
7:00 AM — Wake. Drink water. (Foundation)
7:05 AM — 5 minutes of intentional silence or prayer. (Mental preparation)
7:10 AM — Write one intention for the day. (Direction)
7:15 AM — Move your body for 10 minutes. (Energy activation)
7:25 AM — Review your top 3 goals. (Focus alignment)

The compound effect of this 25-minute stack, repeated 300 days per year, produces an extraordinary human in 12 months.

The Environment Design Principle: Place your habit triggers in obvious locations. Put the book on the pillow. Put the journal on the desk. Put the running shoes by the door. Friction determines behavior.`;
  y = wrap(p5, c3, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p5, fonts, 'Chapter 3 — Habit Stacking', 5, TOTAL);

  // P6 — Breaking Bad Habits
  const p6 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p6, fonts, 'CHAPTER 4 | Breaking Bad Habits: Rewiring Default Patterns', y, habitGreen);
  const c4 = `You cannot eliminate a habit — you can only replace it. The brain always needs a reward at the end of a loop. The key is substituting the response while keeping the same cue and delivering a healthier reward.

The STOP-SWAP-START Method:
STOP — Identify the habit you want to break. Define the cue, craving, response, and reward clearly.
SWAP — Design an alternative response that delivers the same reward through a healthier pathway.
START — Immediately execute the new response every single time the cue appears.

The 5 Common Bad Habit Triggers and Replacements:
Trigger: Stress -> Old: Social media scrolling -> New: 4-7-8 breathing (4 in, 7 hold, 8 out)
Trigger: Boredom -> Old: Unhealthy snacking -> New: 10 jumping jacks or a glass of water
Trigger: Loneliness -> Old: Passive TV watching -> New: Call one meaningful person
Trigger: Overwhelm -> Old: Procrastination -> New: The "next smallest action" method
Trigger: Anxiety -> Old: Complaining -> New: Write down 3 controllable next steps

The 30-Day Disruption Rule: Research suggests it takes 21-66 days to form a new habit. Commit to disrupting a bad habit consistently for 30 days. The urge will diminish. The new pathway will strengthen.`;
  y = wrap(p6, c4, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p6, fonts, 'Chapter 4 — Breaking Bad Habits', 6, TOTAL);

  // P7 — Tracking & Accountability
  const p7 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p7, fonts, 'CHAPTER 5 | Tracking & Accountability: Never Break the Chain', y, darkCharcoal);
  const c5 = `Jerry Seinfeld's productivity secret is legendary: he put a red X on his calendar every day he wrote jokes. His only rule: "Don't break the chain." Visual progress tracking creates a powerful psychological motivator — the desire to maintain the streak.

The Habit Scorecard Method:
At the end of each day, mark each habit as:
  (+)  Intentional positive behavior
  (-)  Unintentional negative behavior
  (=)  Neutral behavior

This simple practice builds awareness before it builds change. You cannot improve what you do not measure.

The Accountability Partner Principle: People who commit to a goal publicly are 65% more likely to achieve it. Those who set a specific appointment with an accountability partner achieve their goal 95% of the time (American Society of Training and Development).

Origin Community Accountability:
1. Share your top 3 habits for the week in the Origin community.
2. Check in with one accountability partner every Sunday evening.
3. Celebrate streaks — not just results. Progress deserves recognition.

Action Step: Create a simple 30-day habit tracker on paper or in your journal. Choose 3 keystone habits. Track them daily for 30 days. Review at Day 10, Day 20, and Day 30.`;
  y = wrap(p7, c5, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p7, fonts, 'Chapter 5 — Tracking & Accountability', 7, TOTAL);

  // P8 — 90-Day Blueprint
  const p8 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p8, fonts, 'YOUR 90-DAY HABIT ARCHITECTURE BLUEPRINT', y, habitGreen);
  const blueprint = `Phase 1 — FOUNDATION (Days 1-30): Plant One Keystone Habit
Choose one keystone habit that will have the greatest positive ripple effect on your life.
Daily: Execute it without exception. Even if imperfectly. Never skip twice in a row.
Weekly: Journal 5 minutes about what you noticed. What got easier? What surprised you?
End of Phase: Rate your consistency (1-10). Celebrate your progress.

Phase 2 — EXPANSION (Days 31-60): Add a Second Habit, Break One Barrier
Stack a second powerful habit to your existing routine.
Identify one bad habit to disrupt using the STOP-SWAP-START method.
Daily: Execute both habits. Observe your energy, mood, and output levels.
End of Phase: Review identity — "I am becoming the person who..."

Phase 3 — MASTERY (Days 61-90): Integration and Identity Consolidation
Add a third habit. Fine-tune your environment design.
Teach someone else one habit principle you have internalized.
Daily: Execute all 3 habits. Notice the ease — this is automation activating.
End of Phase: Write your Habit Mastery Declaration. Who are you now?

After 90 Days: The habits that once required effort now feel like you. This is transformation — not motivation. Architecture.`;
  y = wrap(p8, blueprint, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p8, fonts, '90-Day Blueprint', 8, TOTAL);

  // P9 — Key Principles Summary
  const p9 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p9, fonts, 'KEY PRINCIPLES — HABIT MASTERY AT A GLANCE', y, darkCharcoal);
  const kp = `1. Identity First: Decide who you want to become before you decide what to do.
2. Make it Obvious: Design your environment so the right choice is the easy choice.
3. Make it Attractive: Pair habits with something you enjoy (temptation bundling).
4. Make it Easy: Reduce friction. Start with 2 minutes. Lower the bar until you start.
5. Make it Satisfying: Celebrate immediately after the habit. Small wins build momentum.
6. Never Skip Twice: Miss once — you're human. Miss twice — you're building a new habit.
7. Measure What Matters: Track your keystone habits visually every single day.
8. Stack Intelligently: Attach new habits to established anchors in your daily routine.
9. Rewire Identity Constantly: With every action, ask "Is this who I am becoming?"
10. Teach to Master: The fastest way to consolidate a habit is to teach it to someone else.`;
  y = wrap(p9, kp, regular, 10, textDark, 50, y, 512, 16);
  decor(p9, fonts, 'Key Principles', 9, TOTAL);

  // P10 — Origin closing
  const p10 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  p10.drawRectangle({ x: 50, y: y - 110, width: 512, height: 110, color: habitGreen });
  p10.drawText('THE BECOMING INSTITUTE', { x: 70, y: y - 38, size: 16, font: bold, color: goldAccent });
  p10.drawText('Transforming Individuals. Building Leaders. Shaping Generations.', { x: 70, y: y - 60, size: 10, font: italic, color: white });
  p10.drawText('Founder: Zeki Ubor  |  Platform: www.origin.com.ng', { x: 70, y: y - 80, size: 9, font: regular, color: rgb(0.80, 0.95, 0.85) });
  y -= 135;
  const bio = `This Habit Building Guide is part of the Origin Learning Platform — your structured environment for building the habits, skills, and identity of a world-class individual.

The Becoming Institute teaches that excellence is never an accident. It is the result of intentional daily choices repeated until they become automatic. This is the science and art of habit architecture.

Continue your transformation journey on the Origin platform. Access live coaching, community accountability, and structured courses designed to take you from where you are to where you are meant to be.`;
  y = wrap(p10, bio, regular, 10, textDark, 50, y, 512, 16);
  y -= 30;
  p10.drawRectangle({ x: 50, y: y - 55, width: 512, height: 55, color: lightBg });
  p10.drawText('An Official Origin Course Resource  |  Personal Development Track', { x: 70, y: y - 25, size: 10, font: bold, color: darkCharcoal });
  p10.drawText('Downloaded from the Origin Learning Platform  |  www.origin.com.ng', { x: 70, y: y - 44, size: 9, font: regular, color: mutedText });
  decor(p10, fonts, 'The Becoming Institute', 10, TOTAL);

  const bytes = await pdfDoc.save();
  const dest = path.join(__dirname, '..', 'public', 'documents', 'habit-building-guide.pdf');
  fs.writeFileSync(dest, bytes);
  console.log('✅ habit-building-guide.pdf — ' + (bytes.length / 1024).toFixed(1) + ' KB');
}

// ═══════════════════════════════════════════════════════════════════
// PDF 3: INFLUENCE PSYCHOLOGY
// ═══════════════════════════════════════════════════════════════════
async function generateInfluencePsychology() {
  const { pdfDoc, regular, bold, italic } = await buildDoc();
  const fonts = { regular, bold, italic };
  const TOTAL = 10;
  const height = 792;
  const influencePurple = rgb(0.35, 0.12, 0.62);

  coverPage(pdfDoc, fonts, {
    title: 'Influence\nPsychology',
    subtitle: 'The Science of Ethical Influence & Human Connection',
    tagline: 'The greatest leaders do not push people — they pull them.',
    category: 'Leadership & Influence',
    accent: influencePurple,
  });

  // P2 — Intro
  const p2 = pdfDoc.addPage([612, 792]);
  let y = height - 70;
  y = section(p2, fonts, 'INTRODUCTION | The Science Behind Why People Say Yes', y, influencePurple);
  const intro = `Influence is not manipulation. Influence is not control. Influence is the highest form of service — the art of helping others make decisions that benefit themselves while advancing a shared purpose.

Robert Cialdini, in his landmark work "Influence: The Psychology of Persuasion," identified 6 universal principles that drive human decision-making. The Becoming Institute has integrated these with transformational leadership psychology to create a framework that is both powerful and deeply ethical.

This guide teaches you how to:
- Understand the 7 Core Influence Principles and their neurological basis
- Apply ethical persuasion in professional, leadership, and personal contexts
- Recognize and defend against manipulative influence tactics
- Build the kind of character and trust that makes influence effortless
- Develop your personal "Influence Architecture" — a signature approach to leading others

"Before you can change anyone's mind, you must first earn a place in their heart." — Zeki Ubor`;
  y = wrap(p2, intro, regular, 10, textDark, 50, y, 512, 15);
  decor(p2, fonts, 'Introduction', 2, TOTAL);

  // P3 — Cialdini's 6 Principles
  const p3 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p3, fonts, 'CHAPTER 1 | Cialdini\'s 6 Principles of Influence', y, darkCharcoal);
  const c1 = `These principles operate at the subconscious level. Understanding them gives you the ability to influence with awareness and defend against their misuse.

1. Reciprocity: People feel compelled to return favors and concessions.
   Application: Give genuine value first — knowledge, help, recognition — before asking for anything.

2. Commitment & Consistency: Once people commit to something, they follow through to stay consistent with their self-image.
   Application: Ask for small commitments first. These pave the way for larger agreements.

3. Social Proof: People follow the actions of others, especially in uncertain situations.
   Application: Testimonials, case studies, and community proof validate your position powerfully.

4. Authority: People defer to credible experts and authoritative sources.
   Application: Share your credentials, demonstrate competence, and cite respected sources.

5. Liking: People say yes to those they like. We like those similar to us, who compliment us, and who are familiar.
   Application: Find genuine common ground. Use people's names. Show authentic interest.

6. Scarcity: The less available something is, the more desirable it becomes.
   Application: Be honest about constraints — limited time, limited availability — never fabricate them.`;
  y = wrap(p3, c1, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p3, fonts, 'Chapter 1 — Cialdini\'s Principles', 3, TOTAL);

  // P4 — Emotional Intelligence in Influence
  const p4 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p4, fonts, 'CHAPTER 2 | Emotional Intelligence: The Foundation of Influence', y, influencePurple);
  const c2 = `Daniel Goleman's research on emotional intelligence reveals a stunning fact: IQ accounts for only 20% of career success. The other 80% is determined by emotional intelligence — your ability to understand and manage emotions in yourself and others.

The 5 Pillars of Emotional Intelligence for Influence:
1. Self-Awareness: Knowing your emotional triggers, biases, and default patterns.
   Influence Application: Leaders who know themselves project unshakeable stability.

2. Self-Regulation: Managing your emotions rather than reacting to them.
   Influence Application: Staying calm under pressure commands deep respect and trust.

3. Motivation: Internal drive that pursues goals beyond external reward.
   Influence Application: Intrinsically motivated leaders inspire others to move from obligation to calling.

4. Empathy: Accurately reading the emotional state of others and responding appropriately.
   Influence Application: The person who makes you feel understood owns a permanent seat in your mind.

5. Social Skills: Building networks, managing relationships, and navigating conflict masterfully.
   Influence Application: Social skill is the delivery system for every other influence principle.

The Becoming Institute Teaching: You cannot sustainably influence anyone you do not genuinely care about. Character is the foundation of influence. Everything else is technique.`;
  y = wrap(p4, c2, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p4, fonts, 'Chapter 2 — Emotional Intelligence', 4, TOTAL);

  // P5 — Storytelling as Influence
  const p5 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p5, fonts, 'CHAPTER 3 | Storytelling: The Most Ancient Influence Technology', y, darkCharcoal);
  const c3 = `Before persuasion techniques, before negotiation frameworks, before PowerPoint — there was the story. Stories bypass analytical resistance and speak directly to the emotional brain. They create shared experience, transport listeners, and anchor beliefs in memorable narratives.

Why Stories Work Neurologically:
When you hear a fact, only the language processing areas of the brain activate. When you hear a story, sensory, motor, and emotional areas light up simultaneously — the brain experiences the story as if it were real.

The Becoming Institute Story Framework (SPEC):
S — Situation: Paint the context. Who, when, where.
P — Problem: What challenge or conflict arose?
E — Emotion: What was felt? This is where connection happens.
C — Change: What transformed? What was learned? What became possible?

Types of Stories Every Influencer Must Master:
1. The Origin Story — Why you do what you do. Your "why."
2. The Transformation Story — A client or personal journey from struggle to breakthrough.
3. The Vision Story — What the future looks like when the shared goal is achieved.
4. The Teaching Story — A principle illustrated through narrative (parables, case studies).

Action Step: Write your personal Origin Story in the SPEC format. Practice telling it in under 90 seconds. This becomes your most powerful influence asset.`;
  y = wrap(p5, c3, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p5, fonts, 'Chapter 3 — Storytelling', 5, TOTAL);

  // P6 — Trust Architecture
  const p6 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p6, fonts, 'CHAPTER 4 | Trust Architecture: Building Influence That Lasts', y, influencePurple);
  const c4 = `Stephen M.R. Covey identifies two components of trust: Character (your intentions and integrity) and Competence (your capabilities and results). Both must be present for lasting influence.

The Trust Equation (David Maister):
Trust = (Credibility + Reliability + Intimacy) divided by Self-Orientation

Credibility: Do your words hold weight? Do you know what you're talking about?
Reliability: Do you do what you say you'll do? Every time?
Intimacy: Do people feel safe being vulnerable and honest with you?
Self-Orientation: The lower your self-focus, the higher the trust. It is about them, not you.

The Becoming Institute Trust-Building Protocol:
1. Make specific, small promises — then exceed them. Build a track record.
2. Acknowledge your mistakes openly and quickly. Integrity under fire builds unshakeable trust.
3. Give credit generously. People trust those who do not need to steal the spotlight.
4. Listen more than you speak. Silence signals security. Security signals trustworthiness.
5. Remember what matters to people. Reference their goals, names, and stories.

The Compounding Law of Trust: Each kept promise is a deposit in the trust account. Each broken promise is a heavy withdrawal. Build the account consistently — and your influence becomes effortless.`;
  y = wrap(p6, c4, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p6, fonts, 'Chapter 4 — Trust Architecture', 6, TOTAL);

  // P7 — Ethical Influence
  const p7 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p7, fonts, 'CHAPTER 5 | Ethical Influence vs Manipulation: The Defining Line', y, darkCharcoal);
  const c5 = `The line between influence and manipulation is the single most important distinction in this guide. Crossing it destroys trust, reputation, and ultimately — influence itself.

Influence (Ethical):
- Transparent about intentions
- Serves the other person's genuine interests
- Provides accurate, complete information
- Respects the other person's autonomy to choose
- Sustainable — builds relationship over time

Manipulation (Unethical):
- Conceals true intentions
- Serves only the influencer's interests
- Uses selective, distorted, or false information
- Exploits cognitive biases and emotional vulnerabilities
- Corrosive — destroys trust when discovered

The Becoming Institute Standard Test — Before any influence attempt, ask:
1. If this person knew exactly what I was doing and why, would they still feel respected?
2. Am I presenting accurate information or selectively omitting inconvenient facts?
3. Does saying yes genuinely serve their interests, or only mine?
4. Would I be comfortable if my method was published publicly?

If you cannot answer yes to all four, you have crossed from influence into manipulation.

The Long Game: Ethical influencers build compounding credibility over years. Manipulators gain short-term compliance and lose everything in one exposure.`;
  y = wrap(p7, c5, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p7, fonts, 'Chapter 5 — Ethical Influence', 7, TOTAL);

  // P8 — Application Matrix
  const p8 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p8, fonts, 'INFLUENCE IN ACTION — REAL-WORLD APPLICATION MATRIX', y, influencePurple);
  const matrix = `Scenario 1 — Presenting an idea to leadership:
  Use: Authority (cite data), Social Proof (reference successful precedents), Storytelling (paint the vision).
  Avoid: Overselling, withholding risks, pressuring timelines artificially.

Scenario 2 — Motivating a team that has lost momentum:
  Use: Empathy (acknowledge the difficulty), Commitment (reconnect to earlier declarations), Vision Story.
  Avoid: False urgency, shaming poor performers, forcing enthusiasm.

Scenario 3 — Selling a product or service you believe in:
  Use: Reciprocity (give value first), Testimonials (social proof), Scarcity (if genuinely limited).
  Avoid: Fake deadlines, exaggerated claims, pressure closes.

Scenario 4 — Navigating a difficult personal conversation:
  Use: Active Listening, Empathy, "I" Statements, the SPEC Story framework.
  Avoid: Passive-aggression, emotional flooding, premature conclusions.

Scenario 5 — Building authority in your field:
  Use: Consistency (publish insights regularly), Authority (demonstrate expertise), Liking (be warm and generous).
  Avoid: Boasting, gatekeeping knowledge, positioning against others.`;
  y = wrap(p8, matrix, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p8, fonts, 'Application Matrix', 8, TOTAL);

  // P9 — 21-Day Influence Practice
  const p9 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p9, fonts, 'YOUR 21-DAY INFLUENCE DEVELOPMENT PRACTICE', y, darkCharcoal);
  const plan = `Week 1 — Foundation (Self-Awareness & Trust)
Day 1-2:   Identify your current default influence style (Logical? Emotional? Relational?).
Day 3-4:   Map your trust accounts: Who trusts you deeply? Where has trust eroded? Why?
Day 5-7:   In every conversation, reduce self-orientation. Ask: "What does this person need most?"

Week 2 — Skill Building (Principles & Storytelling)
Day 8-9:   Study and identify one Cialdini principle operating in your environment daily.
Day 10-11: Write and practice your personal Origin Story using the SPEC framework.
Day 12-14: In one key relationship, consciously apply the Listen-Mirror-Ask method.

Week 3 — Integration (Application & Character)
Day 15-16: Deliver a meaningful contribution to someone with no expectation of return (Reciprocity).
Day 17-18: In one professional context, demonstrate your competence through results, not claims.
Day 19-20: Identify one area where you have been manipulative rather than influential. Make it right.
Day 21:    Write your Personal Influence Manifesto — your ethical commitments as an influencer.`;
  y = wrap(p9, plan, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p9, fonts, '21-Day Practice', 9, TOTAL);

  // P10 — Closing
  const p10 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  p10.drawRectangle({ x: 50, y: y - 110, width: 512, height: 110, color: influencePurple });
  p10.drawText('THE BECOMING INSTITUTE', { x: 70, y: y - 38, size: 16, font: bold, color: goldAccent });
  p10.drawText('Transforming Individuals. Building Leaders. Shaping Generations.', { x: 70, y: y - 60, size: 10, font: italic, color: white });
  p10.drawText('Founder: Zeki Ubor  |  Platform: www.origin.com.ng', { x: 70, y: y - 80, size: 9, font: regular, color: rgb(0.85, 0.78, 1) });
  y -= 135;
  const bio = `This Influence Psychology guide is part of the Origin Communication Skills Track — designed to equip emerging leaders, professionals, and entrepreneurs with the psychological tools to build genuine authority, lasting trust, and ethical influence.

The Becoming Institute teaches that true influence is a byproduct of character, competence, and consistent service to others. Techniques are tools. Character is the foundation.

Continue your leadership journey on the Origin platform and access live coaching, peer accountability, and structured courses in communication, leadership, and personal mastery.`;
  y = wrap(p10, bio, regular, 10, textDark, 50, y, 512, 16);
  y -= 30;
  p10.drawRectangle({ x: 50, y: y - 55, width: 512, height: 55, color: lightBg });
  p10.drawText('An Official Origin Course Resource  |  Leadership & Influence Track', { x: 70, y: y - 25, size: 10, font: bold, color: darkCharcoal });
  p10.drawText('Downloaded from the Origin Learning Platform  |  www.origin.com.ng', { x: 70, y: y - 44, size: 9, font: regular, color: mutedText });
  decor(p10, fonts, 'The Becoming Institute', 10, TOTAL);

  const bytes = await pdfDoc.save();
  const dest = path.join(__dirname, '..', 'public', 'documents', 'influence-psychology.pdf');
  fs.writeFileSync(dest, bytes);
  console.log('✅ influence-psychology.pdf — ' + (bytes.length / 1024).toFixed(1) + ' KB');
}

// ═══════════════════════════════════════════════════════════════════
// PDF 4: PERSUASION TECHNIQUES
// ═══════════════════════════════════════════════════════════════════
async function generatePersuasionTechniques() {
  const { pdfDoc, regular, bold, italic } = await buildDoc();
  const fonts = { regular, bold, italic };
  const TOTAL = 10;
  const height = 792;
  const persuasionRed = rgb(0.68, 0.12, 0.15);

  coverPage(pdfDoc, fonts, {
    title: 'Persuasion\nTechniques',
    subtitle: 'Advanced Frameworks for Ethical Persuasion & Negotiation',
    tagline: 'Persuade not by force — but by the irresistible logic of value.',
    category: 'Communication & Leadership',
    accent: persuasionRed,
  });

  // P2 — Intro
  const p2 = pdfDoc.addPage([612, 792]);
  let y = height - 70;
  y = section(p2, fonts, 'INTRODUCTION | The Art and Science of Moving People', y, persuasionRed);
  const intro = `Every negotiation, every sale, every request for change, every call to action — is an act of persuasion. Those who master it shape the world. Those who fear it are shaped by others who have mastered it.

Aristotle identified the three pillars of persuasion 2,400 years ago, and modern neuroscience has confirmed their validity:
- Logos (Logic): The rational argument, data, and evidence.
- Ethos (Character): The credibility and trustworthiness of the speaker.
- Pathos (Emotion): The emotional resonance that moves people to act.

Most persuaders use only one or two of these pillars. Masters deploy all three — calibrated for each audience and context.

This guide is not a manipulation manual. It is a precision instrument for those who believe in their message, their product, or their cause — and who want to communicate that belief in the way most likely to move others to genuine agreement.

"Persuasion is the currency of those who refuse to use force." — Zeki Ubor`;
  y = wrap(p2, intro, regular, 10, textDark, 50, y, 512, 15);
  decor(p2, fonts, 'Introduction', 2, TOTAL);

  // P3 — The Logos Framework
  const p3 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p3, fonts, 'CHAPTER 1 | Logos: Building the Irrefutable Logical Case', y, darkCharcoal);
  const c1 = `Logic alone rarely persuades. But without logic, even the most emotionally compelling argument collapses under scrutiny. Logos is the foundation — the rational architecture that makes your position intellectually defensible.

The PREP Framework for Logical Persuasion:
P — Point: State your conclusion clearly and upfront. Never bury your key message.
R — Reason: Give the primary reason supporting your point.
E — Evidence: Provide data, research, case studies, or expert testimony.
P — Point (Restated): Bring it home. Return to your core message with confidence.

Advanced Logical Techniques:
The Steel Man Argument: Before presenting your case, articulate the strongest possible version of the opposing view — then address it. This disarms defensiveness and projects intellectual integrity.

The Data-Story-Data Method: Open with a compelling data point. Support it with a human story. Close with confirming data. The combination is virtually irresistible.

The False Dilemma Reversal: When you detect a false either/or being presented against you, name it. "I don't think those are our only two options. Here's a third path..."

Action Step: For your next important persuasion context, write out the PREP structure in full before you begin. Then practice delivering it in under 90 seconds. Clarity of thought creates clarity of delivery.`;
  y = wrap(p3, c1, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p3, fonts, 'Chapter 1 — Logos', 3, TOTAL);

  // P4 — Ethos
  const p4 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p4, fonts, 'CHAPTER 2 | Ethos: Becoming Someone Worth Believing', y, persuasionRed);
  const c2 = `Ethos is your persuasion capital. It is the credibility, integrity, and trustworthiness that makes people receptive to your message before you even open your mouth. It cannot be manufactured in the moment — it is built over time through consistent action.

The 5 Components of Persuasive Ethos:
1. Demonstrated Expertise: People believe those who can show, not just tell. Your track record of results is your most powerful credential.
2. Perceived Similarity: We trust those who seem like us. Find and genuinely express points of commonality.
3. Social Proof: Who else trusts you? Endorsements, testimonials, and community validation transfer credibility.
4. Integrity Track Record: Do you do what you say? Consistently? Under pressure? This is the highest form of ethos.
5. Warmth & Genuine Care: Research shows that perceived warmth is weighted more heavily than competence in trust decisions.

Building Ethos Before the Persuasion Moment:
- Give value in public before asking for anything in private.
- Be transparent about your limitations and failures. It paradoxically increases trust.
- Acknowledge when the opposing view has merit. Intellectual honesty is rare and therefore powerfully persuasive.
- Be consistent across all contexts — same person in private as in public.

The Becoming Institute Standard: "Your reputation precedes you into every room. Make sure it's saying what you want said."`;
  y = wrap(p4, c2, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p4, fonts, 'Chapter 2 — Ethos', 4, TOTAL);

  // P5 — Pathos
  const p5 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p5, fonts, 'CHAPTER 3 | Pathos: The Emotional Architecture of Persuasion', y, darkCharcoal);
  const c3 = `Antonio Damasio's landmark neuroscience research proved that without emotion, humans literally cannot make decisions. Patients with damage to emotional processing centers could analyze options perfectly but could not choose between them. Emotion is not a distraction from rational decision-making — it IS decision-making.

The 6 Primary Emotional Drivers in Persuasion:
1. Hope/Aspiration: Connect your message to the future the person desires.
2. Fear/Loss Aversion: People work harder to avoid loss than to achieve gain. Use ethically and sparingly.
3. Belonging: We are tribal beings. Connect your message to a community or shared identity.
4. Pride: People want to feel competent, valued, and respected. Make them feel seen.
5. Curiosity: Create information gaps that the mind compulsively wants to fill.
6. Urgency: Genuine time-sensitivity activates decision-making.

The Emotional Resonance Method:
Before crafting any persuasive message, answer these three questions:
1. What does this person FEAR most in relation to this decision?
2. What does this person HOPE for most in relation to this decision?
3. What does this person WANT TO BELIEVE about themselves that my message can affirm?

Your answers become the emotional scaffolding for your persuasion architecture.`;
  y = wrap(p5, c3, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p5, fonts, 'Chapter 3 — Pathos', 5, TOTAL);

  // P6 — Advanced Techniques
  const p6 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p6, fonts, 'CHAPTER 4 | Advanced Persuasion Techniques', y, persuasionRed);
  const c4 = `The Foot-in-the-Door Technique: Begin with a small, easily accepted request. Once compliance is established, escalate toward your actual goal. People want to be consistent with their prior behavior.

The Door-in-the-Face Technique: Lead with a large request you know will be refused. When turned down, offer your real, smaller request. The contrast makes the second request feel entirely reasonable.

The Anchoring Principle: The first number mentioned in any negotiation becomes the psychological anchor around which all subsequent discussion orbits. Always anchor first — and anchor high (if selling) or low (if buying).

Framing — The Power of Context:
"This plan has a 95% success rate" persuades differently than "This plan has a 5% failure rate" — even though they are identical. Frame information in the context most favorable to your position.

The Yes Ladder: Ask a sequence of questions you know the answer is "yes" to. Each affirmation builds psychological momentum toward your key ask. "Would you agree that X is important to you? And that Y is challenging? And that Z is what you ultimately want?" Then: "Then here is the solution..."

The Takeaway Close: Nothing increases desire like the perception of withdrawal. "I understand if this isn't the right fit for you" often produces more urgency than any pressure tactic.`;
  y = wrap(p6, c4, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p6, fonts, 'Chapter 4 — Advanced Techniques', 6, TOTAL);

  // P7 — Negotiation
  const p7 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p7, fonts, 'CHAPTER 5 | Negotiation Mastery: Persuasion Under Pressure', y, darkCharcoal);
  const c5 = `Negotiation is applied persuasion with higher stakes and explicit opposition. Chris Voss, former FBI hostage negotiator and author of "Never Split the Difference," teaches that the best negotiators are not aggressive — they are empathic.

The Voss Tactical Empathy Framework:
1. Mirroring: Repeat the last 1-3 words of what was said. This triggers the speaker to elaborate and reveals more information.
2. Labeling: Name the emotion you observe. "It seems like you're concerned about..." This disarms defensiveness.
3. The Accusation Audit: Before negotiating, list every negative thing the other party might think about you or your position — and state them preemptively. This eliminates their power.
4. Calibrated Questions: Use "How" and "What" questions that require thought and reveal constraints. "How am I supposed to do that?" forces them to solve your problem.
5. The 7-38-55 Rule: 7% of communication is words. 38% is tone. 55% is body language. In negotiation, alignment between all three is critical.

The BATNA Principle (Best Alternative to Negotiated Agreement): Know your walk-away point before entering any negotiation. Power in negotiation belongs to the person most willing to walk away.

The Silence Principle: After making your key statement or offer — go silent. The first person to speak after a significant proposal has made a concession.`;
  y = wrap(p7, c5, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p7, fonts, 'Chapter 5 — Negotiation Mastery', 7, TOTAL);

  // P8 — The Rhetoric of World Leaders
  const p8 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p8, fonts, 'CHAPTER 6 | The Rhetoric of World Leaders: Lessons in Mastery', y, persuasionRed);
  const c6 = `Martin Luther King Jr. — "I Have a Dream":
King's mastery: He used extended metaphor (the "check" of the Declaration of Independence), anaphora ("I have a dream" repeated 8 times), vivid imagery, and an appeal to shared American values. He made his audience see themselves as the heroes of a moral story they needed to complete.
Your lesson: Repetition of key phrases anchors ideas in memory. Give your audience a role in the story.

Nelson Mandela — Post-Imprisonment Address:
Mandela's mastery: He spoke with zero bitterness after 27 years in prison. His restraint and magnanimity were themselves the persuasion. When the enemy cannot find your weakness, they are disarmed.
Your lesson: Your composure under pressure is your most persuasive attribute.

Winston Churchill — "We Shall Fight on the Beaches":
Churchill's mastery: Built relentless rhythmic momentum through parallel structure. "We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields..." The rhythm itself became emotionally mobilizing.
Your lesson: Use parallelism and rhythm to build emotional momentum.

Steve Jobs — Apple Product Launches:
Jobs's mastery: He created anticipation through strategic withholding. He framed products as revolutions. He made the audience feel they were witnessing history. He used the rule of three obsessively.
Your lesson: Frame your offer as transformation, not transaction.`;
  y = wrap(p8, c6, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p8, fonts, 'Chapter 6 — World Leaders\' Rhetoric', 8, TOTAL);

  // P9 — Daily Practice
  const p9 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  y = section(p9, fonts, 'YOUR PERSUASION MASTERY DEVELOPMENT PLAN', y, darkCharcoal);
  const plan = `The 10-Minute Daily Persuasion Practice:
Morning (5 min): Read one page from a master communicator (Churchill, Mandela, Obama speeches).
                 Identify: What technique was used? Why did it work?
Evening (5 min): Review one persuasive conversation from your day.
                 Score yourself: Logos (1-5), Ethos (1-5), Pathos (1-5).
                 What would you do differently?

Weekly Skill Builders:
Week 1: Practice the PREP Framework in one professional context daily.
Week 2: Study one world-class speech. Write out its rhetorical structure.
Week 3: Use tactical empathy (mirroring + labeling) in 3 conversations.
Week 4: Deliver one fully prepared persuasive presentation (5+ min).

The Persuasion Journal:
Keep a dedicated journal for persuasion observations:
- What persuaded you this week? Which principle was operating?
- Where did you persuade successfully? What made it work?
- Where did persuasion fail? Which pillar was weakest?
- What technique will you practice in the coming week?

The Mentor Conversation: Seek out one person whose influence you admire. Ask them:
"What do you consider the single most important principle of ethical persuasion?"
Their answer is worth a library of books.`;
  y = wrap(p9, plan, regular, 9.5, textDark, 50, y, 512, 14.5);
  decor(p9, fonts, 'Development Plan', 9, TOTAL);

  // P10 — Closing
  const p10 = pdfDoc.addPage([612, 792]);
  y = height - 70;
  p10.drawRectangle({ x: 50, y: y - 110, width: 512, height: 110, color: persuasionRed });
  p10.drawText('THE BECOMING INSTITUTE', { x: 70, y: y - 38, size: 16, font: bold, color: goldAccent });
  p10.drawText('Transforming Individuals. Building Leaders. Shaping Generations.', { x: 70, y: y - 60, size: 10, font: italic, color: white });
  p10.drawText('Founder: Zeki Ubor  |  Platform: www.origin.com.ng', { x: 70, y: y - 80, size: 9, font: regular, color: rgb(1, 0.80, 0.80) });
  y -= 135;
  const bio = `This Persuasion Techniques guide is part of the Origin Communication & Leadership Track — an advanced resource for professionals, leaders, and entrepreneurs ready to move from passive communication to strategic influence.

The Becoming Institute teaches that the greatest persuaders are not those with the most aggressive techniques — they are those whose character, competence, and genuine care for others make trust the natural outcome of every interaction.

Master the principles in this guide. Practice them daily. Teach them generously. And watch as your influence expands beyond anything techniques alone could produce.`;
  y = wrap(p10, bio, regular, 10, textDark, 50, y, 512, 16);
  y -= 30;
  p10.drawRectangle({ x: 50, y: y - 55, width: 512, height: 55, color: lightBg });
  p10.drawText('An Official Origin Course Resource  |  Communication & Leadership Track', { x: 70, y: y - 25, size: 10, font: bold, color: darkCharcoal });
  p10.drawText('Downloaded from the Origin Learning Platform  |  www.origin.com.ng', { x: 70, y: y - 44, size: 9, font: regular, color: mutedText });
  decor(p10, fonts, 'The Becoming Institute', 10, TOTAL);

  const bytes = await pdfDoc.save();
  const dest = path.join(__dirname, '..', 'public', 'documents', 'persuasion-techniques.pdf');
  fs.writeFileSync(dest, bytes);
  console.log('✅ persuasion-techniques.pdf — ' + (bytes.length / 1024).toFixed(1) + ' KB');
}

// ─── Run all ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('\nGenerating The Becoming Institute Course Resource PDFs...\n');
  await generateCommunicationMastery();
  await generateHabitBuildingGuide();
  await generateInfluencePsychology();
  await generatePersuasionTechniques();
  console.log('\nAll 4 PDFs generated successfully.');
}

main().catch(err => { console.error('Error:', err); process.exit(1); });
