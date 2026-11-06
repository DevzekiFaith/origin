"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Calendar,
  ArrowRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getNextCohortTargetDate, formatCohortDate, getNextQuarterlyOutreachDate } from "../../utils/event-dates";

interface MonthlyMasterclassPopupProps {
  autoOpenDelayMs?: number;
}

export default function MonthlyMasterclassPopup({
  autoOpenDelayMs = 3500,
}: MonthlyMasterclassPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    setMounted(true);
    const currentDate = new Date();
    setNow(currentDate);

    // Auto-resets every month: key is unique to the current calendar year & month
    const currentMonthKey = `origin_welcome_note_${currentDate.getFullYear()}_${currentDate.getMonth()}`;
    const isDismissed = sessionStorage.getItem(currentMonthKey);

    if (isDismissed === "true") {
      setHasDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, autoOpenDelayMs);

    return () => clearTimeout(timer);
  }, [autoOpenDelayMs]);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
    const currentDate = new Date();
    const currentMonthKey = `origin_welcome_note_${currentDate.getFullYear()}_${currentDate.getMonth()}`;
    sessionStorage.setItem(currentMonthKey, "true");
  };

  if (!mounted) return null;

  // Real-time dynamic dates that automatically roll over every month
  const targetDate22 = getNextCohortTargetDate(22, now);
  const targetDate12 = getNextCohortTargetDate(12, now);
  const quarterlyOutreach = getNextQuarterlyOutreachDate(now);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Active calendar month (from wall-clock time)
  const activeMonthName = monthNames[now.getMonth()];
  const activeYear = now.getFullYear();

  // Short formatted day strings (e.g. "Nov 14", "Nov 28")
  const dateShort22 = formatCohortDate(targetDate22).split(",")[1]?.trim() || "";
  const dateShort12 = formatCohortDate(targetDate12).split(",")[1]?.trim() || "";

  // Check if current month is a quarter-ending month (March, June, Sept, Dec)
  const isQuarterMonth = [2, 5, 8, 11].includes(now.getMonth());

  return (
    <>
      {/* 1. Modal Overlay & Compact Empowering Welcome Card */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={handleClose}
          >
            {/* Modal Card Shell — Compact, stroke-free, mobile-optimized */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 14 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#E2E8DE] text-[#172217] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] p-5 sm:p-6 overflow-hidden my-auto"
            >
              {/* Top Row: High-Contrast Yellow Ribbon Tag + Close Button */}
              <div className="flex items-center justify-between gap-3 mb-3.5">
                {/* Yellow Ribbon Tag with current Month */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-black text-[10px] sm:text-[11px] font-mono font-extrabold uppercase tracking-wider rounded-full shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>WELCOME TO ORIGIN · {activeMonthName.toUpperCase()} {activeYear}</span>
                </div>

                {/* Close Button without harsh border */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/5 hover:bg-[#1C3B34] text-[#172217] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Close Note"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Empowering Welcome Content */}
              <div className="space-y-3 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1C3B34] font-bold block">
                    A LETTER TO THE THINKER &amp; BUILDER
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-[#172217] tracking-tight leading-snug">
                    Step into Sovereign Leverage.
                  </h3>
                </div>

                <p className="text-xs sm:text-[13px] text-[#4E5B4B] font-light leading-relaxed">
                  School starts with the answer. <strong className="font-semibold text-[#172217]">Origin starts with the question.</strong> You are not here to consume more passive noise—you are here to architect clear thinking, make high-stakes decisions with calm conviction, and cultivate lasting economic mastery.
                </p>

                {/* Founder sign-off badge */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-7 h-7 rounded-full bg-[#1C3B34] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    ZO
                  </div>
                  <div className="text-[11px] font-mono leading-tight">
                    <span className="font-bold text-[#172217] block">Zeki Ubor</span>
                    <span className="text-[10px] text-[#6A7B6D] block">The Becoming Institute</span>
                  </div>
                </div>

                {/* Bottom Section: Automatic Monthly Program Link Strip */}
                <div className="pt-3.5 mt-2 border-t border-[#D5DDCF] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#1C3B34] uppercase tracking-wider px-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#1C3B34]" />
                      <span>{activeMonthName} Calendar Cohorts</span>
                    </span>
                    <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md font-bold">
                      {isQuarterMonth ? "3 Programs Live" : "2 Masterclasses Live"}
                    </span>
                  </div>

                  {/* Program Link Box (Always points to current month's active intakes) - High Impact Yellow CTA */}
                  <Link
                    href="/events"
                    onClick={handleClose}
                    className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-200 text-[#121E19] font-mono text-xs transition-all flex items-center justify-between shadow-[0_6px_24px_rgba(245,158,11,0.4)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.6)] hover:scale-[1.01] active:scale-[0.99] group cursor-pointer border border-amber-500/30"
                  >
                    <div className="text-left space-y-0.5 min-w-0 pr-2">
                      <span className="text-[10px] text-[#121E19]/80 font-black uppercase tracking-wider block">
                        Live This {activeMonthName}
                      </span>
                      <span className="text-xs font-black text-[#121E19] block truncate">
                        Success Multiplier ({dateShort22}) &amp; POI ({dateShort12})
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-black/15 group-hover:bg-black/25 flex items-center justify-center shrink-0 transition-colors shadow-xs">
                      <ArrowRight className="w-4 h-4 text-[#121E19] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  <div className="text-center pt-0.5">
                    <span className="text-[10px] font-mono text-[#6A7B6D]">
                      Interactive Sessions · Virtual Live &amp; Studio Partner Hubs
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Floating Discreet Pill on Mobile & Desktop */}
      {hasDismissed && !isOpen && (
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 left-4 sm:left-6 z-40 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-[#121E19] shadow-[0_6px_25px_rgba(245,158,11,0.45)] border border-amber-500/30 flex items-center gap-2 text-xs font-mono font-black cursor-pointer transition-all hover:scale-105 active:scale-95 group"
          title={`Open ${activeMonthName} Programs & Welcome Note`}
        >
          <div className="w-5 h-5 rounded-full bg-[#121E19] text-amber-300 flex items-center justify-center shrink-0">
            <Compass size={11} />
          </div>
          <span className="text-[11px] text-[#121E19] font-black tracking-wide">
            {activeMonthName} Programs
          </span>
          <ArrowRight size={12} className="text-[#121E19] group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      )}
    </>
  );
}
