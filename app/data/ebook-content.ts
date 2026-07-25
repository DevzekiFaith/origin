import { moneyFarmingBookData, MoneyFarmingChapter } from "./money-farming-content";

export interface EBookChapter {
  id: number;
  title: string;
  subtitle?: string;
  summary?: string;
  content: string[];
  keyTakeaways?: string[];
  principle?: string;
  isLocked?: boolean;
}

export interface EBookContentData {
  productId: number;
  title: string;
  subtitle: string;
  author: string;
  tagline?: string;
  pdfUrl?: string;
  introduction: {
    title: string;
    subtitle: string;
    content: string[];
  };
  chapters: EBookChapter[];
}

// Sample content for 8 Q&A to Selling (ID: 8)
export const sellingQnaBookData: EBookContentData = {
  productId: 8,
  title: "8 Q&A TO SELLING",
  subtitle: "For Those Ready to Share Their Unique Value",
  author: "Zeki Faith",
  tagline: "Articulate your worth and ascend into the elite zone of singular contribution and scale.",
  pdfUrl: "/documents/8-qa-to-selling.pdf",
  introduction: {
    title: "INTRODUCTION",
    subtitle: "The Commodity Trap & The Strategic Exchange",
    content: [
      "In a hyper-saturated global marketplace, raw ambition and hard work are no longer enough to guarantee distinction.",
      "Every single day, thousands of talented professionals, freelancers, and entrepreneurs wake up with genuine expertise, yet remain trapped in a race to the bottom.",
      "Why? Because the modern economy disproportionately rewards one specific capability: the strategic articulation of high-tier value.",
      "If you cannot clearly communicate your worth, the market will default to treating your expertise as a cheap, interchangeable commodity.",
      "This book strips away passive self-help cliches and transactional sales fluff to deliver a definitive blueprint for market authority.",
      "Welcome to 8 Q&A to Selling. Let us begin architecting your singular contribution."
    ]
  },
  chapters: [
    {
      id: 1,
      title: "Chapter 1: The Blueprint of a Specialized Trade",
      subtitle: "Q1: What problem do you solve that the market cannot ignore?",
      summary: "How to identify, audit, and engineer your unique capability into an undeniable market solution.",
      principle: "Selling Principle I: The marketplace never pays for hours worked; it pays for clarity of outcome.",
      keyTakeaways: [
        "Unpack your raw technical skills and translate them into business outcomes.",
        "Stop marketing features; start architecting the exact resolution your client seeks.",
        "Ascend out of commodity pricing by narrowing your leverage point."
      ],
      content: [
        "Most people attempt to sell what they do rather than what they solve.",
        "Consider two software consultants entering a room. The first says: 'I write Clean TypeScript code and optimize database schemas.' The second says: 'I refactor legacy software infrastructure to reduce server overhead by 40% and eliminate checkout crashes.'",
        "The first consultant is selling labor. The second consultant is selling architectural leverage.",
        "When you position yourself around labor, you invite clients to negotiate down your hourly rate. When you position yourself around architectural leverage, you command premium value because the outcome is unmistakable.",
        "Your first assignment in this book is to conduct a structural audit of your capability. What is the single highest-yield problem you resolve?"
      ]
    },
    {
      id: 2,
      title: "Chapter 2: Precision Messaging Frameworks",
      subtitle: "Q2: How do you cut through digital noise?",
      summary: "The exact steps to reframe your copy and messaging so premium clients pull inbound pre-sold on your value.",
      principle: "Selling Principle II: Attention is captured by relevance, but conversion is locked by authority.",
      keyTakeaways: [
        "Eliminate passive filler language from your proposition.",
        "Structure your offer around contrast: Where is your client now vs. where will they be after engagement.",
        "Build pre-sold trust before the first consultation call takes place."
      ],
      content: [
        "Noise is at an all-time high in the modern economy. Your prospects receive dozens of cold messages, proposals, and advertisements daily.",
        "To break through this wall of noise, your communication cannot sound like a pitch. It must sound like a diagnostic analysis.",
        "When an authority speaks, they do not beg for attention; they describe the client's current friction with such precision that the client immediately assumes the authority possesses the cure.",
        "In this chapter, we explore the 3-step Precision Messaging Loop to eliminate generic rhetoric and install undeniable positioning."
      ]
    },
    {
      id: 3,
      title: "Chapter 3: The 3 Pillars of Market Positioning",
      subtitle: "Q3: How do you exit the competitive price war?",
      summary: "Ascend from a low-tier commodity provider to a premium, legacy-defining category of one.",
      isLocked: true,
      content: [
        "This chapter is locked in the sample preview.",
        "Purchase the full eBook to read Chapter 3: The 3 Pillars of Market Positioning!"
      ]
    },
    {
      id: 4,
      title: "Chapter 4: The Physics of Momentum",
      subtitle: "Q4: How do you maintain sales velocity without burnout?",
      summary: "Build data-driven stamina, eliminate operational friction, and generate an unstoppable acceleration loop.",
      isLocked: true,
      content: [
        "This chapter is locked in the sample preview."
      ]
    },
    {
      id: 5,
      title: "Chapter 5: Scalable Value Liquidity",
      subtitle: "Q5: How do you distribute value to thousands simultaneously?",
      summary: "Build systems that distribute immense upfront value, establishing an unassailable trust monopoly.",
      isLocked: true,
      content: [
        "This chapter is locked in the sample preview."
      ]
    }
  ]
};

// Sample content for House of Choice (ID: 9)
export const houseOfChoiceBookData: EBookContentData = {
  productId: 9,
  title: "House of Choice",
  subtitle: "Reshaping Your Decisions & Transforming Your Essence",
  author: "Zeki Faith",
  tagline: "Discover how your choices shape your essence and master the art of making decisions aligned with your true self.",
  pdfUrl: "/documents/house-of-choice.pdf",
  introduction: {
    title: "INTRODUCTION",
    subtitle: "The Architecture of Decision",
    content: [
      "Every human life is a house built brick by brick. The bricks are not your words, your intentions, or your wishes.",
      "The bricks are your choices.",
      "Most people believe they are trapped by external circumstances—their environment, their background, or past failures. But when you strip away the noise, your current reality is the exact physical architectural blueprint of choices made yesterday.",
      "House of Choice is a guide for anyone ready to stop being a passive observer in their own story and start making decisions with absolute clarity and conviction."
    ]
  },
  chapters: [
    {
      id: 1,
      title: "Chapter 1: The Anatomy of Choice",
      subtitle: "How Decisions Shape Your Internal Baseline",
      summary: "Understand the profound connection between your daily decisions and personal trajectory.",
      principle: "Choice Principle I: You do not choose your outcome; you choose the habits that yield the outcome.",
      keyTakeaways: [
        "Every choice either reinforces your highest self or feeds default conditioning.",
        "Decision fatigue is the result of unaligned priorities.",
        "Small, consistent choices create compounding internal strength."
      ],
      content: [
        "Notice how a single choice in the morning sets the emotional posture for your entire afternoon.",
        "When you wake up and instantly react to phone notifications, you have made a choice: you have surrendered your focus to external demands.",
        "Conversely, when you protect your first hour for quiet reflection, deep study, or strategic planning, you have made a choice to govern your internal house.",
        "Real transformation does not require a dramatic, cinematic moment. It begins when you reclaim sovereignty over micro-decisions."
      ]
    },
    {
      id: 2,
      title: "Chapter 2: Overcoming Internal Barriers",
      subtitle: "Breaking Limiting Beliefs & Default Habits",
      summary: "Break through limiting beliefs and habits that keep you from making empowering decisions.",
      principle: "Choice Principle II: Fear is not a signal to stop; it is an indicator of unmapped territory.",
      keyTakeaways: [
        "Identify hidden self-sabotage patterns before making major decisions.",
        "Reframe failure as diagnostic feedback rather than personal identity.",
        "Build a decision framework based on alignment rather than peer validation."
      ],
      content: [
        "Why do smart individuals repeatedly make choices that undermine their own goals?",
        "Because beneath conscious desire lies an unexamined belief system constructed in childhood or early career setbacks.",
        "If you deep down believe that you are not worthy of scale, your choices will sub-consciously steer you away from high-stake opportunities.",
        "In this chapter, we dismantle those default barriers so you can decide with unshakeable alignment."
      ]
    },
    {
      id: 3,
      title: "Chapter 3: Reshaping Mindset & Identity",
      subtitle: "Cultivating Confidence & Growth",
      summary: "Create an internal ecosystem of growth, confidence, and resilience.",
      isLocked: true,
      content: ["This chapter is locked in the sample preview."]
    }
  ]
};

// Sample content for Deep-Remake (ID: 10)
export const deepRemakeBookData: EBookContentData = {
  productId: 10,
  title: "Deep-Remake",
  subtitle: "Breaking Free From Personal Tokenism & Societal Labels",
  author: "Zeki Faith",
  tagline: "A powerful transformation journey to dismantle limiting labels and align your actions with your highest destiny.",
  pdfUrl: "/documents/deep-remake.pdf",
  introduction: {
    title: "INTRODUCTION",
    subtitle: "The Need for a Deep Remake",
    content: [
      "Most self-help books suggest adding new habits on top of a broken foundation. They offer surface-level hacks for deep-seated structural issues.",
      "Deep-Remake is different. It is an intentional refactoring of who you are at your core.",
      "If your life feels stuck in a repetitive loop of anxiety, hesitation, or unfulfilled potential, patching the surface will not work. You need a Deep Remake."
    ]
  },
  chapters: [
    {
      id: 1,
      title: "Chapter 1: Unmasking Personal Tokenism",
      subtitle: "Identifying Hidden Barriers to Real Growth",
      summary: "Understand how societal labels and tokenism restrict your true capability.",
      principle: "Remake Principle I: You are not defined by the box society placed you in; you are defined by the intention you deploy.",
      keyTakeaways: [
        "Recognize when you are accepting superficial praise in place of real authority.",
        "Break free from token roles in organizations and build undeniable mastery.",
        "Audit your internal self-talk for hidden victimhood narratives."
      ],
      content: [
        "Personal tokenism occurs when you settle for superficial recognition instead of building genuine, independent leverage.",
        "It is the illusion of progress: feeling satisfied because you were invited to the table, without realizing you have no vote in the menu.",
        "A Deep Remake demands that you stop accepting superficial titles and start building undeniable personal assets."
      ]
    },
    {
      id: 2,
      title: "Chapter 2: Cultivating the Growth Engine",
      subtitle: "From Fixed Mindset to Unstoppable Execution",
      summary: "Shift from a fixed baseline to an adaptable, high-impact growth system.",
      principle: "Remake Principle II: Mastery is not a static destination; it is an active state of refactoring.",
      keyTakeaways: [
        "Embrace challenges as stress-tests for your character and strategy.",
        "Install daily iteration sprints in your personal and professional routines."
      ],
      content: [
        "To rebuild yourself, you must fall in love with iteration. Just as high-performing software undergoes continuous refactoring, your mind requires regular updates.",
        "When faced with a setback, ask: 'What system flaw exposed this weakness?' rather than 'Why did this happen to me?'"
      ]
    },
    {
      id: 3,
      title: "Chapter 3: Designing Life with Intention",
      subtitle: "Pillars of Legacy & Mastery",
      summary: "Craft a vision that drives you toward fulfillment and generational impact.",
      isLocked: true,
      content: ["This chapter is locked in the sample preview."]
    }
  ]
};

// Content for The Ezra Rebuild Mindset (ID: 11) - Free book (All chapters unlocked!)
export const ezraRebuildBookData: EBookContentData = {
  productId: 11,
  title: "The Ezra Rebuild Mindset",
  subtitle: "Becoming the Ezra of Your Generation",
  author: "Zeki Faith",
  tagline: "Rebuilding Life, Business, and Community from the Inside Out.",
  pdfUrl: "/documents/a-free-guide-to-rebuilding.pdf",
  introduction: {
    title: "INTRODUCTION",
    subtitle: "Listen — Rebuilding is Not Punishment",
    content: [
      "Listen — Rebuilding is never easy. You'll question your strength, your timing, and your worth.",
      "But hear me — rebuilding is not punishment. It is an invitation.",
      "It is God whispering: 'Let Me build it again, this time with you fully awake.'",
      "Ezra didn't rebuild Jerusalem's physical walls — he rebuilt its mindset. He transformed a culture that had forgotten truth into a generation that walked in conviction.",
      "He was not a king or soldier — he was a teacher, a reformer, a restorer of inner order."
    ]
  },
  chapters: [
    {
      id: 1,
      title: "Pillar 1: From Collapse to Clarity",
      subtitle: "Rebuild Your Inner Blueprint",
      summary: "You cannot build a new life with an old mindset.",
      principle: "Rebuild Principle I: Clarity is the prerequisite for any lasting reconstruction.",
      keyTakeaways: [
        "Audit the ruins of past failures without emotional condemnation.",
        "Establish an unshakeable inner baseline regardless of external chaos.",
        "Disconnect your identity from temporary economic or situational setbacks."
      ],
      content: [
        "When collapse happens, the natural instinct is panic. People scramble to rebuild structures before auditing why the foundation gave way.",
        "Ezra understood that before laying a single stone, the inner mindset must be sanctified and clarified.",
        "If your world has fallen apart, it's not over — it's under construction. You are not behind time; you are being rebuilt for your appointed time."
      ]
    },
    {
      id: 2,
      title: "Pillar 2: From Pollution to Purity",
      subtitle: "Clean the Mental Altars",
      summary: "The first wealth is a clean, uncorrupted mind.",
      principle: "Rebuild Principle II: An polluted mind can never receive high-frequency revelation.",
      keyTakeaways: [
        "Remove toxic noise, negative influences, and cynical commentary.",
        "Guard your mental inputs with uncompromising discipline."
      ],
      content: [
        "You cannot expect divine clarity while immersing yourself in everyday digital garbage.",
        "Cleaning the mental altars means making a deliberate decision to eliminate gossip, fear-mongering media, and toxic associations."
      ]
    },
    {
      id: 3,
      title: "Pillar 3: From Emotion to Intention",
      subtitle: "Recommit to Your Purpose",
      summary: "Purpose without commitment is just potential on pause.",
      keyTakeaways: [
        "Move beyond emotional motivation into daily structured discipline.",
        "Build systems that hold you accountable when feelings fade."
      ],
      content: [
        "Emotions are fleeting waves. Intention is the anchor that holds the ship steady in the storm.",
        "Rebuilding demands that you show up on the days you feel inspired AND on the days you feel exhausted."
      ]
    },
    {
      id: 4,
      title: "Pillar 4: From Noise to Order",
      subtitle: "Reform Your Environment",
      summary: "Rebuilding demands order — not noise.",
      content: [
        "Order in your schedule, order in your workspace, order in your finances.",
        "Where there is disorder, energy is wasted on friction. Organize your perimeter to support your mission."
      ]
    },
    {
      id: 5,
      title: "Pillar 5: From Pressure to Power",
      subtitle: "Reignite Your Faith and Fire",
      summary: "Rebuilding isn't about recovering what you lost — it's about discovering what was inside you.",
      content: [
        "Pressure is the mechanism that converts carbon into diamonds.",
        "Embrace the heat of your current season, for it is refining you into an undeniable force of significance."
      ]
    }
  ]
};

// Content for The Art of Becoming (ID: 4) - Preview of The Human Broadcast E-Book
export const artOfBecomingBookData: EBookContentData = {
  productId: 4,
  title: "The Art of Becoming",
  subtitle: "The Definitive Blueprint for Human Architecture & Self-Evolution",
  author: "Zeki Ubor",
  tagline: "The master manual for taking the pen back—auditing your internal foundations and engineering an undeniable life of influence.",
  pdfUrl: "/documents/The_Human_Broadcast_Complete_Ebook.pdf",
  introduction: {
    title: "INTRODUCTION",
    subtitle: "Taking the Pen Back",
    content: [
      "Most people spend their entire lives occupying a reality designed by someone else's blueprint.",
      "The Art of Becoming is the master manual for taking the pen back—auditing your internal foundations, dismantling default conditioning, and engineering an undeniable life of influence, mastery, and succession."
    ]
  },
  chapters: [
    {
      id: 1,
      title: "Unit 1: Perception (The Lens of Reality)",
      subtitle: "Rewire Your Cognitive Baseline",
      summary: "Identify leverage and opportunity in any environment.",
      principle: "Becoming Principle I: Reality is not what happens to you; it is how your cognitive lens filters what happens.",
      keyTakeaways: [
        "Dismantle default conditioning of scarcity and fear.",
        "Identify hidden leverage points in high-pressure situations."
      ],
      content: [
        "Perception is the master architect of your experience. Two individuals can witness the exact same market shift: one sees catastrophic loss, while the other identifies an unprecedented buying opportunity.",
        "Rewiring your cognitive baseline means training yourself to ask: 'Where is the structural leverage in this moment?'"
      ]
    },
    {
      id: 2,
      title: "Unit 2: Usefulness (The Engine of Impact)",
      subtitle: "Transforming Raw Potential into Deployed Utility",
      summary: "Transform raw potential into high-impact utility that the global marketplace cannot ignore.",
      content: [
        "Potential without utility is a tragic waste. The marketplace rewards deployed competence, not dormant talent."
      ]
    },
    {
      id: 3,
      title: "Unit 3: Boundaries & Governance",
      subtitle: "Impenetrable Architecture of Focus",
      isLocked: true,
      content: ["This chapter is locked in the sample preview. Pre-order the Hardcover manual to unlock full access."]
    }
  ]
};

// Helper registry function
export function getEBookContent(productId: number, isPurchased: boolean = false): EBookContentData {
  let baseData: EBookContentData;

  switch (productId) {
    case 8:
      baseData = sellingQnaBookData;
      break;
    case 9:
      baseData = houseOfChoiceBookData;
      break;
    case 10:
      baseData = deepRemakeBookData;
      break;
    case 11:
      baseData = ezraRebuildBookData;
      break;
    case 4:
      baseData = artOfBecomingBookData;
      break;
    case 7:
    default:
      // Convert moneyFarmingBookData to EBookContentData format
      baseData = {
        productId: 7,
        title: moneyFarmingBookData.title,
        subtitle: moneyFarmingBookData.subtitle,
        author: moneyFarmingBookData.author,
        tagline: moneyFarmingBookData.tagline,
        pdfUrl: moneyFarmingBookData.pdfUrl,
        introduction: moneyFarmingBookData.introduction,
        chapters: moneyFarmingBookData.chapters.map((ch: MoneyFarmingChapter) => ({
          id: ch.id,
          title: ch.title,
          subtitle: ch.subtitle,
          summary: ch.summary,
          keyTakeaways: ch.keyTakeaways,
          content: ch.content,
          actionStep: ch.actionStep,
          reflectionQuestions: ch.reflectionQuestions,
          principle: ch.principle,
          // Lock chapters 3+ if not purchased (Money Farming has 7 chapters, 1 & 2 are free sample)
          isLocked: !isPurchased && ch.id > 2,
        })),
      };
      break;
  }

  // If user owns the product or it's a free book (ID 11), unlock all chapters!
  if (isPurchased || productId === 11) {
    return {
      ...baseData,
      chapters: baseData.chapters.map((ch) => ({ ...ch, isLocked: false })),
    };
  }

  // For unowned paid eBooks, mark chapters beyond sample index as locked
  return {
    ...baseData,
    chapters: baseData.chapters.map((ch, idx) => ({
      ...ch,
      isLocked: ch.isLocked ?? (idx >= 2), // Default: First 2 chapters free sample
    })),
  };
}
