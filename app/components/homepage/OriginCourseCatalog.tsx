"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Sparkles,
  HelpCircle,
  Lightbulb,
  UserCheck,
  Globe,
  ThumbsUp,
  Zap,
  Building2,
  Target,
  Shield,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OriginCourseItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  hookQuestion: string;
  interactiveCuriosityPrompt: string;
  revealedInsight: string;
  description: string;
  tier: string;
  priceNGN: string;
  launchPriceNGN?: string;
  isFlagship?: boolean;
  image: string;
  imageAlt: string;
  ageTag: string;
  metricNumber: string;
  metricLabel: string;
  subtitleOverlay: string;
  tags: { icon: React.ElementType; label: string }[];
  rating: string;
  outcomes: string[];
}

const CATALOG_DATA: OriginCourseItem[] = [
  {
    id: "economic-principles",
    number: "01",
    title: "ECONOMIC PRINCIPLES",
    subtitle: "Understanding Money, Choice, Value & Opportunity",
    interactiveCuriosityPrompt: "WHAT WOULD YOU DO WITH ₦20,000?",
    revealedInsight: "Understanding money, choice, value, and opportunity cost in real life.",
    hookQuestion: "What if understanding money starts with understanding choice?",
    description: "Learn to recognise scarcity, value, opportunity and trade-offs in everyday life through real-world missions.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    launchPriceNGN: "₦15,000",
    isFlagship: true,
    image: "/outreach_child_hero.png",
    imageAlt: "Nigerian youth & adult learners mastering economic principles",
    ageTag: "Ages 10–45 Universal",
    metricNumber: "₦15,000",
    metricLabel: "Founding Launch Access (Regular ₦21,000)",
    subtitleOverlay: "Money is the measurement of trade-offs & choices",
    tags: [
      { icon: ThumbsUp, label: "Scarcity" },
      { icon: Zap, label: "Value" },
      { icon: Building2, label: "Opportunity" },
      { icon: Target, label: "Choice" },
    ],
    rating: "Rated ★ 4/4",
    outcomes: [
      "Recognise invisible trade-offs in financial and life decisions",
      "Understand why prices fluctuate and how value is perceived",
      "Deploy scarce resources to create the greatest real-world value"
    ]
  },
  {
    id: "decision-making",
    number: "02",
    title: "DECISION MAKING",
    subtitle: "Frameworks for Critical Thinking Under Pressure",
    interactiveCuriosityPrompt: "WHY DO SMART PEOPLE MAKE CATASTROPHIC CHOICES?",
    revealedInsight: "Master mental models, inversion, and second-order consequence calculation.",
    hookQuestion: "Why do smart people make bad decisions under pressure?",
    description: "Master mental models, inversion thinking, and probability calculation to decide with calm conviction.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    image: "/images/ng_decisions.jpg",
    imageAlt: "Young Nigerian consultant analyzing high-stakes decisions",
    ageTag: "Ages 16–45 Execs & Students",
    metricNumber: "2nd Order",
    metricLabel: "Consequence Calculation Engine",
    subtitleOverlay: "Calculating second-order consequences under real pressure",
    tags: [
      { icon: Lightbulb, label: "Mental Models" },
      { icon: Target, label: "Inversion" },
      { icon: Shield, label: "Probability" },
    ],
    rating: "Wisdom ★ 4/4",
    outcomes: [
      "Reduce decision fatigue and emotional bias",
      "Apply inversion to avoid catastrophic mistakes",
      "Make calculated choices with limited information"
    ]
  },
  {
    id: "problem-solving",
    number: "03",
    title: "PROBLEM SOLVING",
    subtitle: "Solution Mindset & Analytical Decomposition",
    interactiveCuriosityPrompt: "WHY FIGHT THE SYMPTOM INSTEAD OF THE ROOT CAUSE?",
    revealedInsight: "Deconstruct messy friction into clear, actionable solution trees.",
    hookQuestion: "How do you solve problems that don't have an obvious formula?",
    description: "Learn to deconstruct hard challenges systematically and separate root causes from distracting symptoms.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    image: "/images/ng_problems.jpg",
    imageAlt: "Nigerian female strategist solving complex problems",
    ageTag: "Ages 18–45 Founders & Strategists",
    metricNumber: "Root Cause",
    metricLabel: "Friction Diagnostics & Solution Engine",
    subtitleOverlay: "Decomposing friction into clear root causes",
    tags: [
      { icon: Search, label: "Diagnostics" },
      { icon: Lightbulb, label: "Root Cause" },
      { icon: Zap, label: "Decomposition" },
    ],
    rating: "Analysis ★ 100%",
    outcomes: [
      "Distinguish underlying root causes from superficial symptoms",
      "Build multi-perspective solution trees",
      "Overcome cognitive blocks in complex situations"
    ]
  },
  {
    id: "communication",
    number: "04",
    title: "COMMUNICATION",
    subtitle: "Clarity, Listening & Influence",
    interactiveCuriosityPrompt: "WHY DO WORDS GET MISUNDERSTOOD IN CRITICAL MOMENTS?",
    revealedInsight: "Master structured speech, empathetic listening, and non-defensive influence.",
    hookQuestion: "Why do people misunderstand each other in critical moments?",
    description: "Master structured speech, active listening, and navigating high-stakes conversations with composure.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    image: "/images/ng_communication.jpg",
    imageAlt: "Nigerian female executive facilitating strategic communication",
    ageTag: "Ages 20–45 Leaders",
    metricNumber: "360°",
    metricLabel: "Intent Decoding & Influence",
    subtitleOverlay: "Decoding underlying intent & crafting absolute clarity",
    tags: [
      { icon: Globe, label: "Clarity" },
      { icon: Building2, label: "Influence" },
      { icon: Sparkles, label: "Listening" },
    ],
    rating: "Clarity ★ 100%",
    outcomes: [
      "Structure complex messages for instant clarity",
      "Listen deeply to uncover emotional subtext",
      "Navigate difficult negotiations without conflict"
    ]
  },
  {
    id: "self-image",
    number: "05",
    title: "SELF-IMAGE",
    subtitle: "Perception, Identity & Self-Conviction",
    interactiveCuriosityPrompt: "HOW DO YOU BUILD CONVICTION THAT SURVIVES DOUBT?",
    revealedInsight: "Construct unshakeable self-worth from competence rather than positive affirmations.",
    hookQuestion: "How do you build self-conviction that doesn't collapse under doubt?",
    description: "Build unshakeable internal conviction based on demonstrated competence and kept promises.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    image: "/images/ng_self.jpg",
    imageAlt: "Young Nigerian presenter building unshakeable self-conviction",
    ageTag: "Ages 12–40 Youth & Adults",
    metricNumber: "100%",
    metricLabel: "Kept Internal Promises & Competence",
    subtitleOverlay: "Demonstrated competence over empty affirmations",
    tags: [
      { icon: Target, label: "Conviction" },
      { icon: Shield, label: "Identity" },
      { icon: Zap, label: "Boundaries" },
    ],
    rating: "Conviction ★ 4/4",
    outcomes: [
      "Establish healthy, uncompromised personal boundaries",
      "Replace fragile self-talk with quiet competence",
      "Align personal identity with long-term aspirations"
    ]
  },
  {
    id: "personal-adaptability",
    number: "06",
    title: "ADAPTABILITY",
    subtitle: "Resilience & Antifragility in Changing Realities",
    interactiveCuriosityPrompt: "HOW DO YOU PIVOT WHEN YOUR PLANS SUDDENLY COLLAPSE?",
    revealedInsight: "Build antifragile habits and emotional equilibrium in volatile markets.",
    hookQuestion: "How do you pivot when your best-laid plans collapse?",
    description: "Develop the cognitive flexibility and emotional regulation required to thrive during sudden disruption.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    image: "/images/ng_growth.jpg",
    imageAlt: "Nigerian founder executing resilient pivot",
    ageTag: "Ages 18–45 Professionals",
    metricNumber: "Antifragile",
    metricLabel: "Volatility Adaptation System",
    subtitleOverlay: "Turning unexpected volatility into personal leverage",
    tags: [
      { icon: Zap, label: "Antifragility" },
      { icon: Shield, label: "Resilience" },
      { icon: Target, label: "Flexibility" },
    ],
    rating: "Growth ★ 4/4",
    outcomes: [
      "Recover emotional equilibrium quickly after setbacks",
      "Pivot strategy without losing operational momentum",
      "Build antifragile habits in unpredictable environments"
    ]
  }
];

export default function OriginCourseCatalog() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CATALOG_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentCourse = CATALOG_DATA[activeIndex];

  return (
    <section
      id="origin-curriculum"
      className="py-20 sm:py-32 bg-[#FAFAF8] border-b border-[#E8E8E3] text-[#121316] relative overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Clean Canvas Container: House Background #E2E8DE */}
        <div
          className="bg-[#E2E8DE] rounded-[2.5rem] border border-[#D5DDCF] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-10 lg:p-14 relative mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Header Bar: Eyebrow Badge, Section Title & Interactive Course Tabs Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-[#D0D9CA]">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 border border-[#CCD6C6] rounded-full text-xs font-mono text-[#3E4A3B] shadow-2xs mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#1C3B34] animate-pulse" />
                <span className="uppercase tracking-wider font-semibold">THE ORIGIN SYSTEM</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#172217] tracking-tight leading-tight">
                INTELLECTUAL FOUNDATIONS
              </h2>
              <p className="text-sm sm:text-base text-[#4E5B4B] font-light mt-1">
                Curiosity-driven practical capabilities for Nigerian youth and adults (Ages 10 to 45).
              </p>
            </div>

            {/* Course Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {CATALOG_DATA.map((course, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={course.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-[#8A948B] text-white shadow-md scale-105"
                        : "bg-white/80 text-[#3E4A3B] hover:bg-[#8A948B] hover:text-white border border-[#CBD4C7]"
                    }`}
                  >
                    <span>{course.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Showcase Layout matching sample reference image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column (5 cols - Matching text & metric layout in sample image) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[400px]">
              <div>
                {/* Category Tagline Subhead */}
                <div className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest mb-3">
                  {currentCourse.number} // {currentCourse.tier}
                </div>

                {/* Active Content Animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCourse.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-5"
                  >
                    {/* Main Title matching sample typography */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.12]">
                      {currentCourse.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#71717A] font-bold">
                      {currentCourse.subtitle}
                    </p>

                    {/* Question Inquiry Box */}
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold mb-1 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Interactive Question</span>
                      </div>
                      <p className="text-sm sm:text-base font-extrabold text-[#121316] leading-snug">
                        {currentCourse.interactiveCuriosityPrompt}
                      </p>
                    </div>

                    {/* Core Discovery */}
                    <p className="text-sm sm:text-base text-[#52525B] leading-relaxed font-normal">
                      {currentCourse.description}
                    </p>

                    {/* Outcomes Checklist */}
                    <div className="space-y-2 pt-1">
                      {currentCourse.outcomes.map((outcome, oIdx) => (
                        <div key={oIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#3F3F46]">
                          <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Switcher Indicator Capsule Bar (Sample Image UI Feature: [ ━━ • • • • • ]) */}
                <div className="mt-8 mb-8 inline-flex items-center gap-2 p-1.5 bg-[#F4F4F0] border border-[#E5E5E0] rounded-full shadow-inner">
                  {CATALOG_DATA.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`transition-all duration-300 cursor-pointer ${
                        activeIndex === idx
                          ? "w-8 h-2.5 bg-[#121316] rounded-full"
                          : "w-2.5 h-2.5 bg-[#CBD5E1] hover:bg-[#94A3B8] rounded-full"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Left Metric Display (Matching 70% Interview Rate in Sample Image) */}
              <div className="pt-6 border-t border-[#F0F0EB]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCourse.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="text-5xl sm:text-6xl font-extrabold text-[#121316] font-mono tracking-tight">
                      {currentCourse.metricNumber}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-[#71717A] mt-1.5 uppercase tracking-wider">
                      {currentCourse.metricLabel}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Media Card Showcase (7 cols - Matching Kiara Washington image card in sample image) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#121316] shadow-xl group border border-[#E0E0DB]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCourse.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={currentCourse.image}
                      alt={currentCourse.imageAlt}
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
                          {currentCourse.title}
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-300 font-light mt-1 flex items-center gap-1.5">
                          <span>→ {currentCourse.subtitleOverlay}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Floating Pill Badges Row (Matching Sample Image Bottom Overlay) */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-2 z-10">
                      {/* Left Pill Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        {currentCourse.tags.map((tag: any, i: number) => {
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

                      {/* Right Rating / Score Badge */}
                      <div className="bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                        <span>{currentCourse.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer with Recommended Experience Link */}
          <div className="mt-12 pt-8 border-t border-[#D0D9CA] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm text-[#4E5B4B]">
              <span className="font-mono uppercase font-bold text-[#1C3B34]">SELECTED EXPERIENCE:</span>
              <span className="font-bold text-[#172217]">{currentCourse.title} ({currentCourse.ageTag})</span>
            </div>

            <Link
              href={`/courses/${currentCourse.id}`}
              className="px-6 py-3 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              <span>START THE EXPERIENCE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Grid Browsing Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATALOG_DATA.map((c, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={c.id}
                onClick={() => setActiveIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? "bg-[#8A948B] text-white border-[#8A948B] shadow-md scale-102"
                    : "bg-[#E2E8DE] text-[#3E4A3B] hover:bg-[#8A948B] hover:text-white border-[#D5DDCF]"
                }`}
              >
                <div className="text-[10px] font-mono font-bold opacity-80 uppercase">{c.number} // {c.tier}</div>
                <div className="font-bold text-xs sm:text-sm line-clamp-1">{c.title}</div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
