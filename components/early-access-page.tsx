"use client";

import Link from "next/link";
import { CardVisual } from "@/components/card-visual";
import { CursorAtmosphere } from "@/components/cursor-atmosphere";
import { useLanguage } from "@/components/language-switcher";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WaitlistForm } from "@/components/waitlist-form";
import { homeCopy } from "@/lib/home-content";

const accessCards = {
  en: [
    {
      title: "Platform access",
      body: "Shape the control plane around real datasets, jobs, findings, and multi-node operations.",
      visual: "operator-workspace"
    },
    {
      title: "CLI agent workflows",
      body: "Use the installable `anomx` agent on the machine where the data or code already lives.",
      visual: "human-control"
    },
    {
      title: "Direct product feedback",
      body: "Work closely with us on architecture, data connectors, operational review, and the real edge-to-platform loop.",
      visual: "guide-step"
    }
  ],
  de: [
    {
      title: "Platform-Zugang",
      body: "Gestalten Sie den Kontrollplan rund um echte Datasets, Jobs, Findings und Multi-Node-Betrieb mit.",
      visual: "operator-workspace"
    },
    {
      title: "CLI-Agent-Workflows",
      body: "Nutzen Sie den installierbaren `anomx` Agenten direkt auf dem Rechner, auf dem Daten oder Code bereits vorhanden sind.",
      visual: "human-control"
    },
    {
      title: "Direktes Produktfeedback",
      body: "Arbeiten Sie mit uns an Architektur, Konnektoren, operativem Review und dem echten Edge-zu-Plattform-Loop.",
      visual: "guide-step"
    }
  ]
} as const;

const bulletCopy = {
  en: [
    "Early access to the Anomx Platform and the installable CLI agent.",
    "A direct path from local server-side analysis into shared platform context.",
    "Close collaboration on real anomaly-detection and operational intelligence workflows."
  ],
  de: [
    "Fruher Zugang zur Anomx Platform und zum installierbaren CLI-Agenten.",
    "Ein direkter Pfad von lokaler Analyse auf Servern in den gemeinsamen Plattformkontext.",
    "Enge Zusammenarbeit an echten Anomalie- und Operational-Intelligence-Workflows."
  ]
} as const;

export function EarlyAccessPage() {
  const language = useLanguage();
  const copy = homeCopy[language];
  const cards = accessCards[language];

  return (
    <main className="page-shell subpage-shell" id="top">
      <CursorAtmosphere />
      <SiteHeader />

      <section className="section subpage-hero-section">
        <div className="subpage-hero">
          <p className="eyebrow">{language === "de" ? "Early Access" : "Early Access"}</p>

          <div className="subpage-split early-access-split">
            <article className="subpage-copy-card">
              <h1 className="subpage-hero-title">
                {language === "de"
                  ? "Arbeiten Sie mit uns an der ersten operativen Form von Anomx."
                  : "Work with us on the first operational shape of Anomx."}
              </h1>
              <p className="hero-subline">
                {language === "de"
                  ? "Die erste Early-Access-Phase richtet sich an Teams mit komplexen Daten-, Maschinen- oder Infrastrukturumgebungen, bei denen Anomalien fruh verstanden und eingeordnet werden mussen."
                  : "The first early-access phase is for teams operating complex data, machine, or infrastructure environments where anomalies must be understood early and in context."}
              </p>

              <ul className="subpage-list">
                {bulletCopy[language].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="hero-actions">
                <Link className="button button-secondary" href="/platform">
                  {language === "de" ? "Platform ansehen" : "See the platform"}
                </Link>
                <Link className="button button-secondary" href="/agent">
                  {language === "de" ? "Agent ansehen" : "See the agent"}
                </Link>
              </div>
            </article>

            <div className="waitlist-panel early-access-panel">
              <WaitlistForm buttonLabel={copy.waitlist.buttonLabel} copy={copy.waitlist} />
            </div>
          </div>
        </div>
      </section>

      <section className="section subpage-section">
        <div className="section-heading section-heading-left">
          <h2>
            {language === "de"
              ? "Was fruhe Teams von Anfang an formen."
              : "What early teams help shape from day one."}
          </h2>
        </div>

        <div className="simple-card-grid subpage-card-grid">
          {cards.map((card) => (
            <article className="simple-card subpage-feature-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <div className="simple-card-visual" aria-hidden="true">
                <CardVisual variant={card.visual} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section final-cta-section">
        <div className="subpage-cta-panel">
          <div className="section-heading section-heading-center">
            <h2>
              {language === "de"
                ? "Wenn Ihre Umgebung zu komplex fur starre Dashboards ist, sollten wir sprechen."
                : "If your environment is too complex for static dashboards, we should talk."}
            </h2>
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href="mailto:hello@anomx.io">
              {language === "de" ? "Kontakt aufnehmen" : "Talk to us"}
            </a>
          </div>
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}
