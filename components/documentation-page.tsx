"use client";

import Link from "next/link";
import { CursorAtmosphere } from "@/components/cursor-atmosphere";
import { useLanguage } from "@/components/language-switcher";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { localized } from "@/lib/localize";
import type { LocalizedText } from "@/lib/home-content";

type NavItem = {
  description: LocalizedText;
  href: string;
  title: LocalizedText;
};

type Panel = {
  body: LocalizedText;
  title: LocalizedText;
};

const navItems: NavItem[] = [
  {
    href: "#platform",
    title: {
      de: "Anomx Platform",
      en: "Anomx Platform"
    },
    description: {
      de: "Kontrollplan, Datenmodell, Worker und Infrastruktur.",
      en: "Control plane, data model, workers, and infrastructure."
    }
  },
  {
    href: "#agent",
    title: {
      de: "Anomx Agent",
      en: "Anomx Agent"
    },
    description: {
      de: "CLI-Agent, Provider, Modi, Skills und Plattformanbindung.",
      en: "CLI agent, providers, modes, skills, and platform connection."
    }
  },
  {
    href: "#package",
    title: {
      de: "Anomx Package",
      en: "Anomx Package"
    },
    description: {
      de: "Python-Bibliothek, API-Oberflache und nachste Dokumentationsschritte.",
      en: "Python library, API surface, and the next documentation step."
    }
  }
];

const platformPanels: Panel[] = [
  {
    title: {
      de: "Core",
      en: "Core"
    },
    body: {
      de: "Hier liegen Organisationen, Nutzer, AuthTokens, Files, Integrationen, Folder, Pages, Notifications sowie Node- und Service-Metadaten.",
      en: "This is where organizations, users, auth tokens, files, integrations, folders, pages, notifications, and node/service metadata live."
    }
  },
  {
    title: {
      de: "Data",
      en: "Data"
    },
    body: {
      de: "Dataset, Facility, FacilityPart, Channel und RecordedChannel bilden den produktiven Datenraum fur reale Anlagen und heterogene Quellen.",
      en: "Dataset, facility, facility part, channel, and recorded channel define the operational data space for real facilities and heterogeneous sources."
    }
  },
  {
    title: {
      de: "Jobs",
      en: "Jobs"
    },
    body: {
      de: "ComponentDefinition, Job, JobRun, ModelArtifact, RunMetricPoint und Finding bilden Analyse-, Ausfuhrungs- und Reviewpfade ab.",
      en: "Component definition, job, job run, model artifact, run metric point, and finding cover analysis, execution, and review paths."
    }
  }
];

const workerPanels: Panel[] = [
  {
    title: {
      de: "Task Worker",
      en: "Task Worker"
    },
    body: {
      de: "Allgemeine Job-Ausfuhrung und backendnahe Orchestrierung uber Celery und die Plattformregistrierung.",
      en: "General job execution and backend-adjacent orchestration through Celery and platform registration."
    }
  },
  {
    title: {
      de: "DOOCS DAQ Worker",
      en: "DOOCS DAQ Worker"
    },
    body: {
      de: "Steuert DAQ-nahe Datenerfassung und verbindet Kontrolldomane mit der Plattform.",
      en: "Handles DAQ-adjacent acquisition and connects control domains back into the platform."
    }
  },
  {
    title: {
      de: "CPU / GPU Compute",
      en: "CPU / GPU Compute"
    },
    body: {
      de: "Stellt skalierbare Compute-Kapazitat fur Analyse- und Modelljobs auf CPU- und NVIDIA-Knoten bereit.",
      en: "Provides scalable compute capacity for analysis and model jobs on CPU and NVIDIA nodes."
    }
  }
];

const agentPanels: Panel[] = [
  {
    title: {
      de: "Provider",
      en: "Providers"
    },
    body: {
      de: "Der Agent bringt OpenAI, Anthropic, DESY Assistant und Ollama als direkte Backend-Optionen mit.",
      en: "The agent ships with OpenAI, Anthropic, DESY Assistant, and Ollama as direct backend options."
    }
  },
  {
    title: {
      de: "Modi",
      en: "Modes"
    },
    body: {
      de: "Observer, Confirm und Autonomous bestimmen, wie strikt der Agent Kommandos und Workspace-Zugriffe behandelt.",
      en: "Observer, Confirm, and Autonomous determine how strictly the agent treats commands and workspace access."
    }
  },
  {
    title: {
      de: "Skills",
      en: "Skills"
    },
    body: {
      de: "Die eingebauten Skills `/map-folder`, `/find-issues` und `/make-report` fokussieren typische Daten- und Anomaliearbeit.",
      en: "The built-in skills `/map-folder`, `/find-issues`, and `/make-report` focus common data and anomaly work."
    }
  },
  {
    title: {
      de: "Operator-Tools",
      en: "Operator tools"
    },
    body: {
      de: "Der Operator kann Kommandos ausfuhren, Hintergrund-Agenten starten, Prozesse verwalten, Fragen stellen und Plane pflegen.",
      en: "The operator can run commands, start background agents, manage processes, ask questions, and maintain plans."
    }
  }
];

const packagePanels: Panel[] = [
  {
    title: {
      de: "Heute vorhanden",
      en: "Available today"
    },
    body: {
      de: "Datasets, Scorers, Detectors, Models, Darts-Integration, Komponenten und ein installierbarer CLI-Agent sind bereits im Repository.",
      en: "Datasets, scorers, detectors, models, Darts integration, components, and an installable CLI agent already exist in the repository."
    }
  },
  {
    title: {
      de: "Dokumentation im Aufbau",
      en: "Documentation in progress"
    },
    body: {
      de: "Die Python-API verdient eine eigene tiefe Referenz. Diese Sektion bleibt vorerst bewusst als Coming Soon markiert.",
      en: "The Python API deserves its own deeper reference. This section is intentionally marked as coming soon for now."
    }
  }
];

const packageSurface = [
  "anomx.datasets.TimeSeriesDataset",
  "anomx.datasets.ChannelMetadata",
  "anomx.detectors.MovingAverageDetector",
  "anomx.scorers.ZScoreScorer",
  "anomx.models.NaiveSeasonalModel",
  "anomx.integrations.DartsForecastingModel"
];

export function DocumentationPage() {
  const language = useLanguage();

  return (
    <main className="page-shell subpage-shell docs-page-shell" id="top">
      <CursorAtmosphere />
      <SiteHeader />

      <section className="section docs-hero-section">
        <div className="docs-hero">
          <p className="eyebrow">{language === "de" ? "Dokumentation" : "Documentation"}</p>
          <h1>
            {language === "de"
              ? "Die Arbeitsdokumentation fur Plattform, Agent und Package."
              : "The working documentation for the platform, agent, and package."}
          </h1>
          <p className="hero-subline">
            {language === "de"
              ? "Diese Seite zieht aus den aktuellen Repositories die Architektur, Laufzeiten, APIs und CLI-Funktionen zusammen."
              : "This page pulls architecture, runtimes, APIs, and CLI behavior together from the current repositories."}
          </p>
        </div>
      </section>

      <section className="section docs-main-section">
        <div className="docs-layout">
          <aside className="docs-sidebar">
            <div className="docs-sidebar-shell">
              <span className="docs-sidebar-label">
                {language === "de" ? "Auf dieser Seite" : "On this page"}
              </span>

              <nav className="docs-sidebar-nav" aria-label="Documentation sections">
                {navItems.map((item) => (
                  <a className="docs-sidebar-link" href={item.href} key={item.href}>
                    <strong>{localized(item.title, language)}</strong>
                    <span>{localized(item.description, language)}</span>
                  </a>
                ))}
              </nav>

              <div className="docs-sidebar-card">
                <span>{language === "de" ? "Schneller Einstieg" : "Quick start"}</span>
                <pre className="docs-code-block">
                  <code>{`pip install anomx
anomx

cd anomx-platform/backend
python manage.py runserver`}</code>
                </pre>
              </div>
            </div>
          </aside>

          <div className="docs-content">
            <section className="docs-section" id="platform">
              <div className="docs-section-header">
                <h2>{language === "de" ? "Anomx Platform" : "Anomx Platform"}</h2>
                <p>
                  {language === "de"
                    ? "Die Plattform ist der gemeinsame Kontrollplan fur Objekte, Daten, Jobs, Worker und operativen Zustand."
                    : "The platform is the shared control plane for objects, data, jobs, workers, and operational state."}
                </p>
              </div>

              <div className="docs-panel-grid">
                {platformPanels.map((panel) => (
                  <article className="docs-panel" key={localized(panel.title, language)}>
                    <h3>{localized(panel.title, language)}</h3>
                    <p>{localized(panel.body, language)}</p>
                  </article>
                ))}
              </div>

              <article className="docs-callout">
                <h3>{language === "de" ? "Architektur" : "Architecture"}</h3>
                <p>
                  {language === "de"
                    ? "Die aktuelle Plattform verbindet Django/DRF/Channels mit Celery, Redis, NATS/JetStream, TimescaleDB, PostgreSQL und MinIO. Node und NodeService modellieren dabei reale Maschinen und ihre laufenden Dienste."
                    : "The current platform combines Django/DRF/Channels with Celery, Redis, NATS/JetStream, TimescaleDB, PostgreSQL, and MinIO. Node and node service model real machines and the services running on them."}
                </p>
              </article>

              <div className="docs-panel-grid docs-panel-grid-tight">
                {workerPanels.map((panel) => (
                  <article className="docs-panel" key={localized(panel.title, language)}>
                    <h3>{localized(panel.title, language)}</h3>
                    <p>{localized(panel.body, language)}</p>
                  </article>
                ))}
              </div>

              <div className="docs-dual-grid">
                <article className="docs-code-card">
                  <span className="docs-code-label">
                    {language === "de" ? "Lokale Plattform" : "Local platform"}
                  </span>
                  <pre className="docs-code-block">
                    <code>{`docker compose up postgres timescaledb redis nats minio

cd backend
python -m pip install -e ".[dev]"
python manage.py migrate
python manage.py runserver`}</code>
                  </pre>
                </article>

                <article className="docs-code-card">
                  <span className="docs-code-label">
                    {language === "de" ? "API-Oberflache" : "API surface"}
                  </span>
                  <pre className="docs-code-block">
                    <code>{`/api/v1/...
/openapi.json
/docs

python manage.py run_task_worker
python manage.py run_doocs_daq_worker
python manage.py run_cpu_compute_worker
python manage.py run_nvidia_gpu_compute_worker`}</code>
                  </pre>
                </article>
              </div>
            </section>

            <section className="docs-section" id="agent">
              <div className="docs-section-header">
                <h2>{language === "de" ? "Anomx Agent" : "Anomx Agent"}</h2>
                <p>
                  {language === "de"
                    ? "Der Agent ist die installierbare CLI-Oberflache fur lokale Analyse, datennahe Arbeit und plattformverbundene Edge-Flows."
                    : "The agent is the installable CLI surface for local analysis, data-near work, and platform-connected edge flows."}
                </p>
              </div>

              <div className="docs-panel-grid">
                {agentPanels.map((panel) => (
                  <article className="docs-panel" key={localized(panel.title, language)}>
                    <h3>{localized(panel.title, language)}</h3>
                    <p>{localized(panel.body, language)}</p>
                  </article>
                ))}
              </div>

              <article className="docs-callout">
                <h3>{language === "de" ? "Plattformanbindung" : "Platform connection"}</h3>
                <p>
                  {language === "de"
                    ? "Die Plattform akzeptiert CLI-Agent-Logins uber `/auth/login` mit `client=cli_agent` und aktualisiert den verbundenen Agenten uber `/auth/me/agent/heartbeat`. Dadurch werden Hostname und Client-Version serverseitig nachvollziehbar."
                    : "The platform accepts CLI-agent logins via `/auth/login` with `client=cli_agent` and refreshes the connected agent via `/auth/me/agent/heartbeat`. That keeps hostname and client version traceable on the server side."}
                </p>
              </article>

              <div className="docs-dual-grid">
                <article className="docs-code-card">
                  <span className="docs-code-label">
                    {language === "de" ? "CLI-Start" : "CLI start"}
                  </span>
                  <pre className="docs-code-block">
                    <code>{`pip install anomx
anomx

anomx --provider openai --model gpt-5.5
anomx --ollama --model qwen3-coder:30b
anomx --print-home`}</code>
                  </pre>
                </article>

                <article className="docs-code-card">
                  <span className="docs-code-label">
                    {language === "de" ? "Persistenter Zustand" : "Persistent state"}
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

            <section className="docs-section" id="package">
              <div className="docs-section-header">
                <h2>{language === "de" ? "Anomx Package" : "Anomx Package"}</h2>
                <p>
                  {language === "de"
                    ? "Die tiefe Python-Referenz kommt als nachster eigener Dokumentationsschritt. Bis dahin markieren wir diese Sektion bewusst als Coming Soon."
                    : "The deeper Python reference is the next dedicated documentation step. Until then, this section is intentionally marked as coming soon."}
                </p>
              </div>

              <div className="docs-panel-grid docs-panel-grid-tight">
                {packagePanels.map((panel) => (
                  <article className="docs-panel" key={localized(panel.title, language)}>
                    <h3>{localized(panel.title, language)}</h3>
                    <p>{localized(panel.body, language)}</p>
                  </article>
                ))}
              </div>

              <article className="docs-coming-soon">
                <div>
                  <span className="docs-coming-soon-badge">
                    {language === "de" ? "Coming Soon" : "Coming soon"}
                  </span>
                  <h3>
                    {language === "de"
                      ? "Die Package-Dokumentation wird als echte API-Referenz ausgebaut."
                      : "The package docs will be expanded into a proper API reference."}
                  </h3>
                  <p>
                    {language === "de"
                      ? "Schon heute sichtbar ist die Kernoberflache fur Datasets, Detectors, Scorers, Models und Integrationen."
                      : "Already visible today is the core surface for datasets, detectors, scorers, models, and integrations."}
                  </p>
                </div>

                <ul className="docs-inline-list">
                  {packageSurface.map((item) => (
                    <li key={item}>
                      <code>{item}</code>
                    </li>
                  ))}
                </ul>
              </article>
            </section>

            <section className="docs-endcap">
              <div className="subpage-cta-panel">
                <div className="section-heading section-heading-center">
                  <h2>
                    {language === "de"
                      ? "Brauchen Sie die Plattform oder den Agenten zuerst?"
                      : "Need the platform or the agent first?"}
                  </h2>
                </div>

                <div className="hero-actions">
                  <Link className="button button-primary" href="/platform">
                    {language === "de" ? "Zur Plattform" : "Go to platform"}
                  </Link>
                  <Link className="button button-secondary" href="/agent">
                    {language === "de" ? "Zum Agenten" : "Go to agent"}
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}
