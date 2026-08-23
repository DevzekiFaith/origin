"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function IntroStatement() {
  return (
    <section className="py-24 sm:py-32 bg-[#8A948B] text-white border-b border-white/10 relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
      {/* Soft Ambient Light Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/10 blur-[170px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-amber-200/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono text-white/90 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
            <span className="uppercase tracking-wider font-bold">The Origin Thesis //</span>
          </div>

          {/* Main Serif Display Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.08] font-normal">
            UNDERSTAND MORE.
            <br />
            <span className="italic font-normal text-amber-200">THINK BETTER.</span>
            <br />
            BECOME MORE CAPABLE.
          </h2>

          {/* Description Paragraph */}
          <p className="text-lg sm:text-2xl text-white/85 font-light leading-relaxed max-w-3xl mx-auto pt-2">
            Most education begins by handing you predetermined answers. Origin begins with the question—teaching you how to deconstruct problems, recognize invisible trade-offs, and make high-conviction decisions in the real world.
          </p>

          {/* Action Button */}
          <div className="pt-4 flex items-center justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/courses/economic-principles"
                className="p-1.5 rounded-2xl bg-[#E2E8DE] hover:bg-[#D6DDD1] shadow-xl border border-white/40 inline-flex items-center gap-2 group cursor-pointer transition-all"
              >
                <div className="p-2.5 rounded-xl bg-[#1C3B34] text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div className="px-4 py-2.5 text-[#1C3B34] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2">
                  <span>SEE HOW PRACTICAL LEARNING WORKS</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
