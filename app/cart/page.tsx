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
      <div className="min-h-screen bg-[#FAFAF8] text-[#121316] font-sans antialiased">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20">
          <div className="max-w-xl mx-auto text-center bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 border border-[#E8E8E3] shadow-sm space-y-6">
            <div className="w-20 h-20 bg-[#F3F3EE] border border-[#E2E2DC] rounded-full flex items-center justify-center mx-auto text-amber-700">
              <ShoppingBag size={36} />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#121316]">Your Cart is Empty</h1>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Add a foundational thinking course or reading companion to begin your learning journey.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/courses/economic-principles"
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 text-zinc-950 font-bold font-mono text-xs rounded-xl hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>ECONOMIC PRINCIPLES (₦15,000)</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/#origin-curriculum"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#F3F3EE] text-[#121316] font-bold font-mono text-xs rounded-xl border border-[#E2E2DC] hover:bg-[#E8E8E3] transition-colors"
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
    <div className="min-h-screen bg-[#FAFAF8] text-[#121316] font-sans antialiased">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        {/* Cart Header with Clear Cart */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E8E8E3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-700 uppercase font-bold tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>REVIEW SELECTIONS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#121316]">
              Shopping Cart ({cartCount})
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                clearCart();
                showToast("Cart cleared", "info");
              }}
              className="text-xs font-mono text-[#71717A] hover:text-red-600 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#E8E8E3] hover:border-red-300 shadow-2xs cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Clear Cart</span>
            </button>
            <Link
              href="/#origin-curriculum"
              className="text-xs font-mono text-[#52525B] hover:text-[#121316] flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              <span>Continue Browsing</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items + Add-ons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 bg-[#FFFFFF] rounded-3xl border border-[#E8E8E3] shadow-xs flex flex-col sm:flex-row items-start gap-4 justify-between group hover:border-[#D4D4CE] transition-all"
                >
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E3] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="80px" />
                      ) : (
                        <BookOpen className="text-amber-700 w-8 h-8" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <h3 className="font-extrabold text-[#121316] text-base leading-snug truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#52525B] line-clamp-2 leading-relaxed font-light">
                        {item.description}
                      </p>
                      <div className="flex items-baseline gap-2 pt-1 font-mono">
                        <span className="text-base font-bold text-amber-700">${item.priceUSD} USD</span>
                        <span className="text-xs text-[#71717A]">/ ₦{((item.priceUSD || 0) * 1500).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      showToast("Removed from cart", "info");
                    }}
                    className="p-2 rounded-lg text-[#A1A1AA] hover:text-red-600 hover:bg-red-50 transition-colors self-end sm:self-start cursor-pointer"
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

          {/* Right Column: Order Summary (Sticky) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E2DC] p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-6">
              <div className="border-b border-[#F0F0EB] pb-4">
                <div className="text-xs font-mono text-[#71717A] uppercase font-bold tracking-wider mb-1">
                  ORDER SUMMARY
                </div>
                <h2 className="text-2xl font-extrabold text-[#121316]">
                  Investment Breakdown
                </h2>
              </div>

              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex justify-between text-[#52525B]">
                  <span>Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})</span>
                  <span className="font-bold text-[#121316]">${cartTotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-[#52525B]">
                  <span>Nigerian Naira Equivalent</span>
                  <span className="font-bold text-[#121316]">₦{cartTotalNGN.toLocaleString()}</span>
                </div>
                <div className="border-t border-[#F0F0EB] pt-3 flex justify-between items-baseline">
                  <span className="text-base font-bold text-[#121316]">Total Due</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-amber-700 block">${cartTotal.toFixed(2)} USD</span>
                    <span className="text-xs text-[#71717A] font-mono">or ₦{cartTotalNGN.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full py-4 bg-[#121316] text-[#FFFFFF] font-bold text-xs sm:text-sm font-mono tracking-wider rounded-xl hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight size={16} />
              </motion.button>

              <div className="space-y-2 pt-4 border-t border-[#F0F0EB] text-[11px] text-[#71717A] font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Encrypted payment via Flutterwave / Cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
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
