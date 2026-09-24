"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, ChevronRight, CheckCircle, Play, Clock, 
  BookOpen, Target, ArrowRight, Star, Award, Video, Download,
  Compass, Eye, Flame, Zap, HelpCircle, Layers, CheckCircle2
} from "lucide-react";
import { courses } from "../../../data/courses";
import { motion, AnimatePresence } from "framer-motion";

// Extract YouTube video ID from a full URL or short form
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    return u.searchParams.get('v');
  } catch {
    const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
    return match ? match[1] : null;
  }
}

type ExperienceStage = "see" | "experience" | "challenge" | "apply";

export default function CourseLearnPage() {
  const params = useParams();
  const courseId = params.id as string;
  const router = useRouter();
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [activeStage, setActiveStage] = useState<ExperienceStage>("see");
  const [showAllStages, setShowAllStages] = useState(false);
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <div className="min-h-screen bg-[#8A948B] text-white flex items-center justify-center p-6 text-center font-mono">
        <div>
          <h1 className="text-xl font-bold mb-2">EXPERIENCE NOT FOUND</h1>
          <p className="text-sm text-white/80 mb-6">The requested thinking experience could not be loaded.</p>
          <Link href="/courses" className="px-5 py-2.5 rounded-xl bg-white text-[#1C3B34] font-bold text-xs hover:bg-[#E2E8DE] transition-all">
            Browse All Foundations
          </Link>
        </div>
      </div>
    );
  }

  const modules = course.detailedModules || [];
  const currentModuleData = modules[currentModule];
  const progress = (completedModules.length / modules.length) * 100;
  const xpEarned = completedModules.length * 25;

  const handleCompleteModule = () => {
    if (!completedModules.includes(currentModule)) {
      setCompletedModules([...completedModules, currentModule]);
    }
    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setActiveStage("see");
      setVideoStarted(false);
    }
  };

  const handlePrevModule = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setActiveStage("see");
      setVideoStarted(false);
    }
  };

  const handleModuleSelect = (index: number) => {
    setCurrentModule(index);
    setActiveStage("see");
    setVideoStarted(false);
  };

  // Get the YouTube video URL from this module's resources
  const videoResource = currentModuleData?.resources?.find(
    (r) => r.type === 'video' && r.url && r.url.includes('youtube')
  );
  const videoId = videoResource ? getYouTubeId(videoResource.url) : null;
  const courseVideoId = course?.youtubeVideoUrl ? getYouTubeId(course.youtubeVideoUrl) : null;
  const activeVideoId = videoId || courseVideoId;

  const STAGES: { id: ExperienceStage; label: string; icon: React.ComponentType<{ className?: string }>; tag: string }[] = [
    { id: "see", label: "01 THINK", icon: Compass, tag: "Unexamined Assumptions" },
    { id: "experience", label: "02 EXPERIENCE", icon: Eye, tag: "Active Context & Models" },
    { id: "challenge", label: "03 CHALLENGE", icon: Flame, tag: "High-Stakes Friction" },
    { id: "apply", label: "04 APPLY", icon: Zap, tag: "Field Execution & Life" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white selection:bg-white selection:text-[#8A948B] font-sans relative overflow-hidden">
      {/* Dynamic Animated Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-white/10 blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      {/* Top Header Bar */}
      <div className="bg-black/20 border-b border-white/15 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <Link 
            href={`/courses/${courseId}`}
            className="flex items-center gap-2 text-xs font-mono text-white/90 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="uppercase font-bold tracking-wider">Foundation Overview</span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Progress Bar */}
            <div className="hidden sm:flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-amber-300">{Math.round(progress)}% Complete</span>
              <div className="w-24 bg-black/40 rounded-full h-2 border border-white/15">
                <div 
                  className="bg-amber-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* XP Badge */}
            <div className="flex items-center gap-1.5 bg-black/40 border border-white/20 px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-300 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{xpEarned} XP</span>
            </div>

            {/* Workbook Download */}
            <a
              href={`/documents/course-${courseId}-workbook.pdf`}
              download
              className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-white/15 text-white hover:bg-white/25 border border-white/25 text-xs font-mono font-bold rounded-full transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Workbook PDF</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Experiences Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#E2E8DE] text-[#172217] rounded-3xl border border-[#D5DDCF] p-5 sm:p-6 shadow-xl space-y-4">
              <div className="border-b border-[#D0D9CA] pb-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#1C3B34] font-bold uppercase tracking-wider">
                    {course.title.split(":")[0]}
                  </div>
                  <h3 className="font-serif font-extrabold text-lg text-[#172217] leading-tight">
                    Experiential Journey
                  </h3>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#1C3B34] px-2.5 py-0.5 rounded-full bg-white/80 border border-[#CCD6C6]">
                  {modules.length} Stages
                </span>
              </div>

              {/* Module Navigation List */}
              <div className="space-y-2">
                {modules.map((module, index) => {
                  const isCompleted = completedModules.includes(index);
                  const isCurrent = currentModule === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleModuleSelect(index)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 cursor-pointer border ${
                        isCurrent 
                          ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md -translate-y-0.5' 
                          : isCompleted 
                            ? 'bg-white/80 text-[#172217] border-[#CCD6C6] hover:bg-white' 
                            : 'bg-white/50 text-[#3E4A3B] border-transparent hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {isCompleted ? (
                            <CheckCircle2 className={`w-5 h-5 ${isCurrent ? 'text-amber-300' : 'text-[#1C3B34]'}`} />
                          ) : (
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold ${
                              isCurrent ? 'border-amber-300 text-amber-300' : 'border-[#3E4A3B]/60 text-[#3E4A3B]'
                            }`}>
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-bold line-clamp-2 leading-snug">
                            {module.title}
                          </p>
                          <div className={`flex items-center gap-2 text-[10px] font-mono mt-1 ${isCurrent ? 'text-white/70' : 'text-[#4E5B4B]'}`}>
                            <span>{module.estimatedTime}</span>
                            <span>•</span>
                            <span>4 Journey Stages</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Reflection Box Preview */}
              <div className="pt-3 border-t border-[#D0D9CA]">
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/80 hover:bg-white border border-[#CCD6C6] text-xs font-mono font-bold text-[#1C3B34] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#1C3B34]" />
                    <span>Thinking Journal &amp; Notes</span>
                  </span>
                  <span>{showNotes ? '▲' : '▼'}</span>
                </button>

                {showNotes && (
                  <div className="mt-3 space-y-2 animate-fadeIn">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Write your decision reflections and insights here..."
                      rows={4}
                      className="w-full bg-white border border-[#CCD6C6] rounded-xl p-3 text-xs text-[#172217] placeholder-[#4E5B4B]/60 focus:outline-none focus:border-[#1C3B34] transition-colors resize-none font-sans"
                    />
                    <div className="flex justify-end gap-2 text-[11px] font-mono">
                      <button
                        onClick={() => setNotes("")}
                        className="px-3 py-1 rounded-lg text-[#4E5B4B] hover:text-[#172217] hover:bg-black/5"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => alert("Reflections recorded for this session.")}
                        className="px-3 py-1 rounded-lg bg-[#1C3B34] text-white font-bold hover:bg-[#122420]"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: The Intentional 4-Stage Experience Engine */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#E2E8DE] text-[#172217] rounded-3xl border border-[#D5DDCF] shadow-2xl overflow-hidden">
              
              {/* Intentional 4-Stage Navigation Bar */}
              <div className="p-4 sm:p-6 pb-4 border-b border-[#D0D9CA] bg-white/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#1C3B34] font-bold">
                      STAGE {currentModule + 1} OF {modules.length} · INTENTIONAL THINKING ENGINE
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#172217]">
                      {currentModuleData?.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => setShowAllStages(!showAllStages)}
                    className="text-[11px] font-mono text-[#1C3B34] hover:underline font-bold self-start sm:self-auto cursor-pointer"
                  >
                    {showAllStages ? "← Focus Stage Mode" : "View Continuous Flow →"}
                  </button>
                </div>

                {/* 4-Stage Pills: SEE IT → EXPERIENCE IT → CHALLENGE IT → APPLY IT */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {STAGES.map((s, sIdx) => {
                    const isActive = activeStage === s.id && !showAllStages;
                    const StageIcon = s.icon;

                    return (
                      <button
                        key={s.id}
                        onClick={() => {
                          setShowAllStages(false);
                          setActiveStage(s.id);
                        }}
                        className={`p-2.5 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                          isActive
                            ? "bg-[#1C3B34] text-white border-[#1C3B34] shadow-md scale-102"
                            : "bg-white/80 text-[#3E4A3B] border-[#CCD6C6] hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <StageIcon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-[#1C3B34]'}`} />
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isActive ? 'text-amber-300' : 'text-[#1C3B34]'}`}>
                            0{sIdx + 1} · {s.label}
                          </span>
                        </div>
                        <div className={`text-[10px] font-sans truncate ${isActive ? 'text-white/80' : 'text-[#4E5B4B]'}`}>
                          {s.tag}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STAGE CONTENT DISPLAY */}
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* 1. SEE IT: Scenario Observation & Video Player */}
                {(showAllStages || activeStage === "see") && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                      <Eye className="w-4 h-4 text-amber-600" />
                      <span>PHASE 01 // SEE IT · OBSERVE THE SITUATION IN MOTION</span>
                    </div>

                    {/* Video Player */}
                    {activeVideoId ? (
                      <div className="rounded-2xl overflow-hidden shadow-2xl relative bg-black aspect-video group border border-black/20">
                        {!videoStarted ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#172217] to-black z-10 p-6 text-center">
                            <button
                              onClick={() => setVideoStarted(true)}
                              className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1C3B34] border border-amber-300/40 rounded-full flex items-center justify-center text-white pl-1 hover:scale-110 transition-all shadow-xl cursor-pointer"
                              title="Begin Observation"
                            >
                              <Play className="w-8 h-8 text-amber-300" fill="currentColor" />
                            </button>
                            <p className="mt-4 font-mono font-bold text-white tracking-widest uppercase text-xs">
                              Tap to Watch Dilemma Unfold
                            </p>
                            {videoResource && (
                              <p className="mt-1 text-xs text-white/70 max-w-sm">
                                {videoResource.name.replace(' (Video)', '').replace(' (video)', '')}
                              </p>
                            )}
                          </div>
                        ) : (
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                            title={videoResource?.name || 'Experience Video'}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                      </div>
                    ) : (
                      <div className="p-6 rounded-2xl bg-white/80 border border-[#CCD6C6] text-[#172217] space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1C3B34]">
                          <Video className="w-4 h-4" />
                          <span>SITUATIONAL SCENARIO FRAMING</span>
                        </div>
                        <p className="text-sm text-[#4E5B4B] leading-relaxed">
                          Enter this situation by picturing yourself confronting limited capital, urgent choices, and competing demands under strict time limits.
                        </p>
                      </div>
                    )}

                    <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] flex items-start gap-3">
                      <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div className="text-xs text-[#172217] space-y-0.5">
                        <span className="font-bold block">Observation Inquiry:</span>
                        <p className="text-[#4E5B4B]">
                          Notice what resources (money, time, emotion, trust) are currently at stake. What invisible trade-off is occurring before any obvious outcome is visible?
                        </p>
                      </div>
                    </div>

                    {!showAllStages && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => setActiveStage("experience")}
                          className="px-6 py-3 rounded-xl bg-[#1C3B34] hover:bg-[#122420] text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                        >
                          <span>NEXT: EXPERIENCE THE CONCEPTS</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2. EXPERIENCE IT: Mental Models, Thinking Concepts & Capabilities */}
                {(showAllStages || activeStage === "experience") && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 pt-4 border-t border-[#D0D9CA]"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                      <Compass className="w-4 h-4 text-amber-600" />
                      <span>PHASE 02 // EXPERIENCE IT · UNPACK THE MENTAL ARCHITECTURE</span>
                    </div>

                    {/* Foundation Insights Narrative */}
                    <div className="p-6 rounded-2xl bg-white/90 border border-[#CCD6C6] space-y-3 shadow-xs">
                      <h4 className="text-sm font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                        Foundation &amp; Underlying Principle
                      </h4>
                      <p className="text-sm sm:text-base text-[#172217] leading-relaxed whitespace-pre-line font-light">
                        {currentModuleData?.content}
                      </p>
                    </div>

                    {/* Thinking Concepts */}
                    {currentModuleData?.topics && currentModuleData.topics.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                          Key Thinking Concepts in this Experience
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentModuleData.topics.map((topic, index) => (
                            <div key={index} className="flex items-start gap-3 p-3.5 bg-white/80 border border-[#CCD6C6] rounded-xl shadow-xs">
                              <span className="w-6 h-6 rounded-full bg-[#1C3B34] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              <p className="text-xs font-medium text-[#172217] leading-snug">{topic}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Core Capabilities Unlocked */}
                    {currentModuleData?.objectives && (
                      <div className="p-5 rounded-2xl bg-white/70 border border-[#CCD6C6] space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1C3B34] uppercase">
                          <Target className="w-4 h-4 text-[#1C3B34]" />
                          <span>Core Capabilities Unlocked</span>
                        </div>
                        <div className="space-y-2">
                          {currentModuleData.objectives.map((objective, index) => (
                            <div key={index} className="flex items-start gap-2.5 text-xs text-[#172217]">
                              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                              <span>{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!showAllStages && (
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => setActiveStage("see")}
                          className="px-4 py-2.5 rounded-xl border border-[#CCD6C6] bg-white/80 text-[#172217] font-mono text-xs font-bold hover:bg-white transition-all cursor-pointer"
                        >
                          ← PREV: SEE IT
                        </button>
                        <button
                          onClick={() => setActiveStage("challenge")}
                          className="px-6 py-3 rounded-xl bg-[#1C3B34] hover:bg-[#122420] text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                        >
                          <span>NEXT: CHALLENGE YOUR THINKING</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 3. CHALLENGE IT: High-Stakes Friction, Decision Scenarios & Reflection */}
                {(showAllStages || activeStage === "challenge") && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 pt-4 border-t border-[#D0D9CA]"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                      <Flame className="w-4 h-4 text-amber-600" />
                      <span>PHASE 03 // CHALLENGE IT · TEST YOUR CONVICTION UNDER FRICTION</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold">
                        Dilemma Provocation
                      </div>
                      <p className="text-sm sm:text-base font-extrabold text-[#172217] leading-snug">
                        Before reading textbook solutions, force a real choice under constraints.
                      </p>
                      <p className="text-xs text-[#4E5B4B]">
                        What would you sacrifice if your primary plan failed in the first 48 hours?
                      </p>
                    </div>

                    {/* Practical Challenges & Real-World Friction */}
                    {currentModuleData?.activities && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                          Field Challenges &amp; Trade-Off Missions
                        </h4>
                        <div className="space-y-2.5">
                          {currentModuleData.activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-white/90 rounded-2xl border border-[#CCD6C6] shadow-xs">
                              <span className="p-1 rounded-lg bg-amber-500/20 text-amber-900 text-xs font-mono font-bold">
                                #{index + 1}
                              </span>
                              <p className="text-xs sm:text-sm text-[#172217] leading-relaxed">{activity}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!showAllStages && (
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => setActiveStage("experience")}
                          className="px-4 py-2.5 rounded-xl border border-[#CCD6C6] bg-white/80 text-[#172217] font-mono text-xs font-bold hover:bg-white transition-all cursor-pointer"
                        >
                          ← PREV: EXPERIENCE IT
                        </button>
                        <button
                          onClick={() => setActiveStage("apply")}
                          className="px-6 py-3 rounded-xl bg-[#1C3B34] hover:bg-[#122420] text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                        >
                          <span>NEXT: APPLY IN REAL LIFE</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 4. APPLY IT: Implementation, Companion Tools & Advancement */}
                {(showAllStages || activeStage === "apply") && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 pt-4 border-t border-[#D0D9CA]"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span>PHASE 04 // APPLY IT · TRANSFER TO REAL-WORLD CAPABILITY</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/90 border border-[#CCD6C6] space-y-2">
                      <h4 className="text-sm font-bold text-[#172217]">Action Protocol</h4>
                      <p className="text-xs sm:text-sm text-[#4E5B4B] leading-relaxed">
                        Do not leave this insight in your browser. Deploy it within the next 24 hours: in your negotiations, your personal budget allocation, or your communication with collaborators.
                      </p>
                    </div>

                    {/* Resources & Companions */}
                    {currentModuleData?.resources && currentModuleData.resources.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                          Companion Tools &amp; Implementation Resources
                        </h4>
                        <div className="space-y-2">
                          {currentModuleData.resources.map((resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3.5 bg-white/80 rounded-xl hover:bg-white border border-[#CCD6C6] transition-colors shadow-xs"
                            >
                              <BookOpen className="w-4 h-4 text-[#1C3B34]" />
                              <span className="text-xs font-bold text-[#172217]">{resource.name}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#4E5B4B] ml-auto" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Advancement Action */}
                    <div className="p-6 rounded-2xl bg-[#1C3B34] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                      <div>
                        <h4 className="font-serif font-extrabold text-lg">
                          Stage {currentModule + 1} Mission Complete?
                        </h4>
                        <p className="text-xs text-white/80 font-light mt-0.5">
                          Advance your thinking and earn 25 XP toward your Verified Capability Certificate.
                        </p>
                      </div>

                      <button
                        onClick={handleCompleteModule}
                        className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#172217] font-mono text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg whitespace-nowrap"
                      >
                        <span>{completedModules.includes(currentModule) ? "COMPLETED · NEXT STAGE" : "MARK STAGE COMPLETE"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {!showAllStages && (
                      <div className="pt-2 flex justify-start">
                        <button
                          onClick={() => setActiveStage("challenge")}
                          className="px-4 py-2.5 rounded-xl border border-[#CCD6C6] bg-white/80 text-[#172217] font-mono text-xs font-bold hover:bg-white transition-all cursor-pointer"
                        >
                          ← PREV: CHALLENGE IT
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

              </div>

              {/* Bottom Stage Navigation Controls */}
              <div className="p-6 border-t border-[#D0D9CA] bg-white/30 flex items-center justify-between">
                <button
                  onClick={handlePrevModule}
                  disabled={currentModule === 0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#CCD6C6] bg-white/80 hover:bg-white text-[#172217] text-xs font-mono font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                >
                  <ChevronLeft size={16} />
                  <span>PREV EXPERIENCE</span>
                </button>

                <div className="text-xs font-mono text-[#4E5B4B]">
                  {currentModule + 1} of {modules.length} Stages
                </div>

                <button
                  onClick={() => {
                    if (currentModule < modules.length - 1) {
                      setCurrentModule(currentModule + 1);
                      setActiveStage("see");
                      setVideoStarted(false);
                    }
                  }}
                  disabled={currentModule === modules.length - 1}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#CCD6C6] bg-white/80 hover:bg-white text-[#172217] text-xs font-mono font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                >
                  <span>NEXT EXPERIENCE</span>
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
