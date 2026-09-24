"use client";

import { useState, useEffect, Suspense } from "react";
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
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";
import { STORE_PRODUCTS } from "../data/store-products";
import { getCourseForCompanionProduct } from "../data/course-ebook-mapping";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassBackground } from "../components/3d";

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
  const [showcaseImage, setShowcaseImage] = useState<string>("");

  useEffect(() => {
    if (urlCategory && categories.some((c) => c.id === urlCategory)) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const selectedProduct = products.find(p => p.id === selectedProductId) || filteredProducts[0] || products[0];

  useEffect(() => {
    if (selectedProduct?.imageUrl) {
      setShowcaseImage(selectedProduct.imageUrl);
    }
  }, [selectedProduct?.id, selectedProduct?.imageUrl]);

  const showcaseQty = getItemQuantity(selectedProduct.id);
  const showcaseOwned = isItemOwned(selectedProduct.id);

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
        <LiquidGlassBackground intensity="subtle" />
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
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                Origin Reading Companions &amp; Works
              </div>
              {cartCount > 0 && (
                <Link
                  href="/cart"
                  className="px-3 py-1.5 rounded-full bg-[#1C3B34] text-white border border-white/20 font-mono text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-[#152e29] transition-all"
                >
                  <ShoppingBag size={13} />
                  <span>Cart ({cartCount})</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Categories Selector Bar */}
        <div className="max-w-7xl mx-auto my-4 sm:my-8 px-3.5 sm:px-6 lg:px-8">
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
                  className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-mono font-bold transition-all rounded-full border shrink-0 cursor-pointer uppercase tracking-wider ${
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
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-[#E2E8DE] text-[#172217] rounded-[1.75rem] sm:rounded-[2rem] border border-[#D5DDCF] shadow-xl p-4 sm:p-7 lg:p-8 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Left Column (5 cols): Copy & Details */}
                <div className="lg:col-span-5 space-y-4 text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#CCD6C6] text-[11px] font-mono font-bold text-[#1C3B34] uppercase">
                      <Compass className="w-3 h-3 text-[#1C3B34]" />
                      <span>FEATURED RELEASE · {selectedProduct.category.toUpperCase()}</span>
                    </div>
                    {showcaseOwned && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-mono font-bold">
                        <CheckCircle2 size={12} className="text-emerald-700" />
                        <span>OWNED</span>
                      </div>
                    )}
                    {showcaseQty > 0 && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1C3B34] text-white text-[10px] font-mono font-bold">
                        <ShoppingBag size={12} />
                        <span>{showcaseQty} IN CART</span>
                      </div>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-[#172217] tracking-tight leading-tight">
                    {selectedProduct.name}
                  </h1>

                  <p className="text-[#4E5B4B] text-xs sm:text-sm font-light leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Connected Challenge */}
                  <div className="p-3.5 rounded-xl bg-white/80 border border-[#CCD6C6] text-xs font-mono text-[#172217] space-y-0.5">
                    <div className="text-[10px] uppercase text-[#1C3B34] font-bold">Interactive Origin Simulation:</div>
                    <Link href="/#origin-challenges" className="text-[#1C3B34] font-extrabold hover:underline block text-xs">
                      Origin Decision Challenges Arena →
                    </Link>
                  </div>

                  {/* Price Counter */}
                  <div className="pt-2 flex items-center justify-between gap-4 border-t border-[#D0D9CA]">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#4E5B4B] font-bold block">INVESTMENT</span>
                      <span className="text-2xl font-mono font-extrabold text-[#172217]">
                        ${selectedProduct.price} <span className="text-xs text-[#4E5B4B] font-normal">USD</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#4E5B4B] block">
                        ₦{(selectedProduct.priceNGN || Math.round(selectedProduct.price * 1500)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 border border-[#CCD6C6] text-xs font-mono font-bold text-[#172217]">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{selectedProduct.rating}</span>
                      <span className="text-[#4E5B4B] text-[11px]">({selectedProduct.reviews})</span>
                    </div>
                  </div>

                  {/* Modern Reactive Actions */}
                  <div className="pt-1 space-y-2">
                    {showcaseQty > 0 ? (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <div className="flex items-center justify-between rounded-xl bg-white/95 border border-[#1C3B34]/30 p-1 font-mono text-xs shadow-xs">
                          <button
                            onClick={() => {
                              decrementQuantity(selectedProduct.id);
                              if (showcaseQty === 1) {
                                showToast(`Removed "${selectedProduct.name}" from cart`, "info");
                              }
                            }}
                            className="w-8 h-8 rounded-lg hover:bg-black/5 text-[#172217] flex items-center justify-center font-bold cursor-pointer"
                            title="Decrease quantity"
                          >
                            {showcaseQty === 1 ? <Trash2 size={13} className="text-red-600" /> : <Minus size={14} />}
                          </button>
                          <span className="px-3 font-extrabold text-[#172217] text-xs">
                            {showcaseQty} in cart
                          </span>
                          <button
                            onClick={() => {
                              incrementQuantity(selectedProduct.id);
                            }}
                            className="w-8 h-8 rounded-lg bg-[#1C3B34] text-white hover:bg-[#152e29] flex items-center justify-center font-bold cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <Link
                          href="/cart"
                          className="flex-1 py-3 px-5 rounded-xl bg-[#1C3B34] hover:bg-[#152e29] text-white text-xs font-mono font-bold text-center transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          <span>VIEW IN CART ({cartCount})</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    ) : showcaseOwned ? (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <Link
                          href={`/store/${selectedProduct.id}`}
                          className="flex-1 py-3 px-5 rounded-xl bg-[#1C3B34] hover:bg-[#152e29] text-white text-xs font-mono font-bold text-center transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 size={15} className="text-emerald-300" />
                          <span>YOU OWN THIS EDITION · DETAILS &amp; READER →</span>
                        </Link>
                        <button
                          onClick={() => {
                            addToCart({
                              id: `store-${selectedProduct.id}`,
                              title: selectedProduct.name,
                              description: selectedProduct.description,
                              fullDescription: selectedProduct.description,
                              priceUSD: selectedProduct.price,
                              priceNGN: selectedProduct.priceNGN || Math.round(selectedProduct.price * 1500),
                              imageUrl: selectedProduct.imageUrl,
                              bgGradient: selectedProduct.gradient,
                              icon: selectedProduct.icon,
                              iconColor: "text-amber-600",
                              ageRange: "All Ages",
                            });
                            showToast(`Added additional copy of "${selectedProduct.name}" to cart`, "success");
                          }}
                          className="py-3 px-4 rounded-xl bg-white/80 hover:bg-[#1C3B34] hover:text-white border border-[#CCD6C6] text-[#172217] font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          title="Add supplemental/gift copy"
                        >
                          <ShoppingBag size={14} />
                          <span>+ Extra Copy</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5">
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
                              priceNGN: selectedProduct.priceNGN || Math.round(selectedProduct.price * 1500),
                              imageUrl: selectedProduct.imageUrl,
                              bgGradient: selectedProduct.gradient,
                              icon: selectedProduct.icon,
                              iconColor: "text-amber-600",
                              ageRange: "All Ages",
                            });
                            showToast(`"${selectedProduct.name}" added to cart`, "success");
                          }}
                          className="p-3 rounded-xl bg-[#1C3B34] hover:bg-[#152e29] text-white border border-[#1C3B34] transition-all cursor-pointer shadow-sm flex items-center gap-2 text-xs font-mono font-bold"
                          title="Add to cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span className="hidden sm:inline">Add to Cart</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column (7 cols): Full & Prominent Image Showcase Card with Gallery Switcher */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] min-h-[260px] sm:min-h-[320px] w-full rounded-[1.75rem] overflow-hidden border border-[#D5DDCF] shadow-lg bg-[#121316] group">
                    {(showcaseImage || selectedProduct.imageUrl) ? (
                      <Image
                        src={showcaseImage || selectedProduct.imageUrl || ""}
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
                      {showcaseOwned ? (
                        <div className="flex items-center gap-1.5 bg-emerald-950/80 backdrop-blur-md border border-emerald-400/50 text-emerald-300 rounded-full px-3.5 py-1.5 text-[11px] font-mono font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Owned</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full px-3.5 py-1.5 text-[11px] font-mono">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Verified Release</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Optional Gallery Thumbnail Switcher Strip on Store Hero */}
                  {selectedProduct.galleryImages && selectedProduct.galleryImages.length > 1 && (
                    <div className="p-2.5 rounded-2xl bg-white/80 border border-[#CCD6C6] space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#1C3B34]">
                        <span className="flex items-center gap-1.5">
                          <Compass className="w-3 h-3 text-[#1C3B34]" />
                          <span>AVAILABLE VIEWS &amp; EDITIONS ({selectedProduct.galleryImages.length})</span>
                        </span>
                        <span className="text-[9px] text-[#4F6352] uppercase font-normal">CLICK TO PREVIEW</span>
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
                                  ? "border-[#1C3B34] ring-2 ring-[#1C3B34]/30 scale-102"
                                  : "border-transparent opacity-80 hover:opacity-100 hover:border-[#CCD6C6]"
                              }`}
                            >
                              <Image
                                src={img}
                                alt={`${selectedProduct.name} preview ${i + 1}`}
                                fill
                                sizes="80px"
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
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
                  className={`bg-[#E2E8DE] text-[#172217] rounded-[1.75rem] border shadow-xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1 ${
                    isSelected ? "ring-3 ring-[#1C3B34] border-[#1C3B34]" : "border-[#D5DDCF] hover:border-[#1C3B34]"
                  }`}
                >
                  <div className="space-y-4">
                    {/* BALANCED REASONABLE HEIGHT COVER IMAGE THUMBNAIL */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/10] h-52 sm:h-56 w-full rounded-[1.5rem] overflow-hidden border border-[#D5DDCF] shadow-md bg-[#121316] group">
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
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-mono font-extrabold text-amber-300 block leading-tight">${product.price}</span>
                          <span className="text-[9px] font-mono text-white/70">₦{(product.priceNGN || Math.round(product.price * 1500)).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Bottom Status Pill */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white">
                        {isOwned ? (
                          <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/40 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Owned
                          </span>
                        ) : (
                          <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-amber-300" /> Digital
                          </span>
                        )}

                        {qtyInCart > 0 ? (
                          <span className="bg-[#1C3B34] text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-white/30 flex items-center gap-1 font-bold">
                            <ShoppingBag className="w-3 h-3 text-amber-300" /> {qtyInCart} in cart
                          </span>
                        ) : product.galleryImages && product.galleryImages.length > 1 ? (
                          <span className="bg-[#1C3B34] text-amber-300 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/30 flex items-center gap-1 font-bold text-[9px]">
                            <Compass className="w-3 h-3 text-amber-300" /> {product.galleryImages.length} Views
                          </span>
                        ) : (
                          <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified
                          </span>
                        )}
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

                  {/* Bottom Price, Rating & High-Modern Reactive Actions */}
                  <div className="pt-4 mt-4 border-t border-[#D0D9CA] space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-[#4E5B4B] font-bold block">INVESTMENT</span>
                        <span className="text-xl font-mono font-extrabold text-[#172217]">
                          ${product.price} <span className="text-[10px] text-[#4E5B4B] font-normal">USD</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#4E5B4B] block">
                          ₦{(product.priceNGN || Math.round(product.price * 1500)).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 border border-[#CCD6C6] text-[10px] font-mono font-bold text-[#172217]">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{product.rating}</span>
                        <span className="text-[#4E5B4B]">({product.reviews})</span>
                      </div>
                    </div>

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
                              {qtyInCart === 1 ? <Trash2 size={13} className="text-red-600" /> : <Minus size={13} />}
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
                          View Details &amp; Reader Preview →
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
                          <span>OWNED · ACCESS →</span>
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
                              priceNGN: product.priceNGN || Math.round(product.price * 1500),
                              imageUrl: product.imageUrl,
                              bgGradient: product.gradient,
                              icon: product.icon,
                              iconColor: "text-amber-600",
                              ageRange: "All Ages",
                            });
                            showToast(`Added additional copy of "${product.name}" to cart`, "success");
                          }}
                          className="p-2.5 rounded-xl bg-white/80 hover:bg-[#1C3B34] hover:text-white border border-[#CCD6C6] text-[#172217] transition-all cursor-pointer"
                          title="Add supplemental/gift copy"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
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
                              priceNGN: product.priceNGN || Math.round(product.price * 1500),
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
                    )}
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
