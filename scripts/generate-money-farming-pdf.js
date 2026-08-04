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

  const drawWrappedText = (page, text, font, size, color, startX, startY, maxWidth, lineHeight) => {
    const sanitized = cleanText(text);
    const paragraphs = sanitized.split('\n');
    let y = startY;

    for (let para of paragraphs) {
      if (para.trim() === '') {
        y -= lineHeight * 0.7;
        continue;
      }

      const words = para.split(' ');
      let line = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testWidth = font.widthOfTextAtSize(testLine, size);
        if (testWidth > maxWidth && i > 0) {
          page.drawText(line.trim(), { x: startX, y: y, size: size, font: font, color: color });
          line = words[i] + ' ';
          y -= lineHeight;
        } else {
          line = testLine;
        }
      }
      if (line.trim().length > 0) {
        page.drawText(line.trim(), { x: startX, y: y, size: size, font: font, color: color });
        y -= lineHeight;
      }
    }
    return y;
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

  // -------------------------------------------------------------
  // COVER PAGE (Page 1)
  // -------------------------------------------------------------
  const coverPage = pdfDoc.addPage([612, 792]);
  const { width: W, height: H } = coverPage.getSize();

  // Try embedding actual cover image if available
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
    
    // Top Emerald Accent Line
    coverPage.drawRectangle({ x: 0, y: H - 20, width: W, height: 20, color: emeraldGreen });

    coverPage.drawText("MONEY FARMING", { x: (W - fontB.widthOfTextAtSize("MONEY FARMING", 48)) / 2, y: H - 220, size: 48, font: fontB, color: rgb(1, 1, 1) });
    
    const subtitle = "The 7 Principles for Planting, Growing, and Harvesting Wealth";
    const subW = fontIt.widthOfTextAtSize(subtitle, 14);
    coverPage.drawText(subtitle, { x: (W - subW) / 2, y: H - 270, size: 14, font: fontIt, color: emeraldGreen });

    const authorStr = "ZEKI UBOR";
    coverPage.drawText(authorStr, { x: (W - fontB.widthOfTextAtSize(authorStr, 22)) / 2, y: 120, size: 22, font: fontB, color: rgb(1, 1, 1) });
  }

  // -------------------------------------------------------------
  // PAGE 2: DEDICATION & TOC
  // -------------------------------------------------------------
  const page2 = pdfDoc.addPage([612, 792]);
  page2.drawRectangle({ x: 50, y: H - 100, width: 512, height: 40, color: emeraldGreen });
  page2.drawText("DEDICATION", { x: 65, y: H - 90, size: 18, font: fontB, color: rgb(1, 1, 1) });

  let y2 = H - 120;
  const dedText = `To every dreamer who has worked hard yet wondered why financial abundance seemed far away.

May this book help you discover that wealth is not a mystery--it is a harvest.`;

  y2 = drawWrappedText(page2, dedText, fontIt, 11, textDark, 60, y2, 492, 18);
  y2 -= 30;

  page2.drawRectangle({ x: 50, y: y2 - 10, width: 512, height: 35, color: darkCharcoal });
  page2.drawText("TABLE OF CONTENTS", { x: 65, y: y2, size: 16, font: fontB, color: rgb(1, 1, 1) });
  y2 -= 40;

  const tocItems = [
    { title: "Introduction: The Farmer's Secret", page: "2" },
    { title: "Chapter 1: Understanding Money Farming", page: "8" },
    { title: "Chapter 2: Preparing Your Financial Soil", page: "13" },
    { title: "Chapter 3: Planting Wealth Seeds", page: "20" },
    { title: "Chapter 4: Nurturing Growth", page: "31" },
    { title: "Chapter 5: Removing Financial Weeds", page: "41" },
    { title: "Chapter 6: Harvesting Wealth", page: "51" },
    { title: "Chapter 7: Replanting for Generational Wealth", page: "61" },
    { title: "Conclusion: The Next Planting Season", page: "70" },
    { title: "About the Author: Zeki Ubor", page: "77" },
  ];

  for (const item of tocItems) {
    page2.drawText(cleanText(item.title), { x: 65, y: y2, size: 11, font: fontB, color: textDark });
    page2.drawText(item.page, { x: 520, y: y2, size: 11, font: fontB, color: textDark });
    y2 -= 24;
  }
  addHeaderFooter(page2, "Contents", 2);

  // -------------------------------------------------------------
  // INTRODUCTION (Page 2 - 3)
  // -------------------------------------------------------------
  const introPage = pdfDoc.addPage([612, 792]);
  introPage.drawRectangle({ x: 50, y: H - 110, width: 512, height: 45, color: darkCharcoal });
  introPage.drawText("INTRODUCTION: The Farmer's Secret", { x: 65, y: H - 95, size: 18, font: fontB, color: rgb(1, 1, 1) });

  let yIntro = H - 140;
  const introText = `One morning, a young man stood beside an elderly farmer and asked a question that many people ask about money:

"How do I become wealthy?"

The farmer smiled but said nothing. Instead, he handed the young man a handful of seeds. Confused, the young man looked at the seeds and said, "I asked about wealth, not farming."

The farmer replied: "That is the problem. Most people think wealth and farming are different. You cannot harvest what you never planted. You cannot expect abundance from neglected soil. And you cannot plant today and demand a harvest tomorrow."

The young man suddenly understood. Money follows the same laws.

The wealthiest people in the world are not merely earners; they are farmers. They plant ideas, skills, businesses, relationships, and investments. They nurture these seeds over time until they produce harvests far greater than the original seed.

Many people spend their lives chasing money. Few learn how to grow it.

This book introduces a simple but powerful concept called Money Farming. Money Farming is the intentional process of planting value-producing seeds, cultivating opportunities, protecting resources, and harvesting sustainable wealth.

Throughout this book, you will discover seven principles that can transform your relationship with money forever. Welcome to Money Farming.`;

  drawWrappedText(introPage, introText, fontR, 10.5, textDark, 60, yIntro, 492, 17);
  addHeaderFooter(introPage, "Introduction", 3);

  // -------------------------------------------------------------
  // CHAPTER 1: UNDERSTANDING MONEY FARMING (Page 8 - 12)
  // -------------------------------------------------------------
  const c1Page = pdfDoc.addPage([612, 792]);
  c1Page.drawRectangle({ x: 50, y: H - 110, width: 512, height: 45, color: emeraldGreen });
  c1Page.drawText("CHAPTER 1: UNDERSTANDING MONEY FARMING", { x: 65, y: H - 95, size: 16, font: fontB, color: rgb(1, 1, 1) });

  let yC1 = H - 140;
  const c1Text = `The Man Who Sold His Harvest
In 2013, Chinedu worked as a sales representative in Enugu. Every month, his salary arrived. Every month, it disappeared.

His routine never changed: Payday came. Bills came. Friends called. Weekends happened. By the middle of the month, the account balance was almost empty. Then he would wait anxiously for the next salary.

For seven years, Chinedu repeated the same cycle. One evening, while visiting his village, he sat under a mango tree with his grandfather, who had been a farmer for over fifty years. Chinedu complained: "Papa, I work hard but nothing stays with me."

His grandfather asked: "Do you know why farmers keep seeds after harvest?" Chinedu laughed: "So they can plant next season."

His grandfather looked directly into his eyes: "That is your problem. Every month you harvest money. Then you eat all your seeds."

That statement landed heavily. Chinedu was not poor because he earned little. He was poor because he consumed everything. The farmer never eats all his harvest. He preserves some for planting.

Within five years, Chinedu had built a small distribution business that eventually earned more than his salary.

Wealth Is Not Found. It Is Grown.
Many people treat money like treasure. They spend their lives searching for it, looking for shortcuts, lucky breaks, and miracles. Farmers understand a different reality: A harvest is not found. It is grown.

The First Principle of Money Farming:
Money follows value. Farmers produce crops. Businesses produce solutions. Professionals produce expertise. Authors produce knowledge. Teachers produce transformation. The greater the value produced, the greater the harvest received.`;

  drawWrappedText(c1Page, c1Text, fontR, 10.5, textDark, 60, yC1, 492, 17);
  addHeaderFooter(c1Page, "Chapter 1", 8);

  // -------------------------------------------------------------
  // CHAPTER 2: PREPARING YOUR FINANCIAL SOIL (Page 13 - 19)
  // -------------------------------------------------------------
  const c2Page = pdfDoc.addPage([612, 792]);
  c2Page.drawRectangle({ x: 50, y: H - 110, width: 512, height: 45, color: emeraldGreen });
  c2Page.drawText("CHAPTER 2: PREPARING YOUR FINANCIAL SOIL", { x: 65, y: H - 95, size: 16, font: fontB, color: rgb(1, 1, 1) });

  let yC2 = H - 140;
  const c2Text = `The Harvest That Never Came
In 2015, Emeka got the biggest breakthrough of his life. After years of searching, he secured a job with a multinational company in Lagos. His salary was more than three times what he had earned previously.

He moved into a better apartment, bought a newer phone, changed his wardrobe, and ate at expensive places. But at the end of every month, there was almost nothing left. One year later, Emeka was earning more than ever before but was still financially anxious.

Where did all the money go? The problem was never his income. The problem was his soil. More money entered his life, but it entered the same financial habits. And poor soil destroys even the best seeds.

Why Some People Never Prosper:
Money amplifies what already exists. If discipline exists, money expands discipline. If confusion exists, money expands confusion. Money is an amplifier, not a transformer.

The Four Layers of Soil:
1. Responsibility: "My future may have been influenced by others, but it will not be determined by others."
2. Awareness: Understanding what comes in, what goes out, what remains, and what grows.
3. Vision: Vision transforms spending into strategy.
4. Character: Character determines whether abundance becomes a blessing or a burden.

Money Farming Principle II:
A seed cannot overcome poor soil. Before seeking a bigger harvest, prepare better soil.`;

  drawWrappedText(c2Page, c2Text, fontR, 10.5, textDark, 60, yC2, 492, 17);
  addHeaderFooter(c2Page, "Chapter 2", 13);

  // -------------------------------------------------------------
  // CHAPTER 3: PLANTING WEALTH SEEDS (Page 20 - 30)
  // -------------------------------------------------------------
  const c3Page = pdfDoc.addPage([612, 792]);
  c3Page.drawRectangle({ x: 50, y: H - 110, width: 512, height: 45, color: emeraldGreen });
  c3Page.drawText("CHAPTER 3: PLANTING WEALTH SEEDS", { x: 65, y: H - 95, size: 16, font: fontB, color: rgb(1, 1, 1) });

  let yC3 = H - 140;
  const c3Text = `The Mechanic Nobody Noticed
In 2012, a young mechanic named Musa worked in a small workshop in Port Harcourt. Every evening after work, he stayed back to learn. He borrowed manuals, watched videos, asked questions, and studied newer vehicle technologies.

While others spent their evenings entertaining themselves, Musa invested in knowledge. When modern vehicles flooded the market, customers started looking specifically for him. His income multiplied and he eventually opened a training center.

The 5 Essential Wealth Seeds:
Seed One: Skills -- Money flows toward value. Skills create value.
Seed Two: Knowledge -- Knowledge is fertilizer for every other seed.
Seed Three: Relationships -- Many opportunities, jobs, and partnerships arrive disguised as relationships.
Seed Four: Opportunities -- Opportunities often arrive dressed as work.
Seed Five: Character & Reputation -- Integrity, trust, and reputation are powerful wealth seeds.

Money Farming Principle III:
Wealth does not begin with money. It begins with seeds.`;

  drawWrappedText(c3Page, c3Text, fontR, 10.5, textDark, 60, yC3, 492, 17);
  addHeaderFooter(c3Page, "Chapter 3", 20);

  // -------------------------------------------------------------
  // ABOUT THE AUTHOR (Page 77)
  // -------------------------------------------------------------
  const authorPage = pdfDoc.addPage([612, 792]);
  authorPage.drawRectangle({ x: 0, y: H - 240, width: W, height: 240, color: darkCharcoal });
  
  authorPage.drawText("MONEY FARMING", { x: 60, y: H - 90, size: 36, font: fontB, color: emeraldGreen });
  authorPage.drawText("ABOUT THE AUTHOR", { x: 60, y: H - 140, size: 18, font: fontB, color: rgb(1, 1, 1) });
  authorPage.drawText("Zeki Ubor -- Transformational Trainer, Author & Architect", { x: 60, y: H - 170, size: 12, font: fontB, color: rgb(0.9, 0.9, 0.9) });

  let yAuth = H - 280;
  const authorBio = `Zeki Ubor is a transformational trainer, author, entrepreneur, architect, and technology professional passionate about helping individuals discover their value, maximize their potential, and create lasting impact.

Through his teachings, books, training programs, and business ventures, he has dedicated his work to helping people build lives of purpose, productivity, and significance.

He is the creator of transformational initiatives focused on personal growth, leadership development, value creation, and wealth-building principles.

In Money Farming, Zeki combines timeless lessons from farming with practical principles of wealth creation to provide a framework for building sustainable financial success and generational impact.

His message is simple:
Great harvests are never accidental. They are cultivated.
Plant wisely. Grow intentionally. Harvest abundantly. Leave a legacy.`;

  drawWrappedText(authorPage, authorBio, fontR, 10.5, textDark, 60, yAuth, 492, 17);

  authorPage.drawRectangle({ x: 50, y: 60, width: 512, height: 50, color: lightBg, borderColor: borderLine, borderWidth: 1 });
  authorPage.drawText("An Official Origin Publication", { x: 70, y: 90, size: 11, font: fontB, color: darkCharcoal });
  authorPage.drawText("Downloaded via Origin Store * www.origin.com.ng", { x: 70, y: 72, size: 9.5, font: fontR, color: mutedText });

  const pdfBytes = await pdfDoc.save();
  const targetPath = path.join(__dirname, '..', 'public', 'documents', 'money-farming.pdf');

  fs.writeFileSync(targetPath, pdfBytes);
  console.log('✅ "Money Farming" PDF successfully generated at:', targetPath);
}

generateMoneyFarmingPDF().catch(err => console.error(err));
