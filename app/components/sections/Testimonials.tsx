"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Quote, Sparkles, ArrowRight, CheckCircle2, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id: string;
  number: string;
  category: string;
  name: string;
  age: string;
  course: string;
  headline: string;
  text: string;
  rating: number;
  metricNumber: string;
  metricLabel: string;
  image: string;
  tags: { icon: string; label: string }[];
  badge: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "adebayo",
    number: "01",
    category: "01 // Enterprise Growth",
    name: "Adebayo O.",
    age: "31",
    course: "Economic Principles & Solution Mindset",
    headline: "From Panic Decisions to ₦1.8M Consultancy Retainers",
    text: "Before Origin: I was stuck in reactive mode—decisions made out of panic, not calculation. The frameworks on Scarcity and Opportunity Cost completely rewired how I allocate capital and time. Within 3 months I launched my enterprise consultancy and closed ₦1.8M in retainers.",
    rating: 5,
    metricNumber: "₦1.8M",
    metricLabel: "Retainers closed within 3 months",
    image: "/images/testimonial_adebayo.jpg",
    tags: [
      { icon: "⚡", label: "Opportunity Cost" },
      { icon: "🏛️", label: "Consultancy Launch" },
      { icon: "🎯", label: "Capital Allocation" },
    ],
    badge: "Result ★ ₦1.8M",
  },
  {
    id: "chinedu",
    number: "02",
    category: "02 // Freelance Execution",
    name: "Chinedu K.",
    age: "26",
    course: "Solution Mindset Masterclass",
    headline: "From Freeze Under Pressure to ₦500k Contract",
    text: "I used to freeze under pressure. I'd overthink every problem until the opportunity passed. The Solution Mindset course gave me a systematic framework I now apply daily—in my job, in negotiations, in life. I closed my first freelance contract worth ₦500k within 6 weeks.",
    rating: 5,
    metricNumber: "₦500k",
    metricLabel: "First contract closed in 6 weeks",
    image: "/images/testimonial_chinedu.jpg",
    tags: [
      { icon: "💡", label: "Solution Mindset" },
      { icon: "🤝", label: "Negotiations" },
      { icon: "⚡", label: "6-Week Execution" },
    ],
    badge: "Friction ★ 0%",
  },
  {
    id: "amara",
    number: "03",
    category: "03 // Executive Leadership",
    name: "Amara N.",
    age: "34",
    course: "Communication & Leadership",
    headline: "From Passed Over to Heading a 12-Person Team",
    text: "I was consistently passed over for leadership roles despite my technical skills. After the Communication masterclass, I restructured how I present ideas and lead meetings. Three months later, I was heading a 12-person cross-functional team.",
    rating: 5,
    metricNumber: "12-Person",
    metricLabel: "Cross-functional team leadership",
    image: "/images/testimonial_amara.jpg",
    tags: [
      { icon: "🗣️", label: "Executive Presence" },
      { icon: "👑", label: "Leadership Role" },
      { icon: "📈", label: "Promoted" },
    ],
    badge: "Impact ★ Promoted",
  },
  {
    id: "tobi",
    number: "04",
    category: "04 // Youth Capability & Mindset",
    name: "Tobi A.",
    age: "12",
    course: "Economic Principles for Youth & Self-Image",
    headline: "From Hesitant Student to Top Debater & Decision Maker",
    text: "At 12 years old, I used to struggle to express my ideas in class. The Economic Principles course explained scarcity and choice in simple terms without confusing academic jargon. I now lead my school debate team and make confident daily decisions.",
    rating: 5,
    metricNumber: "Age 12",
    metricLabel: "Junior Debate Leader & Top Scholar",
    image: "/outreach_child_hero.png",
    tags: [
      { icon: "🇳🇬", label: "Nigerian Youth" },
      { icon: "🎓", label: "Age 12 Scholar" },
      { icon: "✨", label: "Clear Thinking" },
    ],
    badge: "Age ★ 12 Years",
  },
  {
    id: "fatima",
    number: "05",
    category: "05 // Strategic Multi-Tasking",
    name: "Fatima S.",
    age: "27",
    course: "Decision-Making Masterclass",
    headline: "From Paralysis to Running 3 Businesses Simultaneously",
    text: "Before: paralysis. I'd spend weeks on decisions that needed days. The Decision-Making frameworks gave me a repeatable system—I now run 3 businesses simultaneously because I stopped second-guessing and started executing.",
    rating: 5,
    metricNumber: "3",
    metricLabel: "Simultaneous businesses running",
    image: "/images/testimonial_fatima.jpg",
    tags: [
      { icon: "🚀", label: "3 Businesses" },
      { icon: "⚙️", label: "Systematic Decisions" },
      { icon: "⚡", label: "Rapid Execution" },
    ],
    badge: "Speed ★ 3x",
  },
  {
    id: "emmanuel",
    number: "06",
    category: "06 // Resilience & Pivot",
    name: "Emmanuel I.",
    age: "33",
    course: "Personal Adaptability",
    headline: "From Corporate Layoff to 2 Thriving Income Streams",
    text: "I lost my corporate job in 2025 and was completely shattered. The Adaptability course reframed change from a threat to a tool. Six months later I have two thriving income streams and my most productive year on record.",
    rating: 5,
    metricNumber: "2",
    metricLabel: "Thriving new income streams",
    image: "/images/testimonial_emmanuel.jpg",
    tags: [
      { icon: "🔄", label: "Adaptability" },
      { icon: "🌱", label: "2 Income Streams" },
      { icon: "🏆", label: "Peak Productivity" },
    ],
    badge: "Resilience ★ 100%",
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch live reviews from Supabase if available
  useEffect(() => {
    const fetchLiveReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(6);

        if (data && data.length > 0) {
          const formattedReviews: Testimonial[] = data.map((r: any, idx: number) => ({
            id: r.id || `live-${idx}`,
            number: `0${idx + 1}`,
            category: `0${idx + 1} // Verified Learner`,
            name: r.name,
            age: r.age || "Verified",
            course: r.course || "Origin Foundation Course",
            headline: r.headline || `Transformation Story by ${r.name}`,
            text: r.text || r.comment,
            rating: r.rating || 5,
            metricNumber: r.metricNumber || "100%",
            metricLabel: r.metricLabel || "Learner transformation",
            image: DEFAULT_TESTIMONIALS[idx % DEFAULT_TESTIMONIALS.length].image,
            tags: [
              { icon: "🎓", label: "Verified Learner" },
              { icon: "⭐", label: "5.0 Rating" },
              { icon: "✨", label: "Real Application" },
            ],
            badge: "Rating ★ 5.0",
          }));

          setTestimonials(formattedReviews);
        }
      } catch (err) {
        console.warn("Could not fetch live reviews from Supabase:", err);
      }
    };

    fetchLiveReviews();
  }, []);

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
    <section className="py-20 sm:py-32 bg-[#FAFAF8] border-b border-[#E8E8E3] text-[#121316] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Clean Canvas Showcase Container matching sample screenshot */}
        <div
          className="bg-white rounded-[2.5rem] border border-[#EAEAE5] shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-6 sm:p-10 lg:p-14 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Header Bar: Eyebrow Label & Learner Switcher Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#F0F0EB]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF9F5] border border-[#E6E6E0] rounded-full text-xs font-mono text-[#52525B] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span className="uppercase tracking-wider font-semibold">WHAT OUR LEARNERS SAY</span>
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
                        ? "bg-[#121316] text-white shadow-md"
                        : "bg-[#F4F4F0] text-[#71717A] hover:bg-[#EAEAE5] hover:text-[#121316]"
                    }`}
                  >
                    <span className="font-bold">{item.number}</span>
                    <span className="opacity-90">{item.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Showcase Layout matching sample screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[380px]">
              <div>
                {/* Category Subhead Tag */}
                <div className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>{currentItem.category}</span>
                  <span>•</span>
                  <span className="text-[#71717A]">{currentItem.course}</span>
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
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121316] tracking-tight leading-[1.18]">
                      "{currentItem.headline}"
                    </h2>

                    {/* Quote Text */}
                    <p className="text-base sm:text-lg text-[#52525B] leading-relaxed font-light max-w-xl">
                      {currentItem.text}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Capsule Slider Dot Indicator Bar (Sample UI: [ ━━ • • • • • ]) */}
                <div className="mt-8 mb-10 inline-flex items-center gap-2 p-1.5 bg-[#F4F4F0] border border-[#E5E5E0] rounded-full shadow-inner">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Go to testimonial ${idx + 1}`}
                      className={`transition-all duration-300 cursor-pointer ${
                        activeIndex === idx
                          ? "w-8 h-2.5 bg-[#121316] rounded-full"
                          : "w-2.5 h-2.5 bg-[#CBD5E1] hover:bg-[#94A3B8] rounded-full"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Left Metric Display */}
              <div className="pt-6 border-t border-[#F0F0EB]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id || activeIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="text-5xl sm:text-6xl font-extrabold text-[#121316] font-mono tracking-tight">
                      {currentItem.metricNumber}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-[#71717A] mt-1.5 uppercase tracking-wider">
                      {currentItem.metricLabel}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Media Card Showcase (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#121316] shadow-xl group border border-[#E0E0DB]">
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

                    {/* Gradient Overlay for Top/Bottom Glass Cards */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50" />

                    {/* Top Overlay Badge (Glassmorphic Box matching Sample Image) */}
                    <div className="absolute top-6 left-6 max-w-sm">
                      <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-white shadow-xl">
                        <div className="flex items-center gap-2">
                          <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight">
                            {currentItem.name}
                          </span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-md uppercase font-mono font-medium">
                            Verified
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-300 font-light mt-1 flex items-center gap-1.5">
                          <span>→ {currentItem.course}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Floating Pill Badges Row (Matching Sample Image Bottom Overlay) */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-2 z-10">
                      {/* Left Pill Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        {currentItem.tags.map((tag, i) => (
                          <div
                            key={i}
                            className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-sm"
                          >
                            <span>{tag.icon}</span>
                            <span>{tag.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Right Rating / Result Score Badge */}
                      <div className="bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{currentItem.badge}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="mt-12 pt-8 border-t border-[#F0F0EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#71717A] font-light">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Verified accounts from learners across Nigeria and international markets.</span>
            </div>

            <Link
              href="/courses"
              className="px-6 py-3 rounded-xl bg-[#121316] hover:bg-amber-600 text-white text-xs sm:text-sm font-mono font-bold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer shrink-0"
            >
              <span>EXPLORE ALL COURSES & REVIEWS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

