"use client";

import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";
import { supabase } from "../../lib/supabase";
import { Download, Calendar, DollarSign, FileText, Trash2 } from "lucide-react";
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

export default function PurchaseHistoryPage() {
  const { currentUser, getOwnedCourses, updateUserPreferences } = useUser();
  const { showToast } = useToast();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchPurchases = async () => {
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

      // 3. Filter out blacklisted deleted purchase IDs (from localStorage & preferences)
      const deletedKey = `deleted_purchases_${currentUser.id}`;
      let deletedIds: string[] = [];
      try {
        const deletedLocal = localStorage.getItem(deletedKey);
        if (deletedLocal) {
          deletedIds = JSON.parse(deletedLocal);
        }
      } catch (e) {}

      const deletedPref = currentUser.preferences?.[deletedKey];
      if (Array.isArray(deletedPref)) {
        deletedIds = Array.from(new Set([...deletedIds, ...(deletedPref as string[])]));
      }

      if (deletedIds.length > 0) {
        fetchedList = fetchedList.filter(
          p => !deletedIds.includes(p.id) && !deletedIds.includes(p.course_id) && !deletedIds.includes(`pref-${p.course_id}`)
        );
      }

      setPurchases(fetchedList);
      setLoading(false);
    };

    fetchPurchases();
  }, [currentUser]);

  const deletePurchase = async (purchase: Purchase) => {
    if (!currentUser) return;

    try {
      // A. Attempt DB deletion from Supabase course_purchases table
      const { error } = await supabase
        .from('course_purchases')
        .delete()
        .or(`id.eq.${purchase.id},course_id.eq.${purchase.course_id}`);

      if (error) {
        console.warn('Supabase DB delete warning:', error.message);
      }

      // B. Save to permanent local & preference deleted blacklist
      const deletedKey = `deleted_purchases_${currentUser.id}`;
      let deletedIds: string[] = [];
      try {
        const stored = localStorage.getItem(deletedKey);
        if (stored) deletedIds = JSON.parse(stored);
      } catch (e) {}

      if (!deletedIds.includes(purchase.id)) deletedIds.push(purchase.id);
      if (purchase.course_id && !deletedIds.includes(purchase.course_id)) deletedIds.push(purchase.course_id);
      if (purchase.course_id && !deletedIds.includes(`pref-${purchase.course_id}`)) deletedIds.push(`pref-${purchase.course_id}`);

      try {
        localStorage.setItem(deletedKey, JSON.stringify(deletedIds));
      } catch (e) {}

      // C. Remove course_id from user ownedCourseIds in UserContext & DB preferences
      const currentOwned = getOwnedCourses();
      const updatedOwned = currentOwned.filter(
        id => id !== purchase.course_id && id !== purchase.id && `store-${id}` !== purchase.course_id
      );

      await updateUserPreferences({
        ownedCourseIds: updatedOwned,
        [deletedKey]: deletedIds
      });

      // D. Update local state
      setPurchases(prev => prev.filter(p => p.id !== purchase.id && p.course_id !== purchase.course_id));
      showToast('Purchase deleted permanently.', 'success');
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Failed to delete purchase. Please try again.', 'error');
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
    .logo {
      width: 150px;
      height: auto;
      margin-bottom: 10px;
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
    .section-title {
      font-weight: bold;
      color: #60a5fa;
      margin-bottom: 10px;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
    .label {
      color: #666;
    }
    .value {
      font-weight: 600;
      color: #121212;
    }
    .total {
      font-size: 24px;
      color: #60a5fa;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #60a5fa;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <img src="https://origin.app/origin.png" alt="Origin Logo" class="logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
      <div class="logo-text" style="display: none;">ORIGIN</div>
      <h1 class="title">ORIGIN</h1>
      <p class="subtitle">Formation for Life</p>
    </div>

    <div class="section">
      <div class="section-title">Transaction Details</div>
      <div class="row">
        <span class="label">Transaction ID</span>
        <span class="value">${purchase.transaction_id}</span>
      </div>
      <div class="row">
        <span class="label">Date</span>
        <span class="value">${new Date(purchase.purchased_at).toLocaleDateString()}</span>
      </div>
      <div class="row">
        <span class="label">Status</span>
        <span class="value" style="color: #60a5fa;">${purchase.status.toUpperCase()}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Purchase Details</div>
      <div class="row">
        <span class="label">Course</span>
        <span class="value">${purchase.course_title}</span>
      </div>
      <div class="row">
        <span class="label">Amount</span>
        <span class="value total">${purchase.currency === 'NGN' ? '₦' : purchase.currency === 'EUR' ? '€' : purchase.currency === 'GBP' ? '£' : '$'}${purchase.amount.toFixed(2)}</span>
      </div>
      <div class="row">
        <span class="label">Payment Method</span>
        <span class="value">${purchase.payment_method}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Customer Information</div>
      <div class="row">
        <span class="label">Name</span>
        <span class="value">${currentUser?.name || 'N/A'}</span>
      </div>
      <div class="row">
        <span class="label">Email</span>
        <span class="value">${currentUser?.email || 'N/A'}</span>
      </div>
    </div>

    <div class="footer">
      <p>Thank you for your purchase!</p>
      <p>Lifetime access to this course.</p>
      <p>© ${new Date().getFullYear()} Origin — Formation for Life</p>
    </div>
  </div>
</body>
</html>
    `.trim();

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
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-4xl font-black mb-8">Purchase History</h1>

        {purchases.length === 0 ? (
          <div className="bg-[#181818] rounded-xl p-8 border border-[#282828]">
            <p className="text-[#b3b3b3]">No purchases yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="bg-[#181818] rounded-xl p-6 border border-[#282828] hover:border-[#60a5fa] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{purchase.course_title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[#b3b3b3]">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{purchase.currency === 'NGN' ? '₦' : purchase.currency === 'EUR' ? '€' : purchase.currency === 'GBP' ? '£' : '$'}{purchase.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(purchase.purchased_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{purchase.transaction_id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const prod = getProductById(purchase.course_id);
                      if (!prod) return null;
                      return (
                        <div className="flex flex-wrap items-center gap-2">
                          {prod.pdfUrl && (
                            <a
                              href={prod.pdfUrl}
                              download
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-colors text-xs"
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
                              className="flex items-center gap-2 px-4 py-2 bg-[#60a5fa]/20 border border-[#60a5fa]/40 hover:bg-[#60a5fa]/30 text-[#60a5fa] font-bold rounded-full transition-colors text-xs"
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
                      className="flex items-center gap-2 px-4 py-2 bg-[#60a5fa] hover:bg-[#60a5fa]/80 text-black font-bold rounded-full transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Receipt</span>
                    </button>
                    <button
                      onClick={() => deletePurchase(purchase)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-full transition-colors"
                      title="Delete purchase record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
