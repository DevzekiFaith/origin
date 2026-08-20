"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Coins, Zap, Target, Users, TrendingUp, Heart, Sparkles, Check, Flame } from "lucide-react";

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
    <section id="origin-curriculum" className="py-20 md:py-32 bg-[#090a0c] text-white border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 mb-3">
              <span>INTELLECTUAL CURRICULUM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 mb-3">
              THE ORIGIN SYSTEM
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl">
              Not a random course marketplace. A structured intellectual architecture designed to build the person behind the success.
            </p>
          </div>

          {/* Tier Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["ALL", "FOUNDATIONS", "PERSONAL DEVELOPMENT", "WORK & BUSINESS"].map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                  activeTier === tier
                    ? "bg-zinc-100 text-zinc-950 font-bold"
                    : "bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Intelligent Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <div
              key={course.id}
              className={`rounded-3xl p-7 flex flex-col justify-between border transition-all duration-300 relative group ${
                course.isFlagship
                  ? "bg-zinc-950 border-amber-500/50 shadow-[0_0_30px_rgba(251,191,36,0.08)] ring-1 ring-amber-500/20"
                  : "bg-zinc-950/60 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-950"
              }`}
            >
              {/* Flagship Badge */}
              {course.isFlagship && (
                <div className="absolute -top-3.5 left-7 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 text-[11px] font-mono font-bold tracking-wider uppercase shadow-md">
                  ★ FLAGSHIP UNCONVENTIONAL EXPERIENCE
                </div>
              )}

              <div>
                {/* Header Info */}
                <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400/90">
                    {course.tier}
                  </span>
                  <div className="text-right">
                    {course.launchPriceNGN ? (
                      <div>
                        <span className="text-xs text-zinc-500 line-through mr-2 font-mono">{course.priceNGN}</span>
                        <span className="text-sm font-bold text-amber-400 font-mono">{course.launchPriceNGN}</span>
                        <span className="block text-[10px] text-amber-400/80 font-mono">Founding Launch</span>
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-zinc-200 font-mono">{course.priceNGN}</span>
                    )}
                  </div>
                </div>

                {/* Course Title & Subtitle */}
                <h3 className="text-xl font-bold text-zinc-100 mb-1 group-hover:text-amber-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-zinc-400 font-mono mb-4">
                  {course.subtitle}
                </p>

                {/* Intellectual Hook Quote */}
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 mb-5">
                  <p className="text-xs text-zinc-300 italic leading-relaxed">
                    "{course.hookQuestion}"
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Outcomes Checklist */}
                <div className="space-y-2 mb-8">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                    After this experience, you will:
                  </div>
                  {course.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-zinc-900">
                <Link
                  href={`/courses/${course.id}`}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all flex items-center justify-center gap-2 group/btn ${
                    course.isFlagship
                      ? "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                      : "bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                  }`}
                >
                  <span>EXPLORE EXPERIENCE</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
