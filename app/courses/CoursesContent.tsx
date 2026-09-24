"use client";

import Link from "next/link";
import {
  Compass,
  ArrowRight,
  BookOpen,
  Flame,
  Calendar,
  Users,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CoursesContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white pt-28 sm:pt-36 pb-20 px-4 relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
      {/* Dynamic Animated Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-white/15 blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono text-white mb-6 shadow-sm font-bold"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "6s" }} />
          <span className="uppercase tracking-wider">CURRICULUM UNDER RE-EVALUATION</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white mb-6 tracking-tight leading-tight"
        >
          Origin Foundations Are Being Upgraded
        </motion.h1>

        {/* Narrative Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/90 text-sm sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10"
        >
          We are currently re-evaluating and refining our 6 foundational courses to introduce more immersive experiential simulations, high-stakes decision scenarios, and tighter integration with our reading companions.
        </motion.p>

        {/* Main Card with Active Offerings */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-[#E2E8DE] rounded-3xl sm:rounded-[2.5rem] border border-[#D5DDCF] text-[#172217] shadow-2xl p-6 sm:p-10 text-left mb-12"
        >
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#D0D9CA]">
            <Sparkles className="w-5 h-5 text-[#1C3B34]" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#172217]">
              Active Ways to Experience Origin Today
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Challenges Arena */}
            <Link
              href="/#origin-challenges"
              className="p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#CCD6C6] hover:border-[#1C3B34] transition-all group shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#1C3B34] uppercase">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Interactive Simulations</span>
                </div>
                <h3 className="font-extrabold text-base text-[#172217] group-hover:text-[#1C3B34] transition-colors">
                  Origin Challenges Arena
                </h3>
                <p className="text-xs text-[#4E5B4B] leading-relaxed">
                  Real dilemmas with time constraints and trade-offs. Test your decision architecture under fire.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-bold text-[#1C3B34] flex items-center gap-1">
                <span>Enter Arena</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 2. Reading Companions */}
            <Link
              href="/store"
              className="p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#CCD6C6] hover:border-[#1C3B34] transition-all group shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#1C3B34] uppercase">
                  <BookOpen className="w-3.5 h-3.5 text-[#1C3B34]" />
                  <span>Books &amp; Manuscripts</span>
                </div>
                <h3 className="font-extrabold text-base text-[#172217] group-hover:text-[#1C3B34] transition-colors">
                  Store &amp; Reading Companions
                </h3>
                <p className="text-xs text-[#4E5B4B] leading-relaxed">
                  Access &ldquo;Money Farming&rdquo;, &ldquo;House of Choice&rdquo;, &ldquo;8 Q&amp;A to Selling&rdquo; and original manuscripts.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-bold text-[#1C3B34] flex items-center gap-1">
                <span>Explore Store</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 3. Live Events & Accelerators */}
            <Link
              href="/events"
              className="p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#CCD6C6] hover:border-[#1C3B34] transition-all group shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#1C3B34] uppercase">
                  <Calendar className="w-3.5 h-3.5 text-[#1C3B34]" />
                  <span>Intensive Cohorts</span>
                </div>
                <h3 className="font-extrabold text-base text-[#172217] group-hover:text-[#1C3B34] transition-colors">
                  Events &amp; Workshops
                </h3>
                <p className="text-xs text-[#4E5B4B] leading-relaxed">
                  Join Jumpstart, POI Masterclass, and regional Fit For Profit live educational intensives.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-bold text-[#1C3B34] flex items-center gap-1">
                <span>View Schedule</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 4. Community & Mentoring */}
            <Link
              href="/community"
              className="p-5 rounded-2xl bg-white/80 hover:bg-white border border-[#CCD6C6] hover:border-[#1C3B34] transition-all group shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#1C3B34] uppercase">
                  <Users className="w-3.5 h-3.5 text-[#1C3B34]" />
                  <span>Peer Ecosystem</span>
                </div>
                <h3 className="font-extrabold text-base text-[#172217] group-hover:text-[#1C3B34] transition-colors">
                  Community &amp; Mentoring
                </h3>
                <p className="text-xs text-[#4E5B4B] leading-relaxed">
                  Connect with fellow practical thinkers, share insights, and participate in peer discussions.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-bold text-[#1C3B34] flex items-center gap-1">
                <span>Join Community</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-[#D0D9CA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#4E5B4B]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1C3B34] shrink-0" />
              <span>Purchased books and event tickets remain fully active in your purchases vault.</span>
            </div>
            <Link
              href="/purchases"
              className="font-bold text-[#1C3B34] hover:underline shrink-0"
            >
              View Purchases →
            </Link>
          </div>
        </motion.div>

        {/* Back Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all shadow-md"
        >
          <span>← Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
