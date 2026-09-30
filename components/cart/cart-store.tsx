"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const CART_STORAGE_KEY = "bytespace-cart";

type CartContextValue = {
  /** Course ids currently in the cart, in add order. */
  ids: readonly string[];
  /** Count safe to render after mount (avoids SSR/localStorage mismatch). */
  count: number;
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Cart state — course ids persisted to localStorage so the basket survives
 * reloads. Drawer open/close lives here too so the header button and the
 * Enroll CTA can both drive it.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<readonly string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Load once after mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setIds(parsed.filter((id): id is string => typeof id === "string"));
        }
      }
    } catch {
      // Corrupt storage — start clean.
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Storage unavailable (private mode) — cart still works in-memory.
    }
  }, [ids, hydrated]);

  const add = useCallback((id: string) => {
    setIds((current) => (current.includes(id) ? current : [...current, id]));
  }, []);

  const remove = useCallback((id: string) => {
    setIds((current) => current.filter((existing) => existing !== id));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      ids,
      count: hydrated ? ids.length : 0,
      has: (id) => ids.includes(id),
      add,
      remove,
      clear,
      isDrawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    }),
    [ids, hydrated, add, remove, clear, isDrawerOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
