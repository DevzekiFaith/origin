"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Heart, Users, Send, CheckCircle2, ShieldCheck, ArrowRight, User, Phone, Mail, MapPin, Award, Compass } from "lucide-react";
import { useToast } from "../contexts/ToastContext";

interface FitForProfitVolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FitForProfitVolunteerModal({
  isOpen,
  onClose,
}: FitForProfitVolunteerModalProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "",
    role: "Community Outreach Facilitator",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock background body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleResetAndClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.state) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const existingVolunteers = JSON.parse(localStorage.getItem("origin_volunteers") || "[]");
      const newVolunteer = {
        ...formData,
        submittedAt: new Date().toISOString(),
        id: `vol_${Date.now()}`
      };
      localStorage.setItem("origin_volunteers", JSON.stringify([...existingVolunteers, newVolunteer]));
      localStorage.setItem("origin_impact_corps", JSON.stringify([...existingVolunteers, newVolunteer]));
    } catch {
      // ignore storage errors
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast("Impact Corps application submitted successfully!", "success");
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      state: "",
      role: "Community Outreach Facilitator",
      notes: "",
    });
    onClose();
  };

  return (
    <div
      onClick={handleResetAndClose}
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Glow Ambient Backdrop */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Modal Card Shell - Responsive 2-Column Grid on md screens */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#080c16] border border-amber-400/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.2)] flex flex-col md:flex-row my-auto max-h-[92vh] md:max-h-[88vh]"
      >
        
        {/* Top-Right High Visibility Close Button */}
        <button
          onClick={handleResetAndClose}
          type="button"
          title="Close Modal"
          className="absolute top-3 right-3 z-30 px-3 py-1.5 bg-black/85 hover:bg-red-500 text-white rounded-full flex items-center gap-1.5 transition-all border border-white/20 shadow-lg backdrop-blur-md cursor-pointer text-xs font-bold"
        >
          <span>Close</span>
          <X className="w-4 h-4" />
        </button>

        {/* LEFT COLUMN: Hero Image with FIP Logo and Branding - Compact on mobile */}
        <div className="relative w-full md:w-[42%] h-32 sm:h-40 md:h-auto overflow-hidden bg-gradient-to-br from-[#0a1122] via-[#0d172e] to-[#172545] shrink-0 border-b md:border-b-0 md:border-r border-white/10">
          <Image
            src="/outreach_child_hero.png"
            alt="Fit For Profit Impact Corps — Free Educational Outreach"
            fill
            priority
            className="object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c16] via-[#080c16]/30 to-black/60 md:bg-gradient-to-r md:from-transparent md:to-[#080c16]/90" />
          
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-black/85 border border-amber-400/50 rounded-full text-[9px] font-mono font-black text-amber-300 uppercase tracking-widest backdrop-blur-md shadow-lg">
              <Image src="/fip_logo.png" alt="FIP Logo" width={16} height={16} className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />
              <span>IMPACT CORPS</span>
            </div>
          </div>

          <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 space-y-1 sm:space-y-1.5">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 bg-emerald-950/85 border border-emerald-500/40 rounded-full text-[8px] sm:text-[9px] font-black text-emerald-300 uppercase tracking-wider backdrop-blur-md shadow-md">
              <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 fill-emerald-400/40 animate-pulse" />
              <span>FREE COMMUNITY OUTREACH</span>
            </div>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              Empower Communities &amp; Youth
            </h2>
            <p className="text-[11px] text-zinc-300 font-light leading-snug line-clamp-2 hidden sm:block">
              Fit For Profit Impact Corps staging free educational drives, mentorship &amp; community service across states.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Form Body Content - Smoothly scrollable with min-h-0 and overscroll control */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1 min-h-0 flex flex-col">
          {isSubmitted ? (
            <div className="my-auto text-center space-y-4 py-3 animate-fadeIn">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#0a1420] border border-amber-400/50 rounded-2xl flex items-center justify-center shadow-lg p-2.5">
                  <Image src="/fip_logo.png" alt="FIP Logo" width={48} height={48} className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] font-bold text-emerald-400">
                  <Compass className="w-3 h-3" />
                  <span>Enrollment Confirmed</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">Application Received!</h3>
                <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.fullName}</strong>. You are enrolled in the <strong className="text-amber-300">Fit For Profit Impact Corps</strong>.
                </p>
              </div>

              <div className="p-3 bg-[#0d1424] border border-white/10 rounded-xl text-left space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-400 font-bold uppercase text-[10px] sm:text-xs">
                  <span>Assigned Role</span>
                  <span className="text-amber-300">{formData.role}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 font-bold uppercase text-[10px] sm:text-xs">
                  <span>Location</span>
                  <span className="text-zinc-200">{formData.state}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href={`https://wa.me/2349119059859?text=Hello%20Fit%20For%20Profit%20Impact%20Corps%20Coordinator,%20I%20am%20${encodeURIComponent(formData.fullName)}%20from%20${encodeURIComponent(formData.state)}.%20I%20just%20submitted%20my%20Impact%20Corps%20application!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-full text-xs transition-all flex items-center justify-center gap-1.5 shadow-md min-h-[42px]"
                >
                  <span>Connect on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-full text-xs transition-all border border-white/10 min-h-[42px]"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="my-auto space-y-3 py-1">
              <div className="flex items-center gap-3 pr-20 md:pr-14">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-950 via-[#0d172e] to-[#080c16] border border-amber-400/40 p-1.5 flex items-center justify-center shrink-0 shadow-lg">
                  <Image src="/fip_logo.png" alt="FIP Logo" width={36} height={36} className="w-full h-full object-contain" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[9px] sm:text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest">A Movement of Origin</div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">Impact Corps Registration</h3>
                </div>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400">Fill in your details to join the free educational &amp; community impact movement.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-0.5">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3 h-3 text-amber-400" />
                    <span>Full Name</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Okon"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 sm:py-2.5 bg-[#0d1424] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>

                {/* WhatsApp / Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-400" />
                    <span>WhatsApp / Phone</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08012345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 sm:py-2.5 bg-[#0d1424] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
                    <Mail className="w-3 h-3 text-amber-400" />
                    <span>Email Address</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 sm:py-2.5 bg-[#0d1424] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>

                {/* State / City */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>State / Location</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lagos, Abuja, Uyo"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 sm:py-2.5 bg-[#0d1424] border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>
              </div>

              {/* Impact Area Role */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>Preferred Impact Area</span>
                  <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 sm:py-2.5 bg-[#0d1424] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-all"
                >
                  <option value="Community Outreach Facilitator">Community Outreach Facilitator</option>
                  <option value="School & Education Mentor">School &amp; Education Mentor</option>
                  <option value="Logistics & Event Setup">Logistics &amp; Event Setup</option>
                  <option value="Media, Photography & Content">Media, Photography &amp; Content</option>
                  <option value="General Impact Corps Member">General Impact Corps Member</option>
                </select>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 sm:py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-bold rounded-full text-xs transition-all border border-white/10 cursor-pointer min-h-[42px]"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold rounded-full text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer min-h-[42px]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Submitting..." : "Submit Impact Corps Application"}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 pt-0.5 pb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-center">100% Free Participation • No Fees Required • Transform Communities</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export const FitForProfitImpactCorpsModal = FitForProfitVolunteerModal;
