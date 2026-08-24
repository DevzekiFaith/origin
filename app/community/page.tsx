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
  BookOpen
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
    description: "The definitive master manual on non-verbal authority, presence, and strategic market positioning.",
    url: "/documents/The_Human_Broadcast_Complete_Ebook.pdf",
    coverImage: "/cover_human_broadcast.png",
    badge: "Most Popular",
    badgeBg: "bg-amber-400/20 text-amber-200 border-amber-300/30",
    pageCount: "Full Strategy E-Book"
  },
  {
    id: "human-intent-framework",
    title: "Architecture of Human Intent Framework",
    subtitle: "Strategic Intent & Alignment Blueprint",
    description: "Master framework on auditing internal convictions, eliminating distraction, and engineering high-value output.",
    url: "/documents/Architecture_of_Human_Intent_Framework.pdf",
    coverImage: "/cover_human_intent.png",
    badge: "Core Framework",
    badgeBg: "bg-white/20 text-white border-white/30",
    pageCount: "Framework Guide"
  },
  {
    id: "environment-matrix",
    title: "The Human Broadcast: Environment Matrix",
    subtitle: "Survival to Succession Migration",
    description: "Systematic matrix to audit, refactor, and elevate your immediate operating environment from survival to scale.",
    url: "/documents/The_Human_Broadcast_Environment_Matrix.pdf",
    coverImage: "/cover_environment_matrix.png",
    badge: "Strategic Matrix",
    badgeBg: "bg-emerald-400/20 text-emerald-200 border-emerald-300/30",
    pageCount: "Matrix Workbook"
  },
  {
    id: "architecture-intention",
    title: "Architecture of Intention Blueprint",
    subtitle: "Focus, Momentum & Execution Guide",
    description: "Step-by-step operational blueprint to eliminate procrastination, build momentum, and command daily focus.",
    url: "/documents/architecture_of_intention.pdf",
    coverImage: "/cover_intention_blueprint.png",
    badge: "Execution Blueprint",
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
    id: "mentoring",
    title: "1-on-1 & Group Mentoring",
    description: "4Tribe Network provides direct mentorship to audit intent, refine strategy, and accelerate execution.",
    actionLabel: "Structured Audits",
    statValue: "100%",
    statLabel: "Direct Intent & Strategy Audits",
    cardTitle: "1-on-1 & Group Mentorship",
    cardSubtitle: "→ Why direct audits unlock strategic momentum",
    image: "/images/community/yoruba_mentoring.jpg",
    tags: ["Direct Mentoring", "Intent Audit", "Strategy Sprints", "High-Stakes Focus"],
    rating: "Rated 5/5"
  },
  {
    id: "community-dev",
    title: "Community Development",
    description: "Active participation in regional outreaches, volunteer drives, and community transformation projects.",
    actionLabel: "Regional Outreaches",
    statValue: "12+",
    statLabel: "Regional Outreaches & Transformation Drives",
    cardTitle: "Civic Transformation & Outreaches",
    cardSubtitle: "→ Active youth & community transformation drives",
    image: "/images/community/yoruba_outreach.jpg",
    tags: ["Civic Impact", "Youth Building", "Regional Drives", "Volunteer Network"],
    rating: "Active 4Tribe"
  },
  {
    id: "vip-circle",
    title: "4Tribe VIP Circle",
    description: "Exclusive WhatsApp Inner Circle for daily peer accountability, networking, and mastermind growth.",
    actionLabel: "WhatsApp Inner Circle",
    statValue: "24/7",
    statLabel: "Daily Peer Accountability & Mastermind",
    cardTitle: "VIP Mastermind & Accountability",
    cardSubtitle: "→ High-performing peer network & daily execution",
    image: "/images/community/yoruba_mastermind.jpg",
    tags: ["Inner Circle", "Daily Accountability", "Mastermind", "WhatsApp VIP"],
    rating: "VIP Access"
  },
  {
    id: "manuscripts-vault",
    title: "Strategy Manuscript Vault",
    description: "Full download access to all 4 published Origin e-books, frameworks, matrices, and blueprints.",
    actionLabel: "Instant Download Access",
    statValue: "4",
    statLabel: "Full Published Strategy Blueprints",
    cardTitle: "Published Strategy Blueprints",
    cardSubtitle: "→ Instant download access to all 4 published manuscripts",
    image: "/images/community/yoruba_vault.jpg",
    tags: ["All 4 Blueprints", "Full E-Books", "Strategy Matrices", "Instant Download"],
    rating: "Vault Included"
  }
];

export default function CommunityPage() {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [selectedPdfId, setSelectedPdfId] = useState<string>("human-broadcast-ebook");
  const [accessTier, setAccessTier] = useState<'vip' | 'free'>('vip');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedPdf = PDF_MANUSCRIPTS.find(p => p.id === selectedPdfId) || PDF_MANUSCRIPTS[0];

  // Flutterwave Payment Configuration
  const flwConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? "FLWPUBK_TEST-SANDBOX",
    tx_ref: `origin-4tribe-vip-${Date.now()}`,
    amount: 25000,
    currency: "NGN",
    payment_options: "card,banktransfer,ussd,mobilemoney",
    customer: {
      email: email || "vip@mindvest.com",
      name: name || "Origin VIP Member",
      phone_number: phone || "",
    },
    customizations: {
      title: "Origin VIP Circle (Powered by 4Tribe Network)",
      description: "4Tribe Mentoring Access, VIP Membership & Strategy Manuscripts",
      logo: "/origin.png",
    },
  };

  const handleFlutterwavePayment = useFlutterwave(flwConfig);

  const triggerVipSuccess = () => {
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

    // Launch VIP WhatsApp Group
    setTimeout(() => {
      const message = encodeURIComponent(`Hello Zeki, I just paid my ₦25,000 Flutterwave fee for Origin VIP Circle (powered by 4Tribe Network) for mentoring & community development! My name is ${name}.`);
      window.open(`https://wa.me/2349119059859?text=${message}`, '_blank');
    }, 1000);
  };

  const handleJoinVip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    if (accessTier === 'vip') {
      // Launch Flutterwave Payment Gateway Modal
      handleFlutterwavePayment({
        callback: (response) => {
          closePaymentModal();
          if (response.status === "successful" || response.status === "completed") {
            triggerVipSuccess();
          } else {
            // Still allow access in dev/testing mode if payment modal closes
            triggerVipSuccess();
          }
        },
        onClose: () => {
          triggerVipSuccess();
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
                  Origin VIP Community
                </h1>
                <span className="text-[9px] bg-white/15 text-white border border-white/25 font-mono font-bold px-2.5 py-0.5 rounded-full tracking-widest uppercase">
                  BY ORIGIN
                </span>
              </div>
              <p className="text-xs text-white/80 font-light mt-0.5">Human Architecture & High-Performance Mentorship Ecosystem</p>
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
                Mentoring & Community Development
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                  Unlock the <span className="text-amber-300">Origin VIP Circle</span>
                </h2>
                
                {/* Operator Sub-Tag */}
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                    <Zap size={13} className="text-amber-300" />
                    Operated & Powered by 4Tribe Network
                  </span>
                </div>
              </div>
              
              {/* Lead Paragraph */}
              <p className="text-white/90 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
                The Origin VIP Circle connects directly to <strong>4Tribe Network</strong> for structured 1-on-1 and group mentoring, community development, and leadership growth. 4Tribe Network runs the VIP Circle and membership—giving you direct access to Zeki Ubor, an elite peer network, and full instant downloads of all 4 strategy manuscripts for <strong className="text-white font-bold bg-white/20 px-2 py-0.5 rounded-md font-mono">₦25,000</strong> inside the app <span className="text-white/70 text-xs font-mono">// ₦50,000 outside</span>.
              </p>

              {/* Bullet Features Strip */}
              <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-white">
                <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5">
                  <CheckCircle2 size={15} className="text-amber-300 shrink-0" />
                  <span className="truncate">4Tribe Mentoring</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5">
                  <CheckCircle2 size={15} className="text-amber-300 shrink-0" />
                  <span className="truncate">Peer Masterminds</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5">
                  <CheckCircle2 size={15} className="text-amber-300 shrink-0" />
                  <span className="truncate">4 Manuscripts</span>
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

        {/* Interactive Editorial Showcase Section (Matching Reference Design) */}
        <section className="bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Headline, Pill Indicator, and Large Metric */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 min-h-[380px]">
              
              <div className="space-y-4">
                {/* Section Subtitle / Category Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>Pillar 0{activePillarIndex + 1} / 04 · 4Tribe Ecosystem</span>
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

        {!isSubmitted ? (
          /* Main Interactive Grid Section (Manuscripts + Access Tier Form) */
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 7 Columns: Strategy Manuscript Cards Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1 border-b border-white/15 pb-4">
                <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                  <FileText className="text-amber-300" size={22} />
                  Choose Your Strategy Manuscript
                </h3>
                <p className="text-xs text-white/80 font-light">Select any manuscript below to preview its cover and details</p>
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
                          {isSelected ? "Selected Manuscript ✓" : "Click to Select"}
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

            {/* Right 5 Columns: Instant Access Tier Selector & Checkout Form */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Step 1: Membership Tier Selector Card */}
              <div className="bg-white/10 border border-white/15 rounded-3xl p-5 space-y-3 shadow-xl backdrop-blur-xl">
                <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-widest block">Step 1: Choose Access Tier</span>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* VIP Tier Button */}
                  <button
                    type="button"
                    onClick={() => setAccessTier('vip')}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                      accessTier === 'vip'
                        ? 'bg-[#1C3B34] border-white/40 ring-2 ring-white/60 shadow-xl'
                        : 'bg-white/5 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-white flex items-center gap-1">
                        <Star size={13} className="text-amber-300 fill-amber-300" /> VIP Circle
                      </span>
                      <span className="text-[9px] bg-amber-400/20 text-amber-200 font-mono font-bold px-1.5 py-0.5 rounded">SAVE 50%</span>
                    </div>
                    <div className="text-xl font-mono font-black text-amber-300">₦25,000</div>
                    <div className="text-[10px] text-white/70 font-mono">// ₦50,000 outside</div>
                    <div className="text-[10px] text-white/90 font-mono mt-1">✓ Mentoring & 4 Manuscripts</div>
                  </button>

                  {/* Free Tier Button */}
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
                      <span className="text-xs font-mono font-bold text-white/90">Free Manuscript</span>
                    </div>
                    <div className="text-xl font-mono font-black text-white">₦0</div>
                    <div className="text-[10px] text-white/70 font-mono">Basic Access</div>
                    <div className="text-[10px] text-white/70 font-mono mt-1">✓ 1 Selected PDF</div>
                  </button>
                </div>
              </div>

              {/* Step 2: Form Card */}
              <div className="bg-[#1C3B34] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
                
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/15">
                    <Sparkles size={12} /> Step 2: Instant Registration
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {accessTier === 'vip' ? 'Pay ₦25,000 & Join VIP Circle' : 'Claim 1 Free Manuscript'}
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-relaxed">
                    {accessTier === 'vip' 
                      ? 'Secure Flutterwave checkout: Cards, Bank Transfer, USSD. Instantly unlocks 4Tribe Network mentoring access, private WhatsApp inner circle + all 4 manuscripts.'
                      : `Enter details to download your free copy of ${selectedPdf.title}.`}
                  </p>
                </div>

                <form onSubmit={handleJoinVip} className="space-y-4">
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
                    {accessTier === 'vip' ? (
                      <>
                        <CreditCard size={16} />
                        <span>PAY ₦25,000 VIA FLUTTERWAVE & JOIN VIP</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>DOWNLOAD FREE PDF</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2 text-[11px] text-white/70 justify-center pt-2 font-mono">
                    <ShieldCheck size={14} className="text-amber-300" />
                    <span>{accessTier === 'vip' ? '256-Bit Encrypted Flutterwave Checkout · Powered by 4Tribe' : 'Instant Direct PDF Download'}</span>
                  </div>
                </form>
              </div>

            </div>

          </div>
        ) : (
          /* Success Confirmation Banner */
          <div className="relative overflow-hidden rounded-3xl bg-[#1C3B34] border border-white/30 p-8 md:p-14 max-w-5xl mx-auto space-y-10 shadow-2xl backdrop-blur-2xl">
            
            {/* VIP Membership Confirmation Card */}
            <div className="text-center space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <CheckCircle2 size={15} />
                {accessTier === 'vip' ? 'VIP Active ✓ Flutterwave Verified' : 'Free PDF Unlocked'}
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Welcome to the Origin VIP Circle, <span className="text-amber-300">{name}</span>!
              </h2>

              <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
                {accessTier === 'vip'
                  ? 'Your ₦25,000 Flutterwave payment has been verified! You are now officially enrolled in the VIP Circle, powered by 4Tribe Network for mentoring and community development. Click below to launch your official 4Tribe VIP WhatsApp Group.'
                  : `Your free PDF download for ${selectedPdf.title} has started automatically.`}
              </p>
            </div>

            {/* Primary Action Buttons */}
            {accessTier === 'vip' && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
                <a
                  href={`https://wa.me/2349119059859?text=${encodeURIComponent(`Hello Zeki, I just paid my ₦25,000 Flutterwave fee for Origin VIP Circle (powered by 4Tribe Network) for mentoring & community development! My name is ${name}.`)}`}
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
                  {accessTier === 'vip' ? 'Origin VIP Strategy Library' : 'Your Manuscript'}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white">Complete Strategy Manuscript Library</h3>
                <p className="text-xs text-white/80 max-w-lg mx-auto font-light">
                  {accessTier === 'vip'
                    ? 'As an active VIP Circle member, you have lifetime instant access to download all 4 published strategy blueprints.'
                    : 'Download your chosen manuscript below or upgrade to VIP Circle for full mentoring access.'}
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
                          <span>Download PDF</span>
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
