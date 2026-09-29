import {
  DEFAULT_THEME_MODE,
  THEME_STORAGE_KEY,
  type Theme,
  type ThemeMode,
} from "@/lib/theme";

/**
 * External store backing the ThemeProvider.
 *
 * Theme state lives outside React (localStorage + the OS media query), so it
 * is read through `useSyncExternalStore` in the provider — no effects, no
 * setState cascades, hydration-safe server snapshots, and free cross-tab sync.
 */

export type ThemeState = { mode: ThemeMode; resolved: Theme };

const listeners = new Set<() => void>();

let current: ThemeState = { mode: DEFAULT_THEME_MODE, resolved: "light" };
let initialized = false;

function readStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : DEFAULT_THEME_MODE;
  } catch {
    return DEFAULT_THEME_MODE;
  }
}

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolve(mode: ThemeMode): ThemeState {
  return { mode, resolved: mode === "system" ? systemTheme() : mode };
}

function ensureInitialized() {
  if (initialized) return;
  initialized = true;
  current = resolve(readStoredMode());
  applyToDocument(current);
}

function emit() {
  for (const listener of listeners) listener();
}

/**
 * Reflect the resolved theme onto <html> (the `dark` class + colorScheme).
 * This is what actually switches the visuals — the inline init script only
 * covers first paint, so every later state change must re-apply it here.
 */
function applyToDocument(state: ThemeState): void {
  if (typeof document === "undefined") return;
  const dark = state.resolved === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

/** Single mutation path: update state, reflect to DOM, notify subscribers. */
function commit(next: ThemeState): void {
  current = next;
  applyToDocument(current);
  emit();
}

/** Subscribe to theme changes (media query + cross-tab storage events). */
export function subscribeTheme(onStoreChange: () => void): () => void {
  ensureInitialized();
  // Re-sync with localStorage on every subscription: same-window writes do
  // not fire `storage` events, so a remounting provider must re-read itself.
  commit(resolve(readStoredMode()));

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (current.mode !== "system") return;
    commit(resolve("system"));
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    commit(resolve(readStoredMode()));
  };

  listeners.add(onStoreChange);
  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onStoreChange);
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Client snapshot of the current theme state. */
export function getThemeSnapshot(): ThemeState {
  ensureInitialized();
  return current;
}

/**
 * Server/hydration snapshot — a single cached, frozen object. React requires
 * getServerSnapshot to return a stable reference. Components render the
 * default mode until hydrated, which matches the no-FOUC inline script that
 * sets the visual theme class on <html> before React loads.
 */
const SERVER_SNAPSHOT: Readonly<ThemeState> = Object.freeze({
  mode: DEFAULT_THEME_MODE,
  resolved: "light",
});

export function getThemeServerSnapshot(): Readonly<ThemeState> {
  return SERVER_SNAPSHOT;
}

/** Set the user's mode choice, persist it, and apply it to the document. */
export function setThemeMode(mode: ThemeMode): void {
  ensureInitialized();
  try {
    if (mode === "system") {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
  } catch {
    // Storage unavailable (private mode, etc.) — session-only theme.
  }
  commit(resolve(mode));
}
