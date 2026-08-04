const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const WTemplate = require('./workbook-template');

async function run() {
  const doc = await PDFDocument.create();
  const fonts = await WTemplate.embedFonts(doc);
  const PW = 612, PH = 792;
  
  const coverImg = path.join(__dirname, '..', 'public', 'images', 'cover_flower_vase.jpg');
  const lifestyleImg = path.join(__dirname, '..', 'public', 'images', 'lifestyle_woman.jpg');

  // COVER
  const p1 = doc.addPage([PW, PH]);
  await WTemplate.cover(p1, { 
    title: 'WORK BOOK', 
    subtitle: 'Master Your Skills with This Workbook', 
    author: 'Zeki Ubor', 
    fonts, 
    coverImage: fs.existsSync(coverImg) ? coverImg : null, 
    doc 
  });

  // COPYRIGHT
  const p2 = doc.addPage([PW, PH]);
  WTemplate.copyrightPage(p2, {
    title: 'Money Farming: The 7 Principles for Planting, Growing, and Harvesting Wealth',
    author: 'Zeki Ubor',
    dedication: 'To every dreamer who has worked hard yet wondered why financial abundance seemed far away.\nMay this book help you discover that wealth is not a mystery—it is a harvest.',
    fonts,
  });

  // TOC
  const p3 = doc.addPage([PW, PH]);
  WTemplate.tocPage(p3, {
    fonts,
    chapters: [
      { num: '01', title: 'Understanding Money Farming', pg: 4 },
      { num: '02', title: 'Preparing Your Financial Soil', pg: 7 },
      { num: '03', title: 'Planting Wealth Seeds', pg: 10 },
      { num: '04', title: 'Nurturing Growth', pg: 13 },
      { num: '05', title: 'Removing Financial Weeds', pg: 16 },
      { num: '06', title: 'Harvesting Wealth', pg: 19 },
      { num: '07', title: 'Replanting for Generational Wealth', pg: 22 },
      { num: '08', title: 'Conclusion', pg: 25 },
    ],
  });

  const chapters = [
    {
      title: 'Chapter 1', sub: 'Understanding Money Farming',
      body: `The Man Who Sold His Harvest

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
"Papa, I work hard but nothing stays with me."
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
A seed.`,
      image: lifestyleImg,
      isStory: true
    },
    {
      title: 'Chapter 2', sub: 'Preparing Your Financial Soil',
      body: `The Harvest That Never Came

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
Money amplifies what already exists.
If discipline exists, money expands discipline.
If wisdom exists, money expands wisdom.
If confusion exists, money expands confusion.

Money is an amplifier.
Not a transformer.
A farmer understands this principle.
No matter how expensive the seeds are, bad soil produces disappointing harvests.
Before planting wealth, you must prepare your financial soil.`,
      image: null,
      isStory: false
    },
    {
      title: 'Chapter 3', sub: 'Planting Wealth Seeds',
      body: `The Mechanic Nobody Noticed

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
But within those seeds lies future abundance.`,
      image: lifestyleImg,
      isStory: true
    }
  ];

  let pgNum = 4;
  for (const ch of chapters) {
    const pg1 = doc.addPage([PW, PH]);
    await WTemplate.standardPage(pg1, { 
      title: ch.title, 
      subtitle: ch.sub, 
      body: ch.body, 
      imagePath: fs.existsSync(ch.image) ? ch.image : null, 
      doc, 
      fonts,
      isStory: ch.isStory 
    });
    WTemplate.decoratePage(pg1, pgNum++, fonts);
  }

  // Final Action Step Page
  const pAct = doc.addPage([PW, PH]);
  WTemplate.standardPage(pAct, {
    title: 'ACTION STEP',
    subtitle: 'Money Farming Action Step',
    body: `Take a sheet of paper.
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
It simply needs to be planted.`,
    imagePath: fs.existsSync(lifestyleImg) ? lifestyleImg : null,
    doc,
    fonts,
    isStory: false
  });
  WTemplate.decoratePage(pAct, pgNum++, fonts);

  const bytes = await doc.save();
  const out = require('path').join(__dirname, '..', 'public', 'documents', 'money-farming.pdf');
  require('fs').writeFileSync(out, bytes);
  console.log('✅ money-farming.pdf created successfully with Workbook template');
}

run().catch(e => { console.error('❌', e); process.exit(1); });
