"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, RefreshCw, Zap, Brain, ShieldAlert } from "lucide-react";

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
    id: "inventory",
    label: "Option A: Buy Fast-Turnover Goods (₦50,000)",
    subtitle: "Stock trending items to sell for ₦75,000 within 5 days.",
    tag: "High Capital Velocity",
    cognitiveProfile: "Commercial Arbitrageur",
    principleRevealed: "Capital Velocity & Liquidity",
    explanation: "You prioritized fast cash turnover and tangible margin. While reliable for cash flow, you traded your working hours for linear returns without compounding leverage."
  },
  {
    id: "mentor",
    label: "Option B: 1-Hour Consultation with an Industry Veteran (₦50,000)",
    subtitle: "Pay an expert to audit your high-ticket offer before pitching 10 enterprise clients.",
    tag: "Asymmetric Information",
    cognitiveProfile: "Leverage & Knowledge Compounder",
    principleRevealed: "Asymmetric Upside & Risk Reduction",
    explanation: "You converted liquid cash into rare insight. If their feedback increases your closing rate by just 1 deal (worth ₦500k+), your return is 10x with zero inventory risk."
  },
  {
    id: "advertising",
    label: "Option C: Run Targeted Paid Ads (₦50,000)",
    subtitle: "Send 1,000 targeted visitors to your landing page to test conversion rate.",
    tag: "Market Validation",
    cognitiveProfile: "Empirical Experimenter",
    principleRevealed: "Opportunity Cost & Market Feedback",
    explanation: "You traded capital for rapid empirical data. Even if you make zero sales, you discover customer objections before committing larger capital."
  },
  {
    id: "reserve",
    label: "Option D: Keep the ₦50,000 as Emergency Cash Buffer",
    subtitle: "Lock the funds in a high-yield vault to guard against unforeseen shocks.",
    tag: "Capital Preservation",
    cognitiveProfile: "Defensive Risk Minimizer",
    principleRevealed: "Liquidity Preference vs. Inflation Drag",
    explanation: "You prioritized defense. You avoided loss, but your purchasing power silently decays against inflation while surrender all compounding optionality."
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
    <section className="py-20 md:py-28 bg-[#0d0e12] border-b border-zinc-900 text-white relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>30-SECOND INTERACTIVE CHALLENGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
            WHAT WOULD YOU DO?
          </h2>
          <p className="text-zinc-400 text-base">
            Origin is not passive theory. Experience how a single choice reveals your subconscious decision-making framework.
          </p>
        </div>

        {/* The Decision Card Canvas */}
        <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Top Scenario Prompt */}
          <div className="mb-8 border-b border-zinc-900 pb-6">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                SCENARIO // THE ₦50,000 RESOURCE CONSTRAINT
              </span>
              <span className="text-xs text-zinc-500 font-mono">48-Hour Deadline</span>
            </div>
            <p className="text-lg sm:text-xl font-medium text-zinc-200 leading-snug">
              You are handed exactly <span className="text-amber-300 font-semibold">₦50,000</span> today with 48 hours to create maximum leverage. You cannot divide the funds. Which move do you execute?
            </p>
          </div>

          {/* Interactive Choices Grid */}
          {!hasDecided ? (
            <div className="grid grid-cols-1 gap-3.5">
              {DECISION_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left p-4 sm:p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-amber-400/60 hover:bg-zinc-850 transition-all duration-200 group flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div>
                    <div className="font-semibold text-zinc-100 group-hover:text-amber-300 transition-colors text-base mb-1">
                      {opt.label}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400">{opt.subtitle}</p>
                  </div>
                  <span className="shrink-0 text-xs font-mono px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors">
                    CHOOSE →
                  </span>
                </button>
              ))}
            </div>
          ) : selectedOption ? (
            /* Consequence & Discovery Reveal */
            <div className="space-y-6 animate-fadeIn">
              {/* Chosen Summary */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-0.5">YOUR SELECTION</div>
                  <div className="font-semibold text-zinc-100 text-sm sm:text-base">{selectedOption.label}</div>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Try another</span>
                </button>
              </div>

              {/* What It Reveals */}
              <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-4">
                <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold tracking-wide uppercase font-mono">
                  <Brain className="w-4 h-4" />
                  <span>Cognitive Profile: {selectedOption.cognitiveProfile}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
                  YOU JUST EXPERIENCED: {selectedOption.principleRevealed.toUpperCase()}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {selectedOption.explanation}
                </p>

                <div className="pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
                  <strong className="text-zinc-200">The Origin Takeaway:</strong> There is no single "correct" answer in real life—only trade-offs, constraints, and consequences. Origin teaches you to see the invisible price of every decision before you make it.
                </div>
              </div>

              {/* Call to action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <p className="text-sm text-zinc-400">
                  Ready to master the frameworks behind money, value, and high-stakes choices?
                </p>
                <Link
                  href="/courses/economic-principles"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 text-zinc-950 font-semibold text-sm hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-amber-400/10"
                >
                  <span>EXPLORE ECONOMIC PRINCIPLES</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
