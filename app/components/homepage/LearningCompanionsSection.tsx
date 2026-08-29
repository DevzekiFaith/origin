"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Sparkles, ArrowRight, Book, CheckCircle2, Compass, Layers } from "lucide-react";
import { motion } from "framer-motion";

interface CompanionItem {
  id: string;
  title: string;
  author: string;
  badge: string;
  hook: string;
  description: string;
  connectedExperience: string;
  connectedExperienceHref: string;
  storeHref: string;
  image: string;
  priceNGN: string;
  priceUSD: string;
  learningLoop: string[];
}

const COMPANIONS: CompanionItem[] = [
  {
    id: "money-farming",
    title: "Money Farming",
    author: "Zeki Ubor",
    badge: "FLAGSHIP LEARNING COMPANION",
    hook: "Stop chasing money. Start farming it.",
    description: "The 7 timeless principles for planting, growing, and harvesting sustainable wealth without financial panic. Connects directly with Origin's Economic Principles.",
    connectedExperience: "Economic Principles: Money, Value & Choice",
    connectedExperienceHref: "/courses/economic-principles",
    storeHref: "/store/7",
    image: "/cover_money_farming.png",
    priceNGN: "₦5,000",
    priceUSD: "$4.06",
    learningLoop: ["Scarcity & Soil", "Seed Planting", "Asset Cultivation", "Compounding Harvest"]
  },
  {
    id: "house-of-choice",
    title: "House of Choice",
    author: "Zeki Faith",
    badge: "DECISION ARCHITECTURE",
    hook: "Reshape your decision, reshaping your essence.",
    description: "An 88-page original manuscript dissecting the pillars that hold decisions upright: values, emotions, reasoning, and environment.",
    connectedExperience: "Decision Making: Critical Thinking Under Pressure",
    connectedExperienceHref: "/courses/decision-making",
    storeHref: "/store/9",
    image: "https://files.selar.co/product-images/2026/products/zeki-faith1/house-of-choice-selar.com-69f0b5db3bbb2.jpg",
    priceNGN: "₦6,000",
    priceUSD: "$4.50",
    learningLoop: ["Anatomy of Choice", "Intuitive Filters", "Direction vs. Drift", "Zero-Regret Execution"]
  },
  {
    id: "8-qa-to-selling",
    title: "8 Q&A to Selling",
    author: "Zeki Ubor",
    badge: "VALUE ARTICULATION",
    hook: "For those ready to share their unique value.",
    description: "Shift away from standard marketplace competition and into the elite zone of singular contribution, scale, and high-ticket alignment.",
    connectedExperience: "Communication Mastery: Clarity & Influence",
    connectedExperienceHref: "/courses/communication",
    storeHref: "/store/8",
    image: "/8-qa-to-selling.png",
    priceNGN: "₦4,500",
    priceUSD: "$3.00",
    learningLoop: ["Specialized Trade", "Precision Messaging", "Market Positioning", "Value Liquidity"]
  },
  {
    id: "deep-remake",
    title: "Deep-Remake",
    author: "Zeki Faith",
    badge: "HUMAN ARCHITECTURE",
    hook: "Redefining yourself and reclaiming your power.",
    description: "The definitive 104-page original guide on dismantling limiting beliefs, cognitive discipline, and engineering personal sovereignty.",
    connectedExperience: "Strengthening Self-Image & Identity",
    connectedExperienceHref: "/courses/self-image",
    storeHref: "/store/10",
    image: "/images/store/cover_deep_remake_orig.jpg",
    priceNGN: "₦6,750",
    priceUSD: "$4.50",
    learningLoop: ["Seeds of Thought", "Refactoring Beliefs", "Micro-Habit Discipline", "Sovereignty Architecture"]
  },
  {
    id: "architecture-of-becoming",
    title: "The Architecture of Becoming",
    author: "The Becoming Institute",
    badge: "FOUNDATIONAL TEXT",
    hook: "The definitive blueprint for human architecture & self-evolution.",
    description: "Audit your internal foundations, dismantle default conditioning, and engineer an undeniable life of influence, mastery, and succession.",
    connectedExperience: "Strengthening Self-Image & Identity",
    connectedExperienceHref: "/courses/self-image",
    storeHref: "/store/4",
    image: "/architecture_of_becoming_standing_v1.png",
    priceNGN: "₦15,000",
    priceUSD: "$29.99",
    learningLoop: ["Perception Lens", "High-Impact Utility", "Perimeter Boundaries", "Self-Mastery"]
  }
];

export default function LearningCompanionsSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentItem = COMPANIONS[selectedIdx];

  return (
    <section id="learning-companions" className="py-24 sm:py-36 bg-[#FAFAF8] border-b border-[#E8E8E3] text-[#121316] relative overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Living Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#8A948B]/15 blur-[160px] pointer-events-none rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8A948B] text-white text-xs font-mono font-bold mb-4 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>LEARNING COMPANIONS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#172217] tracking-tight mb-4 leading-tight">
            BOOKS CONNECTED TO EXPERIENCES
          </h2>

          <p className="text-[#4E5B4B] text-base sm:text-lg font-light leading-relaxed">
            Origin does not treat books as detached store items. Every Learning Companion deepens the thinking experience, bridging philosophy, reflection, and real-world application.
          </p>

          {/* Ecosystem Flow Ribbon */}
          <div className="mt-8 p-3 sm:p-4 rounded-2xl bg-[#E2E8DE] border border-[#D5DDCF] flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono font-bold text-[#1C3B34]">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> EXPERIENCE
            </span>
            <span className="text-[#8A948B]">→</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> CHALLENGE
            </span>
            <span className="text-[#8A948B]">→</span>
            <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#CCD6C6] shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#1C3B34]" /> COMPANION
            </span>
            <span className="text-[#8A948B]">→</span>
            <span>READ</span>
            <span className="text-[#8A948B]">→</span>
            <span>REFLECT</span>
            <span className="text-[#8A948B]">→</span>
            <span className="text-[#172217]">APPLY</span>
          </div>
        </motion.div>

        {/* 2-Column Showcase Container */}
        <div className="bg-[#E2E8DE] rounded-[2.5rem] border border-[#D5DDCF] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-10 lg:p-14 mb-12">
          {/* Top Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#D0D9CA] scrollbar-none">
            {COMPANIONS.map((item, idx) => {
              const isActive = selectedIdx === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[#8A948B] text-white shadow-md scale-105"
                      : "bg-white/80 text-[#3E4A3B] hover:bg-[#8A948B] hover:text-white border border-[#CBD4C7]"
                  }`}
                >
                  <Book className="w-3.5 h-3.5" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block mb-2">
                  {currentItem.badge} // BY {currentItem.author.toUpperCase()}
                </span>
                <h3 className="text-3xl sm:text-5xl font-extrabold text-[#172217] tracking-tight leading-tight">
                  {currentItem.title}
                </h3>
                <p className="text-base sm:text-lg font-serif italic text-[#1C3B34] mt-2">
                  &ldquo;{currentItem.hook}&rdquo;
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#4E5B4B] leading-relaxed font-light">
                {currentItem.description}
              </p>

              {/* Connected Experience Link Box */}
              <div className="p-5 rounded-2xl bg-white/90 border border-[#CCD6C6] space-y-2 shadow-xs">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#1C3B34] font-bold flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#1C3B34]" />
                  <span>INTEGRATED ORIGIN EXPERIENCE:</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <span className="text-sm sm:text-base font-bold text-[#172217]">
                    {currentItem.connectedExperience}
                  </span>
                  <Link
                    href={currentItem.connectedExperienceHref}
                    className="text-xs font-mono font-bold text-[#1C3B34] hover:text-[#172217] flex items-center gap-1 shrink-0"
                  >
                    <span>START EXPERIENCE →</span>
                  </Link>
                </div>
              </div>

              {/* Core Chapters/Principles */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-[#3E4A3B] uppercase">
                  Core Thinking Pillars Inside:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {currentItem.learningLoop.map((pillar, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-[#3E4A3B] font-medium bg-white/60 px-3 py-2 rounded-xl border border-[#CCD6C6]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1C3B34] shrink-0" />
                      <span>{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#D0D9CA] flex flex-wrap items-center gap-3">
                <Link
                  href={currentItem.storeHref}
                  className="px-6 py-3.5 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white font-mono font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>READ THE COMPANION ({currentItem.priceNGN} / {currentItem.priceUSD})</span>
                </Link>

                <Link
                  href={currentItem.connectedExperienceHref}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#D6DDD1] text-[#1C3B34] font-mono font-bold text-xs sm:text-sm border border-[#CCD6C6] transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>TRY THE EXPERIENCE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Book Mockup Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-80 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-[#CCD6C6] bg-white group">
                <Image
                  src={currentItem.image}
                  alt={currentItem.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-mono uppercase font-bold text-amber-300">
                    {currentItem.badge}
                  </div>
                  <div className="text-lg font-bold">{currentItem.title}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
