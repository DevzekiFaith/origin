"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Users, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Zap, 
  MessageCircle,
  FileText,
  Lock,
  Layers
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { getProductById } from "../data/store-products";

export default function JumpstartPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const product = getProductById(17);

  const handleInstantCheckout = () => {
    setIsProcessing(true);
    addToCart({
      id: `store-${product?.id || 17}`,
      title: product?.name || "JUMPSTART: 2-Day Live Intensive Accelerator",
      description: product?.description || "An intensive 2-Day Live Transformational Accelerator.",
      priceUSD: product?.price || 10.00,
      imageUrl: product?.imageUrl || "/jumpstart_cover.png",
    } as any);
    showToast("JUMPSTART Ticket added! Proceeding to checkout...", "success");
    router.push("/checkout");
  };

  const spectrumUnits = [
    { num: "01", name: "Perception", role: "The Lens of Reality", desc: "Rewire your default baseline to identify leverage and high-value opportunities where others see obstacles and lack." },
    { num: "02", name: "Usefulness", role: "The Engine of Impact", desc: "Transform raw gifts into deployed, high-impact market utility that the commercial marketplace cannot ignore." },
    { num: "03", name: "Boundaries", role: "Architecture of Preservation", desc: "Erect impenetrable focus perimeters to protect your internal ecosystem, time, and creative energy from distraction." },
    { num: "04", name: "Consent", role: "Mastery of Agreement", desc: "Absolute ownership of your 'Yes' and 'No' to eliminate misaligned commitments and energetic friction." },
    { num: "05", name: "Value", role: "Currency of Significance", desc: "Align your personal standards and output to command premium authority, high-yield results, and influence." },
    { num: "06", name: "Self-Mastery", role: "The Ultimate Governance", desc: "Master your internal emotional state to dictate and command the terms of your external reality." }
  ];

  return (
    <div className="min-h-screen bg-[#070b12] text-white selection:bg-[#60a5fa]/30 selection:text-white font-sans antialiased relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Broadcast Notification Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-emerald-900/40 to-blue-900/60 border-b border-white/10 px-4 py-2.5 text-center text-xs font-mono tracking-wide text-blue-200 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>RADIO & BROADCAST COHORT INTAKE // <strong>EARLY BIRD PASS: ₦10,000 ($10)</strong></span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
        
        {/* Main Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-16">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono font-bold text-blue-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE BECOMING INSTITUTE // 2-DAY ACCELERATOR</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-[1.15] text-white">
              Rising From Survival to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-blue-200">Realm of Succession</span>
            </h1>

            <p className="text-[#94a3b8] text-base sm:text-lg font-light leading-relaxed">
              JUMPSTART is an intensive 2-Day Live Accelerator and 21-Day Daily Cognitive Transformation. Engineered for individuals ready to migrate from restrictive, survival-based living into high-leverage impact, authority, and personal mastery.
            </p>

            {/* Event Specs Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Upcoming Weekend Cohort</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GoogleMeet Live @ 5:00 PM WAT</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>21-Day Private WhatsApp Cohort</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Limited Seats Remaining</span>
              </div>
            </div>

            {/* Pricing & Checkout Block */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1424] to-[#0a101d] border border-blue-500/30 shadow-2xl space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">EARLY BIRD TUITION</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white font-mono">₦10,000</span>
                    <span className="text-sm text-slate-400 font-mono">/ $10 USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 line-through">Standard: ₦67,500</span>
                  <span className="block text-xs font-bold text-emerald-400 font-mono">SAVE 85% TODAY</span>
                </div>
              </div>

              <button
                onClick={handleInstantCheckout}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-mono font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? "INITIALIZING SECURE CHECKOUT..." : "SECURE YOUR ₦10,000 TICKET NOW →"}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Instant Access</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-blue-400" /> 100% Secure Payment</span>
              </div>
            </div>

          </div>

          {/* Right Column: Flier & Deliverables Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1527] group">
              <Image
                src="/jumpstart_cover.png"
                alt="JUMPSTART 2-Day Live Intensive Accelerator"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-200">
                <p className="font-bold text-white mb-1">✦ Led by Zeki Ubor</p>
                <p className="text-[11px] text-slate-300">Live Virtual Interactive Sessions + 21-Day Accountability Sprint.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 2-Day Schedule Breakdown */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">2-Day Live Accelerator Schedule</h2>
            <p className="text-slate-400 text-sm">Two intensive evening sessions designed for irreversible personal shift.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1424] border border-white/10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-mono text-xs font-bold">
                DAY 1 // SATURDAY @ 5:00 PM WAT
              </div>
              <h3 className="text-xl font-serif font-bold text-white">The Cognitive Migration</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Deep-dive into Units 1 & 2 (Perception & Usefulness). Dismantling default programming of lack and fear, re-engineering your cognitive lens to spot leverage, and converting raw potential into high-impact market utility.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c1424] border border-white/10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">
                DAY 2 // SUNDAY @ 5:00 PM WAT
              </div>
              <h3 className="text-xl font-serif font-bold text-white">The Architecture of Execution</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Mastering Units 3, 4, 5 & 6 (Boundaries, Consent, Value & Self-Mastery). Erecting impenetrable focus perimeters, mastering high-leverage agreements, commanding premium worth, and achieving emotional governance.
              </p>
            </div>
          </div>
        </div>

        {/* The 6 Core Units of Transformation */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">The 6 Spectrum Units of Transformation</h2>
            <p className="text-slate-400 text-sm">Your framework for the 2-day accelerator and subsequent 21-day daily prompts.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {spectrumUnits.map((u, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0b1220] border border-white/5 hover:border-blue-500/30 transition-all space-y-2">
                <span className="text-xs font-mono font-bold text-blue-400">{u.num} // {u.role.toUpperCase()}</span>
                <h4 className="text-lg font-serif font-bold text-white">{u.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Included Resources Pack */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0e172a] to-[#0a1120] border border-white/10 mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">INCLUDED DELIVERABLES</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Your Complete Accelerator Resource Pack</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>The Human Broadcast Environment Matrix (PDF)</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Architecture of Intention Blueprint (PDF)</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Habit Building Guide (PDF)</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Exclusive Invite to Private WhatsApp Cohort</span>
            </div>
          </div>
        </div>

        {/* Final CTA Strip */}
        <div className="text-center py-10 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">Ready to Step Into the Realm of Succession?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Take immediate action. Register now at the early bird rate of ₦10,000 and join the private cohort.
          </p>
          <button
            onClick={handleInstantCheckout}
            disabled={isProcessing}
            className="py-4 px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-mono font-bold text-sm uppercase tracking-wider transition-all shadow-xl shadow-blue-500/20 inline-flex items-center gap-2 cursor-pointer"
          >
            {isProcessing ? "PROCESSING..." : "REGISTER FOR JUMPSTART NOW (₦10,000) →"}
          </button>
        </div>

      </div>
    </div>
  );
}
