"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, ShoppingBag, Sparkles, Star, Tag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";

// The curated add-ons: journal, merch, top ebooks
const ADDONS = [
  {
    id: "store-1",
    storeId: 1,
    title: "Origin Journal",
    description: "90-day planner for your personal growth journey",
    priceUSD: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    bgGradient: "from-blue-500/20 to-blue-900/10",
    icon: "📓",
    badge: "Bestseller",
    badgeColor: "bg-amber-500 text-black",
    category: "journal",
  },
  {
    id: "store-7",
    storeId: 7,
    title: "MONEY FARMING eBook",
    description: "7 principles to plant, grow & harvest sustainable wealth",
    priceUSD: 4.06,
    originalPrice: 10.00,
    imageUrl: "/cover_money_farming.png",
    bgGradient: "from-emerald-500/20 to-emerald-900/10",
    icon: "📗",
    badge: "Best Value",
    badgeColor: "bg-emerald-500 text-black",
    category: "ebook",
  },
  {
    id: "store-8",
    storeId: 8,
    title: "8 Q&A to Selling",
    description: "Blueprint to articulate your worth and command premium pricing",
    priceUSD: 3.00,
    originalPrice: 8.00,
    imageUrl: "/8-qa-to-selling.png",
    bgGradient: "from-purple-500/20 to-purple-900/10",
    icon: "📘",
    badge: "Popular",
    badgeColor: "bg-purple-500 text-white",
    category: "ebook",
  },
  {
    id: "store-9",
    storeId: 9,
    title: "House of Choice",
    description: "88-page decision architecture manuscript by Zeki Faith",
    priceUSD: 4.50,
    originalPrice: 12.00,
    imageUrl: "https://files.selar.co/product-images/2026/products/zeki-faith1/house-of-choice-selar.com-69f0b5db3bbb2.jpg",
    bgGradient: "from-rose-500/20 to-rose-900/10",
    icon: "📕",
    badge: "Top Rated",
    badgeColor: "bg-rose-500 text-white",
    category: "ebook",
  },
  {
    id: "store-13",
    storeId: 13,
    title: "Origin Classic Tee",
    description: "Premium cotton tee — wear your journey",
    priceUSD: 24.99,
    imageUrl: "/origin_tee_mockup.png",
    bgGradient: "from-zinc-500/20 to-zinc-900/10",
    icon: "👕",
    badge: "Identity Wear",
    badgeColor: "bg-zinc-600 text-white",
    category: "merch",
  },
  {
    id: "store-14",
    storeId: 14,
    title: "Origin Ceramic Mug",
    description: "Matte black mug — start your mornings with purpose",
    priceUSD: 14.99,
    imageUrl: "/origin_mug_mockup.png",
    bgGradient: "from-zinc-600/20 to-zinc-900/10",
    icon: "☕",
    badge: "Gift Idea",
    badgeColor: "bg-[#60a5fa] text-black",
    category: "merch",
  },
];

interface CheckoutAddonsProps {
  /** IDs already in cart — used to pre-mark added items */
  cartItemIds?: string[];
  /** compact = for checkout sidebar; full = for cart page */
  variant?: "compact" | "full";
}

export default function CheckoutAddons({ cartItemIds = [], variant = "full" }: CheckoutAddonsProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState<Set<string>>(new Set(cartItemIds));

  const handleAdd = (addon: (typeof ADDONS)[0]) => {
    if (added.has(addon.id)) return;

    addToCart({
      id: addon.id,
      title: addon.title,
      description: addon.description,
      fullDescription: addon.description,
      priceUSD: addon.priceUSD,
      imageUrl: addon.imageUrl,
      bgGradient: addon.bgGradient,
      icon: ShoppingBag as any,
      iconColor: "text-[#60a5fa]",
      ageRange: "All Ages",
    });

    setAdded((prev) => new Set([...prev, addon.id]));
    showToast(`${addon.title} added to cart!`, "success");
  };

  // Filter out items already in cart
  const available = ADDONS.filter((a) => !added.has(a.id));

  if (available.length === 0) return null;

  if (variant === "compact") {
    // Compact vertical list for checkout sidebar
    return (
      <div className="mt-5 border-t border-white/5 pt-5">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-black text-white uppercase tracking-wider">Add to your order</span>
        </div>
        <div className="space-y-2.5">
          {available.slice(0, 4).map((addon) => (
            <div
              key={addon.id}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/8 border border-white/5 hover:border-[#60a5fa]/20 rounded-xl p-2.5 transition-all group"
            >
              <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                {addon.imageUrl ? (
                  <Image src={addon.imageUrl} alt={addon.title} fill className="object-cover" sizes="36px" />
                ) : (
                  <span className="text-xl flex items-center justify-center w-full h-full">{addon.icon}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${addon.badgeColor}`}>
                    {addon.badge}
                  </span>
                </div>
                <p className="text-xs font-bold text-white leading-none truncate">{addon.title}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-black text-[#60a5fa]">${addon.priceUSD}</span>
                  {addon.originalPrice && (
                    <span className="text-[10px] text-zinc-500 font-mono">// ${addon.originalPrice}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleAdd(addon)}
                className="w-7 h-7 bg-[#60a5fa] hover:bg-[#3b82f6] text-black rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-110 shadow-sm shadow-[#60a5fa]/20"
                title={`Add ${addon.title}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <Link
          href="/store"
          className="block text-center text-[10px] text-zinc-500 hover:text-[#60a5fa] transition-colors mt-3 font-semibold"
        >
          Browse full store →
        </Link>
      </div>
    );
  }

  // Full grid layout for cart page
  return (
    <div className="mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500/15 rounded-full flex items-center justify-center">
            <Tag className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-black text-white">Complete Your Journey</h3>
            <p className="text-xs text-white/80 font-medium">Add companion materials to your order</p>
          </div>
        </div>
        <Link
          href="/store"
          className="text-xs text-[#60a5fa] hover:text-white font-bold transition-colors"
        >
          View all →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 min-[440px]:grid-cols-2 sm:grid-cols-3 gap-3">
        {available.map((addon) => {
          const isAdded = added.has(addon.id);
          return (
            <div
              key={addon.id}
              className={`relative bg-[#0b1220] border rounded-2xl overflow-hidden transition-all duration-300 group hover:scale-[1.02] ${
                isAdded
                  ? "border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                  : "border-white/5 hover:border-[#60a5fa]/25 hover:shadow-lg hover:shadow-[#60a5fa]/5"
              }`}
            >
              {/* Badge */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${addon.badgeColor}`}>
                  {addon.badge}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-28 overflow-hidden">
                {addon.imageUrl ? (
                  <Image
                    src={addon.imageUrl}
                    alt={addon.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="200px"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${addon.bgGradient} flex items-center justify-center text-3xl`}>
                    {addon.icon}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-3">
                <h4 className="text-xs font-bold text-white leading-tight mb-1 line-clamp-1">{addon.title}</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-2 mb-2.5">{addon.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black text-[#60a5fa]">${addon.priceUSD}</span>
                    {addon.originalPrice && (
                      <span className="text-[10px] text-zinc-500 font-mono ml-1">// ${addon.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAdd(addon)}
                    disabled={isAdded}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-black transition-all ${
                      isAdded
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                        : "bg-[#60a5fa] hover:bg-[#3b82f6] text-black hover:scale-105 shadow-sm shadow-[#60a5fa]/20"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3 h-3" /> Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" /> Add
                      </>
                    )}
                  </button>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 mt-1.5">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <span className="text-[9px] text-zinc-400">Highly rated by students</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
