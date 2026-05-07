import Link from "next/link";
import { CursorAtmosphere } from "@/components/cursor-atmosphere";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function DatenschutzerklaerungPage() {
  return (
    <main className="page-shell legal-page" id="top">
      <CursorAtmosphere />
      <SiteHeader anchorPrefix="/" />

      <section className="section legal-section">
        <article className="legal-document">
          <h1>Datenschutzerklärung</h1>
          <p>
            Dies ist eine Platzhalter-Datenschutzerklärung für Anomx. Die finalen
            Informationen zu Verarbeitung, Rechtsgrundlagen, Aufbewahrung und
            Betroffenenrechten werden später ergänzt.
          </p>

          <h2>Verantwortlicher</h2>
          <p>
            Die verantwortliche Stelle, Anschrift und Datenschutzkontakt werden hier
            nachgetragen.
          </p>

          <h2>Verarbeitete Daten</h2>
          <p>
            Beim Absenden des Early-Access-Formulars können Name, E-Mail-Adresse,
            Unternehmensangaben und der beschriebene Anwendungsfall verarbeitet werden.
          </p>

          <h2>Zweck der Verarbeitung</h2>
          <p>
            Die Daten werden genutzt, um Early-Access-Anfragen zu prüfen und mit
            interessierten Organisationen Kontakt aufzunehmen.
          </p>

          <h2>Ihre Rechte</h2>
          <p>
            Informationen zu Auskunft, Berichtigung, Löschung, Einschränkung,
            Widerspruch und Beschwerderecht werden hier finalisiert.
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
