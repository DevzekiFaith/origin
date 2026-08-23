"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Clock, BookOpen, ShoppingBag, ArrowLeft, Book } from "lucide-react";
import { getCourseById } from "../../data/courses";
import { getCompanionProductForCourse } from "../../data/course-ebook-mapping";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";
import { motion } from "framer-motion";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const course = getCourseById(idStr || "");
  const { addToCart, cart } = useCart();
  const { showToast } = useToast();

  const [includeEbook, setIncludeEbook] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#8A948B] flex flex-col items-center justify-center p-6 text-center text-white font-mono">
        <h1 className="text-2xl font-serif font-bold mb-2">COURSE NOT FOUND</h1>
        <p className="text-sm text-white/80 mb-6">The requested course could not be located in our curriculum registry.</p>
        <Link
          href="/#origin-curriculum"
          className="px-6 py-3 rounded-xl bg-[#E2E8DE] text-[#1C3B34] font-bold text-xs hover:bg-white transition-all shadow-md"
        >
          BROWSE CURRICULUM
        </Link>
      </div>
    );
  }

  const readingCompanion = getCompanionProductForCourse(course.id);
  const isEnrolled = cart.some((item) => item.id === course.id);

  const regularPriceNGN = course.priceNGN || 21000;
  const launchPriceNGN = (course as any).launchPriceNGN || 15000;
  const isFlagship = course.id === "economic-principles";

  const handleStartLearning = () => {
    if (!isEnrolled) {
      addToCart({
        id: course.id,
        title: course.title,
        description: course.description,
        fullDescription: course.fullDescription,
        priceUSD: course.priceUSD,
        priceNGN: launchPriceNGN,
        imageUrl: course.imageUrl,
        bgGradient: course.bgGradient,
        icon: course.icon,
        iconColor: course.iconColor,
        ageRange: course.ageRange,
      });
      if (includeEbook && readingCompanion) {
        addToCart({
          id: `store-${readingCompanion.id}`,
          title: readingCompanion.name,
          description: readingCompanion.description,
          fullDescription: readingCompanion.description,
          priceUSD: readingCompanion.price,
          imageUrl: readingCompanion.imageUrl,
          bgGradient: readingCompanion.gradient,
          icon: readingCompanion.icon,
          iconColor: "text-[#1C3B34]",
          ageRange: "All Ages",
        });
      }
      showToast(`Added "${course.title}" to cart`, "success");
    }
    router.push("/cart");
  };

  const handleAddOnlyToCart = () => {
    addToCart({
      id: course.id,
      title: course.title,
      description: course.description,
      fullDescription: course.fullDescription,
      priceUSD: course.priceUSD,
      priceNGN: launchPriceNGN,
      imageUrl: course.imageUrl,
      bgGradient: course.bgGradient,
      icon: course.icon,
      iconColor: course.iconColor,
      ageRange: course.ageRange,
    });
    if (includeEbook && readingCompanion) {
      addToCart({
        id: `store-${readingCompanion.id}`,
        title: readingCompanion.name,
        description: readingCompanion.description,
        fullDescription: readingCompanion.description,
        priceUSD: readingCompanion.price,
        imageUrl: readingCompanion.imageUrl,
        bgGradient: readingCompanion.gradient,
        icon: readingCompanion.icon,
        iconColor: "text-[#1C3B34]",
        ageRange: "All Ages",
      });
    }
    showToast(`Added "${course.title}" to cart`, "success");
  };

  return (
    <div className="min-h-screen bg-[#8A948B] text-white selection:bg-white selection:text-[#8A948B] font-sans relative overflow-hidden">
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-white/15 blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="relative z-10">
        {/* Top Breadcrumb Header */}
        <div className="border-b border-white/15 bg-black/10 backdrop-blur-md px-4 sm:px-8 py-4 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-mono text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO ORIGIN</span>
            </Link>
            <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider font-bold">
              {course.trackId ? "ORIGIN // " + course.trackId.toUpperCase() : "ORIGIN FOUNDATIONS"}
            </span>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16 sm:space-y-20">
          {/* HERO INTELLECTUAL HEADER & CONVERSION PANEL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: The Core Questions */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                {isFlagship && (
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white font-mono text-xs uppercase tracking-wider font-bold shadow-sm backdrop-blur-md">
                    ★ FLAGSHIP UNCONVENTIONAL EXPERIENCE
                  </span>
                )}
                <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight text-white leading-tight">
                  {course.title}
                </h1>
                <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* QUESTION 1: WHY SHOULD I CARE? */}
              <div className="p-7 sm:p-8 rounded-3xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-2xl space-y-2">
                <div className="text-xs font-mono text-[#1C3B34] uppercase tracking-wider font-bold">
                  01 // WHY SHOULD I CARE?
                </div>
                <p className="text-base text-[#4E5B4B] leading-relaxed font-light">
                  {course.fullDescription}
                </p>
              </div>

              {/* QUESTION 2: WHAT WILL I UNDERSTAND? */}
              <div className="p-7 sm:p-8 rounded-3xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-2xl space-y-3">
                <div className="text-xs font-mono text-[#1C3B34] uppercase tracking-wider font-bold">
                  02 // WHAT WILL I UNDERSTAND?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {(course.outcomes || []).slice(0, 4).map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#172217]">
                      <CheckCircle2 className="w-4 h-4 text-[#1C3B34] shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUESTION 3: HOW WILL I EXPERIENCE IT? */}
              <div className="p-7 sm:p-8 rounded-3xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-2xl space-y-3">
                <div className="text-xs font-mono text-[#1C3B34] uppercase tracking-wider font-bold">
                  03 // HOW WILL I EXPERIENCE IT?
                </div>
                <p className="text-sm text-[#4E5B4B] font-light">
                  This is not a passive lecture series. Every module follows the Origin Unconventional Engine:
                </p>
                <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
                  {["01 SEE IT", "02 THINK", "03 CHOOSE", "04 DISCOVER", "05 TRY AGAIN", "06 USE IT", "07 REFLECT"].map((stage, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-white/80 border border-[#CCD6C6] text-[#172217] font-bold shadow-xs">
                      {stage}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Commercial Conversion Box */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] rounded-3xl p-7 sm:p-9 shadow-2xl space-y-6">
                {/* Pricing Display */}
                <div className="border-b border-[#D0D9CA] pb-5">
                  <div className="text-xs font-mono text-[#1C3B34] uppercase mb-1 font-bold">Tuition & Enrollment</div>
                  <div className="flex items-baseline gap-3">
                    {launchPriceNGN ? (
                      <>
                        <span className="text-3xl font-extrabold text-[#172217] font-mono">₦{launchPriceNGN.toLocaleString()}</span>
                        <span className="text-base text-[#4E5B4B] line-through font-mono">₦{regularPriceNGN.toLocaleString()}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1C3B34] text-white font-mono font-bold">Founding Launch</span>
                      </>
                    ) : (
                      <span className="text-3xl font-extrabold text-[#172217] font-mono">₦{regularPriceNGN.toLocaleString()}</span>
                    )}
                  </div>
                  <span className="text-xs text-[#4E5B4B] font-mono block mt-1">or ${course.priceUSD || 14} USD for international cards</span>
                </div>

                {/* Connected Reading Companion Bundle Option */}
                {readingCompanion && (
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      includeEbook ? "bg-white/90 border-[#1C3B34] shadow-md" : "bg-white/80 border-[#CCD6C6]"
                    }`}
                    onClick={() => setIncludeEbook(!includeEbook)}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={includeEbook}
                        onChange={(e) => setIncludeEbook(e.target.checked)}
                        className="mt-1 accent-[#1C3B34] cursor-pointer"
                      />
                      <div className="text-xs text-[#172217] space-y-1">
                        <span className="font-extrabold text-[#172217] block text-sm">
                          Bundle Reading Companion: {readingCompanion.name} (+${readingCompanion.price})
                        </span>
                        <p className="text-xs text-[#4E5B4B] leading-relaxed font-light">
                          {readingCompanion.hookText}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Primary Single Clear Call to Action */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartLearning}
                  className="w-full py-4 px-6 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white font-bold text-sm font-mono tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>{isEnrolled ? "ENTER EXPERIENCE →" : "START LEARNING"}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                {!isEnrolled && (
                  <button
                    onClick={handleAddOnlyToCart}
                    className="w-full py-3.5 px-4 rounded-xl bg-white/80 hover:bg-[#1C3B34] hover:text-white border border-[#CCD6C6] text-[#172217] text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer font-bold shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD TO CART</span>
                  </button>
                )}

                {/* Trust Indicators */}
                <div className="space-y-2.5 pt-4 border-t border-[#D0D9CA] text-xs text-[#4E5B4B] font-mono">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1C3B34]" />
                    <span>Lifetime unrestricted access & future updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1C3B34]" />
                    <span>Self-paced interactive missions (No rigid schedules)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#1C3B34]" />
                    <span>Verified Capability Certificate upon completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 14. GO DEEPER // ORIGIN READING COMPANION SECTION (Visually Comfortable 5:7 Showcase Layout) */}
          {readingCompanion && (
            <section className="bg-[#E2E8DE] text-[#172217] rounded-[2rem] border border-[#D5DDCF] shadow-xl p-5 sm:p-7 lg:p-8 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Left Column (5 cols): Information & Hook */}
                <div className="lg:col-span-5 space-y-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#CCD6C6] text-[11px] font-mono font-bold uppercase text-[#1C3B34]">
                    <BookOpen className="w-3 h-3 text-[#1C3B34]" />
                    <span>GO DEEPER // ORIGIN READING COMPANION</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-[#172217] tracking-tight leading-tight">
                    {readingCompanion.name}
                  </h2>

                  <p className="text-[#4E5B4B] text-xs sm:text-sm font-light leading-relaxed">
                    {readingCompanion.whyReadThis}
                  </p>

                  <div className="p-4 rounded-xl bg-white/80 border border-[#CCD6C6] space-y-0.5">
                    <div className="text-[11px] font-mono uppercase text-[#1C3B34] font-bold">
                      What this companion helps you understand:
                    </div>
                    <p className="text-xs text-[#172217] leading-relaxed font-normal">
                      {readingCompanion.whatYouWillUnderstand}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between gap-4 border-t border-[#D0D9CA]">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold block">INVESTMENT</span>
                      <span className="text-xl font-mono font-extrabold text-[#172217]">
                        ${readingCompanion.price} <span className="text-[10px] text-[#4E5B4B] font-normal">USD</span>
                      </span>
                    </div>
                    <span className="text-xs text-[#4E5B4B] font-mono font-semibold">
                      Instant Digital PDF &amp; Reading
                    </span>
                  </div>

                  <div className="pt-1">
                    <Link
                      href={`/store/${readingCompanion.id}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <span>READ THE COMPANION →</span>
                    </Link>
                  </div>
                </div>

                {/* Right Column (7 cols): Aspect 16/10 Image Showcase Card */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full rounded-[1.5rem] overflow-hidden border border-[#D5DDCF] shadow-lg bg-[#121316] group">
                    {readingCompanion.imageUrl ? (
                      <Image
                        src={readingCompanion.imageUrl}
                        alt={readingCompanion.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-br from-[#1C3B34] to-[#8A948B]">
                        <Book className="w-12 h-12 mb-2 text-white opacity-80" />
                        <span className="font-serif font-bold text-lg">{readingCompanion.name}</span>
                      </div>
                    )}

                    {/* Top Glass Overlay Badge */}
                    <div className="absolute top-3 left-3 right-3 bg-black/60 backdrop-blur-md border border-white/20 p-3 rounded-xl text-white flex items-center justify-between">
                      <div>
                        <span className="font-serif font-extrabold text-sm sm:text-base block leading-none">{readingCompanion.name}</span>
                        <span className="text-[10px] font-mono text-white/80 block mt-0.5">Origin Reading Companion</span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-sm font-extrabold text-amber-300 block">${readingCompanion.price} USD</span>
                        <span className="text-[10px] text-white/70">₦{Math.round(readingCompanion.price * 1500).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Bottom Floating Pill Badges Row */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full px-3 py-1 text-[11px] font-mono">
                        <BookOpen className="w-3 h-3 text-amber-300" />
                        <span>Interactive Reader</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full px-3 py-1 text-[11px] font-mono">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Verified Companion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* QUESTION 4: WHAT WILL I BE ABLE TO DO AFTERWARD? */}
          <section className="p-6 sm:p-8 rounded-[2rem] bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-xl space-y-4">
            <div className="text-[11px] font-mono text-[#1C3B34] uppercase tracking-wider font-bold">
              04 // WHAT WILL I BE ABLE TO DO AFTERWARD?
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
              Concrete Capabilities You Will Master
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {(course.outcomes || []).map((outcome, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/80 border border-[#CCD6C6] flex items-start gap-2.5 shadow-xs">
                  <span className="text-[#1C3B34] font-mono font-extrabold text-xs">0{idx + 1}</span>
                  <p className="text-xs text-[#172217] font-medium leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INTERACTIVE CURRICULUM BREAKDOWN */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div>
                <div className="text-[11px] font-mono text-amber-300 uppercase tracking-wider font-bold">EXPERIENTIAL ROADMAP</div>
                <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white">Modules &amp; Missions</h2>
              </div>
              <span className="text-xs font-mono text-white/90 font-bold">{course.modules?.length || 6} Modules</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(course.detailedModules || []).map((mod, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-lg space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#1C3B34]">
                    <span className="font-extrabold">MODULE 0{idx + 1}</span>
                    <span className="font-bold">{mod.estimatedTime || "30 mins"}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#172217]">{mod.title}</h3>
                  <p className="text-xs text-[#4E5B4B] leading-relaxed font-light">{mod.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* QUESTION 5: WHY IS IT WORTH PAYING FOR? */}
          <section className="p-6 sm:p-10 rounded-[2rem] bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] text-center max-w-3xl mx-auto space-y-4 shadow-xl">
            <div className="text-[11px] font-mono text-[#1C3B34] uppercase tracking-wider font-bold">
              05 // WHY IS IT WORTH PAYING FOR?
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
              A Single Avoided Mistake Pays for This 10x Over
            </h2>
            <p className="text-xs sm:text-sm text-[#4E5B4B] leading-relaxed font-light">
              One miscalculated opportunity, one bad financial allocation, or one emotional decision made under pressure costs vastly more than ₦15,000. Origin gives you the mental architecture to navigate real life with precision.
            </p>
            <div className="pt-1">
              <button
                onClick={handleStartLearning}
                className="px-7 py-3.5 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white font-bold text-xs font-mono transition-all shadow-sm cursor-pointer"
              >
                ENROLL NOW ({launchPriceNGN ? "₦" + launchPriceNGN.toLocaleString() : "₦" + regularPriceNGN.toLocaleString()})
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
