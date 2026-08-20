"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown, ChevronUp, ShieldCheck, Sparkles, BookOpen, Clock, HeartHandshake } from "lucide-react";

const FAQS = [
  {
    q: "How is Origin different from Udemy, Coursera, or YouTube?",
    a: "Conventional platforms sell hours of video to watch passively and multiple-choice quizzes that test memorization. Origin is an active thinking platform: you encounter real-world situations, make high-stakes decisions under resource constraints, reveal the core economic/cognitive principle behind your choice, and apply it immediately to your actual life."
  },
  {
    q: "Is this suitable for teenagers or only working adults?",
    a: "Origin uses simple language to explain sophisticated ideas. A 10-year-old can easily understand the scenarios and trade-offs, while a 45-year-old business executive will find the strategic models deeply valuable. The principles of scarcity, opportunity cost, and decision-making apply at every age."
  },
  {
    q: "Do I get lifetime access to the courses I purchase?",
    a: "Yes. Every course you purchase includes unrestricted lifetime access to all interactive modules, real-world missions, workbooks, and future curriculum updates."
  },
  {
    q: "How does the payment process work?",
    a: "We support secure payments in Nigerian Naira (NGN) via Flutterwave (cards, bank transfer, USSD) as well as international cards (USD). Instant access is granted immediately after successful payment."
  },
  {
    q: "Who builds and designs the Origin curriculum?",
    a: "Origin courses are developed by The Becoming Institute in collaboration with multidisciplinary thinkers, economists, strategists, and human architecture specialists."
  }
];

export default function EditorialPhilosophy() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-32 bg-[#08080a] text-white border-b border-zinc-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Manifesto Block */}
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-zinc-950 border border-zinc-800 text-center mb-20 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs mb-6">
            <span>THE ORIGIN MANIFESTO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-100 leading-tight mb-8">
            BUILD THE PERSON BEHIND THE SUCCESS.
          </h2>

          <div className="max-w-3xl mx-auto space-y-6 text-base sm:text-xl text-zinc-300 font-light leading-relaxed">
            <p>
              Most education teaches you what to think. Origin teaches you <strong className="font-semibold text-zinc-100">how to think</strong>.
            </p>
            <p>
              When markets shift, plans break, or unexpected opportunities arrive, no textbook formula will save you. What matters is your internal architecture: your ability to recognise trade-offs, manage risk, evaluate value, and act with clarity under constraint.
            </p>
            <p className="text-amber-400 font-medium font-mono text-sm sm:text-base">
              UNDERSTAND MORE. THINK BETTER. BECOME MORE CAPABLE.
            </p>
          </div>
        </div>

        {/* Commercial Trust & Guarantee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900">
            <Clock className="w-6 h-6 text-amber-400 mb-3" />
            <h3 className="text-base font-bold text-zinc-100 mb-1">Self-Paced Learning</h3>
            <p className="text-xs text-zinc-400">Complete modules and missions on your schedule, anytime, anywhere.</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900">
            <ShieldCheck className="w-6 h-6 text-amber-400 mb-3" />
            <h3 className="text-base font-bold text-zinc-100 mb-1">Lifetime Access</h3>
            <p className="text-xs text-zinc-400">One-time payment unlocks permanent access to interactive tools & updates.</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900">
            <BookOpen className="w-6 h-6 text-amber-400 mb-3" />
            <h3 className="text-base font-bold text-zinc-100 mb-1">Practical Frameworks</h3>
            <p className="text-xs text-zinc-400">Every module provides downloadable blueprints, worksheets, and checklists.</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900">
            <HeartHandshake className="w-6 h-6 text-amber-400 mb-3" />
            <h3 className="text-base font-bold text-zinc-100 mb-1">Secure Payments</h3>
            <p className="text-xs text-zinc-400">Encrypted instant checkout via Flutterwave cards, bank transfer & USSD.</p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 text-center mb-8">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-zinc-950 border border-zinc-900 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-zinc-200">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-900 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
