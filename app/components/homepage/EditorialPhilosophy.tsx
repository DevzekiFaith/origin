"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Clock,
  HeartHandshake,
  Lock,
  ArrowRight,
  CheckCircle2,
  Globe,
  Target,
  RefreshCw,
  Building2,
  FileText,
  BarChart3,
  CheckSquare,
  CreditCard,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "How is Origin different from Udemy, Coursera, or YouTube?",
    a: "Conventional platforms sell hours of video to watch passively and multiple-choice quizzes that test memorization. Origin is an active thinking platform: you encounter real-world situations, make high-stakes decisions under resource constraints, reveal the core economic/cognitive principle behind your choice, and apply it immediately to your actual life."
  },
  {
    q: "Is this suitable for teenagers or only working adults?",
    a: "Origin uses simple language to explain sophisticated ideas. A 10-year-old can easily understand the scenarios and trade-offs, while a 45-year-old business executive will find the strategic models deeply valuable. The principles of scarcity, opportunity cost, and decision-making apply at every age."
  },
  {
    q: "Do I get lifetime access to the courses I purchase?",
    a: "Yes. Every foundation you purchase includes unrestricted lifetime access to all interactive experiences, thinking tools, learning companions, and future updates."
  },
  {
    q: "How does the payment process work?",
    a: "We support secure payments in Nigerian Naira (NGN) via Flutterwave (cards, bank transfer, USSD) as well as international cards (USD). Instant access is granted immediately after successful payment."
  },
  {
    q: "Who builds and designs the Origin curriculum?",
    a: "Origin courses are developed by The Becoming Institute in collaboration with multidisciplinary thinkers, economists, strategists, and human architecture specialists."
  }
];

interface TrustItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  metricNumber: string;
  metricLabel: string;
  image: string;
  tags: { icon: React.ElementType; label: string }[];
  rating: string;
  subtitleOverlay: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    id: "self-paced",
    number: "01",
    category: "01 // Flexible Schedule (Ages 10–45)",
    title: "Self-Paced Learning",
    description:
      "Move through experiences and challenges on your schedule, anytime, anywhere. From age 10 to 45, learners progress seamlessly across all devices.",
    metricNumber: "24/7",
    metricLabel: "Schedule & location freedom",
    image: "/outreach_child_hero.png",
    tags: [
      { icon: Globe, label: "Nigerian Youth & Adults" },
      { icon: Clock, label: "24/7 Access" },
      { icon: Target, label: "Mission Based" },
    ],
    rating: "Schedule ★ 100%",
    subtitleOverlay: "Accessible from ages 10 to 45 anytime, anywhere",
  },
  {
    id: "lifetime",
    number: "02",
    category: "02 // Permanent Value",
    title: "Lifetime Access",
    description:
      "One-time payment unlocks permanent access to interactive tools & updates. No recurring subscriptions or hidden paywalls.",
    metricNumber: "100%",
    metricLabel: "Permanent access & future updates",
    image: "/images/guarantee_lifetime.jpg",
    tags: [
      { icon: Lock, label: "Lifetime Unlocked" },
      { icon: RefreshCw, label: "Free Updates" },
      { icon: Building2, label: "Zero Subscriptions" },
    ],
    rating: "Access ★ Lifetime",
    subtitleOverlay: "One-time payment, permanent interactive access",
  },
  {
    id: "frameworks",
    number: "03",
    category: "03 // Actionable Assets",
    title: "Practical Frameworks",
    description:
      "Every foundation provides downloadable blueprints, thinking tools, and checklists designed for direct real-world application.",
    metricNumber: "10+",
    metricLabel: "Downloadable blueprints & tools",
    image: "/images/guarantee_frameworks.jpg",
    tags: [
      { icon: FileText, label: "Blueprints" },
      { icon: BarChart3, label: "Worksheets" },
      { icon: CheckSquare, label: "Checklists" },
    ],
    rating: "Tools ★ Verified",
    subtitleOverlay: "Downloadable blueprints, worksheets & checklists",
  },
  {
    id: "security",
    number: "04",
    category: "04 // Instant Activation",
    title: "Secure Payments",
    description:
      "Encrypted instant checkout via Flutterwave cards, bank transfer & USSD, as well as international cards in NGN or USD.",
    metricNumber: "256-bit",
    metricLabel: "Encrypted Flutterwave checkout",
    image: "/images/guarantee_security.jpg",
    tags: [
      { icon: CreditCard, label: "Cards & Transfers" },
      { icon: Globe, label: "NGN & USD" },
      { icon: Zap, label: "Instant Access" },
    ],
    rating: "Security ★ 256-Bit",
    subtitleOverlay: "Encrypted instant checkout via cards, transfers & USSD",
  },
];

export default function EditorialPhilosophy() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTrustIndex, setActiveTrustIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance trust items every 6 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTrustIndex((prev) => (prev + 1) % TRUST_ITEMS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentTrust = TRUST_ITEMS[activeTrustIndex];

  return (
    <section className="py-24 sm:py-36 bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white border-b border-white/15 relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.45, 0.2],
            x: [0, 35, 0],
            y: [0, -25, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[650px] h-[650px] bg-white/15 blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Core Manifesto Block */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-14 md:p-20 rounded-[2.5rem] bg-[#E2E8DE] border border-[#D5DDCF] text-[#172217] text-center mb-20 shadow-2xl relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#CCD6C6] text-[#3E4A3B] font-mono text-xs mb-6 shadow-xs font-bold">
            <div className="w-3.5 h-3.5 shrink-0">
              <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="128" height="128" rx="30" fill="#22C55E" />
                <circle cx="64" cy="64" r="34" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="uppercase tracking-wider">The Origin Manifesto</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight text-[#172217] leading-tight mb-8">
            BUILD THE PERSON BEHIND THE SUCCESS.
          </h2>

          <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-2xl text-[#4E5B4B] font-light leading-relaxed">
            <p>
              Most education teaches you what to think. Origin teaches you <strong className="font-bold text-[#172217]">how to think</strong>.
            </p>
            <p>
              When markets shift, plans break, or unexpected opportunities arrive, no textbook formula will save you. What matters is your internal architecture: your ability to recognise trade-offs, manage risk, evaluate value, and act with clarity under constraint.
            </p>
            <p className="text-[#1C3B34] font-bold font-mono text-base sm:text-xl pt-2 uppercase tracking-wider">
              UNDERSTAND MORE. THINK BETTER. BECOME MORE CAPABLE.
            </p>
          </div>
        </motion.div>

        {/* Commercial Trust & Guarantee Showcase Container */}
        <div className="mb-24">
          <div
            className="bg-[#E2E8DE] rounded-[2.5rem] border border-[#D5DDCF] text-[#172217] shadow-2xl p-6 sm:p-10 lg:p-14 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Header Bar: Eyebrow Badge & Step Category Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#D0D9CA]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 border border-[#CCD6C6] rounded-full text-xs font-mono text-[#3E4A3B] shadow-2xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1C3B34] animate-pulse" />
                <span className="uppercase tracking-wider font-semibold">PLATFORM GUARANTEES</span>
              </div>

              {/* Step Tabs Switcher */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {TRUST_ITEMS.map((item, idx) => {
                  const isActive = activeTrustIndex === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTrustIndex(idx)}
                      className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? "bg-[#8A948B] text-white shadow-md scale-105 font-bold"
                          : "bg-white/80 text-[#3E4A3B] hover:bg-[#8A948B] hover:text-white border border-[#CBD4C7]"
                      }`}
                    >
                      <span className="font-bold">{item.number}</span>
                      <span className="opacity-90">
                        {item.id === "self-paced"
                          ? "Self-Paced"
                          : item.id === "lifetime"
                          ? "Lifetime"
                          : item.id === "frameworks"
                          ? "Frameworks"
                          : "Security"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2-Column Showcase Layout matching sample screenshot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Content Column (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[360px]">
                <div>
                  {/* Category Tag */}
                  <div className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-widest mb-3">
                    {currentTrust.category}
                  </div>

                  {/* Active Content Animation */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTrust.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="space-y-5"
                    >
                      {/* Main Title matching sample typography */}
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172217] tracking-tight leading-[1.12]">
                        {currentTrust.title}
                      </h3>

                      {/* Description body text */}
                      <p className="text-base sm:text-lg text-[#4E5B4B] leading-relaxed font-light max-w-xl">
                        {currentTrust.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Capsule Slider Dot Indicator Bar (Sample UI: [ ━━ • • • ]) */}
                  <div className="mt-8 mb-10 inline-flex items-center gap-2 p-1.5 bg-white/60 border border-[#CCD6C6] rounded-full shadow-inner">
                    {TRUST_ITEMS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTrustIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`transition-all duration-300 cursor-pointer ${
                          activeTrustIndex === idx
                            ? "w-8 h-2.5 bg-[#1C3B34] rounded-full"
                            : "w-2.5 h-2.5 bg-[#CBD4C7] hover:bg-[#8A948B] rounded-full"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom Left Metric Display */}
                <div className="pt-6 border-t border-[#D0D9CA]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTrust.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="text-5xl sm:text-6xl font-extrabold text-[#172217] font-mono tracking-tight">
                        {currentTrust.metricNumber}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-[#4E5B4B] mt-1.5 uppercase tracking-wider">
                        {currentTrust.metricLabel}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Media Card Showcase (7 cols) */}
              <div className="lg:col-span-7">
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#121316] shadow-xl group border border-[#D5DDCF]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTrust.id}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={currentTrust.image}
                        alt={currentTrust.title}
                        fill
                        priority
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />

                      {/* Gradient Overlay for Top/Bottom Glass Cards */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50" />

                      {/* Top Overlay Badge (Glassmorphic Box matching Sample Image) */}
                      <div className="absolute top-6 left-6 max-w-sm">
                        <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-white shadow-xl">
                          <div className="text-xl sm:text-2xl font-bold font-sans tracking-tight">
                            {currentTrust.title}
                          </div>
                          <div className="text-xs sm:text-sm text-zinc-300 font-light mt-1 flex items-center gap-1.5">
                            <span>→ {currentTrust.subtitleOverlay}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Floating Pill Badges Row (Matching Sample Image Bottom Overlay) */}
                      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-2 z-10">
                        {/* Left Pill Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          {currentTrust.tags.map((tag: any, i: number) => {
                            const TagIcon = tag.icon;
                            return (
                              <div
                                key={i}
                                className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-sm"
                              >
                                {typeof TagIcon === "string" ? (
                                  <span>{TagIcon}</span>
                                ) : TagIcon ? (
                                  <TagIcon className="w-3.5 h-3.5 text-amber-400 stroke-[1.75]" />
                                ) : null}
                                <span>{tag.label}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Right Rating / Security Score Badge */}
                        <div className="bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                          <span>{currentTrust.rating}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white text-center mb-10 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h3>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="rounded-2xl bg-[#E2E8DE] border border-[#D5DDCF] overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#D8E0D4] transition-colors"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#172217]">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#1C3B34] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#4E5B4B] shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 text-sm sm:text-base text-[#4E5B4B] leading-relaxed border-t border-[#D0D9CA] pt-3.5"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

