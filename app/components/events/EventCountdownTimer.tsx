"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  CheckCircle2,
  Hourglass,
  ShieldCheck,
} from "lucide-react";
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

  if (!mounted) {
    return (
      <div className="h-11 rounded-xl bg-[#11231D]/80 border border-emerald-500/15 animate-pulse" />
    );
  }

  const pad = (num: number) => String(num).padStart(2, "0");

  if (variant === "compact") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0C1B16] border border-emerald-500/25 text-white font-mono text-xs">
        <Clock className="w-3 h-3 text-amber-300 animate-pulse" />
        <span className="text-emerald-200 font-bold">
          {pad(cohortRemaining.days)}d : {pad(cohortRemaining.hours)}h : {pad(cohortRemaining.minutes)}m : {pad(cohortRemaining.seconds)}s
        </span>
        <span className="text-[10px] text-white/60">to live cohort</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-gradient-to-r from-[#0C1B16] via-[#122A22] to-[#1A382F] border border-emerald-500/25 text-white p-3 sm:px-4 sm:py-2.5 shadow-md relative overflow-hidden space-y-2">
      {/* Main Countdown Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Left: Cohort Title & Live Indicator */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-200 block truncate">
              {isDeposit ? "Live Cohort Attendance Countdown" : "Timer to Attend Live Cohort"}
            </span>
            <span className="text-[10px] text-white/60 font-mono block truncate">
              Starts: {formatCohortDate(cohortTargetDate)}
            </span>
          </div>
        </div>

        {/* Right: Slim Monospace Live Attendance Digits */}
        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto font-mono">
          {/* Days */}
          <div className="px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-center min-w-[38px]">
            <span className="text-xs sm:text-sm font-extrabold text-white block leading-tight">
              {pad(cohortRemaining.days)}
            </span>
            <span className="text-[7.5px] text-emerald-300/80 block uppercase tracking-wider">
              DAYS
            </span>
          </div>

          <span className="text-white/40 font-bold text-xs">:</span>

          {/* Hours */}
          <div className="px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-center min-w-[38px]">
            <span className="text-xs sm:text-sm font-extrabold text-white block leading-tight">
              {pad(cohortRemaining.hours)}
            </span>
            <span className="text-[7.5px] text-emerald-300/80 block uppercase tracking-wider">
              HRS
            </span>
          </div>

          <span className="text-white/40 font-bold text-xs">:</span>

          {/* Mins */}
          <div className="px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-center min-w-[38px]">
            <span className="text-xs sm:text-sm font-extrabold text-white block leading-tight">
              {pad(cohortRemaining.minutes)}
            </span>
            <span className="text-[7.5px] text-emerald-300/80 block uppercase tracking-wider">
              MIN
            </span>
          </div>

          <span className="text-white/40 font-bold text-xs">:</span>

          {/* Secs */}
          <div className="px-2 py-0.5 rounded-md bg-black/40 border border-emerald-400/30 text-center min-w-[38px]">
            <span className="text-xs sm:text-sm font-extrabold text-amber-300 block leading-tight">
              {pad(cohortRemaining.seconds)}
            </span>
            <span className="text-[7.5px] text-amber-200/80 block uppercase tracking-wider">
              SEC
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Bar: Conditional on Outright vs 2-Stage Deposit */}
      {isDeposit ? (
        /* Only for Stage 1 deposit buyers: slim 1-line balance deadline */
        <div className="pt-1.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-1.5 text-[10.5px] font-mono">
          <span className="text-amber-200/95 flex items-center gap-1.5">
            <Hourglass className="w-3 h-3 text-amber-400 shrink-0" />
            <span>
              Stage 2 Balance Window (3 Days Prior): <strong>{balanceRemaining.isPast ? "Finalizing" : `${pad(balanceRemaining.days)}d : ${pad(balanceRemaining.hours)}h : ${pad(balanceRemaining.minutes)}m left`}</strong>
            </span>
          </span>
          <span className="text-amber-100/75 text-[10px]">
            Bal: ₦{(balanceDueNGN || 20000).toLocaleString()} · <em>Ignore if paid</em>
          </span>
        </div>
      ) : (
        /* Outright Full Payment: Confirmation badge only (NO timer to pay!) */
        <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-emerald-200/80">
          <span className="flex items-center gap-1 text-emerald-300 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>VIP Admission 100% Cleared · Zero Balance</span>
          </span>
          <span className="flex items-center gap-1 text-white/50">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Rollover Protected
          </span>
        </div>
      )}
    </div>
  );
}
