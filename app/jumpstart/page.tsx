"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Users, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Zap, 
  MessageCircle,
  FileText,
  Lock,
  Layers,
  ChevronDown,
  Compass,
  Target,
  Brain,
  Shield,
  HelpCircle,
  Flame,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { getProductById } from "../data/store-products";

export default function JumpstartPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeUnit, setActiveUnit] = useState<number>(0);

  const product = getProductById(17);

  const handleInstantCheckout = () => {
    setIsProcessing(true);
    addToCart({
      id: `store-${product?.id || 17}`,
      title: product?.name || "JUMPSTART: 2-Day Live Intensive Accelerator",
      description: product?.description || "An intensive 2-Day Live Transformational Accelerator.",
      priceUSD: product?.price || 10.00,
      priceNGN: 15000,
      imageUrl: "/images/covers/jumpstart_cover_v2.jpg",
    } as any);
    showToast("JUMPSTART Ticket added! Proceeding to checkout...", "success");
    router.push("/checkout");
  };

  const spectrumUnits = [
    { 
      num: "01", 
      name: "Perception", 
      role: "The Lens of Reality", 
      desc: "Rewire your default baseline to identify leverage and high-value opportunities where others see obstacles and lack.",
      icon: Brain,
      keyShift: "From reacting to constraints → To detecting invisible leverage and commercial utility.",
      application: "Cognitive re-anchoring exercise, scarcity audit, and perceptual framework mapping."
    },
    { 
      num: "02", 
      name: "Usefulness", 
      role: "The Engine of Impact", 
      desc: "Transform raw gifts into deployed, high-impact market utility that the commercial marketplace cannot ignore.",
      icon: Zap,
      keyShift: "From hoarders of theoretical potential → To practitioners of high-demand utility.",
      application: "Utility audit matrix, asset deployment schedule, and marketplace positioning."
    },
    { 
      num: "03", 
      name: "Boundaries", 
      role: "Architecture of Preservation", 
      desc: "Erect impenetrable focus perimeters to protect your internal ecosystem, time, and creative energy from distraction.",
      icon: Shield,
      keyShift: "From porous availability → To strategic sovereign focus perimeters.",
      application: "Time containment architecture, relational audit, and perimeter rules."
    },
    { 
      num: "04", 
      name: "Consent", 
      role: "Mastery of Agreement", 
      desc: "Absolute ownership of your 'Yes' and 'No' to eliminate misaligned commitments and energetic friction.",
      icon: Target,
      keyShift: "From people-pleasing default → To deliberate, high-leverage covenant selection.",
      application: "Agreement audit protocol, friction elimination, and clear contract standards."
    },
    { 
      num: "05", 
      name: "Value", 
      role: "Currency of Significance", 
      desc: "Align your personal standards and output to command premium authority, high-yield results, and influence.",
      icon: Award,
      keyShift: "From underpricing output → To commanding premium authority and lasting significance.",
      application: "Value equation formula, premium delivery benchmarks, and pricing alignment."
    },
    { 
      num: "06", 
      name: "Self-Mastery", 
      role: "The Ultimate Governance", 
      desc: "Master your internal emotional state to dictate and command the terms of your external reality.",
      icon: Compass,
      keyShift: "From emotional reactivity → To internal sovereign governance under pressure.",
      application: "State-control protocols, trigger neutralization, and daily sovereignty routine."
    }
  ];

  const deliverables = [
    {
      title: "The Human Broadcast: Environment Matrix",
      type: "Diagnostic Blueprint",
      format: "PDF Framework",
      desc: "Comprehensive diagnostic framework for mastering external environments, inputs, and information flows.",
      image: "/cover_environment_matrix.png",
      icon: FileText
    },
    {
      title: "Architecture of Intention Blueprint",
      type: "Strategic Execution Guide",
      format: "PDF Blueprint",
      desc: "Step-by-step master plan to organize daily cognitive focus, high-leverage priorities, and sovereign output.",
      image: "/cover_intention_blueprint.png",
      icon: Layers
    },
    {
      title: "Habit Building & Routine System",
      type: "Tactical Workbook",
      format: "10-Page PDF Guide",
      desc: "Concrete blueprints to anchor the 6 spectrum units into irreversible daily cognitive rituals.",
      image: "/images/covers/course_adaptability.jpg",
      icon: Zap
    },
    {
      title: "Communication Mastery Guide",
      type: "Value Articulation Guide",
      format: "10-Page PDF Guide",
      desc: "Frameworks for articulating high-leverage value, setting impenetrable boundaries, and leading agreements.",
      image: "/images/covers/course_communication.jpg",
      icon: Brain
    },
    {
      title: "21-Day Private WhatsApp Cohort",
      type: "Cohort Accountability",
      format: "Daily Sprint & Audio Notes",
      desc: "Direct daily prompts, active peer audits, voice note breakdowns, and live accountability check-ins.",
      image: "/whatsapp-banner.jpg",
      icon: MessageCircle
    }
  ];

  const faqs = [
    {
      q: "What are the exact dates and times for the live accelerator?",
      a: "The accelerator takes place over one intensive weekend with two live virtual sessions: Day 1 on Saturday at 5:00 PM WAT and Day 2 on Sunday at 5:00 PM WAT via Google Meet. Both sessions are interactive with live Q&A."
    },
    {
      q: "What happens during the 21-Day WhatsApp transformation sprint?",
      a: "Immediately following Day 2, all participants enter the private 21-Day WhatsApp Cohort. Every morning, you receive targeted cognitive prompts and application challenges from Zeki Ubor. You submit reflections, complete peer reviews, and receive direct mentor guidance to anchor the shifts permanently."
    },
    {
      q: "What if I cannot attend one of the live weekend sessions?",
      a: "All enrolled participants receive full lifetime access to high-definition video recordings and audio summaries of both Day 1 and Day 2 within hours of each session concluding."
    },
    {
      q: "Can I pay in Nigerian Naira (NGN) or USD?",
      a: "Yes! Our secure checkout supports instant payments via Debit Card, Bank Transfer, Apple Pay, and USD card payments. You will be redirected instantly to the private cohort onboarding page upon payment confirmation."
    },
    {
      q: "Who is this accelerator specifically designed for?",
      a: "JUMPSTART is engineered for working professionals, founders, creatives, consultants, and leaders who feel constrained by survival-mode living, over-commitment, and undervalued potential, and are ready to step into high-leverage authority and personal mastery."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white selection:bg-white selection:text-[#8A948B] font-sans antialiased relative overflow-hidden">
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Pattern (Matching Home Page) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 30, 0],
            y: [0, -25, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-white/15 blur-[180px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -35, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[550px] h-[550px] bg-amber-100/15 blur-[160px] rounded-full"
        />
        {/* Sleek Dot Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      {/* Top Broadcast Notification Bar */}
      <div className="relative z-20 mt-20 sm:mt-24 bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-2.5 text-center text-xs font-mono tracking-wide text-white flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
        </span>
        <span>🌐 <strong>VIRTUAL (WORLDWIDE)</strong> &amp; 🏛️ <strong>ONSITE (REGIONAL HUBS)</strong> // <strong>EARLY BIRD PASS: ₦15,000 ($10)</strong> // ATTEND FROM ANY LOCATION</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 relative z-10 space-y-16 sm:space-y-24">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-mono font-bold text-white uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>THE BECOMING INSTITUTE // 2-DAY ACCELERATOR (HYBRID)</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.08] font-normal"
            >
              WAKE UP. SHAKE UP.
              <span className="block text-2xl sm:text-4xl lg:text-5xl font-sans font-extrabold italic text-amber-200 mt-2">
                From Meager to Mega.
              </span>
              <span className="block text-base sm:text-lg font-mono font-bold text-amber-300 uppercase tracking-widest mt-1">
                Make the shift.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-white/85 font-light leading-relaxed max-w-2xl"
            >
              JUMPSTART is an intensive 2-Day Live Accelerator and 21-Day Daily Cognitive Transformation. Available in dual-mode: join live **virtually from any location worldwide** or attend **onsite at our regional hubs**.
            </motion.p>

            {/* Event Specs Box (Virtual & Onsite Dual-Mode) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-white/15 text-amber-300 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>Upcoming Weekend Cohort</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-white/15 text-amber-300 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Live @ 5:00 PM WAT</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[10px] text-blue-200 uppercase">🌐 Virtual Attendance:</strong>
                  <span className="text-[11px] text-white/80">GoogleMeet Live Stream (Join from Anywhere)</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[10px] text-emerald-200 uppercase">🏛️ Onsite Attendance:</strong>
                  <span className="text-[11px] text-white/80">Regional Hubs (Abuja &amp; Lagos)</span>
                </div>
              </div>
            </motion.div>

            {/* Pricing & Checkout Block (High Contrast Editorial Surface) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 sm:p-7 rounded-3xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-2xl space-y-4"
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#1C3B34] uppercase tracking-widest font-bold block">EARLY BIRD TUITION</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-[#172217] font-mono">₦15,000</span>
                    <span className="text-sm text-[#4F6352] font-mono font-medium">/ $10 USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#6A7B6D] line-through block">Standard: ₦67,500</span>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#1C3B34] text-white text-[10px] font-mono font-bold uppercase tracking-wider mt-1">
                    SAVE 78% TODAY
                  </span>
                </div>
              </div>

              {/* Singular Blue Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleInstantCheckout}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? "PROCESSING SECURE CHECKOUT..." : "SECURE YOUR ₦15,000 TICKET (VIRTUAL / ONSITE) →"}
              </motion.button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-[#4F6352] pt-1">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#1C3B34]" /> Virtual &amp; Onsite Access</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-[#1C3B34]" /> 100% Secure Payment</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-[#1C3B34]" /> Immediate WhatsApp Link</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Generated Frosted Image Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-white/30 group bg-black/20"
            >
              <Image
                src="/images/covers/jumpstart_cover_v2.jpg"
                alt="JUMPSTART 2-Day Live Intensive Accelerator — The 6 Spectrum Units"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              
              {/* Bottom Frosted Glass Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-xs font-mono text-white shadow-xl">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Led by Zeki Ubor
                  </p>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] uppercase font-bold text-amber-200">
                    Virtual &amp; Onsite Hybrid
                  </span>
                </div>
                <p className="text-[11px] text-white/80 leading-tight">
                  2-Day Live Interactive Sessions + 21-Day Daily Cognitive Migration Sprint.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. THE PARADIGM SHIFT: SURVIVAL VS SUCCESSION */}
        {/* ========================================================================= */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 sm:p-10 lg:p-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>THE COGNITIVE MIGRATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
              Why Jumpstart? The Shift From <span className="italic text-amber-200">Survival to Succession</span>
            </h2>
            <p className="text-white/80 text-sm sm:text-base mt-2 font-light">
              Most people operate in survival mode — reactive, underpriced, and exhausted. Jumpstart engineers your transition into succession: sovereign authority, protected focus, and compounding legacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Survival Baseline */}
            <div className="p-6 sm:p-8 rounded-2xl bg-black/20 border border-white/10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-200 font-mono text-xs font-bold uppercase">
                THE SURVIVAL BASELINE (DEFAULT)
              </div>
              <ul className="space-y-3 text-sm text-white/80 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-300 font-mono font-bold shrink-0">✕</span>
                  <span><strong>Perceptual Scarcity:</strong> Fixated on lack and immediate obstacles rather than spotting high-leverage opportunity.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-300 font-mono font-bold shrink-0">✕</span>
                  <span><strong>Theoretical Hoarding:</strong> Accumulating knowledge without deploying undeniable, high-demand market utility.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-300 font-mono font-bold shrink-0">✕</span>
                  <span><strong>Porous Boundaries:</strong> Constantly reacting to external demands, losing time, creative stamina, and emotional energy.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-300 font-mono font-bold shrink-0">✕</span>
                  <span><strong>Misaligned Agreements:</strong> Saying 'Yes' to low-yield commitments out of obligation and fear.</span>
                </li>
              </ul>
            </div>

            {/* The Succession Realm */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3B34] text-white font-mono text-xs font-bold uppercase">
                THE REALM OF SUCCESSION (JUMPSTART)
              </div>
              <ul className="space-y-3 text-sm text-[#27382B]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1C3B34] shrink-0 mt-0.5 font-bold" />
                  <span><strong>Perceptual Sovereignty:</strong> Rewiring the cognitive baseline to spot invisible leverage where others see chaos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1C3B34] shrink-0 mt-0.5 font-bold" />
                  <span><strong>Marketplace Utility:</strong> Converting raw intellect into deployed assets that command high-yield commercial value.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1C3B34] shrink-0 mt-0.5 font-bold" />
                  <span><strong>Impenetrable Focus Perimeters:</strong> Guarding your mental ecosystem so your highest creative energy is protected.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1C3B34] shrink-0 mt-0.5 font-bold" />
                  <span><strong>Commanded Worth:</strong> Aligning personal standards and emotional governance to dictate external outcomes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. 2-DAY LIVE ACCELERATOR SCHEDULE */}
        {/* ========================================================================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>INTENSIVE AGENDA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
              2-Day Live Accelerator Schedule
            </h2>
            <p className="text-white/80 text-sm mt-2 font-light">Two intensive evening sessions designed for irreversible personal and strategic shift.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Day 1 Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4 hover:bg-white/15 transition-all shadow-lg">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white font-mono text-xs font-bold">
                  DAY 1 // SATURDAY @ 5:00 PM WAT
                </div>
                <span className="text-xs font-mono text-amber-200 font-bold">LIVE ON GOOGLE MEET</span>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-white">Wake Up. Shake Up. From Meager to Mega — Make the Shift</h3>
              
              <p className="text-sm text-white/85 leading-relaxed font-light">
                Deep-dive into <strong>Units 1 &amp; 2 (Perception &amp; Usefulness)</strong>. Dismantling default programming of lack and fear, re-engineering your cognitive lens to spot leverage, and converting raw potential into high-impact market utility.
              </p>

              <div className="pt-3 border-t border-white/15 space-y-2">
                <div className="text-xs font-mono text-amber-200 font-bold uppercase">Key Highlights:</div>
                <ul className="text-xs text-white/80 space-y-1.5 font-light">
                  <li>• Deconstructing subconscious scarcity baselines &amp; fear loops</li>
                  <li>• Spotting asymmetric leverage in your existing skills and network</li>
                  <li>• Deploying undeniable commercial usefulness that commands respect</li>
                </ul>
              </div>
            </div>

            {/* Day 2 Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4 hover:bg-white/15 transition-all shadow-lg">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white font-mono text-xs font-bold">
                  DAY 2 // SUNDAY @ 5:00 PM WAT
                </div>
                <span className="text-xs font-mono text-amber-200 font-bold">LIVE ON GOOGLE MEET</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white">The Architecture of Execution</h3>
              
              <p className="text-sm text-white/85 leading-relaxed font-light">
                Mastering <strong>Units 3, 4, 5 &amp; 6 (Boundaries, Consent, Value &amp; Self-Mastery)</strong>. Erecting impenetrable focus perimeters, mastering high-leverage agreements, commanding premium worth, and achieving emotional governance.
              </p>

              <div className="pt-3 border-t border-white/15 space-y-2">
                <div className="text-xs font-mono text-amber-200 font-bold uppercase">Key Highlights:</div>
                <ul className="text-xs text-white/80 space-y-1.5 font-light">
                  <li>• Setting sovereign boundaries around your creative focus and calendar</li>
                  <li>• The psychology of ownership: Total control of your 'Yes' and 'No'</li>
                  <li>• Commanding premium market pricing and unshakeable emotional mastery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. THE 21-DAY COGNITIVE TRANSFORMATION SPRINT */}
        {/* ========================================================================= */}
        <div className="bg-[#E2E8DE] text-[#172217] rounded-3xl border border-[#D5DDCF] p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C3B34] text-white text-xs font-mono font-bold uppercase">
                <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>POST-ACCELERATOR INTEGRATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#172217]">
                The 21-Day Daily Cognitive Sprint
              </h2>
              <p className="text-[#3A4D3E] text-sm sm:text-base leading-relaxed">
                A 2-day live event ignites the shift; the 21-day private cohort locks it into your subconscious wiring. Every single day following the live accelerator, you will participate in structured daily exercises via our private WhatsApp cohort.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/70 border border-[#CCD6C6]">
                  <span className="text-xs font-mono font-bold text-[#1C3B34] block">01 // DAILY PROMPTS</span>
                  <p className="text-[11px] text-[#4F6352] mt-1">High-leverage cognitive rewiring prompts delivered every morning.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-[#CCD6C6]">
                  <span className="text-xs font-mono font-bold text-[#1C3B34] block">02 // PEER AUDITS</span>
                  <p className="text-[11px] text-[#4F6352] mt-1">Accountability partner check-ins to ensure 100% execution.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-[#CCD6C6]">
                  <span className="text-xs font-mono font-bold text-[#1C3B34] block">03 // VOICE DIRECTIVES</span>
                  <p className="text-[11px] text-[#4F6352] mt-1">Direct insights and voice note breakdowns from Zeki Ubor.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#CCD6C6] shadow-md space-y-4">
              <span className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block">Cohort Access Guaranteed</span>
              <p className="text-xs text-[#4F6352] leading-relaxed">
                When you enroll in JUMPSTART today at the ₦15,000 early bird rate, you receive immediate automatic onboarding into the private WhatsApp cohort room.
              </p>
              <button
                onClick={handleInstantCheckout}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                {isProcessing ? "PROCESSING..." : "JOIN THE 21-DAY SPRINT →"}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. THE 6 SPECTRUM UNITS OF TRANSFORMATION */}
        {/* ========================================================================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-mono font-bold text-white uppercase tracking-widest mb-3">
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>CORE ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
              The 6 Spectrum Units of Transformation
            </h2>
            <p className="text-white/80 text-sm mt-2 font-light">Your fundamental framework for the 2-day accelerator and subsequent 21-day daily prompts.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {spectrumUnits.map((u, i) => {
              const IconComp = u.icon;
              return (
                <div 
                  key={i} 
                  className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all space-y-3 flex flex-col justify-between shadow-sm group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-200">{u.num} // UNIT</span>
                      <div className="p-2 rounded-xl bg-white/10 text-amber-300 group-hover:rotate-6 transition-transform">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-white">{u.name}</h4>
                      <p className="text-xs font-mono text-white/70 uppercase tracking-wider">{u.role}</p>
                    </div>
                    <p className="text-xs text-white/85 leading-relaxed font-light">{u.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-white/15 text-[11px] text-white/75 space-y-1">
                    <p className="font-mono text-amber-200/90 font-bold">Shift:</p>
                    <p className="italic">{u.keyShift}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. INCLUDED DELIVERABLES & RESOURCE PACK */}
        {/* ========================================================================= */}
        <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider block mb-1">INCLUDED DELIVERABLES</span>
            <h3 className="text-3xl font-serif text-white font-normal">Your Complete Accelerator Resource Pack</h3>
            <p className="text-sm text-white/80 mt-1 font-light">All materials and blueprint documents are unlocked inside your portal immediately upon registration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliverables.map((item, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/15 hover:border-amber-200/40 transition-all flex items-start gap-3.5 group shadow-md"
              >
                {/* Compact Miniature PDF Thumbnail */}
                <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-black/50 shadow-sm border border-white/15">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>

                {/* Content Body */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-white/15 text-[9px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                      {item.type}
                    </span>
                    <span className="text-[10px] font-mono text-white/60">
                      {item.format}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-white leading-snug group-hover:text-amber-200 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-white/75 font-light leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-[10px] font-mono text-amber-200 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-amber-300" />
                    <span>Included with Tuition</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7. INSTRUCTOR SPOTLIGHT */}
        {/* ========================================================================= */}
        <div className="bg-[#E2E8DE] text-[#172217] rounded-3xl border border-[#D5DDCF] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C3B34] text-white text-xs font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>FACILITATOR SPOTLIGHT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#172217]">
                Led by Zeki Ubor
              </h2>
              <p className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                Founder, The Becoming Institute &amp; Origin // Author of Money Farming &amp; Architecture of Intention
              </p>
              <p className="text-sm text-[#3A4D3E] leading-relaxed">
                Zeki Ubor is a human architect, author, and educator whose work focuses on cognitive restructuring, economic principles, and decision architecture for ambitious minds across Africa and the globe. Through The Becoming Institute, Zeki has engineered transformational curriculums that shift thousands of individuals from survival-based living to high-value authority.
              </p>
            </div>
            <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#CCD6C6] text-center space-y-3">
              <div className="text-3xl font-extrabold font-mono text-[#172217]">10,000+</div>
              <p className="text-xs text-[#4F6352] font-mono uppercase">Minds Impacted Through Becoming Frameworks</p>
              <div className="pt-2 border-t border-[#CCD6C6] flex justify-center">
                <span className="inline-block px-3 py-1 rounded-full bg-[#E2E8DE] text-[11px] font-mono font-bold text-[#1C3B34]">
                  High-Touch Cohort Mentorship
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 8. FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================================= */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-widest">CLARITY &amp; DETAILS</span>
            <h2 className="text-3xl font-serif text-white font-normal">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-300 shrink-0 transition-transform duration-300 ${activeFaq === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-xs text-white/80 leading-relaxed font-light border-t border-white/10 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 9. FINAL CALL TO ACTION STRIP */}
        {/* ========================================================================= */}
        <div className="text-center py-10 sm:py-16 space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-xs font-mono font-bold text-white uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>FINAL COHORT INTAKE CALL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white leading-tight">
            Ready to Make Your <span className="italic text-amber-200">Mega Shift?</span>
          </h2>
          
          <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Take immediate action. Register now at the early bird rate of ₦15,000 ($10 USD) and join the private cohort.
          </p>

          {/* Singular Blue CTA Button */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleInstantCheckout}
              disabled={isProcessing}
              className="py-4 px-10 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-sm sm:text-base uppercase tracking-wider transition-all shadow-2xl shadow-blue-900/40 inline-flex items-center gap-2 cursor-pointer"
            >
              {isProcessing ? "PROCESSING..." : "REGISTER FOR JUMPSTART NOW (₦15,000) →"}
            </motion.button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/70 pt-2">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-amber-300" /> Instant Access</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-amber-300" /> 100% Encrypted Checkout</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-amber-300" /> 21-Day Private Cohort</span>
          </div>
        </div>

      </div>
    </div>
  );
}
