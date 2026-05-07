import Link from "next/link";
import { CursorAtmosphere } from "@/components/cursor-atmosphere";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function ImpressumPage() {
  return (
    <main className="page-shell legal-page" id="top">
      <CursorAtmosphere />
      <SiteHeader anchorPrefix="/" />

      <section className="section legal-section">
        <article className="legal-document">
          <h1>Impressum</h1>
          <p>
            Dies ist ein Platzhalter für das Impressum von Anomx. Die vollständigen
            Anbieterangaben werden hier vor dem öffentlichen Launch ergänzt.
          </p>

          <h2>Angaben zum Anbieter</h2>
          <p>
            Anomx, vertreten durch die verantwortliche Person oder Organisation.
            Anschrift, Kontaktangaben und Registerinformationen werden später
            eingetragen.
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: <a href="mailto:hello@anomx.io">hello@anomx.io</a>
          </p>

          <h2>Verantwortlich für den Inhalt</h2>
          <p>
            Die verantwortlichen Angaben werden nach finaler rechtlicher Prüfung
            ergänzt.
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
