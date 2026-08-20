"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, Sparkles, CheckCircle, Compass, Layers } from "lucide-react";
import { questionMatrixData } from "../../data/unconventional-learning";

export default function QuestionDiscoveryMatrix() {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(questionMatrixData[1].id); // default to economic question

  const selectedItem = questionMatrixData.find(q => q.id === selectedQuestionId) || questionMatrixData[0];

  return (
    <section id="question-discovery" className="py-20 md:py-32 bg-[#090a0d] text-white border-b border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-xs font-mono text-zinc-300 mb-4">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>DISCOVERY ENGINE // INQUIRY-FIRST</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 mb-4">
            WHAT DO YOU WANT TO UNDERSTAND?
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Conventional platforms organize by generic categories. Origin organizes by the real questions that shape your life, decisions, and wealth.
          </p>
        </div>

        {/* 2-Column Matrix: Left Questions, Right Dynamic Experience Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Questions List */}
          <div className="lg:col-span-6 space-y-3">
            {questionMatrixData.map((item) => {
              const isSelected = item.id === selectedQuestionId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedQuestionId(item.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer ${
                    isSelected
                      ? "bg-zinc-900 border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.1)] text-white"
                      : "bg-zinc-950/60 border-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${isSelected ? "bg-amber-400" : "bg-zinc-700"}`} />
                    <div>
                      <p className={`text-base sm:text-lg font-medium leading-snug ${isSelected ? "text-zinc-100" : "text-zinc-300"}`}>
                        {item.question}
                      </p>
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-1 block">
                        {item.courseTitle}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-mono shrink-0 transition-transform ${isSelected ? "translate-x-1 text-amber-400" : "text-zinc-600"}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Origin Experience Preview */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden">
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between gap-2 border-b border-zinc-900 pb-4 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  REVEALED LEARNING EXPERIENCE
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">
                  {selectedItem.category}
                </span>
              </div>

              {/* Course Title & Inquiry */}
              <div className="space-y-4 mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 leading-tight">
                  {selectedItem.courseTitle}
                </h3>
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
                  <div className="text-xs font-mono text-zinc-400 uppercase mb-1">The Core Insight</div>
                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed italic">
                    "{selectedItem.answerPreview}"
                  </p>
                </div>
              </div>

              {/* What You Will Understand */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  What You Will Understand & Master:
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {selectedItem.whatYouWillUnderstand}
                </p>
              </div>

              {/* Price & Primary Action */}
              <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-zinc-500 font-mono">TUITION</div>
                  <div className="text-xl font-bold text-amber-400 font-mono">
                    {selectedItem.price}
                  </div>
                </div>

                <Link
                  href={`/courses/${selectedItem.courseId}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-sm hover:bg-amber-400 hover:text-zinc-950 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>EXPLORE THIS EXPERIENCE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
