"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const CART_STORAGE_KEY = "bytespace-cart";
const EMPTY: readonly string[] = Object.freeze([]);

/** Module-level external store: localStorage + subscriber notification. */
let snapshot: readonly string[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

/** Lazily read localStorage on the first client snapshot request. */
function ensureHydrated() {
  if (hydrated) return;
  hydrated = true;
  snapshot = readStorage();
}

function readStorage(): readonly string[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return Object.freeze(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return EMPTY;
  }
}

function write(next: readonly string[]) {
  snapshot = Object.freeze(next);
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Storage unavailable (private mode) — cart still works in-memory.
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep tabs in sync — storage events fire in *other* tabs.
  const onStorage = () => {
    snapshot = readStorage();
    for (const notify of listeners) notify();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  ensureHydrated();
  return snapshot;
}

/** During SSR/hydration the cart is always empty (server can't read storage). */
function getServerSnapshot() {
  return EMPTY;
}

type CartContextValue = {
  /** Course ids currently in the cart, in add order. */
  ids: readonly string[];
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
 * Cart state — course ids persisted to localStorage via an external store
 * (useSyncExternalStore keeps SSR, hydration, and cross-tab tabs consistent
 * without any setState-in-effect). Drawer open/close lives here too so the
 * header button and the Enroll CTA can both drive it.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const add = useCallback((id: string) => {
    if (snapshot.includes(id)) return;
    write([...snapshot, id]);
  }, []);

  const remove = useCallback((id: string) => {
    write(snapshot.filter((existing) => existing !== id));
  }, []);

  const clear = useCallback(() => write([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      ids,
      count: ids.length,
      has: (id) => ids.includes(id),
      add,
      remove,
      clear,
      isDrawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    }),
    [ids, add, remove, clear, isDrawerOpen]
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
