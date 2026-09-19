import { useCallback, useEffect, useState } from "react";

const KEY = "theme";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(KEY, theme);
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return { theme, toggle };
}
