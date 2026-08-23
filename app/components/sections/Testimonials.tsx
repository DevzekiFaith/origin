"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Quote,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Building2,
  Target,
  Lightbulb,
  Globe,
  GraduationCap,
  RefreshCw,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id: string;
  number: string;
  category: string;
  name: string;
  location: string;
  experience: string;
  headline: string;
  text: string;
  image: string;
  tags: { icon: React.ElementType; label: string }[];
  takeaway: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "adebayo",
    number: "01",
    category: "01 // Capital & Time Allocation",
    name: "Adebayo O.",
    location: "Lagos, Nigeria",
    experience: "Economic Principles & Solution Mindset",
    headline: "From Reactive Panic to Deliberate Opportunity Calculation",
    text: "Before Origin, I was constantly stuck in reactive mode—decisions made out of panic rather than strategic calculation. The framework on Scarcity and Opportunity Cost completely rewired how I allocate capital, choose client commitments, and value my time.",
    image: "/images/testimonial_adebayo.jpg",
    tags: [
      { icon: Zap, label: "Opportunity Cost" },
      { icon: Target, label: "Capital Allocation" },
      { icon: Building2, label: "Composure" },
    ],
    takeaway: "Calculates the hidden cost of every commitment",
  },
  {
    id: "chinedu",
    number: "02",
    category: "02 // Problem Decomposition",
    name: "Chinedu K.",
    location: "Abuja, Nigeria",
    experience: "Problem Solving: The Solution Mindset",
    headline: "Breaking Free from Overthinking and Decision Paralysis",
    text: "I used to overthink every friction point until the opportunity passed. Learning to separate root causes from distracting surface symptoms gave me a repeatable method I now apply daily in negotiations and team projects.",
    image: "/images/testimonial_chinedu.jpg",
    tags: [
      { icon: Lightbulb, label: "Root Cause Diagnosis" },
      { icon: Compass, label: "Execution" },
      { icon: Target, label: "Clarity" },
    ],
    takeaway: "Deconstructs complex bottlenecks systematically",
  },
  {
    id: "amara",
    number: "03",
    category: "03 // Communication & Intent",
    name: "Amara N.",
    location: "Port Harcourt, Nigeria",
    experience: "Communication Mastery",
    headline: "Listening for Underlying Intent Rather Than Waiting to Reply",
    text: "The communication frameworks completely restructured how I present proposals and lead collaborative discussions. Instead of speaking louder, I learned to decode intent and craft clarity that prevents misunderstandings.",
    image: "/images/testimonial_amara.jpg",
    tags: [
      { icon: Globe, label: "Intent Decoding" },
      { icon: Building2, label: "Team Alignment" },
      { icon: Sparkles, label: "Clarity" },
    ],
    takeaway: "Communicates with structured clarity under pressure",
  },
  {
    id: "tobi",
    number: "04",
    category: "04 // Youth Reasoning & Choice",
    name: "Tobi A.",
    location: "Ibadan, Nigeria",
    experience: "Economic Principles for Young Minds",
    headline: "Learning to See Trade-Offs in Daily Decisions at Age 14",
    text: "School teaches economics with abstract formulas and textbook definitions. Origin used real situations like the ₦20,000 challenge to show me that every time I choose one thing, I am giving up another. It completely changed how I think about my daily choices.",
    image: "/outreach_child_hero.png",
    tags: [
      { icon: GraduationCap, label: "Young Mind" },
      { icon: Sparkles, label: "Practical Reasoning" },
      { icon: Target, label: "Trade-Offs" },
    ],
    takeaway: "Evaluates sacrifices before making choices",
  },
  {
    id: "fatima",
    number: "05",
    category: "05 // Consequence Analysis",
    name: "Fatima S.",
    location: "Kano, Nigeria",
    experience: "Decision Making Under Pressure",
    headline: "Second-Order Consequence Calculation Over Gut Instinct",
    text: "I used to spend weeks second-guessing choices. The mental models on inversion and consequence calculation gave me a reliable filter to evaluate risk calmly and execute with conviction.",
    image: "/images/testimonial_fatima.jpg",
    tags: [
      { icon: Target, label: "Mental Models" },
      { icon: Compass, label: "Inversion Thinking" },
      { icon: Zap, label: "Calm Conviction" },
    ],
    takeaway: "Eliminated chronic second-guessing",
  },
  {
    id: "emmanuel",
    number: "06",
    category: "06 // Adaptability & Antifragility",
    name: "Emmanuel I.",
    location: "Lagos, Nigeria",
    experience: "Personal Adaptability & Antifragility",
    headline: "Pivoting with Emotional Composure When Plans Collapse",
    text: "When unexpected market changes disrupted my primary project, the adaptability framework helped me reframe volatility as feedback. I rebuilt my routines and strategy without losing momentum or confidence.",
    image: "/images/testimonial_emmanuel.jpg",
    tags: [
      { icon: RefreshCw, label: "Adaptability" },
      { icon: Building2, label: "Resilience" },
      { icon: Zap, label: "Antifragile Pivot" },
    ],
    takeaway: "Transforms volatility into personal leverage",
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const currentItem = testimonials[activeIndex] || testimonials[0];

  return (
    <section id="learner-proof" className="py-24 sm:py-36 bg-gradient-to-b from-[#C2C4B4] via-[#B4B5A4] to-[#A8AA99] text-white border-b border-white/15 relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
      {/* Dynamic Animated Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-white/15 blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Clean Canvas Showcase Container */}
        <div
          className="bg-[#E2E8DE] rounded-[2.5rem] border border-[#D5DDCF] text-[#172217] shadow-2xl p-6 sm:p-10 lg:p-14 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Header Bar: Eyebrow Label & Learner Switcher Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#D0D9CA]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 border border-[#CCD6C6] rounded-full text-xs font-mono text-[#3E4A3B] shadow-2xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#1C3B34] animate-pulse" />
              <span className="uppercase tracking-wider">REAL LEARNER REFLECTIONS</span>
            </div>

            {/* Learner Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {testimonials.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id || idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-[#8A948B] text-white shadow-md scale-105 font-bold"
                        : "bg-white/80 text-[#3E4A3B] hover:bg-[#8A948B] hover:text-white border border-[#CBD4C7]"
                    }`}
                  >
                    <span className="font-bold">{item.number}</span>
                    <span className="opacity-90">{item.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Showcase Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[380px]">
              <div>
                {/* Category Subhead Tag */}
                <div className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>{currentItem.category}</span>
                </div>

                {/* Active Content Animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id || activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    {/* Main Headline */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172217] tracking-tight leading-[1.18]">
                      &ldquo;{currentItem.headline}&rdquo;
                    </h2>

                    {/* Quote Text */}
                    <p className="text-base sm:text-lg text-[#4E5B4B] leading-relaxed font-light max-w-xl">
                      {currentItem.text}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Capsule Slider Dot Indicator Bar */}
                <div className="mt-8 mb-10 inline-flex items-center gap-2 p-1.5 bg-white/60 border border-[#CCD6C6] rounded-full shadow-inner">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Go to testimonial ${idx + 1}`}
                      className={`transition-all duration-300 cursor-pointer ${
                        activeIndex === idx
                          ? "w-8 h-2.5 bg-[#1C3B34] rounded-full"
                          : "w-2.5 h-2.5 bg-[#CBD4C7] hover:bg-[#8A948B] rounded-full"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Left Outcome Display */}
              <div className="pt-6 border-t border-[#D0D9CA]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id || activeIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="text-xs font-mono uppercase tracking-wider text-[#1C3B34] font-bold">
                      TRANSFORMATION IN PRACTICE
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-[#172217] font-serif mt-1">
                      {currentItem.takeaway}
                    </div>
                    <div className="text-xs text-[#71717A] font-mono mt-1">
                      {currentItem.experience}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Media Card Showcase (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#121316] shadow-xl group border border-[#D5DDCF]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id || activeIndex}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={currentItem.image}
                      alt={currentItem.name}
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50" />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-6 left-6 max-w-sm">
                      <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-white shadow-xl">
                        <div className="flex items-center gap-2">
                          <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight">
                            {currentItem.name}
                          </span>
                          <span className="text-[10px] bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-md font-mono">
                            {currentItem.location}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-300 font-light mt-1 flex items-center gap-1.5">
                          <span>→ {currentItem.experience}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Floating Pill Badges Row */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-2 z-10">
                      <div className="flex flex-wrap items-center gap-2">
                        {currentItem.tags.map((tag: any, i: number) => {
                          const TagIcon = tag.icon;
                          return (
                            <div
                              key={i}
                              className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-sm"
                            >
                              {typeof TagIcon === "string" ? (
                                <span>{TagIcon}</span>
                              ) : TagIcon ? (
                                <TagIcon className="w-3.5 h-3.5 text-amber-400 stroke-[1.75]" />
                              ) : null}
                              <span>{tag.label}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                        <span>Genuine Reflection</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="mt-12 pt-8 border-t border-[#D0D9CA] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4E5B4B] font-light">
              <CheckCircle2 className="w-4 h-4 text-[#1C3B34] shrink-0" />
              <span>Authentic experiences and reflections from learners applying Origin in their daily lives.</span>
            </div>

            <Link
              href="/courses"
              className="px-6 py-3 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              <span>EXPLORE ALL EXPERIENCES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
