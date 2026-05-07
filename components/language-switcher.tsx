"use client";

import { useSyncExternalStore } from "react";
import type { Language } from "@/lib/home-content";

const storageKey = "anomx-language";
const languages: Language[] = ["en", "de"];

function normalizeLanguage(value: string | null | undefined): Language | null {
  if (!value) {
    return null;
  }

  const normalizedValue = value.toLowerCase();

  if (normalizedValue.startsWith("de")) {
    return "de";
  }

  if (normalizedValue.startsWith("en")) {
    return "en";
  }

  return null;
}

function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") {
    return "en";
  }

  for (const language of navigator.languages ?? []) {
    const normalizedLanguage = normalizeLanguage(language);

    if (normalizedLanguage) {
      return normalizedLanguage;
    }
  }

  return normalizeLanguage(navigator.language) ?? "en";
}

function readLanguage(): Language {
  if (typeof document === "undefined") {
    return "en";
  }

  const language = normalizeLanguage(document.documentElement.dataset.language);

  return language ?? "en";
}

function applyLanguage(language: Language) {
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language;
}

function emitLanguageChange() {
  window.dispatchEvent(new Event("anomx-language-change"));
}

function subscribe(listener: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleLanguageChange = () => listener();

  window.addEventListener("anomx-language-change", handleLanguageChange);

  return () => {
    window.removeEventListener("anomx-language-change", handleLanguageChange);
  };
}

function getSnapshot() {
  return readLanguage();
}

function getServerSnapshot(): Language {
  return "en";
}

export function useLanguage() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function initializeLanguage() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const storedLanguage = normalizeLanguage(localStorage.getItem(storageKey));
    applyLanguage(storedLanguage ?? detectBrowserLanguage());
  } catch {
    applyLanguage(detectBrowserLanguage());
  }
}

type LanguageSwitcherProps = {
  englishLabel: string;
  germanLabel: string;
  label: string;
  showLabel?: boolean;
};

export function LanguageSwitcher({
  englishLabel,
  germanLabel,
  label,
  showLabel = true
}: LanguageSwitcherProps) {
  const language = useLanguage();

  const handleChange = (nextLanguage: Language) => {
    applyLanguage(nextLanguage);

    try {
      localStorage.setItem(storageKey, nextLanguage);
    } catch {
      // Keep the selected language for the current page view.
    }

    emitLanguageChange();
  };

  return (
    <fieldset
      aria-label={label}
      className={`language-switcher${showLabel ? "" : " language-switcher-unlabeled"}`}
    >
      <legend>{label}</legend>
      <div className="language-options">
        {languages.map((option) => (
          <button
            aria-pressed={language === option}
            className="language-option"
            key={option}
            onClick={() => handleChange(option)}
            type="button"
          >
            {option === "en" ? englishLabel : germanLabel}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
