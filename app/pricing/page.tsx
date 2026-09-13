"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Flame,
  Sparkles,
  Star,
  ShieldCheck,
  Clock,
  Zap,
  Award,
  BookOpen,
  TrendingUp,
  Target,
  Brain,
  ChevronDown,
  ChevronUp,
  Lock,
  Coins,
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "foundation",
    badge: "START HERE",
    name: "Foundation Experience",
    description:
      "Economic Principles is the Origin entry course every thinking person should complete first. No fluff. No theory for theory's sake.",
    priceNGN: 15000,
    originalNGN: 21000,
    priceUSD: 10,
    originalUSD: 14,
    isRecommended: false,
    isBestValue: false,
    savings: "₦6,000 saved",
    cta: "BEGIN ECONOMIC PRINCIPLES",
    ctaHref: "/courses/economic-principles",
    includes: [
      "Economic Principles: Money, Choice, Value & Opportunity",
      "6 experiential decision stages",
      "₦100,000 Asymmetric Investment Simulation",
      "Opportunity Cost Decision Grid (PDF)",
      "90-Day Resource Allocation Blueprint",
      "Origin Capstone Challenge",
    ],
    note: "Launch price. Renews at ₦21,000.",
  },
  {
    id: "full",
    badge: "MOST CHOSEN",
    name: "Full Curriculum Access",
    description:
      "Every thinking module Origin offers. Money, decisions, communication, self-image, problem solving, and personal adaptability.",
    priceNGN: 75000,
    originalNGN: 126000,
    priceUSD: 49,
    originalUSD: 84,
    isRecommended: true,
    isBestValue: false,
    savings: "₦51,000 saved",
    cta: "GET ALL 6 EXPERIENCES",
    ctaHref: "/courses/economic-principles",
    includes: [
      "Economic Principles (Flagship Entry Course)",
      "Decision Making: Critical Thinking Under Pressure",
      "Communication Mastery: Clarity & Influence",
      "Strengthening Self-Image & Identity",
      "Problem Solving: The Solution Mindset",
      "Personal Adaptability & Antifragility",
      "All PDFs, workbooks & simulation frameworks",
      "Access to Origin Challenge Arena (all 6 simulations)",
    ],
    note: "One payment. Lifetime access to current content.",
  },
  {
    id: "institute",
    badge: "MAXIMUM LEVERAGE",
    name: "Institute Bundle",
    description:
      "Every Origin course bundled with the curated reading companion library. Designed for serious builders.",
    priceNGN: 110000,
    originalNGN: 180000,
    priceUSD: 79,
    originalUSD: 129,
    isRecommended: false,
    isBestValue: true,
    savings: "₦70,000 saved",
    cta: "GET INSTITUTE BUNDLE",
    ctaHref: "/store",
    includes: [
      "Everything in Full Curriculum Access",
      "Money Farming (Reading Companion)",
      "House of Choice (Reading Companion)",
      "8 Q&A to Selling (Reading Companion)",
      "Origin Life Design Journal (Digital)",
      "Priority access to live events & masterclasses",
      "Fit For Profit Impact Corps membership",
    ],
    note: "For individuals serious about permanent transformation.",
  },
];

const FAQS = [
  {
    q: "Why does the pricing feel simple?",
    a: "Because simple pricing is a sign of trustworthy systems. You should never need to scroll through confusing tier comparisons or wonder what you're getting. Reber et al. documented this: when an offer is hard to process, it feels less valuable before the client evaluates a single thing.",
  },
  {
    q: "What makes Economic Principles the entry course?",
    a: "Everything on Origin connects back to economic thinking: scarcity, opportunity cost, value exchange, and asymmetric leverage. Once you understand how to calculate the true cost of any choice, every other Origin module becomes more powerful.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. If you complete the first module and find it does not deliver practical, actionable insight into how you think about money and decisions, we offer a 7-day full refund. No lengthy forms. No condescension.",
  },
  {
    q: "Can I upgrade later?",
    a: "Absolutely. Start with the Foundation Experience. Your payment is credited at full value toward the Full Curriculum or Institute Bundle whenever you are ready.",
  },
  {
    q: "Is this for beginners or advanced learners?",
    a: "Both. The content is not academic theory — it is applied decision science and economic philosophy. Whether you are 18 or 45, the frameworks will immediately rewire how you calculate value.",
  },
  {
    q: "What is the PRICE15 discount code?",
    a: "Use code PRICE15 at checkout to access the Pricing Psychology Playbook — 29 documented behavioral effects that explain exactly why one price gets a yes and another gets ghosted — for ₦11,250 instead of ₦15,000.",
  },
];

const MARKETING_PRINCIPLES = [
  {
    rule: "01",
    title: "Anchoring & Contrast",
    description:
      "The first price you see becomes the reference point for all others. By showing the original price alongside the launch price, your brain calculates value — not cost. You are not paying ₦15,000. You are receiving ₦21,000 worth of experience at ₦15,000.",
    source: "Tversky & Kahneman (1974)",
  },
  {
    rule: "02",
    title: "The Isolation Effect",
    description:
      "Von Restorff documented this in 1933: the item that stands out from a group is disproportionately more likely to be chosen. The MOST CHOSEN badge and deep forest green of the Full Curriculum tier is not decoration — it is the visual system telling your eye precisely where to look.",
    source: "Von Restorff (1933)",
  },
  {
    rule: "03",
    title: "The Fluency Effect",
    description:
      "Reber et al. (1998): the easier something is to process, the more valuable it feels. One sentence descriptions. Three tiers. Clear inclusions. No asterisks. Simple = trustworthy. Complicated = risky.",
    source: "Reber et al. (1998)",
  },
  {
    rule: "04",
    title: "Loss Aversion Activation",
    description:
      "Kahneman & Tversky: humans feel losses twice as intensely as equivalent gains. The launch price ending note ('Renews at ₦21,000') activates loss aversion — not urgency manipulation, but an accurate signal of a real transition.",
    source: "Kahneman & Tversky (1979)",
  },
];

const STAGES = [
  {
    icon: Coins,
    stage: "STAGE 01",
    title: "Scarcity & The Reality of Limits",
    desc: "The ₦20,000 resource allocation experiment. Real constraints. Real trade-offs. Zero illusion.",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
  {
    icon: Target,
    stage: "STAGE 02",
    title: "Opportunity Cost & The Invisible Price",
    desc: "Calculate what every choice truly costs by measuring what you surrendered.",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
  },
  {
    icon: Sparkles,
    stage: "STAGE 03",
    title: "Value, Perception & Exchange",
    desc: "Why does water outvalue diamonds in a desert? Discover why value lives in the evaluator, not the object.",
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
  },
  {
    icon: TrendingUp,
    stage: "STAGE 04",
    title: "Supply, Demand & Price Mechanics",
    desc: "Read price signals like a nervous system. Anticipate market shifts before the crowd reacts.",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  {
    icon: Brain,
    stage: "STAGE 05",
    title: "Cost-Benefit & Asymmetric Upside",
    desc: "The ₦100,000 Asymmetric Decision Mission. Capped downside. Open-ended upside.",
    color: "text-rose-700",
    bg: "bg-rose-50 border-rose-200",
    featured: true,
  },
  {
    icon: Zap,
    stage: "STAGE 06",
    title: "Resource Optimization & Builder's Plan",
    desc: "Synthesize all 5 principles into your 90-day personal resource allocation architecture.",
    color: "text-[#1C3B34]",
    bg: "bg-[#E2E8DE] border-[#CCD6C6]",
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPrinciples, setShowPrinciples] = useState(false);

  return (
    <main className="min-h-screen bg-[#F4F5F0] text-[#172217] selection:bg-[#1C3B34] selection:text-white overflow-x-hidden">

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-[#F4F5F0]/90 backdrop-blur-md border-b border-[#E0E4DB] py-3.5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-[#D5DDCF] bg-[#E2E8DE] flex items-center justify-center">
              <Image src="/origin.png" alt="Origin" fill sizes="28px" className="object-cover" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-[#172217] font-mono">ORIGIN</span>
          </Link>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1 bg-white border border-[#D5DDCF] rounded-full p-1 shadow-sm shrink-0">
            {(["NGN", "USD"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  currency === c ? "bg-[#1C3B34] text-white shadow-sm" : "text-[#4E5B4B] hover:text-[#172217]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-32 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mx-auto space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C3B34] text-white text-[11px] sm:text-xs font-mono font-bold shadow-sm">
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 animate-pulse shrink-0" />
            <span>ORIGIN CURRICULUM // LAUNCH PRICING</span>
          </div>

          {/* FIX: text-4xl on mobile, scaling up */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-extrabold tracking-tight text-[#172217] leading-none">
            One Price.
            <br />
            <span className="text-[#1C3B34]">No Hidden Cost.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#4E5B4B] font-light leading-relaxed max-w-2xl mx-auto px-2">
            Every Origin experience is priced to reflect its value — not to confuse you into compliance.
            Start with Economic Principles and build from there.
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#1C3B34] font-bold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>7-day satisfaction guarantee on all purchases</span>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURED ENTRY COURSE ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#1C3B34] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-[#142924] shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(226,232,222,0.08)_0%,transparent_60%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Copy */}
            <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-between gap-8">
              <div className="space-y-4">
                {/* FIX: badges wrap on mobile */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                    <Star className="w-3 h-3 fill-current shrink-0" />
                    FLAGSHIP ENTRY COURSE
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 text-[11px] font-mono font-bold uppercase">
                    BESTSELLER
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
                  Economic Principles: Money, Choice, Value &amp; Opportunity
                </h2>

                <p className="text-[#B5C4B0] text-sm leading-relaxed font-light">
                  Origin&apos;s flagship experience. Six active decision stages, ₦100,000 allocation simulations, and the economic thinking frameworks that stop financial leakage permanently.
                </p>

                {/* FIX: single column on mobile, 2-col on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    "Scarcity & The Reality of Limits",
                    "Opportunity Cost & The Invisible Price",
                    "Value, Perception & Exchange",
                    "Supply, Demand & Price Mechanics",
                    "Cost-Benefit & Asymmetric Upside",
                    "Resource Optimization & Builder's Plan",
                  ].map((m) => (
                    <div key={m} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-white/80 font-light leading-snug">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price block */}
              <div className="space-y-4 pt-5 border-t border-white/15">
                <div className="flex items-end gap-3">
                  <div>
                    <div className="text-xs font-mono text-amber-300 uppercase font-bold mb-1">LAUNCH PRICE</div>
                    <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                      {currency === "NGN" ? "₦15,000" : "$10"}
                    </div>
                  </div>
                  <div className="pb-1.5">
                    <div className="text-[#7A9080] line-through text-base sm:text-lg font-mono">
                      {currency === "NGN" ? "₦21,000" : "$14"}
                    </div>
                    <div className="text-xs text-amber-300 font-mono font-bold">
                      {currency === "NGN" ? "₦6,000 saved" : "$4 saved"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/courses/economic-principles"
                    className="flex-1 px-5 py-4 rounded-2xl bg-[#E2E8DE] hover:bg-white text-[#1C3B34] font-mono font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group"
                  >
                    <span>BEGIN ECONOMIC PRINCIPLES</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                  </Link>
                  <Link
                    href="/#origin-challenges"
                    className="px-5 py-4 rounded-2xl border border-white/20 text-white/80 hover:bg-white/10 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Flame className="w-4 h-4 text-amber-300 shrink-0" />
                    TRY A CHALLENGE FIRST
                  </Link>
                </div>

                <p className="text-[11px] text-white/50 font-mono">
                  Renews at ₦21,000 after launch period ends. Upgrade credited at full value.
                </p>
              </div>
            </div>

            {/* Right: Course image — hidden on mobile to keep card compact */}
            <div className="relative hidden lg:block min-h-[460px]">
              <Image
                src="/images/ng_purpose.jpg"
                alt="Economic Principles Course"
                fill
                className="object-cover object-center"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1C3B34]/20 to-[#1C3B34]" />

              {/* Floating stat cards */}
              <div className="absolute bottom-6 right-6 space-y-2">
                <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 text-white shadow-xl">
                  <div className="text-2xl font-extrabold font-mono">4.95</div>
                  <div className="text-xs text-white/70 font-mono">Average rating</div>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 text-white shadow-xl">
                  <div className="text-2xl font-extrabold font-mono">7,890</div>
                  <div className="text-xs text-white/70 font-mono">Enrolled learners</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TIER CARDS ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-[#8A948B] font-bold mb-2">
            OR CHOOSE YOUR SCOPE
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#172217] tracking-tight">
            Pick Your Entry Point
          </h2>
          <p className="text-[#4E5B4B] mt-3 max-w-xl mx-auto text-sm font-light leading-relaxed px-2">
            All paths start with Economic Principles. The only difference is how far you want to go.
          </p>
        </div>

        {/* FIX: removed scale-[1.02] on recommended to prevent mobile overflow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`relative rounded-[2rem] border flex flex-col overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                tier.isRecommended
                  ? "bg-[#1C3B34] border-[#1C3B34] ring-2 ring-[#1C3B34] sm:ring-offset-2 sm:ring-offset-[#F4F5F0]"
                  : "bg-white border-[#E0E4DB]"
              }`}
            >
              {/* Header: Badge + savings */}
              <div className={`px-5 sm:px-6 pt-5 pb-0 flex items-center justify-between gap-2 flex-wrap ${
                tier.isRecommended ? "text-white" : "text-[#172217]"
              }`}>
                <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                  tier.isRecommended
                    ? "bg-amber-400/20 border border-amber-400/30 text-amber-300"
                    : tier.isBestValue
                    ? "bg-[#1C3B34] text-white"
                    : "bg-[#E2E8DE] text-[#1C3B34] border border-[#CCD6C6]"
                }`}>
                  {tier.badge}
                </span>
                {tier.savings && (
                  <span className={`text-[10px] font-mono font-bold shrink-0 ${
                    tier.isRecommended ? "text-emerald-400" : "text-emerald-700"
                  }`}>
                    {tier.savings}
                  </span>
                )}
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-1 gap-4">
                <div>
                  <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight leading-tight ${
                    tier.isRecommended ? "text-white" : "text-[#172217]"
                  }`}>
                    {tier.name}
                  </h3>
                  <p className={`text-xs mt-1.5 leading-relaxed ${
                    tier.isRecommended ? "text-white/70" : "text-[#4E5B4B]"
                  }`}>
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div>
                  <div className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
                    tier.isRecommended ? "text-white" : "text-[#172217]"
                  }`}>
                    {currency === "NGN" ? `₦${tier.priceNGN.toLocaleString()}` : `$${tier.priceUSD}`}
                  </div>
                  <div className={`text-sm line-through mt-0.5 font-mono ${
                    tier.isRecommended ? "text-white/40" : "text-[#9AA89A]"
                  }`}>
                    {currency === "NGN" ? `₦${tier.originalNGN.toLocaleString()}` : `$${tier.originalUSD}`}
                  </div>
                </div>

                {/* Includes */}
                <ul className="space-y-2 flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        tier.isRecommended ? "text-emerald-400" : "text-emerald-700"
                      }`} />
                      <span className={tier.isRecommended ? "text-white/85" : "text-[#3E4A3B]"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="space-y-2 pt-1">
                  <Link
                    href={tier.ctaHref}
                    className={`w-full px-5 py-3.5 rounded-xl font-mono font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer group shadow-sm ${
                      tier.isRecommended
                        ? "bg-[#E2E8DE] hover:bg-white text-[#1C3B34]"
                        : "bg-[#1C3B34] hover:bg-[#142924] text-white"
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0" />
                  </Link>
                  {tier.note && (
                    <p className={`text-[10px] font-mono text-center ${
                      tier.isRecommended ? "text-white/40" : "text-[#8A948B]"
                    }`}>
                      {tier.note}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DISCOUNT CODE CALLOUT ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#172217] rounded-[2rem] p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#1C3B34]/60"
        >
          <div className="space-y-2 text-center sm:text-left w-full sm:w-auto">
            {/* FIX: wraps on small screens */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-amber-300 text-xs font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>SPECIAL OFFER</span>
              <span className="hidden xs:inline">—</span>
              <span>PRICING PSYCHOLOGY PLAYBOOK</span>
            </div>
            <p className="text-white text-sm leading-relaxed font-light">
              29 documented behavioral effects that explain exactly why one price gets a yes and another gets ghosted.
            </p>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="text-2xl font-extrabold text-amber-300 font-mono">
                {currency === "NGN" ? "₦11,250" : "$15"}
              </span>
              <span className="text-white/40 line-through text-base font-mono">
                {currency === "NGN" ? "₦15,000" : "$27"}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="px-6 py-3.5 rounded-2xl bg-amber-400/15 border-2 border-amber-400/40 text-amber-300 font-mono font-extrabold text-xl tracking-widest">
              PRICE15
            </div>
            <p className="text-[11px] text-white/50 font-mono text-center">Use at checkout on any order</p>
            <Link
              href="/store"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#172217] font-mono font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>GET THE PLAYBOOK</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── WHAT'S INSIDE ECONOMIC PRINCIPLES ─────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-[#8A948B] font-bold mb-2">
            THE ENTRY COURSE IN DETAIL
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#172217] tracking-tight">
            What Happens Inside
            <br />
            <span className="text-[#1C3B34]">Economic Principles</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAGES.map((item) => (
            <motion.div
              key={item.stage}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`p-5 sm:p-6 rounded-[1.5rem] border space-y-3 shadow-sm hover:shadow-md transition-all ${item.bg} ${
                item.featured ? "ring-2 ring-[#1C3B34] shadow-lg" : ""
              }`}
            >
              {item.featured && (
                <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#1C3B34] uppercase">
                  <Star className="w-3 h-3 fill-current" />
                  CAPSTONE MISSION
                </div>
              )}
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8A948B] font-bold">
                {item.stage}
              </div>
              <item.icon className={`w-6 h-6 ${item.color}`} />
              <h3 className="text-sm font-extrabold text-[#172217] leading-snug">{item.title}</h3>
              <p className="text-xs text-[#4E5B4B] leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/courses/economic-principles"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#1C3B34] hover:bg-[#142924] text-white font-mono font-bold text-sm transition-all shadow-lg cursor-pointer group"
          >
            <span>START ECONOMIC PRINCIPLES</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
          </Link>
        </div>
      </section>

      {/* ── TRUST SIGNALS ─────────────────────────────────────── */}
      <section className="bg-[#E2E8DE] border-y border-[#CCD6C6] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "7,890+", label: "Enrolled Learners" },
              { value: "4.95", label: "Average Rating" },
              { value: "7-Day", label: "Money-Back Guarantee" },
              { value: "Lifetime", label: "Access After Purchase" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C3B34] font-mono tracking-tight">
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-xs text-[#4E5B4B] font-mono uppercase tracking-wide font-bold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PSYCHOLOGY ────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center mb-6">
          <button
            onClick={() => setShowPrinciples((v) => !v)}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full border border-[#D5DDCF] bg-white hover:bg-[#E2E8DE] text-[#172217] text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-[#1C3B34] shrink-0" />
            <span>WHY THIS PAGE IS DESIGNED THIS WAY</span>
            {showPrinciples ? (
              <ChevronUp className="w-4 h-4 text-[#4E5B4B] shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#4E5B4B] shrink-0" />
            )}
          </button>
          <p className="text-xs text-[#8A948B] font-mono mt-2 px-4">
            29 behavioral principles in the PRICE15 Playbook. Here are 4 at work on this page.
          </p>
        </div>

        <AnimatePresence>
          {showPrinciples && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-6">
                {MARKETING_PRINCIPLES.map((p) => (
                  <div
                    key={p.rule}
                    className="p-5 sm:p-6 rounded-[1.5rem] bg-white border border-[#E0E4DB] space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#8A948B]">
                        RULE {p.rule}
                      </span>
                      <span className="text-[10px] font-mono text-[#8A948B]">{p.source}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-[#172217]">{p.title}</h3>
                    <p className="text-xs text-[#4E5B4B] leading-relaxed font-light">{p.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-[#172217] text-center mb-8 tracking-tight">
          Common Questions
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white border border-[#E0E4DB] rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer gap-4"
              >
                <span className="text-sm font-bold text-[#172217] leading-snug">{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#4E5B4B] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#4E5B4B] shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 text-sm text-[#4E5B4B] leading-relaxed font-light border-t border-[#E0E4DB] pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1C3B34] rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-14 lg:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-[11px] sm:text-xs font-mono font-bold">
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span>ORIGIN // SCHOOL STARTS WITH THE QUESTION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-extrabold text-white tracking-tight leading-tight">
            The thinking
            <br />
            starts here.
          </h2>

          <p className="text-white/75 text-sm sm:text-lg font-light max-w-xl mx-auto leading-relaxed px-2">
            Economic Principles is the entry point for every Origin learning journey. Begin once. Think differently forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/courses/economic-principles"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#E2E8DE] hover:bg-white text-[#1C3B34] font-mono font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer group"
            >
              <span>BEGIN AT ₦15,000</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
            <Link
              href="/#origin-challenges"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-white/25 text-white hover:bg-white/10 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-300 shrink-0" />
              <span>TRY A FREE CHALLENGE FIRST</span>
            </Link>
          </div>

          {/* FIX: wrap on very small screens */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-white/50 pt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> 7-day guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 shrink-0" /> Secure checkout
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" /> Lifetime access
            </span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
