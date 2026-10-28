"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Compass,
  Users,
  Video,
  MapPin,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";
import { recordUserEventRegistration, EventSeatStats } from "../../data/event-registrations";

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: number;
    title: string;
    hook: string;
    date: string;
    time: string;
    price: number;
    priceNGN?: string;
    standardPriceNGN?: string;
    virtualLocation: string;
    onsiteLocation: string;
    imageUrl: string;
  };
  stats: EventSeatStats;
}

export default function EventRegistrationModal({
  isOpen,
  onClose,
  event,
  stats,
}: EventRegistrationModalProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [ticketType, setTicketType] = useState<"Solo Executive Pass" | "Co-Founder Dual Pass">("Solo Executive Pass");
  const [paymentPlan, setPaymentPlan] = useState<"full" | "deposit">("full");
  const [attendanceMode, setAttendanceMode] = useState<"Virtual HD Stream" | "Onsite Hub (Lagos)" | "Onsite Hub (Abuja)">("Virtual HD Stream");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const parsedSoloNGN = event.priceNGN ? parseInt(event.priceNGN.replace(/[^0-9]/g, "")) : Math.round(event.price * 1500);
  const duoMultiplier = 1.75; // Dual pass discount
  const tuitionNGN = ticketType === "Solo Executive Pass" ? parsedSoloNGN : Math.round(parsedSoloNGN * duoMultiplier);
  const tuitionUSD = ticketType === "Solo Executive Pass" ? event.price : Math.round(event.price * duoMultiplier);

  // 2-Stage Payment Breakdown (Low-friction entry deposit)
  const baseSoloDepositNGN = event.id === 7 ? 15000 : event.id === 12 ? 12000 : 10000;
  const baseSoloDepositUSD = event.id === 7 ? 11 : event.id === 12 ? 9 : 7;
  const depositNGN = ticketType === "Solo Executive Pass" ? baseSoloDepositNGN : Math.round(baseSoloDepositNGN * duoMultiplier);
  const depositUSD = ticketType === "Solo Executive Pass" ? baseSoloDepositUSD : Math.round(baseSoloDepositUSD * duoMultiplier);

  const dueTodayNGN = paymentPlan === "deposit" ? depositNGN : tuitionNGN;
  const dueTodayUSD = paymentPlan === "deposit" ? depositUSD : tuitionUSD;
  const balanceDueNGN = paymentPlan === "deposit" ? Math.max(0, tuitionNGN - depositNGN) : 0;
  const balanceDueUSD = paymentPlan === "deposit" ? Math.max(0, tuitionUSD - depositUSD) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast("Please provide your name and email address", "warning");
      return;
    }

    setIsSubmitting(true);

    // 1. Record real-time registration in state engine
    recordUserEventRegistration(event.id, {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      mode: attendanceMode,
      ticketType,
      paymentPlan,
      depositPaidNGN: paymentPlan === "deposit" ? dueTodayNGN : undefined,
      balanceDueNGN: paymentPlan === "deposit" ? balanceDueNGN : undefined,
    });

    // 2. Add ticket to cart with attendee metadata
    const productId = ticketType === "Co-Founder Dual Pass"
      ? (event.id === 7 ? "store-js-duo" : event.id === 12 ? "store-poi-duo" : event.id === 22 ? "store-team-duo" : "store-ffp-duo")
      : (event.id === 7 ? "store-js-solo" : event.id === 12 ? "store-poi-solo" : event.id === 22 ? "store-team-solo" : "store-ffp-solo");

    addToCart({
      id: productId,
      title: `${event.title} (${ticketType})${paymentPlan === "deposit" ? " · Stage 1 Commitment Deposit" : ""}`,
      description: `${attendanceMode} · Attendee: ${formData.name}${paymentPlan === "deposit" ? ` · Balance Due: ₦${balanceDueNGN.toLocaleString()} ($${balanceDueUSD}) before event` : " · Full Confirmed Pass"}`,
      priceUSD: dueTodayUSD,
      priceNGN: dueTodayNGN,
      imageUrl: event.imageUrl,
      paymentPlan,
      depositPaidNGN: paymentPlan === "deposit" ? dueTodayNGN : undefined,
      balanceDueNGN: paymentPlan === "deposit" ? balanceDueNGN : undefined,
    } as any);

    showToast(
      paymentPlan === "deposit"
        ? `Seat locked with Stage 1 deposit for ${formData.name}! Proceeding to confirmation...`
        : `Full seat pass reserved for ${formData.name}! Proceeding to checkout...`,
      "success"
    );

    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      router.push("/checkout");
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-xl bg-[#F6F8F4] text-[#172217] rounded-3xl border border-[#CCD6C6] shadow-2xl overflow-hidden my-auto z-10"
        >
          {/* Top Brand Banner */}
          <div className="bg-[#1C3B34] text-white p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between gap-3 relative z-10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-200">
                  <Compass className="w-3 h-3 text-amber-300" />
                  <span>OFFICIAL EVENT REGISTRATION</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-extrabold tracking-tight text-white leading-tight">
                  {event.title}
                </h3>
                <p className="text-xs text-white/80 font-mono italic">
                  &ldquo;{event.hook}&rdquo;
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Live Seat Fill Bar Inside Header */}
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
                </span>
                <span className="text-white/90">
                  Intake: <strong>{stats.seatsTaken}/{stats.totalSpots} Taken</strong>
                </span>
              </div>
              <span className="text-emerald-300 font-bold">
                {stats.spotsRemaining} spots remaining
              </span>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* 1. Ticket Pass Type Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider block">
                1. Select Pass Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setTicketType("Solo Executive Pass")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    ticketType === "Solo Executive Pass"
                      ? "bg-white border-[#1C3B34] ring-2 ring-[#1C3B34] shadow-sm"
                      : "bg-[#EAEFE8] border-[#CCD6C6] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#172217]">Solo Executive Pass</span>
                    <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center">
                      {ticketType === "Solo Executive Pass" && <span className="w-2 h-2 rounded-full bg-[#1C3B34]" />}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4E5B4B] block mt-0.5">1 Full Admission + Sprint</span>
                  <div className="mt-2 font-mono font-bold text-sm text-[#1C3B34]">
                    ₦{parsedSoloNGN.toLocaleString()} <span className="text-[10px] text-[#4E5B4B] font-normal">/ ${event.price}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTicketType("Co-Founder Dual Pass")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    ticketType === "Co-Founder Dual Pass"
                      ? "bg-white border-[#1C3B34] ring-2 ring-[#1C3B34] shadow-sm"
                      : "bg-[#EAEFE8] border-[#CCD6C6] hover:bg-white"
                  }`}
                >
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-200 text-amber-900 font-mono text-[9px] font-bold">
                    SAVE 15%
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#172217]">Co-Founder Dual Pass</span>
                    <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center">
                      {ticketType === "Co-Founder Dual Pass" && <span className="w-2 h-2 rounded-full bg-[#1C3B34]" />}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4E5B4B] block mt-0.5">2 Full Seats For Pairs</span>
                  <div className="mt-2 font-mono font-bold text-sm text-[#1C3B34]">
                    ₦{Math.round(parsedSoloNGN * duoMultiplier).toLocaleString()} <span className="text-[10px] text-[#4E5B4B] font-normal">/ ${Math.round(event.price * duoMultiplier)}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Attendance Mode */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider block">
                2. Select Attendance Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                {[
                  { id: "Virtual HD Stream", label: "🌐 Virtual Live Stream", sub: "GoogleMeet HD" },
                  { id: "Onsite Hub (Lagos)", label: "🏛️ Lagos Studio", sub: "Victoria Island Hub" },
                  { id: "Onsite Hub (Abuja)", label: "🏛️ Abuja Studio", sub: "Maitama Suite" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setAttendanceMode(mode.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      attendanceMode === mode.id
                        ? "bg-[#1C3B34] text-white border-[#1C3B34] shadow-xs"
                        : "bg-white text-[#172217] border-[#CCD6C6] hover:bg-black/5"
                    }`}
                  >
                    <span className="font-bold text-[11px] block">{mode.label}</span>
                    <span className={`text-[9px] block ${attendanceMode === mode.id ? "text-emerald-200" : "text-[#6A7B6D]"}`}>
                      {mode.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Payment Structure (Pay In Full vs 2-Stage Deposit) */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider flex items-center justify-between">
                <span>3. Select Payment Structure</span>
                <span className="text-[10px] text-emerald-800 font-bold">
                  {paymentPlan === "deposit" ? "2-Stage Low-Friction Entry" : "Full VIP Confirmation"}
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Option A: Pay All at Once */}
                <button
                  type="button"
                  onClick={() => setPaymentPlan("full")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    paymentPlan === "full"
                      ? "bg-white border-[#1C3B34] ring-2 ring-[#1C3B34] shadow-sm"
                      : "bg-[#EAEFE8] border-[#CCD6C6] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#172217]">Pay All at Once</span>
                    <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center">
                      {paymentPlan === "full" && <span className="w-2 h-2 rounded-full bg-[#1C3B34]" />}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4E5B4B] block mt-0.5">
                    100% Confirmed VIP Pass &amp; All Workbooks
                  </span>
                  <div className="mt-2 font-mono font-bold text-sm text-[#1C3B34]">
                    ₦{tuitionNGN.toLocaleString()} <span className="text-[10px] text-[#4E5B4B] font-normal">/ ${tuitionUSD}</span>
                  </div>
                  <div className="mt-1 text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Zero balance remaining</span>
                  </div>
                </button>

                {/* Option B: 2-Stage Commitment Deposit */}
                <button
                  type="button"
                  onClick={() => setPaymentPlan("deposit")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    paymentPlan === "deposit"
                      ? "bg-white border-emerald-700 ring-2 ring-emerald-700 shadow-sm"
                      : "bg-[#EAEFE8] border-[#CCD6C6] hover:bg-white"
                  }`}
                >
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-[9px] font-bold">
                    2-STAGE PLAN
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#172217]">Commitment Deposit</span>
                    <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center">
                      {paymentPlan === "deposit" && <span className="w-2 h-2 rounded-full bg-emerald-700" />}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4E5B4B] block mt-0.5">
                    Stage 1 Today · Balance Due Before Event
                  </span>
                  <div className="mt-2 font-mono font-bold text-sm text-emerald-800">
                    ₦{depositNGN.toLocaleString()} <span className="text-[10px] text-[#4E5B4B] font-normal">/ ${depositUSD} today</span>
                  </div>
                  <div className="mt-1 text-[10px] text-amber-900 font-semibold flex items-center gap-1">
                    <span>Balance ₦{balanceDueNGN.toLocaleString()} due 48h prior</span>
                  </div>
                </button>
              </div>
            </div>

            {/* 4. Seat Guarantee & Rollover Protection Protocol */}
            <div className="rounded-2xl bg-amber-50/80 border border-amber-200/90 p-3.5 sm:p-4 text-[#1C3B34] space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-950">
                  Seat Guarantee &amp; Rollover Protection Policy
                </h4>
              </div>
              <ul className="text-[11px] space-y-1.5 text-[#3A4D3E] font-medium leading-relaxed pl-0.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold mt-0.5">•</span>
                  <span><strong>Immediate Seat Lock:</strong> Your registration immediately counts toward cohort intake and secures your designated seat in real time.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold mt-0.5">•</span>
                  <span><strong>100% Rollover Protection:</strong> All deposits are non-refundable but <em>fully rollover-eligible</em>. If unforeseen scheduling prevents you from attending this date, your seat credit automatically rolls over to the next scheduled cohort.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold mt-0.5">•</span>
                  <span><strong>Stage 2 Balance Notification:</strong> If paying via the 2-Stage plan, your balance link will be dispatched 48 hours prior to live broadcast or venue reception check-in.</span>
                </li>
              </ul>
            </div>

            {/* 5. Attendee Information */}
            <div className="space-y-3">
              <label className="text-[11px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider block">
                5. Attendee Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Legal Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CCD6C6] focus:border-[#1C3B34] outline-none text-xs text-[#172217]"
                />
                <input
                  type="email"
                  required
                  placeholder="Official Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CCD6C6] focus:border-[#1C3B34] outline-none text-xs text-[#172217]"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp / Phone (For 21-Day Sprint)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CCD6C6] focus:border-[#1C3B34] outline-none text-xs text-[#172217]"
                />
                <input
                  type="text"
                  placeholder="Company / Role (Optional)"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CCD6C6] focus:border-[#1C3B34] outline-none text-xs text-[#172217]"
                />
              </div>
            </div>

            {/* Total Due & Submit CTA */}
            <div className="pt-2 border-t border-[#CCD6C6] space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#6A7B6D] uppercase block">
                    {paymentPlan === "deposit" ? "STAGE 1 DUE TODAY (SEAT LOCK)" : "TOTAL REGISTRATION TUITION"}
                  </span>
                  <span className="text-2xl font-mono font-extrabold text-[#111C15]">
                    ₦{dueTodayNGN.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-[#4E5B4B] ml-1.5">/ ${dueTodayUSD} USD</span>
                  {paymentPlan === "deposit" && (
                    <span className="text-[11px] font-mono text-amber-900 block mt-0.5">
                      (Balance of ₦{balanceDueNGN.toLocaleString()} / ${balanceDueUSD} due before live event)
                    </span>
                  )}
                </div>
                <div className="text-right text-[10px] font-mono text-emerald-800 font-bold">
                  ✓ Instant Seat Lock &amp; Rollover Protected
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#1C3B34] via-[#24493F] to-[#1C3B34] hover:from-[#13261F] hover:to-[#13261F] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span>
                  {isSubmitting
                    ? "RESERVING COHORT SEAT..."
                    : paymentPlan === "deposit"
                    ? `LOCK IN SEAT WITH ₦${dueTodayNGN.toLocaleString()} DEPOSIT →`
                    : "LOCK IN SEAT & PROCEED TO CHECKOUT →"}
                </span>
                <ArrowRight size={15} />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#6A7B6D]">
                <span className="flex items-center gap-1"><Lock size={11} /> 256-Bit SSL Encryption</span>
                <span>•</span>
                <span className="flex items-center gap-1"><ShieldCheck size={11} /> Official Origin Cohort Pass</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
