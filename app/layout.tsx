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
  applicationName: "Anomx",
  alternates: {
    canonical: "/"
  },
  category: "technology",
  creator: "Anomx",
  description:
    "Anomx is a System Intelligence platform that detects abnormal behavior across live data streams, explains what changed, and helps teams act before deviations become critical.",
  keywords: [
    "Anomx",
    "System Intelligence",
    "anomaly detection",
    "predictive maintenance",
    "operational intelligence",
    "DESY",
    "time-series monitoring"
  ],
  metadataBase: new URL("https://anomx.io"),
  openGraph: {
    description:
      "Understand your system before it fails. Anomx detects abnormal behavior across live data streams and explains what changed.",
    images: [
      {
        alt: "Anomx System Intelligence platform preview",
        height: 1278,
        url: "/images/og-image.jpg",
        width: 1920
      }
    ],
    locale: "en_US",
    siteName: "Anomx",
    title: "Anomx | The Platform for System Intelligence",
    type: "website",
    url: "/",
    videos: [
      {
        height: 1080,
        type: "video/mp4",
        url: "https://anomx.io/video/anomix-dark-hd.mp4",
        width: 1920
      }
    ]
  },
  publisher: "Anomx",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    },
    index: true
  },
  title: {
    default: "Anomx | The Platform for System Intelligence",
    template: "%s | Anomx"
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Detect abnormal behavior across live data streams, explain what changed, and act before small deviations become critical.",
    images: ["/images/og-image.jpg"],
    title: "Anomx | The Platform for System Intelligence"
  }
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
