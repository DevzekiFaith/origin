"use client";

import React, { useState } from "react";
import Link from "next/link";
import { originChallengesList } from "../../data/unconventional-learning";
import { ArrowRight, Flame, Clock, Award, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OriginChallengesPreview() {
  const [activeChallengeId, setActiveChallengeId] = useState<string>(originChallengesList[0].id);

  const currentChallenge = originChallengesList.find(c => c.id === activeChallengeId) || originChallengesList[0];

  return (
    <section className="py-24 md:py-32 bg-[#090a0d] text-white border-b border-zinc-900 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono mb-4 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span className="uppercase font-bold tracking-wider">ORIGIN CHALLENGES // REAL-WORLD PRESSURES</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-100 mb-4">
            TEST YOUR THINKING UNDER FIRE
          </h2>
          <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed font-normal">
            No multiple choice trivia. Origin Challenges place you inside high-stakes dilemmas with multiple viable answers. We evaluate your reasoning, risk management, and clarity.
          </p>
        </motion.div>

        {/* Challenges Grid & Active Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Challenge Selector */}
          <div className="lg:col-span-5 space-y-3.5">
            {originChallengesList.map((ch, idx) => {
              const isSelected = ch.id === activeChallengeId;
              return (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveChallengeId(ch.id)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-zinc-900 border-amber-400 shadow-[0_8px_30px_rgba(251,191,36,0.12)] text-white ring-1 ring-amber-400/30"
                      : "bg-zinc-950/70 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200"
                  }`}
                >
                  <div>
                    <div className="text-xs font-mono uppercase text-zinc-500 mb-1 font-semibold">{ch.category}</div>
                    <div className="text-lg sm:text-xl font-bold text-zinc-100">{ch.title}</div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-800/80 text-zinc-200 font-bold">
                    {ch.difficulty}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Active Challenge Canvas */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChallenge.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="p-8 sm:p-11 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative"
              >
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
                    ACTIVE CHALLENGE SIMULATION
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                    <span className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                      <Clock className="w-4 h-4 text-amber-400" />
                      {currentChallenge.timeLimit}
                    </span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">{currentChallenge.difficulty}</span>
                  </div>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 mb-4 leading-tight tracking-tight">
                  {currentChallenge.title}
                </h3>

                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6">
                  {currentChallenge.description}
                </p>

                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 space-y-2 mb-8">
                  <div className="text-xs font-mono text-amber-300 uppercase tracking-wider font-semibold">
                    What this challenge evaluates:
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-mono">
                    {currentChallenge.evaluates}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-900">
                  <span className="text-xs text-zinc-500 font-mono">
                    Included in all Origin Foundation courses
                  </span>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/courses/economic-principles"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-100 text-zinc-950 font-bold text-xs font-mono hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>ENTER ORIGIN CHALLENGES</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
