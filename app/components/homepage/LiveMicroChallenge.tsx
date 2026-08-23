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
    label: "LEARN SOMETHING",
    subtitle: "Pay for focused training to master a lasting craft or practical capability.",
    choiceAction: "Invested ₦50,000 in permanent human capability.",
    whatYouGained: "A lasting skill that increases your personal competence and earning ability for years.",
    whatYouGaveUp: "Zero tangible physical goods today and no emergency cash reserve for unexpected events.",
    opportunityCostInsight: "You chose long-term growth over immediate physical utility. Your sacrifice is instant comfort."
  },
  {
    id: "create",
    label: "CREATE SOMETHING",
    subtitle: "Buy materials, tools, or software to build a tangible project or product.",
    choiceAction: "Deployed ₦50,000 into raw materials and production.",
    whatYouGained: "A tangible product or asset you can trade, show, or build upon in the real world.",
    whatYouGaveUp: "The safety of cash, risking wasted materials if the project does not succeed as planned.",
    opportunityCostInsight: "You traded certainty for creative output and upside. Your sacrifice is low-risk safety."
  },
  {
    id: "solve",
    label: "SOLVE A PROBLEM",
    subtitle: "Fix a specific daily friction or frustration for neighbors, clients, or your community.",
    choiceAction: "Invested ₦50,000 in solving a real-world bottleneck.",
    whatYouGained: "Direct value creation, high personal trust, and a repeatable service people gladly pay for.",
    whatYouGaveUp: "Personal leisure time, instant consumption, and effortless comfort.",
    opportunityCostInsight: "You chose usefulness and service. Your sacrifice is passive ease."
  },
  {
    id: "save",
    label: "SAVE FOR AN OPPORTUNITY",
    subtitle: "Keep the full ₦50,000 untouched in reserve for an unrepeatable future moment.",
    choiceAction: "Preserved ₦50,000 in liquid reserve.",
    whatYouGained: "High readiness, peace of mind, and capital ready to deploy when a major opportunity arises.",
    whatYouGaveUp: "Immediate skill growth, new assets, and practical real-world feedback today.",
    opportunityCostInsight: "You chose optionality over active building. Your sacrifice is immediate momentum."
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
    <section className="py-20 sm:py-32 bg-[#FAFAF8] border-b border-[#E8E8E3] text-[#121316] relative overflow-hidden">
      {/* Living Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#8A948B]/15 blur-[160px] pointer-events-none rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8A948B] text-white text-xs font-mono font-bold mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5 animate-bounce text-amber-300" />
            <span>THE ₦50,000 SIGNATURE CHALLENGE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#172217] mb-2 leading-tight">
            YOU HAVE ₦50,000.
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-[#1C3B34] tracking-tight mb-4">
            YOU CANNOT DO EVERYTHING. WHAT MATTERS MOST?
          </p>
          <p className="text-[#4E5B4B] text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Every resource is limited. Every choice requires you to sacrifice an alternative. Experience how your mind calculates value under real constraints.
          </p>
        </motion.div>

        {/* The Decision Card Canvas: House Background #E2E8DE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#E2E8DE] border border-[#D5DDCF] rounded-[2.5rem] p-7 sm:p-10 md:p-12 shadow-xl relative overflow-hidden"
        >
          {/* Top Scenario Prompt */}
          <div className="mb-8 border-b border-[#D0D9CA] pb-6">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#1C3B34] font-bold">
                SCENARIO // RESOURCE ALLOCATION
              </span>
              <span className="text-xs text-[#3E4A3B] font-mono px-3 py-1 rounded-md bg-white/70 border border-[#CCD6C6] font-bold">
                Choose 1 Path
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-semibold text-[#172217] leading-snug tracking-tight">
              You cannot divide the funds. Which decision do you commit to?
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
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(opt)}
                    className="w-full text-left p-6 rounded-2xl bg-white/80 border border-[#CCD6C6] hover:bg-[#8A948B] hover:border-[#8A948B] transition-all group flex flex-col justify-between gap-4 cursor-pointer shadow-sm"
                  >
                    <div>
                      <div className="font-extrabold text-[#172217] group-hover:text-white transition-colors text-base sm:text-lg mb-1.5 tracking-tight">
                        {opt.label}
                      </div>
                      <p className="text-xs sm:text-sm text-[#4E5B4B] group-hover:text-white/90 leading-relaxed font-light transition-colors">
                        {opt.subtitle}
                      </p>
                    </div>
                    <span className="self-end text-xs font-mono px-4 py-2 rounded-xl bg-[#8A948B] text-white group-hover:bg-[#1C3B34] transition-all font-bold mt-2 shadow-xs">
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
                <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#CCD6C6] flex items-center justify-between shadow-xs">
                  <div>
                    <div className="text-xs font-mono text-[#1C3B34] uppercase tracking-wider mb-0.5 font-bold">
                      YOUR DECISION
                    </div>
                    <div className="font-extrabold text-[#172217] text-base sm:text-lg">{selectedOption.label}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-[#3E4A3B] hover:text-[#172217] px-3.5 py-2 rounded-xl bg-[#E2E8DE] border border-[#CCD6C6] transition-colors cursor-pointer font-mono font-bold"
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
                  className="p-7 sm:p-9 rounded-2xl bg-white/90 border border-[#CCD6C6] space-y-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-[#1C3B34] text-xs sm:text-sm font-semibold tracking-wide uppercase font-mono font-bold">
                    <Brain className="w-4 h-4" />
                    <span>WHAT DID YOUR CHOICE COST YOU?</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172217] tracking-tight">
                    YOU JUST EXPERIENCED: OPPORTUNITY COST
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAEAE5] space-y-1">
                      <span className="font-mono text-[#1C3B34] uppercase font-bold text-xs">WHAT YOU GAINED:</span>
                      <p className="text-[#3F4B3C] font-medium">{selectedOption.whatYouGained}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAEAE5] space-y-1">
                      <span className="font-mono text-[#8A948B] uppercase font-bold text-xs">WHAT YOU SACRIFICED:</span>
                      <p className="text-[#3F4B3C] font-medium">{selectedOption.whatYouGaveUp}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#4E5B4B] leading-relaxed pt-2">
                    {selectedOption.opportunityCostInsight}
                  </p>

                  <div className="pt-4 border-t border-[#EAEAE5] text-xs sm:text-sm text-[#4E5B4B] leading-relaxed">
                    <strong className="text-[#172217] font-bold">The Origin Takeaway:</strong> In real life, you never just choose an option—you choose what you are willing to give up. Origin trains your mind to calculate the hidden price of every decision before you execute it.
                  </div>
                </motion.div>

                {/* Recommended Course & Reading Companion Connection */}
                <div className="p-6 rounded-2xl bg-white/90 border border-[#CCD6C6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#1C3B34] uppercase font-bold">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Reading Companion: Money Farming</span>
                    </div>
                    <p className="text-xs text-[#4E5B4B]">
                      Explore the foundational rules of resources, value creation, and patience.
                    </p>
                  </div>
                  <Link
                    href="/courses/economic-principles"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white font-bold text-xs sm:text-sm font-mono transition-all flex items-center justify-center gap-2 shrink-0 shadow-md cursor-pointer"
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
