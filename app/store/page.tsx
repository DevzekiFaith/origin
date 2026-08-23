"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Book, Package, Shirt, PenTool, ShoppingBag, Star, Award, Heart, Download, BookOpen, Sparkles, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { STORE_PRODUCTS, StoreProduct } from "../data/store-products";
import { getCourseForCompanionProduct } from "../data/course-ebook-mapping";
import { motion, AnimatePresence } from "framer-motion";

function StoreContent() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  const categories = [
    { id: "all", name: "All Ideas & Works", icon: BookOpen },
    { id: "ebooks", name: "Reading Companions", icon: Book },
    { id: "hardcopy", name: "Hardcopy Manuals", icon: Book },
    { id: "journals", name: "Life Planners & Journals", icon: PenTool },
    { id: "merch", name: "Merchandise", icon: Shirt },
    { id: "courses", name: "Workshops & Events", icon: Award },
  ];

  const products = STORE_PRODUCTS;
  const urlCategory = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProductId, setSelectedProductId] = useState<number>(1);

  useEffect(() => {
    if (urlCategory && categories.some((c) => c.id === urlCategory)) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const selectedProduct = products.find(p => p.id === selectedProductId) || filteredProducts[0] || products[0];
  const connectedCourse = getCourseForCompanionProduct(selectedProduct.id);

  return (
    <div className="min-h-screen bg-[#8A948B] text-white font-sans pb-24 selection:bg-white selection:text-[#8A948B] relative overflow-hidden">
      {/* Dynamic Animated Ambient Orbs & Subtle Radial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/15 blur-[160px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      <div className="relative z-10">
        {/* Top Bar Navigation */}
        <div className="border-b border-white/15 py-3.5 bg-black/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center">
                <Image src="/origin.png" alt="Origin Logo" fill sizes="28px" className="object-cover" />
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight text-white font-mono">A LIBRARY OF IDEAS</span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider">
              Origin Reading Companions &amp; Works
            </div>
          </div>
        </div>

        {/* Categories Selector Bar */}
        <div className="max-w-7xl mx-auto my-6 sm:my-8 px-4">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    const firstInCat = products.find(p => category.id === "all" || p.category === category.id);
                    if (firstInCat) setSelectedProductId(firstInCat.id);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold transition-all rounded-full border shrink-0 cursor-pointer uppercase tracking-wider ${
                    isActive
                      ? "bg-[#E2E8DE] text-[#1C3B34] border-[#E2E8DE] shadow-sm scale-105"
                      : "bg-white/15 text-white border-white/20 hover:bg-white/25"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Hero Featured Showcase Item */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-[#E2E8DE] text-[#172217] rounded-[2rem] border border-[#D5DDCF] shadow-xl p-5 sm:p-7 lg:p-8 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Left Column (5 cols): Copy & Details */}
                <div className="lg:col-span-5 space-y-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#CCD6C6] text-[11px] font-mono font-bold text-[#1C3B34] uppercase">
                    <Sparkles className="w-3 h-3 text-[#1C3B34]" />
                    <span>FEATURED RELEASE // {selectedProduct.category.toUpperCase()}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-[#172217] tracking-tight leading-tight">
                    {selectedProduct.name}
                  </h1>

                  <p className="text-[#4E5B4B] text-xs sm:text-sm font-light leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Connected Course if any */}
                  {connectedCourse && (
                    <div className="p-3.5 rounded-xl bg-white/80 border border-[#CCD6C6] text-xs font-mono text-[#172217] space-y-0.5">
                      <div className="text-[10px] uppercase text-[#1C3B34] font-bold">Connected Thinking Course:</div>
                      <Link href={`/courses/${connectedCourse.courseId}`} className="text-[#1C3B34] font-extrabold hover:underline block text-xs">
                        {connectedCourse.courseTitle} →
                      </Link>
                    </div>
                  )}

                  {/* Price Counter */}
                  <div className="pt-2 flex items-center justify-between gap-4 border-t border-[#D0D9CA]">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold block">INVESTMENT</span>
                      <span className="text-2xl font-mono font-extrabold text-[#172217]">
                        ${selectedProduct.price} <span className="text-xs text-[#4E5B4B] font-normal">USD</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 border border-[#CCD6C6] text-xs font-mono font-bold text-[#172217]">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{selectedProduct.rating}</span>
                      <span className="text-[#4E5B4B] text-[11px]">({selectedProduct.reviews})</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <Link
                      href={`/store/${selectedProduct.id}`}
                      className="flex-1 py-3 px-5 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white text-xs font-mono font-bold text-center transition-all shadow-sm"
                    >
                      READ SAMPLE / DETAILS →
                    </Link>
                    <button
                      onClick={() => {
                        addToCart({
                          id: `store-${selectedProduct.id}`,
                          title: selectedProduct.name,
                          description: selectedProduct.description,
                          fullDescription: selectedProduct.description,
                          priceUSD: selectedProduct.price,
                          imageUrl: selectedProduct.imageUrl,
                          bgGradient: selectedProduct.gradient,
                          icon: selectedProduct.icon,
                          iconColor: "text-amber-600",
                          ageRange: "All Ages",
                        });
                        showToast(`"${selectedProduct.name}" added to cart`, "success");
                      }}
                      className="p-3 rounded-xl bg-white/80 hover:bg-[#1C3B34] hover:text-white border border-[#CCD6C6] text-[#172217] transition-all cursor-pointer"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Column (7 cols): Full & Prominent Image Showcase Card */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] min-h-[260px] sm:min-h-[320px] w-full rounded-[1.75rem] overflow-hidden border border-[#D5DDCF] shadow-lg bg-[#121316] group">
                    {selectedProduct.imageUrl ? (
                      <Image
                        src={selectedProduct.imageUrl}
                        alt={selectedProduct.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1C3B34] to-[#8A948B]">
                        <selectedProduct.icon className="w-24 h-24 text-white opacity-80" />
                      </div>
                    )}

                    {/* Top Glass Overlay Badge */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 bg-black/60 backdrop-blur-md border border-white/20 p-3.5 rounded-xl text-white flex items-center justify-between">
                      <div>
                        <span className="font-serif font-extrabold text-sm sm:text-base block leading-none">{selectedProduct.name}</span>
                        <span className="text-[10px] font-mono text-white/80 block mt-0.5">Origin Release</span>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-sm font-extrabold text-amber-300 block">${selectedProduct.price} USD</span>
                        <span className="text-[10px] text-white/70">₦{(selectedProduct.priceNGN || Math.round(selectedProduct.price * 1500)).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Bottom Floating Pill Badges Row */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full px-3.5 py-1.5 text-[11px] font-mono">
                        <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                        <span>Instant Access</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full px-3.5 py-1.5 text-[11px] font-mono">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verified Release</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ALL WORKS & RELEASES SECTION TITLE */}
        <div id="store-products-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-white tracking-tight mb-1">ALL WORKS &amp; RELEASES</h2>
          <p className="text-white/90 max-w-md mx-auto text-xs sm:text-sm font-light">
            Sleek vertical product library. Select any work to feature or explore details.
          </p>
        </div>

        {/* VERTICAL DESIGN PRODUCTS GRID WITH FULL BIGGER THUMBNAILS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isSelected = product.id === selectedProductId;

              return (
                <motion.div
                  key={product.id}
                  id={`product-${product.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedProductId(product.id)}
                  className={`bg-[#E2E8DE] text-[#172217] rounded-[1.75rem] border shadow-xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1 ${
                    isSelected ? "ring-3 ring-[#1C3B34] border-[#1C3B34]" : "border-[#D5DDCF] hover:border-[#1C3B34]"
                  }`}
                >
                  <div className="space-y-4">
                    {/* FULL & BIGGER PROMINENT ASPECT COVER IMAGE THUMBNAIL */}
                    <div className="relative aspect-[4/3] w-full min-h-[220px] sm:min-h-[250px] rounded-[1.5rem] overflow-hidden border border-[#D5DDCF] shadow-lg bg-[#121316] group">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1C3B34] to-[#8A948B]">
                          <product.icon className="w-16 h-16 text-white opacity-80" />
                        </div>
                      )}

                      {/* Top Glass Badge */}
                      <div className="absolute top-3 left-3 right-3 bg-black/60 backdrop-blur-md border border-white/20 p-3 rounded-xl text-white flex items-center justify-between">
                        <span className="font-serif font-extrabold text-xs sm:text-sm truncate max-w-[65%]">{product.name}</span>
                        <span className="text-xs sm:text-sm font-mono font-extrabold text-amber-300">${product.price}</span>
                      </div>

                      {/* Bottom Status Pill */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white">
                        <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-amber-300" /> Digital
                        </span>
                        <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified
                        </span>
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/80 border border-[#CCD6C6] text-[10px] font-mono font-bold text-[#1C3B34] uppercase">
                        {product.category === "ebooks" ? "READING COMPANION" : product.category.toUpperCase()}
                      </span>
                      {isSelected && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1C3B34] text-white text-[9px] font-mono font-bold uppercase">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-[#172217] tracking-tight leading-snug">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[#4E5B4B] text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Bottom Price, Rating & Actions */}
                  <div className="pt-4 mt-4 border-t border-[#D0D9CA] space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-[#4E5B4B] font-bold block">INVESTMENT</span>
                        <span className="text-xl font-mono font-extrabold text-[#172217]">
                          ${product.price} <span className="text-[10px] text-[#4E5B4B] font-normal">USD</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 border border-[#CCD6C6] text-[10px] font-mono font-bold text-[#172217]">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-[#4E5B4B]">({product.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/store/${product.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-3 px-3 rounded-xl bg-[#8A948B] hover:bg-[#1C3B34] text-white font-mono text-[11px] font-bold text-center transition-all shadow-xs"
                      >
                        EXPLORE DETAILS →
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: `store-${product.id}`,
                            title: product.name,
                            description: product.description,
                            fullDescription: product.description,
                            priceUSD: product.price,
                            imageUrl: product.imageUrl,
                            bgGradient: product.gradient,
                            icon: product.icon,
                            iconColor: "text-amber-600",
                            ageRange: "All Ages",
                          });
                          showToast(`"${product.name}" added to cart`, "success");
                        }}
                        className="p-3 rounded-xl bg-white/80 hover:bg-[#1C3B34] hover:text-white border border-[#CCD6C6] text-[#172217] transition-all cursor-pointer"
                        title="Add to cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#8A948B] text-white flex items-center justify-center text-xs font-mono">
        LOADING LIBRARY...
      </div>
    }>
      <StoreContent />
    </Suspense>
  );
}
