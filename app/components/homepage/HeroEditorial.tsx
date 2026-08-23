"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, HelpCircle, Brain, CheckCircle2, Compass, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface HeroEditorialProps {
  onStartWithQuestion?: () => void;
  onExploreOrigin?: () => void;
}

export default function HeroEditorial({
  onStartWithQuestion,
  onExploreOrigin,
}: HeroEditorialProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white border-b border-white/15 selection:bg-white selection:text-[#8A948B]">
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 30, 0],
            y: [0, -25, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-white/15 blur-[180px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -35, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[550px] h-[550px] bg-amber-100/15 blur-[160px] rounded-full"
        />
        {/* Sleek Dot Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-mono text-white/90 mb-6 font-bold uppercase tracking-widest"
              >
                <div className="w-3.5 h-3.5 shrink-0">
                  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="128" height="128" rx="30" fill="#22C55E" />
                    <circle cx="64" cy="64" r="34" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>ORIGIN // UNCONVENTIONAL LEARNING</span>
              </motion.div>

              {/* Manifesto Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.08] mb-6 font-normal"
              >
                School starts with{" "}
                <span className="italic font-normal">the answer.</span>
                <br />
                Origin starts with{" "}
                <span className="italic font-normal text-amber-200">the question.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-xl mb-9"
              >
                Practical thinking for real decisions. Not lectures — experiences.
                Origin trains you to question deeply, choose deliberately, and apply what you discover.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mb-14"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onStartWithQuestion || (() => {
                    const el = document.getElementById("origin-challenge");
                    el?.scrollIntoView({ behavior: "smooth" });
                  })}
                  className="p-1.5 rounded-2xl bg-[#E2E8DE] hover:bg-white shadow-xl border border-white/40 flex items-center gap-2 group cursor-pointer transition-all"
                >
                  <div className="p-2.5 rounded-xl bg-[#1C3B34] text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <HelpCircle className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="px-4 py-2.5 text-[#1C3B34] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase">
                    START WITH A QUESTION
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onExploreOrigin || (() => {
                    const el = document.getElementById("origin-moment");
                    el?.scrollIntoView({ behavior: "smooth" });
                  })}
                  className="p-1.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-2 group cursor-pointer transition-all backdrop-blur-md"
                >
                  <div className="p-2.5 rounded-xl bg-white/10 text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <Compass className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-4 py-2.5 text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase">
                    EXPLORE EXPERIENCES
                  </div>
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom 4 Framework Cards — Think / Choose / Discover / Apply */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl"
            >
              {[
                { icon: Brain, label: "Think", step: "01", desc: "Question the situation" },
                { icon: CheckCircle2, label: "Choose", step: "02", desc: "Make a decision" },
                { icon: Sparkles, label: "Discover", step: "03", desc: "See the principle" },
                { icon: Zap, label: "Apply", step: "04", desc: "Use it in real life" },
              ].map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-start gap-3 hover:bg-white/15 transition-all shadow-sm">
                      <div className="p-1.5 rounded-lg bg-white/10 text-white">
                        <IconComponent className="w-4 h-4 text-amber-300" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white/90 block">{card.label}</span>
                        <span className="text-[10px] text-white/55 leading-tight">{card.desc}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-white/50 px-1">{card.step}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-lg lg:max-w-xl aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-white/20 group"
            >
              <Image
                src="/origin_3d_hero_sanctuary.jpg"
                alt="Origin — Unconventional Learning Platform"
                fill
                priority
                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8A948B]/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
