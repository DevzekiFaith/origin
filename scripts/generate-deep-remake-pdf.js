const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateDeepRemakePDF() {
  const pdfDoc = await PDFDocument.create();
  const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontIt = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Color Palette - Amber/Gold & Slate Theme matching Deep Re-Make cover
  const goldAccent = rgb(0.85, 0.65, 0.15); // #d9a626
  const darkCharcoal = rgb(0.15, 0.16, 0.18);
  const textDark = rgb(0.2, 0.22, 0.24);
  const mutedText = rgb(0.5, 0.53, 0.56);
  const lightBg = rgb(0.95, 0.95, 0.96);
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
    page.drawText(cleanText(`DEEP RE-MAKE -- ${title.toUpperCase()}`), {
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

  coverPage.drawRectangle({ x: 0, y: 0, width: W, height: H, color: lightBg });
  
  // Large Block DEEP Title
  coverPage.drawText("DE", { x: (W - 280) / 2, y: H - 240, size: 100, font: fontB, color: goldAccent });
  coverPage.drawText("EP", { x: (W - 280) / 2 + 150, y: H - 240, size: 100, font: fontB, color: goldAccent });
  
  coverPage.drawText("Re-Make", { x: (W - fontIt.widthOfTextAtSize("Re-Make", 56)) / 2, y: H - 340, size: 56, font: fontIt, color: darkCharcoal });
  coverPage.drawText("Redefining yourself and reclaiming your power.", { x: (W - fontR.widthOfTextAtSize("Redefining yourself and reclaiming your power.", 13)) / 2, y: H - 380, size: 13, font: fontR, color: textDark });

  const authorStr = "ZEKI FAITH";
  coverPage.drawText(authorStr, { x: (W - fontB.widthOfTextAtSize(authorStr, 20)) / 2, y: 100, size: 20, font: fontB, color: darkCharcoal });

  // -------------------------------------------------------------
  // PAGE 2: COPYRIGHT PAGE
  // -------------------------------------------------------------
  const page2 = pdfDoc.addPage([612, 792]);
  let y2 = 180;
  page2.drawText("© 2025", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });
  y2 -= 30;
  page2.drawText("Deep Re-Make", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });
  y2 -= 20;
  page2.drawText("Author: Zeki Faith", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });
  y2 -= 20;
  page2.drawText("Publisher: Mindvest Publishing House", { x: 60, y: y2, size: 12, font: fontIt, color: textDark });

  // -------------------------------------------------------------
  // PAGE 3: INNER TITLE PAGE
  // -------------------------------------------------------------
  const page3 = pdfDoc.addPage([612, 792]);
  page3.drawRectangle({ x: 0, y: 0, width: W, height: H, color: lightBg });
  page3.drawText("DEEP", { x: (W - fontB.widthOfTextAtSize("DEEP", 90)) / 2, y: H - 240, size: 90, font: fontB, color: darkCharcoal });
  page3.drawText("Re-Make", { x: (W - fontIt.widthOfTextAtSize("Re-Make", 56)) / 2, y: H - 340, size: 56, font: fontIt, color: darkCharcoal });
  page3.drawText("Redefining yourself and reclaiming your power.", { x: (W - fontR.widthOfTextAtSize("Redefining yourself and reclaiming your power.", 13)) / 2, y: H - 380, size: 13, font: fontR, color: textDark });
  page3.drawText("ZEKI FAITH", { x: (W - fontB.widthOfTextAtSize("ZEKI FAITH", 20)) / 2, y: 100, size: 20, font: fontB, color: darkCharcoal });

  // -------------------------------------------------------------
  // PAGE 4: DEDICATION
  // -------------------------------------------------------------
  const page4 = pdfDoc.addPage([612, 792]);
  page4.drawText("Dedication", { x: (W - fontB.widthOfTextAtSize("Dedication", 26)) / 2, y: H - 200, size: 26, font: fontB, color: darkCharcoal });
  const dedText = "To the visionaries, dreamers, and doers\nMay you always find your market\nand may your value be recognized.";
  drawWrappedText(page4, dedText, fontR, 14, textDark, (W - 320) / 2, H - 340, 320, 22);

  // -------------------------------------------------------------
  // PAGE 5: ACKNOWLEDGMENT
  // -------------------------------------------------------------
  const page5 = pdfDoc.addPage([612, 792]);
  page5.drawText("Acknowledgment", { x: (W - fontB.widthOfTextAtSize("Acknowledgment", 26)) / 2, y: H - 200, size: 26, font: fontB, color: darkCharcoal });
  const ackText = "This book would not have been possible without the unwavering support of my family, friends, and mentors who continuously inspire me. Special thanks to everyone who believed in this vision and encouraged me to bring this work to life. To my readers, you are the true market--thank you for your time, energy, and belief in the ideas within these pages.";
  drawWrappedText(page5, ackText, fontR, 12, textDark, 80, H - 280, 452, 20);

  // -------------------------------------------------------------
  // PAGE 6-13: TABLE OF CONTENTS
  // -------------------------------------------------------------
  const tocPage = pdfDoc.addPage([612, 792]);
  tocPage.drawRectangle({ x: 50, y: H - 90, width: 512, height: 40, color: rgb(0.9, 0.9, 0.9) });
  tocPage.drawText("Contents", { x: 60, y: H - 80, size: 24, font: fontB, color: darkCharcoal });

  const tocItems = [
    { title: "Introduction: As You Think, So You Become", page: "15" },
    { title: "Chapter 1: The Seeds of Thought: What Is Personal Tokenism?", page: "17" },
    { title: "Chapter 2: Weeding Out the Negatives: Breaking Limiting Beliefs", page: "22" },
    { title: "Chapter 3: Cultivating the Garden: Building a Growth-Oriented Mindset", page: "27" },
    { title: "Chapter 4: The Law of Design: Becoming the Architect of Your Life", page: "32" },
    { title: "Chapter 5: Harnessing Discipline: Daily Habits That Shape Your Future", page: "40" },
    { title: "Chapter 6: Expanding Your Horizons: The Power of Vision and Purpose", page: "45" },
    { title: "Chapter 7: Overcoming Fear and Breaking Comfort Zones", page: "50" },
    { title: "Chapter 8: Rising Stronger: Resilience as a Tool for Growth", page: "55" },
    { title: "Chapter 9: Sowing and Reaping: Aligning Actions With Goals", page: "61" },
    { title: "Chapter 10: Mastering Relationships: Emotional Intelligence and Influence", page: "66" },
    { title: "Chapter 11: Mentorship and Community: Building a Network of Growth", page: "72" },
    { title: "Chapter 12: Success and Failure: Two Sides of the Same Coin", page: "78" },
    { title: "Chapter 13: Framing Your Legacy: Becoming a Builder of Others", page: "84" },
    { title: "Chapter 14: Sustaining Growth: A Lifelong Journey", page: "89" },
    { title: "Chapter 15: Becoming a Framer: Shaping Your World and Others'", page: "95" },
    { title: "Conclusion: The Journey of a Lifetime", page: "101" },
  ];

  let yToc = H - 120;
  for (const item of tocItems) {
    const isChap = item.title.startsWith("Chapter") || item.title.startsWith("Introduction") || item.title.startsWith("Conclusion");
    const font = isChap ? fontB : fontR;
    const size = isChap ? 10.5 : 9.5;
    tocPage.drawText(cleanText(item.title), { x: 60, y: yToc, size, font, color: textDark });
    tocPage.drawText(item.page, { x: 520, y: yToc, size, font, color: textDark });
    yToc -= 22;
  }
  addHeaderFooter(tocPage, "Contents", 6);

  // -------------------------------------------------------------
  // INTRODUCTION (Page 15)
  // -------------------------------------------------------------
  const introPage = pdfDoc.addPage([612, 792]);
  introPage.drawRectangle({ x: 50, y: H - 120, width: 512, height: 45, color: darkCharcoal });
  introPage.drawText("Introduction", { x: 65, y: H - 105, size: 22, font: fontB, color: rgb(1, 1, 1) });

  let yIntro = H - 150;
  introPage.drawRectangle({ x: 50, y: yIntro - 30, width: 512, height: 30, color: goldAccent });
  introPage.drawText("As You Think, So You Become", { x: 65, y: yIntro - 20, size: 14, font: fontB, color: darkCharcoal });
  yIntro -= 50;

  const introText = `Borrowing from As a Man Thinketh, this introduction will emphasize the idea that thought is the seed of all action. Who you are today is a result of the thoughts you've cultivated over time, and who you become tomorrow depends on the quality of your thoughts today.

Jim Rohn's philosophy of personal growth complements this by reminding us:
- "You must take personal responsibility. You cannot change the circumstances, the seasons, or the wind, but you can change yourself."

This book will:
- Introduce the concept of personal tokenism as a limitation of thought that traps individuals in roles or beliefs.
- Emphasize the transformative power of intentional thinking to overcome these barriers.
- Call the reader to action with a powerful statement: "Your life changes when you change your thinking."`;

  drawWrappedText(introPage, introText, fontR, 10.5, textDark, 60, yIntro, 492, 17);
  addHeaderFooter(introPage, "Introduction", 15);

  // -------------------------------------------------------------
  // CHAPTER 1 (Page 17)
  // -------------------------------------------------------------
  const c1Page = pdfDoc.addPage([612, 792]);
  c1Page.drawRectangle({ x: 50, y: H - 120, width: 512, height: 45, color: darkCharcoal });
  c1Page.drawText("Chapter 1: The Seeds of Thought", { x: 65, y: H - 105, size: 18, font: fontB, color: rgb(1, 1, 1) });

  let yC1 = H - 150;
  const c1Content = `In the quiet of an early morning, as the world stirs itself awake, there is a fleeting moment when the mind is uncluttered, untouched by the day's demands. It is in this stillness that our thoughts begin to shape the day ahead. For better or worse, those thoughts become the seeds of our reality.

James Allen, in his timeless work As a Man Thinketh, wrote, "A man is literally what he thinks, his character being the complete sum of all his thoughts." This truth reveals a profound power within us--the ability to create, to transform, and to rise beyond circumstances. Yet, for many, this power is buried beneath layers of self-imposed limitations, societal expectations, and internalized doubt.

This is the essence of personal tokenism: a state where we confine ourselves to roles, beliefs, and expectations that limit our true potential. Unlike systemic tokenism, where external forces impose limitations, personal tokenism arises from within. It is the act of settling for less than what we're capable of because we've unconsciously accepted the boundaries drawn for us by our past, our culture, or our own fears.`;

  drawWrappedText(c1Page, c1Content, fontR, 10.5, textDark, 60, yC1, 492, 17);
  addHeaderFooter(c1Page, "Chapter 1", 17);

  // -------------------------------------------------------------
  // ABOUT THE AUTHOR (Page 104)
  // -------------------------------------------------------------
  const authorPage = pdfDoc.addPage([612, 792]);
  authorPage.drawRectangle({ x: 0, y: H - 240, width: W, height: 240, color: darkCharcoal });
  
  authorPage.drawText("DEEP RE-MAKE", { x: 60, y: H - 90, size: 36, font: fontB, color: goldAccent });
  authorPage.drawText("ABOUT THE AUTHOR", { x: 60, y: H - 140, size: 18, font: fontB, color: rgb(1, 1, 1) });
  authorPage.drawText("Zeki Faith -- Architect of Transformation & Innovation", { x: 60, y: H - 170, size: 12, font: fontB, color: rgb(0.9, 0.9, 0.9) });

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
  const targetPath = path.join(__dirname, '..', 'public', 'documents', 'deep-remake.pdf');

  fs.writeFileSync(targetPath, pdfBytes);
  console.log('✅ "Deep Re-Make" PDF successfully generated at:', targetPath);
}

generateDeepRemakePDF().catch(err => console.error(err));
