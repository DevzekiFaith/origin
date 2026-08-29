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
  Sparkles, 
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
  ArrowDown
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import FitForProfitVolunteerModal from "../components/FitForProfitVolunteerModal";
import { motion, AnimatePresence } from "framer-motion";

const FILTERS = [
  { id: "all", name: "All Cohorts & Programs" },
  { id: "accelerator", name: "01. Jumpstart (Primary)" },
  { id: "masterclass", name: "02. POI Masterclass" },
  { id: "workshop", name: "03. Fit-For-Profit" },
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
    price: 10.00,
    priceNGN: "₦15,000",
    standardPriceNGN: "₦67,500",
    icon: Award,
    gradient: "from-[#1C3B34] to-[#8A948B]",
    imageUrl: "/images/covers/jumpstart_cover_v2.jpg",
    instructor: "Zeki Ubor",
    isOnline: true,
    hasOnsite: true,
    virtualLocation: "GoogleMeet Interactive HD Live Stream (Join from Anywhere Worldwide)",
    onsiteLocation: "Regional Partner Hubs & Executive Suites (Abuja & Lagos)",
    spots: 18,
    totalSpots: 50,
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
    buttonText: "SECURE YOUR ₦15,000 TICKET (VIRTUAL / ONSITE) →"
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
    date: "Saturday, September 12, 2026",
    time: "GoogleMeet LIVE & Studio Broadcast (5:00 PM – 8:00 PM WAT | 3-Hour Intensive)",
    price: 11.06,
    priceNGN: "₦16,500",
    standardPriceNGN: "₦35,000",
    icon: Zap,
    gradient: "from-[#1C3B34] to-[#8A948B]",
    imageUrl: "/images/covers/masterclass_poi_v2.jpg",
    instructor: "Zeki Ubor",
    isOnline: true,
    hasOnsite: true,
    virtualLocation: "GoogleMeet HD Interactive Stream (Join from Anywhere Globally)",
    onsiteLocation: "Executive Studio Audience Gallery (Abuja & Lagos Studios)",
    spots: 28,
    totalSpots: 100,
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
    buttonText: "REGISTER FOR POI MASTERCLASS (VIRTUAL / ONSITE) →"
  },
  {
    id: 16,
    hierarchyIndex: "03",
    roleBadge: "PRACTICAL REGIONAL WORKSHOP",
    badgeType: "Commercial Execution",
    title: "FIT-FOR-PROFIT: Commercial Capacity Workshop",
    hook: "Prepare for profit in your career, work, ministry, and significance.",
    subtitle: "The Commercial Engine: Structuring Vocational Gifts for Sustainable Enterprise & Cash-Flow",
    type: "workshop",
    format: "Virtual & Onsite (Global & Physical Access)",
    date: "Monthly Regional Sessions (Multi-State & Virtual Stream)",
    time: "Full-Day Workshop Intensive (9:00 AM – 5:00 PM WAT)",
    price: 8.00,
    priceNGN: "₦12,000",
    standardPriceNGN: "₦25,000",
    icon: Award,
    gradient: "from-[#1C3B34] to-[#8A948B]",
    imageUrl: "/images/covers/fit_for_profit_v2.jpg",
    instructor: "Zeki Ubor & The Becoming Institute",
    isOnline: true,
    hasOnsite: true,
    virtualLocation: "Global Live Interactive Workshop Stream (Worldwide Access)",
    onsiteLocation: "Multi-State Physical Centers (Lagos, Abuja, Uyo, Port Harcourt)",
    spots: 50,
    totalSpots: 200,
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
    buttonText: "REGISTER FOR FIT-FOR-PROFIT (VIRTUAL / ONSITE) →"
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
        icon: Sparkles,
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
  }
};

const EVENT_AGENDAS_MAP: Record<number, Array<{ tag: string; title: string; desc: string; focus: string }>> = {
  7: [
    {
      tag: "DAY 1 // SATURDAY @ 5:00 PM WAT",
      title: "Wake Up. Shake Up. From Meager to Mega — Make the Shift",
      desc: "Deep-dive into Units 1 & 2 (Perception & Usefulness). Dismantling default programming of lack and fear, re-engineering your cognitive lens to spot leverage, and converting raw potential into high-impact market utility.",
      focus: "✦ Focus: Scarcity Deconstruction & Making the Shift"
    },
    {
      tag: "DAY 2 // SUNDAY @ 5:00 PM WAT",
      title: "The Architecture of Execution",
      desc: "Mastering Units 3, 4, 5 & 6 (Boundaries, Consent, Value & Self-Mastery). Erecting impenetrable focus perimeters, mastering high-leverage agreements, commanding premium worth, and achieving emotional governance.",
      focus: "✦ Focus: Perimeter Architecture & Command Authority"
    }
  ],
  12: [
    {
      tag: "SESSION 1 // 5:00 PM – 6:15 PM WAT",
      title: "The Human Architecture of Intent & Perceived Value",
      desc: "Deconstructing the hidden psychological mechanics of perceived authority, personal gravity, and why high-value positioning dictates market respect.",
      focus: "✦ Focus: Cognitive Calibration & Social Gravity"
    },
    {
      tag: "SESSION 2 // 6:30 PM – 8:00 PM WAT",
      title: "The Influence Matrix & Live Positioning Audits",
      desc: "Real-time positioning breakdowns, high-stakes agreement architectures, and converting specialized knowledge into an undeniable commercial brand.",
      focus: "✦ Focus: Value Articulation & High-Trust Influence"
    }
  ],
  16: [
    {
      tag: "MORNING SESSION // 9:00 AM – 1:00 PM",
      title: "The Economics of Vocation & Commercial Capacity Audit",
      desc: "Auditing commercial models, pricing strategies, and aligning vocational gifts for sustainable cash-flow without ethical compromise.",
      focus: "✦ Focus: Commercial Scalability & Cash-Flow Architecture"
    },
    {
      tag: "AFTERNOON SESSION // 2:00 PM – 5:00 PM",
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
  16: [
    {
      title: "Fit For Profit Tactical Workbook",
      format: "Workshop Guide (PDF)",
      type: "Execution Blueprint",
      desc: "Field-tested frameworks to align your career, enterprise, and ministry for sustainable commercial profitability.",
      image: "/images/covers/fit_for_profit_v2.jpg",
      pdfUrl: "/documents/course-problem-solving-workbook.pdf"
    },
    {
      title: "8 Q&A to Selling Framework",
      format: "Commercial Protocol (PDF)",
      type: "Commercial Sales Protocol",
      desc: "High-conversion sales psychology, objection handling, and ethical commercial negotiation architecture.",
      image: "/8-qa-to-selling.png",
      pdfUrl: "/documents/8-qa-to-selling.pdf"
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredEvents = activeFilter === "all" 
    ? EVENTS 
    : EVENTS.filter(e => e.type === activeFilter);

  const selectedEvent = EVENTS.find(e => e.id === selectedEventId) || filteredEvents[0] || EVENTS[0];

  const handleRegisterEvent = (event: typeof EVENTS[0]) => {
    setIsProcessing(true);
    const parsedNGN = event.priceNGN ? parseInt(event.priceNGN.replace(/[^0-9]/g, '')) : Math.round(event.price * 1500);
    addToCart({
      id: `store-${event.id === 7 ? 17 : event.id}`,
      title: event.title,
      description: event.whatItIs,
      priceUSD: event.price,
      priceNGN: event.id === 7 ? 15000 : parsedNGN,
      imageUrl: event.imageUrl,
    } as any);
    showToast(`${event.title} ticket added! Proceeding to checkout...`, "success");
    router.push("/checkout");
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
          className="absolute top-1/4 right-1/4 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-white/15 blur-[120px] sm:blur-[180px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -35, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-amber-100/15 blur-[100px] sm:blur-[160px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px] sm:bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
        
        {/* Hero Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto px-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/15 border border-white/25 text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider shadow-sm backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
            <span>THE BECOMING INSTITUTE // LIVE EVENTS &amp; SESSIONS</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.12] sm:leading-[1.08] font-normal"
          >
            Live Accelerators &amp; <span className="italic text-amber-200">Transformative Cohorts</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-base lg:text-lg text-white/85 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Engineered live intensives and cognitive migration sprints led by Zeki Ubor to transition you from survival-based living into the realm of succession.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none px-1 -mx-1">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                const firstInCat = EVENTS.find(e => filter.id === "all" || e.type === filter.id);
                if (firstInCat) setSelectedEventId(firstInCat.id);
              }}
              className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-mono font-bold transition-all shrink-0 cursor-pointer uppercase tracking-wider whitespace-nowrap ${
                activeFilter === filter.id
                  ? "bg-[#E2E8DE] text-[#172217] border border-[#E2E8DE] shadow-md scale-102 sm:scale-105"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* SIGNATURE SHOWCASE CONTAINER (WHAT IT IS → WHO IT'S FOR → WHAT YOU GAIN → SPECS → PRICING → REGISTER) */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#E2E8DE] text-[#172217] rounded-3xl sm:rounded-[2.5rem] border border-[#D5DDCF] shadow-2xl p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              
              {/* Left Column (5 cols): Buying Psychology Flow */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-left">
                
                {/* 1. Hierarchy Role Badge */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/80 border border-[#CCD6C6] text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase shadow-xs">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1C3B34] shrink-0" />
                  <span>{selectedEvent.hierarchyIndex}. {selectedEvent.roleBadge}</span>
                </div>

                {/* 2. What It Is & Hook Headline */}
                <div>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#172217] tracking-tight leading-tight">
                    {selectedEvent.id === 7 ? (
                      <>
                        WAKE UP. SHAKE UP.
                        <span className="block text-xl sm:text-2xl lg:text-4xl font-sans font-extrabold text-[#1C3B34] mt-1">
                          From Meager to Mega.
                        </span>
                        <span className="block text-xs sm:text-sm font-mono font-bold text-amber-700 uppercase tracking-widest mt-1">
                          Make the shift.
                        </span>
                      </>
                    ) : selectedEvent.title}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase mt-1.5 sm:mt-2">
                    {selectedEvent.subtitle}
                  </p>
                </div>

                {/* What It Is Description */}
                <p className="text-[#3A4D3E] text-xs sm:text-sm lg:text-base font-light leading-relaxed">
                  {selectedEvent.whatItIs}
                </p>

                {/* 3. Who It Is For Box */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 border border-[#CCD6C6] space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase">
                    <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C3B34] shrink-0" />
                    <span>WHO THIS IS FOR</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3A4D3E] font-light leading-relaxed">
                    {selectedEvent.whoItIsFor}
                  </p>
                </div>

                {/* 4. What You Stand to Gain Box */}
                {selectedEvent.whatYouGain && (
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 border border-[#CCD6C6] space-y-2.5 shadow-xs">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C3B34] shrink-0" />
                      <span>WHAT YOU STAND TO GAIN</span>
                    </div>
                    <div className="space-y-2">
                      {selectedEvent.whatYouGain.map((gain, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1C3B34] shrink-0 mt-0.5" />
                          <p className="text-[#3A4D3E] font-light leading-relaxed">
                            <strong className="font-semibold text-[#172217]">{gain.title}:</strong> {gain.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Event Specs Box (Virtual & Onsite Dual-Mode) */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-2.5 text-[11px] sm:text-xs font-mono text-[#172217]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C3B34] shrink-0" />
                    <span className="font-bold">{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1C3B34] shrink-0" />
                    <span>{selectedEvent.time}</span>
                  </div>

                  {/* Dual Mode Attendance Delivery */}
                  <div className="pt-2 border-t border-[#D0D9CA] space-y-1.5">
                    <div className="flex items-start gap-2">
                      <Video className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#172217] uppercase block text-[10px]">🌐 Virtual Attendance (Global Access):</strong>
                        <span className="text-[#4F6352] text-[11px] font-normal">{selectedEvent.virtualLocation}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#172217] uppercase block text-[10px]">🏛️ Onsite Attendance (Physical Seating):</strong>
                        <span className="text-[#4F6352] text-[11px] font-normal">{selectedEvent.onsiteLocation}</span>
                      </div>
                    </div>
                  </div>

                  {selectedEvent.id === 7 && (
                    <div className="pt-1.5 border-t border-[#D0D9CA] flex items-center gap-2 text-[#1C3B34] font-bold">
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>21-Day Private WhatsApp Cohort Included</span>
                    </div>
                  )}
                </div>

                {/* 5. Pricing Block */}
                <div className="pt-2 border-t border-[#D0D9CA] flex flex-wrap items-baseline justify-between gap-2 sm:gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold block">EARLY BIRD TUITION</span>
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#172217]">
                        {selectedEvent.priceNGN || `₦${(selectedEvent.price * 1500).toLocaleString()}`}
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono text-[#4E5B4B]">
                        / ${selectedEvent.price.toFixed(2)} USD
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] sm:text-xs font-mono text-[#6A7B6D] line-through block">
                      Standard: {selectedEvent.standardPriceNGN || "₦67,500"}
                    </span>
                    <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-full bg-[#1C3B34] text-white text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider mt-1">
                      EARLY ACCESS SAVINGS
                    </span>
                  </div>
                </div>

                {/* 6. What's Included (Bundled PDF Companions Preview Strip) */}
                {(EVENT_DELIVERABLES_MAP[selectedEvent.id]?.length || 0) > 0 && (
                  <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/70 border border-[#CCD6C6] space-y-2">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono font-bold text-[#1C3B34]">
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1C3B34] shrink-0" />
                        <span>INCLUDED BLUEPRINTS &amp; MATERIALS ({EVENT_DELIVERABLES_MAP[selectedEvent.id]?.length})</span>
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-[#4F6352] uppercase font-normal">PORTAL UNLOCKED</span>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {EVENT_DELIVERABLES_MAP[selectedEvent.id]?.map((item, i) => (
                        <div 
                          key={i} 
                          className="relative w-12 h-16 sm:w-14 sm:h-18 rounded-lg overflow-hidden shrink-0 border border-[#CCD6C6] bg-[#172217] shadow-xs group/thumb" 
                          title={`${item.title} (${item.format})`}
                        >
                          <Image src={item.image} alt={item.title} fill className="object-cover group-hover/thumb:scale-110 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Register Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleRegisterEvent(selectedEvent)}
                    disabled={isProcessing}
                    className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    {isProcessing ? "PROCESSING SECURE REGISTRATION..." : selectedEvent.buttonText}
                  </button>
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] font-mono text-[#4F6352] pt-2">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1C3B34]" /> Virtual &amp; Onsite Access</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1C3B34]" /> 100% Secure</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1C3B34]" /> Global Attendance</span>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Displaying Hero Card */}
              <div className="lg:col-span-7 flex justify-center w-full">
                <div className="relative aspect-[4/5] sm:aspect-[16/13] w-full rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-[#D5DDCF] shadow-2xl bg-[#121316] group">
                  <Image
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 60vw"
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Glass Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 bg-black/60 backdrop-blur-md border border-white/20 p-3 sm:p-5 rounded-xl sm:rounded-2xl text-white flex items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-serif font-extrabold text-sm sm:text-base lg:text-lg block leading-tight">
                        {selectedEvent.title}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-white/80 block mt-0.5">✦ Led by {selectedEvent.instructor}</span>
                    </div>
                    <div className="text-right font-mono shrink-0">
                      <span className="text-xs sm:text-base font-extrabold text-amber-300 block">
                        {selectedEvent.priceNGN || `$${selectedEvent.price} USD`}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-emerald-400 font-bold uppercase">
                        {selectedEvent.spots} Spots Left
                      </span>
                    </div>
                  </div>

                  {/* Bottom Frosted Glass Strip */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-[10px] sm:text-xs font-mono text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
                      <span>🌐 Virtual (Global Live Stream) + 🏛️ Onsite (Regional Hubs)</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
                      <span>{selectedEvent.id === 7 ? "21-Day Accountability Sprint" : "Alumni Network & Community Access"}</span>
                    </div>
                  </div>
                </div>
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
                      WHAT CHANGES // INTENSIVE BLUEPRINT
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold text-[#172217]">
                      {selectedEvent.id === 7 ? "2-Day Live Accelerator Schedule" : (
                        selectedEvent.id === 12 ? "3-Hour Intensive Masterclass Agenda" : "Regional Workshop Schedule"
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
                              <span className="text-[11px] sm:text-xs font-mono font-bold text-[#1C3B34]">{unit.num} // {unit.role}</span>
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
                      Targeted action frameworks and execution blueprinted materials unlocked inside your portal immediately upon registration.
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
                    Register now at the early bird rate of {selectedEvent.priceNGN || `$${selectedEvent.price} USD`} and unlock all included materials immediately.
                  </p>
                </div>
                <button
                  onClick={() => handleRegisterEvent(selectedEvent)}
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer text-center"
                >
                  {selectedEvent.buttonText}
                </button>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* CLEAR EVENT HIERARCHY SELECTOR (JUMPSTART → POI MASTERCLASS → FIT-FOR-PROFIT) */}
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
              Follow the natural progression: Start with the foundational JUMPSTART accelerator, ascend to specialized authority in the POI Masterclass, and build commercial enterprise in Fit-For-Profit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {EVENTS.map((event) => {
              const isSelected = event.id === selectedEventId;
              const companions = EVENT_DELIVERABLES_MAP[event.id] || [];
              const isPrimary = event.id === 7;
              
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
                    <div className="absolute top-0 right-0 bg-[#1C3B34] text-amber-300 font-mono text-[9px] font-bold uppercase tracking-wider py-1 px-2.5 sm:px-3 rounded-bl-xl shadow-xs">
                      ★ MAIN ENTRY POINT
                    </div>
                  )}

                  <div className="space-y-3 sm:space-y-3.5">
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase px-2 sm:px-2.5 py-0.5 rounded-full bg-white border border-[#CCD6C6] text-[#1C3B34]">
                        {event.hierarchyIndex}. {event.badgeType}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#1C3B34]">
                        {event.priceNGN || `$${event.price} USD`}
                      </span>
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
                    <span>{event.spots} spots remaining</span>
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
        {/* 04. FIT-FOR-PROFIT VOLUNTEER COMMUNITY OUTREACH BANNER (SEPARATE & FREE) */}
        {/* ========================================================================= */}
        <div id="volunteer" className="bg-[#E2E8DE] text-[#172217] rounded-2xl sm:rounded-3xl border border-[#D5DDCF] p-4 sm:p-8 lg:p-10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 border border-[#CCD6C6] rounded-full text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34]">
              <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1C3B34] shrink-0" />
              <span>04. FREE COMMUNITY SERVICE &amp; OUTREACH MOVEMENT</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold text-[#172217]">
              Join the Fit-For-Profit Volunteer Movement
            </h3>
            <p className="text-xs sm:text-sm text-[#4E5B4B] font-light leading-relaxed">
              <strong className="font-semibold text-[#172217]">100% Free Community Service Initiative</strong> (distinct from the paid commercial workshop). We mobilize leaders and volunteers to stage educational outreaches, mentorship drives, and youth empowerment across local communities and public schools in different states.
            </p>
          </div>
          <button
            onClick={() => setIsVolunteerModalOpen(true)}
            className="w-full md:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 cursor-pointer text-center"
          >
            <Users className="w-3.5 h-3.5 inline mr-1.5" />
            <span>Join as a Volunteer (Free)</span>
          </button>
        </div>

      </div>

      {/* Volunteer Modal */}
      <FitForProfitVolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />
    </div>
  );
}
