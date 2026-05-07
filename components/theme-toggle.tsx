"use client";

import { useSyncExternalStore } from "react";

type ThemePreference = "dark" | "light" | "system";
type ResolvedTheme = "dark" | "light";

const storageKey = "anomx-theme-preference";

function resolveTheme(preference: ThemePreference) {
  if (preference === "light" || preference === "dark") {
    return preference;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
    return "system";
  }

  const value = document.documentElement.dataset.themePreference;

  return value === "light" || value === "dark" || value === "system" ? value : "system";
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
  return "light";
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
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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
          aria-pressed={theme === option}
          className="theme-option"
          key={option}
          onClick={() => handleChange(option)}
          type="button"
        >
          {option === "light" ? lightLabel : darkLabel}
        </button>
      ))}
    </div>
  );
}
