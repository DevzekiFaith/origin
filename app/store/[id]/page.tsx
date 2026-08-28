"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Star, 
  Download, 
  ShoppingCart, 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  Lock, 
  Heart, 
  Users, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  Clock, 
  MessageCircle, 
  Video, 
  Brain, 
  Zap, 
  Shield, 
  Target, 
  Award, 
  Compass, 
  CheckCircle2, 
  Check 
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";
import { useUser } from "../../contexts/UserContext";
import { getProductById, STORE_PRODUCTS } from "../../data/store-products";
import { getCourseForCompanionProduct } from "../../data/course-ebook-mapping";
import FitForProfitVolunteerModal from "../../components/FitForProfitVolunteerModal";
import EBookReaderModal from "../../components/EBookReaderModal";
import { motion } from "framer-motion";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const { showToast } = useToast();
  const { currentUser, getOwnedCourses } = useUser();
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white flex flex-col items-center justify-center p-6 text-center font-mono">
        <h2 className="text-2xl font-serif font-bold mb-4">Product Not Found</h2>
        <Link href="/store" className="px-6 py-3 rounded-xl bg-[#E2E8DE] text-[#1C3B34] font-bold text-xs hover:bg-white transition-all shadow-md">
          <ArrowLeft size={16} className="inline mr-2" /> Back to Store
        </Link>
      </div>
    );
  }

  const isJumpstart = product.id === 17 || product.id === 7 || product.name.toLowerCase().includes("jumpstart");

  // Check if this product is owned by the user
  const ownedIds = getOwnedCourses();
  const isPurchased = ownedIds.includes(`store-${product.id}`);

  // Check if item is already in the cart
  const isInCart = cart.some((item) => item.id === `store-${product.id}`);

  const handleAddToCart = () => {
    addToCart({
      id: `store-${product.id}`,
      title: product.name,
      description: product.description,
      fullDescription: product.description,
      priceUSD: product.price,
      priceNGN: isJumpstart ? 15000 : (product.priceNGN || Math.round(product.price * 1500)),
      imageUrl: isJumpstart ? "/images/covers/jumpstart_cover_v2.jpg" : product.imageUrl,
      bgGradient: product.gradient,
      icon: product.icon,
      iconColor: "text-[#1C3B34]",
      ageRange: "All Ages",
    });
    showToast(`${product.name} added to cart!`, "success");
  };

  const handleBuyNow = () => {
    setIsProcessing(true);
    if (!isInCart) {
      addToCart({
        id: `store-${product.id}`,
        title: product.name,
        description: product.description,
        fullDescription: product.description,
        priceUSD: product.price,
        priceNGN: isJumpstart ? 15000 : (product.priceNGN || Math.round(product.price * 1500)),
        imageUrl: isJumpstart ? "/images/covers/jumpstart_cover_v2.jpg" : product.imageUrl,
        bgGradient: product.gradient,
        icon: product.icon,
        iconColor: "text-[#1C3B34]",
        ageRange: "All Ages",
      });
    }
    showToast(isJumpstart ? "JUMPSTART Ticket added! Proceeding to checkout..." : "Proceeding to checkout...", "success");
    router.push("/checkout");
  };

  const connectedCourse = getCourseForCompanionProduct(product.id);

  const spectrumUnits = [
    {
      num: "01",
      role: "THE LENS OF REALITY",
      name: "Perception",
      desc: "Rewire your default baseline to identify leverage and high-value opportunities where others see obstacles and lack.",
      icon: Brain,
      shift: "From reacting to constraints → To detecting invisible commercial leverage."
    },
    {
      num: "02",
      role: "THE ENGINE OF IMPACT",
      name: "Usefulness",
      desc: "Transform raw gifts into deployed, high-impact market utility that the commercial marketplace cannot ignore.",
      icon: Zap,
      shift: "From unmonetized raw potential → To undeniable, deployed market utility."
    },
    {
      num: "03",
      role: "ARCHITECTURE OF PRESERVATION",
      name: "Boundaries",
      desc: "Erect impenetrable focus perimeters to protect your internal ecosystem, time, and creative energy from distraction.",
      icon: Shield,
      shift: "From porous availability → To protected sovereign focus perimeters."
    },
    {
      num: "04",
      role: "MASTERY OF AGREEMENT",
      name: "Consent",
      desc: "Absolute ownership of your 'Yes' and 'No' to eliminate misaligned commitments and energetic friction.",
      icon: Target,
      shift: "From people-pleasing defaults → To high-leverage covenant ownership."
    },
    {
      num: "05",
      role: "CURRENCY OF SIGNIFICANCE",
      name: "Value",
      desc: "Align your personal standards and output to command premium authority, high-yield results, and influence.",
      icon: Award,
      shift: "From underpriced effort → To commanded authority and premium output."
    },
    {
      num: "06",
      role: "THE ULTIMATE GOVERNANCE",
      name: "Self-Mastery",
      desc: "Master your internal emotional state to dictate and command the terms of your external reality.",
      icon: Compass,
      shift: "From emotional reactivity → To internal sovereign state governance."
    }
  ];

  const deliverables = [
    {
      title: "The Human Broadcast Environment Matrix",
      format: "PDF Framework",
      desc: "Master your inputs, information filters, and cognitive environment."
    },
    {
      title: "Architecture of Intention Blueprint",
      format: "PDF Blueprint",
      desc: "Systematic roadmap for structuring high-leverage execution daily."
    },
    {
      title: "Habit Building Guide",
      format: "PDF Guide",
      desc: "Tactical workbook to anchor the 6 spectrum units permanently."
    },
    {
      title: "Exclusive Invite to Private WhatsApp Cohort",
      format: "21-Day Sprint",
      desc: "Daily prompts, peer audits, and direct voice notes from Zeki Ubor."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#949E94] via-[#8A948B] to-[#7F897F] text-white font-sans selection:bg-white selection:text-[#8A948B] pb-24 overflow-x-hidden antialiased relative">
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay (Matching Home Page) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 30, 0],
            y: [0, -25, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-white/15 blur-[180px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -35, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[550px] h-[550px] bg-amber-100/15 blur-[160px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="relative z-10">
        {/* Top Header Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-4">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> BACK TO LIBRARY STORE
          </Link>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 sm:mt-4 space-y-12">
          {/* SIGNATURE 5:7 COLUMN SHOWCASE CONTAINER */}
          <div className="bg-[#E2E8DE] text-[#172217] rounded-[2.5rem] border border-[#D5DDCF] shadow-2xl p-6 sm:p-10 lg:p-12 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column (5 cols): Details & Purchasing Controls */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#CCD6C6] text-xs font-mono font-bold text-[#1C3B34] uppercase shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#1C3B34]" />
                  <span>
                    {isJumpstart ? "THE BECOMING INSTITUTE // 2-DAY ACCELERATOR" : `ORIGIN AUTHORIZED RELEASE // ${product.category.toUpperCase()}`}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#172217] tracking-tight leading-tight">
                  {isJumpstart ? (
                    <>
                      WAKE UP. SHAKE UP.
                      <span className="block text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-[#1C3B34] mt-1">
                        From Meager to Mega.
                      </span>
                      <span className="block text-sm sm:text-base font-mono font-bold text-amber-700 uppercase tracking-widest mt-1">
                        Make the shift.
                      </span>
                    </>
                  ) : product.name}
                </h1>

                {isJumpstart && (
                  <p className="text-xs font-mono font-bold text-[#1C3B34] uppercase">
                    JUMPSTART 2-Day Live Intensive Accelerator &amp; 21-Day Cognitive Sprint
                  </p>
                )}

                <p className="text-[#3A4D3E] text-base sm:text-lg font-light leading-relaxed">
                  {product.description}
                </p>

                {/* Format & Customer Reviews Box */}
                <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] flex items-center justify-between text-xs font-mono text-[#172217]">
                  <div>
                    <span className="text-[10px] uppercase text-[#1C3B34] font-bold block">
                      {isJumpstart ? "INTENSIVE SPRINT" : "FORMAT"}
                    </span>
                    <span className="font-extrabold text-sm">
                      {isJumpstart 
                        ? "GoogleMeet Live + WhatsApp Sprint" 
                        : product.category === "ebooks" 
                        ? "Digital PDF Companion" 
                        : product.category === "courses" 
                        ? "Interactive Session / Workshop" 
                        : "Premium Merchandise"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#1C3B34] font-bold block">RATING</span>
                    <div className="flex items-center gap-1 font-extrabold text-sm">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-[#4E5B4B] text-xs">({product.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline justify-between gap-4 border-t border-[#D0D9CA]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#1C3B34] font-bold block">
                      {isJumpstart ? "EARLY BIRD TUITION" : "TUITION / PRICE"}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-mono font-extrabold text-[#172217]">
                        ₦{(product.priceNGN || Math.round(product.price * 1500)).toLocaleString()}
                      </span>
                      <span className="text-xs font-mono text-[#4E5B4B]">
                        / ${product.price} USD
                      </span>
                    </div>
                  </div>
                  {isJumpstart && (
                    <div className="text-right">
                      <span className="text-xs font-mono text-[#6A7B6D] line-through block">
                        Standard: ₦67,500
                      </span>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1C3B34] text-white text-[10px] font-mono font-bold uppercase tracking-wider mt-1">
                        SAVE 78% TODAY
                      </span>
                    </div>
                  )}
                </div>

                {/* Purchasing Action Controls (Singular Solid Blue Buttons) */}
                <div className="space-y-3 pt-2">
                  {isPurchased || product.price === 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#1C3B34] bg-white/90 border border-[#1C3B34] p-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs">
                        <CheckCircle size={18} className="flex-shrink-0" />
                        <span>{product.price === 0 ? "Free Mindset Blueprint Guide" : "You own this resource!"}</span>
                      </div>
                      {product.pdfUrl && (
                        <a
                          href={product.pdfUrl}
                          download={`${product.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`}
                          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-md cursor-pointer"
                        >
                          <Download size={16} />
                          Download Free Guide (PDF)
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleBuyNow}
                        disabled={isProcessing}
                        className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-2xl font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all text-center shadow-lg shadow-blue-900/30 cursor-pointer"
                      >
                        {isProcessing ? "PROCESSING..." : isJumpstart ? "SECURE YOUR ₦15,000 TICKET NOW →" : "BUY NOW →"}
                      </button>
                      {!isJumpstart && (
                        <button
                          onClick={handleAddToCart}
                          disabled={isInCart}
                          className={`px-6 py-4 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                            isInCart
                              ? "bg-white/50 text-[#4E5B4B] border-[#D0D9CA] cursor-not-allowed"
                              : "bg-white/80 text-[#172217] border-[#CCD6C6] hover:bg-[#1C3B34] hover:text-white shadow-xs"
                          }`}
                        >
                          <ShoppingCart size={16} />
                          {isInCart ? "In Cart" : "Add to Cart"}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Interactive E-Book Reader Button for eBooks */}
                  {(product.category === "ebooks" || product.id === 4) && (
                    <button
                      onClick={() => setIsReaderOpen(true)}
                      className="w-full py-3.5 px-4 bg-white/90 border border-[#CCD6C6] hover:border-[#1C3B34] text-[#1C3B34] font-mono font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#1C3B34]" />
                      <span>
                        {isPurchased || product.price === 0
                          ? "Read Full E-Book / Interactive Reader"
                          : "Read Sample E-Book (Free Preview)"}
                      </span>
                    </button>
                  )}

                  {/* Fit-For-Profit Volunteer Corps Button */}
                  {product.id === 12 && (
                    <button
                      onClick={() => setIsVolunteerModalOpen(true)}
                      className="w-full py-3.5 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Users className="w-4 h-4" />
                      <span>Join Fit-For-Profit Volunteer Corps (Free)</span>
                    </button>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-[#4E5B4B] font-mono justify-center pt-1">
                    <ShieldCheck size={14} className="text-[#1C3B34]" />
                    <span>Instant Access • 100% Secure Payment • Verified Link</span>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Aspect 16/11 Image Showcase Card with Frosted Badges */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[4/5] sm:aspect-[16/13] w-full rounded-[2.5rem] overflow-hidden border border-[#D5DDCF] shadow-2xl bg-[#121316] group">
                  <Image
                    src={isJumpstart ? "/images/covers/jumpstart_cover_v2.jpg" : (product.imageUrl || "/images/covers/jumpstart_cover_v2.jpg")}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Glass Overlay Badge */}
                  <div className="absolute top-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl text-white flex items-center justify-between">
                    <div>
                      <span className="font-serif font-extrabold text-base sm:text-lg block leading-tight">
                        {product.name}
                      </span>
                      <span className="text-[11px] font-mono text-white/80 block mt-1">
                        {isJumpstart ? "✦ Led by Zeki Ubor" : "Origin Authorized Release"}
                      </span>
                    </div>
                    <div className="text-right font-mono shrink-0 ml-2">
                      <span className="text-sm sm:text-base font-extrabold text-amber-300 block">
                        ₦{(product.priceNGN || Math.round(product.price * 1500)).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">
                        {isJumpstart ? "Live Cohort" : "Instant Access"}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Floating Pill Badges Row */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-xs font-mono text-white shadow-xl flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-amber-300" />
                      <span>{isJumpstart ? "Live Virtual Interactive Sessions" : "Instant Digital Access"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>{isJumpstart ? "21-Day Accountability Sprint" : "Verified Works"}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* FULL JUMPSTART SPECIFIC ARCHITECTURE SECTION */}
            {isJumpstart && (
              <div className="pt-8 border-t border-[#D0D9CA] space-y-12">
                
                {/* 2-Day Live Accelerator Schedule */}
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                      INTENSIVE BLUEPRINT
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
                      2-Day Live Accelerator Schedule
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E5B4B] font-light mt-1">
                      Two intensive evening sessions designed for irreversible personal shift.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Day 1 */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#CCD6C6] space-y-3 shadow-md">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3B34] text-white font-mono text-xs font-bold">
                        DAY 1 // SATURDAY @ 5:00 PM WAT
                      </div>
                      <h4 className="text-xl font-serif font-bold text-[#172217]">
                        Wake Up. Shake Up. From Meager to Mega — Make the Shift
                      </h4>
                      <p className="text-xs sm:text-sm text-[#3A4D3E] leading-relaxed">
                        Deep-dive into <strong>Units 1 &amp; 2 (Perception &amp; Usefulness)</strong>. Dismantling default programming of lack and fear, re-engineering your cognitive lens to spot leverage, and converting raw potential into high-impact market utility.
                      </p>
                    </div>

                    {/* Day 2 */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#CCD6C6] space-y-3 shadow-md">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3B34] text-white font-mono text-xs font-bold">
                        DAY 2 // SUNDAY @ 5:00 PM WAT
                      </div>
                      <h4 className="text-xl font-serif font-bold text-[#172217]">
                        The Architecture of Execution
                      </h4>
                      <p className="text-xs sm:text-sm text-[#3A4D3E] leading-relaxed">
                        Mastering <strong>Units 3, 4, 5 &amp; 6 (Boundaries, Consent, Value &amp; Self-Mastery)</strong>. Erecting impenetrable focus perimeters, mastering high-leverage agreements, commanding premium worth, and achieving emotional governance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* The 6 Spectrum Units of Transformation */}
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                      CORE TRANSFORMATION FRAMEWORK
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
                      The 6 Spectrum Units of Transformation
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E5B4B] font-light mt-1">
                      Your framework for the 2-day accelerator and subsequent 21-day daily prompts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {spectrumUnits.map((unit, idx) => {
                      const IconComp = unit.icon;
                      return (
                        <div key={idx} className="p-5 rounded-2xl bg-white border border-[#CCD6C6] space-y-2.5 shadow-sm hover:border-[#1C3B34] transition-all flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold text-[#1C3B34]">{unit.num} // {unit.role}</span>
                              <div className="p-1.5 rounded-lg bg-[#E2E8DE] text-[#1C3B34]">
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                            </div>
                            <h5 className="text-lg font-serif font-bold text-[#172217]">{unit.name}</h5>
                            <p className="text-xs text-[#4F6352] leading-relaxed font-light">{unit.desc}</p>
                          </div>
                          <div className="pt-2 border-t border-[#E2E8DE] text-[11px] text-[#1C3B34] font-mono">
                            {unit.shift}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Included Deliverables */}
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-mono font-bold text-[#1C3B34] uppercase tracking-wider block mb-1">
                      INCLUDED DELIVERABLES
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#172217]">
                      Your Complete Accelerator Resource Pack
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {deliverables.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/80 border border-[#CCD6C6] flex items-start gap-3 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-[#1C3B34] shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h6 className="text-xs font-bold text-[#172217]">{item.title}</h6>
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-[#E2E8DE] text-[#1C3B34] rounded-md font-bold">
                              {item.format}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#4F6352] mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Blue Action Banner */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#CCD6C6] shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-xl font-serif font-bold text-[#172217]">
                      Ready for Your Mega Shift?
                    </h4>
                    <p className="text-xs text-[#4F6352]">
                      Take immediate action. Register now at the early bird rate of ₦15,000 and join the private cohort.
                    </p>
                  </div>
                  <button
                    onClick={handleBuyNow}
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer text-center"
                  >
                    REGISTER FOR JUMPSTART NOW (₦15,000) →
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* DETAILED DESCRIPTION & BONUS MANUSCRIPTS CANVAS */}
          {!isJumpstart && (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-12 space-y-8">
                {/* Connected Thinking Course Alert */}
                {connectedCourse && (
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#1C3B34] font-bold tracking-wider">
                        WANT TO EXPERIENCE THIS IDEA IN ACTION?
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-[#172217]">
                        {connectedCourse.courseTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4E5B4B] font-light">
                        Experience the interactive decisions, trade-off models, and real-world missions behind this companion.
                      </p>
                    </div>
                    <Link
                      href={`/courses/${connectedCourse.courseId}`}
                      className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold transition-all shrink-0 shadow-md"
                    >
                      EXPLORE COURSE →
                    </Link>
                  </div>
                )}

                {/* Description Body */}
                <div className="p-8 sm:p-12 rounded-3xl bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] shadow-xl space-y-6">
                  <h3 className="text-2xl font-serif font-extrabold text-[#172217]">Overview &amp; Mental Architecture</h3>
                  <div className="prose prose-zinc max-w-none text-[#4E5B4B] space-y-4 leading-relaxed font-light text-sm sm:text-base">
                    {product.rawDescription ? (
                      <div 
                        className="selar-raw-desc space-y-4"
                        dangerouslySetInnerHTML={{ __html: product.rawDescription }} 
                      />
                    ) : (
                      <p>{product.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Volunteer Registration Modal */}
      <FitForProfitVolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />

      {/* Interactive E-Book Reader Modal */}
      <EBookReaderModal
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        productId={product.id}
        isPurchased={isPurchased}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
}
