import { useCallback, useEffect, useState } from "react";

const THEME_KEY = "theme";

function getInitialTheme(): "light" | "dark" {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  // Keep the <html> class in sync with the current theme.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Follow OS preference changes until the user picks a theme explicitly.
  useEffect(() => {
    if (localStorage.getItem(THEME_KEY)) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      // Only persist an explicit user choice; system preference stays dynamic.
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
