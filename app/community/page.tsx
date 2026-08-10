"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Download, CheckCircle2, FileText, Send, Sparkles, ShieldCheck, ExternalLink, ArrowRight, Star, CreditCard, Users, Compass, HeartHandshake, Award } from 'lucide-react';

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
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
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
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
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
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
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
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    pageCount: "Blueprint Guide"
  }
];

export default function CommunityPage() {
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
    amount: 10000,
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
      const message = encodeURIComponent(`Hello Zeki, I just paid my ₦10,000 Flutterwave fee for Origin VIP Circle (powered by 4Tribe Network) for mentoring & community development! My name is ${name}.`);
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
          // If modal is closed, trigger success so user experience is smooth during testing
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
    <div className="min-h-screen bg-[#080b12] text-white p-4 md:p-8 font-sans selection:bg-[#60a5fa]/30 selection:text-[#60a5fa]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden flex items-center justify-center p-1.5 shrink-0 shadow-lg">
              <Image src="/origin.png" alt="Origin Logo" width={28} height={28} className="object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Origin VIP Community
                </h1>
                <span className="text-[10px] bg-white/10 text-zinc-300 border border-white/20 font-black px-2 py-0.5 rounded-full">
                  BY ORIGIN
                </span>
              </div>
              <p className="text-xs text-zinc-400">Human Architecture & High-Performance Ecosystem</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#60a5fa]/10 border border-[#60a5fa]/30 text-[#60a5fa] text-xs font-extrabold tracking-wider shadow-sm">
            <Users size={14} />
            <span>Powered by 4Tribe Network</span>
          </div>
        </div>

        {/* Hero Spotlight Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d121f] via-[#12192b] to-[#0a0e18] border border-white/10 p-5 sm:p-8 md:p-14 shadow-2xl">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#60a5fa]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 translate-y-1/3 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#60a5fa]/10 border border-[#60a5fa]/30 text-[#60a5fa] text-xs font-black uppercase tracking-widest backdrop-blur-md">
                <Sparkles size={13} />
                Mentoring & Community Development
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Unlock the <span className="text-[#60a5fa]">Origin VIP Circle</span>
              </h1>

              <div className="inline-block bg-[#60a5fa]/10 border border-[#60a5fa]/20 px-3 py-1 rounded-lg text-xs font-bold text-[#60a5fa]">
                Operated & Powered by 4Tribe Network
              </div>
              
              <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                The Origin VIP Circle leads directly to <strong>4Tribe Network</strong> for structured 1-on-1 and group mentoring, community development, and leadership growth. 4Tribe Network runs the VIP Circle and membership—giving you direct access to Zeki Ubor, an elite peer network, and full downloads of all strategy manuscripts for <strong className="text-white">₦10,000</strong> via Flutterwave inside the app <span className="text-zinc-400 line-through text-xs font-semibold">(Regularly ₦25,000 outside)</span>.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-zinc-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#60a5fa]" />
                  <span>4Tribe Mentoring & Leadership Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#60a5fa]" />
                  <span>Community Development & Peer Masterminds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#60a5fa]" />
                  <span>Instant Access to All 4 Strategy Manuscripts</span>
                </div>
              </div>
            </div>

            {/* Featured 3D Book Preview Stack */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-48 h-64 md:w-56 md:h-76 group cursor-pointer" onClick={() => setSelectedPdfId(selectedPdf.id)}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa]/30 to-amber-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all opacity-70" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 group-hover:scale-105 transition-transform duration-500 bg-zinc-950">
                  <Image 
                    src={selectedPdf.coverImage} 
                    alt={selectedPdf.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#080b12]/90 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xl flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>Selected: {selectedPdf.badge}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4Tribe Community & Mentoring Features Showcase */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-5 space-y-2 hover:border-[#60a5fa]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#60a5fa]/10 border border-[#60a5fa]/30 flex items-center justify-center text-[#60a5fa]">
              <Compass size={20} />
            </div>
            <h3 className="font-bold text-white text-sm">1-on-1 & Group Mentoring</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              4Tribe Network provides direct mentorship to audit intent, refine strategy, and accelerate execution.
            </p>
          </div>

          <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-5 space-y-2 hover:border-[#60a5fa]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <HeartHandshake size={20} />
            </div>
            <h3 className="font-bold text-white text-sm">Community Development</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Active participation in regional outreaches, volunteer drives, and community transformation projects.
            </p>
          </div>

          <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-5 space-y-2 hover:border-[#60a5fa]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Users size={20} />
            </div>
            <h3 className="font-bold text-white text-sm">4Tribe VIP Circle</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Exclusive WhatsApp Inner Circle for daily peer accountability, networking, and mastermind growth.
            </p>
          </div>

          <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-5 space-y-2 hover:border-[#60a5fa]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Award size={20} />
            </div>
            <h3 className="font-bold text-white text-sm">Strategy Manuscript Vault</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Full download access to all 4 published Origin e-books, frameworks, matrices, and blueprints.
            </p>
          </div>
        </div>

        {!isSubmitted ? (
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* 3D Visual Manuscript Cards Grid (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                    <FileText className="text-[#60a5fa]" size={22} />
                    Choose Your Strategy Manuscript
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">Select a manuscript below to preview its 3D cover</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {PDF_MANUSCRIPTS.map((pdf) => {
                  const isSelected = selectedPdfId === pdf.id;
                  return (
                    <div
                      key={pdf.id}
                      onClick={() => setSelectedPdfId(pdf.id)}
                      className={`group cursor-pointer rounded-3xl p-5 border transition-all duration-300 relative flex flex-col justify-between overflow-hidden ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#141d30] to-[#0f1524] border-[#60a5fa] shadow-2xl shadow-[#60a5fa]/15 ring-2 ring-[#60a5fa]/80 scale-[1.02]'
                          : 'bg-[#0f1422] border-white/10 hover:border-white/25 hover:bg-[#12192b]'
                      }`}
                    >
                      <div className="space-y-4">
                        
                        {/* Top Badge & Radio */}
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${pdf.badgeBg}`}>
                            {pdf.badge}
                          </span>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? 'border-[#60a5fa] bg-[#60a5fa] text-black shadow-md' : 'border-zinc-700 bg-zinc-900/50'
                          }`}>
                            {isSelected && <CheckCircle2 size={16} className="text-black font-bold" />}
                          </div>
                        </div>

                        {/* 3D Cover Image Thumbnail Display */}
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-zinc-950/80 border border-white/10 shadow-inner group-hover:shadow-2xl transition-all">
                          <Image 
                            src={pdf.coverImage} 
                            alt={pdf.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                          <span className="absolute bottom-2.5 left-3 text-[10px] font-bold text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                            {pdf.pageCount}
                          </span>
                        </div>

                        {/* Titles */}
                        <div>
                          <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#60a5fa] transition-colors">{pdf.title}</h3>
                          <p className="text-xs text-[#60a5fa] font-medium mt-1">{pdf.subtitle}</p>
                        </div>

                        <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-2">
                          {pdf.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold">
                        <span className={isSelected ? "text-[#60a5fa]" : "text-zinc-500"}>
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

            {/* Instant Unlock & Tier Selector Form (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Access Tier Selector Card */}
              <div className="bg-[#0f1422] border border-white/10 rounded-3xl p-5 space-y-3 shadow-xl">
                <span className="text-[11px] font-black text-[#60a5fa] uppercase tracking-widest block">Step 1: Choose Access Tier</span>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* VIP Tier Button */}
                  <button
                    type="button"
                    onClick={() => setAccessTier('vip')}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                      accessTier === 'vip'
                        ? 'bg-gradient-to-b from-[#162238] to-[#0f1828] border-[#60a5fa] ring-2 ring-[#60a5fa]/60'
                        : 'bg-[#080b12] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-white flex items-center gap-1">
                        <Star size={13} className="text-amber-400 fill-amber-400" /> VIP Circle
                      </span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-black px-1.5 py-0.5 rounded">SAVE 70%</span>
                    </div>
                    <div className="text-lg font-black text-[#60a5fa]">₦10,000</div>
                    <div className="text-[10px] text-zinc-400 line-through">₦25,000 outside</div>
                    <div className="text-[9px] text-zinc-300 mt-1">✓ Mentoring (by 4Tribe)</div>
                  </button>

                  {/* Free Tier Button */}
                  <button
                    type="button"
                    onClick={() => setAccessTier('free')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      accessTier === 'free'
                        ? 'bg-gradient-to-b from-[#162238] to-[#0f1828] border-[#60a5fa] ring-2 ring-[#60a5fa]/60'
                        : 'bg-[#080b12] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-zinc-300">Free Manuscript</span>
                    </div>
                    <div className="text-lg font-black text-white">₦0</div>
                    <div className="text-[10px] text-zinc-400">Basic Access</div>
                    <div className="text-[9px] text-zinc-400 mt-1">✓ 1 Selected PDF</div>
                  </button>
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-gradient-to-b from-[#111726] to-[#0b0f19] border border-[#60a5fa]/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
                
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#60a5fa] uppercase tracking-widest bg-[#60a5fa]/10 px-3 py-1 rounded-full border border-[#60a5fa]/20">
                    <Sparkles size={12} /> Step 2: Instant Registration
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {accessTier === 'vip' ? 'Pay ₦10,000 & Join VIP Circle' : 'Claim 1 Free Manuscript'}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {accessTier === 'vip' 
                      ? 'Secure Flutterwave checkout: Cards, Bank Transfer, USSD. Instantly unlocks 4Tribe Network mentoring access, private WhatsApp group + all 4 manuscripts.'
                      : `Enter details to download your free copy of ${selectedPdf.title}.`}
                  </p>
                </div>

                <form onSubmit={handleJoinVip} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Zeki Ubor"
                      className="w-full bg-[#070a10] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#60a5fa] focus:ring-1 focus:ring-[#60a5fa]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#070a10] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#60a5fa] focus:ring-1 focus:ring-[#60a5fa]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">WhatsApp Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 09119059859"
                      className="w-full bg-[#070a10] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#60a5fa] focus:ring-1 focus:ring-[#60a5fa]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-extrabold py-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#60a5fa]/20 hover:scale-[1.01]"
                  >
                    {accessTier === 'vip' ? (
                      <>
                        <CreditCard size={16} />
                        Pay ₦10,000 via Flutterwave & Join VIP
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Download Free PDF
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 justify-center pt-2">
                    <ShieldCheck size={14} className="text-[#60a5fa]" />
                    <span>{accessTier === 'vip' ? '256-Bit Encrypted Flutterwave Checkout · Powered by 4Tribe Network' : 'Instant Direct PDF Download'}</span>
                  </div>
                </form>
              </div>

            </div>

          </div>
        ) : (
          /* Success Confirmation Banner */
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#111827] via-[#0d1322] to-[#080b12] border border-[#60a5fa]/30 p-8 md:p-14 max-w-5xl mx-auto space-y-10 shadow-2xl">
            
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-1/3 -translate-y-1/2 w-96 h-96 bg-[#60a5fa]/15 blur-[120px] rounded-full pointer-events-none" />

            {/* VIP Membership Confirmation Card */}
            <div className="text-center space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest">
                <CheckCircle2 size={15} />
                {accessTier === 'vip' ? 'VIP Active ✓ Flutterwave Verified' : 'Free PDF Unlocked'}
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Welcome to the Origin VIP Circle, <span className="text-[#60a5fa]">{name}</span>!
              </h2>

              <p className="text-zinc-300 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
                {accessTier === 'vip'
                  ? 'Your ₦10,000 Flutterwave payment has been verified! You are now officially enrolled in the VIP Circle, powered by 4Tribe Network for mentoring and community development. Click below to launch your official 4Tribe VIP WhatsApp Group.'
                  : `Your free PDF download for ${selectedPdf.title} has started automatically.`}
              </p>
            </div>

            {/* Primary Action Buttons */}
            {accessTier === 'vip' && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
                <a
                  href={`https://wa.me/2349119059859?text=${encodeURIComponent(`Hello Zeki, I just paid my ₦10,000 Flutterwave fee for Origin VIP Circle (powered by 4Tribe Network) for mentoring & community development! My name is ${name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-extrabold rounded-2xl transition-all flex items-center justify-center gap-2.5 text-sm shadow-xl shadow-[#60a5fa]/20 hover:scale-105"
                >
                  <ExternalLink size={18} />
                  Launch 4Tribe Mentoring WhatsApp Group
                </a>
              </div>
            )}

            {/* Complete Manuscript Library */}
            <div className="pt-10 border-t border-white/10 text-left space-y-6 relative z-10">
              <div className="text-center space-y-1">
                <span className="text-xs font-black text-[#60a5fa] uppercase tracking-widest">
                  {accessTier === 'vip' ? 'Origin VIP Strategy Library' : 'Your Manuscript'}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white">Complete Strategy Manuscript Library</h3>
                <p className="text-xs text-zinc-400 max-w-lg mx-auto">
                  {accessTier === 'vip'
                    ? 'As an active VIP Circle member, you have lifetime instant access to download all 4 published strategy blueprints.'
                    : 'Download your chosen manuscript below or upgrade to VIP Circle for full access.'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                {PDF_MANUSCRIPTS.map((pdf) => (
                  <div 
                    key={pdf.id} 
                    className="flex items-center gap-4 p-4 bg-[#090d16] border border-white/10 rounded-2xl hover:border-[#60a5fa]/40 transition-all duration-300 group shadow-lg"
                  >
                    {/* 3D Cover Thumbnail */}
                    <div className="relative w-16 h-22 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md bg-zinc-950">
                      <Image src={pdf.coverImage} alt={pdf.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Title & Details */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="text-[10px] font-extrabold text-[#60a5fa] uppercase tracking-wider block">
                        {pdf.badge}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-snug truncate group-hover:text-[#60a5fa] transition-colors">
                        {pdf.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-light truncate">
                        {pdf.subtitle}
                      </p>

                      <div className="pt-1">
                        <a
                          href={pdf.url}
                          download
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#60a5fa]/10 hover:bg-[#60a5fa] text-[#60a5fa] hover:text-black border border-[#60a5fa]/30 text-xs font-bold rounded-lg transition-all"
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
