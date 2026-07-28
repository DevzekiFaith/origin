"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Compass,
  GraduationCap,
  Target,
  Download,
  Printer,
  Smartphone,
  Play,
  Pause,
  Sun,
  Moon,
  CheckCircle2,
  ArrowRight,
  Star,
  PenTool,
  BookOpen,
  Check,
  ShieldCheck,
  FileText,
  Volume2,
  Mic,
  Zap,
  Lock,
  Clock,
  Layers,
  Award
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";

// Bespoke 3D Isometric Journal Hardcopy Mockup Component (Mobile Optimized)
function Journal3DMockup({ size = "normal" }: { size?: "normal" | "large" }) {
  return (
    <div className="relative group perspective-[1400px] flex items-center justify-center py-6 sm:py-10 select-none overflow-visible">
      {/* Ambient Multi-Layer Floor Shadow & Glow */}
      <div className="absolute -bottom-6 w-48 sm:w-56 h-8 bg-black/95 blur-2xl rounded-full transform rotate-x-[70deg] group-hover:scale-110 group-hover:bg-amber-500/10 transition-all duration-700" />
      <div className="absolute -bottom-3 w-36 sm:w-40 h-4 bg-amber-500/20 blur-lg rounded-full transform rotate-x-[60deg] pointer-events-none" />

      {/* 3D Journal Container */}
      <div
        className={`relative ${
          size === "large" ? "w-48 h-68 sm:w-60 sm:h-88" : "w-40 h-56 sm:w-48 sm:h-68"
        } transition-all duration-700 ease-out transform-gpu transform rotate-y-[-24deg] rotate-x-[12deg] sm:rotate-y-[-26deg] sm:rotate-x-[14deg] group-hover:rotate-y-[-10deg] group-hover:rotate-x-[6deg] group-hover:scale-105 shadow-2xl`}
      >
        {/* Front Cover (Obsidian Linen with Gold Leaf Accents) */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-r-2xl rounded-l-xs border-r-2 border-y border-amber-400/60 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-4 sm:p-5 flex flex-col justify-between overflow-hidden z-20">
          {/* Tactile Woven Linen Texture Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none" />
          
          {/* Metallic Gold Leaf Shine Flare */}
          <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-amber-200/15 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Double Gold Foil Pinstripe Frame */}
          <div className="absolute inset-2.5 sm:inset-3 border border-amber-500/40 rounded-r-xl rounded-l-xs pointer-events-none flex items-center justify-center shadow-inner">
            <div className="absolute inset-1 border border-amber-400/25 rounded-r-lg rounded-l-2xs" />
          </div>

          {/* Brass Protective Metallic Corners */}
          <div className="absolute top-2 left-2 w-2.5 sm:w-3 h-2.5 sm:h-3 border-t-2 border-l-2 border-amber-400/90 rounded-tl-sm pointer-events-none z-30" />
          <div className="absolute top-2 right-2 w-2.5 sm:w-3 h-2.5 sm:h-3 border-t-2 border-r-2 border-amber-400/90 rounded-tr-sm pointer-events-none z-30" />
          <div className="absolute bottom-2 left-2 w-2.5 sm:w-3 h-2.5 sm:h-3 border-b-2 border-l-2 border-amber-400/90 rounded-bl-sm pointer-events-none z-30" />
          <div className="absolute bottom-2 right-2 w-2.5 sm:w-3 h-2.5 sm:h-3 border-b-2 border-r-2 border-amber-400/90 rounded-br-sm pointer-events-none z-30" />

          {/* Top Brand Header */}
          <div className="relative z-20 flex items-center justify-between border-b border-amber-500/30 pb-2 sm:pb-3 px-1 sm:px-2 mt-0.5 sm:mt-1">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 uppercase">
                ORIGIN
              </span>
            </div>
            <span className="text-[7.5px] sm:text-[8px] font-mono font-bold text-amber-400/80 uppercase tracking-widest border border-amber-500/30 px-1 sm:px-1.5 py-0.5 rounded bg-amber-500/10">
              90-DAY
            </span>
          </div>

          {/* Center Debossed Gold Medallion Emblem */}
          <div className="relative z-20 text-center my-auto py-2 sm:py-3 px-1 sm:px-2">
            <div className="relative w-11 h-11 sm:w-14 sm:h-14 mx-auto rounded-full border-2 border-amber-400/60 bg-gradient-to-b from-amber-500/20 via-black to-amber-950/40 flex items-center justify-center mb-2 sm:mb-3 shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:border-amber-300 transition-colors">
              <div className="absolute inset-1 rounded-full border border-dashed border-amber-400/40 animate-spin-slow" />
              <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
            </div>

            <h4 className="text-[11px] sm:text-sm font-light text-white tracking-[0.2em] uppercase font-serif drop-shadow">
              LIFE DESIGN
            </h4>
            <span className="text-[8px] sm:text-[9px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 uppercase tracking-[0.3em] block mt-0.5 sm:mt-1">
              QUARTERLY JOURNAL
            </span>
          </div>

          {/* Vertical Tactile Elastic Band */}
          <div className="absolute top-0 bottom-0 right-5 sm:right-6 w-3 sm:w-3.5 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border-x border-amber-500/40 z-30 shadow-md flex items-center justify-center">
            <div className="w-px h-full bg-amber-400/30" />
          </div>

          {/* Bottom Motto */}
          <div className="relative z-20 pt-2 sm:pt-3 border-t border-amber-500/30 text-center px-1 sm:px-2">
            <p className="text-[7px] sm:text-[7.5px] font-bold tracking-[0.18em] text-zinc-300 uppercase">
              DREAM &bull; EDUCATION &bull; PURPOSE
            </p>
          </div>
        </div>

        {/* Book Spine (3D Left Side with Metallic Foil Text) */}
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-7 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black rounded-l-md border-y border-l border-amber-500/50 transform -translate-x-full rotate-y-[-90deg] origin-right z-10 flex flex-col items-center justify-between py-4 sm:py-5 text-amber-300 font-mono text-[7px] sm:text-[7.5px] font-bold tracking-widest uppercase shadow-2xl">
          <span>ORIGIN</span>
          <span className="transform rotate-90 whitespace-nowrap tracking-[0.2em]">
            90-DAY LIFE SPRINT
          </span>
          <Compass className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-amber-400" />
        </div>

        {/* Page Edges (3D Right Side Stacked Ivory Archival Paper) */}
        <div className="absolute top-1 bottom-1 right-0 w-5 sm:w-6 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300/80 transform translate-x-full rotate-y-[90deg] origin-left rounded-r-xs border-y border-amber-400/60 flex flex-col justify-around py-2 sm:py-3 z-10 opacity-95 shadow-2xl">
          <div className="w-full h-px bg-amber-900/30" />
          <div className="w-full h-px bg-amber-900/30" />
          <div className="w-full h-px bg-amber-900/30" />
          <div className="w-full h-px bg-amber-900/30" />
          <div className="w-full h-px bg-amber-900/30" />
          <div className="w-full h-px bg-amber-900/30" />
        </div>

        {/* Woven Satin Bookmark Ribbons */}
        <div className="absolute -bottom-5 left-10 w-2.5 sm:w-3 h-6 sm:h-8 bg-amber-500 shadow-lg transform rotate-6 z-10 rounded-b-xs border-x border-amber-600 flex items-end justify-center pb-1">
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[5px] border-b-black" />
        </div>
        <div className="absolute -bottom-7 left-14 w-2 sm:w-2.5 h-8 sm:h-10 bg-blue-600 shadow-lg transform -rotate-3 z-10 rounded-b-xs border-x border-blue-700 flex items-end justify-center pb-1">
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-black" />
        </div>
      </div>
    </div>
  );
}

export default function OriginPlannerPage() {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [mounted, setMounted] = useState(false);

  // Hydration safety mount effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // Interactive Tab State: 'dream' | 'education' | 'purpose'
  const [activeTab, setActiveTab] = useState<"dream" | "education" | "purpose">("dream");

  // Pricing & Tier Selection State: 'free' | 'digital_pro' | 'hardcover'
  const [selectedTier, setSelectedTier] = useState<"free" | "digital_pro" | "hardcover">("digital_pro");

  // Audio Player State & Controls
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(150); // 2:30 mins
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Email & Checkout Form
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Live Interactive Sample Inputs for 90-Day Sprint
  const [interactiveDream, setInteractiveDream] = useState({
    vision: "",
    idealDay: "",
    masterTarget1: "",
    masterTarget2: "",
    masterTarget3: ""
  });

  const [interactiveEducation, setInteractiveEducation] = useState({
    currentSkills: "",
    skillsToLearn: "",
    dailyCommitment: "60 mins/day",
    primaryHabit: ""
  });

  const [interactivePurpose, setInteractivePurpose] = useState({
    mainFocus: "",
    priority1: "",
    priority2: "",
    priority3: "",
    affirmation: "Today I step closer to my dream by educating my mind and executing with clarity."
  });

  // Handle Audio Playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= audioDuration) {
            setIsPlayingAudio(false);
            return 0;
          }
          const next = prev + 1;
          setAudioProgress((next / audioDuration) * 100);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, audioDuration]);

  const togglePlayAudio = () => {
    if (audioRef.current && audioRef.current.src) {
      if (isPlayingAudio) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.warn("Audio file fallback playing simulation.");
        });
      }
    }
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleSeekAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = parseFloat(e.target.value);
    const newTime = (newPercent / 100) * audioDuration;
    setAudioProgress(newPercent);
    setCurrentTime(Math.floor(newTime));
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  const handleTierAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    setIsProcessing(true);

    if (selectedTier === "free") {
      setTimeout(() => {
        setIsProcessing(false);
        showToast("Free 7-Day Sprint Sample sent to your inbox & downloading!", "success");
        const link = document.createElement("a");
        link.href = "/documents/origin_7day_sprint_starter.pdf";
        link.download = `Origin_7Day_Sprint_Starter.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 1000);
    } else if (selectedTier === "digital_pro") {
      setTimeout(() => {
        setIsProcessing(false);
        addToCart({
          id: "store-planner-90day",
          title: "Origin 90-Day Quarterly Digital Master Kit",
          description: "Full 90-Day Fillable Planner + Audio Sprint Guide",
          fullDescription: "Includes 90-day high-intensity digital planner (Dark/Light themes), GoodNotes/tablet fillable format, plus founder audio sprint guide.",
          priceUSD: 6.99,
          imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
          bgGradient: "bg-blue-950/20",
          icon: PenTool,
          iconColor: "text-[#60a5fa]",
          ageRange: "All Ages",
        });
        showToast("Origin 90-Day Digital Master Kit ($6.99 / ₦10,000) added to cart & downloading preview!", "success");
        const link = document.createElement("a");
        link.href = "/documents/origin_90day_digital_master_kit.pdf";
        link.download = `Origin_90Day_Digital_Master_Kit.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 800);
    } else {
      setTimeout(() => {
        setIsProcessing(false);
        addToCart({
          id: "store-1",
          title: "Origin 90-Day Quarterly Journal (Hardcopy)",
          description: "Tactile 90-day journal for deep focus and personal transformation",
          fullDescription: "Optimize your 90-day sprint, track daily skill growth, and execute non-negotiables with the Origin 90-Day Hardcover Edition.",
          priceUSD: 24.99,
          imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
          bgGradient: "bg-blue-950/20",
          icon: PenTool,
          iconColor: "text-[#60a5fa]",
          ageRange: "All Ages",
        });
        showToast("Origin 90-Day Hardcover Edition ($24.99 / ₦35,000) added to cart & companion guide downloading!", "success");
        const link = document.createElement("a");
        link.href = "/documents/origin_90day_hardcover_companion.pdf";
        link.download = `Origin_90Day_Hardcover_Companion.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-600 selection:text-white antialiased overflow-x-hidden" suppressHydrationWarning>
      <audio ref={audioRef} src="/audio/origin_architecture_guide.mp3" preload="metadata" />

      {/* Top Header Banner */}
      <header className="border-b border-zinc-900 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-zinc-800 bg-zinc-950 flex items-center justify-center group-hover:border-blue-500 transition-colors">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white leading-none">
                ORIGIN
              </span>
              <span className="text-[9px] sm:text-[10px] text-zinc-400 tracking-[0.15em] font-medium uppercase mt-0.5 sm:mt-1">
                Powered by The Becoming Institute
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/store"
              className="text-xs text-zinc-400 hover:text-white transition-colors hidden sm:inline-flex items-center gap-2 tracking-wide font-medium"
            >
              <BookOpen size={14} /> CATALOG
            </Link>
            <button
              onClick={() => {
                const el = document.getElementById("pricing-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-black hover:bg-zinc-200 text-[11px] sm:text-xs font-bold tracking-wider uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-md flex items-center gap-1.5 sm:gap-2 transition-all active:scale-95"
            >
              <Download size={13} /> Get 90-Day Kit
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 border-b border-zinc-900 bg-black text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase mb-6 sm:mb-8">
            <Clock size={12} /> Powered by The Becoming Institute &bull; Mindvest Global Resources
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.15] mb-6 sm:mb-8">
            We start with your <span className="font-bold text-white underline decoration-blue-500/60 underline-offset-4 sm:underline-offset-8">dreams</span> before educating you.
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-zinc-400 font-normal leading-relaxed mb-8 sm:mb-12">
            Long 12-month goals create procrastination. The <strong className="text-white font-medium">Origin 90-Day Quarterly Planner</strong> focuses your energy into intense, high-yield sprints: <span className="text-white font-semibold">Dream</span> → <span className="text-white font-semibold">Education</span> → <span className="text-white font-semibold">Purpose</span>. 90 days of deep clarity and follow-through.
          </p>

          {/* Audio Companion Player */}
          <div className="max-w-xl mx-auto bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-5 text-left mb-8 sm:mb-12 shadow-2xl">
            <div className="flex items-center justify-between mb-3 sm:mb-4 border-b border-zinc-900 pb-3">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Mic size={15} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block leading-none">
                    Founder Audio: Why 90-Day Sprints Win
                  </span>
                  <span className="text-[10px] text-zinc-500 block mt-1">
                    Guided audio: Dream &rarr; Education &rarr; Purpose
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-[10px] sm:text-[11px] font-medium text-zinc-400 hover:text-white flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 transition-colors flex-shrink-0"
              >
                <FileText size={12} /> {showTranscript ? "Hide" : "Script"}
              </button>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={togglePlayAudio}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center flex-shrink-0 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                aria-label={isPlayingAudio ? "Pause Audio" : "Play Audio"}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs font-medium text-zinc-400 mb-1.5">
                  <span className="text-white text-[11px] sm:text-xs font-bold truncate pr-2 flex items-center gap-1.5">
                    <Volume2 size={13} className="text-blue-400 flex-shrink-0" /> {isPlayingAudio ? "Playing Audio..." : "Play 90-Day Audio"}
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px] sm:text-[11px] flex-shrink-0">
                    {formatTime(currentTime)} / {formatTime(audioDuration)}
                  </span>
                </div>

                <div className="relative flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={audioProgress}
                    onChange={handleSeekAudio}
                    className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
            </div>

            {showTranscript && (
              <div className="mt-4 pt-4 border-t border-zinc-900 bg-black/60 rounded-xl p-3.5 sm:p-4 text-xs leading-relaxed text-zinc-300 space-y-3 font-mono border border-zinc-800 animate-fadeIn">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-blue-400 border-b border-zinc-900 pb-2">
                  <span>90-Day Audio Sprint Transcript</span>
                  <span>2:30</span>
                </div>
                <p>
                  <strong className="text-white font-sans">[0:00 - 0:45] Why 90-Day Sprints Over 12 Months:</strong><br />
                  &quot;Welcome to Origin. 12-month goals create complacency because the deadline feels far away. A 90-day quarterly sprint provides urgency. It forces intense focus, rapid feedback, and immediate execution.&quot;
                </p>
                <p>
                  <strong className="text-white font-sans">[0:45 - 1:30] Phase I & II — Dream & Targeted Skill Mastery:</strong><br />
                  &quot;In the first 30 days of the quarter, you map your dream targets. In days 31 to 60, education becomes laser-focused. You acquire the exact 2 skills required for this quarter&apos;s sprint.&quot;
                </p>
                <p>
                  <strong className="text-white font-sans">[1:30 - 2:30] Phase III — Execution & Quarterly Review:</strong><br />
                  &quot;Days 61 to 90 are pure purpose and execution. You complete the sprint, measure your outcome, and reset for the next quarter. High focus. Zero burnout.&quot;
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("pricing-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider px-7 py-4 rounded-md flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Get 90-Day Sprint Kit <ArrowRight size={15} />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("interactive-planner");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-800 font-semibold text-xs uppercase tracking-wider px-7 py-4 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              Test Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* 3-Tier Value Ladder Pricing Section */}
      <section id="pricing-section" className="py-16 sm:py-24 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.25em]">Quarterly Sprint Options</span>
            <h2 className="text-2xl sm:text-5xl font-light text-white mt-2 tracking-tight">
              Select Your <span className="font-bold">Origin 90-Day Sprint Suite</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
              High-intensity 90-day focus. Choose between the Free 7-Day Sample, the Micro-Upsell 90-Day Digital Master Kit, or the Physical Hardcover Edition.
            </p>
          </div>

          {/* Mobile Stacking Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Card 1: Free Starter */}
            <div
              onClick={() => setSelectedTier("free")}
              className={`cursor-pointer rounded-2xl p-6 sm:p-8 border flex flex-col justify-between transition-all ${
                selectedTier === "free"
                  ? "bg-black border-blue-500 ring-1 ring-blue-500 shadow-xl"
                  : "bg-black/50 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">
                  Tier 01 &bull; Sample
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Free 7-Day Sprint Sample</h3>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  A 7-day micro-sprint starter sheet for immediate clarity.
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">$0</span>
                    <span className="text-lg sm:text-xl font-bold text-blue-400">/ ₦0</span>
                  </div>
                  <span className="text-xs text-zinc-500 block mt-1">Forever Free Access</span>
                </div>

                <ul className="space-y-3 text-xs text-zinc-300 border-t border-zinc-900 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-blue-400 flex-shrink-0" /> 7-Day Micro-Sprint Printable PDF
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-blue-400 flex-shrink-0" /> Dream Mapping Quickstart
                  </li>
                  <li className="flex items-center gap-2 text-zinc-600">
                    <Lock size={15} className="flex-shrink-0" /> Full 90-Day Quarterly Planner (Locked)
                  </li>
                  <li className="flex items-center gap-2 text-zinc-600">
                    <Lock size={15} className="flex-shrink-0" /> Founder 90-Day Audio Sprint (Locked)
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900">
                <button
                  type="button"
                  className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedTier === "free"
                      ? "bg-zinc-800 text-white"
                      : "bg-zinc-900 text-zinc-400 hover:text-white"
                  }`}
                >
                  {selectedTier === "free" ? "Selected Option" : "Get Free Sample ($0 / ₦0)"}
                </button>
              </div>
            </div>

            {/* Card 2: 90-Day Digital Pro */}
            <div
              onClick={() => setSelectedTier("digital_pro")}
              className={`cursor-pointer rounded-2xl p-6 sm:p-8 border relative flex flex-col justify-between transition-all ${
                selectedTier === "digital_pro"
                  ? "bg-black border-blue-500 ring-2 ring-blue-500/50 shadow-2xl"
                  : "bg-black/50 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3.5 py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest shadow-lg whitespace-nowrap">
                Most Popular &bull; High Focus
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-2">
                  Tier 02 &bull; 90-Day Micro-Upsell
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">90-Day Digital Master Kit</h3>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  Full 90-day fillable quarterly planner + founder audio sprint guide.
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">$6.99</span>
                    <span className="text-xl sm:text-2xl font-bold text-blue-400">/ ₦10,000</span>
                  </div>
                  <span className="text-xs text-zinc-500 block mt-1">
                    Regular: <span className="line-through">$19.99 / ₦28,000</span>
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-zinc-300 border-t border-zinc-900 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-blue-400 flex-shrink-0" /> Full 90-Day Quarterly Fillable Digital PDF
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-blue-400 flex-shrink-0" /> iPad, Tablet & GoodNotes Format
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-blue-400 flex-shrink-0" /> Dark & Light Aesthetic Themes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-blue-400 flex-shrink-0" /> Founder 90-Day Audio Sprint Guide
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900">
                <button
                  type="button"
                  className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedTier === "digital_pro"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-zinc-900 text-zinc-400 hover:text-white"
                  }`}
                >
                  {selectedTier === "digital_pro" ? "Selected Option" : "Get 90-Day Digital ($6.99 / ₦10,000)"}
                </button>
              </div>
            </div>

            {/* Card 3: 90-Day Physical Hardcover Suite */}
            <div
              onClick={() => setSelectedTier("hardcover")}
              className={`cursor-pointer rounded-2xl p-6 sm:p-8 border flex flex-col justify-between transition-all ${
                selectedTier === "hardcover"
                  ? "bg-black border-amber-500 ring-1 ring-amber-500 shadow-xl"
                  : "bg-black/50 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-2">
                  Tier 03 &bull; Physical Upgrade
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">90-Day Hardcover Journal</h3>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  Tactile 90-day debossed linen journal shipped directly to you.
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">$24.99</span>
                    <span className="text-xl sm:text-2xl font-bold text-amber-400">/ ₦35,000</span>
                  </div>
                  <span className="text-xs text-zinc-500 block mt-1">+ Free Shipping in Nigeria</span>
                </div>

                <ul className="space-y-3 text-xs text-zinc-300 border-t border-zinc-900 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-amber-400 flex-shrink-0" /> 90-Day Debossed Linen Hardcover Journal
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-amber-400 flex-shrink-0" /> 120gsm Archival Bleed-Proof Paper
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-amber-400 flex-shrink-0" /> Free 90-Day Digital Master Kit ($6.99 / ₦10,000 value)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-amber-400 flex-shrink-0" /> Founder Audio Sprint Guide Included
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900">
                <button
                  type="button"
                  className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedTier === "hardcover"
                      ? "bg-amber-500 text-black font-bold"
                      : "bg-zinc-900 text-zinc-400 hover:text-white"
                  }`}
                >
                  {selectedTier === "hardcover" ? "Selected Option" : "Order 90-Day Journal ($24.99 / ₦35,000)"}
                </button>
              </div>
            </div>
          </div>

          {/* Unified Checkout Form */}
          <div className="mt-10 sm:mt-12 bg-black border border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto">
            <h3 className="text-sm sm:text-base font-bold text-white mb-2 uppercase tracking-wider text-center">
              Complete Your Selection ({selectedTier === "free" ? "Free 7-Day Sample" : selectedTier === "digital_pro" ? "90-Day Digital ($6.99 / ₦10,000)" : "90-Day Hardcover ($24.99 / ₦35,000)"})
            </h3>
            <p className="text-xs text-zinc-400 text-center mb-6">
              Enter your email below to instantly receive your digital files or process cart checkout.
            </p>

            <form onSubmit={handleTierAction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Email Address:
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  spellCheck={false}
                  suppressHydrationWarning
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${
                  selectedTier === "hardcover"
                    ? "bg-amber-500 hover:bg-amber-400 text-black"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : selectedTier === "free" ? (
                  <>
                    <Download size={15} /> Download Free Sample ($0 / ₦0)
                  </>
                ) : (
                  <>
                    <Zap size={15} /> Get {selectedTier === "digital_pro" ? "90-Day Digital Kit ($6.99 / ₦10,000)" : "90-Day Hardcover ($24.99 / ₦35,000)"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Dedicated Bespoke 3D Journal Showcase Section */}
      <section className="py-16 sm:py-24 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black border border-zinc-800 rounded-2xl p-6 sm:p-12 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 justify-between shadow-2xl">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.2em] inline-flex items-center gap-1.5 mb-3">
                <Star size={13} className="fill-current" /> Bespoke 3D Hardcover Edition &bull; Tier 03
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-white mb-4 tracking-tight">
                Crafted for <span className="font-bold text-white">Deep Focus & Mastery</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Studies show handwriting your goals and daily reflections by hand increases commitment and neural retention by <strong className="text-white">42%</strong>. The Tier 3 hardcover edition is bound in obsidian linen with gold foil debossing, metallic brass corners, elastic closure band, and woven satin bookmark ribbons.
              </p>

              <ul className="space-y-2.5 mb-8 text-xs text-zinc-300 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-amber-400 flex-shrink-0" /> Obsidian woven linen cover with gold leaf foil debossed crest
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-amber-400 flex-shrink-0" /> Protective metallic brass corner caps & tactile elastic closure
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-amber-400 flex-shrink-0" /> 120gsm archival ivory bleed-proof paper + dual satin ribbons
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-amber-400 flex-shrink-0" /> Includes free instant 90-Day Digital Master Kit ($6.99 value)
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={handleTierAction}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  Order 90-Day Journal ($24.99 / ₦35,000) <ArrowRight size={14} />
                </button>
                <Link
                  href="/store/1"
                  className="text-xs text-zinc-500 hover:text-white underline transition-colors"
                >
                  View store catalog
                </Link>
              </div>
            </div>

            {/* Large Dedicated 3D Journal Interactive Showcase */}
            <div className="flex-shrink-0 mt-4 lg:mt-0">
              <Journal3DMockup size="large" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Planner Demo */}
      {mounted && (
        <section id="interactive-planner" className="py-16 sm:py-24 border-b border-zinc-900 bg-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.25em]">Interactive Workspace</span>
              <h2 className="text-2xl sm:text-4xl font-light text-white mt-2 tracking-tight">
                Test the <span className="font-bold">90-Day Sprint Framework</span> Live
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto leading-relaxed">
                Type your thoughts directly into the fields below to experience how the 3-pillar structure clarifies your 90-day quarter.
              </p>

              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 p-1 bg-zinc-950 border border-zinc-800 rounded-lg max-w-md mx-auto">
                <button
                  onClick={() => setActiveTab("dream")}
                  className={`flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-1 sm:gap-2 ${
                    activeTab === "dream"
                      ? "bg-blue-600 text-white"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <Compass size={13} /> 01. Dream
                </button>

                <button
                  onClick={() => setActiveTab("education")}
                  className={`flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-1 sm:gap-2 ${
                    activeTab === "education"
                      ? "bg-blue-600 text-white"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <GraduationCap size={13} /> 02. Education
                </button>

                <button
                  onClick={() => setActiveTab("purpose")}
                  className={`flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-1 sm:gap-2 ${
                    activeTab === "purpose"
                      ? "bg-blue-600 text-white"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <Target size={13} /> 03. Purpose
                </button>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-10 shadow-2xl relative">
              {activeTab === "dream" && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="border-b border-zinc-900 pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-1">
                        Phase I &bull; Days 1-30: 90-Day Dream Sprint
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">Quarterly Vision & Master Target</h3>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      1.1 Your 90-Day Primary Dream Target:
                    </label>
                    <textarea
                      rows={3}
                      value={interactiveDream.vision}
                      onChange={(e) => setInteractiveDream({ ...interactiveDream, vision: e.target.value })}
                      placeholder="What single major outcome will make this 90-day quarter a massive success?"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-black border border-zinc-800 rounded-lg p-3.5 sm:p-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Month 1 Target:</label>
                      <input
                        type="text"
                        value={interactiveDream.masterTarget1}
                        onChange={(e) => setInteractiveDream({ ...interactiveDream, masterTarget1: e.target.value })}
                        placeholder="Foundation & Mapping"
                        spellCheck={false}
                        suppressHydrationWarning
                        className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Month 2 Target:</label>
                      <input
                        type="text"
                        value={interactiveDream.masterTarget2}
                        onChange={(e) => setInteractiveDream({ ...interactiveDream, masterTarget2: e.target.value })}
                        placeholder="Skill Mastery & Build"
                        spellCheck={false}
                        suppressHydrationWarning
                        className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Month 3 Target:</label>
                      <input
                        type="text"
                        value={interactiveDream.masterTarget3}
                        onChange={(e) => setInteractiveDream({ ...interactiveDream, masterTarget3: e.target.value })}
                        placeholder="Launch & Outcome Sprint"
                        spellCheck={false}
                        suppressHydrationWarning
                        className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="border-b border-zinc-900 pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-1">
                        Phase II &bull; Days 31-60: Quarterly Skill Sprint
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">Skill Gap Analysis & Learning Commitment</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Skills I Currently Possess:
                      </label>
                      <textarea
                        rows={3}
                        value={interactiveEducation.currentSkills}
                        onChange={(e) => setInteractiveEducation({ ...interactiveEducation, currentSkills: e.target.value })}
                        placeholder="e.g. Basic HTML/CSS, UI intuition, writing..."
                        spellCheck={false}
                        suppressHydrationWarning
                        className="w-full bg-black border border-zinc-800 rounded-lg p-3.5 sm:p-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Specific Skill Required for This Quarter:
                      </label>
                      <textarea
                        rows={3}
                        value={interactiveEducation.skillsToLearn}
                        onChange={(e) => setInteractiveEducation({ ...interactiveEducation, skillsToLearn: e.target.value })}
                        placeholder="e.g. Fullstack Next.js & Supabase integration..."
                        spellCheck={false}
                        suppressHydrationWarning
                        className="w-full bg-black border border-zinc-800 rounded-lg p-3.5 sm:p-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Primary Daily Learning Habit for This 90-Day Sprint:
                    </label>
                    <input
                      type="text"
                      value={interactiveEducation.primaryHabit}
                      onChange={(e) => setInteractiveEducation({ ...interactiveEducation, primaryHabit: e.target.value })}
                      placeholder="e.g. 60 minutes uninterrupted study on Origin courses every morning"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-black border border-zinc-800 rounded-lg p-3.5 sm:p-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === "purpose" && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="border-b border-zinc-900 pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-1">
                        Phase III &bull; Days 61-90: High-Yield Purpose Execution
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">Daily Non-Negotiable Intention</h3>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Today&apos;s Single Most Important Focus (The Non-Negotiable):
                    </label>
                    <input
                      type="text"
                      value={interactivePurpose.mainFocus}
                      onChange={(e) => setInteractivePurpose({ ...interactivePurpose, mainFocus: e.target.value })}
                      placeholder="e.g. Finalize 90-Day Sprint planner deployment"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-black border border-zinc-800 rounded-lg p-3.5 sm:p-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">Top 3 Priority Actions:</label>
                    <input
                      type="text"
                      value={interactivePurpose.priority1}
                      onChange={(e) => setInteractivePurpose({ ...interactivePurpose, priority1: e.target.value })}
                      placeholder="1. Build the 90-Day Interactive Download Page"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      value={interactivePurpose.priority2}
                      onChange={(e) => setInteractivePurpose({ ...interactivePurpose, priority2: e.target.value })}
                      placeholder="2. Deploy Origin 90-Day Sprint value ladder"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      value={interactivePurpose.priority3}
                      onChange={(e) => setInteractivePurpose({ ...interactivePurpose, priority3: e.target.value })}
                      placeholder="3. 30 mins reading 90-Day Architecture Guide"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Minimalist Footer */}
      <footer className="border-t border-zinc-900 py-8 sm:py-10 bg-black text-center text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-white tracking-wider">ORIGIN</span> &bull; Powered by <strong className="text-zinc-300 font-semibold">The Becoming Institute</strong> (Mindvest Global Resources)
          </div>
          <div className="text-[10px] sm:text-[11px] text-zinc-500">
            &copy; {new Date().getFullYear()} Origin. Powered by The Becoming Institute under Mindvest Global Resources. All rights reserved. &bull; Dream &rarr; Education &rarr; Purpose
          </div>
        </div>
      </footer>
    </div>
  );
}
