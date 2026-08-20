"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, CheckCircle, Sparkles, Target, Zap, Shield } from "lucide-react";
import { startHereTracks } from "../../data/unconventional-learning";

export default function StartHereGuide() {
  const [selectedGoal, setSelectedGoal] = useState<string>("UNDERSTANDING MONEY");

  const currentTrack = startHereTracks.find(t => t.goal === selectedGoal) || startHereTracks[0];

  return (
    <section id="start-here" className="py-20 md:py-28 bg-[#0c0d11] text-white border-b border-zinc-900 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 mb-3">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>PERSONALIZED PATHFINDER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-3">
            START HERE
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            What do you want to become better at?
          </p>
        </div>

        {/* Goal Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {startHereTracks.map((track) => {
            const isSelected = track.goal === selectedGoal;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedGoal(track.goal)}
                className={`px-5 py-3 rounded-xl font-medium text-xs sm:text-sm font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-amber-400 text-zinc-950 shadow-lg shadow-amber-400/20 font-semibold"
                    : "bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                {track.goal}
              </button>
            );
          })}
        </div>

        {/* Selected Recommendation Canvas */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>RECOMMENDED STARTING POINT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {currentTrack.recommendedTitle}
              </h3>

              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
                {currentTrack.why}
              </p>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs sm:text-sm text-zinc-400 italic">
                "{currentTrack.tagline}"
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-l border-zinc-900 pt-6 md:pt-0 md:pl-8">
              <div className="text-xs font-mono text-zinc-500 mb-1">LEARNING FORMAT</div>
              <div className="text-sm font-semibold text-zinc-300 mb-6">Interactive Decisions & Missions</div>

              <Link
                href={`/courses/${currentTrack.recommendedCourseId}`}
                className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-sm hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2 group shadow-sm"
              >
                <span>ENTER EXPERIENCE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
