"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ThumbsUp,
  Zap,
  Building2,
  Target,
  Lightbulb,
  Compass,
  Search,
  Globe,
  Shield,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DomainItem {
  id: string;
  number: string;
  label: string;
  tagline: string;
  question: string;
  insight: string;
  courseTitle: string;
  courseId: string;
  metricNumber: string;
  metricLabel: string;
  image: string;
  subtitleOverlay: string;
  tags: { icon: React.ElementType; label: string }[];
  rating: string;
}

const DOMAINS: DomainItem[] = [
  {
    id: "money",
    number: "01",
    label: "MONEY",
    tagline: "Value, Opportunity & Scarcity",
    question: "Why does money disappear faster than we expect?",
    insight:
      "Because money is not just numbers—it is the measurement of trade-offs. Every time you spend, you surrender the invisible power of what else that money could have become.",
    courseTitle: "Economic Principles: Money, Value & Choice",
    courseId: "economic-principles",
    metricNumber: "100%",
    metricLabel: "Trade-Off Clarity & Measurement",
    image: "/images/ng_purpose.jpg",
    subtitleOverlay: "Money is the measurement of invisible trade-offs & choices",
    tags: [
      { icon: ThumbsUp, label: "Trade-offs" },
      { icon: Zap, label: "Value" },
      { icon: Building2, label: "Scarcity" },
      { icon: Target, label: "Choice" },
    ],
    rating: "Clarity ★ 100%",
  },
  {
    id: "decisions",
    number: "02",
    label: "DECISIONS",
    tagline: "Critical Thinking Under Pressure",
    question: "Why do smart people make catastrophic choices?",
    insight:
      "Because intelligence rationalizes emotions, but wisdom calculates second-order consequences. Good decisions aren't made with gut instinct alone; they are built on robust mental models.",
    courseTitle: "Decision Making: Critical Thinking Under Pressure",
    courseId: "decision-making",
    metricNumber: "2nd Order",
    metricLabel: "Consequence Calculation Engine",
    image: "/images/ng_decisions.jpg",
    subtitleOverlay: "Calculating second-order consequences under real pressure",
    tags: [
      { icon: Lightbulb, label: "Reasoning" },
      { icon: Compass, label: "2nd Order" },
      { icon: Search, label: "Mental Models" },
    ],
    rating: "Wisdom ★ 4/4",
  },
  {
    id: "people",
    number: "03",
    label: "PEOPLE",
    tagline: "Communication, Influence & Listening",
    question: "Why do people misunderstand each other in critical moments?",
    insight:
      "Because most people listen to reply rather than to decode intent. True influence is not speaking louder; it is crafting clarity that leaves no room for confusion.",
    courseTitle: "Communication Mastery: Clarity & Influence",
    courseId: "communication",
    metricNumber: "360°",
    metricLabel: "Intent Decoding & Influence",
    image: "/images/ng_communication.jpg",
    subtitleOverlay: "Decoding underlying intent & crafting absolute clarity",
    tags: [
      { icon: Globe, label: "Communication" },
      { icon: Building2, label: "Influence" },
      { icon: Sparkles, label: "Intent Decoding" },
    ],
    rating: "Clarity ★ 100%",
  },
  {
    id: "self",
    number: "04",
    label: "SELF",
    tagline: "Identity, Conviction & Boundaries",
    question: "How do you build self-conviction that doesn't collapse under doubt?",
    insight:
      "Conviction is not positive affirmations. It is the quiet byproduct of demonstrated competence and kept promises to yourself over time.",
    courseTitle: "Strengthening Self-Image & Identity",
    courseId: "self-image",
    metricNumber: "100%",
    metricLabel: "Kept Internal Promises & Competence",
    image: "/images/ng_self.jpg",
    subtitleOverlay: "Demonstrated competence over empty affirmations",
    tags: [
      { icon: Target, label: "Conviction" },
      { icon: Shield, label: "Identity" },
      { icon: Zap, label: "Boundaries" },
    ],
    rating: "Conviction ★ 4/4",
  },
  {
    id: "problems",
    number: "05",
    label: "PROBLEMS",
    tagline: "Solution Mindset & Root Cause Analysis",
    question: "How do you solve problems that don't have an obvious formula?",
    insight:
      "By decomposing complex friction into root causes rather than fighting surface symptoms. When you ask the right diagnostic questions, solutions reveal themselves.",
    courseTitle: "Problem Solving: The Solution Mindset",
    courseId: "problem-solving",
    metricNumber: "Root Cause",
    metricLabel: "Friction Diagnostics & Solution Engine",
    image: "/images/ng_problems.jpg",
    subtitleOverlay: "Decomposing friction into clear root causes",
    tags: [
      { icon: Search, label: "Diagnostics" },
      { icon: Lightbulb, label: "Root Cause" },
      { icon: Layers, label: "Solution Mindset" },
    ],
    rating: "Analysis ★ 100%",
  },
  {
    id: "growth",
    number: "06",
    label: "GROWTH",
    tagline: "Resilience & Antifragility",
    question: "How do you pivot when your best-laid plans collapse?",
    insight:
      "By building antifragility—designing your skills and routines so that unexpected volatility makes you stronger instead of breaking you.",
    courseTitle: "Personal Adaptability & Antifragility",
    courseId: "personal-adaptability",
    metricNumber: "Antifragile",
    metricLabel: "Volatility Adaptation System",
    image: "/images/ng_growth.jpg",
    subtitleOverlay: "Turning unexpected volatility into personal leverage",
    tags: [
      { icon: Zap, label: "Antifragility" },
      { icon: Compass, label: "Adaptability" },
      { icon: Shield, label: "Resilience" },
    ],
    rating: "Growth ★ 4/4",
  },
];

export default function OriginMoment() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DOMAINS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentItem = DOMAINS[activeIndex];

  return (
    <section
      id="origin-moment"
      className="py-20 sm:py-32 bg-[#FAFAF8] border-b border-[#E8E8E3] text-[#121316] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Clean Canvas Container: House Background #E2E8DE */}
        <div
          className="bg-[#E2E8DE] rounded-[2.5rem] border border-[#D5DDCF] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-10 lg:p-14 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Header Bar: Section Title, Subtitle & Interactive Dimension Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-[#D0D9CA]">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 border border-[#CCD6C6] rounded-full text-xs font-mono text-[#3E4A3B] shadow-2xs mb-3">
                <Compass className="w-3.5 h-3.5 text-[#1C3B34] animate-pulse" />
                <span className="uppercase tracking-wider font-semibold">THE DISCOVERY ENGINE</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold text-[#172217] tracking-tight leading-tight">
                WHAT DO YOU WANT TO UNDERSTAND?
              </h2>
              <p className="text-sm sm:text-base text-[#4E5B4B] font-light mt-1">
                Select a dimension of life below. Experience how curiosity leads to clarity.
              </p>
            </div>

            {/* Step Category Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {DOMAINS.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-[#8A948B] text-white shadow-md scale-105"
                        : "bg-white/80 text-[#3E4A3B] hover:bg-[#8A948B] hover:text-white border border-[#CBD4C7]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Showcase Layout matching sample reference image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column (5 cols - Matching text & 70% metric layout in sample image) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[380px]">
              <div>
                {/* Category Tagline Subhead */}
                <div className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest mb-3">
                  {currentItem.number} // {currentItem.tagline}
                </div>

                {/* Active Question & Insight Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-5"
                  >
                    {/* Main Question Headline matching sample typography */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121316] tracking-tight leading-[1.15]">
                      &ldquo;{currentItem.question}&rdquo;
                    </h3>

                    {/* The Origin Insight body text */}
                    <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EAEAE5]">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] font-bold mb-1.5">
                        The Origin Insight
                      </div>
                      <p className="text-sm sm:text-base text-[#52525B] leading-relaxed font-normal">
                        {currentItem.insight}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Switcher Indicator Capsule Bar (Sample Image UI Feature: [ ━━ • • • • • ]) */}
                <div className="mt-8 mb-8 inline-flex items-center gap-2 p-1.5 bg-[#F4F4F0] border border-[#E5E5E0] rounded-full shadow-inner">
                  {DOMAINS.map((_, idx) => (
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
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="text-5xl sm:text-6xl font-extrabold text-[#121316] font-mono tracking-tight">
                      {currentItem.metricNumber}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-[#71717A] mt-1.5 uppercase tracking-wider">
                      {currentItem.metricLabel}
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
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={currentItem.image}
                      alt={currentItem.tagline}
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
                          {currentItem.courseTitle}
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-300 font-light mt-1 flex items-center gap-1.5">
                          <span>→ {currentItem.subtitleOverlay}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Floating Pill Badges Row (Matching Sample Image Bottom Overlay) */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-2 z-10">
                      {/* Left Pill Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        {currentItem.tags.map((tag: any, i: number) => {
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
                        <span>{currentItem.rating}</span>
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
              <span className="font-mono uppercase font-bold text-[#1C3B34]">RECOMMENDED EXPERIENCE:</span>
              <span className="font-bold text-[#172217]">{currentItem.courseTitle}</span>
            </div>

            <Link
              href={`/courses/${currentItem.courseId}`}
              className="px-6 py-3 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              <span>EXPLORE EXPERIENCE →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
