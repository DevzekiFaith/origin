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
  RefreshCw,
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
        ? `Seat locked with Stage 1 deposit for ${formData.name}! Proceeding to checkout...`
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
          className="fixed inset-0 bg-[#0A1410]/80 backdrop-blur-md"
        />

        {/* Modal Window (Compact, Wide, High-End Executive Aesthetic) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="relative w-full max-w-2xl bg-[#FAFBF9] text-[#172217] rounded-2xl sm:rounded-3xl border border-[#D5DDD0] shadow-[0_25px_60px_-15px_rgba(10,20,16,0.65)] overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col"
        >
          {/* 1. Ultra-Compact Executive Header */}
          <div className="bg-gradient-to-r from-[#11231D] via-[#1C3B34] to-[#254A40] text-white px-5 py-3.5 sm:px-6 sm:py-4 relative shrink-0">
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-200">
                  <Compass className="w-2.5 h-2.5 text-amber-300" />
                  EXECUTIVE COHORT ADMISSION
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/20 text-[9px] font-mono text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span>{stats.seatsTaken}/80 Taken</span>
                  <span className="text-amber-200">({stats.spotsRemaining} left)</span>
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-white/70 hover:text-white p-1.5 rounded-lg bg-white/5 hover:bg-white/15 transition-all cursor-pointer border border-white/10"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Event Title + Meta Row */}
            <div className="relative z-10 mt-1.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                  {event.title}
                </h3>
                <p className="text-[11px] text-white/75 font-mono italic truncate max-w-md">
                  &ldquo;{event.hook}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-200 shrink-0">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-300" />
                  {event.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-400" />
                  Virtual + Onsite
                </span>
              </div>
            </div>

            {/* Micro 2px Progress Line Embedded at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black/40">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300 transition-all duration-500"
                style={{ width: `${fillPercentage}%` }}
              />
            </div>
          </div>

          {/* 2. Compact Form Content (Scrollable if viewport is tiny) */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5 overflow-y-auto flex-1 text-xs">
            {/* Step 1: Pass Tier */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1C3B34] text-white inline-flex items-center justify-center text-[9px]">1</span>
                  <span>Select Pass Tier</span>
                </label>
                <span className="text-[9px] text-[#637365] font-mono">Founder Early-Bird Tuition</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Solo Pass */}
                <button
                  type="button"
                  onClick={() => setTicketType("Solo Executive Pass")}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    ticketType === "Solo Executive Pass"
                      ? "bg-white border-[#1C3B34] ring-1.5 ring-[#1C3B34] shadow-xs"
                      : "bg-[#F1F4EE] border-[#D5DDD0] hover:bg-white"
                  }`}
                >
                  <div className="pr-2 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#172217]">Solo Executive Pass</span>
                      {ticketType === "Solo Executive Pass" && (
                        <span className="w-3 h-3 rounded-full bg-[#1C3B34] text-white inline-flex items-center justify-center">
                          <Check className="w-2 h-2" />
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#566554] block truncate">
                      1 Full Seat + 21-Day Sprint + Frameworks
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-extrabold text-xs sm:text-sm text-[#1C3B34] block">
                      ₦{parsedSoloNGN.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-[#637365] font-mono block">/ ${event.price} USD</span>
                  </div>
                </button>

                {/* Co-Founder Dual Pass */}
                <button
                  type="button"
                  onClick={() => setTicketType("Co-Founder Dual Pass")}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex items-center justify-between ${
                    ticketType === "Co-Founder Dual Pass"
                      ? "bg-white border-[#1C3B34] ring-1.5 ring-[#1C3B34] shadow-xs"
                      : "bg-[#F1F4EE] border-[#D5DDD0] hover:bg-white"
                  }`}
                >
                  <div className="pr-2 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#172217]">Co-Founder Dual Pass</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-950 font-mono text-[8px] font-bold">
                        SAVE 15%
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-800 font-mono block truncate">
                      2 Seats · Free Colleague Swap &amp; Split Rollover
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-extrabold text-xs sm:text-sm text-[#1C3B34] block">
                      ₦{Math.round(parsedSoloNGN * duoMultiplier).toLocaleString()}
                    </span>
                    <span className="text-[9px] text-[#637365] font-mono block">/ ${Math.round(event.price * duoMultiplier)} USD</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Payment Plan */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1C3B34] text-white inline-flex items-center justify-center text-[9px]">2</span>
                  <span>Payment Plan</span>
                </label>
                <span className="text-[9px] text-emerald-800 font-mono font-bold">
                  {paymentPlan === "deposit" ? "★ Low-Barrier Entry" : "✓ Paid In Full"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Pay In Full */}
                <button
                  type="button"
                  onClick={() => setPaymentPlan("full")}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    paymentPlan === "full"
                      ? "bg-white border-[#1C3B34] ring-1.5 ring-[#1C3B34] shadow-xs"
                      : "bg-[#F1F4EE] border-[#D5DDD0] hover:bg-white"
                  }`}
                >
                  <div className="pr-2 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#172217]">Pay In Full</span>
                      {paymentPlan === "full" && (
                        <span className="w-3 h-3 rounded-full bg-[#1C3B34] text-white inline-flex items-center justify-center">
                          <Check className="w-2 h-2" />
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-700 block truncate">
                      Zero balance · 100% Confirmed VIP Pass
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-extrabold text-xs sm:text-sm text-[#1C3B34] block">
                      ₦{tuitionNGN.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-[#637365] font-mono block">/ ${tuitionUSD} USD</span>
                  </div>
                </button>

                {/* 2-Stage Plan */}
                <button
                  type="button"
                  onClick={() => setPaymentPlan("deposit")}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer relative flex items-center justify-between ${
                    paymentPlan === "deposit"
                      ? "bg-white border-emerald-700 ring-1.5 ring-emerald-700 shadow-xs"
                      : "bg-[#F1F4EE] border-[#D5DDD0] hover:bg-white"
                  }`}
                >
                  <div className="pr-2 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#172217]">Commitment Deposit</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-[8px] font-bold">
                        2-STAGE
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-900 font-mono block truncate">
                      Lock seat today · Bal ₦{balanceDueNGN.toLocaleString()} due 48h prior
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-extrabold text-xs sm:text-sm text-emerald-800 block">
                      ₦{depositNGN.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-[#637365] font-mono block">/ ${depositUSD} USD</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 3: Attendee Details */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase font-bold text-[#1C3B34] tracking-wider flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-full bg-[#1C3B34] text-white inline-flex items-center justify-center text-[9px]">3</span>
                <span>Attendee Information</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="relative">
                  <User className="w-3 h-3 text-[#637365] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-[#D5DDD0] focus:border-[#1C3B34] focus:ring-1 focus:ring-[#1C3B34] outline-none text-xs text-[#172217] placeholder:text-[#8A9988]"
                  />
                </div>
                <div className="relative">
                  <Mail className="w-3 h-3 text-[#637365] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="Official Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-[#D5DDD0] focus:border-[#1C3B34] focus:ring-1 focus:ring-[#1C3B34] outline-none text-xs text-[#172217] placeholder:text-[#8A9988]"
                  />
                </div>
                <div className="relative">
                  <Phone className="w-3 h-3 text-[#637365] absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    placeholder="WhatsApp / Phone (For Sprint)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-[#D5DDD0] focus:border-[#1C3B34] focus:ring-1 focus:ring-[#1C3B34] outline-none text-xs text-[#172217] placeholder:text-[#8A9988]"
                  />
                </div>
                <div className="relative">
                  <Building2 className="w-3 h-3 text-[#637365] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Company / Role (Optional)"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-[#D5DDD0] focus:border-[#1C3B34] focus:ring-1 focus:ring-[#1C3B34] outline-none text-xs text-[#172217] placeholder:text-[#8A9988]"
                  />
                </div>
              </div>
            </div>

            {/* Compact Executive Partner & Rollover Flexibility Banner */}
            <div className="rounded-xl bg-gradient-to-r from-amber-50/90 via-emerald-50/60 to-amber-50/90 border border-amber-200/80 px-3 py-2 flex items-center justify-between gap-2 text-[#1C3B34]">
              <div className="flex items-center gap-2 min-w-0">
                <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                <div className="text-[10px] leading-tight text-[#3D4D3E]">
                  <strong className="text-amber-950 font-bold block sm:inline mr-1">
                    100% Executive Flexibility Guarantee:
                  </strong>
                  <span>Free colleague swap anytime • Split cohort rollover • Store credit backup.</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-800 text-white text-[8px] font-mono font-bold shrink-0">
                ZERO RISK
              </span>
            </div>

            {/* 3. Compact Bottom Action Row */}
            <div className="pt-2 border-t border-[#D5DDD0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[9px] font-mono text-[#637365] uppercase tracking-wider block font-medium">
                  {paymentPlan === "deposit" ? "STAGE 1 DUE TODAY (SEAT LOCK)" : "TOTAL REGISTRATION TUITION"}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-mono font-extrabold text-[#111C15]">
                    ₦{dueTodayNGN.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-[#637365]">/ ${dueTodayUSD} USD</span>
                  {paymentPlan === "deposit" && (
                    <span className="text-[10px] font-mono text-amber-900 ml-1">
                      (Bal: ₦{balanceDueNGN.toLocaleString()} due 48h prior)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-1 shrink-0">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#17302A] via-[#1C3B34] to-[#254A40] hover:from-[#11231D] hover:to-[#1C3B34] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 active:scale-[0.99]"
                >
                  <span>
                    {isSubmitting
                      ? "LOCKING SEAT..."
                      : paymentPlan === "deposit"
                      ? `LOCK SEAT (₦${dueTodayNGN.toLocaleString()}) →`
                      : "CONFIRM SEAT & CHECKOUT →"}
                  </span>
                  <ArrowRight size={13} />
                </button>

                <div className="flex items-center gap-2 text-[9px] font-mono text-[#637365] justify-center sm:justify-end">
                  <span className="flex items-center gap-0.5"><Lock size={9} /> 256-Bit SSL</span>
                  <span>•</span>
                  <span>80 Seat Cap</span>
                  <span>•</span>
                  <span>Official Origin Pass</span>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
