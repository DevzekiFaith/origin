"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Users, CheckCircle2, X, Zap } from "lucide-react";
import { LiveRegistration } from "../../data/event-registrations";

interface LiveRegistrationTickerProps {
  registration: LiveRegistration | null;
  seatsTaken?: number;
  totalSpots?: number;
}

export default function LiveRegistrationTicker({
  registration,
  seatsTaken,
  totalSpots,
}: LiveRegistrationTickerProps) {
  const [visibleItem, setVisibleItem] = useState<LiveRegistration | null>(null);

  useEffect(() => {
    if (!registration) return;
    setVisibleItem(registration);

    const timer = setTimeout(() => {
      setVisibleItem(null);
    }, 6500);

    return () => clearTimeout(timer);
  }, [registration]);

  if (!visibleItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={visibleItem.id}
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="fixed bottom-5 left-4 right-4 sm:right-auto sm:left-6 z-50 max-w-sm pointer-events-auto"
      >
        <div className="bg-[#101F18]/95 text-white backdrop-blur-xl border border-emerald-400/30 rounded-2xl p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-start gap-3 relative overflow-hidden group">
          {/* Subtle Glow Background */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Glowing Beacon Icon */}
          <div className="w-9 h-9 rounded-xl bg-[#1C3B34] border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-300 shadow-sm relative mt-0.5">
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
            </span>
            <Users className="w-4 h-4 text-emerald-300" />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                <span>REAL-TIME COHORT INTAKE</span>
              </span>
              <span className="text-[10px] font-mono text-white/50">{visibleItem.formattedTime}</span>
            </div>

            <p className="text-xs font-semibold text-white leading-snug">
              <strong className="text-amber-200 font-bold">{visibleItem.attendeeName}</strong>{" "}
              <span className="text-white/80">({visibleItem.city}, {visibleItem.country})</span>{" "}
              just secured a seat for{" "}
              <span className="text-emerald-200 font-bold">{visibleItem.eventTitle.split(":")[0]}</span>.
            </p>

            {seatsTaken && totalSpots && (
              <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono border-t border-white/10 mt-1">
                <span className="text-white/70">
                  Cohort Capacity: <strong className="text-white font-bold">{seatsTaken}/{totalSpots} taken</strong>
                </span>
                <span className="text-emerald-400 font-bold">
                  {Math.max(0, totalSpots - seatsTaken)} seats remaining
                </span>
              </div>
            )}
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => setVisibleItem(null)}
            className="text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 shrink-0 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
