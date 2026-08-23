"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ThumbsUp,
  Zap,
  Target,
  Lightbulb,
  Compass,
  Search,
  Globe,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThesisSlide {
  id: string;
  category: string;
  tabLabel: string;
  headline: string;
  description: string;
  metricNumber: string;
  metricLabel: string;
  cardName: string;
  cardSubtitle: string;
  image: string;
  tags: { label: string; isPrimary?: boolean }[];
  rating: string;
}

const THESIS_SLIDES: ThesisSlide[] = [
  {
    id: "shift",
    category: "01 // THE SHIFT IN LEARNING",
    tabLabel: "The Shift",
    headline: "School starts with the answer. Origin starts with the question.",
    description:
      "Conventional education gives answers first and tests passive memorization. Origin places you inside the experience under real constraints — so you question, choose, and discover principles through consequence.",
    metricNumber: "100%",
    metricLabel: "Active experiential discovery",
    cardName: "The Origin Engine",
    cardSubtitle: "Why question-first learning transforms thinking",
    image: "/images/lifestyle_woman.jpg",
    tags: [
      { label: "Question First", isPrimary: true },
      { label: "Real Constraints" },
      { label: "Active Discovery" },
      { label: "Real Application" },
    ],
    rating: "Method ★ Active",
  },
  {
    id: "loop",
    category: "02 // THE 4-STEP FRAMEWORK",
    tabLabel: "The Method",
    headline: "Think → Choose → Discover → Apply",
    description:
      "Every Origin experience guides you through four clear phases: question the situation, make a deliberate decision, discover the underlying principle, and apply it directly to real life.",
    metricNumber: "4 Steps",
    metricLabel: "Think · Choose · Discover · Apply",
    cardName: "The Learning Loop",
    cardSubtitle: "Friction & decision-led learning architecture",
    image: "/images/ng_method.jpg",
    tags: [
      { label: "#01 Think", isPrimary: true },
      { label: "#02 Choose" },
      { label: "#03 Discover" },
      { label: "#04 Apply" },
    ],
    rating: "Framework ★ Core",
  },
  {
    id: "purpose",
    category: "03 // THE PURPOSE",
    tabLabel: "The Purpose",
    headline: "Build the person behind the success.",
    description:
      "Origin is not primarily selling courses. Origin is building practical thinkers. We do not sell passive video playlists; we build personal capability, emotional composure, and strategic intuition.",
    metricNumber: "Internal",
    metricLabel: "Human architecture & composure",
    cardName: "The Becoming Philosophy",
    cardSubtitle: "Building practical thinkers, not passive consumers",
    image: "/images/ng_purpose.jpg",
    tags: [
      { label: "Practical Thinkers", isPrimary: true },
      { label: "Composure" },
      { label: "Strategic Intuition" },
      { label: "Capability" },
    ],
    rating: "Purpose ★ 100%",
  },
  {
    id: "standard",
    category: "04 // THE STANDARD",
    tabLabel: "The Standard",
    headline: "Simple language, sophisticated ideas.",
    description:
      "Accessible from age 10 to 45. Grounded in real Nigerian and global market realities without academic pretense, corporate buzzwords, or unnecessary complexity.",
    metricNumber: "10–45",
    metricLabel: "Universal age span & accessibility",
    cardName: "The Origin Standard",
    cardSubtitle: "Sophisticated ideas accessible from ages 10 to 45",
    image: "/outreach_child_hero.png",
    tags: [
      { label: "Ages 10–45", isPrimary: true },
      { label: "Zero Pretense" },
      { label: "Real World Realities" },
      { label: "Clarity" },
    ],
    rating: "Clarity ★ 100%",
  },
];

export default function OriginPrinciples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance every 7 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % THESIS_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = THESIS_SLIDES[activeIndex];

  return (
    <section
      id="origin-thesis"
      className="py-20 sm:py-32 bg-gradient-to-b from-[#C2C4B4] via-[#B4B5A4] to-[#A8AA99] border-b border-white/20 text-[#172217] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 border border-[#CDD6C8] rounded-full text-xs font-mono text-[#1C3B34] shadow-xs font-bold w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="uppercase tracking-wider">THE ORIGIN THESIS</span>
          </div>

          {/* Top Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {THESIS_SLIDES.map((slide, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[#1C3B34] text-white shadow-md font-bold scale-102"
                      : "bg-white/70 text-[#4E5B4B] hover:bg-white hover:text-[#1C3B34] border border-[#CDD6C8]"
                  }`}
                >
                  <span className="font-bold">0{idx + 1}</span>
                  <span className="opacity-90">{slide.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Editorial Card Container Matching Reference Layout */}
        <div
          className="bg-white/95 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 sm:p-10 lg:p-14 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Media Card Showcase (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#121316] shadow-xl group border border-[#E0E0DB]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={currentSlide.image}
                      alt={currentSlide.headline}
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />

                    {/* Elegant Lighting Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

                    {/* Top Floating Glass Badge */}
                    <div className="absolute top-6 left-6 max-w-sm">
                      <div className="bg-black/55 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-white shadow-xl">
                        <div className="text-lg sm:text-xl font-bold font-sans tracking-tight">
                          {currentSlide.cardName}
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-300 font-light mt-1 flex items-center gap-1.5">
                          <span>→ {currentSlide.cardSubtitle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Floating Glass Pill Badges */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-2 z-10">
                      <div className="flex flex-wrap items-center gap-2">
                        {currentSlide.tags.map((tag, i) => (
                          <div
                            key={i}
                            className={`backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm ${
                              tag.isPrimary
                                ? "bg-white text-[#121316] font-bold border border-white"
                                : "bg-black/50 text-white border border-white/20"
                            }`}
                          >
                            {tag.isPrimary && (
                              <ThumbsUp className="w-3.5 h-3.5 text-[#1C3B34]" />
                            )}
                            <span>{tag.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                        <span>{currentSlide.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Editorial Content Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[420px]">
              <div>
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest mb-3">
                  {currentSlide.category}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.12]">
                      {currentSlide.headline}
                    </h2>

                    <p className="text-base sm:text-lg text-[#52525B] leading-relaxed font-light max-w-xl">
                      {currentSlide.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Capsule Carousel Indicator Bar (Matching Reference Layout) */}
                <div className="mt-8 mb-10 inline-flex items-center gap-2 p-1.5 bg-[#F4F4F0] border border-[#E5E5E0] rounded-full shadow-inner">
                  {THESIS_SLIDES.map((_, idx) => (
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

              {/* Bottom Big Metric Display (Matching Reference Layout) */}
              <div className="pt-6 border-t border-[#F0F0EB]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="text-5xl sm:text-6xl font-extrabold text-[#121316] font-mono tracking-tight">
                      {currentSlide.metricNumber}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-[#71717A] mt-1.5 uppercase tracking-wider">
                      {currentSlide.metricLabel}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="mt-12 pt-8 border-t border-[#F0F0EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#52525B] font-light">
              <CheckCircle2 className="w-4 h-4 text-[#1C3B34] shrink-0" />
              <span>Grounded in real Nigerian and global market realities without academic pretense.</span>
            </div>

            <Link
              href="/courses/economic-principles"
              className="px-6 py-3 rounded-xl bg-[#1C3B34] hover:bg-[#122420] text-white text-xs sm:text-sm font-mono font-bold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer shrink-0"
            >
              <span>EXPLORE THE ORIGIN THESIS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
