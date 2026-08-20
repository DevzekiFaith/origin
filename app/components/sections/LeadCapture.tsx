"use client";

import { useState } from "react";
import { MessageCircle, Mail, Download, CheckCircle, ArrowRight, Sparkles, Users, Gift, ShieldCheck } from "lucide-react";
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
    <section className="py-24 px-4 relative overflow-hidden border-b border-[#E8E8E3] bg-[#FAFAF8] text-[#121316]">
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection>
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F3F3EE] border border-[#E2E2DC] text-[#52525B] text-xs font-mono uppercase rounded-full tracking-wider mb-4 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Free Practical Resource
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#121316] mb-4 tracking-tight">
              Get the Free <span className="text-emerald-700">7-Day Starter Guide</span>
            </h2>
            <p className="text-[#52525B] text-base max-w-xl mx-auto leading-relaxed">
              The <strong className="text-[#121316] font-semibold">Origin 7-Day Micro-Sprint Starter Guide</strong> — a
              practical PDF framework designed to kickstart your personal thinking transformation.
            </p>
          </div>

          {/* Two cards side by side */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* WhatsApp Card */}
            <div className="relative bg-[#FFFFFF] border border-[#E8E8E3] rounded-3xl p-7 sm:p-8 flex flex-col items-start gap-4 hover:border-emerald-600/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group">
              <span className="absolute top-5 right-5 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase rounded-full tracking-wider">
                Recommended
              </span>

              <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600">
                <MessageCircle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#121316] mb-1.5">Join via WhatsApp</h3>
                <p className="text-sm text-[#52525B] leading-relaxed">
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
                  <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-[#3F3F46]">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full bg-emerald-600 hover:bg-emerald-700 text-[#FFFFFF] font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all text-sm shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Join on WhatsApp — Get Free PDF
                <ArrowRight className="w-4 h-4 ml-auto" />
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-3xl p-7 sm:p-8 flex flex-col items-start gap-4 hover:border-[#121316] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group">
              <div className="w-12 h-12 bg-[#F3F3EE] border border-[#E2E2DC] rounded-2xl flex items-center justify-center text-[#121316]">
                <Mail className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#121316] mb-1.5">Subscribe via Email</h3>
                <p className="text-sm text-[#52525B] leading-relaxed">
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
                    className="w-full bg-[#FAFAF8] border border-[#E8E8E3] text-[#121316] placeholder-[#A1A1AA] px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[#121316] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="w-full bg-[#121316] hover:bg-[#27272A] text-[#FFFFFF] font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    {emailLoading ? "Sending..." : "Download Free Starter Guide"}
                  </button>
                </form>
              ) : (
                <div className="w-full p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Your PDF has been sent! Check your inbox.</span>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
