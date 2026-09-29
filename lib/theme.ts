export type Theme = "light" | "dark";
export type ThemeMode = Theme | "system";

export const THEME_STORAGE_KEY = "bytespace-theme";

/** Applied when the visitor has never chosen a theme. */
export const DEFAULT_THEME_MODE: ThemeMode = "light";

/**
 * Runs before paint (injected in <head>) so the resolved theme class is on
 * <html> from the very first frame — no flash of the wrong theme.
 *
 * Default is light; the stored value always wins, and "system" resolves
 * against the OS preference at load time.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var mode = stored === "dark" || stored === "system" ? stored : "${DEFAULT_THEME_MODE}";
    var dark =
      mode === "dark" ||
      (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {}
})();
`;
