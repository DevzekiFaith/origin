const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const T = require('./ebook-template');

async function run() {
  const doc = await PDFDocument.create();
  const fonts = await T.embedFonts(doc);
  const accent = rgb(0.01, 0.38, 0.26); // Deep Emerald
  const PW = 612, PH = 792;

  const p1 = doc.addPage([PW, PH]);
  await T.cover(p1, {
    title: 'THE EZRA\nREBUILD\nMINDSET',
    subtitle: 'Becoming the Ezra of Your Generation.\nRebuilding Life, Business & Community from the Inside Out.',
    author: 'Zeki Ubor', accent, fonts,
  });

  const p2 = doc.addPage([PW, PH]);
  T.copyrightPage(p2, {
    title: 'The Ezra Rebuild Mindset: Becoming the Ezra of Your Generation',
    author: 'Zeki Ubor',
    dedication: 'To everyone whose world has fallen apart —\nThis is not the end of your story. You are being rebuilt for your appointed time.',
    accent, fonts,
  });

  const p3 = doc.addPage([PW, PH]);
  T.tocPage(p3, {
    accent, fonts,
    chapters: [
      { num: 'LISTEN', title: 'A Word Before We Begin',                        pg: 4  },
      { num: 'PILLAR 1', title: 'From Collapse to Clarity: Rebuild Your Blueprint', pg: 5 },
      { num: 'PILLAR 2', title: 'From Pollution to Purity: Clean Mental Altars',  pg: 6  },
      { num: 'PILLAR 3', title: 'From Emotion to Intention: Recommit to Purpose', pg: 7  },
      { num: 'PILLAR 4', title: 'From Noise to Order: Reform Your Environment',   pg: 8  },
      { num: 'PILLAR 5', title: 'From Pressure to Power: Reignite Your Fire',     pg: 9  },
      { num: 'FINAL',    title: 'The Ezra Standard: Rising to Rebuild',           pg: 10 },
      { num: 'AUTHOR',   title: 'About the Author',                               pg: 11 },
    ],
  });

  const p4 = doc.addPage([PW, PH]);
  T.quotePage(p4, {
    quote: "If your world has fallen apart, it's not over — it's under construction.",
    attribution: 'Zeki Ubor — The Ezra Rebuild Mindset',
    accent, fonts,
  });

  // INTRO
  const pIntro = doc.addPage([PW, PH]);
  pIntro.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: T.T.white });
  pIntro.drawRectangle({ x: 0, y: PH - 70, width: PW, height: 70, color: accent });
  pIntro.drawRectangle({ x: 0, y: PH - 4, width: PW, height: 4, color: T.T.black });
  pIntro.drawText('LISTEN —', { x: 60, y: PH - 46, size: 24, font: fonts.B, color: T.T.white });
  let iy = PH - 110;
  const introBody = `Rebuilding is never easy. You'll question your strength, your timing, and your worth. You'll be tempted to walk away, to call your failure final, to scroll through success stories and ask, "Why not me?"\n\nBut hear me — rebuilding is not punishment. It's an invitation. It's God whispering, "Let Me build it again, this time with you fully awake."\n\nEzra didn't rebuild Jerusalem's walls — he rebuilt its mindset. He transformed a culture that had forgotten truth into a generation that walked in conviction. He was not a king or soldier — he was a teacher, a reformer, a restorer of inner order.\n\nThe same Spirit that moved Ezra to rebuild an entire nation is available to you right now, in the middle of your personal collapse, your business setback, your relational fracture, or your spiritual drought.\n\nThese five pillars are structural steps for rebuilding — from the inside out.`;
  iy = T.wrap(pIntro, introBody, fonts.R, 11, T.T.dark, 60, iy, PW - 120, 18);
  T.decoratePage(pIntro, 'EZRA REBUILD MINDSET', 4, fonts);

  const pillars = [
    {
      num: 1, title: 'From Collapse\nto Clarity', sub: 'PILLAR 1 — Rebuild Your Inner Blueprint',
      body: `Ezra didn't start rebuilding temples — he started rebuilding truth. Before anything external was restored, he asked the people: "Who have we become?" That question is the beginning of every genuine rebuilding.\n\nBefore you rebuild your brand, your business, your marriage, or your faith — ask: "Who have I become, and what do I believe now?"\n\nThe Collapse Revelation: Collapse is not just the breaking of things outside you — it is the exposure of things inside you. What you discover about yourself in the wreckage is more valuable than anything you lost.\n\nSteps to Rebuilding Clarity:\n1. Honest Assessment: Sit with reality as it is, not as you wish it were. Write it all down. What happened? What was your role? What remains?\n2. Identity Separation: You are not your failure. A business collapse does not make you a failure. Separate yourself from the event.\n3. New Blueprint: After seeing clearly, begin drawing a new blueprint. Describe specifically what life will look like when you are through.\n\n"If your vision of the future is smaller than your current pain, you will not rebuild. Make the vision bigger than the wound."`,
      action: 'Write one honest paragraph about where you actually are right now. Then write one paragraph about where you are going. Pin both where you see them daily.',
    },
    {
      num: 2, title: 'From Pollution\nto Purity', sub: 'PILLAR 2 — Clean the Mental Altars',
      body: `Ezra saw the people mixing sacred with ordinary, holy with hollow. They had allowed culture to erode their convictions, trading depth for speed, peace for popularity, and purpose for pleasure.\n\nWhat Are Mental Altars? Mental altars are the places in your mind where you make your most important decisions — your values, identity, and sense of truth. When these altars are polluted, decisions become polluted. When clean, your whole life benefits.\n\nSigns Your Altars Need Cleaning:\n• You feel chronically confused when making decisions.\n• Your values say one thing but your behavior says another.\n• You are consumed by anxiety about others' opinions.\n• You know what you should do but consistently avoid it.\n\nThe Purification Process:\n1. Detox your information diet — remove sources creating fear and comparison.\n2. Audit your relationships — spend more time with those who inspire truth.\n3. Return to core values — write them down and evaluate choices against them.\n4. Practice silence and solitude — purity of mind begins in stillness.`,
      action: 'For 7 days, keep a mental diet journal. Rate each source: Does it bring clarity or confusion? Make one change immediately.',
    },
    {
      num: 3, title: 'From Emotion\nto Intention', sub: 'PILLAR 3 — Recommit to Your Purpose',
      body: `Ezra didn't rebuild with excitement — he rebuilt with endurance. Excitement is emotional and temporary. Endurance is intentional and durable.\n\nMost people begin rebuilding on emotion — the rush of a new start. But emotion is weather. Purpose is bedrock. You don't build on weather; you build on bedrock.\n\nThe Recommitment Framework:\n1. Name Your Purpose: In one sentence, write why you are rebuilding. Not what you want to achieve — why it matters.\n2. Ritualize Recommitment: Create a daily ritual that anchors you to your purpose — prayer, journaling, morning reflection.\n3. Emotion-Proof Your Plan: Ask: "What will I do when I don't feel like it?" Have a written answer before the moment arrives.\n4. Track Intention, Not Just Results: In early rebuilding, results are invisible. Track intentional actions you control.`,
      action: 'Write your Recommitment Statement: "I am rebuilding [what] because [why] and I commit to [one daily action] regardless of how I feel." Sign and date it.',
    },
    {
      num: 4, title: 'From Noise\nto Order', sub: 'PILLAR 4 — Reform Your Environment',
      body: `Ezra restructured the people's associations. No matter how strong your conviction, you cannot sustain growth in an environment that continuously drains you.\n\nYour environment includes physical space, social circle, information diet, schedule structure, and energy ecosystem.\n\nReforming Your Environment:\n1. Physical Space: Create a space dedicated to rebuilding work. Clean it, organize it, make it inviting.\n2. Social Environment: Spend time with people who build, not drain. You rise or fall to the level of your closest company.\n3. Information Environment: Every media piece shapes your beliefs and expectations.\n4. Time Structure: Build a consistent daily schedule protecting your rebuilding time.\n5. Accountability Structure: Tell one trusted person about your rebuild and let them ask hard questions.`,
      action: 'Make one change in each of three environments this week: physical, social, and information. Write what you changed and track the effect.',
    },
    {
      num: 5, title: 'From Pressure\nto Power', sub: 'PILLAR 5 — Reignite Your Faith and Fire',
      body: `When the temple foundation was laid, Ezra led the people in worship. They praised — not because it was finished, but because they had started again. They celebrated the beginning.\n\nRecognize that the pressure you are under is not destroying you. It is developing you.\n\nGod uses pressure to reveal power. A diamond is coal that refused to quit under pressure. Muscle grows through resistance. Character is forged in fire.\n\nReigniting Your Fire:\n1. Celebrate Your Courage: You are still here, still showing up. That is everything.\n2. Reframe the Pressure: Ask: "What is this pressure developing in me that ease never could?"\n3. Return to Gratitude: Acknowledge what remains after what was lost.\n4. Find Community: Rebuilding alone is inefficient. Learn from those who rebuilt before you.\n5. Remember Why You Started: Return to your core purpose.`,
      action: 'Write three things you are grateful for that remain. Write one area where pressure has made you stronger. Read these daily for 21 days.',
    },
  ];

  let pgNum = 5;
  for (const p of pillars) {
    const pg = doc.addPage([PW, PH]);
    let y = T.chapterOpener(pg, { num: p.num, title: p.title, subtitle: p.sub, accent, fonts });
    y -= 8;
    y = T.wrap(pg, p.body, fonts.R, 9.8, T.T.dark, 60, y, PW - 120, 15.5);
    if (y > 115) { y -= 10; T.actionBox(pg, p.action, accent, fonts, y); }
    T.decoratePage(pg, 'EZRA REBUILD MINDSET', pgNum++, fonts);
  }

  // FINAL
  const pF = doc.addPage([PW, PH]);
  pF.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: accent });
  pF.drawRectangle({ x: 0, y: PH - 4, width: PW, height: 4, color: T.T.black });
  pF.drawRectangle({ x: 0, y: 0, width: PW, height: 4, color: T.T.black });
  pF.drawText('THE EZRA STANDARD', { x: 60, y: PH - 90, size: 30, font: fonts.B, color: T.T.white });
  pF.drawText('Rising to Rebuild', { x: 60, y: PH - 122, size: 18, font: fonts.It, color: rgb(0.8, 0.95, 0.88) });
  pF.drawRectangle({ x: 60, y: PH - 138, width: 300, height: 2.5, color: T.T.white });
  let fy = PH - 180;
  fy = T.wrap(pF, `Ezra didn't just raise a city — he raised a standard.\n\nHe rebuilt a people's relationship with truth. He restored their sense of identity, worship, community, and mission.\n\nThe Ezra Standard: do not wait until conditions are perfect to rebuild. Begin with what you have, where you are, with who you are becoming.\n\nRise. Not just to rebuild what was, but to become who you were always meant to be — renewed in mind, refined in conviction, and reborn in purpose.\n\n"If your world has fallen apart, it's not over — it's under construction. You are not behind time; you are being rebuilt for your appointed time."\n\n— Zeki Ubor`, fonts.R, 12, T.T.white, 60, fy, PW - 120, 20);
  T.decoratePage(pF, 'EZRA REBUILD MINDSET', pgNum++, fonts);

  const pA = doc.addPage([PW, PH]);
  T.aboutPage(pA, { accent, fonts });
  T.decoratePage(pA, 'EZRA REBUILD MINDSET', pgNum, fonts);

  const bytes = await doc.save();
  const out1 = path.join(__dirname, '..', 'public', 'documents', 'a-free-guide-to-rebuilding.pdf');
  const out2 = path.join(__dirname, '..', 'public', 'documents', 'the-ezra-rebuild-mindset.pdf');
  fs.writeFileSync(out1, bytes);
  fs.writeFileSync(out2, bytes);
  console.log(`✅ a-free-guide-to-rebuilding.pdf & the-ezra-rebuild-mindset.pdf — ${(bytes.length / 1024).toFixed(1)} KB`);
}

run().catch(e => { console.error('❌', e); process.exit(1); });
