"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw, Zap, Brain, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DecisionOption {
  id: string;
  label: string;
  subtitle: string;
  tag: string;
  cognitiveProfile: string;
  principleRevealed: string;
  explanation: string;
}

const DECISION_OPTIONS: DecisionOption[] = [
  {
    id: "buy",
    label: "BUY SOMETHING YOU WANT",
    subtitle: "A premium item you've been eyeing that brings instant status and enjoyment.",
    tag: "Immediate Gratification",
    cognitiveProfile: "Present-Oriented Consumption",
    principleRevealed: "Present Value vs. Opportunity Cost",
    explanation: "You gained instant pleasure and utility, but zero future cash flow. You chose consumption over compounding optionality."
  },
  {
    id: "learn",
    label: "LEARN A SKILL",
    subtitle: "Invest in high-ticket training or workshop that expands your earning power.",
    tag: "Human Capital",
    cognitiveProfile: "Long-Horizon Compounder",
    principleRevealed: "Human Capital & Asymmetric Upside",
    explanation: "You converted liquid cash into permanent capability. No immediate payout today, but your lifetime earning multiplier increases permanently."
  },
  {
    id: "start",
    label: "START SOMETHING",
    subtitle: "Buy wholesale materials or inventory to flip into ₦35,000+ within 7 days.",
    tag: "Commercial Enterprise",
    cognitiveProfile: "Commercial Arbitrageur",
    principleRevealed: "Capital Deployment & Market Risk",
    explanation: "You took calculated risk to generate capital velocity. You traded certainty for the possibility of compounding profit."
  },
  {
    id: "save",
    label: "SAVE IT",
    subtitle: "Lock away the ₦20,000 in an untouchable cash reserve.",
    tag: "Capital Preservation",
    cognitiveProfile: "Defensive Capital Preserver",
    principleRevealed: "Liquidity Preference & Inflation Drag",
    explanation: "You purchased peace of mind and defense against sudden emergencies, but surrendered all compounding optionality."
  }
];

export default function LiveMicroChallenge() {
  const [selectedOption, setSelectedOption] = useState<DecisionOption | null>(null);
  const [hasDecided, setHasDecided] = useState(false);

  const handleSelect = (option: DecisionOption) => {
    setSelectedOption(option);
    setHasDecided(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasDecided(false);
  };

  return (
    <section className="py-24 md:py-36 bg-[#090a0d] border-b border-zinc-900 text-white relative overflow-hidden">
      {/* Living Ambient Light Gradient */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.18, 0.3, 0.18],
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-amber-500/10 blur-[170px] pointer-events-none rounded-full"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs mb-4">
            <Zap className="w-3.5 h-3.5 animate-bounce" />
            <span>THE 30-SECOND ORIGIN EXPERIENCE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-100 mb-4">
            YOU HAVE ₦20,000.
          </h2>
          <p className="text-zinc-400 text-lg sm:text-xl font-normal leading-relaxed">
            What will you do with it? Make your decision below.
          </p>
        </motion.div>

        {/* The Decision Card Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-zinc-950 border border-zinc-800/90 rounded-3xl p-7 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Top Scenario Prompt */}
          <div className="mb-8 border-b border-zinc-900 pb-6">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-400 font-bold">
                SCENARIO // RESOURCE ALLOCATION DILEMMA
              </span>
              <span className="text-xs text-zinc-400 font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">48-Hour Constraint</span>
            </div>
            <p className="text-xl sm:text-3xl font-semibold text-zinc-100 leading-snug tracking-tight">
              You cannot divide the funds. Each choice demands the entire <span className="text-amber-300 font-bold">₦20,000</span>. Which move do you execute right now?
            </p>
          </div>

          {/* Interactive Choices Grid */}
          <AnimatePresence mode="wait">
            {!hasDecided ? (
              <motion.div
                key="choices-grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {DECISION_OPTIONS.map((opt, idx) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    whileHover={{ scale: 1.02, y: -3, borderColor: "rgba(251, 191, 36, 0.6)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(opt)}
                    className="w-full text-left p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:bg-zinc-900 transition-all group flex flex-col justify-between gap-3 cursor-pointer"
                  >
                    <div>
                      <div className="font-extrabold text-zinc-100 group-hover:text-amber-300 transition-colors text-lg mb-1 tracking-tight">
                        {opt.label}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{opt.subtitle}</p>
                    </div>
                    <span className="self-end text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors font-bold mt-2">
                      CHOOSE →
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            ) : selectedOption ? (
              /* Consequence & Discovery Reveal */
              <motion.div
                key="reveal-screen"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Chosen Summary */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-0.5 font-bold">YOUR SELECTION</div>
                    <div className="font-bold text-zinc-100 text-base sm:text-lg">{selectedOption.label}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-zinc-100 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer font-mono"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Try another move</span>
                  </motion.button>
                </div>

                {/* What It Reveals - THE SIGNATURE DISCOVERY */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="p-7 sm:p-9 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 text-xs font-mono font-bold uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>YOU JUST EXPERIENCED SCARCITY</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
                    Every Decision Is a Sacrifice.
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                    {selectedOption.explanation}
                  </p>

                  <div className="pt-4 border-t border-zinc-800/80 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    <strong className="text-zinc-200">The Method:</strong> Think → Choose → Discover → Apply. You don't learn economic laws by memorizing definitions; you learn by feeling the friction of real choices under constraint.
                  </div>
                </motion.div>

                {/* Call to action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <p className="text-sm text-zinc-400">
                    Ready to master the mental models behind money, trade-offs, and opportunity cost?
                  </p>
                  <Link
                    href="/courses/economic-principles"
                    className="w-full sm:w-auto px-7 py-4 rounded-xl bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm font-mono hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-amber-400/20"
                  >
                    <span>ENTER ECONOMIC PRINCIPLES →</span>
                  </Link>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
