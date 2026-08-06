"use client";

import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";
import { supabase } from "../../lib/supabase";
import { Download, Calendar, DollarSign, FileText, Trash2, RotateCcw, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { getCourseById } from "../data/courses";
import { getProductById } from "../data/store-products";

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

      // 3. Load Trashed Purchases (from localStorage & User Preferences)
      const trashKey = `trash_purchases_${currentUser.id}`;
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
        // Merge preference trash with local trash
        const existingTrashIds = new Set(loadedTrash.map(t => t.id));
        (prefTrash as TrashedPurchase[]).forEach(item => {
          if (item && item.id && !existingTrashIds.has(item.id)) {
            loadedTrash.push(item);
          }
        });
      }

      // 4. Auto-Purge: Exclude items older than 30 days
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
          // DB cleanup for auto-purged item
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
          updateUserPreferences({ [trashKey]: validTrash });
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

    await syncTrashState(updatedActive, updatedTrash);
    showToast(`Moved to Trash. Items stay in Trash for ${TRASH_RETENTION_DAYS} days before auto-purge.`, "success");
  };

  const restoreFromTrash = async (item: TrashedPurchase) => {
    if (!currentUser) return;

    const { deleted_at, ...restoredPurchase } = item;
    const updatedTrash = trashedPurchases.filter(t => t.id !== item.id && t.course_id !== item.course_id);
    const updatedActive = [restoredPurchase, ...purchases];

    await syncTrashState(updatedActive, updatedTrash);
    showToast("Purchase restored to active history!", "success");
  };

  const deleteForever = async (item: TrashedPurchase) => {
    if (!currentUser) return;

    try {
      // Permanent DB deletion from Supabase
      await supabase
        .from('course_purchases')
        .delete()
        .or(`id.eq.${item.id},course_id.eq.${item.course_id}`);

      // Also clean ownedCourseIds preference
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

    if (!window.confirm("Are you sure you want to permanently delete all items in the Trash? This action cannot be undone.")) {
      return;
    }

    try {
      for (const item of trashedPurchases) {
        await supabase
          .from('course_purchases')
          .delete()
          .or(`id.eq.${item.id},course_id.eq.${item.course_id}`);
      }

      const trashKey = `trash_purchases_${currentUser.id}`;
      setTrashedPurchases([]);
      try {
        localStorage.removeItem(trashKey);
      } catch (e) {}

      await updateUserPreferences({
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

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <p className="text-white">Please sign in to view your purchase history.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#60a5fa]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-6xl">
        
        {/* Header Title & Nav Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Purchase History</h1>
            <p className="text-sm text-zinc-400 mt-1">Manage your active digital access, receipts, and deleted items.</p>
          </div>

          <div className="flex items-center gap-2 bg-[#1a1a1a] p-1.5 rounded-full border border-[#2a2a2a] shrink-0">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "active"
                  ? "bg-[#60a5fa] text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Active Purchases ({purchases.length})
            </button>
            <button
              onClick={() => setActiveTab("trash")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "trash"
                  ? "bg-amber-400 text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Trash</span>
              {trashedPurchases.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">
                  {trashedPurchases.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ACTIVE PURCHASES TAB */}
        {activeTab === "active" && (
          <div>
            {purchases.length === 0 ? (
              <div className="bg-[#181818] rounded-2xl p-10 border border-[#282828] text-center">
                <ShieldCheck className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No Active Purchases</h3>
                <p className="text-sm text-[#b3b3b3]">Any courses or store items you purchase will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="bg-[#181818] rounded-2xl p-6 border border-[#282828] hover:border-[#60a5fa]/40 transition-colors shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2">{purchase.course_title}</h3>
                        <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-[#b3b3b3]">
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4 text-[#60a5fa]" />
                            <span className="text-white font-bold">{purchase.currency === 'NGN' ? '₦' : purchase.currency === 'EUR' ? '€' : purchase.currency === 'GBP' ? '£' : '$'}{purchase.amount.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-[#60a5fa]" />
                            <span>{new Date(purchase.purchased_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-[#60a5fa]" />
                            <span className="font-mono text-zinc-400">{purchase.transaction_id}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        {(() => {
                          const prod = getProductById(purchase.course_id);
                          if (!prod) return null;
                          return (
                            <div className="flex flex-wrap items-center gap-2">
                              {prod.pdfUrl && (
                                <a
                                  href={prod.pdfUrl}
                                  download
                                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-full transition-colors text-xs shadow-md"
                                >
                                  <Download className="w-4 h-4" />
                                  <span>Download PDF</span>
                                </a>
                              )}
                              {prod.bonusPdfs && prod.bonusPdfs.map((bonus, bIdx) => (
                                <a
                                  key={bIdx}
                                  href={bonus.url}
                                  download
                                  className="flex items-center gap-1.5 px-4 py-2 bg-[#60a5fa]/20 border border-[#60a5fa]/40 hover:bg-[#60a5fa]/30 text-[#60a5fa] font-extrabold rounded-full transition-colors text-xs shadow-md"
                                >
                                  <Download className="w-4 h-4" />
                                  <span>{bonus.name}</span>
                                </a>
                              ))}
                            </div>
                          );
                        })()}

                        <button
                          onClick={() => generateReceipt(purchase)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-extrabold rounded-full transition-colors text-xs shadow-md cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Receipt</span>
                        </button>

                        <button
                          onClick={() => moveToTrash(purchase)}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 font-bold rounded-full transition-colors text-xs cursor-pointer"
                          title="Move to Trash (retain for 30 days)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Trash</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TRASH / DUSTBIN TAB */}
        {activeTab === "trash" && (
          <div>
            {/* Trash Header Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-400">Dustbin Auto-Purge Protocol</h4>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    Items placed in the Trash stay here for <strong className="text-white">30 days</strong> so you can restore them anytime. After 30 days, they are automatically purged forever to optimize space.
                  </p>
                </div>
              </div>

              {trashedPurchases.length > 0 && (
                <button
                  onClick={emptyTrash}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-extrabold text-xs rounded-full transition-all shrink-0 shadow-md cursor-pointer"
                >
                  Empty Trash Now
                </button>
              )}
            </div>

            {trashedPurchases.length === 0 ? (
              <div className="bg-[#181818] rounded-2xl p-10 border border-[#282828] text-center">
                <Trash2 className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Trash is Empty</h3>
                <p className="text-sm text-[#b3b3b3]">Deleted purchases will appear here for 30 days before automatic cleanup.</p>
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
                      className="bg-[#181818] rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-colors shadow-lg"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-extrabold text-white line-through opacity-80">{item.course_title}</h3>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Auto-deletes in {daysRemaining} day{daysRemaining === 1 ? "" : "s"}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs text-[#b3b3b3]">
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="w-4 h-4 text-zinc-400" />
                              <span>{item.currency === 'NGN' ? '₦' : item.currency === 'EUR' ? '€' : item.currency === 'GBP' ? '£' : '$'}{item.amount.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-zinc-400" />
                              <span>Purchased {new Date(item.purchased_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Trash2 className="w-4 h-4 text-amber-400" />
                              <span>Trashed {new Date(item.deleted_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => restoreFromTrash(item)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-extrabold rounded-full transition-colors text-xs cursor-pointer"
                            title="Restore item back to active purchases"
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span>Restore</span>
                          </button>

                          <button
                            onClick={() => deleteForever(item)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-extrabold rounded-full transition-colors text-xs cursor-pointer"
                            title="Delete permanently now"
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

      </div>
    </div>
  );
}
