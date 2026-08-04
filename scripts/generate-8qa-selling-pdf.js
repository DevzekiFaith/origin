const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const T = require('./ebook-template');

async function run() {
  const doc = await PDFDocument.create();
  const fonts = await T.embedFonts(doc);
  const accent = rgb(0.60, 0.08, 0.14); // Deep Crimson
  const PW = 612, PH = 792;

  const p1 = doc.addPage([PW, PH]);
  await T.cover(p1, {
    title: '8 Q&A TO\nSELLING',
    subtitle: 'For Those Ready to Share Their Unique Value.\nArticulate your worth and ascend into the elite zone of singular contribution.',
    author: 'Zeki Ubor', accent, fonts,
  });

  const p2 = doc.addPage([PW, PH]);
  T.copyrightPage(p2, {
    title: '8 Q&A to Selling',
    author: 'Zeki Ubor',
    dedication: 'To those who have spent years serving at full capacity yet remained invisible to the premium market —\nThis book is your blueprint for being found, valued, and paid accordingly.',
    accent, fonts,
  });

  const p3 = doc.addPage([PW, PH]);
  T.tocPage(p3, {
    accent, fonts,
    chapters: [
      { num: 'INTRO',  title: 'The Commodity Trap & The Strategic Exchange',    pg: 4  },
      { num: 'Q. 1',   title: 'What problem do you solve the market cannot ignore?', pg: 5 },
      { num: 'Q. 2',   title: 'Who is your ideal high-value client?',           pg: 6  },
      { num: 'Q. 3',   title: 'What makes your offer categorically different?', pg: 7  },
      { num: 'Q. 4',   title: 'How do you communicate your value precisely?',   pg: 8  },
      { num: 'Q. 5',   title: 'How do you attract clients instead of chasing?', pg: 9  },
      { num: 'Q. 6',   title: 'How do you price for premium positioning?',      pg: 10 },
      { num: 'Q. 7',   title: 'How do you build momentum and scalability?',     pg: 11 },
      { num: 'Q. 8',   title: 'How do you sustain authority and trust?',        pg: 12 },
      { num: 'FINAL',  title: 'Your Market Authority Blueprint',                pg: 13 },
      { num: 'AUTHOR', title: 'About the Author',                               pg: 14 },
    ],
  });

  const p4 = doc.addPage([PW, PH]);
  T.quotePage(p4, {
    quote: 'The marketplace is waiting — not for perfection, but for authenticity. What will you bring to it?',
    attribution: 'Zeki Ubor — 8 Q&A to Selling',
    accent, fonts,
  });

  const qas = [
    {
      num: 1, title: 'Q1: What problem\ndo you solve?', sub: 'The marketplace never pays for hours worked; it pays for clarity of outcome.',
      body: `The first question of premium positioning is deceptively simple: What problem do you solve that the market cannot ignore?\n\nMost professionals answer with activities: "I do graphic design." "I offer consulting." "I write code." These are not answers — they are job descriptions. The market does not pay for activities; it pays for outcomes.\n\nTranslating Activities into Outcomes:\n• "I do graphic design" → "I transform unrecognized brands into premium visual experiences that attract higher-value clients."\n• "I offer consulting" → "I identify invisible revenue leaks in your operations and plug them within 90 days."\n• "I write code" → "I build systems that save teams 20+ hours per week and scale without adding headcount."\n\nThe Specificity Principle: The more precisely you name the problem you solve, the more magnetic your positioning becomes. Vague positioning attracts vague clients and vague prices.\n\nNiche vs. Narrow: Going deep does not mean limiting your market — it means becoming the obvious authority in a specific domain, then expanding from a position of acknowledged mastery.`,
      action: 'Rewrite your professional description as an outcome statement: "I help [specific who] achieve [specific outcome] by [your unique method]. Without my help, they typically [face specific painful consequence]."',
    },
    {
      num: 2, title: 'Q2: Who is your\nideal high-value client?', sub: 'Serve those who are serious enough to invest in transformation.',
      body: `Not every client is worth serving. This is not arrogance — it is strategic wisdom. The most successful professionals are fanatically clear about who they serve best and who they serve poorly.\n\nThe High-Value Client Profile:\n1. They have a painful, urgent, recognized problem. They are searching for a solution, not just exploring.\n2. They have the resources to invest in a real solution. Not every client with a problem can afford your premium offer.\n3. They value outcomes over price. They ask "What will this deliver?" before "What does this cost?"\n4. They have upside — their success creates credibility and referrals for you.\n5. They communicate clearly and respect your expertise.\n\nThe Client Clarity Exercise: Think of your top 3 best clients — the ones who paid well, trusted you, got results, and referred others. Describe their characteristics in detail. Then describe the clients you never want again.\n\nYour ideal client profile lives in the space between these two extremes.`,
      action: 'Write a one-page Ideal Client Profile: demographics, psychographics, pain points, purchasing behavior, and what makes them easy and profitable to serve.',
    },
    {
      num: 3, title: 'Q3: What makes\nyour offer different?', sub: 'Differentiation is not a feature — it is a strategy.',
      body: `In a crowded market, similarity is the enemy. Differentiation is not just being different for its own sake — it is being different in ways that matter deeply to your target client.\n\nThe Three Levels of Differentiation:\n\nLevel 1 — What You Offer: Your service category. Least durable since it is easily copied.\n\nLevel 2 — How You Deliver: Your process, methodology, speed, access, or experience. More durable because execution is harder to replicate.\n\nLevel 3 — Why You Exist: Your philosophy, origin story, and unique perspective. Most powerful because it cannot be copied.\n\nThe Unique Mechanism: Name your process or framework. "The 8 Q&A Selling Framework" is more authoritative than "my consulting process." Named methodologies signal authority.\n\nYour origin story is also a differentiator: Why do you do this work? What did you discover that gives you an irreplaceable perspective?`,
      action: 'Identify your three-level differentiation. Name your unique methodology or approach. Write a 3-sentence Differentiation Statement combining all three levels.',
    },
    {
      num: 4, title: 'Q4: How do you\ncommunicate value?', sub: 'Precision messaging cuts through digital noise.',
      body: `Great value communicated poorly remains invisible. The ability to articulate value clearly and with emotional resonance is among the highest-leverage skills in the modern economy.\n\nThe Value Communication Stack:\n1. The Hook (1 sentence): Captures attention by naming the outcome and audience.\n2. The Problem (2-3 sentences): Vividly describes the painful reality your client currently lives in.\n3. The Solution (2-3 sentences): Introduces you and your unique mechanism.\n4. The Proof (1-2 sentences): Concrete evidence — results, numbers, specific outcomes.\n5. The Call to Action (1 sentence): Clear, low-friction next step.\n\nThe Emotional Logic Principle: People make decisions emotionally and justify them logically. Connect emotionally first before presenting the logical case.\n\nChannels Matter: Premium clients read long-form content, listen to focused podcasts, and engage with thoughtful email sequences. Show up where they go to learn.`,
      action: 'Write your complete Value Communication Stack for one service. Test it on one person from your target audience this week and observe their response.',
    },
    {
      num: 5, title: 'Q5: How do you\nattract clients?', sub: 'Inbound authority pulls premium clients toward you.',
      body: `The amateur chases clients. The authority attracts them. The shift from outbound desperation to inbound authority is one of the most transformative transitions in a professional career.\n\nThe Attraction Flywheel:\n1. Teach Publicly: Share your best thinking generously. The more you give, the more authority you build. Teach everything you know — charge for implementation.\n2. Demonstrate Results: Case studies, testimonials, before-and-after narratives. Show the transformation.\n3. Build a Content Archive: Blog posts, LinkedIn articles, podcasts, video — every piece is an asset that attracts clients while you sleep.\n4. Own a Community: Build or participate in communities where your ideal clients gather.\n5. Strategic Partnerships: Partner with professionals who serve your ideal client without competing with you.\n\nThe Trust Ladder: Awareness → Interest → Trust → Purchase → Loyalty.`,
      action: 'Choose one content channel (LinkedIn, blog, podcast, YouTube). Commit to publishing one piece of valuable content per week for 90 days.',
    },
    {
      num: 6, title: 'Q6: How do you\nprice for premium?', sub: 'Premium pricing is not arrogance — it is positioning.',
      body: `Price is a signal. A low price signals low value, low confidence, and low selectivity. A premium price signals expertise, results, and finite capacity.\n\nWhy Premium Pricing Works:\n• Clients who pay premium invest more seriously in implementation — they get better results.\n• Better results generate better testimonials and referrals — attracting more premium clients.\n• Premium fees allow you to serve fewer clients with more focus and care.\n• Higher income allows you to invest in your own growth — creating a virtuous cycle.\n\nThe Premium Pricing Framework:\n1. Anchor to Outcomes: Price based on the value of the outcome delivered, not hours invested.\n2. Package, Don't Itemize: Package services into clear transformation offers.\n3. Remove the Cheapest Option: Removing low-price tiers often increases total revenue.\n4. Raise Prices Incrementally: Increase prices until you encounter genuine market resistance.\n\nYou cannot charge premium prices if you do not believe your work is worth premium prices.`,
      action: 'Calculate: what is the monetary or strategic value of the outcome you deliver to your ideal client? Price your premium offer at a fraction of that total value.',
    },
    {
      num: 7, title: 'Q7: How do you\nbuild momentum?', sub: 'The Physics of Scalable Value.',
      body: `Momentum in business compounds. Early weeks are the hardest — like pushing a boulder uphill. Once the boulder crests and moves downhill on its own, the physics change dramatically.\n\nThe 3 Drivers of Business Momentum:\n1. Client Success: Nothing generates momentum like clients achieving exceptional results. Make client success your obsession.\n2. Consistent Visibility: Inconsistent presence creates inconsistent leads. Show up consistently.\n3. Systematic Referral Generation: Build referral requests into your client journey as a natural next step.\n\nBuilding Scalability:\n• Document your processes so they can be delegated.\n• Create productized services that do not require full customization for every client.\n• Build digital products — courses, frameworks, tools — that serve many simultaneously.\n• Train others in your methodology who can extend your reach.`,
      action: 'Identify one element of your client delivery process you can document and potentially delegate or productize this month.',
    },
    {
      num: 8, title: 'Q8: How do you\nsustain authority?', sub: 'Trust is built drop by drop — lost in buckets.',
      body: `Authority is not a destination — it is a standard you maintain. The professionals who sustain premium positioning over years understand that trust is the ultimate currency.\n\nThe Pillars of Sustained Authority:\n1. Deliver Consistently: The most powerful marketing is delivering what you promised, exactly as promised, every time.\n2. Evolve Publicly: Share your learning journey. Thought leaders who update their thinking publicly demonstrate intellectual honesty and growth.\n3. Protect Your Positioning: Turn down misaligned clients. Maintain your price. Do not compete on discounts.\n4. Invest in Relationships: Authority exists in the minds and conversations of others. Invest in relationships relentlessly.\n5. Produce Long-Form IP: Books, signature courses, research reports — permanent assets that generate authority for years.\n\nPremium positioning is a 5-to-10-year strategy, not a 90-day tactic. Play the long game.`,
      action: 'Identify one long-term authority asset you will commit to building over the next 12 months — a book, a signature course, a research project, or a podcast series.',
    },
  ];

  let pgNum = 5;
  for (const q of qas) {
    const pg = doc.addPage([PW, PH]);
    let y = T.chapterOpener(pg, { num: q.num, title: q.title, subtitle: q.sub, accent, fonts });
    y -= 8;
    y = T.wrap(pg, q.body, fonts.R, 9.8, T.T.dark, 60, y, PW - 120, 15.5);
    if (y > 115) { y -= 10; T.actionBox(pg, q.action, accent, fonts, y); }
    T.decoratePage(pg, '8 Q&A TO SELLING', pgNum++, fonts);
  }

  // FINAL — MARKET AUTHORITY BLUEPRINT
  const pF = doc.addPage([PW, PH]);
  pF.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: T.T.black });
  pF.drawRectangle({ x: 0, y: PH - 4, width: PW, height: 4, color: accent });
  pF.drawText('YOUR MARKET', { x: 60, y: PH - 90, size: 36, font: fonts.B, color: T.T.white });
  pF.drawText('AUTHORITY BLUEPRINT', { x: 60, y: PH - 132, size: 28, font: fonts.B, color: accent });
  pF.drawRectangle({ x: 60, y: PH - 148, width: 400, height: 2.5, color: accent });
  let fy = PH - 190;
  const steps = [
    ['01', 'Define the precise problem you solve and for whom.'],
    ['02', 'Craft your outcome-based positioning statement.'],
    ['03', 'Identify your top 5 ideal client characteristics.'],
    ['04', 'Name your unique methodology or framework.'],
    ['05', 'Build your 90-day content visibility plan.'],
    ['06', 'Set your premium price anchored to outcome value.'],
    ['07', 'Deliver exceptional results — make client success obsessive.'],
    ['08', 'Build one long-term authority asset this year.'],
  ];
  for (const [num, step] of steps) {
    pF.drawText(num, { x: 60, y: fy, size: 12, font: fonts.B, color: accent });
    pF.drawText(step, { x: 96, y: fy, size: 11, font: fonts.R, color: T.T.white });
    fy -= 28;
  }
  T.decoratePage(pF, '8 Q&A TO SELLING', pgNum++, fonts);

  const pA = doc.addPage([PW, PH]);
  T.aboutPage(pA, { accent, fonts });
  T.decoratePage(pA, '8 Q&A TO SELLING', pgNum, fonts);

  const bytes = await doc.save();
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'documents', '8-qa-to-selling.pdf'), bytes);
  console.log(`✅ 8-qa-to-selling.pdf — ${(bytes.length / 1024).toFixed(1)} KB`);
}

run().catch(e => { console.error('❌', e); process.exit(1); });
