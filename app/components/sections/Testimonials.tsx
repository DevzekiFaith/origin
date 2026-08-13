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
    text: "Before Origin: I was stuck in reactive mode — decisions made out of fear, not clarity. After the JUMPSTART Accelerator, I restructured my daily habits around Perception, Value, and Execution. Within 3 months I got promoted to team lead and finally launched the side project I'd shelved for 2 years.",
    rating: 5,
  },
  {
    name: "Chinedu K.",
    age: "26",
    course: "Solution Mindset Masterclass",
    text: "I used to freeze under pressure. I'd overthink every problem until the opportunity passed. The Solution Mindset course gave me a systematic framework I now apply daily — in my job, in negotiations, in life. I closed my first freelance contract worth ₦500k within 6 weeks of finishing the course.",
    rating: 5,
  },
  {
    name: "Amara N.",
    age: "34",
    course: "Communication & Leadership",
    text: "I was consistently passed over for leadership roles despite my technical skills. After the Communication masterclass, I restructured how I present ideas and lead meetings. Three months later, I was heading a 12-person cross-functional team. The active listening frameworks alone changed everything.",
    rating: 5,
  },
  {
    name: "Tobi A.",
    age: "29",
    course: "8 Ways to Strengthen Self-Image",
    text: "I had serious imposter syndrome. I undersold myself in every negotiation and avoided visibility. The Self-Image course dismantled the beliefs that were keeping me small. I renegotiated my salary — 40% increase — and started speaking publicly. This was the ROI I never expected from a $14 course.",
    rating: 5,
  },
  {
    name: "Fatima S.",
    age: "27",
    course: "Decision-Making Masterclass",
    text: "Before: paralysis. I'd spend weeks on decisions that needed days. The Decision-Making frameworks gave me a repeatable system — I now run 3 businesses simultaneously because I stopped second-guessing and started executing. The frameworks are so practical they feel like cheating.",
    rating: 5,
  },
  {
    name: "Emmanuel I.",
    age: "33",
    course: "Personal Adaptability",
    text: "I lost my corporate job in 2025 and was completely shattered. The Adaptability course reframed change from a threat to a tool. Six months later I have two income streams, a growing network, and my most productive year on record. Origin gave me the architecture when everything fell apart.",
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

            {/* Institute Credentials Block */}
            <AnimatedSection delay={280}>
              <div className="bg-gradient-to-r from-[#0b1628] to-[#0e1a30] border border-[#60a5fa]/20 rounded-2xl p-6 sm:p-8 mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#60a5fa]/10 border border-[#60a5fa]/20 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/origin.png" alt="The Becoming Institute" className="w-full h-full object-cover rounded-2xl" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-white font-black text-base">The Becoming Institute</h3>
                    <span className="text-[9px] bg-[#60a5fa]/15 text-[#60a5fa] border border-[#60a5fa]/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Verified Institute</span>
                  </div>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-2xl">
                    Nigeria&apos;s leading human architecture institute — building practical education for problem-solving, decision-making, communication, and self-mastery. Creators of the JUMPSTART Accelerator, Fit-For-Profit Workshop, and 6 core masterclasses used by 25,000+ students across Africa.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5"><span className="text-[#60a5fa] font-bold">25,000+</span> students</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span className="flex items-center gap-1.5"><span className="text-[#60a5fa] font-bold">6</span> masterclasses</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span className="flex items-center gap-1.5"><span className="text-[#60a5fa] font-bold">4.9★</span> avg rating</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span>origin.com.ng</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Compact CTA & QR Code Card */}
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
