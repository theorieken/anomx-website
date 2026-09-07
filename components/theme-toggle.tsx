"use client";

import { useSyncExternalStore } from "react";

type ThemePreference = "dark" | "light" | "system";
type ResolvedTheme = "dark" | "light";

const storageKey = "anomx-theme-preference";

function resolveTheme(preference: ThemePreference) {
  if (preference === "light") {
    return "light";
  }

  return "dark";
}

function applyTheme(preference: ThemePreference) {
  const resolvedTheme = resolveTheme(preference);

  document.documentElement.dataset.themePreference = preference;
  document.documentElement.dataset.theme = resolvedTheme;
}

function emitThemeChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("anomx-theme-change"));
  }
}

function readPreference(): ThemePreference {
  if (typeof document === "undefined") {
    return "dark";
  }

  const value = document.documentElement.dataset.themePreference;

  return value === "light" || value === "dark" || value === "system" ? value : "dark";
}

function readResolvedTheme(): ResolvedTheme {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(listener: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const legacyMediaQuery = mediaQuery as MediaQueryList & {
    addListener?: (callback: (event: MediaQueryListEvent) => void) => void;
    removeListener?: (callback: (event: MediaQueryListEvent) => void) => void;
  };

  const handleThemeChange = () => {
    listener();
  };

  const handleSystemChange = () => {
    if (readPreference() === "system") {
      applyTheme("system");
      listener();
    }
  };

  window.addEventListener("anomx-theme-change", handleThemeChange);

  if ("addEventListener" in mediaQuery) {
    mediaQuery.addEventListener("change", handleSystemChange);
  } else if (legacyMediaQuery.addListener) {
    legacyMediaQuery.addListener(handleSystemChange);
  }

  return () => {
    window.removeEventListener("anomx-theme-change", handleThemeChange);

    if ("removeEventListener" in mediaQuery) {
      mediaQuery.removeEventListener("change", handleSystemChange);
    } else if (legacyMediaQuery.removeListener) {
      legacyMediaQuery.removeListener(handleSystemChange);
    }
  };
}

function getSnapshot() {
  return readResolvedTheme();
}

function getServerSnapshot(): ResolvedTheme {
  return "dark";
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

type ThemeToggleProps = {
  darkLabel?: string;
  label?: string;
  lightLabel?: string;
};

export function ThemeToggle({
  darkLabel = "Dark",
  label = "Theme",
  lightLabel = "Light"
}: ThemeToggleProps) {
  const theme = useTheme();

  const handleChange = (nextTheme: ResolvedTheme) => {
    applyTheme(nextTheme);

    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // Ignore storage failures and keep the current session theme.
    }

    emitThemeChange();
  };

  return (
    <div aria-label={label} className="theme-switch" role="group">
      {(["light", "dark"] as const).map((option) => (
        <button
          aria-label={option === "light" ? lightLabel : darkLabel}
          title={option === "light" ? lightLabel : darkLabel}
          aria-pressed={theme === option}
          className="theme-option"
          key={option}
          onClick={() => handleChange(option)}
          type="button"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {option === "light" ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></> : <path d="M20.7 13.3A9 9 0 0 1 10.7 3.3 9 9 0 1 0 20.7 13.3Z"/>}
          </svg>
        </button>
      ))}
    </div>
  );
}
