export interface InteractiveChoice {
  id: string;
  label: string;
  description: string;
  consequence: string;
  insight: string;
  cognitiveProfileTag?: string;
}

export interface InteractiveStage {
  id: string;
  stageNumber: string; // e.g. "01", "02"
  stageType: 'see' | 'think' | 'choose' | 'discover' | 'try_again' | 'mission' | 'reflect';
  stageTitle: string;
  prompt: string;
  situation?: string;
  choices?: InteractiveChoice[];
  discoveryPrinciple?: {
    title: string;
    subheadline: string;
    explanation: string;
    keyTakeaways: string[];
    nigerianContextExample?: string;
  };
  mission?: {
    title: string;
    budgetOrResource: string;
    objective: string;
    options: {
      id: string;
      title: string;
      cost: string;
      expectedOutcome: string;
      riskFactor: string;
      verdict: string;
    }[];
  };
  reflectionPrompt?: string;
}

export interface UnconventionalModule {
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  conceptName: string; // e.g., "Scarcity & The Reality of Limits"
  capabilityUnlocked: string; // e.g., "Resource Allocation Awareness"
  hookQuestion: string;
  stages: InteractiveStage[];
}

export interface UnconventionalCourseData {
  courseId: string;
  flagshipTitle: string;
  subtitle: string;
  tagline: string;
  corePhilosophy: string;
  regularPriceNGN: number;
  launchPriceNGN: number;
  priceUSD: number;
  outcomes: string[];
  capabilities: string[];
  modules: UnconventionalModule[];
}

export const economicPrinciplesCourse: UnconventionalCourseData = {
  courseId: "economic-principles",
  flagshipTitle: "ECONOMIC PRINCIPLES",
  subtitle: "Understanding Money, Choice, Value & Opportunity",
  tagline: "What if understanding money starts with understanding choice?",
  corePhilosophy: "School often starts with the answer. Origin starts with the question.",
  regularPriceNGN: 21000,
  launchPriceNGN: 15000,
  priceUSD: 14,
  outcomes: [
    "Recognise trade-offs before you make irreversible commitments",
    "Think about resources (money, time, energy) as finite allocation engines",
    "Understand why prices rise, fall, and fluctuate in everyday markets",
    "Evaluate high-leverage opportunities vs shiny distractions",
    "Make more deliberate, calculated personal and business decisions",
    "Recognise fundamental economic laws operating in your daily life"
  ],
  capabilities: [
    "Decision Awareness",
    "Resource Awareness",
    "Value Thinking",
    "Trade-off Awareness",
    "Economic Reasoning"
  ],
  modules: [
    {
      id: "mod-1-scarcity",
      moduleNumber: 1,
      title: "Scarcity & The Reality of Limits",
      subtitle: "The ₦20,000 Resource Allocation Decision",
      duration: "30 mins",
      conceptName: "Scarcity",
      capabilityUnlocked: "Resource Allocation Awareness",
      hookQuestion: "You have ₦20,000 left. What will you give up to get what you want?",
      stages: [
        {
          id: "ep-1-1",
          stageNumber: "01",
          stageType: "see",
          stageTitle: "SEE IT",
          prompt: "It is the 22nd of the month. You have exactly ₦20,000 left in disposable funds. You have 4 pressing desires competing for that exact same sum.",
          situation: "You cannot split the money meaningfully—each option requires the full ₦20,000 to deliver its result."
        },
        {
          id: "ep-1-2",
          stageNumber: "02",
          stageType: "think",
          stageTitle: "THINK",
          prompt: "Why can't you have all four? Is the problem not having enough money, or the fundamental nature of reality itself?"
        },
        {
          id: "ep-1-3",
          stageNumber: "03",
          stageType: "choose",
          stageTitle: "CHOOSE",
          prompt: "Select the move you would make right now:",
          choices: [
            {
              id: "c1",
              label: "BUY SOMETHING YOU WANT",
              description: "A premium pair of shoes or clothing item you've been eyeing.",
              consequence: "You gain immediate pleasure and social status, but zero cash buffer or compounding asset.",
              insight: "You prioritized present gratification over future optionality.",
              cognitiveProfileTag: "Present-Oriented Consumption"
            },
            {
              id: "c2",
              label: "LEARN A PRACTICAL SKILL",
              description: "Buy access to a specialised workshop or technical tool.",
              consequence: "No immediate cash return, but your earning capability permanently expands.",
              insight: "You converted liquid cash into human capital.",
              cognitiveProfileTag: "Long-Horizon Compounder"
            },
            {
              id: "c3",
              label: "START SOMETHING SMALL",
              description: "Buy wholesale inventory or raw materials to flip for profit.",
              consequence: "You take active market risk with the potential to turn ₦20k into ₦35k.",
              insight: "You deployed capital into enterprise.",
              cognitiveProfileTag: "Commercial Risk-Taker"
            },
            {
              id: "c4",
              label: "SAVE IT IN A CASH RESERVE",
              description: "Lock it away in an emergency account.",
              consequence: "Zero immediate return, but maximum security against unexpected shocks.",
              insight: "You purchased peace of mind and defense.",
              cognitiveProfileTag: "Defensive Capital Preserver"
            }
          ]
        },
        {
          id: "ep-1-4",
          stageNumber: "04",
          stageType: "discover",
          stageTitle: "DISCOVER",
          prompt: "YOU JUST EXPERIENCED SCARCITY.",
          discoveryPrinciple: {
            title: "The Law of Scarcity",
            subheadline: "Unlimited Human Wants vs. Strictly Limited Resources",
            explanation: "Scarcity is not poverty; scarcity is the universal condition of humanity. Even billionaires have finite time and attention. When you chose your path, you didn't just spend ₦20,000—you killed off the other 3 possibilities. Every decision is a sacrifice.",
            keyTakeaways: [
              "Resources are always finite: money, hours in a day, mental energy.",
              "Wants are boundless: as soon as one is satisfied, two more appear.",
              "Economics is the science of making deliberate choices under constraints."
            ],
            nigerianContextExample: "In Lagos traffic or fuel price surges, you witness scarcity in real time: limited road capacity meets unlimited vehicle demand."
          }
        },
        {
          id: "ep-1-5",
          stageNumber: "05",
          stageType: "try_again",
          stageTitle: "TRY AGAIN",
          prompt: "Now consider time instead of money: You have one free Saturday (10 hours).",
          choices: [
            {
              id: "t1",
              label: "REST AND SLEEP",
              description: "Recover from a exhausting week.",
              consequence: "Physical restoration, but zero skill or relationship progress.",
              insight: "Time spent sleeping cannot be spent building."
            },
            {
              id: "t2",
              label: "WORK ON A SIDE BUSINESS",
              description: "Put 10 uninterrupted hours into building your project.",
              consequence: "Enterprise progress, but higher physical fatigue.",
              insight: "You traded leisure for future leverage."
            },
            {
              id: "t3",
              label: "NETWORK & ATTEND AN EVENT",
              description: "Meet new collaborators and peers in your industry.",
              consequence: "Social capital expanded, but direct work was delayed.",
              insight: "You invested time into serendipity."
            }
          ]
        },
        {
          id: "ep-1-6",
          stageNumber: "06",
          stageType: "mission",
          stageTitle: "USE IT",
          prompt: "REAL-WORLD MISSION: THE ₦50,000 BUDGET CONSTRAINT",
          mission: {
            title: "The ₦50,000 Micro-Venture Challenge",
            budgetOrResource: "₦50,000 + 7 Days",
            objective: "Produce the highest sustainable value without exceeding your resource cap.",
            options: [
              {
                id: "m1",
                title: "Plan A: Pure Arbitrage",
                cost: "₦40,000 inventory + ₦10,000 delivery",
                expectedOutcome: "₦65,000 gross revenue in 5 days",
                riskFactor: "Medium — inventory could get stuck",
                verdict: "High capital velocity, short-term gain."
              },
              {
                id: "m2",
                title: "Plan B: Skill Monopolization",
                cost: "₦25,000 tool license + ₦25,000 portfolio setup",
                expectedOutcome: "Land two retainer clients worth ₦80,000/mo",
                riskFactor: "Low capital loss, high effort requirement",
                verdict: "Highest long-term compounding return."
              },
              {
                id: "m3",
                title: "Plan C: Aggressive Advertising",
                cost: "₦50,000 digital ads for an unverified idea",
                expectedOutcome: "Uncertain (₦0 to ₦200,000)",
                riskFactor: "Extreme — 100% loss possible",
                verdict: "Gambling under scarcity without proof of concept."
              }
            ]
          }
        },
        {
          id: "ep-1-7",
          stageNumber: "07",
          stageType: "reflect",
          stageTitle: "REFLECT",
          prompt: "Look at your own life over the last 30 days:",
          reflectionPrompt: "Where did you pretend resources were unlimited? What was one decision where you failed to recognise the invisible sacrifice?"
        }
      ]
    },
    {
      id: "mod-2-opportunity-cost",
      moduleNumber: 2,
      title: "Opportunity Cost & The Invisible Price",
      subtitle: "The Opportunity You Gave Up",
      duration: "35 mins",
      conceptName: "Opportunity Cost",
      capabilityUnlocked: "Trade-off Awareness",
      hookQuestion: "When something is free, what are you actually paying for it?",
      stages: [
        {
          id: "ep-2-1",
          stageNumber: "01",
          stageType: "see",
          stageTitle: "SEE IT",
          prompt: "A friend offers you a 'free' ticket to an all-day conference 3 hours away.",
          situation: "The ticket price is ₦0. But attending will take 12 hours of your time, fuel costs, and force you to cancel a paid freelance gig worth ₦45,000."
        },
        {
          id: "ep-2-2",
          stageNumber: "02",
          stageType: "think",
          stageTitle: "THINK",
          prompt: "Is the ticket truly free? What is the real cost of saying 'yes'?"
        },
        {
          id: "ep-2-3",
          stageNumber: "03",
          stageType: "choose",
          stageTitle: "CHOOSE",
          prompt: "What is the true cost of attending?",
          choices: [
            {
              id: "oc1",
              label: "₦0 (The ticket was free)",
              description: "Taking only direct out-of-pocket ticket costs into account.",
              consequence: "You ignore lost wages, travel costs, and foregone time.",
              insight: "This is naive financial accounting, not economic thinking."
            },
            {
              id: "oc2",
              label: "₦45,000 + Travel + 12 Hours",
              description: "Counting the best alternative you surrendered to attend.",
              consequence: "You see the hidden bill behind 'free'.",
              insight: "This is true Opportunity Cost: the value of the next best alternative forgone."
            }
          ]
        },
        {
          id: "ep-2-4",
          stageNumber: "04",
          stageType: "discover",
          stageTitle: "DISCOVER",
          prompt: "THE INVISIBLE BILL: OPPORTUNITY COST",
          discoveryPrinciple: {
            title: "The Principle of Opportunity Cost",
            subheadline: "The true cost of anything is what you give up to get it.",
            explanation: "Every 'yes' is a thousand silent 'no's. When you spend 3 hours scrolling social media, the cost isn't ₦0—it is the book you didn't read, the workout you skipped, and the business pitch you didn't send.",
            keyTakeaways: [
              "Price is what you pay out of pocket; cost is everything you forfeit.",
              "Never judge an option in isolation—always compare it to its best alternative.",
              "Top decision-makers calculate opportunity costs automatically."
            ]
          }
        },
        {
          id: "ep-2-5",
          stageNumber: "05",
          stageType: "try_again",
          stageTitle: "TRY AGAIN",
          prompt: "You are offered a full-time job paying ₦250k/mo vs building your agency that currently makes ₦100k/mo but grew 30% last month.",
          choices: [
            {
              id: "oc-t1",
              label: "TAKE THE JOB",
              description: "Secure immediate ₦250k predictability.",
              consequence: "Opportunity cost is the potential exponential upside of the agency.",
              insight: "Trading equity/ownership for salary stability."
            },
            {
              id: "oc-t2",
              label: "DOUBLE DOWN ON AGENCY",
              description: "Reinvest all focus to cross ₦500k/mo.",
              consequence: "Opportunity cost is the safe ₦250k paycheck and peace of mind.",
              insight: "Accepting short-term cash sacrifice for asymmetric ownership."
            }
          ]
        },
        {
          id: "ep-2-6",
          stageNumber: "06",
          stageType: "mission",
          stageTitle: "USE IT",
          prompt: "MISSION: WHICH OPPORTUNITY CREATES THE GREATEST VALUE?",
          mission: {
            title: "Evaluating Three Real-World Proposals",
            budgetOrResource: "Your Next 3 Months (400 working hours)",
            objective: "Select the path with the lowest regret and highest net opportunity yield.",
            options: [
              {
                id: "op1",
                title: "Option A: 5 Small Low-Risk Gigs",
                cost: "400 hours",
                expectedOutcome: "Guaranteed ₦600,000 total",
                riskFactor: "Zero growth, linear income",
                verdict: "High opportunity cost in terms of compounding."
              },
              {
                id: "op2",
                title: "Option B: Build 1 High-Ticket Flagship Offer",
                cost: "300 hours building + 100 hours selling",
                expectedOutcome: "Potential ₦2,000,000+ with reusable asset",
                riskFactor: "Moderate execution risk",
                verdict: "Highest value-to-cost ratio."
              }
            ]
          }
        },
        {
          id: "ep-2-7",
          stageNumber: "07",
          stageType: "reflect",
          stageTitle: "REFLECT",
          prompt: "What is one 'free' habit or low-priority commitment you are currently paying an enormous hidden opportunity cost for?",
          reflectionPrompt: "Identify the commitment and calculate what it is truly costing your future."
        }
      ]
    },
    {
      id: "mod-3-value-perception",
      moduleNumber: 3,
      title: "Value, Perception & Exchange",
      subtitle: "Why Gold vs. Water?",
      duration: "30 mins",
      conceptName: "Subjective Value",
      capabilityUnlocked: "Value Thinking",
      hookQuestion: "Why is water cheap when life depends on it, but diamonds expensive when nobody needs them?",
      stages: [
        {
          id: "ep-3-1",
          stageNumber: "01",
          stageType: "see",
          stageTitle: "SEE IT",
          prompt: "You are in a desert dying of thirst with a bag containing 5kg of pure gold. A merchant offers 1 bottle of cold water for all your gold.",
          situation: "Do you make the trade?"
        },
        {
          id: "ep-3-2",
          stageNumber: "02",
          stageType: "think",
          stageTitle: "THINK",
          prompt: "In the city, 5kg of gold buys a mansion. In the desert, it cannot buy you one extra breath. What changed—the gold, or the context?"
        },
        {
          id: "ep-3-3",
          stageNumber: "03",
          stageType: "choose",
          stageTitle: "CHOOSE",
          prompt: "What is the economic truth revealed here?",
          choices: [
            {
              id: "v1",
              label: "Value is fixed by the cost to manufacture something",
              description: "Labor theory of value.",
              consequence: "Fails to explain why useless hard work creates zero wealth.",
              insight: "Work without desired utility has no market value."
            },
            {
              id: "v2",
              label: "Value is subjective and determined by urgency, context, and marginal utility",
              description: "Modern economic value theory.",
              consequence: "You understand that value lives in the mind of the buyer, not in the sweat of the creator.",
              insight: "To charge more, you must solve higher-stakes problems in specific contexts."
            }
          ]
        },
        {
          id: "ep-3-4",
          stageNumber: "04",
          stageType: "discover",
          stageTitle: "DISCOVER",
          prompt: "THE LAW OF SUBJECTIVE VALUE & MARGINAL UTILITY",
          discoveryPrinciple: {
            title: "Value is Created in Context",
            subheadline: "People do not pay for effort; they pay for outcomes in their specific situation.",
            explanation: "The first glass of water saves your life (infinite value). The tenth glass washes your car (low value). The hundredth glass floods your kitchen (negative value). This is Marginal Utility. Understanding this lets you position products, services, and your own skills for maximum leverage.",
            keyTakeaways: [
              "No product has intrinsic economic value; value is bestowed by the observer.",
              "Price is what someone agrees to exchange based on their perceived gain.",
              "Focusing on what you spent to make something is a trap; focus on what the receiver gains."
            ]
          }
        },
        {
          id: "ep-3-5",
          stageNumber: "05",
          stageType: "try_again",
          stageTitle: "TRY AGAIN",
          prompt: "A graphic designer charges ₦5,000 for a logo to a local tailor, but ₦500,000 for a logo to a venture-backed tech firm launching in 5 countries.",
          choices: [
            {
              id: "vt1",
              label: "That is unfair exploitation",
              description: "Assuming time spent is the only fair metric.",
              consequence: "You stay trapped in hourly wage thinking.",
              insight: "Misses the scale of value created."
            },
            {
              id: "vt2",
              label: "That is rational value-based pricing",
              description: "The tech firm stands to gain millions; the logo protects brand equity at scale.",
              consequence: "You unlock value pricing for your own skills.",
              insight: "Price corresponds to the magnitude of the problem solved."
            }
          ]
        },
        {
          id: "ep-3-6",
          stageNumber: "06",
          stageType: "mission",
          stageTitle: "USE IT",
          prompt: "MISSION: REFRAME AN OFFER FOR 5X VALUE",
          mission: {
            title: "The Value Repositioning Challenge",
            budgetOrResource: "1 Core Skill You Possess",
            objective: "Reposition a basic service into a high-stakes outcome.",
            options: [
              {
                id: "vp1",
                title: "Sell Hours: 'I will write articles for ₦5,000 each'",
                cost: "10 hours",
                expectedOutcome: "Low income, high client micromanagement",
                riskFactor: "Commodity trap",
                verdict: "Low perceived value."
              },
              {
                id: "vp2",
                title: "Sell Outcomes: 'I build customer acquisition funnels that generate ₦1M+'",
                cost: "10 hours",
                expectedOutcome: "₦200,000+ project fee with grateful client",
                riskFactor: "Must deliver real results",
                verdict: "High perceived value and asymmetric reward."
              }
            ]
          }
        },
        {
          id: "ep-3-7",
          stageNumber: "07",
          stageType: "reflect",
          stageTitle: "REFLECT",
          prompt: "In your work or career, are you currently charging for your labor/time, or for the subjective value of the problem you eliminate?",
          reflectionPrompt: "Write down how you can reframe your primary skill in terms of the client's high-stakes outcome."
        }
      ]
    },
    {
      id: "mod-4-supply-demand",
      moduleNumber: 4,
      title: "Supply, Demand & Price Dynamics",
      subtitle: "Why Did The Price Change?",
      duration: "30 mins",
      conceptName: "Supply & Demand",
      capabilityUnlocked: "Market Foresight",
      hookQuestion: "Why did tomato prices quadruple during rainy season?",
      stages: [
        {
          id: "ep-4-1",
          stageNumber: "01",
          stageType: "see",
          stageTitle: "SEE IT",
          prompt: "A sudden fuel scarcity strikes a major city. Ride-hailing fares triple, and transport queues stretch for 2 kilometres.",
          situation: "Passengers are furious. Drivers say they waited 6 hours in queue to buy petrol at inflated black-market rates."
        },
        {
          id: "ep-4-2",
          stageNumber: "02",
          stageType: "think",
          stageTitle: "THINK",
          prompt: "If the government forces all drivers to keep prices at normal rates, will more people get rides, or will rides disappear entirely?"
        },
        {
          id: "ep-4-3",
          stageNumber: "03",
          stageType: "choose",
          stageTitle: "CHOOSE",
          prompt: "Predict the outcome of an artificial price ceiling:",
          choices: [
            {
              id: "sd1",
              label: "Everyone gets cheap rides easily",
              description: "Assuming price controls generate supply.",
              consequence: "Violates economic laws: drivers refuse to operate at a loss.",
              insight: "Shortages worsen when prices are suppressed."
            },
            {
              id: "sd2",
              label: "Drivers park their cars; black market explodes; nobody gets a official ride",
              description: "Recognizing that price is a signal of scarcity.",
              consequence: "You understand that prices coordinate human action and ration scarce supply.",
              insight: "High prices incentivize suppliers to enter and solve the shortage."
            }
          ]
        },
        {
          id: "ep-4-4",
          stageNumber: "04",
          stageType: "discover",
          stageTitle: "DISCOVER",
          prompt: "PRICES ARE SIGNALS, NOT ARBITRARY NUMBERS",
          discoveryPrinciple: {
            title: "The Equilibrium of Supply & Demand",
            subheadline: "Prices are the nervous system of an economy.",
            explanation: "When demand exceeds supply, prices rise to ration the goods to whoever values them most and encourage producers to make more. When supply exceeds demand, prices crash until buyers clear the inventory.",
            keyTakeaways: [
              "High prices are a symptom of scarcity, not the cause.",
              "Price controls create shortages and black markets.",
              "If you want to earn more, position yourself where supply is scarce and demand is urgent."
            ]
          }
        },
        {
          id: "ep-4-5",
          stageNumber: "05",
          stageType: "try_again",
          stageTitle: "TRY AGAIN",
          prompt: "10,000 graduates have standard marketing degrees (oversupply). Only 50 know how to audit TikTok ad algorithms for e-commerce brands (scarce supply). Who commands ₦1,500,000/mo?",
          choices: [
            {
              id: "sdt1",
              label: "The standard graduate with high grades",
              description: "Believing credentials guarantee income.",
              consequence: "Market forces don't care about certificates if supply is vast.",
              insight: "Commodity labor has zero pricing power."
            },
            {
              id: "sdt2",
              label: "The specialized ad auditor",
              description: "Capitalizing on extreme supply scarcity and surging demand.",
              consequence: "You capture immense pricing leverage.",
              insight: "Build rare and valuable skill combinations."
            }
          ]
        },
        {
          id: "ep-4-6",
          stageNumber: "06",
          stageType: "mission",
          stageTitle: "USE IT",
          prompt: "MISSION: PREDICT WHAT HAPPENS WHEN SUPPLY CHANGES",
          mission: {
            title: "The Market Shock Simulation",
            budgetOrResource: "Market Trend Data",
            objective: "Accurately forecast price and inventory shifts.",
            options: [
              {
                id: "ms1",
                title: "Scenario: AI makes basic copywriting free and instant",
                cost: "Industry shift",
                expectedOutcome: "Basic copy fees plummet to ₦0; strategic storytelling and strategy fees soar",
                riskFactor: "Adaptation necessity",
                verdict: "Correctly identifies that commodity supply crash elevates bespoke strategy."
              }
            ]
          }
        },
        {
          id: "ep-4-7",
          stageNumber: "07",
          stageType: "reflect",
          stageTitle: "REFLECT",
          prompt: "Is what you sell (or your career skill) in high supply or scarce supply?",
          reflectionPrompt: "What single modification could you make to reduce the supply of people who can do what you do?"
        }
      ]
    },
    {
      id: "mod-5-cost-benefit",
      moduleNumber: 5,
      title: "Cost-Benefit & Asymmetric Upside",
      subtitle: "Is It Really Worth It?",
      duration: "30 mins",
      conceptName: "Cost-Benefit Thinking",
      capabilityUnlocked: "Asymmetric Calculation",
      hookQuestion: "When is a ₦100,000 risk worth taking, and when is a ₦10,000 bet foolish?",
      stages: [
        {
          id: "ep-5-1",
          stageNumber: "01",
          stageType: "see",
          stageTitle: "SEE IT",
          prompt: "You are offered two investment propositions:",
          situation: "Bet A: 90% chance to win ₦10,000, 10% chance to lose your entire life savings of ₦5,000,000.\nBet B: 50% chance to lose ₦50,000, 50% chance to generate ₦2,500,000."
        },
        {
          id: "ep-5-2",
          stageNumber: "02",
          stageType: "think",
          stageTitle: "THINK",
          prompt: "Bet A wins 9 out of 10 times! Why is it mathematically suicidal?"
        },
        {
          id: "ep-5-3",
          stageNumber: "03",
          stageType: "choose",
          stageTitle: "CHOOSE",
          prompt: "Which bet represents sound economic thinking?",
          choices: [
            {
              id: "cb1",
              label: "Bet A (Because 90% win rate feels safe)",
              description: "Ignoring tail-risk ruin.",
              consequence: "One unlucky draw wipes out your entire existence.",
              insight: "Never take risks where the downside is total ruin."
            },
            {
              id: "cb2",
              label: "Bet B (Asymmetric positive expected value)",
              description: "Capped downside (₦50k) vs massive upside (₦2.5M).",
              consequence: "Even if you lose twice, one win puts you vastly ahead.",
              insight: "Look for positive asymmetry: limited downside, uncapped upside."
            }
          ]
        },
        {
          id: "ep-5-4",
          stageNumber: "04",
          stageType: "discover",
          stageTitle: "DISCOVER",
          prompt: "ASYMMETRY & EXPECTED VALUE",
          discoveryPrinciple: {
            title: "The Logic of Asymmetric Bets",
            subheadline: "Smart risk-takers limit downside and expose themselves to massive upside.",
            explanation: "Reading a great book costs ₦5,000 and 5 hours (capped downside). It can give you an idea worth ₦10,000,000 over your career (uncapped upside). Buying lottery tickets has negative expected value. Building projects, learning rare skills, and networking with high-caliber people are asymmetric bets.",
            keyTakeaways: [
              "Never risk what you need for what you want (avoid ruin).",
              "Seek situations where losing costs little, but winning changes your trajectory.",
              "Evaluate decisions by expected value: (Probability × Gain) - (Probability × Loss)."
            ]
          }
        },
        {
          id: "ep-5-5",
          stageNumber: "05",
          stageType: "try_again",
          stageTitle: "TRY AGAIN",
          prompt: "Applying for 10 high-profile dream roles: Downside is getting rejected (cost: 5 hours + bruised ego). Upside is landing one ₦15M/yr offer.",
          choices: [
            {
              id: "cbt1",
              label: "Do not apply because rejection hurts",
              description: "Letting emotional cost outweigh mathematical upside.",
              consequence: "Zero growth, guaranteed mediocrity.",
              insight: "Emotional asymmetry working against you."
            },
            {
              id: "cbt2",
              label: "Apply aggressively to all 10",
              description: "Recognizing massive positive asymmetry.",
              consequence: "9 rejections mean nothing; the 1 acceptance changes everything.",
              insight: "Mastery of asymmetric upside."
            }
          ]
        },
        {
          id: "ep-5-6",
          stageNumber: "06",
          stageType: "mission",
          stageTitle: "USE IT",
          prompt: "MISSION: THE ₦100,000 ASYMMETRIC DECISION",
          mission: {
            title: "Evaluating 3 Strategic Moves",
            budgetOrResource: "₦100,000 Venture Capital",
            objective: "Select the option with the highest asymmetric leverage.",
            options: [
              {
                id: "as1",
                title: "Option 1: Safe Fixed Deposit at 12% p.a.",
                cost: "₦100,000 locked for 1 year",
                expectedOutcome: "₦12,000 gain (eaten by inflation)",
                riskFactor: "Low nominal risk, guaranteed real purchasing power loss",
                verdict: "Negative real asymmetry."
              },
              {
                id: "as2",
                title: "Option 2: Launch an automated digital product",
                cost: "₦100,000 for software and validation",
                expectedOutcome: "₦100,000 to ₦1,500,000 recurring with zero marginal replication cost",
                riskFactor: "Capped at ₦100,000 loss",
                verdict: "Massive positive asymmetry."
              }
            ]
          }
        },
        {
          id: "ep-5-7",
          stageNumber: "07",
          stageType: "reflect",
          stageTitle: "REFLECT",
          prompt: "What is one asymmetric bet you have been delaying out of fear of small, harmless rejections?",
          reflectionPrompt: "Commit to taking that capped-downside action this week."
        }
      ]
    },
    {
      id: "mod-6-builder-plan",
      moduleNumber: 6,
      title: "Resource Optimization & The Builder's Plan",
      subtitle: "Build With Limited Resources",
      duration: "40 mins",
      conceptName: "Economic Reasoning",
      capabilityUnlocked: "Holistic Economic Reasoning",
      hookQuestion: "How do you build something of lasting value with fixed money, limited time, and zero external funding?",
      stages: [
        {
          id: "ep-6-1",
          stageNumber: "01",
          stageType: "see",
          stageTitle: "SEE IT",
          prompt: "You have a vision for a breakthrough business. You have ₦100,000, 15 hours per week, and a laptop.",
          situation: "Most people say: 'I cannot start until I get ₦10,000,000 from an investor.' Great builders say: 'What can I build with exactly what I have today?'"
        },
        {
          id: "ep-6-2",
          stageNumber: "02",
          stageType: "think",
          stageTitle: "THINK",
          prompt: "How does an economic thinker bootstrap from constraint to abundance?"
        },
        {
          id: "ep-6-3",
          stageNumber: "03",
          stageType: "choose",
          stageTitle: "CHOOSE",
          prompt: "Select the foundational builder strategy:",
          choices: [
            {
              id: "bp1",
              label: "Wait for external funding before doing anything",
              description: "Zero leverage, zero momentum.",
              consequence: "You surrender your destiny to gatekeepers.",
              insight: "Resourcefulness precedes resources."
            },
            {
              id: "bp2",
              label: "Create a Minimum Viable Offer, pre-sell to 3 clients, fund growth from cash flow",
              description: "True economic bootstrapping.",
              consequence: "You retain 100% equity, validate demand, and generate real profit immediately.",
              insight: "Customers are the best investors."
            }
          ]
        },
        {
          id: "ep-6-4",
          stageNumber: "04",
          stageType: "discover",
          stageTitle: "DISCOVER",
          prompt: "THE SYNTHESIS: BECOMING AN ECONOMIC THINKER",
          discoveryPrinciple: {
            title: "The Ultimate Economic Advantage",
            subheadline: "You do not just understand economics; you operate with economic capability.",
            explanation: "You now see the world differently: You see Scarcity where others see chaos. You calculate Opportunity Cost where others see free gifts. You price by Subjective Value where others compete on cheap labor. You ride Supply & Demand waves, and you make Asymmetric Bets.",
            keyTakeaways: [
              "Thinking like an economist makes you resilient in any market.",
              "Constraints are not roadblocks; they are the exact boundaries that produce innovation.",
              "You have completed Origin's flagship economic foundation."
            ]
          }
        },
        {
          id: "ep-6-5",
          stageNumber: "05",
          stageType: "try_again",
          stageTitle: "TRY AGAIN",
          prompt: "Final challenge: Synthesize all 5 principles to solve a real family or business dilemma.",
          choices: [
            {
              id: "bpt1",
              label: "Apply Scarcity + Opportunity Cost + Asymmetry to your 12-month life plan",
              description: "Concrete execution.",
              consequence: "Personal capability unlocked.",
              insight: "You are the person behind your success."
            }
          ]
        },
        {
          id: "ep-6-6",
          stageNumber: "06",
          stageType: "mission",
          stageTitle: "USE IT",
          prompt: "MISSION: BUILD YOUR 90-DAY RESOURCE ALLOCATION BLUEPRINT",
          mission: {
            title: "The Capstone Economic Blueprint",
            budgetOrResource: "Your Actual Monthly Income & 168 Weekly Hours",
            objective: "Allocate money, focus, and energy with zero wasted opportunity cost.",
            options: [
              {
                id: "cp1",
                title: "Blueprint Execution Plan",
                cost: "Complete focus",
                expectedOutcome: "Immediate clarity on high-leverage vs low-leverage activities",
                riskFactor: "Requires personal discipline",
                verdict: "Mastery achieved."
              }
            ]
          }
        },
        {
          id: "ep-6-7",
          stageNumber: "07",
          stageType: "reflect",
          stageTitle: "REFLECT",
          prompt: "How has your understanding of money, choice, and value shifted since starting this journey?",
          reflectionPrompt: "Write down your personal manifesto for decision-making and wealth creation."
        }
      ]
    }
  ]
};

export const originChallengesList = [
  {
    id: "challenge-100k",
    title: "The ₦100,000 Decision",
    category: "Economic Principles",
    description: "You have ₦100,000 and 72 hours. How do you deploy it to generate maximum compounding leverage without risk of total loss?",
    timeLimit: "15 mins",
    difficulty: "Foundational",
    evaluates: "Trade-off awareness, Risk asymmetry, Capital velocity"
  },
  {
    id: "challenge-conversation",
    title: "The Difficult Conversation",
    category: "Communication",
    description: "A business partner has repeatedly missed deadlines, jeopardizing a ₦2M client contract. You have 15 minutes before the client call.",
    timeLimit: "20 mins",
    difficulty: "Intermediate",
    evaluates: "Clarity, Emotional regulation, Non-violent negotiation"
  },
  {
    id: "challenge-business-problem",
    title: "The Business Bottleneck",
    category: "Problem Solving",
    description: "Your product generates 10,000 clicks but only 2 sales. Where is the real breakdown and what is the root cause?",
    timeLimit: "25 mins",
    difficulty: "Intermediate",
    evaluates: "Root cause analysis, 5-Whys methodology, Funnel diagnosis"
  },
  {
    id: "challenge-limited-opportunity",
    title: "The Limited-Time Opportunity",
    category: "Decision Making",
    description: "You have 2 hours to accept an offer that requires relocating to another country vs staying with your current early-stage venture.",
    timeLimit: "15 mins",
    difficulty: "Advanced",
    evaluates: "Inversion thinking, Regret minimization, Opportunity cost"
  },
  {
    id: "challenge-broken-plan",
    title: "The Broken Plan",
    category: "Adaptability",
    description: "Your main supplier abruptly shuts down 3 days before your largest product launch of the year. What is your rapid pivot sequence?",
    timeLimit: "20 mins",
    difficulty: "Advanced",
    evaluates: "Flexible thinking, Crisis triage, Momentum maintenance"
  },
  {
    id: "challenge-resource-constraint",
    title: "The Resource Constraint",
    category: "Economic Principles",
    description: "Design a complete educational campaign with zero budget, 1 volunteer, and a WhatsApp group.",
    timeLimit: "30 mins",
    difficulty: "Foundational",
    evaluates: "Resourcefulness, Organic distribution, Value proposition"
  }
];

export const questionMatrixData = [
  {
    id: "q-bad-decisions",
    question: "Why do smart people make bad decisions under pressure?",
    courseId: "decision-making",
    courseTitle: "Mastering Decision-Making",
    category: "ORIGIN FOUNDATIONS",
    answerPreview: "Decisions fail not from lack of intelligence, but from emotional hijacking, narrow framing, and uncalculated hidden risks.",
    whatYouWillUnderstand: "Mental models, inversion thinking, risk assessment, and frameworks for high-stakes clarity.",
    price: "₦21,000"
  },
  {
    id: "q-money-disappears",
    question: "Why does money seem to disappear even when you earn more?",
    courseId: "economic-principles",
    courseTitle: "Economic Principles",
    category: "ORIGIN FOUNDATIONS",
    answerPreview: "Money disappears because human wants are infinite while resources are finite. Without understanding Scarcity and Opportunity Cost, expenses expand to meet income.",
    whatYouWillUnderstand: "Scarcity, Opportunity Cost, Resource Allocation, and how to stop invisible financial leaks.",
    price: "₦21,000 (Founding Launch: ₦15,000)"
  },
  {
    id: "q-opportunity-value",
    question: "Why do some opportunities create 10x more value than others?",
    courseId: "economic-principles",
    courseTitle: "Economic Principles",
    category: "ORIGIN FOUNDATIONS",
    answerPreview: "Value is not determined by how hard you work, but by the subjective importance of the problem you solve in a specific context.",
    whatYouWillUnderstand: "Subjective Value, Marginal Utility, Supply & Demand dynamics, and Asymmetric Upside.",
    price: "₦21,000 (Founding Launch: ₦15,000)"
  },
  {
    id: "q-misunderstanding",
    question: "Why do people misunderstand each other in critical moments?",
    courseId: "communication",
    courseTitle: "Communication Mastery",
    category: "ORIGIN FOUNDATIONS",
    answerPreview: "People listen to reply rather than to comprehend, projecting their internal assumptions onto ambiguous words.",
    whatYouWillUnderstand: "The Clarity-First Principle, Active Listening, Non-verbal cues, and navigating difficult conversations.",
    price: "₦21,000"
  },
  {
    id: "q-broken-plans",
    question: "How do I become more adaptable when my plans break?",
    courseId: "personal-adaptability",
    courseTitle: "Personal Adaptability",
    category: "ORIGIN FOUNDATIONS",
    answerPreview: "Rigidity creates fragility. Adaptability is the discipline of rapid emotional recovery and flexible mental reframing.",
    whatYouWillUnderstand: "Resilience routines, cognitive flexibility, stress regulation, and fast iteration.",
    price: "₦21,000"
  },
  {
    id: "q-solve-problems",
    question: "How do I solve problems that don't have an obvious formula?",
    courseId: "problem-solving",
    courseTitle: "Solution Mindset",
    category: "ORIGIN FOUNDATIONS",
    answerPreview: "Most people jump to solutions for the wrong problem. Real breakthrough problem-solving begins by defining the root cause.",
    whatYouWillUnderstand: "Root cause analysis, 5-Whys, analytical frameworks, and creative synthesis.",
    price: "₦21,000"
  },
  {
    id: "q-self-conviction",
    question: "How do I build self-conviction that doesn't collapse under doubt?",
    courseId: "self-image",
    courseTitle: "Strengthening Self-Image",
    category: "ORIGIN FOUNDATIONS",
    answerPreview: "Confidence is not positive thinking; confidence is the reputation you have built with yourself through kept promises.",
    whatYouWillUnderstand: "Identity formation, self-talk fundamentals, boundary setting, and lasting self-belief.",
    price: "₦21,000"
  }
];

export const startHereTracks = [
  {
    id: "track-thinking",
    goal: "THINKING",
    label: "I want to think more clearly and critically",
    recommendedCourseId: "problem-solving",
    recommendedTitle: "8 Ways to Develop Solution Mindset",
    why: "Builds the analytical frameworks and mental models needed to deconstruct any complex situation.",
    tagline: "Move from confusion to structured clarity."
  },
  {
    id: "track-deciding",
    goal: "DECIDING",
    label: "I want to make better decisions under pressure",
    recommendedCourseId: "decision-making",
    recommendedTitle: "9 Ways to Master Decision-Making",
    why: "Teaches inversion, probability calculation, and how to avoid irreversible traps.",
    tagline: "Reduce decision fatigue and choose with conviction."
  },
  {
    id: "track-money",
    goal: "UNDERSTANDING MONEY",
    label: "I want to understand money, value, and economic trade-offs",
    recommendedCourseId: "economic-principles",
    recommendedTitle: "Economic Principles — Money, Choice & Value",
    why: "Flagship foundational experience that demystifies scarcity, price signals, and asymmetric wealth creation.",
    tagline: "Stop losing money to hidden opportunity costs."
  },
  {
    id: "track-communicating",
    goal: "COMMUNICATING",
    label: "I want to express ideas clearly and resolve tension",
    recommendedCourseId: "communication",
    recommendedTitle: "8 Ways to Improve Communication",
    why: "Teaches clarity-first structuring, deep listening, and persuasion without manipulation.",
    tagline: "Speak so people listen; listen so people speak."
  },
  {
    id: "track-self",
    goal: "UNDERSTANDING MYSELF",
    label: "I want to build unshakeable self-belief and identity",
    recommendedCourseId: "self-image",
    recommendedTitle: "8 Ways to Strengthen Self-Image",
    why: "Replaces fragile ego with deep competence, solid boundaries, and consistent self-discipline.",
    tagline: "Build the person behind your future success."
  },
  {
    id: "track-adapting",
    goal: "ADAPTING",
    label: "I want to stay calm and pivot when circumstances change",
    recommendedCourseId: "personal-adaptability",
    recommendedTitle: "8 Ways to Build Personal Adaptability",
    why: "Equips you with cognitive agility, emotional stability, and the ability to thrive through uncertainty.",
    tagline: "Become antifragile in a rapidly shifting world."
  }
];
