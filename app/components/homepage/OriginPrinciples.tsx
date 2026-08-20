"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface IdentityPillar {
  letter: string;
  word: string;
  description: string;
}

const IDENTITY_PILLARS: IdentityPillar[] = [
  {
    letter: "A",
    word: "PRACTICAL",
    description: "Learn through real situations, decisions and experiences rather than memorisation.",
  },
  {
    letter: "C",
    word: "CURIOUS",
    description: "Start with questions, not predetermined answers.",
  },
  {
    letter: "T",
    word: "APPLIED",
    description: "Turn ideas into decisions, action and real-world understanding.",
  },
  {
    letter: "F",
    word: "FOUNDATIONAL",
    description: "Build knowledge and thinking skills that remain useful beyond the course.",
  },
  {
    letter: "E",
    word: "EXPERIENTIAL",
    description: "Think, choose, discover and apply.",
  },
];

export default function OriginPrinciples() {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);

  return (
    <section className="py-24 sm:py-36 bg-[#FAFAF8] border-b border-[#E8E8E3] text-[#121316] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFFFFF] border border-[#E2E2DC] rounded-full text-xs sm:text-sm font-mono text-[#52525B] shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
            <span className="uppercase tracking-wider font-medium">ORIGIN PRINCIPLES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#121316]">
            How Origin Learns
          </h2>

          <p className="text-base sm:text-xl text-[#52525B] font-light leading-relaxed max-w-2xl mx-auto">
            Five core disciplines that separate practical capability from conventional classroom theory.
          </p>
        </motion.div>

        {/* 5-Pillar Architectural Cards (A C T F E) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {IDENTITY_PILLARS.map((pillar, idx) => {
            const isHovered = hoveredLetter === pillar.letter;

            return (
              <motion.div
                key={pillar.letter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                onMouseEnter={() => setHoveredLetter(pillar.letter)}
                onMouseLeave={() => setHoveredLetter(null)}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`p-7 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between group cursor-default relative overflow-hidden ${
                  isHovered
                    ? "bg-[#FFFFFF] border-amber-500/50 shadow-[0_16px_40px_rgba(217,119,6,0.08)] ring-1 ring-amber-500/20"
                    : "bg-[#FFFFFF] border-[#E8E8E3] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#D4D4CE]"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Letter Emblem */}
                  <div className="flex items-center justify-between">
                    <span className="text-4xl sm:text-5xl font-mono text-[#121316] font-normal leading-none tracking-tight">
                      {pillar.letter}
                    </span>
                    <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Word Title */}
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#121316] font-normal group-hover:text-amber-700 transition-colors">
                      {pillar.word}
                    </div>
                    <div className="w-4 h-px bg-[#E2E2DC] group-hover:w-8 group-hover:bg-amber-600 transition-all duration-300" />
                  </div>

                  {/* Down Indicator */}
                  <div className="text-[#A1A1AA] text-xs">
                    ↓
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-light pt-1">
                    {pillar.description}
                  </p>
                </div>

                {/* Soft bottom accent indicator */}
                <div className="pt-4 mt-4 border-t border-[#F3F3EE]">
                  <div className="w-2 h-2 rounded-full bg-amber-500/40 group-hover:bg-amber-600 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Concise Closing Statement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-3xl bg-[#F4F3EE] border border-[#E2E2DC] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <p className="text-sm sm:text-base text-[#3F3F46] font-light max-w-2xl italic font-serif leading-relaxed">
            “Learning designed to help you think better, make better decisions and apply what you learn to real life.”
          </p>
          <Link
            href="/courses/economic-principles"
            className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-[#121316] text-[#FFFFFF] text-xs sm:text-sm font-mono font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0 cursor-pointer"
          >
            <span>EXPLORE EXPERIENCES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
