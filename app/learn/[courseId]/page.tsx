"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  RotateCcw,
  BookOpen,
  Target,
  Brain,
  ShieldAlert,
  Coins,
  Scale,
  Award,
  ChevronRight,
  TrendingUp,
  Flame,
  FileText
} from "lucide-react";
import confetti from "canvas-confetti";
import { getCourseById } from "../../data/courses";
import { economicPrinciplesCourse, UnconventionalModule, InteractiveStage } from "../../data/unconventional-learning";
import { useUser } from "../../contexts/UserContext";

const STAGE_LABELS: Record<string, { label: string; number: string }> = {
  see: { label: "SEE IT", number: "01" },
  think: { label: "THINK", number: "02" },
  choose: { label: "CHOOSE", number: "03" },
  discover: { label: "DISCOVER", number: "04" },
  try_again: { label: "TRY AGAIN", number: "05" },
  mission: { label: "USE IT (MISSION)", number: "06" },
  reflect: { label: "REFLECT", number: "07" }
};

export default function CourseLearningPlayer() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [selectedMissionOption, setSelectedMissionOption] = useState<string | null>(null);
  const [reflectionInput, setReflectionInput] = useState("");
  const [discoveredConcepts, setDiscoveredConcepts] = useState<string[]>([
    "Scarcity"
  ]);
  const [activeTab, setActiveTab] = useState<"canvas" | "capabilities">("canvas");

  const { currentUser, hasCourseAccess } = useUser();
  const course = getCourseById(courseId);

  // We use economicPrinciplesCourse modules as the master interactive engine for Economic Principles
  // and construct dynamic experiential modules for any other course
  const activeCourseData = courseId === "economic-principles"
    ? economicPrinciplesCourse
    : {
        ...economicPrinciplesCourse,
        courseId,
        flagshipTitle: course?.title || "FOUNDATION EXPERIENCE",
        subtitle: course?.description || "Master core practical thinking",
      };

  const modules: UnconventionalModule[] = activeCourseData.modules;
  const currentModule = modules[currentModuleIndex] || modules[0];
  const stages: InteractiveStage[] = currentModule.stages;
  const currentStage = stages[currentStageIndex] || stages[0];

  const isLastStageInModule = currentStageIndex === stages.length - 1;
  const isLastModule = currentModuleIndex === modules.length - 1;

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
  };

  const handleNextStage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    if (currentStage.stageType === "discover") {
      if (!discoveredConcepts.includes(currentModule.conceptName)) {
        setDiscoveredConcepts(prev => [...prev, currentModule.conceptName]);
      }
    }

    if (isLastStageInModule) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      if (!isLastModule) {
        setCurrentModuleIndex(prev => prev + 1);
        setCurrentStageIndex(0);
        setSelectedChoiceId(null);
        setSelectedMissionOption(null);
        setReflectionInput("");
      }
    } else {
      setCurrentStageIndex(prev => prev + 1);
      setSelectedChoiceId(null);
      setSelectedMissionOption(null);
    }
  };

  const handlePrevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(prev => prev - 1);
      setCurrentStageIndex(modules[currentModuleIndex - 1].stages.length - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#060709] text-zinc-100 flex flex-col justify-between selection:bg-amber-400 selection:text-zinc-950 font-sans">
      {/* 1. Ultra-Clean Top Bar */}
      <header className="sticky top-0 z-50 bg-[#08090c]/90 backdrop-blur-md border-b border-zinc-900 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={`/courses/${courseId}`}
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors p-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXIT EXPERIENCE</span>
          </Link>
          <div className="h-4 w-px bg-zinc-800 hidden sm:block" />
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
            ORIGIN // {activeCourseData.flagshipTitle}
          </span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("canvas")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              activeTab === "canvas"
                ? "bg-zinc-800 text-amber-300 font-medium"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            CANVAS
          </button>
          <button
            onClick={() => setActiveTab("capabilities")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "capabilities"
                ? "bg-zinc-800 text-amber-300 font-medium"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>HOW YOU THINK ({discoveredConcepts.length}/6)</span>
          </button>
        </div>
      </header>

      {/* 2. Main Body */}
      {activeTab === "canvas" ? (
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center">
          {/* Experience Indicator */}
          <div className="mb-6 flex items-center justify-between text-xs font-mono border-b border-zinc-900 pb-3">
            <span className="text-zinc-500 uppercase">
              EXPERIENCE 0{currentModule.moduleNumber} OF 0{modules.length}: {currentModule.title}
            </span>
            <span className="text-amber-400 font-bold">
              STAGE {currentStage.stageNumber} // {STAGE_LABELS[currentStage.stageType]?.label}
            </span>
          </div>

          {/* Interactive Canvas Card */}
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Stage Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentStage.stageTitle}</span>
            </div>

            {/* Main Prompt */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-100 leading-tight">
              {currentStage.prompt}
            </h2>

            {/* Situation Details */}
            {currentStage.situation && (
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-base sm:text-lg leading-relaxed">
                {currentStage.situation}
              </div>
            )}

            {/* STAGE TYPE: CHOOSE */}
            {currentStage.choices && currentStage.choices.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                  Make your decision:
                </div>
                {currentStage.choices.map((choice) => {
                  const isSelected = selectedChoiceId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleChoiceSelect(choice.id)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-amber-400/10 border-amber-400 text-zinc-100 shadow-md ring-1 ring-amber-400/30"
                          : "bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-base sm:text-lg text-zinc-100">
                          {choice.label}
                        </span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-amber-400 bg-amber-400" : "border-zinc-700"}`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-2">
                        {choice.description}
                      </p>

                      {isSelected && (
                        <div className="pt-3 border-t border-amber-400/20 text-xs text-amber-300 space-y-1 animate-fadeIn">
                          <div><strong>Consequence:</strong> {choice.consequence}</div>
                          <div><strong>Insight:</strong> {choice.insight}</div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* STAGE TYPE: DISCOVER */}
            {currentStage.discoveryPrinciple && (
              <div className="p-6 sm:p-8 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-5">
                <div>
                  <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">THE PRINCIPLE REVEALED</span>
                  <h3 className="text-2xl font-bold text-zinc-100 mt-1">
                    {currentStage.discoveryPrinciple.title}
                  </h3>
                  <p className="text-sm font-medium text-amber-300/90 mt-1">
                    {currentStage.discoveryPrinciple.subheadline}
                  </p>
                </div>

                <p className="text-base text-zinc-300 leading-relaxed">
                  {currentStage.discoveryPrinciple.explanation}
                </p>

                <div className="space-y-2 pt-3 border-t border-zinc-800">
                  <div className="text-xs font-mono uppercase text-zinc-400">Core Laws:</div>
                  {currentStage.discoveryPrinciple.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE TYPE: MISSION */}
            {currentStage.mission && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-bold uppercase">{currentStage.mission.title}</span>
                  <span className="text-zinc-400">Resource: {currentStage.mission.budgetOrResource}</span>
                </div>

                <p className="text-sm text-zinc-300">
                  {currentStage.mission.objective}
                </p>

                <div className="space-y-3">
                  {currentStage.mission.options.map((opt) => {
                    const isSelected = selectedMissionOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedMissionOption(opt.id)}
                        className={`w-full text-left p-4.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-400/10 border-amber-400 ring-1 ring-amber-400/30"
                            : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-sm text-zinc-100 mb-1">
                          <span>{opt.title}</span>
                          <span className="text-xs font-mono text-zinc-400">{opt.cost}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mb-2">{opt.expectedOutcome}</p>
                        <div className="text-xs font-mono text-amber-400">{opt.verdict}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STAGE TYPE: REFLECT */}
            {currentStage.reflectionPrompt && (
              <div className="space-y-4">
                <p className="text-base text-zinc-300 font-medium italic">
                  "{currentStage.reflectionPrompt}"
                </p>
                <textarea
                  value={reflectionInput}
                  onChange={(e) => setReflectionInput(e.target.value)}
                  placeholder="Record your personal insight here... (Saved automatically to your capability notebook)"
                  className="w-full h-32 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-400 resize-none font-sans"
                />
              </div>
            )}
          </div>
        </main>
      ) : (
        /* 3. "HOW YOU THINK" Capability Progress Dashboard */
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-zinc-100 mb-2">
              COGNITIVE PROGRESSION
            </h2>
            <p className="text-zinc-400 text-sm">
              Origin does not measure video watch percentage. We measure conceptual discovery and the evolution of your decision framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What You've Discovered */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>WHAT YOU'VE DISCOVERED</span>
              </div>
              <div className="space-y-3">
                {[
                  "Scarcity & The Reality of Limits",
                  "Opportunity Cost & The Invisible Price",
                  "Subjective Value & Marginal Utility",
                  "Supply, Demand & Price Mechanics",
                  "Cost-Benefit & Asymmetric Upside",
                  "Resource Optimization & The Builder's Plan"
                ].map((concept, idx) => {
                  const isUnlocked = idx < discoveredConcepts.length;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono ${
                        isUnlocked
                          ? "bg-amber-400/10 border-amber-500/30 text-zinc-100"
                          : "bg-zinc-900/30 border-zinc-900 text-zinc-600"
                      }`}
                    >
                      <span>{concept}</span>
                      <span>{isUnlocked ? "✓ UNLOCKED" : "LOCKED"}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* How You Think */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
                <Brain className="w-4 h-4" />
                <span>HOW YOU THINK (CAPABILITY METRICS)</span>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Decision Awareness", level: "Active" },
                  { name: "Resource Awareness", level: "Active" },
                  { name: "Value Thinking", level: "Calibrated" },
                  { name: "Trade-off Awareness", level: "High" },
                  { name: "Economic Reasoning", level: "Developing" }
                ].map((cap, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-300">{cap.name}</span>
                      <span className="text-amber-400">{cap.level}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                        style={{ width: `${Math.min(100, (idx + 1) * 20)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 4. Bottom Decision / Navigation Bar */}
      <footer className="sticky bottom-0 bg-[#08090c]/95 backdrop-blur-md border-t border-zinc-900 px-4 sm:px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handlePrevStage}
            disabled={currentModuleIndex === 0 && currentStageIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 text-xs font-mono disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            ← PREVIOUS
          </button>

          <div className="flex items-center gap-1.5">
            {stages.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentStageIndex
                    ? "bg-amber-400 w-5"
                    : idx < currentStageIndex
                    ? "bg-zinc-600"
                    : "bg-zinc-800"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextStage}
            className="px-6 py-2.5 rounded-xl bg-amber-400 text-zinc-950 font-bold text-xs font-mono tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-amber-400/10"
          >
            <span>{isLastStageInModule ? (isLastModule ? "COMPLETE EXPERIENCE" : "NEXT EXPERIENCE →") : "CONTINUE EXPLORING →"}</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
