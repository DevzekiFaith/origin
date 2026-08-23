"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Target,
  BookOpen,
  Flame,
  GraduationCap,
  Compass,
  CheckCircle2,
  Globe,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { startHereTracks } from "../../data/unconventional-learning";

const TRACK_IMAGES: Record<string, string> = {
  MONEY: "/images/lifestyle_woman.jpg",
  DECISIONS: "/images/testimonial_chinedu.jpg",
  SELF: "/images/testimonial_emmanuel.jpg",
  PEOPLE: "/images/testimonial_amara.jpg",
  PROBLEMS: "/images/testimonial_tobi.jpg",
  GROWTH: "/images/testimonial_fatima.jpg",
};

export default function StartHereGuide() {
  const [selectedGoal, setSelectedGoal] = useState<string>("MONEY");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentTrack = startHereTracks.find((t) => t.goal === selectedGoal) || startHereTracks[0];
  const trackImage = TRACK_IMAGES[selectedGoal] || "/images/lifestyle_woman.jpg";

  // Auto advance every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIdx = (prev + 1) % startHereTracks.length;
        setSelectedGoal(startHereTracks[nextIdx].goal);
        return nextIdx;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="start-here"
      className="py-24 sm:py-36 bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white border-b border-white/15 relative overflow-hidden selection:bg-white selection:text-[#8A948B]"
    >
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/15 blur-[180px] rounded-full"
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
            <Target className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="font-bold uppercase tracking-wider">THE ORIGIN PATHFINDER</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight text-white mb-3">
            START HERE
          </h2>

          <p className="text-white/85 text-lg sm:text-xl font-light leading-relaxed">
            What dimension of life do you want to understand and master?
          </p>
        </motion.div>

        {/* Goal Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {startHereTracks.map((track, idx) => {
            const isSelected = track.goal === selectedGoal;
            return (
              <motion.button
                key={track.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setSelectedGoal(track.goal);
                  setActiveIndex(idx);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-[#E2E8DE] text-[#1C3B34] shadow-lg scale-105"
                    : "bg-white/15 text-white hover:bg-white/25 border border-white/20 backdrop-blur-md"
                }`}
              >
                <span>{track.goal}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Main Clean Canvas Container matching reference image layout */}
        <div
          className="bg-[#E2E8DE] rounded-[2.5rem] border border-[#D5DDCF] text-[#172217] shadow-2xl p-6 sm:p-10 lg:p-14 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-[#D0D9CA]">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 border border-[#CCD6C6] rounded-full text-xs font-mono text-[#3E4A3B] shadow-2xs mb-3 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#1C3B34]" />
                <span className="uppercase tracking-wider">RECOMMENDED PATHWAY // {currentTrack.goal}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#172217] tracking-tight leading-tight">
                {currentTrack.label}
              </h3>
              <p className="text-sm sm:text-base text-[#4E5B4B] italic font-serif mt-1">
                &ldquo;{currentTrack.tagline}&rdquo;
              </p>
            </div>
          </div>

          {/* 2-Column Showcase Layout matching sample reference image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[400px]">
              <div>
                {/* 3-Tier Interconnected Origin Ecosystem List */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTrack.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    {/* 01 // The Course */}
                    <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] flex items-start gap-3.5 shadow-xs">
                      <div className="p-2 rounded-xl bg-[#8A948B] text-white shrink-0 mt-0.5">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase font-bold text-[#1C3B34]">
                          01 // FOUNDATIONAL COURSE
                        </div>
                        <div className="font-extrabold text-sm sm:text-base text-[#172217] leading-snug">
                          {currentTrack.recommendedCourse.title}
                        </div>
                        <p className="text-xs text-[#4E5B4B] mt-1 leading-relaxed">
                          {currentTrack.recommendedCourse.description}
                        </p>
                      </div>
                    </div>

                    {/* 02 // The Challenge */}
                    <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] flex items-start gap-3.5 shadow-xs">
                      <div className="p-2 rounded-xl bg-[#1C3B34] text-white shrink-0 mt-0.5">
                        <Flame className="w-4 h-4 text-amber-300" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase font-bold text-[#1C3B34]">
                          02 // SIGNATURE CHALLENGE
                        </div>
                        <div className="font-extrabold text-sm sm:text-base text-[#172217] leading-snug">
                          {currentTrack.recommendedChallenge.title}
                        </div>
                        <p className="text-xs text-[#4E5B4B] mt-1 leading-relaxed">
                          {currentTrack.recommendedChallenge.description}
                        </p>
                      </div>
                    </div>

                    {/* 03 // Reading Companion */}
                    <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] flex items-start gap-3.5 shadow-xs">
                      <div className="p-2 rounded-xl bg-[#8A948B] text-white shrink-0 mt-0.5">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase font-bold text-[#1C3B34]">
                          03 // READING COMPANION
                        </div>
                        <div className="font-extrabold text-sm sm:text-base text-[#172217] leading-snug">
                          {currentTrack.recommendedCompanion.title}
                        </div>
                        <p className="text-xs text-[#4E5B4B] mt-1 leading-relaxed">
                          {currentTrack.recommendedCompanion.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Switcher Indicator Capsule Bar */}
                <div className="mt-6 mb-6 inline-flex items-center gap-2 p-1.5 bg-white/60 border border-[#CCD6C6] rounded-full shadow-inner">
                  {startHereTracks.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveIndex(idx);
                        setSelectedGoal(startHereTracks[idx].goal);
                      }}
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

              {/* Bottom Left Metric Display */}
              <div className="pt-4 border-t border-[#D0D9CA]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTrack.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="text-4xl sm:text-5xl font-extrabold text-[#172217] font-mono tracking-tight">
                      3-TIER ECOSYSTEM
                    </div>
                    <div className="text-xs font-medium text-[#4E5B4B] mt-1 uppercase tracking-wider">
                      Integrated Course + Challenge + Reading Companion
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
                    key={currentTrack.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={trackImage}
                      alt={currentTrack.label}
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
                          {currentTrack.goal} Pathfinder Track
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-300 font-light mt-1 flex items-center gap-1.5">
                          <span>→ {currentTrack.tagline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Floating Pill Badges */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-2 z-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-sm">
                          <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                          <span>Course</span>
                        </div>
                        <div className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-sm">
                          <Flame className="w-3.5 h-3.5 text-red-400" />
                          <span>Challenge</span>
                        </div>
                        <div className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-sm">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Companion</span>
                        </div>
                      </div>

                      <div className="bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                        <span>Pathfinder ★ 100%</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-10 pt-8 border-t border-[#D0D9CA] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm text-[#4E5B4B]">
              <span className="font-mono uppercase font-bold text-[#1C3B34]">RECOMMENDED START:</span>
              <span className="font-bold text-[#172217]">{currentTrack.recommendedCourse.title}</span>
            </div>

            <Link
              href={`/courses/${currentTrack.recommendedCourse.id}`}
              className="px-6 py-3.5 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              <span>START THIS PATHWAY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
