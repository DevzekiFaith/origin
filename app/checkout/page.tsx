"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { CreditCard, Gift, CheckCircle, MessageCircle, ExternalLink, BookOpen } from "lucide-react";
import { courses, getCourseById } from "../data/courses";
import { supabase } from "../../lib/supabase";
import { CURRENCY_CONFIG } from "../../lib/config";
import CheckoutAddons from "../components/CheckoutAddons";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get("course");
  const course = courseId ? getCourseById(courseId) : null;
  const { cart, clearCart, cartTotal, cartTotalNGN } = useCart();
  const { showToast } = useToast();

  const { currentUser, login, register, logout, updateUserPreferences, getOwnedCourses } = useUser();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "NGN" | "EUR" | "GBP">("USD");
  const [isConfirming, setIsConfirming] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successRedirectUrl, setSuccessRedirectUrl] = useState("/purchases");

  // Redirect if no course selected and cart is empty
  useEffect(() => {
    if (!course && cart.length === 0) {
      router.push("/courses");
    }
  }, [course, cart.length, router]);

  // Use cart items if available, otherwise use single course
  const itemsToCheckout = cart.length > 0 ? cart : (course ? [course] : []);
  const priceUSD = parseFloat((cart.length > 0 ? cartTotal : (course?.priceUSD || 14)).toFixed(2));
  const priceNGN = parseFloat((cart.length > 0 ? cartTotal * CURRENCY_CONFIG.NGN_TO_USD_RATE : priceUSD * CURRENCY_CONFIG.NGN_TO_USD_RATE).toFixed(2));
  const priceEUR = parseFloat((cart.length > 0 ? cartTotal * CURRENCY_CONFIG.EUR_TO_USD_RATE : priceUSD * CURRENCY_CONFIG.EUR_TO_USD_RATE).toFixed(2));
  const priceGBP = parseFloat((cart.length > 0 ? cartTotal * CURRENCY_CONFIG.GBP_TO_USD_RATE : priceUSD * CURRENCY_CONFIG.GBP_TO_USD_RATE).toFixed(2));

  const displayPrice = currency === "NGN"
    ? `₦${priceNGN.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : currency === "EUR"
    ? `€${priceEUR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : currency === "GBP"
    ? `£${priceGBP.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `$${priceUSD.toFixed(2)}`;

  const flwConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? "",
    tx_ref: `origin-cart-${Date.now()}`,
    amount: currency === "NGN"
      ? priceNGN
      : currency === "EUR"
      ? priceEUR
      : currency === "GBP"
      ? priceGBP
      : priceUSD,
    currency,
    payment_options: currency === "NGN"
      ? "card,banktransfer,ussd,mobilemoney"
      : "card",
    customer: {
      email: currentUser?.email ?? "",
      name: currentUser?.name ?? "",
      phone_number: "",
    },
    customizations: {
      title: "Origin — Formation for Life",
      description: cart.length > 0 ? `${cart.length} course${cart.length > 1 ? 's' : ''} — One-time purchase` : `${course?.title} — One-time purchase`,
      logo: "/origin.png",
    },
    meta: {
      userId: currentUser?.id ?? "",
      cartItems: JSON.stringify(
        course
          ? [{ id: course.id, title: course.title, priceUSD: course.priceUSD || 14, isGift: false }]
          : cart.map(item => ({
              id: item.id,
              title: item.title,
              priceUSD: item.priceUSD || 14,
              isGift: !!item.isGift,
              recipientEmail: item.recipientEmail || "",
              recipientName: item.recipientName || "",
              giftMessage: item.giftMessage || ""
            }))
      )
    },
  };

  const handleFlutterPayment = useFlutterwave(flwConfig);

  const handlePay = async () => {
    if (!currentUser) return;

    handleFlutterPayment({
      callback: async (response) => {
        closePaymentModal();
        if (response.status === "successful" || response.status === "completed") {
          setIsConfirming(true);
          try {
            // Process gift orders
            const giftItems = cart.filter(item => item.isGift);
            if (giftItems.length > 0) {
              const giftPurchases = giftItems.map(item => {
                const basePrice = item.priceUSD || 14;
                const itemAmount = currency === "NGN"
                  ? basePrice * CURRENCY_CONFIG.NGN_TO_USD_RATE
                  : currency === "EUR"
                  ? basePrice * CURRENCY_CONFIG.EUR_TO_USD_RATE
                  : currency === "GBP"
                  ? basePrice * CURRENCY_CONFIG.GBP_TO_USD_RATE
                  : basePrice;
                
                return {
                  purchaser_id: currentUser.id,
                  recipient_email: item.recipientEmail || '',
                  recipient_name: item.recipientName || '',
                  course_id: item.id,
                  amount: parseFloat(itemAmount.toFixed(2)),
                  currency: currency,
                  status: 'completed',
                  gift_message: item.giftMessage || '',
                };
              });
              const { error: giftError } = await supabase.from('gift_orders').insert(giftPurchases);
              if (giftError) {
                console.error('Error inserting gift orders:', giftError);
              }
            }

            // Save purchase(s) to database (non-gifts only for course_purchases)
            if (course) {
              const purchaseData = {
                user_id: currentUser.id,
                course_id: course.id,
                course_title: course.title,
                amount: currency === "NGN"
                  ? priceNGN
                  : currency === "EUR"
                  ? priceEUR
                  : currency === "GBP"
                  ? priceGBP
                  : priceUSD,
                currency: currency,
                payment_method: 'flutterwave',
                transaction_id: response.transaction_id || response.tx_ref,
                status: 'completed',
                purchased_at: new Date().toISOString(),
              };
              const { error: insertError } = await supabase.from('course_purchases').insert(purchaseData);
              if (insertError) {
                console.error('Error inserting purchase:', insertError);
                showToast('Payment successful but failed to record purchase. Please contact support.', 'error');
              }
            } else {
              const nonGiftItems = cart.filter(item => !item.isGift);
              if (nonGiftItems.length > 0) {
                const purchasesToInsert = nonGiftItems.map(item => {
                  const itemAmount = currency === "NGN"
                    ? ((item.priceUSD ?? 14) * CURRENCY_CONFIG.NGN_TO_USD_RATE)
                    : currency === "EUR"
                    ? ((item.priceUSD ?? 14) * CURRENCY_CONFIG.EUR_TO_USD_RATE)
                    : currency === "GBP"
                    ? ((item.priceUSD ?? 14) * CURRENCY_CONFIG.GBP_TO_USD_RATE)
                    : (item.priceUSD ?? 14);
                  return {
                    user_id: currentUser.id,
                    course_id: item.id,
                    course_title: item.title,
                    amount: parseFloat(itemAmount.toFixed(2)),
                    currency: currency,
                    payment_method: 'flutterwave',
                    transaction_id: response.transaction_id || response.tx_ref,
                    status: 'completed',
                    purchased_at: new Date().toISOString(),
                  };
                });
                const { error: insertError } = await supabase.from('course_purchases').insert(purchasesToInsert);
                if (insertError) {
                  console.error('Error inserting cart purchases:', insertError);
                  showToast('Payment successful but failed to record some purchases. Please contact support.', 'error');
                }
              }
            }

            // Add courses to user's purchased courses in profile preferences
            const currentOwned = getOwnedCourses();
            const newOwned = [...currentOwned];
            if (course) {
              if (!newOwned.includes(course.id)) {
                newOwned.push(course.id);
              }
            } else {
              const nonGiftItems = cart.filter(item => !item.isGift);
              for (const item of nonGiftItems) {
                if (!newOwned.includes(item.id)) {
                  newOwned.push(item.id);
                }
              }
            }
            await updateUserPreferences({ ownedCourseIds: newOwned });

            // Trigger receipt and gift emails via serverless API route (run in background, do not block UI)
            try {
              const checkoutItems = course ? [course] : cart;
              const giftItems = cart.filter(item => item.isGift);
              const items = checkoutItems.map(item => ({
                id: item.id,
                title: item.title,
                price: item.priceUSD || 14
              }));
              const gifts = giftItems.map(item => ({
                recipientEmail: item.recipientEmail,
                recipientName: item.recipientName,
                giftMessage: item.giftMessage,
                courseTitle: item.title
              }));

              const payerEmail = currentUser?.email || (response as any)?.customer?.email || (typeof window !== "undefined" ? localStorage.getItem("user_email") || "" : "");
              const payerName = currentUser?.name || (response as any)?.customer?.name || "Customer";

              supabase.auth.getSession().then(({ data: { session } }) => {
                fetch('/api/email/receipt', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {})
                  },
                  body: JSON.stringify({
                    transactionId: String(response.transaction_id || response.tx_ref || `free-${Date.now()}`),
                    email: payerEmail,
                    name: payerName,
                    items,
                    total: currency === "NGN" ? priceNGN : currency === "EUR" ? priceEUR : currency === "GBP" ? priceGBP : priceUSD,
                    currency,
                    gifts: gifts.length > 0 ? gifts : undefined
                  })
                }).catch(err => console.error('[Checkout] Email API fetch failed:', err));
              });
            } catch (emailErr) {
              console.error('[Checkout] Failed to prepare checkout emails:', emailErr);
            }

            const hasStoreItems = cart.some(item => item.id.startsWith("store-"));
            const storeItems = cart.filter(item => item.id.startsWith("store-"));

            // Clear cart after successful payment and DB recording
            if (cart.length > 0) {
              clearCart();
            }
            showToast("Payment successful!", "success");

            // Set success redirect URL and show success community modal
            let redirectUrl = "/purchases";
            if (course) {
              redirectUrl = `/courses/${course.id}?purchased=true`;
            } else if (hasStoreItems) {
              if (storeItems.length === 1) {
                const prodId = storeItems[0].id.replace("store-", "");
                redirectUrl = `/store/${prodId}?purchased=true`;
              }
            } else {
              redirectUrl = "/courses?purchase_history=true";
            }
            setSuccessRedirectUrl(redirectUrl);
            setShowSuccessModal(true);
          } catch (dbError) {
            console.error('Error handling post-payment logic:', dbError);
            showToast('Payment successful but failed to record purchase. Please contact support.', 'error');
            setIsConfirming(false);
          }
        }
      },
      onClose: () => {
        // User dismissed modal — no action needed
      },
    });
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsAuthLoading(true);
    try {
      if (isSignUp) {
        if (formData.password.length < 6) {
          const msg = "Password must be at least 6 characters";
          setError(msg);
          showToast(msg, "error");
          return;
        }
        const ok = await register(formData.name, formData.email, formData.password);
        if (!ok) {
          const msg = "An account with this email already exists. Please switch to Sign In.";
          setError(msg);
          showToast(msg, "error");
          return;
        }
        showToast("Account created successfully! Continuing with checkout...", "success");
      } else {
        const ok = await login(formData.email, formData.password);
        if (!ok) {
          const msg = "Invalid email or password. Please verify your credentials.";
          setError(msg);
          showToast(msg, "error");
          return;
        }
        showToast("Signed in successfully! Continuing with checkout...", "success");
      }
    } catch (err: any) {
      console.error("[Checkout Auth Error]:", err);
      const rawMsg = err?.message || "";
      let errorMsg = "Authentication failed. Please try again.";

      if (
        rawMsg.toLowerCase().includes("already registered") ||
        rawMsg.toLowerCase().includes("already exists") ||
        rawMsg.toLowerCase().includes("user_already_exists")
      ) {
        errorMsg = "An account with this email already exists. Please switch to Sign In below.";
      } else if (
        rawMsg.toLowerCase().includes("invalid login credentials") ||
        rawMsg.toLowerCase().includes("invalid_grant") ||
        rawMsg.toLowerCase().includes("invalid credentials")
      ) {
        errorMsg = "Invalid email or password. Please check your credentials.";
      } else if (rawMsg.toLowerCase().includes("email not confirmed")) {
        errorMsg = "Email confirmation required. Please check your inbox or sign in.";
      } else if (rawMsg) {
        errorMsg = rawMsg.replace(/^Registration failed:\s*/i, "");
      }

      setError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1724] flex flex-col font-sans text-white selection:bg-[#60a5fa]/30 selection:text-white relative">
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0e1624] border border-white/10 rounded-3xl p-6 md:p-8 max-w-lg w-full text-center relative overflow-hidden shadow-2xl">
            {/* Ambient background light glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#60a5fa]/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Success Checkmark Circle */}
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
              Order Completed Successfully! 🎉
            </h2>
            <p className="text-sm text-zinc-400 mb-6 font-light leading-relaxed">
              Your enrollment has been successfully recorded in your profile. You can now access all course assets and PDF downloads instantly.
            </p>

            {/* WhatsApp Community Invite Card */}
            <div className="relative bg-gradient-to-br from-[#0c1e18] to-[#091a13] border border-emerald-500/20 rounded-2xl p-5 mb-8 text-left shadow-xl shadow-emerald-950/20 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-500/15 border border-emerald-500/30 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Join the Origin Community Group</h3>
                  <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider">Founding Member Invite</span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 mb-4 font-light leading-relaxed">
                Connect with mentors, receive real-time cohort updates, participate in community meetups, and get support directly inside the private WhatsApp group.
              </p>

              <a
                href="https://wa.me/2349119059859?text=Hello!%20I%20just%20completed%20my%20purchase%20on%20Origin%20and%20would%20like%20to%20verify%20my%20details%20to%20join%20the%20community%20group."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-xs shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                Request WhatsApp Verification & Join
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </a>
            </div>

            {/* Redirect Action Button */}
            <button
              onClick={() => {
                setShowSuccessModal(false);
                router.push(successRedirectUrl);
              }}
              className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-200 border border-white/10"
            >
              Continue to My Purchases
            </button>
          </div>
        </div>
      )}
      {isConfirming && (
        <div className="absolute inset-0 bg-[#0f1724]/90 backdrop-blur-md flex flex-col items-center justify-center z-50 transition-all duration-300">
          <div className="flex flex-col items-center gap-6 max-w-sm text-center px-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-zinc-800 border-t-[#60a5fa] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#60a5fa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white tracking-tight">Confirming Your Purchase</h3>
              <p className="text-sm text-[#9aa4b2] leading-relaxed">
                We are securing your transaction, enrolling you in your profile, and generating your download links. This will only take a moment...
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Simple Header */}
      <div className="h-16 shrink-0 bg-[#0b1220] flex items-center justify-between px-4 sm:px-6 z-30 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="hover:bg-[#0f1724] transition-colors flex items-center gap-2 px-3 py-1.5 rounded-full text-[#9aa4b2] hover:text-white group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-bold">Back</span>
          </button>
          <div className="h-6 w-px bg-[#282828]"></div>
          <div className="font-bold text-lg text-white">Secure Checkout</div>
        </div>
        <Link href="/" className="text-xs font-black text-[#b3b3b3] hover:text-white uppercase tracking-tighter">
          Origin
        </Link>
      </div>

      <main className="grow container mx-auto px-4 py-10 sm:py-16 max-w-4xl relative">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 sm:gap-12">

          {/* ── Order Summary ── */}
          <div className="w-full md:w-1/3 order-2 md:order-1">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            <div className={`rounded-xl p-6 sm:p-8 shadow-xl bg-[#0b1220] border border-white/5 text-white relative`}>
              {cart.length > 0 ? (
                <div className="mb-5 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start">
                      {item.imageUrl ? (
                        <div className="relative w-10 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-zinc-950">
                          <Image src={item.imageUrl} alt={item.title} fill sizes="40px" className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-14 rounded-lg bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20 flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          {item.isGift && <Gift className="w-3.5 h-3.5 text-[#60a5fa]" />}
                          <h3 className="text-xs sm:text-sm font-bold truncate text-white leading-snug">{item.title}</h3>
                        </div>
                        {item.isGift && (
                          <p className="text-[11px] text-[#9aa4b2] mb-0.5 truncate">
                            Gift to: {item.recipientEmail}
                          </p>
                        )}
                        <p className="text-[11px] sm:text-xs text-[#9aa4b2] line-clamp-2 leading-relaxed">{item.description}</p>
                      </div>
                      <span className="text-sm font-bold text-[#D4AF37] shrink-0">${Number(item.priceUSD).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ) : course ? (
                <div className="mb-5 flex gap-3 items-start">
                  {course.imageUrl ? (
                    <div className="relative w-12 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-zinc-950">
                      <Image src={course.imageUrl} alt={course.title} fill sizes="48px" className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-16 rounded-lg bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white mb-1 leading-snug">{course.title}</h3>
                    <p className="text-[11px] sm:text-xs text-[#b3b3b3] line-clamp-3 leading-relaxed">{course.description}</p>
                  </div>
                  <span className="text-sm font-bold text-[#D4AF37] shrink-0">${Number(course.priceUSD || 14).toFixed(2)}</span>
                </div>
              ) : null}

              {/* Currency switcher */}
              <div className="flex flex-wrap gap-2 mb-5">
                {(["USD", "NGN", "EUR", "GBP"] as const).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className={`flex-1 min-w-[70px] py-2 rounded-full text-sm font-bold transition-all ${
                      currency === cur
                        ? "bg-[#60a5fa] text-black"
                        : "bg-[#0f1724] text-[#9aa4b2] hover:bg-[#0e1624]"
                    }`}
                  >
                    {cur === "USD" ? "$ USD" : cur === "NGN" ? "₦ NGN" : cur === "EUR" ? "€ EUR" : "£ GBP"}
                  </button>
                ))}
              </div>

              <div className={`py-5 border-y border-[#282828] mb-5 flex justify-between items-center`}>
                <span className="font-semibold">One-time purchase</span>
                <span className="font-black text-2xl">{displayPrice}</span>
              </div>

              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">Due Today</span>
                <span className="font-black text-2xl text-[#60a5fa]">{displayPrice}</span>
              </div>
              <p className={`text-xs text-right text-[#a7a7a7]`}>
                Lifetime access to this course.
              </p>

              {/* Compact add-ons upsell */}
              <CheckoutAddons
                cartItemIds={cart.map((i) => i.id)}
                variant="compact"
              />
            </div>

            {/* Payment methods note */}
            <div className="mt-4 p-4 bg-[#0b1220] rounded-xl border border-white/5 shadow-sm">
              <p className="text-xs font-bold text-[#9aa4b2] uppercase tracking-wider mb-2">Accepted Payments</p>
              <div className="flex flex-wrap gap-2 text-xs text-[#a7a7a7]">
                <span className="px-2 py-1 bg-[#0f1724] rounded-md flex items-center gap-1">
                  <CreditCard size={12} /> Card
                </span>
                {currency === "NGN" && (
                  <>
                    <span className="px-2 py-1 bg-[#282828] rounded-md">🏦 Bank Transfer</span>
                    <span className="px-2 py-1 bg-[#282828] rounded-md">📱 USSD</span>
                    <span className="px-2 py-1 bg-[#282828] rounded-md">📲 Mobile Money</span>
                  </>
                )}
              </div>
              <p className="text-[10px] text-[#6b7280] mt-2">Secured by Flutterwave</p>
            </div>
          </div>

          {/* ── Checkout Form ── */}
          <div className="w-full md:w-2/3 order-1 md:order-2">
            <h1 className="text-4xl font-black text-white mb-8 tracking-tight">Checkout</h1>

            {/* Auth block */}
            {currentUser ? (
              <div className="bg-[#0b1220] rounded-xl p-6 sm:p-8 shadow-md border border-white/5 mb-6">
                <h2 className="text-xl font-bold text-white mb-2">Account</h2>
                <p className="text-[#9aa4b2] mb-3">
                  Signed in as <span className="font-bold text-white">{currentUser.name}</span>
                  <span className="text-[#a7a7a7]"> ({currentUser.email})</span>
                </p>
                <button onClick={logout} className="text-sm text-[#60a5fa] hover:text-white underline">
                  Not you? Sign out
                </button>
              </div>
            ) : (
              <div className="bg-[#0b1220] rounded-xl p-6 sm:p-8 shadow-md border border-white/5 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  {isSignUp ? "Create an Account" : "Sign In to Continue"}
                </h2>
                {error && (
                  <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 text-red-400 text-sm rounded-md flex items-center justify-between gap-2 flex-wrap">
                    <span>{error}</span>
                    {isSignUp && error.includes("already exists") && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsSignUp(false);
                          setError("");
                        }}
                        className="text-xs text-[#60a5fa] hover:text-white underline font-bold"
                      >
                        Switch to Sign In →
                      </button>
                    )}
                  </div>
                )}
                <form className="space-y-4" onSubmit={handleAuthSubmit}>
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0f1724] rounded-md border border-white/5 focus:border-[#60a5fa] outline-none transition-all text-white"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f1724] rounded-md border border-white/5 focus:border-[#60a5fa] outline-none transition-all text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Password</label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={isSignUp ? "Min. 6 characters" : "Enter your password"}
                        className="w-full px-4 py-3 bg-[#0f1724] rounded-md border border-white/5 focus:border-[#60a5fa] outline-none transition-all text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full py-3 px-6 bg-white hover:scale-105 text-black font-bold rounded-full transition-transform disabled:opacity-50"
                  >
                    {isAuthLoading ? "Please wait..." : isSignUp ? "Create Account & Continue" : "Sign In & Continue"}
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
                    className="text-sm text-[#b3b3b3] hover:text-white font-medium transition-colors"
                  >
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Create one"}
                  </button>
                </div>
              </div>
            )}

            {/* Pay button */}
            <button
              disabled={!currentUser}
              onClick={handlePay}
              className="w-full py-4 px-6 bg-[#60a5fa] hover:scale-[1.02] text-black font-bold text-lg rounded-full shadow-lg shadow-[#60a5fa]/15 transition-transform flex justify-center items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {`Pay ${displayPrice} via Flutterwave`}
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>

            {!currentUser && (
              <p className="text-center text-sm text-red-500 mt-2 font-medium">
                Please sign in or create an account to complete your purchase.
              </p>
            )}

            <p className="text-center text-xs text-[#a7a7a7] mt-4 flex items-center justify-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              256-bit SSL encryption · Secured by Flutterwave
            </p>

            {/* WhatsApp Community Invitation Card */}
            <div className="mt-6 relative bg-gradient-to-br from-[#0c1e18] to-[#091a13] border border-emerald-500/20 rounded-2xl p-6 shadow-lg max-w-md mx-auto">
              <span className="absolute top-3.5 right-3.5 px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase rounded-full tracking-wider">
                Founder Invite
              </span>

              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-9 h-9 bg-emerald-500/15 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Join via WhatsApp</h3>
                  <span className="text-[10px] text-zinc-400 block -mt-0.5">Direct community access</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 mb-4 leading-relaxed font-light">
                Get instant access to the free PDF, course updates, live cohort alerts, and community drops — all on WhatsApp. Fastest way to stay connected.
              </p>

              <ul className="space-y-1.5 mb-4 text-xs text-zinc-300">
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Free 7-Day Micro-Sprint PDF (instant)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Exclusive founding member deals
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Live cohort & event alerts
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Direct community access
                </li>
              </ul>

              <a
                href="https://wa.me/2349119059859?text=Hello!%20I%20just%20completed%20my%20purchase%20on%20Origin%20and%20would%20like%20to%20verify%20my%20details%20to%20join%20the%20community%20group."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-xs shadow-lg shadow-emerald-500/10 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                Join on WhatsApp — Get Free PDF
              </a>

              <p className="text-[10px] text-zinc-500 text-center w-full mt-2.5 -mb-0.5">
                Opens WhatsApp with verification message to admin · No spam, ever
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link href="/#courses" className="text-sm text-[#9aa4b2] hover:text-white transition-colors">
                ← View all plans
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#60a5fa]" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
