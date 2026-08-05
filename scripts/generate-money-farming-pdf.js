const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateMoneyFarmingPDF() {
  const pdfDoc = await PDFDocument.create();
  const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontIt = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Color Palette - Emerald Green & Gold Theme for Money Farming
  const emeraldGreen = rgb(0.11, 0.72, 0.33); // #1db954
  const darkCharcoal = rgb(0.12, 0.14, 0.16);
  const textDark = rgb(0.18, 0.2, 0.22);
  const mutedText = rgb(0.45, 0.5, 0.55);
  const lightBg = rgb(0.96, 0.97, 0.96);
  const borderLine = rgb(0.85, 0.85, 0.85);

  const cleanText = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/₦/g, 'NGN ')
      .replace(/→/g, '->')
      .replace(/•/g, '-')
      .replace(/●/g, '-')
      .replace(/·/g, '-')
      .replace(/—/g, '--')
      .replace(/–/g, '-')
      .replace(/“/g, '"')
      .replace(/”/g, '"')
      .replace(/‘/g, "'")
      .replace(/’/g, "'");
  };

  let pageCounter = 0;

  const createPage = () => {
    pageCounter++;
    const page = pdfDoc.addPage([612, 792]);
    return { page, pageNum: pageCounter };
  };

  const addHeaderFooter = (page, title, pageNum) => {
    const { width, height } = page.getSize();
    page.drawLine({
      start: { x: 50, y: height - 45 },
      end: { x: width - 50, y: height - 45 },
      thickness: 0.8,
      color: borderLine,
    });
    page.drawText(cleanText(`MONEY FARMING -- ${title.toUpperCase()}`), {
      x: 50,
      y: height - 38,
      size: 8,
      font: fontB,
      color: mutedText,
    });

    page.drawLine({
      start: { x: 50, y: 45 },
      end: { x: width - 50, y: 45 },
      thickness: 0.8,
      color: borderLine,
    });
    page.drawText("© 2025 Zeki Ubor • The Becoming Institute", {
      x: 50,
      y: 30,
      size: 8,
      font: fontR,
      color: mutedText,
    });
    page.drawText(`Page ${pageNum}`, {
      x: width - 80,
      y: 30,
      size: 8,
      font: fontR,
      color: mutedText,
    });
  };

  const drawSectionHeader = (page, title, subtitle = '') => {
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 50, y: height - 110, width: width - 100, height: subtitle ? 50 : 40, color: emeraldGreen });
    page.drawText(cleanText(title), { x: 65, y: height - 92, size: 16, font: fontB, color: rgb(1, 1, 1) });
    if (subtitle) {
      page.drawText(cleanText(subtitle), { x: 65, y: height - 106, size: 10, font: fontIt, color: rgb(0.9, 0.98, 0.9) });
    }
  };

  const renderMultiPageText = (sectionTitle, fullText, startPageNum) => {
    let currentPageObj = createPage();
    let page = currentPageObj.page;
    let pageNum = currentPageObj.pageNum;
    let { width: W, height: H } = page.getSize();

    drawSectionHeader(page, sectionTitle);
    addHeaderFooter(page, sectionTitle, pageNum);

    let y = H - 135;
    const marginX = 60;
    const maxWidth = W - 120;
    const lineHeight = 16;
    const fontSize = 10;

    const sanitized = cleanText(fullText);
    const lines = sanitized.split('\n');

    for (let rawLine of lines) {
      const lineText = rawLine.trim();
      if (lineText === '') {
        y -= 8;
        if (y < 65) {
          currentPageObj = createPage();
          page = currentPageObj.page;
          pageNum = currentPageObj.pageNum;
          addHeaderFooter(page, sectionTitle, pageNum);
          y = H - 70;
        }
        continue;
      }

      // Check if line is a subheader (ends with : or short heading)
      const isHeader = (lineText.length < 50 && !lineText.endsWith('.')) || lineText.startsWith('Chapter') || lineText.startsWith('Seed') || lineText.startsWith('Weed') || lineText.startsWith('Water') || lineText.startsWith('Money Farming Principle') || lineText.startsWith('WORKBOOK') || lineText.startsWith('Reflection Questions');
      const font = isHeader ? fontB : fontR;
      const size = isHeader ? 11 : fontSize;
      const color = isHeader ? emeraldGreen : textDark;

      const words = lineText.split(' ');
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + words[i] + ' ';
        const testWidth = font.widthOfTextAtSize(testLine, size);
        if (testWidth > maxWidth && i > 0) {
          if (y < 65) {
            currentPageObj = createPage();
            page = currentPageObj.page;
            pageNum = currentPageObj.pageNum;
            addHeaderFooter(page, sectionTitle, pageNum);
            y = H - 70;
          }
          page.drawText(currentLine.trim(), { x: marginX, y, size, font, color });
          currentLine = words[i] + ' ';
          y -= lineHeight;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine.trim().length > 0) {
        if (y < 65) {
          currentPageObj = createPage();
          page = currentPageObj.page;
          pageNum = currentPageObj.pageNum;
          addHeaderFooter(page, sectionTitle, pageNum);
          y = H - 70;
        }
        page.drawText(currentLine.trim(), { x: marginX, y, size, font, color });
        y -= lineHeight;
      }
    }
  };

  // -------------------------------------------------------------
  // COVER PAGE (Page 1)
  // -------------------------------------------------------------
  const { page: coverPage, pageNum: coverPageNum } = createPage();
  const { width: W, height: H } = coverPage.getSize();

  let hasImageCover = false;
  try {
    const imgPath = path.join(__dirname, '..', 'public', 'cover_money_farming.png');
    if (fs.existsSync(imgPath)) {
      const imgBytes = fs.readFileSync(imgPath);
      const embeddedImg = await pdfDoc.embedPng(imgBytes);
      coverPage.drawImage(embeddedImg, { x: 0, y: 0, width: W, height: H });
      hasImageCover = true;
    }
  } catch (e) {
    hasImageCover = false;
  }

  if (!hasImageCover) {
    coverPage.drawRectangle({ x: 0, y: 0, width: W, height: H, color: darkCharcoal });
    coverPage.drawRectangle({ x: 0, y: H - 20, width: W, height: 20, color: emeraldGreen });

    coverPage.drawText("MONEY FARMING", { x: (W - fontB.widthOfTextAtSize("MONEY FARMING", 44)) / 2, y: H - 220, size: 44, font: fontB, color: rgb(1, 1, 1) });

    const subtitle = "The 7 Principles for Planting, Growing, and Harvesting Wealth";
    const subW = fontIt.widthOfTextAtSize(subtitle, 13);
    coverPage.drawText(subtitle, { x: (W - subW) / 2, y: H - 270, size: 13, font: fontIt, color: emeraldGreen });

    const authorStr = "ZEKI UBOR";
    coverPage.drawText(authorStr, { x: (W - fontB.widthOfTextAtSize(authorStr, 22)) / 2, y: 120, size: 22, font: fontB, color: rgb(1, 1, 1) });
  }

  // -------------------------------------------------------------
  // DEDICATION & TOC (Page 2)
  // -------------------------------------------------------------
  const { page: page2, pageNum: page2Num } = createPage();
  page2.drawRectangle({ x: 50, y: H - 100, width: 512, height: 40, color: emeraldGreen });
  page2.drawText("DEDICATION", { x: 65, y: H - 90, size: 18, font: fontB, color: rgb(1, 1, 1) });

  let y2 = H - 120;
  page2.drawText("To every dreamer who has worked hard yet wondered why financial abundance seemed far away.", { x: 65, y: y2, size: 10.5, font: fontIt, color: textDark });
  y2 -= 20;
  page2.drawText("May this book help you discover that wealth is not a mystery--it is a harvest.", { x: 65, y: y2, size: 10.5, font: fontIt, color: textDark });
  y2 -= 40;

  page2.drawRectangle({ x: 50, y: y2 - 10, width: 512, height: 35, color: darkCharcoal });
  page2.drawText("TABLE OF CONTENTS", { x: 65, y: y2, size: 16, font: fontB, color: rgb(1, 1, 1) });
  y2 -= 40;

  const tocItems = [
    { title: "Introduction: The Farmer's Secret", page: "3" },
    { title: "Chapter 1: Understanding Money Farming", page: "7" },
    { title: "Chapter 2: Preparing Your Financial Soil", page: "13" },
    { title: "Chapter 3: Planting Wealth Seeds", page: "21" },
    { title: "Chapter 4: Nurturing Growth", page: "35" },
    { title: "Chapter 5: Removing Financial Weeds", page: "48" },
    { title: "Chapter 6: Harvesting Wealth", page: "63" },
    { title: "Chapter 7: Replanting for Generational Wealth", page: "77" },
    { title: "Conclusion: The Next Planting Season", page: "91" },
    { title: "Final Money Farming Declaration", page: "99" },
    { title: "About the Author: Zeki Ubor", page: "100" },
  ];

  for (const item of tocItems) {
    page2.drawText(cleanText(item.title), { x: 65, y: y2, size: 11, font: fontB, color: textDark });
    page2.drawText(item.page, { x: 520, y: y2, size: 11, font: fontB, color: textDark });
    y2 -= 24;
  }
  addHeaderFooter(page2, "Contents", page2Num);

  // -------------------------------------------------------------
  // TEXT MANUSCRIPT SECTIONS
  // -------------------------------------------------------------

  const introFullText = `One morning, a young man stood beside an elderly farmer and asked a question that many people ask about money:
"How do I become wealthy?"

The farmer smiled but said nothing.
Instead, he handed the young man a handful of seeds.
Confused, the young man looked at the seeds and said, "I asked about wealth, not farming."

The farmer replied:
"That is the problem. Most people think wealth and farming are different."
The young man listened carefully.
The farmer continued:
"You cannot harvest what you never planted. You cannot expect abundance from neglected soil. And you cannot plant today and demand a harvest tomorrow."

The young man suddenly understood. Money follows the same laws.
The wealthiest people in the world are not merely earners; they are farmers. They plant ideas, skills, businesses, relationships, and investments. They nurture these seeds over time until they produce harvests far greater than the original seed.

Many people spend their lives chasing money. Few learn how to grow it.

This book introduces a simple but powerful concept called Money Farming.
Money Farming is the intentional process of planting value-producing seeds, cultivating opportunities, protecting resources, and harvesting sustainable wealth.

Throughout this book, you will discover seven principles that can transform your relationship with money forever.
By the end, you will understand that wealth is not something you chase. Wealth is something you cultivate.
Welcome to Money Farming.

Proposed Book Structure:
- Introduction -- 4 pages
- Chapter 1: Understanding Money Farming -- 8 pages (Why people chase money, Why money is a harvest, The farming mindset)
- Chapter 2: Preparing Your Financial Soil -- 8 pages (Mindset, Vision, Financial awareness, Personal responsibility)
- Chapter 3: Planting Wealth Seeds -- 10 pages (Skills, Knowledge, Relationships, Opportunities, Service)
- Chapter 4: Nurturing Growth -- 8 pages (Consistency, Discipline, Learning, Patience)
- Chapter 5: Removing Financial Weeds -- 8 pages (Debt, Poor habits, Fear, Distractions, Excuses)
- Chapter 6: Harvesting Wealth -- 10 pages (Income, Business growth, Investments, Wealth multiplication)
- Chapter 7: Replanting for Generational Wealth -- 8 pages (Legacy, Mentorship, Systems, Long-term impact)
- Conclusion -- 3 pages
- About the Author -- 1 page`;

  renderMultiPageText("Introduction: The Farmer's Secret", introFullText, pageCounter);

  const chapter1FullText = `The Man Who Sold His Harvest
In 2013, Chinedu worked as a sales representative in Enugu.
Every month, his salary arrived.
Every month, it disappeared.
His routine never changed.
Payday came. Bills came. Friends called. Weekends happened.
By the middle of the month, the account balance was almost empty.
Then he would wait anxiously for the next salary.

For seven years, Chinedu repeated the same cycle.
One evening, while visiting his village, he sat under a mango tree with his grandfather.
His grandfather had been a farmer for over fifty years.
As they talked, Chinedu complained about money.
"Papa, I work hard, but nothing stays with me."
The old man listened quietly.

Then he asked a strange question.
"Do you know why farmers keep seeds after harvest?"
Chinedu laughed.
"So they can plant next season."
His grandfather nodded.
Then he looked directly into his eyes.
"That is your problem. Every month you harvest money. Then you eat all your seeds."

The statement landed heavily.
For the first time, Chinedu saw his finances differently.
He was not poor because he earned little.
He was poor because he consumed everything.
The farmer never eats all his harvest. He preserves some for planting.

That conversation changed his life.
Within five years, Chinedu had built a small distribution business that eventually earned more than his salary.
The difference was not more money.
The difference was understanding the principle of Money Farming.

Wealth Is Not Found. It Is Grown.
Many people treat money like treasure. They spend their lives searching for it.
Looking for shortcuts. Looking for lucky breaks. Looking for miracles.
Farmers understand a different reality.
A harvest is not found. It is grown.
The mangoes on a tree were once invisible.
The harvest in a field was once hidden beneath the soil.
The wealth you admire today in successful people often began as something small and unnoticed: a skill, an idea, a relationship, a business, a book, a service, a seed.

The Dangerous Lie We Were Taught
Most people were taught: Go to school. Get a good job. Work hard. Retire.
Unfortunately, nobody explained how wealth is actually created.
A job pays you for your labor. A farm pays you for what you have cultivated.
The wealthy focus on building farms. The average person focuses on collecting harvests.
One creates assets. The other consumes income. This difference changes everything.

The Case of Dangote
When people see wealth, they usually see the harvest. They rarely see the planting season.
Many years before becoming Africa's richest businessman, Aliko Dangote started with small trading opportunities.
What eventually became a business empire began as seeds: relationships, knowledge, distribution systems, market understanding.
Over time, those seeds multiplied.
Today people see the harvest. Few study the planting.
That is the mistake many people make: they admire results while ignoring processes.

The First Principle of Money Farming
Money follows value.
Farmers produce crops. Businesses produce solutions. Professionals produce expertise. Authors produce knowledge. Teachers produce transformation.
The greater the value produced, the greater the harvest received.
This means your focus should not be money.
Your focus should be the seed that produces money.

Reflection Questions
1. What financial seeds am I currently planting?
2. Am I consuming all my harvest?
3. What skill, knowledge, or opportunity could become my next financial crop?
4. Am I focused on money or on creating value?

Money Farming Action Step
For the next seven days, track every naira that enters and leaves your hands.
At the end of the week, identify: Harvest consumed, Harvest invested, Seeds planted.
Most people will discover they are eating tomorrow's harvest today.
Money farmers do something different: they save seeds, plant seeds, and eventually enjoy harvests others only dream about.`;

  renderMultiPageText("Chapter 1: Understanding Money Farming", chapter1FullText, pageCounter);

  const chapter2FullText = `The Harvest That Never Came
In 2015, Emeka got the biggest breakthrough of his life.
After years of searching, he finally secured a job with a multinational company in Lagos.
His salary was more than three times what he had earned previously.
The celebration lasted for weeks. Family members congratulated him, friends admired him, everyone believed his financial struggles were over--including Emeka.

For the first few months, everything felt different: moved into a better apartment, bought a newer phone, changed his wardrobe, started eating at places he once considered expensive.
Life seemed to be moving forward.
But something strange happened.
At the end of every month, there was almost nothing left.

The bigger salary had disappeared.
One year later, Emeka was earning more than ever before but was still financially anxious.
Three years later, he had no investments, no emergency savings, no assets, no plan--only a bigger lifestyle.
One evening, while reviewing his finances, he asked himself a difficult question: "Where did all the money go?"

The answer shocked him.
The problem was never his income.
The problem was his soil.
More money had entered his life, but it entered the same financial habits, the same mindset, the same lack of direction, the same poor decisions.
The soil had not changed; only the seed had become bigger.
And poor soil destroys even the best seeds.

Why Some People Never Prosper
Many people believe money alone changes lives. It doesn't.
"Money is an amplifier, not a transformer. Higher income cannot compensate for poor financial habits."
If discipline exists, money expands discipline.
If wisdom exists, money expands wisdom.
If confusion exists, money expands confusion.
Money is an amplifier, not a transformer.
A farmer understands this principle: no matter how expensive the seeds are, bad soil produces disappointing harvests.
Before planting wealth, you must prepare your financial soil.

The First Layer of Soil: Responsibility
Many people unknowingly hand over responsibility for their finances.
They blame the government, the economy, their employer, their family background, their circumstances.
While these factors may influence financial outcomes, they cannot completely determine them.
The day a farmer blames the weather for every poor harvest is the day he stops improving his farming methods.
Responsibility is the moment you say: "My future may have been influenced by others, but it will not be determined by others."
Responsibility is where wealth begins.

The Second Layer of Soil: Awareness
Imagine driving from Enugu to Abuja. You enter the vehicle, start the engine, begin moving, but you have no destination, no map, no route, no fuel estimate.
You are moving, but you are not progressing.
That is how many people manage money: money enters, money leaves, no one is paying attention, measuring, evaluating, or directing.
Financial awareness begins with understanding: What comes in. What goes out. What remains. What grows. What disappears.
Until money becomes visible, it remains difficult to manage.

The Third Layer of Soil: Vision
Every farmer plants with a picture of harvest in mind. No farmer wakes up and randomly throws seeds around.
There is intention, purpose, a destination.
The same applies to wealth. Many people know what they want today; few know where they want to be ten years from now.
Without vision: income becomes consumption, opportunities become distractions, money disappears into impulse decisions.
Vision transforms spending into strategy.

The Fourth Layer of Soil: Character
Character is one of the most overlooked wealth principles.
People often ask: "How can I make more money?" A better question is: "Can I manage more money?"
Many people pray for increase; few prepare for increase.
The habits that manage NGN 100,000 are often the same habits that manage NGN 1,000,000.
Money reveals character. If a farmer is careless, a larger farm simply creates larger losses.
Character determines whether abundance becomes a blessing or a burden.

The Story of Two Builders
Two young men started businesses at the same time.
One focused on appearances; the other focused on systems.
The first wanted to look successful; the second wanted to become successful.
The first spent profits quickly; the second reinvested carefully.
Five years later, the difference was obvious: one had memories, the other had assets; one harvested attention, the other harvested wealth.
The difference was not intelligence; the difference was preparation. One prepared the soil; the other decorated the soil.

Financial Soil Assessment
1. Do I know exactly how much money enters my life each month?
2. Do I know exactly how much money leaves my life each month?
3. What financial goals am I working toward?
4. What habits are helping me grow wealth?
5. What habits are silently destroying wealth?
6. Am I building assets or merely funding consumption?
7. If my income doubled tomorrow, would my financial future truly improve?

Money Farming Principle II
A seed cannot overcome poor soil. Likewise, higher income cannot compensate for poor financial habits.
Before seeking a bigger harvest, prepare better soil. Because wealth grows best where discipline, awareness, responsibility, vision, and character already exist.`;

  renderMultiPageText("Chapter 2: Preparing Your Financial Soil", chapter2FullText, pageCounter);

  const chapter3FullText = `The Mechanic Nobody Noticed
In 2012, a young mechanic named Musa worked in a small workshop in Port Harcourt.
His shop was hidden behind a busy market.
Most people passed by without noticing him. His clothes were usually stained with engine oil, his tools were old, his income was modest.
To many observers, Musa looked like a man struggling to survive.
What they could not see were the seeds he was planting.

Every evening after work, he stayed back--not to repair vehicles, but to learn.
He borrowed manuals, watched videos, asked experienced mechanics questions, studied newer vehicle technologies.
While others spent their evenings entertaining themselves, Musa invested his evenings in knowledge.

For years, nobody noticed. Then modern vehicles began flooding the market.
Many mechanics struggled to adapt. But Musa had already planted the seeds.
Customers started looking specifically for him. His income multiplied, his workshop expanded, eventually he opened a training center.
The harvest looked sudden, but it wasn't. The harvest had been growing underground for years.
People celebrate harvests they never witnessed being planted.

Every Harvest Begins as a Seed
Before there is abundance, there is planting. Before there is income, there is value. Before there is wealth, there is investment.
Every financial breakthrough begins as a seed.
The challenge is that seeds rarely look impressive--a seed looks small, ordinary, insignificant.
Yet hidden inside a seed is the potential for an entire forest.
A skill, a relationship, a book, or an idea may seem small today, but within those seeds lies future abundance.

Seed One: Skills
Skills are among the most powerful wealth seeds available to anyone.
Money flows toward value. Skills create value.
The more valuable your skill, the greater your potential harvest.
A person who solves a NGN 5,000 problem receives a smaller reward than someone who solves a NGN 5,000,000 problem.
The market rewards usefulness--not effort alone, not intentions alone, not wishes alone. Usefulness.
Your income often reflects the value of the problems you can solve.

The Seed You Already Possess
A teacher possesses knowledge. A carpenter possesses craftsmanship. A software developer possesses technical expertise. An architect possesses design capability. An entrepreneur possesses problem-solving ability.
"Hidden inside a seed is the potential for an entire forest. Your income reflects the value of the problems you can solve."
The question is not: "Do I have a seed?" The question is: "Am I planting it?"

Seed Two: Knowledge
Knowledge is fertilizer for every other seed.
Without knowledge, opportunities are often missed, mistakes become expensive, growth slows.
The wealthiest people in every generation understand the power of learning: they read, study, observe, adapt.
Those who continue learning remain valuable. Those who stop learning gradually become irrelevant.

The Cost of Ignorance
Imagine two people receiving NGN 1,000,000. One understands business; the other does not. One understands investing; the other does not. One understands cash flow; the other does not.
Five years later, their financial outcomes will likely be very different--not because of the money, but because of what they knew.

Seed Three: Relationships
Farmers rarely succeed alone; they rely on suppliers, workers, buyers, experts, communities.
The same applies to wealth: many opportunities, jobs, business partnerships, referrals, and mentorship come through people.
The quality of your relationships influences the quality of opportunities available to you.

The Conversation That Changed Everything
A young graduate attended a conference he almost skipped. He knew nobody there, felt uncomfortable, almost left early.
Then he started a conversation with someone sitting beside him.
That conversation eventually led to an internship, which led to employment, which led to leadership opportunities.
One relationship became a seed; one seed became a harvest.
Never underestimate people. Many opportunities arrive disguised as relationships.

Seed Four: Opportunities
Opportunities are seeds many people overlook because they often arrive dressed as work.
Some people pray for breakthroughs, then ignore opportunities because they appear inconvenient.
A farmer knows that harvest requires effort. Likewise, opportunity often requires action.

Seed Five: Character and Reputation
Imagine two people with identical skills. One is trustworthy; the other is unreliable.
Character is a wealth seed. Trust is a wealth seed. Integrity is a wealth seed. Reputation is a wealth seed.
The wisest people focus on becoming the kind of person money naturally follows.

The Law of Seed Multiplication
One seed can produce hundreds more: one maize seed produces multiple cobs; one mango seed produces thousands of mangoes.
Wealth follows the same pattern: Skill -> Income -> Knowledge -> Opportunities -> Businesses -> Assets -> Wealth.

WORKBOOK: Money Farming Action Step
Create five columns: Skills, Knowledge, Relationships, Opportunities, Character.
Under each column, write every seed you currently possess. Ask: Which am I actively planting? Which am I neglecting?

Money Farming Principle III
Wealth does not begin with money. It begins with seeds. Skills, knowledge, relationships, opportunities, and character are the true seeds. Those who plant valuable seeds eventually enjoy harvests others call luck.`;

  renderMultiPageText("Chapter 3: Planting Wealth Seeds", chapter3FullText, pageCounter);

  const chapter4FullText = `The Bamboo Farmer's Dilemma
In a rural community, a farmer planted bamboo seeds on carefully prepared land.
Every morning he watered the soil; every evening he checked the field.
A month passed--nothing. Three months passed--still nothing. Six months passed--the land looked exactly the same.
Neighbors laughed, friends questioned his decision, some suggested dead seeds.
One year passed--nothing. Two years, three years passed--still no visible growth.
Yet every morning he watered the soil; every evening he tended the field.
Then something remarkable happened: the bamboo finally emerged!
Within a short period, it grew rapidly. Neighbors called it an overnight success.
But the farmer knew better: the growth had started years earlier beneath the surface. The roots had been developing where nobody could see them.

Why Most People Quit Too Early
The greatest enemy of wealth is not failure; it is impatience.
Many people plant seeds; few remain long enough to see harvest.
They start businesses, then quit after six months; learn new skills, then stop when progress feels slow; begin investing, then withdraw when returns seem insignificant.
The problem is not the seed; the problem is the expectation. Many people expect harvest during planting season.

The Invisible Growth Season
Progress often becomes visible only after it has been happening for a long time.
Consider a child learning to read, an athlete training, or a business owner building momentum.
"Never confuse invisible progress with the absence of progress. Small actions repeated over time create extraordinary results."

The Story of the Tailor
A young tailor named Ada opened a small fashion shop.
For nearly two years, growth was slow.
Then satisfied customers began referring others, social media visibility increased, corporate clients emerged.
Within a few years, the shop became fully booked. What people saw was harvest; what they missed was cultivation.

Water One: Consistency
Growth requires repetition. Consistency is one of the most underrated wealth principles.
The Mathematics of Growth: Improving 1% daily creates extraordinary compound growth over time.

Water Two: Discipline
Motivation comes and goes; discipline remains. Discipline keeps you moving during seasons when progress feels invisible.

Water Three: Learning and Adaptation
Weather patterns change, markets change, technologies change. Growth requires adaptation.

Water Four: Patience
Patience is active persistence--doing the right things long enough for results to appear.

The Danger of Digging Up Seeds
Constantly changing direction and jumping from one idea to another destroys momentum. Growth requires commitment.

Reflection Questions
1. What seeds have I planted recently?
2. Have I given those seeds enough time to grow?
3. What habits am I practicing consistently?
4. Where am I expecting instant results?
5. What would happen if I stayed committed for another year?

Money Farming Action Step
Identify one wealth seed you planted in the last 12 months and identify three actions to nurture it.

Money Farming Principle IV
Seeds grow when they are nurtured. Likewise, wealth grows when skills, opportunities, relationships, and ideas receive consistent attention.`;

  renderMultiPageText("Chapter 4: Nurturing Growth", chapter4FullText, pageCounter);

  const chapter5FullText = `The Farm That Should Have Flourished
Farmer Okoro in Benin City had fertile land, rich soil, and good rainfall, yet every harvest was disappointing.
An agricultural officer found the farm overrun with weeds stealing nutrients, water, and sunlight.
The farmer focused on planting but neglected removing what was destroying the harvest.
Many people work hard, learn skills, and start businesses, yet wealth never grows because financial weeds silently consume their harvest.

What Are Financial Weeds?
Financial weeds are habits and decisions that quietly destroy wealth: unnecessary spending, procrastination, debt, carelessness, comparison.

Weed One: Lifestyle Inflation
When Chika got promoted, her higher salary immediately disappeared into a higher lifestyle. Income increased; wealth did not.

Weed Two: Bad Debt
Destructive debt consumes resources and limits future growth. Every naira used for unnecessary debt is a seed sacrificed.

Weed Three: Procrastination
Postponing action leads to lost possibility. Opportunity expires while waiting for perfect conditions.

Weed Four: Fear
Fear of rejection, criticism, loss, or uncertainty buries dreams. Wealth builders act despite fear.

Weed Five: Comparison
Comparing your beginning to someone else's highlight reel creates pressure to spend for appearances.

Weed Six: Lack of Financial Education
The Silent Drain: like a bucket with holes at the bottom, income leaks away if you don't understand how money works.

The Courage to Weed
Removing weeds requires honesty, discipline, self-awareness, and difficult decisions.

Reflection Questions & Action Step
Perform a Financial Weed Audit (Habits to Keep, Reduce, Eliminate). Choose one weed to remove immediately.

Money Farming Principle V
Great wealth builders do not simply create income; they identify and eliminate the habits that quietly destroy growth.`;

  renderMultiPageText("Chapter 5: Removing Financial Weeds", chapter5FullText, pageCounter);

  const chapter6FullText = `The Farmer Who Refused to Celebrate
Chief Nwosu's farm produced its largest harvest, yet while others expected a grand party, he was already preparing new fields for next season.
"A harvest is not the end of the journey; a harvest is a test."

Why Many People Lose Their Harvest
People dream about making money but consume what should have been multiplied.

Income vs. Wealth
Income is what you earn; wealth is what you keep, grow, and own.
Two brothers earning NGN 500,000 monthly: one spends everything; the other invests in assets.

Harvest One: Recognizing Your Harvest (Story of the Young Speaker)
Harvest does not always arrive as cash--it appears as skills, relationships, exposure, and reputation.

Harvest Two: Turning Income into Assets (The Book That Became a Farm)
Income feeds you; assets free you. Assets (businesses, IP, digital products, real estate) continue producing value over time.

Harvest Three: Multiple Streams of Income
Relying on a single income stream creates vulnerability. Diversified harvests provide security.

Harvest Four: Reinvestment
Multiply harvest instead of consuming it. Prioritize long-term rewards over immediate gratification.

Harvest Five: Building Systems
A system continues creating value even when you are absent. Build irrigation systems rather than carrying water by hand.

Money Farming Principle VI
Harvest is measured by how much value you create, preserve, and multiply into future harvests.`;

  renderMultiPageText("Chapter 6: Harvesting Wealth", chapter6FullText, pageCounter);

  const chapter7FullText = `The Old Man's Final Harvest
At Pa Eze's funeral after 40 years as a respected farmer, his friend noted: "His greatest achievement was not what he owned--it was what he taught. The money may come and go, but the knowledge he planted in people continues producing harvests."
The greatest harvest is not what you leave FOR people; it is what you leave IN people.

Beyond Personal Success & Legacy
Wealth is complete when it survives beyond the individual who created it. Riches can disappear in a generation; legacy endures.

Replanting Principles:
1. Teach What You Know (The Apprentice)
2. Build Systems, Not Dependence
3. Create Assets That Outlive You (The Author's Legacy)
4. Build a Legacy of Values (The Family Business)
5. Become a Person of Multiplication (The Forest Principle -- plant a forest, not just a single tree)

Money Farming Principle VII
Success is not a destination; it is a cycle. Plant, grow, protect, harvest, replant, and repeat. True wealth belongs to those whose influence and wisdom continue producing harvests long after they are gone.`;

  renderMultiPageText("Chapter 7: Replanting for Generational Wealth", chapter7FullText, pageCounter);

  const conclusionFullText = `The sun was setting as the young man sat beside the old farmer who handed him seeds years ago.
The young man had built a business, developed skills, created multiple income streams, and learned to create value.
When asked "What do you see?", he replied: "I see different seasons... and that the harvest is not the end."

The Journey You Have Taken
Throughout this book, you traveled the complete cycle: understanding -> soil preparation -> planting seeds -> nurturing growth -> removing weeds -> harvesting wealth -> replanting for legacy.

The Great Wealth Myth
Lasting wealth is not a secret formula or luck--it is built patiently, deliberately, and consistently.

The Question That Changes Everything
"What am I planting today?" Your future harvest is hidden in your present actions.

There Will Always Be Another Season
Life moves in seasons. Every season has a purpose and prepares you for the next.

Your Money Farming Commitment
Commit to becoming a lifelong farmer: plant seeds, nurture growth, remove weeds, multiply harvests, build assets, transfer wisdom, leave a legacy.

Final Reflection
What seed are you carrying? What soil are you preparing? What harvest are you building? What legacy are you leaving?
Begin today. Your next planting season begins now.`;

  renderMultiPageText("Conclusion: The Next Planting Season", conclusionFullText, pageCounter);

  const finalDeclText = `FINAL MONEY FARMING DECLARATION

I will not merely earn money. I will create value.
I will not consume every harvest. I will preserve seeds for the future.
I will nurture growth with patience and discipline.
I will remove habits that destroy abundance.
I will build assets, not just income.
I will multiply opportunities for myself and others.
I will leave behind wisdom, impact, and legacy.
I am a Money Farmer.
And I understand that true wealth is grown.`;

  renderMultiPageText("Final Money Farming Declaration", finalDeclText, pageCounter);

  // -------------------------------------------------------------
  // ABOUT THE AUTHOR (Page 100)
  // -------------------------------------------------------------
  const { page: authorPage, pageNum: authPageNum } = createPage();
  const { width: aW, height: aH } = authorPage.getSize();
  authorPage.drawRectangle({ x: 0, y: aH - 240, width: aW, height: 240, color: darkCharcoal });

  authorPage.drawText("MONEY FARMING", { x: 60, y: aH - 90, size: 36, font: fontB, color: emeraldGreen });
  authorPage.drawText("ABOUT THE AUTHOR", { x: 60, y: aH - 140, size: 18, font: fontB, color: rgb(1, 1, 1) });
  authorPage.drawText("Zeki Ubor -- Transformational Trainer, Author & Architect", { x: 60, y: aH - 170, size: 12, font: fontB, color: rgb(0.9, 0.9, 0.9) });

  let yAuth = aH - 280;
  const authorBio = `Zeki Ubor is a transformational trainer, author, entrepreneur, architect, and technology professional passionate about helping individuals discover their value, maximize their potential, and create lasting impact.

Through his teachings, books, training programs, and business ventures, he has dedicated his work to helping people build lives of purpose, productivity, and significance.

He is the creator of transformational initiatives focused on personal growth, leadership development, value creation, and wealth-building principles.

In Money Farming, Zeki combines timeless lessons from farming with practical principles of wealth creation to provide a framework for building sustainable financial success and generational impact.

His message is simple:
Great harvests are never accidental. They are cultivated.
Plant wisely. Grow intentionally. Harvest abundantly. Leave a legacy.`;

  const bioLines = cleanText(authorBio).split('\n');
  for (let line of bioLines) {
    if (line.trim() === '') {
      yAuth -= 10;
      continue;
    }
    authorPage.drawText(line.trim(), { x: 60, y: yAuth, size: 10, font: fontR, color: textDark });
    yAuth -= 15;
  }

  authorPage.drawRectangle({ x: 50, y: 60, width: 512, height: 50, color: lightBg, borderColor: borderLine, borderWidth: 1 });
  authorPage.drawText("An Official Origin Publication", { x: 70, y: 90, size: 11, font: fontB, color: darkCharcoal });
  authorPage.drawText("Downloaded via Origin Store * www.origin.com.ng", { x: 70, y: 72, size: 9.5, font: fontR, color: mutedText });
  addHeaderFooter(authorPage, "About the Author", authPageNum);

  const pdfBytes = await pdfDoc.save();
  const targetPath = path.join(__dirname, '..', 'public', 'documents', 'money-farming.pdf');

  fs.writeFileSync(targetPath, pdfBytes);
  console.log(`✅ "Money Farming" PDF successfully generated (${pageCounter} pages) at: ${targetPath}`);
}

generateMoneyFarmingPDF().catch(err => console.error(err));
