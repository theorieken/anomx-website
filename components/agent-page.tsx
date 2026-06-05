"use client";

import Link from "next/link";
import { CardVisual } from "@/components/card-visual";
import { CursorAtmosphere } from "@/components/cursor-atmosphere";
import { useLanguage } from "@/components/language-switcher";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import type { CardVisualVariant, LocalizedText } from "@/lib/home-content";
import { localized } from "@/lib/localize";

type VisualCard = {
  body: LocalizedText;
  title: LocalizedText;
  visual: CardVisualVariant;
};

type Metric = {
  body: LocalizedText;
  label: LocalizedText;
  value: string;
};

const hero = {
  eyebrow: {
    de: "Anomx Agent",
    en: "Anomx Agent"
  },
  title: {
    de: "Installieren Sie `anomx` und starten Sie den Agenten dort, wo die Daten leben.",
    en: "Install `anomx` and start the agent where the data lives."
  },
  subtitle: {
    de: "Der Anomx Agent ist ein CLI-Arbeitsplatz fur Anomalieerkennung, Datenqualitat, Zeitreihenanalyse und plattformverbundene Edge-Workflows.",
    en: "The Anomx Agent is a CLI workspace for anomaly detection, data quality, time-series analysis, and platform-connected edge workflows."
  }
} as const;

const metrics: Metric[] = [
  {
    label: {
      de: "Provider",
      en: "Providers"
    },
    value: "4",
    body: {
      de: "OpenAI, Anthropic, DESY Assistant und Ollama sind aktuell eingebaut.",
      en: "OpenAI, Anthropic, DESY Assistant, and Ollama are currently built in."
    }
  },
  {
    label: {
      de: "Ausfuhrungsmodi",
      en: "Execution modes"
    },
    value: "3",
    body: {
      de: "Observer, Confirm und Autonomous definieren, wie weit der Agent handeln darf.",
      en: "Observer, Confirm, and Autonomous define how far the agent may act."
    }
  },
  {
    label: {
      de: "Starter-Skills",
      en: "Starter skills"
    },
    value: "3",
    body: {
      de: "Map Folder, Find Issues und Make Report geben dem Agenten einen klaren Analysefokus.",
      en: "Map Folder, Find Issues, and Make Report give the agent a concrete analysis focus."
    }
  }
];

const featureCards: VisualCard[] = [
  {
    title: {
      de: "Fur Anomalien statt generische Aufgaben",
      en: "Shaped for anomalies instead of generic tasks"
    },
    body: {
      de: "Der Agent ist fur Zeitreihen, Datenqualitat, Abweichungen, Schemafehler und operative Analysen ausgerichtet.",
      en: "The agent is oriented around time series, data quality, deviations, schema drift, and operational analysis."
    },
    visual: "abnormal-detection"
  },
  {
    title: {
      de: "Mehr als eine Shell",
      en: "More than a shell wrapper"
    },
    body: {
      de: "Neben direkten Kommandos kann der Agent Worker-Agenten starten, langlaufende Prozesse begleiten und plane sichtbar halten.",
      en: "Beyond direct commands, the agent can start worker agents, watch long-running processes, and keep visible plans."
    },
    visual: "repeatable-workflows"
  },
  {
    title: {
      de: "Kontrollierte Automatisierung",
      en: "Controlled automation"
    },
    body: {
      de: "Observer, Confirm und Autonomous passen die Handlungstiefe an Sicherheits- und Vertrauensniveau des Workspaces an.",
      en: "Observer, Confirm, and Autonomous adapt the action depth to the workspace trust and safety level."
    },
    visual: "human-control"
  },
  {
    title: {
      de: "CLI zu Plattform",
      en: "CLI to platform bridge"
    },
    body: {
      de: "Wenn eine Anomx Platform verfugbar ist, wird der Agent zum Einstiegspunkt fur Server, Workstations und Edge-Knoten.",
      en: "When an Anomx Platform is available, the agent becomes the entry point for servers, workstations, and edge nodes."
    },
    visual: "operator-workspace"
  }
];

const providerCards: VisualCard[] = [
  {
    title: {
      de: "OpenAI",
      en: "OpenAI"
    },
    body: {
      de: "Startet direkt mit vorkonfigurierter Modellwahl wie `gpt-5.5` oder `gpt-5.4`.",
      en: "Starts directly with configured model choices such as `gpt-5.5` or `gpt-5.4`."
    },
    visual: "predict-next"
  },
  {
    title: {
      de: "Anthropic",
      en: "Anthropic"
    },
    body: {
      de: "Unterstutzt aktuelle Claude-Modelle fur langere analytische Workflows.",
      en: "Supports current Claude models for longer analytical workflows."
    },
    visual: "changed-context"
  },
  {
    title: {
      de: "DESY Assistant",
      en: "DESY Assistant"
    },
    body: {
      de: "Eine eingebaute Provider-Option fur DESY-nahe Umgebungen und lokale Arbeitsablaufe.",
      en: "A built-in provider option for DESY-adjacent environments and local workflows."
    },
    visual: "research-facilities"
  },
  {
    title: {
      de: "Ollama",
      en: "Ollama"
    },
    body: {
      de: "Lokale Modelle wie `qwen3.6` oder `qwen3-coder:30b` lassen sich direkt starten.",
      en: "Local models such as `qwen3.6` or `qwen3-coder:30b` can be started directly."
    },
    visual: "data-agnostic"
  }
];

const modeCards = [
  {
    title: {
      de: "Observer",
      en: "Observer"
    },
    body: {
      de: "Nur lesende Analyse. Keine Builds, keine Modifikationen, keine Host-Steuerung.",
      en: "Read-only investigation. No builds, no mutations, no host control."
    }
  },
  {
    title: {
      de: "Confirm",
      en: "Confirm"
    },
    body: {
      de: "Lesende Schritte laufen direkt, verandernde Aktionen gehen uber eine Freigabeoberflache.",
      en: "Read steps run directly, mutating actions go through the approval surface."
    }
  },
  {
    title: {
      de: "Autonomous",
      en: "Autonomous"
    },
    body: {
      de: "Der Agent darf innerhalb des vertrauten Workspace selbststandig handeln, gefahrliche Host-Befehle bleiben blockiert.",
      en: "The agent may act on its own inside the trusted workspace while dangerous host commands stay blocked."
    }
  }
] as const;

const skillCards = [
  {
    title: {
      de: "/map-folder",
      en: "/map-folder"
    },
    body: {
      de: "Kartiert Dateien, Datenpfade, Zeitreihenquellen und unklare Stellen im Workspace.",
      en: "Maps files, data paths, time-series sources, and unclear areas in the workspace."
    }
  },
  {
    title: {
      de: "/find-issues",
      en: "/find-issues"
    },
    body: {
      de: "Sucht nach Gaps, Ausreissern, Schemafehlern, Nulls, defekten Timestamps und stillen Datenproblemen.",
      en: "Looks for gaps, outliers, schema problems, nulls, broken timestamps, and silent data issues."
    }
  },
  {
    title: {
      de: "/make-report",
      en: "/make-report"
    },
    body: {
      de: "Erstellt einen knappen operatornahen Bericht uber Risiken, Befunde und nachste Schritte.",
      en: "Builds a concise operator-facing report about risks, findings, and next steps."
    }
  }
] as const;

const connectionSteps = [
  {
    de: "Installieren Sie `anomx` auf dem Rechner, auf dem Daten, Logs oder Repositories bereits lokal verfugbar sind.",
    en: "Install `anomx` on the machine where data, logs, or repositories are already locally available."
  },
  {
    de: "Starten Sie `anomx`, wahlen Sie Provider und Modell und verbinden Sie den Agenten bei Bedarf mit Ihrer Anomx Platform.",
    en: "Start `anomx`, choose a provider and model, and connect the agent to your Anomx Platform when needed."
  },
  {
    de: "Arbeiten Sie lokal an Analyse, Datenqualitat oder Anomalien und tragen Sie die Ergebnisse wieder in den Plattformkontext zuruck.",
    en: "Work locally on analysis, data quality, or anomalies and carry the results back into the platform context."
  }
] as const;

export function AgentPage() {
  const language = useLanguage();

  return (
    <main className="page-shell subpage-shell" id="top">
      <CursorAtmosphere />
      <SiteHeader />

      <section className="section subpage-hero-section">
        <div className="subpage-hero">
          <p className="eyebrow">{localized(hero.eyebrow, language)}</p>

          <div className="subpage-hero-grid">
            <div className="subpage-hero-copy">
              <h1>{localized(hero.title, language)}</h1>
              <p className="hero-subline">{localized(hero.subtitle, language)}</p>

              <div className="hero-actions">
                <Link className="button button-primary" href="/early-access">
                  {language === "de" ? "Fruhen Zugang anfragen" : "Request early access"}
                </Link>
                <Link className="button button-secondary" href="/documentation#agent">
                  {language === "de" ? "Agent-Doku lesen" : "Read agent docs"}
                </Link>
              </div>
            </div>

            <article className="subpage-code-card">
              <span className="subpage-code-label">
                {language === "de" ? "Schnellstart" : "Quick start"}
              </span>
              <pre className="docs-code-block">
                <code>{`pip install anomx
anomx

# optional
anomx --provider anthropic --model claude-sonnet-4-6
anomx --ollama --model qwen3-coder:30b
anomx --print-home`}</code>
              </pre>
            </article>
          </div>

          <div className="subpage-metrics-row">
            {metrics.map((metric) => (
              <article className="subpage-metric" key={localized(metric.label, language)}>
                <span className="subpage-metric-value">{metric.value}</span>
                <h2>{localized(metric.label, language)}</h2>
                <p>{localized(metric.body, language)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section subpage-section">
        <div className="section-heading section-heading-left">
          <h2>
            {language === "de"
              ? "Warum der Agent ein eigener Einstiegspunkt ist."
              : "Why the agent is a distinct entry point."}
          </h2>
        </div>

        <div className="simple-card-grid subpage-card-grid subpage-card-grid-four">
          {featureCards.map((card) => (
            <article className="simple-card subpage-feature-card" key={localized(card.title, language)}>
              <h3>{localized(card.title, language)}</h3>
              <p>{localized(card.body, language)}</p>
              <div className="simple-card-visual" aria-hidden="true">
                <CardVisual variant={card.visual} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section subpage-section">
        <div className="section-heading section-heading-left">
          <h2>
            {language === "de"
              ? "Provider, die heute direkt verfugbar sind."
              : "Providers available out of the box today."}
          </h2>
        </div>

        <div className="simple-card-grid subpage-card-grid subpage-card-grid-four">
          {providerCards.map((card) => (
            <article className="simple-card subpage-feature-card" key={localized(card.title, language)}>
              <h3>{localized(card.title, language)}</h3>
              <p>{localized(card.body, language)}</p>
              <div className="simple-card-visual" aria-hidden="true">
                <CardVisual variant={card.visual} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section subpage-section">
        <div className="subpage-split">
          <article className="subpage-copy-card">
            <div className="section-heading section-heading-left">
              <h2>
                {language === "de"
                  ? "Modi und Skills fur reale Arbeit."
                  : "Modes and skills for real work."}
              </h2>
            </div>

            <div className="subpage-mini-grid">
              {modeCards.map((card) => (
                <div className="subpage-mini-card" key={localized(card.title, language)}>
                  <h3>{localized(card.title, language)}</h3>
                  <p>{localized(card.body, language)}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="subpage-copy-card">
            <div className="section-heading section-heading-left">
              <h2>
                {language === "de"
                  ? "Eingebaute Starter-Skills."
                  : "Built-in starter skills."}
              </h2>
            </div>

            <div className="subpage-mini-grid">
              {skillCards.map((card) => (
                <div className="subpage-mini-card" key={localized(card.title, language)}>
                  <h3>{localized(card.title, language)}</h3>
                  <p>{localized(card.body, language)}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section subpage-section">
        <div className="subpage-split">
          <article className="subpage-copy-card">
            <div className="section-heading section-heading-left">
              <h2>
                {language === "de"
                  ? "Vom Rechner in die Plattform."
                  : "From the machine into the platform."}
              </h2>
            </div>

            <ul className="subpage-list">
              {connectionSteps.map((item) => (
                <li key={item.en}>{item[language]}</li>
              ))}
            </ul>

            <p className="subpage-note">
              {language === "de"
                ? "Auf der Plattformseite werden CLI-Agent-Logins und Heartbeats als eigener Tokentyp nachverfolgt, inklusive Hostname und Client-Version."
                : "On the platform side, CLI-agent logins and heartbeats are tracked as a dedicated token type, including hostname and client version."}
            </p>
          </article>

          <article className="subpage-code-card">
            <span className="subpage-code-label">
              {language === "de" ? "Agent Home" : "Agent home"}
            </span>
            <pre className="docs-code-block">
              <code>{`~/.anomx/
  config.toml
  auth.json
  skills/<command>.md
  session_index.jsonl
  sessions/YYYY/MM/DD/rollout-<timestamp>-<id>.jsonl`}</code>
            </pre>
          </article>
        </div>
      </section>

      <section className="section final-cta-section">
        <div className="subpage-cta-panel">
          <div className="section-heading section-heading-center">
            <h2>
              {language === "de"
                ? "Nutzen Sie den Agenten dort, wo Dashboards nicht hinkommen."
                : "Use the agent where dashboards cannot reach."}
            </h2>
          </div>

          <div className="hero-actions">
            <Link className="button button-primary" href="/documentation">
              {language === "de" ? "Zur Dokumentation" : "Open documentation"}
            </Link>
            <Link className="button button-secondary" href="/platform">
              {language === "de" ? "Zur Plattform" : "See the platform"}
            </Link>
          </div>
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}
