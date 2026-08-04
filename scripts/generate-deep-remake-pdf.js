const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const T = require('./ebook-template');

async function run() {
  const doc = await PDFDocument.create();
  const fonts = await T.embedFonts(doc);
  const accent = rgb(0.82, 0.60, 0.10); // Warm gold
  const PW = 612, PH = 792;

  // COVER
  const p1 = doc.addPage([PW, PH]);
  await T.cover(p1, {
    title: 'DEEP\nRE-MAKE',
    subtitle: 'Redefining yourself. Reclaiming your power.\nBreak free from limiting beliefs and societal labels.',
    author: 'Zeki Ubor', accent, fonts,
  });

  // COPYRIGHT
  const p2 = doc.addPage([PW, PH]);
  T.copyrightPage(p2, {
    title: 'Deep Re-Make',
    author: 'Zeki Ubor',
    dedication: 'To the visionaries, dreamers, and doers —\nMay you always find your market and may your value be recognized.',
    accent, fonts,
  });

  // TOC
  const p3 = doc.addPage([PW, PH]);
  T.tocPage(p3, {
    accent, fonts,
    chapters: [
      { num: 'INTRO',  title: 'As You Think, So You Become',               pg: 4  },
      { num: 'CH. 1',  title: 'The Seeds of Thought: Personal Tokenism',   pg: 5  },
      { num: 'CH. 2',  title: 'Weeding Out Limiting Beliefs',              pg: 6  },
      { num: 'CH. 3',  title: 'Cultivating a Growth Mindset',              pg: 7  },
      { num: 'CH. 4',  title: 'The Law of Design: Architect Your Life',    pg: 8  },
      { num: 'CH. 5',  title: 'Harnessing Discipline & Daily Habits',      pg: 9  },
      { num: 'CH. 6',  title: 'Expanding Your Horizons: Vision & Purpose', pg: 10 },
      { num: 'CH. 7',  title: 'Overcoming Fear & Breaking Comfort Zones',  pg: 11 },
      { num: 'FINAL',  title: 'Becoming a Framer — Your Legacy',           pg: 12 },
      { num: 'AUTHOR', title: 'About the Author',                          pg: 13 },
    ],
  });

  // QUOTE
  const p4 = doc.addPage([PW, PH]);
  T.quotePage(p4, {
    quote: 'Who you are becoming is far more important than what you are currently achieving.',
    attribution: 'Zeki Ubor — Deep Re-Make',
    accent, fonts,
  });

  const chaps = [
    {
      num: 1, title: 'The Seeds\nof Thought', sub: 'What Is Personal Tokenism?',
      body: `James Allen wrote: "A man is literally what he thinks, his character being the complete sum of all his thoughts."\n\nPersonal tokenism occurs when we allow narrow roles — the "problem solver," the "reliable employee," the "struggling artist" — to define our entire identity and behavior. While these roles may seem comforting, they confine us to cycles of underachievement and self-doubt.\n\nSigns of Personal Tokenism:\n1. Living Within Labels: Defining yourself solely by a single role or past event.\n2. Self-Imposed Limits: Believing you're not capable of achieving beyond previous records.\n3. Seeking Validation Over Fulfillment: Basing your worth entirely on external approval.\n\nThe good news: every thought is a seed, and you choose what to plant. Your mind is the most fertile farmland available to you — every thought, repeated consistently, grows into reality.`,
      action: 'Observe your inner dialogue today. For every negative belief you catch, write an empowering counter-belief alongside it. Do this for one full week.',
    },
    {
      num: 2, title: 'Weeding Out\nLimiting Beliefs', sub: 'Breaking Free From What Holds You Back',
      body: `A gardener knows that a healthy crop requires removing weeds, not just planting seeds. In the garden of your mind, limiting beliefs are the weeds.\n\nJames Allen: "You are today where your thoughts have brought you; you will be tomorrow where your thoughts take you."\n\nHow to Break Limiting Beliefs:\n\nStep 1 — Challenge the Belief: Ask, "What evidence supports this? Is it helping or hindering me?"\n\nStep 2 — Replace the Belief: Replace "I'm not good enough" with "I am constantly learning and growing." Not as denial of reality, but as a chosen trajectory.\n\nStep 3 — Reinforce the New Belief: Use daily affirmations, visualization, and small wins to cement new mental programming.\n\nRemember: The mind cannot hold opposing beliefs about the same subject simultaneously with equal strength. Crowd out the old with the new, consistently.`,
      action: 'List three beliefs currently limiting your growth. For each, write its opposite — then find one piece of evidence from your own life that supports the empowering version.',
    },
    {
      num: 3, title: 'Cultivating a\nGrowth Mindset', sub: 'Building the Mental Garden of Your Future',
      body: `Jim Rohn: "Success is something you attract by the person you become."\n\nBreaking limiting beliefs is only the beginning. True transformation comes when you intentionally cultivate thoughts that empower you to grow into the person your goals require.\n\nGrowth-Oriented Mindset Principles:\n\n1. Embrace the Power of "Yet": Instead of "I can't do this," say "I can't do this yet." This single word keeps the door of possibility open.\n\n2. Focus on Process Over Perfection: Celebrate effort and daily progress. Perfection is a destination that moves. Progress is always available now.\n\n3. Learn From Failure: Setbacks provide feedback that guides you closer to what actually works. Edison didn't fail 10,000 times — he found 10,000 ways that didn't work, until he found the one that did.\n\n4. Surround Yourself With Growth-Minded People: You are the average of the five people you spend the most time with. Choose deliberately.\n\n5. Feed Your Mind Daily: Every day without intentional growth is a day of subtle, gradual decay.`,
      action: 'Identify three "yet" statements for beliefs you currently hold about yourself. Write them out and post them somewhere you will see them every morning.',
    },
    {
      num: 4, title: 'The Law\nof Design', sub: 'Becoming the Architect of Your Life',
      body: `Imagine standing before a blank canvas with every color at your disposal. This is your life. The canvas is always there. The only question is who is holding the brush.\n\nJim Rohn: "Your life does not get better by chance; it gets better by change."\n\nKey Steps to Design Your Life:\n\n1. Define Your Purpose: Identify your core values and what makes you feel fully alive.\n\n2. Create an Inspiring Vision: Map your ideal outcomes across Career, Relationships, Health, and Impact.\n\n3. Set SMART Actionable Goals: Specific, Measurable, Achievable, Relevant, Time-bound.\n\n4. Build Reverse Timelines: Start at your vision and work backward to today.\n\n5. Review and Refine Weekly: The architect updates the blueprint as conditions change. So must you.\n\nYour life will be designed by someone — by your choices, by society, or by default. The only question is whether you are the architect or the accident.`,
      action: 'Write your 5-year vision in vivid detail across four domains: Career & Finances, Relationships, Health, and Purpose/Impact. Then identify one action you can take today.',
    },
    {
      num: 5, title: 'Harnessing\nDiscipline', sub: 'Daily Habits That Shape Your Future',
      body: `Jim Rohn: "Discipline is the bridge between goals and accomplishment."\n\nBuilding Discipline:\n\n• Start Small: 5 minutes of consistent daily practice compounds into transformation. Atomic habits become foundational.\n\n• Habit Stacking: Attach new habits to existing routines. "After I brew my morning coffee, I will read 10 pages."\n\n• The Compound Effect: Reading 10 pages daily equals 12 books a year. Writing 300 words daily equals two books in three years. Small, done consistently, is never small.\n\n• Accountability Structure: Share commitments with someone who will ask you the hard questions.\n\n• Environment Design: Make the right behaviors easy and the wrong behaviors difficult. Your environment shapes your habits more powerfully than your willpower.\n\nDiscipline is not punishment. Discipline is the highest form of self-respect — proof that you believe your future is worth protecting today.`,
      action: 'Choose one new habit using habit stacking. Write the trigger, the habit, and the reward. Track it daily for 21 consecutive days.',
    },
    {
      num: 6, title: 'Expanding\nYour Horizons', sub: 'The Power of Vision and Purpose',
      body: `Vision is the ability to see a reality that does not yet exist — and to act as if it already does.\n\nPurpose answers "Why?" Vision answers "What?" Strategy answers "How?"\n\nExpanding Your Horizons:\n\n1. Read Outside Your Industry: The most transformative ideas come from cross-pollination. A farmer's strategy inspires a business model. A musician's discipline transforms an athlete.\n\n2. Travel — Physically or Mentally: New environments create new neural pathways. If travel isn't available, documentaries, conversations with different people, and global perspectives serve the same function.\n\n3. Upgrade Your Questions: The quality of your life is determined by the quality of the questions you habitually ask. "Why does this always happen to me?" vs. "What can I learn from this and how can I use it?"\n\n4. Expand Your Circle of Competence: Deliberately learn adjacent skills to your primary expertise.\n\n5. Serve Something Larger: The biggest expansions in human history came from people committed to something beyond themselves.`,
      action: 'This week, have one conversation with someone at least 10 years ahead of you in a domain you want to grow in. Prepare 3 specific questions before you meet.',
    },
    {
      num: 7, title: 'Overcoming Fear\n& Building Resilience', sub: 'Rising Stronger Through Every Storm',
      body: `James Allen: "He who has conquered doubt and fear has conquered failure."\n\nFear wears many masks: perfectionism, procrastination, over-research, perpetual planning, withdrawal from risk. Each mask has the same effect — it keeps you from the life you are capable of living.\n\nFear Dismantled:\n• Name the Fear: Vague fear is paralyzing. Specific fear is manageable. Write it out.\n• Examine the Worst Case: What is the absolute worst realistic outcome? Would you survive it? Could you recover? Almost always — yes.\n• Take One Brave Step: Courage is not the absence of fear. It is taking action despite fear.\n\nResilience — Rising Stronger:\n• Reframe Adversity: Every pressure reveals what you are made of. View setbacks as assignments for character development.\n• Emotional Regulation: Deep breathing, journaling, and constructive reflection build the infrastructure of resilience.\n• Community: Resilient people are rarely isolated. They belong to communities that hold them when they are weak.\n\nYour greatest growth will come from exactly the season you are most tempted to quit.`,
      action: 'Identify one fear currently limiting you. Write: what you fear, the worst realistic outcome, and one small brave step you will take within the next 48 hours.',
    },
  ];

  let pgNum = 5;
  for (const ch of chaps) {
    const pg = doc.addPage([PW, PH]);
    let y = T.chapterOpener(pg, { num: ch.num, title: ch.title, subtitle: ch.sub, accent, fonts });
    y -= 8;
    y = T.wrap(pg, ch.body, fonts.R, 9.8, T.T.dark, 60, y, PW - 120, 15.5);
    if (y > 115) { y -= 10; T.actionBox(pg, ch.action, accent, fonts, y); }
    T.decoratePage(pg, 'DEEP RE-MAKE', pgNum++, fonts);
  }

  // FINAL PAGE
  const pF = doc.addPage([PW, PH]);
  pF.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: T.T.white });
  pF.drawRectangle({ x: 0, y: PH - 88, width: PW, height: 88, color: T.T.black });
  pF.drawRectangle({ x: 0, y: PH - 4, width: PW, height: 4, color: accent });
  pF.drawText('BECOMING A FRAMER', { x: 60, y: PH - 50, size: 24, font: fonts.B, color: T.T.white });
  pF.drawText('Shaping Your World & Building Others', { x: 60, y: PH - 76, size: 12, font: fonts.It, color: T.T.rule });
  let fy = PH - 128;
  fy = T.wrap(pF, `A Framer is someone who doesn't just follow the blueprint — they create it. They set the foundation, erect the structure, and build a future that empowers themselves and others.\n\nTraits of a Framer:\n• Clarity of Vision: Sees the finished structure before a single brick is laid.\n• Courage in Action: Begins before conditions are perfect, knowing perfection is built through iteration.\n• Empathy & Rapport: Understands that the greatest structures serve people, not egos.\n• System Consistency: Returns to the blueprint daily, measuring progress and adjusting course.\n\nGrowth is a continuous journey. Jim Rohn emphasized: "Formal education will make you a living; self-education will make you a fortune."\n\nYour Deep Re-Make is not a moment. It is a movement — a daily recommitment to becoming more than you were yesterday.\n\nAs James Allen stated: "The dreamers are the saviors of the world."\n\nDream big, act boldly, and align your daily efforts with the life you truly want to live. Your journey is your legacy. Build it well.`, fonts.R, 10.5, T.T.dark, 60, fy, PW - 120, 17);
  T.decoratePage(pF, 'DEEP RE-MAKE', pgNum++, fonts);

  // ABOUT
  const pA = doc.addPage([PW, PH]);
  T.aboutPage(pA, { accent, fonts });
  T.decoratePage(pA, 'DEEP RE-MAKE', pgNum, fonts);

  const bytes = await doc.save();
  const out = path.join(__dirname, '..', 'public', 'documents', 'deep-remake.pdf');
  fs.writeFileSync(out, bytes);
  console.log(`✅ deep-remake.pdf — ${(bytes.length / 1024).toFixed(1)} KB`);
}

run().catch(e => { console.error('❌', e); process.exit(1); });
