import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./experience.css";
import "./expanded-experience.css";

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
      if (preference === "light") {
        return "light";
      }

      return "dark";
    };

    try {
      const storedPreference = localStorage.getItem(storageKey);
      const preference = validPreferences.has(storedPreference) ? storedPreference : "dark";
      const resolvedTheme = resolveTheme(preference);

      document.documentElement.dataset.themePreference = preference;
      document.documentElement.dataset.theme = resolvedTheme;

      const storedLanguage = normalizeLanguage(localStorage.getItem(languageStorageKey));
      const language = storedLanguage || detectLanguage();

      document.documentElement.dataset.language = language;
      document.documentElement.lang = language;
    } catch {
      document.documentElement.dataset.themePreference = "dark";
      document.documentElement.dataset.theme = "dark";
      document.documentElement.dataset.language = detectLanguage();
      document.documentElement.lang = document.documentElement.dataset.language;
    }
  })();
`;

const description = "Anomx is the AI layer for autonomous systems. Background agents connect anomaly detection, forecasting, and operational context to investigate change and support action.";

export const metadata: Metadata = {
  applicationName: "Anomx",
  metadataBase: new URL("https://anomx.io"),
  alternates: { canonical: "/" },
  category: "technology",
  creator: "Anomx",
  publisher: "Anomx",
  description,
  title: { default: "Anomx | Intelligence for Autonomous Systems", template: "%s | Anomx" },
  icons: { icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }] },
  openGraph: {
    title: "Anomx | Intelligence for Autonomous Systems",
    description,
    url: "/",
    siteName: "Anomx",
    type: "website",
    locale: "en_US",
    alternateLocale: "de_DE",
    images: [{ url: "/media/intelligence-sculpture.webp", width: 1920, height: 1081, alt: "Anomx — a luminous signal sculpture representing system intelligence" }]
  },
  twitter: { card: "summary_large_image", title: "Anomx | Intelligence for Autonomous Systems", description, images: ["/media/intelligence-sculpture.webp"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff"
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
