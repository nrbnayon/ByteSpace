"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Theme, ThemeMode } from "@/lib/theme";
import {
  getThemeServerSnapshot,
  getThemeSnapshot,
  setThemeMode,
  subscribeTheme,
} from "@/components/theme/theme-store";

type ThemeContextValue = {
  /** The user-facing setting: light, dark, or system (default: light). */
  mode: ThemeMode;
  /** The theme actually applied to <html> right now. */
  resolvedTheme: Theme;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const value = useMemo(
    () => ({
      mode: state.mode,
      resolvedTheme: state.resolved,
      setMode: setThemeMode,
    }),
    [state.mode, state.resolved]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
