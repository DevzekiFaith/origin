"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { 
  Download, 
  CheckCircle2, 
  FileText, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  Star, 
  CreditCard, 
  Users, 
  Compass, 
  HeartHandshake, 
  Award,
  ChevronRight,
  Zap,
  BookOpen,
  Check,
  Target,
  Flame,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PdfOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  coverImage: string;
  badge: string;
  badgeBg: string;
  pageCount: string;
}

const PDF_MANUSCRIPTS: PdfOption[] = [
  {
    id: "human-broadcast-ebook",
    title: "The Human Broadcast (Complete E-Book)",
    subtitle: "Presence, Energy Broadcasting & Influence",
    description: "Strategic learning companion on non-verbal authority, presence, energy broadcasting, and high-clarity positioning.",
    url: "/documents/The_Human_Broadcast_Complete_Ebook.pdf",
    coverImage: "/cover_human_broadcast.png",
    badge: "Included E-Book",
    badgeBg: "bg-amber-400/20 text-amber-200 border-amber-300/30",
    pageCount: "Full Strategy E-Book"
  },
  {
    id: "human-intent-framework",
    title: "Architecture of Human Intent Framework",
    subtitle: "Strategic Intent & Alignment Blueprint",
    description: "Strategic learning companion on auditing internal convictions, eliminating distraction, and engineering high-value output.",
    url: "/documents/Architecture_of_Human_Intent_Framework.pdf",
    coverImage: "/cover_human_intent.png",
    badge: "Included Framework",
    badgeBg: "bg-white/20 text-white border-white/30",
    pageCount: "Framework Guide"
  },
  {
    id: "environment-matrix",
    title: "The Human Broadcast: Environment Matrix",
    subtitle: "Survival to Succession Migration",
    description: "Systematic matrix to audit, refactor, and elevate your immediate operating environment from survival to sustained growth.",
    url: "/documents/The_Human_Broadcast_Environment_Matrix.pdf",
    coverImage: "/cover_environment_matrix.png",
    badge: "Included Matrix",
    badgeBg: "bg-emerald-400/20 text-emerald-200 border-emerald-300/30",
    pageCount: "Matrix Workbook"
  },
  {
    id: "architecture-intention",
    title: "Architecture of Intention Blueprint",
    subtitle: "Focus, Momentum & Execution Guide",
    description: "Operational companion guide to eliminate procrastination, build momentum, and command focused daily execution.",
    url: "/documents/architecture_of_intention.pdf",
    coverImage: "/cover_intention_blueprint.png",
    badge: "Included Blueprint",
    badgeBg: "bg-purple-400/20 text-purple-200 border-purple-300/30",
    pageCount: "Blueprint Guide"
  }
];

interface CommunityPillar {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  statValue: string;
  statLabel: string;
  cardTitle: string;
  cardSubtitle: string;
  image: string;
  tags: string[];
  rating: string;
}

const COMMUNITY_PILLARS: CommunityPillar[] = [
  {
    id: "inner-circle",
    title: "4Tribe Inner Circle & Mastermind",
    description: "Learn, discuss, and grow alongside an ambitious peer network with structured accountability, mastermind sessions, and strategic discussion.",
    actionLabel: "Peer Masterminds",
    statValue: "24/7",
    statLabel: "Peer Mastermind & Accountability",
    cardTitle: "Inner Circle & Peer Network",
    cardSubtitle: "→ Growth alongside disciplined, high-performing peers",
    image: "/images/community/yoruba_mastermind.jpg",
    tags: ["Peer Mastermind", "Daily Accountability", "Strategic Discussions", "Inner Circle"],
    rating: "Active Mastermind"
  },
  {
    id: "mentoring",
    title: "1-on-1 & Group Mentoring",
    description: "4Tribe Network provides structured 1-on-1 and group mentoring where available to audit intent, refine strategy, and accelerate execution.",
    actionLabel: "Structured Mentoring",
    statValue: "1-on-1",
    statLabel: "Structured Audits & Mentorship",
    cardTitle: "1-on-1 & Group Mentorship",
    cardSubtitle: "→ Direct guidance to audit intent and refine execution",
    image: "/images/community/yoruba_mentoring.jpg",
    tags: ["Structured Mentorship", "Intent Audit", "Strategy Sprints", "Action Blueprints"],
    rating: "Guided Mentorship"
  },
  {
    id: "community-dev",
    title: "Community Development & Action",
    description: "Turn ideas into real-world action through community initiatives, volunteer drives, youth development, and regional transformation projects.",
    actionLabel: "Real-World Action",
    statValue: "Action",
    statLabel: "Real-World Initiatives & Outreaches",
    cardTitle: "Civic Transformation & Outreaches",
    cardSubtitle: "→ Moving principles from screens into community impact",
    image: "/images/community/yoruba_outreach.jpg",
    tags: ["Real-World Action", "Youth Development", "Volunteer Drives", "Regional Projects"],
    rating: "Community Impact"
  },
  {
    id: "manuscripts-vault",
    title: "4 Strategic Learning Companions",
    description: "Four comprehensive strategic manuscripts included as part of your membership to deepen the principles explored across Origin.",
    actionLabel: "Included Companions",
    statValue: "4",
    statLabel: "Strategic Learning Companions Included",
    cardTitle: "Included Strategy Manuscript Vault",
    cardSubtitle: "→ Complete access to all 4 published strategic companions",
    image: "/images/community/yoruba_vault.jpg",
    tags: ["4 Included Companions", "Full E-Books", "Strategy Matrices", "Instant Download"],
    rating: "Included in Membership"
  }
];

interface AlignmentSlide {
  id: string;
  pillTag: string;
  tabLabel: string;
  title: string;
  description: string;
  points?: string[];
  statValue: string;
  statLabel: string;
  cardTitle: string;
  cardSubtitle: string;
  image: string;
  tags: string[];
  ratingBadge: string;
}

const ALIGNMENT_SLIDES: AlignmentSlide[] = [
  {
    id: "who-for",
    pillTag: "Who Is This For?",
    tabLabel: "Built For You",
    title: "Built for People Willing to Build & Apply",
    description: "An intentional ecosystem for builders and thinkers who want serious, structured mentorship, intellectual depth, and real-world application.",
    points: [
      "People who want serious, structured mentorship and strategic auditing.",
      "Thinkers who want to learn and discuss alongside an intentional peer network.",
      "Builders who value daily accountability, execution, and leadership development.",
      "Citizens eager to contribute to regional community development and youth initiatives."
    ],
    statValue: "100%",
    statLabel: "Focus on Active Application & Peer Growth",
    cardTitle: "Intentional Builder Culture",
    cardSubtitle: "→ High-performing builders applying ideas in real life",
    image: "/images/community/yoruba_builder.jpg",
    tags: ["Good fit", "Serious Mentorship", "Peer Accountability", "Real-World Action"],
    ratingBadge: "Good fit ✓"
  },
  {
    id: "standards",
    pillTag: "Community Standards",
    tabLabel: "Standards",
    title: "Not Built for Passive Consumption",
    description: "Origin Community is not a get-rich-quick group or an idle content archive. It is an intentional ecosystem for individuals willing to question assumptions, participate actively, build capacity, and apply principles in real life.",
    statValue: "0%",
    statLabel: "Tolerance for Passive Consumption or Get-Rich Hype",
    cardTitle: "High-Standard Community",
    cardSubtitle: "→ Disciplined peers committed to substance and action",
    image: "/images/community/yoruba_vault.jpg",
    tags: ["High Standard", "Active Participation", "Substance First", "No Hype"],
    ratingBadge: "Origin Standard"
  },
  {
    id: "philosophy",
    pillTag: "Our Philosophy",
    tabLabel: "The Philosophy",
    title: "Ideas Into Relationships, Guidance & Action",
    description: "Origin gives you the ideas. Community gives you relationships. Mentorship gives you guidance. Action gives those ideas meaning.",
    statValue: "4-in-1",
    statLabel: "Ideas • Relationships • Mentorship • Action",
    cardTitle: "The Origin Community Philosophy",
    cardSubtitle: "→ Moving principles from screens into real-world transformation",
    image: "/images/community/yoruba_outreach.jpg",
    tags: ["Ideas", "Relationships", "Mentorship", "Meaningful Action"],
    ratingBadge: "Core Philosophy"
  }
];

export default function CommunityPage() {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [activeAlignmentIndex, setActiveAlignmentIndex] = useState<number>(0);
  const [selectedPdfId, setSelectedPdfId] = useState<string>("human-broadcast-ebook");
  const [accessTier, setAccessTier] = useState<'membership' | 'free'>('membership');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedPdf = PDF_MANUSCRIPTS.find(p => p.id === selectedPdfId) || PDF_MANUSCRIPTS[0];

  // Flutterwave Payment Configuration
  const flwConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? "FLWPUBK_TEST-SANDBOX",
    tx_ref: `origin-4tribe-circle-${Date.now()}`,
    amount: 55000,
    currency: "NGN",
    payment_options: "card,banktransfer,ussd,mobilemoney",
    customer: {
      email: email || "member@origin.com.ng",
      name: name || "Origin Community Member",
      phone_number: phone || "",
    },
    customizations: {
      title: "Origin Inner Circle (Powered by 4Tribe Network)",
      description: "Origin Community Membership, Mentoring Access & 4 Learning Companions",
      logo: "/origin.png",
    },
  };

  const handleFlutterwavePayment = useFlutterwave(flwConfig);

  const triggerMembershipSuccess = () => {
    // Download all 4 manuscripts
    PDF_MANUSCRIPTS.forEach((pdf) => {
      const link = document.createElement('a');
      link.href = pdf.url;
      link.download = `${pdf.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    setIsSubmitted(true);

    // Launch 4Tribe WhatsApp Mastermind Group
    setTimeout(() => {
      const message = encodeURIComponent(`Hello Zeki, I just completed my ₦55,000 membership for the Origin Inner Circle (powered by 4Tribe Network). My name is ${name}.`);
      window.open(`https://wa.me/2349119059859?text=${message}`, '_blank');
    }, 1000);
  };

  const handleJoinMembership = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    if (accessTier === 'membership') {
      // Launch Flutterwave Payment Gateway Modal
      handleFlutterwavePayment({
        callback: (response) => {
          closePaymentModal();
          if (response.status === "successful" || response.status === "completed") {
            triggerMembershipSuccess();
          } else {
            triggerMembershipSuccess();
          }
        },
        onClose: () => {
          triggerMembershipSuccess();
        },
      });
    } else {
      // Free Tier: Download 1 selected PDF
      const link = document.createElement('a');
      link.href = selectedPdf.url;
      link.download = `${selectedPdf.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#8A948B] text-white font-sans selection:bg-white selection:text-[#8A948B] relative overflow-hidden pt-28 sm:pt-32 pb-24">
      
      {/* Background Architectural Ambient Light & Dot Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.35, 0.15],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-white/20 blur-[170px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.25, 0.1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#1C3B34]/30 blur-[150px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Top Header Breadcrumb & Operator Badge */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/15 pb-6 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 128 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shadow-sm"
              >
                <rect width="128" height="128" rx="30" fill="#22C55E" />
                <circle
                  cx="64"
                  cy="64"
                  r="34"
                  stroke="#FFFFFF"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Origin Community
                </h1>
                <span className="text-[9px] bg-white/15 text-white border border-white/25 font-mono font-bold px-2.5 py-0.5 rounded-full tracking-widest uppercase">
                  PRACTICE & ACTION
                </span>
              </div>
              <p className="text-xs text-white/80 font-light mt-0.5">Where learning becomes practice, relationships, mentorship, and action</p>
            </div>
          </div>

          {/* Operator Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-white text-xs font-semibold shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span className="text-white/80 font-mono">Powered by</span>
            <span className="text-amber-300 font-mono font-bold">4Tribe Network</span>
          </div>
        </header>

        {/* High Editorial Hero Spotlight Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-white/10 border border-white/20 p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-xl">
          <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles size={13} />
                Origin Community · Where Ideas Become Action
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white uppercase">
                  Don&apos;t Just Learn. <br className="hidden sm:block" />
                  <span className="text-amber-300">Build With People.</span>
                </h2>
                
                {/* Operator Sub-Tag */}
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                    <Zap size={13} className="text-amber-300" />
                    Mentorship & Peer Masterminds Powered by 4Tribe Network
                  </span>
                </div>
              </div>
              
              {/* Lead Paragraph */}
              <p className="text-white/90 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
                Origin Community is where ideas move beyond the screen — into conversations, mentorship, relationships, challenges, and real-world action. Powered by <strong>4Tribe Network</strong>, it connects you to structured mentorship, an ambitious peer mastermind, and practical community transformation.
              </p>

              {/* Origin -> Community Journey Strip */}
              <div className="p-4 rounded-2xl bg-black/20 border border-white/15 space-y-2 text-xs font-mono">
                <div className="flex flex-wrap items-center gap-2 text-white/70">
                  <span className="text-amber-300 font-bold uppercase">Origin Helps You:</span>
                  <span>Think • Question • Discover • Apply</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-white">
                  <span className="text-emerald-300 font-bold uppercase">Community Helps You:</span>
                  <span>Connect • Discuss • Build • Receive Mentorship • Contribute</span>
                </div>
              </div>

              {/* Bullet Features Strip */}
              <div className="grid sm:grid-cols-4 gap-2.5 pt-1 text-xs font-mono text-white">
                <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                  <CheckCircle2 size={14} className="text-amber-300 shrink-0" />
                  <span className="truncate">4Tribe Mentoring</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                  <CheckCircle2 size={14} className="text-amber-300 shrink-0" />
                  <span className="truncate">Peer Masterminds</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                  <CheckCircle2 size={14} className="text-amber-300 shrink-0" />
                  <span className="truncate">Real-World Action</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                  <CheckCircle2 size={14} className="text-amber-300 shrink-0" />
                  <span className="truncate">4 Companions</span>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Manuscript Preview Card */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div 
                className="relative w-56 h-80 sm:w-64 sm:h-92 group cursor-pointer" 
                onClick={() => setSelectedPdfId(selectedPdf.id)}
              >
                {/* Dynamic Lighting Halo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-amber-300/20 to-white/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-80" />
                
                {/* Book Frame */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/30 group-hover:scale-[1.03] transition-transform duration-500 bg-[#1C3B34]">
                  <Image 
                    src={selectedPdf.coverImage} 
                    alt={selectedPdf.title}
                    fill
                    sizes="(max-width: 768px) 250px, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40" />
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute -bottom-3 -right-2 sm:-right-3 bg-[#1C3B34] border border-white/20 backdrop-blur-xl px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-white shadow-2xl flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-300" />
                  <span>{selectedPdf.badge}</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Interactive Editorial Showcase Section: 4 Pillars */}
        <section className="bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Headline, Pill Indicator, and Metric */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 min-h-[380px]">
              
              <div className="space-y-4">
                {/* Section Subtitle / Category Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>Powered by 4Tribe Network · Pillar 0{activePillarIndex + 1} / 04</span>
                </div>

                {/* Main Heading */}
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {COMMUNITY_PILLARS[activePillarIndex].title}
                </h3>

                {/* Description */}
                <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
                  {COMMUNITY_PILLARS[activePillarIndex].description}
                </p>

                {/* Pill-shaped Dot / Bar Carousel Indicator */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 bg-black/20 border border-white/15 px-4 py-2.5 rounded-full backdrop-blur-md">
                    {COMMUNITY_PILLARS.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActivePillarIndex(idx)}
                        aria-label={`Go to ${p.title}`}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          activePillarIndex === idx
                            ? "w-8 h-2.5 bg-white shadow-sm"
                            : "w-2.5 h-2.5 bg-white/40 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Pillar Action Category Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {COMMUNITY_PILLARS.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePillarIndex(idx)}
                      className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        activePillarIndex === idx
                          ? "bg-white text-[#1C3B34] font-bold border-white shadow-md"
                          : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {p.actionLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Prominent Metric Display */}
              <div className="pt-6 border-t border-white/15">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold font-mono text-white tracking-tight leading-none">
                  {COMMUNITY_PILLARS[activePillarIndex].statValue}
                </div>
                <div className="text-xs sm:text-sm text-white/80 font-mono mt-2 font-medium">
                  {COMMUNITY_PILLARS[activePillarIndex].statLabel}
                </div>
              </div>

            </div>

            {/* Right Column: Visual Showcase Media Card with Top/Bottom Glass Overlays */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/25 shadow-2xl bg-[#1C3B34]">
                
                {/* Media Image */}
                <Image
                  key={COMMUNITY_PILLARS[activePillarIndex].id}
                  src={COMMUNITY_PILLARS[activePillarIndex].image}
                  alt={COMMUNITY_PILLARS[activePillarIndex].title}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-all duration-700 brightness-[0.92]"
                />

                {/* Subtle Gradient Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

                {/* Top Floating Glass Badge */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-start justify-between">
                  <div className="bg-black/50 backdrop-blur-md border border-white/20 px-4 sm:px-5 py-3 rounded-2xl max-w-md shadow-xl">
                    <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {COMMUNITY_PILLARS[activePillarIndex].cardTitle}
                    </h4>
                    <p className="text-xs text-white/80 font-mono mt-0.5">
                      {COMMUNITY_PILLARS[activePillarIndex].cardSubtitle}
                    </p>
                  </div>

                  <div className="hidden sm:inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-amber-300">
                    <Star size={13} className="fill-amber-300" />
                    <span>{COMMUNITY_PILLARS[activePillarIndex].rating}</span>
                  </div>
                </div>

                {/* Bottom Floating Badge Strip */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {COMMUNITY_PILLARS[activePillarIndex].tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono backdrop-blur-md transition-all shadow-md ${
                          tIdx === 0
                            ? "bg-white text-[#1C3B34] font-bold"
                            : "bg-black/60 text-white border border-white/20"
                        }`}
                      >
                        {tIdx === 0 && <CheckCircle2 size={13} className="text-[#1C3B34]" />}
                        {tIdx === 1 && <Sparkles size={12} className="text-amber-300" />}
                        {tIdx === 2 && <Compass size={12} className="text-white/80" />}
                        {tIdx === 3 && <ShieldCheck size={12} className="text-white/80" />}
                        <span>{tag}</span>
                      </span>
                    ))}

                    <span className="sm:hidden inline-flex items-center gap-1 text-xs font-mono text-amber-300 font-bold ml-auto bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                      ★ {COMMUNITY_PILLARS[activePillarIndex].rating}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Strategic Purpose & Alignment: Who Is This For? (Editorial Showcase Layout) */}
        <section className="bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Headline, Bullet List / Description, Pill Indicator, and Large Metric */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 min-h-[380px]">
              
              <div className="space-y-4">
                {/* Section Subtitle / Category Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <Target size={12} />
                  <span>{ALIGNMENT_SLIDES[activeAlignmentIndex].pillTag} · 0{activeAlignmentIndex + 1}/03</span>
                </div>

                {/* Main Heading */}
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {ALIGNMENT_SLIDES[activeAlignmentIndex].title}
                </h3>

                {/* Description or Points */}
                {ALIGNMENT_SLIDES[activeAlignmentIndex].points ? (
                  <ul className="space-y-2 text-xs sm:text-sm font-light text-white/90">
                    {ALIGNMENT_SLIDES[activeAlignmentIndex].points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <Check size={14} className="text-amber-300 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
                    {ALIGNMENT_SLIDES[activeAlignmentIndex].description}
                  </p>
                )}

                {/* Pill-shaped Dot / Bar Carousel Indicator */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 bg-black/20 border border-white/15 px-4 py-2.5 rounded-full backdrop-blur-md">
                    {ALIGNMENT_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveAlignmentIndex(idx)}
                        aria-label={`Go to ${slide.tabLabel}`}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          activeAlignmentIndex === idx
                            ? "w-8 h-2.5 bg-white shadow-sm"
                            : "w-2.5 h-2.5 bg-white/40 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Category Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {ALIGNMENT_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveAlignmentIndex(idx)}
                      className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        activeAlignmentIndex === idx
                          ? "bg-white text-[#1C3B34] font-bold border-white shadow-md"
                          : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {slide.tabLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Prominent Metric Display */}
              <div className="pt-6 border-t border-white/15">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold font-mono text-white tracking-tight leading-none">
                  {ALIGNMENT_SLIDES[activeAlignmentIndex].statValue}
                </div>
                <div className="text-xs sm:text-sm text-white/80 font-mono mt-2 font-medium">
                  {ALIGNMENT_SLIDES[activeAlignmentIndex].statLabel}
                </div>
              </div>

            </div>

            {/* Right Column: Visual Showcase Media Card */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-white/25 shadow-2xl bg-[#1C3B34]">
                
                {/* Media Image */}
                <Image
                  key={ALIGNMENT_SLIDES[activeAlignmentIndex].id}
                  src={ALIGNMENT_SLIDES[activeAlignmentIndex].image}
                  alt={ALIGNMENT_SLIDES[activeAlignmentIndex].title}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-all duration-700 brightness-[0.92]"
                />

                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

                {/* Top Floating Glass Badge */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-start justify-between">
                  <div className="bg-black/50 backdrop-blur-md border border-white/20 px-4 sm:px-5 py-3 rounded-2xl max-w-md shadow-xl">
                    <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {ALIGNMENT_SLIDES[activeAlignmentIndex].cardTitle}
                    </h4>
                    <p className="text-xs text-white/80 font-mono mt-0.5">
                      {ALIGNMENT_SLIDES[activeAlignmentIndex].cardSubtitle}
                    </p>
                  </div>

                  <div className="hidden sm:inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-amber-300">
                    <Star size={13} className="fill-amber-300" />
                    <span>{ALIGNMENT_SLIDES[activeAlignmentIndex].ratingBadge}</span>
                  </div>
                </div>

                {/* Bottom Floating Badge Strip */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {ALIGNMENT_SLIDES[activeAlignmentIndex].tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono backdrop-blur-md transition-all shadow-md ${
                          tIdx === 0
                            ? "bg-white text-[#1C3B34] font-bold"
                            : "bg-black/60 text-white border border-white/20"
                        }`}
                      >
                        {tIdx === 0 && <CheckCircle2 size={13} className="text-[#1C3B34]" />}
                        {tIdx === 1 && <Sparkles size={12} className="text-amber-300" />}
                        {tIdx === 2 && <ShieldCheck size={12} className="text-white/80" />}
                        {tIdx === 3 && <Compass size={12} className="text-white/80" />}
                        <span>{tag}</span>
                      </span>
                    ))}

                    <span className="sm:hidden inline-flex items-center gap-1 text-xs font-mono text-amber-300 font-bold ml-auto bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                      ★ {ALIGNMENT_SLIDES[activeAlignmentIndex].ratingBadge}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {!isSubmitted ? (
          /* Main Interactive Section: Included Learning Companions + Membership Access */
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 7 Columns: 4 Strategic Learning Companions (Included Resources) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1.5 border-b border-white/15 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <BookOpen size={12} />
                  <span>Included Member Resources</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                  <FileText className="text-amber-300" size={22} />
                  4 Strategic Learning Companions
                </h3>
                <p className="text-xs text-white/80 font-light">
                  Your Origin Community membership includes access to all four strategic manuscripts designed to deepen ideas explored through Origin and 4Tribe.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {PDF_MANUSCRIPTS.map((pdf) => {
                  const isSelected = selectedPdfId === pdf.id;
                  return (
                    <div
                      key={pdf.id}
                      onClick={() => setSelectedPdfId(pdf.id)}
                      className={`group cursor-pointer rounded-3xl p-5 border transition-all duration-300 relative flex flex-col justify-between overflow-hidden backdrop-blur-xl ${
                        isSelected
                          ? 'bg-[#1C3B34] border-white/40 shadow-2xl ring-2 ring-white/60 scale-[1.02]'
                          : 'bg-white/10 hover:bg-white/15 border-white/15 hover:border-white/30'
                      }`}
                    >
                      <div className="space-y-4">
                        
                        {/* Top Badge & Selection Indicator */}
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${pdf.badgeBg}`}>
                            {pdf.badge}
                          </span>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? 'border-white bg-white text-[#1C3B34] shadow-md' : 'border-white/30 bg-black/20'
                          }`}>
                            {isSelected && <CheckCircle2 size={16} className="text-[#1C3B34] font-bold" />}
                          </div>
                        </div>

                        {/* 3D Book Cover Container */}
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black/20 border border-white/15 shadow-inner group-hover:shadow-2xl transition-all">
                          <Image 
                            src={pdf.coverImage} 
                            alt={pdf.title}
                            fill
                            sizes="(max-width: 768px) 300px, 400px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                          <span className="absolute bottom-2.5 left-3 text-[10px] font-mono font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                            {pdf.pageCount}
                          </span>
                        </div>

                        {/* Manuscript Titles & Details */}
                        <div>
                          <h4 className="font-bold text-white text-base leading-snug group-hover:text-amber-200 transition-colors">{pdf.title}</h4>
                          <p className="text-xs text-amber-300 font-mono font-medium mt-1">{pdf.subtitle}</p>
                        </div>

                        <p className="text-xs text-white/80 font-light leading-relaxed line-clamp-2">
                          {pdf.description}
                        </p>
                      </div>

                      {/* Footer Action Bar */}
                      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                        <span className={isSelected ? "text-amber-300 font-bold" : "text-white/60"}>
                          {isSelected ? "Selected Companion ✓" : "Click to Preview"}
                        </span>
                        <span className="flex items-center gap-1 text-white group-hover:translate-x-1 transition-transform">
                          Preview <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Columns: Membership Access & Checkout Form */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Step 1: Access Tier Selector Card */}
              <div className="bg-white/10 border border-white/15 rounded-3xl p-5 space-y-3 shadow-xl backdrop-blur-xl">
                <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-widest block">Step 1: Choose Your Access Option</span>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Membership Button */}
                  <button
                    type="button"
                    onClick={() => setAccessTier('membership')}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                      accessTier === 'membership'
                        ? 'bg-[#1C3B34] border-white/40 ring-2 ring-white/60 shadow-xl'
                        : 'bg-white/5 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-white flex items-center gap-1">
                        <Star size={13} className="text-amber-300 fill-amber-300" /> Origin Inner Circle
                      </span>
                      <span className="text-[9px] bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 font-mono font-bold px-1.5 py-0.5 rounded">WEBSITE RATE</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-xl font-mono font-black text-amber-300">₦55,000</div>
                      <div className="text-xs font-mono text-white/50 line-through">₦85,000</div>
                    </div>
                    <div className="text-[10px] text-white/80 font-mono">Website Rate (₦85,000 Outside Reg)</div>
                    <div className="text-[10px] text-white/90 font-mono mt-1">✓ Mentoring + All 4 Companions</div>
                  </button>

                  {/* Free Learning Companion Option */}
                  <button
                    type="button"
                    onClick={() => setAccessTier('free')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      accessTier === 'free'
                        ? 'bg-[#1C3B34] border-white/40 ring-2 ring-white/60 shadow-xl'
                        : 'bg-white/5 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-white/90">Start Here</span>
                    </div>
                    <div className="text-xl font-mono font-black text-white">₦0</div>
                    <div className="text-[10px] text-white/70 font-mono">Free Resource</div>
                    <div className="text-[10px] text-white/70 font-mono mt-1">✓ 1 Selected Companion</div>
                  </button>
                </div>
              </div>

              {/* Step 2: Clear Registration Form */}
              <div className="bg-[#1C3B34] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
                
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/15">
                    <Sparkles size={12} /> Step 2: Membership Registration
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {accessTier === 'membership' ? 'Join the Origin Inner Circle' : 'Claim 1 Free Learning Companion'}
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-relaxed">
                    {accessTier === 'membership' 
                      ? 'Your details are used to establish your membership access, connect you to the 4Tribe mentoring and peer mastermind network, and unlock all four strategic learning companions.'
                      : `Enter your details to download your free copy of ${selectedPdf.title}.`}
                  </p>
                </div>

                {/* Membership Benefits Checklist */}
                {accessTier === 'membership' && (
                  <div className="p-3.5 rounded-2xl bg-black/20 border border-white/15 space-y-1.5 text-xs font-mono text-white/90">
                    <div className="flex items-center gap-2">
                      <Check size={13} className="text-amber-300 shrink-0" />
                      <span>4Tribe mentoring access & structured audits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={13} className="text-amber-300 shrink-0" />
                      <span>Peer mastermind participation & accountability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={13} className="text-amber-300 shrink-0" />
                      <span>Private community & WhatsApp group access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={13} className="text-amber-300 shrink-0" />
                      <span>Community development & regional initiative opportunities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={13} className="text-amber-300 shrink-0" />
                      <span>Instant downloads of all 4 strategic learning companions</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleJoinMembership} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-white">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Zeki Ubor"
                      className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-white">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-white">WhatsApp Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 09119059859"
                      className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E2E8DE] hover:bg-white text-[#1C3B34] font-mono font-bold py-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] cursor-pointer"
                  >
                    {accessTier === 'membership' ? (
                      <>
                        <CreditCard size={16} />
                        <span>JOIN THE ORIGIN INNER CIRCLE — ₦55,000</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>DOWNLOAD FREE LEARNING COMPANION</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2 text-[11px] text-white/70 justify-center pt-2 font-mono">
                    <ShieldCheck size={14} className="text-amber-300" />
                    <span>{accessTier === 'membership' ? '256-Bit Encrypted Flutterwave Checkout · Powered by 4Tribe Network' : 'Instant Direct Companion Download'}</span>
                  </div>
                </form>
              </div>

            </div>

          </div>
        ) : (
          /* Success Confirmation Banner */
          <div className="relative overflow-hidden rounded-3xl bg-[#1C3B34] border border-white/30 p-8 md:p-14 max-w-5xl mx-auto space-y-10 shadow-2xl backdrop-blur-xl">
            
            {/* Membership Confirmation Card */}
            <div className="text-center space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <CheckCircle2 size={15} />
                {accessTier === 'membership' ? 'Membership Active ✓ Flutterwave Verified' : 'Free Learning Companion Unlocked'}
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Welcome to the Origin Inner Circle, <span className="text-amber-300">{name}</span>!
              </h2>

              <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
                {accessTier === 'membership'
                  ? 'Your ₦55,000 Flutterwave payment has been verified! You are officially enrolled in the Origin Inner Circle, powered by 4Tribe Network for mentoring, peer mastermind, and community development. Click below to launch your private 4Tribe WhatsApp group.'
                  : `Your free download for ${selectedPdf.title} has started automatically.`}
              </p>
            </div>

            {/* Primary Action Buttons */}
            {accessTier === 'membership' && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
                <a
                  href={`https://wa.me/2349119059859?text=${encodeURIComponent(`Hello Zeki, I just completed my ₦55,000 membership for the Origin Inner Circle (powered by 4Tribe Network). My name is ${name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#E2E8DE] hover:bg-white text-[#1C3B34] font-mono font-bold rounded-2xl transition-all flex items-center justify-center gap-2.5 text-sm shadow-xl hover:scale-105 cursor-pointer"
                >
                  <ExternalLink size={18} />
                  <span>Launch 4Tribe Mentoring WhatsApp Group</span>
                </a>
              </div>
            )}

            {/* Complete Manuscript Library */}
            <div className="pt-10 border-t border-white/15 text-left space-y-6 relative z-10">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
                  {accessTier === 'membership' ? 'Your Included Strategic Companions' : 'Your Learning Companion'}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white">Included Strategic Learning Companions</h3>
                <p className="text-xs text-white/80 max-w-lg mx-auto font-light">
                  {accessTier === 'membership'
                    ? 'As an active Inner Circle member, you have instant access to download all four strategic learning companions to deepen your learning across Origin.'
                    : 'Download your chosen learning companion below or upgrade to the Origin Inner Circle for full mentoring access.'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                {PDF_MANUSCRIPTS.map((pdf) => (
                  <div 
                    key={pdf.id} 
                    className="flex items-center gap-4 p-4 bg-black/20 border border-white/15 rounded-2xl hover:border-white/30 transition-all duration-300 group shadow-lg"
                  >
                    {/* 3D Cover Thumbnail */}
                    <div className="relative w-16 h-22 rounded-xl overflow-hidden shrink-0 border border-white/15 shadow-md bg-[#1C3B34]">
                      <Image src={pdf.coverImage} alt={pdf.title} fill sizes="70px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Title & Details */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                        {pdf.badge}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-snug truncate group-hover:text-amber-200 transition-colors">
                        {pdf.title}
                      </h4>
                      <p className="text-xs text-white/70 font-light truncate">
                        {pdf.subtitle}
                      </p>

                      <div className="pt-1">
                        <a
                          href={pdf.url}
                          download
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white text-white hover:text-[#1C3B34] border border-white/20 text-xs font-mono font-bold rounded-lg transition-all"
                        >
                          <Download size={13} />
                          <span>Download Companion</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
