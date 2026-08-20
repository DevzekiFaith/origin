"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OriginCourseItem {
  id: string;
  title: string;
  subtitle: string;
  hookQuestion: string;
  description: string;
  tier: "FOUNDATIONS" | "PERSONAL DEVELOPMENT" | "WORK & BUSINESS";
  priceNGN: string;
  launchPriceNGN?: string;
  isFlagship?: boolean;
  outcomes: string[];
}

const CATALOG_DATA: OriginCourseItem[] = [
  {
    id: "economic-principles",
    title: "ECONOMIC PRINCIPLES",
    subtitle: "Understanding Money, Choice, Value & Opportunity",
    hookQuestion: "What if understanding money starts with understanding choice?",
    description: "Learn to recognise scarcity, value, opportunity and trade-offs in everyday life through real-world missions.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    launchPriceNGN: "₦15,000",
    isFlagship: true,
    outcomes: [
      "Recognise invisible trade-offs in financial and life decisions",
      "Understand why prices fluctuate and how value is perceived",
      "Deploy scarce resources with asymmetric upside"
    ]
  },
  {
    id: "decision-making",
    title: "DECISION MAKING",
    subtitle: "Frameworks for Critical Thinking Under Pressure",
    hookQuestion: "Why do smart people make bad decisions under pressure?",
    description: "Master mental models, inversion thinking, and probability calculation to decide with calm conviction.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    outcomes: [
      "Reduce decision fatigue and emotional bias",
      "Apply inversion to avoid catastrophic mistakes",
      "Make calculated choices with limited information"
    ]
  },
  {
    id: "problem-solving",
    title: "PROBLEM SOLVING",
    subtitle: "Solution Mindset & Analytical Decomposition",
    hookQuestion: "How do you solve problems that don't have an obvious formula?",
    description: "Learn to deconstruct hard challenges systematically and separate root causes from distracting symptoms.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    outcomes: [
      "Distinguish underlying root causes from superficial symptoms",
      "Build multi-perspective solution trees",
      "Overcome cognitive blocks in complex situations"
    ]
  },
  {
    id: "communication",
    title: "COMMUNICATION",
    subtitle: "Clarity, Listening & Influence",
    hookQuestion: "Why do people misunderstand each other in critical moments?",
    description: "Master structured speech, active listening, and navigating high-stakes conversations with composure.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    outcomes: [
      "Structure complex messages for instant clarity",
      "Listen deeply to uncover emotional subtext",
      "Navigate difficult negotiations without conflict"
    ]
  },
  {
    id: "self-image",
    title: "SELF-IMAGE",
    subtitle: "Perception, Identity & Self-Conviction",
    hookQuestion: "How do you build self-conviction that doesn't collapse under doubt?",
    description: "Build unshakeable internal conviction based on demonstrated competence and kept promises.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    outcomes: [
      "Establish healthy, uncompromised personal boundaries",
      "Replace fragile self-talk with quiet competence",
      "Align personal identity with long-term aspirations"
    ]
  },
  {
    id: "personal-adaptability",
    title: "ADAPTABILITY",
    subtitle: "Resilience & Antifragility in Changing Realities",
    hookQuestion: "How do you pivot when your best-laid plans collapse?",
    description: "Develop the cognitive flexibility and emotional regulation required to thrive during sudden disruption.",
    tier: "FOUNDATIONS",
    priceNGN: "₦21,000",
    outcomes: [
      "Recover emotional equilibrium quickly after setbacks",
      "Pivot strategy without losing operational momentum",
      "Build antifragile habits in unpredictable environments"
    ]
  }
];

export default function OriginCourseCatalog() {
  const [activeTier, setActiveTier] = useState<string>("ALL");

  const filtered = activeTier === "ALL" 
    ? CATALOG_DATA 
    : CATALOG_DATA.filter(c => c.tier === activeTier);

  return (
    <section id="origin-curriculum" className="py-24 sm:py-32 bg-[#FAFAF8] text-[#121316] border-b border-[#E8E8E3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F3EE] border border-[#E2E2DC] text-xs font-mono text-[#52525B] mb-3 shadow-xs">
              <span>INTELLECTUAL CURRICULUM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121316] mb-3">
              THE ORIGIN SYSTEM
            </h2>
            <p className="text-[#52525B] text-base sm:text-lg max-w-2xl">
              Not a crowded marketplace. A structured intellectual architecture designed to build the person behind the success.
            </p>
          </div>

          {/* Tier Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["ALL", "FOUNDATIONS", "PERSONAL DEVELOPMENT", "WORK & BUSINESS"].map((tier) => (
              <motion.button
                key={tier}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveTier(tier)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                  activeTier === tier
                    ? "bg-[#121316] text-[#FFFFFF] font-bold shadow-sm"
                    : "bg-[#FFFFFF] text-[#52525B] hover:text-[#121316] border border-[#E2E2DC]"
                }`}
              >
                {tier}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Intelligent Course Cards Grid with Framer Stagger */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence>
            {filtered.map((course, idx) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{
                  y: -8,
                  scale: 1.015,
                  boxShadow: "0 20px 45px rgba(0,0,0,0.06)",
                  transition: { duration: 0.25 }
                }}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between border transition-colors relative group bg-[#FFFFFF] ${
                  course.isFlagship
                    ? "border-amber-600/60 shadow-[0_10px_35px_rgba(217,119,6,0.08)] ring-1 ring-amber-600/20"
                    : "border-[#E8E8E3] hover:border-[#D4D4CE] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                }`}
              >
                {/* Flagship Badge */}
                {course.isFlagship && (
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-3.5 left-7 px-3.5 py-1 rounded-full bg-amber-600 text-[#FFFFFF] text-[10px] font-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>FLAGSHIP FOUNDATION</span>
                  </motion.div>
                )}

                <div>
                  {/* Header Info */}
                  <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-amber-700 font-semibold">
                      {course.tier}
                    </span>
                    <div className="text-right">
                      {course.launchPriceNGN ? (
                        <div>
                          <span className="text-xs text-[#A1A1AA] line-through mr-1.5 font-mono">{course.priceNGN}</span>
                          <span className="text-sm font-bold text-amber-700 font-mono">{course.launchPriceNGN}</span>
                          <span className="block text-[9px] text-amber-700 font-mono uppercase">Founding Launch</span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-[#121316] font-mono">{course.priceNGN}</span>
                      )}
                    </div>
                  </div>

                  {/* Course Title & Subtitle */}
                  <h3 className="text-xl font-bold text-[#121316] mb-1 group-hover:text-amber-700 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#71717A] font-mono mb-4">
                    {course.subtitle}
                  </p>

                  {/* Intellectual Hook Quote */}
                  <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E3] mb-5">
                    <p className="text-xs text-[#27272A] italic leading-relaxed font-serif">
                      "{course.hookQuestion}"
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#52525B] mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Outcomes Checklist */}
                  <div className="space-y-2 mb-8">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] font-semibold">
                      After this experience, you will:
                    </div>
                    {course.outcomes.map((outcome, oIdx) => (
                      <div key={oIdx} className="flex items-start gap-2 text-xs text-[#3F3F46]">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-[#F0F0EB]">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={`/courses/${course.id}`}
                      className={`w-full py-3.5 px-4 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all flex items-center justify-center gap-2 group/btn ${
                        course.isFlagship
                          ? "bg-amber-600 text-[#FFFFFF] hover:bg-amber-700 shadow-sm"
                          : "bg-[#121316] text-[#FFFFFF] hover:bg-[#27272A]"
                      }`}
                    >
                      <span>EXPLORE EXPERIENCE</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
