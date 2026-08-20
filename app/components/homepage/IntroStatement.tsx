"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function IntroStatement() {
  return (
    <section className="py-28 sm:py-36 bg-[#FAFAF8] text-[#121316] border-b border-[#E8E8E3] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F3EE] border border-[#E2E2DC] text-xs font-mono text-[#52525B] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span className="uppercase tracking-wider font-bold">The Origin Thesis</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#121316] leading-[1.06]">
            UNDERSTAND MORE.
            <br />
            <span className="text-amber-700">THINK BETTER.</span>
            <br />
            BECOME MORE CAPABLE.
          </h2>

          <p className="text-lg sm:text-2xl text-[#52525B] font-light leading-relaxed max-w-3xl mx-auto pt-2">
            Most education begins by handing you predetermined answers. Origin begins with the question—teaching you how to deconstruct problems, recognize invisible trade-offs, and make high-conviction decisions in the real world.
          </p>

          <motion.div whileHover={{ x: 4 }} className="pt-4 flex items-center justify-center">
            <Link
              href="/courses/economic-principles"
              className="inline-flex items-center gap-2 text-base font-bold text-[#121316] hover:text-amber-700 border-b-2 border-[#121316] hover:border-amber-700 pb-1.5 transition-all cursor-pointer font-mono"
            >
              <span>SEE HOW PRACTICAL LEARNING WORKS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
