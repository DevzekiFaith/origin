const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateMoneyFarmingPDF() {
  const pdfDoc = await PDFDocument.create();
  const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontHelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontHelveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Color Palette — Earthy Green & Gold (farming theme)
  const primaryGreen = rgb(0.07, 0.35, 0.18);   // Deep Forest Green
  const accentGold   = rgb(0.85, 0.65, 0.15);   // Harvest Gold
  const darkCharcoal = rgb(0.12, 0.14, 0.16);
  const textDark     = rgb(0.18, 0.20, 0.22);
  const mutedText    = rgb(0.45, 0.50, 0.55);
  const lightBg      = rgb(0.97, 0.97, 0.95);
  const borderLine   = rgb(0.85, 0.85, 0.82);
  const white        = rgb(1, 1, 1);

  // ── Helper: Word-wrap text ────────────────────────────────────────────────
  const drawWrappedText = (page, text, font, size, color, startX, startY, maxWidth, lineHeight) => {
    const paragraphs = text.split('\n');
    let y = startY;
    for (let para of paragraphs) {
      if (para.trim() === '') { y -= lineHeight * 0.7; continue; }
      const words = para.split(' ');
      let line = '';
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        if (font.widthOfTextAtSize(testLine, size) > maxWidth && i > 0) {
          page.drawText(line.trim(), { x: startX, y, size, font, color });
          line = words[i] + ' ';
          y -= lineHeight;
        } else {
          line = testLine;
        }
      }
      if (line.trim().length > 0) {
        page.drawText(line.trim(), { x: startX, y, size, font, color });
        y -= lineHeight;
      }
    }
    return y;
  };

  // ── Helper: Page header & footer ─────────────────────────────────────────
  const decor = (page, title, pageNum, total) => {
    const { width, height } = page.getSize();
    page.drawLine({ start: { x: 40, y: height - 42 }, end: { x: width - 40, y: height - 42 }, thickness: 0.7, color: borderLine });
    page.drawText(`MONEY FARMING — ${title.toUpperCase()}`, { x: 40, y: height - 34, size: 7.5, font: fontHelveticaBold, color: mutedText });
    page.drawLine({ start: { x: 40, y: 42 }, end: { x: width - 40, y: 42 }, thickness: 0.7, color: borderLine });
    page.drawText('© 2025 Zeki Ubor • The Becoming Institute', { x: 40, y: 27, size: 7.5, font: fontHelvetica, color: mutedText });
    page.drawText(`Page ${pageNum} of ${total}`, { x: width - 85, y: 27, size: 7.5, font: fontHelvetica, color: mutedText });
  };

  const TOTAL_PAGES = 12;

  // ═══════════════════════════════════════════════════════
  // PAGE 1 — COVER
  // ═══════════════════════════════════════════════════════
  const cover = pdfDoc.addPage([612, 792]);
  const { width, height } = cover.getSize();

  // Background
  cover.drawRectangle({ x: 0, y: 0, width, height, color: lightBg });

  // Left green block
  cover.drawRectangle({ x: 0, y: 0, width: width * 0.46, height, color: primaryGreen });

  // Gold accent bar top
  cover.drawRectangle({ x: 0, y: height - 10, width, height: 10, color: accentGold });
  cover.drawRectangle({ x: 0, y: 0,           width, height: 8,  color: accentGold });

  // Title on right side
  cover.drawText('MONEY', { x: 295, y: height - 190, size: 54, font: fontHelveticaBold, color: primaryGreen });
  cover.drawText('FARMING', { x: 295, y: height - 255, size: 54, font: fontHelveticaBold, color: primaryGreen });

  // Subtitle
  cover.drawText('Stop Chasing Money. Start Farming It.', { x: 295, y: height - 295, size: 11.5, font: fontHelveticaOblique, color: accentGold });
  cover.drawText('The 7 Principles for Planting, Growing,', { x: 295, y: height - 318, size: 10, font: fontHelvetica, color: darkCharcoal });
  cover.drawText('and Harvesting Wealth', { x: 295, y: height - 333, size: 10, font: fontHelvetica, color: darkCharcoal });

  // Author badge
  cover.drawRectangle({ x: 295, y: 105, width: 270, height: 75, color: accentGold });
  cover.drawText('ZEKI UBOR', { x: 315, y: 152, size: 22, font: fontHelveticaBold, color: darkCharcoal });
  cover.drawText('THE BECOMING INSTITUTE', { x: 315, y: 130, size: 8.5, font: fontHelveticaBold, color: darkCharcoal });

  // Left block taglines
  cover.drawText('PLANT', { x: 30, y: height - 200, size: 36, font: fontHelveticaBold, color: accentGold });
  cover.drawText('GROW', { x: 30, y: height - 260, size: 36, font: fontHelveticaBold, color: white });
  cover.drawText('HARVEST', { x: 30, y: height - 320, size: 28, font: fontHelveticaBold, color: accentGold });

  cover.drawText('An Official Origin Publication', { x: 40, y: 55, size: 9, font: fontHelveticaBold, color: rgb(0.8, 0.9, 0.85) });
  cover.drawText('www.origin.com.ng', { x: 40, y: 38, size: 8.5, font: fontHelvetica, color: rgb(0.65, 0.8, 0.72) });

  // ═══════════════════════════════════════════════════════
  // PAGE 2 — COPYRIGHT & DEDICATION
  // ═══════════════════════════════════════════════════════
  const p2 = pdfDoc.addPage([612, 792]);
  let y = height - 80;

  p2.drawText('© 2025 Zeki Ubor', { x: 50, y, size: 11, font: fontHelveticaBold, color: darkCharcoal }); y -= 20;
  p2.drawText('Money Farming: The 7 Principles for Planting, Growing, and Harvesting Wealth', { x: 50, y, size: 9.5, font: fontHelveticaOblique, color: textDark }); y -= 16;
  p2.drawText('Author: Zeki Ubor', { x: 50, y, size: 10, font: fontHelvetica, color: textDark }); y -= 16;
  p2.drawText('Publisher: The Becoming Institute', { x: 50, y, size: 10, font: fontHelvetica, color: textDark }); y -= 16;
  p2.drawText('Website: www.origin.com.ng', { x: 50, y, size: 10, font: fontHelvetica, color: textDark }); y -= 40;

  p2.drawText('DEDICATION', { x: 50, y, size: 14, font: fontHelveticaBold, color: accentGold }); y -= 22;
  const ded = 'To every dreamer who has worked hard yet wondered why financial abundance seemed far away.\nMay this book help you discover that wealth is not a mystery — it is a harvest.';
  y = drawWrappedText(p2, ded, fontHelveticaOblique, 10.5, textDark, 50, y, 512, 16); y -= 35;

  p2.drawRectangle({ x: 50, y: y - 28, width: 512, height: 35, color: primaryGreen });
  p2.drawText('INTRODUCTION | The Farmer\'s Secret', { x: 65, y: y - 16, size: 11.5, font: fontHelveticaBold, color: white }); y -= 50;

  const intro = `One morning, a young man stood beside an elderly farmer and asked: "How do I become wealthy?"
The farmer smiled and handed him a handful of seeds.
"I asked about wealth, not farming," said the young man.
The farmer replied: "That is the problem. Most people think wealth and farming are different."
He continued: "You cannot harvest what you never planted. You cannot expect abundance from neglected soil. And you cannot plant today and demand a harvest tomorrow."
The wealthiest people in the world are not merely earners; they are farmers. They plant ideas, skills, businesses, relationships, and investments — nurturing them until they produce harvests far greater than the original seed.
Many people spend their lives chasing money. Few learn how to grow it.
This book introduces a powerful concept: Money Farming — the intentional process of planting value-producing seeds, cultivating opportunities, protecting resources, and harvesting sustainable wealth.
Wealth is not something you chase. Wealth is something you cultivate. Welcome to Money Farming.`;

  y = drawWrappedText(p2, intro, fontHelvetica, 9.5, textDark, 50, y, 512, 14.5);
  decor(p2, 'Copyright & Introduction', 2, TOTAL_PAGES);

  // ═══════════════════════════════════════════════════════
  // PAGE 3 — TABLE OF CONTENTS
  // ═══════════════════════════════════════════════════════
  const p3 = pdfDoc.addPage([612, 792]);
  y = height - 70;

  p3.drawText('TABLE OF CONTENTS', { x: 50, y, size: 18, font: fontHelveticaBold, color: darkCharcoal }); y -= 30;

  const toc = [
    { num: 'Intro',   title: "The Farmer's Secret",                           pg: 'i'  },
    { num: 'Chap 1',  title: "Understanding Money Farming — The Man Who Sold His Harvest", pg: '8'  },
    { num: 'Chap 2',  title: "Preparing Your Financial Soil — The Harvest That Never Came", pg: '13' },
    { num: 'Chap 3',  title: "Planting Wealth Seeds — The Mechanic Nobody Noticed",       pg: '20' },
    { num: 'Chap 4',  title: "Nurturing Growth — The Bamboo Farmer's Dilemma",            pg: '31' },
    { num: 'Chap 5',  title: "Removing Financial Weeds — The Farm That Should Have Flourished", pg: '41' },
    { num: 'Chap 6',  title: "Harvesting Wealth — The Farmer Who Refused to Celebrate",   pg: '51' },
    { num: 'Chap 7',  title: "Replanting for Generational Wealth — Pa Eze's Legacy",      pg: '61' },
    { num: 'Final',   title: "The Money Farming Declaration",                              pg: '70' },
    { num: 'About',   title: "About the Author",                                           pg: '74' },
  ];

  for (const c of toc) {
    p3.drawText(c.num,  { x: 50,  y, size: 10, font: fontHelveticaBold, color: primaryGreen });
    p3.drawText(c.title,{ x: 120, y, size: 10, font: fontHelvetica,     color: textDark      });
    p3.drawText(c.pg,   { x: 535, y, size: 10, font: fontHelveticaBold, color: mutedText     });
    y -= 25;
  }
  decor(p3, 'Contents', 3, TOTAL_PAGES);

  // ═══════════════════════════════════════════════════════
  // PAGE 4 — CHAPTER 1
  // ═══════════════════════════════════════════════════════
  const p4 = pdfDoc.addPage([612, 792]);
  y = height - 70;

  p4.drawRectangle({ x: 50, y: y - 28, width: 512, height: 35, color: primaryGreen });
  p4.drawText('CHAPTER 1 | Understanding Money Farming', { x: 65, y: y - 17, size: 11, font: fontHelveticaBold, color: white }); y -= 52;

  p4.drawText('Principle: Money follows value. Your focus should not be money — your focus', { x: 50, y, size: 9, font: fontHelveticaOblique, color: accentGold }); y -= 13;
  p4.drawText('should be the seed that produces money.', { x: 50, y, size: 9, font: fontHelveticaOblique, color: accentGold }); y -= 22;

  const c1 = `In 2013, Chinedu worked as a sales representative in Enugu. Every month, his salary arrived. Every month, it disappeared. Bills came, friends called, weekends happened — by mid-month the account was nearly empty. After seven years of the same cycle, his grandfather, a farmer for fifty years, gave him a revelation.

"Do you know why farmers keep seeds after harvest?"
"So they can plant next season."
"That is your problem," the old man said. "Every month you harvest money. Then you eat all your seeds."

Chinedu suddenly understood: He was not poor because he earned little. He was poor because he consumed everything. The farmer never eats all his harvest — he preserves some for planting.

Wealth Is Not Found. It Is Grown. A harvest is not found; it is grown. The mangoes on a tree were once invisible. The harvest in a field was once hidden beneath the soil.

The Dangerous Lie We Were Taught: Go to school. Get a good job. Work hard. Retire. A job pays you for your labor; a farm pays you for what you cultivated. One creates assets, the other consumes income.

Case Study — Dangote: Before becoming Africa's richest man, Aliko Dangote started with small trading opportunities — relationships, knowledge, distribution systems, market understanding. Those seeds multiplied over decades into an empire.`;

  y = drawWrappedText(p4, c1, fontHelvetica, 9.5, textDark, 50, y, 512, 14.5); y -= 18;

  p4.drawRectangle({ x: 50, y: y - 4, width: 512, height: 1, color: borderLine }); y -= 16;
  p4.drawText('Action Step: Track every naira for 7 days. Categorize: Harvest Consumed | Harvest Invested | Seeds Planted.', { x: 50, y, size: 9, font: fontHelveticaOblique, color: primaryGreen });
  decor(p4, 'Chapter 1', 4, TOTAL_PAGES);

  // ═══════════════════════════════════════════════════════
  // PAGE 5 — CHAPTER 2
  // ═══════════════════════════════════════════════════════
  const p5 = pdfDoc.addPage([612, 792]);
  y = height - 70;

  p5.drawRectangle({ x: 50, y: y - 28, width: 512, height: 35, color: darkCharcoal });
  p5.drawText('CHAPTER 2 | Preparing Your Financial Soil', { x: 65, y: y - 17, size: 11, font: fontHelveticaBold, color: white }); y -= 52;

  p5.drawText('Principle: A seed cannot overcome poor soil. Prepare better soil before seeking a bigger harvest.', { x: 50, y, size: 9, font: fontHelveticaOblique, color: accentGold }); y -= 22;

  const c2 = `In 2015, Emeka got a multinational job earning three times his previous salary. Better apartment, newer phone, expensive wardrobe. Yet at month end, there was almost nothing left. Three years later: no investments, no savings, no assets — only a bigger lifestyle.

The answer shocked him: The problem was never his income. The problem was his soil. More money entered the same financial habits and lack of direction. Poor soil destroys even the best seeds.

Money Is an Amplifier, Not a Transformer: If discipline exists, money expands discipline. If confusion exists, money expands confusion.

The Four Layers of Financial Soil:
1. Responsibility — Stop blaming government, employer, or family. "My future may have been influenced by others, but it will not be determined by others."
2. Awareness — Know exactly what comes in, what goes out, what remains, and what grows.
3. Vision — Transform spending into strategy. Without vision, income becomes consumption.
4. Character — The habits that manage NGN 100,000 are the same habits that manage NGN 1,000,000.`;

  y = drawWrappedText(p5, c2, fontHelvetica, 9.5, textDark, 50, y, 512, 14.5); y -= 16;
  p5.drawText('Action Step: Financial Soil Audit — Calculate monthly cash inflow vs outflow. Identify top 3 wealth-destroying habits.', { x: 50, y, size: 9, font: fontHelveticaOblique, color: primaryGreen });
  decor(p5, 'Chapter 2', 5, TOTAL_PAGES);

  // ═══════════════════════════════════════════════════════
  // PAGE 6 — CHAPTER 3
  // ═══════════════════════════════════════════════════════
  const p6 = pdfDoc.addPage([612, 792]);
  y = height - 70;

  p6.drawRectangle({ x: 50, y: y - 28, width: 512, height: 35, color: primaryGreen });
  p6.drawText('CHAPTER 3 | Planting Wealth Seeds', { x: 65, y: y - 17, size: 11, font: fontHelveticaBold, color: white }); y -= 52;

  p6.drawText('Principle: Wealth does not begin with money; it begins with seeds. Those who plant valuable seeds enjoy harvests others call luck.', { x: 50, y, size: 9, font: fontHelveticaOblique, color: accentGold }); y -= 22;

  const c3 = `In 2012, a young mechanic named Musa worked in a small workshop in Port Harcourt — hidden, stained with engine oil, earning modestly. What nobody could see were the seeds he was planting.

Every evening after work, he studied manuals, watched video tutorials, and mastered newer vehicle technologies. For years, nobody noticed. Then modern electronic vehicles flooded the market. While traditional mechanics struggled, Musa had already planted the seeds — customers searched for him, his income multiplied, and he eventually opened a full training center.

The 5 Wealth Seeds You Can Plant Today:
• Seed 1 — Skills: Solve NGN 5,000,000 problems instead of NGN 5,000 problems.
• Seed 2 — Knowledge: Fertilizer for every other seed; ignorance is far more expensive than education.
• Seed 3 — Relationships: Opportunities, mentorship, and partnerships all come through people.
• Seed 4 — Opportunities: They often arrive dressed as hard work or inconvenience.
• Seed 5 — Character & Reputation: Trust and integrity attract capital and open closed doors.

The Law of Seed Multiplication: One maize seed produces multiple cobs; one skill produces income, which buys knowledge, which builds assets.`;

  y = drawWrappedText(p6, c3, fontHelvetica, 9.5, textDark, 50, y, 512, 14.5); y -= 16;
  p6.drawText('Action Step: Make 5 columns (Skills, Knowledge, Relationships, Opportunities, Character) — list your seeds and select 2 to plant this month.', { x: 50, y, size: 9, font: fontHelveticaOblique, color: primaryGreen });
  decor(p6, 'Chapter 3', 6, TOTAL_PAGES);

  // ═══════════════════════════════════════════════════════
  // PAGE 7 — CHAPTER 4 & 5
  // ═══════════════════════════════════════════════════════
  const p7 = pdfDoc.addPage([612, 792]);
  y = height - 70;

  p7.drawRectangle({ x: 50, y: y - 28, width: 512, height: 35, color: darkCharcoal });
  p7.drawText('CHAPTER 4 | Nurturing Growth — The Bamboo Farmer\'s Dilemma', { x: 65, y: y - 17, size: 10.5, font: fontHelveticaBold, color: white }); y -= 52;

  const c4 = `A farmer planted bamboo seeds and watered the soil daily. A month passed — nothing. Six months — the land looked exactly the same. Neighbors laughed. One year, two years, three years — still no visible growth.

Yet every morning he watered. In the fifth year, the bamboo emerged and grew 90 feet tall in just six weeks. Neighbors called it an overnight success. The farmer knew the truth: the growth started years earlier beneath the surface.

The 4 Elements of Nurturing Wealth:
1. Consistency — Improving 1% daily creates extraordinary compound growth.
2. Discipline — Keeping going on days when motivation is absent and business is slow.
3. Learning & Adaptation — Markets evolve; successful wealth builders adapt.
4. Patience — Doing the right things long enough for results to appear.`;

  y = drawWrappedText(p7, c4, fontHelvetica, 9.5, textDark, 50, y, 512, 14.5); y -= 14;
  p7.drawText('Action Step: Identify one wealth seed. Write 3 daily/weekly actions to nurture it for 90 days without stopping.', { x: 50, y, size: 9, font: fontHelveticaOblique, color: primaryGreen }); y -= 28;

  p7.drawRectangle({ x: 50, y: y - 28, width: 512, height: 35, color: primaryGreen });
  p7.drawText('CHAPTER 5 | Removing Financial Weeds — The Farm That Should Have Flourished', { x: 65, y: y - 17, size: 10.5, font: fontHelveticaBold, color: white }); y -= 52;

  const c5 = `Farmer Okoro had the most fertile land in Benin City — rich soil, favorable rainfall — yet every harvest was disappointing. The problem: weeds stealing nutrients, water, and sunlight.

The 6 Destructive Financial Weeds:
1. Lifestyle Inflation — Increasing expenses at the exact pace of income increases.
2. Bad Debt — Financing liabilities and paying for past consumption with future opportunities.
3. Procrastination — Opportunities expire while waiting for "perfect conditions."
4. Fear — Fear of failure buries more dreams than failure itself has.
5. Comparison — Comparing your beginning to someone else's highlight reel.
6. Lack of Financial Education — Working hard without understanding how money multiplies.`;

  y = drawWrappedText(p7, c5, fontHelvetica, 9.5, textDark, 50, y, 512, 14.5); y -= 14;
  p7.drawText('Action Step: Financial Weed Audit — list habits to Keep, Reduce, Eliminate. Remove ONE financial weed immediately.', { x: 50, y, size: 9, font: fontHelveticaOblique, color: primaryGreen });
  decor(p7, 'Chapters 4 & 5', 7, TOTAL_PAGES);

  // ═══════════════════════════════════════════════════════
  // PAGE 8 — CHAPTER 6
  // ═══════════════════════════════════════════════════════
  const p8 = pdfDoc.addPage([612, 792]);
  y = height - 70;

  p8.drawRectangle({ x: 50, y: y - 28, width: 512, height: 35, color: darkCharcoal });
  p8.drawText('CHAPTER 6 | Harvesting Wealth — The Farmer Who Refused to Celebrate', { x: 65, y: y - 17, size: 10.5, font: fontHelveticaBold, color: white }); y -= 52;

  p8.drawText('Principle: Harvest is measured by how much value you create, preserve, and multiply into future harvests.', { x: 50, y, size: 9, font: fontHelveticaOblique, color: accentGold }); y -= 22;

  const c6 = `Chief Nwosu's farm produced its largest harvest in history. Yet while everyone expected a grand celebration, Chief Nwosu was already in the fields preparing new land and purchasing new seeds.

"A harvest is not the end of the journey. A harvest is a test."

The Difference Between Income & Wealth:
• Income is what you earn; wealth is what you keep, grow, and own.
• Income requires continuous physical effort; assets produce value over time.

5 Ways to Multiply Your Harvest:
1. Recognizing Non-Cash Harvests — Exposure, relationships, and reputation have real monetary value.
2. Turning Income into Assets — Businesses, real estate, digital products, intellectual property.
3. Multiple Income Streams — Salary, consulting, royalties, passive investments.
4. Reinvestment — Ask: "How much of this harvest should be planted again?"
5. Building Systems — Automated operations, trained teams, and digital platforms that scale without you.

The Compound Effect of Harvesting Right: NGN 10,000/month invested at 15% for 10 years = over NGN 2,750,000. The seed was small; the harvest is massive.`;

  y = drawWrappedText(p8, c6, fontHelvetica, 9.5, textDark, 50, y, 512, 14.5); y -= 14;
  p8.drawText('Action Step: Create your Harvest Plan — allocate monthly income into: 1. Consume  2. Save  3. Multiply (Reinvest into Assets).', { x: 50, y, size: 9, font: fontHelveticaOblique, color: primaryGreen });
  decor(p8, 'Chapter 6', 8, TOTAL_PAGES);

  // ═══════════════════════════════════════════════════════
  // PAGE 9 — CHAPTER 7
  // ═══════════════════════════════════════════════════════
  const p9 = pdfDoc.addPage([612, 792]);
  y = height - 70;

  p9.drawRectangle({ x: 50, y: y - 28, width: 512, height: 35, color: primaryGreen });
  p9.drawText('CHAPTER 7 | Replanting for Generational Wealth — Pa Eze\'s Legacy', { x: 65, y: y - 17, size: 10.5, font: fontHelveticaBold, color: white }); y -= 52;

  p9.drawText('Principle: True wealth belongs to those whose wisdom, systems, and values continue producing harvests long after they are gone.', { x: 50, y, size: 9, font: fontHelveticaOblique, color: accentGold }); y -= 22;

  const c7 = `When Pa Eze passed away after 40 years as a legendary farmer, the village gathered. When asked about his greatest achievement, his oldest friend pointed to Pa Eze's children and grandchildren:

"The greatest thing he left behind was what he taught them. How to think, work, save, invest, and build."

The greatest harvest is not what you leave FOR people — but what you leave IN people. Riches can disappear in a generation; wisdom endures for centuries.

The 5 Principles of Replanting Legacy:
1. Teach What You Know — Intentionally transfer wisdom to children, mentees, and teams.
2. Build Systems, Not Dependence — Train apprentices so operations thrive without you.
3. Create Assets That Outlive You — Books, businesses, scholarships, enduring brands.
4. Build a Legacy of Values — Integrity, responsibility, discipline, and generosity.
5. Become a Person of Multiplication — Move from "How much can I gather?" to "How much can I grow?"

The Forest Principle: A single tree produces fruit; a forest transforms an entire ecosystem. Build a forest.`;

  y = drawWrappedText(p9, c7, fontHelvetica, 9.5, textDark, 50, y, 512, 14.5); y -= 14;
  p9.drawText('Action Step: Write 1 person to mentor, 1 asset to build this year, and 1 core value to instill in the next generation.', { x: 50, y, size: 9, font: fontHelveticaOblique, color: primaryGreen });
  decor(p9, 'Chapter 7', 9, TOTAL_PAGES);

  // ═══════════════════════════════════════════════════════
  // PAGE 10 — KEY TAKEAWAYS SUMMARY
  // ═══════════════════════════════════════════════════════
  const p10 = pdfDoc.addPage([612, 792]);
  y = height - 70;

  p10.drawText('THE 7 MONEY FARMING PRINCIPLES — SUMMARY', { x: 50, y, size: 15, font: fontHelveticaBold, color: darkCharcoal }); y -= 30;

  const principles = [
    { num: 'I',   text: 'Money follows value. Your focus should not be money — your focus should be the seed that produces money.' },
    { num: 'II',  text: 'A seed cannot overcome poor soil. Prepare better soil before seeking a bigger harvest.' },
    { num: 'III', text: 'Wealth does not begin with money; it begins with seeds. Plant valuable seeds consistently.' },
    { num: 'IV',  text: 'Seeds grow when they are nurtured. The greatest rewards belong to those who refuse to quit before the harvest arrives.' },
    { num: 'V',   text: 'Great farmers do not merely plant — they remove weeds. Remove what has been stealing your harvest.' },
    { num: 'VI',  text: 'Harvest is measured by how much value you create, preserve, and multiply into future harvests.' },
    { num: 'VII', text: 'True wealth belongs to those whose wisdom, systems, and values continue producing harvests long after they are gone.' },
  ];

  for (const p of principles) {
    p10.drawRectangle({ x: 50, y: y - 3, width: 38, height: 16, color: accentGold });
    p10.drawText(p.num, { x: 55, y: y, size: 10, font: fontHelveticaBold, color: darkCharcoal });
    y = drawWrappedText(p10, p.text, fontHelvetica, 9.5, textDark, 95, y, 467, 14.5);
    y -= 12;
  }

  decor(p10, 'Key Principles', 10, TOTAL_PAGES);

  // ═══════════════════════════════════════════════════════
  // PAGE 11 — DECLARATION
  // ═══════════════════════════════════════════════════════
  const p11 = pdfDoc.addPage([612, 792]);
  y = height - 80;

  p11.drawRectangle({ x: 50, y: y - 28, width: 512, height: 35, color: primaryGreen });
  p11.drawText('THE MONEY FARMING DECLARATION', { x: 65, y: y - 17, size: 13, font: fontHelveticaBold, color: white }); y -= 60;

  const decls = [
    'I will not merely earn money. I will create value.',
    'I will not consume every harvest. I will preserve seeds for the future.',
    'I will nurture growth with patience and discipline.',
    'I will remove habits that destroy abundance.',
    'I will build assets, not just income.',
    'I will multiply opportunities for myself and others.',
    'I will leave behind wisdom, impact, and legacy.',
    '"I am a Money Farmer. And I understand that true wealth is grown."',
  ];

  for (let i = 0; i < decls.length; i++) {
    const isLast = i === decls.length - 1;
    p11.drawText(decls[i], {
      x: 80, y,
      size: isLast ? 12 : 11,
      font: isLast ? fontHelveticaBold : fontHelvetica,
      color: isLast ? accentGold : textDark
    });
    y -= isLast ? 30 : 22;
  }

  y -= 20;
  p11.drawRectangle({ x: 50, y: y - 55, width: 512, height: 55, color: lightBg });
  p11.drawText('Signature: ____________________________', { x: 65, y: y - 22, size: 10.5, font: fontHelvetica, color: mutedText });
  p11.drawText('Date: ______________________', { x: 65, y: y - 40, size: 10.5, font: fontHelvetica, color: mutedText });

  decor(p11, 'Declaration', 11, TOTAL_PAGES);

  // ═══════════════════════════════════════════════════════
  // PAGE 12 — ABOUT THE AUTHOR
  // ═══════════════════════════════════════════════════════
  const p12 = pdfDoc.addPage([612, 792]);
  y = height - 70;

  p12.drawRectangle({ x: 50, y: y - 120, width: 512, height: 120, color: primaryGreen });
  p12.drawText('ABOUT THE AUTHOR', { x: 70, y: y - 40, size: 18, font: fontHelveticaBold, color: accentGold });
  p12.drawText('Zeki Ubor — Transformational Trainer, Author & Architect', { x: 70, y: y - 65, size: 11, font: fontHelveticaBold, color: white });
  p12.drawText('The Becoming Institute', { x: 70, y: y - 85, size: 10, font: fontHelvetica, color: rgb(0.8, 0.92, 0.86) });
  y -= 148;

  const bio = `Zeki Ubor is a transformational trainer, author, entrepreneur, architect, and technology professional passionate about helping individuals discover their value, maximize their potential, and create lasting impact.

In Money Farming, Zeki combines timeless lessons from farming with practical principles of wealth creation to provide a framework for building sustainable financial success and generational impact.

As founder of Lifebuild Innovators, Unova Consulting, Unova Designs, and Yonan Technologies, he seamlessly blends creativity, strategy, and innovation to drive meaningful change across industries.

He is the facilitator of the "3 Steps Transformational Journey Blueprint" — a structured pathway to unlocking human potential — and the creator of "Becoming a Person of Interest," a program designed to empower individuals to establish influence, relevance, and impact in their fields.`;

  y = drawWrappedText(p12, bio, fontHelvetica, 10, textDark, 50, y, 512, 16);

  y -= 35;
  p12.drawRectangle({ x: 50, y: y - 60, width: 512, height: 60, color: rgb(0.96, 0.97, 0.95) });
  p12.drawText('An Official Origin Publication', { x: 70, y: y - 25, size: 11, font: fontHelveticaBold, color: darkCharcoal });
  p12.drawText('Downloaded via Origin Store  •  www.origin.com.ng', { x: 70, y: y - 45, size: 9.5, font: fontHelvetica, color: mutedText });

  decor(p12, 'About the Author', 12, TOTAL_PAGES);

  // ── Save ──────────────────────────────────────────────────────────────────
  const pdfBytes = await pdfDoc.save();
  const targetPath = path.join(__dirname, '..', 'public', 'documents', 'money-farming.pdf');
  fs.writeFileSync(targetPath, pdfBytes);
  console.log('✅ Money Farming PDF successfully generated at:', targetPath);
  console.log('   Size:', (pdfBytes.length / 1024).toFixed(1), 'KB');
}

generateMoneyFarmingPDF().catch(err => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
