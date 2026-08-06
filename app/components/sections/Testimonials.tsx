"use client";

import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";
import { ArrowRight, QrCode, Star, Quote, Sparkles } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id?: string;
  name: string;
  age?: string;
  course: string;
  text: string;
  rating: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Adebayo O.",
    age: "31",
    course: "JUMPSTART Accelerator",
    text: "Origin changed my decision-making framework completely. The 3 core pillars (Perception, Value, Execution) helped align my core vision with actionable daily habits.",
    rating: 5,
  },
  {
    name: "Chinedu K.",
    age: "26",
    course: "Solution Mindset Masterclass",
    text: "The Solution Mindset masterclass gave me practical mental models I apply every single day. It's not just theory—it's a real blueprint for human architecture.",
    rating: 5,
  },
  {
    name: "Amara N.",
    age: "34",
    course: "Communication & Leadership",
    text: "This course transformed how I lead my team and handle high-pressure negotiations. The practical tools for clarity and active listening are unmatched.",
    rating: 5,
  },
  {
    name: "Tobi A.",
    age: "29",
    course: "Character & Value Alignment",
    text: "The blend of cognitive psychology and character building in Origin by The Becoming Institute is unlike any traditional course. Truly practical education for becoming.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [reviewUrl, setReviewUrl] = useState("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);

  const fetchLiveReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews from Supabase:", error);
        return;
      }

      if (data && data.length > 0) {
        const fetchedReviews: Testimonial[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          course: item.course,
          text: item.text,
          rating: item.rating || 5,
          age: item.age || "Student",
        }));

        setTestimonials([...fetchedReviews, ...defaultTestimonials]);
      }
    } catch (err) {
      console.error("Failed to load live reviews:", err);
    }
  };

  useEffect(() => {
    setReviewUrl("https://origin.com.ng/review");

    fetchLiveReviews();

    let channel: any = null;
    try {
      channel = supabase
        .channel("public:reviews")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "reviews" },
          (payload) => {
            const newReview: Testimonial = {
              id: payload.new.id,
              name: payload.new.name,
              course: payload.new.course,
              text: payload.new.text,
              rating: payload.new.rating || 5,
              age: payload.new.age || "Verified Learner",
            };

            setTestimonials((prev) => [newReview, ...prev]);
          }
        )
        .subscribe((status, err) => {
          if (err) {
            console.warn("Supabase review channel warning:", err);
          }
        });
    } catch (err) {
      console.warn("Realtime review subscription skipped:", err);
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-[#0b1220] border-t border-white/5 relative overflow-hidden text-white select-none">
      {/* Dynamic Animated Ambient Light Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-[#60a5fa]/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[7000ms]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[300px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[10000ms]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-[#60a5fa] tracking-wider uppercase backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#60a5fa] animate-spin-slow" />
                Verified Student Feedback
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                What Our Students Say
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
                Real stories from real learners who have transformed their mindset and careers.
              </p>
            </div>

            {/* Testimonials Grid with Hover & Motion Effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
              {testimonials.map((testimonial, index) => (
                <AnimatedSection key={testimonial.id || index} delay={index * 80}>
                  <div className="bg-[#0e1624]/90 backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-[#60a5fa]/40 transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(96,165,250,0.15)] flex flex-col h-full relative group transform hover:-translate-y-1.5 hover:scale-[1.01]">
                    
                    {/* Top Row: Stars + Animated Quote Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.3)] transition-transform duration-300 group-hover:scale-110" />
                        ))}
                      </div>
                      <Quote className="w-5 h-5 text-zinc-600 group-hover:text-[#60a5fa] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                    </div>
                    
                    {/* Review Text */}
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 flex-grow font-normal group-hover:text-white transition-colors duration-300">
                      "{testimonial.text}"
                    </p>
                    
                    {/* User Info */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                          <span>{testimonial.name}</span>
                          {testimonial.id && (
                            <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold animate-pulse">
                              Live Review
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-zinc-400 font-light mt-0.5">
                          {testimonial.age ? `Age ${testimonial.age} • ` : ""}{testimonial.course}
                        </div>
                      </div>
                      <div className="w-9 h-9 bg-white/10 border border-white/10 group-hover:bg-[#60a5fa]/20 group-hover:border-[#60a5fa]/40 rounded-full flex items-center justify-center text-sm font-bold text-white transition-all duration-300 group-hover:scale-105">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>

                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Compact CTA & QR Code Card with Pulsing Glow & Scan Animations */}
            <AnimatedSection delay={350}>
              <div className="max-w-2xl mx-auto bg-[#0e1624]/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 shadow-2xl transition-all duration-500 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:shadow-[0_0_35px_rgba(255,255,255,0.05)]">
                
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
                    <QrCode className="w-4 h-4 text-zinc-400 group-hover:text-[#60a5fa] transition-colors" />
                    Share Your Experience
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    Have you taken one of our courses? We'd love to hear how it impacted you. 
                    Scan the QR code with your mobile device or click below to leave a review instantly.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/review"
                      className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-md hover:scale-[1.03] group/btn"
                    >
                      <span>Write a Review</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
                
                {/* Animated QR Code Frame */}
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0 bg-white/5 p-3 rounded-xl border border-white/10 group-hover:border-[#60a5fa]/30 transition-colors duration-300 relative overflow-hidden">
                  {/* Subtle Scanline Animation */}
                  <div className="absolute inset-x-0 h-0.5 bg-[#60a5fa]/40 animate-pulse pointer-events-none"></div>

                  <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {reviewUrl ? (
                      <QRCode
                        value={reviewUrl}
                        size={84}
                        level="M"
                      />
                    ) : (
                      <div className="w-[84px] h-[84px] bg-gray-100 rounded-lg flex items-center justify-center animate-pulse">
                        <QrCode className="w-5 h-5 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-zinc-400 group-hover:text-white font-bold mt-0.5 transition-colors">
                    Scan to Review
                  </span>
                </div>

              </div>
            </AnimatedSection>
            
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
