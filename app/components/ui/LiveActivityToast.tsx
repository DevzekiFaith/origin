"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  CheckCircle2, 
  X, 
  Sparkles, 
  Zap, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LiveActivityItem, 
  getActivitiesForRoute, 
  getRecentSessionPurchase 
} from "../../data/live-activity-data";

export default function LiveActivityToast() {
  const pathname = usePathname();
  const router = useRouter();

  const [currentActivity, setCurrentActivity] = useState<LiveActivityItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissedSession, setIsDismissedSession] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const nextIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activityIndexRef = useRef(0);
  const activitiesRef = useRef<LiveActivityItem[]>([]);

  // Update activity pool whenever the route changes
  useEffect(() => {
    const routeActivities = getActivitiesForRoute(pathname);
    activitiesRef.current = routeActivities;
    activityIndexRef.current = 0;
  }, [pathname]);

  // Check session dismissal state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissedUntil = sessionStorage.getItem("origin_activity_toast_muted_until");
      if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
        setIsDismissedSession(true);
      }
    }
  }, []);

  // Show a specific activity
  const displayActivity = useCallback((activity: LiveActivityItem) => {
    if (isDismissedSession) return;
    setCurrentActivity(activity);
    setIsVisible(true);

    // Auto-hide after 6.5 seconds unless user hovers
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsVisible((prev) => {
        // Only hide if not hovered
        return false;
      });
    }, 6500);
  }, [isDismissedSession]);

  // Advance to next activity in the pool
  const scheduleNext = useCallback((delayMs: number) => {
    if (nextIntervalRef.current) clearTimeout(nextIntervalRef.current);
    if (isDismissedSession) return;

    nextIntervalRef.current = setTimeout(() => {
      const pool = activitiesRef.current;
      if (!pool || pool.length === 0) return;

      const nextItem = pool[activityIndexRef.current % pool.length];
      activityIndexRef.current = (activityIndexRef.current + 1) % pool.length;

      displayActivity(nextItem);
    }, delayMs);
  }, [displayActivity, isDismissedSession]);

  // Primary loop management
  useEffect(() => {
    if (isDismissedSession) return;

    // Check if there is a freshly completed purchase in session
    const recentPurchase = getRecentSessionPurchase();
    if (recentPurchase) {
      // Show immediately after brief 2.5s pause
      scheduleNext(2500);
    } else {
      // Start after initial 6.5s delay to let visitor take in page
      scheduleNext(6500);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (nextIntervalRef.current) clearTimeout(nextIntervalRef.current);
    };
  }, [scheduleNext, isDismissedSession]);

  // When visibility changes to false, schedule the next rotation
  useEffect(() => {
    if (!isVisible && !isDismissedSession) {
      // Wait between 16 and 22 seconds before showing the next one (organic cadence)
      const randomGap = 16000 + Math.floor(Math.random() * 6000);
      scheduleNext(randomGap);
    }
  }, [isVisible, isDismissedSession, scheduleNext]);

  // Listen to live broadcast events (e.g. freshly confirmed checkout)
  useEffect(() => {
    const handleLiveBroadcast = (event: Event) => {
      const customEvent = event as CustomEvent<LiveActivityItem>;
      if (customEvent.detail) {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (nextIntervalRef.current) clearTimeout(nextIntervalRef.current);
        displayActivity(customEvent.detail);
      }
    };

    window.addEventListener("origin_live_activity", handleLiveBroadcast);
    return () => window.removeEventListener("origin_live_activity", handleLiveBroadcast);
  }, [displayActivity]);

  // Dismiss handler
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);

    // Mute for current session for 15 minutes to respect user preference
    try {
      const muteUntil = Date.now() + 15 * 60 * 1000;
      sessionStorage.setItem("origin_activity_toast_muted_until", muteUntil.toString());
      setIsDismissedSession(true);
    } catch (err) {
      // Ignore storage errors
    }
  };

  // Click on toast: navigate directly to item
  const handleCardClick = () => {
    if (currentActivity?.itemUrl) {
      setIsVisible(false);
      router.push(currentActivity.itemUrl);
    }
  };

  // Don't render on checkout page or if permanently muted
  if (isDismissedSession) return null;
  if (pathname.startsWith("/checkout")) return null;

  return (
    <div 
      className="fixed bottom-20 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 z-40 max-w-[380px] pointer-events-none"
      aria-live="polite"
    >
      <AnimatePresence>
        {isVisible && currentActivity && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => {
              setIsHovered(true);
              if (timerRef.current) clearTimeout(timerRef.current);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              // Resume dismiss timer with 3.5s grace period
              if (timerRef.current) clearTimeout(timerRef.current);
              timerRef.current = setTimeout(() => {
                setIsVisible(false);
              }, 3500);
            }}
            onClick={handleCardClick}
            className="pointer-events-auto group relative cursor-pointer overflow-hidden rounded-2xl bg-[#0e1117]/95 text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-3.5"
          >
            {/* Subtle highlight accent top glow */}
            <div 
              className={`absolute -top-12 -left-12 w-32 h-32 rounded-full blur-2xl opacity-25 pointer-events-none ${
                currentActivity.badgeTone === "amber" 
                  ? "bg-amber-500" 
                  : currentActivity.badgeTone === "emerald" 
                  ? "bg-emerald-500" 
                  : currentActivity.badgeTone === "purple" 
                  ? "bg-purple-500" 
                  : "bg-blue-500"
              }`} 
            />

            {/* Header row: Badge, pulsing dot, time & close button */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                {/* Pulsing indicator */}
                <span className="relative flex h-2 w-2">
                  <span 
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      currentActivity.badgeTone === "amber"
                        ? "bg-amber-400"
                        : currentActivity.badgeTone === "emerald"
                        ? "bg-emerald-400"
                        : currentActivity.badgeTone === "purple"
                        ? "bg-purple-400"
                        : "bg-blue-400"
                    }`} 
                  />
                  <span 
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      currentActivity.badgeTone === "amber"
                        ? "bg-amber-500"
                        : currentActivity.badgeTone === "emerald"
                        ? "bg-emerald-500"
                        : currentActivity.badgeTone === "purple"
                        ? "bg-purple-500"
                        : "bg-blue-500"
                    }`} 
                  />
                </span>

                {/* Badge Tag */}
                <span 
                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                    currentActivity.badgeTone === "amber"
                      ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      : currentActivity.badgeTone === "emerald"
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                      : currentActivity.badgeTone === "purple"
                      ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                      : "bg-blue-500/10 text-blue-300 border-blue-500/30"
                  }`}
                >
                  {currentActivity.type === "event_booking" && <Zap className="w-2.5 h-2.5" />}
                  {currentActivity.type === "course_registration" && <GraduationCap className="w-2.5 h-2.5" />}
                  {currentActivity.type === "companion_purchase" && <BookOpen className="w-2.5 h-2.5" />}
                  {currentActivity.type === "book_purchase" && <Bookmark className="w-2.5 h-2.5" />}
                  {currentActivity.badgeLabel}
                </span>
              </div>

              {/* Time Ago & Close */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-zinc-500" />
                  {currentActivity.minutesAgo === 0 ? "Just now" : `${currentActivity.minutesAgo}m ago`}
                </span>

                <button
                  onClick={handleDismiss}
                  title="Dismiss notifications"
                  className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main content body */}
            <div className="flex items-start gap-3">
              {/* Left Avatar / Icon thumbnail */}
              <div 
                className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs shadow-inner border ${
                  currentActivity.badgeTone === "amber"
                    ? "bg-amber-950/40 text-amber-300 border-amber-500/30"
                    : currentActivity.badgeTone === "emerald"
                    ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/30"
                    : currentActivity.badgeTone === "purple"
                    ? "bg-purple-950/40 text-purple-300 border-purple-500/30"
                    : "bg-blue-950/40 text-blue-300 border-blue-500/30"
                }`}
              >
                {currentActivity.userName.charAt(0)}
              </div>

              {/* Right text summary */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5 flex-wrap leading-snug">
                  <span className="text-xs font-semibold text-zinc-100">
                    {currentActivity.userName}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    from {currentActivity.location}
                  </span>
                  <span title="Verified Origin Student">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  </span>
                </div>

                {/* Item title with slight glow */}
                <p className="text-xs font-bold text-white mt-0.5 line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {currentActivity.itemTitle}
                </p>

                {/* Subtitle / context */}
                {currentActivity.itemSubtitle && (
                  <p className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                    {currentActivity.itemSubtitle}
                  </p>
                )}

                {/* Footer action link */}
                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5">
                  <span className="text-[10px] font-mono text-zinc-400 font-medium">
                    {currentActivity.priceDisplay ? `Standard: ${currentActivity.priceDisplay}` : "Limited Enrollment"}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-zinc-300 group-hover:text-white transition-colors">
                    {currentActivity.actionText}
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle bottom progress bar indicating countdown */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: isHovered ? "100%" : "0%" }}
                transition={{ 
                  duration: isHovered ? 0 : 6.5, 
                  ease: "linear" 
                }}
                className={`h-full ${
                  currentActivity.badgeTone === "amber"
                    ? "bg-amber-400/80"
                    : currentActivity.badgeTone === "emerald"
                    ? "bg-emerald-400/80"
                    : currentActivity.badgeTone === "purple"
                    ? "bg-purple-400/80"
                    : "bg-blue-400/80"
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
