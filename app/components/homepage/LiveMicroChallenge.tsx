"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw, Zap, Brain, Sparkles, CheckCircle2, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DecisionOption {
  id: string;
  label: string;
  subtitle: string;
  choiceAction: string;
  whatYouGaveUp: string;
  whatYouGained: string;
  opportunityCostInsight: string;
}

const DECISION_OPTIONS: DecisionOption[] = [
  {
    id: "learn",
    label: "LEARN A PRACTICAL SKILL",
    subtitle: "Pay for focused training to master a high-value craft or digital tool.",
    choiceAction: "Invested ₦20,000 in personal capability.",
    whatYouGained: "A permanent skill that can generate income repeatedly over your lifetime.",
    whatYouGaveUp: "Zero immediate cash flow this week and no emergency savings buffer.",
    opportunityCostInsight: "You chose compounding growth over immediate liquidity. Your sacrifice is immediate comfort."
  },
  {
    id: "trade",
    label: "BUY WHOLESALE GOODS TO TRADE",
    subtitle: "Purchase fast-moving inventory to sell to people around you.",
    choiceAction: "Deployed ₦20,000 into market trade.",
    whatYouGained: "Immediate potential profit and direct real-world sales feedback from customers.",
    whatYouGaveUp: "The certainty of your money, risking unsold stock if demand drops.",
    opportunityCostInsight: "You traded certainty for speed and profit. Your sacrifice is peace of mind."
  },
  {
    id: "solve",
    label: "SOLVE A COMMUNITY PROBLEM",
    subtitle: "Buy tools or materials to fix a specific daily frustration for neighbors or businesses.",
    choiceAction: "Invested ₦20,000 in solving a tangible friction.",
    whatYouGained: "Direct value creation, high reputation, and a repeatable service people will pay for.",
    whatYouGaveUp: "Fast personal consumption and passive safety.",
    opportunityCostInsight: "You chose service and value creation. Your sacrifice is convenience and immediate leisure."
  },
  {
    id: "save",
    label: "SAVE IT AS A SAFETY BUFFER",
    subtitle: "Keep the full ₦20,000 untouched in reserve for emergencies.",
    choiceAction: "Preserved ₦20,000 in cash.",
    whatYouGained: "Protection and calm against sudden unexpected expenses.",
    whatYouGaveUp: "All potential profits, new skills, and growth opportunities this week.",
    opportunityCostInsight: "You chose defense over growth. Your sacrifice is the opportunity to multiply your value."
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
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, -15, 0],
          y: [0, 15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-amber-500/10 blur-[160px] pointer-events-none rounded-full"
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
            <span>THE ₦20,000 SIGNATURE CHALLENGE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-100 mb-2">
            YOU HAVE ₦20,000.
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-amber-300 tracking-tight mb-4">
            48 HOURS. WHAT WILL YOU DO?
          </p>
          <p className="text-zinc-400 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Your goal is to create the greatest value you can within 7 days. Every choice has a price. Which decision do you make?
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
                SCENARIO // RESOURCE CONSTRAINT
              </span>
              <span className="text-xs text-zinc-400 font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
                Pick 1 Option
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-semibold text-zinc-100 leading-snug tracking-tight">
              You cannot divide the funds. Choose where you allocate your resources:
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
                      <div className="font-extrabold text-zinc-100 group-hover:text-amber-300 transition-colors text-base sm:text-lg mb-1 tracking-tight">
                        {opt.label}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">{opt.subtitle}</p>
                    </div>
                    <span className="self-end text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors font-bold mt-2">
                      CHOOSE →
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            ) : selectedOption ? (
              /* Consequence & Opportunity Cost Reveal */
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
                    <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-0.5 font-bold">
                      YOUR DECISION
                    </div>
                    <div className="font-bold text-zinc-100 text-base sm:text-lg">{selectedOption.label}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-zinc-100 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer font-mono"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Try another choice</span>
                  </motion.button>
                </div>

                {/* Core Question & Discovery Reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="p-7 sm:p-9 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-4"
                >
                  <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase font-mono">
                    <Brain className="w-4 h-4" />
                    <span>WHAT DID YOUR CHOICE COST YOU?</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
                    YOU JUST EXPERIENCED: OPPORTUNITY COST
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                    <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                      <span className="font-mono text-emerald-400 uppercase font-bold text-xs">WHAT YOU GAINED:</span>
                      <p className="text-zinc-200">{selectedOption.whatYouGained}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                      <span className="font-mono text-amber-400 uppercase font-bold text-xs">WHAT YOU SACRIFICED:</span>
                      <p className="text-zinc-200">{selectedOption.whatYouGaveUp}</p>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed pt-2">
                    {selectedOption.opportunityCostInsight}
                  </p>

                  <div className="pt-4 border-t border-zinc-800/80 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    <strong className="text-zinc-200">The Origin Takeaway:</strong> In real life, you never just choose an option—you choose what you are willing to give up. Origin trains your mind to calculate the hidden price of every decision before you execute it.
                  </div>
                </motion.div>

                {/* Recommended Course & Reading Companion Connection */}
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 uppercase font-bold">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Reading Companion: Money Farming</span>
                    </div>
                    <p className="text-xs text-zinc-300">
                      Explore the foundational rules of resources, value creation, and patience.
                    </p>
                  </div>
                  <Link
                    href="/courses/economic-principles"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm font-mono hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md cursor-pointer"
                  >
                    <span>START WITH ECONOMIC PRINCIPLES →</span>
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
