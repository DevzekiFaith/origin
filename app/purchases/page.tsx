"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";
import { supabase } from "../../lib/supabase";
import { Download, Calendar, DollarSign, FileText, Trash2, RotateCcw, Clock, AlertTriangle, ShieldCheck, ShoppingBag, ArrowRight, Package, CheckCircle2, Sparkles } from "lucide-react";
import { getCourseById } from "../data/courses";
import { getProductById } from "../data/store-products";
import CheckoutAddons from "../components/CheckoutAddons";

interface Purchase {
  id: string;
  course_id: string;
  course_title: string;
  amount: number;
  currency: string;
  payment_method: string;
  transaction_id: string;
  status: string;
  purchased_at: string;
}

interface TrashedPurchase extends Purchase {
  deleted_at: string;
}

const TRASH_RETENTION_DAYS = 30;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default function PurchaseHistoryPage() {
  const { currentUser, getOwnedCourses, updateUserPreferences } = useUser();
  const { showToast } = useToast();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [trashedPurchases, setTrashedPurchases] = useState<TrashedPurchase[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "trash">("active");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchPurchasesAndTrash = async () => {
      let fetchedList: Purchase[] = [];

      // 1. Fetch DB purchases from Supabase
      const { data, error } = await supabase
        .from('course_purchases')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('purchased_at', { ascending: false });

      if (!error && data) {
        fetchedList = [...data];
      }

      // 2. Synthesize purchases for owned items in preferences if not in DB
      const owned = getOwnedCourses();
      const existingCourseIds = new Set(fetchedList.map(p => p.course_id));

      owned.forEach(courseId => {
        if (!existingCourseIds.has(courseId)) {
          const course = getCourseById(courseId);
          const product = getProductById(courseId);
          const title = course?.title || product?.name || `Resource ${courseId}`;
          const price = course?.priceUSD || product?.price || 0;
          fetchedList.push({
            id: `pref-${courseId}`,
            course_id: courseId,
            course_title: title,
            amount: price,
            currency: 'USD',
            payment_method: 'local',
            transaction_id: `TX-${courseId}`,
            status: 'completed',
            purchased_at: new Date().toISOString()
          });
        }
      });

      // 3. Load Trashed Purchases & Permanent Blacklist
      const trashKey = `trash_purchases_${currentUser.id}`;
      const deletedKey = `deleted_purchases_${currentUser.id}`;

      let deletedIds: string[] = [];
      try {
        const deletedLocal = localStorage.getItem(deletedKey);
        if (deletedLocal) deletedIds = JSON.parse(deletedLocal);
      } catch (e) {}

      const deletedPref = currentUser.preferences?.[deletedKey];
      if (Array.isArray(deletedPref)) {
        deletedIds = Array.from(new Set([...deletedIds, ...(deletedPref as string[])]));
      }

      if (deletedIds.length > 0) {
        const deletedSet = new Set(deletedIds);
        fetchedList = fetchedList.filter(
          p => !deletedSet.has(p.id) && !deletedSet.has(p.course_id) && !deletedSet.has(`pref-${p.course_id}`)
        );
      }

      let loadedTrash: TrashedPurchase[] = [];

      try {
        const localTrash = localStorage.getItem(trashKey);
        if (localTrash) {
          loadedTrash = JSON.parse(localTrash);
        }
      } catch (e) {
        console.warn("Failed to load local trash:", e);
      }

      const prefTrash = currentUser.preferences?.[trashKey];
      if (Array.isArray(prefTrash)) {
        const existingTrashIds = new Set(loadedTrash.map(t => t.id));
        (prefTrash as TrashedPurchase[]).forEach(item => {
          if (item && item.id && !existingTrashIds.has(item.id)) {
            loadedTrash.push(item);
          }
        });
      }

      // 4. Auto-Purge Protocol: Exclude items older than 30 days
      const now = Date.now();
      const validTrash: TrashedPurchase[] = [];
      let didAutoPurge = false;

      loadedTrash.forEach(item => {
        const deletedTime = new Date(item.deleted_at).getTime();
        const ageInDays = (now - deletedTime) / MS_PER_DAY;
        if (ageInDays < TRASH_RETENTION_DAYS) {
          validTrash.push(item);
        } else {
          didAutoPurge = true;
          if (!deletedIds.includes(item.id)) deletedIds.push(item.id);
          if (item.course_id && !deletedIds.includes(item.course_id)) deletedIds.push(item.course_id);
          if (item.course_id && !deletedIds.includes(`pref-${item.course_id}`)) deletedIds.push(`pref-${item.course_id}`);

          supabase
            .from('course_purchases')
            .delete()
            .or(`id.eq.${item.id},course_id.eq.${item.course_id}`)
            .then(() => {});
        }
      });

      if (didAutoPurge) {
        try {
          localStorage.setItem(trashKey, JSON.stringify(validTrash));
          localStorage.setItem(deletedKey, JSON.stringify(deletedIds));
          updateUserPreferences({ [trashKey]: validTrash, [deletedKey]: deletedIds });
        } catch (e) {}
      }

      // 5. Exclude trashed items from active purchases
      const trashedItemIds = new Set(validTrash.map(t => t.id));
      const trashedCourseIds = new Set(validTrash.map(t => t.course_id));

      const activeList = fetchedList.filter(
        p => !trashedItemIds.has(p.id) && !trashedCourseIds.has(p.course_id) && !trashedItemIds.has(`pref-${p.course_id}`)
      );

      setPurchases(activeList);
      setTrashedPurchases(validTrash);
      setLoading(false);
    };

    fetchPurchasesAndTrash();
  }, [currentUser]);

  const syncTrashState = async (newActive: Purchase[], newTrash: TrashedPurchase[]) => {
    if (!currentUser) return;
    const trashKey = `trash_purchases_${currentUser.id}`;
    
    setPurchases(newActive);
    setTrashedPurchases(newTrash);

    try {
      localStorage.setItem(trashKey, JSON.stringify(newTrash));
    } catch (e) {}

    await updateUserPreferences({
      [trashKey]: newTrash
    });
  };

  const moveToTrash = async (purchase: Purchase) => {
    if (!currentUser) return;

    const trashedItem: TrashedPurchase = {
      ...purchase,
      deleted_at: new Date().toISOString()
    };

    const updatedTrash = [trashedItem, ...trashedPurchases];
    const updatedActive = purchases.filter(p => p.id !== purchase.id && p.course_id !== purchase.course_id);

    const currentOwned = getOwnedCourses();
    const updatedOwned = currentOwned.filter(
      id => id !== purchase.course_id && id !== purchase.id && `store-${id}` !== purchase.course_id
    );

    const trashKey = `trash_purchases_${currentUser.id}`;
    setPurchases(updatedActive);
    setTrashedPurchases(updatedTrash);

    try {
      localStorage.setItem(trashKey, JSON.stringify(updatedTrash));
    } catch (e) {}

    await updateUserPreferences({
      ownedCourseIds: updatedOwned,
      [trashKey]: updatedTrash
    });
    showToast(`Moved to Trash. Retained for 30 days.`, "success");
  };

  const restoreFromTrash = async (item: TrashedPurchase) => {
    if (!currentUser) return;

    const trashKey = `trash_purchases_${currentUser.id}`;
    const deletedKey = `deleted_purchases_${currentUser.id}`;

    // 1. Remove from permanent blacklist if present
    let deletedIds: string[] = [];
    try {
      const stored = localStorage.getItem(deletedKey);
      if (stored) deletedIds = JSON.parse(stored);
    } catch (e) {}

    deletedIds = deletedIds.filter(id => id !== item.id && id !== item.course_id && id !== `pref-${item.course_id}`);
    try {
      localStorage.setItem(deletedKey, JSON.stringify(deletedIds));
    } catch (e) {}

    // 2. Add course_id back to user ownedCourseIds if not present
    const currentOwned = getOwnedCourses();
    const updatedOwned = Array.from(new Set([...currentOwned, item.course_id]));

    const { deleted_at, ...restoredPurchase } = item;
    const updatedTrash = trashedPurchases.filter(t => t.id !== item.id && t.course_id !== item.course_id);
    const updatedActive = [restoredPurchase, ...purchases];

    setPurchases(updatedActive);
    setTrashedPurchases(updatedTrash);

    try {
      localStorage.setItem(trashKey, JSON.stringify(updatedTrash));
    } catch (e) {}

    await updateUserPreferences({
      ownedCourseIds: updatedOwned,
      [deletedKey]: deletedIds,
      [trashKey]: updatedTrash
    });

    showToast("Purchase restored successfully!", "success");
  };

  const deleteForever = async (item: TrashedPurchase) => {
    if (!currentUser) return;

    try {
      const deletedKey = `deleted_purchases_${currentUser.id}`;
      let deletedIds: string[] = [];
      try {
        const stored = localStorage.getItem(deletedKey);
        if (stored) deletedIds = JSON.parse(stored);
      } catch (e) {}

      if (!deletedIds.includes(item.id)) deletedIds.push(item.id);
      if (item.course_id && !deletedIds.includes(item.course_id)) deletedIds.push(item.course_id);
      if (item.course_id && !deletedIds.includes(`pref-${item.course_id}`)) deletedIds.push(`pref-${item.course_id}`);

      try {
        localStorage.setItem(deletedKey, JSON.stringify(deletedIds));
      } catch (e) {}

      // Explicitly delete from Supabase DB
      if (item.course_id) {
        await supabase
          .from('course_purchases')
          .delete()
          .eq('user_id', currentUser.id)
          .eq('course_id', item.course_id);
      }
      if (item.id && !item.id.startsWith('pref-')) {
        await supabase
          .from('course_purchases')
          .delete()
          .eq('user_id', currentUser.id)
          .eq('id', item.id);
      }

      const currentOwned = getOwnedCourses();
      const updatedOwned = currentOwned.filter(
        id => id !== item.course_id && id !== item.id && `store-${id}` !== item.course_id
      );

      const updatedTrash = trashedPurchases.filter(t => t.id !== item.id && t.course_id !== item.course_id);
      
      const trashKey = `trash_purchases_${currentUser.id}`;
      setTrashedPurchases(updatedTrash);
      try {
        localStorage.setItem(trashKey, JSON.stringify(updatedTrash));
      } catch (e) {}

      await updateUserPreferences({
        ownedCourseIds: updatedOwned,
        [deletedKey]: deletedIds,
        [trashKey]: updatedTrash
      });

      showToast("Purchase permanently deleted.", "success");
    } catch (err) {
      console.error("Permanent delete error:", err);
      showToast("Failed to delete item permanently.", "error");
    }
  };

  const emptyTrash = async () => {
    if (!currentUser || trashedPurchases.length === 0) return;

    if (!window.confirm("Permanently delete all items in Trash? This cannot be undone.")) {
      return;
    }

    try {
      const deletedKey = `deleted_purchases_${currentUser.id}`;
      let deletedIds: string[] = [];
      try {
        const stored = localStorage.getItem(deletedKey);
        if (stored) deletedIds = JSON.parse(stored);
      } catch (e) {}

      // Add all trashed items to permanent blacklist
      trashedPurchases.forEach(item => {
        if (!deletedIds.includes(item.id)) deletedIds.push(item.id);
        if (item.course_id && !deletedIds.includes(item.course_id)) deletedIds.push(item.course_id);
        if (item.course_id && !deletedIds.includes(`pref-${item.course_id}`)) deletedIds.push(`pref-${item.course_id}`);
      });

      try {
        localStorage.setItem(deletedKey, JSON.stringify(deletedIds));
      } catch (e) {}

      // Remove all trashed course_ids from user's ownedCourseIds preference
      const currentOwned = getOwnedCourses();
      const trashedCourseIdSet = new Set(trashedPurchases.map(t => t.course_id));
      const updatedOwned = currentOwned.filter(id => !trashedCourseIdSet.has(id) && !trashedCourseIdSet.has(`store-${id}`));

      for (const item of trashedPurchases) {
        if (item.course_id) {
          await supabase
            .from('course_purchases')
            .delete()
            .eq('user_id', currentUser.id)
            .eq('course_id', item.course_id);
        }
        if (item.id && !item.id.startsWith('pref-')) {
          await supabase
            .from('course_purchases')
            .delete()
            .eq('user_id', currentUser.id)
            .eq('id', item.id);
        }
      }

      const trashKey = `trash_purchases_${currentUser.id}`;
      setTrashedPurchases([]);
      try {
        localStorage.removeItem(trashKey);
      } catch (e) {}

      await updateUserPreferences({
        ownedCourseIds: updatedOwned,
        [deletedKey]: deletedIds,
        [trashKey]: []
      });

      showToast("Trash emptied permanently.", "success");
    } catch (err) {
      console.error("Empty trash error:", err);
      showToast("Failed to empty trash.", "error");
    }
  };

  const generateReceipt = (purchase: Purchase) => {
    const receiptContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Receipt - ${purchase.transaction_id}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 40px;
      background: #f5f5f5;
    }
    .receipt {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #60a5fa;
      padding-bottom: 20px;
    }
    .logo-text {
      font-size: 48px;
      font-weight: bold;
      color: #60a5fa;
      margin-bottom: 10px;
      letter-spacing: 4px;
      display: block;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #121212;
      margin: 0;
    }
    .subtitle {
      color: #666;
      margin-top: 5px;
    }
    .section {
      margin: 20px 0;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 5px 0;
    }
    .label {
      color: #666;
    }
    .value {
      font-weight: bold;
      color: #121212;
    }
    .total {
      font-size: 20px;
      color: #60a5fa;
      border-top: 2px solid #eee;
      padding-top: 15px;
      margin-top: 15px;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #888;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <span class="logo-text">ORIGIN</span>
      <h1 class="title">OFFICIAL RECEIPT</h1>
      <p class="subtitle">The Becoming Institute • Mindvest Global Resources</p>
    </div>
    
    <div class="section">
      <div class="section-title">Transaction Information</div>
      <div class="row">
        <span class="label">Transaction ID:</span>
        <span class="value">${purchase.transaction_id}</span>
      </div>
      <div class="row">
        <span class="label">Date:</span>
        <span class="value">${new Date(purchase.purchased_at).toLocaleDateString()}</span>
      </div>
      <div class="row">
        <span class="label">Status:</span>
        <span class="value" style="color: #60a5fa;">${purchase.status.toUpperCase()}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Purchase Details</div>
      <div class="row">
        <span class="label">Item:</span>
        <span class="value">${purchase.course_title}</span>
      </div>
      <div class="row total">
        <span class="label">Amount Paid:</span>
        <span class="value total">${purchase.currency === 'NGN' ? '₦' : purchase.currency === 'EUR' ? '€' : purchase.currency === 'GBP' ? '£' : '$'}${purchase.amount.toFixed(2)}</span>
      </div>
      <div class="row">
        <span class="label">Payment Method:</span>
        <span class="value">${purchase.payment_method}</span>
      </div>
    </div>

    <div class="footer">
      <p>Thank you for your purchase!</p>
      <p>© ${new Date().getFullYear()} Origin. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    const blob = new Blob([receiptContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${purchase.transaction_id}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const totalSpent = purchases.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#070a12] text-white flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#60a5fa]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-3xl text-center max-w-md shadow-2xl relative z-10">
          <ShoppingBag className="w-12 h-12 text-[#60a5fa] mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-2">Sign In Required</h2>
          <p className="text-sm text-zinc-400 mb-6">Please log in to your Origin account to view your purchased learning assets and receipts.</p>
          <Link
            href="/"
            className="w-full bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-extrabold py-3 px-6 rounded-full transition-all text-sm block shadow-lg shadow-[#60a5fa]/20 cursor-pointer"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070a12] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#60a5fa]" />
          <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase">Loading Purchase Assets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a12] text-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#60a5fa]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8 sm:space-y-12">
        
        {/* Header Hero Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#60a5fa]/10 border border-[#60a5fa]/30 rounded-full text-xs font-extrabold text-[#60a5fa] uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Digital Assets & Receipts</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Purchase History
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl">
              Access your enrolled masterclasses, companion eBooks, official receipts, and deleted asset storage.
            </p>
          </div>

          {/* Quick Stat Cards */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
            <div className="bg-[#0b1220]/80 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl min-w-[120px] shrink-0">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block">Active Assets</span>
              <span className="text-xl font-black text-white">{purchases.length}</span>
            </div>
            <div className="bg-[#0b1220]/80 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl min-w-[120px] shrink-0">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block">Total Spent</span>
              <span className="text-xl font-black text-[#60a5fa]">${totalSpent.toFixed(2)}</span>
            </div>
            <div className="bg-[#0b1220]/80 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl min-w-[120px] shrink-0">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block">In Trash</span>
              <span className="text-xl font-black text-amber-400">{trashedPurchases.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Segment Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="bg-[#0b1220] p-1.5 rounded-2xl border border-white/10 inline-flex items-center gap-1 self-start shadow-xl">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === "active"
                  ? "bg-[#60a5fa] text-black shadow-lg shadow-[#60a5fa]/20 scale-[1.02]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Active Purchases ({purchases.length})
            </button>
            <button
              onClick={() => setActiveTab("trash")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "trash"
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20 scale-[1.02]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>Trash Bin</span>
              {trashedPurchases.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                  {trashedPurchases.length}
                </span>
              )}
            </button>
          </div>

          {activeTab === "trash" && trashedPurchases.length > 0 && (
            <button
              onClick={emptyTrash}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 font-extrabold text-xs rounded-full transition-all flex items-center gap-2 cursor-pointer self-end sm:self-auto shadow-md"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Empty Trash Now</span>
            </button>
          )}
        </div>

        {/* ACTIVE PURCHASES VIEW */}
        {activeTab === "active" && (
          <div>
            {purchases.length === 0 ? (
              <div className="bg-[#0b1220]/60 border border-white/10 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-2xl">
                <div className="w-16 h-16 bg-[#60a5fa]/10 rounded-2xl flex items-center justify-center mx-auto border border-[#60a5fa]/20">
                  <Package className="w-8 h-8 text-[#60a5fa]" />
                </div>
                <h3 className="text-xl font-black text-white">No Active Purchases Yet</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  You haven't enrolled in any courses or purchased digital materials yet. Explore our course catalog to get started.
                </p>
                <Link
                  href="/store"
                  className="inline-flex items-center gap-2 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-extrabold px-6 py-3 rounded-full text-sm transition-all shadow-lg shadow-[#60a5fa]/20 cursor-pointer mt-2"
                >
                  <span>Browse Store & Masterclasses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="bg-[#0b1220]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#60a5fa]/40 transition-all duration-300 shadow-xl group hover:shadow-2xl hover:shadow-[#60a5fa]/5"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      
                      {/* Left: Product Details */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-2xl bg-[#60a5fa]/10 border border-[#60a5fa]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Package className="w-6 h-6 text-[#60a5fa]" />
                        </div>
                        
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#60a5fa] transition-colors leading-snug">
                              {purchase.course_title}
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              COMPLETED
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="w-4 h-4 text-[#60a5fa]" />
                              <span className="text-white font-black text-sm">
                                {purchase.currency === 'NGN' ? '₦' : purchase.currency === 'EUR' ? '€' : purchase.currency === 'GBP' ? '£' : '$'}{purchase.amount.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-zinc-500" />
                              <span>{new Date(purchase.purchased_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <FileText className="w-4 h-4 text-zinc-500" />
                              <span className="font-mono text-zinc-400">{purchase.transaction_id}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Action Buttons */}
                      <div className="flex items-center gap-2.5 flex-wrap shrink-0 border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                        {(() => {
                          const prod = getProductById(purchase.course_id);
                          const courseObj = getCourseById(purchase.course_id);

                          const downloads: { name: string; url: string }[] = [];

                          if (prod) {
                            if (prod.pdfUrl) {
                              downloads.push({ name: `${prod.name} (PDF)`, url: prod.pdfUrl });
                            }
                            if (prod.bonusPdfs) {
                              prod.bonusPdfs.forEach((b) => downloads.push({ name: b.name, url: b.url }));
                            }
                          }

                          if (courseObj) {
                            const coursePdfMap: Record<string, string> = {
                              "problem-solving": "/documents/course-problem-solving-workbook.pdf",
                              "decision-making": "/documents/course-decision-making-workbook.pdf",
                              "team-person": "/documents/course-team-person-workbook.pdf",
                              "personal-adaptability": "/documents/course-personal-adaptability-workbook.pdf",
                              "self-image": "/documents/self-image-mastery-workbook.pdf",
                              "communication": "/documents/course-communication-workbook.pdf",
                            };
                            const pdfUrl = coursePdfMap[courseObj.id] || "/documents/origin_7day_sprint_starter.pdf";
                            downloads.push({ name: `${courseObj.title} Framework (PDF)`, url: pdfUrl });
                          }

                          // Include bonus Starter Guide for all purchases
                          downloads.push({ name: "Origin 7-Day Starter Guide (PDF)", url: "/documents/origin_7day_sprint_starter.pdf" });

                          // Deduplicate by URL
                          const uniqueDownloads = Array.from(new Map(downloads.map((item) => [item.url, item])).values());

                          const isCourse = !!courseObj || !purchase.course_id.startsWith("store-");

                          return (
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Direct Launch / Player Link */}
                              {isCourse ? (
                                <Link
                                  href={`/learn/${purchase.course_id}`}
                                  className="flex items-center gap-2 px-4 py-2.5 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-black rounded-full transition-all text-xs shadow-md shadow-[#60a5fa]/20 hover:scale-[1.02]"
                                >
                                  <Play className="w-3.5 h-3.5 fill-black" />
                                  <span>Start Learning</span>
                                </Link>
                              ) : (
                                <Link
                                  href={`/store/${purchase.course_id.replace("store-", "")}`}
                                  className="flex items-center gap-2 px-4 py-2.5 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-black rounded-full transition-all text-xs shadow-md shadow-[#60a5fa]/20 hover:scale-[1.02]"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>Open eBook</span>
                                </Link>
                              )}

                              {/* PDF Download Buttons */}
                              {uniqueDownloads.map((dl, idx) => (
                                <a
                                  key={idx}
                                  href={dl.url}
                                  download
                                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-full transition-all text-xs shadow-md shadow-emerald-500/15 hover:scale-[1.02] cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>{dl.name}</span>
                                </a>
                              ))}
                            </div>
                          );
                        })()}

                        <button
                          onClick={() => generateReceipt(purchase)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-full transition-all text-xs border border-white/10 hover:scale-[1.02] cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>

                        <button
                          onClick={() => moveToTrash(purchase)}
                          className="flex items-center gap-1.5 px-3 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-extrabold rounded-full transition-all text-xs cursor-pointer hover:scale-[1.02]"
                          title="Move to Trash (retained for 30 days)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Trash</span>
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TRASH BIN VIEW */}
        {activeTab === "trash" && (
          <div>
            {/* Trash Protocol Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-5 sm:p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-start gap-3.5">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-amber-400">Dustbin Auto-Purge Protocol</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light">
                    Items placed in Trash are retained for <strong className="text-white font-bold">30 days</strong>. You can restore them anytime. After 30 days, they are automatically purged to optimize storage.
                  </p>
                </div>
              </div>
            </div>

            {trashedPurchases.length === 0 ? (
              <div className="bg-[#0b1220]/60 border border-white/10 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-3 shadow-2xl">
                <Trash2 className="w-12 h-12 text-zinc-600 mx-auto mb-2" />
                <h3 className="text-xl font-black text-white">Trash Bin is Empty</h3>
                <p className="text-sm text-zinc-400 font-light">Deleted purchases will remain stored here for 30 days before permanent automatic purging.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {trashedPurchases.map((item) => {
                  const now = Date.now();
                  const deletedTime = new Date(item.deleted_at).getTime();
                  const daysElapsed = Math.floor((now - deletedTime) / MS_PER_DAY);
                  const daysRemaining = Math.max(1, TRASH_RETENTION_DAYS - daysElapsed);

                  return (
                    <div
                      key={item.id}
                      className="bg-[#0b1220]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-xl"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg sm:text-xl font-black text-white line-through opacity-70">
                              {item.course_title}
                            </h3>
                            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                              <Clock className="w-3.5 h-3.5" />
                              Auto-deletes in {daysRemaining} day{daysRemaining === 1 ? "" : "s"}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="w-4 h-4 text-zinc-500" />
                              <span className="text-zinc-300 font-bold">
                                {item.currency === 'NGN' ? '₦' : item.currency === 'EUR' ? '€' : item.currency === 'GBP' ? '£' : '$'}{item.amount.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-zinc-500" />
                              <span>Purchased {new Date(item.purchased_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Trash2 className="w-4 h-4 text-amber-400" />
                              <span>Trashed {new Date(item.deleted_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Trash Action Buttons */}
                        <div className="flex items-center gap-3 shrink-0 border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                          <button
                            onClick={() => restoreFromTrash(item)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-extrabold rounded-full transition-all text-xs hover:scale-[1.02] cursor-pointer shadow-md"
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span>Restore to Purchases</span>
                          </button>

                          <button
                            onClick={() => deleteForever(item)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-extrabold rounded-full transition-all text-xs hover:scale-[1.02] cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete Forever</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Post-purchase upsell — shown below order history */}
        {purchases.length > 0 && (
          <div className="border-t border-white/5 pt-12">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-lg font-black text-white">Complete Your Journey</h2>
            </div>
            <p className="text-sm text-zinc-400 mb-6 font-light">
              Pair your course with companion materials — journals, ebooks, and merch to reinforce your growth.
            </p>
            <CheckoutAddons
              cartItemIds={purchases.map((p) => `store-${p.course_id}`)}
              variant="full"
            />
          </div>
        )}

      </div>
    </div>
  );
}
