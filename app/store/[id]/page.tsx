"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Download, ShoppingCart, ShieldCheck, FileText, CheckCircle, Lock, Heart, Users, BookOpen, Sparkles } from "lucide-react";
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

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#8A948B] text-white flex flex-col items-center justify-center p-6 text-center font-mono">
        <h2 className="text-2xl font-serif font-bold mb-4">Product Not Found</h2>
        <Link href="/store" className="px-6 py-3 rounded-xl bg-[#E2E8DE] text-[#1C3B34] font-bold text-xs hover:bg-white transition-all shadow-md">
          <ArrowLeft size={16} className="inline mr-2" /> Back to Store
        </Link>
      </div>
    );
  }

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
      imageUrl: product.imageUrl,
      bgGradient: product.gradient,
      icon: product.icon,
      iconColor: "text-[#1C3B34]",
      ageRange: "All Ages",
    });
    showToast(`${product.name} added to cart!`, "success");
  };

  const handleBuyNow = () => {
    if (!isInCart) {
      addToCart({
        id: `store-${product.id}`,
        title: product.name,
        description: product.description,
        fullDescription: product.description,
        priceUSD: product.price,
        imageUrl: product.imageUrl,
        bgGradient: product.gradient,
        icon: product.icon,
        iconColor: "text-[#1C3B34]",
        ageRange: "All Ages",
      });
    }
    router.push("/checkout");
  };

  const connectedCourse = getCourseForCompanionProduct(product.id);

  return (
    <div className="min-h-screen bg-[#8A948B] text-white font-sans selection:bg-white selection:text-[#8A948B] pb-24 overflow-x-hidden antialiased relative">
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
        {/* Top Header Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> BACK TO LIBRARY STORE
          </Link>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 sm:mt-4 space-y-12">
          {/* SIGNATURE 5:7 COLUMN SHOWCASE CONTAINER */}
          <div className="bg-[#E2E8DE] text-[#172217] rounded-[2.5rem] border border-[#D5DDCF] shadow-2xl p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column (5 cols): Details & Purchasing Controls */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#CCD6C6] text-xs font-mono font-bold text-[#1C3B34] uppercase shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#1C3B34]" />
                  <span>ORIGIN AUTHORIZED RELEASE // {product.category.toUpperCase()}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#172217] tracking-tight leading-tight">
                  {product.name}
                </h1>

                <p className="text-[#4E5B4B] text-base sm:text-lg font-light leading-relaxed">
                  {product.description}
                </p>

                {/* Format & Customer Reviews Box */}
                <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] flex items-center justify-between text-xs font-mono text-[#172217]">
                  <div>
                    <span className="text-[10px] uppercase text-[#1C3B34] font-bold block">FORMAT</span>
                    <span className="font-extrabold text-sm">{product.category === "ebooks" ? "Digital PDF Companion" : product.category === "courses" ? "Interactive Session / Workshop" : "Premium Merchandise"}</span>
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
                <div className="pt-2 flex items-center justify-between gap-4 border-t border-[#D0D9CA]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#1C3B34] font-bold block">TUITION / PRICE</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-mono font-extrabold text-[#172217]">
                        ${product.price} <span className="text-xs text-[#4E5B4B] font-normal">USD</span>
                      </span>
                      <span className="text-sm font-mono font-bold text-[#1C3B34]">
                        (₦{(product.priceNGN || Math.round(product.price * 1500)).toLocaleString()})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Purchasing Action Controls */}
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
                          className="w-full bg-[#8A948B] hover:bg-[#1C3B34] text-white py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-md cursor-pointer"
                        >
                          <Download size={16} />
                          Download Free Guide (PDF)
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleAddToCart}
                        disabled={isInCart}
                        className={`flex-1 py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                          isInCart
                            ? "bg-white/50 text-[#4E5B4B] border-[#D0D9CA] cursor-not-allowed"
                            : "bg-white/80 text-[#172217] border-[#CCD6C6] hover:bg-[#1C3B34] hover:text-white shadow-xs"
                        }`}
                      >
                        <ShoppingCart size={16} />
                        {isInCart ? "In Cart" : "Add to Cart"}
                      </button>
                      <button
                        onClick={handleBuyNow}
                        className="flex-1 bg-[#8A948B] hover:bg-[#1C3B34] text-white py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all text-center shadow-md cursor-pointer"
                      >
                        Buy Now
                      </button>
                    </div>
                  )}

                  {/* Interactive E-Book Reader Button for eBooks */}
                  {(product.category === "ebooks" || product.id === 4 || product.id === 7) && (
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
                      className="w-full py-3.5 px-4 bg-[#1C3B34] hover:bg-[#152e29] text-white font-mono font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-[#d9f99d]" />
                      <span>Join Fit-For-Profit Volunteer Corps (Free)</span>
                    </button>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-[#4E5B4B] font-mono justify-center pt-1">
                    <ShieldCheck size={14} className="text-[#1C3B34]" />
                    <span>Secure payment via Flutterwave / Cards</span>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols): Aspect 16/11 Image Showcase Card with Glass Badges */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/11] w-full rounded-[2rem] overflow-hidden border border-[#D5DDCF] shadow-xl bg-[#121316] group">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1C3B34] to-[#8A948B]">
                      <product.icon className="w-24 h-24 text-white opacity-80" />
                    </div>
                  )}

                  {/* Top Glass Overlay Badge */}
                  <div className="absolute top-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl text-white flex items-center justify-between">
                    <div>
                      <span className="font-serif font-extrabold text-lg sm:text-xl block leading-none">{product.name}</span>
                      <span className="text-[11px] font-mono text-white/80 block mt-1">Origin Authorized Release</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-base font-extrabold text-amber-300 block">${product.price} USD</span>
                      <span className="text-[10px] text-white/70">₦{(product.priceNGN || Math.round(product.price * 1500)).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Bottom Floating Pill Badges Row */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2 text-xs font-mono">
                      <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                      <span>Instant Digital Access</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2 text-xs font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified Works</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* DETAILED DESCRIPTION & BONUS MANUSCRIPTS CANVAS */}
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
                    className="px-6 py-3.5 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white font-mono text-xs font-bold transition-all shrink-0 shadow-md"
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
