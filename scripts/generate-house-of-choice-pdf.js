const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateHouseOfChoicePDF() {
  const pdfDoc = await PDFDocument.create();
  const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontIt = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Color Palette - Ocean Blue & Slate Theme matching House of Choice cover
  const oceanBlue = rgb(0.08, 0.32, 0.55); // Deep Blue #14528c
  const darkCharcoal = rgb(0.12, 0.14, 0.16);
  const textDark = rgb(0.18, 0.2, 0.22);
  const mutedText = rgb(0.45, 0.5, 0.55);
  const lightBg = rgb(0.96, 0.96, 0.97);
  const borderLine = rgb(0.85, 0.85, 0.85);

  const cleanText = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/₦/g, 'NGN ')
      .replace(/→/g, '->')
      .replace(/•/g, '-')
      .replace(/·/g, '-')
      .replace(/—/g, '--')
      .replace(/–/g, '-')
      .replace(/“/g, '"')
      .replace(/”/g, '"')
      .replace(/‘/g, "'")
      .replace(/’/g, "'")
      .replace(/◊/g, '*');
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
    page.drawText(cleanText(`HOUSE OF CHOICE -- ${title.toUpperCase()}`), {
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
    page.drawText("© 2025 Zeki Faith • Mindvest Publishing House", {
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
  // PAGE 1: COVER PAGE
  // -------------------------------------------------------------
  const coverPage = pdfDoc.addPage([612, 792]);
  const { width: W, height: H } = coverPage.getSize();

  // Left Blue Wave Block
  coverPage.drawRectangle({ x: 0, y: 0, width: W * 0.45, height: H, color: oceanBlue });
  coverPage.drawRectangle({ x: W * 0.45, y: 0, width: W * 0.55, height: H, color: lightBg });

  coverPage.drawText("HOUSE", { x: W * 0.4, y: H - 240, size: 54, font: fontB, color: darkCharcoal });
  coverPage.drawText("OF", { x: W * 0.4, y: H - 310, size: 54, font: fontB, color: darkCharcoal });
  coverPage.drawText("CHOICE", { x: W * 0.4, y: H - 380, size: 54, font: fontB, color: darkCharcoal });

  coverPage.drawText("RESHAPE YOUR DECISION", { x: W * 0.35, y: H - 450, size: 14, font: fontB, color: textDark });
  coverPage.drawText("RESHAPING YOUR ESSENCE", { x: W * 0.35, y: H - 475, size: 14, font: fontB, color: textDark });

  // Yellow Badge for Author
  coverPage.drawRectangle({ x: W * 0.55, y: 80, width: 180, height: 60, color: rgb(0.95, 0.85, 0.1) });
  coverPage.drawText("ZEKI FAITH", { x: W * 0.55 + 30, y: 105, size: 16, font: fontB, color: darkCharcoal });

  // -------------------------------------------------------------
  // PAGE 2: COPYRIGHT PAGE
  // -------------------------------------------------------------
  const page2 = pdfDoc.addPage([612, 792]);
  let y2 = 180;
  page2.drawText("© 2025", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });
  y2 -= 30;
  page2.drawText("House Of Choice", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });
  y2 -= 20;
  page2.drawText("Author: Zeki Faith", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });
  y2 -= 20;
  page2.drawText("Publisher: Mindvest Publishing House", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });

  // -------------------------------------------------------------
  // PAGE 3-7: TABLE OF CONTENTS
  // -------------------------------------------------------------
  const tocPage = pdfDoc.addPage([612, 792]);
  tocPage.drawRectangle({ x: 50, y: H - 90, width: 512, height: 40, color: rgb(0.9, 0.9, 0.9) });
  tocPage.drawText("Table Of Contents", { x: 60, y: H - 80, size: 24, font: fontB, color: darkCharcoal });

  const tocItems = [
    { title: "Introduction: A Journey Through Choices", page: "i" },
    { title: "Chapter 1: The Foundation of Choice", page: "1" },
    { title: "Chapter 2: The Mechanism of Decision-Making", page: "6" },
    { title: "Chapter 3: Values and Emotions", page: "12" },
    { title: "Chapter 4: Direction and Its Power", page: "18" },
    { title: "Chapter 5: The Role of Environment", page: "23" },
    { title: "Chapter 6: Short-Term vs. Long-Term Thinking", page: "29" },
    { title: "Chapter 7: The Decision Checklist", page: "35" },
    { title: "Chapter 8: Coaching vs. Training", page: "40" },
    { title: "Chapter 9: Case Studies of Success", page: "46" },
    { title: "Chapter 10: Overcoming Decision Paralysis", page: "52" },
    { title: "Chapter 11: Building Decision-Making Habits", page: "58" },
    { title: "Chapter 12: Creating a Legacy Through Choices", page: "64" },
    { title: "Notes", page: "70" },
  ];

  let yToc = H - 120;
  for (const item of tocItems) {
    const isChap = item.title.startsWith("CHAPTER") || item.title.startsWith("Chapter") || item.title.startsWith("Introduction");
    const font = isChap ? fontB : fontR;
    const size = isChap ? 10.5 : 9.5;
    tocPage.drawText(cleanText(item.title), { x: 60, y: yToc, size, font, color: textDark });
    tocPage.drawText(item.page, { x: 520, y: yToc, size, font, color: textDark });
    yToc -= 22;
  }
  addHeaderFooter(tocPage, "Table of Contents", 3);

  // -------------------------------------------------------------
  // INTRODUCTION (Page 9)
  // -------------------------------------------------------------
  const introPage = pdfDoc.addPage([612, 792]);
  introPage.drawRectangle({ x: 50, y: H - 120, width: 512, height: 45, color: darkCharcoal });
  introPage.drawText("Introduction: A Journey Through Choices", { x: 65, y: H - 105, size: 18, font: fontB, color: rgb(1, 1, 1) });

  let yIntro = H - 150;
  const introText = `From the beginning, when time became resident, direction became more powerful than decisions. Even though you need both, direction shapes the course while decisions provide the fuel.

In this book, we will explore the art of making better choices, diving deep into the mechanics of decision-making, the psychology behind it, and actionable strategies to improve it. The journey ahead promises to be very transformative, practical, and enduring--designed to leave an imprint on your life and business.

The state you stand in right now is a direct result of choices--whether made actively, passively, or inactively. Each choice you've made, avoided, or delayed has contributed to your current reality. Together, we will unravel the complexity of these choices, allowing you to master the process of decision-making and elevate your ability to choose wisely.

A Journey Through Choices
When this book came to me as an idea, I found myself reflecting deeply on my own experiences. The decisions I've made in the past flashed through my mind like a vivid highlight reel--some choices brought me tremendous growth, while others delivered lessons wrapped in failure. Through them all, I have learned, grown, and uncovered the universal truth: choice is the foundation of progress.`;

  drawWrappedText(introPage, introText, fontR, 10.5, textDark, 60, yIntro, 492, 17);
  addHeaderFooter(introPage, "Introduction", 9);

  // -------------------------------------------------------------
  // CHAPTER 1 (Page 18)
  // -------------------------------------------------------------
  const c1Page = pdfDoc.addPage([612, 792]);
  c1Page.drawRectangle({ x: 50, y: H - 120, width: 512, height: 45, color: oceanBlue });
  c1Page.drawText("Chapter 1: The Foundation of Choice", { x: 65, y: H - 105, size: 18, font: fontB, color: rgb(1, 1, 1) });

  let yC1 = H - 150;
  const c1Content = `At its core, a choice is the bridge between thought and action. It stems from the intersection of internal values, external stimuli, and the intangible pull of emotions. Imagine standing at a crossroads, each path offering unique possibilities. The choice of which path to take isn't random--it's a culmination of everything that defines you at that moment.

Your upbringing, experiences, fears, dreams, and even the environment surrounding you conspire to form the foundation of your decision-making process. Yet, how often do we pause to ask, Why did I choose this? The answers, though layered and complex, reveal the very architecture of our choices.

The Anatomy of a Choice
Choices aren't isolated events; they are dynamic processes influenced by:
1. Values: Your deeply held beliefs serve as a compass, guiding decisions.
2. Emotions: Happiness, fear, anger, and even hope color how we view possibilities.
3. Reasoning: Logic evaluates outcomes, weighing pros and cons.
4. Environment: People, places, and circumstances shape options and pressures.`;

  drawWrappedText(c1Page, c1Content, fontR, 10.5, textDark, 60, yC1, 492, 17);
  addHeaderFooter(c1Page, "Chapter 1", 18);

  // -------------------------------------------------------------
  // ABOUT THE AUTHOR (Page 88)
  // -------------------------------------------------------------
  const authorPage = pdfDoc.addPage([612, 792]);
  authorPage.drawRectangle({ x: 0, y: H - 240, width: W, height: 240, color: oceanBlue });
  
  authorPage.drawText("HOUSE OF CHOICE", { x: 60, y: H - 90, size: 36, font: fontB, color: rgb(1, 1, 1) });
  authorPage.drawText("ABOUT THE AUTHOR", { x: 60, y: H - 140, size: 18, font: fontB, color: rgb(0.9, 0.9, 0.9) });
  authorPage.drawText("Zeki Faith -- Architect of Transformation & Innovation", { x: 60, y: H - 170, size: 12, font: fontB, color: rgb(1, 1, 1) });

  let yAuth = H - 280;
  const authorBio = `Zeki Faith is a distinguished architect, transformational trainer, and visionary entrepreneur dedicated to shaping both the physical and human landscape. As the founder of Lifebuild Innovators, Unova Consulting, Unova Designs, and Yonan Technologies, he seamlessly blends creativity, strategy, and innovation to drive meaningful change across industries.

Beyond his architectural expertise, Zeki is a catalyst for personal and professional growth. He is the facilitator of the "3 Steps Transformational Journey Blueprint," a structured pathway to unlocking human potential, and the creator of "Becoming a Person of Interest," a program designed to empower individuals to establish influence, relevance, and impact in their fields.

With a deep commitment to excellence and value-driven leadership, Zeki Faith is on a mission to equip individuals and organizations with the tools they need to build, innovate, and thrive in an ever-evolving world.

With a passion for market dynamics and human potential, Zeki Faith empowers individuals to recognize opportunities and leverage their strengths in the evolving marketplace.`;

  drawWrappedText(authorPage, authorBio, fontR, 10.5, textDark, 60, yAuth, 492, 17);

  authorPage.drawRectangle({ x: 50, y: 60, width: 512, height: 50, color: lightBg, borderColor: borderLine, borderWidth: 1 });
  authorPage.drawText("An Official Origin Publication", { x: 70, y: 90, size: 11, font: fontB, color: darkCharcoal });
  authorPage.drawText("Downloaded via Origin Store * www.origin.com.ng", { x: 70, y: 72, size: 9.5, font: fontR, color: mutedText });

  const pdfBytes = await pdfDoc.save();
  const targetPath = path.join(__dirname, '..', 'public', 'documents', 'house-of-choice.pdf');

  fs.writeFileSync(targetPath, pdfBytes);
  console.log('✅ "House Of Choice" PDF successfully generated at:', targetPath);
}

generateHouseOfChoicePDF().catch(err => console.error(err));
