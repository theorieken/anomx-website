"use client";

import { CursorAtmosphere } from "@/components/cursor-atmosphere";
import { useLanguage } from "@/components/language-switcher";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WaitlistForm } from "@/components/waitlist-form";
import { homeCopy } from "@/lib/home-content";

export function JoinWaitlistPage() {
  const language = useLanguage();
  const copy = homeCopy[language];

  const title = language === "de" ? "Der Warteliste beitreten" : "Join the Waitlist";
  const intro =
    language === "de"
      ? "Anomx entsteht derzeit in der Forschungsphase mit realen Hochvolumen-Datenströmen aus komplexer wissenschaftlicher Infrastruktur. Wir öffnen die erste Alpha-Phase für ausgewählte Teams, die System Intelligence früh in produktionsnahe Umgebungen bringen wollen."
      : "Anomx is currently in its research phase, working with petabyte-scale operational data from the largest linear particle accelerator on earth at DESY in Hamburg. We are preparing a first alpha phase for early customers operating complex, high-value systems.";

  return (
    <main className="page-shell legal-page" id="top">
      <CursorAtmosphere />
      <SiteHeader anchorPrefix="/" />

      <section className="section legal-section waitlist-page-section">
        <article className="legal-document waitlist-page-document">
          <h1>{title}</h1>
          <p>{intro}</p>
        </article>

        <div className="waitlist-panel waitlist-page-panel">
          <WaitlistForm buttonLabel={copy.waitlist.buttonLabel} copy={copy.waitlist} />
        </div>

        <SiteFooter anchorPrefix="/" />
      </section>
    </main>
  );
}
