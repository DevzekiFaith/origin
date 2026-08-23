"use client";

import React from "react";
import { Sparkles, HelpCircle, Compass, ShieldAlert, Zap, RefreshCw, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const STANDARD_PRINCIPLES = [
  {
    number: "01",
    icon: HelpCircle,
    title: "Question Deeply.",
    description: "Never accept surface assumptions. Always ask what problem you are actually trying to solve."
  },
  {
    number: "02",
    icon: Compass,
    title: "Choose Deliberately.",
    description: "Every choice has a cost. Recognize what you are sacrificing before you pull the trigger."
  },
  {
    number: "03",
    icon: ShieldAlert,
    title: "Understand Consequences.",
    description: "Smart people look at first-order outcomes; wise people calculate second and third-order ripple effects."
  },
  {
    number: "04",
    icon: Zap,
    title: "Apply What You Discover.",
    description: "Knowledge without execution is entertainment. Use principles immediately to reshape real situations."
  },
  {
    number: "05",
    icon: RefreshCw,
    title: "Reflect.",
    description: "Audit your wins and mistakes with ruthless honesty. Turn feedback and friction into personal composure."
  },
  {
    number: "06",
    icon: BookOpen,
    title: "Keep Learning.",
    description: "True mastery is not a certificate on a wall. It is an ongoing commitment to becoming more capable."
  }
];

export default function OriginStandardSection() {
  return (
    <section id="origin-standard" className="py-24 sm:py-36 bg-[#FAFAF8] border-b border-[#E8E8E3] text-[#121316] relative overflow-hidden">
      {/* Living Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#8A948B]/15 blur-[160px] pointer-events-none rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8A948B] text-white text-xs font-mono font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>THE ORIGIN STANDARD</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#172217] tracking-tight mb-4 leading-tight">
            A PHILOSOPHY FOR REAL LIFE
          </h2>

          <p className="text-[#4E5B4B] text-base sm:text-lg font-light leading-relaxed">
            The Origin Standard is not a checklist for completing lessons. It is an operational code you carry into your decisions, negotiations, work, and personal architecture.
          </p>
        </motion.div>

        {/* 6 Principle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STANDARD_PRINCIPLES.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="p-8 rounded-3xl bg-[#E2E8DE] border border-[#D5DDCF] shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/80 border border-[#CCD6C6] flex items-center justify-center text-[#1C3B34] shadow-2xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#1C3B34] px-2.5 py-1 rounded-md bg-white/60 border border-[#CCD6C6]">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#172217] tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#4E5B4B] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D0D9CA] flex items-center gap-1.5 text-[11px] font-mono text-[#1C3B34] font-bold uppercase tracking-wider">
                  <span>ORIGIN STANDARD CODE</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
