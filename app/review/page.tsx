"use client";

import { useState } from "react";
import { Star, CheckCircle2, ChevronLeft, AlertCircle, MessageSquareQuote, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "../components/ui/AnimatedSection";
import { supabase } from "../../lib/supabase";

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      setErrorMsg("Please select a star rating before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const course = formData.get("course") as string;
    const text = formData.get("review") as string;

    try {
      const { error } = await supabase
        .from("reviews")
        .insert([
          {
            name,
            course,
            text,
            rating,
          },
        ]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error submitting review:", error);
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0b1220] flex flex-col items-center justify-center p-4 relative overflow-hidden text-white">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#60a5fa]/10 rounded-full blur-3xl pointer-events-none"></div>

        <AnimatedSection>
          <div className="max-w-md w-full bg-[#0e1624]/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 text-center border border-white/10 relative z-10">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">Thank You!</h2>
            <p className="text-zinc-400 mb-8 text-base font-light leading-relaxed">
              Your feedback has been saved successfully. Thank you for contributing to our learning community!
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full bg-white text-black hover:bg-zinc-200 rounded-xl py-3.5 px-6 font-bold text-sm transition-all duration-200 shadow-lg hover:scale-[1.02]"
            >
              Return to Homepage
            </Link>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1220] py-12 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden flex flex-col justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#60a5fa]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto w-full relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center text-xs font-semibold text-zinc-400 hover:text-white mb-6 transition-colors tracking-wider uppercase group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 text-zinc-500 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        <div className="bg-[#0e1624]/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/10 relative">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-300 font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
              Official Feedback Form
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Share Your Experience</h1>
            <p className="text-zinc-400 text-sm font-light mt-1.5">
              Your feedback helps shape the future of The Becoming Institute.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Interactive Rating */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 text-center space-y-2">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-widest">
                Overall Experience Rating
              </label>
              <div className="flex items-center justify-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110 p-1"
                  >
                    <Star
                      className={`w-9 h-9 ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                          : "text-zinc-600"
                      } transition-all duration-200`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm"
                  placeholder="e.g. Adebayo Okonjo"
                />
              </div>

              <div>
                <label htmlFor="course" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  Course / Program
                </label>
                <select
                  id="course"
                  name="course"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl bg-[#080c16] border border-white/10 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm cursor-pointer"
                >
                  <option value="" disabled className="text-zinc-500">Select the program you completed...</option>
                  <option value="JUMPSTART Accelerator">JUMPSTART Accelerator</option>
                  <option value="Solution Mindset Masterclass">Solution Mindset Masterclass</option>
                  <option value="Communication & Leadership">Communication & Leadership</option>
                  <option value="Character & Value Alignment">Character & Value Alignment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="review" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  Your Detailed Review
                </label>
                <textarea
                  id="review"
                  name="review"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm leading-relaxed resize-none"
                  placeholder="Write a few sentences about how the course changed your mindset, skills, or daily execution..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-black font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                isSubmitting
                  ? "bg-zinc-500 cursor-not-allowed opacity-50"
                  : "bg-white hover:bg-zinc-200 hover:scale-[1.01]"
              }`}
            >
              {isSubmitting ? (
                <span>Saving Review...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Live Review</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
