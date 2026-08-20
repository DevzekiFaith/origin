"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, HelpCircle, ShieldCheck } from "lucide-react";

interface HeroEditorialProps {
  onStartWithQuestion?: () => void;
  onExploreOrigin?: () => void;
}

export default function HeroEditorial({
  onStartWithQuestion,
  onExploreOrigin
}: HeroEditorialProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0a0a0c] text-white border-b border-zinc-900/80">
      {/* Background subtle geometric aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-[450px] h-[300px] bg-blue-500/5 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Core Philosophy Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs tracking-wide text-zinc-300 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono uppercase text-[11px] text-zinc-400">Philosophy //</span>
            <span className="font-medium text-zinc-200">School starts with the answer. Origin starts with the question.</span>
          </div>
        </div>

        {/* Hero Intellectual Hook */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.08] mb-6">
            WHAT IF YOU COULD{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-amber-200 to-amber-400">
              UNDERSTAND
            </span>
            <br />
            HOW THE WORLD REALLY WORKS?
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-normal leading-relaxed max-w-3xl mx-auto">
            Practical knowledge for understanding yourself, making better decisions, and navigating real life with clarity.
          </p>
        </div>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <button
            onClick={onExploreOrigin || (() => {
              const el = document.getElementById("origin-curriculum");
              el?.scrollIntoView({ behavior: "smooth" });
            })}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-sm tracking-wide hover:bg-amber-400 hover:text-zinc-950 transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.08)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>EXPLORE ORIGIN</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onStartWithQuestion || (() => {
              const el = document.getElementById("question-discovery");
              el?.scrollIntoView({ behavior: "smooth" });
            })}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900/90 text-zinc-300 hover:text-white font-medium text-sm border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>START WITH A QUESTION</span>
          </button>
        </div>

        {/* Core Pillars / Maxim Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-zinc-900 text-left">
          <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 transition-colors">
            <div className="text-amber-400/80 font-mono text-xs mb-2 uppercase tracking-wider">01 // The Purpose</div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Build The Person Behind The Success</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We do not sell passive video playlists. We build personal capability, emotional composure, and strategic intuition.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 transition-colors">
            <div className="text-amber-400/80 font-mono text-xs mb-2 uppercase tracking-wider">02 // The Method</div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Think → Choose → Discover → Apply</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Experience the friction of real choices under constraint. You learn principles by making decisions, not memorizing terms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 transition-colors">
            <div className="text-amber-400/80 font-mono text-xs mb-2 uppercase tracking-wider">03 // The Standard</div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Simple Language, Sophisticated Ideas</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Accessible from age 10 to 45. Grounded in real Nigerian and global market realities without academic pretense.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
