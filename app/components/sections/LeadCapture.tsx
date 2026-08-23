"use client";

import { useState } from "react";
import { MessageCircle, Mail, Download, CheckCircle, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";

export default function LeadCapture() {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const WHATSAPP_URL = "https://wa.me/2349119059859?text=" + encodeURIComponent("Hello! I would like to join the Origin community and receive the free 7-Day Starter Guide PDF! 🚀");
  const FREE_PDF_URL = "/documents/origin_7day_sprint_starter.pdf";

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Subscription error:", errorData.error || response.statusText);
      }
    } catch (err) {
      console.error("Failed to subscribe email:", err);
    } finally {
      setEmailLoading(false);
      setEmailSubmitted(true);
    }
    const link = document.createElement("a");
    link.href = FREE_PDF_URL;
    link.download = "Origin_7Day_MicroSprint_StarterGuide.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden border-b border-white/15 bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white selection:bg-white selection:text-[#8A948B]">
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-white/15 blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection>
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-mono uppercase rounded-full tracking-wider mb-4 shadow-sm backdrop-blur-md font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Free Practical Resource
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white mb-4 tracking-tight leading-tight">
              Get the Free <span className="text-amber-300">7-Day Starter Guide</span>
            </h2>
            <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-light">
              The <strong className="text-white font-semibold">Origin 7-Day Micro-Sprint Starter Guide</strong> — a
              practical PDF framework designed to kickstart your personal thinking transformation.
            </p>
          </div>

          {/* Two cards side by side */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* WhatsApp Card */}
            <div className="relative bg-[#E2E8DE] border border-[#D5DDCF] rounded-3xl p-7 sm:p-8 flex flex-col items-start gap-4 hover:border-[#1C3B34] transition-all duration-300 shadow-2xl text-[#172217] group">
              <span className="absolute top-5 right-5 px-3 py-1 bg-[#1C3B34] text-white text-[10px] font-mono font-bold uppercase rounded-full tracking-wider shadow-xs">
                Recommended
              </span>

              <div className="w-12 h-12 bg-white/80 border border-[#CCD6C6] rounded-2xl flex items-center justify-center text-[#1C3B34] shadow-xs">
                <MessageCircle className="w-6 h-6 text-[#1C3B34]" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#172217] mb-1.5">Join via WhatsApp</h3>
                <p className="text-sm text-[#4E5B4B] leading-relaxed">
                  Get instant access to the free PDF, course alerts, and community drops directly on WhatsApp.
                </p>
              </div>

              <ul className="space-y-2 w-full my-2">
                {[
                  "Free 7-Day Micro-Sprint PDF (instant)",
                  "Exclusive founding member updates",
                  "Live workshop alerts",
                  "Direct practical insights",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-[#172217]">
                    <CheckCircle className="w-4 h-4 text-[#1C3B34] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full bg-[#1C3B34] hover:bg-[#132B25] text-white font-mono font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all text-sm shadow-md"
              >
                <MessageCircle className="w-5 h-5 text-emerald-300" />
                <span>Join on WhatsApp — Get Free PDF</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-[#E2E8DE] border border-[#D5DDCF] rounded-3xl p-7 sm:p-8 flex flex-col items-start gap-4 hover:border-[#1C3B34] transition-all duration-300 shadow-2xl text-[#172217] group">
              <div className="w-12 h-12 bg-white/80 border border-[#CCD6C6] rounded-2xl flex items-center justify-center text-[#172217] shadow-xs">
                <Mail className="w-6 h-6 text-[#172217]" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#172217] mb-1.5">Subscribe via Email</h3>
                <p className="text-sm text-[#4E5B4B] leading-relaxed">
                  Prefer email? Receive the free PDF in your inbox along with weekly insights on practical thinking and personal architecture.
                </p>
              </div>

              {!emailSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="w-full flex flex-col gap-3 mt-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your best email address..."
                    className="w-full bg-white/90 border border-[#CCD6C6] text-[#172217] placeholder-[#71717A] px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[#1C3B34] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="w-full bg-[#8A948B] hover:bg-[#1C3B34] text-white font-mono font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>{emailLoading ? "Sending..." : "Download Free Starter Guide"}</span>
                  </button>
                </form>
              ) : (
                <div className="w-full p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-[#172217] text-sm flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#1C3B34] shrink-0" />
                  <span className="font-bold">Your PDF has been sent! Check your inbox.</span>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
