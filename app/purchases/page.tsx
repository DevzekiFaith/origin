"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";
import { supabase } from "../../lib/supabase";
import { Download, Calendar, DollarSign, FileText, Trash2, RotateCcw, Clock, AlertTriangle, ShieldCheck, ShoppingBag, ArrowRight, Package, CheckCircle2, Compass, Play, BookOpen } from "lucide-react";
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
      <div className="min-h-screen bg-[#8A948B] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60 pointer-events-none" />
        <div className="bg-[#E2E8DE] text-[#172217] border border-[#D5DDCF] p-6 sm:p-10 rounded-3xl text-center max-w-md w-full shadow-2xl relative z-10 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#CCD6C6] flex items-center justify-center mx-auto text-[#1C3B34] shadow-xs">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#172217]">Sign In Required</h2>
            <p className="text-xs sm:text-sm text-[#4E5B4B] leading-relaxed font-light">
              Please sign in to your Origin account to view your enrolled thinking experiences, reading companions, and receipts.
            </p>
          </div>
          <Link
            href="/"
            className="w-full bg-[#1C3B34] hover:bg-[#122420] text-white font-mono font-bold py-3.5 px-6 rounded-xl transition-all text-xs block shadow-md cursor-pointer"
          >
            RETURN TO HOMEPAGE
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#8A948B] text-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2 border-white" />
          <span className="text-xs font-mono font-bold text-white/80 tracking-wider uppercase">Loading Learning Assets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#8A948B] text-white pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-white selection:text-[#8A948B]">
      {/* Background Ambient Orbs & Subtle Radial Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-100/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:36px_36px] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-6 sm:space-y-10">
        
        {/* Header Hero Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 pb-6 border-b border-white/15">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] sm:text-xs font-mono text-white/90 uppercase tracking-wider font-bold">
              <ShoppingBag className="w-3 h-3 text-amber-300" />
              <span>DIGITAL ASSETS &amp; RECEIPTS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight font-normal">
              Purchases &amp; Assets
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-light max-w-xl leading-relaxed">
              Access your enrolled thinking experiences, reading companions, official receipts, and deleted asset storage.
            </p>
          </div>

          {/* Quick Stat Cards — Fully Responsive Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
            <div className="liquid-glass p-3 sm:p-4 rounded-2xl text-center sm:text-left min-w-0">
              <span className="text-[9px] sm:text-[10px] font-mono text-white/70 uppercase tracking-wider block font-bold truncate">
                Active
              </span>
              <span className="text-base sm:text-2xl font-mono font-bold text-white block mt-0.5">
                {purchases.length}
              </span>
            </div>
            <div className="liquid-glass p-3 sm:p-4 rounded-2xl text-center sm:text-left min-w-0">
              <span className="text-[9px] sm:text-[10px] font-mono text-white/70 uppercase tracking-wider block font-bold truncate">
                Total Spent
              </span>
              <span className="text-base sm:text-2xl font-mono font-bold text-amber-300 block mt-0.5 truncate">
                ${totalSpent.toFixed(0)}
              </span>
            </div>
            <div className="liquid-glass p-3 sm:p-4 rounded-2xl text-center sm:text-left min-w-0">
              <span className="text-[9px] sm:text-[10px] font-mono text-white/70 uppercase tracking-wider block font-bold truncate">
                Trash
              </span>
              <span className="text-base sm:text-2xl font-mono font-bold text-white block mt-0.5">
                {trashedPurchases.length}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Segment Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="p-1 rounded-2xl liquid-glass border border-white/20 inline-flex items-center gap-1 shadow-sm w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer text-center whitespace-nowrap ${
                activeTab === "active"
                  ? "bg-white text-[#1C3B34] shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Active Purchases ({purchases.length})
            </button>
            <button
              onClick={() => setActiveTab("trash")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === "trash"
                  ? "bg-amber-300 text-[#172217] shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Trash2 className="w-3.5 h-3.5 shrink-0" />
              <span>Trash Bin</span>
              {trashedPurchases.length > 0 && (
                <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold">
                  {trashedPurchases.length}
                </span>
              )}
            </button>
          </div>

          {activeTab === "trash" && trashedPurchases.length > 0 && (
            <button
              onClick={emptyTrash}
              className="px-4 py-2 bg-red-600/30 hover:bg-red-600 text-white border border-red-500/40 font-mono font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm self-stretch sm:self-auto min-h-[38px]"
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
              <div className="bg-[#E2E8DE] text-[#172217] rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 shadow-xl border border-[#D5DDCF]">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#CCD6C6] flex items-center justify-center mx-auto text-[#1C3B34] shadow-xs">
                  <Package className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold font-serif text-[#172217]">No Active Purchases Yet</h3>
                  <p className="text-xs sm:text-sm text-[#4E5B4B] font-light leading-relaxed">
                    You haven't enrolled in any thinking experiences or purchased reading companions yet. Explore our store to get started.
                  </p>
                </div>
                <Link
                  href="/store"
                  className="inline-flex items-center justify-center gap-2 bg-[#1C3B34] hover:bg-[#122420] text-white font-mono font-bold px-6 py-3.5 rounded-xl text-xs transition-all shadow-md cursor-pointer mt-2"
                >
                  <span>BROWSE STORE &amp; COMPANIONS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="bg-[#E2E8DE] text-[#172217] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#D5DDCF] shadow-lg hover:border-[#CCD6C6] transition-all duration-300 space-y-4"
                  >
                    {/* Top Row: Icon + Title + Status */}
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-[#CCD6C6] flex items-center justify-center shrink-0 text-[#1C3B34] shadow-xs mt-0.5">
                        <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-[#172217] leading-snug break-words">
                            {purchase.course_title}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-[#1C3B34]/10 text-[#1C3B34] border border-[#1C3B34]/20 flex items-center gap-1 shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-[#1C3B34]" />
                            COMPLETED
                          </span>
                        </div>

                        {/* Metadata row */}
                        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1 text-[11px] text-[#4E5B4B] font-mono">
                          <div className="flex items-center gap-1 text-[#1C3B34] font-bold">
                            <DollarSign className="w-3.5 h-3.5 text-[#1C3B34]" />
                            <span>
                              {purchase.currency === 'NGN' ? '₦' : purchase.currency === 'EUR' ? '€' : purchase.currency === 'GBP' ? '£' : '$'}{purchase.amount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#4E5B4B]" />
                            <span>{new Date(purchase.purchased_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-[#4E5B4B]" />
                            <span className="truncate max-w-[130px] sm:max-w-none">{purchase.transaction_id}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-[#D0D9CA]">
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
                          downloads.push({ name: `Workbook (PDF)`, url: pdfUrl });
                        }

                        // Include bonus Starter Guide for all purchases
                        downloads.push({ name: "Starter Guide (PDF)", url: "/documents/origin_7day_sprint_starter.pdf" });

                        // Deduplicate by URL
                        const uniqueDownloads = Array.from(new Map(downloads.map((item) => [item.url, item])).values());
                        const isCourse = !!courseObj || !purchase.course_id.startsWith("store-");

                        return (
                          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                            {/* Direct Launch / Player Link */}
                            {isCourse ? (
                              <Link
                                href={`/learn/${purchase.course_id}`}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1C3B34] hover:bg-[#122420] text-white font-mono font-bold rounded-xl transition-all text-xs shadow-sm min-h-[40px]"
                              >
                                <Play className="w-3.5 h-3.5 fill-white" />
                                <span>Start Learning</span>
                              </Link>
                            ) : (
                              <Link
                                href={`/store/${purchase.course_id.replace("store-", "")}`}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1C3B34] hover:bg-[#122420] text-white font-mono font-bold rounded-xl transition-all text-xs shadow-sm min-h-[40px]"
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
                                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white text-[#1C3B34] border border-[#CCD6C6] hover:bg-[#CCD6C6] font-mono font-bold rounded-xl transition-all text-xs shadow-xs min-h-[40px] truncate max-w-[190px] sm:max-w-none"
                              >
                                <Download className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{dl.name}</span>
                              </a>
                            ))}
                          </div>
                        );
                      })()}

                      {/* Utility Action Buttons */}
                      <div className="flex items-center gap-2 justify-end sm:justify-start shrink-0">
                        <button
                          onClick={() => generateReceipt(purchase)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-black/5 text-[#3E4A3B] font-mono font-bold text-xs border border-[#CCD6C6] shadow-xs cursor-pointer min-h-[38px]"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>

                        <button
                          onClick={() => moveToTrash(purchase)}
                          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-mono font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer min-h-[38px]"
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
            <div className="bg-amber-100/70 border border-amber-300 text-[#172217] rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-mono font-bold text-amber-900 uppercase">
                    30-Day Auto-Purge Protocol
                  </h4>
                  <p className="text-xs text-[#3E4A3B] leading-relaxed">
                    Items placed in Trash are retained for <strong>30 days</strong>. You can restore them anytime before they are permanently purged.
                  </p>
                </div>
              </div>
            </div>

            {trashedPurchases.length === 0 ? (
              <div className="bg-[#E2E8DE] text-[#172217] rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto space-y-3 shadow-xl border border-[#D5DDCF]">
                <Trash2 className="w-10 h-10 text-[#4E5B4B] mx-auto mb-2 opacity-60" />
                <h3 className="text-lg sm:text-xl font-bold font-serif text-[#172217]">Trash Bin is Empty</h3>
                <p className="text-xs sm:text-sm text-[#4E5B4B] font-light">
                  Deleted purchases will remain stored here for 30 days before permanent automatic purging.
                </p>
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
                      className="bg-[#E2E8DE] text-[#172217] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#D5DDCF] shadow-lg space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-[#172217] opacity-80 truncate">
                              {item.course_title}
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-amber-200 text-amber-900 border border-amber-300 flex items-center gap-1 shrink-0">
                              <Clock className="w-3 h-3" />
                              Auto-deletes in {daysRemaining}d
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#4E5B4B] font-mono">
                            <span>
                              {item.currency === 'NGN' ? '₦' : item.currency === 'EUR' ? '€' : item.currency === 'GBP' ? '£' : '$'}{item.amount.toFixed(2)}
                            </span>
                            <span>Purchased {new Date(item.purchased_at).toLocaleDateString()}</span>
                            <span>Trashed {new Date(item.deleted_at).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Trash Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D0D9CA]">
                          <button
                            onClick={() => restoreFromTrash(item)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1C3B34] text-white hover:bg-[#122420] font-mono font-bold rounded-xl transition-all text-xs shadow-xs min-h-[40px]"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restore</span>
                          </button>

                          <button
                            onClick={() => deleteForever(item)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-red-100 hover:bg-red-200 text-red-800 border border-red-200 font-mono font-bold rounded-xl transition-all text-xs min-h-[40px]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
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
          <div className="border-t border-white/15 pt-8 sm:pt-12">
            <div className="flex items-center gap-2 mb-1.5">
              <Compass className="w-4 h-4 text-amber-300" />
              <h2 className="text-base sm:text-lg font-serif font-extrabold text-white">Complete Your Journey</h2>
            </div>
            <p className="text-xs sm:text-sm text-white/80 mb-6 font-light">
              Pair your enrolled experiences with reading companions, strategic frameworks, and journals.
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

