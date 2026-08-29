"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  Send, 
  Check, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  Copy, 
  CheckCircle2, 
  HelpCircle,
  BookOpen,
  Award,
  Users
} from "lucide-react";
import { useToast } from "../contexts/ToastContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("customer-service");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const categories = [
    { id: "customer-service", label: "Customer Service", icon: HelpCircle },
    { id: "cohort-support", label: "Cohort & Events", icon: Award },
    { id: "ebooks", label: "eBooks & Store", icon: BookOpen },
    { id: "partnerships", label: "Partnerships", icon: Users },
  ];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`${fieldName} copied to clipboard!`, "success");
    setTimeout(() => setCopiedField(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          category: selectedCategory,
          source: "Origin Support Page (/contact)",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        showToast("Your message has been sent to our official inbox! We'll reply within 2–4 hours.", "success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        showToast(data.error || "Failed to send message. Please try again or reach out on WhatsApp.", "error");
      }
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      showToast("Network error. Please try again or reach our WhatsApp desk directly.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const WHATSAPP_URL = "https://wa.me/2349119059859?text=" + encodeURIComponent("Hello Origin Support! I am reaching out regarding " + selectedCategory);

  return (
    <div className="min-h-screen bg-[#8A948B] text-white font-sans pb-24 selection:bg-white selection:text-[#8A948B] relative overflow-hidden">
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] bg-white/15 blur-[120px] sm:blur-[150px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      <div className="relative z-10">
        {/* Top Header Navigation Strip */}
        <div className="border-b border-white/15 py-3 sm:py-3.5 bg-black/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link 
                href="/" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all border border-white/15 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Back to Home</span>
                <span className="xs:hidden">Home</span>
              </Link>
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center shrink-0">
                  <Image src="/origin.png" alt="Origin Logo" fill sizes="24px" className="object-cover" />
                </div>
                <span className="font-extrabold text-[11px] sm:text-xs tracking-tight text-white font-mono uppercase truncate max-w-[150px] sm:max-w-none">
                  Origin Support Desk
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                Support Online
              </span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-6 sm:pb-8">
          <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-[11px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Get in Touch // Dedicated Concierge</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
              How Can We Assist You?
            </h1>

            <p className="text-white/85 text-xs sm:text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed px-1">
              Have questions about your cohort access, digital downloads, speaking engagements, or institutional partnerships? Reach our team directly below.
            </p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Column (7 cols): Clean Architectural Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#E2E8DE] text-[#172217] rounded-[1.75rem] sm:rounded-[2rem] border border-[#D5DDCF] shadow-2xl p-4 sm:p-7 lg:p-9 space-y-5 sm:space-y-6">
                
                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h2 className="text-lg sm:text-2xl font-serif font-extrabold text-[#172217]">
                      Send Us a Message
                    </h2>
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#4E5B4B] font-bold uppercase">
                      Average Response: &lt; 4 Hours
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4E5B4B] font-light leading-relaxed">
                    Select an inquiry category and fill out the details below. Our concierge team reviews all tickets in real time.
                  </p>
                </div>

                {/* Inquiry Category Switcher Pills */}
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-[11px] font-mono font-bold text-[#1C3B34] uppercase tracking-wider block">
                    Inquiry Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#2563EB] text-white border-[#2563EB] shadow-sm scale-[1.02]"
                              : "bg-white/80 text-[#172217] border-[#CCD6C6] hover:bg-white hover:border-[#2563EB]/50"
                          }`}
                        >
                          <Icon className={`w-4 h-4 mb-1 ${isSelected ? "text-white" : "text-[#1C3B34]"}`} />
                          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-tight">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Elements */}
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 sm:p-8 rounded-2xl bg-white border border-[#CCD6C6] text-center space-y-4 shadow-sm"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-serif font-extrabold text-[#172217]">Message Received</h3>
                      <p className="text-xs sm:text-sm text-[#4E5B4B] max-w-md mx-auto leading-relaxed">
                        Thank you! Your message has been logged under ticket category <strong className="text-[#1C3B34] uppercase font-mono font-bold">[{selectedCategory}]</strong>. Our team will contact you via email shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="py-2.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] sm:text-[11px] font-mono font-bold text-[#1C3B34] uppercase tracking-wider block">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Chinedu Okafor"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-[#CCD6C6] text-[#172217] text-xs font-sans placeholder-[#8A948B] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-[10px] sm:text-[11px] font-mono font-bold text-[#1C3B34] uppercase tracking-wider block">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="chinedu@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-[#CCD6C6] text-[#172217] text-xs font-sans placeholder-[#8A948B] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-[11px] font-mono font-bold text-[#1C3B34] uppercase tracking-wider block">
                        Subject Line <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Question regarding JUMPSTART Cohort access"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-[#CCD6C6] text-[#172217] text-xs font-sans placeholder-[#8A948B] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-[11px] font-mono font-bold text-[#1C3B34] uppercase tracking-wider block">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Please provide full details so we can assist you with maximum speed..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white border border-[#CCD6C6] text-[#172217] text-xs font-sans placeholder-[#8A948B] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Blue Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-mono font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message →</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="pt-3.5 border-t border-[#CCD6C6] flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#4E5B4B] text-center sm:text-left">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1C3B34]" />
                    <span>Protected by Origin Security &amp; Privacy Shield</span>
                  </div>
                  <span>WAT (GMT+1)</span>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Official Direct Channels & Concierge Details */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              
              {/* Direct WhatsApp Concierge Card */}
              <div className="bg-[#E2E8DE] text-[#172217] rounded-[1.75rem] sm:rounded-[2rem] border border-[#D5DDCF] shadow-xl p-4 sm:p-7 space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase">
                    <MessageCircle className="w-3 h-3" />
                    <span>Instant WhatsApp Desk</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">Fastest Response</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-serif font-extrabold text-[#172217]">
                    WhatsApp Direct Desk
                  </h3>
                  <p className="text-xs text-[#4E5B4B] font-light leading-relaxed">
                    Chat directly with our administrative team on WhatsApp for fast cohort onboarding, link verification, or urgent registration inquiries.
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-white/80 border border-[#CCD6C6] flex items-center justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[9px] sm:text-[10px] font-mono text-[#4E5B4B] uppercase block truncate">Direct Line / WhatsApp</span>
                    <span className="font-mono font-extrabold text-xs sm:text-sm text-[#1C3B34] truncate block">+234 (0) 911 905 9859</span>
                  </div>
                  <button
                    onClick={() => handleCopy("+2349119059859", "WhatsApp Number")}
                    className="p-2 rounded-lg bg-white hover:bg-[#E2E8DE] text-[#1C3B34] border border-[#CCD6C6] transition-all shrink-0 cursor-pointer"
                    title="Copy phone number"
                  >
                    {copiedField === "WhatsApp Number" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Direct Chat →</span>
                </a>
              </div>

              {/* Other Ways to Reach Us - Information Suite */}
              <div className="bg-[#E2E8DE] text-[#172217] rounded-[1.75rem] sm:rounded-[2rem] border border-[#D5DDCF] shadow-xl p-4 sm:p-7 space-y-4 sm:space-y-5">
                <h3 className="text-sm sm:text-base font-serif font-extrabold text-[#172217] uppercase tracking-wider">
                  Other Ways to Reach Us
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  {/* Official Email */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/80 border border-[#CCD6C6] space-y-1.5 sm:space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#1C3B34]" />
                        <span>Official Support Email</span>
                      </span>
                      <button
                        onClick={() => handleCopy("support@mindvestglobalresources.com.ng", "Email Address")}
                        className="text-[10px] font-mono text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        {copiedField === "Email Address" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === "Email Address" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <a
                      href="mailto:support@mindvestglobalresources.com.ng"
                      className="text-xs sm:text-sm font-mono font-bold text-[#2563EB] hover:underline block break-all"
                    >
                      support@mindvestglobalresources.com.ng
                    </a>
                  </div>

                  {/* Telephone Line */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/80 border border-[#CCD6C6] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#1C3B34]" />
                        <span>Telephone &amp; Hotlines</span>
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <a href="tel:+2349119059859" className="text-xs sm:text-sm font-mono font-bold text-[#172217] hover:text-[#2563EB] block">
                        +234 (0) 911 905 9859
                      </a>
                      <span className="text-[10px] font-mono text-[#4E5B4B] block">Available during working hours</span>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/80 border border-[#CCD6C6] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1C3B34]" />
                      <span>Office &amp; Support Hours</span>
                    </span>
                    <div className="text-xs font-mono font-bold text-[#172217]">
                      Monday – Friday, 9:00 AM – 5:00 PM (WAT)
                    </div>
                    <div className="text-[10px] text-[#4E5B4B] font-light leading-relaxed">
                      Weekend tickets and after-hours messages are addressed next business morning.
                    </div>
                  </div>

                  {/* Physical Hub Location */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/80 border border-[#CCD6C6] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1C3B34]" />
                      <span>Regional Headquarters</span>
                    </span>
                    <div className="text-xs font-mono font-bold text-[#172217]">
                      Mindvest Global Resources Ltd.
                    </div>
                    <div className="text-[10px] text-[#4E5B4B] font-light leading-relaxed">
                      Abuja &amp; Lagos Operations • Federal Republic of Nigeria
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
