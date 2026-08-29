"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Users, 
  GraduationCap, 
  HeartHandshake, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle,
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  Check,
  MessageCircle,
  Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../contexts/ToastContext";

interface AudiencePathway {
  id: string;
  tabLabel: string;
  ageRange: string;
  title: string;
  tagline: string;
  description: string;
  keyOutcomes: string[];
  recommendedStartTitle: string;
  recommendedStartHref: string;
  parentOrSchoolDetails?: {
    question: string;
    answer: string;
  }[];
}

const AUDIENCES: AudiencePathway[] = [
  {
    id: "young-minds",
    tabLabel: "Young Minds",
    ageRange: "Ages 10–17",
    title: "CURIOSITY, REASONING & PRACTICAL THINKING",
    tagline: "Building mental models and financial common sense before adulthood.",
    description: "Conventional schooling trains young minds to memorize facts for exams. Origin trains young minds to evaluate choices, understand scarcity, calculate trade-offs, and express ideas with confidence.",
    keyOutcomes: [
      "Understanding money as a measure of trade-offs, not just paper to spend",
      "Confidence expressing complex ideas and asking deep questions in group settings",
      "Evaluating consequences before acting rather than succumbing to peer impulse",
      "Building a solid internal self-image rooted in competence rather than validation"
    ],
    recommendedStartTitle: "Economic Principles: Money, Value & Choice",
    recommendedStartHref: "/courses/economic-principles"
  },
  {
    id: "young-adults",
    tabLabel: "Young Adults",
    ageRange: "Ages 18–25",
    title: "MONEY, WORK, DECISIONS & ASYMMETRIC OPPORTUNITY",
    tagline: "Navigating university, early career, capital allocation, and independence.",
    description: "The transition into adulthood demands high-stakes decisions with zero practice. Origin equips young adults with rigorous frameworks to allocate scarce capital, diagnose career bottlenecks, and command respect in negotiations.",
    keyOutcomes: [
      "Deconstructing complex career and financial friction into actionable solution trees",
      "Mastering opportunity cost and asset cultivation (Money Farming)",
      "High-conviction decision-making under uncertainty without second-guessing",
      "Communicating with structured clarity and strategic composure"
    ],
    recommendedStartTitle: "Decision Making: Critical Thinking Under Pressure",
    recommendedStartHref: "/courses/decision-making"
  },
  {
    id: "adults",
    tabLabel: "Adults & Leaders",
    ageRange: "Ages 26+",
    title: "STRATEGIC INTUITION, ADAPTABILITY & HIGH-STAKES CLARITY",
    tagline: "Operating with calm conviction in volatile markets and complex teams.",
    description: "For professionals, founders, and leaders whose decisions carry major personal and financial weight. Origin provides mental models, antifragility systems, and communication frameworks to thrive when plans collapse.",
    keyOutcomes: [
      "Antifragile adaptability: turning unexpected disruption into leverage",
      "Resolving high-stakes negotiation friction without defensiveness",
      "Inversion thinking to systematically protect capital and eliminate blindspots",
      "Engineering personal boundaries and sustainable energy architectures"
    ],
    recommendedStartTitle: "Problem Solving: The Solution Mindset",
    recommendedStartHref: "/courses/problem-solving"
  },
  {
    id: "parents",
    tabLabel: "For Parents",
    ageRange: "Parent Guide",
    title: "WHAT IS YOUR CHILD ACTUALLY LEARNING?",
    tagline: "A safe, practical environment that complements schooling with real-world capability.",
    description: "Parents are not simply buyers; you want to know what changes in your child's daily behavior. Origin does not replace school academics—it builds the practical reasoning, financial clarity, and emotional composure schools rarely teach.",
    keyOutcomes: [
      "Safe, age-appropriate scenarios grounded in real Nigerian and global realities",
      "Learner performs active thinking loops (Think → Choose → Discover → Apply)",
      "Zero fear-based marketing; pure focus on capability, curiosity, and character",
      "Noticeable transformation in how your child discusses money, time, and responsibility"
    ],
    parentOrSchoolDetails: [
      {
        question: "What does the learner actually do on Origin?",
        answer: "Instead of passively watching long lectures, learners enter interactive situations (like the ₦20,000 challenge), make forced trade-off choices under constraints, reveal the underlying economic or psychological principle, and apply it to their personal life."
      },
      {
        question: "Is the platform safe and appropriate for young teenagers?",
        answer: "Yes. All content is strictly educational, focused on character, practical economics, decision-making, and critical thinking. There are no distracting social feeds or unmoderated chat rooms."
      },
      {
        question: "What changes after experiencing Origin?",
        answer: "Learners stop seeing money and decisions passively. They start calculating trade-offs, managing time deliberately, expressing thoughts clearly, and taking ownership of their actions."
      }
    ],
    recommendedStartTitle: "Explore Foundations for Youth",
    recommendedStartHref: "/courses/economic-principles"
  },
  {
    id: "schools",
    tabLabel: "Schools & Orgs",
    ageRange: "Institutions",
    title: "PRACTICAL THINKING BEYOND THE CLASSROOM",
    tagline: "Complementing conventional curricula with experiential problem-solving.",
    description: "Origin partners with schools, youth foundations, and learning communities to integrate interactive decision simulations and economic thinking into extracurricular and leadership development programs.",
    keyOutcomes: [
      "Experiential simulations that bring economics and critical thinking to life",
      "Group challenges designed for classroom debates and cohort problem-solving",
      "Structured learning companions with workbook reflection guides",
      "Empowers educators with inquiry-based discussion frameworks"
    ],
    parentOrSchoolDetails: [
      {
        question: "Does Origin claim accreditation?",
        answer: "Origin is an independent practical thinking platform and does not make misleading accreditation claims. We provide enrichment experiences that strengthen real-world cognitive capability alongside conventional academic schooling."
      },
      {
        question: "How do organizations partner with Origin?",
        answer: "We support cohort licensing, customized workshop simulations, and bulk digital access for classrooms, youth centers, and corporate training programs."
      }
    ],
    recommendedStartTitle: "Inquire About School & Cohort Access",
    recommendedStartHref: "/contact"
  }
];

export default function AudiencePathways() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const currentAudience = AUDIENCES[activeTabIdx];
  const { showToast } = useToast();

  const [orgFormData, setOrgFormData] = useState({
    orgName: "",
    contactEmail: "",
    subject: "",
    message: "",
  });
  const [isSubmittingOrg, setIsSubmittingOrg] = useState(false);
  const [orgSubmitted, setOrgSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`${fieldName} copied to clipboard!`, "success");
    setTimeout(() => setCopiedField(null), 3000);
  };

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingOrg(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: orgFormData.orgName,
          email: orgFormData.contactEmail,
          subject: `[School/Org Partnership] ${orgFormData.subject}`,
          message: `Organization Name: ${orgFormData.orgName}\nContact Email: ${orgFormData.contactEmail}\n\nRequirements / Message:\n${orgFormData.message}`,
          category: "Schools & Orgs",
          source: "Homepage Audience Pathways (Schools & Orgs Tab)",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrgSubmitted(true);
        showToast("Institutional partnership inquiry sent! Our team will contact you within 2–4 hours.", "success");
        setOrgFormData({ orgName: "", contactEmail: "", subject: "", message: "" });
      } else {
        showToast(data.error || "Failed to send inquiry. Please reach out on WhatsApp.", "error");
      }
    } catch (err: any) {
      console.error("Error submitting org contact form:", err);
      showToast("Network error. Please try again or reach our WhatsApp desk directly.", "error");
    } finally {
      setIsSubmittingOrg(false);
    }
  };

  const WHATSAPP_URL = "https://wa.me/2349119059859?text=" + encodeURIComponent("Hello Origin! We would like to inquire about School & Organizational Cohort Licensing.");

  return (
    <section id="for-audiences" className="py-20 sm:py-32 bg-[#8A948B] text-white border-b border-white/15 relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
      {/* Subtle Radial Ambient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-mono text-white mb-3 sm:mb-4 shadow-sm backdrop-blur-md font-bold">
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span className="uppercase tracking-wider">TAILORED ENTRY PATHWAYS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight text-white mb-3 sm:mb-4">
            DESIGNED FOR EVERY STAGE OF LIFE
          </h2>

          <p className="text-white/85 text-xs sm:text-base md:text-lg font-light leading-relaxed px-1">
            Origin does not treat ages 10 to 45 as one generic audience. Discover how our experiences are tailored to your specific life stage and responsibilities.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {AUDIENCES.map((aud, idx) => {
            const isActive = activeTabIdx === idx;
            return (
              <button
                key={aud.id}
                onClick={() => setActiveTabIdx(idx)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-[11px] sm:text-sm font-mono font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 shadow-sm ${
                  isActive
                    ? "bg-[#E2E8DE] text-[#1C3B34] shadow-xl scale-105"
                    : "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white border border-white/20 backdrop-blur-md"
                }`}
              >
                <span>{aud.tabLabel}</span>
                <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isActive ? "bg-[#1C3B34] text-white" : "bg-white/20 text-white/80"
                }`}>
                  {aud.ageRange}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pathway Content Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAudience.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-[#E2E8DE] rounded-[1.75rem] sm:rounded-[2.5rem] border border-[#D5DDCF] text-[#172217] shadow-2xl p-5 sm:p-9 lg:p-12 space-y-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-[#D0D9CA]">
              <div className="space-y-2 max-w-2xl">
                <div className="text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                  PATHWAY // {currentAudience.tabLabel.toUpperCase()} ({currentAudience.ageRange})
                </div>
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#172217] tracking-tight leading-tight">
                  {currentAudience.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-serif italic text-[#4E5B4B]">
                  &ldquo;{currentAudience.tagline}&rdquo;
                </p>
                <p className="text-xs sm:text-sm md:text-base text-[#4E5B4B] leading-relaxed pt-1 sm:pt-2">
                  {currentAudience.description}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-3 sm:space-y-4 shrink-0 lg:max-w-xs w-full shadow-xs">
                <div className="text-[10px] sm:text-xs font-mono uppercase font-bold text-[#1C3B34]">
                  RECOMMENDED ENTRY POINT
                </div>
                <div className="font-extrabold text-sm sm:text-base text-[#172217]">
                  {currentAudience.recommendedStartTitle}
                </div>
                <Link
                  href={currentAudience.recommendedStartHref}
                  className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>{currentAudience.id === "schools" ? "CONTACT CONCIERGE" : "START THIS PATHWAY"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Key Outcomes Grid */}
            <div className="space-y-3 sm:space-y-4">
              <div className="text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                WHAT CHANGES AFTER THE EXPERIENCE:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {currentAudience.keyOutcomes.map((outcome, idx) => (
                  <div key={idx} className="p-3.5 sm:p-4 rounded-2xl bg-white/70 border border-[#CCD6C6] flex items-start gap-3 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#1C3B34] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#3E4A3B] leading-relaxed font-medium">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* If Schools & Orgs Tab is active, render the dedicated institutional Contact & Support suite */}
            {currentAudience.id === "schools" ? (
              <div className="pt-8 border-t border-[#D0D9CA] space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold uppercase">
                    <Building className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>INSTITUTIONAL PARTNERSHIPS &amp; CONCIERGE</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-serif font-extrabold text-[#172217]">
                    Inquire for Your School or Organization
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4E5B4B] font-light">
                    Directly reach our educational partnerships team for cohort licensing, bulk digital access, or workshop simulations.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column (7 cols): In-Place Institutional Contact Form */}
                  <div className="lg:col-span-7 bg-white/90 p-5 sm:p-7 rounded-2xl border border-[#CCD6C6] shadow-sm space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-[#1C3B34] uppercase block">
                        Direct Partnership Ticket
                      </span>
                      <p className="text-[11px] text-[#4E5B4B]">
                        Fill out the details below. Our institutional coordinator will respond within 2–4 hours.
                      </p>
                    </div>

                    {orgSubmitted ? (
                      <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                        <div className="space-y-1">
                          <span className="font-bold text-sm text-[#172217] block">Inquiry Transmitted Successfully</span>
                          <p className="text-xs text-[#4E5B4B]">
                            Thank you! Our institutional coordinator has logged your request and will reach out via email shortly.
                          </p>
                        </div>
                        <button
                          onClick={() => setOrgSubmitted(false)}
                          className="py-2 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-bold cursor-pointer"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleOrgSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono font-bold text-[#1C3B34] uppercase block">
                              School / Org Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Corona Schools / Youth Hub"
                              value={orgFormData.orgName}
                              onChange={(e) => setOrgFormData({ ...orgFormData, orgName: e.target.value })}
                              className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#CCD6C6] text-[#172217] text-xs focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono font-bold text-[#1C3B34] uppercase block">
                              Official Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="partnerships@school.edu.ng"
                              value={orgFormData.contactEmail}
                              onChange={(e) => setOrgFormData({ ...orgFormData, contactEmail: e.target.value })}
                              className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#CCD6C6] text-[#172217] text-xs focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono font-bold text-[#1C3B34] uppercase block">
                            Subject / Program Interest <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 50-Student Decision Making Cohort Simulation"
                            value={orgFormData.subject}
                            onChange={(e) => setOrgFormData({ ...orgFormData, subject: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#CCD6C6] text-[#172217] text-xs focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono font-bold text-[#1C3B34] uppercase block">
                            Message &amp; Requirements <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Please tell us about your timeline, expected student count, or specific curriculum goals..."
                            value={orgFormData.message}
                            onChange={(e) => setOrgFormData({ ...orgFormData, message: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#CCD6C6] text-[#172217] text-xs focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmittingOrg}
                          className="w-full py-3.5 px-5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isSubmittingOrg ? (
                            <span>Transmitting...</span>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Send Partnership Inquiry →</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Right Column (5 cols): Direct Official Contacts & Hotlines */}
                  <div className="lg:col-span-5 space-y-3.5">
                    {/* WhatsApp Desk */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#CCD6C6] shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp Hot Desk</span>
                        </span>
                        <span className="text-[9px] font-mono text-emerald-600 font-bold">Fastest</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-mono font-extrabold text-xs sm:text-sm text-[#1C3B34] block">
                          +234 (0) 911 905 9859
                        </span>
                        <span className="text-[10px] text-[#4E5B4B] block">Direct line for school coordinators</span>
                      </div>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp →</span>
                      </a>
                    </div>

                    {/* Official Email */}
                    <div className="p-4 rounded-2xl bg-white/90 border border-[#CCD6C6] shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#1C3B34]" />
                          <span>Official Email</span>
                        </span>
                        <button
                          onClick={() => handleCopy("support@mindvestglobalresources.com.ng", "Email Address")}
                          className="text-[10px] font-mono text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === "Email Address" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === "Email Address" ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                      <a
                        href="mailto:support@mindvestglobalresources.com.ng"
                        className="text-xs font-mono font-bold text-[#2563EB] hover:underline block break-all"
                      >
                        support@mindvestglobalresources.com.ng
                      </a>
                    </div>

                    {/* Office Hours */}
                    <div className="p-4 rounded-2xl bg-white/90 border border-[#CCD6C6] shadow-sm space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#1C3B34]" />
                        <span>Support Hours</span>
                      </span>
                      <div className="text-xs font-mono font-bold text-[#172217]">
                        Mon – Fri, 9:00 AM – 5:00 PM (WAT)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Parent / Individual Q&A Assurance */
              currentAudience.parentOrSchoolDetails && currentAudience.parentOrSchoolDetails.length > 0 && (
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#D0D9CA] space-y-3 sm:space-y-4">
                  <div className="text-[10px] sm:text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1C3B34]" />
                    <span>TRANSPARENCY &amp; ASSURANCE:</span>
                  </div>
                  <div className="space-y-3">
                    {currentAudience.parentOrSchoolDetails.map((item, qIdx) => (
                      <div key={qIdx} className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-1.5 shadow-xs">
                        <div className="font-extrabold text-xs sm:text-base text-[#172217] flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-[#1C3B34] shrink-0" />
                          <span>{item.question}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#4E5B4B] leading-relaxed pl-6">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
