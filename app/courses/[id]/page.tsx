"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  BookOpen,
  Flame,
  ArrowLeft,
  Sparkles,
  Calendar,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { getCourseById } from "../../data/courses";
import { motion } from "framer-motion";

export default function CourseDetailPage() {
  const params = useParams();
  const idStr = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const course = getCourseById(idStr || "");

  const title = course ? course.title : "Curriculum Under Re-Evaluation";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white pt-28 sm:pt-36 pb-20 px-4 relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
      {/* Living Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-white/15 blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-center sm:justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* Status Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono text-white mb-6 shadow-sm font-bold"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "7s" }} />
          <span className="uppercase tracking-wider">CURRICULUM UNDER RE-EVALUATION</span>
        </motion.div>

        {/* Course Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white mb-4 tracking-tight leading-tight"
        >
          {title}
        </motion.h1>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/90 text-xs sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-10"
        >
          Direct enrollment for this foundational experience is temporarily paused while we re-evaluate and upgrade our thinking simulations, experiential dilemmas, and reading companion frameworks.
        </motion.p>

        {/* Active Alternatives Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-[#E2E8DE] rounded-3xl border border-[#D5DDCF] text-[#172217] shadow-2xl p-6 sm:p-8 text-left mb-8 space-y-6"
        >
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#D0D9CA]">
            <Sparkles className="w-5 h-5 text-[#1C3B34]" />
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#172217]">
              Active Ways to Engage With Origin Right Now
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Origin Challenges Arena */}
            <Link
              href="/#origin-challenges"
              className="p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#CCD6C6] hover:border-[#1C3B34] transition-all group shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#1C3B34] uppercase">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Decision Engine</span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#172217] group-hover:text-[#1C3B34] transition-colors">
                  Challenges Arena
                </h3>
                <p className="text-xs text-[#4E5B4B] leading-relaxed">
                  Real dilemmas with time pressure and trade-offs. Test your decision architecture under fire.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-bold text-[#1C3B34] flex items-center gap-1">
                <span>Enter Arena</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 2. Published Literature & Books */}
            <Link
              href="/store"
              className="p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#CCD6C6] hover:border-[#1C3B34] transition-all group shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#1C3B34] uppercase">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Published Literature</span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#172217] group-hover:text-[#1C3B34] transition-colors">
                  Store &amp; Reading Companions
                </h3>
                <p className="text-xs text-[#4E5B4B] leading-relaxed">
                  Explore original books like Money Farming, House of Choice, Deep-Remake, and more.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-bold text-[#1C3B34] flex items-center gap-1">
                <span>Browse Store</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 3. The ₦20,000 Starting Decision */}
            <Link
              href="/#origin-challenge"
              className="p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#CCD6C6] hover:border-[#1C3B34] transition-all group shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#1C3B34] uppercase">
                  <Compass className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Interactive Dilemma</span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#172217] group-hover:text-[#1C3B34] transition-colors">
                  The ₦20,000 Challenge
                </h3>
                <p className="text-xs text-[#4E5B4B] leading-relaxed">
                  Experience Origin&apos;s interactive decision engine with immediate analytical feedback.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-bold text-[#1C3B34] flex items-center gap-1">
                <span>Start Challenge</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 4. Live Events & Impact Corps */}
            <Link
              href="/events"
              className="p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#CCD6C6] hover:border-[#1C3B34] transition-all group shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#1C3B34] uppercase">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  <span>In-Person Cohorts</span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#172217] group-hover:text-[#1C3B34] transition-colors">
                  Workshops &amp; Outreaches
                </h3>
                <p className="text-xs text-[#4E5B4B] leading-relaxed">
                  Join in-person sessions hosted across Lagos, Abuja, Uyo, and regional chapters.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-bold text-[#1C3B34] flex items-center gap-1">
                <span>View Schedule</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D0D9CA]">
            <div className="flex items-center gap-2 text-xs text-[#4E5B4B]">
              <ShieldCheck className="w-4 h-4 text-[#1C3B34]" />
              <span>Registered purchasers maintain uninterrupted access in their account.</span>
            </div>
            <Link
              href="/purchases"
              className="text-xs font-mono font-bold text-[#1C3B34] hover:underline"
            >
              Access My Purchases →
            </Link>
          </div>
        </motion.div>

        {/* Bottom CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/store"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#1C3B34] hover:bg-[#152e29] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <span>Explore Literature &amp; Books</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/courses"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider border border-white/20 transition-all text-center"
          >
            Curriculum Status
          </Link>
        </div>
      </div>
    </div>
  );
}
