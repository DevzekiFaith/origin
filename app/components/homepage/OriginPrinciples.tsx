"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThesisItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  metricNumber: string;
  metricLabel: string;
  image: string;
  tags: { icon: string; label: string }[];
  rating: string;
  topTitleOverlay: string;
  subtitleOverlay: string;
}

const THESIS_ITEMS: ThesisItem[] = [
  {
    id: "purpose",
    number: "01",
    category: "01 // The Purpose",
    title: "Build The Person Behind The Success",
    description:
      "We do not sell passive video playlists. We build personal capability, emotional composure, and strategic intuition.",
    metricNumber: "100%",
    metricLabel: "Capability & composure built",
    image: "/images/testimonial_adebayo.jpg",
    tags: [
      { icon: "👍", label: "Good fit" },
      { icon: "⚡", label: "Capability" },
      { icon: "🏛️", label: "Composure" },
      { icon: "🎯", label: "Intuition" },
    ],
    rating: "Rated ★ 4/4",
    topTitleOverlay: "The Purpose",
    subtitleOverlay: "Personal capability, emotional composure & strategic intuition",
  },
  {
    id: "method",
    number: "02",
    category: "02 // The Method",
    title: "Think → Choose → Discover → Apply",
    description:
      "Experience the friction of real choices under constraint. You learn principles by making decisions, not memorizing terms.",
    metricNumber: "4-Step",
    metricLabel: "Interactive decision friction engine",
    image: "/images/testimonial_chinedu.jpg",
    tags: [
      { icon: "💡", label: "Think" },
      { icon: "🎯", label: "Choose" },
      { icon: "🔍", label: "Discover" },
      { icon: "⚡", label: "Apply" },
    ],
    rating: "Friction ★ 100%",
    topTitleOverlay: "The Method",
    subtitleOverlay: "Learning through real choices under constraint",
  },
  {
    id: "standard",
    number: "03",
    category: "03 // The Standard",
    title: "Simple Language, Sophisticated Ideas",
    description:
      "Accessible from age 10 to 45. Grounded in real Nigerian and global market realities without academic pretense.",
    metricNumber: "10–45",
    metricLabel: "Universal age accessibility",
    image: "/outreach_child_hero.png",
    tags: [
      { icon: "🌍", label: "Ages 10-45" },
      { icon: "🇳🇬", label: "Nigerian Realities" },
      { icon: "✨", label: "Zero Pretense" },
    ],
    rating: "Clarity ★ 100%",
    topTitleOverlay: "The Standard",
    subtitleOverlay: "Sophisticated ideas accessible from ages 10 to 45",
  },
];

export default function OriginPrinciples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % THESIS_ITEMS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentItem = THESIS_ITEMS[activeIndex];

  return (
    <section id="origin-thesis" className="py-20 sm:py-32 bg-[#FAFAF8] border-b border-[#E8E8E3] text-[#121316] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Clean Canvas Container */}
        <div
          className="bg-white rounded-[2.5rem] border border-[#EAEAE5] shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-6 sm:p-10 lg:p-14 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Header Bar: Eyebrow Label & Navigation Step Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#F0F0EB]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF9F5] border border-[#E6E6E0] rounded-full text-xs font-mono text-[#52525B] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span className="uppercase tracking-wider font-semibold">THE ORIGIN THESIS</span>
            </div>

            {/* Step Category Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {THESIS_ITEMS.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-[#121316] text-white shadow-md"
                        : "bg-[#F4F4F0] text-[#71717A] hover:bg-[#EAEAE5] hover:text-[#121316]"
                    }`}
                  >
                    <span className="font-bold">{item.number}</span>
                    <span className="opacity-90">
                      {item.id === "purpose" ? "Purpose" : item.id === "method" ? "Method" : "Standard"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Showcase Layout matching sample screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[380px]">
              <div>
                {/* Step Number Category Subhead */}
                <div className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest mb-3">
                  {currentItem.category}
                </div>

                {/* Active Content Animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-5"
                  >
                    {/* Main Title matching sample typography */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.12]">
                      {currentItem.title}
                    </h2>

                    {/* Description body text */}
                    <p className="text-base sm:text-lg text-[#52525B] leading-relaxed font-light max-w-xl">
                      {currentItem.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Switcher Indicator Capsule Bar (Sample Image UI Feature: [ ━━ • • ]) */}
                <div className="mt-8 mb-10 inline-flex items-center gap-2 p-1.5 bg-[#F4F4F0] border border-[#E5E5E0] rounded-full shadow-inner">
                  {THESIS_ITEMS.map((_, idx) => (
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

            {/* Right Media Card Showcase (7 cols) */}
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
                      alt={currentItem.title}
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
                          {currentItem.title}
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
                        {currentItem.tags.map((tag, i) => (
                          <div
                            key={i}
                            className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-sm"
                          >
                            <span>{tag.icon}</span>
                            <span>{tag.label}</span>
                          </div>
                        ))}
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

          {/* Bottom Action Footer */}
          <div className="mt-12 pt-8 border-t border-[#F0F0EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#71717A] font-light">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Grounded in real Nigerian and global market realities without academic pretense.</span>
            </div>

            <Link
              href="/courses/economic-principles"
              className="px-6 py-3 rounded-xl bg-[#121316] hover:bg-amber-600 text-white text-xs sm:text-sm font-mono font-bold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer shrink-0"
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

