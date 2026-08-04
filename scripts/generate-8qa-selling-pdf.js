const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generate8QASellingPDF() {
  const pdfDoc = await PDFDocument.create();
  const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontIt = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Color Palette - Red & Crimson Theme matching original cover
  const primaryRed = rgb(0.8, 0.15, 0.15); // Crimson Red #cc2626
  const darkCharcoal = rgb(0.12, 0.14, 0.16);
  const textDark = rgb(0.18, 0.2, 0.22);
  const mutedText = rgb(0.45, 0.5, 0.55);
  const lightBg = rgb(0.97, 0.97, 0.98);
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
    page.drawText(cleanText(`THERE IS A MARKET: 8 Q & A TO SELLING — ${title.toUpperCase()}`), {
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

  const drawQuotePage = (doc, quoteText, pageNum) => {
    const page = doc.addPage([612, 792]);
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: lightBg });

    const quoteFormatted = `"${cleanText(quoteText)}"`;
    const size = 18;
    const words = quoteFormatted.split(' ');
    let lines = [];
    let currentLine = '';

    for (let word of words) {
      let testLine = currentLine ? `${currentLine} ${word}` : word;
      if (fontIt.widthOfTextAtSize(testLine, size) > 420) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    let startY = (height / 2) + ((lines.length * 28) / 2);
    for (let line of lines) {
      const w = fontIt.widthOfTextAtSize(line, size);
      page.drawText(line, { x: (width - w) / 2, y: startY, size, font: fontIt, color: textDark });
      startY -= 28;
    }

    addHeaderFooter(page, "Reflection", pageNum);
    return page;
  };

  // -------------------------------------------------------------
  // PAGE 1: COVER PAGE
  // -------------------------------------------------------------
  const coverPage = pdfDoc.addPage([612, 792]);
  const { width: W, height: H } = coverPage.getSize();

  // Top Red Band
  coverPage.drawRectangle({ x: 0, y: H - 120, width: W, height: 120, color: primaryRed });
  const authorWidth = fontB.widthOfTextAtSize("Zeki Faith", 22);
  coverPage.drawText("Zeki Faith", { x: (W - authorWidth) / 2, y: H - 75, size: 22, font: fontB, color: rgb(1, 1, 1) });

  // Middle White Section
  coverPage.drawRectangle({ x: 0, y: 220, width: W, height: H - 340, color: rgb(1, 1, 1) });
  
  // Background Pattern
  for (let yPos = 240; yPos < H - 130; yPos += 22) {
    coverPage.drawText("SELLING WITH PURPOSE  SELLING WITH PURPOSE  SELLING WITH PURPOSE", {
      x: -10, y: yPos, size: 10, font: fontB, color: rgb(0.92, 0.92, 0.93)
    });
  }

  // Title Box
  const t1 = "THERE IS A";
  const t2 = "MARKET";
  const t1W = fontB.widthOfTextAtSize(t1, 48);
  const t2W = fontB.widthOfTextAtSize(t2, 85);
  coverPage.drawText(t1, { x: (W - t1W) / 2, y: H - 240, size: 48, font: fontB, color: darkCharcoal });
  coverPage.drawText(t2, { x: (W - t2W) / 2, y: H - 340, size: 85, font: fontB, color: darkCharcoal });

  // Bottom Red Band
  coverPage.drawRectangle({ x: 0, y: 80, width: W, height: 140, color: primaryRed });
  const subTitle = "8 Q & A To Selling";
  const subW = fontB.widthOfTextAtSize(subTitle, 36);
  coverPage.drawText(subTitle, { x: (W - subW) / 2, y: 135, size: 36, font: fontB, color: rgb(1, 1, 1) });

  // Sub-tagline
  const tag = "For Those Ready to Share Their Unique Value";
  const tagW = fontIt.widthOfTextAtSize(tag, 14);
  coverPage.drawText(tag, { x: (W - tagW) / 2, y: 40, size: 14, font: fontIt, color: primaryRed });

  // -------------------------------------------------------------
  // PAGE 2: COPYRIGHT PAGE
  // -------------------------------------------------------------
  const page2 = pdfDoc.addPage([612, 792]);
  let y2 = 180;
  page2.drawText("© 2025", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });
  y2 -= 30;
  page2.drawText("There is a Market", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });
  y2 -= 20;
  page2.drawText("Author: Zeki Faith", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });
  y2 -= 20;
  page2.drawText("Publisher: Mindvest Publishing House", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });

  // -------------------------------------------------------------
  // PAGE 3: TITLE PAGE
  // -------------------------------------------------------------
  const page3 = pdfDoc.addPage([612, 792]);
  page3.drawRectangle({ x: 0, y: H - 100, width: W, height: 100, color: darkCharcoal });
  page3.drawText("Zeki Faith", { x: (W - fontB.widthOfTextAtSize("Zeki Faith", 20)) / 2, y: H - 60, size: 20, font: fontB, color: rgb(1, 1, 1) });

  page3.drawRectangle({ x: 0, y: 220, width: W, height: H - 320, color: rgb(1, 1, 1) });
  page3.drawText("THERE IS A", { x: (W - fontB.widthOfTextAtSize("THERE IS A", 42)) / 2, y: H - 220, size: 42, font: fontB, color: darkCharcoal });
  page3.drawText("MARKET", { x: (W - fontB.widthOfTextAtSize("MARKET", 80)) / 2, y: H - 320, size: 80, font: fontB, color: darkCharcoal });

  page3.drawRectangle({ x: 0, y: 100, width: W, height: 120, color: darkCharcoal });
  page3.drawText("8 Q & A To Selling", { x: (W - fontB.widthOfTextAtSize("8 Q & A To Selling", 32)) / 2, y: 145, size: 32, font: fontB, color: rgb(1, 1, 1) });
  page3.drawText("For Those Ready to Share Their Unique Value", { x: (W - fontIt.widthOfTextAtSize("For Those Ready to Share Their Unique Value", 14)) / 2, y: 45, size: 14, font: fontIt, color: textDark });

  // -------------------------------------------------------------
  // PAGE 4: DEDICATION
  // -------------------------------------------------------------
  const page4 = pdfDoc.addPage([612, 792]);
  page4.drawText("Dedication", { x: (W - fontB.widthOfTextAtSize("Dedication", 26)) / 2, y: H - 150, size: 26, font: fontB, color: darkCharcoal });
  const dedText = "To the visionaries, dreamers, and doers\nMay you always find your market\nand may your value be recognized.";
  drawWrappedText(page4, dedText, fontR, 14, textDark, (W - 320) / 2, H - 320, 320, 22);

  // -------------------------------------------------------------
  // PAGE 5: ACKNOWLEDGMENT
  // -------------------------------------------------------------
  const page5 = pdfDoc.addPage([612, 792]);
  page5.drawText("Acknowledgment", { x: (W - fontB.widthOfTextAtSize("Acknowledgment", 26)) / 2, y: H - 150, size: 26, font: fontB, color: darkCharcoal });
  const ackText = "This book would not have been possible without the unwavering support of my family, friends, and mentors who continuously inspire me. Special thanks to everyone who believed in this vision and encouraged me to bring this work to life. To my readers, you are the true market--thank you for your time, energy, and belief in the ideas within these pages.";
  drawWrappedText(page5, ackText, fontR, 12, textDark, 80, H - 240, 452, 20);

  // -------------------------------------------------------------
  // PAGE 6: QUOTE 1
  // -------------------------------------------------------------
  drawQuotePage(pdfDoc, "When you find out what you can do as a trade, do it with excellence.", 6);

  // -------------------------------------------------------------
  // PAGE 7-10: CONTENTS
  // -------------------------------------------------------------
  const page7 = pdfDoc.addPage([612, 792]);
  page7.drawRectangle({ x: 50, y: H - 100, width: 512, height: 40, color: rgb(0.85, 0.85, 0.85) });
  page7.drawText("Contents", { x: 60, y: H - 90, size: 26, font: fontB, color: darkCharcoal });

  const toc1 = [
    { title: "Chapter 1: The Marketplace of Possibilities", page: "12" },
    { title: "   A Place for Relationships and Exchange", page: "13" },
    { title: "   Discovering Your Trade", page: "13" },
    { title: "   The Rules of Engagement", page: "14" },
    { title: "   Opportunities in the Marketplace", page: "15" },
    { title: "   The Shift from Competition to Contribution", page: "15" },
    { title: "   Closing Reflection", page: "16" },
    { title: "Chapter 2: How Do You See Yourself?", page: "18" },
    { title: "   The Mirror of Perception", page: "18" },
    { title: "   Reframing Self-Worth", page: "19" },
    { title: "   Recognizing Yourself as a Source of Energy", page: "19" },
    { title: "   Overcoming Self-Doubt with Action", page: "20" },
    { title: "   Your Role in the Marketplace", page: "20" },
    { title: "   Practical Steps to Build Your Confidence", page: "21" },
    { title: "   The Energy You Bring to the World", page: "21" },
    { title: "   Closing Reflection", page: "22" },
    { title: "Chapter 3: The Foundation of Trade", page: "24" },
    { title: "   Trade: The Gateway to Value", page: "24" },
    { title: "   The Anatomy of a Trade", page: "25" },
    { title: "   From Potential to Mastery", page: "25" },
    { title: "   Your Trade, Your Identity", page: "26" },
    { title: "   Trade in a Changing World", page: "26" },
    { title: "   Practical Steps to Strengthen Your Trade", page: "27" },
    { title: "   The Legacy of a Trade", page: "27" },
    { title: "   Closing Reflection", page: "28" },
    { title: "Chapter 4: Crafting Your Trade Message", page: "30" },
    { title: "   The Power of a Message Rooted in Belief", page: "30" },
    { title: "   Why Your Message Matters", page: "31" },
  ];

  let yToc = H - 130;
  for (const item of toc1) {
    const isChap = item.title.startsWith("Chapter");
    const font = isChap ? fontB : fontR;
    const size = isChap ? 11 : 9.5;
    page7.drawText(cleanText(item.title), { x: 60, y: yToc, size, font, color: textDark });
    page7.drawText(item.page, { x: 520, y: yToc, size, font, color: textDark });
    yToc -= 18;
  }
  addHeaderFooter(page7, "Contents", 7);

  // -------------------------------------------------------------
  // PAGE 11: QUOTE 2
  // -------------------------------------------------------------
  drawQuotePage(pdfDoc, "I am capable, and I have the capacity to be excellent.", 11);

  // -------------------------------------------------------------
  // CHAPTER 1: THE MARKETPLACE OF POSSIBILITIES (Page 12 - 16)
  // -------------------------------------------------------------
  const chap1P1 = pdfDoc.addPage([612, 792]);
  chap1P1.drawRectangle({ x: 50, y: H - 120, width: 512, height: 50, color: rgb(0.85, 0.85, 0.85) });
  chap1P1.drawText("Chapter 1: The Marketplace of Possibilities", { x: 60, y: H - 105, size: 20, font: fontB, color: darkCharcoal });

  let yC1 = H - 150;
  const c1Text1 = `The marketplace today is more than a space for buying and selling. It's a complex network of interactions--a space where people exchange ideas, share skills, and contribute to each other's growth. Think about the digital world, where millions of transactions happen in seconds. Platforms like LinkedIn, Etsy, and Shopify have turned the traditional idea of a market into a dynamic ecosystem of value exchange. The marketplace isn't just a physical location anymore; it's wherever you show up to share what you have to offer.

But the marketplace is not just about products or services. It's about people. Every connection, conversation, and collaboration is part of this vast system. And every day, knowingly or unknowingly, you step into it. Whether you're pitching an idea at work, recommending a solution to a friend, or sharing your skills online, you're engaging in the market.

So, the question is, what are you bringing to this marketplace?`;

  drawWrappedText(chap1P1, c1Text1, fontR, 10.5, textDark, 60, yC1, 492, 17);
  addHeaderFooter(chap1P1, "Chapter 1", 12);

  // -------------------------------------------------------------
  // CHAPTER 2: HOW DO YOU SEE YOURSELF? (Page 18 - 22)
  // -------------------------------------------------------------
  drawQuotePage(pdfDoc, "I am better than my previous self and I am seeing better days.", 17);

  const chap2P1 = pdfDoc.addPage([612, 792]);
  chap2P1.drawRectangle({ x: 50, y: H - 120, width: 512, height: 50, color: rgb(0.85, 0.85, 0.85) });
  chap2P1.drawText("Chapter 2: How Do You See Yourself?", { x: 60, y: H - 105, size: 20, font: fontB, color: darkCharcoal });

  let yC2 = H - 150;
  const c2Text1 = `Before you can bring value to the marketplace, you need to understand your own worth. This starts with a fundamental question: How do you see yourself? The way you perceive your abilities, strengths, and potential shapes not only how you engage with the world but also how others respond to you.

In a world that often celebrates comparison, it's easy to downplay your unique qualities. But your individuality--your skills, experiences, and personality--is your superpower. Recognizing this is the first step in unlocking your potential.

The Mirror of Perception
Imagine standing in front of a mirror. When you look at your reflection, what do you see? Do you notice your strengths, talents, and the progress you've made, or do you focus on imperfections and doubts?

Your answer matters. If you can't see yourself as valuable, it's unlikely others will. But when you begin to recognize your worth, you unlock a confidence that draws people toward you.`;

  drawWrappedText(chap2P1, c2Text1, fontR, 10.5, textDark, 60, yC2, 492, 17);
  addHeaderFooter(chap2P1, "Chapter 2", 18);

  // -------------------------------------------------------------
  // CHAPTER 3: THE FOUNDATION OF TRADE (Page 24 - 28)
  // -------------------------------------------------------------
  drawQuotePage(pdfDoc, "My trade represents me, and my mastery comes with people's development.", 23);

  const chap3P1 = pdfDoc.addPage([612, 792]);
  chap3P1.drawRectangle({ x: 50, y: H - 120, width: 512, height: 50, color: rgb(0.85, 0.85, 0.85) });
  chap3P1.drawText("Chapter 3: The Foundation of Trade", { x: 60, y: H - 105, size: 20, font: fontB, color: darkCharcoal });

  let yC3 = H - 150;
  const c3Text1 = `The foundation of any success lies in understanding what you bring to the table--your trade. In its simplest form, your trade is the sum of your skills, knowledge, and passions. It's what you offer to the world, but it's also how you define your purpose within the marketplace.

Yet, for many, the concept of a trade feels elusive. Is it a profession? A hobby? A skill? In truth, it's all of these and more. Your trade is your unique way of creating value. It's the fingerprint you leave behind in every interaction, product, or service.

Understanding and mastering your trade isn't just about survival--it's about leaving a legacy.

Trade: The Gateway to Value
The marketplace recognizes one currency above all others: value. And value flows from your trade. It's what sets you apart in a crowded world, giving people a reason to choose you, listen to you, or seek you out. But here's the catch: value isn't static. It's cultivated, refined, and adapted over time.`;

  drawWrappedText(chap3P1, c3Text1, fontR, 10.5, textDark, 60, yC3, 492, 17);
  addHeaderFooter(chap3P1, "Chapter 3", 24);

  // -------------------------------------------------------------
  // CHAPTER 4: CRAFTING YOUR TRADE MESSAGE (Page 30 - 34)
  // -------------------------------------------------------------
  drawQuotePage(pdfDoc, "I have the right message and it is transformative.", 29);

  const chap4P1 = pdfDoc.addPage([612, 792]);
  chap4P1.drawRectangle({ x: 50, y: H - 120, width: 512, height: 50, color: rgb(0.85, 0.85, 0.85) });
  chap4P1.drawText("Chapter 4: Crafting Your Trade Message", { x: 60, y: H - 105, size: 20, font: fontB, color: darkCharcoal });

  let yC4 = H - 150;
  const c4Text1 = `Your trade message is not just about what you do--it's about who you are, the value you bring, and the impact you create in the world. As Myron Golden often says, "The most important thing you sell is not your product or service--it's yourself. People buy into who you are before they buy what you offer."

This means your trade message is more than words. It's the essence of your purpose, expressed clearly and powerfully. It's your way of telling the world, "This is how I can help you transform."

The Power of a Message Rooted in Belief
Every trade message starts with belief: belief in yourself, belief in your trade, and belief in the value you bring to others. If you don't believe in what you do, no one else will.

Your audience doesn't just need information--they need transformation. Your message should reflect your confidence that what you offer can make their lives better. And here's the truth: the most compelling trade messages don't focus on the trade itself. They focus on the results your trade creates for others.`;

  drawWrappedText(chap4P1, c4Text1, fontR, 10.5, textDark, 60, yC4, 492, 17);
  addHeaderFooter(chap4P1, "Chapter 4", 30);

  // -------------------------------------------------------------
  // CHAPTER 5: FINDING AND UNDERSTANDING YOUR AUDIENCE (Page 36 - 42)
  // -------------------------------------------------------------
  drawQuotePage(pdfDoc, "Your audience does not want a product or service; they want a solution that changes their reality.", 35);

  const chap5P1 = pdfDoc.addPage([612, 792]);
  chap5P1.drawRectangle({ x: 50, y: H - 120, width: 512, height: 50, color: rgb(0.85, 0.85, 0.85) });
  chap5P1.drawText("Chapter 5: Finding & Understanding Audience", { x: 60, y: H - 105, size: 18, font: fontB, color: darkCharcoal });

  let yC5 = H - 150;
  const c5Text1 = `Your trade may be valuable, and your message may be powerful, but without an audience, it's like shouting into an empty room. As Myron Golden often says, "If you're talking to everyone, you're talking to no one." Your audience isn't "everyone." It's a specific group of people whose lives you are uniquely positioned to impact.

Finding your audience isn't just about targeting demographics--it's about understanding their hearts, their struggles, and their desires. It's about connecting with the people who need what you offer and speaking directly to their needs.

Who Is Your Audience?
Your audience is the group of people whose problems you solve and whose lives you improve. They are the people searching for the exact value your trade provides. But here's the key: your audience isn't defined by broad categories like age, gender, or income. It's defined by their needs, their aspirations, and their pain points.`;

  drawWrappedText(chap5P1, c5Text1, fontR, 10.5, textDark, 60, yC5, 492, 17);
  addHeaderFooter(chap5P1, "Chapter 5", 36);

  // -------------------------------------------------------------
  // ABOUT THE AUTHOR (Page 114)
  // -------------------------------------------------------------
  const authorPage = pdfDoc.addPage([612, 792]);
  
  authorPage.drawRectangle({ x: 0, y: H - 240, width: W, height: 240, color: primaryRed });
  authorPage.drawText("ABOUT THE AUTHOR", { x: 60, y: H - 100, size: 24, font: fontB, color: rgb(1, 1, 1) });
  authorPage.drawText("Zeki Faith -- Architect of Transformation & Innovation", { x: 60, y: H - 135, size: 12, font: fontB, color: rgb(1, 1, 1) });
  authorPage.drawText("The Becoming Institute", { x: 60, y: H - 155, size: 11, font: fontR, color: rgb(0.9, 0.9, 0.9) });

  let yAuth = H - 280;
  const authorBio = `Zeki Faith is an Architect of Transformation and Innovation, transformational trainer, and visionary entrepreneur dedicated to shaping both the physical and human landscape. As the founder of Lifebuild Innovators, Unova Consulting, Unova Designs, and Yonan Technologies, he seamlessly blends creativity, strategy, and innovation to drive meaningful change across industries.

Beyond his architectural expertise, Zeki is a catalyst for personal and professional growth. He is the facilitator of the "3 Steps Transformational Journey Blueprint," a structured pathway to unlocking human potential, and the creator of "Becoming a Person of Interest," a program designed to empower individuals to establish influence, relevance, and impact in their fields.

With a deep commitment to excellence and value-driven leadership, Zeki Faith is on a mission to equip individuals and organizations with the tools they need to build, innovate, and thrive in an ever-evolving world.

With a passion for market dynamics and human potential, Zeki Faith empowers individuals to recognize opportunities and leverage their strengths in the evolving marketplace.`;

  drawWrappedText(authorPage, authorBio, fontR, 10.5, textDark, 60, yAuth, 492, 17);

  authorPage.drawRectangle({ x: 50, y: 60, width: 512, height: 50, color: lightBg, borderColor: borderLine, borderWidth: 1 });
  authorPage.drawText("An Official Origin Publication", { x: 70, y: 90, size: 11, font: fontB, color: darkCharcoal });
  authorPage.drawText("Downloaded via Origin Store * www.origin.com.ng", { x: 70, y: 72, size: 9.5, font: fontR, color: mutedText });

  const pdfBytes = await pdfDoc.save();
  const targetPath = path.join(__dirname, '..', 'public', 'documents', '8-qa-to-selling.pdf');

  fs.writeFileSync(targetPath, pdfBytes);
  console.log('✅ "8 Q & A To Selling" PDF successfully generated at:', targetPath);
}

generate8QASellingPDF().catch(err => console.error(err));
