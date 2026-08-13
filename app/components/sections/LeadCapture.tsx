"use client";

import { useState } from "react";
import { MessageCircle, Mail, Download, CheckCircle, ArrowRight, Sparkles, Users, Gift, ShieldCheck } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

export default function LeadCapture() {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const WHATSAPP_NUMBER = "2349119059859";
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hi! I'd like to join the Origin community and get the free 7-Day Micro-Sprint Starter Guide 🚀"
  );
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  const FREE_PDF_URL = "/documents/origin_7day_sprint_starter.pdf";

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailLoading(true);
    // Simulate submission — replace with real API call (Mailchimp/Brevo/etc.)
    await new Promise((r) => setTimeout(r, 900));
    setEmailLoading(false);
    setEmailSubmitted(true);
    // Trigger PDF download after subscribe
    const link = document.createElement("a");
    link.href = FREE_PDF_URL;
    link.download = "Origin_7Day_MicroSprint_StarterGuide.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#0b1220] to-[#0f1724]">
      {/* Ambient light orbs */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-[#60a5fa]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection>
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase rounded-full tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Free for You — No Credit Card
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Get the Free <span className="text-[#60a5fa]">7-Day Starter Guide</span>
            </h2>
            <p className="text-[#9aa4b2] text-base max-w-xl mx-auto font-light leading-relaxed">
              The <strong className="text-white font-semibold">Origin 7-Day Micro-Sprint Starter Guide</strong> — a
              practical PDF that kickstarts your human architecture journey. Free when you join our community.
            </p>
          </div>

          {/* Two cards side by side */}
          <div className="grid md:grid-cols-2 gap-5 mb-10">

            {/* WhatsApp Card — Primary */}
            <div className="relative bg-gradient-to-br from-[#0d1f18] to-[#091a12] border border-emerald-500/30 rounded-2xl p-7 flex flex-col items-start gap-4 hover:border-emerald-500/50 transition-all duration-300 shadow-xl shadow-emerald-950/30 group">
              {/* Badge */}
              <span className="absolute top-4 right-4 px-2.5 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase rounded-full tracking-wider">
                Recommended
              </span>

              <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white mb-1.5 tracking-tight">Join via WhatsApp</h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  Get instant access to the free PDF, course updates, live cohort alerts, and community drops — all on
                  WhatsApp. Fastest way to stay connected.
                </p>
              </div>

              <ul className="space-y-1.5 w-full">
                {[
                  "Free 7-Day Micro-Sprint PDF (instant)",
                  "Exclusive founding member deals",
                  "Live cohort & event alerts",
                  "Direct community access",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-emerald-500/20 text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Join on WhatsApp — Get Free PDF
                <ArrowRight className="w-4 h-4 ml-auto" />
              </a>

              <p className="text-[10px] text-zinc-500 text-center w-full -mt-1">
                Opens WhatsApp with a pre-filled message · No spam, ever
              </p>
            </div>

            {/* Email Card — Secondary */}
            <div className="bg-[#0e1624]/80 border border-white/10 rounded-2xl p-7 flex flex-col items-start gap-4 hover:border-[#60a5fa]/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#60a5fa]/10 border border-[#60a5fa]/20 rounded-2xl flex items-center justify-center group-hover:bg-[#60a5fa]/20 transition-colors">
                <Mail className="w-6 h-6 text-[#60a5fa]" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white mb-1.5 tracking-tight">Subscribe via Email</h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  Prefer email? Get the free PDF delivered to your inbox along with weekly insights on human
                  architecture, mindset, and practical growth.
                </p>
              </div>

              {!emailSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="w-full flex flex-col gap-3 mt-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#60a5fa]/50 focus:bg-white/8 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="w-full bg-[#60a5fa] hover:bg-[#3b82f6] disabled:opacity-60 text-black font-black py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#60a5fa]/15 text-sm"
                  >
                    {emailLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Get Free PDF via Email
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="w-full mt-auto flex flex-col items-center gap-3 py-4 text-center">
                  <div className="w-12 h-12 bg-emerald-500/15 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">You're in! 🎉</p>
                    <p className="text-zinc-400 text-xs mt-1">
                      Your PDF download started. Check your inbox for the welcome email.
                    </p>
                  </div>
                  <a
                    href={FREE_PDF_URL}
                    download="Origin_7Day_MicroSprint_StarterGuide.pdf"
                    className="text-[#60a5fa] text-xs font-bold underline underline-offset-4 hover:text-white transition-colors"
                  >
                    Download didn't start? Click here
                  </a>
                </div>
              )}

              <p className="text-[10px] text-zinc-500 -mt-1">
                No spam. Unsubscribe anytime. Your data is safe.
              </p>
            </div>
          </div>

          {/* Social proof footer */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Users className="w-4 h-4 text-[#60a5fa]" />
              <span>
                <strong className="text-white">1,200+</strong> students already in community
              </span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white">Free forever</strong> — no strings attached
              </span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Download className="w-4 h-4 text-amber-400" />
              <span>
                Instant PDF access on sign-up
              </span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
