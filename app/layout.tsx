import type { Metadata, Viewport } from "next";
import "./globals.css";

const themeScript = `
  (() => {
    const storageKey = "anomx-theme-preference";
    const languageStorageKey = "anomx-language";
    const validPreferences = new Set(["system", "light", "dark"]);

    const normalizeLanguage = (value) => {
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
    };

    const detectLanguage = () => {
      for (const language of navigator.languages || []) {
        const normalizedLanguage = normalizeLanguage(language);

        if (normalizedLanguage) {
          return normalizedLanguage;
        }
      }

      return normalizeLanguage(navigator.language) || "en";
    };

    const resolveTheme = (preference) => {
      if (preference === "dark" || preference === "light") {
        return preference;
      }

      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    try {
      const storedPreference = localStorage.getItem(storageKey);
      const preference = validPreferences.has(storedPreference) ? storedPreference : "system";
      const resolvedTheme = resolveTheme(preference);

      document.documentElement.dataset.themePreference = preference;
      document.documentElement.dataset.theme = resolvedTheme;

      const storedLanguage = normalizeLanguage(localStorage.getItem(languageStorageKey));
      const language = storedLanguage || detectLanguage();

      document.documentElement.dataset.language = language;
      document.documentElement.lang = language;
    } catch {
      document.documentElement.dataset.themePreference = "system";
      document.documentElement.dataset.theme = resolveTheme("system");
      document.documentElement.dataset.language = detectLanguage();
      document.documentElement.lang = document.documentElement.dataset.language;
    }
  })();
`;

export const metadata: Metadata = {
  title: "Anomx | System Intelligence",
  description:
    "Anomx is a real-time System Intelligence platform for anomaly detection, predictive insight, and confident decision-making in complex systems."
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f8fcff"
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#000000"
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
