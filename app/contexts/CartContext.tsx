"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from "react";
import { Course } from "../data/courses";

export interface CartItem extends Course {
  quantity: number;
  price?: number;
  isGift?: boolean;
  recipientEmail?: string;
  recipientName?: string;
  giftMessage?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (course: Course, quantity?: number) => void;
  addGiftToCart: (course: Course, recipientEmail: string, recipientName?: string, giftMessage?: string) => void;
  updateQuantity: (courseId: string | number, quantity: number) => void;
  incrementQuantity: (courseId: string | number) => void;
  decrementQuantity: (courseId: string | number) => void;
  removeFromCart: (courseId: string | number) => void;
  removePurchasedItems: (purchasedIds: (string | number)[]) => void;
  clearCart: () => void;
  getItemQuantity: (courseId: string | number) => number;
  isInCart: (courseId: string | number) => boolean;
  cartTotal: number;
  cartTotalNGN: number;
  cartCount: number;
  uniqueCount: number;
  totalUnits: number;
  mounted: boolean;
  cartTimestamp: number | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

const normalizeId = (id: string | number | undefined | null): string => {
  if (id === undefined || id === null) return "";
  const raw = String(id).trim().toLowerCase().replace(/^store-/, "").replace(/^pref-/, "");
  if (raw === "money-farming") return "7";
  if (raw === "house-of-choice") return "9";
  if (raw === "8-qa-to-selling" || raw === "8-qa") return "8";
  if (raw === "deep-remake") return "10";
  if (raw === "architecture-of-becoming") return "4";
  return raw;
};

const consolidateCartItems = (rawItems: any[]): CartItem[] => {
  if (!Array.isArray(rawItems)) return [];
  const consolidated: CartItem[] = [];

  for (const raw of rawItems) {
    if (!raw || raw.id === undefined || raw.id === null) continue;
    const normId = normalizeId(raw.id);
    if (!normId) continue;

    const rawNum = Number(raw.quantity);
    const qty = !Number.isNaN(rawNum) && rawNum > 0 ? Math.max(1, Math.round(rawNum)) : 1;
    const isGift = Boolean(raw.isGift);
    const recipientEmail = raw.recipientEmail || "";

    const existingIdx = consolidated.findIndex(
      (c) => normalizeId(c.id) === normId && Boolean(c.isGift) === isGift && (c.recipientEmail || "") === recipientEmail
    );

    if (existingIdx > -1) {
      const prevQty = Number(consolidated[existingIdx].quantity) || 1;
      consolidated[existingIdx].quantity = prevQty + qty;
    } else {
      consolidated.push({
        ...raw,
        id: normId,
        title: raw.title || raw.name || "Learning Item",
        price: Number(raw.price) || 0,
        priceUSD: Number(raw.priceUSD ?? raw.price) || 0,
        priceNGN: raw.priceNGN !== undefined ? Number(raw.priceNGN) : Math.round((Number(raw.price) || 0) * 1500),
        quantity: qty,
      });
    }
  }

  return consolidated;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [cartTimestamp, setCartTimestamp] = useState<number | null>(null);
  const isLoadedRef = useRef(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("origin_cart");
      const savedTimestamp = localStorage.getItem("origin_cart_timestamp");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        const consolidated = consolidateCartItems(parsed);
        setCart(consolidated);
      }
      if (savedTimestamp) {
        setCartTimestamp(parseInt(savedTimestamp, 10));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      isLoadedRef.current = true;
      setMounted(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes, strictly after mount load
  useEffect(() => {
    if (!isLoadedRef.current) return;
    try {
      localStorage.setItem("origin_cart", JSON.stringify(cart));
      const now = Date.now();
      localStorage.setItem("origin_cart_timestamp", now.toString());
      setCartTimestamp(now);
      window.dispatchEvent(new Event("origin_cart_updated"));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  // Sync across tabs or custom update events
  useEffect(() => {
    const handleStorageUpdate = (e?: Event) => {
      if (e && "key" in e && (e as StorageEvent).key && (e as StorageEvent).key !== "origin_cart") return;
      try {
        const saved = localStorage.getItem("origin_cart");
        if (saved) {
          const parsed = JSON.parse(saved);
          const consolidated = consolidateCartItems(parsed);
          setCart((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(consolidated)) {
              return consolidated;
            }
            return prev;
          });
        }
      } catch (err) {
        console.error("Error syncing cart", err);
      }
    };

    window.addEventListener("storage", handleStorageUpdate as EventListener);
    window.addEventListener("origin_cart_updated", handleStorageUpdate as EventListener);
    return () => {
      window.removeEventListener("storage", handleStorageUpdate as EventListener);
      window.removeEventListener("origin_cart_updated", handleStorageUpdate as EventListener);
    };
  }, []);

  const getItemQuantity = useCallback((courseId: string | number): number => {
    const targetNorm = normalizeId(courseId);
    if (!targetNorm) return 0;
    const matching = cart.filter((i) => normalizeId(i.id) === targetNorm);
    if (matching.length === 0) return 0;
    return matching.reduce((sum, item) => sum + Math.max(0, Math.round(Number(item.quantity) || 0)), 0);
  }, [cart]);

  const isInCart = useCallback((courseId: string | number): boolean => {
    return getItemQuantity(courseId) > 0;
  }, [getItemQuantity]);

  const addToCart = useCallback((course: Course, quantity: number = 1) => {
    const qtyToAdd = Math.max(1, Math.round(Number(quantity) || 1));
    const effectivePrice = Number((course as any).price ?? course.priceUSD) || 0;
    setCart((prevCart) => {
      const targetNorm = normalizeId(course.id);
      if (!targetNorm) return prevCart;
      const existingIndex = prevCart.findIndex((item) => normalizeId(item.id) === targetNorm && !item.isGift);

      if (existingIndex > -1) {
        return prevCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: Math.max(1, (Number(item.quantity) || 0) + qtyToAdd) }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...course,
          id: targetNorm,
          title: course.title || (course as any).name || "Learning Item",
          price: effectivePrice,
          priceUSD: Number(course.priceUSD ?? effectivePrice) || 0,
          priceNGN: course.priceNGN !== undefined ? Number(course.priceNGN) : Math.round(effectivePrice * 1500),
          quantity: qtyToAdd,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((courseId: string | number, quantity: number) => {
    const targetNorm = normalizeId(courseId);
    if (!targetNorm) return;
    const safeQty = Math.max(0, Math.round(Number(quantity) || 0));
    setCart((prevCart) => {
      if (safeQty <= 0) {
        return prevCart.filter((item) => normalizeId(item.id) !== targetNorm);
      }
      const existingIndex = prevCart.findIndex((item) => normalizeId(item.id) === targetNorm && !item.isGift);
      const targetIdx = existingIndex > -1 ? existingIndex : prevCart.findIndex((item) => normalizeId(item.id) === targetNorm);
      if (targetIdx > -1) {
        return prevCart.map((item, idx) =>
          idx === targetIdx ? { ...item, quantity: safeQty } : item
        );
      }
      return prevCart;
    });
  }, []);

  const incrementQuantity = useCallback((courseId: string | number) => {
    const targetNorm = normalizeId(courseId);
    if (!targetNorm) return;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => normalizeId(item.id) === targetNorm && !item.isGift);
      const targetIdx = existingIndex > -1 ? existingIndex : prevCart.findIndex((item) => normalizeId(item.id) === targetNorm);
      if (targetIdx > -1) {
        return prevCart.map((item, idx) =>
          idx === targetIdx
            ? { ...item, quantity: Math.max(1, (Number(item.quantity) || 0) + 1) }
            : item
        );
      }
      return prevCart;
    });
  }, []);

  const decrementQuantity = useCallback((courseId: string | number) => {
    const targetNorm = normalizeId(courseId);
    if (!targetNorm) return;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => normalizeId(item.id) === targetNorm && !item.isGift);
      const targetIdx = existingIndex > -1 ? existingIndex : prevCart.findIndex((item) => normalizeId(item.id) === targetNorm);
      if (targetIdx === -1) return prevCart;

      const currentItem = prevCart[targetIdx];
      const curQty = Math.round(Number(currentItem.quantity) || 1);
      if (curQty <= 1) {
        return prevCart.filter((_, idx) => idx !== targetIdx);
      }
      return prevCart.map((item, idx) =>
        idx === targetIdx ? { ...item, quantity: Math.max(1, curQty - 1) } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((courseId: string | number) => {
    const targetNorm = normalizeId(courseId);
    if (!targetNorm) return;
    setCart((prevCart) => prevCart.filter((item) => normalizeId(item.id) !== targetNorm));
  }, []);

  const removePurchasedItems = useCallback((purchasedIds: (string | number)[]) => {
    const normSet = new Set(purchasedIds.map(normalizeId).filter(Boolean));
    setCart((prevCart) => prevCart.filter((item) => !normSet.has(normalizeId(item.id))));
  }, []);

  const addGiftToCart = useCallback((course: Course, recipientEmail: string, recipientName?: string, giftMessage?: string) => {
    const effectivePrice = Number((course as any).price ?? course.priceUSD) || 0;
    setCart((prevCart) => {
      const targetNorm = normalizeId(course.id);
      if (!targetNorm) return prevCart;
      const existingItem = prevCart.find((item) => normalizeId(item.id) === targetNorm && item.isGift && item.recipientEmail === recipientEmail);
      if (existingItem) {
        return prevCart.map((item) =>
          item === existingItem
            ? { ...item, quantity: (Number(item.quantity) || 1) + 1, recipientEmail, recipientName, giftMessage }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...course,
          id: targetNorm,
          title: course.title || (course as any).name || "Learning Item",
          price: effectivePrice,
          priceUSD: Number(course.priceUSD ?? effectivePrice) || 0,
          priceNGN: course.priceNGN !== undefined ? Number(course.priceNGN) : Math.round(effectivePrice * 1500),
          quantity: 1,
          isGift: true,
          recipientEmail,
          recipientName,
          giftMessage,
        },
      ];
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Accurate monetary totals reflecting quantity and local NGN overrides
  const cartTotal = cart.reduce((total, item) => total + (Number(item.priceUSD) || 0) * (Number(item.quantity) || 1), 0);
  const cartTotalNGN = cart.reduce((total, item) => {
    const unitPriceNGN = item.priceNGN !== undefined ? Number(item.priceNGN) || 0 : (Number(item.priceUSD) || 0) * 1500;
    return total + unitPriceNGN * (Number(item.quantity) || 1);
  }, 0);
  // Distinct product count
  const cartCount = cart.length;
  const uniqueCount = cart.length;
  // Total aggregate units across all products in cart
  const totalUnits = cart.reduce((count, item) => count + Math.max(1, Math.round(Number(item.quantity) || 1)), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addGiftToCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        removePurchasedItems,
        clearCart,
        getItemQuantity,
        isInCart,
        cartTotal,
        cartTotalNGN,
        cartCount,
        uniqueCount,
        totalUnits,
        mounted,
        cartTimestamp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
