"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Compass,
  HelpCircle,
  Lightbulb,
  Building2,
  Target,
  Shield,
  Search,
  Globe,
  ThumbsUp,
  Zap,
  Layers,
  Sparkles,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OriginExperienceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  hookQuestion: string;
  description: string;
  tier: string;
  experienceCount: string;
  priceNGN: string;
  launchPriceNGN?: string;
  isFlagship?: boolean;
  image: string;
  imageAlt: string;
  ageTag: string;
  outcomes: string[];
  tags: string[];
}

const EXPERIENCES_DATA: OriginExperienceItem[] = [
  {
    id: "economic-principles",
    number: "01",
    title: "ECONOMIC PRINCIPLES",
    subtitle: "Understanding Money, Choice, Value & Opportunity",
    hookQuestion: "What if understanding money starts with understanding choice?",
    description: "Learn to recognise scarcity, value, opportunity and trade-offs in everyday life through real-world missions.",
    tier: "FOUNDATIONS",
    experienceCount: "6 Thinking Experiences",
    priceNGN: "₦21,000",
    launchPriceNGN: "₦15,000",
    isFlagship: true,
    image: "/outreach_child_hero.png",
    imageAlt: "Learners mastering economic principles",
    ageTag: "Ages 10–45 Universal",
    tags: ["Scarcity", "Value", "Opportunity", "Choice"],
    outcomes: [
      "Recognise invisible trade-offs before making irreversible commitments",
      "Understand why prices fluctuate and how value is perceived",
      "Deploy scarce resources to create the greatest real-world leverage",
    ],
  },
  {
    id: "decision-making",
    number: "02",
    title: "DECISION MAKING",
    subtitle: "Frameworks for Critical Thinking Under Pressure",
    hookQuestion: "Why do smart people make bad decisions under pressure?",
    description: "Master mental models, inversion thinking, and probability calculation to decide with calm conviction under pressure.",
    tier: "FOUNDATIONS",
    experienceCount: "5 Thinking Experiences",
    priceNGN: "₦21,000",
    image: "/images/ng_decisions.jpg",
    imageAlt: "Strategist analyzing high-stakes decisions",
    ageTag: "Ages 16–45 Execs & Students",
    tags: ["Mental Models", "Inversion", "Probability"],
    outcomes: [
      "Reduce decision fatigue and emotional bias under pressure",
      "Apply inversion to avoid catastrophic, uncalculated mistakes",
      "Make calculated choices with incomplete information",
    ],
  },
  {
    id: "problem-solving",
    number: "03",
    title: "PROBLEM SOLVING",
    subtitle: "Solution Mindset & Analytical Decomposition",
    hookQuestion: "How do you solve problems that don't have an obvious formula?",
    description: "Learn to deconstruct hard challenges systematically and separate root causes from distracting surface symptoms.",
    tier: "FOUNDATIONS",
    experienceCount: "5 Thinking Experiences",
    priceNGN: "₦21,000",
    image: "/images/ng_problems.jpg",
    imageAlt: "Strategist solving complex problems",
    ageTag: "Ages 18–45 Founders & Strategists",
    tags: ["Diagnostics", "Root Cause", "Decomposition"],
    outcomes: [
      "Distinguish underlying root causes from superficial symptoms",
      "Build multi-perspective solution trees for messy problems",
      "Overcome cognitive blocks and execute solutions with composure",
    ],
  },
  {
    id: "communication",
    number: "04",
    title: "COMMUNICATION MASTERY",
    subtitle: "Clarity, Listening & Strategic Influence",
    hookQuestion: "Why do people misunderstand each other in critical moments?",
    description: "Master structured speech, active listening to decode intent, and navigating high-stakes conversations with composure.",
    tier: "FOUNDATIONS",
    experienceCount: "4 Thinking Experiences",
    priceNGN: "₦21,000",
    image: "/images/ng_communication.jpg",
    imageAlt: "Leader facilitating strategic communication",
    ageTag: "Ages 20–45 Leaders",
    tags: ["Clarity", "Influence", "Intent Decoding"],
    outcomes: [
      "Structure complex messages for instant clarity and buy-in",
      "Listen deeply to decode emotional subtext and hidden intent",
      "Navigate difficult negotiations without creating unnecessary friction",
    ],
  },
  {
    id: "self-image",
    number: "05",
    title: "STRENGTHENING SELF-IMAGE",
    subtitle: "Perception, Identity & Self-Conviction",
    hookQuestion: "How do you build self-conviction that doesn't collapse under doubt?",
    description: "Build unshakeable internal conviction based on demonstrated competence and kept promises to yourself over time.",
    tier: "FOUNDATIONS",
    experienceCount: "4 Thinking Experiences",
    priceNGN: "₦21,000",
    image: "/images/ng_self.jpg",
    imageAlt: "Presenter building unshakeable self-conviction",
    ageTag: "Ages 12–40 Youth & Adults",
    tags: ["Conviction", "Identity", "Boundaries"],
    outcomes: [
      "Establish healthy, uncompromised personal boundaries",
      "Replace fragile self-talk with quiet, verified competence",
      "Align personal identity with long-term aspirations",
    ],
  },
  {
    id: "personal-adaptability",
    number: "06",
    title: "PERSONAL ADAPTABILITY",
    subtitle: "Resilience & Antifragility in Changing Realities",
    hookQuestion: "How do you pivot when your best-laid plans collapse?",
    description: "Develop the cognitive flexibility, antifragile habits, and emotional regulation required to thrive during sudden disruption.",
    tier: "FOUNDATIONS",
    experienceCount: "4 Thinking Experiences",
    priceNGN: "₦21,000",
    image: "/images/ng_growth.jpg",
    imageAlt: "Founder executing resilient pivot",
    ageTag: "Ages 18–45 Professionals",
    tags: ["Antifragility", "Resilience", "Flexibility"],
    outcomes: [
      "Recover emotional equilibrium quickly after unexpected setbacks",
      "Pivot strategy without losing operational momentum",
      "Build antifragile habits in unpredictable environments",
    ],
  },
];

export default function OriginCourseCatalog() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [tappedCardId, setTappedCardId] = useState<string | null>(null);

  const toggleMobileCard = (id: string) => {
    setTappedCardId(tappedCardId === id ? null : id);
  };

  return (
    <section
      id="origin-curriculum"
      className="py-20 sm:py-32 bg-[#FAFAF8] border-b border-[#E8E8E3] text-[#121316] relative overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E2E8DE] border border-[#CCD6C6] rounded-full text-xs font-mono text-[#1C3B34] shadow-xs mb-4">
            <Compass className="w-3.5 h-3.5 text-[#1C3B34]" />
            <span className="uppercase tracking-wider font-bold">THE ORIGIN FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#172217] tracking-tight leading-tight">
            PRACTICAL THINKING EXPERIENCES
          </h2>
          <p className="text-base sm:text-lg text-[#4E5B4B] font-light mt-3 leading-relaxed">
            School starts with the answer. Origin starts with the question. Each foundational experience is structured around four deliberate movements:
          </p>

          {/* 4-Stage Architecture Badge Bar */}
          <div className="inline-flex flex-wrap items-center gap-2 mt-4 p-1.5 px-3 rounded-2xl bg-[#E2E8DE]/80 border border-[#CCD6C6] text-xs font-mono font-bold text-[#1C3B34]">
            <span className="text-amber-700">01 THINK</span>
            <span className="text-[#CCD6C6]">→</span>
            <span className="text-[#1C3B34]">02 EXPERIENCE</span>
            <span className="text-[#CCD6C6]">→</span>
            <span className="text-[#1C3B34]">03 CHALLENGE</span>
            <span className="text-[#CCD6C6]">→</span>
            <span className="text-amber-700">04 APPLY</span>
          </div>
        </div>

        {/* 6 FOUNDATIONS: MICROSOFT STORE-INSPIRED INTERACTIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {EXPERIENCES_DATA.map((exp) => {
            const isHovered = hoveredCardId === exp.id;
            const isTapped = tappedCardId === exp.id;
            const isExpanded = isHovered || isTapped;

            return (
              <div
                key={exp.id}
                onMouseEnter={() => setHoveredCardId(exp.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => toggleMobileCard(exp.id)}
                className={`group relative rounded-[2rem] bg-[#E2E8DE] border transition-all duration-300 ease-out cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isExpanded
                    ? "bg-[#FBFBF9] border-[#1C3B34]/35 shadow-[0_20px_40px_-15px_rgba(28,59,52,0.18)] -translate-y-2 ring-1 ring-[#1C3B34]/20"
                    : "border-[#CCD6C6] hover:bg-[#FBFBF9] hover:border-[#1C3B34]/35 hover:shadow-[0_20px_40px_-15px_rgba(28,59,52,0.18)] hover:-translate-y-2"
                }`}
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={exp.image}
                    alt={exp.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover object-center transition-transform duration-700 ease-out ${
                      isExpanded ? "scale-105" : "group-hover:scale-105"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                    <span className="text-[10px] font-mono font-extrabold tracking-widest uppercase bg-black/60 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full border border-white/20 shadow-xs">
                      {exp.number} · {exp.tier}
                    </span>
                    <span className="text-[10.5px] font-mono text-white font-bold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs">
                      {exp.launchPriceNGN || exp.priceNGN}
                    </span>
                  </div>

                  {/* Bottom Framework Badge on Image */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[9.5px] font-mono text-white/90 border border-white/15">
                      <span className="text-amber-300 font-bold">THINK</span>
                      <span>·</span>
                      <span>EXPERIENCE</span>
                      <span>·</span>
                      <span>CHALLENGE</span>
                      <span>·</span>
                      <span>APPLY</span>
                    </div>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div className="space-y-3">
                    {/* Header Titles */}
                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-[#172217] tracking-tight group-hover:text-[#1C3B34] transition-colors leading-snug">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-[#52525B] font-mono font-medium line-clamp-1">
                        {exp.subtitle}
                      </p>
                    </div>

                    {/* Hook Question Pill */}
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold mb-0.5 flex items-center gap-1.5">
                        <HelpCircle className="w-3 h-3 text-amber-700" />
                        <span>Core Dilemma</span>
                      </div>
                      <p className="text-xs font-semibold text-[#172217] leading-relaxed">
                        {exp.hookQuestion}
                      </p>
                    </div>

                    {/* Microsoft Store-Inspired Reveal: Description & Core Outcome */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isExpanded
                          ? "max-h-56 opacity-100 mt-3 pt-3 border-t border-[#D5DDCF]"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-xs text-[#4E5B4B] leading-relaxed mb-3">
                        {exp.description}
                      </p>

                      <div className="space-y-1.5">
                        <div className="text-[10px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider">
                          Key Outcome:
                        </div>
                        <div className="flex items-start gap-2 text-xs text-[#2A3728]">
                          <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{exp.outcomes[0]}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Action Bar */}
                  <div className="pt-5 mt-5 border-t border-[#CCD6C6]/70 flex items-center justify-between gap-3">
                    <div className="text-[11px] font-mono text-[#4E5B4B]">
                      <span>{exp.experienceCount}</span>
                    </div>

                    <Link
                      href={`/courses/${exp.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C3B34] hover:bg-[#132B25] text-white text-xs font-mono font-bold tracking-wide transition-all shadow-sm hover:shadow group-hover:translate-x-0.5 shrink-0"
                    >
                      <span>EXPLORE EXPERIENCE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 6. PREMIUM PATHWAY: "GO DEEPER → WORK WITH ORIGIN" */}
        <div className="mt-14 sm:mt-18">
          <div className="relative rounded-[2.5rem] bg-[#E2E8DE] text-[#172217] p-8 sm:p-12 lg:p-16 border border-[#CCD6C6] shadow-xl overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/60 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8A948B]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Thesis & Offerings */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/95 border border-[#CCD6C6] rounded-full text-xs font-mono font-bold text-[#1C3B34] shadow-xs">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>EXECUTIVE &amp; INSTITUTIONAL PATHWAY</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight text-[#172217] leading-tight">
                    GO DEEPER → Work with Origin
                  </h3>
                  <p className="text-base sm:text-lg text-[#4E5B4B] font-light leading-relaxed max-w-2xl">
                    For founders, executives, and organizations facing high-consequence inflection points. Access private thinking audits, bespoke strategic frameworks, and direct advisory with Origin Faculty.
                  </p>
                </div>

                {/* 3 Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-1.5 shadow-xs">
                    <div className="text-xs font-mono font-bold text-[#1C3B34]">01 · DECISION AUDITS</div>
                    <p className="text-xs text-[#4E5B4B] leading-relaxed font-light">
                      1-on-1 strategic stress-testing to eliminate blindspots and second-order traps before irreversible moves.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-1.5 shadow-xs">
                    <div className="text-xs font-mono font-bold text-[#1C3B34]">02 · THINKING LABS</div>
                    <p className="text-xs text-[#4E5B4B] leading-relaxed font-light">
                      Multi-day executive immersion in economic principles, capital allocation, and antifragile architecture.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-1.5 shadow-xs">
                    <div className="text-xs font-mono font-bold text-[#1C3B34]">03 · TEAM DEPLOYMENT</div>
                    <p className="text-xs text-[#4E5B4B] leading-relaxed font-light">
                      Embed the Origin Thinking Model (THINK → EXPERIENCE → CHALLENGE → APPLY) across your key teams.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: CTA Card */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                <div className="w-full max-w-sm p-6 sm:p-7 rounded-3xl bg-white border border-[#CCD6C6] text-center space-y-4 shadow-xl">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#1C3B34] font-bold">
                    CONFIDENTIAL ADVISORY
                  </div>
                  <h4 className="text-lg font-bold text-[#172217] leading-snug">
                    Private Strategic Engagements
                  </h4>
                  <p className="text-xs text-[#52525B] leading-relaxed font-light">
                    Direct engagements with Zeki Ubor and Origin Senior Fellows. By application and interview only.
                  </p>

                  <Link
                    href="/contact?category=advisory"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#1C3B34] hover:bg-[#132B25] text-white font-mono font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Work with Origin →</span>
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-[10.5px] font-mono text-[#4E5B4B]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1C3B34]" />
                    <span>Strictly Confidential · High Stakes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7. SECONDARY ARCHIVE & LIBRARY PATHWAY */}
        <div className="mt-8 p-6 rounded-3xl bg-[#E2E8DE]/70 border border-[#CCD6C6] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#CCD6C6] flex items-center justify-center shrink-0 text-[#1C3B34] shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#172217]">
                Origin Archive &amp; Extended Library
              </h5>
              <p className="text-xs text-[#4E5B4B] font-light">
                Preserving extended team collaboration modules, historical archives, and specialized toolkits.
              </p>
            </div>
          </div>

          <Link
            href="/courses"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#1C3B34] text-[#172217] hover:text-white border border-[#CCD6C6] text-xs font-mono font-bold transition-all whitespace-nowrap shadow-xs"
          >
            Browse Extended Archive →
          </Link>
        </div>
      </div>
    </section>
  );
}
