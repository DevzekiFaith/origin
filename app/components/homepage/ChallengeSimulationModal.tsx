"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Flame,
  Clock,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Award,
  Compass,
  BookOpen,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  getChallengeSimulation,
  ChallengeSimulation,
  ChallengeStage,
  ChallengeChoice,
} from "../../data/origin-challenges-data";

interface ChallengeSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeId: string;
}

export default function ChallengeSimulationModal({
  isOpen,
  onClose,
  challengeId,
}: ChallengeSimulationModalProps) {
  const simulation: ChallengeSimulation = getChallengeSimulation(challengeId);

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [stageChoices, setStageChoices] = useState<Record<number, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(180);

  // Reset state on open or challengeId change
  useEffect(() => {
    if (isOpen) {
      setCurrentStageIndex(0);
      setSelectedChoiceId(null);
      setStageChoices({});
      setSecondsLeft(180);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, challengeId]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Gentle countdown timer
  useEffect(() => {
    if (!isOpen || currentStageIndex >= simulation.stages.length) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, currentStageIndex, simulation.stages.length]);

  if (!isOpen) return null;

  const isCompleted = currentStageIndex >= simulation.stages.length;
  const currentStage: ChallengeStage | undefined = simulation.stages[currentStageIndex];
  const selectedChoice: ChallengeChoice | undefined = currentStage?.choices.find(
    (c) => c.id === selectedChoiceId
  );

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
    setStageChoices((prev) => ({ ...prev, [currentStageIndex]: choiceId }));
  };

  const handleNextStage = () => {
    if (currentStageIndex + 1 === simulation.stages.length) {
      // Trigger celebratory confetti on completion
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
    setCurrentStageIndex((prev) => prev + 1);
    setSelectedChoiceId(null);
    setSecondsLeft(120);
  };

  const handleRestart = () => {
    setCurrentStageIndex(0);
    setSelectedChoiceId(null);
    setStageChoices({});
    setSecondsLeft(180);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0E1513]/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-[#E2E8DE] border border-[#CCD6C6] rounded-[2rem] text-[#172217] shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
        >
          {/* Top Operational Bar */}
          <div className="px-6 py-4 bg-[#1C3B34] text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-mono font-bold tracking-wider uppercase">
                <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>ORIGIN LIVE ARENA</span>
              </div>
              <span className="hidden sm:inline-block text-xs font-mono text-white/70">
                // {simulation.category}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {!isCompleted && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/15 text-xs font-mono font-bold text-amber-300 shadow-inner">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimer(secondsLeft)}</span>
                </div>
              )}

              <button
                onClick={onClose}
                aria-label="Close simulation"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Tracker Bar */}
          <div className="bg-[#D5DDCF] h-1.5 w-full flex shrink-0">
            <div
              className="bg-[#1C3B34] h-full transition-all duration-500"
              style={{
                width: isCompleted
                  ? "100%"
                  : `${((currentStageIndex + (selectedChoiceId ? 0.5 : 0)) / simulation.stages.length) * 100}%`,
              }}
            />
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {!isCompleted && currentStage ? (
              <>
                {/* Stage Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1C3B34]">
                      {currentStage.stageTitle}
                    </span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-[#CCD6C6] text-[#3E4A3B]">
                      STAGE {currentStage.stageNumber} OF {simulation.stages.length}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172217] tracking-tight leading-tight mb-3">
                    {simulation.title}
                  </h3>

                  {/* Situation Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#CCD6C6] shadow-2xs space-y-2">
                    <div className="text-[10px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3 h-3" />
                      <span>THE ACTIVE CONSTRAINTS</span>
                    </div>
                    <p className="text-sm sm:text-base text-[#3E4A3B] leading-relaxed font-normal">
                      {currentStage.situation}
                    </p>
                  </div>
                </div>

                {/* The Prompt */}
                <div>
                  <p className="text-base sm:text-lg font-bold text-[#172217] tracking-tight">
                    {currentStage.prompt}
                  </p>
                  <p className="text-xs text-[#5E6D5B] mt-1 font-mono">
                    Select your immediate course of action below:
                  </p>
                </div>

                {/* Choices List */}
                <div className="space-y-3">
                  {currentStage.choices.map((choice) => {
                    const isSelected = selectedChoiceId === choice.id;
                    return (
                      <motion.button
                        key={choice.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelectChoice(choice.id)}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-xs ${
                          isSelected
                            ? "bg-white border-[#1C3B34] ring-2 ring-[#1C3B34] shadow-md"
                            : "bg-white/70 hover:bg-white border-[#CCD6C6] text-[#172217]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-3 h-3 rounded-full shrink-0 ${
                                  isSelected ? "bg-[#1C3B34] ring-4 ring-[#1C3B34]/20" : "bg-[#CBD4C7]"
                                }`}
                              />
                              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#1C3B34]">
                                {choice.label}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#4E5B4B] pl-5 leading-relaxed">
                              {choice.description}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-mono font-bold shrink-0 transition-transform ${
                              isSelected ? "text-[#1C3B34] translate-x-1" : "text-[#8A948B]"
                            }`}
                          >
                            SELECT →
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Instant Consequence & Trade-Off Revelation */}
                <AnimatePresence>
                  {selectedChoice && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.3 }}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-[#1C3B34] shadow-lg space-y-4"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#1C3B34]">
                        <CheckCircle2 className="w-4 h-4 text-[#1C3B34]" />
                        <span>TACTICAL OUTCOME REVEALED</span>
                      </div>

                      <div className="text-sm font-bold text-[#172217]">
                        {selectedChoice.action}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-[#F0F4EE] border border-[#D5DDCF]">
                          <span className="font-mono uppercase font-bold text-emerald-800 block mb-1">
                            WHAT YOU GAINED:
                          </span>
                          <span className="text-[#3E4A3B] leading-relaxed">
                            {selectedChoice.whatYouGained}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#FFF6F4] border border-[#FADCD5]">
                          <span className="font-mono uppercase font-bold text-rose-800 block mb-1">
                            WHAT YOU SACRIFICED:
                          </span>
                          <span className="text-[#3E4A3B] leading-relaxed">
                            {selectedChoice.whatYouSacrificed}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#E2E8DE] border border-[#CCD6C6] text-xs">
                        <span className="font-mono uppercase font-bold text-[#1C3B34] block mb-0.5">
                          THE ORIGIN INSIGHT:
                        </span>
                        <p className="text-[#172217] italic leading-relaxed">
                          "{selectedChoice.opportunityCostInsight}"
                        </p>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={handleNextStage}
                          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1C3B34] hover:bg-[#142924] text-white font-mono font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                        >
                          <span>
                            {currentStageIndex + 1 === simulation.stages.length
                              ? "CALCULATE COGNITIVE DIAGNOSIS"
                              : "PROCEED TO STAGE 2 COMPLICATION"}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              /* Diagnostic Result & Course Bridge */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Result Header Badge */}
                <div className="p-6 rounded-3xl bg-[#1C3B34] text-white space-y-3 shadow-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
                    <Award className="w-3.5 h-3.5" />
                    <span>SIMULATION COMPLETE // 2 OF 7 CRISIS STAGES RESOLVED</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-mono uppercase tracking-widest text-white/70">
                      YOUR COGNITIVE ARCHETYPE
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {simulation.cognitiveDiagnosis.archetype}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed italic border-t border-white/15 pt-3">
                    &ldquo;{simulation.cognitiveDiagnosis.takeaway}&rdquo;
                  </p>
                </div>

                {/* Breakdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-5 rounded-2xl bg-white border border-[#CCD6C6] shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-emerald-800">
                      <ShieldCheck className="w-4 h-4" />
                      <span>DEMONSTRATED STRENGTHS</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#3E4A3B]">
                      {simulation.cognitiveDiagnosis.strengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Blindspot */}
                  <div className="p-5 rounded-2xl bg-white border border-[#CCD6C6] shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-800">
                      <AlertTriangle className="w-4 h-4" />
                      <span>CRITICAL BLINDSPOT</span>
                    </div>
                    <p className="text-xs text-[#4E5B4B] leading-relaxed">
                      {simulation.cognitiveDiagnosis.blindspot}
                    </p>
                  </div>
                </div>

                {/* Course Bridge Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#1C3B34] shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#CCD6C6] pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#1C3B34]">
                      <BookOpen className="w-4 h-4" />
                      <span>CONTINUE THE FULL EXPERIENCE</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#E2E8DE] text-[#1C3B34]">
                      FULL 7-STAGE BLUEPRINT
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl sm:text-2xl font-serif font-extrabold text-[#172217] leading-snug">
                      {simulation.connectedCourseTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4E5B4B] leading-relaxed">
                      {simulation.coursePitch}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      onClick={handleRestart}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl border border-[#CCD6C6] hover:bg-[#E2E8DE] text-[#3E4A3B] text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>RETRY SIMULATION</span>
                    </button>

                    <Link
                      href={`/courses/${simulation.connectedCourseId}`}
                      onClick={onClose}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#1C3B34] hover:bg-[#142924] text-white font-mono font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group"
                    >
                      <span>CONTINUE IN FULL EXPERIENCE</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
