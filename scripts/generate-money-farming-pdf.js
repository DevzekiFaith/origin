const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const T = require('./ebook-template');

async function run() {
  const doc = await PDFDocument.create();
  const fonts = await T.embedFonts(doc);
  const accent = T.T.white; // gold-ish using white for money theme, override below
  const gold = require('pdf-lib').rgb(0.85, 0.64, 0.10);
  const green = require('pdf-lib').rgb(0.06, 0.36, 0.18);
  const PW = 612, PH = 792;
  const coverImg = path.join(__dirname, '..', 'public', 'cover_money_farming.png');

  // ── COVER (3D image cover) ───────────────────────────────────────────────
  const p1 = doc.addPage([PW, PH]);
  await T.cover(p1, { title: 'MONEY\nFARMING', subtitle: 'Stop Chasing Money. Start Farming It.', author: 'Zeki Ubor', accent: gold, fonts, coverImage: coverImg, doc });

  // ── COPYRIGHT ────────────────────────────────────────────────────────────
  const p2 = doc.addPage([PW, PH]);
  T.copyrightPage(p2, {
    title: 'Money Farming: The 7 Principles for Planting, Growing, and Harvesting Wealth',
    author: 'Zeki Ubor',
    dedication: 'To every dreamer who has worked hard yet wondered why financial abundance seemed far away.\nMay this book help you discover that wealth is not a mystery — it is a harvest.',
    accent: gold, fonts,
  });

  // ── TOC ──────────────────────────────────────────────────────────────────
  const p3 = doc.addPage([PW, PH]);
  T.tocPage(p3, {
    accent: gold, fonts,
    chapters: [
      { num: 'INTRO',  title: "The Farmer's Secret",                           pg: 4  },
      { num: 'CH. 1',  title: 'Understanding Money Farming',                   pg: 5  },
      { num: 'CH. 2',  title: 'Preparing Your Financial Soil',                 pg: 6  },
      { num: 'CH. 3',  title: 'Planting Wealth Seeds',                         pg: 7  },
      { num: 'CH. 4',  title: "Nurturing Growth — The Bamboo Farmer's Test",   pg: 8  },
      { num: 'CH. 5',  title: 'Removing Financial Weeds',                      pg: 9  },
      { num: 'CH. 6',  title: 'Harvesting Wealth',                             pg: 10 },
      { num: 'CH. 7',  title: 'Replanting for Generational Wealth',            pg: 11 },
      { num: 'SUMM.',  title: 'The 7 Principles — Summary',                    pg: 12 },
      { num: 'DECL.',  title: 'The Money Farming Declaration',                  pg: 13 },
      { num: 'AUTHOR', title: 'About the Author',                              pg: 14 },
    ],
  });

  // ── INTRO QUOTE ──────────────────────────────────────────────────────────
  const p4 = doc.addPage([PW, PH]);
  T.quotePage(p4, {
    quote: "Wealth is not something you chase. Wealth is something you cultivate.",
    attribution: 'Zeki Ubor — Money Farming',
    accent: gold, fonts,
  });

  // ── CHAPTERS ─────────────────────────────────────────────────────────────
  const chapters = [
    {
      num: 1, title: 'Understanding\nMoney Farming', sub: 'The Man Who Sold His Harvest — Enugu, 2013',
      body: `In 2013, Chinedu worked as a sales representative in Enugu. Every month, his salary arrived. Every month, it disappeared. After seven years of the same cycle, his grandfather — a farmer for fifty years — gave him a revelation.\n\n"Do you know why farmers keep seeds after harvest?"\n"So they can plant next season."\n"That is your problem. Every month you harvest money. Then you eat all your seeds."\n\nChinedu understood: He was not poor because he earned little. He was poor because he consumed everything. A farmer never eats all his harvest — he preserves some for planting.\n\nWealth Is Not Found. It Is Grown. The mangoes on a tree were once invisible. The wealthiest people are not merely earners; they are farmers. They plant ideas, skills, businesses, and relationships — nurturing them until they produce harvests far greater than the original seed.\n\nCase Study — Dangote: Before becoming Africa's richest man, Aliko Dangote started with small trading — relationships, distribution systems, market knowledge. Those seeds multiplied over decades into an empire worth hundreds of billions.\n\nThe Dangerous Lie: Go to school. Get a job. Work hard. Retire. A job pays for your labour. A farm pays for what you cultivated. One creates assets; the other consumes income.`,
      action: 'Track every naira for 7 days. Categorize: Harvest Consumed | Harvest Invested | Seeds Planted. See exactly where your seeds are going.',
    },
    {
      num: 2, title: 'Preparing Your\nFinancial Soil', sub: 'The Harvest That Never Came — Lagos, 2015',
      body: `In 2015, Emeka received a multinational job earning three times his previous salary. Better apartment, newer phone, expensive wardrobe. Yet by month-end, almost nothing remained. Three years later: no investments, no savings, no assets — only a bigger lifestyle.\n\nThe problem was never his income. The problem was his soil. More money entered the same poor financial habits. Poor soil destroys even the best seeds.\n\nMoney Is an Amplifier, Not a Transformer: If discipline exists, money expands it. If confusion exists, money amplifies that too.\n\nThe Four Layers of Financial Soil:\n1. Responsibility — Stop blaming government, employer, or family. Your future may have been influenced by others, but it will not be determined by others.\n2. Awareness — Know exactly what comes in, what goes out, what remains, and what grows.\n3. Vision — Without vision, income becomes pure consumption. Transform spending into strategy.\n4. Character — The habits that manage ₦100,000 are the same habits that will manage ₦1,000,000.`,
      action: 'Financial Soil Audit: Calculate your monthly cash inflow vs. outflow. Identify your top 3 wealth-destroying habits and commit to eliminating one this month.',
    },
    {
      num: 3, title: 'Planting Wealth\nSeeds', sub: 'The Mechanic Nobody Noticed — Port Harcourt, 2012',
      body: `In 2012, Musa worked in a small workshop in Port Harcourt — hidden, stained with engine oil, earning modestly. What nobody saw were the seeds he was planting. Every evening, he studied manuals, watched tutorials, and mastered newer vehicle technologies.\n\nFor years, nobody noticed. Then electronic vehicles flooded the market. While traditional mechanics struggled, Musa had already planted the seeds — customers found him, his income multiplied, and he opened a training center.\n\nThe 5 Wealth Seeds You Can Plant Today:\n• Seed 1 — Skills: Solve ₦5,000,000 problems instead of ₦5,000 problems.\n• Seed 2 — Knowledge: Fertilizer for every other seed; ignorance costs far more than education.\n• Seed 3 — Relationships: Opportunities, mentorship, and partnerships all come through people.\n• Seed 4 — Opportunities: They often arrive dressed as hard work or inconvenience.\n• Seed 5 — Character & Reputation: Trust and integrity attract capital and open closed doors.\n\nThe Law of Seed Multiplication: One maize seed produces multiple cobs. One skill produces income, which buys knowledge, which builds assets, which creates wealth.`,
      action: 'Make 5 columns: Skills, Knowledge, Relationships, Opportunities, Character. List your current seeds. Select 2 to actively plant this month with daily action.',
    },
    {
      num: 4, title: 'Nurturing Growth', sub: "The Bamboo Farmer's Dilemma — Patience & Discipline",
      body: `A farmer planted bamboo seeds and watered the soil daily. A month — nothing. Six months — nothing visible. One year, two, three — still no growth. Neighbors laughed. Yet every morning he watered.\n\nIn the fifth year, the bamboo emerged and grew 90 feet in six weeks. Neighbors called it an overnight success. The farmer knew: the growth began years earlier, beneath the surface.\n\nThe 4 Elements of Nurturing Wealth:\n1. Consistency — Improving 1% daily creates extraordinary compound results over time.\n2. Discipline — Continuing on days when motivation is absent and business is slow.\n3. Learning & Adaptation — Markets evolve; successful wealth builders adapt with them.\n4. Patience — Doing the right things long enough for invisible roots to become visible results.\n\nThe Tailor's Lesson — Ada: Ada sewed garments in Aba for two years with minimal income. Rather than quit, she documented every pattern, refined every stitch, and studied fashion online. By year three, her precision drew clients from Lagos and Abuja. Consistency compounded into a brand.`,
      action: 'Identify one wealth seed you have been nurturing. Write 3 specific daily actions to maintain for 90 days without stopping — then track every single day.',
    },
    {
      num: 5, title: 'Removing\nFinancial Weeds', sub: 'The Farm That Should Have Flourished — Benin City',
      body: `Farmer Okoro had the most fertile land in Benin City — rich soil, good rainfall, quality seed. Yet every harvest disappointed. The problem: weeds were stealing nutrients, water, and sunlight.\n\nThe 6 Destructive Financial Weeds:\n1. Lifestyle Inflation — Increasing expenses at the exact pace of income increases. More money, same emptiness.\n2. Bad Debt — Financing liabilities and paying for past consumption with future income and opportunities.\n3. Procrastination — Opportunities expire while waiting for "perfect conditions."\n4. Fear — Fear of failure buries more dreams than failure itself has ever destroyed.\n5. Comparison — Comparing your Chapter 1 to someone else's Chapter 20.\n6. Lack of Financial Education — Working hard without understanding how money actually multiplies.\n\nQuick Diagnostic: Calculate the real annual cost of each weed in your life. The number is always shocking — and always clarifying.`,
      action: 'Financial Weed Audit: List your habits as Keep, Reduce, or Eliminate. Remove ONE financial weed immediately — one subscription, one bad debt to accelerate, one comparison to drop.',
    },
    {
      num: 6, title: 'Harvesting\nWealth', sub: "Chief Nwosu's Test — The Farmer Who Refused to Celebrate",
      body: `Chief Nwosu's farm produced its largest harvest in history. Yet while everyone expected celebration, Chief Nwosu was already back in the fields preparing new land and purchasing new seeds.\n\n"A harvest is not the end of the journey. A harvest is a test of your wisdom."\n\nThe Difference Between Income and Wealth:\n• Income is what you earn; wealth is what you keep, grow, and own.\n• Income requires continuous effort; assets produce value over time.\n\n5 Ways to Multiply Your Harvest:\n1. Recognizing Non-Cash Harvests — Exposure, relationships, and reputation have real monetary value.\n2. Turning Income into Assets — Businesses, real estate, digital products, intellectual property.\n3. Multiple Income Streams — Salary, consulting, royalties, passive investments.\n4. Strategic Reinvestment — How much of this harvest should be planted again?\n5. Building Systems — Automated operations and platforms that scale without you.\n\nThe Compound Effect: ₦10,000 per month invested at 15% for 10 years exceeds ₦2,750,000. Time is the multiplier.`,
      action: "Create your Harvest Plan. Allocate this month's income: 1. Living Expenses  2. Emergency Savings  3. Asset Multiplication (invest/reinvest into wealth-producing assets).",
    },
    {
      num: 7, title: "Replanting for\nGenerational Wealth", sub: "Pa Eze's Legacy — The True Measure of Wealth",
      body: `When Pa Eze passed away after 40 years as a legendary farmer, his oldest friend said:\n\n"The greatest thing he left behind was what he taught them. How to think, work, save, invest, and build."\n\nThe greatest harvest is not what you leave for people — it is what you leave in people. Riches can disappear in a generation; wisdom endures for centuries.\n\nThe 5 Principles of Replanting Legacy:\n1. Teach What You Know — Intentionally transfer wisdom to children, mentees, and teams.\n2. Build Systems, Not Dependence — Train others so operations thrive without you.\n3. Create Assets That Outlive You — Books, businesses, scholarships, enduring brands.\n4. Build a Legacy of Values — Integrity, discipline, and generosity outlast any amount of money.\n5. Become a Person of Multiplication — Move from "How much can I gather?" to "How much can I grow in others?"\n\nThe Forest Principle: A single tree produces fruit. A forest transforms an entire ecosystem. Build a forest. Become one.`,
      action: 'Write: 1 person you will mentor this year, 1 asset you will build for the next generation, and 1 core value you will actively instil in those around you.',
    },
  ];

  let pgNum = 5;
  for (const ch of chapters) {
    const pg = doc.addPage([PW, PH]);
    let y = T.chapterOpener(pg, { num: ch.num, title: ch.title, subtitle: ch.sub, accent: gold, fonts });
    y -= 10;
    y = T.principleBox(pg, `Principle: ${ch.body.split('\n')[0].substring(0, 90)}…`, gold, fonts, y);
    y -= 6;
    y = T.wrap(pg, ch.body, fonts.R, 9.8, T.T.dark, 60, y, PW - 120, 15.5);
    if (y > 115) { y -= 10; T.actionBox(pg, ch.action, gold, fonts, y); }
    T.decoratePage(pg, 'MONEY FARMING', pgNum++, fonts);
  }

  // ── SUMMARY ──────────────────────────────────────────────────────────────
  const pSum = doc.addPage([PW, PH]);
  const { rgb } = require('pdf-lib');
  pSum.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: T.T.white });
  pSum.drawRectangle({ x: 0, y: PH - 88, width: PW, height: 88, color: T.T.black });
  pSum.drawRectangle({ x: 0, y: PH - 4, width: PW, height: 4, color: gold });
  pSum.drawText('THE 7 PRINCIPLES', { x: 60, y: PH - 44, size: 10, font: fonts.B, color: gold });
  pSum.drawText('SUMMARY', { x: 60, y: PH - 70, size: 26, font: fonts.B, color: T.T.white });
  let sy = PH - 120;
  const principles = [
    ['I',   'Money follows value. Your focus should not be money — focus on the seed that produces it.'],
    ['II',  'A seed cannot overcome poor soil. Prepare better soil before seeking a bigger harvest.'],
    ['III', 'Wealth does not begin with money; it begins with seeds. Plant valuable seeds consistently.'],
    ['IV',  'The greatest rewards belong to those who nurture growth with patience and refuse to quit.'],
    ['V',   'Remove what steals your harvest. Identify and eliminate your financial weeds deliberately.'],
    ['VI',  'Harvest is measured by how much value you create, preserve, and multiply into future harvests.'],
    ['VII', 'True wealth belongs to those whose wisdom and values continue producing harvests after they are gone.'],
  ];
  for (const [num, text] of principles) {
    pSum.drawRectangle({ x: 60, y: sy - 5, width: 30, height: 18, color: gold });
    pSum.drawText(num, { x: 64, y: sy, size: 9.5, font: fonts.B, color: T.T.black });
    sy = T.wrap(pSum, text, fonts.R, 10.5, T.T.dark, 98, sy, PW - 158, 16) - 12;
  }
  T.decoratePage(pSum, 'MONEY FARMING', pgNum++, fonts);

  // ── DECLARATION ──────────────────────────────────────────────────────────
  const pDec = doc.addPage([PW, PH]);
  pDec.drawRectangle({ x: 0, y: 0, width: PW, height: PH, color: T.T.charcoal });
  pDec.drawRectangle({ x: 0, y: PH - 4, width: PW, height: 4, color: gold });
  pDec.drawRectangle({ x: 0, y: 0, width: PW, height: 4, color: gold });
  pDec.drawText('THE MONEY FARMING', { x: 60, y: PH - 80, size: 28, font: fonts.B, color: T.T.white });
  pDec.drawText('DECLARATION', { x: 60, y: PH - 114, size: 28, font: fonts.B, color: gold });
  pDec.drawRectangle({ x: 60, y: PH - 130, width: 300, height: 2.5, color: gold });
  let dy = PH - 170;
  for (const d of [
    'I will not merely earn money. I will create value.',
    'I will not consume every harvest. I will preserve seeds for the future.',
    'I will nurture growth with patience and discipline.',
    'I will remove habits and attitudes that destroy abundance.',
    'I will build assets, not just income.',
    'I will multiply opportunities for myself and others.',
    'I will leave behind wisdom, impact, and lasting legacy.',
  ]) {
    pDec.drawText('—', { x: 60, y: dy, size: 11, font: fonts.B, color: gold });
    pDec.drawText(d, { x: 80, y: dy, size: 11, font: fonts.R, color: T.T.white });
    dy -= 26;
  }
  dy -= 22;
  pDec.drawText('"I am a Money Farmer. True wealth is grown."', { x: 60, y: dy, size: 15, font: fonts.B, color: gold });
  dy -= 55;
  pDec.drawRectangle({ x: 60, y: dy - 55, width: PW - 120, height: 55, color: rgb(0.14, 0.15, 0.17) });
  pDec.drawText('Signature: ________________________________', { x: 76, y: dy - 24, size: 10.5, font: fonts.R, color: T.T.rule });
  pDec.drawText('Date: ________________', { x: 76, y: dy - 44, size: 10.5, font: fonts.R, color: T.T.rule });
  T.decoratePage(pDec, 'MONEY FARMING', pgNum++, fonts);

  // ── ABOUT ─────────────────────────────────────────────────────────────────
  const pA = doc.addPage([PW, PH]);
  T.aboutPage(pA, { accent: gold, fonts });
  T.decoratePage(pA, 'MONEY FARMING', pgNum, fonts);

  const bytes = await doc.save();
  const out = require('path').join(__dirname, '..', 'public', 'documents', 'money-farming.pdf');
  require('fs').writeFileSync(out, bytes);
  console.log(`✅ money-farming.pdf — ${(bytes.length / 1024).toFixed(1)} KB`);
}

run().catch(e => { console.error('❌', e); process.exit(1); });
