"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Book,
  Shirt,
  PenTool,
  ShoppingBag,
  Star,
  Award,
  BookOpen,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Plus,
  Minus,
  Eye,
  Layers,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";
import { STORE_PRODUCTS } from "../data/store-products";
import { LiquidGlassBackground } from "../components/3d";
import EBookReaderModal from "../components/EBookReaderModal";
import { motion, AnimatePresence } from "framer-motion";

function StoreContent() {
  const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    getItemQuantity,
    cartCount,
  } = useCart();
  const { isItemOwned } = useUser();
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  // Categories config
  const categories = [
    { id: "all", name: "All Works", icon: BookOpen },
    { id: "ebooks", name: "Reading Companions", icon: Book },
    { id: "hardcopy", name: "Hardcopy Manuals", icon: Layers },
    { id: "journals", name: "Life Planners & Journals", icon: PenTool },
    { id: "courses", name: "Intensives & Masterclasses", icon: Award },
    { id: "merch", name: "Physical Artifacts", icon: Shirt },
  ];

  // Exclude products that are only internal cart targets
  const products = useMemo(
    () => STORE_PRODUCTS.filter((p) => !p.hideFromStore),
    []
  );

  const urlCategory = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProductId, setSelectedProductId] = useState<number>(4); // Default to Flagship "The Architecture of Becoming"
  const [showcaseImage, setShowcaseImage] = useState<string>("");
  const [preferredCurrency, setPreferredCurrency] = useState<"NGN" | "USD">("NGN");

  // In-store Slide-over Reader Modal state
  const [readerProductId, setReaderProductId] = useState<number | null>(null);

  useEffect(() => {
    if (urlCategory && categories.some((c) => c.id === urlCategory)) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  const selectedProduct = useMemo(() => {
    return (
      products.find((p) => p.id === selectedProductId) ||
      filteredProducts[0] ||
      products[0]
    );
  }, [selectedProductId, filteredProducts, products]);

  useEffect(() => {
    if (selectedProduct?.imageUrl) {
      setShowcaseImage(selectedProduct.imageUrl);
    }
  }, [selectedProduct?.id, selectedProduct?.imageUrl]);

  const showcaseQty = getItemQuantity(selectedProduct.id);
  const showcaseOwned = isItemOwned(selectedProduct.id);

  // Currency formatting helper
  const formatPrice = (usd: number, ngn?: number) => {
    const calculatedNgn = ngn || Math.round(usd * 1500);
    if (preferredCurrency === "NGN") {
      return `₦${calculatedNgn.toLocaleString()}`;
    }
    return `$${usd.toFixed(2)} USD`;
  };

  const getSecondaryPrice = (usd: number, ngn?: number) => {
    const calculatedNgn = ngn || Math.round(usd * 1500);
    if (preferredCurrency === "NGN") {
      return `$${usd.toFixed(2)} USD`;
    }
    return `₦${calculatedNgn.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-[#8A948B] text-white font-sans pb-28 selection:bg-white selection:text-[#1C3B34] relative overflow-hidden">
      {/* Animated Ambient Orbs & Subtle Radial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 30, 0],
            y: [0, -25, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-white/20 blur-[170px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.22, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-emerald-950/25 blur-[160px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
        <LiquidGlassBackground intensity="subtle" />
      </div>

      <div className="relative z-10">
        {/* ========================================================================= */}
        {/* 01. EDITORIAL TOP BAR & LIVE READER PULSE */}
        {/* ========================================================================= */}
        <header className="border-b border-white/15 bg-black/10 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            {/* Logo & Section Title */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-white/25 bg-white/10 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Image
                    src="/origin.png"
                    alt="Origin Logo"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-extrabold text-sm tracking-tight text-white font-mono block">
                    A LIBRARY OF IDEAS
                  </span>
                  <span className="text-[10px] text-[#D5DDCF] font-mono tracking-wider uppercase block">
                    Origin Reading Companions &amp; Works
                  </span>
                </div>
              </Link>
            </div>

            {/* Live Reader Activity Ticker */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/20 border border-white/20 text-[11px] font-mono text-emerald-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>340+ EXECUTIVES &amp; BUILDERS READING THIS MONTH</span>
            </div>

            {/* Currency Switcher & Cart Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-black/25 border border-white/20 rounded-full p-0.5 text-[11px] font-mono">
                <button
                  onClick={() => setPreferredCurrency("NGN")}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-bold ${
                    preferredCurrency === "NGN"
                      ? "bg-[#1C3B34] text-white shadow-xs"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  ₦ NGN
                </button>
                <button
                  onClick={() => setPreferredCurrency("USD")}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-bold ${
                    preferredCurrency === "USD"
                      ? "bg-[#1C3B34] text-white shadow-xs"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  $ USD
                </button>
              </div>

              {cartCount > 0 ? (
                <Link
                  href="/cart"
                  className="px-3.5 py-1.5 rounded-full bg-[#1C3B34] hover:bg-[#152e29] text-white border border-white/25 font-mono text-xs font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
                >
                  <ShoppingBag size={13} />
                  <span>Cart ({cartCount})</span>
                </Link>
              ) : (
                <Link
                  href="/cart"
                  className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white/80 border border-white/20 transition-colors"
                  title="View cart"
                >
                  <ShoppingBag size={15} />
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 02. PAGE TITLE & FLOATING SAGE CATEGORIES DOCK */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-[10px] font-mono uppercase tracking-widest text-emerald-100 mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-emerald-200" />
            <span>The Curated Library of Sovereign Thought</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Instruments of <span className="italic font-normal text-emerald-100">Transformation</span>, Engineered for Mastery.
          </h1>

          <p className="mt-3.5 text-xs sm:text-sm text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            Unabridged reading companions, hardcopy blueprints, and interactive life design systems published by The Becoming Institute.
          </p>

          {/* Architectural Bento Category Filter Grid */}
          <div className="mt-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;
                const count =
                  category.id === "all"
                    ? products.length
                    : products.filter((p) => p.category === category.id).length;

                const CatIcon = category.icon;

                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      const firstInCat = products.find(
                        (p) => category.id === "all" || p.category === category.id
                      );
                      if (firstInCat) setSelectedProductId(firstInCat.id);
                    }}
                    className={`group relative flex flex-col justify-between p-3.5 rounded-2xl text-left transition-all duration-300 cursor-pointer border backdrop-blur-md ${
                      isActive
                        ? "bg-[#E2E8DE] text-[#172217] border-white shadow-xl -translate-y-0.5 ring-2 ring-[#1C3B34]/20"
                        : "bg-white/12 hover:bg-white/20 text-white border-white/25 hover:border-white/40 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-[#1C3B34] text-white shadow-xs"
                            : "bg-white/15 text-emerald-100 group-hover:bg-white/25"
                        }`}
                      >
                        <CatIcon size={15} />
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold tracking-tight ${
                          isActive
                            ? "bg-[#1C3B34]/12 text-[#1C3B34] border border-[#1C3B34]/20"
                            : "bg-black/20 text-white/90 border border-white/15"
                        }`}
                      >
                        {String(count).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`text-[11px] sm:text-xs font-mono font-bold tracking-tight block leading-snug ${
                          isActive ? "text-[#172217]" : "text-white"
                        }`}
                      >
                        {category.name}
                      </span>
                      <span
                        className={`text-[9px] font-mono uppercase tracking-wider block mt-0.5 ${
                          isActive ? "text-[#1C3B34] font-semibold" : "text-white/65"
                        }`}
                      >
                        {isActive ? "Active Filter" : "Explore →"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 03. HERO BENTO SHOWCASE (FEATURING FULL-HEIGHT ELEVATED COVER) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-[#E2E8DE] text-[#172217] rounded-3xl sm:rounded-[2.25rem] border border-[#D5DDCF] shadow-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                {/* LEFT COLUMN (6 cols): Editorial Narrative, Specs & Acquisition */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6 text-left">
                  <div className="space-y-4">
                    {/* Header Badges */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#CCD6C6] text-[10px] font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                        <Compass className="w-3 h-3 text-[#1C3B34]" />
                        <span>CURATOR&apos;S CHOICE // {selectedProduct.category.toUpperCase()}</span>
                      </div>
                      {showcaseOwned && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-mono font-bold">
                          <CheckCircle2 size={12} className="text-emerald-700" />
                          <span>OWNED IN YOUR CODEX</span>
                        </div>
                      )}
                      {showcaseQty > 0 && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1C3B34] text-white text-[10px] font-mono font-bold">
                          <ShoppingBag size={12} />
                          <span>{showcaseQty} IN YOUR CART</span>
                        </div>
                      )}
                    </div>

                    {/* Giant Serif Title */}
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#172217] tracking-tight leading-tight">
                      {selectedProduct.name}
                    </h2>

                    {/* Editorial Kicker & Description */}
                    <p className="text-[#4E5B4B] text-xs sm:text-sm font-light leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    {/* Technical Spec Sheet Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                      <div className="p-2.5 rounded-xl bg-white/80 border border-[#CCD6C6] text-xs font-mono">
                        <span className="text-[10px] text-[#6A7B6D] uppercase block font-semibold">Format</span>
                        <span className="font-bold text-[#1C3B34]">
                          {selectedProduct.category === "hardcopy"
                            ? "Hardcover Edition"
                            : selectedProduct.category === "journals"
                            ? "Fillable Master Kit"
                            : "Digital PDF + EPUB"}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/80 border border-[#CCD6C6] text-xs font-mono">
                        <span className="text-[10px] text-[#6A7B6D] uppercase block font-semibold">Access</span>
                        <span className="font-bold text-[#1C3B34]">Instant Cloud Reader</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/80 border border-[#CCD6C6] text-xs font-mono col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-[#6A7B6D] uppercase block font-semibold">Interactive Twin</span>
                        <span className="font-bold text-[#1C3B34]">Simulation Enabled</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Acquisition Command Center */}
                  <div className="pt-4 border-t border-[#D0D9CA] space-y-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold tracking-wider block">
                          ACQUISITION INVESTMENT
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-mono font-extrabold text-[#172217]">
                            {formatPrice(selectedProduct.price, selectedProduct.priceNGN)}
                          </span>
                          <span className="text-xs font-mono text-[#4E5B4B]">
                            ({getSecondaryPrice(selectedProduct.price, selectedProduct.priceNGN)})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-[#CCD6C6] text-xs font-mono font-bold text-[#172217]">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{selectedProduct.rating}</span>
                        <span className="text-[#4E5B4B] text-[11px]">
                          ({selectedProduct.reviews} reader reviews)
                        </span>
                      </div>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {/* Look Inside / Sample Button */}
                      <button
                        onClick={() => setReaderProductId(selectedProduct.id)}
                        className="py-3 px-5 rounded-xl bg-white/90 hover:bg-white border border-[#CCD6C6] text-[#1C3B34] text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs group"
                      >
                        <Eye className="w-4 h-4 text-[#1C3B34] group-hover:scale-110 transition-transform" />
                        <span>LOOK INSIDE / SAMPLE</span>
                      </button>

                      {/* Primary Cart / Acquisition Button */}
                      {showcaseQty > 0 ? (
                        <div className="flex-1 flex items-center justify-between rounded-xl bg-white border border-[#1C3B34]/30 p-1 font-mono text-xs shadow-md">
                          <button
                            onClick={() => {
                              decrementQuantity(selectedProduct.id);
                              if (showcaseQty === 1) {
                                showToast(`Removed "${selectedProduct.name}" from cart`, "info");
                              }
                            }}
                            className="w-9 h-9 rounded-lg hover:bg-black/5 text-[#172217] flex items-center justify-center font-bold cursor-pointer"
                            title="Decrease quantity"
                          >
                            {showcaseQty === 1 ? (
                              <Trash2 size={13} className="text-red-600" />
                            ) : (
                              <Minus size={14} />
                            )}
                          </button>
                          <span className="px-3 font-extrabold text-[#172217] text-xs">
                            {showcaseQty} in cart
                          </span>
                          <button
                            onClick={() => incrementQuantity(selectedProduct.id)}
                            className="w-9 h-9 rounded-lg bg-[#1C3B34] hover:bg-[#152e29] text-white flex items-center justify-center font-bold cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                          <Link
                            href="/cart"
                            className="ml-2 py-2 px-3 rounded-lg bg-[#1C3B34] hover:bg-[#152e29] text-white font-bold flex items-center gap-1.5"
                          >
                            <span>Cart →</span>
                          </Link>
                        </div>
                      ) : showcaseOwned ? (
                        <Link
                          href={`/store/${selectedProduct.id}`}
                          className="flex-1 py-3 px-5 rounded-xl bg-[#1C3B34] hover:bg-[#152e29] text-white text-xs font-mono font-bold text-center transition-all flex items-center justify-center gap-2 shadow-md"
                        >
                          <CheckCircle2 size={14} className="text-emerald-300" />
                          <span>YOU OWN THIS · OPEN DETAILS &amp; READER</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            addToCart({
                              id: String(selectedProduct.id),
                              title: selectedProduct.name,
                              description: selectedProduct.description,
                              fullDescription: selectedProduct.description,
                              priceUSD: selectedProduct.price,
                              priceNGN:
                                selectedProduct.priceNGN ||
                                Math.round(selectedProduct.price * 1500),
                              imageUrl: selectedProduct.imageUrl,
                              bgGradient: selectedProduct.gradient,
                              icon: selectedProduct.icon,
                              iconColor: "text-amber-600",
                              ageRange: "All Ages",
                            });
                            showToast(`"${selectedProduct.name}" added to cart`, "success");
                          }}
                          className="flex-1 py-3 px-6 rounded-xl bg-[#1C3B34] hover:bg-[#152e29] text-white text-xs font-mono font-bold text-center transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                        >
                          <ShoppingBag className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                          <span>ADD TO CART · {formatPrice(selectedProduct.price, selectedProduct.priceNGN)}</span>
                        </button>
                      )}

                      <Link
                        href={`/store/${selectedProduct.id}`}
                        className="py-3 px-3 rounded-xl bg-white/80 hover:bg-[#1C3B34] hover:text-white text-[#172217] border border-[#CCD6C6] text-xs font-mono flex items-center justify-center transition-colors"
                        title="View Full Page"
                      >
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN (6 cols): TALL ELEVATED 3D COVER & BENTO SIDE STACK */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                  {/* TALL ELEVATED COVER SHOWCASE (Sage Glassmorphism, Background-Free Cover Stage) */}
                  <div className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/35 bg-[#8A948B]/40 backdrop-blur-xl shadow-inner group flex items-center justify-center p-4">
                    {/* Ambient radial glow behind the floating cover */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_0%,transparent_70%)] pointer-events-none" />

                    {showcaseImage || selectedProduct.imageUrl ? (
                      <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[470px] transition-transform duration-700 group-hover:scale-[1.03]">
                        <Image
                          src={showcaseImage || selectedProduct.imageUrl || ""}
                          alt={selectedProduct.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority
                          className="object-contain p-2 drop-shadow-[0_24px_35px_rgba(23,34,23,0.28)]"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center rounded-xl">
                        <selectedProduct.icon className="w-24 h-24 text-[#1C3B34] opacity-80" />
                      </div>
                    )}

                    {/* Top Floating Sage Glass Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-md bg-white/25 backdrop-blur-md text-[10px] font-mono text-[#172217] border border-white/40 font-bold shadow-2xs">
                        EDITION // 00{selectedProduct.id}
                      </span>
                      <span className="px-3 py-1 rounded-md bg-[#1C3B34]/85 backdrop-blur-md text-[10px] font-mono text-emerald-100 border border-white/25 font-bold shadow-2xs">
                        VERIFIED RELEASE
                      </span>
                    </div>

                    {/* Bottom Floating Sage Glass Badge */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-[10px] font-mono text-[#172217] border border-white/40 flex items-center gap-1.5 font-bold shadow-2xs">
                        <BookOpen size={11} className="text-[#1C3B34]" />
                        <span>Interactive Reader</span>
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-[10px] font-mono text-[#172217] border border-white/40 font-bold shadow-2xs">
                        ★ {selectedProduct.rating} Rating
                      </span>
                    </div>
                  </div>

                  {/* Multi-view Gallery Switcher Strip (if images exist) */}
                  {selectedProduct.galleryImages && selectedProduct.galleryImages.length > 1 && (
                    <div className="p-3 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#1C3B34]">
                        <span>AVAILABLE VIEWS &amp; EDITIONS ({selectedProduct.galleryImages.length})</span>
                        <span className="text-[#4E5B4B] uppercase font-normal">CLICK TO PREVIEW</span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {selectedProduct.galleryImages.map((img, i) => {
                          const isThumbSelected = showcaseImage === img;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setShowcaseImage(img)}
                              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                                isThumbSelected
                                  ? "border-[#1C3B34] ring-2 ring-[#1C3B34]/30 scale-105"
                                  : "border-transparent opacity-80 hover:opacity-100 hover:border-[#CCD6C6]"
                              }`}
                            >
                              <Image
                                src={img}
                                alt={`${selectedProduct.name} preview ${i + 1}`}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Curator Note Bento Cell */}
                  <div className="p-4 rounded-2xl bg-white/80 border border-[#CCD6C6] text-xs space-y-1.5 text-left">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#1C3B34] font-bold">
                      <span className="flex items-center gap-1">
                        <Zap size={11} />
                        <span>Founder Note · Zeki Ubor</span>
                      </span>
                      <span>The Becoming Institute</span>
                    </div>
                    <p className="text-[#4E5B4B] italic text-[11px] leading-relaxed">
                      &quot;You cannot harvest what you never planted. Origin companions are engineered to permanently dismantle default scarcity habits and anchor sovereign leverage.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ========================================================================= */}
        {/* 04. THE CODEX GRID: TALL VERTICAL PRODUCT COVERS */}
        {/* ========================================================================= */}
        <div id="store-products-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 pb-4 border-b border-white/20">
            <div>
              <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest block font-bold">
                COMPLETE CATALOG // {filteredProducts.length} ARTIFACTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight mt-1">
                All Works &amp; Publications
              </h3>
            </div>
            <p className="text-xs font-mono text-white/80">
              Active Category: <span className="text-white font-bold uppercase">{activeCategory}</span>
            </p>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isSelected = product.id === selectedProductId;
              const qtyInCart = getItemQuantity(product.id);
              const isOwned = isItemOwned(product.id);

              return (
                <motion.div
                  key={product.id}
                  id={`product-${product.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedProductId(product.id)}
                  className={`bg-[#E2E8DE] text-[#172217] rounded-[1.75rem] border shadow-xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:-translate-y-1 ${
                    isSelected
                      ? "ring-3 ring-[#1C3B34] border-[#1C3B34]"
                      : "border-[#D5DDCF] hover:border-[#1C3B34]"
                  }`}
                >
                  <div className="space-y-4">
                    {/* TALL PRODUCT COVER STAGE (Sage Glassmorphism, Background-Free Cover) */}
                    <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/35 bg-[#8A948B]/40 backdrop-blur-xl shadow-inner group flex items-center justify-center p-3">
                      {/* Ambient radial glow behind the floating cover */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_0%,transparent_70%)] pointer-events-none" />

                      {product.imageUrl ? (
                        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain p-1 drop-shadow-[0_18px_28px_rgba(23,34,23,0.25)]"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center rounded-xl">
                          <product.icon className="w-16 h-16 text-[#1C3B34] opacity-80" />
                        </div>
                      )}

                      {/* Top Sage Glass Badge */}
                      <div className="absolute top-3 left-3 right-3 bg-white/25 backdrop-blur-md border border-white/40 p-2 rounded-xl text-[#172217] shadow-2xs flex items-center justify-between">
                        <span className="font-serif font-bold text-xs truncate max-w-[65%] text-[#172217]">
                          {product.name}
                        </span>
                        <div className="text-right">
                          <span className="text-xs font-mono font-extrabold text-[#1C3B34] block leading-tight">
                            {formatPrice(product.price, product.priceNGN)}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Sage Glass Status Pill */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono">
                        {isOwned ? (
                          <span className="bg-[#1C3B34]/90 backdrop-blur-md text-emerald-100 px-3 py-1 rounded-full border border-white/25 flex items-center gap-1 font-bold shadow-2xs">
                            <CheckCircle2 className="w-3 h-3 text-emerald-300" /> Owned
                          </span>
                        ) : (
                          <span className="bg-white/25 backdrop-blur-md text-[#172217] px-3 py-1 rounded-full border border-white/40 flex items-center gap-1 font-bold shadow-2xs">
                            <BookOpen className="w-3 h-3 text-[#1C3B34]" /> Digital Twin
                          </span>
                        )}

                        {qtyInCart > 0 ? (
                          <span className="bg-[#1C3B34] text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-white/25 flex items-center gap-1 font-bold shadow-2xs">
                            <ShoppingBag className="w-3 h-3 text-emerald-300" /> {qtyInCart} in cart
                          </span>
                        ) : (
                          <span className="bg-white/25 backdrop-blur-md text-[#172217] px-2.5 py-1 rounded-full border border-white/40 flex items-center gap-1 font-bold shadow-2xs">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {product.rating}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Category Tag & Active Indicator */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/80 border border-[#CCD6C6] text-[10px] font-mono font-bold text-[#1C3B34] uppercase tracking-wider">
                        {product.category === "ebooks"
                          ? "READING COMPANION"
                          : product.category.toUpperCase()}
                      </span>
                      {isSelected && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1C3B34] text-white text-[9px] font-mono font-bold uppercase">
                          ACTIVE SPOTLIGHT
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-serif font-extrabold text-[#172217] tracking-tight leading-snug group-hover:text-[#1C3B34] transition-colors">
                      {product.name}
                    </h4>

                    {/* Description */}
                    <p className="text-[#4E5B4B] text-xs font-light leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-4 mt-4 border-t border-[#D0D9CA] space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-[#4E5B4B] font-bold block">
                          INVESTMENT
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-mono font-extrabold text-[#172217]">
                            {formatPrice(product.price, product.priceNGN)}
                          </span>
                          <span className="text-[10px] font-mono text-[#4E5B4B]">
                            ({getSecondaryPrice(product.price, product.priceNGN)})
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setReaderProductId(product.id);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/90 hover:bg-white border border-[#CCD6C6] text-[#1C3B34] text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        title="Look Inside / Quick Sample"
                      >
                        <Eye size={12} className="text-[#1C3B34]" />
                        <span>Sample</span>
                      </button>
                    </div>

                    {/* Reactive In-Cart Controls or Add to Cart */}
                    {qtyInCart > 0 ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 flex items-center justify-between rounded-xl bg-white/95 border border-[#1C3B34]/30 p-1 font-mono text-xs shadow-xs">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                decrementQuantity(product.id);
                                if (qtyInCart === 1) {
                                  showToast(`Removed "${product.name}" from cart`, "info");
                                }
                              }}
                              className="w-7 h-7 rounded-lg hover:bg-black/5 text-[#172217] flex items-center justify-center font-bold cursor-pointer"
                              title="Decrease quantity"
                            >
                              {qtyInCart === 1 ? (
                                <Trash2 size={13} className="text-red-600" />
                              ) : (
                                <Minus size={13} />
                              )}
                            </button>
                            <span className="font-extrabold text-[#172217] text-xs">
                              {qtyInCart} in cart
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                incrementQuantity(product.id);
                              }}
                              className="w-7 h-7 rounded-lg bg-[#1C3B34] text-white hover:bg-[#152e29] flex items-center justify-center font-bold cursor-pointer"
                              title="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <Link
                            href="/cart"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2.5 rounded-xl bg-[#1C3B34] text-white hover:bg-[#152e29] transition-all shadow-xs flex items-center justify-center"
                            title="Go to Cart"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </Link>
                        </div>
                        <Link
                          href={`/store/${product.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="block text-center text-[10px] font-mono text-[#1C3B34] hover:underline font-bold"
                        >
                          View Full Details &amp; Reader →
                        </Link>
                      </div>
                    ) : isOwned ? (
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/store/${product.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-[#1C3B34] hover:bg-[#152e29] text-white font-mono text-[11px] font-bold text-center transition-all shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 size={13} className="text-emerald-300" />
                          <span>OWNED · ACCESS</span>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: String(product.id),
                              title: product.name,
                              description: product.description,
                              fullDescription: product.description,
                              priceUSD: product.price,
                              priceNGN:
                                product.priceNGN || Math.round(product.price * 1500),
                              imageUrl: product.imageUrl,
                              bgGradient: product.gradient,
                              icon: product.icon,
                              iconColor: "text-amber-600",
                              ageRange: "All Ages",
                            });
                            showToast(
                              `Added additional copy of "${product.name}" to cart`,
                              "success"
                            );
                          }}
                          className="p-2.5 rounded-xl bg-white/80 hover:bg-[#1C3B34] hover:text-white border border-[#CCD6C6] text-[#172217] transition-all cursor-pointer"
                          title="Add supplemental/gift copy"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: String(product.id),
                              title: product.name,
                              description: product.description,
                              fullDescription: product.description,
                              priceUSD: product.price,
                              priceNGN:
                                product.priceNGN || Math.round(product.price * 1500),
                              imageUrl: product.imageUrl,
                              bgGradient: product.gradient,
                              icon: product.icon,
                              iconColor: "text-amber-600",
                              ageRange: "All Ages",
                            });
                            showToast(`"${product.name}" added to cart`, "success");
                          }}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-[#1C3B34] hover:bg-[#152e29] text-white font-mono text-xs font-bold text-center transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                          <ShoppingBag size={14} />
                          <span>Add to Cart</span>
                        </button>
                        <Link
                          href={`/store/${product.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 rounded-xl bg-white/80 hover:bg-[#1C3B34] hover:text-white border border-[#CCD6C6] text-[#172217] transition-colors"
                          title="View Details"
                        >
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 05. SLIDE-OVER EBOOK READER MODAL (IN-STORE PREVIEW) */}
      {/* ========================================================================= */}
      <EBookReaderModal
        isOpen={readerProductId !== null}
        onClose={() => setReaderProductId(null)}
        productId={readerProductId || 7}
        isPurchased={readerProductId ? isItemOwned(readerProductId) : false}
      />
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#8A948B] text-white flex items-center justify-center text-xs font-mono">
          LOADING LIBRARY...
        </div>
      }
    >
      <StoreContent />
    </Suspense>
  );
}
