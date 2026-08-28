"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Video, 
  Star, 
  ArrowRight, 
  Zap, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  Heart, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Brain, 
  Shield, 
  Compass, 
  Layers, 
  FileText, 
  MessageCircle, 
  CheckCircle2, 
  Check, 
  ChevronDown 
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import FitForProfitVolunteerModal from "../components/FitForProfitVolunteerModal";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedEventId, setSelectedEventId] = useState<number>(7); // Default to JUMPSTART Accelerator
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeUnitTab, setActiveUnitTab] = useState<number>(0);

  const filters = [
    { id: "all", name: "All Live Cohorts & Events" },
    { id: "accelerator", name: "Jumpstart 2-Day Accelerator" },
    { id: "masterclass", name: "Masterclasses" },
    { id: "workshop", name: "Regional Workshops" },
  ];

  const events = [
    {
      id: 7,
      title: "JUMPSTART: 2-Day Live Intensive Accelerator",
      subtitle: "WAKE UP. SHAKE UP. // From Meager to Mega. Make the shift.",
      type: "accelerator",
      date: "Saturday & Sunday (Upcoming Weekend Cohort)",
      time: "GoogleMeet Live @ 5:00 PM WAT (2-Day Intensive + 21-Day Sprint)",
      price: 10.00,
      priceNGN: "₦15,000",
      standardPriceNGN: "₦67,500",
      icon: Award,
      gradient: "from-[#1C3B34] to-[#8A948B]",
      imageUrl: "/images/covers/jumpstart_cover_v2.jpg",
      instructor: "Zeki Ubor",
      isOnline: true,
      spots: 18,
      totalSpots: 50,
      rating: 4.9,
      reviews: 184,
      description: "JUMPSTART is an intensive 2-Day Live Accelerator and 21-Day Daily Cognitive Transformation. Engineered for individuals ready to migrate from restrictive, survival-based living into high-leverage impact, authority, and personal mastery."
    },
    {
      id: 12,
      title: "MASTERCLASS: Becoming a Person of Interest (POI)",
      subtitle: "Stop Blending In. Start Architecting Your Influence.",
      type: "masterclass",
      date: "Saturday, September 12, 2026",
      time: "GoogleMeet LIVE (5:00 PM – 8:00 PM WAT | 3-Hour Intensive)",
      price: 11.06,
      priceNGN: "₦16,500",
      standardPriceNGN: "₦35,000",
      icon: Zap,
      gradient: "from-[#1C3B34] to-[#8A948B]",
      imageUrl: "/images/covers/masterclass_poi_v2.jpg",
      instructor: "Zeki Ubor",
      isOnline: true,
      spots: 28,
      totalSpots: 100,
      rating: 4.9,
      reviews: 340,
      description: "Stop Blending In. Start Architecting Your Influence. GoogleMeet LIVE intensive 3-hour masterclass on Human Architecture and strategic positioning by Zeki Ubor."
    },
    {
      id: 16,
      title: "Fit-For-Profit Regional Workshop & Community Outreach",
      subtitle: "Prepare for profit in your career, work, ministry, and significance.",
      type: "workshop",
      date: "Monthly Regional Sessions (Multi-State)",
      time: "Full-Day Workshop & Community Service Arm",
      price: 8.00,
      priceNGN: "₦12,000",
      standardPriceNGN: "₦25,000",
      icon: Award,
      gradient: "from-[#1C3B34] to-[#8A948B]",
      imageUrl: "/images/covers/fit_for_profit_v2.jpg",
      instructor: "Zeki Ubor & The Becoming Institute",
      isOnline: false,
      spots: 50,
      totalSpots: 200,
      rating: 4.9,
      reviews: 215,
      description: "Prepare for profit in your career, work, ministry, and significance. Staged monthly in different states, featuring a volunteer community service arm for schools, education platforms, and local communities."
    }
  ];

  const spectrumUnits = [
    {
      num: "01",
      role: "THE LENS OF REALITY",
      name: "Perception",
      desc: "Rewire your default baseline to identify leverage and high-value opportunities where others see obstacles and lack.",
      icon: Brain,
      shift: "From reacting to constraints → To detecting invisible commercial leverage."
    },
    {
      num: "02",
      role: "THE ENGINE OF IMPACT",
      name: "Usefulness",
      desc: "Transform raw gifts into deployed, high-impact market utility that the commercial marketplace cannot ignore.",
      icon: Zap,
      shift: "From unmonetized raw potential → To undeniable, deployed market utility."
    },
    {
      num: "03",
      role: "ARCHITECTURE OF PRESERVATION",
      name: "Boundaries",
      desc: "Erect impenetrable focus perimeters to protect your internal ecosystem, time, and creative energy from distraction.",
      icon: Shield,
      shift: "From porous availability → To protected sovereign focus perimeters."
    },
    {
      num: "04",
      role: "MASTERY OF AGREEMENT",
      name: "Consent",
      desc: "Absolute ownership of your 'Yes' and 'No' to eliminate misaligned commitments and energetic friction.",
      icon: Target,
      shift: "From people-pleasing defaults → To high-leverage covenant ownership."
    },
    {
      num: "05",
      role: "CURRENCY OF SIGNIFICANCE",
      name: "Value",
      desc: "Align your personal standards and output to command premium authority, high-yield results, and influence.",
      icon: Award,
      shift: "From underpriced effort → To commanded authority and premium output."
    },
    {
      num: "06",
      role: "THE ULTIMATE GOVERNANCE",
      name: "Self-Mastery",
      desc: "Master your internal emotional state to dictate and command the terms of your external reality.",
      icon: Compass,
      shift: "From emotional reactivity → To internal sovereign state governance."
    }
  ];

  const deliverables = [
    {
      title: "The Human Broadcast Environment Matrix",
      format: "PDF Framework",
      desc: "Master your inputs, information filters, and cognitive environment."
    },
    {
      title: "Architecture of Intention Blueprint",
      format: "PDF Blueprint",
      desc: "Systematic roadmap for structuring high-leverage execution daily."
    },
    {
      title: "Habit Building Guide",
      format: "PDF Guide",
      desc: "Tactical workbook to anchor the 6 spectrum units permanently."
    },
    {
      title: "Exclusive Invite to Private WhatsApp Cohort",
      format: "21-Day Sprint",
      desc: "Daily prompts, peer audits, and direct voice notes from Zeki Ubor."
    }
  ];

  const filteredEvents = activeFilter === "all" 
    ? events 
    : events.filter(e => e.type === activeFilter);

  const selectedEvent = events.find(e => e.id === selectedEventId) || filteredEvents[0] || events[0];

  const handleRegisterEvent = (event: typeof events[0]) => {
    setIsProcessing(true);
    addToCart({
      id: `store-${event.id === 7 ? 17 : event.id}`,
      title: event.title,
      description: event.description,
      priceUSD: event.price,
      priceNGN: event.id === 7 ? 15000 : Math.round(event.price * 1500),
      imageUrl: event.imageUrl,
    } as any);
    showToast(`${event.title} ticket added! Proceeding to checkout...`, "success");
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white font-sans selection:bg-white selection:text-[#8A948B] pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay (Matching Home Page) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 30, 0],
            y: [0, -25, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-white/15 blur-[180px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -35, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[550px] h-[550px] bg-amber-100/15 blur-[160px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-mono font-bold text-white uppercase tracking-wider shadow-sm backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>THE BECOMING INSTITUTE // LIVE EVENTS &amp; SESSIONS</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.08] font-normal"
          >
            Live Accelerators &amp; <span className="italic text-amber-200">Transformative Cohorts</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/85 font-light leading-relaxed"
          >
            Engineered live intensives and cognitive migration sprints led by Zeki Ubor to transition you from survival-based living into the realm of succession.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                const firstInCat = events.find(e => filter.id === "all" || e.type === filter.id);
                if (firstInCat) setSelectedEventId(firstInCat.id);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all shrink-0 cursor-pointer uppercase tracking-wider ${
                activeFilter === filter.id
                  ? "bg-[#E2E8DE] text-[#172217] border border-[#E2E8DE] shadow-md scale-105"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* SIGNATURE 5:7 SHOWCASE CONTAINER (JUMPSTART ACCELERATOR & FEATURED EVENTS) */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#E2E8DE] text-[#172217] rounded-[2.5rem] border border-[#D5DDCF] shadow-2xl p-6 sm:p-10 lg:p-12 space-y-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column (5 cols): Event Details & Pricing */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#CCD6C6] text-xs font-mono font-bold text-[#1C3B34] uppercase shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#1C3B34]" />
                  <span>THE BECOMING INSTITUTE // {selectedEvent.id === 7 ? "2-DAY ACCELERATOR" : selectedEvent.type.toUpperCase()}</span>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#172217] tracking-tight leading-tight">
                    {selectedEvent.id === 7 ? (
                      <>
                        WAKE UP. SHAKE UP.
                        <span className="block text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-[#1C3B34] mt-1">
                          From Meager to Mega.
                        </span>
                        <span className="block text-sm sm:text-base font-mono font-bold text-amber-700 uppercase tracking-widest mt-1">
                          Make the shift.
                        </span>
                      </>
                    ) : selectedEvent.title}
                  </h2>
                  {selectedEvent.subtitle && (
                    <p className="text-xs font-mono font-bold text-[#1C3B34] uppercase mt-2">
                      {selectedEvent.id === 7 ? "JUMPSTART 2-Day Live Intensive Accelerator & 21-Day Cognitive Sprint" : selectedEvent.subtitle}
                    </p>
                  )}
                </div>

                <p className="text-[#3A4D3E] text-sm sm:text-base font-light leading-relaxed">
                  {selectedEvent.description}
                </p>

                {/* Event Specs Box */}
                <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-2 text-xs font-mono text-[#172217]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#1C3B34] shrink-0" />
                    <span className="font-bold">{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1C3B34] shrink-0" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  {selectedEvent.id === 7 && (
                    <div className="flex items-center gap-2 text-[#1C3B34] font-bold">
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>21-Day Private WhatsApp Cohort Included</span>
                    </div>
                  )}
                </div>

                {/* Pricing & Spots Block */}
                <div className="pt-2 border-t border-[#D0D9CA] flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold block">EARLY BIRD TUITION</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-mono font-extrabold text-[#172217]">
                        {selectedEvent.priceNGN || `₦${(selectedEvent.price * 1500).toLocaleString()}`}
                      </span>
                      <span className="text-xs font-mono text-[#4E5B4B]">
                        / ${selectedEvent.price.toFixed(2)} USD
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#6A7B6D] line-through block">
                      Standard: {selectedEvent.standardPriceNGN || "₦67,500"}
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1C3B34] text-white text-[10px] font-mono font-bold uppercase tracking-wider mt-1">
                      SAVE 78% TODAY
                    </span>
                  </div>
                </div>

                {/* Singular Solid Blue CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleRegisterEvent(selectedEvent)}
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    {isProcessing ? "PROCESSING SECURE REGISTRATION..." : (
                      selectedEvent.id === 7 ? "SECURE YOUR ₦15,000 TICKET NOW →" : "REGISTER FOR LIVE EVENT →"
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-[#4F6352] pt-2">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#1C3B34]" /> Instant Access</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-[#1C3B34]" /> 100% Secure Payment</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#1C3B34]" /> Limited Seats</span>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Displaying Generated Image With Frost */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative aspect-[4/5] sm:aspect-[16/13] w-full rounded-[2.5rem] overflow-hidden border border-[#D5DDCF] shadow-2xl bg-[#121316] group">
                  <Image
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Glass Badge */}
                  <div className="absolute top-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl text-white flex items-center justify-between">
                    <div>
                      <span className="font-serif font-extrabold text-base sm:text-lg block leading-tight">
                        {selectedEvent.title}
                      </span>
                      <span className="text-[11px] font-mono text-white/80 block mt-0.5">✦ Led by {selectedEvent.instructor}</span>
                    </div>
                    <div className="text-right font-mono shrink-0 ml-2">
                      <span className="text-sm sm:text-base font-extrabold text-amber-300 block">
                        {selectedEvent.priceNGN || `$${selectedEvent.price} USD`}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">
                        {selectedEvent.spots} Spots Left
                      </span>
                    </div>
                  </div>

                  {/* Bottom Frosted Glass Strip */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-xs font-mono text-white shadow-xl flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-amber-300" />
                      <span>Live Virtual Interactive Sessions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-300" />
                      <span>21-Day Accountability Sprint</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ===================================================================== */}
            {/* FULL PROGRAM ARCHITECTURE (SCHEDULE, 6 UNITS & DELIVERABLES) */}
            {/* ===================================================================== */}
            {selectedEvent.id === 7 && (
              <div className="pt-8 border-t border-[#D0D9CA] space-y-12">
                
                {/* 2-Day Live Accelerator Schedule */}
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                      INTENSIVE BLUEPRINT
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
                      2-Day Live Accelerator Schedule
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E5B4B] font-light mt-1">
                      Two intensive evening sessions designed for irreversible personal shift.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Day 1 */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#CCD6C6] space-y-3 shadow-md">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3B34] text-white font-mono text-xs font-bold">
                        DAY 1 // SATURDAY @ 5:00 PM WAT
                      </div>
                      <h4 className="text-xl font-serif font-bold text-[#172217]">
                        Wake Up. Shake Up. From Meager to Mega — Make the Shift
                      </h4>
                      <p className="text-xs sm:text-sm text-[#3A4D3E] leading-relaxed">
                        Deep-dive into <strong>Units 1 &amp; 2 (Perception &amp; Usefulness)</strong>. Dismantling default programming of lack and fear, re-engineering your cognitive lens to spot leverage, and converting raw potential into high-impact market utility.
                      </p>
                      <div className="pt-2 border-t border-[#E2E8DE] text-xs text-[#1C3B34] font-mono font-bold">
                        ✦ Focus: Scarcity Deconstruction &amp; Making the Shift
                      </div>
                    </div>

                    {/* Day 2 */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#CCD6C6] space-y-3 shadow-md">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3B34] text-white font-mono text-xs font-bold">
                        DAY 2 // SUNDAY @ 5:00 PM WAT
                      </div>
                      <h4 className="text-xl font-serif font-bold text-[#172217]">
                        The Architecture of Execution
                      </h4>
                      <p className="text-xs sm:text-sm text-[#3A4D3E] leading-relaxed">
                        Mastering <strong>Units 3, 4, 5 &amp; 6 (Boundaries, Consent, Value &amp; Self-Mastery)</strong>. Erecting impenetrable focus perimeters, mastering high-leverage agreements, commanding premium worth, and achieving emotional governance.
                      </p>
                      <div className="pt-2 border-t border-[#E2E8DE] text-xs text-[#1C3B34] font-mono font-bold">
                        ✦ Focus: Perimeter Architecture &amp; Command Authority
                      </div>
                    </div>
                  </div>
                </div>

                {/* The 6 Spectrum Units of Transformation */}
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                      CORE TRANSFORMATION FRAMEWORK
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
                      The 6 Spectrum Units of Transformation
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E5B4B] font-light mt-1">
                      Your framework for the 2-day accelerator and subsequent 21-day daily prompts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {spectrumUnits.map((unit, idx) => {
                      const IconComp = unit.icon;
                      return (
                        <div key={idx} className="p-5 rounded-2xl bg-white border border-[#CCD6C6] space-y-2.5 shadow-sm hover:border-[#1C3B34] transition-all flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold text-[#1C3B34]">{unit.num} // {unit.role}</span>
                              <div className="p-1.5 rounded-lg bg-[#E2E8DE] text-[#1C3B34]">
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                            </div>
                            <h5 className="text-lg font-serif font-bold text-[#172217]">{unit.name}</h5>
                            <p className="text-xs text-[#4F6352] leading-relaxed font-light">{unit.desc}</p>
                          </div>
                          <div className="pt-2 border-t border-[#E2E8DE] text-[11px] text-[#1C3B34] font-mono">
                            {unit.shift}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Included Deliverables */}
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                      INCLUDED DELIVERABLES
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
                      Your Complete Accelerator Resource Pack
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {deliverables.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/80 border border-[#CCD6C6] flex items-start gap-3 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-[#1C3B34] shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h6 className="text-xs font-bold text-[#172217]">{item.title}</h6>
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-[#E2E8DE] text-[#1C3B34] rounded-md font-bold">
                              {item.format}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#4F6352] mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Blue Action Banner */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#CCD6C6] shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-xl font-serif font-bold text-[#172217]">
                      Ready for Your Mega Shift?
                    </h4>
                    <p className="text-xs text-[#4F6352]">
                      Take immediate action. Register now at the early bird rate of ₦15,000 ($10 USD) and join the private cohort.
                    </p>
                  </div>
                  <button
                    onClick={() => handleRegisterEvent(selectedEvent)}
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer text-center"
                  >
                    REGISTER FOR JUMPSTART NOW (₦15,000) →
                  </button>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* ALL COHORTS & SESSIONS SELECTOR GRID */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-4">
          <div className="text-center">
            <h3 className="text-2xl sm:text-4xl font-serif text-white font-normal">
              All Cohorts &amp; Live Sessions
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light mt-1">
              Select any event below to inspect its detailed curriculum and enrollment options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const isSelected = event.id === selectedEventId;
              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className={`bg-[#E2E8DE] text-[#172217] rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between group shadow-xl ${
                    isSelected ? "border-[#1C3B34] ring-2 ring-[#1C3B34] scale-[1.01]" : "border-[#D5DDCF] hover:border-[#1C3B34]"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-white border border-[#CCD6C6] text-[#1C3B34]">
                        {event.type.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#1C3B34]">
                        {event.priceNGN || `$${event.price} USD`}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-lg text-[#172217] leading-snug group-hover:text-[#1C3B34] transition-colors">
                      {event.title}
                    </h4>

                    <p className="text-xs text-[#4E5B4B] line-clamp-2 leading-relaxed font-light">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D0D9CA] flex items-center justify-between text-xs font-mono font-bold text-[#1C3B34]">
                    <span>{event.spots} spots remaining</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {isSelected ? "ACTIVE SHOWCASE" : "VIEW DETAILS →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FIT-FOR-PROFIT VOLUNTEER COMMUNITY OUTREACH BANNER */}
        {/* ========================================================================= */}
        <div id="volunteer" className="bg-[#E2E8DE] text-[#172217] rounded-3xl border border-[#D5DDCF] p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/80 border border-[#CCD6C6] rounded-full text-xs font-mono font-bold text-[#1C3B34]">
              <Heart className="w-3.5 h-3.5 text-[#1C3B34]" />
              <span>FREE OUTREACHES MOVEMENT &amp; COMMUNITY SERVICE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
              Join the Fit-For-Profit Volunteer Movement
            </h3>
            <p className="text-xs sm:text-sm text-[#4E5B4B] font-light leading-relaxed">
              Fit-For-Profit features a dedicated volunteer community service arm staging free outreaches for schools, education platforms, and local communities across different states. Step up and make a difference today!
            </p>
          </div>
          <button
            onClick={() => setIsVolunteerModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
          >
            <Users className="w-4 h-4 inline mr-2" />
            <span>Join as a Volunteer</span>
          </button>
        </div>

      </div>

      {/* Volunteer Modal */}
      <FitForProfitVolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />
    </div>
  );
}
