"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, CheckCircle } from "lucide-react";
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
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-mono text-white mb-4 shadow-sm backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-bold uppercase tracking-wider">DISCOVERY ENGINE · INQUIRY-FIRST</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-white mb-4">
            WHAT DO YOU WANT TO UNDERSTAND?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed">
            Conventional platforms organize by generic categories. Origin organizes by the real questions that shape your life, decisions, and wealth.
          </p>
        </div>

        {/* 2-Column Matrix: Left Questions, Right Dynamic Experience Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Questions List - Rock solid, zero-jitter buttons */}
          <div className="lg:col-span-6 space-y-3">
            {questionMatrixData.map((item) => {
              const isSelected = item.id === selectedQuestionId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedQuestionId(item.id)}
                  className={`w-full text-left p-5 sm:p-6 rounded-3xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer select-none ${
                    isSelected
                      ? "bg-[#E2E8DE] text-[#172217] border-[#1C3B34] ring-2 ring-[#1C3B34]/30 shadow-xl"
                      : "bg-[#E2E8DE]/90 text-[#172217] border-[#D5DDCF] hover:bg-[#E2E8DE] hover:border-[#1C3B34]/40 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`w-3.5 h-3.5 rounded-full mt-1.5 shrink-0 transition-colors duration-200 ${
                        isSelected ? "bg-[#1C3B34] ring-4 ring-[#1C3B34]/20" : "bg-[#8A948B]/60"
                      }`}
                    />
                    <div>
                      <p className="text-base sm:text-lg font-bold text-[#172217] leading-snug">
                        {item.question}
                      </p>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#1C3B34] mt-1.5 block font-bold">
                        {item.courseTitle}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-mono shrink-0 transition-all duration-200 ${
                      isSelected ? "translate-x-1 text-[#1C3B34] font-bold" : "text-[#4E5B4B]/60"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Rock-solid static outer card with smooth internal content transition */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[520px]">
              {/* Top indicator bar */}
              <div className="flex items-center justify-between gap-2 border-b border-[#D0D9CA] pb-4 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#1C3B34] font-bold">
                  REVEALED LEARNING EXPERIENCE
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/90 border border-[#CCD6C6] text-[#172217] font-mono font-bold shadow-2xs">
                  {selectedItem.category}
                </span>
              </div>

              {/* Dynamic Content with smooth mode="wait" transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="space-y-6 flex-1 flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    {/* Course Title & Inquiry */}
                    <div className="space-y-3">
                      <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217] leading-tight tracking-tight">
                        {selectedItem.courseTitle}
                      </h3>
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#CCD6C6]">
                        <div className="text-[11px] font-mono text-[#1C3B34] uppercase mb-1 font-bold">
                          The Core Insight
                        </div>
                        <p className="text-sm sm:text-base text-[#172217] leading-relaxed italic font-serif">
                          &ldquo;{selectedItem.answerPreview}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* What You Will Understand */}
                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#1C3B34] font-bold">
                        What You Will Understand &amp; Master:
                      </div>
                      <p className="text-xs sm:text-sm text-[#4E5B4B] leading-relaxed">
                        {selectedItem.whatYouWillUnderstand}
                      </p>
                    </div>
                  </div>

                  {/* Price & Primary Action */}
                  <div className="pt-6 border-t border-[#D0D9CA] flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                    <div>
                      <div className="text-[10px] text-[#1C3B34] font-mono font-bold uppercase">TUITION</div>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#172217] font-mono">
                        {selectedItem.price}
                      </div>
                    </div>

                    <Link
                      href={`/courses/${selectedItem.courseId}`}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1C3B34] hover:bg-[#132B25] text-white font-mono font-bold text-xs transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-md"
                    >
                      <span>EXPLORE THIS EXPERIENCE</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
