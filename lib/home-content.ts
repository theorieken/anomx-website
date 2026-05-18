export type Language = "de" | "en";

export type LocalizedText = Record<Language, string>;

export type CardVisualVariant =
  | "abnormal-detection"
  | "changed-context"
  | "connect-sources"
  | "data-agnostic"
  | "data-enterprise"
  | "edge-compute"
  | "energy-infrastructure"
  | "enterprise-foundation"
  | "explain-signal"
  | "explainable-findings"
  | "focused-start"
  | "guide-step"
  | "high-dimensional"
  | "human-control"
  | "industrial-ops"
  | "modular-connectors"
  | "operational-memory"
  | "operational-pain"
  | "operator-workspace"
  | "predict-next"
  | "realtime-design"
  | "repeatable-workflows"
  | "research-facilities"
  | "technical-depth"
  | "detect-change";

export type SliderCard = {
  body: LocalizedText;
  title: LocalizedText;
  visual: CardVisualVariant;
};

export type GridCard = {
  body: LocalizedText;
  size: "compact" | "standard" | "wide";
  title: LocalizedText;
  visual: CardVisualVariant;
};

export type UseCaseCard = {
  body: LocalizedText;
  title: LocalizedText;
  visual: CardVisualVariant;
};

export type PlatformRow = {
  body: LocalizedText;
  label: LocalizedText;
};

export const homeCopy = {
  de: {
    nav: {
      product: "Produkt",
      platform: "Plattform",
      useCases: "Anwendungsfälle",
      earlyAccess: "Early Access"
    },
    actions: {
      joinWaitlist: "Warteliste beitreten",
      logIn: "Log in",
      menu: "Menü",
      talkToUs: "Kontakt aufnehmen"
    },
    hero: {
      title: "The Platform for System Intelligence",
      subtitle:
        "Verstehen Sie Ihr System, bevor es ausfällt. Anomx erkennt abnormales Verhalten in Live-Datenströmen, erklärt, was sich verändert hat, und hilft Teams zu handeln, bevor kleine Abweichungen kritisch werden."
    },
    sections: {
      signal: {
        titlePrimary: "Eine Ebene über jedem Stream, Modell und jeder Maschine.",
        titleSecondary: "Vom Signal zur Handlung."
      },
      complex: {
        title: "Gebaut für Systeme, die zu komplex für statische Dashboards sind."
      },
      intelligence: {
        titlePrimary: "System Intelligence",
        titleSecondary: "In Ihrer gesamten Operation."
      },
      platform: {
        titlePrimary: "Eine Intelligenzschicht.",
        titleSecondary: "Jedes operative Signal."
      },
      validation: {
        title:
          "Entwickelt aus Umgebungen, in denen späte Erkennung nicht akzeptabel ist."
      },
      useCases: {
        titlePrimary: "Für Teams, bei denen Abweichungen zählen.",
        titleSecondary: "Über Maschinen, Streams und Operationen hinweg."
      },
      whyNow: {
        title: "Die Dashboard-Ära reicht nicht mehr."
      },
      earlyAccess: {
        title: "Sehen Sie, was Ihr System Ihnen sagen will."
      }
    },
    footer: {
      description:
        "Real-time System Intelligence für komplexe operative Systeme.",
      madeAt: "Made in Hamburg",
      product: "Produkt",
      company: "Unternehmen",
      contact: "Kontakt",
      configuration: "Konfiguration",
      about: "Über Anomx",
      legal: "Rechtliches",
      language: "Sprache",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      english: "Englisch",
      german: "Deutsch",
      copyright: "© 2026 Anomx. Alle Rechte vorbehalten."
    },
    waitlist: {
      buttonLabel: "Warteliste beitreten",
      company: "Unternehmen",
      companyPlaceholder: "Analytical Systems GmbH",
      email: "Geschäftliche E-Mail",
      emailPlaceholder: "ada@unternehmen.de",
      fullName: "Vollständiger Name",
      fullNamePlaceholder: "Ada Lovelace",
      pending: "Wird gesendet...",
      useCase: "Anwendungsfall",
      useCasePlaceholder:
        "Welche Art von Anomalieerkennung oder Predictive Workflow evaluieren Sie?",
      error:
        "Beim Senden der Anfrage ist etwas schiefgelaufen. Bitte versuchen Sie es erneut.",
      success: "Danke. Ihre Anfrage wurde empfangen.",
      website: "Website"
    }
  },
  en: {
    nav: {
      product: "Product",
      platform: "Platform",
      useCases: "Use Cases",
      earlyAccess: "Early Access"
    },
    actions: {
      joinWaitlist: "Join the Waitlist",
      logIn: "Log in",
      menu: "Menu",
      talkToUs: "Talk to Us"
    },
    hero: {
      title: "The Platform for System Intelligence",
      subtitle:
        "Understand your system before it fails. Anomx detects abnormal behavior across live data streams, explains what changed, and helps teams act before small deviations become critical."
    },
    sections: {
      signal: {
        titlePrimary: "One Layer above Every Stream, Model, and Machine.",
        titleSecondary: "From Signal to Action."
      },
      complex: {
        title: "Built for Systems too Complex for Static Dashboards."
      },
      intelligence: {
        titlePrimary: "System Intelligence",
        titleSecondary: "Across your entire operation."
      },
      platform: {
        titlePrimary: "One intelligence layer.",
        titleSecondary: "Every operational signal."
      },
      validation: {
        title: "Developed from environments where late detection is not acceptable."
      },
      useCases: {
        titlePrimary: "For teams where abnormal matters.",
        titleSecondary: "Across machines, streams, and operations."
      },
      whyNow: {
        title: "The Dashboard Era is not Enough."
      },
      earlyAccess: {
        title: "See what Your System is Trying to Tell You."
      }
    },
    footer: {
      description:
        "Real-time System Intelligence for complex operational systems.",
      madeAt: "Made in Hamburg",
      product: "Product",
      company: "Company",
      contact: "Contact",
      configuration: "Configuration",
      about: "About",
      legal: "Legal",
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      english: "English",
      german: "German",
      copyright: "© 2026 Anomx. All rights reserved."
    },
    waitlist: {
      buttonLabel: "Join the Waitlist",
      company: "Company",
      companyPlaceholder: "Analytical Systems GmbH",
      email: "Work email",
      emailPlaceholder: "ada@company.com",
      fullName: "Full name",
      fullNamePlaceholder: "Ada Lovelace",
      pending: "Sending...",
      useCase: "Use case",
      useCasePlaceholder:
        "What kind of anomaly detection or predictive workflow are you evaluating?",
      error:
        "Something went wrong while sending your request. Please try again.",
      success: "Thanks. Your request has been received.",
      website: "Website"
    }
  }
} as const;

export const sliderCards: SliderCard[] = [
  {
    title: {
      de: "Jede Quelle verbinden.",
      en: "Connect Any Source."
    },
    body: {
      de: "Live-Streams, historische Daten, Dateien, Kontrollsysteme, Datenbanken und eigene Pipelines zusammenführen.",
      en: "Bring together live streams, historical records, files, control systems, databases, and custom pipelines."
    },
    visual: "connect-sources"
  },
  {
    title: {
      de: "Erkennen, was sich verändert hat.",
      en: "Detect What Changed."
    },
    body: {
      de: "Abnormales Verhalten in hochdimensionalen Zeitreihen finden, bevor es im Dashboard offensichtlich wird.",
      en: "Find abnormal behavior across high-dimensional time-series before it becomes obvious on a dashboard."
    },
    visual: "detect-change"
  },
  {
    title: {
      de: "Das Signal erklären.",
      en: "Explain the Signal."
    },
    body: {
      de: "Die Kanäle, Kontexte und aktuellen Veränderungen sichtbar machen, die für ein Ereignis entscheidend sind.",
      en: "Surface the channels, context, and recent changes that matter most to the event."
    },
    visual: "explain-signal"
  },
  {
    title: {
      de: "Vorhersagen, was als Nächstes passieren kann.",
      en: "Predict What May Happen Next."
    },
    body: {
      de: "Modelle und historisches Verhalten nutzen, um mögliche Entwicklungen zu verstehen, nicht nur den aktuellen Zustand.",
      en: "Use models and historical behavior to understand possible outcomes, not just current state."
    },
    visual: "predict-next"
  },
  {
    title: {
      de: "Den nächsten Schritt führen.",
      en: "Guide the Next Step."
    },
    body: {
      de: "Findings in Operator-Review, KI-gestützte Workflows, Tickets, Reports oder Folgejobs überführen.",
      en: "Turn findings into operator review, AI-assisted workflows, tickets, reports, or follow-up jobs."
    },
    visual: "guide-step"
  },
  {
    title: {
      de: "Menschen in Kontrolle halten.",
      en: "Keep Humans in Control."
    },
    body: {
      de: "Expertinnen und Experten bestätigen, annotieren und verfeinern Findings, damit das System mit Betriebswissen besser wird.",
      en: "Let experts confirm, annotate, and refine findings so the system improves with operational knowledge."
    },
    visual: "human-control"
  }
];

export const complexSystemsCards: GridCard[] = [
  {
    title: {
      de: "Real-time by design",
      en: "Real-Time by Design"
    },
    body: {
      de: "Live-Streams analysieren, während sie sich verändern, nicht erst Stunden nach dem Ereignis.",
      en: "Analyze live operational streams as they change, not hours after the event."
    },
    visual: "realtime-design",
    size: "wide"
  },
  {
    title: {
      de: "Datenagnostisch",
      en: "Data-Agnostic"
    },
    body: {
      de: "Heterogene Quellen nutzen, ohne jedes Team in ein starres Datenmodell zu zwingen.",
      en: "Work across heterogeneous sources without forcing every team into one rigid data model."
    },
    visual: "data-agnostic",
    size: "wide"
  },
  {
    title: {
      de: "Hochdimensionale Aufmerksamkeit",
      en: "High-Dimensional Awareness"
    },
    body: {
      de: "Muster erkennen, die über viele Kanäle entstehen, nicht nur einzelne Schwellenwertbrüche.",
      en: "Detect patterns that emerge across many channels, not only single-metric threshold breaks."
    },
    visual: "high-dimensional",
    size: "standard"
  },
  {
    title: {
      de: "Erklärbare Findings",
      en: "Explainable Findings"
    },
    body: {
      de: "Von \"etwas stimmt nicht\" zu \"das hat sich verändert, deshalb ist es relevant\" wechseln.",
      en: "Move from \"something is wrong\" to \"this changed, here is why it matters.\""
    },
    visual: "explainable-findings",
    size: "standard"
  },
  {
    title: {
      de: "Enterprise-ready Foundation",
      en: "Enterprise-Ready Foundation"
    },
    body: {
      de: "Organisationen, Nutzer, Integrationen, Jobs, Dateien, Benachrichtigungen, Audit Logs und Systemobjekte gehören zum Plattformmodell.",
      en: "Organizations, users, integrations, jobs, files, notifications, audit logs, and system objects are part of the platform model."
    },
    visual: "enterprise-foundation",
    size: "compact"
  },
  {
    title: {
      de: "Für Operator gebaut",
      en: "Made for Operators"
    },
    body: {
      de: "Auf Findings, Feedback, System-Monitoring und Handlung ausgerichtet, nicht nur auf Charts.",
      en: "Built around findings, feedback, system monitoring, and action, not just charts."
    },
    visual: "operator-workspace",
    size: "compact"
  }
];

export const anomalyIntelligenceCards: GridCard[] = [
  {
    title: {
      de: "Abnormales Verhalten automatisch erkennen.",
      en: "Detect Abnormal Behavior Automatically."
    },
    body: {
      de: "Fragile Schwellenwertregeln durch adaptive Anomalieerkennung über Live- und historische Signale ersetzen.",
      en: "Replace fragile threshold rules with adaptive anomaly detection across live and historical signals."
    },
    visual: "abnormal-detection",
    size: "wide"
  },
  {
    title: {
      de: "Verstehen, was sich verändert hat.",
      en: "Understand What Changed."
    },
    body: {
      de: "Sehen, welche Quellen, Kanäle, Jobs oder Bedingungen zu einem Finding beigetragen haben.",
      en: "See which sources, channels, jobs, or conditions contributed to a finding."
    },
    visual: "changed-context",
    size: "standard"
  },
  {
    title: {
      de: "Wiederholbare Workflows erstellen.",
      en: "Create Repeatable Workflows."
    },
    body: {
      de: "Analyse, Review, Benachrichtigung und Reporting aus demselben Finding auslösen.",
      en: "Trigger analysis, review, notification, and reporting workflows from the same finding."
    },
    visual: "repeatable-workflows",
    size: "standard"
  },
  {
    title: {
      de: "Modelle nah an den Daten trainieren und ausführen.",
      en: "Train and Run Models Close to the Data."
    },
    body: {
      de: "Compute Worker für ML, KI und algorithmische Jobs nutzen, ohne Detection von Operations zu trennen.",
      en: "Use compute workers for ML, AI, and algorithmic jobs without separating detection from operations."
    },
    visual: "edge-compute",
    size: "standard"
  },
  {
    title: {
      de: "Operatives Gedächtnis bewahren.",
      en: "Keep an Operational Memory."
    },
    body: {
      de: "Findings, Feedback, Runs, Artefakte und Kontext speichern, damit jede Untersuchung das System verbessert.",
      en: "Store findings, feedback, runs, artifacts, and context so every investigation makes the system smarter."
    },
    visual: "operational-memory",
    size: "compact"
  },
  {
    title: {
      de: "Um Ihre Systeme herum deployen.",
      en: "Deploy Around Your Systems."
    },
    body: {
      de: "Bestehende Infrastruktur über modulare Connectors und Worker anbinden.",
      en: "Connect to existing infrastructure through modular connectors and workers."
    },
    visual: "modular-connectors",
    size: "compact"
  }
];

export const platformRows: PlatformRow[] = [
  {
    label: {
      de: "Ingest",
      en: "Ingest"
    },
    body: {
      de: "Live-Streams, Datenbanken, Dateien, APIs und Kontrollsysteme verbinden.",
      en: "Connect live streams, databases, files, APIs, and control systems."
    }
  },
  {
    label: {
      de: "Detect",
      en: "Detect"
    },
    body: {
      de: "Anomalieerkennungs-Jobs über hochdimensionale Zeitreihen ausführen.",
      en: "Run anomaly detection jobs across high-dimensional time-series."
    }
  },
  {
    label: {
      de: "Explain",
      en: "Explain"
    },
    body: {
      de: "Rohe Abweichungen in verständliche Findings übersetzen.",
      en: "Translate raw deviations into understandable findings."
    }
  },
  {
    label: {
      de: "Act",
      en: "Act"
    },
    body: {
      de: "Findings in menschlichen Review, KI-Workflows und operative Entscheidungen leiten.",
      en: "Route findings into human review, AI workflows, and operational decisions."
    }
  }
];

export const earlyPreviewCards = [
  {
    title: {
      de: "Aus operativem Schmerz gebaut",
      en: "Built from Operational Pain"
    },
    body: {
      de: "Komplexe Organisationen erzeugen mehr Daten, als Teams interpretieren können. Kritische Signale verschwinden im Rauschen.",
      en: "Complex organizations generate more data than teams can interpret. Critical signals get buried in noise."
    },
    visual: "operational-pain" as const
  },
  {
    title: {
      de: "Für technische Tiefe entworfen",
      en: "Designed for Technical Depth"
    },
    body: {
      de: "Von Kontrollsystemen und Datenaufnahme bis zu Compute Jobs und Modellartefakten ist Anomx um reale Infrastruktur herum gebaut.",
      en: "From control systems and data acquisition to compute jobs and model artifacts, Anomx is built around real infrastructure."
    },
    visual: "technical-depth" as const
  },
  {
    title: {
      de: "Fokussierter Start",
      en: "Starting Focused"
    },
    body: {
      de: "Early Access richtet sich an Unternehmen und Forschungseinrichtungen mit hochwertigen Systemen und ernsthaften Anforderungen an Anomalieerkennung.",
      en: "Early access is intended for enterprises and research facilities with high-value systems and serious anomaly detection needs."
    },
    visual: "focused-start" as const
  }
];

export const useCases: UseCaseCard[] = [
  {
    title: {
      de: "Forschungseinrichtungen",
      en: "Research Facilities"
    },
    body: {
      de: "Abnormales Verhalten über Beschleuniger, Beamlines, Detektoren, Experimente und unterstützende Infrastruktur erkennen.",
      en: "Detect abnormal behavior across accelerators, beamlines, detectors, experiments, and supporting infrastructure."
    },
    visual: "research-facilities"
  },
  {
    title: {
      de: "Industrielle Operationen",
      en: "Industrial Operations"
    },
    body: {
      de: "Abweichungen in Produktionslinien, Anlagen, Energieverbrauch, Prozesssignalen und Qualitätsdaten finden.",
      en: "Find deviations across production lines, equipment, energy usage, process signals, and quality data."
    },
    visual: "industrial-ops"
  },
  {
    title: {
      de: "Energie und Infrastruktur",
      en: "Energy and Infrastructure"
    },
    body: {
      de: "Verteilte Assets überwachen, operative Drift erkennen und systemweite Veränderungen verstehen, bevor Ausfälle kaskadieren.",
      en: "Monitor distributed assets, detect operational drift, and understand system-wide changes before failures cascade."
    },
    visual: "energy-infrastructure"
  },
  {
    title: {
      de: "Datenintensive Unternehmen",
      en: "Data-Intensive Enterprises"
    },
    body: {
      de: "Statische Dashboards für lebendige, heterogene Datenumgebungen mit komplexen Abhängigkeiten überwinden.",
      en: "Move beyond static dashboards for live, heterogeneous data environments with complex dependencies."
    },
    visual: "data-enterprise"
  }
];

export const whyNowCards = [
  {
    title: {
      de: "Mehr Daten",
      en: "More Data"
    },
    body: {
      de: "Moderne Systeme erzeugen kontinuierliche operative Streams über Maschinen, Software, Sensoren und Teams.",
      en: "Modern systems produce continuous operational streams across machines, software, sensors, and teams."
    }
  },
  {
    title: {
      de: "Mehr Komplexität",
      en: "More Complexity"
    },
    body: {
      de: "Statische Schwellenwerte und Dashboards geraten an Grenzen, wenn Normalverhalten vom Kontext abhängt.",
      en: "Static thresholds and dashboards struggle when normal behavior depends on context."
    }
  },
  {
    title: {
      de: "Mehr Druck",
      en: "More Pressure"
    },
    body: {
      de: "Teams brauchen frühere Signale, klarere Erklärungen und schnellere Wege von Detection zu Handlung.",
      en: "Teams need earlier signals, clearer explanations, and faster paths from detection to action."
    }
  }
];
