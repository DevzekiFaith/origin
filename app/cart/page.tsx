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
      <div className="min-h-screen bg-[#090a0d] text-white font-sans antialiased">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20">
          <div className="max-w-xl mx-auto text-center bg-[#121318] rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-zinc-800 shadow-2xl space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto text-amber-400">
              <ShoppingBag size={32} />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">Your Cart is Empty</h1>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                Add a foundational thinking course or reading companion to begin your learning journey.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/courses/economic-principles"
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 text-zinc-950 font-bold font-mono text-xs rounded-xl hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
              >
                <span>ECONOMIC PRINCIPLES (₦15,000)</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/#origin-curriculum"
                className="w-full sm:w-auto px-6 py-3.5 bg-zinc-900 text-zinc-200 font-bold font-mono text-xs rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-colors text-center"
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
    <div className="min-h-screen bg-[#090a0d] text-white font-sans antialiased">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-36 pb-24">
        {/* Cart Header with Clear Cart */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-zinc-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>REVIEW SELECTIONS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100">
              Shopping Cart ({cartCount})
            </h1>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                clearCart();
                showToast("Cart cleared", "info");
              }}
              className="text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500/40 shadow-xs cursor-pointer min-h-[40px]"
            >
              <Trash2 size={14} />
              <span>Clear Cart</span>
            </button>
            <Link
              href="/#origin-curriculum"
              className="text-xs font-mono text-zinc-400 hover:text-zinc-200 flex items-center gap-1 px-2 py-2 min-h-[40px]"
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
                  className="p-4 sm:p-6 bg-[#121318] rounded-2xl sm:rounded-3xl border border-zinc-800/90 shadow-lg flex items-start gap-3 sm:gap-4 justify-between group hover:border-zinc-700 transition-all"
                >
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 relative overflow-hidden">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 56px, 80px" />
                    ) : (
                      <BookOpen className="text-amber-400 w-6 h-6 sm:w-8 sm:h-8" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-zinc-100 text-sm sm:text-base leading-snug truncate">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          showToast("Removed from cart", "info");
                        }}
                        className="sm:hidden p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1 sm:line-clamp-2 leading-relaxed font-light">
                      {item.description}
                    </p>
                    <div className="flex items-baseline gap-2 pt-0.5 font-mono">
                      <span className="text-sm sm:text-base font-bold text-amber-400">${item.priceUSD} USD</span>
                      <span className="text-[11px] sm:text-xs text-zinc-500">/ ₦{((item.priceUSD || 0) * 1500).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      showToast("Removed from cart", "info");
                    }}
                    className="hidden sm:flex p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors self-start cursor-pointer"
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

          {/* Right Column: Order Summary (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#121318] rounded-2xl sm:rounded-3xl border border-zinc-800 p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <div className="text-[11px] sm:text-xs font-mono text-amber-400 uppercase font-bold tracking-wider mb-1">
                  ORDER SUMMARY
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                  Investment Breakdown
                </h2>
              </div>

              <div className="space-y-2.5 sm:space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})</span>
                  <span className="font-bold text-zinc-100">${cartTotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Nigerian Naira Equivalent</span>
                  <span className="font-bold text-zinc-100">₦{cartTotalNGN.toLocaleString()}</span>
                </div>
                <div className="border-t border-zinc-800 pt-3 flex justify-between items-baseline">
                  <span className="text-sm sm:text-base font-bold text-zinc-100">Total Due</span>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-extrabold text-amber-400 block">${cartTotal.toFixed(2)} USD</span>
                    <span className="text-[11px] sm:text-xs text-zinc-400 font-mono">or ₦{cartTotalNGN.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full py-4 bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm font-mono tracking-wider rounded-xl hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer min-h-[48px]"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight size={16} />
              </motion.button>

              <div className="space-y-2 pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Encrypted payment via Flutterwave / Cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
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
