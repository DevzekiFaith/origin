"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "./contexts/CartContext";
import { useToast } from "./contexts/ToastContext";
import { simplifiedCourses } from "./data/simplified-courses";
import HeroEditorial from "./components/homepage/HeroEditorial";
import IntroStatement from "./components/homepage/IntroStatement";
import QuestionDiscoveryMatrix from "./components/homepage/QuestionDiscoveryMatrix";
import StartHereGuide from "./components/homepage/StartHereGuide";
import LiveMicroChallenge from "./components/homepage/LiveMicroChallenge";
import OriginCourseCatalog from "./components/homepage/OriginCourseCatalog";
import OriginChallengesPreview from "./components/homepage/OriginChallengesPreview";
import Testimonials from "./components/sections/Testimonials";
import EditorialPhilosophy from "./components/homepage/EditorialPhilosophy";
import LeadCapture from "./components/sections/LeadCapture";
import FitForProfitVolunteerModal from "./components/FitForProfitVolunteerModal";
import { ArrowRight, Sparkles, CheckCircle2, ShoppingBag } from "lucide-react";

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
    <div className="min-h-screen bg-[#FAFAF8] text-[#121316] selection:bg-amber-400 selection:text-zinc-950 font-sans antialiased">
      {/* 1. Master Editorial Hero (Dark & Immersive Opening Hook) */}
      <HeroEditorial
        onExploreOrigin={() => {
          const el = document.getElementById("origin-curriculum");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        onStartWithQuestion={() => {
          const el = document.getElementById("question-discovery");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. Introduction / What is Origin (Warm Off-White Typography Canvas) */}
      <IntroStatement />

      {/* 3. Inquiry-First Discovery Matrix ("WHAT DO YOU WANT TO UNDERSTAND?") */}
      <QuestionDiscoveryMatrix />

      {/* 4. "START HERE" Personalized Pathfinder */}
      <StartHereGuide />

      {/* 5. Featured Experiential Moment (Dark Immersive Decision Canvas: "WHAT WOULD YOU DO?") */}
      <LiveMicroChallenge />

      {/* 6. Scalable 3-Tier Course Architecture & Intelligent Outcome Cards (Warm Off-White) */}
      <OriginCourseCatalog />

      {/* 7. Platform-Wide Origin Challenges (Dark Immersive Simulation Arena) */}
      <OriginChallengesPreview />

      {/* 8. Verified Student Experiences (Warm Off-White) */}
      <Testimonials />

      {/* 9. The Origin Manifesto, Commercial Trust & FAQ (Warm Off-White) */}
      <EditorialPhilosophy />

      {/* 10. Free Practical Starter Guide Lead Capture */}
      <LeadCapture />

      {/* 11. High-Contrast Final Conversion CTA (Dark grounding) */}
      <section className="py-24 px-4 bg-[#090a0d] text-white border-t border-zinc-900 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BECOME MORE CAPABLE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-100 tracking-tight mb-4">
            Ready to Build the Person Behind Your Success?
          </h2>

          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Begin with <strong className="text-amber-300">Economic Principles</strong> (Founding Launch: ₦15,000 / $14) or unlock all foundational capabilities in a single bundle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
            <Link
              href="/courses/economic-principles"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-400 text-zinc-950 font-bold text-sm tracking-wide hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              <span>START WITH ECONOMIC PRINCIPLES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleBundleAddToCart}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900 text-zinc-200 hover:text-white font-medium text-sm border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>GET ALL FOUNDATIONS BUNDLE</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Lifetime Unrestricted Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Interactive Thinking Engine
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Instant Secure Activation
            </span>
          </div>
        </div>
      </section>

      {/* 12. Volunteer Registration Modal */}
      <FitForProfitVolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />
    </div>
  );
}
