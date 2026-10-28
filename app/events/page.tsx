"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Video, 
  Star, 
  ArrowRight, 
  Zap, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  Heart, 
  Award, 
  ShieldCheck, 
  Lock, 
  Brain, 
  Shield, 
  Compass, 
  Layers, 
  FileText, 
  MessageCircle, 
  CheckCircle2, 
  Check, 
  ChevronDown,
  ArrowDown,
  Package,
  Users2,
  ArrowUpRight,
  Globe2
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import FitForProfitVolunteerModal from "../components/FitForProfitVolunteerModal";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassBackground } from "../components/3d";
import { useEventRegistrations } from "../hooks/useEventRegistrations";
import LiveRegistrationTicker from "../components/events/LiveRegistrationTicker";
import EventRegistrationModal from "../components/events/EventRegistrationModal";
import { getUpcomingCohortDate } from "../utils/event-dates";

const FILTERS = [
  { id: "all", name: "All Cohorts & Programs" },
  { id: "accelerator", name: "01. Jumpstart (Primary)" },
  { id: "masterclass", name: "02. POI Masterclass" },
  { id: "teamwork", name: "03. Success Multiplier" },
  { id: "workshop", name: "04. Fit-For-Profit" },
];

const EVENTS = [
  {
    id: 7,
    hierarchyIndex: "01",
    roleBadge: "PRIMARY ENTRY-POINT TRANSFORMATION",
    badgeType: "Flagship Foundation",
    title: "JUMPSTART: 2-Day Live Intensive Accelerator",
    hook: "WAKE UP. SHAKE UP. From Meager to Mega. Make the shift.",
    subtitle: "The Foundation: Breaking Survival Defaults & Migrating into Sustainable Succession",
    type: "accelerator",
    format: "Virtual & Onsite (Global & Physical Access)",
    date: "Saturday & Sunday (Upcoming Weekend Cohort)",
    time: "GoogleMeet Live & Onsite Hubs @ 5:00 PM WAT (2-Day Intensive + 21-Day Sprint)",
    price: 25.00,
    priceNGN: "₦35,000",
    standardPriceNGN: "₦95,000",
    icon: Award,
    gradient: "from-[#1C3B34] to-[#8A948B]",
    imageUrl: "/images/covers/jumpstart_cover_v2.jpg",
    instructor: "Zeki Ubor",
    isOnline: true,
    hasOnsite: true,
    virtualLocation: "GoogleMeet Interactive HD Live Stream (Join from Anywhere Worldwide)",
    onsiteLocation: "Regional Partner Hubs & Executive Suites (Abuja & Lagos)",
    spots: 24,
    totalSpots: 80,
    rating: 4.9,
    reviews: 184,
    whatItIs: "An intensive 2-Day Live Interactive Accelerator (Virtual worldwide + Onsite regional hubs) followed by a 21-Day Daily Cognitive Transformation Sprint. Engineered as Origin's primary entry-point to permanently dismantle scarcity programming and anchor high-leverage execution habits.",
    whoItIsFor: "Individuals, professionals, and creators worldwide operating under cognitive fog, burnout, lack of clarity, or restrictive environments who are ready to make the definitive leap into sovereign personal authority.",
    whatChanges: "You transition from passive reaction to sovereign control—rewiring your perception to identify commercial leverage, commanding your daily focus, and establishing impenetrable personal boundaries.",
    whatYouGain: [
      { title: "Cognitive Scarcity Deconstruction", desc: "Dismantle default survival programming and fear-based decision habits." },
      { title: "High-Leverage Perception Rewiring", desc: "Train your cognitive lens to spot commercial leverage where others only see lack." },
      { title: "Impenetrable Focus Boundaries", desc: "Erect absolute focus perimeters around your time, attention, and creative output." },
      { title: "21-Day Daily Habit Anchoring", desc: "Lock in core spectrum habits through active daily cohort accountability with Zeki Ubor." }
    ],
    buttonText: "SECURE YOUR ₦35,000 TICKET (VIRTUAL / ONSITE) →"
  },
  {
    id: 12,
    hierarchyIndex: "02",
    roleBadge: "SPECIALIZED NEXT-STEP MASTERCLASS",
    badgeType: "Strategic Positioning",
    title: "MASTERCLASS: Becoming a Person of Interest (POI)",
    hook: "Stop Blending In. Start Architecting Your Influence.",
    subtitle: "The Next Step: Moving from Overlooked Generalist to High-Trust Sovereign Authority",
    type: "masterclass",
    format: "Virtual & Onsite (Global & Physical Access)",
    get date() { return getUpcomingCohortDate(12); },
    time: "GoogleMeet LIVE & Studio Broadcast (5:00 PM – 8:00 PM WAT | 3-Hour Intensive)",
    price: 22.00,
    priceNGN: "₦30,000",
    standardPriceNGN: "₦75,000",
    icon: Zap,
    gradient: "from-[#1C3B34] to-[#8A948B]",
    imageUrl: "/images/covers/masterclass_poi_v2.jpg",
    instructor: "Zeki Ubor",
    isOnline: true,
    hasOnsite: true,
    virtualLocation: "GoogleMeet HD Interactive Stream (Join from Anywhere Globally)",
    onsiteLocation: "Executive Studio Audience Gallery (Abuja & Lagos Studios)",
    spots: 24,
    totalSpots: 80,
    rating: 4.9,
    reviews: 340,
    whatItIs: "A specialized 3-Hour Masterclass on Human Architecture and high-status positioning available via Global Virtual Live Stream and Onsite Studio Gallery. Designed as a dedicated next-step masterclass for those looking to build undeniable market gravity and commanding authority.",
    whoItIsFor: "Mid-to-senior professionals, specialized consultants, architects, engineers, and founders who possess valuable technical skill but remain invisible, underpriced, or overlooked in high-stakes environments.",
    whatChanges: "You stop competing on low price or chasing attention—mastering the psychology of perceived value, engineering category authority, and negotiating high-trust commercial agreements.",
    whatYouGain: [
      { title: "Human Intent & Status Calibration", desc: "Deconstruct the hidden psychological levers that dictate perceived authority and premium respect." },
      { title: "Personal Category Dominance", desc: "Carve out an untouchable niche by engineering a distinct intellectual signature." },
      { title: "Magnetic Reputation Broadcasting", desc: "Package your skills to organically attract high-value clients and global opportunities." },
      { title: "Covenant & Negotiation Governance", desc: "Master sovereign negotiation frameworks to dictate commercial terms with calm authority." }
    ],
    buttonText: "REGISTER FOR POI MASTERCLASS (₦30,000) →"
  },
  {
    id: 22,
    hierarchyIndex: "03",
    roleBadge: "COLLABORATIVE LEADERSHIP & EXECUTION",
    badgeType: "Leadership Architecture",
    title: "SUCCESS MULTIPLIER: How to Elevate Every Team You Step Into",
    hook: "When you win alone, it's skill. When everyone wins because you're in the room, it's mastery.",
    subtitle: "The Collaborative Engine: Communication, Trust, Accountability, and High-Performance Teamwork",
    type: "teamwork",
    format: "Virtual & Onsite (Global & Physical Access)",
    get date() { return getUpcomingCohortDate(22); },
    time: "GoogleMeet HD Interactive Stream & Breakout Studios (10:00 AM – 3:00 PM WAT | 5-Hour Intensive)",
    price: 18.00,
    priceNGN: "₦25,000",
    standardPriceNGN: "₦60,000",
    icon: Users,
    gradient: "from-[#1C3B34] to-[#8A948B]",
    imageUrl: "/images/covers/course_communication.jpg",
    instructor: "Zeki Ubor & The Becoming Institute",
    isOnline: true,
    hasOnsite: true,
    virtualLocation: "GoogleMeet Interactive HD Live Stream + Digital Breakout Simulator",
    onsiteLocation: "Executive Studio Audience Gallery (Abuja & Lagos Studios)",
    spots: 24,
    totalSpots: 80,
    rating: 4.9,
    reviews: 168,
    whatItIs: "An intensive 5-Hour Live Masterclass & Simulation on Collaborative Leadership, high-trust execution, and psychological safety. Built for professionals, founders, and students to master communication, proactive accountability, constructive conflict, and mutual trust.",
    whoItIsFor: "Founders, team leads, professionals, and students who work in multidisciplinary groups, navigate organizational friction, or want to become the indispensable collaborator every team and high-ticket organization relies on.",
    whatChanges: "You stop operating as an isolated silo or passive contributor—mastering proactive communication, psychological safety, the SBI feedback model, and high-trust accountability.",
    whatYouGain: [
      { title: "Psychological Safety & High-Trust Culture", desc: "Build environments where team members take initiative, communicate candidly, and solve complex problems without fear." },
      { title: "The Trust Equation & Proactive Updates", desc: "Master Charles Green's trust equation (credibility, reliability, intimacy) and update stakeholders proactively before asked." },
      { title: "Constructive Conflict & Lencioni's Antidotes", desc: "Dismantle fear of conflict and lack of commitment to drive healthy debates focused on ideas rather than egos." },
      { title: "SBI Feedback & Strengths Amplification", desc: "Deliver actionable feedback that elevates team performance and intentionally amplify others' strengths." }
    ],
    buttonText: "REGISTER FOR SUCCESS MULTIPLIER (₦25,000) →"
  },
  {
    id: 16,
    hierarchyIndex: "04",
    roleBadge: "PRACTICAL REGIONAL WORKSHOP",
    badgeType: "Commercial Execution",
    title: "FIT-FOR-PROFIT: Commercial Capacity Workshop",
    hook: "Prepare for profit in your career, work, ministry, and significance.",
    subtitle: "The Commercial Engine: Structuring Vocational Gifts for Sustainable Enterprise & Cash-Flow",
    type: "workshop",
    format: "Virtual & Onsite (Global & Physical Access)",
    date: "Monthly Regional Sessions (Multi-State & Virtual Stream)",
    time: "Full-Day Workshop Intensive (9:00 AM – 5:00 PM WAT)",
    price: 15.00,
    priceNGN: "₦20,000",
    standardPriceNGN: "₦48,000",
    icon: Award,
    gradient: "from-[#1C3B34] to-[#8A948B]",
    imageUrl: "/images/covers/fit_for_profit_v2.jpg",
    instructor: "Zeki Ubor & The Becoming Institute",
    isOnline: true,
    hasOnsite: true,
    virtualLocation: "Global Live Interactive Workshop Stream (Worldwide Access)",
    onsiteLocation: "Multi-State Physical Centers (Lagos, Abuja, Uyo, Port Harcourt)",
    spots: 24,
    totalSpots: 80,
    rating: 4.9,
    reviews: 215,
    whatItIs: "A dedicated regional workshop focused on commercial problem-solving, sales psychology, and vocational monetisation. Staged with dual-mode access: attend Onsite at our multi-state regional centers or join the Global Interactive Virtual Stream from any location.",
    whoItIsFor: "Entrepreneurs, intrapreneurs, career professionals, and ministry leaders who need to audit their commercial models, eliminate business friction, and ethically command profitable returns on their labor.",
    whatChanges: "You bridge the gap between passion and profitability—learning repeatable sales conversion frameworks, capital cultivation protocols, and scalable operational models.",
    whatYouGain: [
      { title: "Commercial & Career Capacity Audit", desc: "Position your professional assets for elite market demand, eliminate structural flaws, and command premium scale." },
      { title: "Purpose, Ministry & Significance Alignment", desc: "Align your unique calling with highly impactful, sustainable execution structures that create lasting commercial and spiritual value." },
      { title: "Vocational Monetisation & Cash-Flow Architecture", desc: "Bridge the gap between passion and profitability with proven capital cultivation and compounding economic principles." },
      { title: "8 Q&A to Selling High-Conversion Mastery", desc: "Master high-integrity commercial sales psychology, objection neutralization, and confident commercial closing." }
    ],
    buttonText: "REGISTER FOR FIT-FOR-PROFIT (₦20,000) →"
  }
];

const EVENT_PILLARS_MAP: Record<number, { title: string; subtitle: string; pillars: Array<{ num: string; role: string; name: string; desc: string; icon: any; shift: string }> }> = {
  7: {
    title: "The 6 Spectrum Units of Transformation",
    subtitle: "Your fundamental framework for the 2-day accelerator and subsequent 21-day daily prompts.",
    pillars: [
      {
        num: "01",
        role: "THE LENS OF REALITY",
        name: "Perception",
        desc: "Rewire your default baseline to identify leverage and high-value opportunities where others see obstacles and lack.",
        icon: Brain,
        shift: "From reacting to constraints → To detecting invisible commercial leverage."
      },
      {
        num: "02",
        role: "THE ENGINE OF IMPACT",
        name: "Usefulness",
        desc: "Transform raw gifts into deployed, high-impact market utility that the commercial marketplace cannot ignore.",
        icon: Zap,
        shift: "From hidden latent potential → To highly deployed, monetized utility."
      },
      {
        num: "03",
        role: "THE ARCHITECTURE OF PRESERVATION",
        name: "Boundaries",
        desc: "Erect impenetrable psychological and environmental perimeters to protect cognitive focus and energy.",
        icon: Shield,
        shift: "From porous availability → To impenetrable focus perimeters."
      },
      {
        num: "04",
        role: "THE MASTERY OF AGREEMENT",
        name: "Consent",
        desc: "Achieve absolute ownership of your commitments, eliminating misaligned covenants and energy drains.",
        icon: Compass,
        shift: "From people-pleasing defaults → To deliberate, sovereign agreement."
      },
      {
        num: "05",
        role: "THE CURRENCY OF SIGNIFICANCE",
        name: "Value",
        desc: "Align your personal standards and output to command premium commercial positioning and high-yield returns.",
        icon: Award,
        shift: "From competing at the bottom → To commanding premium market valuation."
      },
      {
        num: "06",
        role: "THE ULTIMATE GOVERNANCE",
        name: "Self-Mastery",
        desc: "Master your internal emotional and mental state to dictate the terms of your external reality.",
        icon: Target,
        shift: "From chaotic reaction → To sovereign, deliberate self-governance."
      }
    ]
  },
  12: {
    title: "The 4 Pillars of High-Status Positioning",
    subtitle: "Engineering personal authority, perceptual status, and undeniable gravity.",
    pillars: [
      {
        num: "01",
        role: "STATUS ARCHITECTURE",
        name: "Human Intent Calibration",
        desc: "Audit the hidden psychological signals that dictate perceived status, authority, and professional valuation.",
        icon: Brain,
        shift: "From seeking approval → To establishing psychological gravity."
      },
      {
        num: "02",
        role: "REPUTATION INFRASTRUCTURE",
        name: "The Human Broadcast",
        desc: "Engineer how your identity, energy, and specialized expertise are communicated across high-stakes environments.",
        icon: Compass,
        shift: "From passive presence → To commanding, magnetic influence."
      },
      {
        num: "03",
        role: "STRATEGIC POSITIONING",
        name: "Category Dominance",
        desc: "Carve out an untouchable niche by engineering a distinct personal category and clear intellectual signature.",
        icon: Target,
        shift: "From blending in with generalists → To standing out as a recognized Person of Interest."
      },
      {
        num: "04",
        role: "AGREEMENT GOVERNANCE",
        name: "Covenant Architecture",
        desc: "Master high-stakes negotiations, agreement boundaries, and high-yield strategic partnerships.",
        icon: Shield,
        shift: "From reactive concessions → To governing terms with calm sovereignty."
      }
    ]
  },
  16: {
    title: "The 4 Foundations of Fit-For-Profit Enterprise",
    subtitle: "Multi-dimensional economic frameworks designed to build profitable vocations and sustainable community outreach.",
    pillars: [
      {
        num: "01",
        role: "ECONOMIC LAWS",
        name: "Money Farming",
        desc: "Foundational economic laws governing seed, soil, capital cultivation, and sustainable wealth multiplication.",
        icon: Zap,
        shift: "From hand-to-mouth survival → To cultivated enterprise and compounding harvest."
      },
      {
        num: "02",
        role: "COMMERCIAL ALIGNMENT",
        name: "Vocational Profitability",
        desc: "Align your professional gifts and ministry for sustainable commercial return without ethical compromise.",
        icon: Award,
        shift: "From uncompensated labor → To ethically monetized excellence."
      },
      {
        num: "03",
        role: "SALES MASTERY",
        name: "High-Value Conversion",
        desc: "Master high-integrity sales psychology, value articulation, and objection neutralization.",
        icon: Target,
        shift: "From fear of selling → To serving with high-conversion commercial conviction."
      },
      {
        num: "04",
        role: "COMMUNITY ENGAGEMENT",
        name: "Regional Impact Hub",
        desc: "Establish localized founder alliances, regional alumni hubs, and state-level business ecosystems.",
        icon: Heart,
        shift: "From isolated business operations → To connected regional commercial networks."
      }
    ]
  },
  22: {
    title: "The 4 Pillars of Leadership Architecture & High-Trust Teams",
    subtitle: "Practical frameworks to transform group friction into cohesive, high-velocity collective momentum.",
    pillars: [
      {
        num: "01",
        role: "CULTURE FOUNDATION",
        name: "Psychological Safety",
        desc: "Foster environments where members speak up, challenge ideas constructively, and share vulnerability without penalty.",
        icon: Brain,
        shift: "From artificial harmony & fear → To productive vulnerability and innovation."
      },
      {
        num: "02",
        role: "TRUST ARCHITECTURE",
        name: "The Trust Equation",
        desc: "Anchor credibility, reliability, and low self-orientation to build unshakeable peer confidence across all seasons.",
        icon: Shield,
        shift: "From defensive self-preservation → To radical reliability and high-trust stewardship."
      },
      {
        num: "03",
        role: "FRICTION CONVERSION",
        name: "Constructive Conflict",
        desc: "Navigate disagreement with emotional composure, separating the human from the idea to reach optimal decisions.",
        icon: Target,
        shift: "From passive conflict avoidance → To safe, rigorous debate that sharpens results."
      },
      {
        num: "04",
        role: "FEEDBACK PROTOCOL",
        name: "SBI Feedback Mastery",
        desc: "Deliver Situation-Behaviour-Impact feedback within 24 hours to accelerate collective growth and accountability.",
        icon: MessageSquare,
        shift: "From vague criticism or resentment → To actionable, clear behavioral upgrade."
      }
    ]
  }
};

const EVENT_AGENDAS_MAP: Record<number, Array<{ tag: string; title: string; desc: string; focus: string }>> = {
  7: [
    {
      tag: "DAY 1 · SATURDAY @ 5:00 PM WAT",
      title: "Wake Up. Shake Up. From Meager to Mega — Make the Shift",
      desc: "Deep-dive into Units 1 & 2 (Perception & Usefulness). Dismantling default programming of lack and fear, re-engineering your cognitive lens to spot leverage, and converting raw potential into high-impact market utility.",
      focus: "✦ Focus: Scarcity Deconstruction & Making the Shift"
    },
    {
      tag: "DAY 2 · SUNDAY @ 5:00 PM WAT",
      title: "The Architecture of Execution",
      desc: "Mastering Units 3, 4, 5 & 6 (Boundaries, Consent, Value & Self-Mastery). Erecting impenetrable focus perimeters, mastering high-leverage agreements, commanding premium worth, and achieving emotional governance.",
      focus: "✦ Focus: Perimeter Architecture & Command Authority"
    }
  ],
  12: [
    {
      tag: "SESSION 1 · 5:00 PM – 6:15 PM WAT",
      title: "The Human Architecture of Intent & Perceived Value",
      desc: "Deconstructing the hidden psychological mechanics of perceived authority, personal gravity, and why high-value positioning dictates market respect.",
      focus: "✦ Focus: Cognitive Calibration & Social Gravity"
    },
    {
      tag: "SESSION 2 · 6:30 PM – 8:00 PM WAT",
      title: "The Influence Matrix & Live Positioning Audits",
      desc: "Real-time positioning breakdowns, high-stakes agreement architectures, and converting specialized knowledge into an undeniable commercial brand.",
      focus: "✦ Focus: Value Articulation & High-Trust Influence"
    }
  ],
  22: [
    {
      tag: "MORNING SESSION · 10:00 AM – 12:30 PM WAT",
      title: "The Mechanics of Team Excellence & Psychological Safety",
      desc: "Deconstructing Amy Edmondson's psychological safety research, Charles Green's Trust Equation, and auditing your team's current trust baseline.",
      focus: "✦ Focus: Psychological Safety & Trust Architecture"
    },
    {
      tag: "AFTERNOON SESSION · 1:00 PM – 3:00 PM WAT",
      title: "Constructive Conflict, SBI Feedback & Live Team Simulation",
      desc: "Live simulated peer friction exercises, mastering Lencioni's 5 dysfunctions, and practicing the SBI (Situation-Behaviour-Impact) feedback model in pairs.",
      focus: "✦ Focus: Constructive Conflict & Collective Momentum"
    }
  ],
  16: [
    {
      tag: "MORNING SESSION · 9:00 AM – 1:00 PM",
      title: "The Economics of Vocation & Commercial Capacity Audit",
      desc: "Auditing commercial models, pricing strategies, and aligning vocational gifts for sustainable cash-flow without ethical compromise.",
      focus: "✦ Focus: Commercial Scalability & Cash-Flow Architecture"
    },
    {
      tag: "AFTERNOON SESSION · 2:00 PM – 5:00 PM",
      title: "Sales Psychology, Objection Neutralization & Regional Roundtables",
      desc: "Tactical training on high-integrity sales conversion, objection handling, and regional founder network integration.",
      focus: "✦ Focus: Sales Mastery & Regional Founder Alliances"
    }
  ]
};

const EVENT_DELIVERABLES_MAP: Record<number, Array<{
  title: string;
  format: string;
  type: string;
  desc: string;
  image: string;
  pdfUrl: string;
}>> = {
  7: [
    {
      title: "The Human Broadcast: Environment Matrix",
      format: "PDF Framework",
      type: "Diagnostic Blueprint",
      desc: "Comprehensive diagnostic framework for mastering external environments, inputs, and information flows.",
      image: "/cover_environment_matrix.png",
      pdfUrl: "/documents/The_Human_Broadcast_Environment_Matrix.pdf"
    },
    {
      title: "Architecture of Intention Blueprint",
      format: "PDF Blueprint",
      type: "Strategic Execution Guide",
      desc: "Step-by-step master plan to organize daily cognitive focus, high-leverage priorities, and sovereign output.",
      image: "/cover_intention_blueprint.png",
      pdfUrl: "/documents/architecture_of_intention.pdf"
    },
    {
      title: "Habit Building Guide",
      format: "10-Page PDF Guide",
      type: "Tactical Workbook",
      desc: "Concrete blueprints to anchor the 6 spectrum units into irreversible daily cognitive rituals.",
      image: "/images/covers/course_adaptability.jpg",
      pdfUrl: "/documents/habit-building-guide.pdf"
    },
    {
      title: "21-Day Private WhatsApp Cohort",
      format: "Daily Sprint & Audio Notes",
      type: "Cohort Accountability",
      desc: "Direct daily prompts, active peer audits, voice note breakdowns, and live accountability check-ins with Zeki Ubor.",
      image: "/whatsapp-banner.jpg",
      pdfUrl: ""
    }
  ],
  12: [
    {
      title: "Architecture of Human Intent Framework",
      format: "PDF Framework",
      type: "Psychological Architecture",
      desc: "Deep-dive framework on human motivations, perceived value metrics, and social positioning levers.",
      image: "/cover_human_intent.png",
      pdfUrl: "/documents/Architecture_of_Human_Intent_Framework.pdf"
    },
    {
      title: "Influence Psychology & Positioning Blueprint",
      format: "PDF Guide",
      type: "Authority Psychology Protocol",
      desc: "Tactical framework on behavioral psychology, establishing category authority, and negotiating sovereign terms.",
      image: "/masterclass_poi_cover.png",
      pdfUrl: "/documents/influence-psychology.pdf"
    },
    {
      title: "Decision Making Architecture Matrix",
      format: "Strategic Matrix PDF",
      type: "Cognitive Framework",
      desc: "Mental models for high-stakes decision-making, negotiations, and agreement governance.",
      image: "/images/covers/course_decision_making.jpg",
      pdfUrl: "/documents/course-decision-making-workbook.pdf"
    },
    {
      title: "Live Case Audits & Interactive Q&A",
      format: "Live Cohort Access",
      type: "Interactive Masterclass Session",
      desc: "Real-time personal positioning breakdowns and strategic audit with Zeki Ubor during the live masterclass.",
      image: "/images/community/yoruba_mastermind.jpg",
      pdfUrl: ""
    }
  ],
  22: [
    {
      title: "Success Multiplier — Official Workshop Workbook (PDF)",
      format: "Official Workbook (PDF)",
      type: "Core Framework",
      desc: "The complete 8-framework reflection manual with practice exercises, reflection tools, and 30-day team excellence drills.",
      image: "/images/covers/course_communication.jpg",
      pdfUrl: "/documents/course-team-person-workbook.pdf"
    },
    {
      title: "The Team Trust & Psychological Safety Matrix",
      format: "Audit Matrix (PDF)",
      type: "Diagnostic Tool",
      desc: "A diagnostic self-assessment to score psychological safety, team trust levels, and identify hidden dysfunction bottlenecks.",
      image: "/cover_environment_matrix.png",
      pdfUrl: ""
    },
    {
      title: "SBI Feedback & Conflict Resolution Drill Sheet",
      format: "Practice Sheet (PDF)",
      type: "Execution Tool",
      desc: "Field-tested scripts and step-by-step templates for delivering difficult feedback and managing high-stakes team discussions.",
      image: "/cover_intention_blueprint.png",
      pdfUrl: ""
    },
    {
      title: "Live Team Simulation & Facilitator Review",
      format: "Live Simulation Access",
      type: "Interactive Cohort Session",
      desc: "Engage in live breakout team challenges with direct facilitator feedback and peer debriefs.",
      image: "/images/community/yoruba_mastermind.jpg",
      pdfUrl: ""
    }
  ],
  16: [
    {
      title: "FP Commercial Capacity Audit Sheet",
      format: "Live Workshop Worksheet (PDF)",
      type: "Execution Blueprint",
      desc: "A structured, fillable audit tool to score your current commercial positioning, identify your biggest revenue leaks, and map your priority action steps — used live during the workshop.",
      image: "/images/covers/fit_for_profit_v2.jpg",
      pdfUrl: ""
    },
    {
      title: "Vocation-to-Profit Alignment Grid",
      format: "Workshop Action Grid (PDF)",
      type: "Commercial Alignment Tool",
      desc: "A practical grid for mapping your vocational gifts against market demand, pricing anchors, and sales confidence — completed live with facilitator guidance during the session.",
      image: "/8-qa-to-selling.png",
      pdfUrl: ""
    },
    {
      title: "Sales Objection Neutralization Practice Sheet",
      format: "Live Practice Worksheet (PDF)",
      type: "Sales Mastery Tool",
      desc: "A live drill sheet to practice objection reframes, value articulation scripts, and high-integrity commercial responses — practised in pairs during the afternoon session.",
      image: "/cover_money_farming_v3.png",
      pdfUrl: ""
    },
    {
      title: "Fit For Profit Impact Corps Field Brief",
      format: "Service Brief (PDF)",
      type: "Social Impact Framework",
      desc: "A one-page community outreach brief for Impact Corps members, outlining their role, regional targets, and mobilisation steps for the current quarter.",
      image: "/fip_wall_mockup.jpg",
      pdfUrl: ""
    }
  ]
};

export default function EventsPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedEventId, setSelectedEventId] = useState<number>(7); // Default to JUMPSTART (Primary Event)
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Real-time Event Intake & Registration State Engine
  const { allStats, stats, latestRegistration } = useEventRegistrations(selectedEventId);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const eventParam = params.get("event");
      const filterParam = params.get("filter");
      if (eventParam) {
        const parsedId = parseInt(eventParam, 10);
        if (!isNaN(parsedId) && EVENTS.some(e => e.id === parsedId)) {
          setSelectedEventId(parsedId);
          const ev = EVENTS.find(e => e.id === parsedId);
          if (ev) setActiveFilter(ev.type);
        } else if (eventParam.toLowerCase().includes("team") || eventParam.toLowerCase().includes("multiplier") || eventParam === "22") {
          setSelectedEventId(22);
          setActiveFilter("teamwork");
        }
      } else if (filterParam) {
        setActiveFilter(filterParam);
        const match = EVENTS.find(e => e.type === filterParam);
        if (match) setSelectedEventId(match.id);
      }
    }
  }, []);

  const filteredEvents = activeFilter === "all" 
    ? EVENTS 
    : EVENTS.filter(e => e.type === activeFilter);

  const selectedEvent = EVENTS.find(e => e.id === selectedEventId) || filteredEvents[0] || EVENTS[0];

  // Real-time dynamic showcase metrics (persisted + live real-time intake sync)
  const parseNaira = (value?: string) => (value ? Number(value.replace(/[^0-9]/g, "")) || 0 : 0);
  const showcaseTotalSeats = stats.totalSpots;
  const showcaseSeatsTaken = stats.seatsTaken;
  const showcaseSpotsRemaining = stats.spotsRemaining;
  const showcaseFillPct = stats.fillPercentage;
  const showcaseEarlyNGN = parseNaira(selectedEvent.priceNGN);
  const showcaseStandardNGN = parseNaira(selectedEvent.standardPriceNGN || "₦95,000");
  const showcaseSavingsPct = showcaseStandardNGN > showcaseEarlyNGN && showcaseEarlyNGN > 0
    ? Math.round(((showcaseStandardNGN - showcaseEarlyNGN) / showcaseStandardNGN) * 100)
    : 0;

  const handleRegisterEvent = (event: typeof EVENTS[0]) => {
    setIsRegistrationModalOpen(true);
  };

  return (
    <div 
      suppressHydrationWarning
      className="min-h-screen bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white font-sans selection:bg-white selection:text-[#8A948B] pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 30, 0],
            y: [0, -25, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-emerald-200/20 blur-[130px] sm:blur-[200px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.45, 0.2],
            x: [0, -35, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[300px] sm:w-[580px] h-[300px] sm:h-[580px] bg-amber-100/20 blur-[110px] sm:blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:28px_28px] sm:bg-[size:36px_36px] opacity-70" />
        <LiquidGlassBackground intensity="subtle" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
        
        {/* Modern Editorial Hero Header */}
        <div className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto px-2">
          {/* Status Badge with Live Beacon */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/15 border border-white/30 text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider shadow-lg backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
            </span>
            <Compass className="w-3.5 h-3.5 text-[#C8D4C8] shrink-0" />
            <span>THE BECOMING INSTITUTE · LIVE INTENSIVES &amp; COGNITIVE ARENA</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-400/30 text-[9px]">ACTIVE INTAKE</span>
          </motion.div>

          {/* Majestic Editorial Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.12] sm:leading-[1.06] font-normal"
          >
            Dismantle Scarcity Defaults.
            <span className="block font-serif italic text-amber-200 drop-shadow-sm mt-1 sm:mt-2">
              Step Into Sovereign Succession.
            </span>
          </motion.h1>

          {/* High-Conviction Manifesto Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-base lg:text-lg text-white/90 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Engineered 2-day live accelerators, high-trust authority masterclasses, and daily execution sprints led by Zeki Ubor. Designed to rewire your perceptual lens, command commercial leverage, and establish impenetrable personal boundaries.
          </motion.p>

          {/* Live Proof & Credibility Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-mono text-white/90 pt-1"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>4.9/5 Rating across 700+ Global Alumni</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Globe2 className="w-3.5 h-3.5 text-blue-300" />
              <span>Virtual Live HD Stream + Regional Partner Suites</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Compass className="w-3.5 h-3.5 text-emerald-300" />
              <span>Includes 21-Day Daily Cognitive Sprint</span>
            </span>
          </motion.div>
        </div>

        {/* Segmented Program Switcher (animated pill) */}
        <div className="flex justify-start sm:justify-center overflow-x-auto scrollbar-none -mx-1 px-1 pb-1">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)]">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  id={`events-filter-${filter.id}`}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    const firstInCat = EVENTS.find(e => filter.id === "all" || e.type === filter.id);
                    if (firstInCat) setSelectedEventId(firstInCat.id);
                  }}
                  className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide whitespace-nowrap transition-colors cursor-pointer ${
                    isActive ? "text-[#13261F]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="events-filter-pill"
                      className="absolute inset-0 rounded-full bg-[#F5F8F3] shadow-md"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{filter.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SIGNATURE SHOWCASE — compact poster + facts (left) · story, pricing & CTA (right) */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative bg-[#F5F8F3] text-[#172217] rounded-[1.75rem] sm:rounded-[2.5rem] border border-white/80 shadow-[0_40px_100px_-30px_rgba(15,30,22,0.5)] p-4 sm:p-7 lg:p-10 space-y-10 sm:space-y-14 overflow-hidden"
          >
            <div className="grid grid-cols-1 [grid-template-areas:'poster'_'main'_'facts'] lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:[grid-template-areas:'poster_main'_'facts_main'] gap-x-10 xl:gap-x-12 gap-y-6 sm:gap-y-8 lg:gap-y-4 items-start">

              {/* LEFT (top): Compact square cover */}
              <div className="[grid-area:poster]">
                {/* Cover — standard 1:1, capped width so it never dominates */}
                <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none aspect-square rounded-3xl overflow-hidden bg-[#121316] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/5 group">
                  <Image
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 340px"
                    priority
                    className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold text-[#13261F] shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {showcaseSpotsRemaining} spots left
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-white text-[11px] font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      {selectedEvent.rating} · {selectedEvent.reviews} reviews
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10px]">
                      Virtual + Onsite
                    </span>
                  </div>
                </div>
              </div>

              {/* LEFT (bottom): Event facts, seats & inclusions */}
              <aside className="[grid-area:facts] space-y-4">
                {/* Event Facts — clean list */}
                <div className="rounded-2xl bg-white border border-[#E1E7DC] divide-y divide-[#EEF2EA] shadow-sm overflow-hidden">
                  {[
                    { icon: Calendar, label: "Date", value: selectedEvent.date, tint: "text-[#1C3B34] bg-[#EAF0E6]" },
                    { icon: Clock, label: "Time", value: selectedEvent.time, tint: "text-[#1C3B34] bg-[#EAF0E6]" },
                    { icon: Video, label: "Online", value: selectedEvent.virtualLocation, tint: "text-blue-700 bg-blue-50" },
                    { icon: MapPin, label: "Onsite", value: selectedEvent.onsiteLocation, tint: "text-emerald-700 bg-emerald-50" },
                  ].map((fact) => {
                    const FactIcon = fact.icon;
                    return (
                      <div key={fact.label} className="flex items-start gap-3 p-3.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${fact.tint}`}>
                          <FactIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-[#6A7B6D] font-semibold block">{fact.label}</span>
                          <span className="text-xs sm:text-[13px] text-[#172217] font-medium leading-snug block">{fact.value}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex items-center gap-3 p-3.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1C3B34] to-[#3E6B5C] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {selectedEvent.instructor.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#6A7B6D] font-semibold block">Hosted by</span>
                      <span className="text-[13px] text-[#172217] font-semibold block">{selectedEvent.instructor}</span>
                    </div>
                  </div>
                </div>

                {/* Seat Fill Progress with Real-Time Pulse */}
                <div className="rounded-2xl bg-white border border-[#E1E7DC] p-4 space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#172217] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#1C3B34]" />
                      <span>Seats filling fast</span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        LIVE
                      </span>
                    </span>
                    <span className="text-[#1C3B34] font-mono font-bold text-[13px]">
                      {showcaseSeatsTaken}/{showcaseTotalSeats} taken
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[#E6ECE2] overflow-hidden">
                    <motion.div
                      key={showcaseSeatsTaken}
                      initial={{ width: `${Math.max(0, showcaseFillPct - 2)}%` }}
                      animate={{ width: `${showcaseFillPct}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#1C3B34] via-emerald-600 to-emerald-400"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6A7B6D] pt-0.5">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live Cohort Admissions Active
                    </span>
                    <span className="text-emerald-800 font-bold">{showcaseSpotsRemaining} spots remaining</span>
                  </div>
                </div>

                {selectedEvent.id === 7 && (
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200/80 p-3.5 flex items-center justify-between gap-2 text-[#1C3B34] text-xs font-semibold">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                      21-Day Private WhatsApp Sprint
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded-md">Included</span>
                  </div>
                )}
                {selectedEvent.id === 22 && (
                  <div className="rounded-2xl bg-blue-50 border border-blue-200/80 p-3.5 flex items-center justify-between gap-2 text-[#1C3B34] text-xs font-semibold">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-700 shrink-0" />
                      Team Simulation &amp; Breakouts
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-blue-800 bg-blue-200/70 px-2 py-0.5 rounded-md">Included</span>
                  </div>
                )}
              </aside>

              {/* RIGHT: Story, Pricing & Registration */}
              <div className="[grid-area:main] space-y-6 sm:space-y-7 min-w-0">

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13261F] text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                    <Compass className="w-3 h-3 text-amber-300" />
                    {selectedEvent.hierarchyIndex} · {selectedEvent.badgeType}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#DCE3D7] text-[10px] sm:text-[11px] font-semibold text-[#3A4D3E] uppercase tracking-wider">
                    {selectedEvent.roleBadge}
                  </span>
                </div>

                {/* Title + Hook */}
                <div className="space-y-3">
                  <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-serif font-bold text-[#0F1A13] tracking-tight leading-[1.1]">
                    {selectedEvent.id === 7 ? (
                      <>
                        WAKE UP. SHAKE UP.
                        <span className="block text-[#1C3B34] italic font-normal mt-1">From Meager to Mega.</span>
                      </>
                    ) : selectedEvent.title}
                  </h2>
                  <p className="text-base sm:text-lg font-serif italic text-amber-800 leading-snug">
                    &ldquo;{selectedEvent.hook}&rdquo;
                  </p>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#556956] uppercase tracking-wider">
                    {selectedEvent.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-[15px] text-[#2F4234] leading-relaxed">
                  {selectedEvent.whatItIs}
                </p>

                {/* Pricing + CTA Card */}
                <div className="relative rounded-3xl bg-gradient-to-br from-[#13261F] via-[#1C3B34] to-[#24493F] text-white p-5 sm:p-7 shadow-[0_24px_50px_-20px_rgba(19,38,31,0.7)] overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
                  
                  {/* Top Tier Header */}
                  <div className="relative flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-emerald-200 font-mono font-bold block">
                        FOUNDER EARLY-BIRD TUITION
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-[9px] font-mono font-bold uppercase">
                        Active Tier
                      </span>
                    </div>
                    {showcaseSavingsPct > 0 && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-300 text-[#13261F] text-xs font-bold shadow-md">
                        <Zap className="w-3.5 h-3.5" />
                        Save {showcaseSavingsPct}% Off Standard
                      </span>
                    )}
                  </div>

                  {/* Main Price Numbers */}
                  <div className="relative mt-3 flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-4xl sm:text-5xl font-mono font-extrabold tracking-tight text-white">
                          {selectedEvent.priceNGN || `₦${(selectedEvent.price * 1500).toLocaleString()}`}
                        </span>
                        <span className="text-sm sm:text-base font-mono text-emerald-200/90 font-medium">
                          / ${selectedEvent.price.toFixed(2)} USD
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-white/50 line-through">
                          Standard Rate: {selectedEvent.standardPriceNGN || "₦95,000"}
                        </span>
                        <span className="text-[10px] text-amber-200/90 font-mono">
                          • Limited Early-Bird Cohort
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Early-Bird Coverage & 2-Stage Payment Note */}
                  <div className="relative mt-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-3.5 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-white/90">
                      <Award className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <div className="space-y-0.5 leading-relaxed text-[11px] sm:text-xs">
                        <strong className="text-amber-200 block">Early-Bird Access Includes:</strong>
                        <span className="text-white/80">
                          Full 2-Day Live Accelerator &amp; Masterclass (Virtual worldwide + Onsite regional hubs) + 21-Day Daily Cognitive Transformation Sprint + All Companion Frameworks.
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono">
                      <span className="text-emerald-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span><strong>2-Stage Option:</strong> Lock seat today from <strong>₦{selectedEvent.id === 7 ? "15,000" : selectedEvent.id === 12 ? "12,000" : "10,000"}</strong> (balance due 3 days prior).</span>
                      </span>
                      <span className="text-amber-200/90 font-bold shrink-0 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                        100% Flexible Rollover &amp; Seat Swap
                      </span>
                    </div>
                  </div>

                  {/* Register CTA Button */}
                  <button
                    id="events-register-primary"
                    onClick={() => handleRegisterEvent(selectedEvent)}
                    disabled={isProcessing}
                    className="relative mt-5 w-full py-4 px-6 rounded-2xl bg-[#F5F8F3] hover:bg-white text-[#13261F] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-70"
                  >
                    <span>{isProcessing ? "PROCESSING SECURE REGISTRATION..." : selectedEvent.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="relative mt-3.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[10px] sm:text-[11px] text-white/75 font-mono">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Virtual &amp; Onsite Access</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-300" /> 256-Bit SSL Encrypted</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-emerald-300" /> 80 Seats Target Capacity</span>
                  </div>
                </div>

                {/* Who It's For */}
                <div className="rounded-2xl bg-white border border-[#E1E7DC] p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1C3B34] uppercase tracking-wider mb-2">
                    <Target className="w-4 h-4" />
                    Who this is for
                  </div>
                  <p className="text-sm text-[#3A4D3E] leading-relaxed">
                    {selectedEvent.whoItIsFor}
                  </p>
                </div>

                {/* What You Gain */}
                {selectedEvent.whatYouGain && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[11px] font-semibold text-[#1C3B34] uppercase tracking-wider">
                        <TrendingUp className="w-4 h-4" />
                        What you&apos;ll gain
                      </span>
                      <span className="text-[11px] text-[#6A7B6D]">{selectedEvent.whatYouGain.length} core upgrades</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedEvent.whatYouGain.map((gain, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white border border-[#E1E7DC] shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#1C3B34]/40 transition-all">
                          <div className="flex items-start gap-3">
                            <span className="w-7 h-7 rounded-lg bg-[#EAF0E6] text-[#1C3B34] text-xs font-bold flex items-center justify-center shrink-0">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="min-w-0">
                              <strong className="font-semibold text-[#172217] block text-sm leading-snug">{gain.title}</strong>
                              <span className="text-[#4F6352] text-xs leading-relaxed block mt-1">{gain.desc}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Included Materials Strip */}
                {(EVENT_DELIVERABLES_MAP[selectedEvent.id]?.length || 0) > 0 && (
                  <div className="rounded-2xl bg-white border border-[#E1E7DC] p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between gap-2 text-[11px] font-semibold">
                      <span className="flex items-center gap-2 text-[#1C3B34] uppercase tracking-wider">
                        <Package className="w-4 h-4" />
                        Included materials ({EVENT_DELIVERABLES_MAP[selectedEvent.id]?.length})
                      </span>
                      <span className="text-emerald-700">Unlocked on registration</span>
                    </div>
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                      {EVENT_DELIVERABLES_MAP[selectedEvent.id]?.map((item, i) => (
                        <div
                          key={i}
                          className="relative w-12 h-16 sm:w-14 sm:h-[4.5rem] rounded-lg overflow-hidden shrink-0 ring-1 ring-black/10 bg-[#172217] shadow-sm group/thumb"
                          title={`${item.title} (${item.format})`}
                        >
                          <Image src={item.image} alt={item.title} fill sizes="56px" className="object-cover group-hover/thumb:scale-110 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* ===================================================================== */}
            {/* FULL PROGRAM ARCHITECTURE (WHAT CHANGES → PILLARS → INCLUDED DELIVERABLES) */}
            {/* ===================================================================== */}
            <div className="pt-6 sm:pt-8 border-t border-[#D0D9CA] space-y-8 sm:space-y-12">
              
              {/* 1. What Changes: Event Schedule & Agenda Blueprint */}
              {EVENT_AGENDAS_MAP[selectedEvent.id] && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center max-w-2xl mx-auto px-2">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                      WHAT CHANGES · INTENSIVE BLUEPRINT
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold text-[#172217]">
                      {selectedEvent.id === 7 ? "2-Day Live Accelerator Schedule" : (
                        selectedEvent.id === 12 ? "3-Hour Intensive Masterclass Agenda" : (
                          selectedEvent.id === 22 ? "5-Hour Team Excellence Intensive Agenda" : "Regional Workshop Schedule"
                        )
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E5B4B] font-light mt-1">
                      Detailed session breakdown designed for irreversible personal shift and high-leverage execution.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {EVENT_AGENDAS_MAP[selectedEvent.id].map((session, idx) => (
                      <div key={idx} className="p-4 sm:p-6 sm:p-7 rounded-xl sm:rounded-2xl bg-white border border-[#CCD6C6] space-y-3 shadow-md flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1C3B34] text-white font-mono text-[10px] sm:text-xs font-bold">
                            {session.tag}
                          </div>
                          <h4 className="text-lg sm:text-xl font-serif font-bold text-[#172217]">
                            {session.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#3A4D3E] leading-relaxed font-light">
                            {session.desc}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-[#E2E8DE] text-[11px] sm:text-xs text-[#1C3B34] font-mono font-bold">
                          {session.focus}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Core Framework Pillars / Spectrum Units */}
              {EVENT_PILLARS_MAP[selectedEvent.id] && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center max-w-2xl mx-auto px-2">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                      CORE TRANSFORMATION FRAMEWORK
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold text-[#172217]">
                      {EVENT_PILLARS_MAP[selectedEvent.id].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E5B4B] font-light mt-1">
                      {EVENT_PILLARS_MAP[selectedEvent.id].subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                    {EVENT_PILLARS_MAP[selectedEvent.id].pillars.map((unit, idx) => {
                      const IconComp = unit.icon;
                      return (
                        <div key={idx} className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#CCD6C6] space-y-2.5 shadow-sm hover:border-[#1C3B34] transition-all flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] sm:text-xs font-mono font-bold text-[#1C3B34]">{unit.num} · {unit.role}</span>
                              <div className="p-1.5 rounded-lg bg-[#E2E8DE] text-[#1C3B34]">
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                            </div>
                            <h5 className="text-base sm:text-lg font-serif font-bold text-[#172217]">{unit.name}</h5>
                            <p className="text-xs text-[#4F6352] leading-relaxed font-light">{unit.desc}</p>
                          </div>
                          <div className="pt-2 border-t border-[#E2E8DE] text-[10px] sm:text-[11px] text-[#1C3B34] font-mono">
                            {unit.shift}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Included Deliverables & Resource Pack */}
              {EVENT_DELIVERABLES_MAP[selectedEvent.id] && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center max-w-2xl mx-auto px-2">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                      WHAT&apos;S INCLUDED
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold text-[#172217]">
                      Essential Blueprints &amp; Program Deliverables
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E5B4B] font-light mt-1">
                      {selectedEvent.id === 16
                        ? "Purpose-built live worksheets and practical action tools completed with facilitator guidance during the session — not available as pre-downloads."
                        : "Targeted action frameworks and execution blueprinted materials unlocked inside your portal immediately upon registration."
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                    {EVENT_DELIVERABLES_MAP[selectedEvent.id].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#CCD6C6] shadow-xs hover:shadow-md hover:border-[#1C3B34] transition-all flex items-start gap-3 sm:gap-3.5 group"
                      >
                        {/* Compact Miniature PDF Thumbnail */}
                        <div className="relative w-14 h-18 sm:w-16 sm:h-20 sm:w-20 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden shrink-0 bg-[#172217] shadow-xs border border-[#D5DDCF]">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                        </div>

                        {/* Content Body */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-[#E2E8DE] text-[8px] sm:text-[9px] font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                              {item.type}
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-mono text-[#6A7B6D]">
                              {item.format}
                            </span>
                          </div>
                          <h5 className="font-serif font-bold text-xs sm:text-sm text-[#172217] leading-snug group-hover:text-[#1C3B34] transition-colors line-clamp-2">
                            {item.title}
                          </h5>
                          <p className="text-[10px] sm:text-[11px] text-[#4F6352] font-light leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
                          <div className="pt-1 flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-[#1C3B34] font-bold">
                            <CheckCircle2 className="w-3 h-3 text-[#1C3B34] shrink-0" />
                            <span>Included with Tuition</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Secondary Register Action Banner */}
              <div className="p-4 sm:p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white border border-[#CCD6C6] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
                <div className="space-y-1 max-w-xl">
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-[#172217]">
                    Ready to Secure Your Seat?
                  </h4>
                  <p className="text-xs text-[#4F6352]">
                    {selectedEvent.id === 16
                      ? `Register now at ${selectedEvent.priceNGN || `$${selectedEvent.price} USD`}. Your live workshop worksheets, audit sheets, and practical tools await you on the day.`
                      : `Register now at the early bird rate of ${selectedEvent.priceNGN || `$${selectedEvent.price} USD`} and unlock all included materials immediately.`
                    }
                  </p>
                </div>
                <button
                  onClick={() => handleRegisterEvent(selectedEvent)}
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-[#1C3B34] hover:bg-[#13261F] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 shrink-0 cursor-pointer text-center"
                >
                  {selectedEvent.buttonText}
                </button>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 03B. CO-FOUNDER DUAL PASS — dynamic per selected event */}
        {/* ========================================================================= */}
        {(() => {
          const coFounderConfig: Record<number, {
            programName: string;
            soloNGN: string;
            duoNGN: string;
            standardNGN: string;
            duoUSD: string;
            saveNGN: string;
            productId: string;
            productTitle: string;
            productDesc: string;
            priceUSD: number;
            priceNGN: number;
            imageUrl: string;
            benefit3: string;
            bullet2: string;
          }> = {
            7: {
              programName: "JUMPSTART",
              soloNGN: "₦35,000",
              duoNGN: "₦60,000",
              standardNGN: "₦70,000",
              duoUSD: "$42 USD",
              saveNGN: "₦10,000",
              productId: "store-js-duo",
              productTitle: "JUMPSTART: Co-Founder Dual Pass (2 Seats)",
              productDesc: "2 full seats for JUMPSTART 2-Day Live Accelerator + 21-Day Cognitive Sprint.",
              priceUSD: 42.00,
              priceNGN: 60000,
              imageUrl: "/images/covers/jumpstart_cover_v2.jpg",
              benefit3: "✓ Entry into the 21-Day Cognitive Sprint — together",
              bullet2: "One conversation after JUMPSTART is worth more than 6 months of misaligned meetings.",
            },
            12: {
              programName: "POI MASTERCLASS",
              soloNGN: "₦30,000",
              duoNGN: "₦50,000",
              standardNGN: "₦60,000",
              duoUSD: "$36 USD",
              saveNGN: "₦10,000",
              productId: "store-poi-duo",
              productTitle: "POI Masterclass: Co-Founder Dual Pass (2 Seats)",
              productDesc: "2 full seats for the POI Masterclass — Becoming a Person of Interest.",
              priceUSD: 36.00,
              priceNGN: 50000,
              imageUrl: "/images/covers/masterclass_poi_v2.jpg",
              benefit3: "✓ Both founders enter as authorities — not just attendees",
              bullet2: "Two people calibrated to the same positioning framework multiply results exponentially.",
            },
            22: {
              programName: "SUCCESS MULTIPLIER",
              soloNGN: "₦25,000",
              duoNGN: "₦42,000",
              standardNGN: "₦50,000",
              duoUSD: "$30 USD",
              saveNGN: "₦8,000",
              productId: "store-team-duo",
              productTitle: "Success Multiplier: Leadership Pair Pass (2 Seats)",
              productDesc: "2 full seats for Success Multiplier — How to Elevate Every Team You Step Into.",
              priceUSD: 30.00,
              priceNGN: 42000,
              imageUrl: "/images/covers/course_communication.jpg",
              benefit3: "✓ Train 2 key team leaders on psychological safety and accountability together",
              bullet2: "Two leaders aligned on the same collaboration language immediately transform team culture.",
            },
            16: {
              programName: "FIT-FOR-PROFIT",
              soloNGN: "₦20,000",
              duoNGN: "₦35,000",
              standardNGN: "₦40,000",
              duoUSD: "$25 USD",
              saveNGN: "₦5,000",
              productId: "store-ffp-duo",
              productTitle: "Fit-For-Profit: Co-Founder Dual Pass (2 Seats)",
              productDesc: "2 full seats for the Fit-For-Profit Commercial Capacity Workshop.",
              priceUSD: 25.00,
              priceNGN: 35000,
              imageUrl: "/images/covers/fit_for_profit_v2.jpg",
              benefit3: "✓ Build your commercial model together from day one",
              bullet2: "Two founders aligned on cash-flow architecture create faster, more resilient businesses.",
            },
          };

          const cfg = coFounderConfig[selectedEventId] ?? coFounderConfig[7];

          return (
            <div className="bg-[#E2E8DE] text-[#172217] rounded-2xl sm:rounded-3xl border border-[#D5DDCF] p-5 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
              {/* Header row with program tag and cohort badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1C3B34]/10 border border-[#1C3B34]/20 rounded-full text-[10px] font-mono font-bold text-[#1C3B34] uppercase tracking-widest">
                  <Package className="w-3 h-3 text-[#1C3B34]" />
                  <span>{cfg.programName} · CO-FOUNDER ADD-ON</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#D5DDCF] shadow-sm">
                  <Users2 className="w-3 h-3 text-[#1C3B34]" />
                  <span className="text-[10px] font-mono font-bold text-[#1C3B34] uppercase tracking-widest">6 Pairs · Limited Cohort</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* LEFT: Clean story-driven copy */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#172217] leading-tight">
                      Bring Your Co-Founder.
                      <span className="block text-[#1C3B34]">Build on the Same Operating System.</span>
                    </h3>
                    <p className="text-sm text-[#4E5B4B] font-light leading-relaxed">
                      Two founders in the same room, learning the same language, at the same time — that's the edge. Shared clarity moves faster than any strategy deck ever could.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Both of you walk in with the same mental upgrade — no lag, no catch-up sessions.",
                      cfg.bullet2,
                      "The cohort is capped. When the 6 pairs are filled, this offer closes.",
                    ].map((line, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-[#27382B] font-light">
                        <span className="w-5 h-5 rounded-full bg-[#E2E8DE] border border-[#D0D9CA] text-[#1C3B34] flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Dynamic offer card */}
                <div className="bg-white border border-[#D5DDCF] text-[#172217] rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
                  <div>
                    <p className="text-[10px] font-mono font-bold text-[#1C3B34] uppercase tracking-widest mb-2">
                      For Both Founders · 2 Full {cfg.programName} Seats
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-extrabold font-mono text-[#172217]">{cfg.duoNGN}</span>
                      <div className="text-right">
                        <span className="text-xs font-mono text-[#6A7B6D] line-through block">{cfg.standardNGN}</span>
                        <span className="text-[10px] font-mono text-[#6A7B6D]">{cfg.duoUSD}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#E8EDE6] pt-4 space-y-2 text-xs text-[#4E5B4B] font-light">
                    <p>✓ Full virtual &amp; onsite access for both founders</p>
                    <p>✓ All materials, recordings &amp; session blueprints</p>
                    <p>{cfg.benefit3}</p>
                    <p>✓ Instant WhatsApp community access</p>
                  </div>

                  <button
                    onClick={() => {
                      addToCart({
                        id: cfg.productId,
                        title: cfg.productTitle,
                        description: cfg.productDesc,
                        priceUSD: cfg.priceUSD,
                        priceNGN: cfg.priceNGN,
                        imageUrl: cfg.imageUrl
                      } as any);
                      showToast(`${cfg.programName} Co-Founder Pass secured! Proceeding to checkout...`, "success");
                      router.push("/checkout");
                    }}
                    className="w-full py-3.5 sm:py-4 px-3 sm:px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-md text-center cursor-pointer leading-snug"
                  >
                    BRING YOUR CO-FOUNDER — SECURE 2 {cfg.programName} SEATS →
                  </button>

                  <p className="text-center text-[10px] font-mono text-[#6A7B6D]">Max 6 pairs per cohort · Seats close when filled</p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ========================================================================= */}
        {/* CLEAR EVENT HIERARCHY SELECTOR (JUMPSTART → POI MASTERCLASS → SUCCESS MULTIPLIER → FIT-FOR-PROFIT) */}
        {/* ========================================================================= */}
        <div className="space-y-4 sm:space-y-6 pt-4">
          <div className="text-center space-y-1 px-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-200 uppercase tracking-widest">
              THE ORIGIN EVENT HIERARCHY
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-white font-normal">
              Progression of Transformation &amp; Mastery
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light max-w-2xl mx-auto">
              Follow the natural progression: Start with the foundational JUMPSTART accelerator, ascend to specialized authority in the POI Masterclass, master high-leverage team dynamics in Success Multiplier, and build commercial enterprise in Fit-For-Profit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {EVENTS.map((event) => {
              const isSelected = event.id === selectedEventId;
              const companions = EVENT_DELIVERABLES_MAP[event.id] || [];
              const isPrimary = event.id === 7;
              
              const cardStats = allStats[event.id] || { spotsRemaining: event.spots, totalSpots: event.totalSpots || 80, seatsTaken: (event.totalSpots || 80) - event.spots, fillPercentage: 70 };
              
              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className={`bg-[#E2E8DE] text-[#172217] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-all cursor-pointer flex flex-col justify-between group shadow-xl relative overflow-hidden ${
                    isSelected 
                      ? "border-[#1C3B34] ring-2 ring-[#1C3B34] scale-[1.01] sm:scale-[1.02]" 
                      : "border-[#D5DDCF] hover:border-[#1C3B34]"
                  } ${isPrimary ? "ring-1 ring-amber-500/40" : ""}`}
                >
                  {isPrimary && (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#D5DDCF] shadow-sm">
                      <Compass className="w-2.5 h-2.5 text-[#1C3B34]" />
                      <span className="text-[9px] font-mono font-bold text-[#1C3B34] uppercase tracking-wider">Main Entry Point</span>
                    </div>
                  )}

                  <div className="space-y-3 sm:space-y-3.5">
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase px-2 sm:px-2.5 py-1 rounded-full bg-white border border-[#CCD6C6] text-[#4E5B4B] tracking-wider">
                        {event.hierarchyIndex}. {event.badgeType}
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-[#1C3B34] block">
                          {event.priceNGN || `$${event.price} USD`}
                        </span>
                        {event.standardPriceNGN && (
                          <span className="text-[9px] font-mono text-[#6A7B6D] line-through block">
                            {event.standardPriceNGN}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-blue-800 bg-blue-50/90 border border-blue-200/80 px-2 py-0.5 rounded-md w-fit">
                      <Video className="w-3 h-3 text-blue-600 shrink-0" />
                      <span>🌐 Virtual &amp; 🏛️ Onsite Hybrid</span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-base sm:text-lg text-[#172217] leading-snug group-hover:text-[#1C3B34] transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] font-mono text-amber-800 font-bold mt-1">
                        {event.hook}
                      </p>
                    </div>

                    <p className="text-xs text-[#4E5B4B] line-clamp-2 leading-relaxed font-light">
                      {event.whatItIs}
                    </p>

                    {/* Companion Thumbnails Row for Each Event Card */}
                    {companions.length > 0 && (
                      <div className="pt-2 sm:pt-2.5 border-t border-[#D0D9CA] space-y-1.5">
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#1C3B34] uppercase block">
                          Includes {companions.length} Materials &amp; Blueprints:
                        </span>
                        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
                          {companions.map((item, idx) => (
                            <div key={idx} className="relative w-8 h-11 sm:w-9 sm:h-12 rounded-md sm:rounded-lg overflow-hidden shrink-0 border border-[#CCD6C6] bg-[#172217] shadow-xs" title={item.title}>
                              <Image src={item.image} alt={item.title} fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-[#D0D9CA] flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold text-[#1C3B34]">
                    <span>{cardStats.spotsRemaining} spots remaining</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {isSelected ? "ACTIVE SHOWCASE" : "VIEW DETAILS →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* ========================================================================= */}
        {/* 04. FIT FOR PROFIT IMPACT CORPS BANNER (SEPARATE & FREE) */}
        {/* ========================================================================= */}
        <div id="volunteer" className="bg-[#E2E8DE] text-[#172217] rounded-2xl sm:rounded-3xl border border-[#D5DDCF] p-4 sm:p-8 lg:p-10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-start gap-4 sm:gap-5 max-w-2xl text-left">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#0d1c18] border border-amber-400/50 p-2 flex items-center justify-center shrink-0 shadow-lg mt-0.5 sm:mt-1">
              <Image src="/fip_logo.png" alt="FIP Logo" width={48} height={48} className="w-full h-full object-contain" />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-[#CCD6C6] rounded-full text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34]">
                <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1C3B34] shrink-0" />
                <span>05. FIT FOR PROFIT IMPACT CORPS</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold text-[#172217]">
                Join the Fit For Profit Impact Corps
              </h3>
              <p className="text-xs sm:text-sm text-[#4E5B4B] font-light leading-relaxed">
                <strong className="font-semibold text-[#172217]">100% Free Community Service &amp; Leadership Initiative</strong> (distinct from the paid commercial workshop). We mobilize leaders and Impact Corps members to stage educational outreaches, mentorship drives, and youth empowerment across local communities and public schools in different states.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVolunteerModalOpen(true)}
            className="w-full md:w-auto px-6 sm:px-7 py-3.5 sm:py-4 bg-[#1C3B34] hover:bg-[#152e29] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer text-center"
          >
            <Image src="/fip_logo.png" alt="FIP Logo" width={18} height={18} className="w-4 h-4 object-contain" />
            <span>Join the Impact Corps (Free)</span>
          </button>
        </div>

      </div>

      {/* Volunteer Modal */}
      <FitForProfitVolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />

      {/* Real-Time Live Registration Social Proof Ticker */}
      <LiveRegistrationTicker
        registration={latestRegistration}
        seatsTaken={showcaseSeatsTaken}
        totalSpots={showcaseTotalSeats}
      />

      {/* Interactive Executive Registration Modal */}
      <EventRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        event={selectedEvent as any}
        stats={stats}
      />
    </div>
  );
}
