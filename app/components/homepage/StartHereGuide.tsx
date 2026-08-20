"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { startHereTracks } from "../../data/unconventional-learning";

export default function StartHereGuide() {
  const [selectedGoal, setSelectedGoal] = useState<string>("UNDERSTANDING MONEY");

  const currentTrack = startHereTracks.find(t => t.goal === selectedGoal) || startHereTracks[0];

  return (
    <section id="start-here" className="py-24 sm:py-32 bg-[#F6F6F2] text-[#121316] border-b border-[#E8E8E3] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E2E2DC] text-xs font-mono text-[#52525B] mb-3 shadow-sm">
            <Target className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="font-semibold uppercase">PERSONALIZED PATHFINDER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121316] mb-3">
            START HERE
          </h2>
          <p className="text-[#52525B] text-base sm:text-lg">
            What do you want to become better at?
          </p>
        </motion.div>

        {/* Goal Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {startHereTracks.map((track) => {
            const isSelected = track.goal === selectedGoal;
            return (
              <motion.button
                key={track.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGoal(track.goal)}
                className={`px-5 py-3 rounded-xl font-medium text-xs sm:text-sm font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#121316] text-[#FFFFFF] shadow-md font-semibold ring-2 ring-[#121316]/20"
                    : "bg-[#FFFFFF] text-[#52525B] hover:text-[#121316] hover:bg-[#FFFFFF] border border-[#E2E2DC] shadow-xs"
                }`}
              >
                {track.goal}
              </motion.button>
            );
          })}
        </div>

        {/* Selected Recommendation Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-[#FFFFFF] border border-[#E2E2DC] rounded-3xl p-7 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.04)] relative overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>RECOMMENDED STARTING POINT</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#121316]">
                  {currentTrack.recommendedTitle}
                </h3>

                <p className="text-base sm:text-lg text-[#3F3F46] font-normal leading-relaxed">
                  {currentTrack.why}
                </p>

                <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E8E8E3] text-xs sm:text-sm text-[#52525B] italic">
                  "{currentTrack.tagline}"
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-l border-[#F0F0EB] pt-6 md:pt-0 md:pl-8">
                <div className="text-xs font-mono text-[#71717A] mb-1">LEARNING FORMAT</div>
                <div className="text-sm font-semibold text-[#121316] mb-6">Interactive Decisions & Missions</div>

                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full md:w-auto">
                  <Link
                    href={`/courses/${currentTrack.recommendedCourseId}`}
                    className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-[#121316] text-[#FFFFFF] font-semibold text-sm hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 group shadow-sm cursor-pointer"
                  >
                    <span>ENTER EXPERIENCE</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
