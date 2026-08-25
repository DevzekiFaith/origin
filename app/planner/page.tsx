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
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

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

  // Email, Name & Checkout Form
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

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

  // --- Flutterwave configs for paid tiers ---
  const txRef = `origin-planner-${selectedTier}-${Date.now()}`;

  const flwConfigDigital = useFlutterwave({
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? "",
    tx_ref: txRef,
    amount: 10000,
    currency: "NGN",
    payment_options: "card,banktransfer,ussd,mobilemoney",
    customer: { email, name, phone_number: "" },
    customizations: {
      title: "Origin 90-Day Digital Master Kit",
      description: "Full 90-Day Fillable Digital Planner + Founder Audio Sprint Guide",
      logo: "/origin.png",
    },
  });

  const flwConfigHardcover = useFlutterwave({
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? "",
    tx_ref: txRef,
    amount: 35000,
    currency: "NGN",
    payment_options: "card,banktransfer,ussd,mobilemoney",
    customer: { email, name, phone_number: "" },
    customizations: {
      title: "Origin 90-Day Hardcover Journal",
      description: "Tactile 90-day debossed linen hardcover journal + Digital Master Kit",
      logo: "/origin.png",
    },
  });

  // Called after any successful transaction (paid or free) to:
  // 1. Trigger PDF download, 2. Send welcome/access email, 3. Show success UI
  const handleAccessGranted = async ({
    tier,
    resolvedTxRef,
    transactionId,
  }: {
    tier: "free" | "digital_pro" | "hardcover";
    resolvedTxRef: string;
    transactionId?: string | number;
  }) => {
    setIsProcessing(false);

    // Trigger PDF download immediately
    const downloadMap: Record<string, string> = {
      free: "/documents/origin_7day_sprint_starter.pdf",
      digital_pro: "/documents/origin_90day_digital_master_kit.pdf",
      hardcover: "/documents/origin_90day_digital_master_kit.pdf",
    };
    const fileNameMap: Record<string, string> = {
      free: "Origin_7Day_Sprint_Starter.pdf",
      digital_pro: "Origin_90Day_Digital_Master_Kit.pdf",
      hardcover: "Origin_90Day_Digital_Master_Kit.pdf",
    };
    const link = document.createElement("a");
    link.href = downloadMap[tier];
    link.download = fileNameMap[tier];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success state
    const tierNames: Record<string, string> = {
      free: "Free 7-Day Sprint Sample",
      digital_pro: "90-Day Digital Master Kit",
      hardcover: "90-Day Hardcover Journal",
    };
    setPurchaseSuccess(tierNames[tier]);
    showToast(`✓ ${tierNames[tier]} — access granted! Check your email.`, "success");

    // Send welcome email via API
    try {
      await fetch("/api/email/planner-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          tier,
          txRef: resolvedTxRef,
          transactionId,
        }),
      });
    } catch (emailErr) {
      console.error("[Planner] Failed to send access email:", emailErr);
    }
  };

  const handleTierAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setIsProcessing(true);

    if (selectedTier === "free") {
      // Free tier — no payment, instant access
      handleAccessGranted({
        tier: "free",
        resolvedTxRef: `free-${Date.now()}`,
      });
    } else if (selectedTier === "digital_pro") {
      // Paid tier — launch Flutterwave modal
      flwConfigDigital({
        callback: (response) => {
          closePaymentModal();
          handleAccessGranted({
            tier: "digital_pro",
            resolvedTxRef: response.tx_ref,
            transactionId: response.transaction_id,
          });
        },
        onClose: () => {
          setIsProcessing(false);
          showToast("Payment was cancelled. Complete payment to access your kit.", "error");
        },
      });
    } else {
      // Hardcover tier — launch Flutterwave modal
      flwConfigHardcover({
        callback: (response) => {
          closePaymentModal();
          handleAccessGranted({
            tier: "hardcover",
            resolvedTxRef: response.tx_ref,
            transactionId: response.transaction_id,
          });
        },
        onClose: () => {
          setIsProcessing(false);
          showToast("Payment was cancelled. Complete payment to place your journal order.", "error");
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#8A948B] text-white font-sans selection:bg-white selection:text-[#8A948B] antialiased overflow-x-hidden" suppressHydrationWarning>
      <audio ref={audioRef} src="/audio/origin_architecture_guide.mp3" preload="metadata" />

      {/* Top Header Banner */}
      <header className="border-b border-white/15 bg-black/10 backdrop-blur-md sticky top-0 z-50">
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
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 border-b border-white/15 bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-center relative overflow-hidden">
        {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/15 blur-[180px] rounded-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase mb-6 sm:mb-8 shadow-sm backdrop-blur-md">
            <Clock size={13} className="text-amber-300" /> Powered by The Becoming Institute • Mindvest Global Resources
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-extrabold tracking-tight text-white leading-[1.15] mb-6 sm:mb-8">
            We start with your <span className="font-extrabold text-amber-300 underline decoration-amber-300/60 underline-offset-4 sm:underline-offset-8">dreams</span> before educating you.
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-white/90 font-light leading-relaxed mb-8 sm:mb-12">
            Long 12-month goals create procrastination. The <strong className="text-white font-semibold">Origin 90-Day Quarterly Planner</strong> focuses your energy into intense, high-yield sprints: <span className="text-white font-semibold">Dream</span> → <span className="text-white font-semibold">Education</span> → <span className="text-white font-semibold">Purpose</span>. 90 days of deep clarity and follow-through.
          </p>

          {/* Audio Companion Player */}
          <div className="max-w-xl mx-auto bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] rounded-2xl p-4 sm:p-5 text-left mb-8 sm:mb-12 shadow-2xl">
            <div className="flex items-center justify-between mb-3 sm:mb-4 border-b border-[#D0D9CA] pb-3">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1C3B34] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Mic size={15} />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#172217] block leading-none">
                    Founder Audio: Why 90-Day Sprints Win
                  </span>
                  <span className="text-[10px] text-[#4E5B4B] block mt-1">
                    Guided audio: Dream &rarr; Education &rarr; Purpose
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-[10px] sm:text-[11px] font-mono font-bold text-[#172217] flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-[#CCD6C6] hover:bg-[#1C3B34] hover:text-white transition-all flex-shrink-0 cursor-pointer"
              >
                <FileText size={12} /> {showTranscript ? "Hide" : "Script"}
              </button>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={togglePlayAudio}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white flex items-center justify-center flex-shrink-0 transition-all active:scale-95 shadow-md cursor-pointer"
                aria-label={isPlayingAudio ? "Pause Audio" : "Play Audio"}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs font-medium text-[#4E5B4B] mb-1.5">
                  <span className="text-[#172217] text-[11px] sm:text-xs font-bold truncate pr-2 flex items-center gap-1.5">
                    <Volume2 size={13} className="text-[#1C3B34] flex-shrink-0" /> {isPlayingAudio ? "Playing Audio..." : "Play 90-Day Audio"}
                  </span>
                  <span className="text-[#4E5B4B] font-mono text-[10px] sm:text-[11px] flex-shrink-0">
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
                    className="w-full h-1.5 bg-white/80 rounded-lg appearance-none cursor-pointer accent-[#1C3B34]"
                  />
                </div>
              </div>
            </div>

            {showTranscript && (
              <div className="mt-4 pt-4 border-t border-[#D0D9CA] bg-white/80 rounded-xl p-3.5 sm:p-4 text-xs leading-relaxed text-[#172217] space-y-3 font-mono border border-[#CCD6C6] animate-fadeIn">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#1C3B34] border-b border-[#D0D9CA] pb-2">
                  <span>90-Day Audio Sprint Transcript</span>
                  <span>2:30</span>
                </div>
                <p>
                  <strong className="text-[#172217] font-sans">[0:00 - 0:45] Why 90-Day Sprints Over 12 Months:</strong><br />
                  &quot;Welcome to Origin. 12-month goals create complacency because the deadline feels far away. A 90-day quarterly sprint provides urgency. It forces intense focus, rapid feedback, and immediate execution.&quot;
                </p>
                <p>
                  <strong className="text-[#172217] font-sans">[0:45 - 1:30] Phase I & II — Dream & Targeted Skill Mastery:</strong><br />
                  &quot;In the first 30 days of the quarter, you map your dream targets. In days 31 to 60, education becomes laser-focused. You acquire the exact 2 skills required for this quarter&apos;s sprint.&quot;
                </p>
                <p>
                  <strong className="text-[#172217] font-sans">[1:30 - 2:30] Phase III — Execution & Quarterly Review:</strong><br />
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
              className="w-full sm:w-auto bg-[#E2E8DE] text-[#1C3B34] font-mono font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:bg-white"
            >
              Get 90-Day Sprint Kit <ArrowRight size={15} />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("interactive-planner");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto bg-[#1C3B34] text-white hover:bg-[#132B25] border border-white/20 font-mono font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              Test Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* 3-Tier Value Ladder Pricing Section */}
      <section id="pricing-section" className="py-16 sm:py-24 border-b border-white/15 bg-gradient-to-b from-[#8A948B] to-[#7F897F] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-[0.25em]">Quarterly Sprint Options</span>
            <h2 className="text-2xl sm:text-5xl font-serif font-extrabold text-white mt-2 tracking-tight">
              Select Your <span className="font-bold">Origin 90-Day Sprint Suite</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-2 max-w-xl mx-auto font-light">
              High-intensity 90-day focus. Choose between the Free 7-Day Sample, the Micro-Upsell 90-Day Digital Master Kit, or the Physical Hardcover Edition.
            </p>
          </div>

          {/* Mobile Stacking Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Card 1: Free Starter */}
            <div
              onClick={() => { setSelectedTier("free"); setPurchaseSuccess(null); }}
              className={`cursor-pointer rounded-2xl p-6 sm:p-8 border flex flex-col justify-between transition-all ${
                selectedTier === "free"
                  ? "bg-[#E2E8DE] text-[#172217] border-[#1C3B34] ring-2 ring-[#1C3B34] shadow-2xl"
                  : "bg-[#E2E8DE] text-[#172217] border-[#D5DDCF] shadow-lg hover:border-[#1C3B34]"
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C3B34] block mb-2">
                  Tier 01 &bull; Sample
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#172217] mb-2">Free 7-Day Sprint Sample</h3>
                <p className="text-xs text-[#4E5B4B] mb-6 leading-relaxed">
                  A 7-day micro-sprint starter sheet for immediate clarity.
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#172217]">$0</span>
                    <span className="text-lg sm:text-xl font-bold text-[#1C3B34]">/ ₦0</span>
                  </div>
                  <span className="text-xs text-[#4E5B4B] block mt-1 font-mono">Forever Free Access</span>
                </div>

                <ul className="space-y-3 text-xs text-[#172217] border-t border-[#D0D9CA] pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> 7-Day Micro-Sprint Printable PDF
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> Dream Mapping Quickstart
                  </li>
                  <li className="flex items-center gap-2 text-[#4E5B4B]">
                    <Lock size={15} className="flex-shrink-0" /> Full 90-Day Quarterly Planner (Locked)
                  </li>
                  <li className="flex items-center gap-2 text-[#4E5B4B]">
                    <Lock size={15} className="flex-shrink-0" /> Founder 90-Day Audio Sprint (Locked)
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D0D9CA]">
                <button
                  type="button"
                  className={`w-full py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedTier === "free"
                      ? "bg-[#1C3B34] text-white shadow-md"
                      : "bg-[#8A948B] text-white hover:bg-[#1C3B34]"
                  }`}
                >
                  {selectedTier === "free" ? "Selected Option" : "Get Free Sample ($0 / ₦0)"}
                </button>
              </div>
            </div>

            {/* Card 2: 90-Day Digital Pro */}
            <div
              onClick={() => { setSelectedTier("digital_pro"); setPurchaseSuccess(null); }}
              className={`cursor-pointer rounded-2xl p-6 sm:p-8 border relative flex flex-col justify-between transition-all ${
                selectedTier === "digital_pro"
                  ? "bg-[#E2E8DE] text-[#172217] border-[#1C3B34] ring-2 ring-[#1C3B34] shadow-2xl"
                  : "bg-[#E2E8DE] text-[#172217] border-[#D5DDCF] shadow-lg hover:border-[#1C3B34]"
              }`}
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1C3B34] text-white px-3.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-md whitespace-nowrap">
                Most Popular &bull; High Focus
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C3B34] block mb-2">
                  Tier 02 &bull; 90-Day Micro-Upsell
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#172217] mb-2">90-Day Digital Master Kit</h3>
                <p className="text-xs text-[#4E5B4B] mb-6 leading-relaxed">
                  Full 90-day fillable quarterly planner + founder audio sprint guide.
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#172217]">$6.99</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#1C3B34]">/ ₦10,000</span>
                  </div>
                  <span className="text-xs text-[#4E5B4B] block mt-1 font-mono">
                    Regular: <span className="font-mono">// $19.99 / ₦28,000</span>
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-[#172217] border-t border-[#D0D9CA] pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> Full 90-Day Quarterly Fillable Digital PDF
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> iPad, Tablet & GoodNotes Format
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> Dark & Light Aesthetic Themes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> Founder 90-Day Audio Sprint Guide
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D0D9CA]">
                <button
                  type="button"
                  className={`w-full py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedTier === "digital_pro"
                      ? "bg-[#1C3B34] text-white shadow-md"
                      : "bg-[#8A948B] text-white hover:bg-[#1C3B34]"
                  }`}
                >
                  {selectedTier === "digital_pro" ? "Selected Option" : "Get 90-Day Digital ($6.99 / ₦10,000)"}
                </button>
              </div>
            </div>

            {/* Card 3: 90-Day Physical Hardcover Suite */}
            <div
              onClick={() => { setSelectedTier("hardcover"); setPurchaseSuccess(null); }}
              className={`cursor-pointer rounded-2xl p-6 sm:p-8 border flex flex-col justify-between transition-all ${
                selectedTier === "hardcover"
                  ? "bg-[#E2E8DE] text-[#172217] border-[#1C3B34] ring-2 ring-[#1C3B34] shadow-2xl"
                  : "bg-[#E2E8DE] text-[#172217] border-[#D5DDCF] shadow-lg hover:border-[#1C3B34]"
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C3B34] block mb-2">
                  Tier 03 &bull; Physical Upgrade
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#172217] mb-2">90-Day Hardcover Journal</h3>
                <p className="text-xs text-[#4E5B4B] mb-6 leading-relaxed">
                  Tactile 90-day debossed linen journal shipped directly to you.
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#172217]">$24.99</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#1C3B34]">/ ₦35,000</span>
                  </div>
                  <span className="text-xs text-[#4E5B4B] block mt-1 font-mono">+ Free Shipping in Nigeria</span>
                </div>

                <ul className="space-y-3 text-xs text-[#172217] border-t border-[#D0D9CA] pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> 90-Day Debossed Linen Hardcover Journal
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> 120gsm Archival Bleed-Proof Paper
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> Free 90-Day Digital Master Kit ($6.99 / ₦10,000 value)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> Founder Audio Sprint Guide Included
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D0D9CA]">
                <button
                  type="button"
                  className={`w-full py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedTier === "hardcover"
                      ? "bg-[#1C3B34] text-white shadow-md"
                      : "bg-[#8A948B] text-white hover:bg-[#1C3B34]"
                  }`}
                >
                  {selectedTier === "hardcover" ? "Selected Option" : "Order 90-Day Journal ($24.99 / ₦35,000)"}
                </button>
              </div>
            </div>
          </div>

          {/* Unified Checkout Form */}
          <div className="mt-10 sm:mt-12 max-w-xl mx-auto">
            {purchaseSuccess ? (
              /* ── Success State ── */
              <div className="bg-[#E2E8DE] text-[#172217] border border-[#1C3B34] rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#1C3B34] flex items-center justify-center shadow-lg">
                  <CheckCircle2 size={28} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-[#1C3B34] uppercase tracking-widest mb-1">Access Granted ✓</p>
                  <h3 className="text-xl font-extrabold text-[#172217]">{purchaseSuccess} is ready.</h3>
                  <p className="text-xs text-[#4E5B4B] mt-2 font-light leading-relaxed">
                    Your download has started automatically. A welcome email with access details has been sent to <strong className="text-[#172217]">{email}</strong>.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={
                      selectedTier === "free"
                        ? "/documents/origin_7day_sprint_starter.pdf"
                        : "/documents/origin_90day_digital_master_kit.pdf"
                    }
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C3B34] text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#172217] transition-all"
                  >
                    <Download size={14} /> Download Again
                  </a>
                  {selectedTier === "free" && (
                    <button
                      type="button"
                      onClick={() => { setSelectedTier("digital_pro"); setPurchaseSuccess(null); }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8A948B] text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#1C3B34] transition-all cursor-pointer"
                    >
                      Upgrade to Full Kit <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* ── Checkout Form ── */
              <div className="bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] rounded-2xl p-6 sm:p-8 shadow-2xl">
                <h3 className="text-sm sm:text-base font-extrabold text-[#172217] mb-1 uppercase tracking-wider text-center font-mono">
                  {selectedTier === "free"
                    ? "Get Your Free 7-Day Sprint Sample"
                    : selectedTier === "digital_pro"
                    ? "Checkout — 90-Day Digital Kit (₦10,000)"
                    : "Order — 90-Day Hardcover Journal (₦35,000)"}
                </h3>
                <p className="text-xs text-[#4E5B4B] text-center mb-6 font-light">
                  {selectedTier === "free"
                    ? "Enter your details and get instant free access. No payment needed."
                    : "Enter your details and proceed to secure Flutterwave payment. Your digital files will be delivered immediately after payment."}
                </p>

                <form onSubmit={handleTierAction} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#172217] uppercase tracking-wider mb-2">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Zeki Ubor"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3.5 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#172217] uppercase tracking-wider mb-2">
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
                      className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3.5 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    id="planner-checkout-btn"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl bg-[#1C3B34] hover:bg-[#132B25] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <><span className="animate-spin mr-1 inline-block border-2 border-white/30 border-t-white rounded-full w-4 h-4" /> Processing...</>
                    ) : selectedTier === "free" ? (
                      <><Download size={15} /> Get Free 7-Day Sample — $0 / ₦0</>
                    ) : selectedTier === "digital_pro" ? (
                      <><Zap size={15} /> Pay ₦10,000 — Unlock Digital Kit</>
                    ) : (
                      <><Zap size={15} /> Pay ₦35,000 — Order Hardcover Journal</>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-[#8A948B] font-mono pt-1">
                    <ShieldCheck size={13} className="text-[#1C3B34]" />
                    <span>
                      {selectedTier === "free"
                        ? "Free instant download — no payment required"
                        : "256-bit encrypted Flutterwave checkout · Instant digital delivery"}
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dedicated Bespoke 3D Journal Showcase Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white border-b border-white/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] rounded-3xl p-6 sm:p-12 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 justify-between shadow-2xl">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-[10px] font-mono font-bold text-[#1C3B34] uppercase tracking-[0.2em] inline-flex items-center gap-1.5 mb-3">
                <Star size={13} className="fill-current text-[#1C3B34]" /> Bespoke 3D Hardcover Edition &bull; Tier 03
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#172217] mb-4 tracking-tight">
                Crafted for <span className="font-extrabold text-[#1C3B34]">Deep Focus & Mastery</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#4E5B4B] leading-relaxed mb-6 font-light">
                Studies show handwriting your goals and daily reflections by hand increases commitment and neural retention by <strong className="text-[#172217] font-semibold">42%</strong>. The Tier 3 hardcover edition is bound in obsidian linen with gold foil debossing, metallic brass corners, elastic closure band, and woven satin bookmark ribbons.
              </p>

              <ul className="space-y-2.5 mb-8 text-xs text-[#172217] text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> Obsidian woven linen cover with gold leaf foil debossed crest
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> Protective metallic brass corner caps & tactile elastic closure
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> 120gsm archival ivory bleed-proof paper + dual satin ribbons
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#1C3B34] flex-shrink-0" /> Includes free instant 90-Day Digital Master Kit ($6.99 value)
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={handleTierAction}
                  className="w-full sm:w-auto bg-[#8A948B] hover:bg-[#1C3B34] text-white font-mono font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  Order 90-Day Journal ($24.99 / ₦35,000) <ArrowRight size={14} />
                </button>
                <Link
                  href="/store"
                  className="text-xs font-mono text-[#1C3B34] hover:underline transition-colors"
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
        <section id="interactive-planner" className="py-16 sm:py-24 border-b border-white/15 bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60 pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-[0.25em]">Interactive Workspace</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-white mt-2 tracking-tight">
                Test the <span className="font-bold">90-Day Sprint Framework</span> Live
              </h2>
              <p className="text-xs sm:text-sm text-white/90 mt-2 max-w-xl mx-auto leading-relaxed font-light">
                Type your thoughts directly into the fields below to experience how the 3-pillar structure clarifies your 90-day quarter.
              </p>

              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 p-1.5 bg-white/15 border border-white/20 rounded-full max-w-md mx-auto backdrop-blur-md">
                <button
                  onClick={() => setActiveTab("dream")}
                  className={`flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-1 sm:gap-2 cursor-pointer ${
                    activeTab === "dream"
                      ? "bg-[#E2E8DE] text-[#1C3B34] shadow-md"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  <Compass size={13} /> 01. Dream
                </button>

                <button
                  onClick={() => setActiveTab("education")}
                  className={`flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-1 sm:gap-2 cursor-pointer ${
                    activeTab === "education"
                      ? "bg-[#E2E8DE] text-[#1C3B34] shadow-md"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  <GraduationCap size={13} /> 02. Education
                </button>

                <button
                  onClick={() => setActiveTab("purpose")}
                  className={`flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-1 sm:gap-2 cursor-pointer ${
                    activeTab === "purpose"
                      ? "bg-[#E2E8DE] text-[#1C3B34] shadow-md"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  <Target size={13} /> 03. Purpose
                </button>
              </div>
            </div>

            <div className="bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] rounded-3xl p-5 sm:p-10 shadow-2xl relative">
              {activeTab === "dream" && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="border-b border-[#D0D9CA] pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C3B34] block mb-1">
                        Phase I &bull; Days 1-30: 90-Day Dream Sprint
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#172217]">Quarterly Vision & Master Target</h3>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#172217] uppercase tracking-wider mb-2">
                      1.1 Your 90-Day Primary Dream Target:
                    </label>
                    <textarea
                      rows={3}
                      value={interactiveDream.vision}
                      onChange={(e) => setInteractiveDream({ ...interactiveDream, vision: e.target.value })}
                      placeholder="What single major outcome will make this 90-day quarter a massive success?"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3.5 sm:p-4 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34] transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-medium text-[#4E5B4B] uppercase tracking-wider mb-1.5">Month 1 Target:</label>
                      <input
                        type="text"
                        value={interactiveDream.masterTarget1}
                        onChange={(e) => setInteractiveDream({ ...interactiveDream, masterTarget1: e.target.value })}
                        placeholder="Foundation & Mapping"
                        spellCheck={false}
                        suppressHydrationWarning
                        className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-medium text-[#4E5B4B] uppercase tracking-wider mb-1.5">Month 2 Target:</label>
                      <input
                        type="text"
                        value={interactiveDream.masterTarget2}
                        onChange={(e) => setInteractiveDream({ ...interactiveDream, masterTarget2: e.target.value })}
                        placeholder="Skill Mastery & Build"
                        spellCheck={false}
                        suppressHydrationWarning
                        className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-medium text-[#4E5B4B] uppercase tracking-wider mb-1.5">Month 3 Target:</label>
                      <input
                        type="text"
                        value={interactiveDream.masterTarget3}
                        onChange={(e) => setInteractiveDream({ ...interactiveDream, masterTarget3: e.target.value })}
                        placeholder="Launch & Outcome Sprint"
                        spellCheck={false}
                        suppressHydrationWarning
                        className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="border-b border-[#D0D9CA] pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C3B34] block mb-1">
                        Phase II &bull; Days 31-60: Quarterly Skill Sprint
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#172217]">Skill Gap Analysis & Learning Commitment</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-[#172217] uppercase tracking-wider mb-2">
                        Skills I Currently Possess:
                      </label>
                      <textarea
                        rows={3}
                        value={interactiveEducation.currentSkills}
                        onChange={(e) => setInteractiveEducation({ ...interactiveEducation, currentSkills: e.target.value })}
                        placeholder="e.g. Basic HTML/CSS, UI intuition, writing..."
                        spellCheck={false}
                        suppressHydrationWarning
                        className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3.5 sm:p-4 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34] transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold text-[#172217] uppercase tracking-wider mb-2">
                        Specific Skill Required for This Quarter:
                      </label>
                      <textarea
                        rows={3}
                        value={interactiveEducation.skillsToLearn}
                        onChange={(e) => setInteractiveEducation({ ...interactiveEducation, skillsToLearn: e.target.value })}
                        placeholder="e.g. Fullstack Next.js & Supabase integration..."
                        spellCheck={false}
                        suppressHydrationWarning
                        className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3.5 sm:p-4 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34] transition-colors resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#172217] uppercase tracking-wider mb-2">
                      Primary Daily Learning Habit for This 90-Day Sprint:
                    </label>
                    <input
                      type="text"
                      value={interactiveEducation.primaryHabit}
                      onChange={(e) => setInteractiveEducation({ ...interactiveEducation, primaryHabit: e.target.value })}
                      placeholder="e.g. 60 minutes uninterrupted study on Origin courses every morning"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3.5 sm:p-4 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34]"
                    />
                  </div>
                </div>
              )}

              {activeTab === "purpose" && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="border-b border-[#D0D9CA] pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C3B34] block mb-1">
                        Phase III &bull; Days 61-90: High-Yield Purpose Execution
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#172217]">Daily Non-Negotiable Intention</h3>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#172217] uppercase tracking-wider mb-2">
                      Today&apos;s Single Most Important Focus (The Non-Negotiable):
                    </label>
                    <input
                      type="text"
                      value={interactivePurpose.mainFocus}
                      onChange={(e) => setInteractivePurpose({ ...interactivePurpose, mainFocus: e.target.value })}
                      placeholder="e.g. Finalize 90-Day Sprint planner deployment"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3.5 sm:p-4 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34]"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="block text-xs font-mono font-semibold text-[#172217] uppercase tracking-wider">Top 3 Priority Actions:</label>
                    <input
                      type="text"
                      value={interactivePurpose.priority1}
                      onChange={(e) => setInteractivePurpose({ ...interactivePurpose, priority1: e.target.value })}
                      placeholder="1. Build the 90-Day Interactive Download Page"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34]"
                    />
                    <input
                      type="text"
                      value={interactivePurpose.priority2}
                      onChange={(e) => setInteractivePurpose({ ...interactivePurpose, priority2: e.target.value })}
                      placeholder="2. Deploy Origin 90-Day Sprint value ladder"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34]"
                    />
                    <input
                      type="text"
                      value={interactivePurpose.priority3}
                      onChange={(e) => setInteractivePurpose({ ...interactivePurpose, priority3: e.target.value })}
                      placeholder="3. 30 mins reading 90-Day Architecture Guide"
                      spellCheck={false}
                      suppressHydrationWarning
                      className="w-full bg-white/80 border border-[#CCD6C6] rounded-xl p-3 text-xs text-[#172217] placeholder-[#71717A] focus:outline-none focus:border-[#1C3B34]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Minimalist Footer */}
      <footer className="border-t border-white/15 py-8 sm:py-10 bg-gradient-to-b from-[#7F897F] via-[#747E74] to-[#636C63] text-center text-xs text-white/90">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-300" />
            <span className="font-extrabold text-white tracking-wider">ORIGIN</span> • Powered by <strong className="text-white font-semibold">The Becoming Institute</strong> (Mindvest Global Resources)
          </div>
          <div className="text-[10px] sm:text-xs text-white/80 font-mono">
            &copy; {new Date().getFullYear()} Origin. Powered by The Becoming Institute • Mindvest Global Resources. All rights reserved. • Dream → Education → Purpose
          </div>
        </div>
      </footer>
    </div>
  );
}
