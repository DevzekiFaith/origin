"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Quote, Sparkles } from "lucide-react";
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

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-b border-[#E8E8E3] text-[#121316]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div>
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F3F3EE] border border-[#E2E2DC] rounded-full text-xs font-mono text-[#52525B]">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="uppercase tracking-wider font-semibold">Verified Student Experiences</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121316]">
                What Our Learners Say
              </h2>
              <p className="text-base text-[#52525B] leading-relaxed">
                Real accounts from learners who have transformed how they think, decide, and build.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {testimonials.slice(0, 6).map((testimonial, index) => (
                <div
                  key={testimonial.id || index}
                  className="bg-[#FFFFFF] rounded-3xl p-7 border border-[#E8E8E3] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between"
                >
                  <div>
                    {/* Stars + Quote */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-500 text-amber-500"
                          />
                        ))}
                      </div>
                      <Quote className="w-4 h-4 text-[#A1A1AA]" />
                    </div>

                    {/* Review Text */}
                    <p className="text-sm text-[#3F3F46] leading-relaxed mb-6 font-normal">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* User Info */}
                  <div className="pt-4 border-t border-[#F0F0EB] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#121316] text-sm flex items-center gap-2">
                        <span>{testimonial.name}</span>
                        {testimonial.id && (
                          <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded uppercase font-mono font-semibold">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#71717A] mt-0.5 font-mono">
                        {testimonial.age ? `Age ${testimonial.age} • ` : ""}{testimonial.course}
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-[#F3F3EE] border border-[#E2E2DC] rounded-full flex items-center justify-center text-xs font-bold text-[#121316]">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
