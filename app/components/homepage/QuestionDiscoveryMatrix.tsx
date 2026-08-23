"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { questionMatrixData } from "../../data/unconventional-learning";

export default function QuestionDiscoveryMatrix() {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(questionMatrixData[1].id); // default to economic question

  const selectedItem = questionMatrixData.find(q => q.id === selectedQuestionId) || questionMatrixData[0];

  return (
    <section id="question-discovery" className="py-24 sm:py-32 bg-[#8A948B] text-white border-b border-white/15 relative overflow-hidden">
      {/* Dynamic Ambient Grid Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-mono text-white mb-4 shadow-sm backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-bold uppercase tracking-wider">DISCOVERY ENGINE // INQUIRY-FIRST</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight text-white mb-4">
            WHAT DO YOU WANT TO UNDERSTAND?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed">
            Conventional platforms organize by generic categories. Origin organizes by the real questions that shape your life, decisions, and wealth.
          </p>
        </motion.div>

        {/* 2-Column Matrix: Left Questions, Right Dynamic Experience Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Questions List */}
          <div className="lg:col-span-6 space-y-3.5">
            {questionMatrixData.map((item, idx) => {
              const isSelected = item.id === selectedQuestionId;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedQuestionId(item.id)}
                  className={`w-full text-left p-5 sm:p-6 rounded-3xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer shadow-xl ${
                    isSelected
                      ? "bg-[#E2E8DE] text-[#172217] border-[#1C3B34] ring-2 ring-[#1C3B34] shadow-2xl scale-[1.01]"
                      : "bg-[#E2E8DE]/90 text-[#172217] border-[#D5DDCF] hover:border-[#1C3B34]"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span className={`w-3.5 h-3.5 rounded-full mt-2 shrink-0 transition-colors ${isSelected ? "bg-[#1C3B34] ring-4 ring-[#1C3B34]/20" : "bg-[#8A948B]"}`} />
                    <div>
                      <p className="text-lg sm:text-xl font-extrabold text-[#172217] leading-snug">
                        {item.question}
                      </p>
                      <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#1C3B34] mt-1.5 block font-bold">
                        {item.courseTitle}
                      </span>
                    </div>
                  </div>
                  <span className={`text-sm font-mono shrink-0 transition-transform ${isSelected ? "translate-x-1 text-[#1C3B34] font-bold" : "text-[#4E5B4B]"}`}>
                    →
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Origin Experience Preview */}
          <div className="lg:col-span-6 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="p-8 sm:p-10 rounded-3xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-2xl relative overflow-hidden"
              >
                {/* Top indicator */}
                <div className="flex items-center justify-between gap-2 border-b border-[#D0D9CA] pb-4 mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#1C3B34] font-bold">
                    REVEALED LEARNING EXPERIENCE
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/80 border border-[#CCD6C6] text-[#172217] font-mono font-bold">
                    {selectedItem.category}
                  </span>
                </div>

                {/* Course Title & Inquiry */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#172217] leading-tight tracking-tight">
                    {selectedItem.courseTitle}
                  </h3>
                  <div className="p-5 sm:p-6 rounded-2xl bg-white/80 border border-[#CCD6C6]">
                    <div className="text-xs font-mono text-[#1C3B34] uppercase mb-1.5 font-bold">The Core Insight</div>
                    <p className="text-base sm:text-lg text-[#172217] leading-relaxed italic font-serif">
                      "{selectedItem.answerPreview}"
                    </p>
                  </div>
                </div>

                {/* What You Will Understand */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#1C3B34] font-bold">
                    What You Will Understand & Master:
                  </div>
                  <p className="text-base text-[#4E5B4B] leading-relaxed font-light">
                    {selectedItem.whatYouWillUnderstand}
                  </p>
                </div>

                {/* Price & Primary Action */}
                <div className="pt-6 border-t border-[#D0D9CA] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#1C3B34] font-mono font-bold uppercase">TUITION</div>
                    <div className="text-2xl font-extrabold text-[#172217] font-mono">
                      {selectedItem.price}
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Link
                      href={`/courses/${selectedItem.courseId}`}
                      className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white font-mono font-bold text-xs transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-md"
                    >
                      <span>EXPLORE THIS EXPERIENCE</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
