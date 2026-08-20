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
    <section id="question-discovery" className="py-24 sm:py-32 bg-[#FAFAF8] text-[#121316] border-b border-[#E8E8E3] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F3EE] border border-[#E2E2DC] text-xs font-mono text-[#52525B] mb-4">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-semibold uppercase">DISCOVERY ENGINE // INQUIRY-FIRST</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121316] mb-4">
            WHAT DO YOU WANT TO UNDERSTAND?
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
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
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                    isSelected
                      ? "bg-[#FFFFFF] border-amber-600 shadow-[0_8px_30px_rgba(217,119,6,0.1)] ring-1 ring-amber-600/30"
                      : "bg-[#FFFFFF]/80 border-[#E8E8E3] text-[#52525B] hover:border-[#D4D4CE] hover:bg-[#FFFFFF] hover:text-[#121316] shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 transition-colors ${isSelected ? "bg-amber-600 ring-4 ring-amber-100" : "bg-[#D4D4CE]"}`} />
                    <div>
                      <p className={`text-base sm:text-lg font-semibold leading-snug ${isSelected ? "text-[#121316]" : "text-[#27272A]"}`}>
                        {item.question}
                      </p>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#71717A] mt-1.5 block">
                        {item.courseTitle}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-mono shrink-0 transition-transform ${isSelected ? "translate-x-1 text-amber-700 font-bold" : "text-[#A1A1AA]"}`}>
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
                className="p-7 sm:p-9 rounded-3xl bg-[#FFFFFF] border border-[#E2E2DC] shadow-[0_12px_40px_rgba(0,0,0,0.05)] relative overflow-hidden"
              >
                {/* Subtle top indicator */}
                <div className="flex items-center justify-between gap-2 border-b border-[#F0F0EB] pb-4 mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold">
                    REVEALED LEARNING EXPERIENCE
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F3F3EE] border border-[#E2E2DC] text-[#52525B] font-mono">
                    {selectedItem.category}
                  </span>
                </div>

                {/* Course Title & Inquiry */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#121316] leading-tight">
                    {selectedItem.courseTitle}
                  </h3>
                  <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E3]">
                    <div className="text-xs font-mono text-[#71717A] uppercase mb-1 font-semibold">The Core Insight</div>
                    <p className="text-sm sm:text-base text-[#27272A] leading-relaxed italic">
                      "{selectedItem.answerPreview}"
                    </p>
                  </div>
                </div>

                {/* What You Will Understand */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#71717A] font-semibold">
                    What You Will Understand & Master:
                  </div>
                  <p className="text-sm text-[#3F3F46] leading-relaxed">
                    {selectedItem.whatYouWillUnderstand}
                  </p>
                </div>

                {/* Price & Primary Action */}
                <div className="pt-6 border-t border-[#F0F0EB] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#71717A] font-mono">TUITION</div>
                    <div className="text-xl font-bold text-amber-700 font-mono">
                      {selectedItem.price}
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Link
                      href={`/courses/${selectedItem.courseId}`}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#121316] text-[#FFFFFF] font-semibold text-sm hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
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
