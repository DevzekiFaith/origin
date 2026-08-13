"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Target, Users, TrendingUp, Heart, MessageSquare, Play, ArrowRight, BookOpen, Award, Clock, Star, Calendar, ShoppingBag, QrCode, Plus, Sparkles, Video, CheckCircle, Flame, Crown, Package } from "lucide-react";
import { simplifiedCourses } from "./data/simplified-courses";
import { useCart } from "./contexts/CartContext";
import { useToast } from "./contexts/ToastContext";
import { getCompanionProductForCourse } from "./data/course-ebook-mapping";
import FitForProfitVolunteerModal from "./components/FitForProfitVolunteerModal";
import Testimonials from "./components/sections/Testimonials";
import AnimatedSection from "./components/ui/AnimatedSection";
import LeadCapture from "./components/sections/LeadCapture";

function QRCodeSVG({ code, className = "w-32 h-32" }: { code: string; className?: string }) {
  const corners = (
    <>
      {/* Top Left Positioning Block */}
      <rect x="0" y="0" width="7" height="7" fill="black" />
      <rect x="1" y="1" width="5" height="5" fill="white" />
      <rect x="2" y="2" width="3" height="3" fill="black" />
      {/* Top Right Positioning Block */}
      <rect x="22" y="0" width="7" height="7" fill="black" />
      <rect x="23" y="1" width="5" height="5" fill="white" />
      <rect x="24" y="2" width="3" height="3" fill="black" />
      {/* Bottom Left Positioning Block */}
      <rect x="0" y="22" width="7" height="7" fill="black" />
      <rect x="1" y="23" width="5" height="5" fill="white" />
      <rect x="2" y="24" width="3" height="3" fill="black" />
      {/* Small Alignment Block */}
      <rect x="20" y="20" width="5" height="5" fill="black" />
      <rect x="21" y="21" width="3" height="3" fill="white" />
      <rect x="22" y="22" width="1" height="1" fill="black" />
    </>
  );

  let pixels: number[][] = [];
  if (code === "ORIGIN-STORE-7") {
    pixels = [
      [8,2],[10,2],[12,2],[15,2],[17,2],[19,2],
      [9,3],[11,3],[14,3],[18,3],[20,3],[21,3],
      [8,4],[13,4],[15,4],[16,4],[19,4],
      [9,5],[10,5],[12,5],[14,5],[17,5],[20,5],
      [8,8],[9,9],[12,8],[15,9],[19,8],[20,9],
      [2,9],[4,10],[10,12],[14,11],[18,12],[22,11],
      [11,14],[13,15],[16,14],[17,15],[25,14],[27,15],
      [9,18],[15,19],[21,18],[23,19],[26,18],[28,19],
      [10,22],[12,23],[14,24],[16,25],[18,26]
    ];
  } else if (code === "ORIGIN-STORE-8") {
    pixels = [
      [9,2],[11,2],[13,2],[14,2],[18,2],[20,2],
      [8,3],[10,3],[15,3],[17,3],[19,3],[21,3],
      [9,4],[12,4],[14,4],[16,4],[18,4],
      [8,5],[11,5],[13,5],[15,5],[19,5],[20,5],
      [9,8],[10,9],[11,8],[14,9],[18,8],[21,9],
      [3,9],[5,10],[9,12],[13,11],[17,12],[21,11],
      [10,14],[12,15],[15,14],[18,15],[24,14],[26,15],
      [8,18],[14,19],[20,18],[22,19],[25,18],[27,19],
      [9,22],[11,23],[13,24],[15,25],[17,26]
    ];
  } else {
    pixels = [
      [10,2],[12,2],[14,2],[16,2],[19,2],[21,2],
      [9,3],[13,3],[16,3],[18,3],[20,3],[22,3],
      [10,4],[11,4],[15,4],[17,4],[19,4],
      [9,5],[12,5],[14,5],[16,5],[18,5],[21,5],
      [8,8],[11,9],[13,8],[16,9],[20,8],[22,9],
      [4,9],[6,10],[11,12],[15,11],[19,12],[23,11],
      [12,14],[14,15],[17,14],[19,15],[26,14],[28,15],
      [10,18],[16,19],[22,18],[24,19],[27,18],[29,19],
      [11,22],[13,23],[15,24],[17,25],[19,26]
    ];
  }

  return (
    <svg className={className} viewBox="0 0 29 29" shapeRendering="crispEdges">
      <defs>
        <clipPath id="qrCircleView">
          <circle cx="14.5" cy="14.5" r="3" />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="29" height="29" fill="white" />
      {corners}
      {pixels.map(([x, y], idx) => (
        <rect key={idx} x={x} y={y} width="1.1" height="1.1" fill="black" />
      ))}
      {/* Circle mask to clear center pixels */}
      <circle cx="14.5" cy="14.5" r="4.2" fill="white" />
      {/* Circular Logo overlay */}
      <image href="/origin.png" x="11.5" y="11.5" width="6" height="6" clipPath="url(#qrCircleView)" />
    </svg>
  );
}

// Reusable elegant QR card component rendering a smartphone mockup based on the new white screen design
function QRCard({ label = "Scan to Register" }: { code?: string; label?: string }) {
  return (
    <div className="relative w-[265px] aspect-[9/18.8] bg-[#08090a] rounded-[2.5rem] p-[9px] shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.15),0_0_0_1px_rgba(255,255,255,0.05)] hover:scale-[1.03] transition-all duration-300 select-none group border border-zinc-800">
      
      {/* Physical Button Mockups */}
      {/* Volume Up */}
      <div className="absolute left-[-3px] top-24 w-[3px] h-8 bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-l-md border-y border-l border-white/5" />
      {/* Volume Down */}
      <div className="absolute left-[-3px] top-36 w-[3px] h-8 bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-l-md border-y border-l border-white/5" />
      {/* Power Button */}
      <div className="absolute right-[-3px] top-28 w-[3px] h-12 bg-gradient-to-l from-zinc-700 to-zinc-800 rounded-r-md border-y border-r border-white/5" />

      {/* Dynamic Island */}
      <div className="absolute top-4.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full flex items-center justify-between px-3 z-50 shadow-inner border border-white/5">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-900/60" />
        <div className="w-2.5 h-1.5 rounded-full bg-zinc-900" />
      </div>

      {/* Screen Area */}
      <div className="flex-1 bg-gradient-to-b from-[#fafafd] to-[#f4f5f8] rounded-[2rem] flex flex-col justify-between p-4 relative overflow-hidden text-zinc-800 shadow-[inset_0_2px_8px_rgba(0,0,0,0.03)]">
        
        {/* Top Status Bar & Header */}
        <div className="space-y-1.5">
          {/* Signal & battery status */}
          <div className="flex justify-between items-center text-[9px] text-zinc-400 font-bold px-1.5 pt-3 select-none">
            <span>12:30</span>
            <div className="flex items-center gap-1.5">
              {/* Wifi Icon */}
              <svg className="w-3 h-3 text-zinc-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 21a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm1-5.32a10.93 10.93 0 0 0-14 0l1.42 1.42a8.94 8.94 0 0 1 11.16 0zM12 2a19.92 19.92 0 0 0-20 0l1.42 1.42a17.92 17.92 0 0 1 37.16 0z" />
              </svg>
              {/* Battery Icon */}
              <div className="flex items-center border border-zinc-300 rounded-[3px] p-[1px] w-5 h-2.5">
                <div className="bg-zinc-600 h-full w-[80%] rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Navigation Title Bar */}
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-2.5">
            {/* Cyan Chevron Left */}
            <svg className="w-3.5 h-3.5 text-cyan-500 shrink-0 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-[10px] font-extrabold text-zinc-800 tracking-tight truncate w-full">
              {label}
            </span>
          </div>

          {/* Green Status Banner */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-3.5 rounded-2xl flex items-center justify-center gap-2 text-[9px] font-black tracking-wider uppercase shadow-md shadow-emerald-500/10">
            {/* White Check Circle */}
            <svg className="w-3.5 h-3.5 bg-white text-emerald-500 rounded-full p-0.5 fill-current shrink-0 shadow-sm" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">Successfully Checked!</span>
          </div>
        </div>

        {/* Middle QR Code inside Cyan Corner Brackets */}
        <div className="flex-1 flex items-center justify-center my-3">
          <div className="relative p-4.5 bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-zinc-100/80">
            
            {/* Viewfinder corners with pulsing glow */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-cyan-400 rounded-tl-lg animate-pulse" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-cyan-400 rounded-tr-lg animate-pulse" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-cyan-400 rounded-bl-lg animate-pulse" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-cyan-400 rounded-br-lg animate-pulse" />

            {/* REAL Scannable QR Code encoding https://origin.com.ng/ */}
            <div className="relative w-28 h-28 bg-white flex items-center justify-center p-1.5 rounded-lg shadow-sm">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&ecc=H&data=https://origin.com.ng/"
                alt="Scannable Origin Link QR"
                className="w-full h-full object-contain"
              />
              
              {/* Circular Logo overlay in the center */}
              <div className="absolute w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md p-0.5 border border-zinc-200/50">
                <img
                  src="/origin.png"
                  className="rounded-full w-full h-full object-cover"
                  alt="Origin"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Stats Card Container */}
        <div className="bg-zinc-50 border border-zinc-100/80 rounded-2xl p-2.5 grid grid-cols-2 gap-2 text-center shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <div className="border-r border-zinc-200/60">
            <span className="text-[7px] text-zinc-400 font-black uppercase tracking-widest block mb-0.5">
              Cohort
            </span>
            <span className="text-[10px] font-black text-zinc-800">
              Founding Members
            </span>
          </div>
          <div>
            <span className="text-[7px] text-zinc-400 font-extrabold uppercase tracking-widest block mb-0.5">
              Access
            </span>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider flex items-center justify-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              Active
            </span>
          </div>
        </div>

        {/* Bottom Tab Bar */}
        <div className="flex justify-between items-center border-t border-zinc-100 pt-3.5 px-2 text-[8px] font-bold text-zinc-400">
          {/* Lists Tab */}
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-zinc-700 transition-colors">
            <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>Lists</span>
          </div>

          {/* Active Scan Tab with Cyan Circle background */}
          <div className="flex flex-col items-center gap-1 text-[#60a5fa]">
            <div className="w-6 h-6 rounded-full bg-[#60a5fa]/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-[7px] font-extrabold tracking-wider">SCAN</span>
          </div>

          {/* Library Tab */}
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-zinc-700 transition-colors">
            <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Library</span>
          </div>
        </div>

      </div>

      {/* Floating scanner visual overlay in mockup border */}
      <div className="absolute inset-x-8 top-[36%] bottom-[42%] border border-cyan-500/20 pointer-events-none rounded-lg" />
    </div>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMockCode, setSelectedMockCode] = useState("ORIGIN-STORE-7");
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Interval Pop-up Display for Fit-For-Profit Volunteer Movement (triggers 6.5 seconds after homepage load)
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("fitforprofit_volunteer_modal_seen");
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsVolunteerModalOpen(true);
        sessionStorage.setItem("fitforprofit_volunteer_modal_seen", "true");
      }, 6500);
      return () => clearTimeout(timer);
    }
  }, []);

  const getMockCodeUrl = (code: string) => {
    if (code === "ORIGIN-STORE-7") return "/store/7";
    if (code === "ORIGIN-STORE-8") return "/store/8";
    return "/courses/problem-solving";
  };

  const iconMap: Record<string, React.ElementType> = {
    "problem-solving": Zap,
    "decision-making": Target,
    "team-person": Users,
    "personal-adaptability": TrendingUp,
    "self-image": Heart,
    "communication": MessageSquare,
  };

  return (
    <div className="min-h-screen bg-[#0f1724]">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="relative py-32 px-4 overflow-hidden">
          {/* Animated Ambient Light Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#60a5fa]/10 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[8000ms]"></div>
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[12000ms]"></div>
          
          <div className="absolute inset-0 bg-linear-to-b from-[#60a5fa]/5 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Hero Left Column */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-6">
                {/* Value-first badge */}
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#60a5fa]/10 border border-[#60a5fa]/20 text-[#60a5fa] text-xs font-bold uppercase rounded-full tracking-wider backdrop-blur-md">
                  <Award size={12} className="text-[#60a5fa]" /> Nigeria&apos;s Human Architecture Institute
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Build the Person<br />
                  <span className="bg-gradient-to-r from-[#60a5fa] to-blue-400 bg-clip-text text-transparent">Behind the Success</span>
                </h1>
                <p className="text-lg md:text-xl text-[#9aa4b2] leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
                  6 masterclasses on problem-solving, decision-making, communication, self-image, adaptability and teamwork — Beginner courses from $14, Intermediate from $17, or get all 6 for $59.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/courses/team-person" className="bg-[#60a5fa] text-black px-8 py-4 rounded-full font-bold text-base hover:bg-[#3b82f6] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#60a5fa]/25 group">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Start Learning — From $14
                  </Link>
                  <Link href="/courses" className="border border-white/20 text-[#9aa4b2] hover:text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/5 hover:border-white/40 transition-all flex items-center justify-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#60a5fa]" />
                    Browse All 6 Courses
                  </Link>
                </div>
                {/* Unified Level & Price Clarity Strip */}
                <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-zinc-300 font-light">Beginner courses at <strong className="text-white font-bold">$14</strong> · Intermediate at <strong className="text-amber-400 font-bold">$17</strong> · All 6 Bundle at <strong className="text-[#60a5fa] font-bold">$59</strong></span>
                </div>
              </div>

              {/* Hero Right Column: Featured Course Card */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-md bg-[#0b1220] border border-[#60a5fa]/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 hover:border-[#60a5fa]/50 transition-all duration-300 group">
                  {/* Card header */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80" alt="Problem Solving Masterclass" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#60a5fa] text-black text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Most Popular</span>
                      <span className="bg-amber-500/90 backdrop-blur-md text-black text-[11px] font-black px-3 py-1 rounded-full shadow-md">Intermediate</span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-xs font-bold">4.7</span>
                      <span className="text-zinc-400 text-[10px]">(892)</span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#60a5fa] bg-[#60a5fa]/10 px-2.5 py-0.5 rounded-full border border-[#60a5fa]/20">Featured Masterclass</span>
                        <span className="text-xs text-zinc-400">5,620+ Students</span>
                      </div>
                      <h3 className="text-white font-black text-xl sm:text-2xl leading-snug">8 Ways to Develop Solution Mindset</h3>
                      <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1.5 leading-relaxed">The Becoming Institute · 5 weeks · Self-paced</p>
                    </div>

                    {/* Outcome bullets */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">What You Will Master:</p>
                      <ul className="space-y-2">
                        {[
                          "Approach complex problems systematically",
                          "Think critically & analytically under pressure",
                          "Generate creative, high-leverage solutions fast",
                          "Overcome mental blocks & decision paralysis",
                          "Build a sustainable, solution-first operating mindset"
                        ].map(o => (
                          <li key={o} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-black text-[#60a5fa]">$17</span>
                          <span className="text-xs text-zinc-400 font-light">one-time</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 block">Lifetime Access · PDF Workbook Included</span>
                      </div>
                      <Link href="/courses/problem-solving" className="bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-black px-6 py-3 rounded-full text-sm sm:text-base transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-[#60a5fa]/20">
                        Enroll Now <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection delay={100}>
      <section className="py-16 px-4 border-y border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2 tracking-tight">6</div>
              <div className="text-sm text-[#9aa4b2] font-medium uppercase tracking-wider">Core Masterclasses</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2 tracking-tight">100%</div>
              <div className="text-sm text-[#9aa4b2] font-medium uppercase tracking-wider">Practical Frameworks</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2 tracking-tight">4.9★</div>
              <div className="text-sm text-[#9aa4b2] font-medium uppercase tracking-wider">Cohort Rating</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2 tracking-tight">Self-Paced</div>
              <div className="text-sm text-[#9aa4b2] font-medium uppercase tracking-wider">& Live Strategy</div>
            </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Courses Section */}
      <AnimatedSection delay={150}>
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Our Six Universal Courses</h2>
            <p className="text-[#9aa4b2] text-lg max-w-2xl mx-auto font-light">
              Each course is designed to build essential life skills that apply across all ages and situations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simplifiedCourses.map((course) => {
              const Icon = iconMap[course.id];
              const ebook = getCompanionProductForCourse(course.id);
              return (
                <div
                  key={course.id}
                  className="group bg-[#0b1220] rounded-2xl overflow-hidden hover:bg-[#0e1624] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30 border border-white/5 hover:border-[#60a5fa]/20 flex flex-col justify-between"
                >
                  <Link href={`/courses/${course.id}`} className="block">
                    <div className="relative h-52 overflow-hidden">
                      {course.imageUrl ? (
                        <Image
                          src={course.imageUrl}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a]">
                          <div className={`absolute inset-0 bg-linear-to-br ${course.bgGradient} opacity-20`} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon className="text-[#60a5fa] w-20 h-20 opacity-80" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-white text-sm font-semibold">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          course.level === 'Beginner'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-amber-500/15 text-amber-400'
                        }`}>{course.level}</span>
                        <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#60a5fa] transition-colors leading-tight">
                        {course.title}
                      </h3>
                      {/* Outcome bullets — the key purchase drivers */}
                      <ul className="space-y-1 mb-4">
                        {course.outcomes.slice(0, 3).map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>

                  <div className="p-6 pt-0 mt-auto">
                    {/* Price + dual CTAs */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mb-3">
                      <div>
                        <span className="text-2xl font-black text-[#60a5fa]">${course.priceUSD}</span>
                        <span className="text-xs text-zinc-500 ml-1">one-time</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/courses/${course.id}`}
                          className="text-xs font-bold text-zinc-400 hover:text-white transition-colors px-3 py-1.5 border border-white/10 rounded-full hover:border-white/25"
                        >
                          Details
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart({
                              id: course.id,
                              title: course.title,
                              description: course.description,
                              fullDescription: course.fullDescription,
                              priceUSD: course.priceUSD,
                              imageUrl: course.imageUrl,
                              bgGradient: course.bgGradient,
                              icon: iconMap[course.id] as any,
                              iconColor: course.iconColor,
                              ageRange: course.ageRange,
                            });
                            showToast(`${course.title} added to cart!`, "success");
                          }}
                          className="bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-black px-4 py-1.5 rounded-full text-xs transition-all hover:scale-105 flex items-center gap-1 shadow-md shadow-[#60a5fa]/20"
                        >
                          <Plus className="w-3.5 h-3.5" /> Enroll
                        </button>
                      </div>
                    </div>

                    {/* Store eBook companion cross-sell */}
                    {ebook && (
                      <div className="bg-[#f9f9f9] text-zinc-950 p-3 rounded-xl border border-zinc-200 mt-2 flex items-center gap-3 relative shadow-md">
                        <Link href={`/store/${ebook.id}`} className="block relative w-10 h-14 bg-white border border-zinc-200 rounded shadow-sm overflow-hidden flex-shrink-0">
                          {ebook.imageUrl ? (
                            <Image
                              src={ebook.imageUrl}
                              alt={ebook.name}
                              fill
                              className="object-cover p-0.5"
                              sizes="40px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-100">
                              <BookOpen className="w-5 h-5 text-zinc-400" />
                            </div>
                          )}
                        </Link>
                        
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 h-14">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-[#1db954] uppercase tracking-wider">
                              {ebook.badgeText}
                            </span>
                            <div className="flex items-center gap-0.5 text-yellow-600 text-[10px] font-bold">
                              <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500 stroke-none" />
                              <span>{ebook.rating}</span>
                            </div>
                          </div>
                          <h4 className="text-xs font-extrabold text-zinc-900 truncate leading-none mt-0.5">
                            {ebook.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs font-black text-zinc-700">
                              {ebook.price > 0 ? `$${ebook.price}` : "FREE"}
                            </span>
                            <div className="flex items-center gap-2.5">
                              <Link
                                href={`/store/${ebook.id}`}
                                className="text-[10px] font-extrabold uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
                              >
                                View
                              </Link>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  addToCart({
                                    id: `store-${ebook.id}`,
                                    title: ebook.name,
                                    description: ebook.description,
                                    fullDescription: ebook.description,
                                    priceUSD: ebook.price,
                                    imageUrl: ebook.imageUrl,
                                    bgGradient: ebook.gradient,
                                    icon: ebook.icon,
                                    iconColor: "text-[#60a5fa]",
                                    ageRange: "All Ages",
                                  });
                                  showToast(`${ebook.name} added to cart!`, "success");
                                }}
                                className="bg-zinc-950 hover:bg-zinc-800 text-white p-1 rounded-full transition-colors flex-shrink-0 flex items-center justify-center"
                                title="Add to Cart"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* ── Bundle / Pricing Ladder Section ── */}
      <AnimatedSection delay={100}>
      <section className="py-20 px-4 bg-gradient-to-b from-[#0b1220] to-[#0f1724] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase rounded-full tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Save More, Become More
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">Choose Your Path</h2>
            <p className="text-zinc-400 text-base font-light max-w-xl mx-auto">Start with one course or go all-in — every tier gives you lifetime access and practical frameworks from day one.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {/* Tier 1 */}
            <div className="bg-[#0e1624] border border-white/10 rounded-2xl p-6 flex flex-col hover:border-white/20 transition-all">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-zinc-400" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">Single Course</h3>
              <p className="text-zinc-400 text-sm font-light mb-5 flex-1">Any 1 of 6 masterclasses — Beginner from $14, Intermediate from $17.</p>
              <div className="mb-5">
                <span className="text-3xl font-black text-white">$14</span>
                <span className="text-zinc-500 text-sm ml-1">/ Beginner</span>
              </div>
              <div className="text-xs text-zinc-500 -mt-3 mb-5">Intermediate courses from <span className="text-amber-400 font-bold">$17</span></div>
              <ul className="space-y-2 mb-6 text-sm text-zinc-300">
                {["Lifetime access","PDF frameworks included","Self-paced"].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-zinc-500 shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/courses" className="w-full text-center border border-white/15 text-zinc-300 hover:text-white hover:border-white/30 py-2.5 rounded-full text-sm font-bold transition-all">Browse Courses</Link>
            </div>
            {/* Tier 2 — Recommended */}
            <div className="relative bg-gradient-to-b from-[#0d1a35] to-[#0b1220] border border-[#60a5fa]/40 rounded-2xl p-6 flex flex-col shadow-xl shadow-[#60a5fa]/10 hover:border-[#60a5fa]/60 transition-all scale-[1.02]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#60a5fa] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">Most Popular</span>
              </div>
              <div className="w-10 h-10 bg-[#60a5fa]/15 rounded-xl flex items-center justify-center mb-4">
                <Package className="w-5 h-5 text-[#60a5fa]" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">Core Architecture Pack</h3>
              <p className="text-zinc-400 text-sm font-light mb-5 flex-1">All 6 masterclasses — the complete human architecture curriculum.</p>
              <div className="mb-2">
                <span className="text-3xl font-black text-[#60a5fa]">$59</span>
                <span className="text-zinc-500 text-sm ml-1">/ bundle</span>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-sm line-through text-zinc-500">$90</span>
                <span className="text-xs bg-emerald-500/15 text-emerald-400 font-black px-2 py-0.5 rounded-full">Save $31</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm text-zinc-300">
                {["All 6 courses — lifetime access","PDF frameworks for every course","Priority cohort access","Free 7-Day Starter Guide PDF"].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />{f}</li>
                ))}
              </ul>
              <button
                onClick={() => {
                  simplifiedCourses.forEach(c => {
                    addToCart({
                      id: c.id,
                      title: c.title,
                      description: c.description,
                      fullDescription: c.fullDescription,
                      priceUSD: c.priceUSD - 25/6,
                      imageUrl: c.imageUrl,
                      bgGradient: c.bgGradient,
                      icon: iconMap[c.id] as any,
                      iconColor: c.iconColor,
                      ageRange: c.ageRange,
                    });
                  });
                  showToast("All 6 courses added — bundle pricing applied!", "success");
                }}
                className="w-full bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-black py-3 rounded-full text-sm transition-all hover:scale-[1.02] shadow-lg shadow-[#60a5fa]/20"
              >Get the Bundle — $59</button>
            </div>
            {/* Tier 3 */}
            <div className="bg-gradient-to-b from-[#12101e] to-[#0f1724] border border-purple-500/30 rounded-2xl p-6 flex flex-col hover:border-purple-500/50 transition-all">
              <div className="w-10 h-10 bg-purple-500/15 rounded-xl flex items-center justify-center mb-4">
                <Crown className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-black text-white mb-1">Live Strategy Add-On</h3>
              <p className="text-zinc-400 text-sm font-light mb-5 flex-1">All 6 courses + a seat in the live JUMPSTART Accelerator cohort.</p>
              <div className="mb-5">
                <span className="text-3xl font-black text-white">$74</span>
                <span className="text-zinc-500 text-sm ml-1">/ everything</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm text-zinc-300">
                {["All 6 self-paced courses","JUMPSTART live cohort seat","Weekly live strategy reviews","Founder community access"].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/store/17" className="w-full text-center bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 hover:text-white py-2.5 rounded-full text-sm font-bold transition-all">Get Full Access</Link>
            </div>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Events Section */}
      <AnimatedSection delay={150}>
      <section className="py-24 px-4 bg-linear-to-b from-[#0b1220] to-[#0f1724] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Upcoming Events</h2>
              <p className="text-[#b3b3b3]">Join live sessions with our expert instructors</p>
            </div>
            <Link href="/events" className="flex items-center gap-2 text-[#60a5fa] hover:text-white transition-colors font-semibold">
              View All Events
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0b1220] rounded-2xl overflow-hidden hover:bg-[#0e1624] transition-all group border border-white/5 hover:border-[#60a5fa]/20 flex flex-col justify-between">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/jumpstart_cover.png"
                  alt="JUMPSTART Accelerator Program"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#60a5fa] text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Accelerator
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">JUMPSTART Accelerator</h3>
                  <div className="flex items-center gap-2 text-sm text-[#b3b3b3] mb-2">
                    <Calendar className="w-4 h-4 text-[#60a5fa]" />
                    <span>August 15 – September 5, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-4">
                    <Video className="w-4 h-4" />
                    <span>Online &amp; Physical Onsite Attendance</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#60a5fa] font-bold text-xl">$15.00</span>
                  <Link href="/store/17" className="bg-[#60a5fa] text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-[#3b82f6] transition-colors">
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#0b1220] rounded-2xl overflow-hidden hover:bg-[#0e1624] transition-all group border border-white/5 hover:border-[#60a5fa]/20 flex flex-col justify-between">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/masterclass_flier.png"
                  alt="MASTERCLASS: Becoming a Person of Interest (POI)"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Masterclass
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-1">MASTERCLASS: Person of Interest</h3>
                  <div className="flex items-center gap-2 text-sm text-[#b3b3b3] mb-2">
                    <Calendar className="w-4 h-4 text-[#60a5fa]" />
                    <span>Saturday, September 12, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-4">
                    <Video className="w-4 h-4" />
                    <span>Online &amp; Physical Onsite Attendance</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#60a5fa] font-bold text-xl">$11.06</span>
                  <Link href="/store/12" className="bg-[#60a5fa] text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-[#3b82f6] transition-colors">
                    Register Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#0b1220] rounded-2xl overflow-hidden hover:bg-[#0e1624] transition-all group border border-white/5 hover:border-[#60a5fa]/20 flex flex-col justify-between">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/fit_for_profit.jpg"
                  alt="Fit-For-Profit Regional Workshop"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#60a5fa] text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Regional Workshop
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Fit-For-Profit Workshop</h3>
                  <div className="flex items-center gap-2 text-sm text-[#b3b3b3] mb-2">
                    <Calendar className="w-4 h-4 text-[#60a5fa]" />
                    <span>Monthly Regional Sessions</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-4">
                    <Video className="w-4 h-4" />
                    <span>Multi-State Regional Sessions</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[#60a5fa] font-bold text-xl">$8.00</span>
                  <Link href="/events" className="bg-[#60a5fa] text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-[#3b82f6] transition-colors">
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Fit-For-Profit Volunteer Community Outreach Compact Pill Card - Right Aligned */}
      <section className="py-4 px-4 bg-[#080c16] border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-end">
          <div className="w-full max-w-xl relative overflow-hidden rounded-full border border-[#60a5fa]/30 bg-gradient-to-r from-[#0b1329] via-[#0e1a38] to-[#122244] py-2.5 px-4 sm:px-5 shadow-xl shadow-blue-950/20 backdrop-blur-md transition-all hover:border-[#60a5fa]/50">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-[#60a5fa]/15 border border-[#60a5fa]/30 flex items-center justify-center shrink-0">
                  <Heart className="w-3.5 h-3.5 text-[#60a5fa] fill-[#60a5fa]/30 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white tracking-tight truncate">Fit-For-Profit Volunteer Corps</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-bold text-emerald-400 rounded-full uppercase tracking-wider hidden sm:inline">
                      Free Outreach
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-light truncate max-w-sm">
                    Staging free community outreaches for schools, education platforms & local communities.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsVolunteerModalOpen(true)}
                className="px-5 py-1.5 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-black rounded-full text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-[#60a5fa]/20 cursor-pointer hover:scale-105"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Join Volunteer</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">The Becoming Store</h2>
              <p className="text-[#b3b3b3]">eBooks, journals, masterclasses & merch — everything to accelerate your becoming</p>
            </div>
            <Link href="/store" className="flex items-center gap-2 text-[#60a5fa] hover:text-white transition-colors font-semibold">
              Visit Store
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {/* 1 — Origin Journal — Bestseller */}
            <div className="relative bg-[#0b1220] rounded-2xl overflow-hidden hover:bg-[#0e1624] transition-all group border border-white/5 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5">
              <div className="absolute top-3 left-3 z-10">
                <span className="flex items-center gap-1 bg-amber-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <Flame className="w-2.5 h-2.5" /> Bestseller
                </span>
              </div>
              <div className="relative h-44 overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80" alt="Origin Journal" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm mb-1">Origin Journal</h3>
                <p className="text-[10px] text-zinc-400 mb-3 leading-relaxed">90-day quarterly planner for personal growth</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#60a5fa] font-black">$24.99</span>
                  <Link href="/store/1" className="bg-[#60a5fa] text-black px-3 py-1.5 rounded-full text-[10px] font-black hover:bg-[#3b82f6] transition-colors">View</Link>
                </div>
              </div>
            </div>

            {/* 2 — Architecture of Becoming — Founding Member */}
            <div className="relative bg-[#0b1220] rounded-2xl overflow-hidden hover:bg-[#0e1624] transition-all group border border-purple-500/25 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5">
              <div className="absolute top-3 left-3 z-10">
                <span className="flex items-center gap-1 bg-purple-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <Crown className="w-2.5 h-2.5" /> Founding Member
                </span>
              </div>
              <div className="relative h-44 overflow-hidden">
                <Image src="/architecture_of_becoming_standing_v1.png" alt="Architecture of Becoming" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm mb-1">Architecture of Becoming</h3>
                <p className="text-[10px] text-zinc-400 mb-3 leading-relaxed">Pre-order hardcopy — Aug 20 launch</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-purple-400 font-black text-sm">₦5k–₦15k</span>
                  </div>
                  <Link href="/store/4" className="bg-purple-500 text-white px-3 py-1.5 rounded-full text-[10px] font-black hover:bg-purple-400 transition-colors">Pre-Order</Link>
                </div>
              </div>
            </div>

            {/* 3 — MONEY FARMING — Best Value */}
            <div className="relative bg-[#0b1220] rounded-2xl overflow-hidden hover:bg-[#0e1624] transition-all group border border-white/5 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
              <div className="absolute top-3 left-3 z-10">
                <span className="flex items-center gap-1 bg-emerald-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <Star className="w-2.5 h-2.5" /> Best Value
                </span>
              </div>
              <div className="relative h-44 overflow-hidden">
                <Image src="/cover_money_farming.png" alt="MONEY FARMING" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm mb-1">MONEY FARMING</h3>
                <p className="text-[10px] text-zinc-400 mb-3 leading-relaxed">7 wealth-building principles eBook</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#60a5fa] font-black">$4.06</span>
                    <span className="text-[10px] line-through text-zinc-500">$10</span>
                  </div>
                  <Link href="/store/7" className="bg-[#60a5fa] text-black px-3 py-1.5 rounded-full text-[10px] font-black hover:bg-[#3b82f6] transition-colors">Get</Link>
                </div>
              </div>
            </div>

            {/* 4 — Origin Apparel — Gift Idea */}
            <div className="relative bg-[#0b1220] rounded-2xl overflow-hidden hover:bg-[#0e1624] transition-all group border border-white/5 hover:border-[#60a5fa]/20">
              <div className="absolute top-3 left-3 z-10">
                <span className="flex items-center gap-1 bg-[#60a5fa] text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  🎁 Gift Idea
                </span>
              </div>
              <div className="relative h-44 overflow-hidden">
                <Image src="/origin_merch_collection.png" alt="Origin Apparel & Gifts" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm mb-1">Origin Apparel</h3>
                <p className="text-[10px] text-zinc-400 mb-3 leading-relaxed">Tees, hoodies, mugs & totes</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#60a5fa] font-black">From $14.99</span>
                  <Link href="/store?category=merch" className="bg-[#60a5fa] text-black px-3 py-1.5 rounded-full text-[10px] font-black hover:bg-[#3b82f6] transition-colors">Explore</Link>
                </div>
              </div>
            </div>

            {/* 5 — MASTERCLASS POI — Live Cohort */}
            <div className="relative bg-[#0b1220] rounded-2xl overflow-hidden hover:bg-[#0e1624] transition-all group border border-white/5 hover:border-amber-500/25">
              <div className="absolute top-3 left-3 z-10">
                <span className="flex items-center gap-1 bg-amber-400 text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  🔴 Live Sep 12
                </span>
              </div>
              <div className="relative h-44 overflow-hidden">
                <Image src="/masterclass_flier.png" alt="MASTERCLASS POI" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm mb-1">MASTERCLASS: POI</h3>
                <p className="text-[10px] text-zinc-400 mb-3 leading-relaxed">3-hr live cohort — person of interest</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-black">$11.06</span>
                  <Link href="/store/12" className="bg-amber-400 text-black px-3 py-1.5 rounded-full text-[10px] font-black hover:bg-amber-300 transition-colors">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Scanner Demo Section */}
        <section className="py-24 px-4 border-t border-white/5 bg-[#0b1220]/40">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column: Text description and buttons */}
            <div className="flex-1 space-y-6">
              <span className="px-3.5 py-1 bg-[#60a5fa]/10 border border-[#60a5fa]/20 text-[#60a5fa] text-xs font-bold uppercase rounded-full tracking-wider">
                Printable Material
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Get the Origin QR Poster
              </h2>
              <p className="text-[#9aa4b2] text-lg font-light leading-relaxed">
                We've designed a printable cartoon-styled **Origin Community Flyer**! Anyone can point their smartphone camera at the poster's QR code to go directly to our store or enroll in courses instantly. Print and hang this flyer poster anywhere in your school, office, or hub to drive instant traffic.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/flyer"
                  className="bg-[#60a5fa] text-black px-8 py-4 rounded-full font-semibold text-base hover:bg-[#3b82f6] transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-[#60a5fa]/15"
                >
                  <QrCode size={18} />
                  Print / View Flyer Page
                </Link>
              </div>
            </div>

            {/* Right Column: Cartoon-Styled Flyer Poster Preview */}
            <div className="w-full lg:w-[420px] flex flex-col items-center">
              {/* Poster Container */}
              <Link
                href={getMockCodeUrl(selectedMockCode)}
                className="block"
              >
                <QRCard label="Origin Page" />
              </Link>

              {/* Toggle controls below the phone */}
              <div className="flex gap-2 mt-6 bg-zinc-950 p-1.5 rounded-full border border-white/5 shadow-lg">
                <button
                  onClick={() => setSelectedMockCode("ORIGIN-STORE-7")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedMockCode === "ORIGIN-STORE-7"
                      ? "bg-[#60a5fa] text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  eBook #1
                </button>
                <button
                  onClick={() => setSelectedMockCode("ORIGIN-STORE-8")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedMockCode === "ORIGIN-STORE-8"
                      ? "bg-[#60a5fa] text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  eBook #2
                </button>
                <button
                  onClick={() => setSelectedMockCode("ORIGIN-COURSE-problem-solving")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedMockCode === "ORIGIN-COURSE-problem-solving"
                      ? "bg-[#60a5fa] text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Course
                </button>
              </div>

              {/* Flyer actions */}
              <div className="flex gap-3 mt-6">
                <Link
                  href={getMockCodeUrl(selectedMockCode)}
                  className="bg-[#60a5fa] hover:bg-[#3b82f6] text-black px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md shadow-[#60a5fa]/10 flex items-center gap-1.5"
                >
                  <ShoppingBag size={14} /> View Details
                </Link>
                <Link
                  href="/flyer"
                  className="border border-white/10 hover:bg-white/5 text-[#9aa4b2] hover:text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all"
                >
                  Print Poster / Flyer
                </Link>
              </div>
            </div>
          </div>
        </section>

      {/* Lead Capture Section */}
      <LeadCapture />

      {/* CTA Section */}
      <AnimatedSection delay={150}>
      <section className="py-24 px-4 bg-linear-to-b from-[#0b1220] to-[#0f1724] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to Build the Person Behind the Success?</h2>
          <p className="text-xl text-[#9aa4b2] mb-4 font-light">
            Beginner courses from $14 · Intermediate from $17 · or get all 6 for $59.
          </p>
          <p className="text-sm text-zinc-500 mb-10">Lifetime access · Self-paced · Practical from day one · 25,000+ students</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="bg-[#60a5fa] text-black px-10 py-4 rounded-full font-bold text-base hover:bg-[#3b82f6] transition-all hover:scale-105 shadow-lg shadow-[#60a5fa]/15">
              Browse All 6 Courses — $14 each
            </Link>
            <button
              onClick={() => {
                simplifiedCourses.forEach(c => {
                  addToCart({
                    id: c.id,
                    title: c.title,
                    description: c.description,
                    fullDescription: c.fullDescription,
                    priceUSD: c.priceUSD - 25/6,
                    imageUrl: c.imageUrl,
                    bgGradient: c.bgGradient,
                    icon: iconMap[c.id] as any,
                    iconColor: c.iconColor,
                    ageRange: c.ageRange,
                  });
                });
                showToast("All 6 courses added — bundle pricing applied!", "success");
              }}
              className="border border-[#60a5fa]/40 text-[#60a5fa] hover:bg-[#60a5fa] hover:text-black px-10 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
            >
              Get All 6 — $59 Bundle
            </button>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Volunteer Registration Modal */}
      <FitForProfitVolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />
    </div>
  );
}
