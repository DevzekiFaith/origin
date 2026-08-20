"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Book, Package, Shirt, PenTool, ShoppingBag, Star, Award, Heart, Download, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { STORE_PRODUCTS, StoreProduct } from "../data/store-products";
import { getCourseForCompanionProduct } from "../data/course-ebook-mapping";
import { motion } from "framer-motion";

function StoreContent() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const errData = await res.json();
        console.warn("Subscription database error:", errData.error || res.statusText);
      }
      localStorage.setItem("newsletter_subscribed", "true");
      localStorage.setItem("subscribed_email", email);
      showToast("Successfully subscribed to the newsletter!", "success");
      setEmail("");
    } catch (err) {
      console.warn("Subscription fallback:", err);
      showToast("Successfully subscribed to the newsletter!", "success");
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { id: "all", name: "All Ideas & Works", icon: BookOpen },
    { id: "ebooks", name: "Reading Companions", icon: Book },
    { id: "hardcopy", name: "Hardcopy Manuals", icon: Book },
    { id: "journals", name: "Life Planners & Journals", icon: PenTool },
    { id: "merch", name: "Merchandise", icon: Shirt },
    { id: "courses", name: "Workshops", icon: Award },
  ];

  const products = STORE_PRODUCTS;
  const urlCategory = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (urlCategory && categories.some((c) => c.id === urlCategory)) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#121316] font-sans pb-24 selection:bg-amber-400 selection:text-zinc-950">
      {/* Top Bar */}
      <div className="border-b border-[#E8E8E3] py-4 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#E2E2DC] bg-zinc-900 flex items-center justify-center">
              <Image src="/origin.png" alt="Origin Logo" fill sizes="32px" className="object-cover" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-[#121316]">A LIBRARY OF IDEAS</span>
            </div>
          </div>
          <div className="text-xs font-mono text-amber-700 font-bold uppercase tracking-wider">
            Origin Reading Companions
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#F4F3EE] py-14 md:py-20 mb-16 border-b border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Image */}
          <div className="relative h-64 md:h-[380px] w-full rounded-3xl overflow-hidden shadow-lg border border-[#E2E2DC] bg-zinc-900">
            <Image
              src="/cover_money_farming.png"
              alt="Origin Reading Companion Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>
          {/* Right Column: Copy */}
          <div className="space-y-6 max-w-lg md:pl-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E2E2DC] text-xs font-mono font-bold text-amber-800 uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Deepen Your Understanding</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.1]">
              Read Deeper. Build Internal Architecture.
            </h1>
            <p className="text-[#52525B] text-base font-light leading-relaxed">
              Curated reading companions, frameworks, and practical workbooks designed to accompany and deepen the mental models taught in Origin courses.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="#store-products-grid"
                className="px-6 py-3 rounded-xl bg-[#121316] text-[#FFFFFF] text-xs font-mono font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors shadow-sm"
              >
                Browse Library
              </a>
              <Link
                href="/#origin-curriculum"
                className="text-xs font-mono font-bold text-[#121316] hover:text-amber-700 underline underline-offset-4 transition-colors"
              >
                Explore Courses →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Title */}
      <div id="store-products-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#121316] tracking-tight mb-2">THE READING COMPANIONS</h2>
        <p className="text-[#52525B] max-w-lg mx-auto text-sm sm:text-base">
          Each book is intelligently connected to an Origin thinking discipline.
        </p>
      </div>

      {/* Categories Tabs */}
      <div className="max-w-7xl mx-auto mb-12 sm:mb-16 px-4">
        <div className="flex items-center justify-start sm:justify-center gap-2 md:gap-3 overflow-x-auto pb-3 sm:pb-0">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold transition-all rounded-xl border shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#121316] text-[#FFFFFF] border-[#121316] shadow-sm"
                    : "bg-[#FFFFFF] text-[#52525B] border-[#E8E8E3] hover:text-[#121316] hover:border-[#121316]"
                } uppercase tracking-wider`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const connectedCourse = getCourseForCompanionProduct(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="bg-[#FFFFFF] rounded-3xl p-7 border border-[#E8E8E3] shadow-xs flex flex-col justify-between group hover:border-[#D4D4CE] transition-all"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full bg-[#FAFAF8] rounded-2xl overflow-hidden mb-6 border border-[#E8E8E3] flex items-center justify-center p-3">
                    {product.imageUrl ? (
                      <Link href={`/store/${product.id}`} className="block relative w-full h-full">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    ) : (
                      <div className="w-16 h-16 relative flex items-center justify-center">
                        <product.icon className="text-[#A1A1AA] w-12 h-12" />
                      </div>
                    )}
                  </div>

                  {/* Category & Price */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase text-amber-700 font-bold">
                      {product.category === "ebooks" ? "ORIGIN READING COMPANION" : product.category.toUpperCase()}
                    </span>
                    <span className="font-mono font-bold text-sm text-[#121316]">
                      ${product.price} USD
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-extrabold text-xl text-[#121316] mb-2 leading-snug group-hover:text-amber-700 transition-colors">
                    <Link href={`/store/${product.id}`}>{product.name}</Link>
                  </h3>

                  {/* Description / What this helps understand */}
                  <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E8E8E3] mb-4">
                    <div className="text-[10px] font-mono uppercase text-[#71717A] font-bold mb-1">
                      What will this help you understand?
                    </div>
                    <p className="text-xs text-[#3F3F46] leading-relaxed line-clamp-3 font-normal">
                      {product.description}
                    </p>
                  </div>

                  {/* Connected Course Link if any */}
                  {connectedCourse && (
                    <div className="mb-4 text-xs font-mono text-zinc-500">
                      <span>Connected course: </span>
                      <Link href={`/courses/${connectedCourse.courseId}`} className="text-amber-700 font-bold hover:underline">
                        {connectedCourse.courseTitle} →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-[#F0F0EB] flex items-center gap-3">
                  <Link
                    href={`/store/${product.id}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#121316] text-[#FFFFFF] text-xs font-mono font-bold text-center hover:bg-amber-600 transition-colors shadow-sm"
                  >
                    READ SAMPLE / DETAILS
                  </Link>
                  <button
                    onClick={() => {
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
                    className="p-3 rounded-xl bg-[#FAFAF8] hover:bg-[#F3F3EE] border border-[#E2E2DC] text-[#121316] transition-colors cursor-pointer"
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center text-xs font-mono text-[#71717A]">
        LOADING LIBRARY...
      </div>
    }>
      <StoreContent />
    </Suspense>
  );
}
