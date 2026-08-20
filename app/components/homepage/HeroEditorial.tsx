"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

interface HeroEditorialProps {
  onStartWithQuestion?: () => void;
  onExploreOrigin?: () => void;
}

export default function HeroEditorial({
  onStartWithQuestion,
  onExploreOrigin
}: HeroEditorialProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#090a0d] text-white border-b border-zinc-900/80">
      {/* Dynamic Animated Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 25, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[450px] h-[300px] bg-blue-500/10 blur-[160px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Core Philosophy Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs tracking-wide text-zinc-300 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-mono uppercase text-[11px] text-zinc-400">Philosophy //</span>
            <span className="font-medium text-zinc-200">School starts with the answer. Origin starts with the question.</span>
          </div>
        </motion.div>

        {/* Hero Intellectual Hook */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.08] mb-6"
          >
            WHAT IF YOU COULD{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-amber-200 to-amber-400">
              UNDERSTAND
            </span>
            <br />
            HOW THE WORLD REALLY WORKS?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-normal leading-relaxed max-w-3xl mx-auto"
          >
            Practical knowledge for understanding yourself, making better decisions, and navigating real life with clarity.
          </motion.p>
        </div>

        {/* Primary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExploreOrigin || (() => {
              const el = document.getElementById("origin-curriculum");
              el?.scrollIntoView({ behavior: "smooth" });
            })}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-sm tracking-wide hover:bg-amber-400 hover:text-zinc-950 transition-colors shadow-[0_10px_30px_rgba(255,255,255,0.08)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>EXPLORE ORIGIN</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartWithQuestion || (() => {
              const el = document.getElementById("question-discovery");
              el?.scrollIntoView({ behavior: "smooth" });
            })}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900/90 text-zinc-300 hover:text-white font-medium text-sm border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>START WITH A QUESTION</span>
          </motion.button>
        </motion.div>

        {/* Core Pillars / Maxim Strip with Framer Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-zinc-900 text-left">
          {[
            {
              tag: "01 // The Purpose",
              title: "Build The Person Behind The Success",
              desc: "We do not sell passive video playlists. We build personal capability, emotional composure, and strategic intuition."
            },
            {
              tag: "02 // The Method",
              title: "Think → Choose → Discover → Apply",
              desc: "Experience the friction of real choices under constraint. You learn principles by making decisions, not memorizing terms."
            },
            {
              tag: "03 // The Standard",
              title: "Simple Language, Sophisticated Ideas",
              desc: "Accessible from age 10 to 45. Grounded in real Nigerian and global market realities without academic pretense."
            }
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, borderColor: "rgba(251,191,36,0.3)" }}
              className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 transition-colors shadow-sm"
            >
              <div className="text-amber-400 font-mono text-xs mb-2 uppercase tracking-wider">{pillar.tag}</div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">{pillar.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
