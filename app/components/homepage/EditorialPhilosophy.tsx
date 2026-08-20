"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ShieldCheck, Sparkles, BookOpen, Clock, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="py-24 sm:py-32 bg-[#FAFAF8] text-[#121316] border-b border-[#E8E8E3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Manifesto Block */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-14 md:p-20 rounded-3xl bg-[#FFFFFF] border border-[#E2E2DC] text-center mb-20 shadow-[0_12px_40px_rgba(0,0,0,0.03)] relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F3EE] border border-[#E2E2DC] text-[#52525B] font-mono text-xs mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span className="uppercase font-bold tracking-wider">The Origin Manifesto</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#121316] leading-tight mb-8">
            BUILD THE PERSON BEHIND THE SUCCESS.
          </h2>

          <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-2xl text-[#3F3F46] font-light leading-relaxed">
            <p>
              Most education teaches you what to think. Origin teaches you <strong className="font-bold text-[#121316]">how to think</strong>.
            </p>
            <p>
              When markets shift, plans break, or unexpected opportunities arrive, no textbook formula will save you. What matters is your internal architecture: your ability to recognise trade-offs, manage risk, evaluate value, and act with clarity under constraint.
            </p>
            <p className="text-amber-700 font-bold font-mono text-base sm:text-lg pt-2">
              UNDERSTAND MORE. THINK BETTER. BECOME MORE CAPABLE.
            </p>
          </div>
        </motion.div>

        {/* Commercial Trust & Guarantee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Clock, title: "Self-Paced Learning", desc: "Complete modules and missions on your schedule, anytime, anywhere." },
            { icon: ShieldCheck, title: "Lifetime Access", desc: "One-time payment unlocks permanent access to interactive tools & updates." },
            { icon: BookOpen, title: "Practical Frameworks", desc: "Every module provides downloadable blueprints, worksheets, and checklists." },
            { icon: HeartHandshake, title: "Secure Payments", desc: "Encrypted instant checkout via Flutterwave cards, bank transfer & USSD." },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-7 rounded-2xl bg-[#FFFFFF] border border-[#E8E8E3] shadow-xs"
              >
                <Icon className="w-7 h-7 text-amber-600 mb-3.5" />
                <h3 className="text-lg sm:text-xl font-bold text-[#121316] mb-1.5">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-[#121316] text-center mb-10 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h3>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="rounded-2xl bg-[#FFFFFF] border border-[#E8E8E3] overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAFAF8] transition-colors"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#121316]">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#71717A] shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 text-sm sm:text-base text-[#52525B] leading-relaxed border-t border-[#F0F0EB] pt-3.5"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
