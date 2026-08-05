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
    page.drawText(cleanText(title), { x: 65, y: height - 92, size: 15, font: fontB, color: rgb(1, 1, 1) });
    if (subtitle) {
      page.drawText(cleanText(subtitle), { x: 65, y: height - 106, size: 10, font: fontIt, color: rgb(0.9, 0.98, 0.9) });
    }
  };

  const renderMultiPageText = (sectionTitle, fullText) => {
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

      const isHeader = (lineText.length < 55 && !lineText.endsWith('.') && !lineText.endsWith(',')) || 
                        lineText.startsWith('Chapter') || 
                        lineText.startsWith('CHAPTER') || 
                        lineText.startsWith('Seed') || 
                        lineText.startsWith('Weed') || 
                        lineText.startsWith('Water') || 
                        lineText.startsWith('Money Farming Principle') || 
                        lineText.startsWith('WORKBOOK') || 
                        lineText.startsWith('Reflection Questions') ||
                        lineText.startsWith('The ') ||
                        lineText.startsWith('Replanting Principle') ||
                        lineText.startsWith('FINAL');

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

  const introFullText = `The Farmer's Secret
One morning, a young man stood beside an elderly farmer and asked a question that many people ask about money:
"How do I become wealthy?"

The farmer smiled but said nothing.
Instead, he handed the young man a handful of seeds.
Confused, the young man looked at the seeds and said, "I asked about wealth, not farming."

The farmer replied:
"That is the problem. Most people think wealth and farming are different."
The young man listened carefully.
The farmer continued:
"You cannot harvest what you never planted. You cannot expect abundance from neglected soil. And you cannot plant today and demand a harvest tomorrow."

The young man suddenly understood.
Money follows the same laws.
The wealthiest people in the world are not merely earners; they are farmers. They plant ideas, skills, businesses, relationships, and investments. They nurture these seeds over time until they produce harvests far greater than the original seed.

Many people spend their lives chasing money.
Few learn how to grow it.

This book introduces a simple but powerful concept called Money Farming.
Money Farming is the intentional process of planting value-producing seeds, cultivating opportunities, protecting resources, and harvesting sustainable wealth.

Throughout this book, you will discover seven principles that can transform your relationship with money forever.
By the end, you will understand that wealth is not something you chase.
Wealth is something you cultivate.

Welcome to Money Farming.

Proposed Book Structure
Introduction -- 4 pages
Chapter 1: Understanding Money Farming -- 8 pages
- Why people chase money
- Why money is a harvest
- The farming mindset

Chapter 2: Preparing Your Financial Soil -- 8 pages
- Mindset
- Vision
- Financial awareness
- Personal responsibility

Chapter 3: Planting Wealth Seeds -- 10 pages
- Skills
- Knowledge
- Relationships
- Opportunities
- Service

Chapter 4: Nurturing Growth -- 8 pages
- Consistency
- Discipline
- Learning
- Patience

Chapter 5: Removing Financial Weeds -- 8 pages
- Debt
- Poor habits
- Fear
- Distractions
- Excuses

Chapter 6: Harvesting Wealth -- 10 pages
- Income
- Business growth
- Investments
- Wealth multiplication

Chapter 7: Replanting for Generational Wealth -- 8 pages
- Legacy
- Mentorship
- Systems
- Long-term impact

Conclusion -- 3 pages
About the Author -- 1 page

For the cover, I would use the tagline:
MONEY FARMING
The 7 Principles for Planting, Growing, and Harvesting Wealth`;

  renderMultiPageText("Introduction: The Farmer's Secret", introFullText);

  const chapter1FullText = `The Man Who Sold His Harvest
In 2013, Chinedu worked as a sales representative in Enugu.
Every month, his salary arrived.
Every month, it disappeared.
His routine never changed.
Payday came.
Bills came.
Friends called.
Weekends happened.
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
"That is your problem."
Chinedu frowned.
"What do you mean?"
The old man continued.
"Every month you harvest money. Then you eat all your seeds."

The statement landed heavily.
For the first time, Chinedu saw his finances differently.
He was not poor because he earned little.
He was poor because he consumed everything.
The farmer never eats all his harvest.
He preserves some for planting.

That conversation changed his life.
Within five years, Chinedu had built a small distribution business that eventually earned more than his salary.
The difference was not more money.
The difference was understanding the principle of Money Farming.

Wealth Is Not Found. It Is Grown.
Many people treat money like treasure.
They spend their lives searching for it.
Looking for shortcuts.
Looking for lucky breaks.
Looking for miracles.
Farmers understand a different reality.
A harvest is not found.
It is grown.
The mangoes on a tree were once invisible.
The harvest in a field was once hidden beneath the soil.
The wealth you admire today in successful people often began as something small and unnoticed.
A skill.
An idea.
A relationship.
A business.
A book.
A service.
A seed.

The Dangerous Lie We Were Taught
Most people were taught:
Go to school.
Get a good job.
Work hard.
Retire.
Unfortunately, nobody explained how wealth is actually created.
A job pays you for your labor.
A farm pays you for what you have cultivated.
The wealthy focus on building farms.
The average person focuses on collecting harvests.
One creates assets.
The other consumes income.
This difference changes everything.

The Case of Dangote
When people see wealth, they usually see the harvest.
They rarely see the planting season.
Many years before becoming Africa's richest businessman, Aliko Dangote started with small trading opportunities.
What eventually became a business empire began as seeds.
Relationships.
Knowledge.
Distribution systems.
Market understanding.
Over time, those seeds multiplied.
Today people see the harvest.
Few study the planting.
That is the mistake many people make.
They admire results while ignoring processes.

The First Principle of Money Farming
Money follows value.
Farmers produce crops.
Businesses produce solutions.
Professionals produce expertise.
Authors produce knowledge.
Teachers produce transformation.
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
At the end of the week, identify:
- Harvest consumed.
- Harvest invested.
- Seeds planted.

Most people will discover they are eating tomorrow's harvest today.
Money farmers do something different.
They save seeds.
They plant seeds.
And eventually, they enjoy harvests others only dream about.`;

  renderMultiPageText("Chapter 1: Understanding Money Farming", chapter1FullText);

  const chapter2FullText = `The Harvest That Never Came
In 2015, Emeka got the biggest breakthrough of his life.
After years of searching, he finally secured a job with a multinational company in Lagos.
His salary was more than three times what he had earned previously.
The celebration lasted for weeks.
Family members congratulated him.
Friends admired him.
Everyone believed his financial struggles were over.
Including Emeka.
For the first few months, everything felt different.
He moved into a better apartment.
Bought a newer phone.
Changed his wardrobe.
Started eating at places he once considered expensive.
Life seemed to be moving forward.
But something strange happened.
At the end of every month, there was almost nothing left.

The bigger salary had disappeared.
One year later, Emeka was earning more than ever before but was still financially anxious.
Three years later, he had no investments.
No emergency savings.
No assets.
No plan.
Only a bigger lifestyle.
One evening, while reviewing his finances, he asked himself a difficult question:
"Where did all the money go?"
The answer shocked him.
The problem was never his income.
The problem was his soil.
More money had entered his life.
But it entered the same financial habits.
The same mindset.
The same lack of direction.
The same poor decisions.
The soil had not changed.
Only the seed had become bigger.
And poor soil destroys even the best seeds.

Why Some People Never Prosper
Many people believe money alone changes lives.
It doesn't.
"Money is an amplifier, not a transformer. Higher income cannot compensate for poor financial habits."
If discipline exists, money expands discipline.
If wisdom exists, money expands wisdom.
If confusion exists, money expands confusion.
Money is an amplifier.
Not a transformer.
A farmer understands this principle.
No matter how expensive the seeds are, bad soil produces disappointing harvests.
Before planting wealth, you must prepare your financial soil.

The First Layer of Soil: Responsibility
Many people unknowingly hand over responsibility for their finances.
They blame:
The government.
The economy.
Their employer.
Their family background.
Their circumstances.
While these factors may influence financial outcomes, they cannot completely determine them.
The day a farmer blames the weather for every poor harvest is the day he stops improving his farming methods.
Responsibility is the moment you say:
"My future may have been influenced by others, but it will not be determined by others."
Responsibility is where wealth begins.

The Second Layer of Soil: Awareness
Imagine driving from Enugu to Abuja.
You enter the vehicle.
Start the engine.
Begin moving.
But you have no destination.
No map.
No route.
No fuel estimate.
You are moving.
But you are not progressing.
That is how many people manage money.
Money enters.
Money leaves.
No one is paying attention.
No one is measuring.
No one is evaluating.
No one is directing.
Financial awareness begins with understanding:
What comes in.
What goes out.
What remains.
What grows.
What disappears.
Until money becomes visible, it remains difficult to manage.

The Third Layer of Soil: Vision
Every farmer plants with a picture of harvest in mind.
No farmer wakes up and randomly throws seeds around.
There is intention.
There is purpose.
There is a destination.
The same applies to wealth.
Many people know what they want today.
Few know where they want to be ten years from now.
Without vision:
Income becomes consumption.
Without vision:
Opportunities become distractions.
Without vision:
Money disappears into impulse decisions.
Vision transforms spending into strategy.

The Fourth Layer of Soil: Character
Character is one of the most overlooked wealth principles.
People often ask:
"How can I make more money?"
A better question is:
"Can I manage more money?"
Many people pray for increase.
Few prepare for increase.
The habits that manage NGN 100,000 are often the same habits that manage NGN 1,000,000.
Money reveals character.
If a farmer is careless, a larger farm simply creates larger losses.
Character determines whether abundance becomes a blessing or a burden.

The Story of Two Builders
Two young men started businesses at the same time.
One focused on appearances.
The other focused on systems.
The first wanted to look successful.
The second wanted to become successful.
The first spent profits quickly.
The second reinvested carefully.
Five years later, the difference was obvious.
One had memories.
The other had assets.
One harvested attention.
The other harvested wealth.
The difference was not intelligence.
The difference was preparation.
One prepared the soil.
The other decorated the soil.

Financial Soil Assessment
Ask yourself:
1. Do I know exactly how much money enters my life each month?
2. Do I know exactly how much money leaves my life each month?
3. What financial goals am I working toward?
4. What habits are helping me grow wealth?
5. What habits are silently destroying wealth?
6. Am I building assets or merely funding consumption?
7. If my income doubled tomorrow, would my financial future truly improve?
Your answers reveal the condition of your financial soil.

Money Farming Principle II
A seed cannot overcome poor soil.
Likewise, higher income cannot compensate for poor financial habits.
Before seeking a bigger harvest, prepare better soil.
Because wealth grows best where discipline, awareness, responsibility, vision, and character already exist.
The farmer who prepares the soil properly has already won half the battle before planting begins.
And the same is true for wealth.`;

  renderMultiPageText("Chapter 2: Preparing Your Financial Soil", chapter2FullText);

  const chapter3FullText = `The Mechanic Nobody Noticed
In 2012, a young mechanic named Musa worked in a small workshop in Port Harcourt.
His shop was hidden behind a busy market.
Most people passed by without noticing him.
His clothes were usually stained with engine oil.
His tools were old.
His income was modest.
To many observers, Musa looked like a man struggling to survive.
What they could not see were the seeds he was planting.
Every evening after work, he stayed back.
Not to repair vehicles.
To learn.
He borrowed manuals.
Watched videos.
Asked experienced mechanics questions.
Studied newer vehicle technologies.
While others spent their evenings entertaining themselves, Musa invested his evenings in knowledge.
For years, nobody noticed.
Then modern vehicles began flooding the market.
Many mechanics struggled to adapt.
But Musa had already planted the seeds.
Customers started looking specifically for him.
His income multiplied.
His workshop expanded.
Eventually he opened a training center.
The harvest looked sudden.
But it wasn't.
The harvest had been growing underground for years.
That is how wealth often works.
People celebrate harvests they never witnessed being planted.

Every Harvest Begins as a Seed
A farmer understands a truth many people ignore.
Before there is abundance, there is planting.
Before there is income, there is value.
Before there is wealth, there is investment.
Every financial breakthrough begins as a seed.
The challenge is that seeds rarely look impressive.
A seed looks small.
Ordinary.
Insignificant.
Yet hidden inside a seed is the potential for an entire forest.
The same applies to wealth.
A skill may look small today.
A relationship may seem unimportant today.
A book may appear insignificant today.
An idea may seem impossible today.
But within those seeds lies future abundance.

Seed One: Skills
Skills are among the most powerful wealth seeds available to anyone.
Money flows toward value.
Skills create value.
The more valuable your skill, the greater your potential harvest.
A person who solves a NGN 5,000 problem receives a smaller reward than someone who solves a NGN 5,000,000 problem.
The market rewards usefulness.
Not effort alone.
Not intentions alone.
Not wishes alone.
Usefulness.
This is why two people can work equally hard yet experience completely different financial outcomes.
One possesses a highly valuable skill.
The other does not.
The lesson is simple:
Your income often reflects the value of the problems you can solve.

The Seed You Already Possess
Many people underestimate what they already know.
A teacher possesses knowledge.
A carpenter possesses craftsmanship.
A software developer possesses technical expertise.
An architect possesses design capability.
An entrepreneur possesses problem-solving ability.
"Hidden inside a seed is the potential for an entire forest. Your income reflects the value of the problems you can solve."
"Do I have a seed?"
The question is:
"Am I planting it?"

Seed Two: Knowledge
Knowledge is fertilizer for every other seed.
Without knowledge, opportunities are often missed.
Without knowledge, mistakes become expensive.
Without knowledge, growth slows.
The wealthiest people in every generation understand the power of learning.
They read.
Study.
Observe.
Adapt.
The world changes constantly.
Those who continue learning remain valuable.
Those who stop learning gradually become irrelevant.

The Cost of Ignorance
Imagine two people receiving NGN 1,000,000.
One understands business.
The other does not.
One understands investing.
The other does not.
One understands cash flow.
The other does not.
Five years later, their financial outcomes will likely be very different.
Not because of the money.
Because of what they knew.
Knowledge determines how effectively you use opportunities.

Seed Three: Relationships
Farmers rarely succeed alone.
They rely on suppliers.
Workers.
Buyers.
Experts.
Communities.
The same applies to wealth.
Many opportunities come through people.
Jobs come through people.
Business partnerships come through people.
Referrals come through people.
Mentorship comes through people.
The quality of your relationships influences the quality of opportunities available to you.

The Conversation That Changed Everything
A young graduate attended a conference he almost skipped.
He knew nobody there.
Felt uncomfortable.
Almost left early.
Then he started a conversation with someone sitting beside him.
That conversation eventually led to an internship.
The internship led to employment.
The employment led to leadership opportunities.
Years later, he often traced his career back to a single conversation.
One relationship became a seed.
One seed became a harvest.
Never underestimate people.
Many opportunities arrive disguised as relationships.

Seed Four: Opportunities
Opportunities are seeds many people overlook because they often arrive dressed as work.
Some people pray for breakthroughs.
Then ignore opportunities because they appear inconvenient.
A farmer knows that harvest requires effort.
Likewise, opportunity often requires action.
Many successful businesses began as simple observations.
Someone noticed a problem.
Created a solution.
Served people.
And built value.
Opportunities are everywhere.
The challenge is learning to recognize them.

Seed Five: Character and Reputation
Imagine two people with identical skills.
One is trustworthy.
The other is unreliable.
One keeps promises.
The other breaks them.
One protects relationships.
The other damages them.
Who do you think receives more opportunities?
Character is a wealth seed.
Trust is a wealth seed.
Integrity is a wealth seed.
Reputation is a wealth seed.
Many people focus on making money.
The wisest people focus on becoming the kind of person money naturally follows.

The Law of Seed Multiplication
Farmers understand something remarkable.
One seed can produce hundreds more.
One maize seed produces multiple cobs.
One mango seed can eventually produce thousands of mangoes.
Wealth follows the same pattern.
One skill can produce income.
That income can buy knowledge.
That knowledge can create opportunities.
Those opportunities can build businesses.
Those businesses can create assets.
Assets can generate wealth.
The secret is planting.
Not merely possessing.

WORKBOOK: Money Farming Action Step
Identify the seeds you currently possess in skills, knowledge, relationships, opportunities, and character. Which are you actively planting, and which are you neglecting?
Create five columns:
Skills
Knowledge
Relationships
Opportunities
Character
Under each column, write every seed you currently possess.
Do not underestimate yourself.
Do not focus on what you lack.
Focus on what you already have.
Then ask:
Which of these seeds am I actively planting?
Which am I neglecting?
The future harvest you desire may already be in your hands.
It simply needs to be planted.

Money Farming Principle III
Wealth does not begin with money. It begins with seeds. Skills, knowledge, relationships, opportunities, and character are the true seeds. Those who plant valuable seeds eventually enjoy harvests others call luck.`;

  renderMultiPageText("Chapter 3: Planting Wealth Seeds", chapter3FullText);

  const chapter4FullText = `The Bamboo Farmer's Dilemma
In a rural community, a farmer planted bamboo seeds on a piece of land he had carefully prepared.
Every morning he watered the soil.
Every evening he checked the field.
A month passed.
Nothing appeared.
Three months passed.
Still nothing.
Six months passed.
The land looked exactly the same.
Neighbors laughed.
Friends questioned his decision.
Some suggested he had planted dead seeds.
Others advised him to give up and plant something else.
But the farmer continued.
One year passed.
Nothing.
Two years passed.
Nothing.
Three years passed.
Still no visible growth.
Yet every morning he watered the soil.
Every evening he tended the field.
Then something remarkable happened.
The bamboo finally emerged.
Within a short period, it grew rapidly.
The neighbors were amazed.
They called it an overnight success.
But the farmer knew better.
The growth had not started that year.
The growth had started years earlier beneath the surface.
The roots had been developing where nobody could see them.
The bamboo was not growing suddenly.
It was revealing what had already been happening underground.
Many financial journeys follow the same pattern.
People see the visible success.
They rarely see the invisible preparation.

Why Most People Quit Too Early
The greatest enemy of wealth is not failure.
It is impatience.
Many people plant seeds.
Few remain long enough to see harvest.
They start businesses.
Then quit after six months.
They learn new skills.
Then stop when progress feels slow.
They begin investing.
Then withdraw when returns seem insignificant.
They start writing books.
Then abandon the process because results are not immediate.
The problem is not the seed.
The problem is the expectation.
Many people expect harvest during planting season.
Farmers understand that seasons exist for a reason.

The Invisible Growth Season
One of the most frustrating realities of life is that progress often becomes visible only after it has been happening for a long time.
Consider a child learning to read.
For months it seems as though nothing is changing.
Then suddenly the child begins reading fluently.
The growth was happening all along.
Consider an athlete.
Hours of training produce little visible difference at first.
Then one day performance improves dramatically.
The growth was happening all along.
Consider a business owner.
Months of effort produce few customers.
Then momentum begins.
The growth was happening all along.
"Never confuse invisible progress with the absence of progress. Small actions repeated over time create extraordinary results."

The Story of the Tailor
A young tailor named Ada opened a small fashion shop.
The first few months were difficult.
Customers were scarce.
Income was inconsistent.
Some days she questioned whether she had made the right decision.
But she continued improving.
She studied modern designs.
Improved customer service.
Delivered quality work.
Asked for feedback.
Built relationships.
For nearly two years, growth was slow.
Then something changed.
Satisfied customers began referring others.
Social media visibility increased.
Corporate clients emerged.
Within a few years, the same shop that struggled for attention became fully booked.
Many people called her lucky.
But luck had little to do with it.
What they saw was harvest.
What they missed was cultivation.

Water One: Consistency
A farmer does not water crops once and expect abundance.
Growth requires repetition.
Consistency is one of the most underrated wealth principles.
The market rewards people who continue showing up.
Not occasionally.
Consistently.
A person who reads ten pages daily often learns more than someone who reads an entire book once every six months.
A business that serves customers consistently builds trust.
A professional who improves consistently becomes valuable.
Small actions repeated over time create extraordinary results.

The Mathematics of Growth
Imagine improving by just one percent every day.
The improvement feels insignificant.
Almost invisible.
Yet over time the compound effect becomes extraordinary.
Many people underestimate what consistency can achieve because daily progress feels too small.
Farmers understand that harvest is rarely the result of one dramatic action.
It is usually the result of many small actions repeated faithfully.

Water Two: Discipline
Motivation is useful.
Discipline is essential.
Motivation comes and goes.
Discipline remains.
Farmers do not wait until they feel inspired before tending crops.
The crops require attention whether the farmer feels motivated or not.
The same applies to wealth building.
There will be days when learning feels difficult.
Days when business is slow.
Days when opportunities seem absent.
Days when progress feels invisible.
Discipline keeps you moving during those seasons.

Water Three: Learning and Adaptation
Farmers constantly learn.
Weather patterns change.
Markets change.
Technologies change.
Successful farmers adapt.
Successful wealth builders do the same.
What worked ten years ago may not work today.
Industries evolve.
Customer needs evolve.
Technology evolves.
People who continue learning remain relevant.
People who stop learning often become outdated.
Growth requires adaptation.

Water Four: Patience
Patience is not passive waiting.
Patience is active persistence.
It is continuing to plant, water, and nurture despite not seeing immediate results.
Patience does not mean doing nothing.
Patience means doing the right things long enough for results to appear.
Many people abandon their dreams inches away from breakthrough because they mistake delayed results for failure.
Farmers know better.
They trust the process.

The Danger of Digging Up Seeds
Imagine planting maize today.
Tomorrow you dig it up to check progress.
The next day you dig it up again.
And again.
Eventually you destroy the seed.
Many people do the same with their goals.
They constantly change direction.
Jump from one opportunity to another.
Start and stop repeatedly.
Move from one business idea to the next before giving any of them time to mature.
Growth requires commitment.
Constant interruption kills momentum.

The Harvest Mindset
People who succeed financially understand something powerful:
Growth is a process.
Not an event.
The entrepreneur you admire once struggled.
The author you respect once wrote unseen pages.
The investor you envy once started with a small amount.
The leader you celebrate once felt uncertain.
Every harvest has a hidden history.
Every success has an invisible season.
Every achievement has roots beneath the surface.

Reflection Questions
1. What seeds have I planted recently?
2. Have I given those seeds enough time to grow?
3. What habits am I practicing consistently?
4. Where am I expecting instant results?
5. What would happen if I stayed committed for another year?

Money Farming Action Step
Identify one wealth seed you planted in the last twelve months and identify three actions to nurture it.
It could be:
- A skill
- A business
- A book
- An investment
- A relationship
- A career path

Then ask yourself:
"Am I nurturing this seed consistently, or am I abandoning it too soon?"
Write down three actions you will take this week to nurture that seed.
Small actions matter.
Repeated actions matter more.

Money Farming Principle IV
Seeds grow when they are nurtured.
Likewise, wealth grows when skills, opportunities, relationships, and ideas receive consistent attention.
The people who enjoy extraordinary harvests are rarely the people who planted the most seeds.
They are usually the people who nurtured their seeds the longest.
Because in both farming and wealth creation, the greatest rewards often belong to those who refuse to quit before the harvest arrives.`;

  renderMultiPageText("Chapter 4: Nurturing Growth", chapter4FullText);

  const chapter5FullText = `The Farm That Should Have Flourished
In a community on the outskirts of Benin City lived a farmer named Okoro.
For years, he was known for having some of the most fertile land in the area.
The soil was rich.
The rainfall was favorable.
The seeds were high quality.
Everything seemed positioned for success.
Yet every harvest season, his yields were disappointing.
His neighbors were confused.
How could someone with such good land produce such poor results?
One season, an agricultural officer visited his farm.
After a careful inspection, the problem became obvious.
The issue was not the soil.
The issue was not the seeds.
The issue was not the weather.
The farm was overrun with weeds.
The weeds were stealing nutrients.
Stealing water.
Stealing sunlight.
Everything intended for the crops was being consumed by unwanted growth.
The farmer had focused so much on planting that he neglected removing what was destroying the harvest.
Many people do the same with money.
They work hard.
Learn skills.
Start businesses.
Create opportunities.
Yet wealth never seems to grow.
Not because they lack seeds.
"Wealth never seems to grow when financial weeds are silently consuming everything intended for the crops."
But because financial weeds are silently consuming their harvest.

What Are Financial Weeds?
Financial weeds are habits, behaviors, and decisions that quietly destroy wealth.
Unlike major financial disasters, weeds often go unnoticed.
They grow gradually.
Quietly.
Patiently.
Until one day they have consumed opportunities that should have produced abundance.
The dangerous thing about weeds is that they often appear harmless at first.
A little unnecessary spending.
A little procrastination.
A little debt.
A little carelessness.
A little comparison.
Over time, these small habits become major obstacles.

Weed One: Lifestyle Inflation
When Chika got promoted, she promised herself she would save and invest the additional income.
But something else happened.
She upgraded her apartment.
Bought a more expensive car.
Increased her entertainment budget.
Changed her shopping habits.
Within months, her higher salary had disappeared into a higher lifestyle.
Her income increased.
Her wealth did not.
This is one of the most common financial weeds.
As income grows, expenses grow at the same pace--or faster.
The result is a person who earns more but never becomes wealthier.
A farmer who consumes every harvest remains trapped in the same cycle season after season.
Growth requires preserving seeds.
Not consuming everything.

Weed Two: Bad Debt
Debt is not always harmful.
Some debt can create assets and opportunities.
However, destructive debt behaves like an aggressive weed.
It spreads quickly.
Consumes resources.
And limits future growth.
Many people are paying today for decisions made years ago.
They are financing lifestyles they could not afford.
Purchasing liabilities instead of assets.
Borrowing for consumption rather than growth.
The danger of debt is not merely the money borrowed.
The danger is the future opportunities sacrificed.
Every naira used to service unnecessary debt is a seed that cannot be planted elsewhere.

The Cost of One Decision
A young professional purchased a luxury vehicle far beyond his means.
The monthly repayments consumed a significant portion of his income.
For years he appeared successful.
But behind the appearance was constant pressure.
Investment opportunities passed by.
Business opportunities were ignored.
Savings remained nonexistent.
The car created admiration.
But it also created limitation.
What looked like success was quietly stealing his future harvest.

Weed Three: Procrastination
Few weeds are as destructive as procrastination.
Many people know exactly what they should do.
They simply postpone doing it.
The business idea waits.
The course remains unfinished.
The investment is delayed.
The book remains unwritten.
The opportunity expires.
Days become weeks.
Weeks become months.
Months become years.
And potential harvests never materialize.
The tragedy of procrastination is not lost time.
It is lost possibility.

The Opportunity That Never Returned
A young graduate once had an opportunity to join a growing technology startup.
The role offered little pay initially but tremendous learning potential.
He delayed his decision.
Wanted more time.
Wanted greater certainty.
Wanted perfect conditions.
By the time he responded, the position had been filled.
Years later, the company became one of the fastest-growing businesses in its industry.
The opportunity had been a seed.
His delay prevented planting.

Weed Four: Fear
Fear has buried more dreams than failure ever has.
Fear of rejection.
Fear of criticism.
Fear of loss.
Fear of uncertainty.
Fear convinces people to remain where they are rather than pursue where they could be.
Many individuals spend years waiting until they feel ready.
The truth is that very few people ever feel completely ready.
Farmers plant despite uncertainty.
They cannot control every factor.
But they plant anyway.
Likewise, wealth builders act despite fear.

Weed Five: Comparison
One of the fastest ways to destroy financial progress is to compare your journey with someone else's highlight reel.
Social media has intensified this problem.
People compare their beginnings to another person's middle.
Their struggles to another person's success.
Their reality to another person's presentation.
Comparison often creates pressure to spend money for appearances rather than purpose.
Many financial mistakes are born from the desire to impress people who are not paying attention.
A farmer who constantly stares at another person's farm eventually neglects his own.

Weed Six: Lack of Financial Education
Many people work for money their entire lives without learning how money works.
They understand how to earn.
But not how to grow.
Not how to invest.
Not how to multiply.
Not how to protect.
Financial ignorance is expensive.
The cost is often invisible until years later.
Knowledge may require effort.
Ignorance usually requires a greater price.

The Silent Drain
Imagine a bucket filled with water.
You pour more water into it every day.
Yet the bucket never becomes full.
Eventually you discover several holes at the bottom.
The problem was never the amount of water entering.
The problem was what was leaking.
Many people focus exclusively on earning more.
Few examine what is draining their wealth.
Income matters.
But removing leaks matters too.

The Courage to Weed
Removing weeds is rarely comfortable.
It requires honesty.
Discipline.
Self-awareness.
Difficult decisions.
Sometimes it means changing habits.
Sometimes it means reducing expenses.
Sometimes it means ending unhealthy financial patterns.
Sometimes it means saying no to appearances in order to say yes to long-term abundance.
Yet every healthy farm requires weeding.
And every healthy financial future requires the same.

Reflection Questions
1. What financial weed is causing the most damage in my life?
2. Am I increasing my lifestyle as quickly as I increase my income?
3. What opportunity have I delayed because of fear or procrastination?
4. What habits are silently draining my resources?
5. Am I spending to build wealth or spending to impress others?

WORKBOOK: Money Farming Action Step
Perform a Financial Weed Audit. Identify one habit to eliminate immediately--the one behavior that steals the most time or opportunity from your future harvest.
Create three columns:
- Habits to Keep
- Habits to Reduce
- Habits to Eliminate
Be brutally honest.
Identify every behavior that steals time, money, energy, or opportunity.
Then choose one weed to remove immediately.
Remember:
A healthy harvest is not only about what you plant.
It is also about what you remove.

Money Farming Principle V
Great wealth builders do not simply create income; they identify and eliminate the habits and behaviors that quietly destroy growth. Sometimes the fastest way to increase your harvest is to remove what has been stealing it.`;

  renderMultiPageText("Chapter 5: Removing Financial Weeds", chapter5FullText);

  const chapter6FullText = `The Farmer Who Refused to Celebrate
The villagers thought something was wrong with Chief Nwosu.
After years of hard work, his farm had finally produced its largest harvest.
The barns were full.
Buyers traveled from distant towns to purchase his produce.
His profits exceeded anything he had earned before.
Yet while everyone expected a grand celebration, Chief Nwosu remained unusually calm.
One evening, a young farmer approached him.
"Chief, why aren't you celebrating? This is the biggest harvest you've ever had."
The old farmer smiled.
"I am celebrating."
The young man looked confused.
"Then why aren't you spending the money?"
Chief Nwosu pointed toward another section of land.
"Because next season has already started."
The young farmer followed his gaze.
Workers were already preparing new fields.
New seeds had already been purchased.
New irrigation systems were being installed.

The old farmer understood something many people never learn:
A harvest is not the end of the journey.
A harvest is a test.
What you do after the harvest determines whether wealth grows or disappears.

Why Many People Lose Their Harvest
Most people dream about making money.
Few prepare for what happens after they make it.
They imagine the promotion.
The successful business.
The large contract.
The investment returns.
The financial breakthrough.
But when the harvest arrives, they often make one critical mistake:
They consume what should have been multiplied.
This is why some people earn millions yet remain financially fragile.
The issue is not their ability to earn.
The issue is their ability to manage harvest.

The Difference Between Income and Wealth
Many people use these words interchangeably.
They are not the same.
Income is what you earn.
Wealth is what you keep, grow, and own.
A person may have a high income and little wealth.
Another person may have moderate income but substantial wealth.
One focuses on earning.
The other focuses on accumulating assets.
Imagine two brothers.
Both earn NGN 500,000 monthly.
The first spends almost everything.
The second invests part of his earnings into assets.
Ten years later, their financial lives will look dramatically different.
The difference is not income.
The difference is stewardship.

Harvest One: Recognizing Your Harvest
Many people overlook harvest because it does not always arrive as cash.
Sometimes harvest appears as:
- New skills
- Valuable relationships
- Increased confidence
- Business opportunities
- Industry reputation
- Knowledge and expertise
Money is only one form of harvest.
Some of the most profitable opportunities begin as non-financial rewards.
The mentor you meet today may become tomorrow's business partner.
The skill you develop today may become tomorrow's income stream.
The relationship you build today may unlock future opportunities.
Wise people recognize harvest in all its forms.

The Story of the Young Speaker
A young speaker was invited to address a small audience.
There was no payment.
The event was modest.
Many people advised him not to attend.
They believed the opportunity lacked value.
He accepted anyway.
Unknown to him, someone in the audience managed a large organization.
Impressed by his presentation, the manager later invited him to conduct corporate training.
What began as a free engagement eventually generated significant income.
The first harvest was not money.
The first harvest was exposure.
And exposure produced opportunity.

Harvest Two: Turning Income into Assets
One of the most important lessons in Money Farming is this:
Income feeds you.
Assets free you.
Income requires effort.
Assets continue producing value over time.
Examples include:
- Businesses
- Investments
- Intellectual property
- Rental properties
- Digital products
- Books
- Valuable brands
Assets behave like productive farmland.
They continue generating returns long after the initial effort.
The wealthy often focus less on consumption and more on asset creation.

The Book That Became a Farm
An author spent months writing a book.
The process was difficult.
The income was uncertain.
Many people questioned whether the effort was worthwhile.
Years later, the same book continued generating revenue.
It attracted speaking engagements.
Built credibility.
Opened business opportunities.
Created partnerships.
The book became more than a product.
It became an asset.
This is the power of wealth farming.
One seed can continue producing harvest long after it is planted.

Harvest Three: Multiple Streams of Income
A wise farmer rarely depends on one crop.
If weather damages one harvest, another may survive.
Likewise, relying entirely on one source of income creates vulnerability.
Life is unpredictable.
Industries change.
Economies fluctuate.
Opportunities shift.
Multiple income streams create resilience.
Examples include:
- Salary
- Business income
- Consulting
- Investments
- Royalties
- Digital products
- Real estate
The goal is not complexity.
The goal is stability.
A diversified harvest provides greater security.

The Lesson from the Pandemic
During difficult economic periods, many people discovered the risk of depending on a single income source.
Some businesses closed.
Some industries slowed.
Some jobs disappeared.
Yet individuals with multiple streams of income often adapted more effectively.
The lesson became clear:
A farmer with several crops is usually more secure than one relying on a single field.

Harvest Four: Reinvestment
One of the defining habits of wealth builders is reinvestment.
When harvest arrives, they ask:
"How much of this should be planted again?"
This mindset separates temporary success from lasting wealth.
Every harvest contains three possibilities:
Consume it.
Save it.
Multiply it.
The most successful people prioritize multiplication.
They understand that today's harvest can become tomorrow's abundance.

The Business Owner's Choice
A business owner experienced his most profitable year.
For the first time, he had enough money to purchase luxury items he had always desired.
Instead, he reinvested a significant portion into improving systems, training employees, and expanding operations.
The decision required discipline.
But within a few years, the business had multiplied several times over.
The sacrifice of immediate gratification produced greater long-term rewards.

Harvest Five: Building Systems
Many people build income.
Few build systems.
Income depends on effort.
Systems create consistency.
A system is any process that continues creating value even when you are not actively working.
Examples include:
- Automated businesses
- Training programs
- Books
- Digital platforms
- Intellectual property
- Teams and organizations
The ultimate goal of Money Farming is not merely to work harder.
It is to create systems that continue producing harvest.
Farmers eventually move beyond planting by hand.
They build irrigation systems.
Storage facilities.
Distribution networks.
Likewise, wealth builders create structures that multiply their efforts.

Reflection Questions
1. What forms of harvest currently exist in my life?
2. Am I consuming too much of my harvest?
3. What assets am I building?
4. How many income streams support my financial future?
5. What system could I create that continues producing value over time?

Money Farming Action Step
Create a "Harvest Plan" by dividing your income source into Consume, Save, and Multiply categories.
Divide a sheet into three sections:
- Consume
- Save
- Multiply
For every income source you receive this month, decide beforehand how much belongs in each category.
Do not wait until the money arrives.
Plan before the harvest comes.
The farmer who plans for harvest manages abundance wisely.
The farmer who does not plan often loses it.

Money Farming Principle VI
Harvest is not measured by how much money you make.
Harvest is measured by how much value you create, how much wealth you preserve, and how effectively you multiply what you receive.
True wealth belongs to those who transform harvest into future harvests.
Because the goal of Money Farming is not simply earning more.
The goal is creating a cycle of continuous abundance.`;

  renderMultiPageText("Chapter 6: Harvesting Wealth", chapter6FullText);

  const chapter7FullText = `The Old Man's Final Harvest
The village gathered beneath a large tree to celebrate the life of Pa Eze.
For over forty years, he had been one of the most respected farmers in the region.
His farms stretched across several acres.
His harvests were legendary.
His wisdom was widely sought.
As family members prepared to distribute his estate, one of his grandsons asked a question.
"What was Grandpa's greatest achievement?"
Some pointed to the farmland.
Others mentioned the houses he built.
A few spoke about the businesses he owned.
But an elderly friend who had known Pa Eze for decades shook his head.
"No."
The crowd turned toward him.
"The greatest thing he left behind was not what he owned."
He pointed toward Pa Eze's children and grandchildren.
"It was what he taught."

Silence filled the gathering.
The old man continued.
"He taught his children how to think, how to work, how to save, how to invest, and how to build. The farms may disappear. The houses may change ownership. The money may come and go. But the knowledge he planted in people will continue producing harvests long after we are gone."
That day, the family understood something powerful.
The greatest harvest is not what you leave for people.
The greatest harvest is what you leave in people.

Beyond Personal Success
Many people spend their lives pursuing financial success.
That is important.
But Money Farming is not complete when wealth is accumulated.
It is complete when wealth can survive beyond the individual who created it.
A farmer who consumes every harvest leaves little behind.
A farmer who replants creates future harvests.
The same principle applies to wealth.
The question is not simply:
"How much can I earn?"
The deeper question is:
"What will remain after me?"

The Difference Between Riches and Legacy
Riches can disappear in a generation.
Legacy can endure for centuries.
History is filled with examples of families that inherited wealth but lacked the wisdom required to sustain it.
The money disappeared.
The assets disappeared.
The opportunities disappeared.
Why?
Because wealth was transferred.
Wisdom was not.
Money without wisdom is like giving seeds to someone who has never learned farming.
Eventually the seeds are consumed instead of planted.

Replanting Principle One: Teach What You Know
One of the greatest mistakes people make is assuming that others automatically know what they know.
They don't.
Knowledge must be intentionally transferred.
If you have learned lessons about money, business, discipline, leadership, or life, teach them.
Teach your children.
Teach your employees.
Teach your mentees.
Teach your community.
The farmer who teaches others how to plant multiplies harvests beyond his own field.

The Apprentice
A successful carpenter owned one of the busiest workshops in town.
For years he focused entirely on building furniture.
One day he realized something.
If he died, his knowledge would die with him.
So he began training apprentices.
The process was slow.
Sometimes frustrating.
But over time, those apprentices became masters themselves.
Years later, his influence extended far beyond his own workshop.
His harvest had multiplied through people.
That is legacy.

Replanting Principle Two: Build Systems, Not Dependence
Many businesses collapse when the founder leaves.
Why?
Because everything depends on one person.
True wealth requires systems.
A system is something that continues functioning even when you are absent.
Examples include:
- Documented processes
- Trained teams
- Educational programs
- Books
- Intellectual property
- Digital platforms
Systems transform individual effort into lasting impact.
The farmer who builds irrigation systems creates value long after he stops carrying water.

Replanting Principle Three: Create Assets That Outlive You
Some assets continue producing harvests for years.
Sometimes decades.
Sometimes generations.
A book can continue teaching readers long after the author is gone.
A business can continue serving customers.
A property can continue generating income.
An investment can continue growing.
A scholarship fund can continue transforming lives.
The question is:
"What am I building today that can still create value tomorrow?"

The Author's Legacy
A writer spends months creating a book.
The process feels exhausting.
At times it seems insignificant.
Then years later, a reader encounters that book.
The ideas change a life.
That life influences others.
The ripple continues.
The author may never meet those people.
Yet the harvest continues.
That is the power of creating assets that outlive you.

Replanting Principle Four: Build a Legacy of Values
Money is important.
But values determine how money is used.
A family that inherits wealth without discipline often loses wealth.
A family that inherits wealth and values often multiplies it.
The most valuable inheritance is not money.
It is character.
Integrity.
Responsibility.
Discipline.
Generosity.
Service.
These values become the roots that sustain future harvests.

The Family Business
A father spent thirty years building a successful enterprise.
When he retired, people assumed the business would struggle.
Instead, it continued growing.
Why?
Because he had spent years teaching his children more than operational skills.
He taught them values.
He taught them stewardship.
He taught them responsibility.
The business survived because the roots were strong.
Strong roots support future harvests.

Replanting Principle Five: Become a Person of Multiplication
Many people focus on accumulation.
Money Farming focuses on multiplication.
Accumulation asks:
"How much can I gather?"
Multiplication asks:
"How much can I grow?"
Accumulation focuses on possession.
Multiplication focuses on impact.
The greatest wealth builders understand that true success is measured not only by personal gain but by collective growth.
They help others rise.
They create opportunities.
They build communities.
They leave things better than they found them.

The Forest Principle
A single tree may produce fruit.
A forest transforms an ecosystem.
The goal of Money Farming is not merely to become a successful tree.
The goal is to plant a forest.
To create opportunities that continue growing.
To build systems that continue serving.
To transfer wisdom that continues multiplying.
To leave a legacy that continues producing harvests.

Reflection Questions
1. What knowledge am I passing on to others?
2. If I were absent tomorrow, what would continue functioning?
3. What assets am I building that can outlive me?
4. What values am I transferring to the next generation?
5. Am I accumulating wealth or multiplying impact?

WORKBOOK: Money Farming Action Step
Create your Legacy List: choose one person to mentor, one long-term asset to build, and one core value you want future generations to remember.
Write down:
- One person you will intentionally mentor.
- One asset you will begin building this year.
- One system you will improve.
- One lesson you want future generations to remember.
Then take action immediately.
Legacy is not built someday.
It is built today.

Money Farming Principle VII
Success is not a destination; it is a cycle. Plant, grow, protect, harvest, replant, and repeat.
True wealth belongs to those whose influence and wisdom continue producing harvests long after they are gone.
Likewise, true wealth builders understand that success is not a destination.
It is a cycle.
Plant.
Grow.
Protect.
Harvest.
Replant.
And repeat.
The wealthiest individuals are not necessarily those who possess the most money.
They are often those whose influence, wisdom, systems, and values continue producing harvests long after they are gone.
That is the highest form of Money Farming.
That is generational wealth.
That is legacy.`;

  renderMultiPageText("Chapter 7: Replanting for Generational Wealth", chapter7FullText);

  const conclusionFullText = `The sun was setting.
The young man sat quietly beside the old farmer.
The same farmer who had handed him a handful of seeds years earlier.
The same farmer who taught him lessons about wealth that no classroom had ever explained.
Much had changed since that conversation.
The young man was no longer struggling financially.
He had built a business.
Developed valuable skills.
Created multiple streams of income.
Learned to save.
Learned to invest.
Learned to create value.
Most importantly, he had learned to think differently.
As they sat together, he looked toward the fields stretching into the distance.
Some had recently been harvested.
Others were being prepared for planting.
A few contained young crops just beginning to emerge.
The farmer broke the silence.
"What do you see?"
The young man smiled.
"I see different seasons."
The farmer nodded.
"And what does that teach you?"
The young man thought carefully.
Then he answered.
"That the harvest is not the end."
The old farmer smiled.
For the first time, the student had become the teacher.

The Journey You Have Taken
Throughout this book, you have traveled through the complete cycle of Money Farming.
You learned that wealth begins with understanding.
You discovered that before planting seeds, you must prepare the soil.
You learned how valuable seeds are hidden inside skills, knowledge, opportunities, relationships, and character.
You discovered the importance of nurturing growth through consistency, discipline, learning, and patience.
You learned how financial weeds silently destroy wealth and how removing them protects future harvests.
You explored how wealth is harvested, multiplied, and transformed into assets.
Finally, you learned that true success extends beyond personal gain into legacy and generational impact.

The principles may sound simple.
Because they are.
But simplicity should never be mistaken for weakness.
Entire forests emerge from simple seeds.
Entire fortunes emerge from simple habits.
Entire legacies emerge from simple decisions repeated consistently over time.

The Great Wealth Myth
Many people spend their lives searching for a secret formula.
A shortcut.
A hidden opportunity.
A magical breakthrough.
They believe wealth belongs to a select few.
The lucky.
The connected.
The gifted.
But history tells a different story.
Most lasting wealth was built.
Patiently.
Deliberately.
Consistently.
The farmer understands this better than anyone.
He does not pray for harvest while refusing to plant.
He does not blame the soil while neglecting preparation.
He does not expect fruit from seeds planted yesterday.
He respects the process.
And the process rewards him.
Money works the same way.

The Question That Changes Everything
Perhaps the most important question in this entire book is not:
"How much money do I have?"
Nor is it:
"How much money do I want?"
The question is:
"What am I planting today?"
Because your future harvest is hidden inside your present actions.
The skill you are learning today.
The relationship you are building today.
The book you are writing today.
The business you are starting today.
The discipline you are developing today.
The investments you are making today.
These are the seeds from which future abundance grows.

There Will Always Be Another Season
One of the greatest lessons from farming is that life moves in seasons.
There will be planting seasons.
There will be growing seasons.
There will be waiting seasons.
There will be harvest seasons.
Some seasons will feel exciting.
Others will feel difficult.
Some seasons will produce extraordinary results.
Others will teach valuable lessons.
Do not become discouraged when growth feels slow.
Do not become arrogant when harvest arrives.
Every season has a purpose.
Every season contains a lesson.
Every season prepares you for the next.

Your Money Farming Commitment
As you close this book, make a commitment to yourself.
Commit to becoming a lifelong farmer.
Commit to planting valuable seeds.
Commit to nurturing growth.
Commit to removing weeds.
Commit to multiplying harvests.
Commit to building assets.
Commit to transferring wisdom.
Commit to leaving a legacy.
The world does not need more people chasing money.
The world needs more people creating value.
Because value creates wealth.
And wealth creates opportunities.
And opportunities create transformation.

A Final Story
Many years from now, imagine someone asking about your life.
Imagine they ask:
"What did this person leave behind?"
Will the answer be limited to money?
Or will it include lives changed?
Businesses built?
Knowledge shared?
Problems solved?
Communities strengthened?
Future generations empowered?
The greatest farmers are remembered not because of what they harvested.
They are remembered because of what they planted.

Final Reflection
As you turn this final page, pause and ask yourself:
What seed am I carrying?
What soil am I preparing?
What harvest am I building?
What legacy am I leaving?
Then begin.
Not tomorrow.
Not next month.
Not when conditions are perfect.
Begin today.
Because every great harvest starts exactly the same way.
With one seed.
One decision.
One action.
One planting season.
And your next planting season begins now.`;

  renderMultiPageText("Conclusion: The Next Planting Season", conclusionFullText);

  const finalDeclText = `FINAL MONEY FARMING DECLARATION

I will not merely earn money.
I will create value.
I will not consume every harvest.
I will preserve seeds for the future.
I will nurture growth with patience and discipline.
I will remove habits that destroy abundance.
I will build assets, not just income.
I will multiply opportunities for myself and others.
I will leave behind wisdom, impact, and legacy.
I am a Money Farmer.
And I understand that true wealth is grown.`;

  renderMultiPageText("Final Money Farming Declaration", finalDeclText);

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
Great harvests are never accidental.
They are cultivated.
Plant wisely.
Grow intentionally.
Harvest abundantly.
Leave a legacy.`;

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
