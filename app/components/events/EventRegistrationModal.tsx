"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Compass,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  Zap,
  User,
  Mail,
  Phone,
  Building2,
  Globe,
  Check,
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const parsedSoloNGN = event.priceNGN ? parseInt(event.priceNGN.replace(/[^0-9]/g, "")) : Math.round(event.price * 1500);
  const duoMultiplier = 1.75; // 15% discount for 2 seats
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

  // Real-time capacity percentage
  const fillPercentage = Math.min(100, Math.round((stats.seatsTaken / stats.totalSpots) * 100));

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
      mode: "Virtual HD Stream",
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
      description: `All-Access Pass (Virtual + Onsite) · Attendee: ${formData.name}${paymentPlan === "deposit" ? ` · Balance: ₦${balanceDueNGN.toLocaleString()} ($${balanceDueUSD}) due 48h prior` : " · Full Confirmed VIP Pass"}`,
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A1410]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="relative w-full max-w-xl bg-[#FAFBF9] text-[#172217] rounded-3xl border border-[#D5DDD0] shadow-[0_30px_70px_-15px_rgba(10,20,16,0.6)] overflow-hidden my-auto z-10"
        >
          {/* Header Card */}
          <div className="bg-gradient-to-br from-[#11231D] via-[#1C3B34] to-[#254A40] text-white p-5 sm:p-6 relative overflow-hidden">
            {/* Subtle radial decorative glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="space-y-1.5 pr-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-200">
                  <Compass className="w-3 h-3 text-amber-300" />
                  <span>EXECUTIVE COHORT ADMISSION</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-extrabold tracking-tight text-white leading-snug">
                  {event.title}
                </h3>
                <p className="text-xs text-white/80 font-mono italic">
                  &ldquo;{event.hook}&rdquo;
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-white/70 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/15 transition-all cursor-pointer shrink-0 border border-white/10"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Event Time & Location Chips */}
            <div className="relative z-10 mt-4 flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-emerald-100 border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                {event.date}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-emerald-100 border border-white/10">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                {event.time}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-200 border border-emerald-500/20">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Virtual Live + Onsite Hubs
              </span>
            </div>

            {/* Live Intake Seat Meter */}
            <div className="relative z-10 mt-4 pt-3.5 border-t border-white/15 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
                  </span>
                  <span className="text-white/90">
                    Cohort Intake: <strong>{stats.seatsTaken}/{stats.totalSpots} Taken</strong>
                  </span>
                </div>
                <span className="text-amber-300 font-bold">
                  {stats.spotsRemaining} spots remaining
                </span>
              </div>
              <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-amber-300 transition-all duration-500 rounded-full"
                  style={{ width: `${fillPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5 max-h-[72vh] overflow-y-auto">
            {/* Step 1: Pass Tier */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#1C3B34] text-white inline-flex items-center justify-center text-[10px]">1</span>
                  <span>Select Pass Tier</span>
                </label>
                <span className="text-[10px] text-[#637365] font-mono">Founder Early-Bird Rate</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Solo Pass */}
                <button
                  type="button"
                  onClick={() => setTicketType("Solo Executive Pass")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    ticketType === "Solo Executive Pass"
                      ? "bg-white border-[#1C3B34] ring-2 ring-[#1C3B34] shadow-md shadow-emerald-950/5"
                      : "bg-[#F1F4EE] border-[#D5DDD0] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#172217]">Solo Executive Pass</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      ticketType === "Solo Executive Pass" ? "border-[#1C3B34] bg-[#1C3B34] text-white" : "border-[#B8C4B2]"
                    }`}>
                      {ticketType === "Solo Executive Pass" && <Check className="w-2.5 h-2.5" />}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#566554] block mt-1 leading-snug">
                    1 Full Admission + 21-Day Sprint + Companion Frameworks
                  </span>
                  <div className="mt-2.5 font-mono font-extrabold text-sm text-[#1C3B34]">
                    ₦{parsedSoloNGN.toLocaleString()}{" "}
                    <span className="text-[11px] text-[#637365] font-normal">/ ${event.price} USD</span>
                  </div>
                </button>

                {/* Co-Founder Dual Pass */}
                <button
                  type="button"
                  onClick={() => setTicketType("Co-Founder Dual Pass")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    ticketType === "Co-Founder Dual Pass"
                      ? "bg-white border-[#1C3B34] ring-2 ring-[#1C3B34] shadow-md shadow-emerald-950/5"
                      : "bg-[#F1F4EE] border-[#D5DDD0] hover:bg-white"
                  }`}
                >
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-amber-200/90 text-amber-950 font-mono text-[9px] font-bold border border-amber-300">
                    SAVE 15%
                  </div>
                  <div className="flex items-center justify-between pr-14">
                    <span className="font-bold text-xs text-[#172217]">Co-Founder Dual Pass</span>
                  </div>
                  <span className="text-[11px] text-[#566554] block mt-1 leading-snug">
                    2 Seats for Partner / Co-Founder Teams
                  </span>
                  <div className="mt-2.5 font-mono font-extrabold text-sm text-[#1C3B34]">
                    ₦{Math.round(parsedSoloNGN * duoMultiplier).toLocaleString()}{" "}
                    <span className="text-[11px] text-[#637365] font-normal">/ ${Math.round(event.price * duoMultiplier)} USD</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Payment Structure (Pay In Full vs 2-Stage Plan) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#1C3B34] text-white inline-flex items-center justify-center text-[10px]">2</span>
                  <span>Payment Plan</span>
                </label>
                <span className="text-[10px] text-emerald-800 font-mono font-bold">
                  {paymentPlan === "deposit" ? "★ Low-Barrier Entry Selected" : "✓ Paid In Full"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option A: Pay All at Once */}
                <button
                  type="button"
                  onClick={() => setPaymentPlan("full")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    paymentPlan === "full"
                      ? "bg-white border-[#1C3B34] ring-2 ring-[#1C3B34] shadow-md shadow-emerald-950/5"
                      : "bg-[#F1F4EE] border-[#D5DDD0] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#172217]">Pay In Full</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentPlan === "full" ? "border-[#1C3B34] bg-[#1C3B34] text-white" : "border-[#B8C4B2]"
                    }`}>
                      {paymentPlan === "full" && <Check className="w-2.5 h-2.5" />}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#566554] block mt-1">
                    Instant 100% Confirmed Pass &amp; Workbooks
                  </span>
                  <div className="mt-2.5 font-mono font-bold text-sm text-[#1C3B34]">
                    ₦{tuitionNGN.toLocaleString()} <span className="text-[10px] text-[#637365] font-normal">/ ${tuitionUSD} USD</span>
                  </div>
                  <div className="mt-1 text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Zero balance remaining</span>
                  </div>
                </button>

                {/* Option B: 2-Stage Commitment Deposit */}
                <button
                  type="button"
                  onClick={() => setPaymentPlan("deposit")}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    paymentPlan === "deposit"
                      ? "bg-white border-emerald-700 ring-2 ring-emerald-700 shadow-md shadow-emerald-950/5"
                      : "bg-[#F1F4EE] border-[#D5DDD0] hover:bg-white"
                  }`}
                >
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-[9px] font-bold">
                    2-STAGE PLAN
                  </div>
                  <div className="flex items-center justify-between pr-20">
                    <span className="font-bold text-xs text-[#172217]">Commitment Deposit</span>
                  </div>
                  <span className="text-[11px] text-[#566554] block mt-1">
                    Stage 1 Today · Balance Due Before Event
                  </span>
                  <div className="mt-2.5 font-mono font-bold text-sm text-emerald-800">
                    ₦{depositNGN.toLocaleString()}{" "}
                    <span className="text-[10px] text-[#637365] font-normal">/ ${depositUSD} USD today</span>
                  </div>
                  <div className="mt-1 text-[10px] text-amber-900 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                    <span>Balance ₦{balanceDueNGN.toLocaleString()} due 48h prior</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 3: Attendee Information */}
            <div className="space-y-2.5">
              <label className="text-[11px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#1C3B34] text-white inline-flex items-center justify-center text-[10px]">3</span>
                <span>Attendee Information</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#637365] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-[#D5DDD0] focus:border-[#1C3B34] focus:ring-1 focus:ring-[#1C3B34] outline-none text-xs text-[#172217] placeholder:text-[#8A9988] transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#637365] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="Official Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-[#D5DDD0] focus:border-[#1C3B34] focus:ring-1 focus:ring-[#1C3B34] outline-none text-xs text-[#172217] placeholder:text-[#8A9988] transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#637365] absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    placeholder="WhatsApp / Phone (For Sprint)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-[#D5DDD0] focus:border-[#1C3B34] focus:ring-1 focus:ring-[#1C3B34] outline-none text-xs text-[#172217] placeholder:text-[#8A9988] transition-all"
                  />
                </div>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 text-[#637365] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Company / Role (Optional)"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-[#D5DDD0] focus:border-[#1C3B34] focus:ring-1 focus:ring-[#1C3B34] outline-none text-xs text-[#172217] placeholder:text-[#8A9988] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Rollover Protection Guarantee Card */}
            <div className="rounded-2xl bg-gradient-to-r from-amber-50/90 to-emerald-50/70 border border-amber-200/90 p-3.5 sm:p-4 text-[#1C3B34] space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-950 font-mono font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>100% Rollover Protection Guarantee</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-800 text-white text-[9px] font-mono font-bold">
                  Zero Risk
                </span>
              </div>
              <p className="text-[11px] text-[#3D4D3E] leading-relaxed">
                Your deposit locks your seat immediately. If unforeseen schedule conflicts prevent you from attending on <strong>{event.date}</strong>, your seat credit automatically rolls over to the subsequent monthly cohort.
              </p>
            </div>

            {/* Total Due & Submit CTA */}
            <div className="pt-3 border-t border-[#D5DDD0] space-y-3.5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#637365] uppercase tracking-wider block font-medium">
                    {paymentPlan === "deposit" ? "STAGE 1 DUE TODAY (SEAT LOCK)" : "TOTAL REGISTRATION TUITION"}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#111C15]">
                      ₦{dueTodayNGN.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-[#637365]">/ ${dueTodayUSD} USD</span>
                  </div>
                  {paymentPlan === "deposit" && (
                    <span className="text-[11px] font-mono text-amber-900 block mt-1">
                      (Remaining balance of ₦{balanceDueNGN.toLocaleString()} due 48 hours prior)
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100/90 text-emerald-900 text-[10px] font-mono font-bold border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    Instant Seat Lock
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#17302A] via-[#1C3B34] to-[#254A40] hover:from-[#11231D] hover:to-[#1C3B34] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>
                  {isSubmitting
                    ? "SECURING COHORT PASS..."
                    : paymentPlan === "deposit"
                    ? `LOCK IN SEAT WITH ₦${dueTodayNGN.toLocaleString()} DEPOSIT →`
                    : "RESERVE SEAT & PROCEED TO CHECKOUT →"}
                </span>
                <ArrowRight size={15} />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#637365]">
                <span className="flex items-center gap-1"><Lock size={11} /> 256-Bit SSL Encrypted</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Users size={11} /> 80 Max Intake Cohort</span>
                <span>•</span>
                <span className="flex items-center gap-1"><ShieldCheck size={11} /> Official Origin Pass</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
