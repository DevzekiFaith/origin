"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCourseById } from "../../data/courses";
import { useUser } from "../../contexts/UserContext";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";
import { getCompanionProductForCourse } from "../../data/course-ebook-mapping";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  BookOpen,
  ShoppingBag,
  Coins,
  ChevronDown,
  ChevronUp,
  Brain,
  Award
} from "lucide-react";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [includeEbook, setIncludeEbook] = useState(false);

  const course = getCourseById(courseId);
  const { currentUser, hasCourseAccess } = useUser();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const isFlagship = courseId === "economic-principles";
  const regularPriceNGN = course?.priceNGN || (course?.priceUSD ? course.priceUSD * 1500 : 21000);
  const launchPriceNGN = isFlagship ? 15000 : undefined;
  const isEnrolled = hasCourseAccess(courseId);

  const ebook = course ? getCompanionProductForCourse(course.id) : null;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleStartLearning = () => {
    if (!course) return;

    if (isEnrolled) {
      router.push(`/learn/${course.id}`);
      return;
    }

    addToCart(course);
    if (includeEbook && ebook) {
      addToCart({
        id: `store-${ebook.id}`,
        title: ebook.name,
        description: ebook.description,
        fullDescription: ebook.description,
        priceUSD: ebook.price,
        imageUrl: ebook.imageUrl,
        bgGradient: ebook.gradient,
        icon: ebook.icon,
        iconColor: "text-amber-600",
        ageRange: "All Ages",
      });
    }
    router.push("/checkout");
  };

  const handleAddOnlyToCart = () => {
    if (!course) return;
    addToCart(course);
    if (includeEbook && ebook) {
      addToCart({
        id: `store-${ebook.id}`,
        title: ebook.name,
        description: ebook.description,
        fullDescription: ebook.description,
        priceUSD: ebook.price,
        imageUrl: ebook.imageUrl,
        bgGradient: ebook.gradient,
        icon: ebook.icon,
        iconColor: "text-amber-600",
        ageRange: "All Ages",
      });
    }
    showToast(`"${course.title}" added to cart`, "success");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center text-[#71717A] font-mono text-xs">
        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mr-3" />
        LOADING EXPERIENCE...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center p-6 text-center text-[#121316]">
        <h1 className="text-2xl font-bold mb-3">Course Not Found</h1>
        <p className="text-[#52525B] text-sm mb-6">The requested learning experience does not exist in the Origin catalog.</p>
        <Link href="/" className="px-5 py-2.5 rounded-xl bg-[#121316] text-[#FFFFFF] font-bold text-xs font-mono">
          RETURN TO HOME
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#121316] selection:bg-amber-400 selection:text-zinc-950 font-sans">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-[#E8E8E3] bg-[#FAFAF8]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-[#52525B] hover:text-[#121316] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ORIGIN</span>
          </Link>
          <span className="text-[11px] font-mono text-amber-700 uppercase tracking-wider font-semibold">
            {course.trackId ? `ORIGIN // ${course.trackId.toUpperCase()}` : "ORIGIN FOUNDATIONS"}
          </span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
        {/* HERO INTELLECTUAL HEADER & CONVERSION PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: The 5 Core Questions answered immediately */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              {isFlagship && (
                <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 font-mono text-xs uppercase tracking-wider font-semibold">
                  ★ FLAGSHIP UNCONVENTIONAL EXPERIENCE
                </span>
              )}
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121316] leading-tight">
                {course.title}
              </h1>
              <p className="text-lg sm:text-xl text-[#52525B] font-normal leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* QUESTION 1: WHY SHOULD I CARE? */}
            <div className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#E8E8E3] shadow-sm space-y-2">
              <div className="text-xs font-mono text-amber-700 uppercase tracking-wider font-semibold">
                01 // WHY SHOULD I CARE?
              </div>
              <p className="text-sm sm:text-base text-[#3F3F46] leading-relaxed">
                {course.fullDescription}
              </p>
            </div>

            {/* QUESTION 2: WHAT WILL I UNDERSTAND? */}
            <div className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#E8E8E3] shadow-sm space-y-3">
              <div className="text-xs font-mono text-amber-700 uppercase tracking-wider font-semibold">
                02 // WHAT WILL I UNDERSTAND?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {(course.outcomes || []).slice(0, 4).map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#3F3F46]">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QUESTION 3: HOW WILL I EXPERIENCE IT? */}
            <div className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#E8E8E3] shadow-sm space-y-3">
              <div className="text-xs font-mono text-amber-700 uppercase tracking-wider font-semibold">
                03 // HOW WILL I EXPERIENCE IT?
              </div>
              <p className="text-sm text-[#52525B]">
                This is not a passive lecture series. Every module follows the Origin Unconventional Engine:
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                {["01 SEE IT", "02 THINK", "03 CHOOSE", "04 DISCOVER", "05 TRY AGAIN", "06 USE IT", "07 REFLECT"].map((stage, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#F3F3EE] border border-[#E2E2DC] text-[#3F3F46]">
                    {stage}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Commercial Conversion Box */}
          <div className="lg:col-span-5 sticky top-20">
            <div className="bg-[#FFFFFF] border border-[#E2E2DC] rounded-3xl p-7 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-6">
              {/* Pricing Display */}
              <div className="border-b border-[#F0F0EB] pb-5">
                <div className="text-xs font-mono text-[#71717A] uppercase mb-1">Tuition & Enrollment</div>
                <div className="flex items-baseline gap-3">
                  {launchPriceNGN ? (
                    <>
                      <span className="text-3xl font-bold text-amber-700 font-mono">₦{launchPriceNGN.toLocaleString()}</span>
                      <span className="text-base text-[#A1A1AA] line-through font-mono">₦{regularPriceNGN.toLocaleString()}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-semibold">Founding Launch</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-[#121316] font-mono">₦{regularPriceNGN.toLocaleString()}</span>
                  )}
                </div>
                <span className="text-xs text-[#71717A] font-mono block mt-1">or ${course.priceUSD || 14} USD for international cards</span>
              </div>

              {/* Companion eBook Add-on checkbox */}
              {ebook && (
                <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E3] flex items-start gap-3 cursor-pointer" onClick={() => setIncludeEbook(!includeEbook)}>
                  <input
                    type="checkbox"
                    checked={includeEbook}
                    onChange={(e) => setIncludeEbook(e.target.checked)}
                    className="mt-1 accent-amber-600 cursor-pointer"
                  />
                  <div className="text-xs text-[#3F3F46]">
                    <span className="font-semibold text-[#121316] block">Add Companion Playbook (+${ebook.price})</span>
                    <span>Includes the complete printable workbook and framework templates.</span>
                  </div>
                </div>
              )}

              {/* Primary Single Clear Call to Action */}
              <button
                onClick={handleStartLearning}
                className="w-full py-4 px-6 rounded-xl bg-[#121316] text-[#FFFFFF] font-bold text-sm font-mono tracking-wider hover:bg-amber-600 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>{isEnrolled ? "ENTER EXPERIENCE →" : "START LEARNING"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {!isEnrolled && (
                <button
                  onClick={handleAddOnlyToCart}
                  className="w-full py-3 px-4 rounded-xl bg-[#FAFAF8] hover:bg-[#F3F3EE] border border-[#E2E2DC] text-[#3F3F46] text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO CART</span>
                </button>
              )}

              {/* Trust Indicators */}
              <div className="space-y-2.5 pt-4 border-t border-[#F0F0EB] text-xs text-[#64748B]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Lifetime unrestricted access & future updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Self-paced interactive missions (No rigid schedules)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Verified Capability Certificate upon completion</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QUESTION 4: WHAT WILL I BE ABLE TO DO AFTERWARD? */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] border border-[#E8E8E3] shadow-sm space-y-6">
          <div className="text-xs font-mono text-amber-700 uppercase tracking-wider font-semibold">
            04 // WHAT WILL I BE ABLE TO DO AFTERWARD?
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#121316]">
            Concrete Capabilities You Will Master
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(course.outcomes || []).map((outcome, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E3] flex items-start gap-3">
                <span className="text-amber-700 font-mono font-bold text-sm">0{idx + 1}</span>
                <p className="text-sm text-[#27272A]">{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE CURRICULUM BREAKDOWN */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8E8E3] pb-4">
            <div>
              <div className="text-xs font-mono text-amber-700 uppercase tracking-wider font-semibold">EXPERIENTIAL ROADMAP</div>
              <h2 className="text-2xl font-bold text-[#121316]">Modules & Missions</h2>
            </div>
            <span className="text-xs font-mono text-[#71717A]">{course.modules?.length || 6} Modules</span>
          </div>

          <div className="space-y-3">
            {(course.detailedModules || []).map((mod, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E8E3] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#71717A]">
                  <span>MODULE 0{idx + 1}</span>
                  <span>{mod.estimatedTime || "30 mins"}</span>
                </div>
                <h3 className="text-lg font-bold text-[#121316]">{mod.title}</h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">{mod.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* QUESTION 5: WHY IS IT WORTH PAYING FOR? */}
        <section className="p-8 sm:p-14 rounded-3xl bg-[#FFFFFF] border border-[#E2E2DC] text-center max-w-3xl mx-auto space-y-6 shadow-sm">
          <div className="text-xs font-mono text-amber-700 uppercase tracking-wider font-semibold">
            05 // WHY IS IT WORTH PAYING FOR?
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#121316]">
            A Single Avoided Mistake Pays for This 10x Over
          </h2>
          <p className="text-base text-[#52525B] leading-relaxed font-light">
            One miscalculated opportunity, one bad financial allocation, or one emotional decision made under pressure costs vastly more than ₦15,000. Origin gives you the mental architecture to navigate real life with precision.
          </p>
          <div className="pt-2">
            <button
              onClick={handleStartLearning}
              className="px-8 py-4 rounded-xl bg-[#121316] text-[#FFFFFF] font-bold text-sm font-mono hover:bg-amber-600 transition-colors shadow-md cursor-pointer"
            >
              ENROLL NOW ({launchPriceNGN ? `₦${launchPriceNGN.toLocaleString()}` : `₦${regularPriceNGN.toLocaleString()}`})
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
