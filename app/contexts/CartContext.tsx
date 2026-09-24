"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { Course } from "../data/courses";

export interface CartItem extends Course {
  quantity: number;
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

const normalizeId = (id: string | number): string => {
  return String(id).trim().replace(/^store-/, "");
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [cartTimestamp, setCartTimestamp] = useState<number | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedCart = localStorage.getItem("origin_cart");
      const savedTimestamp = localStorage.getItem("origin_cart_timestamp");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          // Ensure every item has a valid positive quantity
          const sanitized = parsed.map((item: CartItem) => ({
            ...item,
            quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
          }));
          setCart(sanitized);
        }
      }
      if (savedTimestamp) {
        setCartTimestamp(parseInt(savedTimestamp, 10));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("origin_cart", JSON.stringify(cart));
        const now = Date.now();
        localStorage.setItem("origin_cart_timestamp", now.toString());
        setCartTimestamp(now);
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [cart, mounted]);

  const getItemQuantity = useCallback((courseId: string | number): number => {
    const targetNorm = normalizeId(courseId);
    const item = cart.find((i) => normalizeId(i.id) === targetNorm);
    return item ? item.quantity : 0;
  }, [cart]);

  const isInCart = useCallback((courseId: string | number): boolean => {
    return getItemQuantity(courseId) > 0;
  }, [getItemQuantity]);

  const addToCart = useCallback((course: Course, quantity: number = 1) => {
    const qtyToAdd = Math.max(1, quantity);
    setCart((prevCart) => {
      const targetNorm = normalizeId(course.id);
      const existingIndex = prevCart.findIndex((item) => normalizeId(item.id) === targetNorm && !item.isGift);

      if (existingIndex > -1) {
        return prevCart.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + qtyToAdd } : item
        );
      }
      return [...prevCart, { ...course, quantity: qtyToAdd }];
    });
  }, []);

  const updateQuantity = useCallback((courseId: string | number, quantity: number) => {
    const targetNorm = normalizeId(courseId);
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => normalizeId(item.id) !== targetNorm);
      }
      return prevCart.map((item) =>
        normalizeId(item.id) === targetNorm ? { ...item, quantity } : item
      );
    });
  }, []);

  const incrementQuantity = useCallback((courseId: string | number) => {
    const targetNorm = normalizeId(courseId);
    setCart((prevCart) =>
      prevCart.map((item) =>
        normalizeId(item.id) === targetNorm ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decrementQuantity = useCallback((courseId: string | number) => {
    const targetNorm = normalizeId(courseId);
    setCart((prevCart) => {
      const existing = prevCart.find((item) => normalizeId(item.id) === targetNorm);
      if (!existing) return prevCart;

      if (existing.quantity <= 1) {
        return prevCart.filter((item) => normalizeId(item.id) !== targetNorm);
      }
      return prevCart.map((item) =>
        normalizeId(item.id) === targetNorm ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((courseId: string | number) => {
    const targetNorm = normalizeId(courseId);
    setCart((prevCart) => prevCart.filter((item) => normalizeId(item.id) !== targetNorm));
  }, []);

  const removePurchasedItems = useCallback((purchasedIds: (string | number)[]) => {
    const normSet = new Set(purchasedIds.map(normalizeId));
    setCart((prevCart) => prevCart.filter((item) => !normSet.has(normalizeId(item.id))));
  }, []);

  const addGiftToCart = useCallback((course: Course, recipientEmail: string, recipientName?: string, giftMessage?: string) => {
    setCart((prevCart) => {
      const targetNorm = normalizeId(course.id);
      const existingItem = prevCart.find((item) => normalizeId(item.id) === targetNorm && item.isGift && item.recipientEmail === recipientEmail);
      if (existingItem) {
        return prevCart.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + 1, recipientEmail, recipientName, giftMessage }
            : item
        );
      }
      return [...prevCart, { ...course, quantity: 1, isGift: true, recipientEmail, recipientName, giftMessage }];
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Accurate monetary totals reflecting quantity and local NGN overrides
  const cartTotal = cart.reduce((total, item) => total + (item.priceUSD || 0) * item.quantity, 0);
  const cartTotalNGN = cart.reduce((total, item) => {
    const unitPriceNGN = item.priceNGN !== undefined ? item.priceNGN : (item.priceUSD || 0) * 1500;
    return total + unitPriceNGN * item.quantity;
  }, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const uniqueCount = cart.length;

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
        mounted,
        cartTimestamp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
