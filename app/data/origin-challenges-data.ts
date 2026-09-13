export interface ChallengeChoice {
  id: string;
  label: string;
  description: string;
  action: string;
  whatYouGained: string;
  whatYouSacrificed: string;
  opportunityCostInsight: string;
}

export interface ChallengeStage {
  stageNumber: string;
  stageTitle: string;
  situation: string;
  prompt: string;
  timeEstimate: string;
  choices: ChallengeChoice[];
}

export interface ChallengeSimulation {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  timeLimit: string;
  evaluates: string;
  briefing: string;
  connectedCourseId: string;
  connectedCourseTitle: string;
  coursePitch: string;
  stages: ChallengeStage[];
  cognitiveDiagnosis: {
    archetype: string;
    strengths: string[];
    blindspot: string;
    takeaway: string;
  };
}

export const challengeSimulations: Record<string, ChallengeSimulation> = {
  "challenge-100k": {
    id: "challenge-100k",
    title: "The ₦100,000 Decision",
    category: "Economic Principles",
    difficulty: "Foundational",
    timeLimit: "15 mins",
    evaluates: "Trade-off awareness, Risk asymmetry, Capital velocity",
    briefing: "You have ₦100,000 cash and 72 hours. Inflation is eroding purchasing power at 28% annually. How do you deploy this capital to generate compounding momentum without risking total loss?",
    connectedCourseId: "economic-principles",
    connectedCourseTitle: "Economic Principles: Money, Choice, Value & Opportunity",
    coursePitch: "Master scarcity, capital velocity, and asymmetric risk. Build the economic intuition that stops financial leakage.",
    stages: [
      {
        stageNumber: "01",
        stageTitle: "STAGE 1: THE ALLOCATION CRUCIBLE",
        situation: "You have ₦100,000 liquid capital sitting in your checking account. Every day it sits idle, real inflation eats its value.",
        prompt: "Where do you deploy your ₦100,000 within the next 24 hours?",
        timeEstimate: "3 mins",
        choices: [
          {
            id: "opt-inventory",
            label: "HIGH-VELOCITY COMMERCE",
            description: "Purchase high-demand fast-moving goods at wholesale and resell within 72 hours at a 15% net margin.",
            action: "You deployed ₦100,000 into physical inventory.",
            whatYouGained: "Immediate cash flow velocity and commercial sales feedback.",
            whatYouSacrificed: "Liquid safety: if goods fail to move or are damaged, capital is locked.",
            opportunityCostInsight: "You chose capital velocity over liquid optionality. Your sacrifice is guaranteed security."
          },
          {
            id: "opt-safe-yield",
            label: "PRESERVATION (TREASURY BILLS)",
            description: "Lock the ₦100,000 into a guaranteed treasury bill yielding 18% annual return.",
            action: "You placed ₦100,000 into a government-backed yield instrument.",
            whatYouGained: "Zero nominal risk of loss and effortless interest accrual.",
            whatYouSacrificed: "Real purchasing power: at 28% inflation, you lose 10% in real economic value.",
            opportunityCostInsight: "You traded real wealth growth for nominal safety. You guaranteed an invisible loss."
          },
          {
            id: "opt-digital-asset",
            label: "ASYMMETRIC DIGITAL PRODUCT",
            description: "Spend ₦100,000 validating and hosting an automated digital resource with zero reproduction cost.",
            action: "You invested ₦100,000 into software, validation, and distribution.",
            whatYouGained: "Infinite scalability: downside capped at ₦100,000, upside is unbounded recurring cash flow.",
            whatYouSacrificed: "Certainty: 70% of digital products fail in initial validation.",
            opportunityCostInsight: "You embraced asymmetric upside. Your sacrifice is immediate operational predictability."
          }
        ]
      },
      {
        stageNumber: "02",
        stageTitle: "STAGE 2: THE 48-HOUR COMPLICATION",
        situation: "48 hours in, an unexpected logistical bottleneck arises: you need an additional ₦25,000 for critical delivery clearing, or your entire venture stalls for 2 weeks.",
        prompt: "How do you navigate this cash liquidity constraint without external borrowing?",
        timeEstimate: "2 mins",
        choices: [
          {
            id: "opt-pre-sale",
            label: "PRE-SELL FUTURE VALUE",
            description: "Offer an early bird 20% discount to your next 3 customers for immediate cash upfront.",
            action: "You funded the clearing fee using customer-financed capital.",
            whatYouGained: "Immediate zero-debt liquidity and validation of strong customer demand.",
            whatYouSacrificed: "20% future gross margin on those early sales.",
            opportunityCostInsight: "You chose immediate velocity over margin perfection. Great operators finance growth through value delivery."
          },
          {
            id: "opt-liquidate",
            label: "FIRE-SALE 30% OF ASSETS",
            description: "Liquidate 30% of your current position at break-even to free up the ₦25,000 cash.",
            action: "You traded asset volume for cash liquidity.",
            whatYouGained: "Complete operational autonomy without promising future commitments.",
            whatYouSacrificed: "30% of your maximum potential profit potential.",
            opportunityCostInsight: "You preserved control by cutting upside. You prioritize survival over pride."
          },
          {
            id: "opt-negotiate-delay",
            label: "PAUSE & NEGOTIATE PAYMENT TERMS",
            description: "Negotiate a 14-day net payment cycle with the logistics provider by offering 10% collateral.",
            action: "You converted a cash constraint into an operational credit relationship.",
            whatYouGained: "Preserved 100% of your cash and full profit margins.",
            whatYouSacrificed: "Time and relationship goodwill if you fail to pay on day 14.",
            opportunityCostInsight: "You used leverage instead of cash. Trust is the highest-margin currency in business."
          }
        ]
      }
    ],
    cognitiveDiagnosis: {
      archetype: "THE ASYMMETRIC OPERATOR",
      strengths: [
        "Calculates real inflation vs. nominal illusion",
        "Prioritizes cash velocity over perfection",
        "Uses customer-funded leverage instead of toxic debt"
      ],
      blindspot: "Watch for liquidity crunches when scaling before reserves are stabilized.",
      takeaway: "True economic thinking is not about hoarding money; it is about orchestrating value velocity under strict scarcity."
    }
  },

  "challenge-conversation": {
    id: "challenge-conversation",
    title: "The Difficult Conversation",
    category: "Communication",
    difficulty: "Intermediate",
    timeLimit: "20 mins",
    evaluates: "Clarity, Emotional regulation, Non-violent negotiation",
    briefing: "A business partner has repeatedly missed delivery deadlines, putting a ₦2,000,000 institutional contract at imminent risk. You have 15 minutes before a critical joint video call with the client.",
    connectedCourseId: "communication",
    connectedCourseTitle: "Communication Mastery: Clarity & Influence",
    coursePitch: "Learn to speak with surgical precision, decode hidden intent, and negotiate through extreme friction without burning bridges.",
    stages: [
      {
        stageNumber: "01",
        stageTitle: "STAGE 1: THE 15-MINUTE PRE-CALL CONFRONTATION",
        situation: "Your partner joins the private prep room looking stressed and dismissive, muttering: 'The client is asking for too much; we'll just tell them we need another week.'",
        prompt: "How do you open the conversation to align incentives in the next 3 minutes?",
        timeEstimate: "3 mins",
        choices: [
          {
            id: "comm-blame",
            label: "CONFRONT DIRECTLY ON ACCOUNTABILITY",
            description: "Say: 'No, you promised this deadline 3 times. If we delay again, we lose the ₦2M contract today.'",
            action: "You confronted them with raw factual accountability.",
            whatYouGained: "Immediate clarity on where you stand and zero ambiguity.",
            whatYouSacrificed: "Their emotional safety, prompting defensive stonewalling right before the client call.",
            opportunityCostInsight: "Righteous truth delivered without tact creates defensive enemies. You won the argument but compromised the meeting."
          },
          {
            id: "comm-anchor",
            label: "ANCHOR ON SHARED STAKES & SCOPE TRIAGE",
            description: "Say: 'We both have ₦2M on the line. What is the 80% that is ready now that we can showcase with excellence, and what do we adjust?'",
            action: "You shifted from personal blame to collaborative triage.",
            whatYouGained: "De-escalation, mutual focus on contract survival, and actionable scope clarity.",
            whatYouSacrificed: "The satisfaction of venting your frustration immediately.",
            opportunityCostInsight: "You chose pragmatic leverage over emotional release. True communication solves problems, not egos."
          }
        ]
      },
      {
        stageNumber: "02",
        stageTitle: "STAGE 2: THE CLIENT CALL AMBUSH",
        situation: "During the client call, the client asks a direct technical question. Your partner panics and makes an impossible guarantee to deliver custom engineering by tomorrow morning.",
        prompt: "How do you intervene in real-time without undermining your partner in front of the client?",
        timeEstimate: "2 mins",
        choices: [
          {
            id: "comm-reframing",
            label: "BRIDGE & CLARIFY THE MILESTONE",
            description: "Step in smoothly: 'What my partner means is that we will deliver the verified core data tomorrow, and the full UI release on Friday so quality is uncompromised.'",
            action: "You redefined their panic guarantee into a realistic, high-standard milestone.",
            whatYouGained: "Protected the team's credibility without publicly humiliating your partner.",
            whatYouSacrificed: "Nothing—you reframed friction into strategic competence.",
            opportunityCostInsight: "Master communicators never contradict partners publicly; they translate clumsy promises into structured agreements."
          },
          {
            id: "comm-correct-live",
            label: "CORRECT IMMEDIATELY ON THE RECORD",
            description: "Say: 'Actually, that won't be possible by tomorrow. We need until Friday.'",
            action: "You corrected the inaccuracy on the spot.",
            whatYouGained: "Rigid factual honesty with the client.",
            whatYouSacrificed: "Team cohesion: the client notices the internal fracture and doubts your operational stability.",
            opportunityCostInsight: "You prioritized accuracy over authority. The client now wonders who is really running the company."
          }
        ]
      }
    ],
    cognitiveDiagnosis: {
      archetype: "THE STRATEGIC DIPLOMAT",
      strengths: [
        "Separates human emotion from structural problems",
        "Reframes panic into structured milestones",
        "Protects team leverage in high-stakes negotiations"
      ],
      blindspot: "Avoid letting empathy become an excuse for delaying necessary boundary enforcement.",
      takeaway: "Communication is not about winning debates; it is about sculpting reality so all parties can move forward with conviction."
    }
  },

  "challenge-business-problem": {
    id: "challenge-business-problem",
    title: "The Business Bottleneck",
    category: "Problem Solving",
    difficulty: "Intermediate",
    timeLimit: "25 mins",
    evaluates: "Root cause analysis, 5-Whys methodology, Funnel diagnosis",
    briefing: "Your digital service generated 10,000 clicks this month from paid acquisition, but only 2 customers completed checkout. Where is the real breakdown, and how do you systematically diagnose it?",
    connectedCourseId: "problem-solving",
    connectedCourseTitle: "Problem Solving: The Solution Mindset",
    coursePitch: "Develop the cognitive frameworks to separate surface distractions from root causes and design repeatable breakthroughs.",
    stages: [
      {
        stageNumber: "01",
        stageTitle: "STAGE 1: ROOT CAUSE TRIAGE",
        situation: "Your team wants to immediately double the ad spend to 20,000 clicks or slash the price by 50%. You know hasty solutions treat symptoms, not root causes.",
        prompt: "What diagnostic action do you enforce before touching the budget?",
        timeEstimate: "3 mins",
        choices: [
          {
            id: "prob-5whys",
            label: "MAP THE FRICTION DROPOFF WITH 5-WHYS",
            description: "Inspect step-by-step conversion analytics: ad click -> landing page view -> pricing scroll -> cart start -> payment completion.",
            action: "You conducted an end-to-end telemetry audit.",
            whatYouGained: "Exact isolation of where users leave: 8,000 viewed pricing, but 98% bounced before clicking Pay.",
            whatYouSacrificed: "Instant gratification of 'doing something fast'.",
            opportunityCostInsight: "Diagnosing before prescribing is the hallmark of elite problem solvers. You avoided wasting ₦500,000 in blind ad spend."
          },
          {
            id: "prob-slash-price",
            label: "TEST A 50% FLASH SALE",
            description: "Drop the price to see if the barrier was purely cost elasticity.",
            action: "You tested price reduction across all traffic.",
            whatYouGained: "Quick data on whether price was the friction.",
            whatYouSacrificed: "Brand equity and gross margin. If the real issue was trust or checkout failure, cheaper pricing still won't convert.",
            opportunityCostInsight: "You confused price resistance with trust deficit. When people don't trust you, even free is too expensive."
          }
        ]
      },
      {
        stageNumber: "02",
        stageTitle: "STAGE 2: THE TRUST BOTTLENECK",
        situation: "The audit reveals 8,000 people visited the checkout, but 99% abandoned upon seeing an unfamiliar third-party checkout URL with zero local payment options.",
        prompt: "How do you permanently eliminate this bottleneck?",
        timeEstimate: "2 mins",
        choices: [
          {
            id: "prob-local-trust",
            label: "INTEGRATE LOCAL DIRECT RAILS & SOCIAL PROOF",
            description: "Implement direct bank transfers, recognizable local payment logos, and 3 audited student video reviews directly on the payment screen.",
            action: "You dissolved checkout friction and trust resistance simultaneously.",
            whatYouGained: "Conversion rate jumps from 0.02% to 3.8% overnight without spending an additional naira on ads.",
            whatYouSacrificed: "2 days of engineering focus.",
            opportunityCostInsight: "You removed the exact barrier between desire and transaction. Leverage is fixing the narrowest bottleneck."
          },
          {
            id: "prob-retargeting",
            label: "BLAST RETARGETING EMAILS",
            description: "Send 5 automated 'Did you forget something?' emails to all abandoned checkouts.",
            action: "You amplified outreach to unconvinced visitors.",
            whatYouGained: "A tiny 0.1% recovery rate.",
            whatYouSacrificed: "User trust: sending reminders to visit a broken checkout just irritates prospects.",
            opportunityCostInsight: "Pouring more water into a bucket with a hole at the bottom will never fill the bucket."
          }
        ]
      }
    ],
    cognitiveDiagnosis: {
      archetype: "THE SYSTEMIC ARCHITECT",
      strengths: [
        "Isolates root causes before applying medicine",
        "Understands that friction is usually psychological, not pricing",
        "Creates 10x leverage by optimizing the narrowest constraint"
      ],
      blindspot: "Ensure you don't over-analyze when quick directional experiments are sufficient.",
      takeaway: "Great problem solvers don't work 10x harder; they find the single constraint that unlocks the entire system."
    }
  },

  "challenge-limited-opportunity": {
    id: "challenge-limited-opportunity",
    title: "The Limited-Time Opportunity",
    category: "Decision Making",
    difficulty: "Advanced",
    timeLimit: "15 mins",
    evaluates: "Inversion thinking, Regret minimization, Opportunity cost",
    briefing: "You have 2 hours to accept an international corporate offer paying ₦2,000,000/month with mandatory relocation vs. staying with your Nigerian early-stage venture where you hold 25% equity.",
    connectedCourseId: "decision-making",
    connectedCourseTitle: "Decision Making: Critical Thinking Under Pressure",
    coursePitch: "Master second-order thinking, inversion, and mental models to make high-stakes choices with calm conviction.",
    stages: [
      {
        stageNumber: "01",
        stageTitle: "STAGE 1: THE REGRET MINIMIZATION INVERSION",
        situation: "The corporate offer provides immediate prestige, comfortable salary, and security. The startup offers uncertainty, high pressure, but potential asymmetric generational upside.",
        prompt: "Which decision framework do you apply to cut through the noise?",
        timeEstimate: "3 mins",
        choices: [
          {
            id: "dec-inversion",
            label: "INVERT TO AGE 75 (REGRET MINIMIZATION)",
            description: "Ask: 'Looking back at age 75, which outcome will haunt me more: failing at my venture, or never knowing what I could have built?'",
            action: "You stepped outside short-term comfort to evaluate lifetime regret.",
            whatYouGained: "Immediate clarity: failure is tolerable, unlived potential is agonizing.",
            whatYouSacrificed: "The psychological sedative of corporate safety.",
            opportunityCostInsight: "Most people optimize for 24 months; wise leaders optimize for 40 years."
          },
          {
            id: "dec-short-cash",
            label: "CHOOSE IMMEDIATE FINANCIAL CERTAINTY",
            description: "Accept the corporate job to build an offshore cash reserve for 2 years before trying again.",
            action: "You chose immediate guaranteed salary.",
            whatYouGained: "High short-term stability, guaranteed cash flow, and reduced stress.",
            whatYouSacrificed: "Startup momentum and market timing that cannot be paused and resumed on command.",
            opportunityCostInsight: "Opportunities are perishable goods. You traded an unrepeatable window for a replaceable salary."
          }
        ]
      },
      {
        stageNumber: "02",
        stageTitle: "STAGE 2: THE ARTIFICIAL ULTIMATUM",
        situation: "The corporate recruiter calls with 30 minutes left: 'We have another candidate on standby. If you don't sign right now, we are revoking the offer.'",
        prompt: "How do you respond to pressure tactics designed to force a rushed decision?",
        timeEstimate: "2 mins",
        choices: [
          {
            id: "dec-hold-standard",
            label: "ENFORCE YOUR REASONING BOUNDARY",
            description: "Calmly reply: 'I make major life commitments with thorough conviction. If the position requires me to bypass careful evaluation, please proceed with the other candidate.'",
            action: "You called the bluff and preserved your decision integrity.",
            whatYouGained: "Total psychological sovereignty. In 80% of cases, the counterparty yields and extends the deadline.",
            whatYouSacrificed: "The safety net of people-pleasing.",
            opportunityCostInsight: "Anyone who forces you to decide without thinking is engineering an asymmetry in their favor."
          },
          {
            id: "dec-panic-sign",
            label: "SIGN UNDER DURESS WITH PLAN TO RENEGE",
            description: "Sign the agreement to lock the spot, intending to back out later if you change your mind.",
            action: "You deferred confrontation through deceptive agreement.",
            whatYouGained: "Bought artificial time without immediate loss.",
            whatYouSacrificed: "Your word and professional reputation in executive circles.",
            opportunityCostInsight: "Compromising integrity to delay pressure always compounds into a larger crisis later."
          }
        ]
      }
    ],
    cognitiveDiagnosis: {
      archetype: "THE HIGH-CONVICTION SOVEREIGN",
      strengths: [
        "Uses inversion to see past short-term emotional traps",
        "Refuses to let counterparty pressure dictate life trajectory",
        "Calculates regret over decades rather than months"
      ],
      blindspot: "Ensure you have clear interim cash survival plans when choosing high-asymmetry risk.",
      takeaway: "The quality of your life is determined by the quality of the decisions you make under severe time pressure."
    }
  },

  "challenge-broken-plan": {
    id: "challenge-broken-plan",
    title: "The Broken Plan",
    category: "Adaptability",
    difficulty: "Advanced",
    timeLimit: "20 mins",
    evaluates: "Flexible thinking, Crisis triage, Momentum maintenance",
    briefing: "Your primary supplier abruptly shuts down operations 72 hours before your largest annual product launch with 500 paid pre-orders awaiting fulfillment.",
    connectedCourseId: "personal-adaptability",
    connectedCourseTitle: "Personal Adaptability & Antifragility",
    coursePitch: "Develop the cognitive flexibility to thrive through black swan events, sudden disruption, and broken roadmaps.",
    stages: [
      {
        stageNumber: "01",
        stageTitle: "STAGE 1: CRISIS TRIAGE UNDER PRESSURE",
        situation: "Panic sets in. Your team wants to cancel the entire launch, issue full refunds, and apologize on social media. 500 customers are eagerly waiting.",
        prompt: "What is your immediate 60-minute crisis sequence?",
        timeEstimate: "3 mins",
        choices: [
          {
            id: "adapt-transparency",
            label: "THE RADICAL TRANSPARENCY & UPGRADE PLAY",
            description: "Email all 500 customers within 2 hours: explain the exact supplier disruption, guarantee fulfillment within 10 days, and gift an unreleased ₦15,000 companion guide for free.",
            action: "You turned an operational failure into a demonstration of radical integrity.",
            whatYouGained: "94% of customers choose to wait; cancellation rate stays under 6%.",
            whatYouSacrificed: "Margin on the free digital bonus.",
            opportunityCostInsight: "Antifragile operators use shocks to deepen customer loyalty. Adversity handled with honor builds lifelong fans."
          },
          {
            id: "adapt-hide",
            label: "STALL FOR TIME WITHOUT NOTIFYING",
            description: "Say nothing while quietly searching for an emergency supplier to see if you can pull off a miracle.",
            action: "You gambled on hidden recovery.",
            whatYouGained: "A slim 10% chance of delivering without anyone knowing.",
            whatYouSacrificed: "Trust: when you inevitably miss the date, customers feel deceived and demand mass chargebacks.",
            opportunityCostInsight: "Delaying bad news multiplies its destructive impact by 10x."
          }
        ]
      },
      {
        stageNumber: "02",
        stageTitle: "STAGE 2: THE REBUILDING PIVOT",
        situation: "An alternative manufacturer can fulfill the 500 orders, but they demand an 80% cost premium and 100% cash in advance, wiping out your launch profits.",
        prompt: "How do you proceed to protect long-term business viability?",
        timeEstimate: "2 mins",
        choices: [
          {
            id: "adapt-fulfill-breakeven",
            label: "FULFILL AT ZERO PROFIT TO PROTECT MOMENTUM",
            description: "Pay the premium and fulfill the orders at zero profit. Protect your promises and secure the customer relationship.",
            action: "You absorbed financial pain to defend reputation.",
            whatYouGained: "500 ecstatic customers who received their orders and become repeatable buyers for future launches.",
            whatYouSacrificed: "Short-term launch profit.",
            opportunityCostInsight: "Cash can be recovered next month; a shattered reputation takes years to rebuild."
          },
          {
            id: "adapt-cancel-refund",
            label: "CANCEL ALL ORDERS & PRESERVE CASH",
            description: "Refund everyone and cancel the product run to keep your working capital intact.",
            action: "You chose immediate financial preservation.",
            whatYouGained: "Kept all operating capital intact.",
            whatYouSacrificed: "All market momentum, customer faith, and 6 months of marketing effort.",
            opportunityCostInsight: "You protected money at the expense of enterprise survival. A business without customer trust is an empty shell."
          }
        ]
      }
    ],
    cognitiveDiagnosis: {
      archetype: "THE ANTIFRAGILE LEADER",
      strengths: [
        "Understands that reputation is more valuable than temporary margin",
        "Converts operational failure into trust-building moments",
        "Maintains calm momentum when initial plans disintegrate"
      ],
      blindspot: "Diversify supplier redundancy early so single points of failure cannot hostage your launch.",
      takeaway: "Plans are fragile; your ability to adapt under pressure is the only true asset that survives disruption."
    }
  },

  "challenge-resource-constraint": {
    id: "challenge-resource-constraint",
    title: "The Resource Constraint",
    category: "Economic Principles",
    difficulty: "Foundational",
    timeLimit: "30 mins",
    evaluates: "Resourcefulness, Organic distribution, Value proposition",
    briefing: "Design and launch a high-impact educational movement in your community with zero advertising budget, 1 volunteer, and a simple WhatsApp community.",
    connectedCourseId: "economic-principles",
    connectedCourseTitle: "Economic Principles: Money, Choice, Value & Opportunity",
    coursePitch: "Learn how to build immense commercial value and distribution from absolute zero through constraint-based innovation.",
    stages: [
      {
        stageNumber: "01",
        stageTitle: "STAGE 1: GENERATING TRACTION FROM ZERO",
        situation: "You have no money for paid flyers, ads, or influencers. You have 7 days to get your first 50 committed participants.",
        prompt: "What is your primary distribution mechanism?",
        timeEstimate: "3 mins",
        choices: [
          {
            id: "res-daily-value",
            label: "THE DAILY SOLVED PROBLEM (ORGANIC PULL)",
            description: "Post one razor-sharp breakdown every morning at 7 AM that directly solves a painful, practical problem for youth in your area.",
            action: "You generated magnetic organic pull through demonstrated competence.",
            whatYouGained: "High-conviction members who share the group organically with peers.",
            whatYouSacrificed: "The illusion of overnight viral growth.",
            opportunityCostInsight: "Value creates its own gravitational pull. When something is genuinely useful, distribution solves itself."
          },
          {
            id: "res-spam-links",
            label: "BROADCAST LINKS ACROSS 50 GROUPS",
            description: "Post promotional invite links across every group and forum you belong to.",
            action: "You used mass spray-and-pray promotional tactics.",
            whatYouGained: "100 random clicks.",
            whatYouSacrificed: "Group quality: 90% of arrivals are silent lurkers or spammers.",
            opportunityCostInsight: "Broadcasting noise creates low-conviction audiences. Scarcity and relevance attract quality."
          }
        ]
      },
      {
        stageNumber: "02",
        stageTitle: "STAGE 2: SPARKING INTRINSIC OWNERSHIP",
        situation: "You reach 60 members, but initial excitement begins to fade. People are reading messages passively without active engagement.",
        prompt: "How do you transform passive observers into active co-builders?",
        timeEstimate: "2 mins",
        choices: [
          {
            id: "res-dilemma-debates",
            label: "POSE FORCED-CHOICE DILEMMAS",
            description: "Stop lecturing. Drop a real-world dilemma: 'You have ₦50,000: Option A vs Option B. You can only pick one. Defend your choice.'",
            action: "You shifted from broadcast consumption to cognitive participation.",
            whatYouGained: "Explosive group debate, 80+ replies in 2 hours, and deep member ownership.",
            whatYouSacrificed: "The ego-need to be the sole lecturer in the room.",
            opportunityCostInsight: "People defend what they help create. Provoking active thinking builds enduring movements."
          },
          {
            id: "res-giveaways",
            label: "PROMISE FREE AIRTIME / CASH GIVEAWAYS",
            description: "Offer free data and cash rewards for members who comment and share.",
            action: "You subsidized engagement with artificial incentives.",
            whatYouGained: "Spike in comments for 24 hours.",
            whatYouSacrificed: "Culture: as soon as the giveaways stop, the silence returns stronger than before.",
            opportunityCostInsight: "Incentives that substitute for real value always create fragile dependency."
          }
        ]
      }
    ],
    cognitiveDiagnosis: {
      archetype: "THE RESOURCEFUL BUILDER",
      strengths: [
        "Understands that constraints fuel creative ingenuity",
        "Prefers organic pull over artificial vanity metrics",
        "Transforms passive observers into passionate co-creators"
      ],
      blindspot: "Once organic traction is proven, don't fear deploying capital to accelerate scale.",
      takeaway: "Lack of resources is never the real limitation; lack of resourcefulness is the only true bottleneck."
    }
  }
};

export function getChallengeSimulation(id: string): ChallengeSimulation {
  return challengeSimulations[id] || challengeSimulations["challenge-100k"];
}
