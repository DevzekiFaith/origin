"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OriginMomentDomain {
  id: string;
  label: string;
  tagline: string;
  question: string;
  insight: string;
  courseTitle: string;
  courseId: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}

const DOMAINS: OriginMomentDomain[] = [
  {
    id: "money",
    label: "MONEY",
    tagline: "Value, Opportunity & Scarcity",
    question: "Why does money disappear faster than we expect?",
    insight: "Because money is not just numbers—it is the measurement of trade-offs. Every time you spend, you surrender the invisible power of what else that money could have become.",
    courseTitle: "Economic Principles: Money, Value & Choice",
    courseId: "economic-principles",
    accentColor: "#D97706",
    badgeBg: "bg-amber-100",
    badgeBorder: "border-amber-300",
    badgeText: "text-amber-900"
  },
  {
    id: "decisions",
    label: "DECISIONS",
    tagline: "Critical Thinking Under Pressure",
    question: "Why do smart people make catastrophic choices?",
    insight: "Because intelligence rationalizes emotions, but wisdom calculates second-order consequences. Good decisions aren't made with gut instinct alone; they are built on robust mental models.",
    courseTitle: "Decision Making: Critical Thinking Under Pressure",
    courseId: "decision-making",
    accentColor: "#4F46E5",
    badgeBg: "bg-indigo-100",
    badgeBorder: "border-indigo-300",
    badgeText: "text-indigo-900"
  },
  {
    id: "people",
    label: "PEOPLE",
    tagline: "Communication, Influence & Listening",
    question: "Why do people misunderstand each other in critical moments?",
    insight: "Because most people listen to reply rather than to decode intent. True influence is not speaking louder; it is crafting clarity that leaves no room for confusion.",
    courseTitle: "Communication Mastery: Clarity & Influence",
    courseId: "communication",
    accentColor: "#059669",
    badgeBg: "bg-emerald-100",
    badgeBorder: "border-emerald-300",
    badgeText: "text-emerald-900"
  },
  {
    id: "self",
    label: "SELF",
    tagline: "Identity, Conviction & Boundaries",
    question: "How do you build self-conviction that doesn't collapse under doubt?",
    insight: "Conviction is not positive affirmations. It is the quiet byproduct of demonstrated competence and kept promises to yourself over time.",
    courseTitle: "Strengthening Self-Image & Identity",
    courseId: "self-image",
    accentColor: "#9333EA",
    badgeBg: "bg-purple-100",
    badgeBorder: "border-purple-300",
    badgeText: "text-purple-900"
  },
  {
    id: "problems",
    label: "PROBLEMS",
    tagline: "Solution Mindset & Root Cause Analysis",
    question: "How do you solve problems that don't have an obvious formula?",
    insight: "By decomposing complex friction into root causes rather than fighting surface symptoms. When you ask the right diagnostic questions, solutions reveal themselves.",
    courseTitle: "Problem Solving: The Solution Mindset",
    courseId: "problem-solving",
    accentColor: "#2563EB",
    badgeBg: "bg-blue-100",
    badgeBorder: "border-blue-300",
    badgeText: "text-blue-900"
  },
  {
    id: "growth",
    label: "GROWTH",
    tagline: "Resilience & Antifragility",
    question: "How do you pivot when your best-laid plans collapse?",
    insight: "By building antifragility—designing your skills and routines so that unexpected volatility makes you stronger instead of breaking you.",
    courseTitle: "Personal Adaptability & Antifragility",
    courseId: "personal-adaptability",
    accentColor: "#E11D48",
    badgeBg: "bg-rose-100",
    badgeBorder: "border-rose-300",
    badgeText: "text-rose-900"
  }
];

export default function OriginMoment() {
  const [activeDomainId, setActiveDomainId] = useState<string>("money");

  const activeDomain = DOMAINS.find(d => d.id === activeDomainId) || DOMAINS[0];

  return (
    <section className="py-24 sm:py-36 bg-[#FAFAF8] text-[#121316] border-b border-[#E8E8E3] relative overflow-hidden">
      {/* Living Ambient Light Gradient */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-400/10 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F3EE] border border-[#E2E2DC] text-xs font-mono text-[#52525B] mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span className="uppercase font-bold tracking-wider">The Signature Origin Moment</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#121316] mb-4 leading-[1.06]">
            WHAT DO YOU WANT TO UNDERSTAND?
          </h2>

          <p className="text-lg sm:text-xl text-[#52525B] font-light leading-relaxed">
            Select a dimension of life below. Experience how curiosity leads to clarity.
          </p>
        </motion.div>

        {/* Large Interactive Dimension Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          {DOMAINS.map((domain) => {
            const isSelected = domain.id === activeDomainId;
            return (
              <motion.button
                key={domain.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveDomainId(domain.id)}
                className={`px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm sm:text-base font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#121316] text-[#FFFFFF] shadow-xl ring-2 ring-[#121316]/20 scale-105"
                    : "bg-[#FFFFFF] text-[#52525B] hover:text-[#121316] hover:bg-[#FFFFFF] border border-[#E2E2DC] shadow-xs"
                }`}
              >
                {domain.label}
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Revealed Educational Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomain.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-8 sm:p-14 md:p-16 rounded-3xl bg-[#FFFFFF] border border-[#E2E2DC] shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Insight */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#F3F3EE] border border-[#E2E2DC] text-[#52525B]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{activeDomain.tagline}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#121316] tracking-tight leading-tight">
                  "{activeDomain.question}"
                </h3>

                <div className="p-6 sm:p-7 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E3]">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#71717A] mb-2 font-bold">
                    The Origin Insight
                  </div>
                  <p className="text-base sm:text-lg text-[#27272A] leading-relaxed font-normal">
                    {activeDomain.insight}
                  </p>
                </div>
              </div>

              {/* Right Pathway Link */}
              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end border-t lg:border-t-0 lg:border-l border-[#F0F0EB] pt-8 lg:pt-0 lg:pl-10 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#71717A] font-bold">
                  RECOMMENDED EXPERIENCE
                </span>
                <div className="text-lg font-bold text-[#121316] leading-snug">
                  {activeDomain.courseTitle}
                </div>

                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full lg:w-auto pt-2">
                  <Link
                    href={`/courses/${activeDomain.courseId}`}
                    className="w-full lg:w-auto px-7 py-4 rounded-xl bg-[#121316] text-[#FFFFFF] font-bold text-xs sm:text-sm font-mono tracking-wider hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>EXPLORE EXPERIENCE →</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
