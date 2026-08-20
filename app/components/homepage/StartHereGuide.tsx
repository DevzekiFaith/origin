"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, BookOpen, Flame, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { startHereTracks } from "../../data/unconventional-learning";

export default function StartHereGuide() {
  const [selectedGoal, setSelectedGoal] = useState<string>("MONEY");

  const currentTrack = startHereTracks.find(t => t.goal === selectedGoal) || startHereTracks[0];

  return (
    <section id="start-here" className="py-24 sm:py-36 bg-[#F6F6F2] text-[#121316] border-b border-[#E8E8E3] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E2E2DC] text-xs font-mono text-[#52525B] mb-3 shadow-xs">
            <Target className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="font-bold uppercase">THE ORIGIN PATHFINDER</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#121316] mb-3">
            START HERE
          </h2>
          <p className="text-[#52525B] text-lg sm:text-xl font-light leading-relaxed">
            What dimension of life do you want to understand and master?
          </p>
        </motion.div>

        {/* Goal Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {startHereTracks.map((track) => {
            const isSelected = track.goal === selectedGoal;
            return (
              <motion.button
                key={track.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGoal(track.goal)}
                className={`px-6 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#121316] text-[#FFFFFF] shadow-lg ring-2 ring-[#121316]/20"
                    : "bg-[#FFFFFF] text-[#52525B] hover:text-[#121316] hover:bg-[#FFFFFF] border border-[#E2E2DC] shadow-xs"
                }`}
              >
                {track.goal}
              </motion.button>
            );
          })}
        </div>

        {/* Selected 3-Tier Recommendation Ecosystem Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-[#FFFFFF] border border-[#E2E2DC] rounded-3xl p-8 sm:p-12 md:p-14 shadow-[0_16px_50px_rgba(0,0,0,0.04)] relative space-y-8"
          >
            {/* Header info */}
            <div className="border-b border-[#F0F0EB] pb-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>RECOMMENDED LEARNING PATHWAY // {currentTrack.goal}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#121316] tracking-tight">
                {currentTrack.label}
              </h3>
              <p className="text-sm sm:text-base text-[#52525B] italic font-serif">
                "{currentTrack.tagline}"
              </p>
            </div>

            {/* 3-Part Interconnected Origin Ecosystem: Course • Challenge • Reading Companion */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. The Foundational Course */}
              <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E3] flex flex-col justify-between space-y-4 group hover:border-[#121316] transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-amber-800">
                    <GraduationCap className="w-4 h-4 text-amber-600" />
                    <span>01 // The Course</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#121316] leading-snug">
                    {currentTrack.recommendedCourse.title}
                  </h4>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {currentTrack.recommendedCourse.description}
                  </p>
                </div>
                <Link
                  href={`/courses/${currentTrack.recommendedCourse.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#121316] group-hover:text-amber-700 transition-colors pt-2"
                >
                  <span>START COURSE →</span>
                </Link>
              </div>

              {/* 2. The Origin Challenge */}
              <div className="p-6 rounded-2xl bg-zinc-950 text-white border border-zinc-800 flex flex-col justify-between space-y-4 group hover:border-amber-400/50 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-red-400">
                    <Flame className="w-4 h-4 text-red-400" />
                    <span>02 // The Challenge</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-100 leading-snug">
                    {currentTrack.recommendedChallenge.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {currentTrack.recommendedChallenge.description}
                  </p>
                </div>
                <Link
                  href={`/courses/${currentTrack.recommendedCourse.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 hover:text-amber-200 transition-colors pt-2"
                >
                  <span>TEST THINKING →</span>
                </Link>
              </div>

              {/* 3. The Origin Reading Companion */}
              <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E3] flex flex-col justify-between space-y-4 group hover:border-amber-600 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-emerald-800">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>03 // Reading Companion</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#121316] leading-snug">
                    {currentTrack.recommendedCompanion.title}
                  </h4>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {currentTrack.recommendedCompanion.description}
                  </p>
                </div>
                <Link
                  href={`/store/${currentTrack.recommendedCompanion.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 hover:text-emerald-700 transition-colors pt-2"
                >
                  <span>READ COMPANION →</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
