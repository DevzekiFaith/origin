"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, User, Compass, Target, HelpCircle } from "lucide-react";
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
        {/* Sleek Dot Grid Overlay for Modern Editorial Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & 4-Step Glass Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>

              {/* Main Elegant Serif Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-6xl font-serif text-white tracking-tight leading-[1.08] mb-6 font-normal"
              >
                What If You Could <br />
                <span className="italic font-normal">Understand</span> How The <br />
                World Really Works?
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-xl mb-9"
              >
                Practical knowledge for understanding yourself, making better decisions, and navigating real life with clarity. Your mind is just four steps away from master capability!
              </motion.p>

              {/* Primary Call to Action Buttons matching reference image style */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mb-14"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onExploreOrigin || (() => {
                    const el = document.getElementById("origin-thesis");
                    el?.scrollIntoView({ behavior: "smooth" });
                  })}
                  className="p-1.5 rounded-2xl bg-[#E2E8DE] hover:bg-[#D6DDD1] shadow-xl border border-white/40 flex items-center gap-2 group cursor-pointer transition-all"
                >
                  <div className="p-2.5 rounded-xl bg-[#1C3B34] text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="px-4 py-2.5 text-[#1C3B34] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase">
                    EXPLORE YOUR SPACE
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onStartWithQuestion || (() => {
                    const el = document.getElementById("origin-moment");
                    el?.scrollIntoView({ behavior: "smooth" });
                  })}
                  className="p-1.5 rounded-2xl bg-[#E2E8DE] hover:bg-[#D6DDD1] shadow-xl border border-white/40 flex items-center gap-2 group cursor-pointer transition-all"
                >
                  <div className="p-2.5 rounded-xl bg-[#1C3B34] text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <HelpCircle className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="px-4 py-2.5 text-[#1C3B34] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase">
                    START WITH A QUESTION
                  </div>
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom 4 Glass Cards Grid (Matching reference image) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl"
            >
              {[
                { icon: User, label: "Register", step: "01" },
                { icon: Compass, label: "Add Principles", step: "02" },
                { icon: Target, label: "Customize", step: "03" },
                { icon: Sparkles, label: "Start Using", step: "04" },
              ].map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-start gap-3 hover:bg-white/15 transition-all shadow-sm">
                      <div className="p-1.5 rounded-lg bg-white/10 text-white">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-white/90">
                        {card.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-white/60 px-1">
                      {card.step}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Floating 3D Artwork Showcase */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-lg lg:max-w-xl aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] border border-white/20 group"
            >
              <Image
                src="/origin_3d_hero_sanctuary.jpg"
                alt="Origin 3D Smart Platform Architecture"
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
