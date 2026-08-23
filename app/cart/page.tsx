"use client";

import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag, ArrowRight, BookOpen, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CheckoutAddons from "../components/CheckoutAddons";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, cartTotal, cartTotalNGN, cartCount } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty", "warning");
      return;
    }
    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#8A948B] text-white font-sans antialiased relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
        {/* Dynamic Animated Ambient Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-white/15 blur-[180px] rounded-full"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 relative z-10">
          <div className="max-w-xl mx-auto text-center bg-[#E2E8DE] text-[#172217] rounded-3xl p-6 sm:p-12 border border-[#D5DDCF] shadow-2xl space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/80 border border-[#CCD6C6] rounded-full flex items-center justify-center mx-auto text-[#1C3B34] shadow-xs">
              <ShoppingBag size={32} />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-tight text-[#172217]">Your Cart is Empty</h1>
              <p className="text-xs sm:text-sm text-[#4E5B4B] leading-relaxed font-light">
                Add a foundational thinking course or reading companion to begin your learning journey.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/courses/economic-principles"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#8A948B] text-white font-bold font-mono text-xs rounded-xl hover:bg-[#1C3B34] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>ECONOMIC PRINCIPLES (₦15,000)</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/#origin-curriculum"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/80 text-[#172217] font-bold font-mono text-xs rounded-xl border border-[#CCD6C6] hover:bg-[#1C3B34] hover:text-white transition-all text-center"
              >
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#8A948B] text-white font-sans antialiased relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
      {/* Dynamic Animated Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-white/15 blur-[180px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-36 pb-24 relative z-10">
        {/* Cart Header with Clear Cart */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-white/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>REVIEW SELECTIONS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold tracking-tight text-white">
              Shopping Cart ({cartCount})
            </h1>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                clearCart();
                showToast("Cart cleared", "info");
              }}
              className="text-xs font-mono text-white/90 hover:text-red-300 transition-colors flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 hover:border-red-400/40 shadow-xs cursor-pointer min-h-[40px]"
            >
              <Trash2 size={14} />
              <span>Clear Cart</span>
            </button>
            <Link
              href="/#origin-curriculum"
              className="text-xs font-mono text-white/80 hover:text-white flex items-center gap-1 px-2 py-2 min-h-[40px]"
            >
              <ArrowLeft size={14} />
              <span>Continue Browsing</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Cart Items + Add-ons */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-6 bg-[#E2E8DE] text-[#172217] rounded-2xl sm:rounded-3xl border border-[#D5DDCF] shadow-xl flex items-start gap-3 sm:gap-4 justify-between group hover:border-[#1C3B34] transition-all"
                >
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-white/80 border border-[#CCD6C6] flex items-center justify-center shrink-0 relative overflow-hidden">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 56px, 80px" />
                    ) : (
                      <BookOpen className="text-[#1C3B34] w-6 h-6 sm:w-8 sm:h-8" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-[#172217] text-sm sm:text-base leading-snug truncate">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          showToast("Removed from cart", "info");
                        }}
                        className="sm:hidden p-1.5 rounded-lg text-[#4E5B4B] hover:text-red-600 hover:bg-red-500/10 transition-colors shrink-0 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-[#4E5B4B] line-clamp-1 sm:line-clamp-2 leading-relaxed font-light">
                      {item.description}
                    </p>
                    <div className="flex items-baseline gap-2 pt-0.5 font-mono">
                      <span className="text-sm sm:text-base font-extrabold text-[#1C3B34]">${item.priceUSD} USD</span>
                      <span className="text-[11px] sm:text-xs text-[#4E5B4B]">/ ₦{((item.priceUSD || 0) * 1500).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      showToast("Removed from cart", "info");
                    }}
                    className="hidden sm:flex p-2 rounded-lg text-[#4E5B4B] hover:text-red-600 hover:bg-red-500/10 transition-colors self-start cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add-on recommendations */}
            <div className="pt-2">
              <CheckoutAddons
                cartItemIds={cart.map((i) => i.id)}
                variant="full"
              />
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#E2E8DE] text-[#172217] rounded-2xl sm:rounded-3xl border border-[#D5DDCF] p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6">
              <div className="border-b border-[#D0D9CA] pb-4">
                <div className="text-[11px] sm:text-xs font-mono text-[#1C3B34] uppercase font-bold tracking-wider mb-1">
                  ORDER SUMMARY
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#172217]">
                  Investment Breakdown
                </h2>
              </div>

              <div className="space-y-2.5 sm:space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex justify-between text-[#4E5B4B]">
                  <span>Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})</span>
                  <span className="font-bold text-[#172217]">${cartTotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-[#4E5B4B]">
                  <span>Nigerian Naira Equivalent</span>
                  <span className="font-bold text-[#172217]">₦{cartTotalNGN.toLocaleString()}</span>
                </div>
                <div className="border-t border-[#D0D9CA] pt-3 flex justify-between items-baseline">
                  <span className="text-sm sm:text-base font-bold text-[#172217]">Total Due</span>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#1C3B34] block">${cartTotal.toFixed(2)} USD</span>
                    <span className="text-[11px] sm:text-xs text-[#4E5B4B] font-mono">or ₦{cartTotalNGN.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full py-4 bg-[#8A948B] hover:bg-[#1C3B34] text-white font-bold text-xs sm:text-sm font-mono tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer min-h-[48px]"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight size={16} />
              </motion.button>

              <div className="space-y-2 pt-4 border-t border-[#D0D9CA] text-[11px] text-[#4E5B4B] font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1C3B34] shrink-0" />
                  <span>Encrypted payment via Flutterwave / Cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#1C3B34] shrink-0" />
                  <span>Instant access to dashboard & course materials</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
