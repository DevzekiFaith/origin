"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "./contexts/CartContext";
import { useToast } from "./contexts/ToastContext";
import { simplifiedCourses } from "./data/simplified-courses";
import HeroEditorial from "./components/homepage/HeroEditorial";
import LiveMicroChallenge from "./components/homepage/LiveMicroChallenge";
import OriginPrinciples from "./components/homepage/OriginPrinciples";
import OriginMoment from "./components/homepage/OriginMoment";
import OriginCourseCatalog from "./components/homepage/OriginCourseCatalog";
import OriginChallengesPreview from "./components/homepage/OriginChallengesPreview";
import LearningCompanionsSection from "./components/homepage/LearningCompanionsSection";
import StartHereGuide from "./components/homepage/StartHereGuide";
import AudiencePathways from "./components/homepage/AudiencePathways";
import Testimonials from "./components/sections/Testimonials";
import OriginStandardSection from "./components/homepage/OriginStandardSection";
import EditorialPhilosophy from "./components/homepage/EditorialPhilosophy";
import LeadCapture from "./components/sections/LeadCapture";
import FitForProfitVolunteerModal from "./components/FitForProfitVolunteerModal";
import { ArrowRight, Sparkles, CheckCircle2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleBundleAddToCart = () => {
    simplifiedCourses.forEach((c) => {
      addToCart({
        id: c.id,
        title: c.title,
        description: c.description,
        fullDescription: c.fullDescription,
        priceUSD: 12,
        imageUrl: c.imageUrl,
        bgGradient: c.bgGradient,
        icon: c.icon,
        iconColor: c.iconColor,
        ageRange: c.ageRange,
      });
    });
    showToast("Origin All-Foundations Bundle added to cart!", "success");
  };

  return (
    <div className="min-h-screen bg-[#8A948B] text-white selection:bg-white selection:text-[#8A948B] font-sans antialiased">
      {/* 1. Hero: School starts with the answer. Origin starts with the question. */}
      <HeroEditorial
        onExploreOrigin={() => {
          const el = document.getElementById("origin-curriculum");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        onStartWithQuestion={() => {
          const el = document.getElementById("origin-challenge");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. Interactive Decision Challenge (The ₦20,000 Challenge: Question → Choice → Discovery → Application) */}
      <LiveMicroChallenge />

      {/* 3. How Origin Works & Learning Model (Think → Choose → Discover → Apply) */}
      <OriginPrinciples />

      {/* 4. The Discovery Engine (Inquiry-Led Dimensions: Money, Decisions, People, Self, Problems, Growth) */}
      <div id="origin-moment">
        <OriginMoment />
      </div>

      {/* 5. Flagship Experiences (Economic Principles, Decision Making, Problem Solving, Communication, Self-Image, Adaptability) */}
      <OriginCourseCatalog />

      {/* 6. Challenges Arena (Real Situations, High Stakes, Time-Limit Simulations) */}
      <OriginChallengesPreview />

      {/* 7. Learning Companions (Books Connected to Experiences: Money Farming, House of Choice, 8 Q&A to Selling) */}
      <LearningCompanionsSection />

      {/* 8. Pathfinder ("Start Here": Tailored recommendations based on life goals) */}
      <StartHereGuide />

      {/* 9. Audience & Age Segmentation (Young Minds, Young Adults, Adults, For Parents, For Schools & Orgs) */}
      <AudiencePathways />

      {/* 10. Real Learner Reflections (Audited genuine transformations without fabricated stats) */}
      <Testimonials />

      {/* 11. The Origin Standard (The 6-Point Operational Philosophy) */}
      <OriginStandardSection />

      {/* 12. The Origin Manifesto, Platform Guarantees & FAQs */}
      <EditorialPhilosophy />

      {/* 13. Free Practical Starter Guide (7-Day Micro-Sprint PDF) */}
      <LeadCapture />

      {/* 14. Final Conversion CTA */}
      <section className="py-24 sm:py-36 px-4 bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white border-t border-white/15 text-center relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
        {/* Dynamic Ambient Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/15 blur-[180px] rounded-full"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono text-white mb-6 shadow-sm font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="uppercase tracking-wider">DON&apos;T JUST LEARN SOMETHING. EXPERIENCE IT.</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-white tracking-tight mb-4 leading-tight">
            Ready to Build the Person Behind Your Success?
          </h2>

          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Begin with <strong className="text-amber-300 font-bold">Economic Principles</strong> (Founding Launch: ₦15,000 / $14) or unlock all foundational experiences in a single bundle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="/courses/economic-principles"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E2E8DE] text-[#1C3B34] font-mono font-extrabold text-sm tracking-wide hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>START WITH ECONOMIC PRINCIPLES</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBundleAddToCart}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#1C3B34] text-white hover:bg-[#132B25] font-mono font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>GET ALL FOUNDATIONS BUNDLE</span>
            </motion.button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/80 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
              Lifetime Unrestricted Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
              Interactive Thinking Engine
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
              Instant Secure Activation
            </span>
          </div>
        </div>
      </section>

      {/* 15. Volunteer Registration Modal */}
      <FitForProfitVolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />
    </div>
  );
}
