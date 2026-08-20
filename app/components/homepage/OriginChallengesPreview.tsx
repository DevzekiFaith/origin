"use client";

import React, { useState } from "react";
import Link from "next/link";
import { originChallengesList } from "../../data/unconventional-learning";
import { ArrowRight, Flame, Clock, Award, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function OriginChallengesPreview() {
  const [activeChallengeId, setActiveChallengeId] = useState<string>(originChallengesList[0].id);

  const currentChallenge = originChallengesList.find(c => c.id === activeChallengeId) || originChallengesList[0];

  return (
    <section className="py-20 md:py-32 bg-[#0a0a0d] text-white border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-mono mb-3">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>ORIGIN CHALLENGES // REAL-WORLD PRESSURES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 mb-4">
            TEST YOUR THINKING UNDER FIRE
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            No multiple choice trivia. Origin Challenges place you inside high-stakes dilemmas with multiple viable answers. We evaluate your reasoning, risk management, and clarity.
          </p>
        </div>

        {/* Challenges Grid & Active Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Challenge Selector */}
          <div className="lg:col-span-5 space-y-3">
            {originChallengesList.map((ch) => {
              const isSelected = ch.id === activeChallengeId;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChallengeId(ch.id)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-zinc-900 border-amber-400/80 shadow-md text-white"
                      : "bg-zinc-950/60 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200"
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-mono uppercase text-zinc-500 mb-0.5">{ch.category}</div>
                    <div className="text-base font-bold text-zinc-100">{ch.title}</div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-800/80 text-zinc-400">
                    {ch.difficulty}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Challenge Canvas */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
              <span className="text-xs font-mono uppercase text-amber-400">
                ACTIVE CHALLENGE SIMULATION
              </span>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {currentChallenge.timeLimit}
                </span>
                <span>•</span>
                <span>{currentChallenge.difficulty}</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-zinc-100 mb-3">
              {currentChallenge.title}
            </h3>

            <p className="text-base text-zinc-300 leading-relaxed mb-6">
              {currentChallenge.description}
            </p>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2 mb-8">
              <div className="text-xs font-mono text-amber-300 uppercase">What this challenge evaluates:</div>
              <p className="text-xs sm:text-sm text-zinc-300 font-mono">
                {currentChallenge.evaluates}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-900">
              <span className="text-xs text-zinc-500 font-mono">
                Included in all Origin Foundation courses
              </span>
              <Link
                href="/courses/economic-principles"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs font-mono hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2"
              >
                <span>ENTER ORIGIN CHALLENGES</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
