"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Flame,
  Clock,
  Award,
  ShieldAlert,
  Sparkles,
  Zap,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { originChallengesList } from "../../data/unconventional-learning";

const CHALLENGE_IMAGES: Record<string, string> = {
  "challenge-100k": "/images/lifestyle_woman.jpg",
  "challenge-conversation": "/images/testimonial_amara.jpg",
  "challenge-business-problem": "/images/testimonial_fatima.jpg",
  "challenge-limited-opportunity": "/images/testimonial_chinedu.jpg",
  "challenge-broken-plan": "/images/testimonial_emmanuel.jpg",
  "challenge-resource-constraint": "/images/testimonial_tobi.jpg",
};

export default function OriginChallengesPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentChallenge = originChallengesList[activeIndex] || originChallengesList[0];
  const challengeImage = CHALLENGE_IMAGES[currentChallenge.id] || "/images/lifestyle_woman.jpg";

  // Auto advance every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % originChallengesList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="origin-challenges"
      className="py-24 sm:py-36 bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white border-b border-white/15 relative overflow-hidden selection:bg-white selection:text-[#8A948B]"
    >
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 30, 0],
            y: [0, -25, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-white/15 blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono text-white mb-4 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="uppercase font-bold tracking-wider">ORIGIN CHALLENGES // REAL-WORLD PRESSURES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight text-white mb-3">
            TEST YOUR THINKING UNDER FIRE
          </h2>

          <p className="text-white/85 text-lg sm:text-xl font-light leading-relaxed">
            No multiple choice trivia. Origin Challenges place you inside high-stakes dilemmas with multiple viable answers.
          </p>
        </motion.div>

        {/* Challenge Switcher Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {originChallengesList.map((ch, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <motion.button
                key={ch.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveIndex(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-[#E2E8DE] text-[#1C3B34] shadow-lg scale-105"
                    : "bg-white/15 text-white hover:bg-white/25 border border-white/20 backdrop-blur-md"
                }`}
              >
                <span>{ch.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Main Clean Canvas Container matching reference image layout */}
        <div
          className="bg-[#E2E8DE] rounded-[2.5rem] border border-[#D5DDCF] text-[#172217] shadow-2xl p-6 sm:p-10 lg:p-14 relative mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-[#D0D9CA]">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 border border-[#CCD6C6] rounded-full text-xs font-mono text-[#3E4A3B] shadow-2xs mb-3 font-bold">
                <Flame className="w-3.5 h-3.5 text-[#1C3B34] animate-bounce" />
                <span className="uppercase tracking-wider">ACTIVE CHALLENGE SIMULATION</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#172217] tracking-tight leading-tight">
                {currentChallenge.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4E5B4B] font-light mt-1">
                Category: {currentChallenge.category}
              </p>
            </div>

            {/* Difficulty Badge */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 border border-[#CCD6C6] text-[#1C3B34] font-bold">
                Difficulty: {currentChallenge.difficulty}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#8A948B] text-white font-bold flex items-center gap-1.5 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                {currentChallenge.timeLimit}
              </span>
            </div>
          </div>

          {/* 2-Column Showcase Layout matching sample reference image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[380px]">
              <div>
                {/* Category Subhead */}
                <div className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-widest mb-3">
                  08 // SIMULATION SCENARIO
                </div>

                {/* Active Content Animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentChallenge.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-5"
                  >
                    {/* Main Title matching sample typography */}
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-[#172217] tracking-tight leading-tight">
                      &ldquo;{currentChallenge.title}&rdquo;
                    </h4>

                    <p className="text-sm sm:text-base text-[#4E5B4B] leading-relaxed font-normal">
                      {currentChallenge.description}
                    </p>

                    {/* Evaluates Box */}
                    <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-1 shadow-xs">
                      <div className="text-[10px] font-mono uppercase font-bold text-[#1C3B34]">
                        WHAT THIS CHALLENGE EVALUATES:
                      </div>
                      <p className="text-xs sm:text-sm text-[#172217] font-mono font-bold">
                        {currentChallenge.evaluates}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Switcher Indicator Capsule Bar */}
                <div className="mt-8 mb-8 inline-flex items-center gap-2 p-1.5 bg-white/60 border border-[#CCD6C6] rounded-full shadow-inner">
                  {originChallengesList.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`transition-all duration-300 cursor-pointer ${
                        activeIndex === idx
                          ? "w-8 h-2.5 bg-[#1C3B34] rounded-full"
                          : "w-2.5 h-2.5 bg-[#CBD4C7] hover:bg-[#8A948B] rounded-full"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Left Metric Display (Matching 70% Interview Rate in Sample Image) */}
              <div className="pt-6 border-t border-[#D0D9CA]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentChallenge.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="text-5xl sm:text-6xl font-extrabold text-[#172217] font-mono tracking-tight">
                      {currentChallenge.timeLimit}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-[#4E5B4B] mt-1.5 uppercase tracking-wider">
                      Friction & Time Limit Simulation
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Media Card Showcase (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#121316] shadow-xl group border border-[#D5DDCF]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentChallenge.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={challengeImage}
                      alt={currentChallenge.title}
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50" />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-6 left-6 max-w-sm">
                      <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-white shadow-xl">
                        <div className="text-xl sm:text-2xl font-bold font-sans tracking-tight">
                          {currentChallenge.title}
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-300 font-light mt-1 flex items-center gap-1.5">
                          <span>→ Evaluates: {currentChallenge.evaluates.split(",")[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Floating Pill Badges */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-2 z-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-sm">
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          <span>High-Stakes</span>
                        </div>
                        <div className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-sm">
                          <Clock className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{currentChallenge.timeLimit}</span>
                        </div>
                      </div>

                      <div className="bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                        <span>Difficulty ★ {currentChallenge.difficulty}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-12 pt-8 border-t border-[#D0D9CA] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm text-[#4E5B4B]">
              <span className="font-mono uppercase font-bold text-[#1C3B34]">PLATFORM FEATURE:</span>
              <span className="font-bold text-[#172217]">Included in all Origin Foundation courses</span>
            </div>

            <Link
              href="/courses/economic-principles"
              className="px-6 py-3.5 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              <span>ENTER ORIGIN CHALLENGES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Grid Browsing Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {originChallengesList.map((ch, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? "bg-[#8A948B] text-white border-[#8A948B] shadow-md scale-102"
                    : "bg-[#E2E8DE] text-[#3E4A3B] hover:bg-[#8A948B] hover:text-white border-[#D5DDCF]"
                }`}
              >
                <div className="text-[10px] font-mono font-bold opacity-80 uppercase">08 // {ch.category}</div>
                <div className="font-bold text-xs sm:text-sm line-clamp-1">{ch.title}</div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
