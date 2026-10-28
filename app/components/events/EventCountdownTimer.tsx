"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Hourglass,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  getNextCohortTargetDate,
  getBalanceDeadlineDate,
  calculateCohortTimeRemaining,
  formatCohortDate,
} from "../../utils/event-dates";

interface EventCountdownTimerProps {
  eventId: number;
  paymentPlan?: "full" | "deposit";
  balanceDueNGN?: number;
  purchasedAt?: string | number;
  variant?: "dashboard" | "card" | "compact";
}

export default function EventCountdownTimer({
  eventId,
  paymentPlan = "full",
  balanceDueNGN,
  purchasedAt,
  variant = "dashboard",
}: EventCountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    setMounted(true);
    setNow(new Date());

    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const cohortTargetDate = getNextCohortTargetDate(eventId, now);
  const balanceDeadlineDate = getBalanceDeadlineDate(cohortTargetDate);

  const cohortRemaining = calculateCohortTimeRemaining(cohortTargetDate, now);
  const balanceRemaining = calculateCohortTimeRemaining(balanceDeadlineDate, now);

  const isDeposit = paymentPlan === "deposit";

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="rounded-2xl bg-[#11231D]/80 border border-emerald-500/20 p-4 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-1/3 mb-3" />
        <div className="h-10 bg-white/10 rounded w-full" />
      </div>
    );
  }

  // Format single/double digit numbers
  const pad = (num: number) => String(num).padStart(2, "0");

  if (variant === "compact") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#11231D] border border-emerald-500/25 text-white font-mono text-xs">
        <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span className="text-emerald-200 font-bold">
          {pad(cohortRemaining.days)}d : {pad(cohortRemaining.hours)}h : {pad(cohortRemaining.minutes)}m : {pad(cohortRemaining.seconds)}s
        </span>
        <span className="text-[10px] text-white/60">to live cohort</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0F211B] via-[#16332A] to-[#1C3B34] border border-emerald-500/30 text-white p-4 sm:p-5 shadow-lg relative overflow-hidden space-y-3.5">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-200">
            LIVE CALENDAR COUNTDOWN
          </span>
        </div>
        <span className="text-[10px] font-mono text-amber-200 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-amber-300" />
          {formatCohortDate(cohortTargetDate)}
        </span>
      </div>

      {/* Live Digits Grid */}
      <div className="relative grid grid-cols-4 gap-2 text-center">
        {/* Days */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-2 sm:p-2.5 backdrop-blur-xs">
          <span className="text-xl sm:text-3xl font-mono font-extrabold text-white block tracking-tight">
            {pad(cohortRemaining.days)}
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-emerald-300/80 block mt-0.5">
            DAYS
          </span>
        </div>

        {/* Hours */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-2 sm:p-2.5 backdrop-blur-xs">
          <span className="text-xl sm:text-3xl font-mono font-extrabold text-white block tracking-tight">
            {pad(cohortRemaining.hours)}
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-emerald-300/80 block mt-0.5">
            HOURS
          </span>
        </div>

        {/* Minutes */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-2 sm:p-2.5 backdrop-blur-xs">
          <span className="text-xl sm:text-3xl font-mono font-extrabold text-white block tracking-tight">
            {pad(cohortRemaining.minutes)}
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-emerald-300/80 block mt-0.5">
            MINUTES
          </span>
        </div>

        {/* Seconds */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-2 sm:p-2.5 backdrop-blur-xs relative overflow-hidden">
          <span className="text-xl sm:text-3xl font-mono font-extrabold text-amber-300 block tracking-tight">
            {pad(cohortRemaining.seconds)}
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-amber-200/80 block mt-0.5">
            SECONDS
          </span>
        </div>
      </div>

      {/* 2-Stage Balance Countdown or Confirmed VIP Badge */}
      {isDeposit ? (
        <div className="relative rounded-xl bg-amber-950/50 border border-amber-500/35 p-3 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-amber-300 font-bold font-mono text-[11px] flex-wrap gap-1">
            <span className="flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
              <span>Stage 2 Balance Window (3 Days Prior):</span>
            </span>
            <span className="text-amber-200">
              {balanceRemaining.isPast
                ? "Final Clearance Active"
                : `${pad(balanceRemaining.days)}d : ${pad(balanceRemaining.hours)}h : ${pad(balanceRemaining.minutes)}m left`}
            </span>
          </div>
          <p className="text-[11px] text-amber-100/80 leading-relaxed font-sans">
            Your seat is locked. Final balance of <strong>₦{(balanceDueNGN || 20000).toLocaleString()}</strong> must be completed 3 days prior to broadcast.
            <span className="text-amber-200 block mt-0.5 italic">
              (If you have already paid in full, please ignore any balance notice).
            </span>
          </p>
        </div>
      ) : (
        <div className="relative rounded-xl bg-emerald-950/40 border border-emerald-500/30 p-2.5 text-xs flex items-center justify-between text-emerald-200 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>VIP Admission 100% Cleared &amp; Confirmed</span>
          </span>
          <span className="text-emerald-300 font-bold">Zero Balance</span>
        </div>
      )}

      {/* Footer Info Pill */}
      {purchasedAt && (
        <div className="flex items-center justify-between text-[10px] font-mono text-white/60 pt-1">
          <span>Registered on: {new Date(purchasedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
          <span className="text-emerald-300 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Rollover Protected
          </span>
        </div>
      )}
    </div>
  );
}
