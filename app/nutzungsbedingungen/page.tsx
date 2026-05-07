import Link from "next/link";
import { CursorAtmosphere } from "@/components/cursor-atmosphere";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function NutzungsbedingungenPage() {
  return (
    <main className="page-shell legal-page" id="top">
      <CursorAtmosphere />
      <SiteHeader anchorPrefix="/" />

      <section className="section legal-section">
        <article className="legal-document">
          <h1>Nutzungsbedingungen</h1>
          <p>
            Dies sind Platzhalter-Nutzungsbedingungen für Anomx. Die verbindlichen
            Bedingungen für Website, Early Access und Produktnutzung werden später
            ergänzt.
          </p>

          <h2>Nutzung der Website</h2>
          <p>
            Die Website dient der Information über Anomx und der Aufnahme von
            Early-Access-Anfragen.
          </p>

          <h2>Early Access</h2>
          <p>
            Eine Anfrage über das Formular begründet keinen Anspruch auf Zugang,
            Verfügbarkeit oder bestimmte Produktfunktionen.
          </p>

          <h2>Inhalte und Verfügbarkeit</h2>
          <p>
            Inhalte können sich während der Entwicklung ändern. Weitere rechtliche
            Hinweise werden vor dem Launch finalisiert.
          </p>

          <Link className="legal-back-link" href="/">
            Back home
          </Link>
        </article>

        <SiteFooter anchorPrefix="/" />
      </section>
    </main>
  );
}
