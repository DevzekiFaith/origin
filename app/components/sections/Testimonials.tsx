"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Quote, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id?: string;
  name: string;
  age?: string;
  course: string;
  text: string;
  rating: number;
}

interface IdentityPillar {
  letter: string;
  word: string;
  tagline: string;
  description: string;
}

const IDENTITY_PILLARS: IdentityPillar[] = [
  {
    letter: "A",
    word: "PRACTICAL",
    tagline: "Real-world situations over abstract theory",
    description: "Learn through real situations, decisions and experiences rather than memorisation.",
  },
  {
    letter: "C",
    word: "CURIOUS",
    tagline: "Inquiry-first learning engine",
    description: "Start with questions, not predetermined answers.",
  },
  {
    letter: "T",
    word: "APPLIED",
    tagline: "Execution in daily reality",
    description: "Turn ideas into decisions, action and real-world understanding.",
  },
  {
    letter: "F",
    word: "FOUNDATIONAL",
    tagline: "Enduring mental models",
    description: "Build knowledge and thinking skills that remain useful beyond the course.",
  },
  {
    letter: "E",
    word: "EXPERIENTIAL",
    tagline: "The Unconventional Learning Loop",
    description: "Think. Choose. Discover. Apply.",
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    name: "Adebayo O.",
    age: "31",
    course: "Economic Principles & Solution Mindset",
    text: "Before Origin: I was stuck in reactive mode—decisions made out of panic, not calculation. The frameworks on Scarcity and Opportunity Cost completely rewired how I allocate capital and time. Within 3 months I launched my enterprise consultancy and closed ₦1.8M in retainers.",
    rating: 5,
  },
  {
    name: "Chinedu K.",
    age: "26",
    course: "Solution Mindset Masterclass",
    text: "I used to freeze under pressure. I'd overthink every problem until the opportunity passed. The Solution Mindset course gave me a systematic framework I now apply daily—in my job, in negotiations, in life. I closed my first freelance contract worth ₦500k within 6 weeks.",
    rating: 5,
  },
  {
    name: "Amara N.",
    age: "34",
    course: "Communication & Leadership",
    text: "I was consistently passed over for leadership roles despite my technical skills. After the Communication masterclass, I restructured how I present ideas and lead meetings. Three months later, I was heading a 12-person cross-functional team.",
    rating: 5,
  },
  {
    name: "Tobi A.",
    age: "29",
    course: "8 Ways to Strengthen Self-Image",
    text: "I had serious imposter syndrome. I undersold myself in every negotiation. The Self-Image course dismantled the beliefs that were keeping me small. I renegotiated my compensation—40% increase—and started speaking publicly with unshakeable conviction.",
    rating: 5,
  },
  {
    name: "Fatima S.",
    age: "27",
    course: "Decision-Making Masterclass",
    text: "Before: paralysis. I'd spend weeks on decisions that needed days. The Decision-Making frameworks gave me a repeatable system—I now run 3 businesses simultaneously because I stopped second-guessing and started executing.",
    rating: 5,
  },
  {
    name: "Emmanuel I.",
    age: "33",
    course: "Personal Adaptability",
    text: "I lost my corporate job in 2025 and was completely shattered. The Adaptability course reframed change from a threat to a tool. Six months later I have two thriving income streams and my most productive year on record.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [activePillar, setActivePillar] = useState<string>("A");

  useEffect(() => {
    const fetchLiveReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        if (data && data.length > 0) {
          const formattedReviews: Testimonial[] = data.map((r: any) => ({
            id: r.id,
            name: r.name,
            course: r.course || "Origin Foundation Course",
            text: r.text || r.comment,
            rating: r.rating || 5,
            age: r.age || "Verified Learner",
          }));

          setTestimonials((prev) => {
            const combined = [...formattedReviews, ...defaultTestimonials];
            return combined.filter(
              (item, index, self) =>
                index === self.findIndex((t) => t.text === item.text)
            );
          });
        }
      } catch (err) {
        console.warn("Could not fetch live reviews from Supabase:", err);
      }
    };

    fetchLiveReviews();
  }, []);

  const currentPillarData = IDENTITY_PILLARS.find((p) => p.letter === activePillar) || IDENTITY_PILLARS[0];

  return (
    <section className="py-24 sm:py-36 bg-[#FAFAF8] border-b border-[#E8E8E3] text-[#121316] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big Responsive Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-24 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFFFFF] border border-[#E2E2DC] rounded-full text-xs sm:text-sm font-mono text-[#52525B] shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
            <span className="uppercase tracking-wider font-bold">VERIFIED LEARNER EXPERIENCES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#121316] leading-[1.08]">
            What Our Learners Say
          </h2>

          <p className="text-lg sm:text-2xl text-[#52525B] font-light leading-relaxed max-w-3xl mx-auto pt-2">
            Real accounts from learners who transformed how they think, make high-stakes choices, and execute in the real world.
          </p>
        </motion.div>

        {/* Responsive Grid with Framer Motion cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{
                y: -6,
                scale: 1.015,
                boxShadow: "0 24px 50px rgba(0,0,0,0.06)",
                transition: { duration: 0.25 }
              }}
              className="bg-[#FFFFFF] rounded-3xl p-7 sm:p-9 border border-[#E8E8E3] shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col justify-between group hover:border-amber-400/60 transition-all"
            >
              <div className="space-y-4">
                {/* Stars + Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-zinc-300 group-hover:text-amber-500 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-base sm:text-lg text-[#27272A] leading-relaxed font-normal">
                  "{testimonial.text}"
                </p>
              </div>

              {/* User Info / Verified Badge */}
              <div className="pt-6 mt-6 border-t border-[#F0F0EB] flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[#121316] text-base sm:text-lg font-medium flex items-center gap-2">
                    <span className="truncate">{testimonial.name}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md uppercase font-mono font-medium shrink-0">
                      Verified
                    </span>
                  </div>
                  <div className="text-xs text-[#71717A] mt-1 font-mono truncate font-normal">
                    {testimonial.age ? `Age ${testimonial.age} • ` : ""}{testimonial.course}
                  </div>
                </div>

                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-zinc-900 text-white rounded-full flex items-center justify-center text-sm font-medium shrink-0 border border-zinc-800 shadow-xs font-mono">
                  {testimonial.name.charAt(0)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NON-NUMERIC ORIGIN IDENTITY SYSTEM: THE A C T F E PILLARS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 md:p-14 rounded-3xl bg-[#FFFFFF] border border-[#E2E2DC] shadow-[0_16px_50px_rgba(0,0,0,0.03)] relative overflow-hidden"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-medium">
              THE ORIGIN STANDARD
            </span>
            <h3 className="text-2xl sm:text-4xl font-semibold text-[#121316] tracking-tight">
              Built on Value & Thinking Architecture
            </h3>
            <p className="text-sm sm:text-base text-[#52525B] font-light">
              Origin does not measure credibility through artificial numbers. Our standard is defined by the depth and character of the learning experience.
            </p>
          </div>

          {/* Interactive A C T F E Letter Row */}
          <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-8">
            {IDENTITY_PILLARS.map((pillar) => {
              const isSelected = activePillar === pillar.letter;
              return (
                <button
                  key={pillar.letter}
                  onClick={() => setActivePillar(pillar.letter)}
                  onMouseEnter={() => setActivePillar(pillar.letter)}
                  className={`p-3 sm:p-5 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#121316] text-white border-[#121316] shadow-md scale-105"
                      : "bg-[#FAFAF8] text-[#52525B] border-[#E8E8E3] hover:border-[#121316] hover:bg-white"
                  }`}
                >
                  <span className={`text-2xl sm:text-4xl md:text-5xl font-normal font-mono tracking-tight leading-none mb-1 ${
                    isSelected ? "text-amber-400" : "text-[#121316]"
                  }`}>
                    {pillar.letter}
                  </span>
                  <span className="text-[9px] sm:text-xs font-mono uppercase tracking-wider font-normal truncate w-full">
                    {pillar.word}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Pillar Detail Reveal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPillarData.letter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E3] text-center space-y-3 mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-medium text-amber-800 uppercase">
                <span>{currentPillarData.letter} — {currentPillarData.word}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-medium text-[#121316]">
                {currentPillarData.tagline}
              </h4>
              <p className="text-sm sm:text-base text-[#3F3F46] max-w-2xl mx-auto leading-relaxed font-light">
                {currentPillarData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Concise Closing Statement & Direct Action */}
          <div className="pt-6 border-t border-[#F0F0EB] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <p className="text-sm sm:text-base text-[#52525B] font-light max-w-xl italic font-serif">
              “Learning designed to help you think better, make better decisions and apply what you learn to real life.”
            </p>
            <Link
              href="/courses/economic-principles"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#121316] text-[#FFFFFF] text-xs sm:text-sm font-mono font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0 cursor-pointer"
            >
              <span>EXPLORE EXPERIENCES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
