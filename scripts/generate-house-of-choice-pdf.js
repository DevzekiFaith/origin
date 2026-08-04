const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const T = require('./ebook-template');

async function run() {
  const doc = await PDFDocument.create();
  const fonts = await T.embedFonts(doc);
  const accent = rgb(0.05, 0.25, 0.50); // Deep Navy
  const PW = 612, PH = 792;

  const p1 = doc.addPage([PW, PH]);
  await T.cover(p1, {
    title: 'HOUSE\nOF CHOICE',
    subtitle: 'Discover how your choices shape your essence.\nMaster the art of decisions that align with your true self.',
    author: 'Zeki Ubor', accent, fonts,
  });

  const p2 = doc.addPage([PW, PH]);
  T.copyrightPage(p2, {
    title: 'House of Choice',
    author: 'Zeki Ubor',
    dedication: 'To every person standing at a crossroads —\nMay you always choose with clarity, courage, and conviction.',
    accent, fonts,
  });

  const p3 = doc.addPage([PW, PH]);
  T.tocPage(p3, {
    accent, fonts,
    chapters: [
      { num: 'INTRO',  title: 'The Power of Choice',                      pg: 4  },
      { num: 'CH. 1',  title: 'How Your Choices Shape Your Essence',      pg: 5  },
      { num: 'CH. 2',  title: 'Overcoming Internal Barriers',             pg: 6  },
      { num: 'CH. 3',  title: 'Reshaping Your Mindset',                   pg: 7  },
      { num: 'CH. 4',  title: 'Mastering Decision-Making',                pg: 8  },
      { num: 'CH. 5',  title: 'Aligning Choices With Your True Self',     pg: 9  },
      { num: 'CH. 6',  title: 'The Courage to Choose Differently',        pg: 10 },
      { num: 'CH. 7',  title: 'Building a Life of Purpose Through Choice',pg: 11 },
      { num: 'FINAL',  title: 'Your House. Your Choice.',                  pg: 12 },
      { num: 'AUTHOR', title: 'About the Author',                         pg: 13 },
    ],
  });

  const p4 = doc.addPage([PW, PH]);
  T.quotePage(p4, {
    quote: 'Every choice you make is either building or dismantling the house of your life.',
    attribution: 'Zeki Ubor — House of Choice',
    accent, fonts,
  });

  const chaps = [
    {
      num: 1, title: 'How Your Choices\nShape Your Essence', sub: 'The Architecture of Who You Are',
      body: `You are not the product of your circumstances. You are the product of your choices. Every decision — from the mundane to the momentous — is a brick in the structure of your character, your relationships, and your destiny.\n\nAristotle observed: "We are what we repeatedly do. Excellence, then, is not an act, but a habit."\n\nThe Three Dimensions of Choice:\n\n1. Identity Choices — Who you decide to be. These are the deepest choices: Am I someone who keeps their word? Am I a person of integrity when no one is watching?\n\n2. Direction Choices — Where you decide to go. Career, relationships, geography, faith — the compass settings of your life trajectory.\n\n3. Daily Choices — The small selections that seem insignificant but compound relentlessly. What you consume, how you spend your time, who you engage with.\n\nThe profound truth: your essence is not something you discover — it is something you construct, through every choice, every single day.`,
      action: 'Write 10 choices you made in the last month — large and small. For each, ask: Did this choice move me toward the person I want to become, or away from them?',
    },
    {
      num: 2, title: 'Overcoming\nInternal Barriers', sub: 'Breaking Through What Holds You Back',
      body: `The greatest barriers to empowered choice-making are rarely external. They are internal — invisible walls built from fear, past experience, false beliefs, and unexamined assumptions.\n\nThe 5 Internal Barriers:\n\n1. Fear of Consequence: The paralysis that comes from magnifying potential negatives while minimizing the cost of inaction.\n\n2. Need for Certainty: The belief that you must know the outcome before you choose. Transformative choices almost always require trusting the process.\n\n3. Approval Addiction: Making choices designed to please others rather than align with your values — the surest path to a life you didn't choose.\n\n4. Identity Rigidity: "I'm not the kind of person who does that." Said by people who could become exactly that kind of person — if they chose to.\n\n5. Past-Choice Regret: Allowing previous "wrong" choices to define the ceiling of your future. Your history does not have to be your destiny.\n\nEvery barrier can be dismantled — not all at once, but one courageous choice at a time.`,
      action: 'Identify the one internal barrier most active in your life right now. Write one choice you have been avoiding because of it. Commit to one action this week.',
    },
    {
      num: 3, title: 'Reshaping\nYour Mindset', sub: 'From Reactive to Intentional',
      body: `A reactive life is lived by default. An intentional life is lived by design.\n\nFrom Scarcity to Abundance: Scarcity thinking says "There isn't enough." Abundance thinking says "There is enough for those who create value." Your mental frame determines what you see, seek, and find.\n\nFrom Victim to Creator: The victim asks "Why is this happening to me?" The creator asks "What can I build from this?" Both are questions — and they lead to completely different lives.\n\nFrom Short-Term to Long-Term: The most consequential decisions involve delaying immediate gratification for long-term fulfillment. This capacity is among the most predictive traits of success in any domain.\n\nFrom Certainty-Seeking to Growth-Seeking: Carol Dweck discovered that the belief your abilities can be developed through dedication transforms everything you touch.\n\nThe Mindset Reset Practice: Each morning, before consuming any external information, spend five minutes deliberately setting your mental frame for the day ahead.`,
      action: 'Track your self-talk for one week across three categories: Scarcity/Abundance, Victim/Creator, Short-term/Long-term. Notice patterns. Deliberately interrupt one.',
    },
    {
      num: 4, title: 'Mastering\nDecision-Making', sub: 'A Framework for Clarity Under Pressure',
      body: `Most people make decisions by feeling alone. Great leaders make decisions by framework — while still honoring intuition. The goal is not to remove emotion from decisions, but to ensure emotion serves wisdom rather than replaces it.\n\nThe CLEAR Decision Framework:\n\nC — Clarify the real question: What is the actual decision you are making? Often we avoid the real question by focusing on secondary ones.\n\nL — List your options: Force yourself to list at least four options before deciding. Most problems offer more than two.\n\nE — Examine values alignment: Which option is most aligned with who I want to become and what I value most?\n\nA — Assess long-term impact: How will I feel about this in 10 years? Would I be proud to tell my children?\n\nR — Remove reversibility pressure: Many decisions people agonize over are highly reversible. Act sooner; course-correct faster.\n\nA note on timing: Most decisions are made far too slowly. We confuse the magnitude of a decision with the difficulty of making it.`,
      action: 'Apply the CLEAR Framework to one decision you have been postponing. Work through all five steps in writing. Make the decision within 48 hours.',
    },
    {
      num: 5, title: 'Aligning Choices\nWith Your True Self', sub: 'The Compass of Authentic Decision',
      body: `Authenticity in decision-making is not about following every impulse — it is about aligning your choices with your deepest values, your most honest self-knowledge, and your highest purpose.\n\nThe Authentic Choice Test:\n1. Does this choice honor my core values, or does it require me to compromise them?\n2. Am I choosing from love, purpose, and vision — or from fear, pressure, and avoidance?\n3. Would I make this same choice if I knew I could not fail?\n4. Does this choice take me toward the person I am becoming, or away from them?\n\nThe Role of Intuition: Intuition is not irrational — it is accumulated experience operating beneath conscious awareness. When your gut speaks consistently on a decision, listen. But verify: is this intuition, or is this fear wearing intuition's clothes?\n\nThe Authenticity Paradox: Sometimes the most authentic choice is also the most uncomfortable one. Authentic people are not always comfortable — they are honest, even when honesty costs something.`,
      action: 'Identify one choice in your life you have been making from fear rather than authenticity. Write what the authentic choice would look like, and take one step toward it this week.',
    },
    {
      num: 6, title: 'The Courage to\nChoose Differently', sub: 'When the Right Choice Is the Harder One',
      body: `Sometimes the most important choice is not the obvious one, not the popular one, and not the safe one. Sometimes greatness demands that you choose differently from the crowd.\n\nThe Courage Spectrum:\n• Micro-courage: Saying what you actually think. Asking for what you really want. Admitting you don't know.\n• Everyday courage: Setting a boundary. Ending a relationship that isn't healthy. Leaving a job that has become a cage.\n• Strategic courage: Pivoting when every signal says stay. Relocating for growth. Pursuing a calling others dismiss.\n\nCourage Compounds: The more often you practice choosing courageously in small matters, the more naturally courage flows when major decisions arrive.\n\nAnd remember: safe choices have costs too. The cost of the safe choice is often invisible in the short term and devastating in the long term. The cost of inaction is always greater than we imagine it will be.`,
      action: 'Identify one courageous choice you have been avoiding. Name what you fear. Name what you gain. Set a 7-day deadline. Tell one trusted person your commitment.',
    },
    {
      num: 7, title: 'Building a Life of\nPurpose Through Choice', sub: 'From Decisions to Destiny',
      body: `Purpose is not found — it is built, choice by choice, through the decisions we make about where we invest our attention, energy, time, and love.\n\nThe Purposeful Choice Principles:\n\n1. Every choice is a vote for who you are becoming. Treat your daily decisions as ballots in an ongoing election about your character and destiny.\n\n2. Purpose amplifies impact. When your choices are anchored in clear purpose, even ordinary decisions carry extraordinary weight.\n\n3. Contribution is the highest purpose. The choices that generate the most lasting satisfaction invest in others — their growth, their dignity, their becoming.\n\n4. Your legacy is built today. Every choice you make right now — how you treat people, how you handle adversity, how you honor your commitments — is laying the foundation of your lasting impact.\n\n5. A purposeful life is a chosen life. Not a life without hardship, but one where even the hardships are chosen, faced, and metabolized into wisdom.\n\nChoose your purpose. Then let it guide your next step.`,
      action: 'Write a one-paragraph Personal Purpose Statement — not what you do, but why you exist and what impact you intend to leave. Post it where you see it every morning.',
    },
  ];

  let pgNum = 5;
  for (const ch of chaps) {
    const pg = doc.addPage([PW, PH]);
    let y = T.chapterOpener(pg, { num: ch.num, title: ch.title, subtitle: ch.sub, accent, fonts });
    y -= 8;
    y = T.wrap(pg, ch.body, fonts.R, 9.8, T.T.dark, 60, y, PW - 120, 15.5);
    if (y > 115) { y -= 10; T.actionBox(pg, ch.action, accent, fonts, y); }
    T.decoratePage(pg, 'HOUSE OF CHOICE', pgNum++, fonts);
  }

  // FINAL
  const pF = doc.addPage([PW, PH]);
  pF.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: T.T.charcoal });
  pF.drawRectangle({ x: 0, y: PH - 4, width: PW, height: 4, color: accent });
  pF.drawRectangle({ x: 0, y: 0, width: PW, height: 4, color: accent });
  pF.drawText('YOUR HOUSE.', { x: 60, y: PH - 90, size: 38, font: fonts.B, color: T.T.white });
  pF.drawText('YOUR CHOICE.', { x: 60, y: PH - 136, size: 38, font: fonts.B, color: accent });
  pF.drawRectangle({ x: 60, y: PH - 152, width: 340, height: 2.5, color: accent });
  let fy = PH - 195;
  fy = T.wrap(pF, `You have arrived at the end of this book. But the choices — they begin now.\n\nChoose clarity over confusion.\nChoose courage over comfort.\nChoose growth over safety.\nChoose purpose over popularity.\nChoose the person you are becoming over the person you have been.\n\nYour house is being built right now — with every choice you make, every hour of every day. What kind of house are you building?\n\nBuild it with intention. Build it with courage. Build it with love.\n\nBecause the house of your life is the only one you will ever truly live in.`, fonts.R, 12, T.T.offWhite, 60, fy, PW - 120, 20);
  T.decoratePage(pF, 'HOUSE OF CHOICE', pgNum++, fonts);

  // ABOUT
  const pA = doc.addPage([PW, PH]);
  T.aboutPage(pA, { accent, fonts });
  T.decoratePage(pA, 'HOUSE OF CHOICE', pgNum, fonts);

  const bytes = await doc.save();
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'documents', 'house-of-choice.pdf'), bytes);
  console.log(`✅ house-of-choice.pdf — ${(bytes.length / 1024).toFixed(1)} KB`);
}

run().catch(e => { console.error('❌', e); process.exit(1); });
