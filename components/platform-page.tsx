"use client";

import Image from "next/image";
import Link from "next/link";
import { CardVisual } from "@/components/card-visual";
import { CursorAtmosphere } from "@/components/cursor-atmosphere";
import { useLanguage } from "@/components/language-switcher";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import type { CardVisualVariant, LocalizedText } from "@/lib/home-content";
import { localized } from "@/lib/localize";

type Metric = {
  body: LocalizedText;
  label: LocalizedText;
  value: string;
};

type VisualCard = {
  body: LocalizedText;
  title: LocalizedText;
  visual: CardVisualVariant;
};

type StackRow = {
  body: LocalizedText;
  label: LocalizedText;
};

const hero = {
  eyebrow: {
    de: "Anomx Platform",
    en: "Anomx Platform"
  },
  title: {
    de: "Die Kontroll- und Intelligence-Ebene fur komplexe operative Systeme.",
    en: "The control and intelligence layer for complex operational systems."
  },
  subtitle: {
    de: "Anomx Platform verbindet Datenquellen, modelliert Datasets, orchestriert Jobs, verteilt Worker-Laufzeiten und bringt Findings in einen gemeinsamen operativen Kontext.",
    en: "Anomx Platform connects data sources, models datasets, orchestrates jobs, distributes worker runtimes, and keeps findings inside one shared operational context."
  }
} as const;

const metrics: Metric[] = [
  {
    label: {
      de: "Backend-Domanen",
      en: "Backend domains"
    },
    value: "3",
    body: {
      de: "Die Django-Apps `core`, `data` und `jobs` strukturieren die Plattform.",
      en: "The Django apps `core`, `data`, and `jobs` structure the platform."
    }
  },
  {
    label: {
      de: "Worker-Laufzeiten",
      en: "Worker runtimes"
    },
    value: "4",
    body: {
      de: "Task-, DAQ-, CPU- und NVIDIA-GPU-Worker sind bereits als eigenstandige Laufzeiten vorhanden.",
      en: "Task, DAQ, CPU, and NVIDIA GPU workers already exist as dedicated runtimes."
    }
  },
  {
    label: {
      de: "Zentrale Dienste",
      en: "Core services"
    },
    value: "5",
    body: {
      de: "PostgreSQL, TimescaleDB, Redis, NATS/JetStream und MinIO bilden den Infrastrukturkern.",
      en: "PostgreSQL, TimescaleDB, Redis, NATS/JetStream, and MinIO form the infrastructure core."
    }
  }
];

const featureCards: VisualCard[] = [
  {
    title: {
      de: "Objektmodell statt lose Tools",
      en: "An object model instead of disconnected tools"
    },
    body: {
      de: "Organisationen, Nutzer, Dateien, Integrationen, Folder, Pages und Notifications leben in einem konsistenten Kernmodell.",
      en: "Organizations, users, files, integrations, folders, pages, and notifications live in one consistent core model."
    },
    visual: "enterprise-foundation"
  },
  {
    title: {
      de: "Datasets und Kanale als erste Klasse",
      en: "Datasets and channels as first-class objects"
    },
    body: {
      de: "Datasets, Facilities, FacilityParts, Channels und RecordedChannels halten den Datenraum fur reale Anlagen und Betriebsumgebungen offen.",
      en: "Datasets, facilities, facility parts, channels, and recorded channels keep the data layer open for real facilities and operating environments."
    },
    visual: "connect-sources"
  },
  {
    title: {
      de: "Jobs, Runs und Findings",
      en: "Jobs, runs, and findings"
    },
    body: {
      de: "Komponenten, Bindings, JobRuns, ModelArtifacts und Findings machen Analysepfade nachvollziehbar und reviewbar.",
      en: "Components, bindings, job runs, model artifacts, and findings make analysis pipelines traceable and reviewable."
    },
    visual: "explainable-findings"
  },
  {
    title: {
      de: "Verteilte Laufzeiten",
      en: "Distributed runtimes"
    },
    body: {
      de: "Nodes, NodeServices und TimeseriesStores modellieren reale Rechner, Worker-Instanzen und speichernahe Datenpfade.",
      en: "Nodes, node services, and timeseries stores model real machines, worker instances, and storage-local data paths."
    },
    visual: "edge-compute"
  },
  {
    title: {
      de: "Service-Bus mit Zustand",
      en: "A stateful service bus"
    },
    body: {
      de: "NATS mit JetStream transportiert Kommandos, Events und Heartbeats zwischen API, DAQ und Compute-Services.",
      en: "NATS with JetStream carries commands, events, and heartbeats between the API, DAQ, and compute services."
    },
    visual: "modular-connectors"
  },
  {
    title: {
      de: "Storage pro Arbeitslast",
      en: "Storage matched to the workload"
    },
    body: {
      de: "PostgreSQL fur Metadaten, TimescaleDB fur hochrate Zeitreihen, MinIO fur Artefakte und Redis fur Cache, Celery und Realtime.",
      en: "PostgreSQL for metadata, TimescaleDB for high-rate time series, MinIO for artifacts, and Redis for cache, Celery, and realtime."
    },
    visual: "operational-memory"
  }
];

const runtimeCards: VisualCard[] = [
  {
    title: {
      de: "Task Worker",
      en: "Task Worker"
    },
    body: {
      de: "Die allgemeine Job-Ausfuhrung fur orchestrierte Hintergrundarbeit nahe der API.",
      en: "The general-purpose job execution runtime for orchestrated background work near the API."
    },
    visual: "repeatable-workflows"
  },
  {
    title: {
      de: "DOOCS DAQ Worker",
      en: "DOOCS DAQ Worker"
    },
    body: {
      de: "DAQ-nahe Dienste fur Aufzeichnung, Streaming und kontrollsystemnahe Datenerfassung.",
      en: "DAQ-adjacent services for recording, streaming, and control-system-facing acquisition."
    },
    visual: "industrial-ops"
  },
  {
    title: {
      de: "CPU Compute Worker",
      en: "CPU Compute Worker"
    },
    body: {
      de: "Skalierbare Compute-Kapazitat fur klassische Datenverarbeitung, Pipelines und leichte Modellarbeit.",
      en: "Scalable compute capacity for classic data processing, pipelines, and lighter model workloads."
    },
    visual: "predict-next"
  },
  {
    title: {
      de: "NVIDIA GPU Compute Worker",
      en: "NVIDIA GPU Compute Worker"
    },
    body: {
      de: "Beschleunigte Laufzeit fur schwerere Modell- und Analysejobs auf GPU-Knoten.",
      en: "Accelerated runtime for heavier model and analysis jobs on GPU nodes."
    },
    visual: "high-dimensional"
  }
];

const stackRows: StackRow[] = [
  {
    label: {
      de: "API",
      en: "API"
    },
    body: {
      de: "Django, DRF und Channels bilden den Kontrollplan, Auth, Objekt-APIs und Realtime-Zugriffe ab.",
      en: "Django, DRF, and Channels provide the control plane, auth, object APIs, and realtime access."
    }
  },
  {
    label: {
      de: "Bus",
      en: "Bus"
    },
    body: {
      de: "NATS/JetStream verbindet Service-Kommandos, Events und Gesundheitsdaten uber Knoten hinweg.",
      en: "NATS/JetStream connects service commands, events, and health data across nodes."
    }
  },
  {
    label: {
      de: "Zeitreihe",
      en: "Timeseries"
    },
    body: {
      de: "TimescaleDB liegt dort, wo hohe Datenraten anfallen, wahrend die Plattform den globalen Kontext halt.",
      en: "TimescaleDB can live where rates are high while the platform keeps the global context."
    }
  },
  {
    label: {
      de: "Artefakte",
      en: "Artifacts"
    },
    body: {
      de: "Modelle, Dateien und Compute-Ausgaben gehen nach MinIO oder in kompatiblen S3-Speicher.",
      en: "Models, files, and compute outputs go to MinIO or compatible S3 storage."
    }
  }
];

const workflowList = {
  title: {
    de: "Was Teams auf der Plattform tun",
    en: "What teams do inside the platform"
  },
  items: [
    {
      de: "Datenquellen, Datasets und Channels definieren, statt nur Rohdaten zu sammeln.",
      en: "Define data sources, datasets, and channels instead of collecting raw data without structure."
    },
    {
      de: "Jobs aus Komponenten, Datenbindungen und Laufzeitkapazitat zusammensetzen.",
      en: "Compose jobs from components, data bindings, and runtime capacity."
    },
    {
      de: "Runs, Metriken, Findings und ModelArtifacts in einem auditierbaren Verlauf behalten.",
      en: "Keep runs, metrics, findings, and model artifacts in one auditable timeline."
    },
    {
      de: "Operatoren, Worker-Knoten und CLI-Agenten auf denselben Systemkontext ausrichten.",
      en: "Align operators, worker nodes, and CLI agents around the same system context."
    }
  ]
} as const;

export function PlatformPage() {
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
                  {language === "de" ? "Early Access anfragen" : "Request Early Access"}
                </Link>
                <Link className="button button-secondary" href="/documentation#platform">
                  {language === "de" ? "Dokumentation lesen" : "Read the docs"}
                </Link>
              </div>
            </div>

            <div className="subpage-hero-panel">
              {metrics.map((metric) => (
                <article className="subpage-metric" key={localized(metric.label, language)}>
                  <span className="subpage-metric-value">{metric.value}</span>
                  <h2>{localized(metric.label, language)}</h2>
                  <p>{localized(metric.body, language)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section subpage-section">
        <div className="section-heading section-heading-left">
          <h2>
            {language === "de"
              ? "Gebaut fur ein echtes Betriebsmodell."
              : "Built for a real operating model."}
          </h2>
        </div>

        <div className="simple-card-grid subpage-card-grid">
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

      <section className="platform-dark-band">
        <div className="platform-dark-inner">
          <div className="platform-dark-copy">
            <h2>
              {language === "de"
                ? "Eine Plattform fur Daten, Jobs und verteilte Ausfuhrung."
                : "One platform for data, jobs, and distributed execution."}
            </h2>

            <ul className="platform-list">
              {stackRows.map((row) => (
                <li className="platform-list-item" key={localized(row.label, language)}>
                  <span>{localized(row.label, language)}</span>
                  <p>{localized(row.body, language)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="platform-dark-media">
            <Image
              alt={language === "de" ? "Anomx Plattformarchitektur" : "Anomx platform architecture"}
              className="platform-architecture"
              height={520}
              sizes="(max-width: 1120px) 100vw, 48vw"
              src="/media/intelligence-layer-architecture.svg"
              unoptimized
              width={720}
            />
          </div>
        </div>
      </section>

      <section className="section subpage-section">
        <div className="section-heading section-heading-left">
          <h2>
            {language === "de"
              ? "Runtimes, die zur Infrastruktur passen."
              : "Runtimes that match the infrastructure."}
          </h2>
        </div>

        <div className="simple-card-grid subpage-card-grid subpage-card-grid-four">
          {runtimeCards.map((card) => (
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
              <h2>{localized(workflowList.title, language)}</h2>
            </div>

            <ul className="subpage-list">
              {workflowList.items.map((item) => (
                <li key={item.en}>{item[language]}</li>
              ))}
            </ul>
          </article>

          <article className="subpage-code-card">
            <span className="subpage-code-label">
              {language === "de" ? "Lokaler Start" : "Local startup"}
            </span>
            <pre className="docs-code-block">
              <code>{`docker compose up postgres timescaledb redis nats minio

cd backend
python -m pip install -e ".[dev]"
python manage.py migrate
python manage.py runserver
python manage.py run_task_worker
python manage.py run_cpu_compute_worker`}</code>
            </pre>
          </article>
        </div>
      </section>

      <section className="section final-cta-section">
        <div className="subpage-cta-panel">
          <div className="section-heading section-heading-center">
            <h2>
              {language === "de"
                ? "Bringen Sie Datenquellen, Worker und Operatoren in denselben Kontext."
                : "Bring data sources, workers, and operators into the same context."}
            </h2>
          </div>

          <div className="hero-actions">
            <Link className="button button-primary" href="/early-access">
              {language === "de" ? "Platform testen" : "Try the platform"}
            </Link>
            <Link className="button button-secondary" href="/agent">
              {language === "de" ? "Zum Agenten" : "Meet the agent"}
            </Link>
          </div>
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}
