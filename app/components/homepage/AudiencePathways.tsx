"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AudiencePathway {
  id: string;
  tabLabel: string;
  ageRange: string;
  title: string;
  tagline: string;
  description: string;
  keyOutcomes: string[];
  recommendedStartTitle: string;
  recommendedStartHref: string;
  parentOrSchoolDetails?: {
    question: string;
    answer: string;
  }[];
}

const AUDIENCES: AudiencePathway[] = [
  {
    id: "young-minds",
    tabLabel: "Young Minds",
    ageRange: "Ages 10–17",
    title: "CURIOSITY, REASONING & PRACTICAL THINKING",
    tagline: "Building mental models and financial common sense before adulthood.",
    description: "Conventional schooling trains young minds to memorize facts for exams. Origin trains young minds to evaluate choices, understand scarcity, calculate trade-offs, and express ideas with confidence.",
    keyOutcomes: [
      "Understanding money as a measure of trade-offs, not just paper to spend",
      "Confidence expressing complex ideas and asking deep questions in group settings",
      "Evaluating consequences before acting rather than succumbing to peer impulse",
      "Building a solid internal self-image rooted in competence rather than validation"
    ],
    recommendedStartTitle: "Economic Principles: Money, Value & Choice",
    recommendedStartHref: "/courses/economic-principles"
  },
  {
    id: "young-adults",
    tabLabel: "Young Adults",
    ageRange: "Ages 18–25",
    title: "MONEY, WORK, DECISIONS & ASYMMETRIC OPPORTUNITY",
    tagline: "Navigating university, early career, capital allocation, and independence.",
    description: "The transition into adulthood demands high-stakes decisions with zero practice. Origin equips young adults with rigorous frameworks to allocate scarce capital, diagnose career bottlenecks, and command respect in negotiations.",
    keyOutcomes: [
      "Deconstructing complex career and financial friction into actionable solution trees",
      "Mastering opportunity cost and asset cultivation (Money Farming)",
      "High-conviction decision-making under uncertainty without second-guessing",
      "Communicating with structured clarity and strategic composure"
    ],
    recommendedStartTitle: "Decision Making: Critical Thinking Under Pressure",
    recommendedStartHref: "/courses/decision-making"
  },
  {
    id: "adults",
    tabLabel: "Adults & Leaders",
    ageRange: "Ages 26+",
    title: "STRATEGIC INTUITION, ADAPTABILITY & HIGH-STAKES CLARITY",
    tagline: "Operating with calm conviction in volatile markets and complex teams.",
    description: "For professionals, founders, and leaders whose decisions carry major personal and financial weight. Origin provides mental models, antifragility systems, and communication frameworks to thrive when plans collapse.",
    keyOutcomes: [
      "Antifragile adaptability: turning unexpected disruption into leverage",
      "Resolving high-stakes negotiation friction without defensiveness",
      "Inversion thinking to systematically protect capital and eliminate blindspots",
      "Engineering personal boundaries and sustainable energy architectures"
    ],
    recommendedStartTitle: "Problem Solving: The Solution Mindset",
    recommendedStartHref: "/courses/problem-solving"
  },
  {
    id: "parents",
    tabLabel: "For Parents",
    ageRange: "Parent Guide",
    title: "WHAT IS YOUR CHILD ACTUALLY LEARNING?",
    tagline: "A safe, practical environment that complements schooling with real-world capability.",
    description: "Parents are not simply buyers; you want to know what changes in your child's daily behavior. Origin does not replace school academics—it builds the practical reasoning, financial clarity, and emotional composure schools rarely teach.",
    keyOutcomes: [
      "Safe, age-appropriate scenarios grounded in real Nigerian and global realities",
      "Learner performs active thinking loops (Think → Choose → Discover → Apply)",
      "Zero fear-based marketing; pure focus on capability, curiosity, and character",
      "Noticeable transformation in how your child discusses money, time, and responsibility"
    ],
    parentOrSchoolDetails: [
      {
        question: "What does the learner actually do on Origin?",
        answer: "Instead of passively watching long lectures, learners enter interactive situations (like the ₦20,000 challenge), make forced trade-off choices under constraints, reveal the underlying economic or psychological principle, and apply it to their personal life."
      },
      {
        question: "Is the platform safe and appropriate for young teenagers?",
        answer: "Yes. All content is strictly educational, focused on character, practical economics, decision-making, and critical thinking. There are no distracting social feeds or unmoderated chat rooms."
      },
      {
        question: "What changes after experiencing Origin?",
        answer: "Learners stop seeing money and decisions passively. They start calculating trade-offs, managing time deliberately, expressing thoughts clearly, and taking ownership of their actions."
      }
    ],
    recommendedStartTitle: "Explore Foundations for Youth",
    recommendedStartHref: "/courses/economic-principles"
  },
  {
    id: "schools",
    tabLabel: "Schools & Orgs",
    ageRange: "Institutions",
    title: "PRACTICAL THINKING BEYOND THE CLASSROOM",
    tagline: "Complementing conventional curricula with experiential problem-solving.",
    description: "Origin partners with schools, youth foundations, and learning communities to integrate interactive decision simulations and economic thinking into extracurricular and leadership development programs.",
    keyOutcomes: [
      "Experiential simulations that bring economics and critical thinking to life",
      "Group challenges designed for classroom debates and cohort problem-solving",
      "Structured learning companions with workbook reflection guides",
      "Empowers educators with inquiry-based discussion frameworks"
    ],
    parentOrSchoolDetails: [
      {
        question: "Does Origin claim accreditation?",
        answer: "Origin is an independent practical thinking platform and does not make misleading accreditation claims. We provide enrichment experiences that strengthen real-world cognitive capability alongside conventional academic schooling."
      },
      {
        question: "How do organizations partner with Origin?",
        answer: "We support cohort licensing, customized workshop simulations, and bulk digital access for classrooms, youth centers, and corporate training programs."
      }
    ],
    recommendedStartTitle: "Inquire About School & Cohort Access",
    recommendedStartHref: "/contact"
  }
];

export default function AudiencePathways() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const currentAudience = AUDIENCES[activeTabIdx];

  return (
    <section id="for-audiences" className="py-20 sm:py-32 bg-[#8A948B] text-white border-b border-white/15 relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
      {/* Subtle Radial Ambient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-mono text-white mb-3 sm:mb-4 shadow-sm backdrop-blur-md font-bold">
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span className="uppercase tracking-wider">TAILORED ENTRY PATHWAYS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight text-white mb-3 sm:mb-4">
            DESIGNED FOR EVERY STAGE OF LIFE
          </h2>

          <p className="text-white/85 text-xs sm:text-base md:text-lg font-light leading-relaxed px-1">
            Origin does not treat ages 10 to 45 as one generic audience. Discover how our experiences are tailored to your specific life stage and responsibilities.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {AUDIENCES.map((aud, idx) => {
            const isActive = activeTabIdx === idx;
            return (
              <button
                key={aud.id}
                onClick={() => setActiveTabIdx(idx)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-[11px] sm:text-sm font-mono font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 shadow-sm ${
                  isActive
                    ? "bg-[#E2E8DE] text-[#1C3B34] shadow-xl scale-105"
                    : "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white border border-white/20 backdrop-blur-md"
                }`}
              >
                <span>{aud.tabLabel}</span>
                <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isActive ? "bg-[#1C3B34] text-white" : "bg-white/20 text-white/80"
                }`}>
                  {aud.ageRange}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pathway Content Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAudience.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-[#E2E8DE] rounded-[1.75rem] sm:rounded-[2.5rem] border border-[#D5DDCF] text-[#172217] shadow-2xl p-5 sm:p-9 lg:p-12 space-y-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-[#D0D9CA]">
              <div className="space-y-2 max-w-2xl">
                <div className="text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                  PATHWAY // {currentAudience.tabLabel.toUpperCase()} ({currentAudience.ageRange})
                </div>
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#172217] tracking-tight leading-tight">
                  {currentAudience.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-serif italic text-[#4E5B4B]">
                  &ldquo;{currentAudience.tagline}&rdquo;
                </p>
                <p className="text-xs sm:text-sm md:text-base text-[#4E5B4B] leading-relaxed pt-1 sm:pt-2">
                  {currentAudience.description}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-3 sm:space-y-4 shrink-0 lg:max-w-xs w-full shadow-xs">
                <div className="text-[10px] sm:text-xs font-mono uppercase font-bold text-[#1C3B34]">
                  RECOMMENDED ENTRY POINT
                </div>
                <div className="font-extrabold text-sm sm:text-base text-[#172217]">
                  {currentAudience.recommendedStartTitle}
                </div>
                <Link
                  href={currentAudience.recommendedStartHref}
                  className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>{currentAudience.id === "schools" ? "CONTACT CONCIERGE" : "START THIS PATHWAY"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Key Outcomes Grid */}
            <div className="space-y-3 sm:space-y-4">
              <div className="text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                WHAT CHANGES AFTER THE EXPERIENCE:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {currentAudience.keyOutcomes.map((outcome, idx) => (
                  <div key={idx} className="p-3.5 sm:p-4 rounded-2xl bg-white/70 border border-[#CCD6C6] flex items-start gap-3 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#1C3B34] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#3E4A3B] leading-relaxed font-medium">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Parent / School Transparency & Assurance */}
            {currentAudience.parentOrSchoolDetails && currentAudience.parentOrSchoolDetails.length > 0 && (
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#D0D9CA] space-y-3 sm:space-y-4">
                <div className="text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1C3B34]" />
                  <span>TRANSPARENCY &amp; ASSURANCE:</span>
                </div>
                <div className="space-y-3">
                  {currentAudience.parentOrSchoolDetails.map((item, qIdx) => (
                    <div key={qIdx} className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-1.5 shadow-xs">
                      <div className="font-extrabold text-xs sm:text-base text-[#172217] flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[#1C3B34] shrink-0" />
                        <span>{item.question}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4E5B4B] leading-relaxed pl-6">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
